# Paperwork.Core docs review — findings

Running list from moving the `paperwork.core/` docs from the Scryber API to the
Paperwork.Core document builder (branch `nav-restructure`, started 2026-10-23).
`_notes/` is not published by Jekyll.

Status: **open** (needs a decision or a code change), **docs-done** (docs reflect
current behaviour, library may still want a fix), **fixed**.

---

## 1. Paperwork.Core library issues

| # | Issue | Where | Effect | Status |
|---|---|---|---|---|
| L1 | Builder log level defaults to `Off` and forces `doc.AppendTraceLog = false`, so `<?paperwork append-log='true' ?>` in a template is ignored. | `Generation/v1/PDFGeneratorV1.cs` `UpdateDocumentTraceLevel` | Template-level logging silently does nothing through the builder. Suggest `Off` = leave the template setting alone. | open (docs use `WithLogLevel`) |
| L2 | `services.AddPaperwork()` alone fails: `PaperworkInstanceFactory` needs an `HttpClient` (or tracing + file-request services) that it does not register. Its XML comment says it registers tracing; it doesn't. | `Generation/PaperworkSetupExtensions.cs` | DI resolution throws "No constructor … can be instantiated". | open (docs add `AddSingleton(new HttpClient())`) |
| L3 | `Console.WriteLine` debug output ("Ensuring config loaded with 0 fields", "Found item type of Content…"). | `PaperworkInstanceFactory.cs:223`, `TemplateDefinitionV1.cs` lines 134, 160, 183, 202 | Noise in every consumer's console. Move to the tracing service. | open |
| L4 | `WithLayoutFile` / `WithStyleFile` read only the text; no base path, so relative `<img>`/`<link>` in a template resolve from the process working directory, not the template's folder. `<base href>` does not help either. | `Generation/v1/DocumentBuilderV1.cs` `WithLayoutFile` | Templates with sibling images/css break unless run from the right folder. Fix: pass `Path.GetFullPath(filePath)` as the layout `Source`/base. | open (docs describe current behaviour) |
| L5 | No stream output (e.g. write straight to `Response.Body`). Only `SaveAsync(path)`, `BuildBytesAsync()`, `BuildAsync()`. | `IDocumentBuilder` | Removed the "stream directly to response" example. Consider `SaveAsync(Stream)`. | open |
| L7 | **Two build paths behave differently.** Any `WithData(name, object)`, `WithLayout(IComponent/Document)` or `WithStyle(StyleGroup)` switches to `BuildDirectAsync`, which (a) ignores `WithLogLevel` (verified: no log pages), (b) honours the template `append-log` PI and `doc.AppendTraceLog`, (c) throws for `WithLayoutUrl`/`WithDataUrl` ("Remote URLs require the factory path"), (d) skips the factory's auth and file-request services. JSON/string-only data uses the factory path where the opposite holds (see L1). | `Generation/v1/DocumentBuilderV1.cs` `BuildAsync` / `BuildDirectAsync` | Users can't predict whether logging, remote layouts/data or auth will work — it depends on the type of the data argument. Suggest: apply log level in the direct path (and `Off` = leave template alone), and load URL layouts/data in the direct path too. | open — **docs currently assume the fix**: troubleshooting "Enable Logging" and "Slow PDF Generation" combine object data + `WithLogLevel` |
| L8 | `AddPaperwork()` does not pass the app configuration to the engine; every app must also call `Scryber.ServiceProvider.Init(configuration)` for the `"Scryber"` appsettings (fonts, imaging…) to apply. | `PaperworkSetupExtensions.AddPaperwork` | Easy to miss. Suggest `AddPaperwork(IConfiguration)` overload that calls `Init`. | open (docs show the `Init` call) |
| L6 | appsettings root only accepts `"Scryber"` (`ScryberOptions.ScryberSection`); processing instruction accepts both `scryber` and `paperwork`. | Scryber.Common config | Docs keep `"Scryber"` in appsettings. A `"Paperwork"` alias needs an engine change. | open (decision) |

## 1b. Scryber engine issues

