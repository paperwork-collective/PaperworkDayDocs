---
layout: default
title: grid-template-rows
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# grid-template-rows
{: .no_toc }

Defines the row track sizes for a grid container. Works in conjunction with `grid-template-columns` to create a two-dimensional grid. When items wrap beyond the explicitly defined rows, implicitly created rows use the size set by `grid-auto-rows`.

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
    grid-template-rows: value value ...;
}
```

Each space-separated value defines one row track. The number of values determines the number of explicitly sized rows.

---

## Supported Values

### auto

`auto` rows size to fit their content. Most grids use `auto` or leave `grid-template-rows` unset entirely, allowing each row to grow to the height of its tallest cell.

```css
grid-template-rows: auto;              /* one explicitly sized auto row */
grid-template-rows: auto auto auto;    /* three content-sized rows */
```

### Fixed heights

```css
grid-template-rows: 60pt 1fr 40pt;    /* header height, flexible body, footer height */
grid-template-rows: 120pt 200pt;       /* two fixed-height rows */
```

### fr units

Like columns, `fr` distributes remaining height proportionally. The container must have an explicit height for `fr` row values to have effect.

```css
grid-template-rows: 1fr 2fr;          /* one-third + two-thirds */
grid-template-rows: auto 1fr auto;    /* header + flexible content + footer */
```

### repeat()

```css
grid-template-rows: repeat(5, 40pt);  /* five fixed-height rows */
grid-template-rows: repeat(3, auto);  /* three content-sized rows */
```

---

## Notes

- If there are more items than explicitly defined rows, additional rows are created implicitly and sized by `grid-auto-rows`
- `fr` units on rows only work when the grid container has a fixed height — without one, `fr` rows behave like `auto`
- Leaving `grid-template-rows` unset is common; the grid engine auto-creates rows sized to fit content
- Named grid lines work the same as in columns: `[name] size [name]`

---

## Examples

### Fixed header and footer with flexible content

```html
<style>
    .page {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 60pt 1fr 40pt;
        height: 600pt;
        gap: 0;
    }
    .header  { background-color: #1e3a8a; color: white; padding: 15pt; }
    .content { padding: 20pt; overflow: hidden; }
    .footer  { background-color: #f3f4f6; padding: 10pt; font-size: 9pt; }
</style>
<div class="page">
    <div class="header">Report Title</div>
    <div class="content">Main body content flows here.</div>
    <div class="footer">Page 1 of 1</div>
</div>
```

### Fixed-height card rows in a two-column grid

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(3, 80pt);
        gap: 10pt;
    }
    .card {
        padding: 12pt;
        border: 1pt solid #e5e7eb;
        background-color: #f9fafb;
    }
</style>
<div class="grid">
    <div class="card">A</div>
    <div class="card">B</div>
    <div class="card">C</div>
    <div class="card">D</div>
    <div class="card">E</div>
    <div class="card">F</div>
</div>
```

### Content-sized rows (default behaviour)

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        /* grid-template-rows not set — rows size to content automatically */
        gap: 12pt;
    }
    .cell { padding: 10pt; border: 1pt solid #d1d5db; }
</style>
<div class="grid">
    <div class="cell">Short</div>
    <div class="cell">This cell has much more content so it will be taller, and the adjacent cell matches that height automatically.</div>
    <div class="cell">Row 2 A</div>
    <div class="cell">Row 2 B</div>
</div>
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — column track definitions
- [grid-auto-rows](/reference/cssproperties/properties/css_prop_grid-auto-tracks) — size for implicitly created rows
- [grid-column / grid-row](/reference/cssproperties/properties/css_prop_grid-placement) — placing items by row line number
- [gap / row-gap / column-gap](/reference/cssproperties/properties/css_prop_grid-gap) — spacing between rows

---
