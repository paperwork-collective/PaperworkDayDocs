---
layout: default
title: justify-content
parent: flex-*
parent_url: /reference/cssproperties/properties/css_prop_flexbox.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# justify-content — Flex
{: .no_toc }

Aligns flex items along the **main axis** (horizontal in `row`, vertical in `column`) after `flex-grow` and `flex-shrink` have been applied. It distributes remaining free space between and around items.

> **Grid context**: `justify-content` also applies to grid containers but aligns the column tracks rather than individual items. See [justify-content — Grid](/reference/cssproperties/properties/css_prop_grid-justify-content) for those details.

---

<details class='top-toc' markdown="block">
  <summary>On this page</summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Syntax

```css
selector {
    justify-content: flex-start | flex-end | center
                   | space-between | space-around | space-evenly;
}
```

---

## Values

| Value | Description |
|-------|-------------|
| `flex-start` | Items packed toward the start of the main axis (default) |
| `flex-end` | Items packed toward the end of the main axis |
| `center` | Items centred on the main axis |
| `space-between` | Equal gaps between items; no space at the container edges |
| `space-around` | Equal space on each side of every item (half-size at edges) |
| `space-evenly` | Equal space between all items and the container edges |

---

## Notes

### Only distributes free space

`justify-content` only takes effect when there is free space remaining on the main axis. If items have `flex-grow` values set and expand to fill the container, `justify-content` has no visual effect because there is no free space to distribute.

### Main axis depends on flex-direction

| flex-direction | justify-content axis |
|---------------|----------------------|
| `row` | horizontal (left-to-right) |
| `row-reverse` | horizontal (right-to-left) |
| `column` | vertical (top-to-bottom) |
| `column-reverse` | vertical (bottom-to-top) |

---

## Examples

### Space-between label row

```html
<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10pt;
        background-color: #1e3a8a;
        color: white;
    }
</style>
<div class="header">
    <span>Q3 Sales Report</span>
    <span>August 2026</span>
</div>
```

### Centred content

```html
<style>
    .centered {
        display: flex;
        justify-content: center;
        gap: 10pt;
        padding: 20pt;
    }
    .badge {
        padding: 6pt 16pt;
        background-color: #2563eb;
        color: white;
    }
</style>
<div class="centered">
    <div class="badge">Alpha</div>
    <div class="badge">Beta</div>
    <div class="badge">Gamma</div>
</div>
```

### space-evenly for metric row

```html
<style>
    .metrics {
        display: flex;
        justify-content: space-evenly;
        padding: 15pt;
        border: 1pt solid #e5e7eb;
    }
    .metric { text-align: center; }
    .value  { font-size: 18pt; font-weight: bold; color: #16a34a; }
    .label  { font-size: 9pt; color: #6b7280; }
</style>
<div class="metrics">
    <div class="metric"><div class="value">142</div><div class="label">Leads</div></div>
    <div class="metric"><div class="value">38</div><div class="label">Converted</div></div>
    <div class="metric"><div class="value">26%</div><div class="label">Growth</div></div>
</div>
```

### Column direction: vertical centering

```html
<style>
    .box {
        display: flex;
        flex-direction: column;
        justify-content: center;   /* vertically centred in column layout */
        height: 150pt;
        border: 1pt solid #d1d5db;
        padding: 10pt;
    }
</style>
<div class="box">
    <h3>Centred Title</h3>
    <p>Vertically centred in a fixed-height column flex container.</p>
</div>
```

---

## See Also

- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — flexbox overview
- [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) — sets which axis `justify-content` controls
- [align-items / align-self / align-content](/reference/cssproperties/properties/css_prop_flex-align) — cross-axis alignment
- [flex / flex-grow / flex-shrink / flex-basis](/reference/cssproperties/properties/css_prop_flex-sizing) — item sizing (grows affect free space)
- [justify-content — Grid](/reference/cssproperties/properties/css_prop_grid-justify-content) — same property in grid context

---
