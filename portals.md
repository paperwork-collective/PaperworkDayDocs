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

A portal is identified by the address the Designer is opened at. Templates and collections belong to the portal they were made in, and My templates and collections show only that portal's.

- Each portal has its own public library of Blueprints.
- The portal has a list of **admins**, who manage the portal's settings. See [Roles and access](/roles/).
- An exported template file can be imported into another portal. See [Publishing](/paperwork.design/publishing.html).

## Who runs it

A portal admin is not a licence. It is a list of people on the portal's settings, given to whoever runs Paperwork in your organisation, usually alongside a Publisher licence.

A portal admin can:

- change the portal's settings, described below;
- read the generation history of the portal's templates;
- use the **Waste basket**, which shows every template deleted in that portal in the last 30 days. They can restore one, or delete it for good. If its collection has gone, they can restore it into their own My templates.

"Get in touch" requests from the portal go to its admins. If none are set, they go to Paperwork support.

## Change the portal's settings

Portal admins change the portal's settings in the Designer, under **Portal > Configuration**. The same page holds:

- **Domains**, with an **Allowed** list and a **Blocked** list, one domain per line, with `*` for any;
- the portal's admins;
- the asset storage allowances;
- the support site and email address used in the portal's emails (`support.url` and `support.email`).

The Viewer's matching settings are kept in step.

## Addresses a document may fetch from

While a document is made, it fetches data, images, fonts and connector data. The Allowed and Blocked lists apply to everything a document fetches and to connectors, in the Designer, the Viewer and the CLI. A template cannot fetch from an address that the portal does not allow.

If part of a document is missing, such as a picture, a font or some data, check the template's sources against these lists first. See [Troubleshooting the Viewer](/paperwork.view/troubleshooting.html).

## A portal at your own address

A portal at your own address is set up with Paperwork: [contact us](https://www.paperwork-collective.com/contact).

## Next

- [Roles and access](/roles/): what each role can do.
- [Security and IT](/security/): where documents are made and where data is held.
- [Glossary](/glossary/).
