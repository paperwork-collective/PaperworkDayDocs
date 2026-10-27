---
layout: default
render_with_liquid: false
title: Generate
parent: Paperwork.CLI
parent_url: /paperwork.cli/
nav_order: 1
has_children: false
has_toc: false
---
# Generate
{: .no_toc }

Generate a PDF document.

```bash
paperwork generate [--template <id> | --config <file> | --layout <file>] [options]
```

## Input modes

`--template`, `--config` and `--layout` are mutually exclusive, and one of them is required.

### --layout

Load an HTML layout from a local file. Use `--style` and `--data` to add CSS and data alongside it.

```bash
paperwork generate --layout report.html --output report.pdf
```

### --config

Load a full template config JSON file. The file must use the `schemaVers` / `template` wrapped shape described in [Config file format](/paperwork.cli/config-format.html).

```bash
paperwork generate --config report.json --output report.pdf
```

### --template

Fetch a published template by id. The layouts, styles, data and field defaults come from the stored template, and `--data` and `--field` can override individual values.

```bash
paperwork generate --template 929mMaxCcf5Nr3UT1DZg --output report.pdf
```

By default this fetches a template from the public library. Add `--personal` for one of your own personal templates, or `--collection` for a template published in a collection. Both need you to [sign in](/paperwork.cli/sign-in.html) first.

Before fetching, the command checks the template can be had and tells you why if not: it does not exist, it has not been published, it is published a different way (personal rather than public, say), it belongs to someone else, or you are not a member of its collection.

## Options

| Option | Description |
|---|---|
| `--template <id>` | Fetch a published template. Public by default. |
| `--personal` | Fetch one of your own personal templates. `--template` must be the full `{owner}:{slug}` id. Needs `login` first, and cannot be used with `--collection`. |
| `--collection <id>` | Fetch a template published in a collection, for example `acme:reports`. `--template` is the template's id within the collection. Needs `login` first, as a member. |
| `--environment <name>` | `production` (default), `staging` or `dev`. |
| `--portal <host>` | The portal whose configuration to generate with. Defaults to the environment's main portal. |
| `--config <file>` | A template config JSON file. |
| `--layout <file>` | An HTML layout file. |
| `--style <file>` | A CSS file to include. Repeatable, `--layout` mode only. |
| `--data <name>=<file>` | A JSON data file. Repeatable, works in every mode. |
| `--field <key>=<value>` | A field value. Repeatable, works in every mode. Scalar values only. |
| `--output <file>` | The output PDF path. Leave out to write the bytes to standard output. |
| `--sync` | Render synchronously. Remote content is not waited for, so only use it for documents that use none. |

## Data and fields

A `--data name=file` flag replaces the data source with that name in a template or config. Data sources you do not override load as normal, and a name the template does not have is added.

```bash
paperwork generate --config invoice.json \
  --data customer=local-customer.json \
  --output invoice.pdf
```

A `--field key=value` flag sets a field, which a template reads as `{{$fields.key}}` or `{{$fields["key"]}}`.

{: .note }
> `--field` can only set a scalar (text, number or date). A field whose stored value is a nested object or list keeps its stored value, because there is no command line syntax to replace part of it.

## Remote content

Generation is asynchronous by default, so remote content is loaded: stored assets (`$assets/...`), map images (`$maps/...`), and layouts, styles or data that come from a `Source` URL. With `--sync` none of these are waited for and they are silently left out.

## Portal configuration

Every run reads the chosen portal's configuration, the same one the Designer and Viewer hand the generator, and uses its:

- **endpoints**, to resolve stored assets, map images and remote requests;
- **allowed and blocked domains**, applied to everything the document fetches from the web: images, fonts, stylesheets and the template's own remote sources.

A refused image or font is left out and reported as a `Warning:` on standard error. A refused template source stops the run with the reason. Paperwork's own `$assets` and `$maps` references, and the portal's own endpoints, are not subject to the lists.

If the portal has no configuration, or it cannot be read, a warning is printed and generation carries on with the environment's asset store alone.

## Output and exit codes

When `--output` is given the PDF is written there and a confirmation is printed to standard error:

```text
PDF written to /path/to/output.pdf (12,345 bytes)
```

When it is left out, the raw PDF bytes go to standard output and all messages go to standard error, so the stream stays clean to pipe.

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Error, with the message written to standard error |
