---
layout: default
title: Font Configuration
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 7
---

# Font Configuration

Scryber's font system supports **custom TrueType/OpenType fonts** loaded from the file system, with a multi-tiered registry for font lookup. The system supports:
- Custom user fonts (TTF/OTF files)
- System-installed fonts
- Embedded Type 1 fonts (PDF standard fonts)
- Generic font family mappings

## Font Architecture

```
┌──────────────────────────────────────────────────────┐
│ Template Request                                      │
│  <Styles>                                             │
│    <pdf:Font-Family>Roboto</pdf:Font-Family>        │
│  </Styles>                                            │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Font Registry Lookup (4 tiers)                       │
│  1. Custom Registry (user-registered fonts)          │
│  2. System Registry (OS fonts)                       │
│  3. Static Registry (embedded Type 1)                │
│  4. Generic Registry (family mappings)               │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Font Selection                                        │
│  Match: Family + Weight + Style → Font File         │
│  Extract: TTF metadata, glyph metrics               │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┘
│ PDF Embedding                                         │
│  Subset glyphs, embed font data in PDF              │
└──────────────────────────────────────────────────────┘
```

## Font Registries

### 1. Static Registry (Embedded Type 1)

**Built-in PDF standard fonts** (always available, no file required):
- Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic
- Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique
- Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique
- Symbol, ZapfDingbats

### 2. System Registry (Platform Fonts)

**Discovered from OS font directories:**
- **Windows**: `C:\Windows\Fonts\`
- **macOS**: `/Library/Fonts/`, `/System/Library/Fonts/`
- **Linux**: `/usr/share/fonts/`, `/usr/local/share/fonts/`

Loaded lazily on first font request.

### 3. Custom Registry (User-Registered)

**Fonts explicitly registered** via configuration or API.

### 4. Generic Registry (Family Mappingsancements)

**Generic family names** mapped to concrete fonts:
- `sans-serif` → Helvetica
- `serif` → Times-Roman  
- `monospace` → Courier
- `cursive` → (system-dependent)
- `fantasy` → (system-dependent)

## Configuration

### Basic Font Registration

**scrybersettings.json:**

```json
{
  "Scryber": {
    "Fonts": {
      "Register": [
        {
          "Family": "Roboto",
          "File": "/path/to/fonts/Roboto-Regular.ttf",
          "Bold": "/path/to/fonts/Roboto-Bold.ttf",
          "Italic": "/path/to/fonts/Roboto-Italic.ttf",
          "BoldItalic": "/path/to/fonts/Roboto-BoldItalic.ttf"
        },
        {
          "Family": "Open Sans",
          "File": "/path/to/fonts/OpenSans-Regular.ttf",
          "Bold": "/path/to/fonts/OpenSans-Bold.ttf"
        }
      ]
    }
  }
}
```

### Font Registration Properties

| Property | Required | Description |
|----------|----------|-------------|
| `Family` | Yes | Font family name (used in CSS font-family) |
| `File` | Yes | Path to regular weight font file (.ttf or .otf) |
| `Bold` | No | Path to bold weight font file |
| `Italic` | No | Path to italic style font file |
| `BoldItalic` | No | Path to bold+italic font file |

### Path Resolution

Paths can be:
- **Absolute**: `/usr/share/fonts/myfonts/Roboto-Regular.ttf`
- **Relative to app**: `fonts/Roboto-Regular.ttf`
- **Relative to configuration file**: `./fonts/Roboto-Regular.ttf`

## Template Usage

Once registered, use fonts in templates:

```xml
<pdf:Document xmlns:pdf='...'>
    
    <Styles>
        <pdf:Style applied-class='heading'>
            <pdf:Font-Family>Roboto</pdf:Font-Family>
            <pdf:Font-Size>24pt</pdf:Font-Size>
            <pdf:Font-Bold>true</pdf:Font-Bold>
        </pdf:Style>
        
        <pdf:Style applied-class='body'>
            <pdf:Font-Family>Open Sans</pdf:Font-Family>
            <pdf:Font-Size>11pt</pdf:Font-Size>
        </pdf:Style>
    </Styles>
    
    <Pages>
        <pdf:Page>
            <Content>
                <pdf:Label class='heading' text='Hello World' />
                <pdf:Label class='body' text='This uses Open Sans font.' />
            </Content>
        </pdf:Page>
    </Pages>
    
