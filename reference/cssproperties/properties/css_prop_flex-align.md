---
layout: default
title: "align-items|-self|-content"
parent: flex-*
parent_url: /reference/cssproperties/properties/css_prop_flexbox.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# align-items|-self|-content — Flex
{: .no_toc }

These three properties control alignment along the **cross axis** (perpendicular to `flex-direction`). `align-items` sets the default for all items, `align-self` overrides it for a single item, and `align-content` distributes space between wrapped lines.

> **Grid context**: `align-content` also applies to grid containers, aligning row tracks within the container. See [align-content — Grid](/reference/cssproperties/properties/css_prop_grid-align-content) for those details.

---

<details class='top-toc' markdown="block">
  <summary>On this page</summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## align-items

Set on the **flex container**. Controls how all items are aligned along the cross axis within their line.

### Syntax

```css
selector {
    align-items: stretch | flex-start | flex-end | center | baseline;
}
```

### Values

| Value | Description |
|-------|-------------|
| `stretch` | Items stretched to fill the container's cross dimension (default) |
| `flex-start` | Items aligned to the start of the cross axis |
| `flex-end` | Items aligned to the end of the cross axis |
| `center` | Items centred on the cross axis |
| `baseline` | Items aligned by their first text baseline |

### Cross axis direction

| flex-direction | cross axis | align-items controls |
|---------------|------------|----------------------|
| `row` | vertical | top / bottom / height of items |
| `column` | horizontal | left / right / width of items |

---

## align-self

Set on a **flex item**. Overrides the container's `align-items` value for that individual item only.

### Syntax

```css
selector {
    align-self: auto | stretch | flex-start | flex-end | center | baseline;
}
```

| Value | Description |
|-------|-------------|
| `auto` | Inherits from the container's `align-items` (default) |
| All other values | Same as `align-items` — applies to this item only |

---

## align-content

Set on the **flex container**. Controls how **multiple lines** of wrapped content are distributed along the cross axis. Has no effect when `flex-wrap: nowrap` or when there is only one line.

### Syntax

```css
selector {
    align-content: flex-start | flex-end | center
                 | space-between | space-around | stretch;
}
```

### Values

| Value | Description |
|-------|-------------|
| `flex-start` | Lines packed toward the start of the cross axis (default) |
| `flex-end` | Lines packed toward the end of the cross axis |
| `center` | Lines centred on the cross axis |
| `space-between` | Equal gaps between lines; none at edges |
| `space-around` | Equal space around each line (half-size at edges) |
| `stretch` | Lines stretched to fill the container |

---

## Examples

### Vertically centred row (align-items: center)

```html
<style>
    .row {
        display: flex;
        align-items: center;
        gap: 12pt;
        padding: 10pt;
        border: 1pt solid #e5e7eb;
    }
    .icon  { width: 30pt; height: 30pt; background-color: #2563eb; }
    .label { font-size: 14pt; }
</style>
<div class="row">
    <div class="icon"></div>
    <div class="label">Item with centred icon</div>
</div>
```

### Mixed alignment with align-self

```html
<style>
    .bar {
        display: flex;
        align-items: flex-start;
        gap: 10pt;
        padding: 10pt;
        height: 80pt;
        border: 1pt solid #e5e7eb;
    }
    .top    { align-self: flex-start; padding: 6pt; background-color: #dbeafe; }
    .middle { align-self: center;     padding: 6pt; background-color: #d1fae5; }
    .bottom { align-self: flex-end;   padding: 6pt; background-color: #fef9c3; }
</style>
<div class="bar">
    <div class="top">Top</div>
    <div class="middle">Middle</div>
    <div class="bottom">Bottom</div>
</div>
```

### Multi-line alignment with align-content

```html
<style>
    .board {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        gap: 8pt;
        height: 200pt;        /* fixed height required for align-content to work */
        border: 1pt solid #e5e7eb;
        padding: 8pt;
    }
    .tile {
        flex: 0 0 calc(33% - 4pt);
        padding: 10pt;
        background-color: #f3f4f6;
        border: 1pt solid #d1d5db;
    }
</style>
<div class="board">
    <div class="tile">A</div>
    <div class="tile">B</div>
    <div class="tile">C</div>
    <div class="tile">D</div>
    <div class="tile">E</div>
    <div class="tile">F</div>
</div>
```

### Baseline alignment

```html
<style>
    .text-row {
        display: flex;
        align-items: baseline;
        gap: 8pt;
    }
    .large { font-size: 24pt; }
    .small { font-size: 10pt; color: #6b7280; }
</style>
<div class="text-row">
    <span class="large">Revenue</span>
    <span class="small">FY 2026</span>
</div>
```

---

## See Also

- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — flexbox overview
- [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) — sets which axis `align-items` controls
- [flex-wrap](/reference/cssproperties/properties/css_prop_flex-wrap) — wrapping (required for `align-content`)
- [justify-content](/reference/cssproperties/properties/css_prop_flex-justify-content) — main-axis alignment
- [align-content — Grid](/reference/cssproperties/properties/css_prop_grid-align-content) — same property in grid context

---
