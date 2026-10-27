---
layout: default
render_with_liquid: false
title: Config file format
parent: Paperwork.CLI
parent_url: /paperwork.cli/
nav_order: 4
has_children: false
has_toc: false
---
# Config file format
{: .no_toc }

`generate --config` and `validate` read a JSON file in the same shape Paperwork stores for published templates: a `schemaVers` and a `template`, wrapped together.

{: .warning }
> The file used to be a flat top-level object. A file written for that older format no longer works: its `template` is missing, so it fails validation.

## Structure

```json
{
  "schemaVers": "1.1",
  "meta": { "title": "..." },
  "authTokens": [ { "id": "jira", "type": "oauth", "value": "..." } ],
  "template": {
    "mainLayout": "main",
    "layouts": [ ],
    "styles": [ ],
    "data": [ ],
    "fields": [ ]
  }
}
```

| Property | Required | Description |
|---|---|---|
| `schemaVers` | Yes | Must be `"1.1"`. |
| `meta` | No | Template details such as the title. Not used by the CLI. |
| `authTokens` | No | `{id, type, value}` entries, looked up by an item's `auth` id. |
| `template` | Yes | The definition. Everything below is inside it. |
| `template.mainLayout` | No | The name of the root layout. Defaults to `main`. |
| `template.layouts` | Yes | One or more HTML layouts. |
| `template.styles` | No | CSS to include. |
| `template.data` | No | Named data objects to bind into the template. |
| `template.fields` | No | Field definitions. |

## Layouts, styles and data

The three arrays share one item shape:

```json
{
  "name": "main",
  "type": "Content",
  "content": "<html>...</html>",
  "source": "https://example.com/template.html",
  "auth": "",
  "format": ""
}
```

| Property | Description |
|---|---|
| `name` | The identifier. Required for layouts and data, optional for styles. |
| `type` | `Content` when the value is in `content`, `Source` when it is fetched from `source`. Worked out if left out. |
| `content` | The inline HTML, CSS or JSON text. |
| `source` | A URL to fetch the content from when the document is generated. |
| `auth` | The id of an auth handler for a `Source` item: `Jira` (Atlassian), or `$Asset` (an authenticated Paperwork asset fetch). `NoCors` only works in the Designer and Viewer, not the CLI. |
| `format` | `base64` when `content` is base64 encoded. Leave empty for plain text. |

## Fields

A field supplies a value to the template, which reads it as `{{$fields.id}}` or `{{$fields["id"]}}`.

| Property | Description |
|---|---|
| `id` | The key used in the template. In a `source` URL, `{{id}}` is replaced with the field's value before fetching. |
| `value` | The default value: text, a number, or a nested object or list. |
| `name` | A readable label. |
| `type` | `string`, `date`, `number`, `color`, `asset`, `map`, `select`, `richtext`, `single` (a nested object), `list` (a nested list) or `section` (a divider with no value). |
| `desc` | A description. |
| `required` | Informational only. The CLI does not enforce it. |
| `options` | Settings for the type: `fields` (the nested schema of a `single` or `list`), `items` (for `select`), `allowUpload` (for `asset`). |

The richer types store a value shaped by a nested `options.fields` list, which uses the same field format again:

```json
{
  "id": "brand", "type": "single", "name": "Report Branding",
  "value": {
    "cover_bg_color": "#000037",
    "logo": "$assets/public/{uid}/logo.png"
  },
  "options": {
    "fields": [
      { "id": "cover_bg_color", "type": "color", "value": "#000037" },
      { "id": "logo", "type": "asset", "options": { "allowUpload": true } }
    ]
  }
}
```

A value that starts with `$assets/` or `$maps/` is a reference to a stored asset or a map image, resolved when the document is generated, not text to print. That is one reason generation is asynchronous by default.

## Binding in the layout

```html
<h1>{{$fields["title"]}}</h1>

<p>{{$fields.brand.cover_bg_color}}</p>

<p>{{order.customerName}}</p>

<ul>
  {{#each items}}
  <li>{{this.label}}</li>
  {{/each}}
</ul>
```

## A complete example

```json
{
  "schemaVers": "1.1",
  "template": {
    "mainLayout": "main",
    "layouts": [
      {
        "name": "main",
        "type": "Content",
        "content": "<html><body><h1>{{$fields.title}}</h1><p>{{order.summary}}</p></body></html>"
      }
    ],
    "styles": [
      { "name": "base", "type": "Content", "content": "body { font-family: sans-serif; }" }
    ],
    "data": [
      { "name": "order", "type": "Content", "content": "{\"summary\": \"10 items\"}" }
    ],
    "fields": [
      { "id": "title", "value": "Order Summary", "type": "string" }
    ]
  }
}
```
