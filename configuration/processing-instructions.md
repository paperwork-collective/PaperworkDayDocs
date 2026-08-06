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
| `parser-mode` | enum | `Strict`, `Lax` | Strict throws on invalid elements; Lax ignores them |
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
- **Recommended for production** - catches errors early
- **Use when**: Template structure is stable and tested

```
<?scryber parser-mode='Strict' ?>
```

### Lax Mode

- **Ignores unrecognized elements** and attributes
- **Logs warnings** instead of throwing exceptions
- **Continues parsing** despite errors
- **Use when**: Developing templates, gradual migration, forward compatibility

```
<?scryber parser-mode='Lax' ?>
```

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
