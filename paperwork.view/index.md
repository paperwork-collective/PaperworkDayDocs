---
layout: default
title: Paperwork.View
nav_order: 2
has_children: false
has_toc: false
---

# Paperwork.View
{: .no_toc }

**Online Viewer.** View a template id or HTML content. Embed in any site, or link to it.

{: .note }
> Full documentation for Paperwork.View is being written. What is below is a summary; the template reference (HTML, CSS and expressions) applies to all of the products and is in [Paperwork.Reference](/paperwork.core/reference/).

## Embedding

Load the embed library, then declare a container. The viewer starts as the container scrolls into view.

```html
<script src="https://paperwork.vu/er.js"></script>

<div data-pw-container="invoice"
     data-pw-template="your-template-id"
     data-pw-ui="Minimal"
     data-pw-zoom="FullWidth"
     data-pw-height="520px"></div>
```

Use `data-pw-collection` only for templates in a private collection. The `data-pw-ui` presets are `Default`, `Minimal` and `Sample`.

Open the viewer directly at [paperwork.vu](https://paperwork.vu/).
