---
layout: default
render_with_liquid: false
title: Paperwork.Viewer
nav_order: 2
has_children: true
has_toc: false
description: "The Paperwork Viewer: open, fill in and download a document from a published template, from a link or inside your own web page, with nothing to install."
---
# Paperwork.Viewer
{: .no_toc }

**The Viewer is where people open a Paperwork template as a document: they fill in the fields and download the PDF. It is the one place your users go, from a link or from inside your own website or app. Nobody needs to install anything, and no account is needed to open a public template.**

## What it is

The Viewer is a web page that turns a published Paperwork template into a document in the visitor's browser. The visitor sees the pages, can zoom, fill in the template's fields and download the PDF. It is the general access point to Paperwork for the people who use documents. They never use the Designer, which is where templates are made.

Because the document is made in the visitor's browser, each visitor gets their own: the values they type, or the values in the link, are used for that one document.

Open it directly at [paperwork.vu](https://paperwork.vu/).

<div class="pw-shot"><span class="pw-shot-id">V17</span><span class="pw-shot-what">paperwork.vu opened by someone who is not signed in.</span><span class="pw-shot-file">assets/images/viewer/v17-home-signed-out.png</span></div>

<div class="pw-shot"><span class="pw-shot-id">V1</span><span class="pw-shot-what">A document open in the Viewer, default look: the toolbar across the top, the pages below.</span><span class="pw-shot-file">assets/images/viewer/v01-document-open.png</span></div>

## Which of these are you?

The Help here is for the person who sets the Viewer up. Pick the one that sounds like you.

| You are... | You want to... | Start with |
|---|---|---|
| **An IT manager** moving Word templates to Paperwork | Give your employees one place to open a document, fill in the fields and download it | [Give your team one place for documents](/paperwork.view/team-documents.html) |
| **A website or app owner** | Add reports and PDF output to your own site or product | [Embed with HTML](/paperwork.view/embedding.html), or [Embed with JavaScript](/paperwork.view/javascript.html) |
| **Someone sharing a document** | Send a link that opens a document already filled in | [Link to a document](/paperwork.view/links.html) |
| **Someone using a document** | Fill it in and save the PDF | [Fill in a document and download it](/paperwork.view/fill-and-download.html) |

## Who it is for

- IT managers who want their people to get a filled-in document from one address, instead of opening Word.
- Website and app owners who want documents and reports as PDF inside their own pages, and to react to them from their own code.
- Anyone who wants to give someone a link to a document that is made the moment it is opened.
- Template builders who want to check how a published template looks to the people who use it.

## Use it when

- The people who need the document are on the web, and you want them to open it, fill it in and download it.
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

## Ways to use it

| Way | Use it when |
|---|---|
| [One address for your team](/paperwork.view/team-documents.html) | Your people open a collection of templates from one place, signed in. |
| [A link](/paperwork.view/links.html) | You want to share a document with a web address, with nothing to build. |
| [Embed with HTML](/paperwork.view/embedding.html) | You want a viewer on a page and are happy to describe it with `data-pw-*` attributes. |
| [Embed with JavaScript](/paperwork.view/javascript.html) | You want to choose the template at run time, send your own data, or get the generated PDF back into your code. |

All of these share the same [viewer options](/paperwork.view/options.html): the toolbar preset, the zoom level, the side panel and which actions are available.

## What it shows

The Viewer can show:

- a **published template**, by its id: public, personal, or in a collection;
- **your own content**, sent from the page: HTML layouts, CSS styles, JSON data and field values. See [Show your own content](/paperwork.view/send-content.html).

Templates are made and published in [Paperwork.Design](/paperwork.design/). The HTML, CSS and expression language they use is the same one documented in the [Reference](/paperwork.core/reference/).

## Start here

[Getting started](/paperwork.view/getting-started.html) takes about ten minutes: open a published template from a link, then put it on a page. If you are moving Word templates, go to [Give your team one place for documents](/paperwork.view/team-documents.html) instead.

## Related pages

- [Glossary](/glossary/): the pieces of Paperwork, and what each word means.
- [Data and fields](/data-and-fields/): how a template gets its values and its lists.
- [Portals](/portals/) and [Signing in](/signing-in/).