</pdf:Document>
```

## Implementation Details

### Font Loading

**Font registration in `FontFactory.UnsafeLoadCustomFonts()`:**

```csharp
// Scryber.Drawing/FontFactory.cs
private static void UnsafeLoadCustomFonts(FontOptions options)
{
    if (options.Register != null && options.Register.Count > 0)
    {
        foreach (var reg in options.Register)
        {
            try
            {
                // Load regular weight
                if (!string.IsNullOrEmpty(reg.File))
                {
                    var info = LoadFontFile(reg.File);
                    _custom[info.FamilyName + "|" + info.Weight + "|" + info.Style] = info;
                }
                
                // Load bold
                if (!string.IsNullOrEmpty(reg.Bold))
                {
                    var info = LoadFontFile(reg.Bold);
                    _custom[info.FamilyName + "|Bold|Regular"] = info;
                }
                
                // Load italic
                if (!string.IsNullOrEmpty(reg.Italic))
                {
                    var info = LoadFontFile(reg.Italic);
                    _custom[info.FamilyName + "|Regular|Italic"] = info;
                }
                
                // Load bold+italic
                if (!string.IsNullOrEmpty(reg.BoldItalic))
                {
                    var info = LoadFontFile(reg.BoldItalic);
                    _custom[info.FamilyName + "|Bold|Italic"] = info;
                }
            }
            catch (Exception ex)
            {
                // Log error but continue loading other fonts
                TraceLog.Add(TraceLevel.Error, "FontFactory", 
                    $"Failed to load font '{reg.Family}': {ex.Message}");
            }
        }
    }
}
```

### Font Lookup Hierarchy

**Font resolution in `FontFactory.GetFont()`:**

```csharp
public static PDFFont GetFont(string family, FontWeight weight, FontStyle style)
{
    string key = BuildFontKey(family, weight, style);
    
    // 1. Check custom registry
    if (_custom.TryGetValue(key, out FontInfo customFont))
    {
        return CreateFontFromInfo(customFont);
    }
    
    // 2. Check system registry
    if (_system == null)
        LoadSystemFonts();
        
    if (_system.TryGetValue(key, out FontInfo systemFont))
    {
        return CreateFontFromInfo(systemFont);
    }
    
    // 3. Check static registry (Type 1 fonts)
    if (_static.TryGetValue(key, out FontInfo staticFont))
    {
        return CreateFontFromInfo(staticFont);
    }
    
    // 4. Check generic registry
    string genericFamily = ResolveGenericFamily(family);
    if (genericFamily != family)
    {
        return GetFont(genericFamily, weight, style);  // Recursive lookup
    }
    
    // 5. Fallback to Helvetica
    return GetFont("Helvetica", FontWeight.Regular, FontStyle.Regular);
}
```

### Font Key Generation

```csharp
private static string BuildFontKey(string family, FontWeight weight, FontStyle style)
{
    string weightStr = weight == FontWeight.Bold ? "Bold" : "Regular";
    string styleStr = style == FontStyle.Italic ? "Italic" : "Regular";
    
    return $"{family}|{weightStr}|{styleStr}";
}
```

## Advanced Configuration

### Multiple Font Weights

Register a complete font family with multiple weights:

```json
{
  "Scryber": {
    "Fonts": {
      "Register": [
        {
          "Family": "Roboto",
          "File": "fonts/Roboto-Regular.ttf",
          "Bold": "fonts/Roboto-Bold.ttf",
          "Italic": "fonts/Roboto-Italic.ttf",
          "BoldItalic": "fonts/Roboto-BoldItalic.ttf"
        },
        {
          "Family": "Roboto",
          "Weight": "Light",
          "File": "fonts/Roboto-Light.ttf",
          "Italic": "fonts/Roboto-LightItalic.ttf"
        },
        {
          "Family": "Roboto",
          "Weight": "Medium",
          "File": "fonts/Roboto-Medium.ttf",
          "Italic": "fonts/Roboto-MediumItalic.ttf"
        }
      ]
    }
  }
}
```

### Programmatic Registration

```csharp
using Microsoft.Extensions.DependencyInjection;
using Scryber;
using Scryber.Drawing;

