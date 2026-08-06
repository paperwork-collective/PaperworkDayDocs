---
layout: default
title: "grid[-template]-area"
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# grid[-template]-area <span class="label label-green">v9.7</span>
{: .no_toc }

`grid-template-areas` defines a named layout map on the grid container using strings. Each string represents a row; each word in the string is a named area spanning one column. Grid items are then placed into those areas using `grid-area`.

---

<details class='top-toc' markdown="block">
  <summary>On this page</summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## grid-template-areas

### Syntax

```css
selector {
    display: grid;
    grid-template-columns: ...;
    grid-template-areas:
        "area1 area2 area3"
        "area1 main  aside";
}
```

- Each quoted string is one row
- Each word is one cell; the word is the area name for that cell
- Repeating a name in adjacent cells merges them into a single area (spanning)
- `.` (dot) represents an empty cell with no area name

### Rules

- All rows must have the same number of area tokens (including `.` placeholders)
- Named areas must form a rectangle — L-shapes or disconnected groups are invalid
- Area names must be valid CSS identifiers (no spaces)

---

## grid-area

Assigns a grid item to a named area defined in `grid-template-areas`. Set on the **grid item**, not the container.

### Syntax

```css
.item {
    grid-area: area-name;
}
```

Items not assigned to an area are placed automatically by `grid-auto-flow`.

---

## Examples

### Classic page layout

```html
<style>
    .page {
        display: grid;
        grid-template-columns: 160pt 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "header  header"
            "sidebar content"
            "footer  footer";
        gap: 10pt;
        height: 600pt;
    }
    .header  { grid-area: header;  background-color: #1e3a8a; color: white; padding: 15pt; }
    .sidebar { grid-area: sidebar; background-color: #f3f4f6; padding: 12pt; }
    .content { grid-area: content; padding: 12pt; }
    .footer  { grid-area: footer;  background-color: #f3f4f6; padding: 8pt; font-size: 9pt; }
</style>
<div class="page">
    <div class="header">Report Header</div>
    <div class="sidebar"><p>Navigation</p><p>Links</p></div>
    <div class="content"><h2>Main Content</h2><p>Flows here.</p></div>
    <div class="footer">Footer — confidential</div>
</div>
```

### Dashboard with spanning metric

```html
<style>
    .dashboard {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
            "summary summary chart"
            "table   table   table";
        gap: 12pt;
    }
    .summary { grid-area: summary; background-color: #dbeafe; padding: 16pt; }
    .chart   { grid-area: chart;   background-color: #d1fae5; padding: 16pt; }
    .table   { grid-area: table;   background-color: #f9fafb; padding: 16pt;
               border: 1pt solid #e5e7eb; }
</style>
<div class="dashboard">
    <div class="summary"><h3>Key Metrics</h3><p>£142K revenue</p></div>
    <div class="chart"><h3>Chart</h3><p>Visual here</p></div>
    <div class="table"><h3>Detailed Data</h3><p>Table spanning all three columns.</p></div>
</div>
```

### Empty cell placeholder

```html
<style>
    .layout {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
            "logo  .      nav"
            "main  main   aside";
        gap: 10pt;
    }
    .logo  { grid-area: logo;  background-color: #fef9c3; padding: 10pt; }
    .nav   { grid-area: nav;   background-color: #f3f4f6; padding: 10pt; }
    .main  { grid-area: main;  padding: 12pt; }
    .aside { grid-area: aside; background-color: #f3f4f6; padding: 12pt; }
</style>
<div class="layout">
    <div class="logo">Logo</div>
    <!-- middle column in row 1 is intentionally empty -->
    <div class="nav">Nav Links</div>
    <div class="main">Main Content</div>
    <div class="aside">Sidebar</div>
</div>
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — define column tracks referenced by the area map
- [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) — define row tracks
- [grid-column / grid-row](/reference/cssproperties/properties/css_prop_grid-placement) — explicit line-number placement
- [Named grid lines](/reference/cssproperties/properties/css_prop_grid-named-lines) — naming lines within track definitions

---
