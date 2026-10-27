---
layout: default
title: word-break
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# word-break : Word Break Property
{: .no_toc }

The `word-break` property sets whether words can be broken at any character to fill a line. It is inherited, so it can be set on a container.

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
word-break: normal;
word-break: break-all;
```

---

## Values

- `normal` - The default. Lines break between words. A single word that is too long for a line is kept whole and overflows, unless [overflow-wrap](css_prop_overflow-wrap) is `break-word` or `anywhere`.
- `break-all` - Lines are filled completely, and a word is broken at any character where it reaches the end of the line. No hyphen is added, even if `hyphens` is set.
- `keep-all` - Accepted, and the same as `normal`.
- `break-word` - The older form of `overflow-wrap: anywhere`, so a word that is too long for a line is broken.

---

## Examples

```html
<div style="width: 80pt; word-break: break-all">
    short supercalifragilisticexpialidocious end
</div>
```

The first line is filled with the start of the long word, rather than the word moving to a line of its own.

---

## Notes

- For long codes and urls, use `overflow-wrap: break-word` to break only the words that are too long, or `break-all` to fill every line, for example in a narrow table cell of identifiers.
- It has no effect with `white-space: nowrap` or `pre`.
- The value can be set from data, for example {% raw %}`word-break: {{model.breaking}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [overflow-wrap](css_prop_overflow-wrap)
- [hyphens](hyphens)
- [white-space](white-space)
