---
layout: default
title: inset-inline
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# inset-inline : Inset Inline Property
{: .no_toc }

The `inset-inline` property sets the left and right of a positioned element. It is a shorthand for `inset-inline-start` (`left`) and `inset-inline-end` (`right`).

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
inset-inline: 20pt;          /* left and right */
inset-inline: 20pt 40pt;     /* left, then right */
inset-inline-start: 20pt;    /* left */
inset-inline-end: 40pt;      /* right */
```

---

## Values

- One value sets both the left and the right.
- Two values set the left and then the right.
- Each value is a length, a percentage, or `auto` (which does not set that side).

---

## Notes

- Documents are always left to right, so the start is the left and the end is the right.
- It only has an effect when `position` is `relative` or `absolute`.

- The values can be set from data, for example {% raw %}`inset-inline: {{model.value}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [inset](css_prop_inset)
- [inset-block](css_prop_inset-block)
- [left](css_prop_left)
