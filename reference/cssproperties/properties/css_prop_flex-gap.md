---
layout: default
title: "row-gap / column-gap"
parent: flex-*
parent_url: /reference/cssproperties/properties/css_prop_flexbox.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# row-gap / column-gap — Flex
{: .no_toc }

Sets the spacing between flex items without adding margin to the outer edges of the container. `gap` is a shorthand for `row-gap` and `column-gap`.

> **Grid context**: `gap`, `row-gap`, and `column-gap` work identically in grid containers, controlling the gutters between tracks. See [gap — Grid](/reference/cssproperties/properties/css_prop_grid-gap) for grid-specific details.

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
    gap: <row-gap> <column-gap>;   /* shorthand: two values */
    gap: <value>;                  /* shorthand: same value for both */

    row-gap: <value>;              /* space between wrapped rows */
    column-gap: <value>;           /* space between items in a row */
}
```

Accepted values are any CSS length (`pt`, `px`, `mm`, `em`, `%`).

---

## Values

| Property | Description | Default |
|----------|-------------|---------|
| `gap` | Shorthand — first value is `row-gap`, second is `column-gap` | `0` |
| `row-gap` | Space between lines when `flex-wrap: wrap` creates multiple rows | `0` |
| `column-gap` | Space between items along the main axis in each row | `0` |

When `gap` is given one value, both `row-gap` and `column-gap` are set to that value.

---

## Notes

### Gap vs margin

`gap` only applies to the space *between* items. It never adds space at the outer edges of the container. This is different from adding `margin` to each item, which would also add space at the edges.

```css
/* gap — no space at container edges */
.row { display: flex; gap: 12pt; }

/* margin equivalent — also adds space at edges */
.row .item { margin-right: 12pt; }
.row .item:last-child { margin-right: 0; }
```

### Column gap in row direction

In `flex-direction: row`, `column-gap` controls the space between items in the main (horizontal) axis. `row-gap` only has a visible effect when `flex-wrap: wrap` causes items to wrap.

### Row gap in column direction

In `flex-direction: column`, `row-gap` controls the space between items along the main (vertical) axis. `column-gap` only has a visible effect if wrapping creates multiple columns.

---

## Examples

### Simple horizontal gap

```html
<style>
    .toolbar {
        display: flex;
        gap: 8pt;
        padding: 10pt;
        background-color: #f3f4f6;
    }
    .btn {
        padding: 6pt 14pt;
        background-color: #2563eb;
        color: white;
    }
</style>
<div class="toolbar">
    <div class="btn">Save</div>
    <div class="btn">Export</div>
    <div class="btn">Print</div>
</div>
```

### Different horizontal and vertical gaps (wrap layout)

```html
<style>
    .grid {
        display: flex;
        flex-wrap: wrap;
        column-gap: 16pt;
        row-gap: 24pt;
        padding: 12pt;
    }
    .card {
        flex: 0 0 calc(50% - 8pt);
        padding: 12pt;
        border: 1pt solid #e5e7eb;
    }
</style>
<div class="grid">
    <div class="card">Card A</div>
    <div class="card">Card B</div>
    <div class="card">Card C</div>
    <div class="card">Card D</div>
</div>
```

### Column layout with row gap

```html
<style>
    .stack {
        display: flex;
        flex-direction: column;
        gap: 16pt;
        padding: 12pt;
    }
    .item {
        padding: 10pt;
        background-color: #f9fafb;
        border: 1pt solid #d1d5db;
    }
</style>
<div class="stack">
    <div class="item">Section A</div>
    <div class="item">Section B</div>
    <div class="item">Section C</div>
</div>
```

---

## See Also

- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — flexbox overview
- [flex-wrap](/reference/cssproperties/properties/css_prop_flex-wrap) — enables multiple rows (where `row-gap` takes effect)
- [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) — determines which gap axis is main vs cross
- [gap — Grid](/reference/cssproperties/properties/css_prop_grid-gap) — same properties in grid context

---
