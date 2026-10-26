---
layout: default
title: text-decoration-color
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# text-decoration-color : Decoration Color Property
{: .no_toc }

The `text-decoration-color` property sets the color of the lines drawn by `text-decoration` (underline, overline and line-through).

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
text-decoration-color: red;
text-decoration-color: #2563eb;
text-decoration-color: rgb(220, 38, 38);
text-decoration-color: currentcolor;
```

---

## Values

Any color value. `currentcolor`, the default, uses the color of the text.

---

## Example

```html
<p style="text-decoration: underline; text-decoration-color: #dc2626">Red underline on black text</p>
```

---

## Notes

- Only has an effect when there is a text decoration line.
- Can be set from data, for example {% raw %}`text-decoration-color: {{model.color}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [text-decoration](css_prop_text-decoration)
- [text-decoration-style](css_prop_text-decoration-style)
- [text-decoration-thickness](css_prop_text-decoration-thickness)
