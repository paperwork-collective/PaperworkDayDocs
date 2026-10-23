---
layout: default
title: Document Configuration
nav_order: 7
parent: Learning Guides
parent_url: /paperwork.core/learning/
has_children: true
has_toc: false
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Document Configuration

Configure metadata, logging, error handling, security and performance for production-ready documents.

---

## Table of Contents

1. [Document Properties](01_document_properties.html) - Title, author, subject and keywords
2. [Logging](02_logging.html) - Log levels, collecting entries, custom log handlers
3. [Error Handling & Conformance](03_error_handling_conformance.html) - Strict and Lax modes, handling failures
<!-- 4. [PDF Versions](04_pdf_versions.html) - PDF versions, PDF/A, PDF/X compliance -->
5. [Security](05_security.html) - Encryption, passwords, permissions
6. [Optimization & Performance](06_optimization_performance.html) - File size, compression, caching, scaling
7. [Production & Deployment](07_production_deployment.html) - Production setup, monitoring, troubleshooting

---

## Overview

Most configuration can be done in two places:

- **In the template** - `<title>`, `<meta>` tags and the `<?paperwork ?>` processing instruction. The template carries its own settings wherever it is used.
- **In code** - on the document builder, or on an engine `Document` that is parsed, configured and passed to the builder with `WithLayout(doc)`. See [The Engine Document](/paperwork.core/configuration/engine-document).

Settings that apply to every document - fonts, image caching, output compression, logging - go in the application's configuration. See [Configuration Structure](/paperwork.core/configuration/configuration-structure).

## Quick Example

**In the template:**

{% raw %}
```html
<?paperwork parser-mode='Lax' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Invoice {{model.number}}</title>
    <meta name='author' content='Acme Corporation' />
    <meta name='description' content='Invoice for {{model.customerName}}' />
    <meta name='keywords' content='invoice, {{model.number}}' />

    <meta name='print-restrictions' content='printing, accessibility' />
</head>
<body>
    ...
</body>
</html>
```
{% endraw %}

**In code:**

```csharp
using Paperwork;
using Scryber;
using Scryber.Components;
using Scryber.Logging;
using Scryber.PDF.Secure;

using var factory = PaperworkFactory.Create().Build();
using var doc = Document.ParseDocument("invoice.html");

// Collect any warnings or errors
var log = new CollectorTraceLog(TraceRecordLevel.Warnings, "Invoice", autostart: true);
doc.AddTraceLog(log);

// Protect the restrictions with an owner password
doc.RenderOptions.PasswordProvider = new DocumentPasswordProvider(ownerPassword);

var result = await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", invoice)
    .BuildAsync();

foreach (var entry in log)
    Console.WriteLine($"{entry.Level}: {entry.Message}");
```

## What You'll Learn

### 1. [Document Properties](01_document_properties.html)
- Title, author, subject and keywords from the template
- Setting properties in code
- Bound values in metadata

### 2. [Logging](02_logging.html)
- Log levels
- Appending the log to the document
- Collecting log entries in code
- Custom log handlers

### 3. [Error Handling & Conformance](03_error_handling_conformance.html)
- Strict and Lax conformance modes
- Handling generation failures with `BuildAsync`
- Graceful degradation for missing data

<!-- ### 4. [PDF Versions](04_pdf_versions.html)
- PDF version selection (1.4 - 2.0)
- PDF/A compliance (archival)
- PDF/X compliance (printing)
- Feature compatibility by version -->

### 5. [Security](05_security.html)
- Restrictions in the template
- Owner and user passwords
- Permissions in code

### 6. [Optimization & Performance](06_optimization_performance.html)
- File size
- Image and font choices
- Re-using the factory
- Scaling generation

### 7. [Production & Deployment](07_production_deployment.html)
- Production configuration
- Monitoring and logging
- Common deployment scenarios
- Troubleshooting

## Prerequisites

- **Complete [Getting Started](/paperwork.core/learning/01-getting-started/)**
- **Read [The Factory and the Document Builder](/paperwork.core/quickstart/factory_builder)**

## Key Concepts

### Conformance Modes

**Strict:**
- Unknown elements, attributes and invalid values are errors
- Best for templates you control and test

**Lax** (the default):
- Unknown content is skipped and logged
- Best for templates from other sources

### Logging Levels

```
Verbose  → Everything (debugging)
Messages → Informational messages
Warnings → Potential issues
Errors   → Critical problems
Off      → No logging
```

## Tips for Success

1. **Log everything in development** - `WithLogLevel(PaperworkRequestLogOption.Verbose)`
2. **Collect warnings in production** - and send them to your logging system
3. **Use Lax mode for templates you don't control**
4. **Use Strict mode while developing your own templates**
5. **Always set a title** - PDF viewers show it instead of the file name
6. **Set an owner password whenever you restrict a document**
7. **Re-use one factory** for the whole application

## Common Pitfalls

❌ **Ignoring the result**

```csharp
var result = await factory.NewDocument()
    .WithLayoutFile("invoice.html")
    .BuildAsync();

await File.WriteAllBytesAsync("invoice.pdf", result.Document.Binary);
```

✅ **Check for success**

```csharp
if (!result.Success)
{
    _logger.LogError("Invoice failed: {Message} {Error}", result.Message, result.Error);
    return;
}

await File.WriteAllBytesAsync("invoice.pdf", result.Document.Binary);
```

Or use `SaveAsync` or `BuildBytesAsync`, which throw an exception when generation fails.

## Next Steps

Start with [Document Properties](01_document_properties.html).

Jump to specific topics:
- [Logging](02_logging.html) for diagnostic information
- [Security](05_security.html) for protection
- [Optimization & Performance](06_optimization_performance.html) for production

---

**Related Series:**
- [Getting Started](/paperwork.core/learning/01-getting-started/) - Basic concepts
- [Practical Applications](/paperwork.core/learning/08-practical/) - Real-world examples

---

**Begin configuration →** [Document Properties](01_document_properties.html)
