---
layout: default
title: Troubleshooting
nav_order: 8
parent: Getting Started
parent_url: /paperwork.core/learning/01-getting-started/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Troubleshooting

Diagnose and fix common issues when generating PDF documents with Paperwork.Core.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Diagnose common PDF generation errors
- Use logging to debug issues
- Fix template and parsing problems
- Resolve path and resource loading issues
- Optimize performance

---

## Common Errors and Solutions

### Error: "Could not find file"

**Problem:** Template file not found

```
System.IO.FileNotFoundException: Could not find file 'template.html'
```

**Causes:**
- Incorrect file path
- File doesn't exist
- Wrong working directory

**Solutions:**

```csharp
// ❌ Relative path might not resolve
builder.WithLayoutFile("template.html");

// ✅ Use absolute path
string templatePath = Path.Combine(
    AppContext.BaseDirectory,
    "Templates",
    "template.html"
);
builder.WithLayoutFile(templatePath);

// ✅ Or use full path
string fullPath = Path.GetFullPath("./Templates/template.html");
builder.WithLayoutFile(fullPath);

// ✅ Check if file exists first
if (!File.Exists(templatePath))
{
    throw new FileNotFoundException($"Template not found: {templatePath}");
}
```

### Error: "Document could not be created from the layout"

**Problem:** The template could not be parsed

```
303. Document could not be created from the layout, check the syntax and sources
```

**Causes:**
- Missing `<html>` tag
- Unclosed tags in an XHTML template (one with the `xmlns` namespace)
- Invalid XML, such as an unescaped `&`

**Solutions:**

```html
<!-- ❌ Unclosed tag with the XHTML namespace -->
<html xmlns='http://www.w3.org/1999/xhtml'>
<body>
    <p>Content<br></p>
</body>
</html>

<!-- ✅ Option 1: Close every tag -->
<html xmlns='http://www.w3.org/1999/xhtml'>
<body>
    <p>Content<br /></p>
</body>
</html>

<!-- ✅ Option 2: Remove the namespace, and the template is parsed as HTML5 -->
<html>
<body>
    <p>Content<br></p>
</body>
</html>
```

The document builder chooses the parser from the `<html>` element: with the `xmlns` namespace the template must be valid XML, without it the more forgiving HTML5 parser is used.

### Error: "Object reference not set to an instance"

**Problem:** Null reference exception

```
System.NullReferenceException: Object reference not set to an instance of an object
```

**Common causes:**

```csharp
// ❌ Builder not created
IDocumentBuilder builder = null;
await builder.SaveAsync("output.pdf"); // NullReferenceException

// ❌ Missing data
builder.WithData("model", data); // data is null - may cause null reference in template

// ✅ Check for null
if (data != null)
{
    await factory.NewDocument()
        .WithLayoutFile("template.html")
        .WithData("model", data)
        .SaveAsync("output.pdf");
}
```

### Error: "Access to path is denied"

**Problem:** No permission to write file

```
System.UnauthorizedAccessException: Access to the path 'C:\output.pdf' is denied
```

**Solutions:**

```csharp
// ✅ Write to user documents folder
string outputPath = Path.Combine(
    Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
    "output.pdf"
);

// ✅ Ensure directory exists and is writable
string directory = Path.GetDirectoryName(outputPath);
if (!Directory.Exists(directory))
{
    Directory.CreateDirectory(directory);
}

// ✅ Check permissions
var fileInfo = new FileInfo(outputPath);
if (fileInfo.Exists && fileInfo.IsReadOnly)
{
    fileInfo.IsReadOnly = false;
}
```

---

## Logging and Diagnostics

### Enable Logging

Set a log level on the document builder, and the log is added as pages at the end of the generated PDF.

```csharp
using Paperwork.Generation;

await factory.NewDocument()
    .WithLayoutFile("template.html")
    .WithData("model", data)
    .WithLogLevel(PaperworkRequestLogOption.Verbose)
    .SaveAsync("output.pdf");
```

Remove the log level (or set it to `Off`) for production output.

### Log Levels

| Level | When to Use |
|-------|-------------|
| `Off` | No log (the default) |
| `Errors` | Only errors |
| `Warnings` | Errors and warnings |
| `Messages` | Info, warnings, and errors |
| `Verbose` | Everything (debugging) |

See [Logging](/paperwork.core/learning/07-configuration/02_logging) for more on the log output.

---

## Template Debugging

### Test Template Validity

`BuildAsync` reports problems in its result rather than throwing.

