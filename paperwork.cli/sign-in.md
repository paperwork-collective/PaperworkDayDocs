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

Sign in with GitHub, Microsoft or Google. You get the same account (the same user id) as signing in on the web with that provider.

```bash
paperwork login [--provider github|microsoft|google] [--environment production]
```

### GitHub (the default)

GitHub uses the device flow that `gh` and `gcloud` use, so it works on a machine with no browser, such as a headless server or a CI job.

1. The CLI prints a web address and a short code.
2. Open the address in any browser (it does not need to be on the same machine), enter the code and approve.
3. The CLI waits for the approval, then signs you in to Paperwork.

```text
To sign in with GitHub, open https://github.com/login/device in a browser
and enter the code: XXXX-XXXX

Waiting for authorization...
Signed in as uid <your-user-id> (production)
```

### Microsoft or Google

```bash
paperwork login --provider microsoft
paperwork login --provider google
```

These open a browser on the computer you run the command on, and the sign-in comes back to a listener on `http://localhost:9005/`. Port 9005 must be free. For a machine with no browser, use GitHub.

Use the provider you have signed in to Paperwork with before. If your email address already signs in another way, the CLI tells you to use that provider first.

The sign-in is remembered in `~/.paperwork/credentials.json`, one entry per environment, readable only by you. The short-lived access token is never stored. A fresh one is requested on every run.

| Option | Description |
|---|---|
| `--provider` | `github` (the default), `microsoft` or `google`. |
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
paperwork list --public --owner j-smith --portal paperwork.design
```

| Option | Description |
|---|---|
| `--personal` | Your own personal templates. Needs `login`. |
| `--public` | The public templates published by one owner. Needs `--owner`, and no sign-in. |
| `--owner <id>` | With `--public`: the owner's user id, the part of a template id before the colon. |
| `--private` | The templates published in a collection. Needs `--collection` and `login` as a member. |
| `--collection <id>` | With `--private`: the collection's id, for example `acme:reports`. |
| `--portal <host>` | The portal to list from, for example `paperwork.design`. It defaults to the main portal of the environment, the same one `generate` uses. |
| `--environment <name>` | `production` (default), `staging` or `dev`. |
| `--json` | Write a JSON array (`id`, `title`, `description`, `version`, `published`) instead of a table. |

Only published templates are listed, and `--public` lists only those published to the public library, not ones published for the owner's own use. Templates belong to a portal, so one published on one portal is not listed from another. Use `--portal` to list from a different one. The summary says how many unpublished ones were left out. The table goes to standard output and the heading and summary to standard error, so the table can be piped.

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
