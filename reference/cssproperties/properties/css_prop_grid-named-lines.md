---
layout: default
title: grid line names
parent: grid-*
parent_url: /reference/cssproperties/properties/css_prop_grid.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# grid line names <span class="label label-green">v9.7</span>
{: .no_toc }

Grid line names are placed inside square brackets `[name]` within `grid-template-columns` or `grid-template-rows` track definitions. Items can then reference those names in `grid-column` and `grid-row` instead of numeric line numbers, making complex layouts more readable and easier to maintain.

---

<details class='top-toc' markdown="block">
  <summary>On this page</summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Syntax

### Naming lines in track definitions

```css
.grid {
    display: grid;
    grid-template-columns: [sidebar-start] 160pt [sidebar-end content-start] 1fr [content-end];
    grid-template-rows: [header-start] auto [header-end body-start] 1fr [body-end footer-start] auto [footer-end];
}
```

- Place `[name]` before a track to name the line before that track
- Place `[name]` after the last track to name the trailing edge
- A single line can have **multiple names**: `[sidebar-end content-start]`

### Placing items using named lines

```css
.sidebar  { grid-column: sidebar-start / sidebar-end; }
.content  { grid-column: content-start / content-end; }
.header   { grid-row: header-start / header-end; }
```

Or use `span` with a named line:

```css
.content { grid-column: content-start / span 1; }
```

---

## Notes

### Names vs numbers

Both name and number references resolve to the same lines. `grid-column: 1 / 2` and `grid-column: sidebar-start / sidebar-end` (when that's the first line) are equivalent.

### Automatic `-start` / `-end` suffix with named areas

When you use `grid-template-areas`, the engine automatically creates named lines with `-start` and `-end` suffixes for each area. For example:

```css
grid-template-areas: "header header" "sidebar content";
/* Creates: header-start, header-end, sidebar-start, sidebar-end, content-start, content-end */
```

You can then reference these auto-generated names in `grid-column` / `grid-row`.

### repeat() with named lines

Named lines inside `repeat()` get a numeric suffix for each repetition:

```css
grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
/* Creates: col-start 1, col-end 1, col-start 2, col-end 2, col-start 3, col-end 3 */
```

Place an item at the second repetition: `grid-column: col-start 2 / col-end 2`

---

## Examples

### Named sidebar + content layout

```html
<style>
    .page {
        display: grid;
        grid-template-columns:
            [sidebar-start] 160pt [sidebar-end content-start] 1fr [content-end];
        grid-template-rows:
            [header-start] auto [header-end main-start] 1fr [main-end];
        gap: 12pt;
    }
    .header  {
        grid-column: sidebar-start / content-end;   /* full width */
        grid-row: header-start / header-end;
        background-color: #1e3a8a; color: white; padding: 15pt;
    }
    .sidebar {
        grid-column: sidebar-start / sidebar-end;
        grid-row: main-start / main-end;
        background-color: #f3f4f6; padding: 12pt;
    }
    .content {
        grid-column: content-start / content-end;
        grid-row: main-start / main-end;
        padding: 12pt;
    }
</style>
<div class="page">
    <div class="header">Report Header</div>
    <div class="sidebar">Navigation</div>
    <div class="content">Main Content</div>
</div>
```

### Named lines with repeat()

```html
<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(4, [col] 1fr);
        gap: 8pt;
    }
    /* Place item from col 2 to col 4 (columns 2 and 3) */
    .span-middle {
        grid-column: col 2 / col 4;
        background-color: #dbeafe;
        padding: 10pt;
    }
    .item { padding: 10pt; background-color: #f3f4f6; border: 1pt solid #d1d5db; }
</style>
<div class="grid">
    <div class="item">Col 1</div>
    <div class="span-middle">Cols 2–3 (named lines)</div>
    <div class="item">Col 4</div>
</div>
```

---

## See Also

- [grid-*](/reference/cssproperties/properties/css_prop_grid) — grid overview
- [grid-template-columns](/reference/cssproperties/properties/css_prop_grid-template-columns) — define column tracks where names are placed
- [grid-template-rows](/reference/cssproperties/properties/css_prop_grid-template-rows) — define row tracks where names are placed
- [grid-column / grid-row](/reference/cssproperties/properties/css_prop_grid-placement) — placement using line numbers or names
- [grid-template-areas / grid-area](/reference/cssproperties/properties/css_prop_grid-template-areas) — named region placement (auto-generates named lines)

---
