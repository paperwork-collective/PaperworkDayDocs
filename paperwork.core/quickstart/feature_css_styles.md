---
layout: default
title: CSS Styles Support
parent: Quick Start
parent_url: /paperwork.core/quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 2
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
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
| [Element](/paperwork.core/reference/cssselectors/selectors/css_element_selector) | `div` | **Supported** | |
| [Class](/paperwork.core/reference/cssselectors/selectors/css_class_selector) | `.name` | **Supported** | |
| [ID](/paperwork.core/reference/cssselectors/selectors/css_id_selector) | `#id` | **Supported** | |
| [Root](/paperwork.core/reference/cssselectors/selectors/css_root_selector) | `:root` | **Supported** | Used to set CSS custom properties (variables) |
| [Universal](/paperwork.core/reference/cssselectors/selectors/css_universal_selector) | `*` | **Supported** | Can be combined with another selector |
| Pseudo-class | `:hover`, `:focus`, `:nth-child` | **No** | Interactivity is not applicable in PDF |
| Attribute | `[attr="value"]` | **No** | |
| Adjacent sibling | `+` | **No** | |
| General sibling | `~` | **No** | |

### Combinators

| Combinator | Character | Support | Notes |
|------------|-----------|---------|-------|
| [Descendant](/paperwork.core/reference/cssselectors/selectors/css_descendant_combinator) | ` ` (space) | **Supported** | |
| [Direct Child](/paperwork.core/reference/cssselectors/selectors/css_child_combinator) | `>` | **Supported** | |
| [Selector List](/paperwork.core/reference/cssselectors/selectors/css_multiple_selectors) | `,` | **Supported** | Invalid selectors in a list are skipped; valid ones are applied |

### Pseudo-Elements

| Pseudo-Element | Syntax | Support | Notes |
|----------------|--------|---------|-------|
| [Before Content](/paperwork.core/reference/cssselectors/selectors/css_before_selector) | `::before` | **Supported** | Supports `content` and counter functions |
| [After Content](/paperwork.core/reference/cssselectors/selectors/css_after_selector) | `::after` | **Supported** | Supports `content` and counter functions |

### At-Rules

| Rule | Syntax | Support | Notes |
|------|--------|---------|-------|
| [Page](/paperwork.core/reference/cssselectors/selectors/css_page_rule) | `@page` | **Supported** | Sets page size, margins, and orientation; named pages supported |
| [Media](/paperwork.core/reference/cssselectors/selectors/css_media_rule) | `@media` | **Partial** | Only `print` media queries are applied; `screen` queries are ignored |
| [Font Face](/paperwork.core/reference/cssselectors/selectors/css_font_face_rule) | `@font-face` | **Supported** | Local and remote font sources; see font configuration docs |
| @keyframes | `@keyframes` | **No** | Animations are not applicable in PDF |
| @scope, @layer | — | **No** | Unknown at-rules cause the entire rule block to be skipped |

---

## Properties

### Colour & Opacity

| Property | Support | Notes |
|----------|---------|-------|
| [color](/paperwork.core/reference/cssproperties/properties/css_prop_color) | **Supported** | Named, hex, rgb(), rgba(), hsl() |
| [opacity](/paperwork.core/reference/cssproperties/properties/css_prop_opacity) | **Supported** | 0.0 – 1.0 |

### Background

| Property | Support | Notes |
|----------|---------|-------|
| [background](/paperwork.core/reference/cssproperties/properties/css_prop_background) | **Supported** | Shorthand |
| [background-color](/paperwork.core/reference/cssproperties/properties/css_prop_background-color) | **Supported** | |
| [background-image](/paperwork.core/reference/cssproperties/properties/css_prop_background-image) | **Supported** | URL, `linear-gradient()`, `radial-gradient()`, `none` |
| [background-size](/paperwork.core/reference/cssproperties/properties/css_prop_background-size) | **Supported** | `cover`, `contain` (v9.3 improved), lengths, percentages |
| [background-position](/paperwork.core/reference/cssproperties/properties/css_prop_background-position) | **Supported** | Keywords, lengths, percentages |
| [background-position-x](/paperwork.core/reference/cssproperties/properties/css_prop_background-position-x) | **Supported** | |
| [background-position-y](/paperwork.core/reference/cssproperties/properties/css_prop_background-position-y) | **Supported** | |
| [background-repeat](/paperwork.core/reference/cssproperties/properties/css_prop_background-repeat) | **Supported** | `repeat`, `no-repeat`, `repeat-x`, `repeat-y` |

### Typography

