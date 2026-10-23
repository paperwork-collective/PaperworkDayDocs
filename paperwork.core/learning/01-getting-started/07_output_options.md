---
layout: default
title: Output Options
nav_order: 7
parent: Getting Started
parent_url: /paperwork.core/learning/01-getting-started/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Output Options

Master different ways to save, stream, and configure PDF output.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Save PDFs to files and streams
- Return PDFs from web applications
- Configure PDF output settings
- Set document properties and metadata
- Handle output errors gracefully

---

## Saving to File

### Basic File Save

```csharp
await factory.NewDocument()
    .WithLayoutFile("template.html")
    .SaveAsync("output.pdf");
```

### With Full Path

```csharp
string outputPath = Path.Combine(
    Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
    "output.pdf"
);

await factory.NewDocument()
    .WithLayoutFile("template.html")
    .SaveAsync(outputPath);

Console.WriteLine($"PDF saved to: {outputPath}");
```

### Safe File Save with Error Handling

```csharp
public async Task<bool> SavePdfSafely(IDocumentBuilder builder, string outputPath)
{
    try
    {
        // Ensure directory exists
        string directory = Path.GetDirectoryName(outputPath);
        if (!Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        // Save PDF
        await builder.SaveAsync(outputPath);

        Console.WriteLine($"PDF saved: {outputPath}");
        return true;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error saving PDF: {ex.Message}");
        return false;
    }
}
```

---

## In-Memory Output

### As a Byte Array

```csharp
byte[] pdfBytes = await factory.NewDocument()
    .WithLayoutFile("template.html")
    .BuildBytesAsync();

// Use bytes (e.g., save, send, upload)
File.WriteAllBytes("output.pdf", pdfBytes);
```

### As a Result

`BuildAsync` does not throw when generation fails. It returns a `PaperworkResult` to check.

```csharp
PaperworkResult result = await factory.NewDocument()
    .WithLayoutFile("template.html")
    .BuildAsync();

if (result.Success)
{
    byte[] pdfBytes = result.Document.Binary;
}
else
{
    Console.WriteLine($"{result.Message} {result.Error}");
}
```

### ASP.NET Core - Return PDF from Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using Paperwork;

public class PdfController : Controller
{
    private readonly IPaperworkFactory _factory;

    public PdfController(IPaperworkFactory factory)
    {
        _factory = factory;
    }

    [HttpGet("invoice/{id}")]
    public async Task<IActionResult> GenerateInvoice(int id)
    {
        var invoice = GetInvoiceData(id);

        byte[] pdf = await _factory.NewDocument()
            // Load template
            .WithLayoutFile("./Templates/invoice.html")
            // Pass data
            .WithData("model", invoice)
            // Generate PDF to memory
            .BuildBytesAsync();

        // Return as file download
        return File(pdf, "application/pdf", $"invoice-{id}.pdf");
    }
}
```

The factory is registered at startup, see [Service Registration](#service-registration) below.

### ASP.NET Core - Force Download vs Inline Display

```csharp
public async Task<IActionResult> DownloadPdf()
{
    var pdfBytes = await GeneratePdfBytes();

    // Force download
    return File(pdfBytes, "application/pdf", "document.pdf");
}

public async Task<IActionResult> ViewPdf()
{
    var pdfBytes = await GeneratePdfBytes();

    // Display inline in browser
    return File(pdfBytes, "application/pdf");
}
```

---

## ASP.NET Core Integration

### Service Registration

```csharp
// Program.cs
using Paperwork.Generation;

builder.Services.AddControllers();

// Used to load remote fonts, images and stylesheets
builder.Services.AddSingleton(new HttpClient());

// Register the Paperwork factory as IPaperworkFactory
builder.Services.AddPaperwork();

// Register your own PDF service
builder.Services.AddScoped<IPdfService, PdfService>();
```

### PDF Service Pattern

```csharp
public interface IPdfService
{
    Task<byte[]> GeneratePdf(string templatePath, object data);
}

public class PdfService : IPdfService
{
    private readonly IPaperworkFactory _factory;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<PdfService> _logger;

    public PdfService(
        IPaperworkFactory factory,
        IWebHostEnvironment env,
        ILogger<PdfService> logger)
    {
        _factory = factory;
        _env = env;
        _logger = logger;
    }

