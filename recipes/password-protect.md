---
layout: default
render_with_liquid: false
title: Password-protect a PDF
parent: Recipes
parent_url: /recipes/
nav_order: 1
has_children: false
has_toc: false
description: "Make a Paperwork PDF that needs a password to open, from the command line or in .NET code."
---
# Password-protect a PDF
{: .no_toc }

## What you'll do

Make a PDF that asks for a password when someone opens it.

## Before you start

- The [Paperwork CLI](/paperwork.cli/) installed.
- A layout to make the PDF from. This recipe uses `statement.html` and `statement.json`: an account statement with a customer name and date as fields and the lines as data. They are in [Paperwork.Samples](https://github.com/paperwork-collective/Paperwork.Samples/tree/master/recipes/password-protect).

The layout, `statement.html`:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Account statement</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: Helvetica, Arial, sans-serif; font-size: 11pt; color: #1f2937; }
    h1 { font-size: 22pt; margin: 0 0 6pt 0; }
    .meta { color: #6b7280; margin-bottom: 18pt; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; border-bottom: 1.5pt solid #1f2937; padding: 6pt 4pt; }
    td { border-bottom: 0.5pt solid #d1d5db; padding: 6pt 4pt; }
    td.amount, th.amount { text-align: right; }
  </style>
</head>
<body>
  <h1>Account statement</h1>
  <p class="meta">{{$fields.customer}} &#8211; {{format(date($fields.statementDate), 'dd MMMM yyyy')}}</p>
  <table>
    <thead><tr><th>Description</th><th class="amount">Amount</th></tr></thead>
    <tbody>
      {{#each statement.lines}}
      <tr><td>{{this.description}}</td><td class="amount">{{format(this.amount, 'N2')}}</td></tr>
      {{/each}}
    </tbody>
  </table>
  <p><strong>Balance: {{format(sumOf(statement.lines, .amount), 'N2')}}</strong></p>
</body>
</html>
```

The data, `statement.json`:

```json
{
  "lines": [
    { "description": "Opening balance", "amount": 1200.00 },
    { "description": "Payment received", "amount": -450.00 },
    { "description": "Consulting, March", "amount": 980.50 }
  ]
}
```

## Steps

**1. Keep the password out of the command line.** Put it in an environment variable:

```bash
export STATEMENT_PASSWORD='your-password-here'
```

**2. Make the PDF with `--password-env`.** It names the variable that holds the password:

```bash
paperwork generate \
  --layout statement.html \
  --data statement=statement.json \
  --field customer="Acme Corp" \
  --field statementDate=2026-03-31 \
  --password-env STATEMENT_PASSWORD \
  --output statement.pdf
```

The CLI says `Encrypting with a password to open the document` and writes `statement.pdf`. To give the password on the command line instead, use `--password`. That leaves it in your shell history.

### In .NET code

With [Paperwork.Core](/paperwork.core/), call `WithUserPassword` on the builder:

```csharp
await factory.NewDocument()
             .WithLayoutFile("statement.html")
             .WithDataFile("statement", "statement.json")
             .WithField("customer", "Acme Corp")
             .WithField("statementDate", "2026-03-31")
             .WithUserPassword(password)
             .SaveAsync("statement.pdf");
```

## Check it worked

Open `statement.pdf` in a PDF reader. It asks for the password, and shows the statement once you give it. Without the password the reader does not open it.

## Notes

- The PDF needs the password to open.
- Keep the password somewhere your team can find it. Paperwork does not keep it, so a PDF made with a lost password cannot be opened.
- [Security and IT](/security/) says where documents are made and that a password is never sent to Paperwork.

## Next

- [Generate documents with the CLI](/paperwork.cli/generate.html), for every option.
- [Data and fields](/data-and-fields/), for how `--field` and `--data` work.
