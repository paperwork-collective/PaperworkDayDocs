---
layout: default
title: The Factory
parent: Quick Start
parent_url: /paperwork.core/quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 0
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# The Factory
{: .no_toc }

The factory is set up once for the application. It holds everything that is shared between documents, and starts a [document builder](/paperwork.core/quickstart/builder.html) for each one.

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

The factory holds everything shared between documents: the `HttpClient` used for remote templates, data, images and fonts, and any authentication, tracing and file-request services. Create it once and re-use it - it can be used by many documents at the same time.

## Creating a factory

```csharp
// With its own HttpClient
using var factory = PaperworkFactory.Create().Build();

// With your own HttpClient - e.g. to set a timeout or default headers
var client = new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
using var factory = PaperworkFactory.Create(client).Build();
```

## Factory options

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

## Dependency injection

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

## Configuration

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

## Next

[The Document Builder](/paperwork.core/quickstart/builder.html) collects the layouts, styles, data and fields for one document and generates it.

## See also

- [Quick Start](/paperwork.core/quickstart/quickstart_core)
- [Configuration Structure](/paperwork.core/configuration/configuration-structure)
- [The Engine Document](/paperwork.core/configuration/engine-document) - configuring a document in code
