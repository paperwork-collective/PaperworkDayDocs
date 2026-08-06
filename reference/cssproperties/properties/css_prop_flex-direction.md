---
layout: default
title: flex-direction
parent: flex-*
parent_url: /reference/cssproperties/properties/css_prop_flexbox.html
grand_parent: CSS Properties
grand_parent_url: /reference/cssproperties/
has_children: false
has_toc: false
---

# flex-direction
{: .no_toc }

Sets the **main axis** along which flex items are arranged. Changing `flex-direction` also reverses the meaning of `justify-content` and `align-items` — the main axis is always the one `flex-direction` defines.

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
    flex-direction: row | row-reverse | column | column-reverse;
}
```

---

## Values

| Value | Main axis | Item order |
|-------|-----------|------------|
| `row` | Left → right | Source order (default) |
| `row-reverse` | Right → left | Reversed |
| `column` | Top → bottom | Source order |
| `column-reverse` | Bottom → top | Reversed |

When `flex-direction` is `row` or `row-reverse`, the **cross axis** runs vertically (controlled by `align-items`).  
When `flex-direction` is `column` or `column-reverse`, the **cross axis** runs horizontally.

---

## Notes

### Effect on justify-content and align-items

`justify-content` always aligns on the **main axis**, and `align-items` always aligns on the **cross axis**. Swapping between `row` and `column` swaps which dimension each property controls:

| flex-direction | justify-content controls | align-items controls |
|---------------|--------------------------|----------------------|
| `row` | horizontal | vertical |
| `column` | vertical | horizontal |

### Reverse values

`row-reverse` and `column-reverse` reverse the rendered order in the PDF without changing the template source order. This is useful when you want an element to appear at the end visually (e.g. a trailing badge or date) but want it defined first in the template for data-binding or structural reasons.

---

## Examples

### Vertical stack (column)

```html
<style>
    .stack {
        display: flex;
        flex-direction: column;
        gap: 8pt;
    }
    .item {
        padding: 10pt;
        background-color: #f3f4f6;
        border: 1pt solid #d1d5db;
    }
</style>
<div class="stack">
    <div class="item">Header</div>
    <div class="item">Content</div>
    <div class="item">Footer</div>
</div>
```

### Horizontal row with reversed order

```html
<style>
    .reversed {
        display: flex;
        flex-direction: row-reverse;
        gap: 10pt;
    }
    .badge {
        padding: 6pt 12pt;
        background-color: #2563eb;
        color: white;
        font-weight: bold;
    }
</style>
<div class="reversed">
    <div class="badge">Last</div>
    <div class="badge">Middle</div>
    <div class="badge">First</div>
</div>
<!-- Displays: First | Middle | Last (reversed from source order) -->
```

### Label aligned to end using column-reverse

```html
<style>
    .field {
        display: flex;
        flex-direction: column-reverse;
        gap: 4pt;
    }
</style>
<div class="field">
    <input type="text" />
    <label>Name</label>  <!-- appears above the input visually -->
</div>
```

---

## See Also

- [flex-*](/reference/cssproperties/properties/css_prop_flexbox) — flexbox overview
- [justify-content](/reference/cssproperties/properties/css_prop_flex-justify-content) — main-axis alignment
- [align-items / align-self / align-content](/reference/cssproperties/properties/css_prop_flex-align) — cross-axis alignment
- [flex-wrap](/reference/cssproperties/properties/css_prop_flex-wrap) — wrapping behaviour

---
