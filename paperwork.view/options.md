---
layout: default
render_with_liquid: false
title: Viewer options
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 9
has_children: false
has_toc: false
description: "Every Paperwork Viewer option: toolbar preset, zoom, side panel, actions, theme and library, as attributes, pw.init options or link parameters."
---
# Viewer options
{: .no_toc }

Reference for every option. These options work the same way however you start the viewer: as `data-pw-*` attributes, as `pw.init` options, or as query string parameters on a link.

In a link, add them after a `?` and join them with `&`, for example `?ui=Minimal&zoom=FullWidth&sidebar=Thumbs`. A value you give always wins over the preset.

## ui

A preset that sets the zoom, actions and side panel together. You can still change any of them separately.

| Preset | Zoom | Actions | Side panel | Use it for |
|---|---|---|---|---|
| `Default` | `FullPage` | `Download`, `FillFields` | Closed | A normal embed, where the visitor can fill in fields and download. |
| `Minimal` | `FullPage` | None | None | A clean read-only view with no controls. |
| `Sample` | `FullPage` | All | Closed | Showing off a template, with every action available. |

<div class="pw-shot"><span class="pw-shot-id">V7</span><span class="pw-shot-what">The same document three times: ui=Default, ui=Minimal and ui=Sample, each with its toolbar.</span><span class="pw-shot-file">assets/images/viewer/v07-ui-presets.png</span></div>

## zoom

| Value | Meaning |
|---|---|
| `FullPage` | Fit a whole page in the view. |
| `FullWidth` | Fit the width of the page to the view. |
| `Hidden` | Hide the zoom controls. |
| A number | A zoom percentage, such as `75`. |

<div class="pw-shot"><span class="pw-shot-id">V8</span><span class="pw-shot-what">The same document at zoom=FullPage and zoom=FullWidth.</span><span class="pw-shot-file">assets/images/viewer/v08-zoom.png</span></div>

## sidebar

| Value | Meaning |
|---|---|
| `Default` or `Closed` | The side panel starts closed. |
| `Thumbs` | Open on the page thumbnails. |
| `Outline` | Open on the document outline. |
| `Properties` | Open on the document details. |
| `None` | No side panel at all. |

<div class="pw-shot"><span class="pw-shot-id">V9</span><span class="pw-shot-what">The side panel open on Thumbs, Outline and Properties.</span><span class="pw-shot-file">assets/images/viewer/v09-sidebar.png</span></div>

## actions

`All`, `None`, or a comma separated list of:

| Action | What it shows |
|---|---|
| `Download` | The Download button. |
| `FillFields` | The button to fill in the template's fields. |
| `ViewCode` | **More** > View the template. This opens the template in the Designer, so the visitor needs to be signed in and have a Designer licence. |
| `CopyLink` | **More** > Copy link. |
| `OpenInTab` | **More** > Open in a new tab. |
| `ShowProperties` | **More** > Document details. Not available with `sidebar=None`. |

The **More** menu is hidden when none of its four actions are on. If you do not give `actions`, an embedded viewer shows `Download` and `FillFields`, and a viewer opened directly shows everything.

<div class="pw-shot"><span class="pw-shot-id">V4</span><span class="pw-shot-what">The More menu open with all four of its actions.</span><span class="pw-shot-file">assets/images/viewer/v04-more-menu.png</span></div>

<div class="pw-shot"><span class="pw-shot-id">V31</span><span class="pw-shot-what">The same document with actions=None and with the default Download and Fill in buttons.</span><span class="pw-shot-file">assets/images/viewer/v31-actions.png</span></div>

## theme

`light` or `dark` fixes the colours of the viewer and hides its own light and dark switch. Without it the visitor's own choice, or their system setting, is used. Any other single word is added as a class to the viewer's page, so you can target it from your own styles.

<div class="pw-shot"><span class="pw-shot-id">V10</span><span class="pw-shot-what">The same document with theme=light and theme=dark.</span><span class="pw-shot-file">assets/images/viewer/v10-theme.png</span></div>

## library

Shows the signed-in visitor's own templates and collections inside an embedded viewer. It is always on when the viewer is opened directly.

<div class="pw-shot"><span class="pw-shot-id">V18</span><span class="pw-shot-what">The viewer opened directly by a signed-in person, listing their templates and collections.</span><span class="pw-shot-file">assets/images/viewer/v18-library-signed-in.png</span></div>

## auth

Which sign-in choices the viewer shows to a visitor who needs to sign in.

| Value | Meaning |
|---|---|
| `All` | Show every sign-in choice. This is the default. |
| `None` | Show no sign-in choices. |
| A list | Show only the ones named, separated by commas, such as `Google,GitHub`. |

<div class="pw-shot"><span class="pw-shot-id">V14</span><span class="pw-shot-what">The sign-in choices shown with auth=All, and with a shorter list.</span><span class="pw-shot-file">assets/images/viewer/v14-sign-in-choices.png</span></div>

## On a phone

The page's width decides what a small screen shows. Today, when the viewer is in a frame and the screen is under 576 pixels wide, the bottom bar is hidden, and the actions that sit on the toolbar go with it. So with `ui=Minimal` on a phone, `actions=` shows no buttons.

If you want a clean viewer on a phone that still has its actions, use `sidebar=None` instead of `ui=Minimal`.

{: .note }
> This is how the viewer behaves today, and it may change. Check your embed on a phone before you publish it.

<div class="pw-shot"><span class="pw-shot-id">V11</span><span class="pw-shot-what">An embedded viewer on a phone (390 pixels wide) with ui=Minimal, and the same with sidebar=None.</span><span class="pw-shot-file">assets/images/viewer/v11-phone-minimal.png</span></div>