| Property | Support | Notes |
|----------|---------|-------|
| [font](/paperwork.core/reference/cssproperties/properties/css_prop_font) | **Supported** | Shorthand |
| [font-family](/paperwork.core/reference/cssproperties/properties/css_prop_font-family) | **Supported** | System fonts, embedded fonts, Google Fonts via `@font-face` |
| [font-size](/paperwork.core/reference/cssproperties/properties/css_prop_font-size) | **Supported** | pt, px, em, %, named sizes |
| [font-style](/paperwork.core/reference/cssproperties/properties/css_prop_font-style) | **Supported** | `normal`, `italic`, `oblique` |
| [font-weight](/paperwork.core/reference/cssproperties/properties/css_prop_font-weight) | **Supported** | Named and numeric weights |
| [font-stretch](/paperwork.core/reference/cssproperties/properties/css_prop_font-stretch) | **No** | Parsed without error but has no effect; reserved for future enhancement |
| [text-align](/paperwork.core/reference/cssproperties/properties/css_prop_text-align) | **Supported** | `left`, `right`, `center`, `justify` |
| [text-decoration](/paperwork.core/reference/cssproperties/properties/css_prop_text-decoration) | **Supported** | Shorthand |
| [text-decoration-line](/paperwork.core/reference/cssproperties/properties/css_prop_text-decoration-line) | **Supported** | `underline`, `line-through`, `overline` |
| [letter-spacing](/paperwork.core/reference/cssproperties/properties/css_prop_letter-spacing) | **Supported** | |
| [word-spacing](/paperwork.core/reference/cssproperties/properties/css_prop_word-spacing) | **Supported** | |
| [line-height](/paperwork.core/reference/cssproperties/properties/css_prop_line-height) | **Supported** | |
| [white-space](/paperwork.core/reference/cssproperties/properties/css_prop_white-space) | **Supported** | `normal`, `pre`, `nowrap` |
| [vertical-align](/paperwork.core/reference/cssproperties/properties/css_prop_vertical-align) | **Supported** | `top`, `middle`, `bottom`, `baseline` |
| [hyphens](/paperwork.core/reference/cssproperties/properties/css_prop_hyphens) | **Supported** | `none`, `auto`, `manual` |
| [hyphenate-character](/paperwork.core/reference/cssproperties/properties/css_prop_hyphenate-character) | **Supported** | Custom hyphen character |
| [hyphenate-limit-chars](/paperwork.core/reference/cssproperties/properties/css_prop_hyphenate-limit-chars) | **Supported** | |

### Box Model

| Property | Support | Notes |
|----------|---------|-------|
| [width](/paperwork.core/reference/cssproperties/properties/css_prop_width) | **Supported** | pt, px, %, em |
| [height](/paperwork.core/reference/cssproperties/properties/css_prop_height) | **Supported** | |
| [min-width](/paperwork.core/reference/cssproperties/properties/css_prop_min-width) | **Supported** | |
| [max-width](/paperwork.core/reference/cssproperties/properties/css_prop_max-width) | **Supported** | |
| [min-height](/paperwork.core/reference/cssproperties/properties/css_prop_min-height) | **Supported** | |
| [max-height](/paperwork.core/reference/cssproperties/properties/css_prop_max-height) | **Supported** | |
| [margin](/paperwork.core/reference/cssproperties/properties/css_prop_margin) | **Supported** | Shorthand; all four sides |
| [margin-top/right/bottom/left](/paperwork.core/reference/cssproperties/properties/css_prop_margin-top) | **Supported** | Individual sides |
| [margin-inline](/paperwork.core/reference/cssproperties/properties/css_prop_margin-inline) | **Supported** | Logical properties |
| [margin-inline-start/end](/paperwork.core/reference/cssproperties/properties/css_prop_margin-inline-start) | **Supported** | |
| [padding](/paperwork.core/reference/cssproperties/properties/css_prop_padding) | **Supported** | Shorthand; all four sides |
| [padding-top/right/bottom/left](/paperwork.core/reference/cssproperties/properties/css_prop_padding-top) | **Supported** | Individual sides |
| [padding-inline](/paperwork.core/reference/cssproperties/properties/css_prop_padding-inline) | **Supported** | Logical properties |
| [padding-inline-start/end](/paperwork.core/reference/cssproperties/properties/css_prop_padding-inline-start) | **Supported** | |

### Borders

