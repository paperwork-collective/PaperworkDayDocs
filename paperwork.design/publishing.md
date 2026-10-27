---
layout: default
render_with_liquid: false
title: Publish and share
parent: Paperwork.Design
parent_url: /paperwork.design/
nav_order: 3
has_children: false
has_toc: false
---
# Publish and share
{: .no_toc }

## Check out and check in

A template is saved in versions. To change one, **check it out**. While it is checked out nobody else can change it, but any version already published can still be used.

When you are happy, **check it in**. Checking in saves the version so that others who can edit the template can open it. You can keep the template checked out to carry on editing.

## Publish

Choose to publish the version when you check it in. It becomes the new standard version that everyone uses by default. You choose where to publish it:

| Publish to | Who can use it |
|---|---|
| **Public** | Anyone. It is listed in the published templates. |
| **Personal** | Only people you give the link to. It is not listed. Needs an editor licence. |
| **A collection** | Private to the members of the collection. |

Published templates are what the [viewer](/paperwork.view/) shows and what the [CLI](/paperwork.cli/) generates from with `--template`, `--personal` or `--collection`.

## Publish as a Blueprint

A Blueprint is a template that others can import and use as a starting point. Publish your template as one to share it. You can create a new Blueprint, or replace one you published before. Give it a title and a description, and up to ten tags, separated by commas, to help people find it.

## Embed and link

Every template has a unique reference you can use in the viewer, the CLI and your own pages. Choose to **embed** the template to see:

- the **template reference**, and for a collection, the **collection reference**, each with a button to copy it;
- a **link** that opens the template in the [viewer](/paperwork.view/links.html).

The reference is the value for `data-pw-template` in [Embed with HTML](/paperwork.view/embedding.html), and for `--template` in the CLI.

## Export

**Export** downloads a template as a file, which can be imported into another portal. You can set the title, the description, which version to export, and the file name.
