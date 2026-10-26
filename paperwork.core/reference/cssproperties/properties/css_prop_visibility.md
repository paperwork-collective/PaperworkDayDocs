---
layout: default
title: visibility
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# visibility : Visibility Property
{: .no_toc }

The `visibility` property sets whether an element is drawn. A hidden element still takes up its space in the layout, unlike `display: none`.

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
visibility: visible;
visibility: hidden;
visibility: collapse;   /* a table row is removed */
```

---

## Values

- **visible** - The element is drawn. This is the default.
- **hidden** - The element is not drawn, but keeps its space in the layout.
- **collapse** - On a table row, or a group of rows (`thead`, `tbody`, `tfoot`), the rows are removed from the table and take up no space, as with `display: none`. On anything else it is the same as `hidden`.

---

## Examples

```html
<style>
    .placeholder { visibility: hidden; }
</style>

<p>Before</p>
<div style="height: 40pt; background-color: #eee" class="placeholder">This space is kept, but nothing is drawn</div>
<p>After</p>
```

---

## Notes

- Inherited, so the children of a hidden element are also hidden.
- A hidden block (and everything inside it) is not drawn at all. A child with `visibility: visible` inside a hidden block is also not drawn.
- Hidden text, in a block or in an inline element such as a `span`, takes up its space and pushes the following text along, but is not painted. The text is still in the PDF content, so it can still be found by a search or text selection. Use `display: none` to remove content completely.
- Hidden images are laid out at their size and not drawn.
- To remove an element and its space use [display](css_prop_display) with `none`.
- The value can be set from data, for example {% raw %}`visibility: {{model.visibility}}`{% endraw %}.
- `collapse` on a table column or column group (`col`, `colgroup`) is treated as `hidden`, and does not remove the column.
- Added in Paperwork.Core 9.8. In earlier versions the property is ignored. Removing table rows with `collapse` is from 9.8.0-beta.4.

---

## See Also

- [display](css_prop_display)
- [opacity](css_prop_opacity)
