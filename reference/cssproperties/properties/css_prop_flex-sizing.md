---
layout: default
title: "flex [-grow|-shrink|-basis]"
parent: flex-*
parent_url: /reference/cssproperties/properties/css_prop_flexbox.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# flex [-grow|-shrink|-basis]
{: .no_toc }

These four properties control how flex items size themselves along the main axis relative to available free space. `flex` is a shorthand for the other three.

---

<details class='top-toc' markdown="block">
  <summary>On this page</summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## flex

Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis` in that order.

### Syntax

```css
selector {
    flex: <grow> <shrink> <basis>;
    flex: <number>;   /* sets grow; shrink defaults to 1, basis to 0 */
    flex: none;       /* 0 0 auto — item does not grow or shrink */
    flex: auto;       /* 1 1 auto — item grows and shrinks based on content */
}
```

### Common Patterns

| Declaration | Grow | Shrink | Basis | Effect |
|-------------|------|--------|-------|--------|
| `flex: 1` | 1 | 1 | 0 | All items share free space equally |
| `flex: 2` | 2 | 1 | 0 | Item gets twice as much free space as `flex: 1` items |
| `flex: none` | 0 | 0 | auto | Item stays at its natural size |
| `flex: auto` | 1 | 1 | auto | Item grows/shrinks from its natural size |
| `flex: 0 0 160pt` | 0 | 0 | 160pt | Fixed width, never grows or shrinks |

```css
.sidebar  { flex: 0 0 160pt; }  /* fixed 160pt, does not flex */
.main     { flex: 1; }          /* takes all remaining space */
.equal-a  { flex: 1; }
.equal-b  { flex: 1; }          /* equal-a and equal-b split space 50/50 */
.double   { flex: 2; }          /* takes twice the share of flex: 1 siblings */
```

---

## flex-grow

How much a flex item grows relative to its siblings when there is extra space in the container after all items are placed at their base size.

### Syntax

```css
selector { flex-grow: <number>; }   /* default: 0 */
```

A value of `0` means the item does not grow. Values are proportional — an item with `flex-grow: 2` receives twice the extra space of an item with `flex-grow: 1`.

```css
.no-grow  { flex-grow: 0; }  /* stays at its base size */
.grows    { flex-grow: 1; }  /* takes available free space */
.grows-2x { flex-grow: 2; }  /* takes twice as much free space */
```

---

## flex-shrink

How much a flex item shrinks relative to its siblings when the container is too small to fit all items at their base size. A value of `0` prevents shrinking entirely.

### Syntax

```css
selector { flex-shrink: <number>; }   /* default: 1 */
```

```css
.no-shrink { flex-shrink: 0; }   /* keeps its full base size even if container is too small */
.shrinks   { flex-shrink: 1; }   /* shrinks proportionally (default) */
```

Setting `flex-shrink: 0` is commonly paired with a fixed `flex-basis` to create items that never change size regardless of the container:

```css
.logo { flex: 0 0 80pt; }   /* fixed 80pt — shorthand for flex-shrink: 0 */
```

---

## flex-basis

The initial size of the item along the main axis before `flex-grow` and `flex-shrink` are applied.

### Syntax

```css
selector { flex-basis: auto | <length>; }   /* default: auto */
```

| Value | Description |
|-------|-------------|
| `auto` | Size comes from the item's own `width` (row) or `height` (column); falls back to content size |
| `<length>` | Fixed starting size: `pt`, `px`, `%`, `em`, etc. |
| `0` | Item starts at zero, so all space is distributed by `flex-grow` |

```css
.auto-size  { flex-basis: auto; }     /* size from content */
.fixed-base { flex-basis: 200pt; }    /* starts at 200pt */
.zero-base  { flex-basis: 0; flex-grow: 1; }  /* pure proportional sizing */
```

---

## Examples

### Equal-width columns

```html
<style>
    .row { display: flex; gap: 10pt; }
    .col { flex: 1; padding: 12pt; background-color: #f3f4f6; }
</style>
<div class="row">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
    <div class="col">Column 3</div>
</div>
```

### Fixed sidebar with flexible main

```html
<style>
    .layout { display: flex; gap: 20pt; }
    .sidebar { flex: 0 0 140pt; background-color: #f3f4f6; padding: 12pt; }
    .main    { flex: 1; padding: 12pt; }
</style>
<div class="layout">
    <div class="sidebar"><strong>Navigation</strong><p>Section 1</p><p>Section 2</p></div>
    <div class="main"><h2>Content</h2><p>Takes all remaining space.</p></div>
</div>
```

### Proportional columns (1:2:1)

```html
<style>
    .row    { display: flex; gap: 8pt; }
    .narrow { flex: 1; padding: 10pt; background-color: #fef9c3; }
    .wide   { flex: 2; padding: 10pt; background-color: #dbeafe; }
</style>
<div class="row">
    <div class="narrow">25%</div>
    <div class="wide">50%</div>
    <div class="narrow">25%</div>
</div>
```

---

## See Also

- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — flexbox overview
- [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) — which axis is the main axis
- [justify-content](/reference/cssproperties/properties/css_prop_flex-justify-content) — distribute remaining space between items
- [gap / row-gap / column-gap](/reference/cssproperties/properties/css_prop_flex-gap) — spacing between items

---
