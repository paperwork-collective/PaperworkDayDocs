---
layout: default
title: CSS Grid Layout
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# CSS Grid Layout <span class="label label-yellow">Beta</span>
{: .no_toc }

CSS Grid is a two-dimensional layout system that arranges children into rows and columns defined by track sizes. Apply `display: grid` to a container, then define column and row tracks with `grid-template-columns` and `grid-template-rows`.

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

## Quick Start

```css
.grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    gap: 10pt;
}
```

---

## Container Properties

### display: grid

Enables grid layout on the container. Direct children become grid items placed into cells automatically.

```css
.container { display: grid; }
```

---

### grid-template-columns

Defines the column tracks. Each space-separated value creates one column. See [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) for full details.

**Supported value types:**

| Syntax | Description |
|--------|-------------|
| `<length>` | Fixed width: `pt`, `px`, `%`, `em` |
| `<n>fr` | Fraction of remaining space |
| `auto` | Column sizes to its content |
| `repeat(n, track)` | Repeat a track definition n times |

```css
grid-template-columns: 1fr 1fr 1fr;           /* three equal columns */
grid-template-columns: 160pt 1fr;              /* fixed sidebar + flexible main */
grid-template-columns: repeat(4, 25%);         /* four equal percent columns */
grid-template-columns: 200pt repeat(2, 1fr);   /* fixed + two flexible */
```

---

### grid-template-rows

Defines the row tracks. Works identically to `grid-template-columns` but along the vertical axis.

```css
grid-template-rows: 80pt auto;    /* fixed header row + auto content row */
grid-template-rows: repeat(3, 1fr);  /* three equal rows */
```

When there are more items than defined rows, additional rows are created automatically using the `grid-auto-flow` setting.

---

### grid-auto-flow

Controls how auto-placed items fill the grid.

| Value | Description |
|-------|-------------|
| `row` | Items fill each row left-to-right, then move to the next row (default) |
| `column` | Items fill each column top-to-bottom, then move to the next column |
| `dense` | Back-fills gaps left by larger items |

```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-flow: column; }
```

---

### gap / column-gap / row-gap

Sets spacing between grid cells.

```css
.grid { display: grid; gap: 10pt; }               /* equal row and column gap */
.grid { display: grid; column-gap: 12pt; row-gap: 8pt; }  /* separate values */
```

---

## Item Properties

These properties are set on **grid items** (direct children of the grid container) to control placement and spanning.

### grid-column

Shorthand for `grid-column-start` and `grid-column-end`. Specifies which column tracks a cell occupies.

| Syntax | Description |
|--------|-------------|
| `<n>` | Place item starting at column line n |
| `span <n>` | Item spans n columns |
| `<start> / <end>` | Explicit start and end column lines |

```css
.wide   { grid-column: 1 / 3; }    /* spans columns 1 and 2 */
.span2  { grid-column: span 2; }   /* spans 2 columns from its auto position */
.col3   { grid-column: 3; }        /* placed in column 3 */
```

---

### grid-row

Shorthand for `grid-row-start` and `grid-row-end`. Works identically to `grid-column` but along the vertical axis.

```css
.tall   { grid-row: 1 / 3; }      /* spans rows 1 and 2 */
.span3  { grid-row: span 3; }     /* spans 3 rows */
```

---

## Examples

### Example 1: Three-column card grid

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12pt;
    }
    .card {
        padding: 15pt;
        background-color: #dbeafe;
        border: 1pt solid #2563eb;
    }
</style>
<div class="grid">
    <div class="card"><h3>Feature A</h3><p>Description.</p></div>
    <div class="card"><h3>Feature B</h3><p>Description.</p></div>
    <div class="card"><h3>Feature C</h3><p>Description.</p></div>
