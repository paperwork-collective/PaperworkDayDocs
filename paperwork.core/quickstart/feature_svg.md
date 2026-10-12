---
layout: default
title: SVG Drawing Support
parent: Quick Start
parent_url: /paperwork.core/quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 3
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# SVG Drawing Support
{: .no_toc }

<style>
.main-content table td:first-child,
.main-content table th:first-child { min-width: 200px; }
</style>

A quick-reference chart showing which SVG elements and capabilities are supported in Scryber. Scryber supports a substantial portion of the static SVG specification — most SVG images that do not rely on filters or animations should work without modification.

**Support levels used in this chart:**

| Label | Meaning |
|-------|---------|
| **Supported** | Works as in the SVG specification |
| **Partial** | Supported with differences or limitations — see Notes |
| **No** | Not currently supported |

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

## Inclusion Methods

SVG content can be included in a template in three ways:

| Method | Binding Support | Notes |
|--------|-----------------|-------|
| Inline `<svg>` in template | **Full** | Data binding and dynamic styles apply |
| Embedded via `<embed>` | **Full** | External `.svg` file; uses outer document styles |
| Referenced via `<img src="...">` | **None** | Rendered as a static image; no data binding |

---

## Root & Container Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [SVG Root](/paperwork.core/reference/svgelements/elements/svg_svg_element) | `<svg>` | **Supported** | Can be free-standing, inline, or nested within another `<svg>`; `viewBox`, `width`, `height` supported |

---

## Document Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Style Declarations](/paperwork.core/reference/svgelements/elements/svg_defs_element) | `<style>` | **Supported** | CSS within SVG; outer document styles also apply for inline/embedded SVG |
| [Definitions](/paperwork.core/reference/svgelements/elements/svg_defs_element) | `<defs>` | **Supported** | Single child of `<svg>`; holds gradients, patterns, markers, symbols |

---

## Graphic Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Rectangle](/paperwork.core/reference/svgelements/elements/svg_rect_element) | `<rect>` | **Supported** | `x`, `y`, `width`, `height`, `rx`, `ry`; fill and stroke |
| [Circle](/paperwork.core/reference/svgelements/elements/svg_circle_element) | `<circle>` | **Supported** | `cx`, `cy`, `r`; fill and stroke |
| [Ellipse](/paperwork.core/reference/svgelements/elements/svg_ellipse_element) | `<ellipse>` | **Supported** | `cx`, `cy`, `rx`, `ry`; fill and stroke |
| [Line](/paperwork.core/reference/svgelements/elements/svg_line_element) | `<line>` | **Supported** | `x1`, `y1`, `x2`, `y2`; stroke only |
| [Polygon](/paperwork.core/reference/svgelements/elements/svg_polygon_element) | `<polygon>` | **Supported** | Closed shape from coordinate `points`; fill and stroke |
| [Polyline](/paperwork.core/reference/svgelements/elements/svg_polyline_element) | `<polyline>` | **Supported** | Open shape from coordinate `points`; stroke only |
| [Path](/paperwork.core/reference/svgelements/elements/svg_path_element) | `<path>` | **Supported** | Full path `d` data: arcs, curves, lines, relative offsets; fill and stroke |
| [Referenced Image](/paperwork.core/reference/svgelements/elements/svg_image_element) | `<image>` | **Supported** | Embeds a raster image within the SVG area |

---

## Structural Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Group](/paperwork.core/reference/svgelements/elements/svg_g_element) | `<g>` | **Supported** | Container for inner elements; inherits and applies styling; referenceable via `<use>` |
| [Use Reference](/paperwork.core/reference/svgelements/elements/svg_use_element) | `<use>` | **Supported** | Clones a referenced element (by `href`) and re-renders at desired position |
| [Symbol](/paperwork.core/reference/svgelements/elements/svg_symbol_element) | `<symbol>` | **Supported** | Hidden container; made visible when referenced by `<use>` |
| [Anchor Link](/paperwork.core/reference/svgelements/elements/svg_a_element) | `<a>` | **Supported** | Makes inner graphic elements into links |

---

## Text Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Text](/paperwork.core/reference/svgelements/elements/svg_text_element) | `<text>` | **Supported** | Positioned at `x`, `y`; font, fill, and stroke styling |
| [Text Span](/paperwork.core/reference/svgelements/elements/svg_tspan_element) | `<tspan>` | **Supported** | Adjusts position and/or style of a text range within a `<text>` |

---

## Paint Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Linear Gradient](/paperwork.core/reference/svgelements/elements/svg_linearGradient_element) | `<linearGradient>` | **Supported** | Colour transitions along a line; multiple stops; `gradientUnits`, `x1`, `y1`, `x2`, `y2` |
| [Radial Gradient](/paperwork.core/reference/svgelements/elements/svg_radialGradient_element) | `<radialGradient>` | **Supported** | Colour transitions from a centre point; `cx`, `cy`, `r`, `fx`, `fy` |
| [Gradient Stop](/paperwork.core/reference/svgelements/elements/svg_stop_element) | `<stop>` | **Supported** | `offset`, `stop-color`, `stop-opacity` |
| [Pattern](/paperwork.core/reference/svgelements/elements/svg_pattern_element) | `<pattern>` | **Supported** | Repeating tile pattern used as a fill |
| [Marker](/paperwork.core/reference/svgelements/elements/svg_marker_element) | `<marker>` | **Supported** | Arrowheads and line-end decorators; `markerStart`, `markerMid`, `markerEnd` |

---

## Meta-Data Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Title](/paperwork.core/reference/svgelements/elements/svg_svg_element) | `<title>` | **Supported** | Short description; shown in the PDF document outline |
| [Description](/paperwork.core/reference/svgelements/elements/svg_svg_element) | `<desc>` | **Supported** | Longer description; not shown in output |

---

## Not Supported

| Feature | Notes |
|---------|-------|
| `<filter>` | Raster-based colour blending cannot be determined at vector stage |
| `<animate>`, `<animateTransform>`, `<set>` | Animations are not applicable in a static PDF format |
| `<clipPath>` | Not currently supported |
| `<mask>` | Not currently supported |
| `<foreignObject>` | Not supported |
| CSS `filter` property | Same reason as `<filter>` element |
| CSS `animation` / `transition` | Static format |

---

## SVG Style Properties

SVG elements support CSS styling. The following SVG-specific CSS properties are supported — see the [CSS Styles Support](/paperwork.core/quickstart/feature_css_styles) chart for the complete list.

| Property | Notes |
|----------|-------|
| `fill` | Solid colour, gradient reference (`url(#id)`), `none` |
| `fill-opacity` | |
| `stroke`, `stroke-width`, `stroke-opacity` | |
| `stroke-dasharray`, `stroke-dashoffset` | |
| `stroke-linecap`, `stroke-linejoin` | |
| `stop-color`, `stop-opacity` | |
| `paint-order` | |
| `text-anchor` | `start`, `middle`, `end` |
| `dominant-baseline` | |
| `font-*` | Full font properties apply to `<text>` and `<tspan>` |
| `transform` | `translate`, `rotate`, `scale`, `matrix` |

---

## See Also

- [SVG Elements Reference](/paperwork.core/reference/svgelements/)
- [HTML Tags Support](/paperwork.core/quickstart/feature_html_tags)
- [CSS Styles Support](/paperwork.core/quickstart/feature_css_styles)
- [Binding Expressions Support](/paperwork.core/quickstart/feature_binding)
