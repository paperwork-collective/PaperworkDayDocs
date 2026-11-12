---
layout: default
render_with_liquid: false
title: Portals
nav_order: 6
permalink: /portals/
has_children: false
has_toc: false
description: "What a Paperwork portal is, what belongs to it, and what a portal admin manages: the lists of addresses a document may fetch from."
---

# Portals
{: .no_toc }

A portal is a Paperwork site with its own settings. The Designer, the Viewer and the command line all work within one.

## What belongs to a portal

- Templates and collections are kept in a portal. ⚑
- The portal has a list of **admins**. The admins manage the portal's settings. See [Roles and access](/roles/).
- The portal has its own library of Blueprints. ⚑
- An exported template file can be imported into another portal. See [Publishing](/paperwork.design/publishing.html).

## Who runs it

A portal admin is not a licence. It is a list of people on the portal's settings, given to whoever runs Paperwork in your organisation, usually alongside a Publisher licence.

A portal admin can:

- manage the portal's settings, including the lists of addresses described below;
- read the generation history of the portal's templates;
- see deleted templates in the portal. ⚑

Contact requests from the portal go to its admins. ⚑

## Addresses a document may fetch from

While a document is made, it fetches data, images, fonts and connector data. The portal has an **allow-list** and a **block-list** of addresses. They apply to everything a document fetches and to connectors, in the Designer, the Viewer and the CLI. A template cannot fetch from an address that the portal does not allow.

If part of a document is missing, such as a picture, a font or some data, check the template's sources against these lists first. See [Troubleshooting the Viewer](/paperwork.view/troubleshooting.html).

⚑ How a portal admin changes the lists, and whether an organisation can have a portal of its own address: to be confirmed before this page is published.

## Next

- [Roles and access](/roles/): what each role can do.
- [Security and IT](/security/): where documents are made and where data is held.
- [Concepts and glossary](/concepts/).
