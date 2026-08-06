---
layout: default
title: flex-wrap
parent: flex-*
parent_url: /reference/cssproperties/properties/css_prop_flexbox.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# flex-wrap
{: .no_toc }

Controls whether flex items stay on a single line or wrap onto additional lines when they overflow the container. When wrapping is enabled, each line is treated as a new flex sub-container for alignment purposes.

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
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

---

## Values

| Value | Description |
|-------|-------------|
| `nowrap` | All items on one line; may overflow the container (default) |
| `wrap` | Items wrap onto additional lines in the cross-axis direction |
| `wrap-reverse` | Items wrap, but new lines appear in the opposite cross-axis direction |

---

## Notes

### Interaction with align-content

When wrapping produces more than one line, `align-content` controls how the lines are distributed along the cross axis. `align-items` still controls individual item cross-axis alignment within each line.

### Item sizing with wrap

When items wrap, each item's `flex-basis` (or `width` / `height` if no basis is set) determines the threshold at which wrapping occurs. Setting `flex-wrap: wrap` alongside `flex-basis: 50%` produces a consistent two-column layout regardless of item count.

### wrap-reverse

`wrap-reverse` is visually identical to `wrap` but subsequent lines appear on the opposite side of the container. In a `row` direction container, the second line appears above the first.

---

## Examples

### Two-column card grid

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
        background-color: #f9fafb;
    }
</style>
<div class="cards">
    <div class="card"><h3>Card A</h3><p>Content here.</p></div>
    <div class="card"><h3>Card B</h3><p>Content here.</p></div>
    <div class="card"><h3>Card C</h3><p>Content here.</p></div>
    <div class="card"><h3>Card D</h3><p>Content here.</p></div>
</div>
```

### Wrapping tags row

```html
<style>
    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6pt;
    }
    .tag {
        padding: 3pt 10pt;
        background-color: #dbeafe;
        color: #1e40af;
        border: 1pt solid #93c5fd;
        font-size: 9pt;
    }
</style>
<div class="tags">
    <div class="tag">Design</div>
    <div class="tag">Development</div>
    <div class="tag">Marketing</div>
    <div class="tag">Analytics</div>
    <div class="tag">Operations</div>
</div>
```

---

## See Also

- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — flexbox overview
- [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) — main axis direction
- [align-items / align-self / align-content](/reference/cssproperties/properties/css_prop_flex-align) — cross-axis and multi-line alignment
- [flex / flex-grow / flex-shrink / flex-basis](/reference/cssproperties/properties/css_prop_flex-sizing) — item sizing

---
