---
layout: default
title: CSS Styles Support
parent: Quick Start
parent_url: /quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 2
---

# CSS Styles Support
{: .no_toc }

<style>
.main-content table td:first-child,
.main-content table th:first-child { min-width: 200px; }
</style>

A quick-reference chart showing which CSS selectors, at-rules, and style properties are supported in Scryber templates, with any PDF-specific differences noted.

**Support levels used in this chart:**

| Label | Meaning |
|-------|---------|
| **Supported** | Works as in standard CSS |
| **Partial** | Supported with differences or limitations — see Notes |
| **Scryber** | Scryber-specific extension not present in standard CSS |
| **No** | Not currently supported |

Where a property or value was added or significantly improved in a specific version, the version is shown in the Notes column.

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

## Selectors

### Style Selectors

| Selector | Syntax | Support | Notes |
|----------|--------|---------|-------|
| [Element](/reference/cssselectors/selectors/css_element_selector) | `div` | **Supported** | |
| [Class](/reference/cssselectors/selectors/css_class_selector) | `.name` | **Supported** | |
| [ID](/reference/cssselectors/selectors/css_id_selector) | `#id` | **Supported** | |
| [Root](/reference/cssselectors/selectors/css_root_selector) | `:root` | **Supported** | Used to set CSS custom properties (variables) |
| [Universal](/reference/cssselectors/selectors/css_universal_selector) | `*` | **Supported** | Can be combined with another selector |
| Pseudo-class | `:hover`, `:focus`, `:nth-child` | **No** | Interactivity is not applicable in PDF |
| Attribute | `[attr="value"]` | **No** | |
| Adjacent sibling | `+` | **No** | |
| General sibling | `~` | **No** | |

### Combinators

| Combinator | Character | Support | Notes |
|------------|-----------|---------|-------|
| [Descendant](/reference/cssselectors/selectors/css_descendant_combinator) | ` ` (space) | **Supported** | |
| [Direct Child](/reference/cssselectors/selectors/css_child_combinator) | `>` | **Supported** | |
| [Selector List](/reference/cssselectors/selectors/css_multiple_selectors) | `,` | **Supported** | Invalid selectors in a list are skipped; valid ones are applied |

### Pseudo-Elements

| Pseudo-Element | Syntax | Support | Notes |
|----------------|--------|---------|-------|
| [Before Content](/reference/cssselectors/selectors/css_before_selector) | `::before` | **Supported** | Supports `content` and counter functions |
| [After Content](/reference/cssselectors/selectors/css_after_selector) | `::after` | **Supported** | Supports `content` and counter functions |

### At-Rules

| Rule | Syntax | Support | Notes |
|------|--------|---------|-------|
| [Page](/reference/cssselectors/selectors/css_page_rule) | `@page` | **Supported** | Sets page size, margins, and orientation; named pages supported |
| [Media](/reference/cssselectors/selectors/css_media_rule) | `@media` | **Partial** | Only `print` media queries are applied; `screen` queries are ignored |
| [Font Face](/reference/cssselectors/selectors/css_font_face_rule) | `@font-face` | **Supported** | Local and remote font sources; see font configuration docs |
| @keyframes | `@keyframes` | **No** | Animations are not applicable in PDF |
| @scope, @layer | — | **No** | Unknown at-rules cause the entire rule block to be skipped |

---

## Properties

### Colour & Opacity

| Property | Support | Notes |
|----------|---------|-------|
| [color](/reference/cssproperties/properties/css_prop_color) | **Supported** | Named, hex, rgb(), rgba(), hsl() |
| [opacity](/reference/cssproperties/properties/css_prop_opacity) | **Supported** | 0.0 – 1.0 |

### Background

| Property | Support | Notes |
|----------|---------|-------|
| [background](/reference/cssproperties/properties/css_prop_background) | **Supported** | Shorthand |
| [background-color](/reference/cssproperties/properties/css_prop_background-color) | **Supported** | |
| [background-image](/reference/cssproperties/properties/css_prop_background-image) | **Supported** | URL, `linear-gradient()`, `radial-gradient()`, `none` |
| [background-size](/reference/cssproperties/properties/css_prop_background-size) | **Supported** | `cover`, `contain` (v9.3 improved), lengths, percentages |
| [background-position](/reference/cssproperties/properties/css_prop_background-position) | **Supported** | Keywords, lengths, percentages |
| [background-position-x](/reference/cssproperties/properties/css_prop_background-position-x) | **Supported** | |
| [background-position-y](/reference/cssproperties/properties/css_prop_background-position-y) | **Supported** | |
| [background-repeat](/reference/cssproperties/properties/css_prop_background-repeat) | **Supported** | `repeat`, `no-repeat`, `repeat-x`, `repeat-y` |

