---
layout: default
render_with_liquid: false
title: Edit and preview
parent: Paperwork.Design
parent_url: /paperwork.design/
nav_order: 2
has_children: false
has_toc: false
---
# Edit and preview
{: .no_toc }

A template is made of a layout, styles, data, fields and assets. The Designer shows the document as it will be generated, so you see the effect of each change.

## Visual and code editing

The content of the layout can be edited two ways, and you can switch between them at any point:

- **Visually**, as a document. Use **Make content editable** to type and format directly in the page.
- **In code**, as HTML and CSS. Use **Edit source** to work with the markup itself, with a search to **Find** terms in it.

Use **Add New** to add another layout or style to the template.

## Fields

Fields are the values that change each time a document is made: a date, a customer, a title, a logo. Open **Manage fields** to define them.

| Setting | Description |
|---|---|
| **Display name** | The name people see when they fill in or generate the document. |
| **Field identifier** | The id used in the template. It is read as `{{$fields.id}}`. |
| **Description** | An optional short sentence to help people enter a right value. |
| **Type** | The kind of value: for example text, date, number, colour, asset, map, select or rich text, or a group or list of other fields. |

Click a field in the list to insert it at the cursor position in your content.

Fields are passed to the template when it is generated, so the same template can make many different documents. Use **Field values** in the preview to try different values.

## Data

Add a data source when the template needs more than single values, such as a list of line items. Each source has an id of its own, which is how the template refers to it (`{{order.total}}`). The id can only contain letters and underscores, must be unique within the template, and cannot be `fields`, `user` or `environment`, which are reserved.

| Source type | Description |
|---|---|
| **Editable content** | JSON kept in the template, or provided when the document is generated. |
| **Open data feed** | The address of a feed, loaded when the document is generated. |
| **Atlassian Jira** | Data from Jira, for people signed in to it. |

## Assets

**Shared assets** holds the images and fonts a template uses. They are public, so anyone can read them, and only you can change them. Choose from **Mine** or **Recents**, or **Upload** a new one. There is a storage limit for your assets, and the dialog shows how much you have used.

## Preview

The preview generates the document with the current content, fields and data. Use **Scroll view** to read the pages one after another, instead of a page at a time.
