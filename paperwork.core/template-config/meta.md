---
layout: default
render_with_liquid: false
title: Meta data
nav_order: 5
parent: Template Configuration
parent_url: /paperwork.core/template-config/
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
has_children: false
has_toc: false
---
# Meta data
{: .no_toc }

The `meta` section describes the template itself. It does not change how a document is generated, and it is all optional. It is there for the people and tools that publish, list and manage templates.

```json
"meta": {
  "title": "Monthly invoice",
  "desc": "An invoice for a single customer, with line items",
  "author": "Finance",
  "publishedOn": "2026-03-25T09:30:00Z",
  "publishedBy": "richard",
  "publishedVersion": "3.0"
}
```

| Property | Description |
|---|---|
| `title` | The name of the template. |
| `desc` | A description of what it is for. |
| `author` | Who wrote it. |
| `publishedOn` | When this version was published. |
| `publishedBy` | Who published it. |
| `publishedVersion` | The version that was published. |

Any other properties in `meta` are kept, so tools that add their own details to the file do not lose them when it is read and saved again.

## In code

The meta data is on the `MetaData` property of the `TemplateConfigurationV1` class, with the extra properties in its `ExtensionData`.

```csharp
var config = JsonSerializer.Deserialize<TemplateConfigurationV1>(json);
Console.WriteLine(config.MetaData.Title);
```
