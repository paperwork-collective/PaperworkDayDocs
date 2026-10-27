---
layout: default
render_with_liquid: false
title: Templates and generating
parent: Paperwork.Skill
parent_url: /paperwork.skill/
nav_order: 2
has_children: false
has_toc: false
---
# Templates and generating
{: .no_toc }

## Authoring a template

Ask for the document you want:

> Create an invoice template with fields for date and reference number, and a line items data source

The agent works out the document type, a short name for it, the **fields** (single values you supply each time) and the **data sources** (JSON it loops over), and asks where to keep the template. It then creates three files:

```text
templates/
└── invoice/
    ├── invoice.json   the template config
    ├── invoice.html   the layout, with {{ }} bindings
    └── invoice.css    the styles
```

The config follows the [Config file format](/paperwork.cli/config-format.html). Layouts, styles and data are referenced by relative path as `Source` items, so each file stays readable and editable on its own, and the agent validates the result with `paperwork validate`.

## Where templates are kept

| Scope | Path | Use for |
|---|---|---|
| Project | `./templates/<name>/` | Templates for one project, which travel with its repository. |
| Global | `~/.paperwork/templates/<name>/` | Templates shared by every project on this machine. |

## Generating a document

Ask for it with your values:

> Generate my invoice for Acme Corp using acme-order.json and save it to ~/Documents/Invoices

The agent finds the template and runs the CLI:

```bash
paperwork generate --config templates/invoice/invoice.json \
  --data customer=acme-order.json \
  --field date=2026-03-30 \
  --output ~/Documents/Invoices/acme-march-2026.pdf
```

## Sending the output on

Without `--output` the PDF goes to standard output, so it can be piped to anything that accepts a file:

> Generate the monthly report and upload it to SharePoint

```bash
paperwork generate --config templates/monthly-report/monthly-report.json \
  --field month=March --field year=2026 \
  | <your-upload-command> "Finance/Reports/March 2026.pdf"
```

## Binding reference

These are the expressions the agent writes into a layout. The full language is in [Paperwork.Reference](/paperwork.core/reference/binding/).

```html
<!-- a field value -->
<p>{{$fields["date"]}}</p>

<!-- a property of a data source -->
<p>{{customer.name}}</p>

<!-- loop over an array -->
{{#each items}}
<tr>
  <td>{{this.description}}</td>
  <td>{{format(this.amount, 'C2')}}</td>
</tr>
{{/each}}

<!-- a condition -->
{{#if customer.isPremium}}
<p>Premium discount applied.</p>
{{/if}}

<!-- a filtered loop -->
<template data-bind="{{selectWhere(items, .type == 'taxable')}}">
  <tr><td>{{.description}}</td></tr>
</template>
```
