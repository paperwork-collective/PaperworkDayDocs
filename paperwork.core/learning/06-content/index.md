---
layout: default
title: Content Components
nav_order: 6
parent: Learning Guides
parent_url: /paperwork.core/learning/
has_children: true
has_toc: false
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Content Components

Master images, SVG graphics, lists, tables, and embedded content to create rich, data-driven PDF documents.

---

## Table of Contents

1. [Images](01_images.html) - Formats, sizing, positioning, local/remote, data binding
2. [SVG Basics](02_svg_basics.html) - SVG overview, inline vs files, sizing
3. [SVG Drawing](03_svg_drawing.html) - Shapes, paths, styling, data binding, charts
4. [Lists](04_lists.html) - Ordered/unordered lists, styling, nesting, data binding
5. [Tables - Basics](05_tables_basics.html) - Structure, styling, borders, column widths
6. [Tables - Advanced](06_tables_advanced.html) - Dynamic data, calculations, spanning, page breaks
7. [Attachments & Embedded Content](07_attachments_embedded.html) - File attachments, embed/iframe
8. [Content Best Practices](08_content_best_practices.html) - Optimization, performance, accessibility

---

## Overview

Content components are the building blocks of engaging PDF documents. This series teaches you how to work with images, create dynamic SVG graphics, structure data in tables, format lists, and embed external content for modular document composition.

## What Content Can You Include?

Scryber supports a rich variety of content types:

- **Images** - PNG, JPEG, GIF, and SVG from local or remote sources
- **SVG Graphics** - Scalable vector graphics for charts, diagrams, and icons
- **Tables** - Structured data with headers, footers, and data binding
- **Lists** - Ordered, unordered, and definition lists
- **Attachments** - Embed files within the PDF
- **External Content** - Include content from other files

## Quick Example





{% raw %}
```html
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
1. [Images](01_images.html) - Formats, sizing, positioning, local/remote, data binding
2. [SVG Basics](02_svg_basics.html) - SVG overview, inline vs files, sizing
3. [SVG Drawing](03_svg_drawing.html) - Shapes, paths, styling, data binding, charts
4. [Lists](04_lists.html) - Ordered/unordered lists, styling, nesting, data binding
5. [Tables - Basics](05_tables_basics.html) - Structure, styling, borders, column widths
6. [Tables - Advanced](06_tables_advanced.html) - Dynamic data, calculations, spanning, page breaks
7. [Attachments & Embedded Content](07_attachments_embedded.html) - File attachments, embed/iframe
8. [Content Best Practices](08_content_best_practices.html) - Optimization, performance, accessibility
    <style>
        img {
            max-width: 100%;
### 1. [Images](01_images.html)
        }
### 2. [SVG Basics](02_svg_basics.html)
        }
### 3. [SVG Drawing](03_svg_drawing.html)
        <rect x="100" y="{{calc(200 -  sales.q2)}}"
### 4. [Lists](04_lists.html)
            <tr>
### 5. [Tables - Basics](05_tables_basics.html)
                <td>${{this.revenue}}</td>
### 6. [Tables - Advanced](06_tables_advanced.html)

### 7. [Attachments & Embedded Content](07_attachments_embedded.html)
- SVG positioning and styling
### 8. [Content Best Practices](08_content_best_practices.html)
- Ordered lists (ol) and unordered lists (ul)
- List styling and custom markers
- Nested lists
Ready to master content components? Start with [Images](01_images.html) to learn about image handling and optimization.
- Definition lists
Jump to specific topics:
- [SVG Drawing](03_svg_drawing.html) for data-driven graphics
- [Tables - Advanced](06_tables_advanced.html) for dynamic tables
- [Attachments & Embedded Content](07_attachments_embedded.html) for file embedding
- Table structure (thead, tbody, tfoot)
**Begin with content components →** [Images](01_images.html)
- Rows and columns
- Table borders and styling
- Cell spacing, padding, and alignment
- Column widths and groups

### 6. [Tables - Advanced](06_tables_advanced.html)
- **Dynamic table rows with data binding**
- Template binding in tables
- **Calculated columns**
- Spanning cells (colspan, rowspan)
- Repeating headers on pages
- Table page breaks

### 7. [Attachments & Embedded Content](07_attachments_embedded.html)
- File attachments (object element)
- Attachment icons and styling
- Embedding files in PDFs
- Data-bound attachments
- Embed and iframe elements
- Content inclusion and modular documents

### 8. [Content Best Practices](08_content_best_practices.html)
- Performance optimization
- Image and SVG optimization
- Table performance
- Accessibility considerations
- Common patterns and troubleshooting

## Prerequisites

Before starting this series:

- **Complete [Getting Started](/paperwork.core/learning/01-getting-started/)** - Basic Scryber knowledge
- **Review [Data Binding](/paperwork.core/learning/02-data-binding/)** - For dynamic content
- **Review [Styling](/paperwork.core/learning/03-styling/)** - For content styling

## Key Concepts

### Image Sources

```html
{% endraw %}