| # | Issue | Where | Effect | Status |
|---|---|---|---|---|
| E1 | HTML5 parser only recognises `<?scryber ... ?>`; `<?paperwork ... ?>` is ignored (XHTML parser accepts both). Verified: `append-log` works with `<?scryber` but not `<?paperwork` in an HTML5 template. | `Scryber.Components/Html/Parsing/HTMLParser.cs:473` (`StartsWith("<?scryber")`) | Docs lead with `<?paperwork ?>`, which silently does nothing in HTML5 templates. One-line fix. | open — **docs assume the fix** |
| E3 | ~~Engine bug~~ **Docs error** (re-diagnosed 2026-10-23). Completing a `RemoteFileRegistered` request works when the *result is the decoded `ImageData`* — the `$assets` way (`PaperworkAssetFileRequestor.DoLoadImageType`: load bytes → `doc.ImageFactories.TryGetMatch(path)` → `LoadImageData(doc, owner, bytes, type)` → `CompleteRequest(imageData, true)`). Verified: one request, image drawn, for `asset://images/pic.png` and `db://products/42.png`. Completing with raw `byte[]`/`Stream` (as the docs say) does nothing for images. | `document-events-and-access.md` "Expected types" + all handler examples | Fix the docs: images complete with `ImageData` decoded via the document's image factories; paths need an image extension so a standard factory matches. Check what stylesheets/fonts/iframes expect (stylesheets in `$assets` call `request.Callback(owner, request, stream)`). | open — docs to fix |
| E4 | `Document.ComponentRegistered` never fires for a parsed document (0 events after parse and after build). | `Document.ComponentRegistered` | Example that collected all components via the event returned nothing. Replaced with a recursive `IContainerComponent.Content` walk (verified). | docs-done |
| E5 | An HTML fragment parsed with `doc.ParseTemplate(...)` renders nothing when added to a code-built `Document`/`Page`/`Section` (plain engine too); the same fragment added into a parsed HTML template's element renders correctly. | engine layout of HTML components outside an HTML document | Example switched to the working pattern. | docs-done (engine question) |
| E7 | **Model confirmed with Richard (2026-10-23): a *requestor* for a custom path, a *handler* for a custom type.** If the path has no standard image extension, a registered image factory (an `ImageFactoryBase` subclass with its own `Match` regex and `ImageType`) must handle it; it raises the request, the requestor (`RemoteFileRegistered` handler / Paperwork file-request service) loads the content and passes the stream back with `request.Callback(request.Owner, request, stream)`, and the factory's `DoDecodeImageData(stream, …)` returns the `ImageData`. Verified: `db://products/42` → 1 request, 1 decode, image drawn, no warnings. With a standard extension (`db://products/42.png`, `$assets/...`) no custom factory is needed: the requestor decodes via `doc.ImageFactories.TryGetMatch(path)` and completes with `ImageData` (also verified). **Remaining engine gap:** factories registered in *configuration* (`ImageDataFactoryOption`) are wrapped in `ImageFactoryCustom`, whose `DoDecodeImageData`/`DoLoadRawImageData` throw "only supports the primary interface method", so the callback route fails for them. | `Scryber.Imaging/ImageFactoryCustom.cs` | Image Factories + Request Events pages to be rewritten around requestor + handler. Engine: `ImageFactoryCustom` should forward decode to the wrapped factory (e.g. `LoadImageData(doc, owner, bytes, type)`), or config should accept `ImageFactoryBase` types directly. | open — pages to rewrite; engine fix for configured factories |
| E2 | No `Document.ParseDocument(..., ParserSettings)` overload; custom settings need `Document.Parse(source, reader, type, settings.Resolver, settings)` and a cast. | `Document.cs` | Awkward but works (verified). | docs-done |

## 2. Engine behaviour worth knowing (documented)

- `<title>` in a template always replaces `doc.Info.Title` set in code (plain engine too). Docs now say bind the `<title>`.
- Builder picks XHTML vs HTML5 parser by `xmlns` on `<html>`; invalid XHTML gives `303. Document could not be created from the layout…`.
- `WithLayout(doc)` keeps the engine Document: `Info`, `RenderOptions` (compression verified), `ConformanceMode`, and `WithData` still binds.
- One factory is safe for parallel generation (24 builds, 4 at a time, verified).
- `WithData` accepts plain strings, numbers, arrays, `JsonElement` / `dynamic` JSON.

## 3. Docs examples using APIs that do not exist

