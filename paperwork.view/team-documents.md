---
layout: default
render_with_liquid: false
title: Give your team one place for documents
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 2
has_children: false
has_toc: false
description: "Move your Word templates into Paperwork, so your people open one address, fill in the fields and download the document."
---
# Give your team one place for documents
{: .no_toc }

## What you'll do

Move the Word templates your people use today into Paperwork, publish them to a collection, and give everyone one address. They open it, fill in the fields and download the PDF. Nobody opens Word, finds the right file on a shared drive, or has to know which version is current.

This page is for the person who sets that up, often someone in IT. Your colleagues never use the Designer. They use the Viewer, and the page [Fill in a document and download it](/paperwork.view/fill-and-download.html) is written so you can send it to them.

## Before you start

- A Paperwork account that can build and share templates: an **Editor** to make them and a **Publisher** to share them with a team. See [Roles and access](/roles/).
- The Word files, as `.docx` or `.dotx`. If they use merge fields, those become Paperwork fields.
- A list of who needs access. Everyone who opens a template in a private collection signs in with a Microsoft, Google or GitHub account. See [Signing in](/signing-in/).

## What changes for your people

| Before | With Paperwork |
|---|---|
| Find the right `.dotx` on a shared drive | Open one address |
| Open Word and replace the placeholders by hand | Fill in the fields in the browser |
| Save as PDF, rename it, file it | Choose **Download** |
| Several copies, some of them out of date | One published version, changed in one place |

{: .note }
> People who only fill in templates need no licence of their own beyond signing in. The **Writer** licence every account starts with is enough. See [Roles and access](/roles/).

<div class="pw-shot"><span class="pw-shot-id">V25</span><span class="pw-shot-what">A Word template next to the same document opened in the Viewer: placeholders in Word, fields to fill in on the right.</span><span class="pw-shot-file">assets/images/viewer/v25-word-and-viewer.png</span></div>

## Steps

**1. Bring a Word template in.** In the [Designer](/paperwork.design/), choose **Import**, then **Word document**, and choose the file. Styles, tables, headers and footers come across, and Word merge fields become template fields. Word import is a beta feature, so look closely at the result. See [Create and import](/paperwork.design/creating.html).

<div class="pw-shot"><span class="pw-shot-id">V26</span><span class="pw-shot-what">The Import review step, listing what was found in the Word document, including the merge fields.</span><span class="pw-shot-file">assets/images/viewer/v26-import-review.png</span></div>

**2. Check the fields.** Each merge field is now a field. Give it a clear label, a type such as text, date or choice, and a default if one makes sense. Mark the ones that must always be filled in. See [Edit and preview](/paperwork.design/editing.html).

**3. Preview it.** Preview the template with sample data and compare it with the Word original, page by page.

**4. Publish it to a collection.** A collection is a shared space for a team's templates, and only its members see them. Check the template in, then publish it to the collection. See [Publish and share](/paperwork.design/publishing.html).

<div class="pw-shot"><span class="pw-shot-id">V27</span><span class="pw-shot-what">A collection in the Designer listing the published templates, such as Letter, Invoice, Contract.</span><span class="pw-shot-file">assets/images/viewer/v27-collection-templates.png</span></div>

**5. Give your people the address.** Two ways:

- **A link to each template.** A template in a collection has an address made of the collection and the template, such as `https://paperwork.vu/acme/hr/offer-letter`. Put these on your intranet, in a pinned message or in a staff handbook. See [Link to a document](/paperwork.view/links.html).
- **One address for everything.** When someone opens [paperwork.vu](https://paperwork.vu/) and signs in, the Viewer shows their own templates and the collections they belong to, so they can choose from there.

<div class="pw-shot"><span class="pw-shot-id">V18</span><span class="pw-shot-what">paperwork.vu after signing in, showing the person's collections and the templates in them.</span><span class="pw-shot-file">assets/images/viewer/v18-library-signed-in.png</span></div>

**6. Or put it on your intranet.** If you would rather people stay on a page they already use, put the Viewer in it. See [Embed with HTML](/paperwork.view/embedding.html).

<div class="pw-shot"><span class="pw-shot-id">V29</span><span class="pw-shot-what">An intranet page with a document open inside it, in the Default preset, with the Fill in and Download buttons.</span><span class="pw-shot-file">assets/images/viewer/v29-intranet-embed.png</span></div>

## Choose what people can do

A link or an embed can limit the toolbar, so people see only what they need. For example, to show Download and Fill in and nothing else:

```text
https://paperwork.vu/acme/hr/offer-letter?actions=Download,FillFields
```

See [Viewer options](/paperwork.view/options.html) for every option.

## Changing a template later

Change the template in the Designer, check it in and publish again. Everyone who opens the address after that gets the new version. The link does not change.

## Check it worked

Ask a colleague who is a member of the collection, or open a private browser window yourself, and use the link as they will:

- The browser asks you to sign in, and the template opens when you do.

<div class="pw-shot"><span class="pw-shot-id">V20</span><span class="pw-shot-what">A collection link opened in a private window, showing the sign-in choices before the document appears.</span><span class="pw-shot-file">assets/images/viewer/v20-collection-sign-in.png</span></div>

- Filling in the fields changes the document, and **Download** saves a PDF.
- Someone who is not a member of the collection does not see it.

<div class="pw-shot"><span class="pw-shot-id">V19</span><span class="pw-shot-what">The collection template open in the Viewer for a signed-in member.</span><span class="pw-shot-file">assets/images/viewer/v19-collection-open.png</span></div>

If something does not work, see [Troubleshooting](/paperwork.view/troubleshooting.html).

## Next

- [Fill in a document and download it](/paperwork.view/fill-and-download.html): the page to send to your people.
- [Portals](/portals/): your own Paperwork site, with its own admins and settings.
- [Security and IT](/security/): what runs where, what is stored and who can see it.
