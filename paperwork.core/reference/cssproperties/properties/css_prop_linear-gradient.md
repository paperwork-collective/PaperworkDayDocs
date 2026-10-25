---
layout: default
title: linear-gradient()
parent: background-image
parent_url: /paperwork.core/reference/cssproperties/properties/css_prop_background-image.html
grand_parent: CSS Properties
grand_parent_url: /paperwork.core/reference/cssproperties/
great_grand_parent: Template reference
great_grand_parent_url: /reference/
has_children: false
has_toc: false
---

# linear-gradient() : Linear Gradient Function
{: .no_toc }

The `linear-gradient()` CSS function creates a smooth color transition along a straight line in a specified direction. Linear gradients are commonly used for backgrounds, borders, and decorative effects, providing a professional appearance to PDF documents without requiring image files.

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
    background: linear-gradient(direction, color-stop1, color-stop2, ...);
}
```

---

## Syntax

### Direction (Optional)
Specifies the gradient line direction:
- `to right` - Horizontal left to right (default)
- `to left` - Horizontal right to left
- `to bottom` - Vertical top to bottom
- `to top` - Vertical bottom to top
- `to bottom right` - Diagonal top-left to bottom-right
- `to bottom left` - Diagonal top-right to bottom-left
- `to top right` - Diagonal bottom-left to top-right
- `to top left` - Diagonal bottom-right to top-left
- `45deg` - Angle in degrees (0deg = to top, 90deg = to right)
- `0.5turn` - Angle in turns (0.25turn = 90deg)

### Color Stops
Define colors and optional positions along the gradient:
- `color` - CSS color value (name, hex, rgb, rgba, hsl, hsla)
- `color position` - Color at specific position (%, px, em, etc.)

### Examples

**Simple two-color gradient:**
```css
background: linear-gradient(to right, #FF0000, #0000FF);
```

**Gradient with angle:**
```css
background: linear-gradient(45deg, #FFD700, #FFA500);
```

**Multi-color gradient with positions:**
```css
background: linear-gradient(to right, 
    #FF0000 0%,
    #FFFF00 25%,
    #00FF00 50%,
    #00FFFF 75%,
    #0000FF 100%);
```

**Gradient with transparency:**
```css
background: linear-gradient(to bottom,
    rgba(255, 0, 0, 1),
    rgba(255, 0, 0, 0));
```

---

## Supported Elements

The `linear-gradient()` function can be applied to:
- Block elements (`<div>`, `<section>`, `<article>`)
- Inline-block elements
- Paragraphs (`<p>`)
- Headings (`<h1>` through `<h6>`)
- Table cells (`<td>`, `<th>`)
- Table rows (`<tr>`)
- List items (`<li>`)
- Page backgrounds
- SVG elements with fill or stroke

---

## Notes

- Gradients do not require external image files
- Gradients reduce PDF file size compared to image backgrounds
- Direction keywords can be combined (e.g., `to bottom right`)
- Angles are measured clockwise from the vertical axis
- Color stops can use any CSS color format
- RGBA colors enable transparent gradient effects
- Gradients can be combined with `background-size` for tiling
- Performance is excellent as gradients are vector-based
- Gradients support any number of color stops
- Multiple gradients can be layered using comma-separated values

---

## Color Values

Supported CSS color formats for gradient stops:
- Named colors: `red`, `blue`, `gold`, `transparent`, etc.
- Hexadecimal: `#FF0000`, `#F00` (shorthand)
- RGB: `rgb(255, 0, 0)`
- RGBA: `rgba(255, 0, 0, 0.5)` (with transparency)
- HSL: `hsl(0, 100%, 50%)`
- HSLA: `hsla(0, 100%, 50%, 0.5)` (with transparency)

---

## Data Binding

Linear gradients support dynamic data binding for personalized backgrounds:

### Example: Dynamic gradient based on data


{% raw %}
```html
<div style="width: 200pt; height: 100pt; 
            background: linear-gradient(to right, 
                        {{model.theme.startColor ?? '#FF0000'}},
                        {{model.theme.endColor ?? '#0000FF'}});">
  Content with dynamic gradient
</div>
```
{% endraw %}


### Example: Gradient with CSS variables

CSS `var()` and `calc()` values can be used for the colors and positions in a gradient, including variables bound from data. This also works in the `background` shorthand.

{% raw %}
```html
<style>
    :root { --start: #1f3347; --end: #5980a6; }
    .banner { height: 25pt; background: linear-gradient(90deg, var(--start), var(--end)); }
    .brand  { height: 25pt; background-image: linear-gradient(90deg, var(model.brand.dark, #1f3347), #5980a6); }
</style>
```
{% endraw %}

{: .note }
> `var()` and `calc()` inside gradients are supported from Paperwork.Core 9.8. Earlier versions drop the gradient.

---

## Browser & PDF Support

- Linear gradients are well-supported in modern browsers and PDF viewers
- SVG-based implementations provide consistent cross-platform rendering
- Angle values must use `deg` suffix for degrees or `turn` suffix for turns

---

## See Also

- [radial-gradient()](/paperwork.core/reference/cssproperties/properties/css_prop_radial-gradient) - Radial color gradients
- [background](/paperwork.core/reference/cssproperties/properties/css_prop_background) - Background shorthand property
- [background-image](/paperwork.core/reference/cssproperties/properties/css_prop_background-image) - Background image property
- [background-color](/paperwork.core/reference/cssproperties/properties/css_prop_background-color) - Solid background color
- [SVG linearGradient](/paperwork.core/reference/svgelements/elements/svg_linearGradient_element.html) - SVG linear gradient element
- [Color Reference](/paperwork.core/reference/cssproperties/) - CSS color values
- [Data Binding](/paperwork.core/reference/binding/) - Dynamic content and attributes

---
