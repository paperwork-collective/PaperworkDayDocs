---
layout: default
title: radial-gradient()
parent: background-image
parent_url: /paperwork.core/reference/cssproperties/properties/css_prop_background-image.html
grand_parent: CSS Properties
grand_parent_url: /paperwork.core/reference/cssproperties/
great_grand_parent: Template reference
great_grand_parent_url: /reference/
has_children: false
has_toc: false
---

# radial-gradient() : Radial Gradient Function
{: .no_toc }

The `radial-gradient()` CSS function creates a smooth color transition radiating from a center point outward in all directions. Radial gradients are ideal for spotlight effects, halos, badges, circular backgrounds, and creating depth without requiring image files.

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
    background: radial-gradient(shape size at position, color-stop1, color-stop2, ...);
}
```

---

## Syntax

### Shape (Optional)
Defines the gradient's geometry:
- `circle` - Circular gradient
- `ellipse` - Elliptical gradient (default)

### Size (Optional)
Controls the gradient's extent:
- `closest-side` - Gradient extends to the closest side
- `farthest-side` - Gradient extends to the farthest side
- `closest-corner` - Gradient extends to the closest corner
- `farthest-corner` - Gradient extends to the farthest corner (default)
- `length` - Explicit size (e.g., `100px`, `10em`)

### Position (Optional)
Specifies the center point of the gradient:
- `at 50% 50%` - Centered (default)
- `at 100% 0%` - Top-right corner
- `at 0% 100%` - Bottom-left corner
- `at center` - Centered
- `at 30% 40%` - Custom position using percentages
- `at 50px 50px` - Custom position using absolute units

### Color Stops
Define colors and optional positions radiating from center:
- `color` - CSS color value (name, hex, rgb, rgba, hsl, hsla)
- `color position` - Color at specific distance (%, px, em, etc.)

### Examples

**Simple circular gradient:**
```css
background: radial-gradient(circle, #FF0000, #0000FF);
```

**Elliptical gradient with size:**
```css
background: radial-gradient(ellipse closest-side, #FFD700, #FFA500);
```

**Multi-color radial gradient:**
```css
background: radial-gradient(circle,
    #FFFFFF 0%,
    #FF0000 30%,
    #000000 100%);
```

**Off-center gradient:**
```css
background: radial-gradient(circle at 30% 30%,
    rgba(255, 255, 255, 1),
    rgba(0, 0, 0, 0));
```

**Spotlight effect:**
```css
background: radial-gradient(circle farthest-corner at 50% 50%,
    #FFFF00 0%,
    rgba(255, 255, 0, 0.5) 50%,
    rgba(0, 0, 0, 0) 100%);
```

---

## Supported Elements

The `radial-gradient()` function can be applied to:
- Block elements (`<div>`, `<section>`, `<article>`)
- Inline-block elements
- Paragraphs (`<p>`)
- Headings (`<h1>` through `<h6>`)
- Table cells (`<td>`, `<th>`)
- Table rows (`<tr>`)
- List items (`<li>`)
- Page backgrounds
- SVG elements with fill or stroke
- Circular and button-like elements

---

## Notes

- Gradients do not require external image files
- Radial gradients reduce PDF file size compared to image backgrounds
- Circle gradients ignore width/height aspect ratio
- Ellipse gradients adapt to container dimensions
- Position values can use percentages or absolute units
- A PDF gradient cannot be transparent. The alpha of an `rgba()` or `hsla()` stop is ignored, and a `transparent` stop is drawn as black (with a warning in the trace log) - use the color of the background instead, e.g. `linear-gradient(#1B3350, #2A4A70)`
- A gradient that cannot be read (for example a stop with 2 positions, `red 10pt 20pt`), or that has less than 2 colors, is not drawn. The `background-color` is shown instead, and a warning is added to the trace log
- Gradients can be combined with `background-size` for complex effects
- Performance is excellent as gradients are vector-based
- Multiple gradients can be layered using comma-separated values
- Radial gradients work particularly well on square/circular containers

---

## Color Values

Supported CSS color formats for gradient stops:
- Named colors: `red`, `blue`, `gold`, etc. (`transparent` is drawn as black)
- Hexadecimal: `#FF0000`, `#F00` (shorthand)
- RGB: `rgb(255, 0, 0)`
- RGBA: `rgba(255, 0, 0, 0.5)` (the alpha is ignored)
- HSL: `hsl(0, 100%, 50%)`
- HSLA: `hsla(0, 100%, 50%, 0.5)` (the alpha is ignored)

---

## Data Binding

Radial gradients support dynamic data binding for personalized backgrounds:

### Example: Dynamic radial gradient based on data


{% raw %}
```html
<div style="width: 200pt; height: 200pt; border-radius: 100pt;
            background: radial-gradient(circle at {{model.position.x ?? '50%'}} {{model.position.y ?? '50%'}},
                        {{model.theme.centerColor ?? '#FFFFFF'}},
                        {{model.theme.edgeColor ?? '#000000'}});">
  Content with dynamic radial gradient
</div>
```
{% endraw %}


---

## Use Cases

### Spotlight Effect
Create focused attention on a document section:
```css
background: radial-gradient(circle farthest-corner,
    rgba(255, 255, 255, 1) 0%,
    rgba(200, 200, 200, 0.5) 50%,
    rgba(0, 0, 0, 0) 100%);
```

### Badge/Badge Ring
Create circular badge backgrounds:
```css
background: radial-gradient(circle, #FFD700 40%, #FFA500 100%);
border-radius: 50%;
width: 80pt;
height: 80pt;
```

### Vignette Effect
Darken edges while keeping center bright:
```css
background: radial-gradient(ellipse farthest-corner,
    #FFFFFF 0%,
    #999999 70%,
    #333333 100%);
```

---

## Browser & PDF Support

- Radial gradients are well-supported in modern browsers and PDF viewers
- SVG-based implementations provide consistent cross-platform rendering
- Keyword values (e.g., `closest-side`) provide flexible gradient sizing

---

## See Also

- [linear-gradient()](/paperwork.core/reference/cssproperties/properties/css_prop_linear-gradient) - Linear color gradients
- [background](/paperwork.core/reference/cssproperties/properties/css_prop_background) - Background shorthand property
- [background-image](/paperwork.core/reference/cssproperties/properties/css_prop_background-image) - Background image property
- [background-color](/paperwork.core/reference/cssproperties/properties/css_prop_background-color) - Solid background color
- [SVG radialGradient](/paperwork.core/reference/svgelements/elements/svg_radialGradient_element.html) - SVG radial gradient element
- [Color Reference](/paperwork.core/reference/cssproperties/) - CSS color values
- [Data Binding](/paperwork.core/reference/binding/) - Dynamic content and attributes

---
