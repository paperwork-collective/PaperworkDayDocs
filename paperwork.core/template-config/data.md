---
layout: default
render_with_liquid: false
title: Data
nav_order: 3
parent: Template Configuration
parent_url: /paperwork.core/template-config/
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
has_children: false
has_toc: false
---
# Data
{: .no_toc }

The `data` list holds the named data sources that the template binds to. Each one is a [content item](/paperwork.core/template-config/), and its content is JSON.

```json
"data": [
  { "name": "model", "type": "Content", "content": "{ \"customer\": { \"name\": \"Acme Corp\" }, \"items\": [ { \"description\": \"Widget\", \"amount\": 12.5 } ] }" },
  { "name": "rates", "type": "Source", "source": "https://api.example.com/rates", "auth": "myApi" }
]
```

## Using the data

The name of the data item is how the template refers to it:

```html
<p>{{model.customer.name}}</p>

{{#each model.items}}
  <p>{{this.description}}: {{format(this.amount, 'C2')}}</p>
{{/each}}

<p>{{rates.gbp}}</p>
```

The [binding reference](/paperwork.core/reference/binding/) lists the helpers, operators and functions.

## Content you provide when you generate

A data item in a saved template is often just sample data, for the Designer's preview. When the document is generated, supply your own with the same name, and it replaces the one in the file:

```csharp
await factory.FromConfig(config)
    .WithData("model", invoice)
    .SaveAsync("invoice.pdf");
```

A name that is not in the template is added. The [CLI](/paperwork.cli/generate.html) does the same with `--data model=invoice.json`.

## Loading from a url

A data item can be an open feed, loaded when the document is generated. Add `auth` if the feed needs authentication, and put field ids in the url, such as `https://api.example.com/orders/{{orderId}}`, to build it from the field values.

## Names

A name is used directly in expressions, so use only letters and underscores. The names `fields`, `user` and `environment` are reserved by Paperwork and cannot be used.

## In code

The same data is added to a [builder](/paperwork.core/quickstart/builder.html#data) with `WithData`, `WithDataFile` and `WithDataUrl`.
