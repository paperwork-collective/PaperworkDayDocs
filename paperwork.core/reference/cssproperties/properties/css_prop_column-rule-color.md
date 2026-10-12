---
layout: default
title: column-rule-color
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# column-rule-color : Column Rule Color Property
{: .no_toc }

The `column-rule-color` property sets the color of the divider line drawn between columns.

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
selector {
    column-rule-color: color;
}
```

---

## Supported Values

- Named colors: `gray`, `black`, `steelblue`
- Hex colors: `#d1d5db`, `#333333`
- RGB/RGBA colors: `rgb(120,120,120)`, `rgba(0,0,0,0.35)`

---

## Supported Elements

The `column-rule-color` property can be applied to any multi-column block container.

---

## Notes

- Requires multi-column layout and a visible rule style/width
- Combine with `column-rule-style` and `column-rule-width`
- You can still use `column-rule` shorthand when setting all parts together

---

## Examples

```css
.content {
    columns: 2;
    column-gap: 18pt;
    column-rule-style: solid;
    column-rule-width: 1pt;
    column-rule-color: #cbd5e1;
}
```
