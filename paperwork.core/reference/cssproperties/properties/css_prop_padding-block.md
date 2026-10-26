---
layout: default
title: padding-block
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# padding-block : Padding Block Property
{: .no_toc }

The `padding-block` property sets the padding at the start and end of the block direction, which is the top and the bottom of the element. It is a shorthand for `padding-block-start` (the top padding) and `padding-block-end` (the bottom padding).

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
padding-block: 12pt;         /* top and bottom */
padding-block: 4pt 16pt;     /* top, then bottom */
padding-block-start: 4pt;    /* top */
padding-block-end: 16pt;     /* bottom */
```

---

## Values

- One value sets both the top and the bottom padding.
- Two values set the top padding and then the bottom padding.
- Each value is a length or a percentage.

---

## Examples

```html
<div style="padding-block: 6pt 12pt; background-color: #EEE">Padded above and below</div>
```

---

## Notes

- It is the same as setting `padding-top` and `padding-bottom`, so a later `padding-top` overrides the start value.
- For the left and right of an element, see [padding-inline](css_prop_padding-inline).

- The values can be set from data, for example {% raw %}`padding-block: {{model.value}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [padding](css_prop_padding)
- [padding-inline](css_prop_padding-inline)
- [margin-block](css_prop_margin-block)
