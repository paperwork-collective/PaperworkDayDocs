---
layout: default
render_with_liquid: false
title: Data and fields
nav_order: 3
permalink: /data-and-fields/
has_children: false
has_toc: false
description: "The two ways a Paperwork template gets its content: fields for single values that change each time, and data for lists and records. How to define them and how to set them."
---

# Data and fields
{: .no_toc }

A template gets its content in two ways. **Fields** are single values that change each time a document is made, such as a date, a customer name or a logo. **Data** is a list or a record, such as the lines of an invoice. This page explains both once, for every way of making a document.

## Fields

A field has a value that a person can type, a link can carry, or a script can supply. The template reads it as `{{$fields.id}}`:

```html
<h1>{{$fields.title}}</h1>
<p>{{format(date($fields.date), 'dd MMMM yyyy')}}</p>
```

In the Designer, open **Manage fields** to define them:

| Setting | What it is |
|---|---|
| **Display name** | The name people see when they fill in the document. |
| **Field identifier** | The id used in the template and to set the value. |
| **Description** | An optional sentence to help someone enter a right value. |
| **Type** | The kind of value, for example text, date, number, colour, asset, map, select or rich text, or a group or list of other fields. |

Every field has a default value, stored in the template. A value you set when you make a document replaces it.

### Set a field

| You are using | Set a field with |
|---|---|
| The Designer preview | **Field values** |
| The [Viewer](/paperwork.view/) from a link | The field id and value after a `?`, such as `?name=Globex`. See [Link to a document](/paperwork.view/links.html). |
| The Viewer from JavaScript | A `fields` object. See [Embed with JavaScript](/paperwork.view/javascript.html). |
| The [command line](/paperwork.cli/generate.html) | `--field date=2026-04-01` |
| [Paperwork.Core](/paperwork.core/quickstart/builder) | `WithField("date", "2026-04-01")` |

The command line and Paperwork.Core set one text, number or date value. A field that holds a group or a list keeps what is saved in the template.

A field is matched by its id, so the spelling and the case must be the same as in the Designer.

## Data

Add a data source when the template needs more than single values, such as a list of line items. Each source has an id of its own, and the template reads it with that id:

```html
<p>Total: {{order.total}}</p>
```

The id can only contain letters and underscores, and it must be unique in the template. It cannot be `fields`, `user` or `environment`, which are reserved.

In the Designer, a data source is one of these:

| Source | What it is |
|---|---|
| **Editable content** | JSON kept in the template, or provided when the document is made. |
| **Open data feed** | The address of a feed, loaded when the document is made. |
| **Atlassian Jira** | Data from Jira, for people signed in to it. |

### Supply data

| You are using | Supply data with |
|---|---|
| The [Viewer](/paperwork.view/) from JavaScript | A `datas` list. See [Show your own content](/paperwork.view/send-content.html). |
| The [command line](/paperwork.cli/generate.html) | `--data order=order.json`, a JSON file named for the source |
| [Paperwork.Core](/paperwork.core/quickstart/quickstart_core) | `WithData("order", yourObject)` |

Data you supply replaces the source with the same id in the template. Sources you do not replace load as normal. An id the template does not have is added.

### Data from a feed

A feed is fetched while the document is made, and only from the addresses the [portal](/portals/) allows.

A feed that does not allow the browser to read it (no CORS) is fetched for the template by Paperwork instead. That needs:

- for a personal template, its owner has an Editor or Publisher licence;
- for a collection's template, the person making the document is a member of the collection, and the collection has an owner with a Publisher licence.

Adding a connection in the Designer needs an Editor licence or above.

## Fields or data?

- A value a person fills in, or a link sets, is a **field**.
- A list, a table of rows or a record from another system is **data**.
- A field can carry a group of values or a list of them. Use that for a few related settings, such as a brand's colours and logo. Use data for records.

## Next

- [Edit and preview](/paperwork.design/editing.html): defining fields and data in the Designer.
- [Concepts and glossary](/concepts/).
- [Reference: expressions](/paperwork.core/reference/binding/), for the `{{ }}` language.
