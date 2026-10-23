---
layout: default
title: Production & Deployment
nav_order: 7
parent: Document Configuration
parent_url: /paperwork.core/learning/07-configuration/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Production & Deployment

Set up document generation for production: configuration, error handling, monitoring, deployment and troubleshooting.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Configure Paperwork.Core for production
- Handle and report failures
- Monitor generation with logs, metrics and health checks
- Deploy to servers and containers, with the fonts you need
- Troubleshoot common problems

---

## Production Configuration

### Startup

Register the factory once, with the application's configuration.

```csharp
using Paperwork.Generation;

var builder = WebApplication.CreateBuilder(args);

// The factory, reading the "Paperwork" configuration section
builder.Services.AddPaperwork(builder.Configuration);
```

The factory uses an `HttpClient` registered with the application for remote templates, data, images and fonts, or its own if none is registered. Register one to set a timeout or default headers.

### appsettings.Production.json

```json
{
  "Paperwork": {
    "Fonts": {
      "UseSystemFonts": false,
      "Register": [
        { "Family": "Open Sans", "File": "Fonts/OpenSans-Regular.ttf" },
        { "Family": "Open Sans", "File": "Fonts/OpenSans-Bold.ttf", "Weight": 700 }
      ]
    },
    "Imaging": {
      "AllowMissingImages": true,
      "ImageCacheDuration": 60
    },
    "Tracing": {
      "TraceLevel": "Warnings"
    }
  }
}
```

- **Fonts** - register the fonts your templates use, and ship the files with the application, so every server has the same fonts. See [Font Configuration](/paperwork.core/configuration/font-configuration).
- **Imaging** - a missing image is logged rather than stopping the document, and images are re-loaded every hour.
- **Tracing** - warnings and errors only. See [Logging and Tracing](/paperwork.core/configuration/logging-extension).

See [Configuration Structure](/paperwork.core/configuration/configuration-structure) for every setting.

### Secrets

Passwords for secured documents, and keys for authenticated remote content, come from a secret store (Azure Key Vault, AWS Secrets Manager, environment variables) - never from templates or `appsettings.json`. See [Security](05_security.html).

---

## A Production Document Service

```csharp
using System.Diagnostics;
using Paperwork;
using Paperwork.Generation;
using Scryber;
using Scryber.Components;
using Scryber.Logging;

public class DocumentService
{
    private readonly IPaperworkFactory _factory;
    private readonly ILogger<DocumentService> _logger;
    private readonly string _templateFolder;

    public DocumentService(IPaperworkFactory factory, ILogger<DocumentService> logger, IConfiguration config)
    {
        _factory = factory;
        _logger = logger;
        _templateFolder = config["Documents:TemplateFolder"] ?? "Templates";
    }

    public async Task<byte[]> GenerateAsync(string templateName, object model)
    {
        var path = System.IO.Path.Combine(_templateFolder, templateName);
        var stopwatch = Stopwatch.StartNew();

        using var doc = Document.ParseDocument(path);

        var log = new CollectorTraceLog(TraceRecordLevel.Warnings, templateName, autostart: true);
        doc.AddTraceLog(log);

        var result = await _factory.NewDocument()
            .WithLayout(doc)
            .WithData("model", model)
            .BuildAsync();

        stopwatch.Stop();

        foreach (var entry in log)
            _logger.LogWarning("{Template} [{Level}] {Category}: {Message}",
                templateName, entry.Level, entry.Category, entry.Message);

        if (!result.Success)
        {
            _logger.LogError("{Template} failed after {Ms} ms: {Code} {Message} {Error}",
                templateName, stopwatch.ElapsedMilliseconds, result.ResultCode, result.Message, result.Error);
            throw new DocumentGenerationException(templateName, result.Message);
        }

        _logger.LogInformation("{Template} generated in {Ms} ms, {Kb} KB",
            templateName, stopwatch.ElapsedMilliseconds, result.Document.Binary.Length / 1024);

        return result.Document.Binary;
    }
}

public class DocumentGenerationException : Exception
{
    public DocumentGenerationException(string template, string message)
        : base($"The document '{template}' could not be generated: {message}") { }
}
```

`Document.ParseDocument` throws a `Scryber.PDFParserException` if the template itself is invalid. See [Error Handling & Conformance](03_error_handling_conformance.html).

---

## Monitoring

### Logs

Send the warnings and errors from each document to your logging system, as above, with the template name and an identifier for the data, so problems can be traced back to a document.

### Metrics

Record for each document:
- Generation time
- File size
- Success or failure, by template
- The number of warnings

