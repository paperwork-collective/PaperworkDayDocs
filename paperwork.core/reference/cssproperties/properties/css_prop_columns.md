---
layout: default
title: columns
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# columns : Multi-Column Shorthand Property
{: .no_toc }

The `columns` shorthand sets `column-width` and `column-count` together for multi-column flow. Use it when you want compact, readable configuration for column-based content sections.

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
    columns: <column-width> <column-count>;
}
```

Common patterns:

```css
.content { columns: 2; }            /* count only */
.content { columns: 180pt; }        /* width only */
.content { columns: 180pt 3; }      /* width + count */
.content { columns: auto 2; }       /* explicit count */
.content { columns: 200pt auto; }   /* explicit width */
```

---

## Supported Values

- `<integer>` for `column-count`
- `<length>` for `column-width`
- `auto` for either side of the shorthand

When both width and count are provided, the renderer resolves final layout from available width, `column-gap`, and content flow.

---

## Supported Elements

The `columns` property can be applied to:
- Block containers (`div`, `section`, `article`)
- Page/body content regions
- Nested layout containers inside cards/sections

---

## Notes

- `columns` is shorthand for `column-width` and `column-count`
- Works best with `column-gap` for readability
- Add `column-rule` or `column-rule-*` when a divider line is needed
- Use `column-span: all` for section headings across all columns
- Use `break-inside: avoid` on callouts/cards to reduce awkward splits

---

## Examples

### Example 1: Two-column article

```html
<style>
    .article {
        columns: 2;
        column-gap: 20pt;
        text-align: justify;
        line-height: 1.6;
    }
    .article h2 {
        column-span: all;
        margin-top: 0;
    }
</style>
<div class="article">
    <h2>Quarterly Review</h2>
    <p>Long-form report content flows through columns...</p>
</div>
```

### Example 2: Width-first layout

```css
.newsletter {
    columns: 170pt auto;
    column-gap: 16pt;
}
```

### Example 3: Data-bound shorthand

{% raw %}
```html
<div style="columns: {{layout.columnWidth}}pt {{layout.columnCount}};
            column-gap: {{layout.columnGap}}pt;">
    <p>{{bodyText}}</p>
</div>
```
{% endraw %}
