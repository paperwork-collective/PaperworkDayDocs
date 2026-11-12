---
layout: default
render_with_liquid: false
title: Show your own content
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 5
has_children: false
has_toc: false
description: "Send your own HTML layout, CSS styles, JSON data and field values to the Paperwork Viewer from a web page, without publishing a template."
---
# Show your own content
{: .no_toc }

## What you'll do

Show a document made from content your page sends: an HTML layout, CSS styles, JSON data and field values. Nothing is published first.

## Before you start

- A web page with the Viewer on it that starts without a template. See [Embed with JavaScript](/paperwork.view/javascript.html).
- The content you want to send: at least an HTML layout.

## Steps

**1. Add a container that starts without a template.**

```html
<script src="https://paperwork.vu/er.js"></script>
<div data-pw-container="doc" data-pw-js-init data-pw-height="520px"></div>
```

**2. Send the content with `pw.show`.**

```javascript
pw.show({
  name: 'doc',
  layouts: [{ name: 'main', content: '<html><body><h1>{{$fields.title}}</h1><p>Total: {{model.total}}</p></body></html>', format: 'html' }],
  styles:  [{ name: 'doc.css', content: 'body { font-family: sans-serif; }', format: 'css' }],
  datas:   [{ name: 'model', content: JSON.stringify({ total: 1200 }), format: 'json' }],
  fields:  { title: 'March Invoice' }
});
```

What each part does:

| Part | What it is |
|---|---|
| `layouts` | The HTML of the document. The `format` is `html`. |
| `styles` | CSS for the layout. The `format` is `css`. |
| `datas` | JSON data. Each item becomes a named source, so the item named `model` is read as `{{model.total}}`. |
| `fields` | Values for the template's fields, read as `{{$fields.title}}`. |

**3. For a plain HTML layout, send only the layout.** The `styles`, `datas` and `fields` are optional:

```javascript
pw.show({
  name: 'doc',
  layouts: [{ name: 'main', content: '<html><body><h1>Hello</h1></body></html>', format: 'html' }]
});
```

## Check it worked

The viewer shows a document with your heading and total. To see what the viewer is doing, add `?pwdebug` to the page address and open the browser console.

## Next

- [Embed with JavaScript](/paperwork.view/javascript.html), for `pw.get` to take the PDF back into your code.
- [Reference: expressions](/paperwork.core/reference/binding/), for the `{{ }}` language used in a layout.
