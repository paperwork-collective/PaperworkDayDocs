---
layout: default
title: The Document Builder
parent: Quick Start
parent_url: /paperwork.core/quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 0.5
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# The Document Builder
{: .no_toc }

`factory.NewDocument()` starts a new builder for one document. Each method adds to the document and returns the builder, so they can be chained, and the output methods generate the PDF. The builder comes from the [factory](/paperwork.core/quickstart/factory.html).

```csharp
await factory.NewDocument()
    .WithLayoutFile("invoice.html")
    .WithStyleFile("invoice.css")
    .WithData("model", invoice)
    .WithField("date", "2026-03-25")
    .SaveAsync("invoice.pdf");
```

You can build a document from the parts like this, or start from a template saved in the Paperwork [Designer](/paperwork.design/), as described in [Starting from a saved template](#starting-from-a-saved-template).

---

<details class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Layouts

The layout is the HTML template. The first, or the one named `main`, is the document; others are named partials.

| Method | Description |
|--------|-------------|
| `WithLayout(html, name)` | A template as a string |
| `WithLayout(stream, name)` | A template from a stream |
| `WithLayoutFile(path, name)` | A template from a file. Relative images and stylesheets are found next to the file |
| `WithLayoutUrl(url, name, auth)` | A template loaded from a url, optionally with an authentication name |
| `WithLayout(document)` | A parsed engine `Document` - see [The Engine Document](/paperwork.core/configuration/engine-document) |

Named partials are available to the main template as `$layouts`, and can be placed with `data-content`:

{% raw %}
```csharp
builder.WithLayoutFile("report.html")
       .WithLayout("<div xmlns='http://www.w3.org/1999/xhtml'>Prepared for {{model.name}}</div>", "header");
```
{% endraw %}

{% raw %}
```html
<div data-content='{{$layouts.header}}'></div>
```
{% endraw %}

## Styles

Stylesheets added to the document, as well as any in the template.

| Method | Description |
|--------|-------------|
| `WithStyle(css, name)` | CSS as a string |
| `WithStyle(stream, name)` | CSS from a stream |
| `WithStyleFile(path, name)` | CSS from a file. Relative urls are found next to the file |
| `WithStyleUrl(url, name, auth)` | CSS loaded from a url |
| `WithStyle(styleGroup)` | Styles built in code |

## Data

Data is referred to in the template by its name, e.g. `{% raw %}{{model.customer.name}}{% endraw %}`. See the [binding reference](/paperwork.core/reference/binding/).

| Method | Description |
|--------|-------------|
| `WithData(name, object)` | Any .NET object - classes, anonymous objects, lists, dictionaries |
| `WithData(name, json)` | JSON as a string |
| `WithData(name, stream)` | JSON from a stream |
| `WithDataFile(name, path)` | JSON from a file |
| `WithDataUrl(name, url, auth)` | JSON loaded from a url, optionally with an authentication name |

## Fields

Single values, available in the template as `{% raw %}{{$fields["id"]}}{% endraw %}`.

| Method | Description |
|--------|-------------|
| `WithField(id, value, type)` | Sets a field value |

## Options

| Method | Description |
|--------|-------------|
| `WithLogLevel(level)` | Appends the generation log to the end of the document - `Off`, `Errors`, `Warnings`, `Messages`, `Verbose`. The default uses the template's own setting |
| `UseAsync()` | Generates with the engine's asynchronous path, e.g. in Blazor WebAssembly |

## Output

| Method | Returns |
|--------|---------|
| `SaveAsync(path)` | Writes the PDF to a file |
| `SaveAsync(stream)` | Writes the PDF to a stream, e.g. a response body |
| `BuildBytesAsync()` | The PDF as a `byte[]` |
| `BuildAsync()` | A `PaperworkResult` - see below |

`SaveAsync` and `BuildBytesAsync` throw an exception if the document could not be generated. `BuildAsync` does not throw; it returns the outcome:

| Property | Description |
|----------|-------------|
| `Success` | `true` if the document was generated |
| `ResultCode` | `200` for success, or an error code |
| `Message` | A description of the result, or of the problem |
| `Error` | The detail of any error |
| `Document.Binary` | The generated PDF |
| `Document.MimeType` | `application/pdf` |
| `Log` | The generation stages and requests |

```csharp
var result = await factory.NewDocument()
    .WithLayoutFile("report.html")
    .WithDataUrl("model", "https://api.example.com/report/42")
    .BuildAsync();

if (result.Success)
    await File.WriteAllBytesAsync("report.pdf", result.Document.Binary);
else
    Console.WriteLine($"{result.ResultCode}: {result.Message} {result.Error}");
```

---

## Starting from a saved template

A template designed in [Paperwork.Design](/paperwork.design/) and exported, or saved as a template configuration file, holds its layouts, styles, data and fields together in one JSON file. Start the builder from it, then add or replace values before generating.

```csharp
using var config = File.OpenRead("invoice-template.json");

await factory.FromConfig(config)
    .WithData("model", invoice)
    .WithField("date", "2026-03-25")
    .SaveAsync("invoice.pdf");
```

The same builder methods then work as before:

- `WithData(name, ...)` **replaces** the data source of that name in the template, and adds it if the template does not have one. The template's other data sources load as normal.
- `WithField(id, value)` sets a field, over the default in the template.
- `WithLayout`, `WithStyle` and the rest add to what the template already has.

The configuration file must have a `schemaVers` of `"1.1"`, and the file's structure is described in [Template Configuration](/paperwork.core/template-config/).

### From a definition

A configuration wraps a `template` definition with its schema version and meta data. If you only have the definition, the object with `layouts`, `styles`, `data` and `fields` in it, use `FromDefinition`:

```csharp
using var definition = File.OpenRead("invoice-definition.json");

await factory.FromDefinition(definition)
    .WithData("model", invoice)
    .SaveAsync("invoice.pdf");
```

`FromConfig` and `FromDefinition` also accept the already loaded `TemplateConfiguration` or `TemplateDefinition` object, if you have built or changed it in code.

{: .note }
> Layouts, styles and data in a template can be stored inline, or as a `source` url that is fetched when the document is generated. Use `WithAuth` on the [factory](/paperwork.core/quickstart/factory.html#factory-options) to supply the authentication for any that need it.

---

## See also

- [Template Configuration](/paperwork.core/template-config/) - the JSON structure of a saved template
- [The Factory](/paperwork.core/quickstart/factory.html)
- [Quick Start](/paperwork.core/quickstart/quickstart_core)
- [The Engine Document](/paperwork.core/configuration/engine-document) - configuring a document in code
- [Request Events and DOM](/paperwork.core/configuration/document-events-and-access) - loading content from your own sources
- [Binding reference](/paperwork.core/reference/binding/)
