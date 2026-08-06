---
layout: default
title: grid-auto-columns/-rows
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# grid-auto-columns/-rows
{: .no_toc }

Set the size of **implicitly created** grid tracks — the extra columns or rows the engine generates automatically when items overflow the explicitly defined grid or are placed outside it.

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
    grid-auto-rows: <track-size>;
    grid-auto-columns: <track-size>;
}
```

Track sizes can be any CSS length (`pt`, `px`, `%`), `auto`, `fr`, or `minmax()`.

---

## When implicit tracks are created

Implicit tracks are created when:

1. **Items overflow row count**: More items exist than `grid-template-rows` has defined rows. New rows are auto-created.
2. **Items overflow column count**: With `grid-auto-flow: column`, more items exist than defined columns.
3. **Items placed outside the defined grid**: An item placed at `grid-row: 5` when only 3 rows are defined — rows 4 and 5 are created implicitly.

---

## Values

| Value | Description |
|-------|-------------|
| `auto` | Track sizes to fit content (default) |
| `<length>` | Fixed track size: `pt`, `px`, `mm`, etc. |
| `fr` | Fractional remaining space |
| `minmax(min, max)` | Track has at least `min` size and at most `max` |

---

## Examples

### Fixed-height implicit rows

Set all auto-created rows to exactly 60pt — useful when you want consistent row heights in a grid that grows dynamically:

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 60pt;   /* all implicitly created rows are 60pt */
        gap: 8pt;
    }
    .card {
        padding: 10pt;
        background-color: #f3f4f6;
        border: 1pt solid #d1d5db;
        overflow: hidden;
    }
</style>
<div class="grid">
    <!-- Items auto-create 60pt-high rows -->
    <div class="card">A</div>
    <div class="card">B</div>
    <div class="card">C</div>
    <div class="card">D</div>
    <div class="card">E</div>
</div>
```

### Data-bound grid with consistent card height

{% raw %}
```html
<style>
    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 100pt;
        gap: 10pt;
    }
    .product {
        padding: 12pt;
        border: 1pt solid #e5e7eb;
        background-color: #fff;
        overflow: hidden;
    }
</style>
<div class="product-grid">
    {{#each model.products}}
    <div class="product">
        <strong>{{this.name}}</strong>
        <p>{{this.description}}</p>
        <p>{{format(this.price, 'C2')}}</p>
    </div>
    {{/each}}
</div>
```
{% endraw %}

### Implicit columns with column flow

```html
<style>
    .list {
        display: grid;
        grid-template-rows: repeat(5, auto);
        grid-auto-flow: column;
        grid-auto-columns: 120pt;   /* all auto-created columns are 120pt */
        gap: 6pt;
    }
    .item { padding: 8pt; border: 1pt solid #d1d5db; }
</style>
<div class="list">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
    <div class="item">D</div>
    <div class="item">E</div>
    <div class="item">F</div>
    <!-- F starts a new 120pt column because 5 rows are full -->
</div>
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — explicit column track definitions
- [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) — explicit row track definitions
- [grid-auto-flow](/reference/cssproperties/properties/css_prop_grid-auto-flow) — controls how auto-placed items fill tracks

---
