---
layout: default
title: flex-*
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: true
has_toc: false
---

# Flexbox Layout
{: .no_toc }

Flexbox is a one-dimensional layout model that arranges children along a main axis (row or column) with control over alignment, spacing, and sizing. Apply `display: flex` to a container to enable it.

For two-dimensional grid layouts see [grid-*](/reference/cssproperties/properties/css_prop_grid).

---

## Quick Start

```css
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10pt;
}
```

---

## Container Properties

These properties are set on the **flex container** (the element with `display: flex`).

| Property | Summary | Page |
|----------|---------|------|
| `display: flex` | Enables flex layout | this page |
| `flex-direction` | Sets the main axis: `row`, `column`, and reverse variants | [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) |
| `flex-wrap` | Whether items wrap to new lines: `nowrap`, `wrap`, `wrap-reverse` | [flex-wrap](/reference/cssproperties/properties/css_prop_flex-wrap) |
| `justify-content` | Aligns items along the main axis | [justify-content](/reference/cssproperties/properties/css_prop_flex-justify-content) |
| `align-items` | Aligns items along the cross axis | [align-items](/reference/cssproperties/properties/css_prop_flex-align) |
| `align-content` | Aligns wrapped rows along the cross axis | [align-content](/reference/cssproperties/properties/css_prop_flex-align) |
| `gap` / `row-gap` / `column-gap` | Space between items | [gap](/reference/cssproperties/properties/css_prop_flex-gap) |

---

## Item Properties

These properties are set on **flex items** (direct children of the flex container).

| Property | Summary | Page |
|----------|---------|------|
| `flex` | Shorthand for grow, shrink, and basis | [flex / flex-grow / flex-shrink / flex-basis](/reference/cssproperties/properties/css_prop_flex-sizing) |
| `flex-grow` | How much an item grows relative to siblings | [flex / flex-grow / flex-shrink / flex-basis](/reference/cssproperties/properties/css_prop_flex-sizing) |
| `flex-shrink` | How much an item shrinks when space is limited | [flex / flex-grow / flex-shrink / flex-basis](/reference/cssproperties/properties/css_prop_flex-sizing) |
| `flex-basis` | Initial size before free space is distributed | [flex / flex-grow / flex-shrink / flex-basis](/reference/cssproperties/properties/css_prop_flex-sizing) |
| `align-self` | Overrides `align-items` for this item | [align-items / align-self / align-content](/reference/cssproperties/properties/css_prop_flex-align) |
| `order` | Controls display order within the container | [order](/reference/cssproperties/properties/css_prop_flex-order) |

---

## Enabling Flex Layout

```css
.row    { display: flex; }                /* horizontal flex container */
.column { display: flex; flex-direction: column; }  /* vertical flex container */
```

| Value | Support |
|-------|---------|
| `flex` | **Supported** |
| `inline-flex` | Not supported |

---

## Examples

### Horizontal metric row

```html
<style>
    .metrics {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        gap: 12pt;
    }
    .metric {
        flex: 1;
        text-align: center;
        padding: 15pt;
        background-color: #f0fdf4;
        border: 1pt solid #16a34a;
    }
    .value { font-size: 22pt; font-weight: bold; color: #15803d; }
    .label { font-size: 9pt; color: #6b7280; }
</style>
<div class="metrics">
    <div class="metric"><div class="value">142</div><div class="label">Leads</div></div>
    <div class="metric"><div class="value">38</div><div class="label">Converted</div></div>
    <div class="metric"><div class="value">£12.4K</div><div class="label">Revenue</div></div>
    <div class="metric"><div class="value">26%</div><div class="label">Growth</div></div>
</div>
```

### Fixed sidebar + flexible content

```html
<style>
    .layout { display: flex; gap: 20pt; }
    .sidebar { flex: 0 0 120pt; background-color: #f3f4f6; padding: 12pt; }
    .content { flex: 1; }
</style>
<div class="layout">
    <div class="sidebar"><strong>Navigation</strong></div>
    <div class="content"><h2>Main Content</h2><p>Takes all remaining width.</p></div>
</div>
```

---

## See Also

- [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) — main axis direction
- [flex-wrap](/reference/cssproperties/properties/css_prop_flex-wrap) — line wrapping
- [flex / flex-grow / flex-shrink / flex-basis](/reference/cssproperties/properties/css_prop_flex-sizing) — item sizing
- [justify-content](/reference/cssproperties/properties/css_prop_flex-justify-content) — main axis alignment
- [align-items / align-self / align-content](/reference/cssproperties/properties/css_prop_flex-align) — cross axis alignment
- [gap / row-gap / column-gap](/reference/cssproperties/properties/css_prop_flex-gap) — item spacing
- [order](/reference/cssproperties/properties/css_prop_flex-order) — display order
- [grid-*](/reference/cssproperties/properties/css_prop_grid) — two-dimensional grid layout
- [display](/reference/cssproperties/properties/css_prop_display) — enable flex with `display: flex`

---
