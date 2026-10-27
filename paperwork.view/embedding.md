---
layout: default
render_with_liquid: false
title: Embed with HTML
parent: Paperwork.View
parent_url: /paperwork.view/
nav_order: 2
has_children: false
has_toc: false
---
# Embed with HTML
{: .no_toc }

The simplest embed needs no JavaScript of your own. Load the embed library, then describe each viewer with `data-pw-*` attributes on an empty element.

```html
<script src="https://paperwork.vu/er.js"></script>

<div data-pw-container="invoice"
     data-pw-template="richard-prod:invoice-example"
     data-pw-ui="Minimal"
     data-pw-zoom="FullWidth"
     data-pw-height="520px"></div>
```

When the page loads, the library finds every element with `data-pw-container` and places the viewer inside it. A viewer is only started when its element scrolls into view, so a page with several of them stays quick, including on a phone.

## The attributes

| Attribute | Description |
|---|---|
| `data-pw-container` | Marks the element as a viewer, and gives it a name. Each viewer on a page needs a different name. |
| `data-pw-template` | The id of the template to show. |
| `data-pw-collection` | The collection id, only for a template in a private collection. |
| `data-pw-ui` | The toolbar preset: `Default`, `Minimal` or `Sample`. |
| `data-pw-zoom` | `FullPage`, `FullWidth`, `Hidden` or a percentage. |
| `data-pw-sidebar` | `Default`, `Closed`, `Thumbs`, `Outline`, `Properties` or `None`. |
| `data-pw-actions` | `All`, `None` or a list of actions. |
| `data-pw-theme` | `light` or `dark`, which fixes the colours and hides the viewer's own theme switch. |
| `data-pw-width`, `data-pw-height` | The size of the viewer. The default is the full size of the element. |
| `data-pw-library` | Show the signed-in visitor's own templates and collections. |
| `data-pw-js-init` | Start the viewer without showing a template, so your JavaScript can supply one. See [Embed with JavaScript](/paperwork.view/javascript.html). |

{: .note }
> The id of a template is `{owner}:{name}`, as in `richard-prod:invoice-example`. For a public template, leave `data-pw-collection` out. Passing a collection for a public template asks the visitor to sign in.

The options are explained further in [Viewer options](/paperwork.view/options.html).

## Several viewers

Give each viewer its own name:

```html
<div data-pw-container="summary" data-pw-template="acme:summary" data-pw-ui="Minimal"></div>
<div data-pw-container="detail"  data-pw-template="acme:detail"  data-pw-ui="Default"></div>
```
