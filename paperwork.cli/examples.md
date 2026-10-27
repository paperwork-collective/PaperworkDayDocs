---
layout: default
render_with_liquid: false
title: Examples
parent: Paperwork.CLI
parent_url: /paperwork.cli/
nav_order: 5
has_children: false
has_toc: false
---
# Examples
{: .no_toc }

## HTML to PDF

```bash
paperwork generate --layout invoice.html --output invoice.pdf
```

## Add CSS

```bash
paperwork generate \
  --layout invoice.html \
  --style base.css \
  --style print.css \
  --output invoice.pdf
```

## Bind JSON data

Given `order.json`:

```json
{ "customerName": "Acme Corp", "total": 1200.00 }
```

and `invoice.html`:

```html
<html><body>
  <p>{{order.customerName}}</p>
  <p>{{format(order.total, 'C2')}}</p>
</body></html>
```

```bash
paperwork generate --layout invoice.html --data order=order.json --output invoice.pdf
```

Use one `--data` for each data source:

```bash
paperwork generate \
  --layout dashboard.html \
  --data summary=summary.json \
  --data lineItems=items.json \
  --data chart=chart-data.json \
  --output dashboard.pdf
```

## Fields for single values

```html
<h1>{{$fields["title"]}}</h1>
<p>{{$fields["date"]}}</p>
```

```bash
paperwork generate \
  --layout report.html \
  --field title="Q1 Sales Report" \
  --field date=2026-03-25 \
  --output report.pdf
```

## From a published template

```bash
paperwork generate --template 929mMaxCcf5Nr3UT1DZg --output report.pdf
```

Replace one of its data sources, or set its fields, for this run:

```bash
paperwork generate --template myInvoiceId \
  --data customer=local-customer.json \
  --field date=2026-05-27 \
  --field title="May Invoice" \
  --output invoice.pdf
```

## A personal template

```bash
paperwork login
paperwork generate --template "myGithubUsername:my-report" --personal --output report.pdf
```

The sign-in is remembered per environment, so you only need to run `login` again if it is revoked.

## A template in a collection

```bash
paperwork list --private --collection acme:reports
paperwork generate --collection acme:reports --template monthly-summary --output report.pdf
```

## Test against staging

```bash
paperwork generate --template myInvoiceId --environment staging --output test.pdf
```

## From a config file

```bash
paperwork generate --config monthly-report.json --output report.pdf
```

Use the production config with local test data and different field values:

```bash
paperwork generate --config report.json \
  --data customer=test-customer.json \
  --field period="March 2026" \
  --field author="Jane Smith" \
  --output march-report.pdf
```

## Validate first

```bash
paperwork validate monthly-report.json && \
  paperwork generate --config monthly-report.json --output report.pdf
```

## Pipe the output

Leave out `--output` and the PDF bytes go to standard output, with all messages on standard error.

```bash
# upload straight to S3
paperwork generate --layout report.html | aws s3 cp - s3://my-bucket/reports/report.pdf

# save with a date in the name
paperwork generate --layout report.html > "report-$(date +%Y%m%d).pdf"
```

## Skip remote content

For a document that uses no assets, maps or remote sources, `--sync` renders synchronously:

```bash
paperwork generate --config simple-report.json --sync --output report.pdf
```
