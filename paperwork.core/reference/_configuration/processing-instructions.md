---
layout: default
title: Processing Instructions
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 1
---

# Processing Instructions

Processing instructions provide **document-level** parser configuration, overriding application configuration for a specific document.

## Syntax

```xml
<?scryber parser-mode='Strict' parser-log='false' append-log='false' 
         log-level='Warnings' controller='MyNamespace.MyController, MyAssembly' 
         parser-culture='en-GB' ?>
```

## Supported Attributes

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `parser-mode` | enum | `Strict`, `Lax` | Strict throws on invalid elements; Lax ignores them |
| `parser-log` | bool | `true`, `false` | Enable parser trace output |
| `append-log` | bool | `true`, `false` | Append trace log to PDF document |
| `log-level` | enum | `Off`, `Errors`, `Warnings`, `Messages`, `Verbose`, `Diagnostic` | Minimum log level |
| `parser-culture` | string | Culture code | e.g., `en-GB`, `fr-FR` - affects number/date parsing |
| `controller` | string | Assembly-qualified type name | Document controller class |

## Examples

### Basic Parser Configuration

```xml
<?scryber parser-mode='Strict' log-level='Warnings' ?>
```

### With Controller

```xml
<?scryber parser-mode='Strict' 
          controller='MyCompany.Reports.SalesController, MyCompany.Reports' ?>
```

### Development Mode

```xml
<?scryber parser-mode='Lax' 
          parser-log='true' 
          append-log='true' 
          log-level='Verbose' ?>
```

### Localized Document

```xml
<?scryber parser-culture='fr-FR' ?>
```

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

### Attribute Extraction

**String parsing in `ParserSettings.GetProcessingValue()`:**

```csharp
// Scryber.Common/Generation/ParserSettings.cs
private string GetProcessingValue(string attributename, string full)
{
    int index = full.IndexOf(attributename + "=");
    
    if (index == 0 || (index > 0 && full[index - 1] == ' '))
    {
        index += attributename.Length + 1;
        char separator = full[index];
        int start, end;

        if (separator == '\'' || separator == '"')
        {
            start = index + 1;
            end = full.IndexOf(separator, start);
        }
        else
        {
            start = index;
            end = full.IndexOf(' ', start);
            if (end < start)
                end = full.Length;
        }

        return full.Substring(start, end - start);
    }
    return string.Empty;
}
```

### Attribute Processing

```csharp
public void ReadProcessingInstructions(string value)
{
    if (!string.IsNullOrEmpty(value))
    {
        // Parser Mode
        string mode = GetProcessingValue("parser-mode", value);
        if (!string.IsNullOrEmpty(mode))
        {
            if (string.Equals("strict", mode, StringComparison.OrdinalIgnoreCase))
                this.ConformanceMode = ParserConformanceMode.Strict;
            else if (string.Equals("lax", mode, StringComparison.OrdinalIgnoreCase))
                this.ConformanceMode = ParserConformanceMode.Lax;
        }

        // Parser Logging
        string log = GetProcessingValue("parser-log", value);
        bool dolog;
        if (!string.IsNullOrEmpty(log) && bool.TryParse(log, out dolog))
        {
            this.LogParserOutput = dolog;
        }

        // Append Log
        string append = GetProcessingValue("append-log", value);
        bool doappend = false;
        if (!string.IsNullOrEmpty(append) && bool.TryParse(append, out doappend))
        {
            this.AppendLog = doappend;
        }

        // Parser Culture
        string culture = GetProcessingValue("parser-culture", value);
        if(!string.IsNullOrEmpty(culture))
        {
            System.Globalization.CultureInfo found = 
                System.Globalization.CultureInfo.GetCultureInfo(culture);
            this.SpecificCulture = found;
        }

        // Log Level
        string level = GetProcessingValue("log-level", value);
        if (!string.IsNullOrEmpty(level))
        {
            TraceRecordLevel parsed;
            if (Enum.TryParse<TraceRecordLevel>(level, true, out parsed))
            {
                this.TraceLog.SetRecordLevel(parsed);
                this.PerformanceMonitor.RecordMeasurements = 
                    (parsed <= TraceRecordLevel.Verbose);
            }
        }

        // Component Controller
        string controllername = GetProcessingValue("controller", value);
        if (!string.IsNullOrEmpty(controllername))
        {
            Type found = Type.GetType(controllername, true);
            this.ControllerType = found;
        }
    }
}
```

## Use Cases

### 1. Production Document (Strict Mode)

```xml
<?scryber parser-mode='Strict' log-level='Errors' ?>
<pdf:Document xmlns:pdf="...">
    <!-- Throws exception on any invalid element -->
</pdf:Document>
```

### 2. Development Document (Lax Mode with Logging)

```xml
<?scryber parser-mode='Lax' 
          parser-log='true' 
          append-log='true' 
          log-level='Diagnostic' ?>
<pdf:Document xmlns:pdf="...">
    <!-- Skips invalid elements, logs everything to PDF -->
</pdf:Document>
```

### 3. Controller-Based Document

```xml
<?scryber controller='MyCompany.Reports.InvoiceController, MyCompany.Reports' ?>
<pdf:Document xmlns:pdf="...">
    <Pages>
        <pdf:Page on-init='InitInvoice' on-load='LoadData'>
            <Content>
                <pdf:Label id='CustomerLabel' />
            </Content>
        </pdf:Page>
    </Pages>
</pdf:Document>
```

### 4. Localized Document

```xml
<?scryber parser-culture='de-DE' ?>
<pdf:Document xmlns:pdf="...">
    <!-- Numbers formatted as 1.234,56 -->
    <!-- Dates formatted as 31.12.2025 -->
</pdf:Document>
```

## Parser Modes

### Strict Mode

- **Throws exceptions** on unrecognized elements or attributes
- **Enforces valid structure** according to component definitions
- **Recommended for production** - catches errors early
- **Use when**: Template structure is stable and tested

```xml
<?scryber parser-mode='Strict' ?>
```

### Lax Mode

- **Ignores unrecognized elements** and attributes
- **Logs warnings** instead of throwing exceptions
- **Continues parsing** despite errors
- **Use when**: Developing templates, gradual migration, forward compatibility

```xml
<?scryber parser-mode='Lax' ?>
```

## Log Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| `Off` | No logging | Production, performance-critical |
| `Errors` | Errors only | Production with error tracking |
| `Warnings` | Errors and warnings | Default production level |
| `Messages` | Info messages | Development, debugging |
| `Verbose` | Detailed execution | Detailed debugging |
| `Diagnostic` | Everything including performance | Performance analysis |

## Best Practices

### Production Documents
```xml
<?scryber parser-mode='Strict' log-level='Warnings' ?>
```

### Development Documents
```xml
<?scryber parser-mode='Lax' parser-log='true' log-level='Verbose' ?>
```

### Debugging Documents
```xml
<?scryber parser-mode='Lax' 
          parser-log='true' 
          append-log='true' 
          log-level='Diagnostic' ?>
```

### Localized Documents
```xml
<?scryber parser-culture='en-GB' log-level='Warnings' ?>
```

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

## Related Documentation

- [Document Controllers](document-controllers) - Using the `controller` attribute
- [Configuration Files](configuration-files) - Application-level configuration
- [Best Practices](best-practices) - Configuration guidelines
