---
layout: default
title: font-face at-Rule
parent: CSS Selectors
parent_url: /paperwork.core/reference/cssselectors/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# @font-face At-Rule
{: .no_toc }

The `@font-face` at-rule allows you to define specific fonts to be used within the template, outside of any directly loaded by the engine. This is particularly important in PDF generation with Scryber.

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


## Usage

```css

@font-face {
    font-family: 'font name';
    src: url('[relative or remote path to font file]') format('truetype') [, ...more formats];
    font-weight: [100 ... 900];
    font-style: reglular | italic | oblique;
}

.main{
    font-family: 'font name', Helvetica, sans-serif;
}

```

The `@font-face` defines an explicit font that can be used within the document, and will be embedded (if allowed) into the document itself so it can be used to by reader applications.

Each definition is a single font based on family, weight and style, and multiple definitions of the same family are supported (encouraged) to allow for bold and italic variants. 

PDF readers support embedded Open Type (aka. TrueType&trade; fonts).

The library can convert .otc/.ttc collections, along with WOFF fonts directly to the supported formats. Any fonts defined in other formats (e.g. WOFF2), will be ignored. 

---

### Font Matching and fallbacks

Every font used within a document should have it's own set (or subset) of font definition. As such, when specifying a `b`old or `strong` font weight, there should be an available, matching font file for that weight. The engine will use system fonts if able, and has the default fonts to use (embedded within the engine).

So in order to find the best font to display the applied characters with, the following table is used.

- Take the first font-family in the list
    - Find the font family and style. If matched...
        - Find the requested weight and use.
        - No exact weight, so find the nearest (larger or smaller) and use that.
    - No matched family and style so switch to the next family in the list
- No matching family with that style
    - Find the font family in regular style
         - Find the requested weight and use.
        - No exact weight, so find the nearest (larger or smaller) and use that.
    - No matching family in regular
        - Use the built-in Courier / mono-spaced font (easily identified as not matching).
    
When used with a fall-back font in the style, it is 'guaranteed' to find an appropriate font for the requested component.

---

### Syntax Examples


```css

/* Load custom font - Roboto regular and bold */
@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto-Regular.ttf') format('truetype');
    font-weight: 400;
}

@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto-Bold.ttf') format('truetype');
    font-weight: 700;
}

/* specify the default page font as 'Roboto' with fallbacks */
body {
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #333;
}

/* set the heading as bold */
h1 {
    font-size: 24pt;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
    letter-spacing: 2pt;
}


```

When an exact match is not found for a font then a 'Warning' entry is added to the log.
If no font can be found then either an exception will be raised (if the [conformance mode](/paperwork.core/learning/07-configuration/03_error_handling_conformance) is 'Strict') or an error added to the log.

```csharp
//change the document conformance mode in code
doc.ConformanceMode = ParserConformanceMode.Strict;

```

Or use the template [processing](/paperwork.core/learning/07-configuration/02_logging) instructions.

```xml
<?scryber conformance-mode='strict' ... >
<html> ...
```


---

### No Fallback

By default the engine will always try to fallback to the best font it can find. If it is better, or you want to check everything is in place, then you it ios possible to switch off this behaviour either individually, or globally.

#### For a specific document
```csharp
doc.RenderOptions.FontFallback = false;
```

#### Withing the application

Add the section to the application [configuration file](/paperwork.core/learning/07-configuration/07_production_deployment)
```json
"Scryber" : {
    "Fonts" : {
        "FontSubstitution" : "false"
    }
}
```

---

//NEED A BREAK!

## Font-Face Properties

- `size` - Page dimensions (A4, Letter, Legal, or custom dimensions)
- `margin` - Page margins (shorthand)
- `margin-top`, `margin-right`, `margin-bottom`, `margin-left` - Individual margins
- `orientation` - Page orientation (portrait or landscape)

---

## Standard Page Sizes

- `A4` - 210mm × 297mm
- `A3` - 297mm × 420mm
- `A5` - 148mm × 210mm
- `Letter` - 8.5in × 11in
- `Legal` - 8.5in × 14in
- `Tabloid` - 11in × 17in

---

## Notes

