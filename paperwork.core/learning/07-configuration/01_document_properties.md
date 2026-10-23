---
layout: default
title: Document Properties
nav_order: 1
parent: Document Configuration
parent_url: /paperwork.core/learning/07-configuration/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Document Properties

Set the document title, author, subject and keywords, so documents are easy to identify and search.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Set document properties in the template
- Use bound values in the properties
- Set properties in code
- Follow metadata best practices

---

## Properties in the Template

The document properties are read from the template `<head>`.

{% raw %}
```html
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Annual Financial Report</title>
    <meta name='author' content='Acme Corporation' />
    <meta name='description' content='2024 financial results' />
    <meta name='keywords' content='annual, report, financial, 2024' />
    <meta name='generator' content='Acme Reporting 2.5' />
</head>
<body>
    ...
</body>
</html>
```
{% endraw %}

| Template | PDF property | Shown in viewers as |
|----------|--------------|---------------------|
| `<title>` | Title | The window or tab title, and Title |
| `<meta name='author'>` | Author | Author |
| `<meta name='description'>` | Subject | Subject |
| `<meta name='keywords'>` | Keywords | Keywords |
| `<meta name='generator'>` | Producer | PDF Producer |

The Creator and Producer are set to *Paperwork Document Generator* when they have no other value, and the creation and modified dates are set to the time the document was generated.

---

## Bound Values

The title and meta content can use binding expressions, so each document gets its own properties.

{% raw %}
```html
<head>
    <title>Invoice {{model.number}}</title>
    <meta name='author' content='{{model.companyName}}' />
    <meta name='description' content='Invoice for {{model.customerName}}' />
    <meta name='keywords' content='invoice, {{model.number}}, {{model.customerName}}' />
</head>
```
{% endraw %}

```csharp
await factory.NewDocument()
    .WithLayoutFile("invoice.html")
    .WithData("model", new
    {
        number = "INV-2024-1234",
        companyName = "Acme Corporation",
        customerName = "Client XYZ"
    })
    .SaveAsync("invoice.pdf");
```

The PDF has the title *Invoice INV-2024-1234*, the subject *Invoice for Client XYZ*, and so on.

---

## Properties in Code

Properties can also be set on an engine `Document`, through `doc.Info`. See [The Engine Document](/paperwork.core/configuration/engine-document).

```csharp
using Paperwork;
using Scryber.Components;

using var factory = PaperworkFactory.Create().Build();
using var doc = Document.ParseDocument("report.html");

doc.Info.Title = "Product Catalog 2025";
doc.Info.Author = "Acme Corporation";
doc.Info.Subject = "Complete product listing and specifications";
doc.Info.Keywords = "catalog, products, 2025, specifications";
doc.Info.Creator = "Acme Catalog System 2.0";
doc.Info.Producer = "Acme Catalog System 2.0";
doc.Info.CreationDate = new DateTime(2025, 1, 15, 9, 0, 0);
doc.Info.ModifiedDate = new DateTime(2025, 1, 15, 9, 0, 0);

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("catalog.pdf");
```

{: .warning }
> The template is applied after the code, when the document is bound. A `<title>` or `<meta>` in the template replaces the value set in code. Set a property in one place or the other.

Creator, Producer and the dates can only be set in code.

---

## Property Descriptions

### Title

The most important property - PDF viewers show it in the window or tab instead of the file name.

| ❌ Poor | ✅ Good |
|---------|---------|
| `Document` | `Q4 2024 Financial Report` |
| `report_2024_q4_final_v3.pdf` | `Invoice INV-2024-1234` |

- Use descriptive, human-readable text
- Include the identifying information - a number, a name or a period
- Keep it under 100 characters

### Author

The person or organisation responsible for the document: `Acme Corporation`, or `Marketing Department, Acme Corporation`.

### Subject

A short description of what the document is about.

### Keywords

Comma separated search terms. Include the identifying values and a few related terms: `invoice, INV-2024-1234, Client XYZ, 2024`.

### Creator and Producer

The Creator is the application the document came from; the Producer is the software that produced the PDF. Set them when your document management needs to know which system generated a document.

---

## Practical Example: Invoice Template Head

{% raw %}
```html
<?paperwork parser-mode='Lax' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Invoice {{model.number}}</title>
    <meta name='author' content='{{model.company.name}}' />
    <meta name='description' content='Invoice {{model.number}} for {{model.customer.name}}' />
    <meta name='keywords' content='invoice, {{model.number}}, {{model.customer.name}}, {{format(date(model.date), "yyyy")}}' />
    <link rel='stylesheet' href='invoice.css' />
</head>
<body>
    ...
</body>
</html>
```
{% endraw %}

---

## Viewing Metadata

- **Adobe Acrobat:** File → Properties → Description
- **Preview (Mac):** Tools → Show Inspector → the info tab
- **Browsers:** the title is shown in the tab

---

## Try It Yourself

### Exercise 1: Bound Properties

Add a bound `<title>` and `<meta>` tags to one of your templates, and check them in a PDF viewer.

### Exercise 2: Code Properties

Set the Creator and the creation date in code for a document, and check they appear.

### Exercise 3: Template or Code

Set a title in both the template and in code, and see which one is used.

---

## Common Pitfalls

### ❌ No Title

Viewers show the file name instead, and search tools have nothing to show.

✅ **Solution:** Always add a `<title>` - bound if the document is generated for different data.

### ❌ Technical Values

```html
<title>rpt_fin_2024_q4_final_v3</title>
```

✅ **Solution:**

```html
<title>Q4 2024 Financial Report</title>
```

### ❌ Setting the Same Property in Code and the Template

The template value wins, and the code value is lost.

✅ **Solution:** Use the template for properties that come from the data, and code for properties the application controls.

---

## Metadata Best Practices Checklist

- [ ] Title is descriptive and under 100 characters
- [ ] Author identified (person or organisation)
- [ ] Description provides context
- [ ] Keywords include the identifying values
- [ ] Each property set in one place - template or code
- [ ] Tested in a PDF viewer

---

## Next Steps

1. **[Logging](02_logging.html)** - Configure diagnostic logging
2. **[Error Handling & Conformance](03_error_handling_conformance.html)** - Handle errors gracefully
3. **[Security](05_security.html)** - Protect your documents

---

**Continue learning →** [Logging](02_logging.html)
