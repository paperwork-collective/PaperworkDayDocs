---
layout: default
render_with_liquid: false
title: Paperwork.View
nav_order: 2
has_children: true
has_toc: false
---
# Paperwork.View
{: .no_toc }

**Online Viewer.** View a template id or HTML content. Embed in any site, or link to it.

The viewer turns a Paperwork template into a document in the browser, with page navigation, zoom and download. Because it runs in the visitor's browser, the document is generated for that visitor, with their data. Use it to preview a template, give people a link to a document, or put a live document inside your own web pages.

Open the viewer directly at [paperwork.vu](https://paperwork.vu/).

## Three ways to use it

| Way | Use it when |
|---|---|
| [A link](/paperwork.view/links.html) | You want to share a document or template with a web address, with nothing to build. |
| [Embed with HTML](/paperwork.view/embedding.html) | You want a viewer on a page and are happy to describe it with `data-pw-*` attributes. |
| [Embed with JavaScript](/paperwork.view/javascript.html) | You want to choose the template at run time, send your own data, or get the generated PDF back into your code. |

All three share the same [viewer options](/paperwork.view/options.html): the toolbar preset, the zoom level, the side panel and which actions are available.

## What it shows

The viewer can show:

- a **published template**, by its id: public, personal, or in a collection;
- **your own content**, sent from the page: HTML layouts, CSS styles, JSON data and field values.

Templates are created and published in [Paperwork.Design](/paperwork.design/). The HTML, CSS and expression language they use is the same one documented in [Paperwork.Reference](/paperwork.core/reference/).
