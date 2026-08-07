---
layout: default
title: Pages & Sections
nav_order: 5
parent: Getting Started
parent_url: /learning/01-getting-started/
grand_parent: Learning Guides
grand_parent_url: /learning/
has_toc: false
---

# Pages & Sections

Master multi-page documents with page setup, sections, headers, and footers.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Set page size and orientation
- Control page margins
- Create multi-section documents
- Add headers and footers
- Use page numbers
- Control page breaks

---

## Page Setup with @page

The `@page` rule defines page properties for all pages:

```css
@page {
    size: Letter portrait;           /* Page size and orientation */
    margin: 1in;            /* All margins */
}
```

### Page Sizes

```css
/* Standard sizes */
@page { size: Letter; }      /* 8.5in × 11in */
@page { size: Legal; }       /* 8.5in × 14in */
@page { size: A4; }          /* 210mm × 297mm */
@page { size: A3; }          /* 297mm × 420mm */
@page { size: Tabloid; }     /* 11in × 17in */

/* Custom sizes */
@page { size: 6in 9in; }     /* Width × Height */
@page { size: 200mm 300mm; } /* Metric */
```

### Page Margins

```css
/* All margins */
@page {
    margin: 1in;
}

/* Individual margins */
@page {
    margin-top: 1in;
    margin-right: 0.75in;
    margin-bottom: 1in;
    margin-left: 0.75in;
}

/* Shorthand (top, right, bottom, left) */
@page {
    margin: 1in 0.75in 1in 0.75in;
}

/* Shorthand (vertical, horizontal) */
@page {
    margin: 1in 0.75in;
}

/* specifying margins based on page position in the final document */

@page :first {
    margin-left: 2in;
    margin-right: 2in;
}

@page :left {
    margin-right: 2in;
}

@page :right {
    margin-left: 2in;
}

```

## Page Breaks

The Core engine will flow documents and content happily across hundreds of pages, and attempt to keep everything neat. 
However it is ofter useful to explicitly split content up, and a section doesn't make visual or structural sense.

The engine supports both types of `break-before`/`break-after` and the more legacy (and explicit) `page-break-before`/`page-break-after`.
When working on a single column layout, these are equivalent and the `break-before` will take a precedent and override any set `page-break-before`.

In [multi-column layouts](/learning/04-layout/04_multi_column.html), their action is, as expected, different.

### CSS Page Break Properties

```css
/* Break before element */
.chapter {
    page-break-before: always;  /* Always start new page */
}

/* Break after element */
.section-end {
    page-break-after: always;   /* Always break after */
}

/* Prevent breaking inside */
.keep-together {
    page-break-inside: avoid;   /* Keep on same page if possible */
}
```

### Example: Chapter Breaks

```html
<style>
    .chapter {
        page-break-before: always;
    }

    .keep-together {
        page-break-inside: avoid;
    }
</style>

<div class="chapter">
    <h1>Chapter 1</h1>
    <p>This starts on a new page.</p>
</div>

<div class="chapter">
    <h1>Chapter 2</h1>
    <p>This also starts on a new page.</p>
</div>

<div class="keep-together">
    <h2>Important Section</h2>
    <p>This will not break across pages if possible and<br/>
       move as a whole to a new page if it cannot fit the whole group.</p>
</div>
```

When moving to a new page, the margins, padding, borders and backgrounds are preserved so vertical and horizontal positioning within containers should be maintained.

### Page Break Values

| Value | Behavior |
|-------|----------|
| `auto` | Default, break as needed |
| `always` | Always force a page break |
| `avoid` | Avoid breaking if possible |
| `left`, `verso` | Break to next left (even) page |
| `right`, `recto` | Break to next right (odd) page |

---


### Changing page size within a document

New page sizes can be named and set as part of the flow of the document against any style.
This will apply to any new pages that are created at and within the applied content.

```css
@page{
  size: A4 portrait;
  margin: 10mm;
}

@page big {
  size: A3 landspape;
  margin: 20mm;
}

.apply-big {
  page: big; /*A3 */
}
```

---

## Complete Document with different page sizes.


#### STYLE Content
```css

@page{
  size: A4 portrait; /* default size for non explicit pages */
  margin: 10mm;
}

@page :first{
  margin: 20mm; /* specific margins for the first pages */
}

@page :left{
  margin-right: 20mm; /* specific right margins for left hand pages */
}

@page chart {
  size: A3 landscape; /* Specific size for the charts */
}

@page chart:left{
    margin-right: 30mm; /* right margins only for left page charts */
}

@page chart:right{
    margin-left: 30mm; /* left margins only for right page charts */
}

.chart{
  page: chart
}

body {
    border: solid 1px blue;
    padding: 2pt;
}

main {
  padding:0;
  margin: 0;
}
```

#### HTML Content