    public async Task<byte[]> GeneratePdf(string templatePath, object data)
    {
        try
        {
            // Resolve template path
            string fullPath = Path.Combine(
                _env.ContentRootPath,
                "Templates",
                templatePath
            );

            // Generate PDF
            return await _factory.NewDocument()
                .WithLayoutFile(fullPath)
                .WithData("model", data)
                .BuildBytesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating PDF from {Template}", templatePath);
            throw;
        }
    }
}
```

### Controller Usage

```csharp
public class ReportController : Controller
{
    private readonly IPdfService _pdfService;

    public ReportController(IPdfService pdfService)
    {
        _pdfService = pdfService;
    }

    [HttpGet("monthly-report")]
    public async Task<IActionResult> MonthlyReport()
    {
        var data = GetMonthlyData();

        byte[] pdf = await _pdfService.GeneratePdf("monthly-report.html", data);

        return File(pdf, "application/pdf", "monthly-report.pdf");
    }
}
```

---

## Document Properties and Metadata

The title of the PDF comes from the `<title>` in the template, which can be bound to data, e.g. `{% raw %}<title>{{model.title}}</title>{% endraw %}`.

For other metadata and output settings, parse the template into an engine `Document`, set its properties, and pass it to the builder with `WithLayout(doc)`.

### Setting Document Information

```csharp
using Scryber.Components;

var doc = Document.ParseDocument("template.html");

// Basic metadata
doc.Info.Author = "Sales Department";
doc.Info.Subject = "Q4 2024 Sales Analysis";
doc.Info.Keywords = "sales, report, quarterly, analysis";

// Creator information
doc.Info.Creator = "Sales Reporting System v2.0";

// Generate with metadata
await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("report.pdf");
```

These properties appear in PDF viewers:

![PDF Properties Dialog](../../images/pdf-properties.png)

The creation and modification dates are set automatically.

---

## Compression Settings

```csharp
var doc = Document.ParseDocument("template.html");

// Configure compression
doc.RenderOptions.Compression = OutputCompressionType.FlateDecode;

// Options:
// - None (no compression)
// - FlateDecode (default, good compression)

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");
```

---

## Output Configuration Options

### Complete Configuration Example

```csharp
var doc = Document.ParseDocument("template.html");

// Document info
doc.Info.Author = "John Doe";

// Render options
doc.RenderOptions.Compression = OutputCompressionType.FlateDecode;

// Conformance mode (Strict vs Lax)
doc.ConformanceMode = ParserConformanceMode.Lax;

// Pass data, and generate
await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", GetData())
    .SaveAsync("output.pdf");
```

---

## Batch Processing

### Generate Multiple PDFs

Create the factory once, and start a new document for each output.

```csharp
public async Task GenerateInvoiceBatch(IPaperworkFactory factory, List<Invoice> invoices, string outputDirectory)
{
    // Ensure directory exists
    Directory.CreateDirectory(outputDirectory);

    foreach (var invoice in invoices)
    {
        try
        {
            string outputPath = Path.Combine(
                outputDirectory,
                $"invoice-{invoice.Number}.pdf"
            );

            await factory.NewDocument()
                // Load template
                .WithLayoutFile("./Templates/invoice.html")
                // Pass data
                .WithData("model", invoice)
                // Save
                .SaveAsync(outputPath);

            Console.WriteLine($"Generated: {outputPath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed invoice {invoice.Number}: {ex.Message}");
        }
    }
}
```

### Parallel Processing

```csharp
public async Task GenerateBatchParallel(IPaperworkFactory factory, List<InvoiceData> invoices)
{
    var options = new ParallelOptions
    {
        MaxDegreeOfParallelism = 4 // Limit concurrent operations
    };

    await Parallel.ForEachAsync(invoices, options, async (invoice, ct) =>
    {
        try
        {
            await factory.NewDocument()
                .WithLayoutFile("template.html")
                .WithData("model", invoice)
                .SaveAsync($"invoice-{invoice.Id}.pdf");

            Console.WriteLine($"Generated invoice {invoice.Id}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed invoice {invoice.Id}: {ex.Message}");
        }
    });
}
```

---

## Azure Functions

### HTTP Trigger Function

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Paperwork;

public class PdfFunction
{
    private readonly IPaperworkFactory _factory;

    public PdfFunction(IPaperworkFactory factory)
    {
        _factory = factory;
    }

    [Function("GeneratePdf")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
    {
        // Parse request body
        var requestData = await req.ReadFromJsonAsync<PdfRequest>();

        // Generate PDF
        byte[] pdf = await _factory.NewDocument()
            .WithLayoutFile("./Templates/template.html")
            .WithData("model", requestData)
            .BuildBytesAsync();

        // Create response
        var response = req.CreateResponse(HttpStatusCode.OK);
        response.Headers.Add("Content-Type", "application/pdf");
        response.Headers.Add("Content-Disposition", "attachment; filename=document.pdf");

        await response.Body.WriteAsync(pdf);
        return response;
    }
}
```

