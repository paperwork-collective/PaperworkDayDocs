---
layout: default
title: colgroup
parent: HTML Elements
parent_url: /reference/htmltags/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# &lt;colgroup&gt; : The Column Group Element <span class="label label-green">v9.7</span>
{: .no_toc }

The `<colgroup>` element groups one or more columns in a `<table>` and applies shared styling or width to them. It is placed inside `<table>` before `<thead>`, `<tbody>`, or `<tr>`.

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

Place `<colgroup>` as the first child of `<table>`, before any row groups. Each `<colgroup>` can contain `<col>` children to define individual columns, or use the `span` attribute to apply uniform styling to a consecutive range of columns.

```html
<table width="100%">
    <colgroup>
        <col style="width: 80pt;" />
        <col style="width: 1fr;" />
        <col style="width: 80pt;" />
    </colgroup>
    <tr>
        <td>ID</td>
        <td>Description</td>
        <td>Total</td>
    </tr>
</table>
```

---

## Supported Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier for the element. |
| `class` | string | CSS class name(s) for styling. |
| `style` | string | Inline CSS styles applied to all columns in the group. |
| `span` | integer | Number of columns this group covers (when no `<col>` children are present). Default: 1. |

---

## Notes

### With `<col>` children

When a `<colgroup>` contains `<col>` elements, each `<col>` controls one column. The `<colgroup>` itself acts as a container and any styles on it apply to the group as a whole:

```html
<table width="100%">
    <colgroup class="data-columns">
        <col style="width: 40pt;" />          <!-- column 1 -->
        <col style="width: 1fr;" />            <!-- column 2 -->
        <col style="width: 60pt;" />          <!-- column 3 -->
        <col style="width: 60pt;" />          <!-- column 4 -->
    </colgroup>
    <thead>...</thead>
    <tbody>...</tbody>
</table>
```

### With `span` (no `<col>` children)

When a `<colgroup>` has a `span` attribute and no children, it applies its style to that many consecutive columns:

```html
<table width="100%">
    <colgroup span="1" style="width: 120pt;" />       <!-- first column: 120pt -->
    <colgroup span="3" style="width: 1fr;" />         <!-- next 3 columns: flexible -->
    <tr>
        <td>Label</td>
        <td>Value A</td>
        <td>Value B</td>
        <td>Value C</td>
    </tr>
</table>
```

### Column widths

Column widths can be set via `style="width:..."` on `<col>` or `<colgroup>`. Supported units include fixed lengths (`pt`, `px`, `mm`, etc.), percentages (`%`), and fractional units (`fr`):

```html
<colgroup>
    <col style="width: 100pt;" />   <!-- fixed 100pt -->
    <col style="width: 20%;" />     <!-- 20% of table width -->
    <col style="width: 1fr;" />     <!-- takes remaining space -->
</colgroup>
```

Column widths set here take precedence over implicit sizing from cell content, making them reliable for table layouts where you need consistent column proportions regardless of content length.

### Background colours

`background-color` applied to a `<colgroup>` or `<col>` sets the background for all cells in those columns:

```html
<table width="100%">
    <colgroup>
        <col style="width: 120pt; background-color: #f3f4f6;" />
        <col style="width: 1fr;" />
        <col style="width: 80pt; background-color: #dbeafe;" />
    </colgroup>
    <tr>
        <td>Category</td>
        <td>Description</td>
        <td>Amount</td>
    </tr>
</table>
```

### Not currently supported

- **Hiding columns**: Setting `visibility: hidden` or `display: none` on a `<col>` or `<colgroup>` to collapse an entire column is not currently supported.

---

## Examples

### Invoice column widths

```html
<table width="100%" style="border-collapse: collapse;">
    <colgroup>
        <col style="width: 1fr;" />       <!-- description -->
        <col style="width: 40pt;" />      <!-- qty -->
        <col style="width: 70pt;" />      <!-- unit price -->
        <col style="width: 80pt;" />      <!-- total -->
    </colgroup>
    <thead>
        <tr style="background-color: #1e3a8a; color: white;">
            <th style="padding: 8pt;">Description</th>
            <th style="padding: 8pt; text-align: right;">Qty</th>
            <th style="padding: 8pt; text-align: right;">Unit</th>
            <th style="padding: 8pt; text-align: right;">Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 6pt; border-bottom: 1pt solid #e5e7eb;">Consulting</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">8</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">£850</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">£6,800</td>
        </tr>
    </tbody>
</table>
```

### Striped column groups

```html
<table width="100%" style="border-collapse: collapse;">
    <colgroup>
        <col style="width: 150pt;" />
        <col style="width: 80pt; background-color: #f0f9ff;" />
        <col style="width: 80pt;" />
        <col style="width: 80pt; background-color: #f0f9ff;" />
    </colgroup>
    <tr>
        <th style="padding: 8pt;">Product</th>
        <th style="padding: 8pt; text-align: right;">Q1</th>
        <th style="padding: 8pt; text-align: right;">Q2</th>
        <th style="padding: 8pt; text-align: right;">Q3</th>
    </tr>
    <tr>
        <td style="padding: 6pt;">Widget A</td>
        <td style="padding: 6pt; text-align: right;">1,200</td>
        <td style="padding: 6pt; text-align: right;">1,450</td>
        <td style="padding: 6pt; text-align: right;">1,380</td>
    </tr>
</table>
```

### Data-bound table with fixed column structure

{% raw %}
```html
<table width="100%" style="border-collapse: collapse;">
    <colgroup>
        <col style="width: 30pt;" />
        <col style="width: 1fr;" />
        <col style="width: 80pt;" />
        <col style="width: 60pt;" />
    </colgroup>
    <thead>
        <tr style="background-color: #374151; color: white;">
            <th style="padding: 8pt;">#</th>
            <th style="padding: 8pt;">Name</th>
            <th style="padding: 8pt; text-align: right;">Amount</th>
            <th style="padding: 8pt; text-align: center;">Status</th>
        </tr>
    </thead>
    <tbody>
        {{#each model.items}}
        <tr>
            <td style="padding: 6pt; border-bottom: 1pt solid #e5e7eb;">{{@index + 1}}</td>
            <td style="padding: 6pt; border-bottom: 1pt solid #e5e7eb;">{{this.name}}</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">{{format(this.amount, 'C2')}}</td>
            <td style="padding: 6pt; text-align: center; border-bottom: 1pt solid #e5e7eb;">{{this.status}}</td>
        </tr>
        {{/each}}
    </tbody>
</table>
```
{% endraw %}

---

## See Also

- [col](/reference/htmltags/elements/html_col_element) — individual column element
- [table](/reference/htmltags/elements/html_table_element) — table element
- [width and height](/reference/htmlattributes/attributes/attr_width_height) — width attribute reference

---