- The @page rule defines properties of the page box itself
- Page margins define the printable area within the page
- Size can be specified using standard names or custom dimensions
- Orientation can be portrait (default) or landscape
- Multiple @page rules can be defined for different sections
- Particularly important for PDF generation in Scryber

---

## Examples

### Example 1: Basic A4 page setup

```html
<style>
    @page {
        size: A4;
        margin: 25mm;
    }
</style>
<body>
    <h1>Document Title</h1>
    <p>Content with A4 page size and 25mm margins.</p>
</body>
```

### Example 2: Letter size with custom margins

```html
<style>
    @page {
        size: Letter;
        margin-top: 1in;
        margin-bottom: 1in;
        margin-left: 0.75in;
        margin-right: 0.75in;
    }
</style>
<body>
    <h1>US Letter Format</h1>
    <p>Document formatted for US Letter size paper.</p>
</body>
```

### Example 3: Landscape orientation

```html
<style>
    @page {
        size: A4 landscape;
        margin: 20mm 30mm;
    }
</style>
<body>
    <h1>Landscape Document</h1>
    <p>This page is in landscape orientation.</p>
</body>
```

### Example 4: Custom page size

```html
<style>
    @page {
        size: 8in 10in;
        margin: 0.5in;
    }
</style>
<body>
    <h1>Custom Size</h1>
    <p>Document with custom page dimensions.</p>
</body>
```

### Example 5: Minimal margins for full bleed

```html
<style>
    @page {
        size: A4;
        margin: 0;
    }

    body {
        margin: 0;
        padding: 0;
    }
</style>
<body>
    <div style="background-color: #0066cc; width: 100%; height: 100%;">
        <p style="color: white; padding: 20pt;">Full bleed background</p>
    </div>
</body>
```

### Example 6: Report format

```html
<style>
    @page {
        size: Letter portrait;
        margin-top: 0.75in;
        margin-bottom: 0.75in;
        margin-left: 1in;
        margin-right: 1in;
    }

    body {
        font-family: "Times New Roman", serif;
        font-size: 12pt;
    }
</style>
<body>
    <h1>Business Report</h1>
    <p>Professional document formatting.</p>
</body>
```

### Example 7: Brochure format

```html
<style>
    @page {
        size: A4 landscape;
        margin: 15mm;
    }

    body {
        column-count: 3;
        column-gap: 10mm;
    }
</style>
<body>
    <h1>Product Brochure</h1>
    <p>Three-column layout in landscape orientation.</p>
</body>
```

### Example 8: Legal document

```html
<style>
    @page {
        size: Legal;
        margin: 1in 1.25in;
    }

    body {
        font-family: "Courier New", monospace;
        font-size: 12pt;
        line-height: 2;
    }
</style>
<body>
    <h1>Legal Document</h1>
    <p>Double-spaced legal format.</p>
</body>
```

### Example 9: Invoice format

```html
<style>
    @page {
        size: A4;
        margin-top: 40mm;
        margin-bottom: 30mm;
        margin-left: 20mm;
        margin-right: 20mm;
    }
</style>
<body>
    <h1>Invoice #12345</h1>
    <p>Extra top margin for letterhead.</p>
</body>
```

### Example 10: Multi-page document with consistent formatting

```html
<style>
    @page {
        size: A4 portrait;
        margin: 25mm 20mm;
    }

    body {
        font-family: Arial, sans-serif;
        font-size: 11pt;
        line-height: 1.5;
    }

    h1 {
        font-size: 24pt;
        margin-bottom: 10mm;
    }

    h2 {
        font-size: 18pt;
        margin-top: 8mm;
        margin-bottom: 6mm;
    }
</style>
<body>
    <h1>Document Title</h1>
    <h2>Section 1</h2>
    <p>Content for section 1...</p>
    <h2>Section 2</h2>
    <p>Content for section 2...</p>
</body>
```

---

## See Also

- [@media Rule](/paperwork.core/reference/cssselectors/selectors/css_media_rule)
- [Page Size Configuration](/guides/page_setup)
- [Element Selector](/paperwork.core/reference/cssselectors/selectors/css_element_selector)
- [PDF Generation Pipeline](/architecture/generation_pipeline)

---
