---
layout: default
title: inset-block
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# inset-block : Inset Block Property
{: .no_toc }

The `inset-block` property sets the top and bottom of a positioned element. It is a shorthand for `inset-block-start` (`top`) and `inset-block-end` (`bottom`).

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
inset-block: 20pt;           /* top and bottom */
inset-block: 10pt 30pt;      /* top, then bottom */
inset-block-start: 10pt;     /* top */
inset-block-end: 30pt;       /* bottom */
```

---

## Values

- One value sets both the top and the bottom.
- Two values set the top and then the bottom.
- Each value is a length, a percentage, or `auto` (which does not set that side).

---

## Notes

- It only has an effect when `position` is `relative` or `absolute`.

- The values can be set from data, for example {% raw %}`inset-block: {{model.value}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [inset](css_prop_inset)
- [inset-inline](css_prop_inset-inline)
- [top](css_prop_top)
