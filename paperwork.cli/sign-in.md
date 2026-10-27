---
layout: default
render_with_liquid: false
title: Sign in and list
parent: Paperwork.CLI
parent_url: /paperwork.cli/
nav_order: 3
has_children: false
has_toc: false
---
# Sign in and list
{: .no_toc }

Public templates need no account. Your personal templates, and templates in a collection, need you to sign in first.

## login

Sign in with GitHub, using the device flow that `gh` and `gcloud` use, so it works on a machine with no browser.

```bash
paperwork login [--provider github] [--environment production]
```

1. The CLI prints a web address and a short code.
2. Open the address in any browser (it does not need to be on the same machine), enter the code and approve.
3. The CLI waits for the approval, then signs you in to Paperwork. You get the same account as signing in to the Designer with the same GitHub login.

```text
To sign in with GitHub, open https://github.com/login/device in a browser
and enter the code: XXXX-XXXX

Waiting for authorization...
Signed in as uid <your-user-id> (production)
```

The sign-in is remembered in `~/.paperwork/credentials.json`, one entry per environment, readable only by you. The short-lived access token is never stored. A fresh one is requested on every run.

| Option | Description |
|---|---|
| `--provider` | `github` is the one that works today. `microsoft` and `google` say they are not yet implemented. |
| `--environment` | `production` (default), `staging` or `dev`. Each is signed in separately. |

## whoami

Show who you are signed in as, and check the sign-in still works. With no `--environment` every saved sign-in is checked.

```bash
paperwork whoami [--environment <name>]
```

For each environment it reports whether the sign-in is still good, your account id, and from your Paperwork profile your name, user id (the owner part of your template ids), email, role and organisation. It exits with a non-zero code if a sign-in has expired.

## logout

Forget the saved sign-in on this machine.

```bash
paperwork logout [--environment production] [--all]
```

`--all` signs out of every environment.

## list

List the published templates that `generate` can use. Give exactly one of `--personal`, `--public` or `--private`.

```bash
paperwork list --personal
paperwork list --public --owner j-smith
paperwork list --private --collection acme:reports
```

| Option | Description |
|---|---|
| `--personal` | Your own personal templates. Needs `login`. |
| `--public` | The public templates published by one owner. Needs `--owner`, and no sign-in. |
| `--owner <id>` | With `--public`: the owner's user id, the part of a template id before the colon. |
| `--private` | The templates published in a collection. Needs `--collection` and `login` as a member. |
| `--collection <id>` | With `--private`: the collection's id, for example `acme:reports`. |
| `--environment <name>` | `production` (default), `staging` or `dev`. |
| `--json` | Write a JSON array (`id`, `title`, `description`, `version`, `published`) instead of a table. |

Only published templates are listed, and the summary says how many unpublished ones were left out. The table goes to standard output and the heading and summary to standard error, so the table can be piped.

```text
Templates in the collection 'acme:reports' - Acme reports (production)
ID                 TITLE              VERSION  PUBLISHED
monthly-summary    Monthly summary    3.0      18 Sep 2026
quarterly-review   Quarterly review   1.0      28 Sep 2026

2 published. Use one with: paperwork generate --collection acme:reports --template <ID>
```

## Generating a personal or collection template

```bash
paperwork login

paperwork generate --template "myGithubUsername:my-report" --personal --output report.pdf

paperwork generate --collection "acme:reports" --template monthly-summary --output report.pdf
```
