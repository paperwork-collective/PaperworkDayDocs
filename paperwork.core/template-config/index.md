---
layout: default
render_with_liquid: false
title: Template Configuration
nav_order: 1.5
parent: Paperwork.Core
parent_url: /paperwork.core/
has_children: true
has_toc: false
---
# Template Configuration
{: .no_toc }

A template configuration is a single JSON file that holds everything a document needs: its layouts, styles, data and fields, along with its meta data. It is what the [Designer](/paperwork.design/) saves when you publish or export a template, and it is what the library, the [CLI](/paperwork.cli/) and the [viewer](/paperwork.view/) read to generate a document.

Keeping it all in one file means a template can be designed once, in the Designer, and then used anywhere: you do not need to carry the HTML, CSS and sample data around separately.

## Structure

```json
{
  "schemaVers": "1.1",
  "meta": {
    "title": "Monthly invoice",
    "desc": "An invoice for a single customer",
    "author": "Finance"
  },
  "template": {
    "mainLayout": "main",
    "layouts": [ { "name": "main", "type": "Content", "content": "<html>...</html>" } ],
    "styles":  [ { "name": "invoice", "type": "Content", "content": "body { font-family: sans-serif; }" } ],
    "data":    [ { "name": "model", "type": "Content", "content": "{ \"customer\": \"Acme\" }" } ],
    "fields":  [ { "id": "date", "name": "Invoice date", "type": "date", "value": "2026-03-25" } ]
  }
}
```

| Property | Required | Description |
|---|---|---|
| `schemaVers` | Required | The version of the file format. It must be the text `"1.1"`. |
| `meta` | Optional | The [meta data](/paperwork.core/template-config/meta.html) about the template: its title, description, author and publishing details. |
| `template` | Required | The template itself, which holds everything below. |
| `template.mainLayout` | Optional | The name of the [layout](/paperwork.core/template-config/layouts.html) that is the document. Defaults to `main`. |
| `template.layouts` | Required | One or more [layouts](/paperwork.core/template-config/layouts.html): the HTML. |
| `template.styles` | Optional | The [styles](/paperwork.core/template-config/styles.html): CSS added to the document. |
| `template.data` | Optional | The named [data](/paperwork.core/template-config/data.html) sources that the template binds to. |
| `template.fields` | Optional | The [fields](/paperwork.core/template-config/fields.html): single values that can be supplied each time. |

{: .note }
> The list of data sources is called `data` in the file. In the viewer's JavaScript options it is called `datas`, and the builder methods are `WithData`.

## Content items

Layouts, styles and data are all the same shape: a name, and the content either held in the file or fetched from a url.

```json
{
  "name": "main",
  "type": "Content",
  "content": "<html>...</html>",
  "source": "",
  "auth": "",
  "format": ""
}
```

| Property | Description |
|---|---|
| `name` | The name of the item. The template uses it to refer to the item, so it should be unique in its list. |
| `type` | `Content` when the value is in `content`, or `Source` when it is fetched from `source`. If it is left out, `content` is used when there is some, and `source` when there is not. A published template may use `Remote` for `Source`, and it is read the same way. |
| `content` | The HTML, CSS or JSON, as text. |
| `source` | A url to load the content from when the document is generated. Any `{{id}}` in the url is replaced with the value of the field with that id. |
| `auth` | The name of an authentication handler to use when loading a `source`. In code, register the handler with `WithAuth` on the [factory](/paperwork.core/quickstart/factory.html). |
| `format` | `base64` if `content` or the loaded value is base64 encoded. Leave it empty for plain text. |

When a document is generated every item is loaded first, so a `source` that cannot be reached stops the generation with an error that names the item.

## Using a configuration

| With | How |
|---|---|
| The library | [`factory.FromConfig(stream)`](/paperwork.core/quickstart/builder.html#starting-from-a-saved-template), then add or replace data and fields before generating. |
| The CLI | [`paperwork generate --config file.json`](/paperwork.cli/generate.html), with `--data` and `--field` overrides. |
| The viewer | Send the layouts, styles, data and fields with [`pw.show`](/paperwork.view/javascript.html), or show the published template by its id. |
| The Designer | Export the template to a file, or import a file as a new template. |

The file for the CLI is described again, with a complete example, in the [CLI config file format](/paperwork.cli/config-format.html).

## Reading the file in code

The classes are in the `Paperwork.Generation.v1` namespace, so a configuration can also be built, read or changed in code:

```csharp
using System.Text.Json;
using Paperwork.Generation.v1;

var config = JsonSerializer.Deserialize<TemplateConfigurationV1>(File.ReadAllText("invoice.json"));

config.Definition.Fields.First(f => f.ID == "date").Value = "2026-04-01";

await factory.FromConfig(config).WithData("model", invoice).SaveAsync("invoice.pdf");
```
