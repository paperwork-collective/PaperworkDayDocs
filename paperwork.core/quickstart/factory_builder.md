---
layout: default
title: Factory and Builder
parent: Quick Start
parent_url: /paperwork.core/quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 0
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# The Factory and the Document Builder
{: .no_toc }

Every document is generated in two steps: a **factory** that is set up once for the application, and a **document builder** for each document, which collects the template, styles and data and then generates the output.

```csharp
using Paperwork;

// Once, at startup
using var factory = PaperworkFactory.Create().Build();

// For each document
await factory.NewDocument()
    .WithLayoutFile("invoice.html")
    .WithData("model", invoice)
    .SaveAsync("invoice.pdf");
```

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

## The factory

The factory holds everything shared between documents: the `HttpClient` used for remote templates, data, images and fonts, and any authentication, tracing and file-request services. Create it once and re-use it - it can be used by many documents at the same time.

### Creating a factory

```csharp
// With its own HttpClient
using var factory = PaperworkFactory.Create().Build();

// With your own HttpClient - e.g. to set a timeout or default headers
var client = new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
using var factory = PaperworkFactory.Create(client).Build();
```

### Factory options

Options are added between `Create()` and `Build()`.

| Method | Description |
|--------|-------------|
| `WithAuth(IPaperworkAuthService)` | Adds a service that fetches authenticated remote content - templates, styles and data loaded with an `auth` name. Can be called more than once. |
| `WithFileRequests(IPaperworkRemoteFileRequestService)` | A service that loads the images, fonts and stylesheets a template asks for, e.g. from your own storage. |
| `WithTracing(IPaperworkTracingService)` | A service that records the stages and requests of each generation. |
| `WithSerializerOptions(JsonSerializerOptions)` | The JSON options used to read requests and template definitions. |
| `WithGenerator(IPaperworkGeneratorFactory)` | Adds a custom generator, for your own template versions or output types. |

```csharp
using var factory = PaperworkFactory.Create(client)
    .WithAuth(new MyApiAuthService())
    .WithFileRequests(new MyAssetService())
    .Build();
```

### Dependency injection

In ASP.NET Core and other hosted applications, register the factory at startup, and inject `IPaperworkFactory` where documents are generated.

```csharp
using Paperwork.Generation;

builder.Services.AddPaperwork(builder.Configuration);
```

The registered factory uses the application's `HttpClient`, `IPaperworkTracingService` and `IPaperworkRemoteFileRequestService` when they are registered, and its own defaults when they are not.

```csharp
public class InvoiceController : Controller
{
    private readonly IPaperworkFactory _factory;

    public InvoiceController(IPaperworkFactory factory) => _factory = factory;

    [HttpGet("invoice/{id}")]
    public async Task<IActionResult> Invoice(int id)
    {
        var pdf = await _factory.NewDocument()
            .WithLayoutFile("Templates/invoice.html")
            .WithData("model", GetInvoice(id))
            .BuildBytesAsync();

        return File(pdf, "application/pdf", $"invoice-{id}.pdf");
    }
}
```

### Configuration

Fonts, images, parsing, output and logging options for every document are read from the `"Paperwork"` section of the configuration (the `"Scryber"` section is also read, and `"Paperwork"` values replace any that are in both).

```json
{
  "Paperwork": {
    "Fonts": {
      "Register": [
        { "Family": "Open Sans", "File": "Fonts/OpenSans-Regular.ttf" }
      ]
    },
    "Parsing": {
      "Namespaces": [
        { "Source": "http://mycompany.com/components", "Namespace": "MyCompany.Components", "Assembly": "MyCompany" }
      ]
    }
  }
}
```

`AddPaperwork(configuration)` passes the configuration to the engine. Without dependency injection, do it once at startup:

```csharp
var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

PaperworkConfiguration.Init(configuration);
```

See [Configuration Structure](/paperwork.core/configuration/configuration-structure) for all the sections.

---

## The document builder

`factory.NewDocument()` starts a new builder. Each method adds to the document and returns the builder, so they can be chained, and a builder generates one document.

### Layouts

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

### Styles

Stylesheets added to the document, as well as any in the template.

| Method | Description |
|--------|-------------|
| `WithStyle(css, name)` | CSS as a string |
| `WithStyle(stream, name)` | CSS from a stream |
| `WithStyleFile(path, name)` | CSS from a file. Relative urls are found next to the file |
| `WithStyleUrl(url, name, auth)` | CSS loaded from a url |
| `WithStyle(styleGroup)` | Styles built in code |

### Data

Data is referred to in the template by its name, e.g. `{% raw %}{{model.customer.name}}{% endraw %}`. See the [binding reference](/paperwork.core/reference/binding/).

| Method | Description |
|--------|-------------|
| `WithData(name, object)` | Any .NET object - classes, anonymous objects, lists, dictionaries |
| `WithData(name, json)` | JSON as a string |
| `WithData(name, stream)` | JSON from a stream |
| `WithDataFile(name, path)` | JSON from a file |
| `WithDataUrl(name, url, auth)` | JSON loaded from a url, optionally with an authentication name |

### Fields

Single values, available in the template as `{% raw %}{{$fields["id"]}}{% endraw %}`.

| Method | Description |
|--------|-------------|
| `WithField(id, value, type)` | Sets a field value |

### Options

| Method | Description |
|--------|-------------|
| `WithLogLevel(level)` | Appends the generation log to the end of the document - `Off`, `Errors`, `Warnings`, `Messages`, `Verbose`. The default uses the template's own setting |
| `UseAsync()` | Generates with the engine's asynchronous path, e.g. in Blazor WebAssembly |

### Output

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

A template saved from the Paperwork designer, or as a template configuration file, holds its layouts, styles, data and fields together. Start a builder from it, then add or replace values before generating.

```csharp
using var config = File.OpenRead("invoice-template.json");

await factory.FromConfig(config)
    .WithData("model", invoice)
    .WithField("date", "2026-03-25")
    .SaveAsync("invoice.pdf");
```

`FromDefinition` does the same from a template definition. Nested field values in the file are kept as they are.

---

## See also

- [Quick Start](/paperwork.core/quickstart/quickstart_core)
- [The Engine Document](/paperwork.core/configuration/engine-document) - configuring a document in code
- [Request Events and DOM](/paperwork.core/configuration/document-events-and-access) - loading content from your own sources
- [Binding reference](/paperwork.core/reference/binding/)
