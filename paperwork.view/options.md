---
layout: default
render_with_liquid: false
title: Viewer options
parent: Paperwork.View
parent_url: /paperwork.view/
nav_order: 4
has_children: false
has_toc: false
---
# Viewer options
{: .no_toc }

These options work the same way however you start the viewer: as `data-pw-*` attributes, as `pw.init` options, or as query string parameters on a link.

## ui

A preset that sets the zoom, actions and side panel together. You can still change any of them separately.

| Preset | Zoom | Actions | Side panel | Use it for |
|---|---|---|---|---|
| `Default` | `FullPage` | `Download`, `FillFields` | Closed | A normal embed, where the visitor can fill in fields and download. |
| `Minimal` | `FullPage` | None | None | A clean read-only view with no controls. |
| `Sample` | `FullPage` | All | Closed | Showing off a template, with every action available. |

## zoom

| Value | Meaning |
|---|---|
| `FullPage` | Fit a whole page in the view. |
| `FullWidth` | Fit the width of the page to the view. |
| `Hidden` | Hide the zoom controls. |
| A number | A zoom percentage, such as `75`. |

## sidebar

| Value | Meaning |
|---|---|
| `Default` or `Closed` | The side panel starts closed. |
| `Thumbs` | Open on the page thumbnails. |
| `Outline` | Open on the document outline. |
| `Properties` | Open on the document details. |
| `None` | No side panel at all. |

## actions

`All`, `None`, or a comma separated list of:

| Action | What it shows |
|---|---|
| `Download` | The Download button. |
| `FillFields` | The button to fill in the template's fields. |
| `ViewCode` | **More** > View the template. |
| `CopyLink` | **More** > Copy link. |
| `OpenInTab` | **More** > Open in a new tab. |
| `ShowProperties` | **More** > Document details. Not available with `sidebar=None`. |

The **More** menu is hidden when none of its four actions are on. If you do not give `actions`, an embedded viewer shows `Download` and `FillFields`, and a viewer opened directly shows everything.

## theme

`light` or `dark` fixes the colours of the viewer and hides its own light and dark switch. Without it the visitor's own choice, or their system setting, is used. Any other single word is added as a class to the viewer's page, so you can target it from your own styles.

## library

Shows the signed-in visitor's own templates and collections inside an embedded viewer. It is always on when the viewer is opened directly.
