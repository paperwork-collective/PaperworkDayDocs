---
layout: default
title: Grid Layouts
nav_order: 9
parent: Layout & Positioning
parent_url: /learning/04-layout/
grand_parent: Learning Guides
grand_parent_url: /learning/
has_toc: false
---

# Grid Layouts <span class="label label-yellow">Beta</span>

Use `display: grid` with `grid-template-columns` to create structured column-row layouts — card grids, dashboards, invoice lines, sidebar layouts, and team directories — all from plain HTML and CSS.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Create multi-column grids using `display: grid` and `grid-template-columns`
- Use `fr` units, fixed lengths, `auto`, and `repeat()` to define columns
- Control column spacing with `column-gap`
- Build common layout patterns: card grids, sidebars, dashboards, invoice lines
- Combine data binding with grid layouts for dynamic output
- Choose between grid, native columns, and table-cell for different scenarios

---

## How Grid Layout Works

Setting `display: grid` on a container element activates grid layout. Its direct children are then placed into columns defined by `grid-template-columns`, filling left to right and wrapping to the next row automatically.

```
Container (display: grid; grid-template-columns: 1fr 1fr 1fr)
┌──────────────────────────────────────┐
│  Item 1  │  Item 2  │  Item 3       │  ← row 1
│          │          │               │
├──────────┼──────────┼───────────────┤
│  Item 4  │  Item 5  │  Item 6       │  ← row 2 (auto-wrapped)
│          │          │               │
└──────────────────────────────────────┘
```

**Only direct children** are placed in the grid. Grandchildren remain inside their parent cell.

---

## Defining Columns

`grid-template-columns` accepts a space-separated list of track values. The number of values = number of columns.

### fr units — proportional widths

`fr` (fraction) divides remaining space proportionally. After fixed columns and gaps are subtracted, remaining space is split by fr ratio.

```css
grid-template-columns: 1fr 1fr;         /* two equal columns — each 50% */
grid-template-columns: 1fr 2fr;         /* 33% and 67% */
grid-template-columns: 1fr 1fr 1fr;     /* three equal columns — each 33% */
grid-template-columns: 2fr 1fr 1fr;     /* 50%, 25%, 25% */
```

### Fixed lengths

Any CSS length unit works: `pt`, `px`, `mm`, `cm`, `in`, `em`, `%`.

```css
grid-template-columns: 200pt 1fr;       /* 200pt sidebar, rest to main content */
grid-template-columns: 25% 75%;         /* quarter + three-quarters */
grid-template-columns: 80pt 80pt 80pt;  /* three fixed columns */
```

### auto

`auto` columns share remaining space equally. When no `fr` columns exist, each `auto` becomes `1fr`.

```css
grid-template-columns: auto auto auto;  /* same as 1fr 1fr 1fr */
grid-template-columns: 200pt auto;      /* fixed sidebar + auto-fill */
```

### repeat()

`repeat(count, track)` expands to `count` copies of the track — saves repetition for uniform grids.

```css
grid-template-columns: repeat(3, 1fr);          /* 1fr 1fr 1fr */
grid-template-columns: repeat(4, 150pt);         /* 150pt 150pt 150pt 150pt */
grid-template-columns: 200pt repeat(2, 1fr);     /* 200pt 1fr 1fr */
```

---

## Column Gap

`column-gap` adds whitespace between columns. The gap is subtracted from the available width before `fr` columns are calculated, so columns always fill the container perfectly.

```css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 15pt;    /* 15pt gap between each pair of adjacent columns */
}
```

For a 600pt container with `1fr 1fr` and `column-gap: 20pt`:
- Available for columns = 600 − 20 = 580pt
- Each column = 580 / 2 = 290pt

---

## Basic Examples

