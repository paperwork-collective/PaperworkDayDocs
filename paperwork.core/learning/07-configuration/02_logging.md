---
layout: default
title: Logging
nav_order: 2
parent: Document Configuration
parent_url: /paperwork.core/learning/07-configuration/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Logging

See what happens as a document is generated - for debugging templates, monitoring production, and finding performance problems.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Append the generation log to a document
- Choose the right log level
- Collect log entries in code
- Send the log to your own logging system
- Use the log to troubleshoot problems

---

## Log Levels

| Level | Records |
|-------|---------|
| `Off` | Nothing |
| `Errors` | Errors only |
| `Warnings` | Errors and warnings |
| `Messages` | Errors, warnings and information messages |
| `Verbose` | Everything above, plus detailed processing steps |
| `Diagnostic` | Everything, including layout and positioning detail (engine logs only) |

---

## Appending the Log to the Document

The quickest way to see what happened is to add the log as pages at the end of the PDF.

### With the document builder

```csharp
using Paperwork;
using Paperwork.Generation;

await factory.NewDocument()
    .WithLayoutFile("invoice.html")
    .WithData("model", invoice)
    .WithLogLevel(PaperworkRequestLogOption.Messages)
    .SaveAsync("invoice.pdf");
```

The builder levels are `Template` (the default - use the template's own setting), `Off`, `Errors`, `Warnings`, `Messages` and `Verbose`.

### In the template

```html
<?paperwork append-log='true' log-level='Messages' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    ...
</html>
```

See [Processing Instructions](/paperwork.core/configuration/processing-instructions).

### On an engine Document

```csharp
using var doc = Document.ParseDocument("invoice.html");
doc.AppendTraceLog = true;
doc.TraceLog.SetRecordLevel(TraceRecordLevel.Messages);

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("invoice.pdf");
```

{: .note }
> The appended log is a development tool. Turn it off for documents that go to users.

---

## Collecting Log Entries in Code

A `CollectorTraceLog` keeps the entries in memory, so they can be read after the document is generated. Add it to an engine `Document` (see [The Engine Document](/paperwork.core/configuration/engine-document)).

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Logging;

using var doc = Document.ParseDocument("invoice.html");

var collector = new CollectorTraceLog(TraceRecordLevel.Warnings, "Invoice", autostart: true);
doc.AddTraceLog(collector);

await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", invoice)
    .SaveAsync("invoice.pdf");

foreach (var entry in collector)
{
    Console.WriteLine($"[{entry.Level}] {entry.Category}: {entry.Message}");
}
```

---

## Log Level Selection

### Development

Use `Verbose`, appended to the document, while building and testing templates.

```csharp
builder.WithLogLevel(PaperworkRequestLogOption.Verbose);
```

### Production

Collect `Warnings` and above in code, and send them to your logging system. Don't append the log to the document.

```csharp
var collector = new CollectorTraceLog(TraceRecordLevel.Warnings, "Production", autostart: true);
doc.AddTraceLog(collector);
```

### Performance-Critical

Use `Errors` or `Off` - detailed logging takes time on large documents.

---

## Custom Log Handlers

A custom log inherits from `TraceLog` and overrides `Record`. Every entry the document logs at or above its level is passed to it.

### Forwarding to Microsoft.Extensions.Logging

```csharp
using Microsoft.Extensions.Logging;
using Scryber;
using Scryber.Logging;

public class LoggerTraceLog : TraceLog
{
    private readonly ILogger _logger;

    public LoggerTraceLog(ILogger logger, TraceRecordLevel level)
        : base(level, "Paperwork")
    {
        _logger = logger;
    }

    protected override void Record(string inset, TraceLevel level, TimeSpan timestamp,
        string category, string message, Exception ex)
    {
        var logLevel = level switch
        {
            TraceLevel.Failure => LogLevel.Critical,
            TraceLevel.Error   => LogLevel.Error,
            TraceLevel.Warning => LogLevel.Warning,
            TraceLevel.Message => LogLevel.Information,
            TraceLevel.Verbose => LogLevel.Debug,
            _                  => LogLevel.Trace
        };

        _logger.Log(logLevel, ex, "{Category}: {Message}", category, message);
    }
}
```

**Usage:**

```csharp
using var doc = Document.ParseDocument("invoice.html");
doc.AddTraceLog(new LoggerTraceLog(_logger, TraceRecordLevel.Warnings));

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("invoice.pdf");
```

The same pattern works for Serilog, NLog, a file or a database - write the entry in `Record`.

To add a log to every document without changing code, register a log factory in configuration. See [Logging and Tracing](/paperwork.core/configuration/logging-extension).

---

## Practical Example: Production Generator with Logging

```csharp
public class InvoiceGenerator
{
    private readonly IPaperworkFactory _factory;
    private readonly ILogger<InvoiceGenerator> _logger;

    public InvoiceGenerator(IPaperworkFactory factory, ILogger<InvoiceGenerator> logger)
    {
        _factory = factory;
        _logger = logger;
    }

    public async Task<byte[]> GenerateAsync(Invoice invoice)
    {
        using var doc = Document.ParseDocument("Templates/invoice.html");

        var collector = new CollectorTraceLog(TraceRecordLevel.Warnings, "Invoice", autostart: true);
        doc.AddTraceLog(collector);

        var result = await _factory.NewDocument()
            .WithLayout(doc)
            .WithData("model", invoice)
            .BuildAsync();

        // Report any warnings or errors with the invoice number
        foreach (var entry in collector)
        {
            _logger.LogWarning("Invoice {Number} [{Level}] {Category}: {Message}",
                invoice.Number, entry.Level, entry.Category, entry.Message);
        }

        if (!result.Success)
        {
            _logger.LogError("Invoice {Number} failed: {Message} {Error}",
                invoice.Number, result.Message, result.Error);
            throw new InvalidOperationException(result.Message);
        }

        return result.Document.Binary;
    }
}
```

---

## Log Analysis and Troubleshooting

### Common Error Patterns

| Log message | Likely cause |
|-------------|--------------|
| Could not load the image for component ... | The image path or url is wrong, or the request failed |
| The font ... could not be loaded, falling back to Courier ... | The font is not registered, or not at the requested weight or style |
| Cannot bind the values for ... | An expression in the template failed - the message gives the reason |
| Could not compile the expression ... | Invalid expression syntax in the template |
| Skipping unknown attribute ... | An unknown attribute (an error in Strict mode, skipped in Lax) |

---

## Try It Yourself

### Exercise 1: Custom Logger

Write a `TraceLog` that writes each entry to the console in colour by level.

### Exercise 2: Template Health Check

Generate each of your templates with a `CollectorTraceLog` at `Warnings`, and list any template with entries.

### Exercise 3: Find the Slow Template

Append the `Verbose` log to a large document, and look at the timings for each stage.

---

## Common Pitfalls

### ❌ No Logging in Production

Problems in production documents go unnoticed.

✅ **Solution:** Collect `Warnings` and above, and send them to your logging system.

### ❌ Too Much Logging in Production

`Verbose` and `Diagnostic` logging slow down generation.

✅ **Solution:** Use `Warnings` or `Errors` in production.

### ❌ Appending the Log to User Documents

✅ **Solution:** Only use `WithLogLevel` or `append-log` while developing.

---

## Logging Best Practices Checklist

- [ ] `Verbose` appended log while developing templates
- [ ] `Warnings` collected in production
- [ ] Log entries sent to the application's logging system
- [ ] Appended log turned off for user documents
- [ ] Template and data identifiers included in logged messages

---

## Next Steps

1. **[Error Handling & Conformance](03_error_handling_conformance.html)** - Strict and Lax modes
2. **[Security](05_security.html)** - Passwords and permissions

---

**Continue learning →** [Error Handling & Conformance](03_error_handling_conformance.html)
