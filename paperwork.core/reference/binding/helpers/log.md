---
layout: default
title: log
parent: Handlebars Helpers
parent_url: /paperwork.core/reference/binding/helpers/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# log : Debug Logging Helper
{: .no_toc }

Output debug messages to the trace log during template processing. Useful for debugging data binding and template logic. Does not render any visible content in the PDF.

---

<details class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Syntax


{% raw %}
```handlebars
{{log message}}
{{log message1 expression message2 level="info" category="debug"}}
```
{% endraw %}


---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message(s)` | String/Expression | Yes | One or more strings or expressions to log (concatenated) |
| `level` | String | No | Log level: `debug`, `info`, `warn`, `error` (default: `info`) |
| `category` | String | No | Category for filtering log messages (optional) |

---

## Log Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| `debug` | Verbose debugging | Detailed tracing during development |
| `info` | Informational | General information (default) |
| `warn` | Warning | Potential issues that don't stop execution |
| `error` | Error | Significant problems worth noting |

---

## Examples

### Basic Logging


{% raw %}
```handlebars
{{log "Processing user profile"}}
```
{% endraw %}


### Logging Values


{% raw %}
```handlebars
{{#with model.user}}
  {{log "User: " name " (ID: " id ")"}}
{{/with}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    user = new {
        name = "John Doe",
        id = 12345
    }
});
```

**Log Output:**
```
User: John Doe (ID: 12345)
```

### With Log Level


{% raw %}
```handlebars
{{log "Starting data processing" level="debug"}}

{{#if model.hasError}}
  {{log "Error processing order: " model.errorMessage level="error"}}
{{/if}}

{{log "Processing complete" level="info"}}
```
{% endraw %}


### With Category for Filtering


{% raw %}
```handlebars
{{log "Validating user input" category="validation"}}

{{#if model.isValid}}
  {{log "Validation passed" category="validation" level="info"}}
{{else}}
  {{log "Validation failed: " model.validationErrors category="validation" level="warn"}}
{{/if}}
```
{% endraw %}


### Logging in Loops


{% raw %}
```handlebars
{{#each model.orders}}
  {{log "Processing order #" this.orderNumber category="orders"}}

  {{#if this.total > 1000}}
    {{log "High-value order: $" this.total level="info" category="orders"}}
  {{/if}}
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    orders = new[] {
        new { orderNumber = "12345", total = 1250.00m },
        new { orderNumber = "12346", total = 45.99m },
        new { orderNumber = "12347", total = 2100.00m }
    }
});
```

**Log Output:**
```
Processing order #12345
High-value order: $1250
Processing order #12346
Processing order #12347
High-value order: $2100
```

### Logging with Expressions


{% raw %}
```handlebars
{{#with model.user}}
  {{log if(isModerator, "User is a moderator", "User is not a moderator") level="debug" category="auth"}}

  {{log "User " name " has " concat(format(loginCount, 'N0'), " logins") category="stats"}}
{{/with}}
```
{% endraw %}


### Conditional Debugging


{% raw %}
```handlebars
{{#each model.items}}
  {{#if this.price > 100}}
    {{log "Expensive item: " this.name " ($" this.price ")" level="warn" category="pricing"}}
  {{/if}}

  {{#if this.stock <= 0}}
    {{log "Out of stock: " this.name level="error" category="inventory"}}
  {{/if}}
{{/each}}
```
{% endraw %}


---

## Underlying Implementation

The `{% raw %}{{log}}{% endraw %}` helper compiles to:


{% raw %}
```xml
<log data-message="{{concatenated expressions}}"
     data-level="Verbose|Message|Warning|Error"
     data-category="category name" />
```
{% endraw %}


The log entry is written to the document's trace log during databinding and does not produce any visible output in the PDF.

---

## Notes

- Does not render any visible content in the PDF
- Messages are written to the document's trace log
- Multiple values are automatically concatenated with spaces
- Supports expressions (function calls, property access, etc.)
- Unknown parameters are silently ignored
- Use `WithLogLevel(...)` on the builder, or `append-log='true'` in the template, to add the log to the document
- Collect log output with a `CollectorTraceLog` for unit testing
- Category helps filter log messages for specific features
- Log level affects visibility based on trace log configuration
- Useful for debugging complex conditional logic and iterations

---

## Enabling Trace Logging

To see log output, add the log to the end of the document:

```csharp
await factory.NewDocument()
    .WithLayoutFile("template.html")
    .WithData("model", model)
    .WithLogLevel(PaperworkRequestLogOption.Verbose)
    .SaveAsync("output.pdf");
```

Or collect the entries in code, for example in a unit test:

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Logging;

using var doc = Document.ParseDocument("template.html");

var collector = new CollectorTraceLog(TraceRecordLevel.Verbose, "Test", autostart: true);
doc.AddTraceLog(collector);

await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", model)
    .SaveAsync("output.pdf");

foreach (var entry in collector)
{
    Console.WriteLine($"[{entry.Level}] {entry.Category}: {entry.Message}");
}
```

See [Logging](/paperwork.core/learning/07-configuration/02_logging).

---

## See Also

- [#if Helper](./if.md)
- [#each Helper](./each.md)
- [#with Helper](./with.md)
- [Debugging Templates Guide](../../learning/02-data-binding/07_debugging.html)

---
