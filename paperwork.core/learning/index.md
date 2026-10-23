---
layout: default
title: Learning Guides
nav_order: 2
has_children: true
has_toc: false
parent: Paperwork.Core
parent_url: /paperwork.core/
---

# Scryber.Core Learning Guides

Comprehensive learning series to master PDF generation with Scryber.Core, from beginner to advanced.

## Welcome!

These learning guides take you on a structured journey through Scryber.Core, covering everything from installation to production deployment. Each series builds on the previous, with complete examples, working code, and practical applications.

## Learning Series

### [1. Getting Started](/paperwork.core/learning/01-getting-started/) (9 articles)

**Start here if you're new to Scryber!**

Learn the fundamentals: installation, basic documents, HTML/CSS for PDFs, and troubleshooting.

**You'll learn:**
- Install and configure Scryber
- Create your first PDF document
- Understand HTML-to-PDF conversion
- Use CSS for styling
- Work with pages and sections
- Add basic content
- Configure output options
- Troubleshoot common issues

**Time investment:** 2-3 hours
**Prerequisites:** Basic HTML/CSS, C# fundamentals

[Start learning →](/paperwork.core/learning/01-getting-started/)

---

### [2. Data Binding & Expressions](/paperwork.core/learning/02-data-binding/) (9 articles)

**Make your documents dynamic!**

Master Handlebars-style data binding, expressions, functions, and conditional rendering.

**You'll learn:**
- Bind data to templates with `{% raw %}{{expression}}{% endraw %}`
- Use functions (string, math, **calc**, conditionals)
- Iterate with templates and `{% raw %}{{#each}}{% endraw %}`
- Conditional rendering with `{% raw %}{{#if}}{% endraw %}`
- **Work with variables and Document.Params**
- Understand context and scope
- Format output (numbers, dates, currency)
- Apply advanced patterns

**Time investment:** 3-4 hours
**Prerequisites:** Series 1 completed

[Start learning →](/paperwork.core/learning/02-data-binding/)

---

### [3. Styling & Appearance](/paperwork.core/learning/03-styling/) (9 articles)

**Create beautiful PDFs!**

Master CSS styling for professional-looking documents with colors, spacing, and measurements.

**You'll learn:**
- CSS selectors and specificity
- Colors and backgrounds
- Borders and spacing
- **Units & measurements (pt, em, %, calc())**
- Text styling
- Display and visibility
- Style organization
- Best practices

**Time investment:** 3-4 hours
**Prerequisites:** Series 1 completed

[Start learning →](/paperwork.core/learning/03-styling/)

---

### [4. Layout & Positioning](/paperwork.core/learning/04-layout/) (9 articles)

**Control page structure!**

Master page-based layout, positioning, breaks, and multi-page document structure.

**You'll learn:**
- Page sizes and orientation
- Page margins and printable area
- Sections for different layouts
- **Page breaks** and pagination control
- **Column layouts**
- **Positioning** for overlays and watermarks
- Headers and footers
- Layout best practices

**Time investment:** 3-4 hours
**Prerequisites:** Series 1, 3 recommended

[Start learning →](/paperwork.core/learning/04-layout/)

---

### [5. Typography & Fonts](/paperwork.core/learning/05-typography/) (9 articles)

**Master fonts and text!**

Learn font usage, including custom fonts, Google Fonts, Font Awesome, and CSS counters.

**You'll learn:**
- Font basics and properties
- Custom fonts (TTF, OTF, WOFF)
- **Google Fonts** integration
- **Font Awesome** icons
- Web fonts from CDNs
- Text metrics (line height, spacing)
- **CSS counters** for automatic numbering
- Typography best practices

**Time investment:** 2-3 hours
**Prerequisites:** Series 1 completed

[Start learning →](/paperwork.core/learning/05-typography/)

---

### [6. Content Components](/paperwork.core/learning/06-content/) (9 articles)

**Add rich content!**

Master images, SVG graphics, lists, tables, and embedded content.

