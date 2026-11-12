---
layout: default
render_with_liquid: false
title: Paperwork.CLI
nav_order: 5
has_children: true
has_toc: false
description: "The Paperwork command line: generate documents from published or downloaded templates in scripts, scheduled jobs and pipelines."
---
# Paperwork.CLI
{: .no_toc }

**The Paperwork CLI makes documents from the command line. It's for developers and IT teams who want documents from scripts, scheduled jobs and pipelines.**

The `paperwork` command uses the same engine as the rest of Paperwork. Give it a published template or your own HTML file, add your data and field values, and it writes the PDF to a file or to standard output. It's also the tool the [Paperwork.Skill](/paperwork.skill/) runs to make documents.

### Use it when

- No one needs to open a browser: the document is made by a job, a pipeline or a script.
- You make the same document for many records, such as a statement for each customer.
- You want the published version of a template. Public templates need no sign-in; your personal and collection templates need `paperwork login` first.

### Use something else when

| If you need... | Use |
|---|---|
| People to open and fill in a document themselves | [Paperwork.Viewer](/paperwork.view/) |
| Documents made inside your own .NET application, without starting a process | [Paperwork.Core](/paperwork.core/) |
| To make or change the template | [Paperwork.Design](/paperwork.design/) |

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
