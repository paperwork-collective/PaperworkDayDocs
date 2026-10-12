---
layout: default
title: srcset
parent: HTML Attributes
parent_url: /paperwork.core/reference/htmlattributes/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# @srcset : The Source Set Attribute
{: .no_toc}

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

## Summary

The `srcset` attribute specifies multiple image sources for responsive images, allowing different versions to be selected based on device capabilities, screen resolution, or viewport dimensions. Used with `<source>` elements, it enables resolution-adaptive and art-directed images. In PDF generation, it can optimize image quality for high-resolution printing.

## Usage

The `srcset` attribute defines image source alternatives:
- Provides multiple image versions at different resolutions
- Enables selection based on pixel density (1x, 2x, 3x)
- Supports width descriptors for responsive layouts
- Used with `<source>` elements (not currently supported on `<img>`)
- Works in conjunction with `sizes` attribute
- Supports data binding for dynamic image sets


THe library automatically chooses the highest density (largest) image, that matches the media rule.


{% raw %}
```html
<!-- With picture element -->
<picture>
    <source srcset="image-large.jpg" media="(min-width: 800px)" />
    <source srcset="image-medium.jpg" media="(min-width: 400px)" />
    <img src="image-small.jpg" alt="Fallback image" />
</picture>

<!-- Dynamic srcset -->
<picture>
    {{#each model.alternateImages}}
        <source srcset="{{this.imgUrl}}"
            media="(min-width:{{this.imgSizing}})"/>
     {{/each}}
     <img src="{{model.defaultImage}}" />
</picture>
```
{% endraw %}





---

## Supported Elements

The `srcset` attribute is used with:

### Image Element
- `<img>` - **NOT CURRENTLY SUPPORTED**

### Source Element
- `<source>` - Media source for `<picture>` element

---





**Data Model Example:**
```json
{
  "defaultSrc": "image.jpg",
  "responsiveSources": "image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w",
  "description": "Product image",
  "productId": "widget-123",
  "productName": "Widget A",
  "image": {
    "default": "product.jpg",
    "highRes": true,
    "srcset": "product-1x.jpg 1x, product-2x.jpg 2x, product-3x.jpg 3x",
    "alt": "Product photo"
  },
  "gallery": [
    {
      "src": "gallery-1.jpg",
      "srcset": "gallery-1-400.jpg 400w, gallery-1-800.jpg 800w",
      "sizes": "(max-width: 600px) 400px, 800px",
      "alt": "Gallery image 1"
    }
  ],
  "sources": [
    {
      "srcset": "image-large.jpg",
      "media": "(min-width: 800px)"
    },
    {
      "srcset": "image-small.jpg",
      "media": "(max-width: 799px)"
    }
  ],
  "fallback": "image-default.jpg",
  "alt": "Responsive image"
}
```

---

## Notes

### Srcset Syntax

Two types of descriptors in srcset:

#### Resolution Descriptors (x)

Pixel density multipliers for high-DPI displays:

```html
<!-- 1x = standard resolution, 2x = double density (Retina), 3x = triple -->
<source
     srcset="logo-1x.jpg 1x,
             logo-2x.jpg 2x,
             logo-3x.jpg 3x" />

<!-- Browser selects based on device pixel ratio -->
<!-- Standard display: uses 1x -->
<!-- Retina/HiDPI: uses 2x or 3x -->
```

#### Width Descriptors (w)

Actual image widths in pixels:

```html
<!-- w = width in pixels of the image file -->
<source
     srcset="photo-400.jpg 400w,
             photo-800.jpg 800w,
             photo-1200.jpg 1200w,
             photo-1600.jpg 1600w" />

<!-- Browser calculates which image to use based on:
     - viewport width
     - sizes attribute
     - device pixel ratio -->
```

### Resolution-Based Selection

Use x descriptors for fixed-size images:

```html
<!-- Logo at different resolutions -->
<source srcset="logo.png 1x,
             logo@2x.png 2x,
             logo@3x.png 3x" />

<!-- Icon at different resolutions -->
<source srcset="icon-24.png 1x,
             icon-48.png 2x,
             icon-72.png 3x" />
```

**Use cases:**
- Logos and icons with fixed dimensions
- UI elements that don't resize
- Images with specific display sizes

### Width-Based Selection

Use w descriptors for flexible layouts:

```html
<!-- Responsive hero image -->
<source srcset="hero-400.jpg 400w,
             hero-800.jpg 800w,
             hero-1200.jpg 1200w,
             hero-1600.jpg 1600w,
             hero-2000.jpg 2000w" />

```

**Use cases:**
- Full-width or flexible-width images
- Images in responsive layouts
- Content images that resize with viewport

### Picture Element Integration

Use `<source>` with srcset for art direction:

