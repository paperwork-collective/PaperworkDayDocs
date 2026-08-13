---
layout: default
title: iframe and embed
parent: HTML Elements
parent_url: /reference/htmltags/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# &lt;iframe&gt; and &lt;embed&gt; : The Embedded Content Elements
{: .no_toc }


The `<iframe>` and `<embed>` elements allow embedding external content into PDF documents. They support loading remote HTML files that are dynamically parsed and embedded at render time. These elements enable content reuse, modular document composition, and dynamic content inclusion.

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

The `<iframe>` and `<embed>` elements enable embedded content that:
- Load and parse external HTML documents via the `src` attribute
- Support remote content loading from URLs or local file paths
- Parse and render external content within the current document context
- Support styling through CSS and inline styles
- Allow dynamic content sources through data binding
- Support visibility control and conditional rendering
- Enable document composition from multiple sources
- Can be nested within any container element
- Support passthrough styling mode for iframe content

```html
<!-- Basic iframe loading external HTML -->
<iframe src="header.html"></iframe>

<!-- Embed element with external content -->
<embed src="footer.html" />

<!-- Styled iframe with dimensions -->
<iframe src="content.html" style="width: 100%; min-height: 400pt;"></iframe>
```

---

## Supported Attributes

### Standard HTML Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier for the element. |
| `class` | string | CSS class name(s) for styling. Multiple classes separated by spaces. |
| `style` | string | Inline CSS styles applied directly to the element. |
| `title` | string | Sets the outline/bookmark title for the embedded content. |
| `hidden` | string | Controls visibility. Set to "hidden" to hide the element, or omit/empty to show. |

