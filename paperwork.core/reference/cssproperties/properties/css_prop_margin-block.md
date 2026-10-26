---
layout: default
title: margin-block
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# margin-block : Margin Block Property
{: .no_toc }

The `margin-block` property sets the margin at the start and end of the block direction, which is the top and the bottom of the element. It is a shorthand for `margin-block-start` (the top margin) and `margin-block-end` (the bottom margin).

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
margin-block: 20pt;          /* top and bottom */
margin-block: 10pt 30pt;     /* top, then bottom */
margin-block-start: 10pt;    /* top */
margin-block-end: 30pt;      /* bottom */
```

---

## Values

- One value sets both the top and the bottom margin.
- Two values set the top margin and then the bottom margin.
- Each value is a length (`pt`, `px`, `mm`, `in`, `em`...), a percentage, or `auto`.

---

## Examples

```html
<div style="margin-block: 12pt 24pt">Space above and below</div>
```

---

## Notes

- It is the same as setting `margin-top` and `margin-bottom`, so a later `margin-top` overrides the start value.
- As with all margins in Scryber, adjacent top and bottom margins are not collapsed.
- For the left and right of an element, see [margin-inline](css_prop_margin-inline).

- The values can be set from data, for example {% raw %}`margin-block: {{model.value}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [margin](css_prop_margin)
- [margin-inline](css_prop_margin-inline)
- [padding-block](css_prop_padding-block)
