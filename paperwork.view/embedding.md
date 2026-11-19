---
layout: default
render_with_liquid: false
title: Embed with HTML
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 5
has_children: false
has_toc: false
description: "Put the Paperwork Viewer on a web page with data-pw attributes and one script, with no JavaScript of your own."
---
# Embed with HTML
{: .no_toc }

## What you'll do

Put the Viewer on a web page with one script and an empty element described by `data-pw-*` attributes. You do not write any JavaScript.

## Before you start

- A published template and its id. The id is `{owner}:{name}`, as in `paperwork:invoice-sample`.
- A web page you can edit. A public template needs nothing else. A template in a private collection needs the visitor to sign in.

## Steps

**1. Load the embed library and describe the viewer.**

```html
<script src="https://paperwork.vu/er.js"></script>

<div data-pw-container="invoice"
     data-pw-template="paperwork:invoice-sample"
     data-pw-ui="Minimal"
     data-pw-zoom="FullWidth"
     data-pw-height="520px"></div>
```

**2. Open the page.** When it loads, the library finds every element with `data-pw-container` and places the viewer inside it. A viewer is only started when its element scrolls into view, so a page with several of them stays quick, including on a phone.

<div class="pw-shot"><span class="pw-shot-id">V29</span><span class="pw-shot-what">An intranet page with a document open in it, between a heading and some text.</span><span class="pw-shot-file">assets/images/viewer/v29-intranet-embed.png</span></div>

<div class="pw-shot"><span class="pw-shot-id">V30</span><span class="pw-shot-what">A page with two viewers, each with its own name, one below the other.</span><span class="pw-shot-file">assets/images/viewer/v30-two-viewers.png</span></div>

## The attributes

These are the attributes you can set on the element.

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
> The id of a template is `{owner}:{name}`, as in `paperwork:invoice-sample`. For a public template, leave `data-pw-collection` out. Passing a collection for a public template asks the visitor to sign in.

The options are explained further in [Viewer options](/paperwork.view/options.html).

## Check it worked

Open the page. A viewer should appear where the element is and show the template. If the element stays empty, see [Troubleshooting](/paperwork.view/troubleshooting.html).

## Several viewers

Give each viewer its own name:

```html
<div data-pw-container="summary" data-pw-template="acme:summary" data-pw-ui="Minimal"></div>
<div data-pw-container="detail"  data-pw-template="acme:detail"  data-pw-ui="Default"></div>
```

## Next

- [Embed with JavaScript](/paperwork.view/javascript.html), to choose the template or the data from your own code.
- [Show your own content](/paperwork.view/send-content.html), to send a layout, styles and data from the page.
- [Viewer options](/paperwork.view/options.html).
