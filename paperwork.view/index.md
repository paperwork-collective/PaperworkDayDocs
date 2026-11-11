---
layout: default
render_with_liquid: false
title: Paperwork.View
nav_order: 2
has_children: true
has_toc: false
description: "The Paperwork Viewer: open, fill in and download a document from a published template, from a link or inside your own web page, with nothing to install."
---
# Paperwork.View
{: .no_toc }

**The Viewer.** Open a published template as a document. Link to it, or embed it in any site.

## What it is

The Viewer is a web page that turns a Paperwork template into a document in the visitor's browser. The visitor sees the pages, can zoom, fill in the template's fields and download the PDF. There is nothing to install, and no account is needed to open a public template.

Because the document is made in the visitor's browser, each visitor gets their own: the values they type, or the values you put in the link, are used for that one document.

Open it directly at [paperwork.vu](https://paperwork.vu/).

## Who it is for

- People who want to give someone a link to a document that is filled in the moment it is opened.
- Developers who want a document to appear inside their own web page, and to react to it from their own code.
- Template builders who want to check how a published template looks to the people who use it.

## Use it when

- The people who need the document are on the web, and you want them to open it, fill it in and download it with no sign-up.
- You want the document inside a page you already have, such as an intranet, a customer portal or a help page.
- The data for the document is known to the page or the link, or the visitor can type it.

## Use something else when

| If you need... | Use |
|---|---|
| Documents made by a script, on a schedule, or in a pipeline, with no browser | [Paperwork.CLI](/paperwork.cli/) |
| Documents made inside your own .NET application | [Paperwork.Core](/paperwork.core/) |
| To make the template itself | [Paperwork.Design](/paperwork.design/) |
| Claude to make the document for you | [Paperwork.Skill](/paperwork.skill/) |

The Viewer also needs a modern web browser, and the first document on a page can take a few seconds to appear while the engine starts.

## Three ways to use it

| Way | Use it when |
|---|---|
| [A link](/paperwork.view/links.html) | You want to share a document with a web address, with nothing to build. |
| [Embed with HTML](/paperwork.view/embedding.html) | You want a viewer on a page and are happy to describe it with `data-pw-*` attributes. |
| [Embed with JavaScript](/paperwork.view/javascript.html) | You want to choose the template at run time, send your own data, or get the generated PDF back into your code. |

All three share the same [viewer options](/paperwork.view/options.html): the toolbar preset, the zoom level, the side panel and which actions are available.

## What it shows

The Viewer can show:

- a **published template**, by its id: public, personal, or in a collection;
- **your own content**, sent from the page: HTML layouts, CSS styles, JSON data and field values. See [Show your own content](/paperwork.view/send-content.html).

Templates are made and published in [Paperwork.Design](/paperwork.design/). The HTML, CSS and expression language they use is the same one documented in the [Reference](/paperwork.core/reference/).

## Start here

[Getting started](/paperwork.view/getting-started.html) takes about ten minutes: open a published template from a link, then put it on a page.
