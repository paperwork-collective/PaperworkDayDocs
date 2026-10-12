---
layout: default
title: Paperwork.Skill
nav_order: 5
has_children: false
has_toc: false
---

# Paperwork.Skill
{: .no_toc }

**Full AI Skills.** Let your AI fill in fields, generate documents and design templates.

{: .note }
> Full documentation for Paperwork.Skill is being written. What is below is a summary; the template reference (HTML, CSS and expressions) applies to all of the products and is in [Paperwork.Reference](/paperwork.core/reference/).

## What the skill does

Once installed, your AI agent can:

- **Author reusable templates**: scaffold HTML layouts, CSS styles and template configuration for any document type.
- **Bind fields and data**: wire scalar values (dates, names, titles) and JSON data sources (tables, line items, records) into templates using handlebars expressions.
- **Generate PDFs on demand**: run a template with per-run data and field overrides to produce a PDF.
- **Route output flexibly**: save to a local folder, pipe to an upload command, or both.

The skill uses the [Paperwork.CLI](/paperwork.cli/) to validate and generate documents.