```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Various page sizes</title>
</head>

<body>
    <main>
        <h1 class="title">This is the first page (with 20mm margins)</h1>
        <section style='page-break-before: right'>
            <p>This is on the second (left hand) page </p>
        </section>
        <section class="chart">
            <p>This is A3 and landscape with default margins. </p>
            <p style='page-break-before: always' >
                Flowing or explicit new pages within this section will all get the same A3, 
                and use left or right margins.</p>
        </section>
        <section>
            <p>This is back to A4 portrait (but now on the right so default 10mm)</p>
        </section>
    </main>
</body>

</html>
```

---

## Headers and Footers

The Core engine handles page headers and footers in a different manner to browsers, giving full control of the content and a far improved layout.

*The @top-right etc inner page rules for css headers will be ignored.*

A `<header>` as a direct descendant of the `<body>` will be treated as repeating page header content 
and a `<footer>` as a direct descendant of the `<body>` will be treated as repeating page footer content. They support any inner content (except page breaks), and can be styled as required.

Note that the body margins and padding will always be applied outside of the headers and footers, so it is often structurally more flexible to put all inner content within a `<main>` tag where possible. 
This will give complete flexibility on spacing and layout of the adornments.

The Core engine also supports the declartation of a `<continuation-header>` and a `<continuation-footer>` tag. If defined as a direct descendant of the `<body>` then they will be used on subsequent 
pages in the final document, and the header and/or footer will be used only on the first page.

It is perfectly OK to have an empty `<header>` (and `<footer>`) and have content within a continuation(s), this will ensure the 'cover page' does not have the adornments, but all internal pages will get the adornments.

It also does not matter where within the body content the header and footer appear, they will always be at the top and bottom of the page and not be part in the inner layout. 

Data-binding (see **[Data Binding & Expressions](/learning/02-data-binding/index.html)** ) is supported within the headers and footers, but the current context is tricky to manage. 

### Simple Footer with Page Numbers

```html
<style>
    footer {
        text-align: center;
        font-size: 9pt;
        color: #666;
    }
</style>

<body>
    <footer>
        Page <page-number /> of <page-count />
    </footer>
    <main>
        <!-- Main content -->
        <h1>Document Title</h1>
        <p>Content here...</p>
    </main>
</body>
```

### Header with Logo

```html
<style>
    header {
        height: 60pt;
        border-bottom: 2pt solid #2563eb;
        padding: 10pt 40pt;
    }

    header img {
        height: 40pt;
        float: left;
    }

    header h1 {
        font-size: 14pt;
        margin: 10pt 0 0 60pt;
        color: #2563eb;
    }

</style>

<body>
    <header>
        <img src="logo.png" alt="Logo" />
        <h1>Company Name</h1>
    </header>
    <main>
        <!-- Content -->
        <h1>Document Content</h1>
        <p>Main content starts below the header...</p>
    </main>
</body>
```

### Complete Header and Footer

```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Document with Header and Footer</title>
    <style>
        @page {
            size: A4;
            margin: 1in;
        }

        body {
            font-family: Helvetica, sans-serif;
            font-size: 11pt;
            margin-top: 80pt;    /* Space for header */
            margin-bottom: 60pt; /* Space for footer */
        }

        /* Fixed header */
        header {
            border-bottom: 2pt solid #2563eb;
            padding-bottom: 10pt;
        }

        .header-content {
            display: table;
            width: 100%;
        }

        .header-logo {
            display: table-cell;
            width: 80pt;
        }

        .header-text {
            display: table-cell;
            vertical-align: middle;
            padding-left: 20pt;
        }

        /* Fixed footer */
        footer {
            border-top: 1pt solid #ccc;
            padding-top: 10pt;
            font-size: 9pt;
            color: #666;
        }

        .footer-content {
            display: table;
            width: 100%;
        }

        .footer-left {
            display: table-cell;
            width: 50%;
            text-align: left;
        }

        .footer-right {
            display: table-cell;
            width: 50%;
            text-align: right;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="header-content">
            <div class="header-logo">
                <img src="logo.png" style="width: 60pt; border: solid 1px #2563eb;" />
            </div>
            <div class="header-text">
                <h3 style="margin: 0; color: #2563eb;">Company Name</h3>
                <p style="margin: 0; font-size: 9pt;">Tagline or subtitle</p>
            </div>
        </div>
    </header>
  
    <main>
    <!-- Main content -->
    <h2>Document Title</h2>
    <p>This is the main content of the document. It will flow across
       multiple pages automatically, with the header and footer appearing
       on every page.</p>

    <!-- More content... -->
    </main>
  
    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-left">
                Document ID: DOC-12345 | Date: <time data-format="yyyy-MM-dd" />
            </div>
            <div class="footer-right">
                Page <page-number /> of <page-count />
            </div>
        </div>
    </footer>
</body>
</html>
```

