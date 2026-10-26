---
layout: default
title: text-overflow
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# text-overflow : Text Overflow Property
{: .no_toc }

The `text-overflow` property sets how text that is too long for a single line is shown when it is cut off. It is inherited.

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
text-overflow: clip;
text-overflow: ellipsis;
text-overflow: "[more]";
```

---

## Values

- `clip` - The default. The text is cut off at the edge.
- `ellipsis` - The end of the text is replaced with an ellipsis character.
- **string** - The end of the text is replaced with your own text, in quotes.

Only a single value is supported.

---

## Examples

```html
<div style="width: 80pt; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
    This text is much too long for the box
</div>
```

The text is shortened to fit in the 80pt, ending with the ellipsis.

---

## Notes

- The text must not wrap (`white-space: nowrap`), and the block must have `overflow` set to `hidden` or `clip`. Otherwise the property has no effect, as in a browser.
- With `overflow: hidden`, non-wrapping text is cut back to the last whole word that fits (see [overflow](css_prop_overflow)), so `text-overflow: clip` makes no further difference. Use `overflow: clip` to clip at the edge of the box, in the middle of a word.
- Text that fits is not changed.
- If the text is split across several spans or inline elements, only the run that crosses the edge is shortened.
- The value can be set from data, for example {% raw %}`text-overflow: {{model.overflow}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [overflow](css_prop_overflow)
- [white-space](white-space)
- [word-break](css_prop_word-break)