### Typography

| Property | Support | Notes |
|----------|---------|-------|
| [font](/reference/cssproperties/properties/css_prop_font) | **Supported** | Shorthand |
| [font-family](/reference/cssproperties/properties/css_prop_font-family) | **Supported** | System fonts, embedded fonts, Google Fonts via `@font-face` |
| [font-size](/reference/cssproperties/properties/css_prop_font-size) | **Supported** | pt, px, em, %, named sizes |
| [font-style](/reference/cssproperties/properties/css_prop_font-style) | **Supported** | `normal`, `italic`, `oblique` |
| [font-weight](/reference/cssproperties/properties/css_prop_font-weight) | **Supported** | Named and numeric weights |
| [font-stretch](/reference/cssproperties/properties/css_prop_font-stretch) | **Supported** | |
| [text-align](/reference/cssproperties/properties/css_prop_text-align) | **Supported** | `left`, `right`, `center`, `justify` |
| [text-decoration](/reference/cssproperties/properties/css_prop_text-decoration) | **Supported** | Shorthand |
| [text-decoration-line](/reference/cssproperties/properties/css_prop_text-decoration-line) | **Supported** | `underline`, `line-through`, `overline` |
| [letter-spacing](/reference/cssproperties/properties/css_prop_letter-spacing) | **Supported** | |
| [word-spacing](/reference/cssproperties/properties/css_prop_word-spacing) | **Supported** | |
| [line-height](/reference/cssproperties/properties/css_prop_line-height) | **Supported** | |
| [white-space](/reference/cssproperties/properties/css_prop_white-space) | **Supported** | `normal`, `pre`, `nowrap` |
| [vertical-align](/reference/cssproperties/properties/css_prop_vertical-align) | **Supported** | `top`, `middle`, `bottom`, `baseline` |
| [hyphens](/reference/cssproperties/properties/css_prop_hyphens) | **Supported** | `none`, `auto`, `manual` |
| [hyphenate-character](/reference/cssproperties/properties/css_prop_hyphenate-character) | **Supported** | Custom hyphen character |
| [hyphenate-limit-chars](/reference/cssproperties/properties/css_prop_hyphenate-limit-chars) | **Supported** | |

### Box Model

| Property | Support | Notes |
|----------|---------|-------|
| [width](/reference/cssproperties/properties/css_prop_width) | **Supported** | pt, px, %, em |
| [height](/reference/cssproperties/properties/css_prop_height) | **Supported** | |
| [min-width](/reference/cssproperties/properties/css_prop_min-width) | **Supported** | |
| [max-width](/reference/cssproperties/properties/css_prop_max-width) | **Supported** | |
| [min-height](/reference/cssproperties/properties/css_prop_min-height) | **Supported** | |
| [max-height](/reference/cssproperties/properties/css_prop_max-height) | **Supported** | |
| [margin](/reference/cssproperties/properties/css_prop_margin) | **Supported** | Shorthand; all four sides |
| [margin-top/right/bottom/left](/reference/cssproperties/properties/css_prop_margin-top) | **Supported** | Individual sides |
| [margin-inline](/reference/cssproperties/properties/css_prop_margin-inline) | **Supported** | Logical properties |
| [margin-inline-start/end](/reference/cssproperties/properties/css_prop_margin-inline-start) | **Supported** | |
| [padding](/reference/cssproperties/properties/css_prop_padding) | **Supported** | Shorthand; all four sides |
| [padding-top/right/bottom/left](/reference/cssproperties/properties/css_prop_padding-top) | **Supported** | Individual sides |
| [padding-inline](/reference/cssproperties/properties/css_prop_padding-inline) | **Supported** | Logical properties |
| [padding-inline-start/end](/reference/cssproperties/properties/css_prop_padding-inline-start) | **Supported** | |

### Borders

| Property | Support | Notes |
|----------|---------|-------|
| [border](/reference/cssproperties/properties/css_prop_border) | **Supported** | Shorthand |
| [border-top/right/bottom/left](/reference/cssproperties/properties/css_prop_border-top) | **Supported** | Side shorthand |
| [border-color/style/width](/reference/cssproperties/properties/css_prop_border-color) | **Supported** | |
| [border-top/right/bottom/left-color/style/width](/reference/cssproperties/properties/css_prop_border-top-color) | **Supported** | Individual side properties |
| [border-radius](/reference/cssproperties/properties/css_prop_border-radius) | **Supported** | Includes per-column radius on multi-column layouts (v9.3) |

