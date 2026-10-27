---
layout: default
render_with_liquid: false
title: Paperwork.Skill
nav_order: 5
has_children: true
has_toc: false
---
# Paperwork.Skill
{: .no_toc }

**Full AI Skills.** Let your AI fill in fields, generate documents and design templates.

The Paperwork skill teaches your AI coding agent how to author Paperwork templates and generate documents from them. You ask in plain language, and the agent writes the HTML, CSS and config files, validates them, and runs the [Paperwork.CLI](/paperwork.cli/) to produce the PDF.

## What the skill does

Once installed, your agent can:

- **Author reusable templates**: scaffold an HTML layout, CSS styles and a template config for any document type: reports, invoices, certificates, letters or statements.
- **Bind fields and data**: wire single values (dates, names, titles) and JSON data (tables, line items, records) into the template with `{{ }}` expressions.
- **Generate PDFs on demand**: run a template with new data and field values.
- **Route the output**: save it to a folder, pipe it to an upload command, or both.

## Things you can ask

| You say | What happens |
|---|---|
| *Create an invoice template with customer name, date and line items* | The agent scaffolds the layout and config, and validates them. |
| *Generate my monthly report for March* | It finds the template, applies your values and writes the PDF. |
| *Create the finance report and save it to my Finance Documents folder* | It generates the PDF and writes it to that path. |
| *Generate the certificate and send it to SharePoint* | It generates the PDF and pipes it to your upload command. |

## What you need

| Requirement | Details |
|---|---|
| .NET 8 or later | From [dotnet.microsoft.com](https://dotnet.microsoft.com/download). |
| The Paperwork CLI | `dotnet tool install -g Paperwork.CLI`. See [Paperwork.CLI](/paperwork.cli/). |

Check the CLI works with `paperwork info`, then [install the skill](/paperwork.skill/installing.html).

The skill source is on [GitHub](https://github.com/paperwork-collective/Paperwork.Skill).
