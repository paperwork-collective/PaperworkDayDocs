---
layout: default
title: "gap [row-|column-]"
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# gap [row-|column-] — Grid
{: .no_toc }

Sets the spacing between grid tracks (rows and columns) without adding space at the outer edges of the grid. `gap` is a shorthand that sets both `row-gap` and `column-gap`.

> **Flex context**: `gap`, `row-gap`, and `column-gap` work identically in flex containers, spacing items between flex lines and within a line. See [gap — Flex](/reference/cssproperties/properties/css_prop_flex-gap) for those details.

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

    row-gap: <value>;              /* space between rows */
    column-gap: <value>;           /* space between columns */
}
```

Accepted values are any CSS length (`pt`, `px`, `mm`, `em`, `%`).

---

## Values

| Property | Description | Default |
|----------|-------------|---------|
| `gap` | Shorthand — first value sets `row-gap`, second sets `column-gap` | `0` |
| `row-gap` | Gutter height between row tracks | `0` |
| `column-gap` | Gutter width between column tracks | `0` |

When `gap` is given one value, both `row-gap` and `column-gap` are set to that value.

---

## Notes

### Gap is subtracted before fr distribution

`column-gap` values are subtracted from the total container width before `fr` units are calculated. This means `fr` columns always fill the container cleanly regardless of gap size.

```css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20pt;
    /* Available width = container width - (2 × 20pt) */
    /* Each 1fr = (container - 40pt) / 3 */
}
```

### Gap vs margin vs padding

- `gap` adds space *between* tracks only — no outer edge space
- `margin` on grid items adds space around each item, including at edges
- `padding` on the grid container adds space inside the container border

---

## Examples

### Uniform gap

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16pt;          /* 16pt between rows and columns */
    }
    .card { padding: 12pt; background-color: #f3f4f6; border: 1pt solid #d1d5db; }
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

### Different row and column gaps

```html
<style>
    .report {
        display: grid;
        grid-template-columns: 1fr 2fr;
        column-gap: 20pt;   /* wider gutter between sidebar and content */
        row-gap: 12pt;      /* tighter gutter between sections */
    }
    .cell { padding: 12pt; border: 1pt solid #e5e7eb; }
</style>
<div class="report">
    <div class="cell">Sidebar row 1</div>
    <div class="cell">Content row 1</div>
    <div class="cell">Sidebar row 2</div>
    <div class="cell">Content row 2</div>
</div>
```

### Zero gap (edge-to-edge cells)

```html
<style>
    .table-like {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 0;
    }
    .cell {
        padding: 8pt;
        border: 1pt solid #e5e7eb;
        margin: 0;
    }
    .header-cell { background-color: #1e3a8a; color: white; font-weight: bold; }
</style>
<div class="table-like">
    <div class="cell header-cell">Item</div>
    <div class="cell header-cell">Description</div>
    <div class="cell header-cell">Price</div>
    <div class="cell">Widget A</div>
    <div class="cell">Standard configuration</div>
    <div class="cell">£42.00</div>
</div>
```

### Data-bound grid with gaps

{% raw %}
```html
<style>
    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12pt;
    }
    .product { padding: 12pt; border: 1pt solid #e5e7eb; }
    .name    { font-weight: bold; color: #1e3a8a; margin-bottom: 4pt; }
    .price   { color: #16a34a; }
</style>
<div class="product-grid">
    {{#each model.products}}
    <div class="product">
        <div class="name">{{this.name}}</div>
        <div class="price">{{format(this.price, 'C2')}}</div>
    </div>
    {{/each}}
</div>
```
{% endraw %}

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — `column-gap` is subtracted from available width before `fr` distribution
- [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) — `row-gap` is subtracted from available height before `fr` distribution
- [justify-content — Grid](/reference/cssproperties/properties/css_prop_grid-justify-content) — distributes space between column tracks (not the same as gap)
- [gap — Flex](/reference/cssproperties/properties/css_prop_flex-gap) — same properties in flex context

---
