---
layout: default
render_with_liquid: false
title: Embed with JavaScript
parent: Paperwork.View
parent_url: /paperwork.view/
nav_order: 3
has_children: false
has_toc: false
---
# Embed with JavaScript
{: .no_toc }

Use the `pw` object when you need to choose the template at run time, send your own content or data, or get the PDF back. It is created by the same embed library:

```html
<script src="https://paperwork.vu/er.js"></script>
<div id="viewer" style="height: 520px"></div>
```

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
pw.show({ name: 'invoice', template: 'richard-prod:invoice-example' });
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
