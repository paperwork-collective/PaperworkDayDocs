---
layout: default
title: ignored-properties
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# ignored-properties : Properties That Are Accepted And Ignored
{: .no_toc }

Some css properties only have a meaning for an interactive page in a browser. They are accepted in a stylesheet or style attribute, with no warning, and have no effect on the PDF.

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

## Properties

| Property | Meaning in a browser |
|----------|----------------------|
| `cursor` | The mouse pointer over the element. |
| `pointer-events` | Whether the element responds to the mouse. |
| `will-change` | A hint about what will be animated. |
| `scroll-behavior` | Smooth or instant scrolling. |
| `user-select` | Whether the text can be selected. |
| `transition` | Animation between values when they change. |
| `animation` | Keyframe animation. |

---

## Examples

```css
a.button {
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #2563EB;
    color: white;
}
```

Only the `background-color` and `color` are used in the PDF.

---

## Notes

- This lets a stylesheet that is shared with a web page be used for a PDF without change.
- The individual forms (such as `transition-duration` or `animation-name`) are not listed, and are not recognised.
- `@keyframes` rules are not used.
- Added in Paperwork.Core 9.8.

---

## See Also

- [Css Properties](/paperwork.core/reference/cssproperties/)