| Property | Support | Notes |
|----------|---------|-------|
| [border](/paperwork.core/reference/cssproperties/properties/css_prop_border) | **Supported** | Shorthand |
| [border-top/right/bottom/left](/paperwork.core/reference/cssproperties/properties/css_prop_border-top) | **Supported** | Side shorthand |
| [border-color/style/width](/paperwork.core/reference/cssproperties/properties/css_prop_border-color) | **Supported** | |
| [border-top/right/bottom/left-color/style/width](/paperwork.core/reference/cssproperties/properties/css_prop_border-top-color) | **Supported** | Individual side properties |
| [border-radius](/paperwork.core/reference/cssproperties/properties/css_prop_border-radius) | **Supported** | Includes per-column radius on multi-column layouts (v9.3) |

### Layout & Positioning

| Property | Support | Notes |
|----------|---------|-------|
| [display](/paperwork.core/reference/cssproperties/properties/css_prop_display) | **Partial** | `block`, `inline`, `none` fully supported; `flex` and `grid` initial support (v9.3); `table-*` initial support (v9.3) |
| [position](/paperwork.core/reference/cssproperties/properties/css_prop_position) | **Partial** | `static`, `relative`, `absolute` supported; `fixed` and `sticky` not applicable |
| [top/right/bottom/left](/paperwork.core/reference/cssproperties/properties/css_prop_top) | **Supported** | Used with `position` |
| [float](/paperwork.core/reference/cssproperties/properties/css_prop_float) | **Supported** | `left`, `right`, `none` |
| [overflow](/paperwork.core/reference/cssproperties/properties/css_prop_overflow) | **Supported** | |
| [overflow-x](/paperwork.core/reference/cssproperties/properties/css_prop_overflow-x) | **Supported** | |
| [overflow-y](/paperwork.core/reference/cssproperties/properties/css_prop_overflow-y) | **Supported** | |
| [transform](/paperwork.core/reference/cssproperties/properties/css_prop_transform) | **Supported** | `translate`, `rotate`, `scale`, `matrix` |
| `animation` / `transition` | **No** | PDF is a static format |
| [`z-index`](/paperwork.core/reference/cssproperties/properties/css_prop_z-index) | **Supported** | Integer or `auto`; controls stacking order of positioned elements |

### Flexbox

See the [Flexbox Layout](/paperwork.core/reference/cssproperties/properties/css_prop_flexbox) reference for full details and examples.

