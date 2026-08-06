---
layout: default
title: width and height
parent: HTML Attributes
parent_url: /reference/htmlattributes/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# @width and @height : The Sizing Attributes
{: .no_toc}

The `width` and `height` attributes control the dimensions of elements in PDF documents. They are used with images, tables, and table cells.

For **images**, the attributes accept integer pixel values as [intrinsic size hints](#intrinsic-size-hints-span-classlabel-label-greenv97span) — use `style="width:...; height:...;"` for unit-based or percentage sizing. For **tables and cells**, the attributes accept CSS units, percentages, and points as before.

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

## Breaking Change — `<img>` Width and Height <span class="label label-red">Breaking</span> <span class="label label-green">v9.7</span>

> **v9.7 change:** The `width` and `height` attributes on `<img>` elements now accept **integer pixel values only**. Providing a CSS unit (`pt`, `px`, `%`, `in`, etc.) throws a parse exception at document load time.
>
> Move all unit-based image sizing to the `style` attribute.

**Quick migration:**

| Before (❌ throws in v9.7) | After (✅ correct) |
|---|---|
| `<img src="photo.jpg" width="400pt" height="300pt" />` | `<img src="photo.jpg" style="width: 400pt; height: 300pt;" />` |
| `<img src="logo.png" width="150pt" />` | `<img src="logo.png" style="width: 150pt;" />` |
| `<img src="banner.jpg" width="100%" height="200pt" />` | `<img src="banner.jpg" style="width: 100%; height: 200pt;" />` |
| `<img src="..." width="{{model.w}}pt" />` | `<img src="..." style="width: {{model.w}}pt;" />` |

**Table elements are not affected.** `<table width="100%">`, `<td width="30%">`, `<tr height="50pt">`, and similar table sizing continues to work unchanged.

---

## Usage

Images accept CSS units and percentages via the `style` attribute. Table and cell elements continue to use `width` and `height` attributes directly:

{% raw %}
```html
<!-- Image sized via style (required for CSS units) -->
<img src="photo.jpg" style="width: 400pt; height: 300pt;" />

<!-- Image width only — maintains aspect ratio from image source -->
<img src="logo.png" style="width: 150pt;" />

<!-- Percentage-based sizing -->
<img src="banner.jpg" style="width: 100%; height: 200pt;" />

<!-- Table sizing — unchanged, uses attributes directly -->
<table width="100%">
    <tr>
        <td width="30%">Left Column</td>
        <td width="70%">Right Column</td>
    </tr>
</table>

<!-- Dynamic sizing via style -->
<img src="{{model.imagePath}}" style="width: {{model.imageWidth}}pt; height: {{model.imageHeight}}pt;" />
```
{% endraw %}

---

## Supported Elements

The `width` and `height` attributes are used with:

### Images
- `<img>` — Integer pixel values only (intrinsic hint). Use `style=""` for CSS units and percentages.

### Tables
- `<table>` — Table dimensions (CSS units and percentages supported)
- `<td>`, `<th>` — Table cell dimensions (CSS units and percentages supported)
- `<col>`, `<colgroup>` — Column sizing (CSS units and percentages supported)

### Embedded Content
- `<iframe>` — Iframe dimensions

**Note:** For most block elements, dimensions are set using the CSS `style` attribute.

---

## Binding Values

Use `style` binding for unit-based image sizes. Integer attribute binding works for pixel-only intrinsic hints.

{% raw %}
```html
<!-- CSS style binding — recommended for unit-based sizing -->
<img src="{{model.imagePath}}"
     style="width: {{model.width}}pt; height: {{model.height}}pt;" />

<!-- Integer attribute binding — pixel intrinsic hints only -->
<img src="{{model.imagePath}}"
     width="{{model.widthPx}}"
     height="{{model.heightPx}}" />

<!-- Calculated style dimensions -->
<img src="photo.jpg"
     style="width: {{model.baseWidth * 2}}pt; height: {{model.baseHeight * 2}}pt;" />

<!-- Conditional sizing via style -->
<img src="{{model.imagePath}}"
     style="width: {{if(model.isLarge, '600pt', '300pt')}}; height: {{if(model.isLarge, '400pt', '200pt')}};" />

<!-- Percentage from data — table elements (attribute still works) -->
<table width="{{model.tableWidth}}%">
    <tr>
        <td width="{{model.leftColumnWidth}}%">Left</td>
        <td width="{{model.rightColumnWidth}}%">Right</td>
    </tr>
</table>

<!-- Repeating elements with varying sizes -->
{{#each model.images}}
    <img src="{{this.url}}"
         style="width: {{this.widthPt}}pt; height: {{this.heightPt}}pt;"
         alt="{{this.description}}" />
{{/each}}
```
{% endraw %}

**Data Model Example:**
```json
{
  "imagePath": "banner.jpg",
  "width": 800,
  "height": 400,
  "widthPx": 800,
  "heightPx": 400,
  "baseWidth": 150,
  "baseHeight": 100,
  "isLarge": true,
  "tableWidth": 100,
  "leftColumnWidth": 30,
  "rightColumnWidth": 70,
  "images": [
    {
      "url": "photo1.jpg",
      "widthPt": 300,
      "heightPt": 200,
      "description": "First photo"
    },
    {
      "url": "photo2.jpg",
      "widthPt": 400,
      "heightPt": 300,
      "description": "Second photo"
    }
  ]
}
```

---

## Notes

### Units of Measurement

CSS units apply in the `style` attribute for images, and in `width`/`height` attributes for table elements.

| Unit | Description | Example (style) | Best For |
|------|-------------|---------|----------|
| `pt` | Points (1/72 inch) | `style="width: 400pt;"` | PDF documents (recommended) |
| `px` | Pixels | `style="width: 400px;"` | Screen-based sizing |
| `%` | Percentage of container | `style="width: 50%;"` | Responsive layouts |
| `in` | Inches | `style="width: 5.5in;"` | Physical dimensions |
| `cm` | Centimeters | `style="width: 14cm;"` | Metric measurements |
| `mm` | Millimeters | `style="width: 140mm;"` | Precise metric sizing |
| `rem`| Relative to the root font size | `style="margin: 1rem;"` | Relative sizing |
| `vw`, `vh` | Relative to the viewport | `style="width: 90vw;"` | Viewport-relative |

For `<img>`, all CSS units go in `style=""`. The `width`/`height` attributes accept integer pixel hints only:

```html
<!-- Points via style (recommended for PDF) -->
<img src="photo.jpg" style="width: 400pt; height: 300pt;" />

<!-- Percentage via style -->
<img src="banner.jpg" style="width: 100%;" />

<!-- Table width attribute (unchanged — still accepts units) -->
<table width="100%">...</table>

<!-- Table cell with point attribute (unchanged) -->
<td width="150pt">...</td>
```

---

### Intrinsic Size Hints <span class="label label-green">v9.7</span>

The `width` and `height` attributes on `<img>` accept **integer pixel values** as hints about the image's natural dimensions. These are used for aspect-ratio derivation when CSS styling specifies only one dimension.

```html
<!-- Integer pixel hint — natural size declared as 800×600 pixels -->
<img src="photo.jpg" width="800" height="600" />

<!-- With CSS width — height derived from hint (300pt × 600/800 = 225pt) -->
<img src="photo.jpg" width="800" height="600" style="width: 300pt;" />

<!-- No hints — aspect ratio comes from the image file itself -->
<img src="photo.jpg" style="width: 300pt;" />
```

If neither `style` width/height nor integer hints are provided, the image renders at its natural file dimensions or scales to the container width.

---

### Aspect Ratio Preservation

When only one CSS dimension is specified, the image preserves its aspect ratio from its source file (or from integer attribute hints if provided):

```html
<!-- Width specified, height auto-calculated from image ratio -->
<img src="photo.jpg" style="width: 400pt;" />

<!-- Height specified, width auto-calculated from image ratio -->
<img src="photo.jpg" style="height: 300pt;" />

<!-- Both specified — may distort if ratio doesn't match -->
<img src="photo.jpg" style="width: 400pt; height: 200pt;" />
```

**Best practice:** Specify only one dimension and let the engine derive the other for distortion-free images.

---

### Image Sizing Best Practices

**Do:**
- Use the CSS `style` attribute for unit-based sizing: `style="width: 400pt;"`
- Use `min-width`, `max-width` in `style` for flexible constraints
- Specify at least one dimension for consistent layout
- Use `pt` for PDF documents
- Maintain aspect ratios by sizing only one dimension when possible

**Don't:**
- Put CSS units in `<img>` `width`/`height` attributes — this throws in v9.7
- Excessively upscale low-resolution images
- Omit dimensions entirely (may cause layout issues)

```html
<!-- Good: CSS units via style -->
<img src="photo.jpg" style="width: 400pt;" />

<!-- Good: both dimensions preserving original ratio -->
<img src="photo.jpg" style="width: 400pt; height: 300pt;" />

<!-- Caution: may distort if ratio is wrong -->
<img src="photo.jpg" style="width: 400pt; height: 200pt;" />
```

---

### Table Sizing

Tables and cells support `width` and `height` attributes with CSS units and percentages (unchanged):

```html
<!-- Table with full width -->
<table width="100%" style="border-collapse: collapse;">
    <tr>
        <!-- Fixed width column -->
        <td width="150pt" style="border: 1pt solid #ccc;">Fixed 150pt</td>
        <!-- Remaining space -->
        <td style="border: 1pt solid #ccc;">Flexible width</td>
    </tr>
</table>

<!-- Table with percentage columns -->
<table width="100%">
    <tr>
        <td width="25%">25% width</td>
        <td width="50%">50% width</td>
        <td width="25%">25% width</td>
    </tr>
</table>

<!-- Table with row height -->
<table width="100%">
    <tr height="50pt">
        <td>50pt tall row</td>
    </tr>
    <tr>
        <td>Auto height row</td>
    </tr>
</table>
```

---

### Percentage-Based Layouts

Use `style` for percentage widths on images:

```html
<!-- 50% of parent width -->
<img src="photo.jpg" style="width: 50%;" />

<!-- Full width of container -->
<img src="banner.jpg" style="width: 100%; height: 200pt;" />

<!-- Table with percentage columns (attribute — unchanged) -->
<table width="100%">
    <tr>
        <td width="30%">Sidebar</td>
        <td width="70%">Main Content</td>
    </tr>
</table>
```

---

### Maximum and Minimum Dimensions

Use CSS `style` for min/max constraints:

```html
<!-- Using style for max-width -->
<img src="large-image.jpg"
     style="max-width: 600pt; width: 100%; height: auto;" />

<!-- Minimum dimensions on a block element -->
<div style="min-width: 200pt; min-height: 100pt; border: 1pt solid #ccc;">
    Content with minimum dimensions
</div>
```

---

### Iframe Sizing

Iframes require explicit dimensions:

```html
<!-- Fixed dimensions -->
<iframe src="content.html" width="600pt" height="400pt"></iframe>

<!-- Percentage width -->
<iframe src="content.html" width="100%" height="500pt"></iframe>
```

---

### Responsive Image Patterns

```html
<!-- Full width, auto height -->
<img src="banner.jpg" style="width: 100%;" />

<!-- Constrained maximum -->
<img src="photo.jpg" style="max-width: 600pt; width: 100%;" />

<!-- Fixed aspect ratio container -->
<div style="width: 100%; position: relative; padding-bottom: 56.25%;">
    <!-- 16:9 aspect ratio -->
    <img src="video-placeholder.jpg"
         style="position: absolute; width: 100%; height: 100%;" />
</div>
```

---

### Zero or Invalid Dimensions

```html
<!-- Invalid: zero dimensions -->
<img src="photo.jpg" style="width: 0; height: 0;" />  <!-- Won't display -->

<!-- Invalid: negative dimensions -->
<img src="photo.jpg" style="width: -100pt;" />  <!-- May cause errors -->

<!-- Always specify positive, valid dimensions -->
<img src="photo.jpg" style="width: 100pt; height: 75pt;" />
```

---

## Examples

### Basic Image Sizing

```html
<!-- Small thumbnail -->
<img src="thumbnail.jpg" style="width: 80pt; height: 60pt;" />

<!-- Medium image -->
<img src="photo.jpg" style="width: 300pt; height: 225pt;" />

<!-- Large featured image -->
<img src="featured.jpg" style="width: 600pt; height: 400pt;" />

<!-- Banner image -->
<img src="banner.jpg" style="width: 100%; height: 150pt;" />
```

---

### Maintaining Aspect Ratio

```html
<!-- Original: 1600x1200 (4:3 ratio) — sized via style -->
<img src="photo.jpg" style="width: 400pt; height: 300pt;" />

<!-- Same ratio, smaller -->
<img src="photo.jpg" style="width: 200pt; height: 150pt;" />

<!-- Width only — height auto-calculated from image ratio -->
<img src="photo.jpg" style="width: 400pt;" />

<!-- Height only — width auto-calculated from image ratio -->
<img src="photo.jpg" style="height: 300pt;" />
```

---

### Responsive Table Layout

```html
<table width="100%" style="border-collapse: collapse;">
    <tr>
        <th width="20%" style="border: 1pt solid #ccc; padding: 8pt;">ID</th>
        <th width="40%" style="border: 1pt solid #ccc; padding: 8pt;">Name</th>
        <th width="40%" style="border: 1pt solid #ccc; padding: 8pt;">Description</th>
    </tr>
    <tr>
        <td style="border: 1pt solid #ccc; padding: 8pt;">001</td>
        <td style="border: 1pt solid #ccc; padding: 8pt;">Widget A</td>
        <td style="border: 1pt solid #ccc; padding: 8pt;">Description of Widget A</td>
    </tr>
    <tr>
        <td style="border: 1pt solid #ccc; padding: 8pt;">002</td>
        <td style="border: 1pt solid #ccc; padding: 8pt;">Widget B</td>
        <td style="border: 1pt solid #ccc; padding: 8pt;">Description of Widget B</td>
    </tr>
</table>
```

---

### Fixed and Flexible Columns

```html
<table width="100%" style="border-collapse: collapse;">
    <tr>
        <!-- Fixed width sidebar -->
        <td width="200pt" style="background-color: #f0f0f0; padding: 15pt;
                                  vertical-align: top;">
            <h3>Sidebar</h3>
            <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
            </ul>
        </td>
        <!-- Flexible main content -->
        <td style="padding: 15pt; vertical-align: top;">
            <h2>Main Content</h2>
            <p>This column takes up the remaining space...</p>
        </td>
    </tr>
</table>
```

---

### Image Gallery with Uniform Sizing

```html
<div>
    <h2>Photo Gallery</h2>

    <!-- All images same size for uniform grid -->
    <img src="photo1.jpg" style="width: 200pt; height: 150pt; margin: 5pt;" />
    <img src="photo2.jpg" style="width: 200pt; height: 150pt; margin: 5pt;" />
    <img src="photo3.jpg" style="width: 200pt; height: 150pt; margin: 5pt;" />
    <img src="photo4.jpg" style="width: 200pt; height: 150pt; margin: 5pt;" />
    <img src="photo5.jpg" style="width: 200pt; height: 150pt; margin: 5pt;" />
    <img src="photo6.jpg" style="width: 200pt; height: 150pt; margin: 5pt;" />
</div>
```

---

### Dynamic Sizing with Data Binding

{% raw %}
```html
<!-- Model: {
    thumbnail: { url: "thumb.jpg", widthPt: 100, heightPt: 75 },
    featured: { url: "featured.jpg", widthPt: 600, heightPt: 400 }
} -->

<div>
    <h3>Thumbnail</h3>
    <img src="{{model.thumbnail.url}}"
         style="width: {{model.thumbnail.widthPt}}pt; height: {{model.thumbnail.heightPt}}pt;" />

    <h2>Featured Image</h2>
    <img src="{{model.featured.url}}"
         style="width: {{model.featured.widthPt}}pt; height: {{model.featured.heightPt}}pt;" />
</div>
```
{% endraw %}

---

### Product Listing with Images

{% raw %}
```html
<!-- Model: { products: [
    { name: "Widget A", image: "widget-a.jpg", widthPt: 250, heightPt: 250 },
    { name: "Widget B", image: "widget-b.jpg", widthPt: 250, heightPt: 250 }
] } -->

{{#each model.products}}
    <div style="border: 1pt solid #ddd; padding: 15pt; margin-bottom: 20pt;
                display: inline-block; width: 280pt;">
        <img src="{{this.image}}"
             style="width: {{this.widthPt}}pt; height: {{this.heightPt}}pt; display: block;"
             alt="{{this.name}}" />
        <h3 style="margin: 10pt 0 0 0; text-align: center;">{{this.name}}</h3>
    </div>
{{/each}}
```
{% endraw %}

---

### Logo Sizing Variations

```html
<style>
    .logo-xl { width: 300pt; height: 100pt; }
    .logo-lg { width: 200pt; height: 67pt; }
    .logo-md { width: 150pt; height: 50pt; }
    .logo-sm { width: 100pt; height: 33pt; }
    .logo-xs { width: 60pt; height: 20pt; }
</style>

<div>
    <h2>Logo Sizes</h2>

    <div style="margin-bottom: 20pt;">
        <p>Extra Large:</p>
        <img src="logo.png" class="logo-xl" alt="Company Logo" />
    </div>

    <div style="margin-bottom: 20pt;">
        <p>Large:</p>
        <img src="logo.png" class="logo-lg" alt="Company Logo" />
    </div>

    <div style="margin-bottom: 20pt;">
        <p>Medium:</p>
        <img src="logo.png" class="logo-md" alt="Company Logo" />
    </div>

    <div style="margin-bottom: 20pt;">
        <p>Small:</p>
        <img src="logo.png" class="logo-sm" alt="Company Logo" />
    </div>

    <div>
        <p>Extra Small:</p>
        <img src="logo.png" class="logo-xs" alt="Company Logo" />
    </div>
</div>
```

---

### Chart Sizing

```html
<div>
    <h2>Sales Performance</h2>

    <!-- Standard chart size -->
    <img src="sales-chart.png" style="width: 600pt; height: 400pt;"
         alt="Sales performance chart" />

    <h2>Revenue Breakdown</h2>

    <!-- Smaller chart -->
    <img src="revenue-pie.png" style="width: 400pt; height: 400pt;"
         alt="Revenue breakdown pie chart" />

    <h2>Growth Trend</h2>

    <!-- Wide chart -->
    <img src="growth-line.png" style="width: 700pt; height: 300pt;"
         alt="Growth trend line chart" />
</div>
```

---

### Profile Photo Sizing

{% raw %}
```html
<!-- Model: { user: { name: "Alice", photo: "alice.jpg" } } -->

<div style="text-align: center;">
    <!-- Large profile photo -->
    <img src="{{model.user.photo}}"
         style="width: 200pt; height: 200pt; border-radius: 100pt; border: 4pt solid #336699;"
         alt="{{model.user.name}}" />

    <h2>{{model.user.name}}</h2>
</div>

<!-- Small profile photo in list -->
<div style="display: flex; align-items: center; margin-bottom: 10pt;">
    <img src="{{model.user.photo}}"
         style="width: 50pt; height: 50pt; border-radius: 25pt; margin-right: 10pt;"
         alt="{{model.user.name}}" />
    <span>{{model.user.name}}</span>
</div>
```
{% endraw %}

---

### Full-Width Banner

```html
<!DOCTYPE html>
<html>
<body style="margin: 0;">
    <!-- Full-width header banner -->
    <img src="header-banner.jpg" style="width: 100%; height: 200pt;"
         alt="Welcome banner" />

    <div style="padding: 20pt;">
        <h1>Welcome to Our Service</h1>
        <p>Content goes here...</p>
    </div>

    <!-- Full-width footer banner -->
    <img src="footer-banner.jpg" style="width: 100%; height: 100pt;"
         alt="Footer banner" />
</body>
</html>
```

---

### Icon Sizing

```html
<p>
    <img src="icons/info.png"
         style="width: 16pt; height: 16pt; vertical-align: middle;" />
    Information message
</p>

<p>
    <img src="icons/warning.png"
         style="width: 20pt; height: 20pt; vertical-align: middle;" />
    Warning message (larger icon)
</p>

<p>
    <img src="icons/success.png"
         style="width: 24pt; height: 24pt; vertical-align: middle;" />
    Success message (even larger icon)
</p>

<!-- Feature icons -->
<div style="text-align: center; margin: 20pt;">
    <img src="icons/feature1.png" style="width: 64pt; height: 64pt;" />
    <img src="icons/feature2.png" style="width: 64pt; height: 64pt; margin: 0 20pt;" />
    <img src="icons/feature3.png" style="width: 64pt; height: 64pt;" />
</div>
```

---

### Conditional Sizing

{% raw %}
```html
<!-- Model: { displayMode: "thumbnail" } -->

<img src="product.jpg"
     style="width: {{if(model.displayMode == 'thumbnail', '100pt', '400pt')}}; height: {{if(model.displayMode == 'thumbnail', '75pt', '300pt')}};"
     alt="Product photo" />
```
{% endraw %}

---

### Screenshot Sizing

```html
<div>
    <h2>Desktop View</h2>
    <img src="desktop-screenshot.png"
         style="width: 800pt; height: 600pt; border: 1pt solid #ccc;"
         alt="Desktop application screenshot" />

    <h2>Tablet View</h2>
    <img src="tablet-screenshot.png"
         style="width: 600pt; height: 800pt; border: 1pt solid #ccc; margin-top: 20pt;"
         alt="Tablet application screenshot" />

    <h2>Mobile View</h2>
    <img src="mobile-screenshot.png"
         style="width: 300pt; height: 600pt; border: 1pt solid #ccc; margin-top: 20pt;"
         alt="Mobile application screenshot" />
</div>
```

---

### Table with Row Heights

```html
<table width="100%" style="border-collapse: collapse;">
    <!-- Header row with specific height -->
    <tr height="50pt">
        <th style="background-color: #336699; color: white; padding: 10pt;">
            Column 1
        </th>
        <th style="background-color: #336699; color: white; padding: 10pt;">
            Column 2
        </th>
    </tr>

    <!-- Data rows with minimum height -->
    <tr height="40pt">
        <td style="border: 1pt solid #ccc; padding: 8pt;">Data 1</td>
        <td style="border: 1pt solid #ccc; padding: 8pt;">Data 2</td>
    </tr>

    <tr height="40pt">
        <td style="border: 1pt solid #ccc; padding: 8pt;">Data 3</td>
        <td style="border: 1pt solid #ccc; padding: 8pt;">Data 4</td>
    </tr>
</table>
```

---

### Certificate/Badge Sizing

```html
<div style="text-align: center; margin: 30pt;">
    <h2>Certifications</h2>

    <img src="cert-iso.png" style="width: 150pt; height: 150pt; margin: 10pt;"
         alt="ISO 9001 certification" />

    <img src="cert-security.png" style="width: 150pt; height: 150pt; margin: 10pt;"
         alt="Security certification" />

    <img src="cert-quality.png" style="width: 150pt; height: 150pt; margin: 10pt;"
         alt="Quality certification" />
</div>
```

---

### Image Size and PDF File Size

Display size does not affect file size — the same image data is embedded regardless:

```html
<!-- Same source image, different display sizes — identical embedded data -->
<img src="high-res-photo.jpg" style="width: 200pt; height: 150pt;" />
<img src="high-res-photo.jpg" style="width: 400pt; height: 300pt;" />
```

---

### Iframe Sizing Examples

```html
<div>
    <h2>Embedded Content</h2>

    <!-- Standard iframe -->
    <iframe src="external-content.html" width="600pt" height="400pt"
            style="border: 1pt solid #ccc;"></iframe>

    <!-- Full-width iframe -->
    <iframe src="report-section.html" width="100%" height="500pt"
            style="border: none; margin-top: 20pt;"></iframe>

    <!-- Small embedded widget -->
    <iframe src="widget.html" width="300pt" height="200pt"
            style="border: 1pt solid #ddd;"></iframe>
</div>
```

---

### Mixed Size Gallery

```html
<div>
    <h2>Mixed Photo Gallery</h2>

    <!-- Landscape photo -->
    <img src="landscape.jpg" style="width: 400pt; height: 300pt; margin: 5pt;" />

    <!-- Portrait photo -->
    <img src="portrait.jpg" style="width: 300pt; height: 400pt; margin: 5pt;" />

    <!-- Square photo -->
    <img src="square.jpg" style="width: 300pt; height: 300pt; margin: 5pt;" />

    <!-- Panorama -->
    <img src="panorama.jpg" style="width: 600pt; height: 200pt; margin: 5pt; display: block;" />
</div>
```

---

### Signature Block with Sizing

```html
<div style="margin-top: 50pt;">
    <p>Approved by:</p>

    <div style="margin: 20pt 0;">
        <img src="signature-ceo.png" style="width: 200pt; height: 60pt;"
             alt="CEO signature" />
        <p style="margin: 5pt 0 0 0;">
            <strong>John Smith</strong><br/>
            Chief Executive Officer
        </p>
    </div>

    <div style="margin: 20pt 0;">
        <img src="signature-cfo.png" style="width: 200pt; height: 60pt;"
             alt="CFO signature" />
        <p style="margin: 5pt 0 0 0;">
            <strong>Jane Doe</strong><br/>
            Chief Financial Officer
        </p>
    </div>
</div>
```

---

## See Also

- [img](/reference/htmltags/elements/html_img_element.html) - Image element
- [table](/reference/htmltags/elements/html_table_element.html) - Table element
- [td](/reference/htmltags/elements/html_td_element.html) - Table cell element
- [iframe](/reference/htmltags/elements/html_iframe_element.html) - Iframe element
- [src](/reference/htmlattributes/attributes/attr_src.html) - Source attribute for images
- [alt](/reference/htmlattributes/attributes/attr_alt.html) - Alternative text for images
- [style](/reference/htmlattributes/attributes/attr_style.html) - Inline styling for dimensions
- [CSS Styles](/reference/styles/) - Comprehensive styling including sizing
- [Data Binding](/reference/binding/) - Dynamic attribute values

---
