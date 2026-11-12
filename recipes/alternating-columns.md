---
layout: default
render_with_liquid: false
title: Style alternating columns
parent: Recipes
parent_url: /recipes/
nav_order: 2
has_children: false
has_toc: false
description: "Shade or colour every other column of a table in a Paperwork template with the nth-child selector."
---
# Style alternating columns
{: .no_toc }

## What you'll do

Style the odd and even columns of a table differently, so a wide table is easier to read across.

## Before you start

- A template with a table, and a way to make documents from it: the [Designer](/paperwork.design/) preview, or the [CLI](/paperwork.cli/).
- This recipe uses `sales.html` and `sales.json`: sales by region for four quarters. They are in [Paperwork.Samples](https://github.com/paperwork-collective/Paperwork.Samples/tree/main/recipes/alternating-columns). ⚑

## Steps

**1. Write the table.** The first column holds the region and the next four hold the quarters. The rows come from the data:

```html
<table>
  <thead>
    <tr><th>Region</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr>
  </thead>
  <tbody>
    {{#each sales.regions}}
    <tr>
      <td>{{this.name}}</td>
      <td>{{format(this.q1, 'N0')}}</td>
      <td>{{format(this.q2, 'N0')}}</td>
      <td>{{format(this.q3, 'N0')}}</td>
      <td>{{format(this.q4, 'N0')}}</td>
    </tr>
    {{/each}}
  </tbody>
</table>
```

**2. Style the columns with `:nth-child`.** `odd` is the first, third and fifth cell of each row, and `even` is the second and fourth:

```css
th:nth-child(odd), td:nth-child(odd)   { background-color: #eef2f7; }
th:nth-child(even), td:nth-child(even) { background-color: #ffffff; }
td:nth-child(even) { color: #1d4ed8; }
```

The selector goes on the cells, because a column is not an element of its own. Put the rule on both `th` and `td` so the heading follows the same pattern.

**3. Make the document.**

```bash
paperwork generate --layout sales.html --data sales=sales.json --output sales.pdf
```

## Check it worked

The Region column and the Q2 and Q4 columns are shaded. The Q1 and Q3 numbers are blue.

To shade every other row instead, use `tr:nth-child(even)`.

The whole layout, `sales.html`:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Sales by quarter</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: Helvetica, Arial, sans-serif; font-size: 11pt; color: #1f2937; }
    h1 { font-size: 20pt; margin: 0 0 12pt 0; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 7pt 8pt; text-align: right; }
    th:first-child, td:first-child { text-align: left; }
    thead th { border-bottom: 1.5pt solid #1f2937; }

    /* Every odd column is shaded, every even column is left plain */
    th:nth-child(odd), td:nth-child(odd) { background-color: #eef2f7; }
    th:nth-child(even), td:nth-child(even) { background-color: #ffffff; }

    /* A different colour for the numbers in the even columns */
    td:nth-child(even) { color: #1d4ed8; }
  </style>
</head>
<body>
  <h1>Sales by quarter, {{sales.year}}</h1>
  <table>
    <thead>
      <tr><th>Region</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr>
    </thead>
    <tbody>
      {{#each sales.regions}}
      <tr>
        <td>{{this.name}}</td>
        <td>{{format(this.q1, 'N0')}}</td>
        <td>{{format(this.q2, 'N0')}}</td>
        <td>{{format(this.q3, 'N0')}}</td>
        <td>{{format(this.q4, 'N0')}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
</body>
</html>
```

The data, `sales.json`:

```json
{
  "year": 2026,
  "regions": [
    { "name": "North", "q1": 12400, "q2": 13850, "q3": 12990, "q4": 15200 },
    { "name": "South", "q1": 9800, "q2": 10450, "q3": 11020, "q4": 11780 },
    { "name": "East", "q1": 14300, "q2": 13900, "q3": 15100, "q4": 16050 },
    { "name": "West", "q1": 8700, "q2": 9300, "q3": 9950, "q4": 10400 }
  ]
}
```

## Next

- [`:nth-child` and the other selectors](/paperwork.core/reference/cssselectors/).
- [Data and fields](/data-and-fields/).
