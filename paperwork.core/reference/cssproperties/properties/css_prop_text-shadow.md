---
layout: default
title: text-shadow
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# text-shadow : Text Shadow Property
{: .no_toc }

The `text-shadow` property draws a shadow behind text. It is inherited, so it can be set on a container.

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
text-shadow: 2pt 2pt 0 gray;              /* offset x, y, blur, color */
text-shadow: 0 0 6pt red;                 /* a glow */
text-shadow: 1pt 1pt rgba(0,0,0,0.4);
text-shadow: 2pt 2pt blue, 5pt 5pt red;   /* more than one shadow */
text-shadow: none;
```

---

## Values

Each shadow is made of:

- **offset-x, offset-y** (required) - How far the shadow is moved to the right and down.
- **blur** (optional) - How soft the shadow is. The default is `0`, a sharp copy of the text.
- **color** (optional) - Any color, including `rgba()` with an opacity. The default is the text color.

More than one shadow can be separated with commas, and the first is on top. Text shadows do not have a spread.

---

## Examples

```html
<h1 style="color: white; text-shadow: 0 2pt 4pt rgba(0,0,0,0.5)">Title on a dark band</h1>
```

---

## Notes

- Each shadow is the text drawn again behind it, in the shadow color and offset. With a blur, several copies are drawn in a ring around the position, so it is an approximation of a soft shadow.
- Use `text-shadow: none` on a child to remove an inherited shadow.
- Hidden text (`visibility: hidden`) has no shadow.
- The value can be set from data, for example {% raw %}`text-shadow: {{model.shadow}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [box-shadow](css_prop_box-shadow)
- [text-decoration](css_prop_text-decoration)
