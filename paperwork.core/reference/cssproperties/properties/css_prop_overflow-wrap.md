---
layout: default
title: overflow-wrap
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# overflow-wrap : Overflow Wrap Property
{: .no_toc }

The `overflow-wrap` property (and its older name `word-wrap`) sets whether a word that is too long for a line can be broken. It is inherited.

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
overflow-wrap: normal;
overflow-wrap: break-word;
overflow-wrap: anywhere;
word-wrap: break-word;
```

---

## Values

- `normal`, `break-word` and `anywhere` - All accepted.

---

## Notes

- Scryber always breaks a word that is longer than a whole line, which is the behaviour these values ask for in a browser. So the property is accepted for compatibility with existing stylesheets and does not change the layout.
- To fill every line by breaking at any character, use [word-break](css_prop_word-break) `break-all`.
- Added in Paperwork.Core 9.8.

---

## See Also

- [word-break](css_prop_word-break)
- [word-wrap](css_prop_word-wrap)