---

## Error Handling Best Practices

### Comprehensive Error Handling

`BuildAsync` reports a failed generation in its result, so only problems before generation need a `try`/`catch`.

```csharp
public async Task<PaperworkResult> GeneratePdfSafely(IPaperworkFactory factory, string templatePath, object data)
{
    // Validate inputs
    if (string.IsNullOrEmpty(templatePath))
        throw new ArgumentNullException(nameof(templatePath));

    if (!File.Exists(templatePath))
        throw new FileNotFoundException("Template not found", templatePath);

    // Generate PDF
    return await factory.NewDocument()
        .WithLayoutFile(templatePath)
        .WithData("model", data)
        .BuildAsync();
}
```

### Usage

```csharp
var result = await GeneratePdfSafely(factory, "invoice.html", invoiceData);

if (result.Success)
{
    File.WriteAllBytes("output.pdf", result.Document.Binary);
    Console.WriteLine("PDF generated successfully");
}
else
{
    Console.WriteLine($"Error: {result.Message}");
    _logger.LogError("PDF generation failed: {Error}", result.Error);
}
```

---

## Try It Yourself

### Exercise 1: File Output Service

Create a service that:
- Accepts template path and data
- Saves to specified output directory
- Returns the full path to saved file
- Logs success/failure

### Exercise 2: Web API Endpoint

Create an ASP.NET Core endpoint that:
- Accepts JSON data in POST request
- Generates PDF from template
- Returns PDF with appropriate headers
- Handles errors gracefully

### Exercise 3: Batch Processor

Create a console application that:
- Reads a CSV file of data
- Generates one PDF per row
- Saves to organized folder structure
- Provides progress feedback

---

## Common Pitfalls

### ❌ Creating a Factory for Every Document

```csharp
foreach (var invoice in invoices)
{
    using var factory = PaperworkFactory.Create().Build();
    await factory.NewDocument().WithLayoutFile("invoice.html").WithData("model", invoice).SaveAsync($"invoice-{invoice.Number}.pdf");
}
```

✅ **Solution:** Create the factory once (or inject it), and call `NewDocument()` for each document

```csharp
using var factory = PaperworkFactory.Create().Build();

foreach (var invoice in invoices)
{
    await factory.NewDocument().WithLayoutFile("invoice.html").WithData("model", invoice).SaveAsync($"invoice-{invoice.Number}.pdf");
}
```

### ❌ Incorrect Content-Type

```csharp
return File(pdfBytes, "application/octet-stream", "doc.pdf");
```

✅ **Solution:** Use correct MIME type

```csharp
return File(pdfBytes, "application/pdf", "doc.pdf");
```

### ❌ Missing Error Handling

```csharp
await factory.NewDocument()
    .WithLayoutFile(template)
    .SaveAsync("output.pdf");
```

✅ **Solution:** Add try-catch, or use `BuildAsync` and check the result

```csharp
try
{
    await factory.NewDocument()
        .WithLayoutFile(template)
        .SaveAsync("output.pdf");
}
catch (Exception ex)
{
    _logger.LogError(ex, "PDF generation failed");
    throw;
}
```

---

## Next Steps

Now that you can handle PDF output:

1. **[Troubleshooting](08_troubleshooting.html)** - Debug common issues
2. **[Document Configuration](/paperwork.core/learning/07-configuration/)** - Advanced settings
3. **[Data Binding](/paperwork.core/learning/02-data-binding/)** - Dynamic content

---

**Continue learning →** [Troubleshooting](08_troubleshooting.html)
