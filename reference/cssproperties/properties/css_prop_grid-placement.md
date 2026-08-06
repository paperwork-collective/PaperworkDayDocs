---
layout: default
title: grid-column/-row
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# grid-column/-row
{: .no_toc }

Place a grid item at a specific position by specifying which grid lines it starts and ends on. These properties override the automatic placement algorithm (`grid-auto-flow`) for the item they're set on.

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
.item {
    grid-column: <start> / <end>;     /* column line start / end */
    grid-column: <start> / span N;    /* start at line, span N columns */
    grid-column: span N;              /* auto-place but span N columns */

    grid-row: <start> / <end>;        /* row line start / end */
    grid-row: <start> / span N;       /* start at line, span N rows */
    grid-row: span N;                 /* auto-place but span N rows */
}
```

Line numbers start at 1 from the left (for columns) or top (for rows). Negative numbers count from the right/bottom edge.

---

## Values

| Value | Description |
|-------|-------------|
| `<integer>` | Explicit grid line number (1-indexed from start) |
| `span <integer>` | Span this many tracks |
| `auto` | Auto-placement (default) |
| Named line | Reference a line by name (see [Named grid lines](/reference/cssproperties/properties/css_prop_grid-named-lines)) |

---

## Grid line numbering

For a three-column grid, column lines are numbered 1 through 4:

```
 col 1  col 2  col 3
|  1  |  2  |  3  |  4 |
```

`grid-column: 1 / 3` spans from line 1 to line 3, occupying columns 1 and 2.  
`grid-column: 2 / 4` spans columns 2 and 3.  
`grid-column: 1 / -1` spans all columns (from first to last line).

---

## Examples

### Item spanning two columns

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10pt;
    }
    .item { padding: 12pt; background-color: #f3f4f6; border: 1pt solid #d1d5db; }
    .wide { grid-column: 1 / 3; background-color: #dbeafe; }   /* columns 1 + 2 */
</style>
<div class="grid">
    <div class="item wide">Wide item (cols 1–2)</div>
    <div class="item">Col 3</div>
    <div class="item">Col 1</div>
    <div class="item">Col 2</div>
    <div class="item">Col 3</div>
</div>
```

### Full-width header spanning all columns

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10pt;
    }
    .header  { grid-column: 1 / -1; background-color: #1e3a8a; color: white; padding: 15pt; }
    .col     { padding: 12pt; border: 1pt solid #e5e7eb; }
</style>
<div class="grid">
    <div class="header">Report Header — spans all 3 columns</div>
    <div class="col">Section A</div>
    <div class="col">Section B</div>
    <div class="col">Section C</div>
</div>
```

### Row and column span together

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 80pt);
        gap: 8pt;
    }
    .item   { padding: 10pt; background-color: #f9fafb; border: 1pt solid #d1d5db; }
    .hero   {
        grid-column: 1 / 3;   /* spans cols 1–2 */
        grid-row: 1 / 3;      /* spans rows 1–2 */
        background-color: #dbeafe;
        padding: 15pt;
    }
</style>
<div class="grid">
    <div class="hero">Hero (2×2)</div>
    <div class="item">Top right</div>
    <div class="item">Mid right</div>
    <div class="item">Bottom left</div>
    <div class="item">Bottom centre</div>
    <div class="item">Bottom right</div>
</div>
```

### Using span keyword

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8pt;
    }
    .item   { padding: 10pt; background-color: #f3f4f6; border: 1pt solid #d1d5db; }
    .double { grid-column: span 2; background-color: #d1fae5; }
    .triple { grid-column: span 3; background-color: #fef9c3; }
</style>
<div class="grid">
    <div class="item">1</div>
    <div class="double">spans 2</div>
    <div class="item">4</div>
    <div class="triple">spans 3</div>
    <div class="item">last</div>
</div>
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — defines column track count and widths
- [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) — defines row track count and heights
- [grid-template-areas / grid-area](/reference/cssproperties/properties/css_prop_grid-template-areas) — name-based placement (easier for complex layouts)
- [Named grid lines](/reference/cssproperties/properties/css_prop_grid-named-lines) — reference lines by name instead of number
- [grid-auto-flow](/reference/cssproperties/properties/css_prop_grid-auto-flow) — controls how un-placed items are inserted

---
