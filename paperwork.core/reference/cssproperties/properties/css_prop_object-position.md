---
layout: default
title: object-position
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# object-position : Image Position Property
{: .no_toc }

The `object-position` property sets where an image is placed within its box, when [object-fit](css_prop_object-fit) leaves the image a different size to the box.

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
object-position: center;          /* the default, 50% 50% */
object-position: left top;
object-position: right bottom;
object-position: 25% 75%;
object-position: 10pt 5pt;
object-position: top;             /* top edge, centered horizontally */
```

---

## Values

One or two values, for the horizontal then the vertical position.

- **keywords** - `left`, `center`, `right` for the horizontal, and `top`, `center`, `bottom` for the vertical. Keywords can be in either order (`top left` is the same as `left top`).
- **percentage** - The position within the free space. `0%` is the left (or top) edge, `100%` the right (or bottom) edge, and `50%` the center.
- **length** - A distance from the left (or top) of the box: `10pt`, `0.5in`, `5mm`.

With one value, the other direction is centered.

---

## Examples

```html
<!-- show the top of a tall photo in a short box -->
<img src="photo.jpg" style="width: 200pt; height: 100pt; object-fit: cover; object-position: top" />

<!-- a logo in the left of a wide box -->
<img src="logo.png" style="width: 300pt; height: 60pt; object-fit: contain; object-position: left center" />
```

---

## Notes

- Only has an effect when the image is a different size to the box, so with `object-fit: contain`, `cover`, `none` or `scale-down`.
- Lengths in `em` or other font relative units are not supported. Use points, pixels, millimeters, inches or percentages.
- Added in Paperwork.Core 9.8.

---

## See Also

- [object-fit](css_prop_object-fit)
