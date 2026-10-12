---
layout: default
title: column-rule-style
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# column-rule-style : Column Rule Style Property
{: .no_toc }

The `column-rule-style` property sets the line style for the divider between columns.

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
    column-rule-style: style;
}
```

---

## Supported Values

Common line styles include:
- `none`
- `solid`
- `dashed`
- `dotted`
- `double`

---

## Supported Elements

The `column-rule-style` property can be applied to any multi-column block container.

---

## Notes

- `none` hides the column divider
- A visible rule also needs a non-zero width (`column-rule-width`)
- Use `column-rule` shorthand when setting width/style/color together

---

## Examples

```css
.article {
    column-count: 3;
    column-gap: 14pt;
    column-rule-width: 1pt;
    column-rule-style: dashed;
    column-rule-color: #9ca3af;
}
```
