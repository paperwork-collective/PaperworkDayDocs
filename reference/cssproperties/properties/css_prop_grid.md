---
layout: default
title: grid-*
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: true
has_toc: false
---

# CSS Grid Layout
{: .no_toc }

CSS Grid is a two-dimensional layout system that arranges children into rows and columns defined by track sizes. Apply `display: grid` to a container, then define column and row tracks with `grid-template-columns` and `grid-template-rows`.

For one-dimensional layouts see [flex-*](/reference/cssproperties/properties/css_prop_flexbox).

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

These properties are set on the **grid container** (the element with `display: grid`).

| Property | Summary | Page |
|----------|---------|------|
| `display: grid` | Enables grid layout | this page |
| `grid-template-columns` | Column track sizes and count | [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) |
| `grid-template-rows` | Row track sizes and count | [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) |
| `grid-template-areas` | Named layout regions as a string map | [grid-template-areas / grid-area](/reference/cssproperties/properties/css_prop_grid-template-areas) |
| `grid-auto-flow` | How auto-placed items fill the grid: `row`, `column`, `dense` | [grid-auto-flow](/reference/cssproperties/properties/css_prop_grid-auto-flow) |
| `grid-auto-columns` / `grid-auto-rows` | Size of implicitly created tracks | [grid-auto-columns / grid-auto-rows](/reference/cssproperties/properties/css_prop_grid-auto-tracks) |
| `gap` / `row-gap` / `column-gap` | Space between cells | [gap / row-gap / column-gap](/reference/cssproperties/properties/css_prop_grid-gap) |
| `justify-content` | Aligns the column tracks within the container | [justify-content](/reference/cssproperties/properties/css_prop_grid-justify-content) <span class="label label-green">v9.7</span> |
| `align-content` | Aligns the row tracks within the container | [align-content](/reference/cssproperties/properties/css_prop_grid-align-content) <span class="label label-green">v9.7</span> |

---

## Item Properties

These properties are set on **grid items** (direct children of the grid container).

| Property | Summary | Page |
|----------|---------|------|
| `grid-column` | Column placement and spanning | [grid-column / grid-row](/reference/cssproperties/properties/css_prop_grid-placement) |
| `grid-row` | Row placement and spanning | [grid-column / grid-row](/reference/cssproperties/properties/css_prop_grid-placement) |
| `grid-area` | Place item into a named template area | [grid-template-areas / grid-area](/reference/cssproperties/properties/css_prop_grid-template-areas) <span class="label label-green">v9.7</span> |

---

## Advanced Features

| Feature | Summary | Page |
|---------|---------|------|
| grid line names | `[name]` bracket notation in track definitions | [grid line names](/reference/cssproperties/properties/css_prop_grid-named-lines) <span class="label label-green">v9.7</span> |
| `auto-fill` / `auto-fit` in `repeat()` | Fill tracks to fit container width | [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) <span class="label label-green">v9.7</span> |

---

## Enabling Grid Layout

```css
.container { display: grid; }
```

| Value | Support |
|-------|---------|
| `grid` | **Supported** |
| `inline-grid` | Not supported |

---

## Unsupported Features

| Feature | Status |
|---------|--------|
| `minmax()` | Not supported |
| `subgrid` | Explicitly rejected — parse error if used |
| `inline-grid` | Not supported |

---

## Examples

### Three-column card grid

```html
<style>
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12pt; }
    .card { padding: 15pt; background-color: #dbeafe; border: 1pt solid #2563eb; }
</style>
<div class="grid">
    <div class="card"><h3>Feature A</h3><p>Description.</p></div>
    <div class="card"><h3>Feature B</h3><p>Description.</p></div>
    <div class="card"><h3>Feature C</h3><p>Description.</p></div>
</div>
```

### Named-area page layout

```html
<style>
    .page {
        display: grid;
        grid-template-columns: 160pt 1fr;
        grid-template-rows: 50pt 1fr 40pt;
        grid-template-areas:
            "header  header"
            "sidebar main"
            "footer  footer";
        gap: 8pt;
    }
    .header  { grid-area: header;  background-color: #1e3a8a; color: white; padding: 12pt; }
    .sidebar { grid-area: sidebar; background-color: #f3f4f6; padding: 12pt; }
    .main    { grid-area: main;    padding: 12pt; }
    .footer  { grid-area: footer;  background-color: #374151; color: white; padding: 10pt; }
</style>
<div class="page">
    <div class="header">Report Header</div>
    <div class="sidebar">Navigation</div>
    <div class="main">Main content</div>
    <div class="footer">Footer</div>
</div>
```

---

## See Also

- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — define column tracks
- [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) — define row tracks
- [grid-template-areas / grid-area](/reference/cssproperties/properties/css_prop_grid-template-areas) — named regions
- [grid-column / grid-row](/reference/cssproperties/properties/css_prop_grid-placement) — item placement
- [Named grid lines](/reference/cssproperties/properties/css_prop_grid-named-lines) — bracket notation in tracks
- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — one-dimensional flex layout
- [display](/reference/cssproperties/properties/css_prop_display) — enable grid with `display: grid`

---
