---
layout: default
title: z-index
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# z-index : Stacking Order Property
{: .no_toc }

The `z-index` property sets the stacking order of a positioned element. Elements with a higher `z-index` appear in front of those with a lower value when they overlap.

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

## Usage

```css
selector {
    position: absolute;   /* or relative */
    z-index: <integer>;
}
```

---

## Supported Values

| Value | Description |
|-------|-------------|
| `auto` | The element uses the stacking context of its parent. Treated as `0`. |
| `<integer>` | An explicit stack level. Higher values appear in front. Negative values are allowed. |

---

## Supported Elements

`z-index` only applies to elements with `position: relative` or `position: absolute`. It has no effect on elements with `position: static` (the default).

---

## Notes

- Elements with `position: absolute` are lifted out of the normal flow and stack above flow content by default; `z-index` lets you control the relative order among multiple positioned elements.
- A `z-index` of `0` and `auto` behave identically in most cases — the element participates in its parent stacking context at level 0.
- Negative `z-index` values place an element behind its stacking context, which can be used to draw backgrounds that sit below siblings.
- `z-index` does not create a new stacking context on its own in Scryber — it controls ordering within the existing context.

---

## Examples

### Example 1: Overlapping absolute elements

```html
<style>
    .container {
        position: relative;
        width: 300pt;
        height: 200pt;
    }
    .back {
        position: absolute;
        top: 20pt;
        left: 20pt;
        width: 200pt;
        height: 150pt;
        background-color: #dbeafe;
        border: 1pt solid #2563eb;
        z-index: 1;
    }
    .front {
        position: absolute;
        top: 60pt;
        left: 80pt;
        width: 180pt;
        height: 100pt;
        background-color: #fef9c3;
        border: 1pt solid #ca8a04;
        z-index: 2;
    }
</style>
<div class="container">
    <div class="back"><p>Behind (z-index: 1)</p></div>
    <div class="front"><p>In front (z-index: 2)</p></div>
</div>
```

### Example 2: Watermark behind content

```html
<style>
    .page-wrapper {
        position: relative;
    }
    .watermark {
        position: absolute;
        top: 150pt;
        left: 100pt;
        width: 300pt;
        font-size: 48pt;
        font-weight: bold;
        color: #e5e7eb;
        text-align: center;
        z-index: -1;
    }
    .content {
        position: relative;
        z-index: 1;
    }
</style>
<div class="page-wrapper">
    <div class="watermark">DRAFT</div>
    <div class="content">
        <h1>Report Title</h1>
        <p>This content appears in front of the watermark.</p>
    </div>
</div>
```

### Example 3: Data-bound z-index

{% raw %}
```html
<style>
    .layer {
        position: absolute;
        width: 150pt;
        height: 100pt;
    }
</style>
{{#each model.layers}}
<div class="layer"
     style="top: {{this.top}}pt; left: {{this.left}}pt;
            background-color: {{this.color}};
            z-index: {{this.order}};">
    <p>{{this.label}}</p>
</div>
{{/each}}
```
{% endraw %}

---

## See Also

- [position](/reference/cssproperties/properties/css_prop_position) — required for z-index to have effect
- [display](/reference/cssproperties/properties/css_prop_display) — layout mode
- [top / left / right / bottom](/reference/cssproperties/properties/css_prop_top) — position offsets

---
