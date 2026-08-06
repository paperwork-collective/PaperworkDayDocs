---
layout: default
title: aspect-ratio
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# aspect-ratio : Aspect Ratio Property <span class="label label-green">v9.7</span>
{: .no_toc }

The `aspect-ratio` property sets a preferred width-to-height ratio for an element. When only one dimension is explicitly sized (via `width` or `height` in CSS), the other dimension is automatically derived so the element maintains the declared ratio.

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
selector {
    aspect-ratio: <width> / <height>;
}
```

Apply `aspect-ratio` to any element that should maintain a fixed proportional relationship between its width and height regardless of available space.

---

## Supported Values

| Syntax | Description | Example |
|--------|-------------|---------|
| `<w> / <h>` | Width-to-height ratio as two numbers | `aspect-ratio: 16 / 9` |
| `<n>` | Ratio as a single number (width / 1) | `aspect-ratio: 1.78` |
| `auto` | Use the element's intrinsic ratio (default) | `aspect-ratio: auto` |

```css
/* Common ratios */
aspect-ratio: 1 / 1;    /* square */
aspect-ratio: 4 / 3;    /* classic photo */
aspect-ratio: 16 / 9;   /* widescreen */
aspect-ratio: 3 / 2;    /* standard photo */
aspect-ratio: 2 / 1;    /* panoramic */
```

---

## How It Works

`aspect-ratio` is a **derived-dimension hint**. The engine uses it when it needs to calculate a dimension that CSS has not explicitly set:

- **Width set, height not set** → `height = width / ratio`
- **Height set, width not set** → `width = height × ratio`
- **Both set** → ratio is ignored; both explicit dimensions win
- **Neither set** → ratio is applied to the element's natural/intrinsic size

### Interaction with min/max constraints

If `min-width`, `max-width`, `min-height`, or `max-height` are also set, they are applied **after** the ratio-derived dimension is calculated. When only one axis ends up constrained by a min/max, the other axis re-derives from the ratio to preserve it. When both axes are independently constrained, the ratio is allowed to break.

```css
/* min-height binds → width re-derives from ratio */
.img {
    max-width: 200pt;
    min-height: 300pt;   /* binds; width = 300pt × 4/3 = 400pt, but clamped to 200pt */
    aspect-ratio: 4 / 3;
}
```

---

## Notes

### Images (`<img>`)

`aspect-ratio` is most commonly used on images. When an `<img>` has a CSS `aspect-ratio` and only one CSS dimension, the other is derived automatically:

```html
<!-- Square image — height = whatever width resolves to -->
<img src="photo.jpg" style="width: 200pt; aspect-ratio: 1 / 1;" />

<!-- Widescreen — height derived from width -->
<img src="banner.jpg" style="width: 400pt; aspect-ratio: 16 / 9;" />

<!-- Portrait — width derived from height -->
<img src="portrait.jpg" style="height: 300pt; aspect-ratio: 2 / 3;" />
```

For `<img>` elements, the intrinsic ratio from the image file (or from the integer `width`/`height` attribute hints) takes precedence when `aspect-ratio: auto` (the default). Setting an explicit ratio overrides the image's own ratio.

### SVG images without dimensions

For SVG images that have no `viewBox` and no declared `width`/`height`, `aspect-ratio` provides the only available ratio information. Without it, the engine falls back to a 1:1 ratio:

```html
<!-- SVG with no internal dimensions — use aspect-ratio to control shape -->
<img src="diagram.svg" style="width: 300pt; aspect-ratio: 3 / 2;" />
```

### Block elements

`aspect-ratio` also works on block elements. Combined with a single explicit dimension it keeps boxes proportional:

```css
.thumbnail-box {
    width: 150pt;
    aspect-ratio: 4 / 3;   /* height = 112.5pt */
    background-color: #f3f4f6;
    border: 1pt solid #e5e7eb;
}
```

---

## Examples

### Square avatar

```html
<img src="avatar.jpg"
     style="width: 80pt; aspect-ratio: 1 / 1; border-radius: 40pt;" />
```

### Widescreen banner

```html
<img src="banner.jpg"
     style="width: 100%; aspect-ratio: 16 / 9;" />
```

### Proportional card with background

```html
<style>
    .card {
        width: 200pt;
        aspect-ratio: 3 / 4;
        background-color: #dbeafe;
        border: 1pt solid #2563eb;
        padding: 10pt;
    }
</style>
<div class="card">
    <h3>Card Title</h3>
    <p>Card content</p>
</div>
```

### Responsive image with constrained width

```html
<img src="photo.jpg"
     style="max-width: 300pt; width: 100%; aspect-ratio: 4 / 3;" />
```

### Data-bound image sizing

{% raw %}
```html
<!-- Model: { images: [{ src: "img1.jpg", ratio: "16/9" }, ...] } -->
{{#each model.images}}
<img src="{{this.src}}"
     style="width: 250pt; aspect-ratio: {{this.ratio}};" />
{{/each}}
```
{% endraw %}

---

## See Also

- [width](/reference/cssproperties/properties/css_prop_width) — explicit CSS width
- [height](/reference/cssproperties/properties/css_prop_height) — explicit CSS height
- [min-width / max-width](/reference/cssproperties/properties/css_prop_min-width) — width constraints
- [min-height / max-height](/reference/cssproperties/properties/css_prop_min-height) — height constraints
- [width and height attributes](/reference/htmlattributes/attributes/attr_width_height) — intrinsic pixel hints for `<img>`
- [img element](/reference/htmltags/elements/html_img_element) — image element reference

---
