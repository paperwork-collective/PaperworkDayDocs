---
layout: default
title: Getting Started
nav_order: 1
parent: Learning Guides
parent_url: /paperwork.core/learning/
has_children: true
has_toc: false
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Getting Started with Paperwork.Core

Welcome to the Paperwork.Core learning series! This comprehensive guide will take you from complete beginner to confident PDF document creator.

---

## Table of Contents

1. [Installation & Setup](01_installation_setup.html) - Get Paperwork.Core installed and configured
2. [Your First Document](02_first_document.html) - Create a complete PDF from scratch
3. [HTML to PDF](03_html_to_pdf.html) - Understand how HTML translates to PDF
4. [CSS Basics](04_css_basics.html) - Style your documents with CSS
5. [Pages & Sections](05_pages_sections.html) - Structure multi-page documents
6. [Basic Content](06_basic_content.html) - Add text, images, lists, and tables
7. [Output Options](07_output_options.html) - Save, stream, and configure output
8. [Troubleshooting](08_troubleshooting.html) - Solve common issues and debug effectively

---

## What is Paperwork.Core?

Paperwork.Core is a powerful .NET library that enables you to generate PDF documents using HTML and CSS. Unlike browser-based PDF generation, Paperwork.Core is designed specifically for server-side PDF creation, offering:

- **HTML & CSS Templating** - Use familiar web technologies to design PDFs
- **Data Binding** - Dynamic content with Handlebars-style expressions
- **No Browser Required** - Pure .NET solution, runs anywhere .NET runs
- **Full Control** - Programmatic access to all PDF features
- **Production Ready** - Built for high-volume, enterprise applications

## Who Should Use Paperwork.Core?

Paperwork.Core is ideal for:

- .NET developers who need to generate PDFs programmatically
- Teams who want to use HTML/CSS skills for PDF design
- Applications requiring dynamic, data-driven PDFs
- Systems that need automated PDF generation at scale
- Projects where browser-based rendering isn't suitable

## Common Use Cases

- **Invoices and Receipts** - Generate customer-facing financial documents
- **Reports** - Create data-rich business reports with charts and tables
- **Certificates** - Produce personalized certificates and awards
- **Letters and Contracts** - Automated document generation
- **Catalogs and Brochures** - Marketing materials with product listings
- **Forms** - Generate fillable or print-ready forms

## Your First PDF in 5 Minutes

Here's a simple example to show you how easy it is:

### 1. Install the Package

```bash
dotnet add package Paperwork.Core
```

### 2. Create a Simple Template





{% raw %}
```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>My First PDF</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40pt; }
        h1 { color: #336699; }
    </style>
</head>
<body>
    <h1>Hello, {{model.name}}!</h1>
    <p>Welcome to PDF generation with Paperwork.Core.</p>
</body>
</html>
```
{% endraw %}





### 3. Generate the PDF

```csharp
using Paperwork;

// Create the factory once, and re-use it
using var factory = PaperworkFactory.Create().Build();

await factory.NewDocument()
    // Load the template
    .WithLayoutFile("template.html")
    // Pass data to the template
    .WithData("model", new { name = "World" })
    // Generate the PDF
    .SaveAsync("output.pdf");
```

That's it! You've created your first PDF with dynamic content.

## XHTML vs HTML5 Format

Paperwork.Core supports two document formats:

### XHTML Format (Recommended)

Uses XML namespace and strict XHTML syntax:


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


**Parsed as:** strict XHTML, because the `<html>` element has the `xmlns` namespace.

**Benefits:**
- Full XML namespace support
- Stricter validation
- Better for complex documents
- Supports library-specific namespaces

### HTML5 Format

Standard HTML5 syntax without namespace:

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

**Parsed as:** HTML5, because there is no namespace on the `<html>` element.

**Benefits:**
- Familiar HTML5 syntax
- No namespace required
- Simpler for basic documents
- Works with existing HTML files

### When to Use Each

The document builder checks the `<html>` element of each layout and chooses the parser for you, so there is nothing to change in code.

**Use XHTML when:**
- Building templates from scratch
- Need strict validation
- Using library-specific elements
- Want explicit namespace control

**Use HTML5 when:**
- Converting existing HTML content
- Prefer simpler syntax
- Working with HTML5 tools
- Don't need custom namespaces

Both formats produce the same PDF output!

## What You'll Learn in This Series

This series covers the essential foundations of Paperwork.Core:

1. **[Installation & Setup](01_installation_setup.html)** - Get Paperwork.Core installed and configured
2. **[Your First Document](02_first_document.html)** - Create a complete PDF from scratch, including XHTML vs HTML5 formats
3. **[HTML to PDF](03_html_to_pdf.html)** - Understand how HTML translates to PDF
4. **[CSS Basics](04_css_basics.html)** - Style your documents with CSS
5. **[Pages & Sections](05_pages_sections.html)** - Structure multi-page documents
6. **[Basic Content](06_basic_content.html)** - Add text, images, lists, and tables
7. **[Output Options](07_output_options.html)** - Save, stream, and configure output
8. **[Troubleshooting](08_troubleshooting.html)** - Solve common issues and debug effectively

## Prerequisites

Before starting this series, you should have:

- **Basic C# Knowledge** - Understanding of C# syntax and .NET development
- **HTML Fundamentals** - Familiarity with HTML structure and elements
- **CSS Basics** - Understanding of CSS selectors and properties
- **.NET Development Environment** - Visual Studio, VS Code, or Rider

No prior PDF generation experience is required!

## How to Use This Series

Each article in this series is designed to be:

- **Self-Contained** - Read in any order, though sequential is recommended
- **Practical** - Every concept includes working code examples
- **Progressive** - Complexity increases gradually
- **Applied** - "Try it yourself" exercises reinforce learning

### Recommended Learning Path

**For Complete Beginners:**
1. Read articles 1-3 to understand the basics
2. Complete the exercises in article 2
3. Experiment with styling in article 4
4. Build a multi-page document using article 5
5. Complete the series in order

**For Experienced Developers:**
1. Skim articles 1-2 for library-specific concepts
2. Focus on articles 3-4 for HTML/CSS differences
3. Jump to specific topics as needed
4. Use article 8 as a reference for troubleshooting

## Additional Resources

- **[API Reference](/paperwork.core/reference/)** - Complete API documentation
- **[HTML Element Reference](/paperwork.core/reference/htmltags/)** - Supported HTML elements
- **[CSS Property Reference](/paperwork.core/reference/css/)** - Supported CSS properties
- **[Code Examples](/examples/)** - Complete working examples

## Next Steps

Ready to begin? Start with [Installation & Setup](01_installation_setup.html) to get Paperwork.Core installed and configured in your project.

If you run into issues, jump to [Troubleshooting](08_troubleshooting.html) for help.

## What's Next After This Series?

Once you've completed Getting Started, continue your learning journey:

- **[Data Binding & Expressions](/paperwork.core/learning/02-data-binding/)** - Master dynamic content
- **[Styling & Appearance](/paperwork.core/learning/03-styling/)** - Create beautiful documents
- **[Layout & Positioning](/paperwork.core/learning/04-layout/)** - Control document structure
- **[Typography & Fonts](/paperwork.core/learning/05-typography/)** - Work with fonts and text

---

**Ready to get started?** Head to [Installation & Setup](01_installation_setup.html) →
