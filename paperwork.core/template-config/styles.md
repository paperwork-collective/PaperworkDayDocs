---
layout: default
render_with_liquid: false
title: Styles
nav_order: 2
parent: Template Configuration
parent_url: /paperwork.core/template-config/
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
has_children: false
has_toc: false
---
# Styles
{: .no_toc }

The `styles` list holds CSS that is added to the document. Each one is a [content item](/paperwork.core/template-config/), and the name is optional.

```json
"styles": [
  { "name": "base",  "type": "Content", "content": "body { font-family: Helvetica; font-size: 11pt; }" },
  { "name": "brand", "type": "Source",  "source": "https://example.com/brand.css" }
]
```

## How they apply

Each style is added to the head of the main layout, in the order they are listed, so a later style can override an earlier one. Styles written in the layout itself apply as normal, along with the template's own `<link>` stylesheets.

The CSS is the same language described in the [CSS reference](/paperwork.core/reference/cssproperties/), including `@page`, `@font-face` and CSS variables.

## Fonts and images

Fonts and images referred to from a style, with `url(...)`, are loaded when the document is generated.

## In code

The same styles are added to a [builder](/paperwork.core/quickstart/builder.html#styles) with `WithStyle`, `WithStyleFile` and `WithStyleUrl`.
