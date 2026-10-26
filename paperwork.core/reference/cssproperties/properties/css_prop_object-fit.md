---
layout: default
title: object-fit
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# object-fit : Image Fit Property
{: .no_toc }

The `object-fit` property sets how an image is fitted into the box it is displayed in, when the box has a different shape to the image.

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
object-fit: fill;
object-fit: contain;
object-fit: cover;
object-fit: none;
object-fit: scale-down;
```

---

## Values

- **fill** - The image is stretched to fill the box, which can distort it. This is the default.
- **contain** - The image is scaled to fit inside the box, keeping its proportions. The box may have empty space either side.
- **cover** - The image is scaled to fill the box, keeping its proportions. Any part of the image outside the box is clipped.
- **none** - The image keeps its natural size and is clipped to the box.
- **scale-down** - Whichever of `none` or `contain` gives the smaller image. A small image is not enlarged.

The position of the image in the box is set with [object-position](css_prop_object-position), and is centered by default.

---

## Examples

```html
<style>
    .photo { width: 200pt; height: 100pt; }
</style>

<img class="photo" src="photo.jpg" style="object-fit: cover" />
<img class="photo" src="photo.jpg" style="object-fit: contain; object-position: left center" />
```

---

## Notes

- Applies to raster images (JPEG, PNG, GIF, TIFF, WebP). SVG images use their own `viewBox` and `preserveAspectRatio`.
- The box is the width and height of the image. When only one is set, the other follows the image proportions and there is nothing to fit.
- The value can be set from data, for example {% raw %}`object-fit: {{model.fit}}`{% endraw %}.
- Added in Paperwork.Core 9.8.

---

## See Also

- [object-position](css_prop_object-position)
- [width](css_prop_width)
- [aspect-ratio](css_prop_aspect-ratio)
