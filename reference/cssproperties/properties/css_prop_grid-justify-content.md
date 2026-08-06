---
layout: default
title: justify-content
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# justify-content — Grid <span class="label label-green">v9.7</span>
{: .no_toc }

Aligns the **column tracks** as a group within the grid container along the inline (horizontal) axis when the total column track width is less than the container width. It distributes the remaining space between and around the track group — not between individual items within a column.

> **Flex context**: `justify-content` in a flex container aligns items along the main axis. See [justify-content — Flex](/reference/cssproperties/properties/css_prop_flex-justify-content) for those details.

---

<details class='top-toc' markdown="block">
  <summary>On this page</summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Syntax

```css
selector {
    display: grid;
    justify-content: start | end | center | stretch
                   | space-between | space-around | space-evenly;
}
```

---

## Values

| Value | Description |
|-------|-------------|
| `start` | Columns packed to the start (left) of the container |
| `end` | Columns packed to the end (right) of the container |
| `center` | Columns centred within the container |
| `stretch` | Columns stretched to fill the container width (default for `fr` tracks) |
| `space-between` | Equal gaps between column groups; no space at container edges |
| `space-around` | Equal space on each side of each column group (half-size at edges) |
| `space-evenly` | Equal space between all columns and the container edges |

---

## Notes

### Only works with remaining space

`justify-content` only takes visible effect when the sum of all column track widths (plus gaps) is **less than** the container width. If columns use `fr` units or `auto` to fill the container, `justify-content` typically has no effect because `fr` tracks consume all available space.

**Use `justify-content` with fixed-width or `pt`/`px` columns.** With `fr` columns, use `gap` to distribute space within the track layout instead.

```css
/* justify-content HAS an effect — fixed columns leave free space */
.grid {
    display: grid;
    grid-template-columns: 100pt 100pt 100pt;
    justify-content: center;   /* centres the three 100pt columns */
}

/* justify-content has NO effect — fr tracks consume all space */
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;   /* no free space to distribute */
}
```

### Aligns tracks, not items

Unlike flexbox where `justify-content` aligns individual items, in grid it aligns the entire column track structure. Items within a column are positioned by the column's own width and the item's `justify-self` property.

---

## Examples

### Centred fixed-width columns

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: 120pt 120pt 120pt;
        justify-content: center;
        gap: 12pt;
        width: 100%;
        border: 1pt solid #e5e7eb;
        padding: 10pt;
    }
    .card { padding: 12pt; background-color: #dbeafe; border: 1pt solid #2563eb; }
</style>
<div class="grid">
    <div class="card">Card A</div>
    <div class="card">Card B</div>
    <div class="card">Card C</div>
</div>
```

### Space-between columns

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: 150pt 150pt;
        justify-content: space-between;
        gap: 0;
        border: 1pt solid #e5e7eb;
        padding: 10pt;
    }
    .col { padding: 12pt; background-color: #f3f4f6; }
</style>
<div class="grid">
    <div class="col">Left</div>
    <div class="col">Right</div>
</div>
```

### space-evenly for even distribution

```html
<style>
    .metrics {
        display: grid;
        grid-template-columns: 100pt 100pt 100pt;
        justify-content: space-evenly;
        padding: 10pt;
        background-color: #f9fafb;
        border: 1pt solid #e5e7eb;
    }
    .metric { text-align: center; padding: 10pt; }
    .value  { font-size: 20pt; font-weight: bold; color: #2563eb; }
    .label  { font-size: 9pt; color: #6b7280; }
</style>
<div class="metrics">
    <div class="metric"><div class="value">142</div><div class="label">Leads</div></div>
    <div class="metric"><div class="value">38</div><div class="label">Sales</div></div>
    <div class="metric"><div class="value">26%</div><div class="label">Growth</div></div>
</div>
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [align-content — Grid](/reference/cssproperties/properties/css_prop_grid-align-content) — vertical alignment of row tracks
- [gap / row-gap / column-gap](/reference/cssproperties/properties/css_prop_grid-gap) — spacing within the track layout
- [justify-content — Flex](/reference/cssproperties/properties/css_prop_flex-justify-content) — same property in flex context

---
