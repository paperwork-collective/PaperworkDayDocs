---
layout: default
title: Flexbox Layout
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# Flexbox Layout <span class="label label-yellow">Beta</span>
{: .no_toc }

Flexbox is a one-dimensional layout model that arranges children along a main axis (row or column) with control over alignment, spacing, and sizing. Apply `display: flex` to a container to enable it.

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

### display

| Value | Support | Notes |
|-------|---------|-------|
| `flex` | **Supported** | Enables flex layout for the element's children |
| `inline-flex` | **No** | |

```css
.row { display: flex; }
```

---

### flex-direction

Sets the main axis along which children are arranged.

| Value | Description |
|-------|-------------|
| `row` | Children laid out left to right (default) |
| `row-reverse` | Children laid out right to left |
| `column` | Children stacked top to bottom |
| `column-reverse` | Children stacked bottom to top |

```css
.vertical { display: flex; flex-direction: column; }
```

---

### flex-wrap

Controls whether children wrap to a new line when they overflow the container.

| Value | Description |
|-------|-------------|
| `nowrap` | All children on one line; may overflow (default) |
| `wrap` | Children wrap to additional lines |
| `wrap-reverse` | Children wrap in the reverse direction |

```css
.wrapping { display: flex; flex-wrap: wrap; }
```

---

### justify-content

Aligns children along the **main axis** (horizontal for `row`, vertical for `column`).

| Value | Description |
|-------|-------------|
| `flex-start` | Children packed to the start (default) |
| `flex-end` | Children packed to the end |
| `center` | Children centred on the main axis |
| `space-between` | Equal gaps between children; none at edges |
| `space-around` | Equal gaps around each child |
| `space-evenly` | Equal gaps between children and edges |

```css
.spread { display: flex; justify-content: space-between; }
```

---

### align-items

Aligns children along the **cross axis** (vertical for `row`, horizontal for `column`).

| Value | Description |
|-------|-------------|
| `stretch` | Children stretched to fill the container's cross axis (default) |
| `flex-start` | Children aligned to the start of the cross axis |
| `flex-end` | Children aligned to the end of the cross axis |
| `center` | Children centred on the cross axis |
| `baseline` | Children aligned by their text baseline |

```css
.centered { display: flex; align-items: center; }
```

---

### align-content

Aligns **rows of wrapped content** along the cross axis. Only applies when `flex-wrap: wrap` is set and there is more than one line.

| Value | Description |
|-------|-------------|
| `flex-start` | Lines packed to the start |
| `flex-end` | Lines packed to the end |
| `center` | Lines centred |
| `space-between` | Equal gaps between lines |
| `space-around` | Equal gaps around each line |
| `stretch` | Lines stretched to fill the container |

```css
.multi { display: flex; flex-wrap: wrap; align-content: flex-start; }
```

---

### gap / column-gap / row-gap

Sets spacing between flex items. `gap` is shorthand for both axes.

```css
.spaced { display: flex; gap: 10pt; }
.spaced { display: flex; column-gap: 10pt; row-gap: 6pt; }
```

---

## Item Properties

These properties are set on **flex items** (the direct children of a flex container).

### flex

Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`. The most common form is a single number (sets `flex-grow`; `flex-shrink` defaults to 1, `flex-basis` to 0).

| Value | Meaning |
|-------|---------|
| `<number>` | Sets flex-grow; e.g. `flex: 1` |
| `none` | `flex: 0 0 auto` — item does not grow or shrink |
| `auto` | `flex: 1 1 auto` — item grows and shrinks based on its content |
| `<grow> <shrink> <basis>` | All three values explicitly |

```css
.item     { flex: 1; }       /* all items share space equally */
.sidebar  { flex: 0 0 160pt; }  /* fixed-width, no grow/shrink */
.main     { flex: 1; }       /* takes all remaining space */
```

---

### flex-grow

How much a flex item grows relative to siblings when there is extra space. `0` means the item does not grow.

```css
.grow-2 { flex-grow: 2; }   /* takes twice the extra space of flex-grow: 1 items */
```

---

### flex-shrink

How much a flex item shrinks relative to siblings when the container is too small. `0` prevents shrinking.

```css
.no-shrink { flex-shrink: 0; }
```

---

### flex-basis

The initial size of the item along the main axis before free space is distributed.

| Value | Description |
|-------|-------------|
| `auto` | Size is based on the item's own width/height (default) |
| `<length>` | Fixed initial size: `pt`, `px`, `%`, `em`, etc. |

```css
.base-100 { flex-basis: 100pt; }
```

---

### align-self

Overrides the container's `align-items` value for an individual item.

| Value | Description |
|-------|-------------|
| `auto` | Inherits from the container's `align-items` (default) |
| `flex-start` | Aligned to the start of the cross axis |
| `flex-end` | Aligned to the end of the cross axis |
| `center` | Centred on the cross axis |
| `stretch` | Stretched to fill the cross axis |
| `baseline` | Aligned by text baseline |

```css
.special { align-self: flex-end; }
```

---

### order

Controls the display order of the item within its container. Items with lower `order` values appear first. Accepts any integer, including negative values.

```css
.first { order: -1; }
.last  { order: 99; }
```

---

## Examples

### Example 1: Horizontal metric row

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

### Example 2: Fixed sidebar + flexible content

```html
<style>
    .layout {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 20pt;
    }
    .sidebar {
        flex: 0 0 120pt;
        background-color: #f3f4f6;
        padding: 12pt;
        border: 1pt solid #d1d5db;
    }
    .content { flex: 1; }
</style>
<div class="layout">
    <div class="sidebar"><p><strong>Navigation</strong></p><p>Section 1</p><p>Section 2</p></div>
    <div class="content"><h2>Main Content</h2><p>This area takes all remaining width.</p></div>
</div>
```

### Example 3: Wrapped card grid

```html
<style>
    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 12pt;
    }
    .card {
        flex: 0 0 calc(50% - 6pt);
        padding: 12pt;
        border: 1pt solid #e5e7eb;
        background-color: white;
    }
</style>
<div class="cards">
    <div class="card"><h3>Card A</h3><p>Content here.</p></div>
    <div class="card"><h3>Card B</h3><p>Content here.</p></div>
    <div class="card"><h3>Card C</h3><p>Content here.</p></div>
    <div class="card"><h3>Card D</h3><p>Content here.</p></div>
</div>
```

### Example 4: Data-bound flex row

{% raw %}
```html
<style>
    .bar-row {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 8pt;
        height: 120pt;
    }
    .bar-col { display: flex; flex-direction: column; align-items: center; }
    .bar { background-color: #2563eb; width: 30pt; }
    .bar-label { font-size: 8pt; color: #6b7280; margin-top: 4pt; }
</style>
<var data-id="maxVal" data-value="{{maxOf(model.data, .value)}}" />
<div class="bar-row">
    {{#each model.data}}
    <var data-id="barH" data-value="{{(this.value / maxVal) * 100}}" />
    <div class="bar-col">
        <div class="bar" style="height: {{barH}}pt;"></div>
        <div class="bar-label">{{this.label}}</div>
    </div>
    {{/each}}
</div>
```
{% endraw %}

---

## See Also

- [display](/reference/cssproperties/properties/css_prop_display) — set `flex` display mode
- [CSS Grid Layout](/reference/cssproperties/properties/css_prop_grid) — two-dimensional grid layout
- [gap](/reference/cssproperties/properties/css_prop_column-gap) — spacing between items
- [CSS Styles Support](/quickstart/feature_css_styles) — full support chart

---
