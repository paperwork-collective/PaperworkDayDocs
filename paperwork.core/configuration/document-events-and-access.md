---
layout: default
title: Request Events and DOM
parent: Configuration & Extension
parent_url: /paperwork.core/configuration
nav_order: 2
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Document Remote Request Events and the Document Object Model (DOM)

Both work with a parsed engine `Document`: handling requests for external content, and finding and changing the content of the document before it is generated with the builder (see [The Engine Document](engine-document)).

---

## Contents

1. [Remote File Request Event](#remote-file-request-event) - RemoteFileRegistered
2. [Finding Components by ID](#finding-components-by-id) - DOM navigation

---

### Remote File Request Event

The engine `Document` raises an event when external content (stylesheets, fonts, images and iframe content) needs to be loaded. Handling it lets you load content from your own locations - a database, cloud storage, a CMS, or a custom path such as `asset://` - instead of the file system or the web.

**Event: `RemoteFileRegistered`**
- Raised once for each external path when the document is generated
- Access via: `doc.RemoteFileRegistered += handler`
- If the handler does nothing with the request, it is loaded in the normal way

The handler is a **requestor**: it loads the content for the path, and passes it back to the request as a stream. The document then reads the stream in the way it needs for that type of content - parsing a stylesheet, loading a font, decoding an image.

```csharp
doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;

    if (request.FilePath.StartsWith("asset://"))
    {
        using var stream = LoadAsset(request.FilePath);

        // Pass the content back to the document
        request.Callback(request.Owner, request, stream);
    }
    // Any other path - do nothing, and it is loaded as normal
};
```

**The request:**

| Member | Description |
|---|---|
| `FilePath` | The path being requested, as it appears in the template |
| `ResourceType` | The type of content requested, e.g. `CSSLink`, `Font`, `XObject` (an image), or the mime type of iframe content |
| `Owner` | The component that requested the content |
| `Callback(owner, request, stream)` | Passes the loaded content to the document, which reads it and completes the request |
| `CompleteRequest(null, false, error)` | Completes the request as failed, with the reason |

The document is generated with the builder as normal, by passing it to `WithLayout(doc)`. See [The Engine Document](engine-document).

---

### Handling Remote File Requests

#### Example: Loading from a custom path

Stylesheets, fonts, images and iframe content in the template can all use a custom path, and be loaded by the same handler.

```html
<head>
    <link rel='stylesheet' href='asset://styles/brand.css' />
    <style>
        @font-face { font-family: 'Brand'; src: url('asset://fonts/Brand-Regular.ttf'); }
    </style>
</head>
<body>
    <img src='asset://images/logo.png' />
    <iframe src='asset://parts/terms.html'></iframe>
</body>
```

```csharp
using Scryber.Components;

using var doc = Document.ParseDocument("template.html");

doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;
    string filePath = request.FilePath;

    if (!filePath.StartsWith("asset://"))
        return; // not ours - processing will continue as normal

    try
    {
        // asset://images/logo.png -> /var/assets/images/logo.png
        string localPath = System.IO.Path.Combine("/var/assets", filePath.Substring("asset://".Length));

        using var stream = File.OpenRead(localPath);
        request.Callback(request.Owner, request, stream);

        Console.WriteLine($"Loaded {request.ResourceType}: {filePath}");
    }
    catch (Exception ex)
    {
        // report the error, and stop any further processing of this request
        request.CompleteRequest(null, false, ex);
    }
};

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");
```

#### Example: Images from a database

The content is passed back as a stream, so it can come from anywhere.

```csharp
using var doc = Document.ParseDocument("template.html");

doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;

    // <img src='db://products/12345.png' />
    if (request.FilePath.StartsWith("db://"))
    {
        try
        {
            byte[] imageData = LoadProductImage(request.FilePath);

            using var stream = new MemoryStream(imageData);
            request.Callback(request.Owner, request, stream);
        }
        catch (Exception ex)
        {
            request.CompleteRequest(null, false, ex);
        }
    }
};

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");

byte[] LoadProductImage(string path)
{
    // Your database logic
    return File.ReadAllBytes("product.png");
}
```

#### Example: Iframe Content Filtering

Content can be checked or changed before it is passed back.

```csharp
using var doc = Document.ParseDocument("template.html");

doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;
    string filePath = request.FilePath;

    // Intercept iframe/embed content requests
    if (filePath.EndsWith(".html"))
    {
        Console.WriteLine($"Loading iframe content: {filePath}");

        try
        {
            // Apply security checks
            if (!IsAllowedSource(filePath))
            {
                request.CompleteRequest(null, false, new UnauthorizedAccessException("Content source not allowed"));
                return;
            }

            // Load and sanitize HTML content
            string content = File.ReadAllText(filePath);
            content = SanitizeHtmlContent(content);

            // Provide sanitized content
            using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(content));
            request.Callback(request.Owner, request, stream);
        }
        catch (Exception ex)
        {
            request.CompleteRequest(null, false, ex);
        }
    }
};

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");

bool IsAllowedSource(string path)
{
    // Your security logic
    return true;
}

string SanitizeHtmlContent(string html)
{
    // Your sanitization logic
    return html;
}
```

---

### Images and image types

Images are decoded by the document's image factories, which are matched on the path. A path that ends with a standard image extension (`.png`, `.jpg`, `.jpeg`, `.gif`, `.tif`, `.tiff`, `.webp`, `.svg`) needs nothing more than the handler above.

If the image path does not end with a known extension, such as `db://products/12345`, an image factory must also be registered to match the path and decode the content. The handler is the **requestor** for the path, and the image factory is the **handler** for the type. See [Image Factories](image-factories).

{: .note}
> Fonts and images can be cached by the engine across multiple documents.
>
> So it may be a new document will not need to request the same path again, and will use the content previously loaded.

---

## Finding Components by ID

Navigate the document hierarchy to find components by their ID attribute.
This allows direct manipulation of the DOM - adding, removing and updating components as needed after the template has been parsed.

This same functionality can also be achieved by binding dynamic contents to any document model in the parameters, but sometimes it is easier just to write the code. 
Specifically if you want to modify all the templates, in the same way, at runtime with a specific request mechanism. e.g Add a 'NOT-PUBLISHED' watermark, on documents that come from a development environment.

#### Using FindAComponentById

```csharp
using Scryber.Components;

var doc = Document.ParseDocument("template.html");

// Find a specific component by ID - <label id="CustomerLabel"></label> in the template
var customerLabel = doc.FindAComponentById("CustomerLabel") as Label;
if (customerLabel != null)
{
    customerLabel.Text = "Acme Corporation";
    Console.WriteLine("Updated customer label");
}

// Find and modify a table - <table id="InvoiceItems"> in the template
var invoiceTable = doc.FindAComponentById("InvoiceItems") as TableGrid;
if (invoiceTable != null)
{
    Console.WriteLine($"Invoice table has {invoiceTable.Rows.Count} rows");
    
    // Add a row programmatically
    var newRow = new TableRow();
    newRow.Cells.Add(new TableCell { Contents = { new TextLiteral("New Item") } });
    invoiceTable.Rows.Add(newRow);
}

// Find any component type
var headerPanel = doc.FindAComponentById("HeaderPanel") as Panel;
if (headerPanel != null)
{
    headerPanel.Visible = false; // Hide the header
}

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");
```

#### Searching with TryFindComponentById

```csharp
var doc = Document.ParseDocument("template.html");

// Safe lookup with TryFind pattern - <label id="ReportTitle"></label> in the template
if (doc.TryFindAComponentById("ReportTitle", out Label titleLabel))
{
    titleLabel.Text = "Q4 Financial Report";
}
else
{
    Console.WriteLine("ReportTitle component not found or wrong type");
}
```

---

#### Complete Example: Dynamic Document Manipulation

```csharp
using Scryber;
using Scryber.Components;
using System.Linq;

var doc = Document.ParseDocument("invoice-template.html");

// Walk the parsed component tree
var allComponents = AllComponents(doc).ToList();

// Now search and manipulate
Console.WriteLine($"Total components in document: {allComponents.Count}");

// Find and update specific components
// <label id="CompanyName"></label> and <label id="InvoiceNumber"></label> in the template
var companyName = doc.FindAComponentById("CompanyName") as Label;
if (companyName != null)
{
    companyName.Text = "Acme Corporation";
}

var invoiceNumber = doc.FindAComponentById("InvoiceNumber") as Label;
if (invoiceNumber != null)
{
    invoiceNumber.Text = $"INV-{DateTime.Now:yyyyMMdd}-001";
}

// Find all image components
var allImages = allComponents.OfType<Image>().ToList();
Console.WriteLine($"Document contains {allImages.Count} images");
foreach (var img in allImages)
{
    Console.WriteLine($"  - {img.Source}");
    img.AllowMissingImages = true; // Make all images optional
}

// Find all tables
var allTables = allComponents.OfType<TableGrid>().ToList();
Console.WriteLine($"Document contains {allTables.Count} tables");

// Bind data and generate
await factory.NewDocument()
    .WithLayout(doc)
    .WithData("invoice", GetInvoiceData())
    .SaveAsync("invoice-output.pdf");

static IEnumerable<IComponent> AllComponents(IComponent parent)
{
    yield return parent;
    if (parent is IContainerComponent container && container.HasContent)
    {
        foreach (IComponent child in container.Content)
            foreach (var found in AllComponents(child))
                yield return found;
    }
}

object GetInvoiceData()
{
    return new
    {
        number = "12345",
        date = DateTime.Now,
        items = new[]
        {
            new { description = "Consulting Services", amount = 5000.00m },
            new { description = "Software License", amount = 1200.00m }
        }
    };
}
```

### Advanced Pattern: Resource Loading Pipeline

A reusable requestor with caching, custom paths and retries for remote content.

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using Scryber;
using Scryber.Components;

public class ResourceLoadingPipeline
{
    private readonly Dictionary<string, byte[]> _cache = new Dictionary<string, byte[]>();
    private readonly HttpClient _httpClient = new HttpClient();

    public void ConfigureDocument(Document doc)
    {
        doc.RemoteFileRegistered += OnRemoteFileRegistered;
    }

    private void OnRemoteFileRegistered(object sender, RemoteFileRequestEventArgs args)
    {
        var request = args.Request;
        string filePath = request.FilePath;

        try
        {
            byte[] data = null;

            // Check cache first
            if (_cache.TryGetValue(filePath, out byte[] cachedData))
            {
                data = cachedData;
            }
            // Handle custom URI schemes
            else if (filePath.StartsWith("asset://"))
            {
                data = File.ReadAllBytes(ResolveAssetPath(filePath));
                _cache[filePath] = data;
            }
            // Handle remote resources with retries
            else if (filePath.StartsWith("https://"))
            {
                data = DownloadWithRetry(filePath, maxRetries: 3);
                _cache[filePath] = data;
            }

            if (data != null)
            {
                using var stream = new MemoryStream(data);
                request.Callback(request.Owner, request, stream);
                Console.WriteLine($"[LOADED] {request.ResourceType} {filePath} ({data.Length} bytes)");
            }
            // otherwise not handled, and loaded as normal
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[FAILED] {filePath}: {ex.Message}");
            request.CompleteRequest(null, false, ex);
        }
    }

    private string ResolveAssetPath(string assetUri)
    {
        // asset://fonts/roboto.ttf → /var/assets/fonts/roboto.ttf
        string path = assetUri.Substring("asset://".Length);
        return System.IO.Path.Combine("/var/assets", path);
    }

    private byte[] DownloadWithRetry(string url, int maxRetries)
    {
        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                return _httpClient.GetByteArrayAsync(url).Result;
            }
            catch
            {
                if (i == maxRetries - 1) throw;
                System.Threading.Thread.Sleep(1000 * (i + 1)); // Back off before retrying
            }
        }
        throw new Exception("Max retries exceeded");
    }
}
```

**Usage:**

```csharp
using var doc = Document.ParseDocument("template.html");

var pipeline = new ResourceLoadingPipeline();
pipeline.ConfigureDocument(doc);

await factory.NewDocument()
    .WithLayout(doc)
    .WithData("data", GetData())
    .SaveAsync("output.pdf");
```

## Related Documentation

- [Processing Instructions](processing-instructions) - Specifying controllers
- [Custom Components](custom-components) - Using controllers with custom components
- [Integration Example](integration-example) - Complete working example
- [Best Practices](best-practices) - Controller design patterns
- [Image Factories](image-factories) - Custom image loading mechanisms
- [Font Configuration](font-configuration) - Managing font resources
