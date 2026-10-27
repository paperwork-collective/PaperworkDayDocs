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

- `normal` - The default. A word that is longer than a whole line is kept whole, on a line of its own, and overflows the line (to the left if the text is right aligned), as in a browser.
- `break-word` and `anywhere` - A word that is longer than a whole line is broken at the character where it reaches the end of the line.

---

## Notes

- Before Paperwork.Core 9.8 (9.8.0-beta.7 and earlier), a word that was too long was always broken. For long codes or urls in a narrow column, such as a table cell, add `overflow-wrap: break-word` to keep that behaviour.
- With `hyphens: auto`, a long word is hyphenated rather than overflowing.
- To fill every line by breaking at any character, use [word-break](css_prop_word-break) `break-all`.
- Added in Paperwork.Core 9.8.

---

## See Also

- [word-break](css_prop_word-break)
- [word-wrap](css_prop_word-wrap)
