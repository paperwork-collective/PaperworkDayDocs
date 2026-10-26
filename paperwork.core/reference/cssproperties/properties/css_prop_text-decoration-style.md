---
layout: default
title: text-decoration-style
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# text-decoration-style : Decoration Style Property
{: .no_toc }

The `text-decoration-style` property sets the style of the lines drawn by `text-decoration`.

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
text-decoration-style: solid;
text-decoration-style: double;
text-decoration-style: dotted;
text-decoration-style: dashed;
text-decoration-style: wavy;
```

---

## Values

- **solid** - A single line. This is the default.
- **double** - Two lines.
- **dotted** - A line of dots.
- **dashed** - A line of dashes.
- **wavy** - A wavy line, often used for spelling and error marks.

The dots, dashes and wave are sized from the thickness of the line.

---

## Example

```html
<p style="text-decoration: underline; text-decoration-style: wavy; text-decoration-color: red">Misspelled</p>
<p style="text-decoration: underline wavy red">The same, in the shorthand</p>
```

---

## Notes

- Applies to underline, overline and line-through.
- Can be set from data, for example {% raw %}`text-decoration-style: {{model.style}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [text-decoration](css_prop_text-decoration)
- [text-decoration-color](css_prop_text-decoration-color)
- [text-decoration-thickness](css_prop_text-decoration-thickness)
