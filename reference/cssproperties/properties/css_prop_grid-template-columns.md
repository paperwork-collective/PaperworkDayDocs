---
layout: default
title: grid-template-columns
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# grid-template-columns : Grid Template Columns Property <span class="label label-yellow">Beta</span>
{: .no_toc }

The `grid-template-columns` property defines the column tracks for a grid container (`display: grid`). It specifies how many columns the grid has and what width each column takes. Children of the grid container are then placed into those columns automatically in row-major order.

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
selector {
    display: grid;
    grid-template-columns: value value ...;
}
```

Each space-separated value defines one column track. The number of values determines the number of columns. Items fill left to right, then wrap to the next row automatically.

---

## Supported Values

### fr units — fractional width

`fr` distributes the remaining available space proportionally after fixed-width columns are subtracted.

```css
grid-template-columns: 1fr 1fr;         /* two equal columns */
grid-template-columns: 1fr 2fr;         /* narrow + wide */
grid-template-columns: 1fr 1fr 1fr;     /* three equal columns */
grid-template-columns: 2fr 1fr 1fr;     /* wide + two narrow */
```

The available space is the container width minus any `column-gap` values. `1fr 2fr` gives the first column 1/3 of the space and the second 2/3.

### Fixed lengths

Any supported length unit: `pt`, `px`, `in`, `cm`, `mm`, `em`, `%`.

```css
grid-template-columns: 200pt 1fr;       /* fixed sidebar + flexible main */
grid-template-columns: 100pt 200pt;     /* two fixed columns */
grid-template-columns: 25% 75%;         /* percentage-based */
```

Fixed widths are applied first; remaining space is then divided among `fr` and `auto` columns.

### auto

`auto` columns share remaining space equally (each treated as `1fr`). When mixed with `fr` columns, `auto` is also treated as `1fr`.

```css
grid-template-columns: auto auto auto;  /* three equal columns */
grid-template-columns: 200pt auto;      /* fixed + auto-fill */
```

### repeat()

`repeat(count, track)` expands to `count` copies of the track. Saves typing for uniform grids.

```css
grid-template-columns: repeat(3, 1fr);         /* same as: 1fr 1fr 1fr */
grid-template-columns: repeat(4, 150pt);        /* four fixed-width columns */
grid-template-columns: 200pt repeat(2, 1fr);    /* fixed + two equal flexible */
```

### Mixing track types

Any combination is valid:

```css
grid-template-columns: 150pt 1fr 2fr;           /* fixed + narrow fr + wide fr */
grid-template-columns: repeat(2, 100pt) 1fr;    /* two fixed + one flexible */
grid-template-columns: 20% 1fr 1fr;             /* percentage + two equal fr */
```

---

## Supported Elements

`grid-template-columns` must be set on an element with `display: grid`. It has no effect on other display modes.

```css
.grid {
    display: grid;                           /* required */
    grid-template-columns: 1fr 1fr 1fr;      /* defines 3 columns */
}
```

---

## Column Gap

Use `column-gap` to add spacing between columns. The gap is subtracted from the available width before fr units are distributed, so columns always fill the container cleanly.

```css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20pt;   /* 20pt gap between each pair of columns */
}
```

---

## Notes

- The number of values determines the number of columns — extra items wrap to new rows automatically
- `fr` units distribute **remaining** space (after fixed widths and gaps are subtracted)
- `repeat()` is expanded before layout — `repeat(3, 1fr)` is identical to `1fr 1fr 1fr`
- Percentage widths are relative to the grid container's own width
- Grid items are placed in row-major order (left to right, top to bottom)
- Each grid item renders with its own border, padding, and height as specified on the item itself
- `column-gap` applies between columns only — it does not add space before the first or after the last column
- Setting `grid-template-columns` without `display: grid` has no effect

---

## Examples

### Example 1: Three equal columns

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 10pt;
    }
    .card {
        padding: 15pt;
        background-color: #dbeafe;
        border: 1pt solid #2563eb;
    }
</style>
<body>
    <div class="grid">
        <div class="card"><h3>Feature A</h3><p>Description here.</p></div>
        <div class="card"><h3>Feature B</h3><p>Description here.</p></div>
        <div class="card"><h3>Feature C</h3><p>Description here.</p></div>
    </div>
</body>
```

### Example 2: Sidebar + main content layout

```html
<style>
    .layout {
        display: grid;
        grid-template-columns: 160pt 1fr;
        column-gap: 20pt;
    }
    .sidebar {
        background-color: #f3f4f6;
        padding: 15pt;
        border: 1pt solid #d1d5db;
    }
    .content {
        padding: 15pt;
    }
</style>
<body>
    <div class="layout">
        <div class="sidebar">
            <p><strong>Contents</strong></p>
            <p>Section 1</p>
            <p>Section 2</p>
            <p>Section 3</p>
        </div>
        <div class="content">
            <h2>Main Article</h2>
            <p>The sidebar is a fixed 160pt wide. This content takes the rest.</p>
        </div>
    </div>
</body>
```

