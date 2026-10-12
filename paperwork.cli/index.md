---
layout: default
title: Paperwork.CLI
nav_order: 4
has_children: false
has_toc: false
---

# Paperwork.CLI
{: .no_toc }

**Command Line.** Build documents from content or a published template.

{: .note }
> Full documentation for Paperwork.CLI is being written. What is below is a summary; the template reference (HTML, CSS and expressions) applies to all of the products and is in [Paperwork.Reference](/paperwork.core/reference/).

## Install

```bash
dotnet tool install -g Paperwork.CLI
```

## Commands

| Command | Description |
|---|---|
| `generate` | Generate a PDF document |
| `validate <config>` | Validate a template config JSON file |
| `list` | List published templates: your personal ones, one owner's public ones, or a collection's |
| `login` | Sign in with GitHub (device flow), needed for personal and collection templates |
| `whoami` | Show who you are signed in as, and check the sign-in still works |
| `logout` | Forget the saved sign-in on this machine |
| `info` | Display version and environment information |

The source and the full README are on [GitHub](https://github.com/paperwork-collective/Paperwork.CLI).
