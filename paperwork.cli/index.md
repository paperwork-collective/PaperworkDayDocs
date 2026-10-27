---
layout: default
render_with_liquid: false
title: Paperwork.CLI
nav_order: 4
has_children: true
has_toc: false
---
# Paperwork.CLI
{: .no_toc }

**Command Line.** Build documents from content or a published template.

The `paperwork` command line tool generates PDF documents with the same engine as the rest of Paperwork. Point it at an HTML file, a template config file, or a published template, add your data and field values, and it writes the PDF to a file or to standard output so you can pipe it on.

It is a good fit for build pipelines, scheduled jobs and scripts, and it is the tool the [Paperwork.Skill](/paperwork.skill/) uses to generate documents for your AI agent.

## Install

The CLI is a .NET tool and needs the .NET 8 (or later) runtime.

```bash
dotnet tool install -g Paperwork.CLI
```

Check it is working:

```bash
paperwork info
```

## Quick start

Generate a PDF from a single HTML file:

```bash
paperwork generate --layout invoice.html --output invoice.pdf
```

Add data and fields:

```bash
paperwork generate \
  --layout invoice.html \
  --data order=order.json \
  --field date=2026-03-26 \
  --field title="March Invoice" \
  --output invoice.pdf
```

Generate from a template published in [Paperwork.Design](/paperwork.design/):

```bash
paperwork generate --template 929mMaxCcf5Nr3UT1DZg --output report.pdf
```

Leave out `--output` to write the PDF bytes to standard output:

```bash
paperwork generate --layout report.html | aws s3 cp - s3://my-bucket/report.pdf
```

## Where to next

| Page | What it covers |
|---|---|
| [Generate](/paperwork.cli/generate.html) | Every option of `generate`: input modes, data and field overrides, portals and exit codes |
| [Validate and info](/paperwork.cli/validate.html) | Check a config file before a run, and show version information |
| [Sign in and list](/paperwork.cli/sign-in.html) | `login`, `whoami`, `logout` and `list`, for personal and collection templates |
| [Config file format](/paperwork.cli/config-format.html) | The `schemaVers` / `template` JSON file, including field types |
| [Examples](/paperwork.cli/examples.html) | Common patterns, ready to copy |

The template language itself (HTML, CSS and expressions) is the same in every product, and is documented in [Paperwork.Reference](/paperwork.core/reference/).

The source and issue tracker are on [GitHub](https://github.com/paperwork-collective/Paperwork.CLI).
