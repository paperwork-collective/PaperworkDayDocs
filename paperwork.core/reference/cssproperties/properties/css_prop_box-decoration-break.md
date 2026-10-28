---
layout: default
title: box-decoration-break
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# box-decoration-break : Box Decoration Break Property
{: .no_toc }

The `box-decoration-break` property (and its `-webkit-box-decoration-break` name) sets how the border of a block is drawn where the block is split across pages or columns. It is not inherited.

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
box-decoration-break: clone;
box-decoration-break: slice;
-webkit-box-decoration-break: slice;
```

---

## Values

- `clone` - The default. Each part of the block has the full border, so a block that continues onto the next page is closed at the bottom of the first page and has a border at the top of the next.
- `slice` - The border is cut where the block is split, as though it were one long box. There is no bottom border (or bottom corners) where the block continues, and no top border (or top corners) on the continuation.

---

## Notes

- The default is `clone`, which is the way Paperwork has always drawn split blocks. In a browser the default is `slice`.
- A block that is not split is drawn the same with either value.
- The background of each part is drawn in both cases. With `slice` the corners at the break are square.
- To avoid splitting a block at all, use `break-inside: avoid`.
- Added in Paperwork.Core 9.8.

---

## Example

```html
<style>
    .rule-block {
        border-top: .75pt solid #cfd2d4;
        padding-top: 16pt;
        box-decoration-break: slice; /* no rule at the top of the next page */
    }
</style>
<div class="rule-block">
    <h2>4. Weather</h2>
    <p>...</p>
</div>
```

---

## See Also

- [border](css_prop_border)
- [border-radius](css_prop_border-radius)
