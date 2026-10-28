---
layout: default
render_with_liquid: false
title: Layouts
nav_order: 1
parent: Template Configuration
parent_url: /paperwork.core/template-config/
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
has_children: false
has_toc: false
---
# Layouts
{: .no_toc }

The `layouts` list holds the HTML of the template. Each one is a [content item](/paperwork.core/template-config/).

```json
"layouts": [
  { "name": "main",   "type": "Content", "content": "<html xmlns='http://www.w3.org/1999/xhtml'>...</html>" },
  { "name": "header", "type": "Content", "content": "<div xmlns='http://www.w3.org/1999/xhtml'>Prepared for {{model.name}}</div>" }
]
```

## The main layout

One layout is the document. It is the one named by `template.mainLayout`, or the one named `main` if that is not set. A template needs a main layout to generate a document.

## Partial layouts

Any other layout is a named partial. The main layout can place it anywhere, with the `$layouts` collection:

```html
<div data-content="{{$layouts.header}}"></div>
```

This is useful for a header, a footer or a section that several templates share. A partial is its own piece of markup, so it declares the XHTML namespace on its root element, as in the example above.

## Loading from a url

A layout can be fetched when the document is generated rather than held in the file:

```json
{ "name": "main", "type": "Source", "source": "https://example.com/templates/invoice.html", "auth": "myApi" }
```

## In code

The same layouts are added to a [builder](/paperwork.core/quickstart/builder.html#layouts) with `WithLayout`, `WithLayoutFile` and `WithLayoutUrl`.
