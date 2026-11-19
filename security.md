---
layout: default
render_with_liquid: false
title: Security and IT
nav_order: 5
permalink: /security/
has_children: false
has_toc: false
description: Where Paperwork runs, what it stores and where, who can see what, and what happens when someone leaves. For IT owners and security reviews.
---

# Security and IT
{: .no_toc }

**For IT owners.** What runs where, what is stored, who can see it, and what happens when someone leaves.

This page answers the questions a security review asks. It describes Paperwork as it is today. If something changes, we update this page and the date at the bottom.

1. TOC
{:toc}

## Summary

| | |
|---|---|
| **Where documents are made** | In the user's browser. The finished PDF is not sent to a Paperwork server. |
| **Where data is held** | In Europe: the database in Belgium and the Netherlands, files in Frankfurt, and functions in London and Belgium. Two things run in the US: sign-in records, held by Google, and for now the function that receives payment notifications from Stripe. |
| **What is stored** | Templates, assets and account details. Generation history is details only, never the document, and it is deleted after 90 days. |
| **Who can see what** | Closed by default. People only see a collection's templates and data if a Publisher adds them. |
| **When someone leaves** | Remove their licence and take them out of your collections. Any session they still have open ends within the hour. |
| **Code you can check** | The engine and core library are open source: Scryber.Core (LGPL) and Paperwork.Core (MIT). |

## Where documents are made

Paperwork's Designer ([paperwork.design](https://paperwork.design)) and Viewer ([paperwork.vu](https://paperwork.vu)) run in the browser. When someone creates a document, the template and the data are put together on their own device and the PDF is created there. The finished document is not uploaded to us.

If a PDF is password-protected, it is encrypted on the device as well, and the password is never sent to us.

The CLI and the Core library work the same way on your own machines and servers: they read the published template and create the document locally.

{: .note }
> **The exceptions.** A few optional features pass requests through a Paperwork function in London, because the services they call don't accept requests straight from a browser. They relay the data without storing it.
>
> - **Remote data without CORS**: fetches a data feed for a template. It only calls the domains your portal allows, and only for templates owned by an Editor or Publisher. We log the address called, the user and the template, not the data.
> - **Maps**: creates a map image. We log the user and the map's centre.
>
> A template only uses these if its author turned them on.

## Where data is held

| What | Where |
|---|---|
| Database: templates, collections, profiles and licences | Belgium and the Netherlands (Google Cloud multi-region eur3: europe-west1 and europe-west4, with europe-north1 in Finland as the witness) |
| File storage: assets and published templates | Frankfurt (Google Cloud europe-west3) |
| Sign-in records: email address and sign-in provider (Microsoft, Google or GitHub). Paperwork doesn't use passwords. | **United States.** Sign-in uses Firebase Authentication, a Google service that runs only from US data centres. It can't be moved to Europe. |
| Functions: licences, the data relay, maps, link previews | London (Google Cloud europe-west2) |
| Background tasks: emails, invitations and licence changes | Belgium (Google Cloud europe-west1) |
| Payment notifications from Stripe | United States (Google Cloud us-central1) |
| Website hosting | Firebase Hosting, served from Google's global network |

Every portal uses the same regions. There is no separate storage per customer today.

## What we store, and for how long

| What | Stored | Kept |
|---|---|---|
| Templates and their versions | Yes | Until you delete them |
| Assets (images, fonts, files you upload) | Yes | Until you delete them |
| Account details: name, email, sign-in provider, licences | Yes | While the account is active |
| Generation history | Details only: the date, the template, who created the document (their name and user id, or that they weren't signed in), the time each stage took, the document's size, and whether it succeeded. Never the document or its data. | 90 days, then deleted automatically |
| The documents people create | No | Not applicable |
| Data a template reads from your systems | No, except while it is relayed (see above) | Not applicable |

Generation history can only be read by the template's owner, its collection's Publishers and Editors, and the portal's admins.

## Who can see what

Access is closed by default. Signing in to Paperwork shows nothing of your organisation's: people only see a collection's templates and data if a Publisher adds them to it, and only Publishers can change who is a member.

This means you can let clients, partners and staff sign in with an account they already have, and they see only what you have shared with them.

| Role | Can |
|---|---|
| **Writer** | Fill in the templates shared with them and create documents. Writers also get their own "My templates" collection, but they can't copy or export a collection's templates, so your templates don't multiply. They can publish their own templates publicly, but never a collection's. |
| **Editor** | Build and change templates, and publish their own templates personally, for use only by themselves. |
| **Publisher** | Publish to collections, decide who is a member, and assign the licences they've bought. |
| **Portal admin** | Manage the portal's settings. This isn't a licence: it's a list of people on the portal's settings. |

Anyone can open a public template without an account.

### Data sources

Each portal has an allow-list and a block-list of domains. They apply to everything a document fetches while it's made (data, images and fonts) and to connectors, in the Designer, the Viewer and the CLI. A template can't fetch from a domain your portal doesn't allow.

## Signing in

People sign in with Microsoft, Google or GitHub. Paperwork doesn't use passwords of its own, and never sees the password for those accounts.

Paperwork Collective Limited is a Microsoft verified publisher. When someone signs in with a Microsoft work account, the consent screen shows our name with Microsoft's verified badge, so organisations that only allow verified apps can use Paperwork without an admin approving it first.

Sign-in is per person. Single sign-on through your own identity provider (SAML), automatic account provisioning (SCIM), and limiting sign-in to your organisation's Microsoft tenant are not available today.

## When someone leaves

- **Remove their licence.** The Publisher who assigned it removes it. They drop to Writer and are taken out of the collections they belonged to moments later, and any session they still have open ends within the hour.
- **Check your collections.** Someone who was a member as a Writer, without a paid licence, has to be taken out of each collection by its Publisher.
- **If they were a portal admin**, take them off the portal's admin list.

Disabling their work Microsoft or Google account stops them signing in with it. A personal Google or GitHub account isn't in your control, which is why removing them in Paperwork is the step that counts. Their own account still exists afterwards as a Writer, with only public templates and their own.

## Who else processes data

| Company | What for | When |
|---|---|---|
| Google Cloud and Firebase | Hosting, sign-in, database, file storage, functions | Always |
| Stripe | Payments and subscriptions | When you buy a licence |
| Microsoft 365 | Sending email from Paperwork | When we email you |
| Google Analytics | Site usage, with your consent | If you accept analytics cookies |
| Microsoft, Google, GitHub | Sign-in | If you sign in with that account |
| Google Maps | Map images | Only if a template uses maps |
| Zoho | Support tickets at paperwork.support | When you raise a ticket |

## Open source

The engine that lays out and creates the PDF, [Scryber.Core](https://github.com/richard-scryber/scryber.core), is open source under the LGPL. The core library, [Paperwork.Core](/paperwork.core/), is open source under the MIT licence. Your team can read the code that makes your documents, and run it on your own servers with the [CLI](/paperwork.cli/) or the library.

## Leaving Paperwork

Your templates are yours. A collection's Publishers can export any of its templates as a single file, and anyone can export the templates they created, and the CLI and Core library can create documents from that file without signing in.

Two things still come from Paperwork when you do: any assets the template uses (images, fonts and files uploaded to Paperwork stay in our storage, so keep your own copies), and your portal's domain allow-list and block-list, which the CLI reads.

## Contact

For security questions, a completed questionnaire, or to report a vulnerability, contact [security@paperwork-collective.com](mailto:security@paperwork-collective.com). For everything else, use [paperwork.support](https://paperwork.support).

Last updated: 19 November 2026.