### Three equal columns

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 12pt;
    }
    .card {
        padding: 15pt;
        background-color: #f3f4f6;
        border: 1pt solid #d1d5db;
    }
    .card h3 { margin: 0 0 8pt 0; color: #1e3a8a; }
    .card p  { margin: 0; font-size: 10pt; }
</style>
<body>
    <div class="grid">
        <div class="card">
            <h3>Reliability</h3>
            <p>99.9% uptime guaranteed across all services.</p>
        </div>
        <div class="card">
            <h3>Security</h3>
            <p>End-to-end encryption with audit logging.</p>
        </div>
        <div class="card">
            <h3>Support</h3>
            <p>Dedicated account manager for all customers.</p>
        </div>
    </div>
</body>
```

### Two rows — six items, three columns

Items beyond three automatically wrap to a second row:

```html
<style>
    .team-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 15pt;
    }
    .member {
        text-align: center;
        padding: 15pt;
        margin-bottom: 15pt;
        border: 1pt solid #e5e7eb;
        background-color: #fafafa;
    }
    .name { font-weight: bold; color: #1f2937; }
    .role { font-size: 10pt; color: #6b7280; margin-top: 4pt; }
</style>
<body>
    <div class="team-grid">
        <div class="member"><div class="name">Alice Chen</div><div class="role">Engineering</div></div>
        <div class="member"><div class="name">Bob Smith</div><div class="role">Design</div></div>
        <div class="member"><div class="name">Carol Lee</div><div class="role">Product</div></div>
        <!-- wraps to row 2 -->
        <div class="member"><div class="name">Dan Patel</div><div class="role">Marketing</div></div>
        <div class="member"><div class="name">Eve Russo</div><div class="role">Sales</div></div>
        <div class="member"><div class="name">Frank Oh</div><div class="role">Operations</div></div>
    </div>
</body>
```

---

## Common Layout Patterns

### Sidebar + main content

A fixed sidebar beside a flexible content area:

```html
<style>
    .page-layout {
        display: grid;
        grid-template-columns: 160pt 1fr;
        column-gap: 24pt;
    }
    .sidebar {
        padding: 15pt;
        background-color: #f8fafc;
        border-right: 2pt solid #e2e8f0;
    }
    .sidebar h3 { margin: 0 0 12pt 0; font-size: 12pt; color: #475569; }
    .sidebar p  { margin: 0 0 8pt 0; font-size: 10pt; }
    .content { padding: 15pt; }
</style>
<body>
    <div class="page-layout">
        <div class="sidebar">
            <h3>Contents</h3>
            <p>Introduction</p>
            <p>Key Findings</p>
            <p>Recommendations</p>
            <p>Appendix</p>
        </div>
        <div class="content">
            <h2>Executive Summary</h2>
            <p>This report outlines our quarterly performance across all divisions...</p>
        </div>
    </div>
</body>
```

### Dashboard metrics row

Four equal metric cards in a row:

```html
<style>
    .metrics {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 12pt;
        margin-bottom: 20pt;
    }
    .metric {
        text-align: center;
        padding: 18pt 10pt;
        border: 1pt solid #e5e7eb;
        border-top: 3pt solid #2563eb;
        background-color: white;
    }
    .metric-value {
        font-size: 26pt;
        font-weight: bold;
        color: #1e40af;
    }
    .metric-label {
        font-size: 9pt;
        color: #6b7280;
        text-transform: uppercase;
        margin-top: 6pt;
    }
    .metric-change {
        font-size: 9pt;
        color: #16a34a;
        margin-top: 4pt;
    }
</style>
<body>
    <div class="metrics">
        <div class="metric">
            <div class="metric-value">£284K</div>
            <div class="metric-label">Revenue</div>
            <div class="metric-change">+12% vs last month</div>
        </div>
        <div class="metric">
            <div class="metric-value">1,847</div>
            <div class="metric-label">Customers</div>
            <div class="metric-change">+8% vs last month</div>
        </div>
        <div class="metric">
            <div class="metric-value">94%</div>
            <div class="metric-label">Satisfaction</div>
            <div class="metric-change">+2pts vs last month</div>
        </div>
        <div class="metric">
            <div class="metric-value">23</div>
            <div class="metric-label">Open Issues</div>
            <div class="metric-change" style="color: #dc2626;">+3 this week</div>
        </div>
    </div>
</body>
```

### Invoice line items

Fixed columns for a structured data layout — ideal for invoice tables without using `<table>` markup:

```html
<style>
    .invoice-header,
    .invoice-line {
        display: grid;
        grid-template-columns: 1fr 55pt 75pt 80pt;
        column-gap: 6pt;
    }
    .invoice-header {
        background-color: #1f2937;
        color: white;
        margin-bottom: 1pt;
    }
    .invoice-line {
        border-bottom: 1pt solid #f3f4f6;
    }
    .hcell { padding: 8pt 6pt; font-weight: bold; font-size: 10pt; }
    .cell  { padding: 7pt 6pt; font-size: 10pt; }
    .right { text-align: right; }
    .total-row {
        display: grid;
        grid-template-columns: 1fr 80pt;
        column-gap: 6pt;
        border-top: 2pt solid #1f2937;
        margin-top: 6pt;
    }
    .total-label { padding: 8pt 6pt; font-weight: bold; text-align: right; }
    .total-value { padding: 8pt 6pt; font-weight: bold; text-align: right; color: #1e40af; }
</style>
<body>
    <div class="invoice-header">
        <div class="hcell">Description</div>
        <div class="hcell right">Qty</div>
        <div class="hcell right">Unit Price</div>
        <div class="hcell right">Amount</div>
    </div>
    <div class="invoice-line">
        <div class="cell">Strategy consultancy — Q1 2025</div>
        <div class="cell right">15</div>
        <div class="cell right">£850.00</div>
        <div class="cell right">£12,750.00</div>
    </div>
    <div class="invoice-line">
        <div class="cell">Report writing and review</div>
        <div class="cell right">8</div>
        <div class="cell right">£650.00</div>
        <div class="cell right">£5,200.00</div>
    </div>
    <div class="invoice-line">
        <div class="cell">Workshop facilitation (half-day)</div>
        <div class="cell right">2</div>
        <div class="cell right">£1,200.00</div>
        <div class="cell right">£2,400.00</div>
    </div>
    <div class="total-row">
        <div class="total-label">Total</div>
        <div class="total-value">£20,350.00</div>
    </div>
</body>
```

---

## Data Binding with Grid

Grid layout works naturally with `{{#each}}` loops. The grid wraps items automatically — you only define the column structure once.

### Product catalogue

{% raw %}
```html
<style>
    .catalogue {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 12pt;
    }
    .product {
        padding: 12pt;
        border: 1pt solid #e5e7eb;
        margin-bottom: 12pt;
        background-color: white;
    }
    .product-name  { font-weight: bold; color: #1e3a8a; margin-bottom: 6pt; }
    .product-price { color: #16a34a; font-size: 14pt; font-weight: bold; }
    .product-desc  { font-size: 9pt; color: #6b7280; margin-top: 4pt; }
</style>
<body>
    <h1>{{catalogue.title}}</h1>
    <div class="catalogue">
        {{#each catalogue.products}}
        <div class="product">
            <div class="product-name">{{this.name}}</div>
            <div class="product-price">{{this.price}}</div>
            <div class="product-desc">{{this.description}}</div>
        </div>
        {{/each}}
    </div>
</body>
```
{% endraw %}

### Status report with conditional colouring

{% raw %}
```html
<style>
    .report-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        column-gap: 8pt;
    }
    .header-row, .data-row {
        display: contents; /* let children participate in parent grid */
    }
    .hcell {
        padding: 8pt;
        background-color: #374151;
        color: white;
        font-weight: bold;
        font-size: 10pt;
        margin-bottom: 2pt;
    }
    .dcell {
        padding: 8pt;
        font-size: 10pt;
        border-bottom: 1pt solid #f3f4f6;
    }
    .status-green  { color: #16a34a; font-weight: bold; }
    .status-amber  { color: #d97706; font-weight: bold; }
    .status-red    { color: #dc2626; font-weight: bold; }
</style>
<body>
    <div class="report-grid">
        <div class="hcell">Project</div>
        <div class="hcell">Status</div>
        <div class="hcell">Budget</div>
        <div class="hcell">ETC</div>
        {{#each projects}}
        <div class="dcell">{{this.name}}</div>
        <div class="dcell status-{{this.statusColor}}">{{this.status}}</div>
        <div class="dcell">{{this.budgetUsed}}%</div>
        <div class="dcell">{{this.estimatedCompletion}}</div>
        {{/each}}
    </div>
</body>
```
{% endraw %}

---

## Choosing the Right Layout

| Scenario | Best choice | Why |
|---|---|---|
| Body text flowing across equal columns | `column-count` | Text reflows automatically across columns |
| Fixed set of cards or items in rows | `display: grid` | Explicit column widths, items stay in cells |
| Sidebar + main content | `display: grid` | Mixed fixed/flexible column widths |
| Dashboard metric cards | `display: grid` | Uniform columns, clean alignment |
| Invoice / data rows | `display: grid` | Precise column widths match headers to data |
| Simple two-column equal height | `display: table-cell` | Lighter markup for basic side-by-side |
| Text wrapping around an image | `float` | Image stays inline with surrounding text |
| Equal-height columns with ruled dividers | `column-count` + `column-rule` | Rule lines between text columns |

---

## Container Sizing

By default, a grid container is block-level and fills the available width. You can also give it an explicit width:

```css
/* Full width (default) */
.grid { display: grid; grid-template-columns: 1fr 1fr; }

/* Explicit width — columns are sized within this */
.grid { display: grid; grid-template-columns: 1fr 1fr; width: 400pt; }

/* Width and margin — margin reduces the available width for fr columns */
.grid { display: grid; grid-template-columns: 1fr 1fr; margin-left: 30pt; }
```

Container padding also reduces column width — the columns are calculated within the padded inner area:

```css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 20pt;   /* columns share (container-width − 2×20pt) */
}
```

---

## Notes and Limitations

- Only **direct children** of the grid container are placed in columns — nested elements stay inside their cell
- Items fill columns **left to right, top to bottom** (row-major order) — there is no column-major mode
- **No explicit item placement** — you cannot use `grid-column` or `grid-row` to position items; placement is always automatic
- **No row spanning** — items cannot span multiple rows
- **`display: flex` is not supported** — use `display: grid` for structured column layouts
- Partial rows are allowed — a 3-column grid with 5 items produces two rows: [1,2,3] and [4,5]
- Each item renders with its own `border`, `padding`, `height`, and `background` as set on the item itself
- `column-gap` adds space between columns only — it does not add space before column 1 or after the last column (use container `padding` for that)

---

## Quick Reference

| Property | What it does |
|---|---|
| `display: grid` | Activate grid layout on the container |
| `grid-template-columns: 1fr 1fr` | Two equal columns |
| `grid-template-columns: 200pt 1fr` | Fixed + flexible |
| `grid-template-columns: repeat(3, 1fr)` | Three equal columns |
| `column-gap: 15pt` | Space between columns |
| Item `height: 80pt` | Fixed height for all cells in that row |
| Item `padding: 12pt` | Inner spacing within each cell |
| Item `border: 1pt solid #ccc` | Border around each cell |

---

## See Also

- [Multi-Column Layouts](04_multi_column.html) — flowing text across balanced columns
- [Table Layouts](06_tables.html) — data tables with `<table>` markup
- [`display` property reference](/reference/cssproperties/properties/css_prop_display) — all display modes
- [`grid-template-columns` reference](/reference/cssproperties/properties/css_prop_grid-template-columns) — full column syntax
- [`column-gap` reference](/reference/cssproperties/properties/css_prop_column-gap) — gap sizing

---

**← Previous:** [Layout Best Practices](08_layout_best_practices.html)
