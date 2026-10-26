---
layout: default
title: text-decoration-thickness
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# text-decoration-thickness : Decoration Thickness Property
{: .no_toc }

The `text-decoration-thickness` property sets the thickness of the lines drawn by `text-decoration`.

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
text-decoration-thickness: auto;
text-decoration-thickness: from-font;
text-decoration-thickness: 2pt;
text-decoration-thickness: 0.1em;
```

---

## Values

- **auto** and **from-font** - Based on the font size (one twelfth of it). This is the default.
- **length** - A length such as `2pt`, `1px` or `0.1em`.

---

## Example

```html
<p style="text-decoration: underline; text-decoration-thickness: 3pt; text-decoration-color: #2563eb">A thick underline</p>
```

---

## Notes

- Percentages are not supported.
- Can be set from data, for example {% raw %}`text-decoration-thickness: {{model.thickness}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [text-decoration](css_prop_text-decoration)
- [text-decoration-color](css_prop_text-decoration-color)
- [text-decoration-style](css_prop_text-decoration-style)
