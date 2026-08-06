---
layout: default
title: align-content
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# align-content — Grid <span class="label label-green">v9.7</span>
{: .no_toc }

Aligns the **row tracks** as a group within the grid container along the block (vertical) axis when the total row track height is less than the container height. It distributes remaining vertical space between and around the track group.

> **Flex context**: `align-content` in a flex container aligns multiple wrapped lines of items. See [align-items / align-self / align-content — Flex](/reference/cssproperties/properties/css_prop_flex-align) for those details.

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
    align-content: start | end | center | stretch
                 | space-between | space-around | space-evenly;
}
```

---

## Values

| Value | Description |
|-------|-------------|
| `start` | Rows packed to the start (top) of the container |
| `end` | Rows packed to the end (bottom) of the container |
| `center` | Rows centred within the container vertically |
| `stretch` | Rows stretched to fill the container height (default for `fr` tracks) |
| `space-between` | Equal gaps between row groups; no space at container edges |
| `space-around` | Equal space on each side of each row group (half-size at edges) |
| `space-evenly` | Equal space between all rows and container edges |

---

## Notes

### Requires a fixed container height

`align-content` only takes visible effect when the grid container has a fixed height that is larger than the sum of all row track heights. Without a fixed height, the container collapses to the content height and there is no free space to distribute.

```css
/* align-content HAS an effect */
.grid {
    display: grid;
    height: 400pt;   /* explicit container height */
    grid-template-rows: auto auto;
    align-content: center;
}

/* align-content has NO effect — container has no height */
.grid {
    display: grid;
    /* no height — container collapses to content */
    align-content: center;
}
```

### Aligns row tracks, not cell content

`align-content` distributes the row tracks within the container. Vertical alignment of content within individual cells is controlled by `align-items` / `align-self` (if supported), not `align-content`.

---

## Examples

### Vertically centred grid in a fixed container

```html
<style>
    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto auto;
        align-content: center;
        height: 300pt;
        border: 1pt solid #e5e7eb;
        gap: 10pt;
        padding: 10pt;
    }
    .card { padding: 12pt; background-color: #dbeafe; border: 1pt solid #2563eb; }
</style>
<div class="container">
    <div class="card">Card A</div>
    <div class="card">Card B</div>
    <div class="card">Card C</div>
    <div class="card">Card D</div>
</div>
```

### space-between rows in a report page

```html
<style>
    .page {
        display: grid;
        grid-template-columns: 1fr;
        align-content: space-between;
        height: 600pt;
        padding: 20pt;
        border: 1pt solid #d1d5db;
    }
    .section { padding: 15pt; background-color: #f9fafb; border: 1pt solid #e5e7eb; }
</style>
<div class="page">
    <div class="section">Executive Summary</div>
    <div class="section">Financial Overview</div>
    <div class="section">Risk Analysis</div>
</div>
```

### end alignment (content at bottom)

```html
<style>
    .card {
        display: grid;
        grid-template-columns: 1fr;
        align-content: end;
        height: 200pt;
        padding: 12pt;
        background-color: #f3f4f6;
        border: 1pt solid #d1d5db;
    }
</style>
<div class="card">
    <p>Caption below image placeholder.</p>
    <p style="font-size: 9pt; color: #6b7280;">Figure 1: Annual revenue</p>
</div>
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [justify-content — Grid](/reference/cssproperties/properties/css_prop_grid-justify-content) — horizontal alignment of column tracks
- [gap / row-gap / column-gap](/reference/cssproperties/properties/css_prop_grid-gap) — spacing within the track layout
- [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) — defines row tracks
- [align-content — Flex](/reference/cssproperties/properties/css_prop_flex-align) — same property in flex context

---