### Layout & Positioning

| Property | Support | Notes |
|----------|---------|-------|
| [display](/reference/cssproperties/properties/css_prop_display) | **Partial** | `block`, `inline`, `none` fully supported; `flex` and `grid` initial support (v9.3); `table-*` initial support (v9.3) |
| [position](/reference/cssproperties/properties/css_prop_position) | **Partial** | `static`, `relative`, `absolute` supported; `fixed` and `sticky` not applicable |
| [top/right/bottom/left](/reference/cssproperties/properties/css_prop_top) | **Supported** | Used with `position` |
| [float](/reference/cssproperties/properties/css_prop_float) | **Supported** | `left`, `right`, `none` |
| [overflow](/reference/cssproperties/properties/css_prop_overflow) | **Supported** | |
| [overflow-x](/reference/cssproperties/properties/css_prop_overflow-x) | **Supported** | |
| [overflow-y](/reference/cssproperties/properties/css_prop_overflow-y) | **Supported** | |
| [transform](/reference/cssproperties/properties/css_prop_transform) | **Supported** | `translate`, `rotate`, `scale`, `matrix` |
| `animation` / `transition` | **No** | PDF is a static format |
| `z-index` | **No** | |

### Flexbox

| Property | Support | Notes |
|----------|---------|-------|
| [`display: flex`](/reference/cssproperties/properties/css_prop_display) | **Partial** | Initial support added in v9.3 |
| `display: inline-flex` | **No** | |
| `flex-direction` | **Partial** | Basic row/column supported |
| `justify-content` | **Partial** | |
| `align-items` | **Partial** | |
| Other flex properties | **No** | Full flex spec not yet complete |

### Grid

| Property | Support | Notes |
|----------|---------|-------|
| `display: grid` | **Partial** | Initial support added in v9.3 |
| [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) | **Partial** | Column track definitions; v9.3 |
| Other grid properties | **No** | Full grid spec not yet complete |

### Multi-Column Layout

| Property | Support | Notes |
|----------|---------|-------|
| [columns](/reference/cssproperties/properties/css_prop_columns) | **Supported** | Shorthand |
| [column-count](/reference/cssproperties/properties/css_prop_column-count) | **Supported** | |
| [column-width](/reference/cssproperties/properties/css_prop_column-width) | **Supported** | |
| [column-gap](/reference/cssproperties/properties/css_prop_column-gap) | **Supported** | |
| [column-fill](/reference/cssproperties/properties/css_prop_column-fill) | **Supported** | |
| [column-span](/reference/cssproperties/properties/css_prop_column-span) | **Supported** | |
| [column-rule](/reference/cssproperties/properties/css_prop_column-rule) | **Supported** | Shorthand; v9.3 |
| [column-rule-color](/reference/cssproperties/properties/css_prop_column-rule-color) | **Supported** | v9.3 |
| [column-rule-style](/reference/cssproperties/properties/css_prop_column-rule-style) | **Supported** | v9.3 |
| [column-rule-width](/reference/cssproperties/properties/css_prop_column-rule-width) | **Supported** | v9.3 |

### Page Breaks

| Property | Support | Notes |
|----------|---------|-------|
| [break-before](/reference/cssproperties/properties/css_prop_break-before) | **Supported** | `auto`, `always`, `avoid`, `page`, `column`, `left`, `right` |
| [break-after](/reference/cssproperties/properties/css_prop_break-after) | **Supported** | Same values as `break-before` |
| [break-inside](/reference/cssproperties/properties/css_prop_break-inside) | **Supported** | `auto`, `avoid` |
| [page-break-before](/reference/cssproperties/properties/css_prop_page-break-before) | **Supported** | Legacy CSS2 equivalent of `break-before` |
| [page-break-after](/reference/cssproperties/properties/css_prop_page-break-after) | **Supported** | Legacy CSS2 equivalent of `break-after` |
| [page-break-inside](/reference/cssproperties/properties/css_prop_page-break-inside) | **Supported** | Legacy CSS2 equivalent of `break-inside` |
| [page](/reference/cssproperties/properties/css_prop_page) | **Supported** | Assigns element to a named `@page` rule |
| [size](/reference/cssproperties/properties/css_prop_size) | **Supported** | Used within `@page`; standard sizes and custom dimensions |

### Content & Counters

