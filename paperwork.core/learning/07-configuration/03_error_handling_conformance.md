---
layout: default
title: Error Handling & Conformance
nav_order: 3
parent: Document Configuration
parent_url: /paperwork.core/learning/07-configuration/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Error Handling & Conformance

Choose how strictly templates are read, handle documents that cannot be generated, and find the problems in documents that can.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Choose between Strict and Lax conformance modes
- Know which problems stop a document, and which are logged
- Handle failures with `BuildAsync`, or with exceptions
- Report warnings and errors from documents that were generated

---

## Conformance Modes

The conformance mode decides what happens when a template has content the engine does not know - an unknown element, an unknown attribute, or an attribute value that cannot be used.

| | Strict | Lax (the default) |
|---|--------|-------------------|
| Unknown element | The document is not generated | The element is skipped, its content is kept |
| Unknown attribute | The document is not generated | The attribute is skipped |
| Best for | Templates you write and test | Templates from other sources |

Set the mode in the template with the processing instruction:

```html
<?paperwork parser-mode='Strict' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    ...
</html>
```

Add `parser-log='true'` to see what Lax mode skipped - each item is logged as an error in the *Xml Parser* category.

```html
<?paperwork parser-mode='Lax' parser-log='true' append-log='true' log-level='Warnings' ?>
```

{: .note }
> A good approach is Strict while a template is being written, so mistakes are found straight away, and Lax once it is in use.

---

## What Stops a Document

Some problems are always errors, in either mode, because the template cannot be read:

- Invalid XML - `<p>Unclosed <b>bold</p>`
- An expression that cannot be compiled - `{{concat(model.name, 'x'}}`
- An incomplete expression, or the wrong number of function parameters
- Invalid syntax in a `var()` or `calc()` style value

**Missing data is not an error.** A null value part way along a path just gives null, and if the root (such as `model`) has not been set at all, one error is logged and the document is still generated.

