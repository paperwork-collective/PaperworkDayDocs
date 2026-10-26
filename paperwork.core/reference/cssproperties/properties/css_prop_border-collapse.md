---
layout: default
title: border-collapse
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# border-collapse : Table Border Model Property
{: .no_toc }

The `border-collapse` property sets whether the borders of the cells in a table are separate, or are shared with the neighbouring cells and the table.

---

<details class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Usage

```css
table { border-collapse: collapse; }
table { border-collapse: separate; }
```

---

## Values

- **separate** - Each cell has its own borders. Where two cells meet, both borders are drawn next to each other. This is the default.
- **collapse** - A border between 2 cells, or between a cell and the table, is drawn once.

---

## How borders collapse

When the borders of 2 neighbouring cells meet, only one is drawn:

- The wider border is used. When both are the same width, the border of the cell on the right (or below) is the one that is removed.
- A cell border on the edge of the table is removed if the table border is the same width or wider.
- A border is only removed when the other side has a border too, so a cell next to a cell without borders keeps its border.
- Cells that span columns or rows share edges with the cell next to the start of the span.

The border that remains is drawn inside the edge of its own cell, rather than centered on the line between the cells.

---

## Examples

```html
<style>
    table.report { width: 100%; border-collapse: collapse; }
    table.report td, table.report th { border: 1pt solid #666; padding: 4pt; }
</style>

<table class="report">
    <tr><th>Name</th><th>Total</th></tr>
    <tr><td>Widgets</td><td>12</td></tr>
</table>
```

---

## Notes

- Set on the table. It is not inherited by nested tables.
- When the borders are collapsed, [border-spacing](css_prop_border-spacing) is ignored.
- The value can be set from data, for example {% raw %}`border-collapse: {{model.borders}}`{% endraw %}.
- Added in Paperwork.Core 9.8. In earlier versions the property is ignored, and the borders are always separate.

---

## See Also

- [border-spacing](css_prop_border-spacing)
- [border](css_prop_border)