| Property | Support | Notes |
|----------|---------|-------|
| [content](/reference/cssproperties/properties/css_prop_content) | **Supported** | Used with `::before` / `::after`; supports `counter()` |
| [counter-reset](/reference/cssproperties/properties/css_prop_counter-reset) | **Supported** | |
| [counter-increment](/reference/cssproperties/properties/css_prop_counter-increment) | **Supported** | |

### Gradients (as background-image values)

| Function | Support | Notes |
|----------|---------|-------|
| [linear-gradient()](/reference/cssproperties/properties/css_prop_linear-gradient) | **Supported** | Direction, angle, multiple stops |
| [radial-gradient()](/reference/cssproperties/properties/css_prop_radial-gradient) | **Supported** | Centre point, multiple stops |
| [gradient-position](/reference/cssproperties/properties/css_prop_gradient-position) | **Supported** | Scryber gradient position property |

### CSS Variables & Calc

| Feature | Support | Notes |
|---------|---------|-------|
| [`--custom-property`](/reference/cssselectors/selectors/css_root_selector) + `:root` | **Supported** | Define and use CSS custom properties |
| [`var(--name)`](/reference/binding/functions/var) | **Supported** | Reference CSS variables |
| [`calc()`](/reference/binding/functions/calc) | **Partial** | Single-unit expressions work; mixed-unit expressions (e.g. `calc(50% - 5px)`) are not supported |

### List Marker Customisation (Scryber Extensions)

| Property | Support | Notes |
|----------|---------|-------|
| [-pdf-li-align](/reference/cssproperties/properties/css_prop_-pdf-li-align) | **Scryber** | Aligns the list item marker |
| [-pdf-li-concat](/reference/cssproperties/properties/css_prop_-pdf-li-concat) | **Scryber** | Concatenate marker values |
| [-pdf-li-group](/reference/cssproperties/properties/css_prop_-pdf-li-group) | **Scryber** | Groups counter levels |
| [-pdf-li-inset](/reference/cssproperties/properties/css_prop_-pdf-li-inset) | **Scryber** | Marker inset distance |
| [-pdf-li-prefix](/reference/cssproperties/properties/css_prop_-pdf-li-prefix) | **Scryber** | Text before the marker |
| [-pdf-li-postfix](/reference/cssproperties/properties/css_prop_-pdf-li-postfix) | **Scryber** | Text after the marker |

### SVG Style Properties

These are valid CSS properties when styling SVG elements.

| Property | Support | Notes |
|----------|---------|-------|
| [fill](/reference/cssproperties/properties/css_prop_fill) | **Supported** | Solid colours, gradients, patterns |
| [fill-opacity](/reference/cssproperties/properties/css_prop_fill-opacity) | **Supported** | |
| [stroke](/reference/cssproperties/properties/css_prop_stroke) | **Supported** | |
| [stroke-width](/reference/cssproperties/properties/css_prop_stroke-width) | **Supported** | |
| [stroke-dasharray](/reference/cssproperties/properties/css_prop_stroke-dasharray) | **Supported** | |
| [stroke-dashoffset](/reference/cssproperties/properties/css_prop_stroke-dashoffset) | **Supported** | |
| [stroke-linecap](/reference/cssproperties/properties/css_prop_stroke-linecap) | **Supported** | `butt`, `round`, `square` |
| [stroke-linejoin](/reference/cssproperties/properties/css_prop_stroke-linejoin) | **Supported** | `miter`, `round`, `bevel` |
| [stroke-opacity](/reference/cssproperties/properties/css_prop_stroke-opacity) | **Supported** | |
| [stop-color](/reference/cssproperties/properties/css_prop_stop-color) | **Supported** | For gradient stops |
| [stop-opacity](/reference/cssproperties/properties/css_prop_stop-opacity) | **Supported** | For gradient stops |
| [paint-order](/reference/cssproperties/properties/css_prop_paint-order) | **Supported** | |
| [text-anchor](/reference/cssproperties/properties/css_prop_text-anchor) | **Supported** | `start`, `middle`, `end` |
| [dominant-baseline](/reference/cssproperties/properties/css_prop_dominant-baseline) | **Supported** | |

### Global Property Values

| Value | Support | Notes |
|-------|---------|-------|
| `initial`, `inherit`, `revert`, `unset` | **No** | Global keyword values are not supported; the property is ignored if one of these values is encountered |

---

## See Also

- [CSS Properties Reference](/reference/cssproperties/)
- [CSS Selectors Reference](/reference/cssselectors/)
- [HTML Tags Support](/quickstart/feature_html_tags)
- [SVG Drawing Support](/quickstart/feature_svg)
- [Binding Expressions Support](/quickstart/feature_binding)
