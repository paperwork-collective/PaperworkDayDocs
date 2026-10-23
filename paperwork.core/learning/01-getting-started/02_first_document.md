---
layout: default
title: Your First Document
nav_order: 2
parent: Getting Started
parent_url: /paperwork.core/learning/01-getting-started/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Your First Document

Create your first PDF document from scratch using HTML and C# in minutes.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Create a basic HTML template for PDFs
- Load HTML templates with the Paperwork.Core document builder
- Generate and save PDF files
- Understand XHTML vs HTML5 formats
- Add basic styling to your document

---

## Hello World PDF

Let's create the simplest possible PDF document:

### Step 1: Create the HTML Template

Create a file named `hello.html`:

```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first PDF generated with Paperwork.Core.</p>
</body>
</html>
```

### Step 2: Generate the PDF

Replace the contents of `Program.cs` with:

```csharp
using Paperwork;

// Create the factory - once per application
using var factory = PaperworkFactory.Create().Build();

// Load the HTML template, and generate the PDF
await factory.NewDocument()
    .WithLayoutFile("hello.html")
    .SaveAsync("hello.pdf");

Console.WriteLine("PDF created: hello.pdf");
```

### Step 3: Run and View

```bash
dotnet run
```

Open `hello.pdf` - you should see your first PDF!

---

## XHTML vs HTML5 Format

Paperwork.Core supports two document formats, and the document builder chooses the right parser for each template automatically.

### XHTML Format (Recommended)

Uses XML namespace:

```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>XHTML Document</title>
</head>
<body>
    <p>Content here</p>
</body>
</html>
```

Parsed as strict XHTML, because the `<html>` element has the `xmlns` namespace.

**Benefits:**
- Full XML namespace support
- Stricter validation
- Better for complex documents
- Supports library-specific namespaces

### HTML5 Format

Standard HTML5 without namespace:

```html
<!DOCTYPE html>
<html>
<head>
    <title>HTML5 Document</title>
</head>
<body>
    <p>Content here</p>
</body>
</html>
```

Parsed as HTML5, because there is no namespace on the `<html>` element.

**Benefits:**
- Familiar HTML5 syntax
- No namespace required
- Simpler for basic documents
- Works with existing HTML files

### Which Should You Use?

| Use XHTML When | Use HTML5 When |
|----------------|----------------|
| Building templates from scratch | Converting existing HTML |
| Need strict validation | Prefer simpler syntax |
| Using library-specific elements | Working with HTML5 tools |
| Want explicit namespace control | Don't need custom namespaces |

**Both formats produce identical PDF output!**

---

## Complete First Document Example

Let's create a more complete document with styling:

#### first-document.html
```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>My First PDF Document</title>
    <link rel='stylesheet' href='./first-styles.css' />
</head>
<body>
    <h1>Welcome to Paperwork.Core</h1>

    <h2>Introduction</h2>
    <p>
        Paperwork.Core is a powerful .NET library for generating PDF documents
        using HTML and CSS. This document demonstrates basic features.
    </p>

    <h2>Key Features</h2>
    <ul>
        <li>HTML &amp; CSS templating</li>
        <li>Data binding with Handlebars syntax</li>
        <li>No browser required</li>
        <li>Full programmatic control</li>
        <li>Production-ready performance</li>
    </ul>

    <div class="highlight">
        <strong>Pro Tip:</strong> Use CSS for all styling to keep your
        templates clean and maintainable.
    </div>

    <h2>Getting Started</h2>
    <p>
        Creating PDFs with Paperwork.Core is as simple as writing HTML. You already
        have all the skills you need!
    </p>

    <div class="footer">
        Page <page-number /> of <page-count /> | Generated with Paperwork.Core
    </div>
</body>
</html>
```

#### first-styles.css
```css
body {
    font-family: 'Helvetica', sans-serif;
    font-size: 11pt;
    margin: 40pt;
    color: #333;
}

h1 {
    color: #2563eb;
    font-size: 24pt;
    border-bottom: 2pt solid #2563eb;
    padding-bottom: 10pt;
    margin-bottom: 20pt;
}

h2 {
    color: #1e40af;
    font-size: 18pt;
    margin-top: 20pt;
    margin-bottom: 10pt;
}

p {
    line-height: 1.6;
    margin-bottom: 10pt;
}

.highlight {
    background-color: #fef3c7;
    padding: 10pt;
    border-left: 4pt solid #f59e0b;
    margin: 15pt 0;
}

.footer {
    position: fixed;
    bottom: 20pt;
    left: 40pt;
    right: 40pt;
    text-align: center;
    font-size: 9pt;
    color: #666;
    border-top: 1pt solid #ccc;
    padding-top: 10pt;
}
```


**C# Code:**

```csharp
using Paperwork;

using var factory = PaperworkFactory.Create().Build();

// Generate the document, and check the result
var result = await factory.NewDocument()
    .WithLayoutFile("first-document.html")
    .BuildAsync();

if (result.Success)
{
    File.WriteAllBytes("first-document.pdf", result.Document.Binary);
    Console.WriteLine("PDF created successfully: first-document.pdf");
}
else
{
    Console.WriteLine($"Error: {result.Message} {result.Error}");
}
```

