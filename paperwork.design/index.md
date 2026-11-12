---
layout: default
render_with_liquid: false
title: Paperwork.Design
nav_order: 1
has_children: true
has_toc: false
description: "The Paperwork template designer: build or import a document template, preview it with your data, then publish it or export it to share."
---
# Paperwork.Design
{: .no_toc }

**The Designer is where you build document templates and choose who can use them. It's for the people who design templates and the people who run them for a team.**

A template is an HTML and CSS layout, JSON data, and fields for the values that change each time. In the Designer you build one visually or in code, preview it with your data, check each change in as a version, and publish it. Once it's published, people, scripts and AI can all make documents from that one version.

### Who it is for

- Designers and frontend developers who build templates (Editors).
- The people who decide which templates a team uses, and who can use them (Publishers).
- Anyone who wants to build templates of their own in My templates (Writers).

### Use it when

- You need to make a template or change one.
- You want everyone on a team to use the same approved version of a document.
- You want to bring in a Word document and turn it into a template.

### Use something else when

| If you need... | Use |
|---|---|
| To give people a document from a link or on your site | [Paperwork.Viewer](/paperwork.view/) |
| Documents made by a script, on a schedule, or in a pipeline | [Paperwork.CLI](/paperwork.cli/) |
| Documents made inside your own .NET application | [Paperwork.Core](/paperwork.core/) |
| Claude to write a template or make a document for you | [Paperwork.Skill](/paperwork.skill/) |

Open the designer at [paperwork.design](https://paperwork.design/).

## The workflow

1. **[Create or import](/paperwork.design/creating.html)** a template: start blank, bring in a Word document, paste content, or start from a Blueprint.
2. **[Edit it](/paperwork.design/editing.html)**: design visually or in code, add fields, data and assets, and watch the preview.
3. **[Publish and share it](/paperwork.design/publishing.html)**: publicly, just for you, or privately to a collection, then embed it or generate from it with the [CLI](/paperwork.cli/).

## Accounts and licences

Anyone can open a public template without an account. To build templates you sign in, and every account starts as a Writer. A Writer can publish their own templates to the public library; publishing a template just for yourself, unlisted, needs an Editor licence or above. Publishing to a collection needs a Publisher licence. See [Roles and access](/roles/) for what each licence can do.

## The template language

Everything you write in a template uses the same HTML, CSS and expression language as the other products. It is documented in [Paperwork.Reference](/paperwork.core/reference/).

## Related pages

- [Concepts and glossary](/concepts/): the pieces of Paperwork, and what each word means.
- [Data and fields](/data-and-fields/): how a template gets its values and its lists.
- [Portals](/portals/) and [Signing in](/signing-in/).