| Property | Support | Notes |
|----------|---------|-------|
| [`display: flex`](/paperwork.core/reference/cssproperties/properties/css_prop_flexbox) | **Partial** | Container and item properties supported; see [Flexbox Layout](/paperwork.core/reference/cssproperties/properties/css_prop_flexbox) |
| `display: inline-flex` | **No** | |
| `flex-direction` | **Supported** | `row`, `row-reverse`, `column`, `column-reverse` |
| `flex-wrap` | **Supported** | `nowrap`, `wrap`, `wrap-reverse` |
| `flex` | **Supported** | Shorthand for flex-grow, flex-shrink, flex-basis |
| `flex-grow` | **Supported** | |
| `flex-shrink` | **Supported** | |
| `flex-basis` | **Supported** | Lengths, percentages, `auto` |
| `justify-content` | **Supported** | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | **Supported** | `flex-start`, `flex-end`, `center`, `stretch`, `baseline` |
| `align-content` | **Supported** | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch` |
| `align-self` | **Supported** | Overrides `align-items` for an individual item |
| `order` | **Supported** | Integer; controls display order of flex items |

### Grid

See the [CSS Grid Layout](/paperwork.core/reference/cssproperties/properties/css_prop_grid) reference for full details and examples.

| Property | Support | Notes |
|----------|---------|-------|
| [`display: grid`](/paperwork.core/reference/cssproperties/properties/css_prop_grid) | **Partial** | Container and item properties supported; see [CSS Grid Layout](/paperwork.core/reference/cssproperties/properties/css_prop_grid) |
| [grid-template-columns](/paperwork.core/reference/cssproperties/properties/css_prop_grid-template-columns) | **Supported** | Lengths, fr units, percentages, `auto`, `repeat()`, `auto-fill`/`auto-fit` (v9.7) |
| [grid-template-rows](/paperwork.core/reference/cssproperties/properties/css_prop_grid-template-rows) | **Supported** | Same values as `grid-template-columns` |
| [grid-template-areas / grid-area](/paperwork.core/reference/cssproperties/properties/css_prop_grid-template-areas) | **Supported** | Named layout regions (v9.7) |
| [grid-auto-flow](/paperwork.core/reference/cssproperties/properties/css_prop_grid-auto-flow) | **Supported** | `row`, `column`, `dense` |
| [grid-auto-columns / grid-auto-rows](/paperwork.core/reference/cssproperties/properties/css_prop_grid-auto-tracks) | **Supported** | Size for implicitly created tracks |
| [grid-column / grid-row](/paperwork.core/reference/cssproperties/properties/css_prop_grid-placement) | **Supported** | Placement and spanning by line number |
| [Named grid lines](/paperwork.core/reference/cssproperties/properties/css_prop_grid-named-lines) | **Supported** | `[name]` bracket notation in track definitions (v9.7) |
| [gap / row-gap / column-gap](/paperwork.core/reference/cssproperties/properties/css_prop_grid-gap) | **Supported** | Gutters between tracks |
| [justify-content](/paperwork.core/reference/cssproperties/properties/css_prop_grid-justify-content) | **Supported** | Column track alignment (v9.7) |
| [align-content](/paperwork.core/reference/cssproperties/properties/css_prop_grid-align-content) | **Supported** | Row track alignment (v9.7) |

### Multi-Column Layout

| Property | Support | Notes |
|----------|---------|-------|
| [columns](/paperwork.core/reference/cssproperties/properties/css_prop_columns) | **Supported** | Shorthand |
| [column-count](/paperwork.core/reference/cssproperties/properties/css_prop_column-count) | **Supported** | |
| [column-width](/paperwork.core/reference/cssproperties/properties/css_prop_column-width) | **Supported** | |
| [column-gap](/paperwork.core/reference/cssproperties/properties/css_prop_column-gap) | **Supported** | |
| [column-fill](/paperwork.core/reference/cssproperties/properties/css_prop_column-fill) | **Supported** | `balance` and `balance-all` are equivalent |
| [column-span](/paperwork.core/reference/cssproperties/properties/css_prop_column-span) | **Supported** | |
| [column-rule](/paperwork.core/reference/cssproperties/properties/css_prop_column-rule) | **Supported** | Shorthand; v9.3 |
| [column-rule-color](/paperwork.core/reference/cssproperties/properties/css_prop_column-rule-color) | **Supported** | v9.3 |
| [column-rule-style](/paperwork.core/reference/cssproperties/properties/css_prop_column-rule-style) | **Supported** | v9.3 |
| [column-rule-width](/paperwork.core/reference/cssproperties/properties/css_prop_column-rule-width) | **Supported** | v9.3 |

### Page Breaks

| Property | Support | Notes |
|----------|---------|-------|
| [break-before](/paperwork.core/reference/cssproperties/properties/css_prop_break-before) | **Supported** | `auto`, `always`, `avoid`, `page`, `column`, `left`, `right` |
| [break-after](/paperwork.core/reference/cssproperties/properties/css_prop_break-after) | **Supported** | Same values as `break-before` |
| [break-inside](/paperwork.core/reference/cssproperties/properties/css_prop_break-inside) | **Supported** | `auto`, `avoid` |
| [page-break-before](/paperwork.core/reference/cssproperties/properties/css_prop_page-break-before) | **Supported** | Legacy CSS2 equivalent of `break-before` |
| [page-break-after](/paperwork.core/reference/cssproperties/properties/css_prop_page-break-after) | **Supported** | Legacy CSS2 equivalent of `break-after` |
| [page-break-inside](/paperwork.core/reference/cssproperties/properties/css_prop_page-break-inside) | **Supported** | Legacy CSS2 equivalent of `break-inside` |
| [page](/paperwork.core/reference/cssproperties/properties/css_prop_page) | **Supported** | Assigns element to a named `@page` rule |
| [size](/paperwork.core/reference/cssproperties/properties/css_prop_size) | **Supported** | Used within `@page`; standard sizes and custom dimensions |

### Content & Counters

| Property | Support | Notes |
|----------|---------|-------|
| [content](/paperwork.core/reference/cssproperties/properties/css_prop_content) | **Supported** | Used with `::before` / `::after`; supports `counter()` |
| [counter-reset](/paperwork.core/reference/cssproperties/properties/css_prop_counter-reset) | **Supported** | |
| [counter-increment](/paperwork.core/reference/cssproperties/properties/css_prop_counter-increment) | **Supported** | |

### Gradients (as background-image values)

| Function | Support | Notes |
|----------|---------|-------|
| [linear-gradient()](/paperwork.core/reference/cssproperties/properties/css_prop_linear-gradient) | **Supported** | Direction, angle, multiple stops |
| [radial-gradient()](/paperwork.core/reference/cssproperties/properties/css_prop_radial-gradient) | **Supported** | Centre point, multiple stops |
| [gradient-position](/paperwork.core/reference/cssproperties/properties/css_prop_gradient-position) | **Supported** | Scryber gradient position property |

### CSS Variables & Calc

| Feature | Support | Notes |
|---------|---------|-------|
| [`--custom-property`](/paperwork.core/reference/cssselectors/selectors/css_root_selector) + `:root` | **Supported** | Define and use CSS custom properties |
| [`var(--name)`](/paperwork.core/reference/binding/functions/var) | **Supported** | Reference CSS variables or bound property values, and all  [expression functions](feature_binding)  |
| [`calc()`](/paperwork.core/reference/binding/functions/calc) | **Supported** | Expressions support within css; mixed-unit expressions (e.g. `calc(50% - 5px)`) and all [expression functions](feature_binding) |

### List Marker Customisation (Scryber Extensions)

Will be converted to css3 list marker properties

| Property | Support | Notes |
|----------|---------|-------|
| [-pdf-li-align](/paperwork.core/reference/cssproperties/properties/css_prop_-pdf-li-align) | **Scryber** | Aligns the list item marker |
| [-pdf-li-concat](/paperwork.core/reference/cssproperties/properties/css_prop_-pdf-li-concat) | **Scryber** | Concatenate marker values |
| [-pdf-li-group](/paperwork.core/reference/cssproperties/properties/css_prop_-pdf-li-group) | **Scryber** | Groups counter levels |
| [-pdf-li-inset](/paperwork.core/reference/cssproperties/properties/css_prop_-pdf-li-inset) | **Scryber** | Marker inset distance |
| [-pdf-li-prefix](/paperwork.core/reference/cssproperties/properties/css_prop_-pdf-li-prefix) | **Scryber** | Text before the marker |
| [-pdf-li-postfix](/paperwork.core/reference/cssproperties/properties/css_prop_-pdf-li-postfix) | **Scryber** | Text after the marker |

### SVG Style Properties

These are valid CSS properties when styling SVG elements.

| Property | Support | Notes |
|----------|---------|-------|
| [fill](/paperwork.core/reference/cssproperties/properties/css_prop_fill) | **Supported** | Solid colours, gradients, patterns |
| [fill-opacity](/paperwork.core/reference/cssproperties/properties/css_prop_fill-opacity) | **Supported** | |
| [stroke](/paperwork.core/reference/cssproperties/properties/css_prop_stroke) | **Supported** | |
| [stroke-width](/paperwork.core/reference/cssproperties/properties/css_prop_stroke-width) | **Supported** | |
| [stroke-dasharray](/paperwork.core/reference/cssproperties/properties/css_prop_stroke-dasharray) | **Supported** | |
| [stroke-dashoffset](/paperwork.core/reference/cssproperties/properties/css_prop_stroke-dashoffset) | **Supported** | |
| [stroke-linecap](/paperwork.core/reference/cssproperties/properties/css_prop_stroke-linecap) | **Supported** | `butt`, `round`, `square` |
| [stroke-linejoin](/paperwork.core/reference/cssproperties/properties/css_prop_stroke-linejoin) | **Supported** | `miter`, `round`, `bevel` |
| [stroke-opacity](/paperwork.core/reference/cssproperties/properties/css_prop_stroke-opacity) | **Supported** | |
| [stop-color](/paperwork.core/reference/cssproperties/properties/css_prop_stop-color) | **Supported** | For gradient stops |
| [stop-opacity](/paperwork.core/reference/cssproperties/properties/css_prop_stop-opacity) | **Supported** | For gradient stops |
| [paint-order](/paperwork.core/reference/cssproperties/properties/css_prop_paint-order) | **Supported** | |
| [text-anchor](/paperwork.core/reference/cssproperties/properties/css_prop_text-anchor) | **Supported** | `start`, `middle`, `end` |
| [dominant-baseline](/paperwork.core/reference/cssproperties/properties/css_prop_dominant-baseline) | **Supported** | |

### Global Property Values

| Value | Support | Notes |
|-------|---------|-------|
| `initial`, `inherit`, `revert`, `unset` | **No** | Global keyword values are not supported; the property is ignored if one of these values is encountered |
| `!important` | **No** | The important prioritization is not currently supported, but is expected to be in the near future |

---

## See Also

- [CSS Properties Reference](/paperwork.core/reference/cssproperties/)
- [CSS Selectors Reference](/paperwork.core/reference/cssselectors/)
- [HTML Tags Support](/paperwork.core/quickstart/feature_html_tags)
- [SVG Drawing Support](/paperwork.core/quickstart/feature_svg)
- [Binding Expressions Support](/paperwork.core/quickstart/feature_binding)