</div>
```

### Example 2: Sidebar layout

```html
<style>
    .layout {
        display: grid;
        grid-template-columns: 160pt 1fr;
        gap: 20pt;
    }
    .sidebar { background-color: #f3f4f6; padding: 12pt; }
    .main    { padding: 12pt; }
</style>
<div class="layout">
    <div class="sidebar"><p><strong>Navigation</strong></p><p>Section 1</p><p>Section 2</p></div>
    <div class="main"><h2>Content</h2><p>This takes the remaining width.</p></div>
</div>
```

### Example 3: Spanning cells

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8pt;
    }
    .header { grid-column: 1 / 4; background-color: #1e3a8a; color: white; padding: 12pt; }
    .cell   { background-color: #f3f4f6; padding: 10pt; border: 1pt solid #e5e7eb; }
    .wide   { grid-column: span 2; background-color: #dbeafe; padding: 10pt; }
</style>
<div class="grid">
    <div class="header">Report Header — spans all 3 columns</div>
    <div class="cell">Cell 1</div>
    <div class="wide">Wide cell — spans 2 columns</div>
    <div class="cell">Cell 3</div>
    <div class="cell">Cell 4</div>
    <div class="cell">Cell 5</div>
</div>
```

### Example 4: Fixed row heights

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 60pt 120pt 60pt;
        gap: 10pt;
    }
    .cell {
        background-color: #f0fdf4;
        border: 1pt solid #16a34a;
        padding: 10pt;
    }
</style>
<div class="grid">
    <div class="cell">Row 1, Col 1 (60pt)</div>
    <div class="cell">Row 1, Col 2 (60pt)</div>
    <div class="cell">Row 2, Col 1 (120pt)</div>
    <div class="cell">Row 2, Col 2 (120pt)</div>
    <div class="cell">Row 3, Col 1 (60pt)</div>
    <div class="cell">Row 3, Col 2 (60pt)</div>
</div>
```

### Example 5: Invoice layout with mixed tracks

```html
<style>
    .header-row, .data-row {
        display: grid;
        grid-template-columns: 1fr 60pt 70pt 80pt;
        gap: 6pt;
        margin-bottom: 2pt;
    }
    .header-row { background-color: #1f2937; color: white; }
    .cell   { padding: 6pt; border: 1pt solid #e5e7eb; }
    .hcell  { padding: 6pt; font-weight: bold; }
    .right  { text-align: right; }
</style>
<div class="header-row">
    <div class="hcell">Description</div>
    <div class="hcell right">Qty</div>
    <div class="hcell right">Unit</div>
    <div class="hcell right">Total</div>
</div>
<div class="data-row">
    <div class="cell">Consulting services</div>
    <div class="cell right">12</div>
    <div class="cell right">£850</div>
    <div class="cell right">£10,200</div>
</div>
```

### Example 6: Data-bound grid

{% raw %}
```html
<style>
    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12pt;
    }
    .product-card {
        padding: 12pt;
        border: 1pt solid #e5e7eb;
        margin-bottom: 0;
    }
    .product-name { font-weight: bold; color: #1e3a8a; }
    .product-price { color: #16a34a; font-size: 12pt; }
</style>
<div class="product-grid">
    {{#each model.products}}
    <div class="product-card">
        <div class="product-name">{{this.name}}</div>
        <div class="product-price">{{format(this.price, 'C2')}}</div>
    </div>
    {{/each}}
</div>
```
{% endraw %}

---

## Unsupported Grid Features

The following CSS Grid features are not currently supported:

| Feature | Status |
|---------|--------|
| `grid-template-areas` | Not supported |
| `grid-area` | Not supported |
| Named grid lines | Not supported |
| `minmax()` | Not supported |
| `auto-fill` / `auto-fit` in repeat() | Not supported |
| Implicit grid sizing (`grid-auto-columns`) | Not supported |

---

## See Also

- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — detailed column track reference
- [Flexbox Layout](/reference/cssproperties/properties/css_prop_flexbox) — one-dimensional flex layout
- [display](/reference/cssproperties/properties/css_prop_display) — set `grid` display mode
- [CSS Styles Support](/quickstart/feature_css_styles) — full support chart

---