### Example 3: Proportional columns with repeat()

```html
<style>
    .metrics {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 12pt;
    }
    .metric {
        text-align: center;
        padding: 20pt 10pt;
        background-color: #f0fdf4;
        border: 1pt solid #16a34a;
    }
    .value {
        font-size: 24pt;
        font-weight: bold;
        color: #15803d;
    }
    .label {
        font-size: 9pt;
        color: #6b7280;
        text-transform: uppercase;
    }
</style>
<body>
    <div class="metrics">
        <div class="metric">
            <div class="value">142</div>
            <div class="label">Leads</div>
        </div>
        <div class="metric">
            <div class="value">38</div>
            <div class="label">Converted</div>
        </div>
        <div class="metric">
            <div class="value">£12.4K</div>
            <div class="label">Revenue</div>
        </div>
        <div class="metric">
            <div class="value">26%</div>
            <div class="label">Growth</div>
        </div>
    </div>
</body>
```

### Example 4: Mixed fixed and flexible columns

```html
<style>
    .invoice-line {
        display: grid;
        grid-template-columns: 1fr 60pt 70pt 80pt;
        column-gap: 8pt;
        margin-bottom: 4pt;
    }
    .line-header {
        display: grid;
        grid-template-columns: 1fr 60pt 70pt 80pt;
        column-gap: 8pt;
        background-color: #1f2937;
        color: white;
        margin-bottom: 2pt;
    }
    .cell {
        padding: 6pt;
        border: 1pt solid #e5e7eb;
    }
    .header-cell {
        padding: 6pt;
        font-weight: bold;
    }
    .right {
        text-align: right;
    }
</style>
<body>
    <div class="line-header">
        <div class="header-cell">Description</div>
        <div class="header-cell right">Qty</div>
        <div class="header-cell right">Unit</div>
        <div class="header-cell right">Total</div>
    </div>
    <div class="invoice-line">
        <div class="cell">Consulting services — Q1 2025</div>
        <div class="cell right">12</div>
        <div class="cell right">£850</div>
        <div class="cell right">£10,200</div>
    </div>
    <div class="invoice-line">
        <div class="cell">Report writing and review</div>
        <div class="cell right">4</div>
        <div class="cell right">£650</div>
        <div class="cell right">£2,600</div>
    </div>
</body>
```

### Example 5: Two-row grid (six items, three columns)

```html
<style>
    .team-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 15pt;
    }
    .member {
        padding: 15pt;
        margin-bottom: 15pt;
        background-color: #faf5ff;
        border: 1pt solid #a855f7;
        text-align: center;
    }
    .name {
        font-weight: bold;
        color: #6b21a8;
        margin-bottom: 4pt;
    }
    .role {
        font-size: 10pt;
        color: #6b7280;
    }
</style>
<body>
    <div class="team-grid">
        <div class="member"><div class="name">Alice Chen</div><div class="role">Engineering</div></div>
        <div class="member"><div class="name">Bob Smith</div><div class="role">Design</div></div>
        <div class="member"><div class="name">Carol Lee</div><div class="role">Product</div></div>
        <!-- These three auto-wrap to row 2 -->
        <div class="member"><div class="name">Dan Patel</div><div class="role">Marketing</div></div>
        <div class="member"><div class="name">Eve Russo</div><div class="role">Sales</div></div>
        <div class="member"><div class="name">Frank Oh</div><div class="role">Operations</div></div>
    </div>
</body>
```

### Example 6: Data binding with grid

{% raw %}
```html
<style>
    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 12pt;
    }
    .product-card {
        padding: 12pt;
        border: 1pt solid #e5e7eb;
        background-color: white;
        margin-bottom: 12pt;
    }
    .product-name {
        font-weight: bold;
        color: #1e3a8a;
        margin-bottom: 6pt;
    }
    .product-price {
        color: #16a34a;
        font-size: 14pt;
    }
    .product-stock {
        font-size: 9pt;
        color: #6b7280;
    }
</style>
<body>
    <h2>Product Catalogue</h2>
    <div class="product-grid">
        {{#each products}}
        <div class="product-card">
            <div class="product-name">{{this.name}}</div>
            <div class="product-price">{{this.price}}</div>
            <div class="product-stock">Stock: {{this.stock}}</div>
        </div>
        {{/each}}
    </div>
</body>
```
{% endraw %}

---

## See Also

- [display](/reference/cssproperties/properties/css_prop_display) - Set display mode (`grid`, `block`, `table`, etc.)
- [column-gap](/reference/cssproperties/properties/css_prop_column-gap) - Spacing between grid columns
- [width](/reference/cssproperties/properties/css_prop_width) - Set grid container width
- [height](/reference/cssproperties/properties/css_prop_height) - Set item height within a grid cell
- [padding](/reference/cssproperties/properties/css_prop_padding) - Inner spacing on grid items
- [border](/reference/cssproperties/properties/css_prop_border) - Borders on grid items

---