```csharp
public async Task<string> CheckTemplate(IPaperworkFactory factory, string templatePath, object sampleData)
{
    var result = await factory.NewDocument()
        .WithLayoutFile(templatePath)
        .WithData("model", sampleData)
        .BuildAsync();

    if (!result.Success)
        return $"{result.Message} {result.Error}";

    if (result.Document?.Binary == null || result.Document.Binary.Length == 0)
        return "Generated PDF is empty";

    return null; // No problems found
}
```

---

## Resource Loading Issues

### Image Not Found

**Problem:** Images don't appear in PDF

```html
<!-- ❌ Relative path might not resolve -->
<img src="./images/logo.png" />
```

Relative paths in a template are resolved from the application's working directory, not from the folder the template file is in.

**Debug:**

```csharp
// Check working directory
Console.WriteLine($"Working directory: {Directory.GetCurrentDirectory()}");

// Check if image exists
string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "images", "logo.png");
Console.WriteLine($"Image exists: {File.Exists(imagePath)}");
```

**Solutions:**

```html
<!-- ✅ Use a path relative to the working directory -->
<img src="Templates/images/logo.png" />

<!-- ✅ Use absolute path -->
<img src="C:/Projects/MyApp/images/logo.png" />

<!-- ✅ Or embed as base64 -->
<img src="data:image/png;base64,iVBORw0KG..." />
```

### External Stylesheet Not Loading

**Problem:** External CSS not applied

```html
<!-- ❌ Path issues -->
<link rel="stylesheet" href="styles.css" />
```

**Solutions:**

```html
<!-- ✅ Use full path -->
<link rel="stylesheet" href="C:/Projects/MyApp/styles/common.css" />

<!-- ✅ Or embed styles -->
<head>
    <style>
        /* Styles here */
    </style>
</head>
```

Or add the stylesheet with the document builder, which reads the file from the path given.

```csharp
builder.WithStyleFile("Templates/styles/common.css");
```

### Remote Resource Timeout

**Problem:** Remote images/fonts timeout

```html
<img src="https://example.com/slow-loading-image.jpg" />
```

**Solutions:**

```csharp
// Configure the timeout on the HttpClient used by the factory
var client = new HttpClient { Timeout = TimeSpan.FromSeconds(30) };
using var factory = PaperworkFactory.Create(client).Build();

// Or cache remote resources locally
string localImage = DownloadAndCache("https://example.com/image.jpg");
// Use local path in template
```

---

## Performance Issues

### Slow PDF Generation

**Problem:** PDF takes too long to generate

**Diagnose:**

Turn on the log, and it includes the time taken by each stage of generation.

```csharp
await factory.NewDocument()
    .WithLayoutFile("template.html")
    .WithData("model", GetData())
    .WithLogLevel(PaperworkRequestLogOption.Messages)
    .SaveAsync("output.pdf");
```

**Solutions:**

1. **Re-use the factory, and cache template text:**

```csharp
private static readonly ConcurrentDictionary<string, string> _templateCache = new();

public IDocumentBuilder NewFromTemplate(IPaperworkFactory factory, string templatePath)
{
    string html = _templateCache.GetOrAdd(templatePath, File.ReadAllText);

    return factory.NewDocument().WithLayout(html);
}
```

2. **Optimize images:**

```html
<!-- ❌ Large unoptimized images -->
<img src="photo.jpg" />  <!-- 5MB file -->

<!-- ✅ Optimized and sized -->
<img src="photo-optimized.jpg" style="width: 300pt;" />  <!-- 200KB -->
```

3. **Simplify CSS:**

```css
/* ❌ Complex selectors */
body div.content div.section div.subsection p.text span.highlight {
    color: red;
}

/* ✅ Simple selectors */
.highlight {
    color: red;
}
```

4. **Specify table widths:**

```html
<!-- ❌ Auto-calculate widths (slower) -->
<table>
    <tr>
        <td>Content</td>
        <td>More content</td>
    </tr>
</table>

<!-- ✅ Explicit widths (faster) -->
<table>
    <colgroup>
        <col style="width: 50%;" />
        <col style="width: 50%;" />
    </colgroup>
    <tr>
        <td>Content</td>
        <td>More content</td>
    </tr>
</table>
```

### Memory Issues

**Problem:** Out of memory errors

**Solutions:**

```csharp
// ✅ Create one factory and dispose of it when finished
using var factory = PaperworkFactory.Create().Build();

// ✅ Process in batches
foreach (var batch in items.Chunk(100))
{
    ProcessBatch(batch);
    GC.Collect(); // Force garbage collection between batches
}

// ✅ Stream large images
// Instead of loading entire image into memory,
// stream from disk or URL
```

---

## Data Binding Issues

### Expression Not Evaluating

**Problem:** Data binding expressions show as literal text





{% raw %}
```html
<!-- Shows: {{model.name}} instead of actual name -->
<p>{{model.name}}</p>
```
{% endraw %}





