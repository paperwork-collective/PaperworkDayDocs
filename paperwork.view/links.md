---
layout: default
render_with_liquid: false
title: Link to a document
parent: Paperwork.View
parent_url: /paperwork.view/
nav_order: 1
has_children: false
has_toc: false
---
# Link to a document
{: .no_toc }

A published template opens in the viewer at a web address made of its owner and its name:

```text
https://paperwork.vu/richard-prod/invoice-example
```

Anyone with the link can open a public or personal template. A template in a private collection needs the visitor to sign in as a member.

You can find the id and the link for any of your templates in the Designer, from the embed option on the template. See [Publishing and sharing](/paperwork.design/publishing.html).

## Link options

The viewer options can be added to a link as query string parameters, to choose what the visitor sees:

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

The full meaning of each is on the [Viewer options](/paperwork.view/options.html) page.