---

## Page Numbers

Scryber provides special elements for page numbering:

### Basic Page Numbers

```html
<page-number />          <!-- Current page: 1, 2, 3... -->
<page-count />           <!-- Total pages: 10 -->
<page for='#lookup' />   <!-- Displays the page number of another component -->
```

### Page Number Formatting

```html
<!-- Default (Arabic numerals) -->
Page <page-number />

<!-- With formatting -->
<span style="font-weight: bold;">
    Page <page-number /> of <page-count />
</span>

<!-- Explicit content format for <page /> inside matching link -->
<a href='#id'><page for='#id' data-format='Ref:#{0}' /></a>
```

### Page Number Styles

```html
<style>
    .page-num {
        font-family: 'Courier New', monospace;
        font-size: 10pt;
        color: #666;
    }
</style>

<div class="footer">
    <span class="page-num">
        <page-number /> / <page-count />
    </span>
</div>
```

---

## Practical Example - Report with Sections

[Preview]

#### Styles
```css
        @page {
            size: Letter;
            margin: 1in;
        }

        @page chart{
            size: landscape;
        }


        body {
            font-family: Helvetica, sans-serif;
            font-size: 11pt;
        }


        .cover-page {
            page-break-after: always;
            text-align: center;
            padding-top: 200pt;
        }

        .cover-page h1 {
            font-size: 36pt;
            color: #1e40af;
        }
   

        .section {
            page-break-before: always;
        }    
        
        .chart{
          page: chart;
        }
      
        .toc ul{
          margin-top: 20pt;
        }
      
      
        .toc li{
          padding-bottom: 10pt;
        }
      
        .toc a{
          text-decoration: none;
        }

        .toc page {
          float: right;
        }

        .footer {
            position: fixed;
            bottom: 20pt;
            text-align: center;
            width: 100%;
            font-size: 9pt;
            color: #666;
        }
```

#### Html

```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Quarterly Report</title>
</head>
<body>
    <!-- Cover page -->
    <div class="cover-page">
        <h1>Q4 2024 Report</h1>
        <p style="font-size: 18pt; margin-top: 30pt;">Quarterly Business Review</p>
        <p style="margin-top: 50pt;">December 31, 2024</p>
    </div>

    <!-- TOC -->
    <div class='section toc'>
        <h3>Table of contents</h3>
        <ul style='list-style-type: none'>
          <li><a href='#summary'>Executive Summary <page for='#summary' /></a></li>
          <li><a href='#performance'>Financial Performance <page for='#performance' /></a></li>
          <li><a href='#recommendations'>Recommendations <page for='#recommendations' /></a></li>
        </ul>
    </div>

    <!-- Section 1 -->
    <div class="section">
        <h1 id='summary' >Executive Summary</h1>
        <p>Key findings and highlights from Q4 2024...</p>
    </div>

    <!-- Section 2 -->
    <div class="section chart">
        <h1 id='performance' >Financial Performance</h1>
        <p>Detailed financial analysis...</p>
    </div>

    <!-- Section 3 -->
    <div class="section">
        <h1 id='recommendations' >Recommendations</h1>
        <p>Strategic recommendations for Q1 2025...</p>
    </div>

    <!-- Footer -->
    <footer>
        Q4 2024 Report | Page <page-number /> of <page-count /> | Confidential
    </footer>
</body>
</html>
```

---

## Try It Yourself

### Exercise 1: Multi-Page Report

Create a 3-page document with:
- Cover page (no header/footer)
- Content pages (with header and footer)
- Page numbers starting from page 2

### Exercise 2: Section Breaks

Create a document with:
- Portrait section for text
- Landscape section for a wide table
- Back to portrait for conclusion

### Exercise 3: Custom Headers

Create headers that show:
- Left: Document title
- Center: Section name
- Right: Page number

---

## Common Pitfalls


### ❌ Using Absolute Heights for Content

```css
.content {
    height: 500pt; /* Might overflow page */
}
```

✅ **Solution:** Let content flow naturally

```css
.content {
    /* Height determined by content */
    page-break-inside: avoid; /* Keep together if possible */
}
```

### ❌ Complex Page Break Logic

```css
.element {
    page-break-before: always;
    page-break-after: always;
    page-break-inside: avoid;
}
```

✅ **Solution:** Keep it simple

```css
.chapter {
    page-break-before: always;
}
```

---

## Next Steps

Now that you understand pages and sections:

1. **[Basic Content](06_basic_content.html)** - Add various content types
2. **[Layout & Positioning](/learning/04-layout/)** - Advanced page layout
3. **[Output Options](07_output_options.html)** - Configure PDF generation
4. **[Multi-Column Layouts](/learning/04-layout/04_multi_column.html)** - Using multiple columns in layouts

---

**Continue learning →** [Basic Content](06_basic_content.html)