Found with the compile checker (`scratchpad/sem`, compiles each C# block against Paperwork.Core + Scryber).

| API used in docs | Reality | Status |
|---|---|---|
| `doc.RenderOptions.PDFVersion` / `PDFVersion.PDF17` | No such option | removed in getting-started; step 3 for the rest |
| `doc.RemoteRequests.Timeout` | No timeout; use `HttpClient.Timeout` via `PaperworkFactory.Create(client)` | fixed in troubleshooting |
| `TraceLog.SetLogLevel`, `ConsoleTraceLog`, `SaveAsPDF(stream, logger)`, `TraceLog.WriteLog` override, `TraceRecordLevel.Error/Warning/Message` | Real: `SetRecordLevel`, `Record(...)` abstract, levels `Errors/Warnings/Messages/Verbose/Diagnostic/Off` | fixed in troubleshooting; step 3 for logging guide |
| `Document.ParseHTML(...)` | Real: `Document.ParseHtmlDocument(...)` | step 3/4 |
| `<base href>` to resolve relative paths | Not honoured | removed |
| `doc.ProcessDocument(...)` | Does not exist | step 3 |
| `new ParserSettings(/* ... */)` + `Document.ParseDocument(stream, type, settings)` | Use `Document.CreateParserSettings(...)` + `Document.Parse(...)` (E2) | fixed in processing-instructions |
| `Document.ParseComponent(reader, ParseSourceType.Template)` | Does not exist; use `doc.ParseTemplate(owner, path, reader)` | fixed in working-in-code |
| `component.Style.Padding = thickness` / `Margins = ...` | Read-only; use `.Padding.SetThickness(...)` | fixed in working-in-code |
| `IPDFImageDataFactory { FactoryKey; ShouldMatch; byte[] LoadImageData }`, JSON `Key`/`Type`/`Config`, `services.AddScryber(...)`, `ImagingOptions.Register`, `doc.ProcessDocument` | Real interface returns `ImageData`; options `Factories` of `ImageDataFactoryOption`; no `AddScryber`/`ProcessDocument` | fixed in image-factories |
| `TraceLog` subclass `protected internal override Record` | Must be `protected override` from another assembly; block also needed `using Scryber;` | fixed in logging-extension |
| `request.Cancel(...)` on a remote request | No such method; complete with `success: false` and an exception | fixed |
| `doc.TryFindComponentById(id, out IComponent)` | Real: `TryFindAComponentById<T>(id, out T)` extension | fixed in events page |
| `out Label badge` for a `<span id>` in an HTML template | Parsed as `HTMLSpan` (`Scryber.Html.Components`); `Span` clashes with `System.Span<T>` under implicit usings | fixed in engine-document; working-in-code next |
| ASP.NET reads `"Scryber"` appsettings automatically | It doesn't — `ServiceProvider.Init(configuration)` is always needed (L8) | fixed in configuration index + installation |

## 4. Docs follow-ups

- [ ] Compile checker (`scratchpad/sem`) gives false positives for `??=` on option lists and `protected override` of `TraceLog.Record`; the real compiler (scratchpad `qs`) is authoritative — both verified OK.
- [ ] `scrybersettings.json` is used as a file name 53 times; it's only a user-chosen name — step 4: prefer `appsettings.json`.

- [ ] Unpublished (underscore) content still has Scryber-API examples: `reference/_configuration/` (duplicate of `configuration/`), `learning/_08-practical/`, `learning/07-configuration/_04_pdf_versions.md` (PDF versions — the API it documents does not exist). Delete, or fix and publish? (decision)
- [ ] `learning/` publishes raw sample files (`wwf_tigers_report_*.cs/.json/.html/.css`, `convert_claude_md_to_pdf.cs`, README without front matter) — intended?

- [ ] Home page "found an inconsistency" note points at scryber.core GitHub issues — where should Paperwork.Core issues go? (decision)
- [ ] Templates in some guides use `{{Document.Params.subtotal}}` etc. — check these work / should be plain names (CLAUDE.md says plain names).
- [ ] Step 3: engine examples → parse + configure + `factory.NewDocument().WithLayout(doc)`; correct against real API; add "Working with the engine Document" page.
- [ ] Step 4: prose renaming (Scryber → Paperwork.Core) with agreed exceptions; processing-instructions page leads with `<?paperwork ?>`.
- [ ] Step 5: full site build, scan for `SaveAsPDF`, `Params[`, broken links; rerun compile checker over everything.
- [ ] Getting-started pages 03–06 not yet reviewed for API use (prose only expected).
