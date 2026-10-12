---
layout: default
title: column-rule-width
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# column-rule-width : Column Rule Width Property
{: .no_toc }

The `column-rule-width` property sets the thickness of the divider between columns.

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
    column-rule-width: width;
}
```

---

## Supported Values

- Keywords: `thin`, `medium`, `thick`
- Length units: `0.5pt`, `1pt`, `2pt`, `3px`, etc.

---

## Supported Elements

The `column-rule-width` property can be applied to any multi-column block container.

---

## Notes

- Width has visual effect only when style is not `none`
- Pair with `column-rule-style` and `column-rule-color`
- For readability, keep rules subtle (`1pt` is a common value)

---

## Examples

```css
.content {
    columns: 2;
    column-gap: 20pt;
    column-rule-style: solid;
    column-rule-width: 1pt;
    column-rule-color: #d1d5db;
}
```
