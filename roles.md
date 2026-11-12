---
layout: default
render_with_liquid: false
title: Roles and access
nav_order: 4
permalink: /roles/
has_children: false
has_toc: false
description: Who can do what in Paperwork. Writers, Editors, Publishers and portal admins, where a template can be published, and who sees it.
---

# Roles and access
{: .no_toc }

**Who can do what.** Writers fill in, Editors build, Publishers share, and portal admins run the portal.

Access in Paperwork is closed by default. Signing in shows nothing of your organisation's: people only see a collection's templates once a Publisher adds them to it.

1. TOC
{:toc}

## The roles at a glance

| Role | Typically | Can |
|---|---|---|
| **Anyone** | Customers, the public | Open a public template and create a document from it, without an account. |
| **Writer** | Staff, clients and partners who fill in documents | Fill in the templates shared with them and create documents. Have their own **My templates** collection for templates of their own. |
| **Editor** | Designers and frontend developers | Build and change templates, check in versions, and publish a template personally. |
| **Publisher** | Team leads, document owners | Create collections, publish templates to them, decide who is a member, and assign the licences they've bought. |
| **Portal admin** | IT, the account owner | Manage the portal's settings, including the domains templates may call. |

Writer, Editor and Publisher are licences, and each can do everything the ones before it can. Portal admin isn't a licence: it's a list of people on the portal's settings, given to whoever runs the portal, usually alongside a Publisher licence.

## Writers

Writers are the people who use your templates day to day. They sign in with an account they already have (Microsoft, Google or GitHub) and see only the collections they've been added to.

- They fill in templates and create documents, in the [Viewer](/paperwork.view/) or the [Designer](/paperwork.design/).
- They get their own **My templates** collection, for templates they make themselves. They can publish their own templates publicly, but never a collection's template.
- They can export their own templates, but never a collection's, so your approved templates don't multiply.

## Editors

Editors build the templates. Most often that's a designer or a frontend developer working in HTML and CSS, with a developer providing the data.

- They create templates, import them from Word (beta) or other sources, and edit them visually or in code.
- They [check templates out and in](/paperwork.design/publishing.html), so every change is a saved version.
- They can publish a template of their own **personally**: it isn't listed, and only they can use it, signed in. That's useful for testing a template before it goes to a collection.
- They can export their own templates as a single file, for use with the [CLI](/paperwork.cli/) or the [Core library](/paperwork.core/), including templates they created in a collection.

An Editor needs an editor licence. To work on a collection's templates, they also need to be an editor of that collection.

## Publishers

Publishers decide what a collection's members can use, and who those members are.

- They publish a checked-in version to a collection. It becomes the version every member, app, script and AI uses from then on.
- They add and remove members of the collection, and choose each member's role in it: publisher, editor or writer. A member can only use a role their licence includes, so an editor role does nothing for someone with a Writer licence.
- They can export any of the collection's templates.
- They assign the licences they've bought to people in their organisation, and remove them.

<!-- SCREENSHOT 2: a collection's members list with each member's role. Sample names only. -->

## Portal admins

Portal admins run your organisation's portal.

- They manage the portal's settings, including the **allow-list and block-list of domains** that templates may call. The lists apply to everything a document fetches while it's made (data, images, fonts) and to connectors, in the Designer, the Viewer and the CLI.
- With a template's owner and a collection's Publishers and Editors, they can read the generation history: when a document was made, from which template and by whom. Never the document itself.

When a Publisher removes someone's licence, that person is also taken out of the collections they belonged to. See [When someone leaves](/security/#when-someone-leaves) for how quickly open sessions end.

## Where a template can be published

| Publish to | Who can use it | Who can publish there |
|---|---|---|
| **Public** | Anyone. It's listed in the published templates. | The owner of a template in **My templates**, from Writer up |
| **Personal** | Only its owner, signed in. It isn't listed. | The owner of a template in **My templates**, with an Editor or Publisher licence |
| **A collection** | Only the members of that collection. | Publishers of that collection |

A collection's template is only ever published to its collection, never publicly.

<!-- SCREENSHOT 1: the Designer's check-in dialog with the "Publish to" choices (Public, Personal, a collection). Light theme, sample template, no real names. -->

Whatever the route, people and tools always use a **published version**. Drafts and checked-out changes never reach them. See [Publish and share](/paperwork.design/publishing.html).

## Developers and designers

Paperwork splits the document work so each person does what they know:

- **Developers** provide the data and the integration: a feed or API the template reads, or data passed in from the [Core library](/paperwork.core/), the [CLI](/paperwork.cli/) or the [Paperwork.Viewer](/paperwork.view/javascript.html). They don't need an Editor licence to create documents from a published template. A public template needs no sign-in. A collection's template needs them signed in as a member of the collection, in any role. A personal template only works for its owner.
- **Designers and frontend developers** build the template as Editors, and a Publisher shares it.

A change to a document is a new published version, not a code change.

## Related

- [Security and IT](/security/): where documents are made, where data is held, and what happens when someone leaves.
- [How it fits together](/overview.html): the solutions and how they share one template.
