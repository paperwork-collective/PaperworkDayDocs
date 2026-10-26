---
layout: default
title: text-indent
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# text-indent : First Line Indent Property
{: .no_toc }

The `text-indent` property indents the first line of a block of text. It is inherited, so setting it on a container indents the first line of each paragraph inside.

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
text-indent: 0;
text-indent: 24pt;
text-indent: 2em;
text-indent: 10%;
```

---

## Values

- **length** - An absolute or relative length: `24pt`, `0.5in`, `2em`, `15mm`.
- **percentage** - A percentage of the width of the containing block: `10%`.
- `0` - No indent. This is the default.

Negative values are not recommended, as the text would start outside the block.

---

## Examples

```html
<style>
    p.story { text-indent: 24pt; margin: 0; }
</style>

<p class="story">The first line of this paragraph is indented, and the following lines start at the left edge.</p>
```

### Inherited from a container

```html
<div style="text-indent: 1.5em">
    <p>Each paragraph in the div has its first line indented.</p>
    <p>And so does this one.</p>
</div>
```

---

## Notes

- Only the first line of the block is indented. Wrapped lines return to the left edge.
- Inherited by child blocks. Set `text-indent: 0` on a child to remove it.
- A percentage is of the width of the containing block, not the width of the text.
- The value can be set from data, for example {% raw %}`text-indent: {{model.indent}}`{% endraw %}.
- Added in Paperwork.Core 9.8. In earlier versions the property is ignored.

---

## See Also

- [text-align](css_prop_text-align)
- [letter-spacing](css_prop_letter-spacing)
- [word-spacing](css_prop_word-spacing)
