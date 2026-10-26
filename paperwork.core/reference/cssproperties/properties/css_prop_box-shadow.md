---
layout: default
title: box-shadow
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# box-shadow : Box Shadow Property
{: .no_toc }

The `box-shadow` property draws a shadow behind an element. The shadow takes up no space and does not change the layout.

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
box-shadow: 4pt 4pt 0 gray;                          /* offset x, y, blur, color */
box-shadow: 0 2pt 8pt rgba(0, 0, 0, 0.3);
box-shadow: 0 4pt 12pt -2pt rgba(0, 0, 100, 0.5);    /* offset x, y, blur, spread, color */
box-shadow: 2pt 2pt blue, 5pt 5pt red;               /* more than one shadow */
box-shadow: none;
```

---

## Values

Each shadow is made of:

- **offset-x, offset-y** (required) - How far the shadow is moved to the right and down. Negative values move it left and up.
- **blur** (optional) - The distance over which the edge of the shadow fades out. Not negative. The default is `0`, a sharp edge.
- **spread** (optional) - Expands the shadow on all sides, or shrinks it when negative. The default is `0`.
- **color** (optional) - Any color, including `rgba()` with an opacity. The default is the text color.

The color can be before or after the lengths. More than one shadow can be separated with commas, and the first is on top.

---

## Examples

```html
<div style="box-shadow: 0 3pt 8pt rgba(0,0,0,0.35); background-color: white; padding: 12pt; border-radius: 6pt">
    A card with a soft shadow, following the rounded corners
</div>
```

---

## Notes

- The shadow is drawn behind the element, and is only seen outside it, so it shows nothing through a transparent background.
- The corners follow the `border-radius` of the element.
- The blur is made with several layers of the shadow fading out (up to 12), rather than a true Gaussian blur, so very large blurs are approximate.
- `inset` shadows are accepted, but are not drawn.
- Applies to block elements (div, p, table, td and so on). Inline text, spans and images are not given a shadow.
- The value can be set from data, for example {% raw %}`box-shadow: {{model.shadow}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [text-shadow](css_prop_text-shadow)
- [outline](css_prop_outline)
- [border-radius](css_prop_border-radius)
