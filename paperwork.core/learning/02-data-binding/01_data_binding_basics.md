---
layout: default
title: Data Binding Basics
nav_order: 1
parent: Data Binding & Expressions
parent_url: /paperwork.core/learning/02-data-binding/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Data Binding Basics

Learn the fundamentals of data binding to create dynamic, data-driven PDF documents.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Understand the `{% raw %}{{expression}}{% endraw %}` syntax
- Bind data to templates
- Access object properties and nested data
- Pass data from C# to templates
- Use different data sources (C# objects, JSON, XML)

---

## What is Data Binding?

Data binding connects your data to template placeholders, allowing you to generate dynamic content:

**Static Template:**
```html
<p>Hello, World!</p>
```

**Dynamic Template with Data Binding:**




{% raw %}
```html
<p>Hello, {{model.name}}!</p>
```
{% endraw %}





**With Data:**
```csharp
builder.WithData("model", new { name = "John" });
```

**Result:**
```html
<p>Hello, John!</p>
```

---

## Basic Syntax

### Single Value Binding





{% raw %}
```html
<!-- Simple property -->
<p>{{name}}</p>

<!-- Object property -->
<p>{{user.name}}</p>

<!-- Nested property -->
<p>{{user.address.city}}</p>
```
{% endraw %}





### Multiple Bindings





{% raw %}
```html
<h1>{{title}}</h1>
<p>Author: {{author}}</p>
<p>Date: {{date}}</p>
<p>{{content}}</p>
```
{% endraw %}





---

## Passing Data from C#

### Using Anonymous Objects

```csharp
await factory.NewDocument()
    .WithLayoutFile("template.html")
    // Pass data
    .WithData("model", new
    {
        name = "John Doe",
        email = "john@example.com",
        age = 30
    })
    .SaveAsync("output.pdf");
```

**Template:**




{% raw %}
```html
<h1>{{model.name}}</h1>
<p>Email: {{model.email}}</p>
<p>Age: {{model.age}}</p>
```
{% endraw %}





### Using Typed Objects

```csharp
public class Person
{
    public string Name { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
}

// Usage
var person = new Person
{
    Name = "John Doe",
    Email = "john@example.com",
    Age = 30
};

doc.Params["model"] = person;
```

### Using Collections

```csharp
var users = new[]
{
    new { name = "Alice", role = "Admin" },
    new { name = "Bob", role = "User" },
    new { name = "Charlie", role = "Guest" }
};

builder.WithData("users", users);
```





{% raw %}
```html
{{#each users}}
    <p>{{this.name}} - {{this.role}}</p>
{{/each}}
```
{% endraw %}





---

## Accessing Properties

### Simple Properties





{% raw %}
```html
<p>{{firstName}}</p>
<p>{{lastName}}</p>
<p>{{age}}</p>
```
{% endraw %}





```csharp
builder.WithData("firstName", "John");
builder.WithData("lastName", "Doe");
builder.WithData("age", 30);
```

### Object Properties





{% raw %}
```html
<p>{{customer.name}}</p>
<p>{{customer.email}}</p>
<p>{{customer.phone}}</p>
```
{% endraw %}





```csharp
builder.WithData("customer", new
{
    name = "John Doe",
    email = "john@example.com",
    phone = "555-1234"
});
```

### Nested Properties





{% raw %}
```html
<p>{{user.profile.firstName}}</p>
<p>{{user.profile.lastName}}</p>
<p>{{user.address.street}}</p>
<p>{{user.address.city}}, {{user.address.state}}</p>
```
{% endraw %}





```csharp
builder.WithData("user", new
{
    profile = new
    {
        firstName = "John",
        lastName = "Doe"
    },
    address = new
    {
        street = "123 Main St",
        city = "Springfield",
        state = "IL"
    }
});
```

---

## Complete Examples

### Example 1: Simple Business Card

**C# Code:**
```csharp
await factory.NewDocument()
    .WithLayoutFile("business-card.html")
    .WithData("model", new
    {
        name = "John Doe",
        title = "Software Engineer",
        company = "Tech Corp",
        email = "john@techcorp.com",
        phone = "(555) 123-4567"
    })
    .SaveAsync("business-card.pdf");
```

**Template (business-card.html):**




{% raw %}
```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Business Card</title>
    <style>
        body {
            font-family: Helvetica, sans-serif;
            padding: 40pt;
        }
        .card {
            border: 2pt solid #2563eb;
            padding: 30pt;
            width: 400pt;
        }
        .name {
            font-size: 24pt;
            font-weight: bold;
            color: #1e40af;
        }
        .title {
            font-size: 14pt;
            color: #666;
            margin-bottom: 10pt;
        }
        .company {
            font-size: 16pt;
            font-weight: 600;
            margin-bottom: 20pt;
        }
        .contact {
            font-size: 10pt;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="name">{{model.name}}</div>
        <div class="title">{{model.title}}</div>
        <div class="company">{{model.company}}</div>
        <div class="contact">
            <p>{{model.email}}</p>
            <p>{{model.phone}}</p>
        </div>
    </div>
</body>
</html>
```
{% endraw %}





### Example 2: Simple Invoice

**C# Code:**
```csharp
await factory.NewDocument()
    .WithLayoutFile("invoice.html")
    .WithData("model", new
    {
        invoiceNumber = "INV-2025-001",
        date = "2025-01-15",
        customerName = "Acme Corporation",
        items = new[]
        {
            new { description = "Consulting Services", hours = 10, rate = 150.00, total = 1500.00 },
            new { description = "Software Development", hours = 20, rate = 200.00, total = 4000.00 }
        },
        subtotal = 5500.00,
        tax = 440.00,
        total = 5940.00
    })
    .SaveAsync("invoice.pdf");
```

**Template (invoice.html):**




{% raw %}
```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Invoice</title>
    <style>
        body {
            font-family: Helvetica, sans-serif;
            margin: 40pt;
        }
        h1 {
            color: #1e40af;
            border-bottom: 2pt solid #1e40af;
            padding-bottom: 10pt;
        }
        .invoice-header {
            margin-bottom: 30pt;
        }
        .invoice-info {
            font-size: 10pt;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20pt 0;
        }
        th {
            background-color: #2563eb;
            color: white;
            padding: 10pt;
            text-align: left;
        }
        td {
            padding: 8pt;
            border-bottom: 1pt solid #e5e7eb;
        }
        .total-row {
            background-color: #eff6ff;
            font-weight: bold;
            font-size: 14pt;
        }
    </style>
</head>
<body>
    <div class="invoice-header">
        <h1>INVOICE</h1>
        <div class="invoice-info">
            <p>Invoice #: {{model.invoiceNumber}}</p>
            <p>Date: {{model.date}}</p>
            <p>Customer: {{model.customerName}}</p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th>Hours</th>
                <th>Rate</th>
                <th style="text-align: right;">Total</th>
            </tr>
        </thead>
        <tbody>
            {{#each model.items}}
            <tr>
                <td>{{this.description}}</td>
                <td>{{this.hours}}</td>
                <td>${{this.rate}}</td>
                <td style="text-align: right;">${{this.total}}</td>
            </tr>
            {{/each}}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Subtotal</td>
                <td style="text-align: right;">${{model.subtotal}}</td>
            </tr>
            <tr>
                <td colspan="3">Tax (8%)</td>
                <td style="text-align: right;">${{model.tax}}</td>
            </tr>
            <tr class="total-row">
                <td colspan="3">TOTAL</td>
                <td style="text-align: right;">${{model.total}}</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
```
{% endraw %}





---

## Working with JSON Data

### Load JSON from File

```csharp
builder.WithDataFile("model", "data.json");
```

A JSON string, `Stream` or remote address can be used in the same way, with `WithData("model", json)` or `WithDataUrl("model", url)`.

**data.json:**
```json
{
  "title": "Monthly Report",
  "author": "John Doe",
  "date": "2025-01-15",
  "sections": [
    {
      "heading": "Introduction",
      "content": "This is the introduction..."
    },
    {
      "heading": "Analysis",
      "content": "Detailed analysis..."
    }
  ]
}
```

### Load JSON from API

```csharp
using System.Net.Http;
using System.Text.Json;

public async Task<byte[]> GenerateReportFromApi(string apiUrl)
{
    using var client = new HttpClient();
    string jsonResponse = await client.GetStringAsync(apiUrl);

    var data = JsonSerializer.Deserialize<dynamic>(jsonResponse);

    var doc = Document.ParseDocument("report.html");
    doc.Params["model"] = data;

    using (var ms = new MemoryStream())
    {
        doc.SaveAsPDF(ms);
        return ms.ToArray();
    }
}
```

---

## Working with XML Data

```csharp
using System.Xml.Linq;

// Load XML
var xml = XDocument.Load("data.xml");

// Convert to anonymous object
var data = new
{
    title = xml.Root.Element("title")?.Value,
    author = xml.Root.Element("author")?.Value,
    sections = xml.Root.Elements("section").Select(s => new
    {
        heading = s.Element("heading")?.Value,
        content = s.Element("content")?.Value
    }).ToArray()
};

builder.WithData("model", data);
```

**data.xml:**
```xml
<?xml version="1.0"?>
<report>
    <title>Monthly Report</title>
    <author>John Doe</author>
    <section>
        <heading>Introduction</heading>
        <content>This is the introduction...</content>
    </section>
    <section>
        <heading>Analysis</heading>
        <content>Detailed analysis...</content>
    </section>
</report>
```

---

## Null and Missing Values

### Handling Null Values





{% raw %}
```html
<!-- If property is null, nothing is rendered -->
<p>{{model.optionalField}}</p>

<!-- Use default values -->
<p>{{model.optionalField ?? 'Not provided'}}</p>

<!-- Conditional display -->
{{#if model.optionalField}}
    <p>{{model.optionalField}}</p>
{{else}}
    <p>Not available</p>
{{/if}}
```
{% endraw %}





### Safe Navigation





{% raw %}
```csharp
// Avoid null reference errors
builder.WithData("model", new
{
    user = null  // Or any property could be null
});

// Safe in template if user is null - just shows nothing
// {{model.user.name}}
```
{% endraw %}





---

## Try It Yourself

### Exercise 1: Personal Letter

Create a template for a personal letter with:
- Recipient name and address
- Letter date
- Greeting with name
- Custom message body
- Signature

Generate PDFs for 3 different people.

### Exercise 2: Product List

Create a template that displays:
- Company name and logo path
- List of products with names and prices
- Total count of products

Pass an array of products from C#.

### Exercise 3: JSON to PDF

- Create a JSON file with your resume data
- Create a template that formats it nicely
- Load JSON and generate PDF

---

## Common Pitfalls

### ❌ Wrong Property Names





{% raw %}
```html
<!-- Template uses: {{model.Name}} -->
<p>{{model.Name}}</p>
```
{% endraw %}





```csharp
// But C# property is: name (lowercase)
builder.WithData("model", new { name = "John" });
// Won't bind! Property names are case-sensitive
```

✅ **Solution:** Match case exactly

```csharp
builder.WithData("model", new { Name = "John" });
```

### ❌ Forgetting to Pass Data





{% raw %}
```html
<p>{{model.name}}</p>
```
{% endraw %}








{% raw %}
```csharp
await factory.NewDocument()
    .WithLayoutFile("template.html")
    // Forgot: .WithData("model", data)
    .SaveAsync("output.pdf");
// Shows: {{model.name}} literally in PDF
```
{% endraw %}





✅ **Solution:** Always pass data

```csharp
builder.WithData("model", data);
```

### ❌ Using Wrong Context Name





{% raw %}
```html
<p>{{user.name}}</p>
```
{% endraw %}





```csharp
// But passed as "model"
builder.WithData("model", new { name = "John" });
```

✅ **Solution:** Match context names

```csharp
builder.WithData("user", new { name = "John" });
```

---

## Next Steps

Now that you understand data binding basics:

1. **[Expression Functions](02_expression_functions.html)** - Use functions in expressions
2. **[Template Iteration](03_template_iteration.html)** - Loop through collections
3. **[Conditional Rendering](04_conditional_rendering.html)** - Show/hide content

---

**Continue learning →** [Expression Functions](02_expression_functions.html)