var services = new ServiceCollection();

services.AddScryber(config =>
{
    config.FontOptions.Register.Add(new FontRegistration
    {
        Family = "Roboto",
        File = "/path/to/Roboto-Regular.ttf",
        Bold = "/path/to/Roboto-Bold.ttf",
        Italic = "/path/to/Roboto-Italic.ttf",
        BoldItalic = "/path/to/Roboto-BoldItalic.ttf"
    });
});

var provider = services.BuildServiceProvider();
```

### Font Fallback Chain

Configure fallback fonts for missing glyphs:

```xml
<pdf:Styles>
    <pdf:Style>
        <pdf:Font-Family>Roboto, 'Open Sans', Helvetica, sans-serif</pdf:Font-Family>
    </pdf:Style>
</pdf:Styles>
```

## Complete Example

### 1. Font Files Structure

```
MyApp/
├── wwwroot/
│   └── fonts/
│       ├── Roboto-Regular.ttf
│       ├── Roboto-Bold.ttf
│       ├── Roboto-Italic.ttf
│       ├── Roboto-BoldItalic.ttf
│       ├── OpenSans-Regular.ttf
│       └── OpenSans-Bold.ttf
├── scrybersettings.json
└── Program.cs
```

### 2. Configuration

**scrybersettings.json:**

```json
{
  "Scryber": {
    "Fonts": {
      "Register": [
        {
          "Family": "Roboto",
          "File": "wwwroot/fonts/Roboto-Regular.ttf",
          "Bold": "wwwroot/fonts/Roboto-Bold.ttf",
          "Italic": "wwwroot/fonts/Roboto-Italic.ttf",
          "BoldItalic": "wwwroot/fonts/Roboto-BoldItalic.ttf"
        },
        {
          "Family": "Open Sans",
          "File": "wwwroot/fonts/OpenSans-Regular.ttf",
          "Bold": "wwwroot/fonts/OpenSans-Bold.ttf"
        }
      ]
    }
  }
}
```

### 3. Template

**Report.pdfx:**

```xml
<?xml version='1.0' encoding='utf-8' ?>
<pdf:Document xmlns:pdf='http://www.scryber.co.uk/schemas/core/release/v1/Scryber.Components.xsd'>
    
    <Styles>
        
        <!-- Heading style -->
        <pdf:Style applied-class='report-title'>
            <pdf:Font-Family>Roboto</pdf:Font-Family>
            <pdf:Font-Size>32pt</pdf:Font-Size>
            <pdf:Font-Bold>true</pdf:Font-Bold>
            <pdf:Fill-Color>#1a1a1a</pdf:Fill-Color>
        </pdf:Style>
        
        <!-- Section heading -->
        <pdf:Style applied-class='section-heading'>
            <pdf:Font-Family>Roboto</pdf:Font-Family>
            <pdf:Font-Size>18pt</pdf:Font-Size>
            <pdf:Font-Bold>true</pdf:Font-Bold>
            <pdf:Fill-Color>#333333</pdf:Fill-Color>
            <pdf:Margins-Top>20pt</pdf:Margins-Top>
            <pdf:Margins-Bottom>10pt</pdf:Margins-Bottom>
        </pdf:Style>
        
        <!-- Body text -->
        <pdf:Style applied-class='body-text'>
            <pdf:Font-Family>Open Sans</pdf:Font-Family>
            <pdf:Font-Size>11pt</pdf:Font-Size>
            <pdf:Fill-Color>#555555</pdf:Fill-Color>
        </pdf:Style>
        
        <!-- Emphasis -->
        <pdf:Style applied-class='emphasis'>
            <pdf:Font-Family>Roboto</pdf:Font-Family>
            <pdf:Font-Size>11pt</pdf:Font-Size>
            <pdf:Font-Italic>true</pdf:Font-Italic>
            <pdf:Fill-Color>#666666</pdf:Fill-Color>
        </pdf:Style>
        
    </Styles>
    
    <Pages>
        <pdf:Page>
            <Content>
                
                <pdf:Label class='report-title' text='Annual Report 2025' />
                
                <pdf:Label class='section-heading' text='Executive Summary' />
                
                <pdf:Label class='body-text' 
                          text='This report provides an overview of company performance...' />
                
                <pdf:Label class='emphasis' 
                          text='Revenue increased by 15% year-over-year.' />
                
                <pdf:Label class='section-heading' text='Financial Highlights' />
                
                <pdf:Label class='body-text' 
                          text='Key financial metrics for the fiscal year...' />
                
            </Content>
        </pdf:Page>
    </Pages>
    
