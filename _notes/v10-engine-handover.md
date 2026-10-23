# v10.0 handover — engine & library findings from the Paperwork.Core docs review

From: the Paperwork.Core docs session (PaperworkDayDocs `nav-restructure`), 2026-10-23.
To: the Review HTML5 layout engines session — owner of the core library; all changes go through you.
Goal: everything lands together for **v10.0**.

Every item below was reproduced with a small console app against Paperwork.Core 9.7.5 / Scryber.Core 9.7.5
(repro code included). The docs currently describe the *intended* behaviour where marked "docs assume fix".
Full running log: `_notes/paperwork-core-docs-review.md`.

---

## A. Scryber.Core engine

### A1. `<?paperwork ?>` ignored in HTML5 templates — **docs assume fix**

The XHTML parser accepts both `<?scryber ?>` and `<?paperwork ?>` (`XMLParser.cs`, `ScryberProcessingInstructionsName` / `PaperworkProcessingInstructionsName`). The HTML5 parser only checks `<?scryber`:

`Scryber.Components/Html/Parsing/HTMLParser.cs:473` — `node.InnerHtml.StartsWith("<?scryber")`

Repro (append-log as the visible effect):

```csharp
// XHTML + paperwork  -> 6689 bytes (log appended)  OK
// HTML5  + scryber   -> 6574 bytes (log appended)  OK
// HTML5  + paperwork -> 1311 bytes (no log)        BUG
await factory.NewDocument()
    .WithLayout("<?paperwork append-log='true' ?><!DOCTYPE html><html><body><p>{{m.x}}</p></body></html>")
    .WithData("m", new { x = 1 }).BuildBytesAsync();
```

Fix: accept `<?paperwork` as well (check `HTMLParserEnumerator` too).

### A2. Image handling: requestor for a custom path, handler for a custom type — configured handlers broken

Model agreed with Richard:

