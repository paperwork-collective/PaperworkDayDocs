---
layout: default
render_with_liquid: false
title: Use published templates
parent: Paperwork.Skill
parent_url: /paperwork.skill/
nav_order: 3
has_children: false
has_toc: false
description: "Ask your AI assistant to make a document from a template published in Paperwork: a public one, your own, or your team's collection."
---
# Use published templates
{: .no_toc }

## What you'll do

Ask your assistant for a document from a template that has been published in Paperwork, not only one saved on your own machine. The skill drives the [Paperwork.CLI](/paperwork.cli/), so it can reach the same three places the CLI can.

## The three places

| The template is... | You say something like | Sign-in |
|---|---|---|
| In the public library | *Make a document from the acme:invoice template* | None |
| One of your own personal templates | *Use my personal monthly-report template* | You sign in with `paperwork login` |
| In a collection your team shares | *Use the offer-letter template from the acme:hr collection* | You sign in, and you must be a member of the collection |

Behind the request the agent runs the CLI, for example:

```bash
paperwork generate --template acme:invoice --output invoice.pdf
paperwork generate --template my-report --personal --output report.pdf
paperwork generate --collection acme:hr --template offer-letter --output offer.pdf
```

If you do not know a template's id, ask the agent to find it. It uses `paperwork list` to show your personal templates, a public owner's templates, or a collection's templates.

The commands, options and examples are in [Generate from a published template](/paperwork.cli/examples.html) and [Sign in](/paperwork.cli/sign-in.html). This page does not repeat them.

## Signing in is yours

Signing in opens a browser window, and the agent waits while you do it. The agent never signs in for you and never asks for your password.

If you want the PDF to need a password to open it, ask the agent to use `--password-env` with the name of an environment variable, rather than `--password` with the value itself. A password written into a command stays in your shell history.

## Local templates still work

Templates in `./templates` and `~/.paperwork/templates` are used as before. See [Templates and generating](/paperwork.skill/templates.html). The agent decides from your words. "My invoice template" or a file path means your machine. "Our", "published", a collection name, or an id with a colon in it, such as `acme:invoice`, means Paperwork. If it cannot tell, it asks you.

## The skill's version follows the CLI's

The skill can only do what the CLI underneath it can do, so its version follows the CLI's. Skill `9.9.1.1` is made for CLI `9.9.1.1`. A fourth number that is higher than the CLI's means a change to the skill alone. When the CLI gains a feature, the skill is updated and its version moves to match.

## Next

- [Sign in](/paperwork.cli/sign-in.html): `login`, `list`, and which templates each option reaches.
- [Roles and access](/roles/): who can see a collection's templates.