### Health check

A health check that generates a small document confirms the engine, fonts and configuration are working.

```csharp
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Paperwork;

public class DocumentHealthCheck : IHealthCheck
{
    private const string Template =
        "<html xmlns='http://www.w3.org/1999/xhtml'><body><p>Health check</p></body></html>";

    private readonly IPaperworkFactory _factory;

    public DocumentHealthCheck(IPaperworkFactory factory) => _factory = factory;

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        var result = await _factory.NewDocument()
            .WithLayout(Template)
            .BuildAsync();

        return result.Success
            ? HealthCheckResult.Healthy("Document generation is working")
            : HealthCheckResult.Unhealthy($"Document generation failed: {result.Message}");
    }
}

// Program.cs
builder.Services.AddHealthChecks()
    .AddCheck<DocumentHealthCheck>("documents");
```

---

## Deployment

### Files to deploy

Templates, stylesheets, images and fonts are content files. Copy them to the output in the project file:

```xml
<ItemGroup>
  <Content Include="Templates/**/*.*" CopyToOutputDirectory="PreserveNewest" />
  <Content Include="Fonts/**/*.*" CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```

Template paths are relative to the working directory - use paths from the application's base folder, or configuration, so they work wherever the application runs.

```csharp
var path = System.IO.Path.Combine(AppContext.BaseDirectory, "Templates", "invoice.html");
```

### Docker

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish "DocumentService/DocumentService.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "DocumentService.dll"]
```

Container images have few or no fonts installed. Either register font files that are deployed with the application (recommended, as above), or install font packages in the image:

```dockerfile
RUN apt-get update && apt-get install -y fonts-liberation fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*
```

The standard fonts - Helvetica, Times and Courier - always work, as they need no font files.

### Blazor WebAssembly

In the browser, use `UseAsync()` on the builder so remote content is loaded without blocking.

```csharp
var pdf = await factory.NewDocument()
    .WithLayoutUrl("https://example.com/templates/invoice.html")
    .WithData("model", invoice)
    .UseAsync()
    .BuildBytesAsync();
```

---

## Scaling

- One factory for the application - see [Optimization & Performance](06_optimization_performance.html).
- Limit how many documents are generated at once.
- Generate large or slow documents in a background worker from a queue, and let the user download the result when it is ready.
- Generation keeps no state between documents, so more instances can be added behind a load balancer.

---

## Troubleshooting

### Text in the wrong font

**Symptoms:** text appears in a different font, or a log entry says a font could not be loaded and Courier was used.

**Solutions:**
- Register the font file in configuration, at every weight and style the template uses
- Check the font files are deployed, and the paths are correct on the server
- Use the standard fonts for a quick check

### Images missing

**Symptoms:** blank areas where images should be; a log entry *Could not load the image for component ...*

**Solutions:**
- Check relative paths - they are relative to the template file
- Check the server can reach remote urls
- Use a [file request service](/paperwork.core/configuration/document-events-and-access) for images that need authentication

### Template not found

**Symptoms:** a `FileNotFoundException` from `WithLayoutFile` or `Document.ParseDocument`.

**Solutions:**
- Check the templates are copied to the output
- Use paths from `AppContext.BaseDirectory`, not the working directory
- Check file permissions on Linux

### Slow generation

**Solutions:**
- Append the log and check the Performance Metrics table
- Resize large images
- Reduce the log level
- Move slow documents to a background queue

### Out of memory

**Solutions:**
- Limit concurrent generation
- Dispose of engine `Document` objects
- Split very large documents
- Give the container more memory

---

## Production Checklist

### Before Deployment

- [ ] One factory registered with `AddPaperwork(configuration)`
- [ ] Fonts registered and deployed with the application
- [ ] Templates and assets copied to the output
- [ ] Log level `Warnings`, entries sent to the logging system
- [ ] Failures handled and reported
- [ ] Secrets from a secret store
- [ ] Health check added
- [ ] Concurrency limited

### After Deployment

- [ ] Health check passing
- [ ] Documents generated with real data and checked
- [ ] Fonts and images correct on the server
- [ ] Generation times and file sizes recorded
- [ ] Alerts set for failures

---

## Next Steps

You've completed the Document Configuration series! Continue with:

1. **[Practical Applications](/paperwork.core/learning/08-practical/)** - Real-world document examples
2. **[The Engine Document](/paperwork.core/configuration/engine-document)** - Configuring documents in code

---

**Continue learning →** [Practical Applications Series](/paperwork.core/learning/08-practical/)