</pdf:Document>
```

### 4. Application

```csharp
using Microsoft.Extensions.DependencyInjection;
using Scryber;
using Scryber.Components;

// Setup dependency injection
var services = new ServiceCollection();
services.AddScryber();  // Loads scrybersettings.json
var provider = services.BuildServiceProvider();

// Generate document
using (var reader = new StreamReader("Report.pdfx"))
{
    var doc = Document.ParseDocument(reader, ParseSourceType.DynamicContent);
    doc.ProcessDocument("Report.pdf");
}
```

## Font Subsetting

Scryber automatically **subsets fonts** to include only used glyphs, reducing PDF file size:

```csharp
// Only glyphs for "Hello World" are embedded, not entire font
<pdf:Label text='Hello World' />
```

**Benefits:**
- Smaller PDF files
- Faster loading
- Reduced memory usage
- License-friendly (only distributing used glyphs)

## Font Metrics

Font metrics are extracted from TTF files:

- **Ascent/Descent**: For line height calculations
- **Em Square**: For font scaling
- **Glyph Widths**: For text measurement
- **Kerning Pairs**: For text spacing (if available)

## Best Practices

### Font Organization
- Store fonts in dedicated directory: `wwwroot/fonts/`
- Use relative paths in configuration
- Include all font weights/styles for consistency
- Document font licenses

### Font Selection
- Prefer fonts with complete character sets
- Test fonts with expected character ranges
- Provide fallback fonts
- Use web-safe fonts as last resort

### Performance
- Fonts are loaded lazily - registration is fast
- Font files are cached in memory
- Subsetting happens per-document
- System fonts are indexed on first use

### License Compliance
- Verify font licenses allow PDF embedding
- Consider font subsetting in licensing
- Document font sources and licenses
- Use fonts with permissive licenses

## Troubleshooting

### "Font not found"
- Check font family name matches registration exactly (case-sensitive)
- Verify file path is correct
- Ensure font file is readable
- Check configuration JSON syntax

### "Could not load font file"

- Verify file is valid TTF/OTF format
- Check file permissions
- Ensure font file is not corrupted
- Try opening font in font viewer application

### Font renders incorrectly
- Verify correct font weight/style is registered
- Check font supports required character set
- Test with simple characters first
- Verify font metrics are being read correctly

### Font not embedded in PDF
- Check font license allows embedding
- Verify subsetting is working
- Inspect PDF with Adobe Acrobat
- Check for errors in Scryber logs

## Generic Font Families

CSS generic font families are mapped as follows:

| Generic Family | Default Mapping | Customizable |
|----------------|----------------|--------------|
| `sans-serif` | Helvetica | Via configuration |
| `serif` | Times-Roman | Via configuration |
| `monospace` | Courier | Via configuration |
| `cursive` | System-dependent | Via configuration |
| `fantasy` | System-dependent | Via configuration |

### Customizing Generic Mappings

```json
{
  "Scryber": {
    "Fonts": {
      "GenericMappings": {
        "sans-serif": "Roboto",
        "serif": "Merriweather",
        "monospace": "Fira Code"
      }
    }
  }
}
```

## Related Documentation

- [Image Factories](image-factories) - Custom image loading
- [Custom Components](custom-components) - Using fonts in custom components
- [Integration Example](integration-example) - Complete example with custom fonts
- [Best Practices](best-practices) - Font configuration patterns