```html
<picture>
    <!-- Desktop: wide landscape image -->
    <source media="(min-width: 1000px)"
            srcset="landscape-large.jpg 1x,
                    landscape-large@2x.jpg 2x" />

    <!-- Tablet: medium landscape -->
    <source media="(min-width: 600px)"
            srcset="landscape-medium.jpg 1x,
                    landscape-medium@2x.jpg 2x" />

    <!-- Mobile: portrait crop -->
    <source media="(max-width: 599px)"
            srcset="portrait-small.jpg 1x,
                    portrait-small@2x.jpg 2x" />

    <!-- Fallback -->
    <img src="landscape-medium.jpg" alt="Responsive image" />
</picture>
```

### Format-Based Selection

Combine with type attribute for modern formats:

```html
<picture>
    <!-- WebP format (if supported) -->
    <source type="image/webp"
            srcset="image.webp 1x, image@2x.webp 2x" />

    <!-- AVIF format (if supported) -->
    <source type="image/avif"
            srcset="image.avif 1x, image@2x.avif 2x" />

    <!-- Fallback to JPEG -->
    <img src="image.jpg"
         srcset="image.jpg 1x, image@2x.jpg 2x"
         alt="Image" />
</picture>
```

### PDF Context Considerations

For PDF generation with Scryber:

1. **High-resolution printing** - Use 2x or 3x for print quality
2. **File size** - Balance quality vs PDF size
3. **Resolution selection** - PDF renderer may select high-res by default
4. **Fallback important** - Always provide `src` attribute



## Examples


### Art Direction with Picture

```html
<article>
    <h1>Responsive Design Showcase</h1>

    <!-- Different images for different screen sizes -->
    <picture>
        <!-- Desktop: wide landscape shot -->
        <source media="(min-width: 1200px)"
                srcset="desktop-wide.jpg 1x,
                        desktop-wide@2x.jpg 2x" />

        <!-- Tablet: medium landscape -->
        <source media="(min-width: 768px)"
                srcset="tablet-landscape.jpg 1x,
                        tablet-landscape@2x.jpg 2x" />

        <!-- Mobile: portrait crop focusing on subject -->
        <source media="(max-width: 767px)"
                srcset="mobile-portrait.jpg 1x,
                        mobile-portrait@2x.jpg 2x" />

        <!-- Fallback for older browsers -->
        <img src="tablet-landscape.jpg"
             alt="City skyline"
             style="width: 100%; height: auto;" />
    </picture>

    <p>This image adapts not just in size, but in composition...</p>
</article>
```

### Format Selection with Picture

```html
<article>
    <h1>Modern Image Formats</h1>

    <!-- Serve modern formats with fallbacks -->
    <picture>
        <!-- AVIF format (best compression) -->
        <source type="image/avif"
                srcset="photo.avif 1x,
                        photo@2x.avif 2x" />

        <!-- WebP format (good compression, wide support) -->
        <source type="image/webp"
                srcset="photo.webp 1x,
                        photo@2x.webp 2x" />

        <!-- JPEG fallback (universal support) -->
        <img src="photo.jpg"
             srcset="photo.jpg 1x,
                     photo@2x.jpg 2x"
             width="800"
             height="600"
             alt="Beautiful landscape"
             style="width: 100%; height: auto;" />
    </picture>

    <p>
        This image is served in the most efficient format
        supported by your viewing device.
    </p>
</article>
```


### Responsive Banner

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Promotional Banner</title>
    <style>
        .banner {
            width: 100%;
            height: auto;
            display: block;
        }
    </style>
</head>
<body>
    <!-- Responsive promotional banner -->
    <picture>
        <!-- Desktop: full banner with all text -->
        <source media="(min-width: 1024px)"
                srcset="banner-desktop.jpg 1x,
                        banner-desktop@2x.jpg 2x" />

        <!-- Tablet: medium banner -->
        <source media="(min-width: 768px)"
                srcset="banner-tablet.jpg 1x,
                        banner-tablet@2x.jpg 2x" />

        <!-- Mobile: simplified banner -->
        <source media="(max-width: 767px)"
                srcset="banner-mobile.jpg 1x,
                        banner-mobile@2x.jpg 2x" />

        <!-- Fallback -->
        <img src="banner-desktop.jpg"
             alt="Special offer: 30% off all products"
             class="banner" />
    </picture>

    <section>
        <h1>Limited Time Offer</h1>
        <p>Save 30% on all products this week only!</p>
    </section>
</body>
</html>
```


---

## See Also

- [img](/paperwork.core/reference/htmltags/elements/html_img_element.html) - Image element
- [picture](/paperwork.core/reference/htmltags/elements/html_picture_element.html) - Picture element for art direction
- [source](/paperwork.core/reference/htmltags/elements/html_source_element.html) - Source element for media
- [src](/paperwork.core/reference/htmlattributes/attributes/attr_src.html) - Source attribute
- [alt](/paperwork.core/reference/htmlattributes/attributes/attr_alt.html) - Alternative text attribute
- [width](/paperwork.core/reference/htmlattributes/attributes/attr_width.html) - Width attribute
- [height](/paperwork.core/reference/htmlattributes/attributes/attr_height.html) - Height attribute
- [sizes](/paperwork.core/reference/htmlattributes/attributes/attr_sizes.html) - Sizes attribute for responsive images

---
