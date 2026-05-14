---
layout: default
title: column-fill
parent: CSS Properties
parent_url: /reference/cssproperties/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# column-fill : Column Fill Property
{: .no_toc }

The `column-fill` property controls how content is distributed across columns in a multi-column container.

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
    column-fill: balance | balance-all | auto;
}
```

---

## Supported Values

| Value | Description |
|-------|-------------|
| `balance` | Distributes content equally across all columns, shrinking the container to the minimum height needed. |
| `balance-all` | Alias for `balance` — both are treated identically. |
| `auto` | Fills columns sequentially; earlier columns are fuller and later columns may be shorter or empty. |

---

## Supported Elements

The `column-fill` property can be applied to any block container with an active multi-column layout set via `columns`, `column-count`, or `column-width`.

---

## Notes

- Has effect only when multi-column layout is enabled on the element.
- `balance` and `balance-all` are equivalent — use whichever reads more clearly.
- Balanced layout supports inline text, block images, and floated elements within columns.
- Use `auto` when preserving source-order column fill is preferred (e.g. a sidebar layout where the first column must be full).
- Pair with `column-gap` and `column-rule` for production-ready columns.

---

## Examples

### Example 1: Balanced two-column article

```css
.article {
    columns: 2;
    column-gap: 20pt;
    column-fill: balance;
}
```

### Example 2: Sequential fill

```css
.appendix {
    column-count: 3;
    column-gap: 16pt;
    column-fill: auto;
}
```

### Example 3: Balanced columns with a float

```html
<div style="column-count: 2; column-gap: 10pt; column-fill: balance;">
    <p>Introductory text that flows into the first column...</p>
    <div style="float: left; width: 60pt; height: 40pt; background: #336699;"></div>
    <p>Text that wraps around the float, then continues in the second balanced column.</p>
</div>
```

### Example 4: Data-bound fill mode

{% raw %}
```html
<div style="column-count: {{layout.columns}};
            column-gap: {{layout.gap}}pt;
            column-fill: {{layout.fillMode}};">
    <p>{{content}}</p>
</div>
```
{% endraw %}
