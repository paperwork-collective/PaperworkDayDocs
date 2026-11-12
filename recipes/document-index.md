---
layout: default
render_with_liquid: false
title: Build a document index
parent: Recipes
parent_url: /recipes/
nav_order: 3
has_children: false
has_toc: false
description: "Make a contents page for a Paperwork document, with a link to each section and the page number it starts on."
---
# Build a document index
{: .no_toc }

## What you'll do

Make a contents page that lists each section of a document, links to it, and shows the page it starts on.

## Before you start

- A template, and a way to make documents from it: the [Designer](/paperwork.design/) preview, or the [CLI](/paperwork.cli/).
- This recipe uses `report.html` and `report.json`: a report with four sections, each with an id, a title and some text. They are in [Paperwork.Samples](https://github.com/paperwork-collective/Paperwork.Samples/tree/main/recipes/document-index). ⚑

## Steps

**1. Give each section heading an id.** The id is what the index refers to. Here the sections come from the data, and each has its own `id`:

```html
{{#each report.sections}}
<div class="section">
  <h2 id="{{this.id}}">{{this.title}}</h2>
  <p>{{this.text}}</p>
</div>
{{/each}}
```

**2. List the sections on the contents page.** Use the same data. The link goes to the heading, and `<page for="#id">` shows the page number the heading is on:

```html
<table>
  {{#each report.sections}}
  <tr>
    <td><a href="#{{this.id}}">{{this.title}}</a></td>
    <td class="page"><page for="#{{this.id}}" /></td>
  </tr>
  {{/each}}
</table>
```

**3. Start each section on a new page.** Put a page break before each section, and after the contents:

```css
.contents { page-break-after: always; }
.section  { page-break-before: always; }
```

Use only one of the two between two blocks. A break after one block and before the next makes a blank page.

**4. Make the document.**

```bash
paperwork generate --layout report.html --data report=report.json --output report.pdf
```

## Check it worked

The PDF has five pages: the contents page, then one page for each section. The contents page lists Summary on page 2, Revenue on 3, Costs on 4 and Outlook on 5. Each title is a link to its section.

The whole layout, `report.html`:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>{{report.title}}</title>
  <style>
    @page { size: A4; margin: 22mm; }
    body { font-family: Helvetica, Arial, sans-serif; font-size: 11pt; color: #1f2937; }
    h1 { font-size: 24pt; margin: 0 0 18pt 0; }
    h2 { font-size: 16pt; margin: 0 0 10pt 0; }
    .contents { page-break-after: always; }
    .contents table { width: 100%; border-collapse: collapse; }
    .contents td { padding: 6pt 0; border-bottom: 0.5pt dotted #9ca3af; }
    .contents td.page { width: 30pt; text-align: right; }
    .contents a { color: #1f2937; text-decoration: none; }
    .section { page-break-before: always; }
  </style>
</head>
<body>
  <div class="contents">
    <h1>{{report.title}}</h1>
    <h2>Contents</h2>
    <table>
      {{#each report.sections}}
      <tr>
        <td><a href="#{{this.id}}">{{this.title}}</a></td>
        <td class="page"><page for="#{{this.id}}" /></td>
      </tr>
      {{/each}}
    </table>
  </div>

  {{#each report.sections}}
  <div class="section">
    <h2 id="{{this.id}}">{{this.title}}</h2>
    <p>{{this.text}}</p>
  </div>
  {{/each}}
</body>
</html>
```

The data, `report.json`:

```json
{
  "title": "Annual review 2026",
  "sections": [
    { "id": "summary", "title": "Summary", "text": "The year in brief: revenue grew, costs held, and three new offices opened." },
    { "id": "revenue", "title": "Revenue", "text": "Revenue by region and by quarter, with the main changes from the year before." },
    { "id": "costs", "title": "Costs", "text": "Operating costs, with the largest items listed first." },
    { "id": "outlook", "title": "Outlook", "text": "Plans and risks for 2027." }
  ]
}
```

## Next

- [The `page` element](/paperwork.core/reference/htmltags/), for the other page number options, such as the total.
- [Data and fields](/data-and-fields/).
