---
layout: default
render_with_liquid: false
title: Concepts and glossary
nav_order: 2
permalink: /concepts/
has_children: false
has_toc: false
description: "How Paperwork fits together in one page, and what each word means: template, field, version, collection, portal and the rest."
---

# Concepts and glossary
{: .no_toc }

## How the pieces fit

You build a **template** in the Designer. You check it in as a **version**, and publish that version: to everyone, to just you, or to a **collection**. People, scripts and AI then make **documents** from that one version, using the Viewer, the command line, the Core library or the skill. Each document takes its own **field** values and **data**.

For the whole picture, see [How it fits together](/overview.html).

## Glossary

| Word | What it means |
|---|---|
| **Asset** | An image, font or file a template uses. Shared assets are public, so anyone can read them and only the owner can change them. |
| **Blueprint** | A published example template that others can copy as their own starting point. |
| **Check in, check out** | To change a template you check it out, and nobody else can change it. When you check it in, a version is saved. |
| **Collection** | A shared space for a team's templates. Only its members see them. A Publisher creates it and decides who is in it. |
| **Data** | A list or a record a template reads, such as invoice lines. See [Data and fields](/data-and-fields/). |
| **Document** | What a template makes: a PDF. |
| **Editor** | A licence for people who build templates. Includes everything a Writer can do. |
| **Engine** | The part of Paperwork that lays out and writes the document. A template keeps running on the engine release it was published with. See [Choose the engine version](/paperwork.view/engine-version.html). |
| **Field** | A single value that changes each time, such as a date or a customer name. See [Data and fields](/data-and-fields/). |
| **Layout** | The HTML of a template. |
| **Personal** | A way to publish a template just for yourself, signed in. It is not listed. |
| **Portal** | A Paperwork site with its own admins and settings. See [Portals](/portals/). |
| **Public** | A way to publish a template so anyone can use it. It is listed in the published templates. |
| **Publish** | To make a version the one that people use. You choose where: public, personal or a collection. |
| **Publisher** | A licence for people who share templates with a team. Includes everything an Editor can do. |
| **Reference** | The id of a published template, written `owner:name`. It is what the Viewer and the CLI use to find it. |
| **Style** | The CSS of a template. |
| **Template** | A layout, styles, data, fields and assets, held together as one file. |
| **Version** | A saved state of a template, made when you check it in. The published version is the one people use. |
| **Viewer** | The part of Paperwork that shows a published template as a document in a web browser. See [Paperwork.Viewer](/paperwork.view/). |
| **Writer** | The licence every account starts with. A Writer fills in templates and builds their own in My templates. |

## Next

- [Roles and access](/roles/): what each licence can do.
- [Data and fields](/data-and-fields/).
- [Portals](/portals/).
