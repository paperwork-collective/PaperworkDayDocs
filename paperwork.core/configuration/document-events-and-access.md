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

They both revolve around a parsed document instance, these provides ways to extract and interact with the underlying content and handle requests for external content.

---

## Contents

1. [Remote File Request Event](#remote-file-request-event) - RemoteFileRegistered
2. [Finding Components by ID](#finding-components-by-id) - DOM navigation

---

### Remote File Request Event

The Document instance fires an event when external resources (fonts, images, stylesheets, iframe content) need to be loaded:

**Event: `RemoteFileRegistered`**
- Fires when a remote resource is requested during document processing
- Allows custom resource resolution, caching, or providing alternative content
- **Call `args.Request.CompleteRequest()` to signal completion** after handling
- Access via: `doc.RemoteFileRegistered += handler`
- If the request is not completed, then processing will continue to happen in the normal manner.


**Event Args:**
```csharp
public class RemoteFileRequestedEventArgs : EventArgs
{
    public IRemoteFileRequest Request { get; }     // The request object with methods and properties
    
    // Request properties/methods:
    // - Request.FilePath: The path being requested
    // - Request.CompleteRequest(): Call this when done handling the request
    // - Use Request.CompleteRequest(Stream, true, null): If successful
    // - Use Request.CompleteRequest(null, false, error.Message): If it failed.
}
```

---

### Handling Remote File Requests

Control how external resources (fonts, images, iframes) are loaded and processed.

#### Example: Custom Font Loading

```csharp
using Scryber.Components;
using System.IO;

var doc = Document.ParseDocument("template.html");

// Intercept font requests to provide custom loading
doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;
    string filePath = request.FilePath;
    
    // Check if requesting a font file
    if (filePath.EndsWith(".ttf") || filePath.EndsWith(".otf") || filePath.EndsWith(".woff"))
    {
        Console.WriteLine($"Font requested: {filePath}");
        
        try
        {
            // Option 1: Load from custom location
            if (filePath.StartsWith("fonts://"))
            {
                // Custom URI scheme - resolve to actual path
                string fontId = filePath.Substring(8);
                string actualPath = ResolveFontFromDatabase(fontId);
                byte[] fontData = File.ReadAllBytes(actualPath);

                // Success, so we can complete.
                request.CompleteRequest(fontData, true);

                Console.WriteLine($"  ✓ Loaded from DB: {actualPath}");
            }
            // Option 2: Load from cache
            else if (filePath.Contains("cached-font"))
            {
                byte[] cachedFontData = LoadFromCache(filePath);
                if(null != cachedFontData)
                {
                    request.CompleteRequest(cachedFontData, true);
                    Console.WriteLine($"  ✓ Served from cache: {filePath}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"  ✗ Could not load font : {ex.Message}");

            //report the error and stop any further processing,
            request.CompleteRequest(null, false, ex);
        }
        
    }
    // Not a font - the processing will continue as normal
};

doc.SaveAsPDF("output.pdf");

string ResolveFontFromDatabase(string fontId)
{
    // Your custom font resolution logic
    return $"/var/fonts/{fontId}.ttf";
}

byte[] LoadFromCache(string path)
{
    // Your caching logic
    return File.ReadAllBytes(path);
}
```

----

#### Example: Image Request Interception

```csharp
var doc = Document.ParseDocument("template.html");

// Create image cache
var imageCache = new Dictionary<string, byte[]>();

doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;
    string filePath = request.FilePath;
    
    // Intercept image requests
    if (filePath.EndsWith(".jpg") || filePath.EndsWith(".png") || filePath.EndsWith(".gif"))
    {
        Console.WriteLine($"Image requested: {filePath}");
        
        try
        {
            // Check cache first
            if (imageCache.TryGetValue(filePath, out byte[] cachedImage))
            {
                Console.WriteLine($"  → Serving from cache for {filePath}");
                request.CompleteRequest(new MemoryStream(cachedImage), true);
            }
            // Handle remote URLs with custom logic
            else if (filePath.StartsWith("http://") || filePath.StartsWith("https://"))
            {
                // Add authentication headers, implement retry logic, etc.
                byte[] imageData = DownloadImageWithAuth(filePath);
                imageCache[filePath] = imageData; // Cache for future use
                request.CompleteRequest(new MemoryStream(imageData), true);
                Console.WriteLine($"  → Downloaded and cached");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"  ✗ Failed to load: {ex.Message}");
            request.CompleteRequest(null, false, ex);
        }
    }
    // don't want to handle this request, so let processing continue as normal.
};

doc.SaveAsPDF("output.pdf");

byte[] DownloadImageWithAuth(string url)
{
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_TOKEN");
        return client.GetByteArrayAsync(url).Result;
    }
}
```

#### Example: Iframe Content Filtering

```csharp
var doc = Document.ParseDocument("template.html");

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
                Console.WriteLine($"  ✗ Source not allowed");
                request.Cancel("Content source not allowed");
                request.CompleteRequest(null, false, null);
                return;
            }
            
            // Load and sanitize HTML content
            string content = File.ReadAllText(filePath);
            content = SanitizeHtmlContent(content);
            
            // Provide sanitized content
            byte[] modifiedBytes = System.Text.Encoding.UTF8.GetBytes(content);
            request.CompleteRequest(new MemoryStream(modifiedBytes), true, null);
            Console.WriteLine($"  ✓ Content loaded and sanitized");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"  ✗ Error: {ex.Message}");
            request.CompleteRequest(null, false, ex);
        }
    }
};

doc.SaveAsPDF("output.pdf");

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

### Expected types

For all requests, the returned data can either be a `byte[]` or a `System.IO.Stream`. These will be converted to the approprite instance required by the calling request, and re-used by the library for matching paths in future.

{: .note}
> Fonts and images can be cached by the engine across multiple documents. 
>
> So it may be a new document will not need to request the custom font, and use the same one previously loaded from a separate request invocation.

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


// Find a specific component by ID
var customerLabel = doc.FindAComponentById("CustomerLabel") as Label;
if (customerLabel != null)
{
    customerLabel.Text = "Acme Corporation";
    Console.WriteLine("Updated customer label");
}

// Find and modify a table
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

doc.SaveAsPDF("output.pdf");
```

#### Searching with TryFindComponentById

```csharp
var doc = Document.ParseDocument("template.html");

// Safe lookup with TryFind pattern
IComponent component;
if (doc.TryFindComponentById("ReportTitle", out component) && component is Label titleLabel)
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
using Scryber.Components;
using System.Linq;

var doc = Document.ParseDocument("invoice-template.html");

// Track all components as they're registered
var allComponents = new List<IComponent>();
doc.ComponentRegistered += (sender, args) => allComponents.Add(args.Component);


// Now search and manipulate
Console.WriteLine($"Total components in document: {allComponents.Count}");

// Find and update specific components
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
doc.Params["invoice"] = GetInvoiceData();
doc.SaveAsPDF("invoice-output.pdf");

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

Complete control over document resource loading with fallbacks and caching.

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;

public class ResourceLoadingPipeline
{
    private readonly Dictionary<string, byte[]> _cache = new Dictionary<string, byte[]>();
    private readonly HttpClient _httpClient = new HttpClient();
    
    public void ConfigureDocument(Document doc)
    {
        doc.RemoteFileRegistered += OnRemoteFileRegistered;
    }
    
    private void OnRemoteFileRegistered(object sender, RemoteFileRequestedEventArgs args)
    {
        var request = args.Request;
        string filePath = request.FilePath;
        
        Console.WriteLine($"[REQUEST] {filePath}");
        
        try
        {
            // Check cache first
            if (_cache.TryGetValue(filePath, out byte[] cachedData))
            {
                Console.WriteLine($"  ✓ Served from cache ({cachedData.Length} bytes)");
                request.CompleteRequest(new MemoryStream(cachedData), true, null);
            }
            // Handle custom URI schemes
            else if (filePath.StartsWith("asset://"))
            {
                string assetPath = ResolveAssetPath(filePath);
                byte[] assetData = File.ReadAllBytes(assetPath);
                _cache[filePath] = assetData;
                request.CompleteRequest(new MemoryStream(assetData), true, null);
                Console.WriteLine($"  ✓ Loaded from asset system ({assetData.Length} bytes)");
            }
            // Handle remote resources with authentication
            else if (filePath.StartsWith("https://"))
            {
                byte[] remoteData = DownloadWithRetry(filePath, maxRetries: 3);
                _cache[filePath] = remoteData;
                request.CompleteRequest(new MemoryStream(remoteData), true, null);
                Console.WriteLine($"  ✓ Downloaded from remote ({remoteData.Length} bytes)");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"  ✗ Error: {ex.Message}");
            request.CompleteRequest(null, false, ex);
        }
    }
    
    
    private string ResolveAssetPath(string assetUri)
    {
        // asset://fonts/roboto.ttf → /var/assets/fonts/roboto.ttf
        string path = assetUri.Substring(8);
        return Path.Combine("/var/assets", path);
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
                System.Threading.Thread.Sleep(1000 * (i + 1)); // Exponential backoff
            }
        }
        throw new Exception("Max retries exceeded");
    }
}

// Usage
var doc = Document.ParseDocument("template.html");
var pipeline = new ResourceLoadingPipeline();
pipeline.ConfigureDocument(doc);

doc.Params["data"] = GetData();
doc.SaveAsPDF("output.pdf");
```

## Related Documentation

- [Processing Instructions](processing-instructions) - Specifying controllers
- [Custom Components](custom-components) - Using controllers with custom components
- [Integration Example](integration-example) - Complete working example
- [Best Practices](best-practices) - Controller design patterns
- [Image Factories](image-factories) - Custom image loading mechanisms
- [Font Configuration](font-configuration) - Managing font resources