The `<title>` in the template becomes the title of the PDF. The linked stylesheet is loaded relative to the application's working directory, so run the program from the project folder.

---

## Loading From Different Sources

### From File

```csharp
builder.WithLayoutFile("template.html");
```

### From String

```csharp
string html = @"
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head><title>From String</title></head>
<body><h1>Hello!</h1></body>
</html>";

builder.WithLayout(html);
```

### From Stream

```csharp
using var fileStream = File.OpenRead("template.html");

builder.WithLayout(fileStream);
```

### From URL (Remote)

```csharp
builder.WithLayoutUrl("https://example.com/template.html");
```

Where `builder` is the result of `factory.NewDocument()`.

---

## Saving PDFs

### To File

```csharp
await builder.SaveAsync("output.pdf");
```

### To a Byte Array (for HTTP Response)

```csharp
byte[] pdfBytes = await builder.BuildBytesAsync();
return File(pdfBytes, "application/pdf", "document.pdf");
```

### With the Result

```csharp
PaperworkResult result = await builder.BuildAsync();

if (result.Success)
{
    byte[] pdfBytes = result.Document.Binary;
}
```

`SaveAsync` and `BuildBytesAsync` throw an exception if the document could not be generated. `BuildAsync` returns the outcome, along with any `Message` and `Error`.

---

## Document Properties

The title of the PDF comes from the `<title>` in the template, and can be bound to data, e.g. `{% raw %}<title>{{model.title}}</title>{% endraw %}`. A `<title>` in the template replaces any title set in code.

To set other metadata, parse the template into an engine `Document`, set its properties, and pass it to the builder.

```csharp
using Scryber.Components;

var doc = Document.ParseDocument("template.html");

// Document information
doc.Info.Author = "Acme Corporation";
doc.Info.Subject = "Monthly Invoice";
doc.Info.Keywords = "invoice, billing, payment";

// Creator information
doc.Info.Creator = "My Application v1.0";

// Generate with metadata
await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("invoice.pdf");
```

These properties appear in PDF viewers:

![PDF Properties](../../images/pdf-properties.png)

---

## Common Patterns

### 1. Template + Data Pattern

```csharp
public Task<byte[]> GeneratePdf(IPaperworkFactory factory, string templatePath, object data)
{
    return factory.NewDocument()
        .WithLayoutFile(templatePath)
        // Pass data to template
        .WithData("model", data)
        .BuildBytesAsync();
}
```

### 2. Reusable Document Service

```csharp
public class PdfService
{
    private readonly IPaperworkFactory _factory;
    private readonly string _templateDirectory;

    public PdfService(IPaperworkFactory factory, string templateDirectory)
    {
        _factory = factory;
        _templateDirectory = templateDirectory;
    }

    public Task<byte[]> GenerateFromTemplate(string templateName, object data)
    {
        string templatePath = Path.Combine(_templateDirectory, templateName);

        return _factory.NewDocument()
            .WithLayoutFile(templatePath)
            .WithData("model", data)
            .BuildBytesAsync();
    }
}
```

Usage:

```csharp
var pdfService = new PdfService(factory, "./Templates");
byte[] pdf = await pdfService.GenerateFromTemplate("invoice.html", invoiceData);
```

---

## Try It Yourself

### Exercise 1: Personal Letter

Create a PDF with:
- Your name as the title
- Three sections (Introduction, Skills, Contact)
- Different colors for each section heading
- A footer with page numbers

### Exercise 2: Styled List

Create a PDF with:
- An unordered list of your favorite things
- Custom list markers using CSS
- Background colors alternating between items
- A border around the entire list

### Exercise 3: Load Methods

Create the same document three ways:
1. From an `.html` file using `WithLayoutFile`
2. From a string using `WithLayout`
3. As HTML5, without the `xmlns` namespace

Compare the results - they should be identical!

---

## Common Pitfalls

### ❌ Invalid XHTML

```html
<!-- With the namespace, the template must be valid XML -->
<html xmlns='http://www.w3.org/1999/xhtml'>
<body>Hello<br></body>
</html>
```

✅ **Solution:** Close every tag (`<br />`), or remove the namespace to use HTML5 parsing

```html
<html xmlns='http://www.w3.org/1999/xhtml'>
<body>Hello<br /></body>
</html>
```

### ❌ Relative Paths Without Context

```csharp
// May not find the file
builder.WithLayoutFile("template.html");
```

✅ **Solution:** Use absolute or properly resolved paths

```csharp
string templatePath = Path.Combine(
    AppContext.BaseDirectory,
    "Templates",
    "template.html"
);
builder.WithLayoutFile(templatePath);
```

Images and stylesheets referenced with relative paths inside a template are resolved from the application's working directory.

---

## Next Steps

Now that you can create basic documents:

1. **[HTML to PDF](03_html_to_pdf.html)** - Learn which HTML elements are supported
2. **[CSS Basics](04_css_basics.html)** - Master styling your documents
3. **[Data Binding](/paperwork.core/learning/02-data-binding/)** - Make documents dynamic

---

## Additional Resources

- **[HTML Element Reference](/paperwork.core/reference/htmltags/)** - All supported HTML elements
- **[Code Examples](/examples/)** - More complete examples

---

**Continue learning →** [HTML to PDF](03_html_to_pdf.html)
