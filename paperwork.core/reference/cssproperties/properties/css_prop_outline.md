---
layout: default
title: outline
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# outline : Outline Property
{: .no_toc }

The `outline` property draws a line around an element, outside its border. Unlike a border, an outline takes up no space and does not change the layout.

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
outline: 2pt solid red;
outline: red dashed 1pt;
outline: thick dotted #2563eb;
outline: none;
```

The width, style and color can be in any order. The longhand properties are [outline-width](css_prop_outline-width), [outline-style](css_prop_outline-style), [outline-color](css_prop_outline-color) and [outline-offset](css_prop_outline-offset).

---

## Values

- **width** - A length, or `thin` (1px), `medium` (3px, the default) or `thick` (5px).
- **style** - `solid`, `dashed`, `dotted`, `none`, or `auto` (solid). `double`, `groove`, `ridge`, `inset` and `outset` are drawn as solid.
- **color** - Any color. If not set, the text color is used.

An outline is only drawn when there is a style other than `none`.

---

## Examples

```html
<div style="outline: 2pt solid #2563eb; outline-offset: 4pt; padding: 8pt">
    Outlined, 4pt outside the box
</div>

<div style="border: 1pt solid black; outline: 3pt dashed red">
    The outline starts just outside the border
</div>
```

---

## Notes

- The outline is drawn outside the border (and the `outline-offset`), over any content next to it, and does not change the size or position of the element.
- Applies to block elements (div, p, table, td and so on). Inline text and spans are not outlined.
- The outline is a rectangle, and does not follow `border-radius`.
- Not related to the PDF document outline (bookmarks).
- The value can be set from data, for example {% raw %}`outline: 2pt solid {{model.color}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [outline-offset](css_prop_outline-offset)
- [border](css_prop_border)
