---
layout: default
title: order
parent: flex-*
parent_url: /reference/cssproperties/properties/css_prop_flexbox.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# order — Flex
{: .no_toc }

Controls the visual order in which a flex item appears within its container, independently of its position in the HTML source. Items with lower `order` values appear first. All items default to `order: 0`.

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
    order: <integer>;   /* default: 0 */
}
```

Accepts any integer (including negative values). Items are displayed in ascending order — lower values appear first.

---

## Values

| Value | Effect |
|-------|--------|
| `0` | Default — items appear in source order relative to other `order: 0` items |
| Negative integer | Item moves before all `order: 0` items |
| Positive integer | Item moves after all `order: 0` items |

When two items share the same `order` value, they are displayed in source order relative to each other.

---

## Notes

### Visual order only

`order` changes only the rendered position of the item in the output PDF. The template source order is unchanged — elements are still parsed and bound in their original sequence. When data binding or variable references depend on document flow, keep that in mind when reordering items visually.

### Relationship to flex-direction reverse

`flex-direction: row-reverse` and `column-reverse` also affect visual order. `order` can be combined with reverse directions for fine-grained control.

### Scryber support

The engine implements `order` to match the CSS flex specification. Visual reordering works consistently with PDF output.

---

## Examples

### Priority item first

Move a high-priority badge to the start regardless of where it appears in the HTML:

```html
<style>
    .list {
        display: flex;
        gap: 10pt;
        flex-wrap: wrap;
    }
    .item    { padding: 8pt 12pt; background-color: #f3f4f6; border: 1pt solid #d1d5db; }
    .urgent  { order: -1; background-color: #fee2e2; border-color: #ef4444; }
</style>
<div class="list">
    <div class="item">Task A</div>
    <div class="item">Task B</div>
    <div class="item urgent">URGENT: Task C</div>
    <div class="item">Task D</div>
</div>
<!-- Displays: URGENT: Task C | Task A | Task B | Task D -->
```

### Custom column order

Reorder a three-column layout so the content column appears first in the template source but the sidebar renders on the left in the PDF:

```html
<style>
    .layout {
        display: flex;
        gap: 16pt;
    }
    .sidebar  { flex: 0 0 140pt; order: 1; background-color: #f9fafb; padding: 12pt; }
    .content  { flex: 1;         order: 2; padding: 12pt; }
    .aside    { flex: 0 0 120pt; order: 3; background-color: #f9fafb; padding: 12pt; }
</style>
<div class="layout">
    <!-- Source order: content first for readability -->
    <div class="content"><h2>Main Content</h2><p>Primary reading material.</p></div>
    <div class="sidebar"><strong>Navigation</strong><p>Links here.</p></div>
    <div class="aside"><strong>Notes</strong><p>Supplementary.</p></div>
</div>
```

### Footer pinned to end

```html
<style>
    .page-stack {
        display: flex;
        flex-direction: column;
        min-height: 600pt;
    }
    .header  { order: 1; padding: 15pt; background-color: #1e3a8a; color: white; }
    .content { order: 2; flex: 1; padding: 20pt; }
    .footer  { order: 3; padding: 12pt; background-color: #f3f4f6; font-size: 9pt; }
</style>
<div class="page-stack">
    <div class="header">Report Title</div>
    <div class="content">Body content here.</div>
    <div class="footer">Page footer — confidential</div>
</div>
```

---

## See Also

- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — flexbox overview
- [flex-direction](/reference/cssproperties/properties/css_prop_flex-direction) — `row-reverse` / `column-reverse` for whole-container reordering
- [align-self](/reference/cssproperties/properties/css_prop_flex-align) — per-item cross-axis alignment override

---
