---
layout: default
title: Home
has_children: true
has_toc: false
nav_order: 0
---

# Learn Scryber, and the Core library
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

# About Scryber

Scryber.Core is a powerful, open-source .NET library for generating professional PDF documents simply from HTML templates. It include CSS styling and (handlebar-esque) binding to data, enabling designers and developers to quickly create flexible, dynamic, data-driven documents and reports with ease.

Check out the [Quick Start](/quickstart/quickstart_core) to jump straight in and get to know some of the capabilities

### Feature Support Charts

1. [HTML Tags](/quickstart/feature_html_tags) - All supported HTML elements, including Scryber-specific extensions (`<continuation-header>`, `<page>`, `<if>`, etc.) and elements that are not supported.
2. [CSS Styles](/quickstart/feature_css_styles) - Selectors, at-rules, and all style properties — including what is partial or PDF-specific, and what is new in recent versions (flex, grid, column-rule, contain).
3. [SVG Drawing](/quickstart/feature_svg) - Supported SVG elements and attributes, inclusion methods, and what is not supported (filters, animations).
4. [Binding Expressions](/quickstart/feature_binding) - All handlebars helpers, operators, special variables, and the full function library (90+ functions across conversion, string, math, date, collection, and statistical categories).

---

## Benefits

- **Clear separation of content and presentation**: A fundamental principle of good design and development.
- **Rapid learning curve**: Using standard and commonly known languages to define structure and style, with (x)html, css, svg and handlebars.
- **Beautiful documents and reports**: With ease of creation, comes the ability to invest effort in the output design, and quickly prototype new options.
- **Low/no code solutions**: Utilise existing interfaces with dynamic templates to rapidly create content.
- **Repeatability and adaptability**: Adding flexible layouts so templates can be reused and automated, and add re-usable parts for multiple templates.
- **Easy maintenance**: Quickly update content, adjust styles, modify embeded content without re-building or re-release.

## Key Features

- **HTML/CSS-Based Templating**: Define your document structure using familiar HTML and CSS, making it easy to design and maintain templates
- **Data Binding**: Bind data from your application directly into your documents with powerful expression and function support
- **Dynamic Styling**: Use calc, relative units and bound data to dynamically alter reports and documents
- **Multi-page Support**: Create complex, multi-page documents with headers, footers, and page breaks
- **Rich Content**: Include images, SVG graphics, tables, lists, and charts
- **Font Support**: Use system fonts, embedded fonts, or remote fonts like Google Fonts
- **Content Embedding**: Inject dynamic SVG graphics, complex rich content and document attachments at runtime
- **Flexible Output**: Generate PDFs in-memory, save to disk, or stream to HTTP responses
- **Cross-platform**: Run on Windows, macOS, iOS, and Linux with .NET
- **WASM Support**: Full support for asyncronous operation including pure client side execution.
- **Update or modify PDF's**: Add or remove pages, or overlay new content onto existing PDF files. 
- **Secure or protect**: A output documents can be 'secured' with an owner password and also protected with a required user password.

---

{: .note }
> The documentation is **IN REVIEW** phase. The reference section will be more accurate than the learing guides as it is rolled out. 
>
> If you do discover an inconsistency whilst trying to do something. Then check the reference section, if it's still incorrect then please do reach out via the [GitHub](https://github.com/richard-scryber/scryber.core) issue and discussion tabs.

---

## Getting Around

This documentation is meant to support your use of the library. The navigation on the left (or top) will allow you to move around the docs without visiting every page in turn.

Most pages contain a table of contents for that page, itself, and then further links so you can dive deeper of move to a related subject.

Finally if you know what you are looking for, then the search is available at the top.

---


## Learning the Scryber.Core library [->](/learning/)

The first section is for the Learing guides which covers the capabilities the library in general terms.

There are 8 individual modules

1. [Getting Started](learning/01_getting_started) - This comprehensive guide will take you from complete beginner to confident PDF document creator.
2. [Data Binding and Expressions](learning/02-data-bindng) - Transform static templates into dynamic, data-driven PDF documents with Scryber’s powerful data binding system.
3. [Styling and Appearance](learning/03-styling) - Master CSS styling to create beautiful, professional-looking PDF documents with Scryber.Core.
4. [Layout and Positioning](learning/04-layout) - Master page-based layout, positioning, and document structure to create professional multi-page PDF documents.
5. [Tyography and Fonts](learning/05-typography) - Use the advanced typography and font features, including font properties, custom fonts, using remote fonts sucha as Google fonts and FontAwesome text spacing, alignment, and advanced typographic techniques for professional PDF documents.
6. [Content Components](learning/06-content) - Start adding images, SVG graphics, lists, tables, and embedded content to create rich, data-driven PDF documents.
7. [Document Configuration](learning/07-configuration) - Configure logging, security, conformance, and optimization for production-ready PDF documents.
8. [Practical Applications](learning/08-poctical) - Learn through complete, real-world examples - from invoices to reports, certificates to catalogs. Highlighting specific features.

---

## Reference section [->](/reference/)

The reference section is split into 7 sections covering each of the major components with examples of usage, and samples.

1. [HTML Elements](reference/htmltags) - The HTML tags such as `<html>`, or `<div>` within a template or referernced source give the structure and content to your document
2. [HTML Attributes](reference/htmlattributes) - This section details all the attributes that the core library supports suc as `@id` and `@class`, along with the supported values for the attribute.
3. [CSS Selectors][reference/cssselectors/] - This sections details all the supported (and not supported) selectors in the library (`#id`, `.class`), along with at rules such as `@media` and `@font-face`.
4. [CSS Properties](reference/cssproperties/) - Styling properties such as `font-style: italic;` or `background-image: var(model.logo);` are defined within selectors to be applied to matching content tags, or drawing elements.
5. [Binding Operators and Functions](reference/binding) - Covers all data binding structures available in Scryber templates, including Handlebars [helpers](reference/binding/helpers/), [operators](reference/binding/operators) like (`+`, `%` and `??`), and expression [functions](reference/binding/functions/) like `substring` and `count`.
6. [SVG Elements](reference/svgelements) - This section details all the SVG Drawing elements that the core library supports such as `path`, `marker` and `image`, along with the available (and unavailable attributes) that the tag supports.
7. [SVG Attributes](reference/svgattributes) - This section details all the attributes that the core library supports (`viewport`, `cx`, `cy` etc.), along with the supported values for the attribute, and also elements they can be used on.

## Configuration and Extension section [->](/configuration/)

This covers advanced library topics that allow developers to enhance the current capabilites.

1. [Processing Instructions](processing-instructions) - The document level configuration for logging, parsing and controllers.

