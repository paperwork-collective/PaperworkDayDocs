---
layout: default
title: border-spacing
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# border-spacing : Table Cell Spacing Property
{: .no_toc }

The `border-spacing` property sets the space between the cells of a table, when the borders are separate.

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
table { border-spacing: 4pt; }
table { border-spacing: 8pt 4pt; }   /* horizontal, then vertical */
```

---

## Values

One or two lengths. With one value it is used for both the horizontal and the vertical spacing. With two values, the first is the horizontal spacing between columns, and the second the vertical spacing between rows.

Lengths can be in points, pixels, millimeters, inches, or relative to the font (`em`) or the table (`%`).

The default is `0`.

---

## Examples

```html
<style>
    table.cards { width: 100%; border-spacing: 6pt; }
    table.cards td { border: 1pt solid #999; background-color: #f4f4f4; padding: 6pt; }
</style>

<table class="cards">
    <tr><td>One</td><td>Two</td></tr>
    <tr><td>Three</td><td>Four</td></tr>
</table>
```

---

## Notes

- Set on the table. Only applies when [border-collapse](css_prop_border-collapse) is `separate` (the default).
- The space is made as margins on each cell. Between cells it is the spacing value, and at the edges of the table the spacing is also added, as it is in a browser.
- The table is the same width. The cells are narrower by the spacing.
- Unlike a browser, the default is `0` and not a small spacing.
- The value can be set from data, for example {% raw %}`border-spacing: {{model.spacing}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [border-collapse](css_prop_border-collapse)
- [padding](css_prop_padding)
