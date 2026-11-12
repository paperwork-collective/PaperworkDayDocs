---
layout: default
render_with_liquid: false
title: Getting started
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 1
has_children: false
has_toc: false
description: "Open a published template in the Paperwork Viewer from a link, fill a field from the address, then put the Viewer on your own page."
---
# Getting started
{: .no_toc }

About ten minutes. You will open a published template from a link, fill a field from the address, then put the Viewer on a page of your own.

## Before you start

- A web browser. You do not need an account to open a public template.
- For the last step, a web page you can edit.

Two ideas are all you need first:

- A published template has an **id**, written `owner:name`. The example below is `paperwork:invoice-sample`. The same template has a web address, `https://paperwork.vu/owner/name`.
- A template has **fields**: values that change from one document to the next. This template has `name` (the company), `invoiceMonth` (a month number, 1 to 12) and `companyCode`. `companyCode` is required, and uses its default when you do not give it.

## 1. Open a template from a link

Open this address:

```text
https://paperwork.vu/paperwork/invoice-sample
```

The Viewer opens an invoice, made in your browser. The company shown is the template's default.

## 2. Fill a field from the link

Add the field values to the address, after a `?`, and join them with `&`:

```text
https://paperwork.vu/paperwork/invoice-sample?name=Globex&invoiceMonth=3
```

The same invoice opens for Globex, for March. You can also choose **Fill in** in the toolbar and type the values, then **Download** to save the PDF.

## 3. Put it on a page

Add this to a page, where you want the document to appear:

```html
<script src="https://paperwork.vu/er.js"></script>

<div data-pw-container="invoice"
     data-pw-template="paperwork:invoice-sample"
     data-pw-height="520px"></div>
```

Here it is, working:

<div class="pdf-container" style="margin-bottom:20px" data-pw-container="gs-invoice" data-pw-template="paperwork:invoice-sample" data-pw-ui="Minimal" data-pw-zoom="FullWidth" data-pw-height="520px"></div>

## Check it worked

- The link opens an invoice, and with `?name=Globex&invoiceMonth=3` it shows Globex and March.
- The embedded viewer shows the same invoice on your page. It starts when it scrolls into view, so it can take a few seconds to appear.

If something does not appear, see [Troubleshooting](/paperwork.view/troubleshooting.html).

## Next

- [Link to a document](/paperwork.view/links.html): every option you can put in a link.
- [Embed with HTML](/paperwork.view/embedding.html): the `data-pw-*` attributes.
- [Embed with JavaScript](/paperwork.view/javascript.html): choose the template and data from your own code.
- [Make your own template](/paperwork.design/) in the Designer.