### Embedded Content Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `src` | string | Source URL or file path for the external content to load and parse. Mutually exclusive with `data-content` in practice — if both are used, `src` loads first and `data-content` binds additional content afterwards. |
| `allow` | string | **(iframe only)** Content permissions policy controlling what is kept from the embedded content and what passes through from the parent. See [Content Permissions](#content-permissions-allow) below. |
| `data-content` | string | Dynamically bound content, parsed and inserted the same way as `src`-loaded content, including full `allow` policy enforcement. See [data-content attribute](/reference/htmlattributes/attributes/attr_data_content.html). |
| `data-content-type` | string | MIME type used to parse `data-content` (e.g. `text/html`, `application/xhtml+xml`, `text/markdown`). Defaults to the document's default content type. |
| `data-content-action` | string | `append` (default), `prepend`, or `replace` — how `data-content` is inserted relative to existing children. |
| `data-passthrough` | boolean | *Legacy, obsolete.* Sets both `data-passthrough` and `style-passthrough` in `allow` together. Retained for templates written before `allow` existed. See the [migration note](/reference/htmlattributes/attributes/attr_data_passthrough.html). |

### CSS Style Support

Both `<iframe>` and `<embed>` elements support extensive CSS styling:

**Sizing**:
- `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`

**Positioning**:
- `display`: `block` (default), `inline`, `inline-block`, `none`
- `position`: `static`, `relative`, `absolute`
- `float`: `left`, `right`, `none`
- `clear`: `both`, `left`, `right`, `none`
- `top`, `left`, `right`, `bottom` (for positioned elements)

**Spacing**:
- `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- `padding` (all variants)

**Visual Effects**:
- `border`, `border-width`, `border-color`, `border-style`, `border-radius`
- `background`, `background-color`
- `opacity`

---

## Notes

### How Embedded Content Works in PDF

Unlike web browsers where iframes create separate browsing contexts, Scryber's `<iframe>` and `<embed>` elements work as **content inclusion mechanisms**:

1. **Parse-Time Loading**: External content is fetched and parsed during document generation
2. **Content Merging**: The parsed content becomes part of the parent document's content tree
3. **No Sandboxing**: Embedded content shares the same PDF document context
4. **Content Permissions**: Styles, images, links, navigation, and data can be controlled via the `allow` attribute (iframe only)
5. **Static Inclusion**: Content is resolved at generation time, not at viewing time

This approach is similar to server-side includes (SSI) or template partials rather than browser iframe behavior.

### iframe vs embed

Both elements function similarly with one key difference:

**iframe**:
- Extends the `Div` component
- Supports the `allow` attribute for a ten-type content permissions policy (styles, images, links, navigation, nested frames, forms, data, outer HTML)
- By default, isolates most embedded content (data, parent styles, `<style>`/`<link>` tags, outer HTML, nested frames, forms all denied) while keeping inline styles, images, and navigation
- Can contain fallback content in its body
- Best for complete HTML documents or sections, especially untrusted or third-party content
- `data-content` binding runs through the same permission-cleaning pipeline as `src`

**embed**:
- Extends `VisualComponent` directly
- Always inherits parent styles and data; no `allow` support, no content cleaning
- Simpler component model
- Typically used for smaller, trusted content fragments
- Best for reusable snippets and partials from your own templates

### External Content Sources

The `src` attribute supports multiple source types:

1. **Relative File Paths**:
   ```html
   <iframe src="partials/header.html"></iframe>
   <embed src="../shared/footer.html" />
   ```

2. **Absolute File Paths**:
   ```html
   <iframe src="/templates/navigation.html"></iframe>
   ```

3. **Remote URLs**:
   ```html
   <iframe src="https://example.com/content.html"></iframe>
   <embed src="https://api.example.com/template?id=123" />
   ```

4. **Dynamic Sources via Data Binding**:




{% raw %}
   ```html
   <iframe src="{{model.contentUrl}}"></iframe>
```
{% endraw %}





### Supported Content Types

The embedded content source should be valid HTML that Scryber can parse:

- **HTML Documents**: Complete HTML with `<html>`, `<head>`, and `<body>` tags
- **HTML Fragments**: Partial HTML containing just body content
- **XML Documents**: Well-formed XML that follows Scryber's namespace conventions
- **PDF Templates**: Other PDF template files in HTML format

Content must be parseable by Scryber's HTML parser. Standard HTML5 elements and Scryber-specific components are supported.

### Content Permissions (allow)

The `allow` attribute controls what is kept from the embedded content and what passes through from the parent document. It replaces the older `data-passthrough` boolean with ten independent permission types, each set to `any` (allowed) or `none` (denied):

| Type key | Governs | Default |
|----------|---------|---------|
| `data-passthrough` | Parent's data-binding stack (`model`, params) visible to embedded content | `none` |
| `style-passthrough` | Parent document's CSS styles apply to embedded elements | `none` |
| `inner-style` | `<style>` blocks inside the embedded content are kept | `none` |
| `inner-link` | `<link rel="stylesheet">` elements inside the embedded content are kept | `none` |
| `inner-navigation` | `<a href>` targets inside the embedded content are kept | `any` |
| `inner-images` | `<img>` elements inside the embedded content are kept | `any` |
| `outer-html` | Full `<html>`/`<body>` structure preserved vs. reduced to body content | `none` |
| `inline-styles` | `style="..."` attributes on embedded elements are kept | `any` |
| `inner-frames` | Nested `<iframe>`/`<embed>`/`<object>` elements are kept | `none` |
| `inner-forms` | `<form>`, `<input>`, `<select>`, `<button>` elements are kept | `none` |

```html
<!-- Default policy (no allow attribute): equivalent to -->
<iframe src="content.html"
        allow="inline-styles any; inner-images any; inner-navigation any"></iframe>

<!-- Inherit parent styles instead of isolating -->
<iframe src="content.html" allow="style-passthrough any"></iframe>

<!-- Fully trusted internal content -->
<iframe src="internal.html"
        allow="data-passthrough any; style-passthrough any; inner-style any;
               inner-link any; outer-html any; inner-frames any; inner-forms any"></iframe>
```

Every permission is enforced identically whether the content is loaded via `src` or bound dynamically via `data-content` — both paths run through the same content-cleaning step after parsing.

Full grammar, per-type defaults, and further examples: [allow attribute reference](/reference/htmlattributes/attributes/attr_allow.html).

### Remote Content Loading

When using remote URLs, consider:

1. **Network Access**: Scryber must have network access to fetch remote content
2. **Performance**: Remote content loading adds network latency to document generation
3. **Caching**: Consider implementing caching mechanisms for frequently used remote content
4. **Error Handling**: Use proper error handling for failed remote requests
5. **Security**: Validate and trust remote content sources

### Error Handling

When external content fails to load:

- In **Strict** conformance mode: An error is thrown, stopping document generation
- In **Lax** conformance mode: The error is logged and generation continues
- Use try-catch blocks or conformance settings to handle loading failures gracefully

### Content Security

When embedding external content:

1. **Trust Content Sources**: Only embed content from trusted sources
2. **Validate URLs**: Sanitize and validate dynamic URL sources
3. **Input Validation**: Validate any user-provided source paths
4. **Local File Access**: Be cautious with local file system access in web applications

### Fallback Content

The `<iframe>` element can contain fallback content displayed if loading fails:

```html
<iframe src="content.html">
    <p>This content will be shown if content.html fails to load</p>
</iframe>
```

Note: With `<embed>` being a self-closing element, fallback content should be handled externally.

### Class Hierarchy

In the Scryber codebase:

**HTMLiFrame**:
- Extends `Div` → `Panel` → `ContainerComponent` → `VisualComponent`
- Decorated with `[PDFRemoteParsableComponent("iframe", SourceAttribute = "src")]`
- Supports `allow` (`AllowPolicy` / `DocumentPermissionsPolicy`) for the ten-type content permissions policy
- Overrides content binding so `data-content` enforces the same policy as `src`
- Default display mode: `block`

**HTMLEmbed**:
- Extends `VisualComponent` → `Component`
- Decorated with `[PDFRemoteParsableComponent("embed", SourceAttribute = "src")]`
- Implements `IInvisibleContainer` interface
- Simpler component model without style isolation

---

## Examples

### Basic Content Inclusion

```html
<!-- Load header from external file -->
<iframe src="templates/header.html"></iframe>

<div class="content">
    <h1>Main Document Content</h1>
    <p>This is the main document content...</p>
</div>

<!-- Load footer from external file -->
<embed src="templates/footer.html" />
```

### Modular Document Composition

```html
<!DOCTYPE html>
<html>
<head>
    <title>Modular Report</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .section { margin: 20pt 0; }
    </style>
</head>
<body>
    <!-- Company header -->
    <iframe src="partials/company-header.html"></iframe>

    <!-- Executive summary -->
    <div class="section">
        <iframe src="reports/executive-summary.html"></iframe>
    </div>

    <!-- Financial data -->
    <div class="section">
        <iframe src="reports/financial-data.html"></iframe>
    </div>

    <!-- Charts and graphs -->
    <div class="section">
        <iframe src="reports/charts.html"></iframe>
    </div>

    <!-- Legal footer -->
    <embed src="partials/legal-footer.html" />
</body>
</html>
```

### Dynamic Content Loading





{% raw %}
```html
<!-- With model = { headerTemplate: "header-v2.html", footerTemplate: "footer-standard.html" } -->

<iframe src="{{model.headerTemplate}}"></iframe>

<div class="main-content">
    <h1>{{model.title}}</h1>
    <p>{{model.description}}</p>
</div>

<iframe src="{{model.footerTemplate}}"></iframe>
```
{% endraw %}





### Dynamic Content with data-content

Bind markup directly instead of loading it from a source path — the same `allow` policy is enforced on the bound content:

{% raw %}
```html
<!-- Model: { customer: { name: "Acme Corp" }, sectionHtml: "<h2>Notes</h2><p>Follow up next week.</p>" } -->

<iframe data-content="{{model.sectionHtml}}"
        allow="data-passthrough any; inner-images any"></iframe>

<!-- data-passthrough lets the bound content see the parent's model -->
<iframe data-content="<div>For {{model.customer.name}}</div>"
        allow="data-passthrough any"></iframe>
```
{% endraw %}

See the [data-content attribute reference](/reference/htmlattributes/attributes/attr_data_content.html) for `data-content-type` (HTML, XHTML, Markdown) and `data-content-action` (append/prepend/replace).

### Styled Iframe with Dimensions

```html
<style>
    .embedded-content {
        width: 100%;
        min-height: 300pt;
        border: 1pt solid #ccc;
        padding: 15pt;
        background-color: #f9f9f9;
    }
</style>

<iframe src="content/article.html" class="embedded-content"></iframe>
```

### Iframe with Passthrough Styling

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Helvetica', sans-serif;
            color: #333;
            font-size: 11pt;
        }

        h1 { color: #336699; }
        h2 { color: #5588bb; }
    </style>
</head>
<body>
    <!-- Content inherits parent styles -->
    <iframe src="section1.html" allow="style-passthrough any"></iframe>

    <!-- Content uses its own styles only (explicit) -->
    <iframe src="section2.html" allow="style-passthrough none"></iframe>

    <!-- Default behavior (style-passthrough denied by default) -->
    <iframe src="section3.html"></iframe>
</body>
</html>
```

### Conditional Content Loading





{% raw %}
```html
<!-- With model = { showHeader: true, showFooter: false } -->

<iframe src="header.html" hidden="{{model.showHeader ? '' : 'hidden'}}"></iframe>

<div class="content">
    <h1>Document Content</h1>
</div>

<iframe src="footer.html" hidden="{{model.showFooter ? '' : 'hidden'}}"></iframe>
```
{% endraw %}





### Loading Remote Content

```html
<!-- Load from remote API -->
<iframe src="https://api.example.com/templates/header?format=html"></iframe>

<!-- Load from CDN -->
<embed src="https://cdn.example.com/shared/footer.html" />

<!-- Load from internal network -->
<iframe src="http://internal.company.com/templates/disclaimer.html"></iframe>
```

### Multi-Language Support





{% raw %}
```html
<!-- With model = { language: "en", region: "US" } -->

<iframe src="i18n/{{model.language}}/header.html"></iframe>

<div class="content">
    <iframe src="i18n/{{model.language}}/{{model.region}}/content.html"></iframe>
</div>

<iframe src="i18n/{{model.language}}/footer.html"></iframe>
```
{% endraw %}





### Nested Iframes

```html
<!-- main-document.html -->
<div>
    <h1>Main Document</h1>
    <iframe src="section-with-subsections.html"></iframe>
</div>

<!-- section-with-subsections.html -->
<div class="section">
    <h2>Section Title</h2>
    <iframe src="subsection-a.html"></iframe>
    <iframe src="subsection-b.html"></iframe>
</div>
```

### Template Variations





{% raw %}
```html
<!-- With model = { templateVersion: 2, customerType: "premium" } -->

<iframe src="headers/header-v{{model.templateVersion}}.html"></iframe>

<div class="main-content">
    <!-- Customer-specific content -->
    <iframe src="content/{{model.customerType}}/main.html"></iframe>
</div>

<iframe src="footers/footer-{{model.customerType}}.html"></iframe>
```
{% endraw %}





### Iframe with Fallback Content

```html
<iframe src="remote-content.html">
    <!-- Fallback content if loading fails -->
    <div style="padding: 20pt; background-color: #fff3cd; border: 1pt solid #ffc107;">
        <h3 style="margin-top: 0;">Content Unavailable</h3>
        <p>The remote content could not be loaded. This is fallback content.</p>
    </div>
</iframe>
```

### Reusable Components

```html
<!-- Load reusable table header -->
<table style="width: 100%;">
    <thead>
        <tr>
            <embed src="components/table-header.html" />
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
        </tr>
    </tbody>
</table>
```

### Dynamic Report Sections





{% raw %}
```html
<!-- With model.sections = [{src: "intro.html"}, {src: "analysis.html"}, {src: "conclusion.html"}] -->

<div class="report">
    <h1>{{model.title}}</h1>

    <template data-bind="{{model.sections}}">
        <div class="report-section">
            <iframe src="sections/{{.src}}" style="width: 100%; margin: 15pt 0;"></iframe>
        </div>
    </template>
</div>
```
{% endraw %}





### Themed Document Assembly

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* Global theme styles */
        body {
            font-family: 'Georgia', serif;
            color: #2c3e50;
            line-height: 1.6;
        }

        .theme-primary { color: #3498db; }
        .theme-secondary { color: #2ecc71; }
    </style>
</head>
<body>
    <!-- All iframes with passthrough will inherit theme -->
    <iframe src="sections/cover.html" allow="style-passthrough any"></iframe>
    <iframe src="sections/toc.html" allow="style-passthrough any"></iframe>
    <iframe src="sections/chapter1.html" allow="style-passthrough any"></iframe>
    <iframe src="sections/chapter2.html" allow="style-passthrough any"></iframe>
</body>
</html>
```

### Page-Specific Headers/Footers

```html
<!DOCTYPE html>
<html>
<head>
    <title>Multi-Section Report</title>
</head>
<body>
    <!-- Section 1 with specific header -->
    <div style="page-break-after: always;">
        <iframe src="headers/section1-header.html"></iframe>
        <div class="content">Section 1 content...</div>
    </div>

    <!-- Section 2 with different header -->
    <div style="page-break-after: always;">
        <iframe src="headers/section2-header.html"></iframe>
        <div class="content">Section 2 content...</div>
    </div>

    <!-- Section 3 with another header -->
    <div>
        <iframe src="headers/section3-header.html"></iframe>
        <div class="content">Section 3 content...</div>
    </div>
</body>
</html>
```

### Email Template Embedding





{% raw %}
```html
<!-- Load email signature from shared template -->
<div class="email-body">
    <p>Dear {{model.recipientName}},</p>
    <p>{{model.messageBody}}</p>

    <iframe src="templates/signatures/{{model.senderDepartment}}.html"></iframe>
</div>
```
{% endraw %}





### Form Components

```html
<div class="application-form">
    <h1>Application Form</h1>

    <!-- Applicant information section -->
    <iframe src="form-sections/applicant-info.html"></iframe>

    <!-- Employment history section -->
    <iframe src="form-sections/employment-history.html"></iframe>

    <!-- References section -->
    <iframe src="form-sections/references.html"></iframe>

    <!-- Legal disclaimers -->
    <embed src="form-sections/legal-disclaimers.html" />
</div>
```

### API-Driven Content





{% raw %}
```html
<!-- With model = { apiEndpoint: "https://api.example.com", reportId: "12345" } -->

<div class="report">
    <!-- Load report header from API -->
    <iframe src="{{model.apiEndpoint}}/reports/{{model.reportId}}/header.html"></iframe>

    <!-- Load report body from API -->
    <iframe src="{{model.apiEndpoint}}/reports/{{model.reportId}}/body.html"
            style="min-height: 500pt;"></iframe>

    <!-- Load report footer from API -->
    <iframe src="{{model.apiEndpoint}}/reports/{{model.reportId}}/footer.html"></iframe>
</div>
```
{% endraw %}





### Responsive Container Sizing

```html
<style>
    .responsive-container {
        width: 100%;
        min-height: 200pt;
        max-height: 600pt;
        overflow: hidden;
    }
</style>

<div class="responsive-container">
    <iframe src="flexible-content.html" style="width: 100%; height: auto;"></iframe>
</div>
```

### Conditional Regional Content





{% raw %}
```html
<!-- With model = { country: "US", state: "CA" } -->

<div class="regional-document">
    <!-- Country-specific header -->
    <iframe src="content/{{model.country}}/header.html"></iframe>

    <!-- State/province-specific content -->
    <iframe src="content/{{model.country}}/{{model.state}}/main.html"></iframe>

    <!-- Country-specific footer with legal info -->
    <iframe src="content/{{model.country}}/legal-footer.html"></iframe>
</div>
```
{% endraw %}





### Complex Document Structure

```html
<!DOCTYPE html>
<html>
<head>
    <title>Annual Report</title>
</head>
<body>
    <!-- Cover page -->
    <div style="page-break-after: always;">
        <iframe src="report/cover.html"></iframe>
    </div>

    <!-- Table of contents -->
    <div style="page-break-after: always;">
        <iframe src="report/toc.html"></iframe>
    </div>

    <!-- Executive summary -->
    <div style="page-break-after: always;">
        <iframe src="report/executive-summary.html" allow="style-passthrough any"></iframe>
    </div>

    <!-- Financial statements -->
    <div style="page-break-after: always;">
        <h1>Financial Statements</h1>
        <iframe src="report/balance-sheet.html"></iframe>
        <iframe src="report/income-statement.html"></iframe>
        <iframe src="report/cash-flow.html"></iframe>
    </div>

    <!-- Notes to financial statements -->
    <div style="page-break-after: always;">
        <iframe src="report/financial-notes.html"></iframe>
    </div>

    <!-- Management discussion -->
    <div style="page-break-after: always;">
        <iframe src="report/management-discussion.html"></iframe>
    </div>

    <!-- Appendices -->
    <div>
        <h1>Appendices</h1>
        <iframe src="report/appendix-a.html"></iframe>
        <iframe src="report/appendix-b.html"></iframe>
        <iframe src="report/appendix-c.html"></iframe>
    </div>
</body>
</html>
```

---

## See Also

- [allow attribute](/reference/htmlattributes/attributes/attr_allow.html) - Full content permissions policy reference
- [data-content attribute](/reference/htmlattributes/attributes/attr_data_content.html) - Dynamic content binding, including markdown transform
- [object](/reference/htmltags/elements/html_object_element.html) - Object element for file attachments
- [picture](/reference/htmltags/elements/html_picture_element.html) - Picture element for responsive images
- [img](/reference/htmltags/elements/html_img_element.html) - Image element
- [div](/reference/htmltags/elements/html_div_element.html) - Container element
- [template](/reference/htmltags/elements/html_template_element.html) - Template element for data binding
- [Data Binding](/reference/binding/) - Data binding and expressions
- [Document Parser](/reference/parser/) - HTML/XML parsing in Scryber
- [Remote Resources](/reference/resources/) - Loading remote content

---
