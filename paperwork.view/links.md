---
layout: default
render_with_liquid: false
title: Link to a document
parent: Paperwork.View
parent_url: /paperwork.view/
nav_order: 2
has_children: false
has_toc: false
description: "Share a published Paperwork template as a web address, fill its fields from the link and choose what the visitor sees."
---
# Link to a document
{: .no_toc }

## What you'll do

Share a published template as a web address. You will fill its fields from the link and choose what the visitor sees.

## Before you start

- A published template, and its owner and name. You can find them in the Designer, from the embed option on the template. See [Publish and share](/paperwork.design/publishing.html).
- A public template opens for anyone. A template in a collection needs the visitor to sign in as a member of that collection. A personal template opens only for the person who published it, signed in.

## Steps

**1. Make the link.** A published template opens in the Viewer at an address made of its owner and its name:

```text
https://paperwork.vu/richard-prod/invoice-example
```

**2. Fill fields from the link.** Add each field's id and value after a `?`, joined with `&`. The ids are the ones given to the fields in the Designer:

```text
https://paperwork.vu/richard-prod/invoice-example?name=Globex&invoiceMonth=3
```

{: .note }
> A link can be edited by anyone who has it. Use it to set a starting value, not to stop a value being changed.

**3. Choose what the visitor sees.** Add the [viewer options](/paperwork.view/options.html) in the same way:

```text
https://paperwork.vu/richard-prod/invoice-example?ui=Minimal&zoom=FullWidth
```

| Parameter | Values |
|---|---|
| `ui` | `Default`, `Minimal` or `Sample` |
| `zoom` | `FullPage`, `FullWidth`, `Hidden` or a percentage such as `75` |
| `sidebar` | `Default`, `Closed`, `Thumbs`, `Outline`, `Properties` or `None` |
| `actions` | `All`, `None` or a list such as `Download,CopyLink` |
| `theme` | `light`, `dark` or a word of your own, added as a class |

## Link previews

When a link to a public template is shared in a chat or a social post, the preview shows the template's name and its first page.

- Previews exist only for a **public** template that is not in a collection. Personal and collection templates never have one.
- When you publish as Public, the publish step has an **Include share card** option. It is ticked by default.
- The card is made from the template's first-page preview when you publish, and replaced each time you publish again. Use sample data on the first page.
- The preview works for the Viewer's direct links, `https://paperwork.vu/{owner}/{name}`.

See [Publish and share](/paperwork.design/publishing.html).

## Check it worked

Open the link in a private browser window. The document should show your values, and the toolbar should match the options you chose.

## Next

- [Embed with HTML](/paperwork.view/embedding.html), to put the same document on a page.
- [Viewer options](/paperwork.view/options.html), for the full meaning of each option.