<!-- Local file -->
<img src="./images/logo.png" />

<!-- Remote URL -->
<img src="https://example.com/image.jpg" />

<!-- Data binding -->
<img src="{{product.imageUrl}}" />

<!-- Base64 embedded -->
<img src="data:image/png;base64,iVBORw0KG..." />

```

### SVG Inline vs External

**Inline SVG** - Full control and data binding:




```html
<svg width="200" height="200">
    <circle cx="100" cy="100" r="{{radius}}" fill="blue" />
</svg>

```




**External SVG** - Reusable graphics:
```html
<img src="./graphics/chart.svg" />
```

### Table Structure

```html
<table>
    <thead>
        <!-- Column headers (repeats on each page) -->
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <!-- Data rows -->
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
    <tfoot>
        <!-- Table footer -->
        <tr>
            <td>Total</td>
            <td>Sum</td>
        </tr>
    </tfoot>
</table>
```

## Dynamic Content with Data Binding

### Dynamic Images




{% raw %}
```html
{{#each products}}
<div class="product">
    <img src="{{this.imageUrl}}"
         alt="{{this.name}}"
         style="width: 100pt; height: 100pt;" />
    <h3>{{this.name}}</h3>
    <p>{{this.description}}</p>
</div>
{{/each}}

```
{% endraw %}




### Data-Driven SVG Charts





{% raw %}
```html
<svg width="500" height="300">
    {{#each dataPoints}}
    <rect x="{{calc(@index *  50)}}"
          y="{{calc(300 -  this.value)}}"
          width="40"
          height="{{this.value}}"
          fill="#3b82f6" />
    <text x="{{calc(@index *  50 +  20)}}"
          y="290"
          text-anchor="middle">
        {{this.label}}
    </text>
    {{/each}}
</svg>

```
{% endraw %}




### Dynamic Tables with Calculations





{% raw %}
```html
<table>
    <thead>
        <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        {{#each items}}
        <tr>
            <td>{{this.name}}</td>
            <td>{{this.quantity}}</td>
            <td>${{this.price}}</td>
            <td>${{this.quantity *  this.price}}</td>
        </tr>
        {{/each}}
    </tbody>
</table>

```
{% endraw %}




## Real-World Examples

### Product Catalog





{% raw %}
```html
<div class="catalog">
    {{#each products}}
    <div class="product-card" style="page-break-inside: avoid;">
        <img src="{{this.imageUrl}}"
             style="width: 200pt; height: 200pt; object-fit: cover;" />

        <h3>{{this.name}}</h3>
        <p>{{this.description}}</p>

        <ul>
            {{#each this.features}}
            <li>{{this}}</li>
            {{/each}}
        </ul>

        <p class="price">${{this.price}}</p>
    </div>
    {{/each}}
</div>

```
{% endraw %}




### Data Dashboard





{% raw %}
```html
<div class="dashboard">
    <h1>Sales Dashboard - {{reportDate}}</h1>

    <!-- KPI Cards with SVG Icons -->
    <div class="kpi-grid">
        <div class="kpi-card">
            <svg width="50" height="50">
                <circle cx="25" cy="25" r="20" fill="#10b981" />
                <text x="25" y="30" text-anchor="middle" fill="white">$</text>
            </svg>
            <h3>Total Revenue</h3>
            <p class="kpi-value">${{totalRevenue}}</p>
        </div>
    </div>

    <!-- Bar Chart -->
    <svg width="600" height="400">
        <text x="300" y="20" text-anchor="middle" font-size="16pt">
            Quarterly Sales
        </text>

        {{#each quarters}}
        <rect x="{{calc(@index *  150 +  50)}}"
              y="{{calc(350 -  this.sales)}}"
              width="100"
              height="{{this.sales}}"
              fill="#3b82f6" />

        <text x="{{calc(@index *  150 +  100)}}"
              y="370"
              text-anchor="middle">
            Q{{@index +  1}}
        </text>

        <text x="{{calc(@index *  150 +  100)}}"
              y="{{calc(350 -  this.sales -  10)}}"
              text-anchor="middle">
            ${{this.sales}}
        </text>
        {{/each}}
    </svg>

    <!-- Data Table -->
    <table>
        <thead>
            <tr>
                <th>Region</th>
                <th>Sales</th>
                <th>Growth</th>
            </tr>
        </thead>
        <tbody>
            {{#each regions}}
            <tr>
                <td>{{this.name}}</td>
                <td>${{this.sales}}</td>
                <td style="color: {{if(this.growth > 0, 'green', 'red')}}">
                    {{this.growth}}%
                </td>
            </tr>
            {{/each}}
        </tbody>
    </table>
</div>

```
{% endraw %}




### Invoice with Attachments





{% raw %}
```html
<div class="invoice">
    <img src="{{company.logo}}" style="width: 150pt;" />

    <h1>Invoice #{{invoice.number}}</h1>

    <table class="invoice-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {{#each invoice.items}}
            <tr>
                <td>{{this.description}}</td>
                <td>{{this.quantity}}</td>
                <td>${{this.price}}</td>
                <td>${{this.quantity *  this.price}}</td>
            </tr>
            {{/each}}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3"><strong>Total</strong></td>
                <td><strong>${{invoice.total}}</strong></td>
            </tr>
        </tfoot>
    </table>

    <!-- Attach receipt -->
    {{#if invoice.receiptPath}}
    <div class="attachment">
        <object id="receipt"
                data-file="{{invoice.receiptPath}}"
                type="application/attachment"
                data-icon="PaperClip"></object>
        <a href="#receipt">View Receipt</a>
    </div>
    {{/if}}
</div>

```
{% endraw %}




## Performance Tips

### Optimize Images

```html
<!-- ❌ Large, unoptimized image -->
<img src="photo.jpg" />  <!-- 5MB file -->

<!-- ✅ Optimized, appropriately sized -->
<img src="photo-optimized.jpg" style="width: 200pt;" />  <!-- 100KB -->
```

### SVG vs Raster Images

```html
<!-- ✅ Use SVG for logos and icons (scales perfectly) -->
<img src="logo.svg" style="width: 100pt;" />

<!-- ✅ Use PNG/JPEG for photos (better file size) -->
<img src="photo.jpg" style="width: 300pt;" />
```

### Table Performance

```html
<!-- ✅ Specify column widths for faster rendering -->
<table>
    <colgroup>
        <col style="width: 40%;" />
        <col style="width: 30%;" />
        <col style="width: 30%;" />
    </colgroup>
    <tbody>
        <!-- table rows -->
    </tbody>
</table>
```

## Learning Path

**Recommended progression:**

1. **Start with Images** - Understand image handling
2. **Learn SVG Basics** - Vector graphics fundamentals
3. **Create SVG Graphics** - Data-driven visualizations
4. **Master Lists** - Structured content
5. **Build Tables** - Tabular data basics
6. **Advanced Tables** - Dynamic data and calculations
7. **Add Attachments** - Embed files and external content
8. **Apply Best Practices** - Optimization and performance

## Tips for Success

1. **Optimize Images First** - Resize before embedding
2. **Use SVG for Scalability** - Logos, icons, and charts
3. **Data Bind Dynamically** - Let data drive content
4. **Specify Table Widths** - Improves performance
5. **Test with Real Data** - Varying data sizes
6. **Use Relative Units** - More flexible layouts
7. **Break Large Tables** - Consider pagination
8. **Cache Remote Content** - Improve generation speed

## Common Patterns

### Image Gallery





{% raw %}
```html
<div class="gallery">
    {{#each images}}
    <div class="gallery-item">
        <img src="{{this.url}}"
             alt="{{this.caption}}"
             style="width: 200pt; height: 150pt; object-fit: cover;" />
        <p>{{this.caption}}</p>
    </div>
    {{/each}}
</div>

```
{% endraw %}




### Chart with Legend





{% raw %}
```html
<div class="chart-container">
    <svg width="500" height="300">
        <!-- Chart drawing -->
    </svg>

    <ul class="legend">
        {{#each series}}
        <li>
            <svg width="20" height="20">
                <rect width="20" height="20" fill="{{this.color}}" />
            </svg>
            {{this.label}}
        </li>
        {{/each}}
    </ul>
</div>

```
{% endraw %}




### Running Totals in Table





{% raw %}
```html
<var data-id="runningTotal" data-value="0" />

<table>
    <tbody>
        {{#each transactions}}
        <tr>
            <td>{{this.date}}</td>
            <td>{{this.description}}</td>
            <td>${{this.amount}}</td>
            <var data-id="runningTotal"
                 data-value="{{Document.Params.runningTotal +  this.amount}}" />
            <td>${{Document.Params.runningTotal}}</td>
        </tr>
        {{/each}}
    </tbody>
</table>

```
{% endraw %}




## Next Steps

Ready to master content components? Start with [Images](01_images.html) to learn about image handling and optimization.

Jump to specific topics:
- [SVG Drawing](03_svg_drawing.html) for data-driven graphics
- [Tables - Advanced](06_tables_advanced.html) for dynamic tables
- [Attachments & Embedded Content](07_attachments_embedded.html) for file embedding

---

**Related Series:**
- [Data Binding](/paperwork.core/learning/02-data-binding/) - Dynamic content
- [Styling & Appearance](/paperwork.core/learning/03-styling/) - Content styling
- [Practical Applications](/paperwork.core/learning/08-practical/) - Real-world examples

---

**Begin with content components →** [Images](01_images.html)