**You'll learn:**
- Images (local, remote, data binding)
- SVG basics and positioning
- **SVG drawing** with data binding
- Lists (ordered, unordered, nested)
- **Tables** - structure and styling
- **Advanced tables** - dynamic data, calculations
- Attachments and embedded content
- Content best practices

**Time investment:** 4-5 hours
**Prerequisites:** Series 1, 2 recommended

[Start learning →](/paperwork.core/learning/06-content/)

---

### [7. Document Configuration](/paperwork.core/learning/07-configuration/) (8 articles)

**Production-ready documents!**

Configure logging, security, conformance, and optimization for enterprise deployment.

**You'll learn:**
- Document properties and metadata
- **Logging** for diagnostics
- **Error handling** and conformance modes
- PDF versions and compliance
- **Security** (encryption, passwords, permissions)
- **Optimization** and performance
- Production deployment

**Time investment:** 2-3 hours
**Prerequisites:** Series 1 completed

[Start learning →](/paperwork.core/learning/07-configuration/)

---

### [8. Practical Applications](/paperwork.core/learning/08-practical/) (9 articles)

**Learn by building!**

Complete, real-world examples you can adapt for your projects.

**You'll build:**
- Professional invoices
- Business letters
- Multi-section reports
- Certificates
- Data-driven reports
- Product catalogs
- Print forms
- Multi-language branded documents

**Time investment:** 5-6 hours
**Prerequisites:** Series 1 completed, others helpful

[Start learning →](/paperwork.core/learning/08-practical/)

---

## Learning Paths

### Quick Start (2-3 days)

Perfect for getting productive quickly:

1. **[Getting Started](/paperwork.core/learning/01-getting-started/)** - Foundation (2-3 hours)
2. **[Data Binding](/paperwork.core/learning/02-data-binding/)** - Dynamic content (3-4 hours)
3. **[Practical Applications](/paperwork.core/learning/08-practical/)** - Pick one example (1-2 hours)

**Result:** Create basic data-driven PDFs

---

### Comprehensive (1-2 weeks)

For complete mastery:

1. **[Getting Started](/paperwork.core/learning/01-getting-started/)** - Foundation
2. **[Data Binding](/paperwork.core/learning/02-data-binding/)** - Dynamic content
3. **[Styling](/paperwork.core/learning/03-styling/)** - Beautiful design
4. **[Layout](/paperwork.core/learning/04-layout/)** - Page structure
5. **[Typography](/paperwork.core/learning/05-typography/)** - Professional fonts
6. **[Content](/paperwork.core/learning/06-content/)** - Rich content
7. **[Configuration](/paperwork.core/learning/07-configuration/)** - Production-ready
8. **[Practical Applications](/paperwork.core/learning/08-practical/)** - Real-world examples

**Result:** Expert-level PDF generation skills

---

### Task-Focused

Jump to what you need:

**Making invoices?**
→ [Data Binding](/paperwork.core/learning/02-data-binding/) + [Invoice Example](/paperwork.core/learning/08-practical/01_invoice_template.html)

**Creating reports?**
→ [Content Components](/paperwork.core/learning/06-content/) + [Report Example](/paperwork.core/learning/08-practical/03_report_template.html)

**Need custom fonts?**
→ [Typography & Fonts](/paperwork.core/learning/05-typography/)

**Building forms?**
→ [Layout & Positioning](/paperwork.core/learning/04-layout/) + [Form Example](/paperwork.core/learning/08-practical/07_form_template.html)

**Production deployment?**
→ [Document Configuration](/paperwork.core/learning/07-configuration/)

---

## Key Features Covered

### Data Binding
- `{% raw %}{{expression}}{% endraw %}` syntax
- `{% raw %}{{#each}}{% endraw %}` iteration
- `{% raw %}{{#if}}{% endraw %}` conditionals
- **`<var>` element for storage**
- **Document.Params access**
- Nested data structures

