---
layout: default
render_with_liquid: false
title: Fields
nav_order: 4
parent: Template Configuration
parent_url: /paperwork.core/template-config/
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
has_children: false
has_toc: false
---
# Fields
{: .no_toc }

Fields are the single values that change each time a document is made: a date, a customer name, a logo, a colour. They are defined in the `fields` list of the template, each with a default value, and can be set again when the document is generated.

```json
"fields": [
  { "id": "date",  "name": "Invoice date", "type": "date",   "desc": "The date on the invoice", "value": "2026-03-25" },
  { "id": "title", "name": "Title",        "type": "string", "value": "Invoice" }
]
```

| Property | Description |
|---|---|
| `id` | The key used to read the field in the template, and to set it when generating. |
| `value` | The default value. It can be text, a number, or a nested object or list (see below). |
| `name` | A readable label, shown by the Designer when someone fills the field in. |
| `type` | The kind of value, which decides the editor the Designer shows. For example `string`, `date`, `number`, `color`, `asset`, `map`, `select`, `richtext`, `single`, `list` or `section`. |
| `desc` | A short description, to help the person entering a value. |

## Using a field

A template reads a field from the `$fields` collection:

```html
<h1>{{$fields.title}}</h1>
<p>{{format(date($fields.date), 'dd MMMM yyyy')}}</p>
```

The other form, `{{$fields["title"]}}`, is the same. Fields are not data items, so they do not clash with a data name.

## Setting a field

Set the field when you generate, over the default in the template:

```csharp
await factory.FromConfig(config)
    .WithField("date", "2026-04-01")
    .SaveAsync("invoice.pdf");
```

The [CLI](/paperwork.cli/generate.html) uses `--field date=2026-04-01`, and the [viewer](/paperwork.view/javascript.html) takes a `fields` object. A field that is not in the template can be set too, and is available to the template in the same way.

## Fields in a url

A `{{id}}` in the `source` of a layout, style or data item is replaced with the value of the field with that id, escaped for a url, before the content is fetched. It lets one template load different content for different values.

## Nested values

The richer field types, `single` and `list`, hold a nested object or list, with the shape described by a nested set of fields. A template reads it with the usual dots and indexes:

```json
{
  "id": "brand", "type": "single", "name": "Branding",
  "value": { "cover_bg_color": "#000037", "logo": "$assets/public/me/logo.png" },
  "options": {
    "fields": [
      { "id": "cover_bg_color", "type": "color" },
      { "id": "logo", "type": "asset" }
    ]
  }
}
```

```html
<div style="background-color: {{$fields.brand.cover_bg_color}}">
  <img src="{{$fields.brand.logo}}" />
</div>
```

A value that starts with `$assets/` or `$maps/` refers to a stored image or a map, and is resolved when the document is generated, so generation is asynchronous by default.

{: .note }
> `WithField` and the CLI's `--field` set a single text, number or date value. A nested value keeps what is saved in the template.
