---
layout: default
title: col
parent: HTML Elements
parent_url: /reference/htmltags/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# &lt;col&gt; : The Column Element <span class="label label-green">v9.7</span>
{: .no_toc }

The `<col>` element defines properties for a single column in a `<table>`. It is always a child of a `<colgroup>` element. Use `<col>` to set column widths, background colours, and other styling without adding attributes to every cell in the column.

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

`<col>` elements are void elements (self-closing) placed inside a `<colgroup>`:

```html
<table width="100%">
    <colgroup>
        <col style="width: 80pt;" />   <!-- first column -->
        <col style="width: 1fr;" />    <!-- second column -->
        <col style="width: 60pt;" />   <!-- third column -->
    </colgroup>
    <tr>
        <td>Label</td>
        <td>Description</td>
        <td>Value</td>
    </tr>
</table>
```

---

## Supported Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier for the element. |
| `class` | string | CSS class name(s) for styling. |
| `style` | string | Inline CSS styles applied to the column (width, background-color, etc.). |
| `span` | integer | Number of consecutive columns this `<col>` covers. Default: 1. |
| `width` | length | Column width. Supports `pt`, `px`, `%`, `fr`, and other CSS length units. |

---

## Notes

### Setting column width

Column width can be set via the `width` attribute or via `style="width:..."`. The `style` approach supports all CSS units including `fr` for fractional sizing:

```html
<colgroup>
    <!-- width attribute -->
    <col width="120pt" />

    <!-- style attribute (supports fr) -->
    <col style="width: 1fr;" />

    <!-- percentage -->
    <col style="width: 25%;" />
</colgroup>
```

When a `<col>` specifies a width, it overrides the implicit sizing that would otherwise come from cell content. This is useful for tables where you want consistent column proportions regardless of how much text cells contain.

### Spanning multiple columns

The `span` attribute causes a single `<col>` element to apply to multiple consecutive columns:

```html
<colgroup>
    <col style="width: 100pt;" />          <!-- first column: 100pt -->
    <col span="3" style="width: 1fr;" />   <!-- next 3 columns: flexible -->
</colgroup>
```

### Background colour

Apply `background-color` to a `<col>` to shade all cells in that column:

```html
<colgroup>
    <col style="width: 150pt;" />
    <col style="width: 80pt; background-color: #fef9c3;" />   <!-- highlighted column -->
    <col style="width: 80pt;" />
    <col style="width: 80pt; background-color: #fef9c3;" />   /* alternate highlight */
</colgroup>
```

### Relationship to cell styles

Styles applied via `<col>` have lower specificity than styles applied directly to `<td>` or `<th>` elements. A cell with an explicit `style="background-color:..."` will override the column's background.

### Not currently supported

- **Hiding columns**: Setting `visibility: hidden` or `display: none` on a `<col>` to collapse an entire column is not currently supported.

---

## Examples

### Fixed-width label column with flexible content column

```html
<table width="100%" style="border-collapse: collapse;">
    <colgroup>
        <col style="width: 120pt; background-color: #f9fafb;" />
        <col style="width: 1fr;" />
    </colgroup>
    <tr>
        <td style="padding: 8pt; border: 1pt solid #e5e7eb; font-weight: bold;">Company</td>
        <td style="padding: 8pt; border: 1pt solid #e5e7eb;">Acme Corporation</td>
    </tr>
    <tr>
        <td style="padding: 8pt; border: 1pt solid #e5e7eb; font-weight: bold;">Address</td>
        <td style="padding: 8pt; border: 1pt solid #e5e7eb;">123 Business Park</td>
    </tr>
    <tr>
        <td style="padding: 8pt; border: 1pt solid #e5e7eb; font-weight: bold;">Contact</td>
        <td style="padding: 8pt; border: 1pt solid #e5e7eb;">info@acme.example</td>
    </tr>
</table>
```

### Financial table with aligned columns

```html
<table width="100%" style="border-collapse: collapse;">
    <colgroup>
        <col style="width: 1fr;" />              <!-- description -->
        <col style="width: 80pt;" />             <!-- this year -->
        <col style="width: 80pt;" />             <!-- last year -->
        <col style="width: 70pt;" />             <!-- change -->
    </colgroup>
    <thead>
        <tr style="background-color: #1e3a8a; color: white;">
            <th style="padding: 8pt; text-align: left;">Metric</th>
            <th style="padding: 8pt; text-align: right;">2024</th>
            <th style="padding: 8pt; text-align: right;">2023</th>
            <th style="padding: 8pt; text-align: right;">Change</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 6pt; border-bottom: 1pt solid #e5e7eb;">Revenue</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">£2.4M</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">£2.1M</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb; color: #16a34a;">+14%</td>
        </tr>
        <tr>
            <td style="padding: 6pt; border-bottom: 1pt solid #e5e7eb;">Costs</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">£1.6M</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb;">£1.5M</td>
            <td style="padding: 6pt; text-align: right; border-bottom: 1pt solid #e5e7eb; color: #dc2626;">+7%</td>
        </tr>
    </tbody>
</table>
```

### Span — uniform sizing for data columns

```html
<table width="100%" style="border-collapse: collapse;">
    <colgroup>
        <col style="width: 150pt;" />            <!-- header column -->
        <col span="4" style="width: 70pt;" />    <!-- 4 data columns, equal width -->
    </colgroup>
    <tr>
        <th style="padding: 8pt;">Region</th>
        <th style="padding: 8pt; text-align: right;">Q1</th>
        <th style="padding: 8pt; text-align: right;">Q2</th>
        <th style="padding: 8pt; text-align: right;">Q3</th>
        <th style="padding: 8pt; text-align: right;">Q4</th>
    </tr>
    <tr>
        <td style="padding: 6pt;">North</td>
        <td style="padding: 6pt; text-align: right;">320</td>
        <td style="padding: 6pt; text-align: right;">410</td>
        <td style="padding: 6pt; text-align: right;">390</td>
        <td style="padding: 6pt; text-align: right;">480</td>
    </tr>
</table>
```

---

## See Also

- [colgroup](/reference/htmltags/elements/html_colgroup_element) — column group container
- [table](/reference/htmltags/elements/html_table_element) — table element
- [width and height](/reference/htmlattributes/attributes/attr_width_height) — width attribute reference

---