### Calculations
- Math functions (add, subtract, multiply, divide)
- **`calc()` function**
- Running totals
- Aggregations

### Layout
- **Page sizes** and orientation
- **Page breaks** (before, after, inside)
- **Column layouts**
- **Positioning** (static, relative, absolute)
- Headers and footers

### Typography
- **Custom fonts** (local files)
- **Google Fonts**
- **Font Awesome** icons
- **CSS counters** for numbering
- Text metrics

### Content
- Images (PNG, JPEG, GIF, SVG)
- **SVG graphics with data binding**
- **Dynamic tables**
- **Calculated columns**
- Lists and attachments

### Configuration
- **Logging** and diagnostics
- **Security** and permissions
- **Conformance** modes
- PDF/A and PDF/X compliance
- Performance optimization

---

## Additional Resources

### Reference Documentation
- **[HTML Element Reference](/paperwork.core/reference/htmltags/)** - All supported HTML elements
- **[CSS Property Reference](/paperwork.core/reference/css/)** - All supported CSS properties
- **[SVG Element Reference](/paperwork.core/reference/svg/)** - SVG elements and attributes
- **[Data Binding Reference](/paperwork.core/reference/data-binding/)** - Expression syntax guide

### Examples
- **[Code Examples](/examples/)** - Complete working examples
- **[Templates](/examples/templates/)** - Reusable templates
- **[Snippets](/examples/snippets/)** - Common patterns

### API Documentation
- **[API Reference](/api/)** - Complete API documentation
- **[C# Integration](/api/integration/)** - Using Scryber in C#

### Community
- **[GitHub Repository](https://github.com/richard-scryber/scryber.core)** - Source code and issues
- **[Discussions](https://github.com/richard-scryber/scryber.core/discussions)** - Ask questions
- **[Examples Repository](https://github.com/richard-scryber/scryber.core.examples)** - More examples

---

## Getting Help

### Stuck on Something?

1. **Check the relevant series** - Most topics are covered
2. **Search the reference docs** - Specific element/property details
3. **Review practical examples** - Real-world implementations
4. **Ask in Discussions** - Community support

### Found a Bug?

Report issues on [GitHub](https://github.com/richard-scryber/scryber.core/issues)

### Want to Contribute?

Contributions welcome! See [Contributing Guide](https://github.com/richard-scryber/scryber.core/blob/main/CONTRIBUTING.md)

---

## Quick Reference

### Essential Syntax

**XHTML Format (with namespace):**




{% raw %}
```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<body>
    <!-- Data binding -->
    <p>{{propertyName}}</p>
    <p>{{object.property}}</p>
    <p>{{a +  b}}</p>

    <!-- Iteration -->
    {{#each items}}
        <li>{{this.name}}</li>
    {{/each}}

    <!-- Conditionals -->
    {{#if condition}}
        <p>Content</p>
    {{/if}}

    <!-- Variables -->
    <var data-id="myVar" data-value="{{expression}}" />
    <p>{{Document.Params.myVar}}</p>
</body>
</html>
```
{% endraw %}





**Template formats:** templates can be XHTML, with the `xmlns='http://www.w3.org/1999/xhtml'` namespace, or HTML5 without it - the builder reads both.

```csharp
await factory.NewDocument()
    .WithLayoutFile("template.html")   // XHTML or HTML5
    .SaveAsync("output.pdf");
```

### Common Patterns

```css
/* Page setup */
@page {
    size: A4 portrait;
    margin: 1in;
}

/* Calculations */
width: calc(100% - 40pt);
```





{% raw %}
```css
height: calc({{value}} * 2pt);
```
{% endraw %}





```css
/* Positioning */
position: absolute;
top: 50%;
left: 50%;
```

---

**Ready to start?** Begin your journey with [Getting Started](/paperwork.core/learning/01-getting-started/) →

**Already know the basics?** Jump to [Data Binding](/paperwork.core/learning/02-data-binding/) or [Practical Applications](/paperwork.core/learning/08-practical/) →
