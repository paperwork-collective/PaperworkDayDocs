---
layout: default
render_with_liquid: false
title: Embed with JavaScript
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 6
has_children: false
has_toc: false
description: "Drive the Paperwork Viewer from your own JavaScript: place a viewer, choose the template or content at run time, and get the PDF back."
---
# Embed with JavaScript
{: .no_toc }

## What you'll do

Use the `pw` object to place a viewer, choose the template at run time, send your own content or data, or get the PDF back into your code.

## Before you start

- A web page you can edit and a published template, or your own content to send.
- If you want the viewer started by HTML attributes, see [Embed with HTML](/paperwork.view/embedding.html). Add `data-pw-js-init` to an element to start the viewer without a template.

## Steps

**1. Load the library and make a container.** The `pw` object is created by the same embed library:

```html
<script src="https://paperwork.vu/er.js"></script>
<div id="viewer" style="height: 520px"></div>
```

**2. Use the functions you need.** Each is described below.

<div class="pw-shot"><span class="pw-shot-id">V37</span><span class="pw-shot-what">A page with its own buttons that choose a template and fill in values, and the viewer showing the result.</span><span class="pw-shot-file">assets/images/viewer/v37-javascript-page.png</span></div>

## pw.init

Places a viewer in a container.

```javascript
pw.init({
  container: '#viewer',
  name: 'invoice',
  ui: 'Minimal',
  zoom: 'FullWidth',
  height: '520px'
});
```

| Option | Description |
|---|---|
| `container` | A selector or an element to place the viewer in. |
| `name` | The name used to refer to this viewer. Defaults to the element's `data-pw-container`. |
| `ui`, `zoom`, `sidebar`, `actions`, `theme` | The [viewer options](/paperwork.view/options.html). |
| `width`, `height` | The size of the viewer. |
| `library` | Show the visitor's own templates and collections. |
| `debug` | Write progress to the browser console. Adding `?pwdebug` to the page address does the same. |
| `loaded` | A function called when the viewer has loaded. |
| `onResult` | A function called with the result of a generation. |
| `auth` | Handlers that supply tokens for sources that need a sign-in. |

Any `data-pw-*` attributes on the container are used as defaults, and the options you pass win.

## pw.show

Shows a template, or your own content, in a viewer.

A published template:

```javascript
pw.show({ name: 'invoice', template: 'paperwork:invoice-sample' });
```

A template in a private collection:

```javascript
pw.show({ name: 'invoice', template: 'monthly-summary', collection: 'acme:reports' });
```

Your own content, sent from the page:

```javascript
pw.show({
  name: 'invoice',
  layouts: [{ name: 'main', content: '<html>...</html>', format: 'html' }],
  styles:  [{ name: 'invoice.css', content: 'body { font-family: sans-serif; }', format: 'css' }],
  datas:   [{ name: 'model', content: JSON.stringify({ total: 1200 }), format: 'json' }],
  fields:  { title: 'March Invoice' }
});
```

Each data item becomes a named source in the template, so the one above is read as `{{model.total}}`. Fields are read as `{{$fields.title}}`.

You can call `pw.show` straight after `pw.init`. It waits until the viewer is ready.

## pw.get

Gets the generated document back into your code.

```javascript
pw.get({
  name: 'invoice',
  format: 'blob',
  success: function (pdf) { /* a Blob of the PDF */ },
  fail: function (message) { console.error(message); }
});
```

`format` can be `blob` (the default), `base64` or `array` (a `Uint8Array`).

## pw.release

Removes a viewer from the page. Use `'*'`, or no name, to remove all of them.

```javascript
pw.release('invoice');
```

## Avoiding a clash

If another library already uses the name `pw`, call `noConflict` to hand it back and keep the viewer under a name of your own:

```javascript
var paperwork = pw.noConflict();
```

## Check it worked

Open the page with the browser console open. Add `?pwdebug` to the address to see the viewer's progress. The viewer should appear and show the template or content you passed to `pw.show`.

## Next

- [Show your own content](/paperwork.view/send-content.html), for the `layouts`, `styles`, `datas` and `fields` that `pw.show` takes.
- [Viewer options](/paperwork.view/options.html).
- [Troubleshooting](/paperwork.view/troubleshooting.html).
