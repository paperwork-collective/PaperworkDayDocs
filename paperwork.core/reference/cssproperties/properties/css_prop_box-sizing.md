---
layout: default
title: box-sizing
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# box-sizing : Box Sizing Property
{: .no_toc }

The `box-sizing` property sets whether the `width` and `height` of an element include its padding and border, or are the size of the content only.

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
box-sizing: border-box;
box-sizing: content-box;
```

---

## Values

- **border-box** - The `width` and `height` include the padding. This is how elements are sized by default in Paperwork.Core, so setting it has no effect.
- **content-box** - The `width` and `height` are the size of the content only. The padding and border are added around it, so the element is larger than the width and height.

---

## Differences from a browser

{: .important }
> Browsers size boxes as `content-box` unless told otherwise. Paperwork.Core sizes them as `border-box` (the padding is inside the width) unless told otherwise. A template written for a browser that sets explicit widths together with padding will have a narrower content area in the PDF, unless it sets `box-sizing: border-box` (which then matches), or `box-sizing: content-box` to ask for the browser sizing.

In Paperwork.Core the border is drawn inside the box edge and does not reduce the content width. With `content-box` the border widths are added to the width and height, as in a browser.

---

## Examples

An element with a width of 200pt, padding of 20pt and a 5pt border:

```html
<style>
    .box { width: 200pt; height: 100pt; padding: 20pt; border: 5pt solid black; }
</style>

<!-- 200pt wide and 100pt high in total, with 160pt x 60pt of content -->
<div class="box">Default sizing</div>

<!-- 250pt wide and 150pt high in total, with 200pt x 100pt of content -->
<div class="box" style="box-sizing: content-box">Content box</div>
```

### All elements

```css
* { box-sizing: content-box; }
```

---

## Notes

- `box-sizing` is not inherited. Use a selector such as `*` to apply it to every element.
- Applies to `width`, `height`, `min-width`, `min-height`, `max-width` and `max-height`. An `auto` width or height is not changed.
- A percentage width is a percentage of the container, and with `content-box` the padding and border are added to that.
- The value can be set from data, for example {% raw %}`box-sizing: {{model.sizing}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [width](css_prop_width)
- [padding](css_prop_padding)
- [border](css_prop_border)