- **Requestor** (a `RemoteFileRegistered` handler, or Paperwork's file-request service as used by `$assets`) loads the content for a custom *path*.
- **Handler** (an image factory) decodes a custom *type*. If the path has a standard image extension, the standard factories handle it; otherwise a registered factory (`ImageFactoryBase` subclass with its own `Match` regex) must.
- The requestor either completes the request with decoded `ImageData` (the `$assets` way: `doc.ImageFactories.TryGetMatch(path)` → `LoadImageData(doc, owner, bytes, type)` → `CompleteRequest(imageData, true)`), or passes the stream back with `request.Callback(request.Owner, request, stream)` so the matched handler's `DoDecodeImageData` decodes it.

Verified working today:

- `db://products/42.png` (standard extension) + requestor completing with `ImageData` → 1 request, image drawn.
- `db://products/42` + `ImageFactoryBase` subclass inserted into `doc.ImageFactories` + requestor calling `request.Callback(...)` → 1 request, 1 decode, image drawn, no warnings.

```csharp
public class DatabaseImageFactory : ImageFactoryBase
{
    public DatabaseImageFactory() : base(new Regex("^db://"), MimeType.PngImage, "Database", true) { }

    protected override ImageData DoDecodeImageData(Stream stream, IDocument document, IComponent owner, string path)
    {
        using var ms = new MemoryStream();
        stream.CopyTo(ms);
        var png = ((Document)document).ImageFactories.First(f => f != this && f.ImageType.Equals(MimeType.PngImage));
        return png.LoadImageData(document, owner, ms.ToArray(), MimeType.PngImage);
    }
}

doc.ImageFactories.Insert(0, new DatabaseImageFactory());
doc.RemoteFileRegistered += (s, a) =>
{
    if (!a.Request.FilePath.StartsWith("db://")) return;
    using var stream = LoadFromDatabase(a.Request.FilePath);
    a.Request.Callback(a.Request.Owner, a.Request, stream);
};
```

**The gap:** handlers registered in **configuration** (`Scryber:Imaging:Factories` → `ImageDataFactoryOption`) are wrapped in `ImageFactoryCustom` (`Scryber.Imaging/ImageFactoryCustom.cs`), whose `DoDecodeImageData` and `DoLoadRawImageData` throw *"The custom factory only supports the primary interface method for document, owner and path"*. So the callback route fails for every configured handler (log shows the request raised 6 times and "Missing Image replaced"). With no requestor, the generic loader fails with *"The 'db' scheme is not supported"*.

Suggested fix (your call): let `ImageFactoryCustom` forward decoding to the wrapped `IPDFImageDataFactory` (`LoadImageData(doc, owner, bytes, type)`), and/or let configuration register `ImageFactoryBase` types directly so they keep their own `Match`/`ImageType`/`DoDecodeImageData`.

Docs status (2026-10-23): **Image Factories** and **Request Events and DOM** are rewritten around this model and verified end to end (requestor passes every resource type back with `request.Callback(request.Owner, request, stream)` — stylesheets, fonts, iframe content and images all load; an `ImageFactoryBase` handler decodes extension-less paths). The Image Factories page documents **per-document registration only** (`doc.ImageFactories.Insert(0, …)`); a "register for every document in configuration" section will be added once configured handlers work in v10.

Also worth deciding: should completing a request with raw `byte[]`/`Stream` be accepted for images (decoded by the matched factory)? The old docs claimed it was; today it silently does nothing.

### A3. `Document.ComponentRegistered` never fires for a parsed document

Subscribed after `Document.ParseDocument(...)`: 0 events after parse, 0 after generation. Either it should fire (e.g. during Init) or it should be documented as parse-time only (which can't be subscribed to). Docs now walk `IContainerComponent.Content` instead.

### A4. HTML fragment renders nothing in a code-built document

```csharp
var doc = new Document(); var page = new Page(); var section = new Section();
var parsed = doc.ParseTemplate(doc, "", new StringReader(
    "<div xmlns='http://www.w3.org/1999/xhtml'><h2>Summary</h2><p>Text</p></div>"));
section.Contents.Add((Div)parsed); page.Contents.Add(section); doc.Pages.Add(page);
doc.SaveAsPDF(stream);   // blank page (parsed is HTMLDiv with 2 children)
```

The same fragment added into an element of a parsed HTML template renders correctly. Low priority — docs use the working pattern.

### A5. Nice-to-have: `Document.ParseDocument(reader, type, ParserSettings)`

There is no `ParseDocument` overload taking `ParserSettings`; custom settings need
`(Document)Document.Parse(path, reader, ParseSourceType.LocalFile, settings.Resolver, settings)`. Works, but awkward to document.

### A7. Custom components: `Panel` drops child content; moved collection children don't render

- A custom component deriving from `Panel` (or a `[PDFElement]` property typed `Panel`/`Label`) gets no child content from the template — `Panel` doesn't override `Contents` with `[PDFArray(typeof(Component))]` like `Div` does. Same components work when derived from / typed as `Div`. Should `Panel` parse children?
- Children parsed into a `[PDFElement("Sections")][PDFArray(typeof(Component))] ComponentList` property and then added to `Contents` in `OnInitialized` don't render (none with 1 column, only the first with 2). `[PDFArray(typeof(Panel))]` on a `ComponentList` fails to parse ("No 'Add' method … accepting Panel").
- Docs now use `Div` and the component's own `Contents` (verified end to end).

### A8. Strict parser mode breaks `{{#each}}`

```html
<?paperwork parser-mode='Strict' ?>
<html xmlns='http://www.w3.org/1999/xhtml'><body><main>{{#each model.products}}<p>{{this.name}}</p>{{/each}}</main></body></html>
```

Data binding fails: "Databinding failed for component …_NOOP1, Specified method is not supported." The same template works in Lax. Also via `Document.CreateParserSettings(path, ParserConformanceMode.Strict)` + `Document.Parse(...)`, and through the builder. The Processing Instructions page recommends Strict for development, so this bites anyone following the docs.

### A9. Registered fonts only match the file's own weight

`Fonts:Register` entries ignore their `Weight`/`Style`; the face is added at the file's own weight, and there's no nearest-weight fallback - a Light (300) file isn't used for `font-weight: normal`, and Helvetica is used silently. Intended?

### A10. `@first` / `@last` are not implemented — FIXED (scryber.core 99163184, unreleased)

`{{@first}}` fails at parse ("Unrecognised token '@first'"); only `@index` is special-cased in the tokeniser/parser. Docs, the quick start chart and CLAUDE.md list `@first`/`@last`. Requested for v10 (output and `{{#if @first}}`). Workaround meanwhile: `{{@index == 0}}`.

### A11. `../` returns nothing inside `{{#each}}` — FIXED (scryber.core 99163184, unreleased; `../` single level, `../this.name` empty, use `../name`)

Works in `{{#with}}` (`{{#with model}}{{#with groups[0]}}{{../title}}` gives the title), but in `{{#each}}` - nested or not - `../name`, `../this.name`, `../../name` all return empty. So the parent loop item cannot be reached from an inner loop. Expected `{{../name}}` in an inner each to give the outer item's name. Richard wants the docs to say `../` is single level only (not chained).

### A12. Smaller binding findings (for the engine docs / CLAUDE.md)

- The `? :` ternary is **not** supported (`{{a ? 'x' : 'y'}}` fails: "Unrecognised token ': 'y''"). scryber.core CLAUDE.md lists it under expression types; use `if(a, 'x', 'y')`. Add the ternary, or correct CLAUDE.md?
- `<var data-id='x' data-value='0'>` (a plain literal) fails to parse: "Could not read the value data-value from the Xml source". `data-value='{{0}}'` works. Should a literal be accepted?
- `{{params.name}}` does not read a `<var>` value (returns nothing); the plain name `{{name}}` does. The docs used `params.` throughout the var page (now fixed).
- `data-bind` on a `<div>` switches the data context; it does not repeat the element. Several docs examples used it as a loop (now `{{#each}}`).

### A13. Docs described extension APIs that don't exist

- Custom HTML tags: `HTMLParserComponentFactory.RegisterTag(...)` / `new HTMLParser(factory)` - the factory is internal, no `RegisterTag`. Docs now use namespace-registered components.
- Custom CSS properties: `CSSStyleAttributeParser<T>.RegisterProperty(...)` / `CSSStyleParser.RegisterParser(...)` - no runtime registration. Docs now say new properties are added in the engine source. Is a public extension point wanted for v10?

### A6. FYI — `<title>` overrides `doc.Info.Title`

A `<title>` in the template always replaces a title set in code (plain engine). Probably by design; docs now say so.

---

## B. Paperwork.Core (if this is also yours — otherwise please pass on)

> **Status 2026-10-23:** the Review HTML5 session owns Scryber.Core only (A items going to Richard for scope and order). Richard asked the docs session to do the B items: **B1–B7 done** on Paperwork.Core branch `v10-builder-fixes` (`f51a7db`), tests on Paperwork branch `v10-builder-tests` (`6fcf19f`, 101 passing). B2 was done as a new `PaperworkRequestLogOption.Template` (builder default) so `Off` still means off for Designer/Viewer requests. **B8 is still a decision.** Not pushed or released — part of v10.0.

| # | Issue | Where |
|---|---|---|
| B1 | **Two build paths behave differently.** Any `WithData(name, object)`, `WithLayout(Document/IComponent)` or `WithStyle(StyleGroup)` switches to `BuildDirectAsync`, which ignores `WithLogLevel`, throws for `WithLayoutUrl`/`WithDataUrl` ("Remote URLs require the factory path"), and skips the factory's auth and file-request services. JSON/string-only data uses the factory path, where the opposite holds. **Docs assume fix** (log level applies in both). | `Generation/v1/DocumentBuilderV1.cs` |
| B2 | Factory path: log level `Off` forces `doc.AppendTraceLog = false`, so a template's `append-log='true'` is ignored. Suggest `Off` = leave the template setting alone. | `PDFGeneratorV1.UpdateDocumentTraceLevel` |
| B3 | `services.AddPaperwork()` alone fails DI ("No constructor … can be instantiated") unless an `HttpClient` is registered; XML comment says it registers tracing, it doesn't. | `PaperworkSetupExtensions.cs` |
| B4 | `AddPaperwork()` doesn't pass configuration to the engine — apps must also call `Scryber.ServiceProvider.Init(configuration)`. Suggest an `AddPaperwork(IConfiguration)` overload. | `PaperworkSetupExtensions.cs` |
| B5 | `WithLayoutFile`/`WithStyleFile` read only the text, so relative `<img>`/`<link>` resolve from the working directory, not the template's folder. Suggest passing `Path.GetFullPath(filePath)` as the layout source/base. | `DocumentBuilderV1.WithLayoutFile` |
| B6 | `Console.WriteLine` debug output in library code. | `PaperworkInstanceFactory.cs:223`, `TemplateDefinitionV1.cs` 134/160/183/202 |
| B7 | No stream output (`SaveAsync(Stream)`) — only path, bytes, or result. | `IDocumentBuilder` |
| B8 | appsettings root only accepts `"Scryber"`; a `"Paperwork"` alias would need an engine change. Decision for v10. | `ScryberOptions.ScryberSection` |

---

## C. What the docs session does next

- Rewrites **Image Factories** and **Request Events and DOM** around the requestor + handler model in A2 (examples will use per-document `doc.ImageFactories` registration until configured handlers work).
- Carries on converting the remaining Paperwork.Core pages to the document builder, logging anything new in `_notes/paperwork-core-docs-review.md`.
- Will re-run every example against the v10.0 build once your changes land.
