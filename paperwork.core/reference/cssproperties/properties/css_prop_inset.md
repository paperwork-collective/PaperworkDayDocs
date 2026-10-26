---
layout: default
title: inset
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# inset : Inset Property
{: .no_toc }

The `inset` property is a shorthand for `top`, `right`, `bottom` and `left`, for an element that is positioned with `position: relative` or `absolute`.

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
inset: 20pt;                    /* all four sides */
inset: 10pt 30pt;               /* top and bottom, then left and right */
inset: 10pt 30pt 50pt;          /* top, left and right, bottom */
inset: 10pt 20pt 30pt 40pt;     /* top, right, bottom, left */
inset: 0 auto auto 0;           /* top left corner */
```

---

## Values

The values follow the same pattern as `margin`:

- **1 value** - all four sides.
- **2 values** - top and bottom, then left and right.
- **3 values** - top, then left and right, then bottom.
- **4 values** - top, right, bottom, left.

Each value is a length, a percentage, or `auto`. An `auto` value does not set that side.

---

## Examples

```html
<div style="position: absolute; inset: 20pt auto auto 40pt; width: 100pt">
    20pt from the top and 40pt from the left.
</div>
```

---

## Notes

- It is the same as setting `top`, `right`, `bottom` and `left`, so a later `top` overrides the value from `inset`.
- It only has an effect when `position` is `relative` or `absolute`.
- See [inset-block](css_prop_inset-block) and [inset-inline](css_prop_inset-inline) for the pairs of sides.

- The values can be set from data, for example {% raw %}`inset: {{model.value}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [top](css_prop_top)
- [left](css_prop_left)
- [inset-block](css_prop_inset-block)
- [inset-inline](css_prop_inset-inline)
