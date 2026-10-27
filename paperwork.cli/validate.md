---
layout: default
render_with_liquid: false
title: Validate and info
parent: Paperwork.CLI
parent_url: /paperwork.cli/
nav_order: 2
has_children: false
has_toc: false
---
# Validate and info
{: .no_toc }

## validate

Check a template config file without generating a PDF.

```bash
paperwork validate <config>
```

It checks the same `schemaVers` / `template` shape that `generate --config` reads:

- the file exists and is valid JSON;
- it has a `template` definition;
- there is at least one layout;
- every layout has a name and either `content` or `source`;
- every style has either `content` or `source`;
- every data item has a name and either `content` or `source`.

On success it prints a summary:

```text
Valid. Layouts: 1, Styles: 2, Data: 3, Fields: 1
```

On failure it lists the problems on standard error and exits with code `1`:

```text
Validation failed with 2 error(s):
  - layouts: at least one layout is required.
  - data[records]: must have either content or source.
```

It chains well with `generate`:

```bash
paperwork validate monthly-report.json && \
  paperwork generate --config monthly-report.json --output report.pdf
```

## info

Show the version and environment details, which is useful when reporting a problem.

```bash
paperwork info
```

```text
paperwork CLI
  Version  : 9.6.0.1
  Scryber  : 9.6.0.0-beta
  Runtime  : .NET 8.0.x
  OS       : Darwin ...
```
