---
layout: default
title: grid-auto-flow
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# grid-auto-flow
{: .no_toc }

Controls how auto-placed items are inserted into the grid when their position is not explicitly set. The default places items row by row from left to right.

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
    grid-auto-flow: row | column | dense | row dense | column dense;
}
```

---

## Values

| Value | Description |
|-------|-------------|
| `row` | Items fill left to right, then move to the next row (default) |
| `column` | Items fill top to bottom, then move to the next column |
| `dense` | Fill gaps created when larger items span multiple tracks |
| `row dense` | Row-first with gap-filling |
| `column dense` | Column-first with gap-filling |

---

## Notes

### row (default)

Items are placed left to right across each row. When a row is full, the next item starts a new row — the same order as the template source.

### column

Items fill downward through each column. When a column is full, the next item starts at the top of the next column. Useful for multi-column label or item lists where vertical grouping is preferred over horizontal.

### dense

When items span multiple tracks (via `grid-column` / `grid-row`), gaps can appear because a spanning item won't fit in the current position. `dense` backtracks and fills those gaps with later items that do fit.

**Note**: `dense` changes the rendered position of items relative to their template source order. Use it for unordered visual collections (icon grids, badge sets) rather than structured content where the PDF layout should reflect the template sequence.

---

## Examples

### Row flow (default)

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row;   /* default */
        gap: 8pt;
    }
    .item { padding: 10pt; background-color: #f3f4f6; border: 1pt solid #d1d5db; }
</style>
<div class="grid">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
</div>
<!-- Layout: 1 2 3 / 4 5 6 -->
```

### Column flow

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, auto);
        grid-auto-flow: column;
        gap: 8pt;
    }
    .item { padding: 10pt; background-color: #dbeafe; border: 1pt solid #2563eb; }
</style>
<div class="grid">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
    <div class="item">D</div>
    <div class="item">E</div>
    <div class="item">F</div>
</div>
<!-- Layout: A C E / B D F (fills columns first) -->
```

### Dense flow filling gaps

```html
<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-flow: row dense;
        gap: 8pt;
    }
    .item       { padding: 10pt; background-color: #f3f4f6; border: 1pt solid #d1d5db; }
    .wide       { grid-column: span 2; background-color: #dbeafe; }
</style>
<div class="gallery">
    <div class="item">1</div>
    <div class="item wide">2 — wide (spans 2)</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item wide">5 — wide (spans 2)</div>
    <div class="item">6</div>
    <div class="item">7</div>
</div>
<!-- dense fills gaps left by wide items with later smaller items -->
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — explicit column tracks
- [grid-auto-columns / grid-auto-rows](/reference/cssproperties/properties/css_prop_grid-auto-tracks) — size for auto-created tracks
- [grid-column / grid-row](/reference/cssproperties/properties/css_prop_grid-placement) — explicit item placement (creates the gaps that `dense` fills)

---