**Causes:**
- Data not passed to document
- Wrong property name
- Null data

**Debug:**

```csharp
// Check the data being passed
Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(data));
```

**Solutions:**





{% raw %}
```csharp
// ✅ Ensure data is passed
var model = new
{
    name = "John Doe",
    email = "john@example.com"
};
builder.WithData("model", model);

// ✅ Verify property names match
// Template uses: {{model.name}}
// Data must have: .name property
```
{% endraw %}





---

## Testing Strategies

### Unit Test Template Generation

```csharp
[Test]
public async Task TestInvoiceGeneration()
{
    // Arrange
    var testData = new Invoice
    {
        Number = "INV-001",
        CustomerName = "Test Customer",
        Items = new List<InvoiceItem>
        {
            new InvoiceItem { Description = "Item 1", Amount = 100.00m }
        },
        Total = 100.00m
    };

    // Act
    using var factory = PaperworkFactory.Create().Build();

    byte[] pdfBytes = await factory.NewDocument()
        .WithLayoutFile("./Templates/invoice.html")
        .WithData("model", testData)
        .BuildBytesAsync();

    // Assert
    Assert.IsNotNull(pdfBytes);
    Assert.Greater(pdfBytes.Length, 0);
    Assert.That(pdfBytes[0], Is.EqualTo(0x25)); // PDF signature '%'
}
```

### Integration Test with File Output

```csharp
[Test]
public async Task TestPdfFileGeneration()
{
    // Arrange
    string outputPath = Path.Combine(Path.GetTempPath(), "test.pdf");

    try
    {
        // Act
        using var factory = PaperworkFactory.Create().Build();

        await factory.NewDocument()
            .WithLayoutFile("template.html")
            .SaveAsync(outputPath);

        // Assert
        Assert.That(File.Exists(outputPath));
        var fileInfo = new FileInfo(outputPath);
        Assert.Greater(fileInfo.Length, 0);

        // Verify PDF signature
        byte[] header = new byte[4];
        using (var fs = File.OpenRead(outputPath))
        {
            fs.Read(header, 0, 4);
        }
        Assert.That(header, Is.EqualTo(new byte[] { 0x25, 0x50, 0x44, 0x46 })); // %PDF
    }
    finally
    {
        // Cleanup
        if (File.Exists(outputPath))
        {
            File.Delete(outputPath);
        }
    }
}
```

---

## Getting Help

### Check Documentation

1. **[HTML Element Reference](/paperwork.core/reference/htmltags/)** - Supported elements
2. **[CSS Property Reference](/paperwork.core/reference/css/)** - Supported CSS

### Community Resources

- **[GitHub Issues](https://github.com/richard-scryber/scryber.core/issues)** - Report layout and rendering bugs in the Scryber engine
- **[GitHub Discussions](https://github.com/richard-scryber/scryber.core/discussions)** - Ask questions

### Reporting Issues

When reporting an issue, include:

1. **Package versions:**
   ```csharp
   Console.WriteLine(typeof(Paperwork.PaperworkFactory).Assembly.GetName().Version);
   Console.WriteLine(typeof(Scryber.Components.Document).Assembly.GetName().Version);
   ```

2. **Minimal reproducible example:**
   - Simplest template that demonstrates the issue
   - Minimal C# code
   - Sample data if applicable

3. **Error message and stack trace:**
   ```csharp
   try
   {
       // Your code
   }
   catch (Exception ex)
   {
       Console.WriteLine($"Error: {ex.Message}");
       Console.WriteLine($"Stack: {ex.StackTrace}");
   }
   ```

4. **Environment:**
   - .NET version
   - Operating system
   - Hosting environment (console app, ASP.NET, Azure, etc.)

---

## Quick Troubleshooting Checklist

When encountering issues, check:

- [ ] File paths are correct and files exist
- [ ] Template has valid HTML/XHTML structure
- [ ] XHTML templates (with the `xmlns` namespace) are valid XML
- [ ] Data is passed to the document with `WithData`
- [ ] Property names in template match data model
- [ ] Images and resources are accessible
- [ ] The factory is created once and re-used
- [ ] Sufficient permissions to write files
- [ ] Error handling is in place
- [ ] Logging is enabled for debugging

---

## Next Steps

Now that you can troubleshoot issues:

1. **[Data Binding](/paperwork.core/learning/02-data-binding/)** - Make documents dynamic
2. **[Document Configuration](/paperwork.core/learning/07-configuration/)** - Logging and error handling
3. **[Practical Applications](/paperwork.core/learning/08-practical/)** - Real-world examples

---

**Start building dynamic documents →** [Data Binding & Expressions](/paperwork.core/learning/02-data-binding/)
