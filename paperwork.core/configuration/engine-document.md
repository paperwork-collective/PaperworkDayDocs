---
layout: default
title: The Engine Document
parent: Configuration & Extension
parent_url: /paperwork.core/configuration/
has_children: false
has_toc: false
nav_order: 0
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Working with the Engine Document
{: .no_toc}

Paperwork.Core generates documents with the open-source Scryber engine. Most of the time the document builder is all you need, but when you want to change something the builder does not expose, you can parse the template into an engine `Document` yourself, configure it, and hand it to the builder.

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

## When to use it

Use an engine `Document` when you need to:

- set document metadata such as the author, subject or keywords
- change the output options, such as compression or the conformance mode
- protect the output with passwords and permissions
- find, add or change components in code before the document is generated
- handle document events, such as remote file requests

For templates, styles and data, the [document builder](/paperwork.core/quickstart/quickstart_core) on its own is simpler.

---

## The pattern

Parse the template, configure the `Document`, then pass it to the builder with `WithLayout(doc)`. Data, styles and fields are added to the builder as normal, and the builder generates the output.

```csharp
using Paperwork;
using Scryber.Components;

using var factory = PaperworkFactory.Create().Build();

// 1. Parse the template into an engine Document
using var doc = Document.ParseDocument("template.html");

// 2. Configure it
doc.Info.Author = "Finance Department";
doc.Info.Subject = "Quarterly figures";

// 3. Generate it with the builder
await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", report)
    .SaveAsync("report.pdf");
```

The builder uses the same `Document` instance, so everything set on it before the build is kept.

---

## Parsing a template

Templates with the XHTML namespace on the `<html>` element are parsed with `ParseDocument`, and HTML5 templates without it with `ParseHtmlDocument`.

```csharp
// XHTML template from a file
using var doc = Document.ParseDocument("template.html");

// HTML5 template from a file
using var html5 = Document.ParseHtmlDocument("template.html");
```

To parse from a string or stream, use a reader, and say where the content came from.

```csharp
using var reader = new StringReader(html);

using var doc = Document.ParseDocument(reader, ParseSourceType.DynamicContent);
```

A parsed `Document` should be disposed of when it is no longer needed, and it is generated once. Parse it again for each document you create.

---

## What the builder adds

When the document is generated, the builder adds the following to the engine `Document`:

| Builder method | Added to the document |
|---|---|
| `WithData(name, value)` | `doc.Params[name]`, available in the template as `{% raw %}{{name}}{% endraw %}` |
| `WithField(id, value)` | `doc.Params["$fields"][id]`, available as `{% raw %}{{$fields["id"]}}{% endraw %}` |
| `WithStyle(css)` | A `<style>` element in the document head |
| `WithStyle(styleGroup)` | Added to `doc.Styles` |
| `WithLayout(component, name)` | Other named layouts in `doc.Params["$layouts"]` |

Values already in `doc.Params` are kept, unless the builder adds a value with the same name.

---

## Document information

The title of the PDF comes from the `<title>` in the template, and replaces any title set in code. Bind it to data to make it dynamic, e.g. `{% raw %}<title>{{model.title}}</title>{% endraw %}`.

```csharp
using var doc = Document.ParseDocument("template.html");

doc.Info.Author = "Acme Corporation";
doc.Info.Subject = "Monthly Invoice";
doc.Info.Keywords = "invoice, billing, payment";
doc.Info.Creator = "My Application v1.0";

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("invoice.pdf");
```

See [Document Properties](/paperwork.core/learning/07-configuration/01_document_properties) for all the information values.

---

## Output options

The `RenderOptions` control how the PDF is written.

```csharp
using Scryber;

using var doc = Document.ParseDocument("template.html");

// No compression - larger files, but readable content streams
doc.RenderOptions.Compression = OutputCompressionType.None;

// Lax conformance - report problems in the log rather than failing
doc.ConformanceMode = ParserConformanceMode.Lax;

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");
```

See [Security](/paperwork.core/learning/07-configuration/05_security) for passwords and permissions, and [Optimization and Performance](/paperwork.core/learning/07-configuration/06_optimization_performance) for the other output options.

---

## Logging

With an engine `Document`, turn on the log on the document itself, and it is added as pages at the end of the output.

```csharp
using var doc = Document.ParseDocument("template.html");

doc.AppendTraceLog = true;

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");
```

A `<?paperwork append-log='true' ?>` processing instruction in the template does the same. See [Logging](/paperwork.core/learning/07-configuration/02_logging) for log levels and custom log output.

---

## Changing content in code

Components with an `id` in the template can be found and changed before the document is generated. HTML elements are parsed into engine components, e.g. a `<span>` is an `HTMLSpan` and a `<div>` is an `HTMLDiv`, in the `Scryber.Html.Components` namespace.

```csharp
using Scryber.Drawing;
using Scryber.Html.Components;

using var doc = Document.ParseDocument("invoice.html");

// <span id="StatusBadge">DUE</span> in the template
if (doc.TryFindAComponentById("StatusBadge", out HTMLSpan badge))
{
    badge.Contents.Clear();
    badge.Contents.Add(new TextLiteral("PAID"));
    badge.Style.Background.Color = StandardColors.Green;
}

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("invoice.pdf");
```

See [Working in Code](working-in-code) for building and styling components, and [Request Events and DOM](document-events-and-access) for document events.

---

## Limitations

When a layout is passed as a `Document`, the builder generates it directly:

- Layouts and data must be given as content, files, streams or objects. `WithLayoutUrl` and `WithDataUrl` are not available.
- Remote images, fonts and stylesheets in the template are loaded by the engine, rather than through the factory's authentication and file-request services.
- Set logging on the document with `AppendTraceLog`, rather than with `WithLogLevel`.

---

## Related

- [Processing Instructions](processing-instructions) - document options set in the template
- [Working in Code](working-in-code) - the component object model
- [Library Architecture](ARCHITECTURE) - how the engine parses, lays out and renders documents
