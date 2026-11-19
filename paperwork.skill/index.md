---
layout: default
render_with_liquid: false
title: Paperwork.Skill
nav_order: 3
has_children: true
has_toc: false
description: "The Paperwork skill for AI assistants: let your AI find your templates, fill in fields, generate documents and design new templates."
---
# Paperwork.Skill
{: .no_toc }

**The Paperwork skill lets your AI assistant make documents for you from a request in plain English. It works in Claude Code, Cursor, GitHub Copilot in VS Code and Windsurf. It's for people who'd rather ask for a document than build or run one.**

You ask, for example, "make the March invoice for Acme". Your assistant finds or writes the template, fills in the fields, checks it, and runs the [Paperwork.CLI](/paperwork.cli/) to make the PDF. It saves the PDF where you ask. Paperwork doesn't send it anywhere.

### Use it when

- You want a document now and know what should be in it, but not how the template works.
- You want your assistant to write a first template for you to check.
- The data is in files, or in tools your assistant can already reach.

### Use something else when

| If you need... | Use |
|---|---|
| The same document on a schedule, with no one asking | [Paperwork.CLI](/paperwork.cli/) |
| A template your whole team uses, with versions and who can use it | [Paperwork.Design](/paperwork.design/) |
| People outside your team to open a document | [Paperwork.Viewer](/paperwork.view/) |

## What the skill does

Once installed, your agent can:

- **Author reusable templates**: scaffold an HTML layout, CSS styles and a template config for any document type: reports, invoices, certificates, letters or statements.
- **Bind fields and data**: wire single values (dates, names, titles) and JSON data (tables, line items, records) into the template with `{{ }}` expressions.
- **Generate PDFs on demand**: run a template with new data and field values.
- **Use published templates**: make a document from a template in the public library, your own, or your team's collection. See [Use published templates](/paperwork.skill/published-templates.html).
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

## Related pages

- [Glossary](/glossary/): the pieces of Paperwork, and what each word means.
- [Data and fields](/data-and-fields/): how a template gets its values and its lists.
- [Portals](/portals/) and [Signing in](/signing-in/).
