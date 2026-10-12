---
layout: default
title: column-rule
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# column-rule : Column Rule Shorthand Property
{: .no_toc }

The `column-rule` shorthand sets the divider line between columns. It combines width, style, and color in a single declaration.

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
    column-rule: <column-rule-width> <column-rule-style> <column-rule-color>;
}
```

Examples:

```css
.content { column-rule: 1pt solid #d1d5db; }
.content { column-rule: medium dotted #999; }
.content { column-rule: 2pt dashed rgb(120, 120, 120); }
```

---

## Supported Values

- Width value (`thin`, `medium`, `thick`, or length)
- Style value (for example `none`, `solid`, `dashed`, `dotted`, `double`)
- Color value (named, hex, rgb/rgba)

Values can be provided in shorthand order as long as each token is unambiguous.

---

## Supported Elements

The `column-rule` property can be applied to:
- Multi-column block containers
- Page/body content with active columns
- Nested content regions where visual column separation is required

---

## Notes

- Has no visible effect unless multi-column layout is enabled
- Use with `column-gap` to ensure divider lines have breathing room
- If only one rule aspect is needed, use `column-rule-width`, `column-rule-style`, or `column-rule-color`

---

## Examples

### Example 1: Standard divider

```css
.article {
    columns: 2;
    column-gap: 18pt;
    column-rule: 1pt solid #d1d5db;
}
```

### Example 2: Dashed rule

```css
.notes {
    column-count: 3;
    column-gap: 14pt;
    column-rule: 1pt dashed #9ca3af;
}
```

### Example 3: Data-bound rule settings

{% raw %}
```html
<div style="columns: {{layout.columns}};
            column-gap: {{layout.gap}}pt;
            column-rule: {{layout.ruleWidth}} {{layout.ruleStyle}} {{layout.ruleColor}};">
    <p>{{text}}</p>
</div>
```
{% endraw %}