The full list is in [Binding, Expression and Template Errors](/paperwork.core/configuration/processing-instructions#binding-expression-and-template-errors).

---

## Handling Failures

### With BuildAsync

`BuildAsync` never throws for a template problem. It returns a `PaperworkResult` with the outcome.

```csharp
using Paperwork;

var result = await factory.NewDocument()
    .WithLayoutFile("invoice.html")
    .WithData("model", invoice)
    .BuildAsync();

if (result.Success)
{
    await File.WriteAllBytesAsync("invoice.pdf", result.Document.Binary);
}
else
{
    // e.g. -406 "303. Document could not be created from the layout, check the syntax and sources"
    Console.WriteLine($"{result.ResultCode}: {result.Message}");

    // The detail - e.g. "The parsed type '...HTMLParagraph' does not contain a definiton
    // for the attribute with name 'wibble' ... [line 2, pos 53]"
    Console.WriteLine(result.Error);
}
```

`Message` is a general description, and `Error` has the engine's own messages, including the line and position in the template.

### With exceptions

`SaveAsync` and `BuildBytesAsync` throw an `InvalidOperationException` when the document cannot be generated. Its message includes the result message and error.

```csharp
try
{
    await factory.NewDocument()
        .WithLayoutFile("invoice.html")
        .WithData("model", invoice)
        .SaveAsync("invoice.pdf");
}
catch (InvalidOperationException ex)
{
    _logger.LogError(ex, "Invoice {Number} could not be generated", invoice.Number);
    throw;
}
```

### With an engine Document

`Document.ParseDocument` reads the template straight away, so template problems throw a `Scryber.PDFParserException` from the parse, before the builder is used.

```csharp
using Scryber;
using Scryber.Components;

try
{
    using var doc = Document.ParseDocument("invoice.html");

    await factory.NewDocument()
        .WithLayout(doc)
        .WithData("model", invoice)
        .SaveAsync("invoice.pdf");
}
catch (PDFParserException ex)
{
    // The template could not be read
    _logger.LogError(ex, "The invoice template is invalid");
    throw;
}
```

---

## Reporting Problems in Generated Documents

A document can be generated and still have problems - a missing image, a font that was not found, a binding that failed. Collect them with a `CollectorTraceLog` (see [Logging](02_logging.html)).

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Logging;

using var doc = Document.ParseDocument("invoice.html");

var log = new CollectorTraceLog(TraceRecordLevel.Warnings, "Invoice", autostart: true);
doc.AddTraceLog(log);

var result = await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", invoice)
    .BuildAsync();

foreach (var entry in log)
{
    // e.g. [Error] Data Binding: The expression {model.name} failed for 'text:kdd_text1' ...
    //      The root variable of the expression has not been set or is null ...
    Console.WriteLine($"[{entry.Level}] {entry.Category}: {entry.Message}");
}
```

---

## Practical Example: Invoice Generator

```csharp
public record InvoiceOutcome(bool Success, byte[] Pdf, string Message, IReadOnlyList<string> Problems);

public class InvoiceGenerator
{
    private readonly IPaperworkFactory _factory;
    private readonly ILogger<InvoiceGenerator> _logger;

    public InvoiceGenerator(IPaperworkFactory factory, ILogger<InvoiceGenerator> logger)
    {
        _factory = factory;
        _logger = logger;
    }

    public async Task<InvoiceOutcome> GenerateAsync(Invoice invoice)
    {
        // Check the data before generating
        if (string.IsNullOrWhiteSpace(invoice.Number))
            return new InvoiceOutcome(false, null, "Invoice number is required", Array.Empty<string>());

        if (invoice.Items == null || invoice.Items.Count == 0)
            return new InvoiceOutcome(false, null, "An invoice needs at least one item", Array.Empty<string>());

        Document doc;
        try
        {
            doc = Document.ParseDocument("Templates/invoice.html");
        }
        catch (PDFParserException ex)
        {
            _logger.LogError(ex, "The invoice template is invalid");
            return new InvoiceOutcome(false, null, "The invoice template is invalid", new[] { ex.Message });
        }

        using (doc)
        {
            var log = new CollectorTraceLog(TraceRecordLevel.Warnings, "Invoice", autostart: true);
            doc.AddTraceLog(log);

            var result = await _factory.NewDocument()
                .WithLayout(doc)
                .WithData("model", invoice)
                .BuildAsync();

            var problems = log.Select(e => $"{e.Category}: {e.Message}").ToList();

            if (!result.Success)
            {
                _logger.LogError("Invoice {Number} failed: {Message} {Error}",
                    invoice.Number, result.Message, result.Error);
                return new InvoiceOutcome(false, null, result.Message, problems);
            }

            if (problems.Count > 0)
                _logger.LogWarning("Invoice {Number} generated with {Count} problems",
                    invoice.Number, problems.Count);

            return new InvoiceOutcome(true, result.Document.Binary, "Generated", problems);
        }
    }
}
```

---

## Try It Yourself

### Exercise 1: Strict and Lax

Add an unknown attribute to a template. Generate it in Strict mode and look at `result.Error`, then in Lax mode with `parser-log='true'` and an appended log.

### Exercise 2: Missing Data

Generate a template without setting its `model`, and find the binding error in a `CollectorTraceLog`.

### Exercise 3: Friendly Messages

Turn the result of a failed `BuildAsync` into a message your users would understand, and log the detail for yourself.

---

## Common Pitfalls

### ❌ Not Checking the Result

```csharp
var result = await builder.BuildAsync();
await File.WriteAllBytesAsync("invoice.pdf", result.Document.Binary);   // null on failure
```

✅ **Solution:** Check `result.Success`, or use `SaveAsync` and catch the exception.

### ❌ Strict Mode for Templates You Don't Control

Any unknown attribute stops the document.

✅ **Solution:** Use Lax for templates from users or other systems, and log what was skipped.

### ❌ Ignoring Warnings

A generated document can still be missing an image or a value.

✅ **Solution:** Collect `Warnings` and above, and report them.

---

## Error Handling Checklist

- [ ] Conformance mode chosen for each template
- [ ] `result.Success` checked, or exceptions caught
- [ ] `result.Error` logged for failures
- [ ] Warnings and errors collected for generated documents
- [ ] Data checked before generating
- [ ] Messages for users are friendly, details go to the log

---

## Next Steps

1. **[Security](05_security.html)** - Protect your documents
2. **[Production & Deployment](07_production_deployment.html)** - Production best practices

---

**Continue learning →** [Security](05_security.html)
