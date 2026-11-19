---
layout: default
render_with_liquid: false
title: Troubleshooting
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 10
has_children: false
has_toc: false
description: "Fixes for the common problems building a Paperwork Viewer link or embed: an empty viewer, a sign-in prompt, ignored field values and a blocked domain."
---
# Troubleshooting
{: .no_toc }

These are problems you may meet when you build a link or an embed. For everyday questions from people using a document, see [Paperwork Support](https://paperwork.support).

Add `?pwdebug` to the address of the page that holds the viewer, and open the browser console, to see what the viewer is doing.

## What your visitors see, and what to tell them

If someone sees a sign-in prompt, a "not available to you" message, missing content or a failed download, those are answered for the people opening the link on [Paperwork Support](https://paperwork.support). Send them there, and use this page for problems with how the link or embed is built.

## The embedded viewer is empty

- It starts when it scrolls into view, and the first one on a page can take a few seconds. Wait a moment.
- Check the script is loaded: `https://paperwork.vu/er.js`.
- Each viewer on a page needs its own `data-pw-container` name.
- Check the template id is written `owner:name`, for example `paperwork:invoice-sample`.

<div class="pw-shot"><span class="pw-shot-id">V35</span><span class="pw-shot-what">An embedded viewer that is empty because its script did not load, with the console open.</span><span class="pw-shot-file">assets/images/viewer/v35-empty-embed.png</span></div>

## The viewer asks the visitor to sign in

- A template in a collection needs the visitor to sign in as a member, and the embed needs `data-pw-collection`.
- A personal template opens only for the person who published it, signed in.
- Passing a collection for a public template also asks the visitor to sign in. For a public template, leave the collection out.

<div class="pw-shot"><span class="pw-shot-id">V20</span><span class="pw-shot-what">The sign-in choices shown when a viewer needs a signed-in visitor.</span><span class="pw-shot-file">assets/images/viewer/v20-collection-sign-in.png</span></div>

## A value in the link is ignored

- A field is matched by the id it was given in the Designer. Check the spelling and the case.
- Join the values with `&`, and put a `?` before the first one.

## A message says the current host domain is not supported

The Viewer itself is running at an address that is not a Paperwork portal. This is not about the site that embeds the Viewer: nothing restricts which sites can embed or link a template. Open the Viewer from its normal address, `https://paperwork.vu/`, or the address your portal gave you.

<div class="pw-shot"><span class="pw-shot-id">V34</span><span class="pw-shot-what">The message that the current host domain is not supported.</span><span class="pw-shot-file">assets/images/viewer/v34-host-domain.png</span></div>

## Part of the document is missing: a picture, a font or data

While a document is made, it fetches data, images, fonts and connector data. The portal has allow and block lists for the addresses it may fetch from. If an address is blocked, that item does not load and the document is made without it.

Check the addresses of the template's data, image and font sources against the portal's lists, and ask the portal's admin to allow the ones you need. See [Portals](/paperwork.design/).

## Another script uses the name `pw`

Hand the name back and keep the viewer under one of your own. See [Embed with JavaScript](/paperwork.view/javascript.html).

## Still stuck

Ask [Paperwork Support](https://paperwork.support), and say the address of the page and what you see.
