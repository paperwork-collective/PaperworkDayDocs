---
layout: default
title: Processing Instructions
parent: Configuration & Extension
parent: Configuration & Extension
parent_url: /configuration/
has_children: false
has_toc: false
nav_order: 1
---

# Processing Instructions

Processing instructions provide **document-level** configuration, overriding application configuration for a specific document.

## Syntax

```
<?scryber parser-mode='Strict' parser-log='false' append-log='false' 
         log-level='Warnings' controller='MyNamespace.MyController, MyAssembly' 
         parser-culture='en-GB' ?>
```

---

## Supported Attributes

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `parser-mode` | enum | `Strict`, `Lax` | Strict throws on invalid elements; Lax ignores them. Default is `Lax`. See [Binding, Expression and Template Errors](#binding-expression-and-template-errors) for how expression errors are handled |
| `parser-log` | bool | `true`, `false` | Enable parser trace output |
| `append-log` | bool | `true`, `false` | Append trace log to PDF document |
| `log-level` | enum | `Off`, `Errors`, `Warnings`, `Messages`, `Verbose`, `Diagnostic` | Minimum log level |
| `parser-culture` | string | Culture code | e.g., `en-GB`, `fr-FR` - affects number/date parsing |
| `controller` | string | Assembly-qualified type name | Document controller class |

---

## Examples

### Basic Parser Configuration

```
<?scryber parser-mode='Lax' log-level='Warnings' ?>
```

### With Controller

```
<?scryber parser-mode='Strict' 
          controller='MyCompany.Reports.SalesController, MyCompany.Reports' ?>
```

### Development Mode

```
<?scryber parser-mode='Strict' 
          parser-log='true' 
          append-log='true' 
          log-level='Verbose' ?>
```

### Localized Document

```
<?scryber parser-culture='fr-FR' ?>
```

---

## Implementation Details

### Processing Instruction Parsing

**Parser implementation in `XMLParser.ParseProcessingInstructions()`:**

```csharp
// Scryber.Generation/XMLParser.cs
protected void ParseProcessingInstructions(XmlReader reader, string name)
{
    string value = reader.Value;
    this.Settings.ReadProcessingInstructions(value);
    
    LogAdd(reader, TraceLevel.Message, 
        "Parsed processing instructions. Controller = {5}, parser mode = {1}, logging = {2}, append-log = {3}, log-level = {4}", 
        value, this.Mode, this.Settings.LogParserOutput, 
        this.Settings.AppendLog, this.Settings.TraceLog.RecordLevel, 
        this.Settings.ControllerType == null ? "[NONE]" : this.Settings.ControllerType.ToString());
}
```
---

## Use Cases

### 1. Production Document (Lax Mode)

```html
<?scryber parser-mode='Lax' log-level='Errors' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    <!-- Skips invalid elements, but logs everything. -->
</html>
```

### 2. Development Document (Strict Mode with Logging)

```html
<?scryber parser-mode='Strict' 
          parser-log='true' 
          append-log='true' 
          log-level='Messages' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    <!-- Throws exception on any invalid element, and logs document execution.-->
</html>
```

### 3. Controller-Based Document

```html
<?scryber controller='MyCompany.Reports.InvoiceController, MyCompany.Reports' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    <body on-init='InitInvoice' on-load='LoadData'>
        <main>
            <span id='CustomerLabel' />
        </main>
    </body>
</html>
```

### 4. Localized Document

```html
<?scryber parser-culture='de-DE' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    <!-- Numbers formatted as 1.234,56 in template content -->
    <!-- Dates formatted as 31.12.2025 in template content -->
</html>

**NOTE:** Content bound to values within the document will be parsed under the current ThreadCulture, the parser culture is purely for fixed values within the template.

```

---

## Parser Modes

Using Lax in production, and strict in development means that end users will not face errors that have been missed. And will at least receive the document they requested.

### Strict Mode

- **Throws exceptions** on unrecognized elements or attributes
- **Enforces valid structure** according to component definitions
- **Recommended for development and testing** - catches errors early, before they reach a user
- **Use when**: Developing templates, running automated tests, or checking a template before release

```
<?scryber parser-mode='Strict' ?>
```

### Lax Mode

- **Ignores unrecognized elements** and attributes
- **Logs warnings** instead of throwing exceptions
- **Continues parsing** despite errors
- **Recommended for production** - the end user still receives the document they requested
- **Use when**: Running in production, gradual migration, forward compatibility
- **Invalid syntax is still an error** - a template with an invalid expression throws in either mode. Lax only relaxes unknown content and missing data. See [Binding, Expression and Template Errors](#binding-expression-and-template-errors).

```
<?scryber parser-mode='Lax' ?>
```

---

## Binding, Expression and Template Errors

The parser mode also decides what happens when an **expression**, **binding** or **template** is wrong. Most outcomes are the same in both modes - the mode only matters where the table says so.

> **Since 9.7.5** - the outcomes below were made consistent. Rows marked **9.7.5** changed in that release. In addition, `Document.CreateParserSettings()` and `CreateParserSettingsAsync()` now default to `Lax` (previously `Strict`), matching `Document.ParseDocument()` and the document render options. A `parser-mode` processing instruction still overrides the default.

**Parse** is when the template is read (`Document.ParseDocument`). **Bind** is when the data is bound and the document is generated (`SaveAsPDF`, or `DataBind`). *Throw* means an exception is raised and no document is produced. *Log error* means one entry is written to the trace log at `Error` level, the value is left unset, and generation continues.

The guiding rule is that **invalid syntax is invalid completely** - it always throws, in strict or lax - while **missing data is not a syntax error**.

### Invalid syntax

| Scenario | Example | Strict | Lax | Since |
|----------|---------|--------|-----|-------|
| Expression cannot be compiled, in the main template (text or attribute) | `{{concat(model.name, 'x'}}` | Throw on parse | Throw on parse | |
| Expression compiles, but is incomplete when evaluated | `{{model.items[0}}`, `{{model.missing.[}}` | Throw on bind | Throw on bind | **9.7.5** (lax previously logged a warning) |
| Wrong number of function parameters | `{{abs(1, 2)}}` | Throw on bind | Throw on bind | **9.7.5** (lax previously logged a warning) |
| Invalid expression inside a repeating or conditional template | `{{#each model.items}}{{concat(this.name, 'x'}}{{/each}}` | Throw on bind | Throw on bind | **9.7.5** (lax previously logged an error and skipped the template) |
| Invalid XML in the main template | `<p>Unclosed <b>bold</p>` | Throw on parse | Throw on parse | |
| Invalid XML inside a repeating template | `{{#each ...}}<p>Unclosed <b>bold</p>{{/each}}` | Throw on parse | Throw on parse | |

Invalid XML inside a repeating template is raised on parse, not bind, because the content of the loop is read as part of the document.

### Missing data in an expression

Using `model.missing.value` as the example.

| Scenario | Strict | Lax | Since |
|----------|--------|-----|-------|
| There is no `model` (not set, or null) | Log error | Log error | **9.7.5** (strict previously threw, lax logged a warning twice) |
| `model` exists, but `missing` does not exist or is null | Silent, value is null | Silent, value is null | **9.7.5** (strict previously threw, lax logged a warning) |
| `missing` exists, but `value` does not exist or is null | Silent, value is null | Silent, value is null | |
| Any other failure while evaluating (e.g. an invalid conversion) | Throw on bind | Log warning | |
| An expression supplied as data to `eval()` is invalid | Throw on bind | Log warning | |

Only the root of the path (`model`) not being set is reported. A null part way along a path, or at the end of it, is normal data and just results in null - so `{{concat(index(), '. ', .object.value)}}` with no `object` outputs `1. `.

An expression that is supplied as *data* to `eval()` is not part of the template, so it is treated as any other evaluation failure, even if it is not valid syntax.

### CSS expressions

`var()` and `calc()` in `style` attributes and stylesheets follow the same rules.

| Scenario | Example | Strict | Lax | Since |
|----------|---------|--------|-----|-------|
| Invalid syntax in an inline `style` attribute | `style="color: var(model.value, red;"` | Throw on parse | Throw on parse | |
| Invalid syntax in a stylesheet | `:root { --x: var(model.value, red; }` | Throw when the styles are parsed (as the document is initialized) | Throw when the styles are parsed | **9.7.5** (previously only found later, when bound or output) |
| Incomplete expression | `var(model.missing.[, red)`, `calc(1 + )` | Throw on bind | Throw on bind | |
| `var()` **with** a default, and there is no `model`, no `missing` or no `value` | `var(model.missing.value, red)` | Default is used, silent | Default is used, silent | **9.7.5** (a missing `model` or `missing` previously threw) |
| `var()` **without** a default, and there is no `model` | `var(model.missing.value)` | Log error, property unset | Log error, property unset | **9.7.5** (previously threw) |
| `var()` **without** a default, and there is no `missing` or no `value` | `var(model.missing.value)` | Silent, property unset | Silent, property unset | **9.7.5** (a missing `missing` previously threw) |

---

## Log Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| `Off` | No logging | Production, performance-critical |
| `Errors` | Errors only | Production with error tracking |
| `Warnings` | Errors and warnings | Default production level |
| `Messages` | Info messages | Development, debugging |
| `Verbose` | Detailed execution | Detailed debugging |
| `Diagnostic` | Everything including performance, positioning and structure | Performance analysis |

See [Logging and Tracing](logging-extension) for full details on log levels, appending the log to a PDF, and routing output to custom sinks.

---

## Best Practices

### Production Documents

```
<?scryber parser-mode='Lax' log-level='Errors' ?>
```

### Development Documents
```
<?scryber parser-mode='Strict' parser-log='true' log-level='Messages' ?>
```

### Debugging Documents
```
<?scryber parser-mode='Lax' 
          parser-log='true' 
          append-log='true' 
          log-level='Verbose' ?>
```

Verbose provides a high level of detail to identify what issues have occured without the **significant** performance drain or Diagnostic, which should only be used in extraneous circumstances.

### Localized Documents
```
<?scryber parser-culture='en-GB' log-level='Warnings' ?>
```

---

## Programmatic Configuration

Processing instructions can also be set programmatically:

```csharp
var settings = new ParserSettings(/* ... */);
settings.ConformanceMode = ParserConformanceMode.Strict;
settings.LogParserOutput = false;
settings.TraceLog.SetRecordLevel(TraceRecordLevel.Warnings);
settings.SpecificCulture = new CultureInfo("en-GB");
settings.ControllerType = typeof(MyController);

var doc = Document.ParseDocument(stream, ParseSourceType.DynamicContent, settings);
```

---

## Related Documentation

- [Document Controllers](document-controllers) - Using the `controller` attribute
- [Configuration Files](configuration-structure) - Application-level configuration
- [Logging and Tracing](logging-extension) - Log levels, appending to PDF, and custom log sinks
- [Best Practices](best-practices) - Configuration guidelines
