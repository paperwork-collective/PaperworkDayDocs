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

The `@font-face` at-rule allows you to define specific fonts to be used within the template, outside of any directly loaded by the engine. Fonts defined this way are embedded in the generated PDF, so the document looks the same everywhere.

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
    font-style: normal | italic | oblique;
}

.main{
    font-family: 'font name', Helvetica, sans-serif;
}

```

The `@font-face` defines an explicit font that can be used within the document, and is embedded into the document itself so it can be used by reader applications.

Each definition is a single font based on family, weight and style, and multiple definitions of the same family are supported (encouraged) to allow for bold and italic variants. 

PDF readers support embedded OpenType (and TrueType&trade;) fonts.

TrueType (`.ttf`), OpenType (`.otf`) and WOFF (`.woff`) font files are supported. When `src` lists more than one format, a TrueType or OpenType source is used first, then WOFF. Other formats, such as WOFF2 and font collections, are ignored.

---

### Font Matching and Fallbacks

Each `@font-face` is one font file, for one family, weight and style. Define one for each weight and style the document uses - for example a regular and a bold - so text is shown in the right font.

When text asks for a font, the engine looks for it in order:

1. Each family in the `font-family` list, in order - from `@font-face` rules, the fonts registered in [configuration](/paperwork.core/configuration/font-configuration), the system fonts, and the built-in standard fonts (Helvetica, Times, Courier).
2. If a family is found, but not at the requested weight or style, the nearest weight or style of that family is used, and a **Warning** is logged - for example *The font 'Open Light,Bold' could not be found, falling back to Open Light: 300 for rendering*.
3. If no family in the list can be found, an **Error** is logged and the built-in Courier font is used, so the problem is easy to see.

Ending the `font-family` list with a generic family - `sans-serif`, `serif` or `monospace` - means a font is always found.

### Strict mode and missing fonts

In [Strict mode](/paperwork.core/learning/07-configuration/03_error_handling_conformance), a font that cannot be found stops the document from being generated, rather than using Courier.

```html
<?paperwork parser-mode='Strict' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    ...
</html>
```

See [Processing Instructions](/paperwork.core/configuration/processing-instructions).

### Turning off substitution

The nearest-weight substitution in step 2 can be turned off, so only exact matches are used - useful to check that every weight and style has a font file. A font without an exact match is then treated as missing: Courier with an error in Lax mode, and a failure in Strict mode.

For a single document, on an engine `Document` (see [The Engine Document](/paperwork.core/configuration/engine-document)):

```csharp
using var doc = Document.ParseDocument("template.html");
doc.RenderOptions.UseFontSubstitution = false;

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("output.pdf");
```

For every document, in the application [configuration](/paperwork.core/configuration/configuration-structure):

```json
{
  "Paperwork": {
    "Fonts": {
      "FontSubstitution": false
    }
  }
}
```

---

## Syntax Examples

```css
/* Roboto regular and bold */
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

/* An italic variant */
@font-face {
    font-family: 'Roboto';
    src: url('./fonts/Roboto-Italic.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
}

/* More than one source - the TrueType file is used, the WOFF2 ignored */
@font-face {
    font-family: 'Lato';
    src: url('./fonts/Lato-Regular.woff2') format('woff2'),
         url('./fonts/Lato-Regular.ttf') format('truetype');
}

/* Use the font, with fallbacks */
body {
    font-family: 'Roboto', Arial, sans-serif;
}

h1 {
    font-weight: 700;   /* uses Roboto-Bold.ttf */
}

em {
    font-style: italic; /* uses Roboto-Italic.ttf */
}
```

Relative urls are resolved from the stylesheet, or from the template for a `<style>` in the template. Remote urls (`https://...`) are loaded when the document is generated.

---

## Font-Face Properties

| Property | Description |
|----------|-------------|
| `font-family` | The name the font is used by, in `font-family` on other rules |
| `src` | One or more `url(...)` sources, each with an optional `format(...)` - `truetype`, `opentype` or `woff` |
| `font-weight` | The weight of this font file - `100` to `900`, `normal` (400) or `bold` (700). Default `400` |
| `font-style` | The style of this font file - `normal`, `italic` or `oblique`. Default `normal` |

---

## Web Fonts

Stylesheets from font services, such as Google Fonts, contain `@font-face` rules, and can be linked directly:

```html
<link rel='stylesheet'
      href='https://fonts.googleapis.com/css2?family=Barlow:wght@400;600&amp;display=swap' />
```

```css
body { font-family: 'Barlow', sans-serif; }
```

See [Web Fonts](/paperwork.core/learning/05-typography/03_web_fonts).

---

## Notes

- One `@font-face` per font file - family, weight and style
- Every `@font-face` file is loaded when the document is generated, but only the fonts used by the document are embedded
- Fonts used by every document are better [registered in configuration](/paperwork.core/configuration/font-configuration), so they are loaded once
- The built-in standard fonts (Helvetica, Times, Courier) need no `@font-face`

---

## See Also

- [font-family](/paperwork.core/reference/cssproperties/properties/css_prop_font-family)
- [Font Configuration](/paperwork.core/configuration/font-configuration)
- [Custom Fonts](/paperwork.core/learning/05-typography/02_custom_fonts)
