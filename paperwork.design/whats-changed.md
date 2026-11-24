---
layout: default
render_with_liquid: false
title: What's changed in the Designer and Viewer
parent: Paperwork.Design
parent_url: /paperwork.design/
nav_order: 4
has_children: false
has_toc: false
description: "What to expect the next time you publish a template, now that new work uses engine 9.11.0."
---
# What's changed in the Designer and Viewer
{: .no_toc }

## Your published templates are unchanged

A published template keeps making its documents with the engine it was published with. Nothing you have already published changes on 24 November 2026, and you don't need to do anything.

From 24 November 2026 the Designer and Viewer use engine 9.11.0 for new work. A template moves to it **the next time you publish it**. The changes below start to apply then, so some documents may look different. They make the output match what a web browser does.

When you next publish a template, check it in **Preview** first, and compare it with a document you made before. See [Choose the engine version](/paperwork.view/engine-version.html) for how a template's engine is chosen.

## Lists

Lists are indented the way a browser does it. The indent is the list's `padding-left`, 30pt by default, and the marker sits inside it.

- A default list moves about 10pt to the left.
- If your list has its own `padding-left`, that is now the whole indent. A list with `padding-left: 15pt` was indented 55pt and is now 15pt.
- Bullets look different. A disc, circle or square is drawn as a filled circle, a hollow circle or a filled square, sized from the text. A nested list uses a disc, then a circle, then a square.
- A definition list's descriptions are indented 30pt, not 40pt.

**If you want the old look,** add to the list's `padding-left`. For example, `padding-left: 40pt` gives a 40pt indent. A custom `-pdf-li-inset` no longer moves the text, so use `padding-left` to make room for wide markers such as `10.2.4.`.

## Page size and margins

If your template has a large style block or stylesheet (more than 30 rules), its `@page` rules used to be ignored, so the page size and margins fell back to the default. They now apply. A template that was quietly using the default page may use the size and margins it always asked for, and look quite different.

If a document has the wrong page size or margins, check the `@page` rule in the template's styles. It is now being followed.

## Other changes you may notice

- **SVG images sized in percent.** An SVG used as an image whose own `width` is `100%` fills the width available, at the picture's shape, instead of its small natural size. Give the image a width or height to control it.
- **Elements with no width.** An absolutely positioned, fixed, floated or inline-block element with no width is as wide as its content, not stretched across the page.
- **Fonts.** Some system fonts, Gill Sans on macOS for example, could not be embedded before, so the PDF reader showed another font instead. They now embed properly, so text in those fonts looks as you chose it.
- **Numbers shown with `<num value>`.** A `<num>` element using `value` used to show 0. It now shows the value. If you added a workaround, remove it, or the number may appear twice.

## New in the Viewer

- **Pictures.** When you fill in a document, a picture field can let you choose a picture, upload one and edit it. Uploading and editing need you to be signed in. Pictures you upload or edit are saved to your own Shared Assets, and count towards your own storage. Upload appears only on a picture field where the template's designer has turned it on, and Edit only for a file that can be edited.
- **Maps.** Map fields can be edited in the form.
- **Drafts on your desk.** When you are signed in, the Viewer shows **Drafts on your desk**, where you can keep a document you have started and carry on later. A saved draft is named after the document's own title, not the template's. Drafts are held on your own device, not on our servers, so they are there on the device and browser where you saved them. Clearing your browser's data can remove them.

## More detail

For developers, the full list is in the [Scryber.Core change log](/paperwork.core/changelog/scryber_core.html) and the [Paperwork.Core change log](/paperwork.core/changelog/paperwork_core.html).
