---
layout: default
render_with_liquid: false
title: Overview
nav_exclude: true
has_children: false
has_toc: false
---

# How it all fits together
{: .no_toc }

Paperwork turns a template and some data into a document. You design the template once, publish it, and then the same template can be used by people in a browser, by your own code, by scripts and automation, and by your AI. Nothing is copied: everyone uses the one source.

## The ecosystem

| Step | Solution | What it does |
|---|---|---|
| **Design** | [Template Designer](/paperwork.design/) | Import or create a template, edit it visually or in code, add fields, data and assets, and preview the document as you go. |
| **Publish** | [Template Designer](/paperwork.design/publishing.html) | Check in a version and publish it publicly, just for you, or privately to a collection. It gets an id that every other solution uses. |
| **View** | [Online Viewer](/paperwork.view/) | Open a published template, or your own content, in the browser. Embed it in a site or link directly, so end users can view, fill in and download. |
| **Code** | [Core Library](/paperwork.core/) | Generate documents inside your own .NET applications, from a template configuration and your own data, with the fluent builder. |
| **Automate** | [Command Line](/paperwork.cli/) | Build documents from published templates or your own files, straight from the command line, in scripts, pipelines and hooks. |
| **Delegate** | [AI Skills](/paperwork.skill/) | Let your AI find your templates, fill in fields, generate documents and design new templates for you, while you stay in control. |

All of them read the same template language, which is documented in the [Reference](/paperwork.core/reference/): HTML for the structure, CSS for the style, and `{{ }}` expressions to bind data.

## A template is one file

Everything about a template, its layouts, styles, data, fields and meta data, is held together in a single JSON file: the [template configuration](/paperwork.core/template-config/). When you publish from the Designer, that is what is stored, and what the viewer, the library and the command line read.

That makes a template portable, which gives you two ways to work.

## Two ways to use a template

### Published

Publish the template, then use its id, from anywhere:

```bash
paperwork generate --template your-name:invoice --output invoice.pdf
```

```html
<div data-pw-container="invoice" data-pw-template="your-name:invoice"></div>
```

When you publish a new version, everything that uses the id has it straight away, with nothing to rebuild or redeploy. It is the best fit when the template changes more often than your code.

### Exported

If you would rather keep the template with your application, export it from the Designer as a file, and use that directly. There is no dependency on Paperwork being available when the document is made.

```csharp
using var config = File.OpenRead("invoice-template.json");

await factory.FromConfig(config)
    .WithData("model", invoice)
    .SaveAsync("invoice.pdf");
```

```bash
paperwork generate --config invoice-template.json --data model=invoice.json --output invoice.pdf
```

It is the best fit when the template should be versioned and released with your code.

## Using it by hand

You do not need the Designer to begin. The library and the command line both take plain HTML and CSS, with your data, and write a PDF:

```bash
paperwork generate --layout invoice.html --style invoice.css --data model=invoice.json --output invoice.pdf
```

You can move between these as a project grows: start with a file, bring it into the Designer to share and refine it, then publish it or export it again.

## Where to go next

- **See it work**: the [Library Quick Start](/paperwork.core/quickstart/quickstart_core) and the [Online Viewer](/paperwork.view/).
- **Design a template**: the [Template Designer](/paperwork.design/).
- **Understand the file**: [Template Configuration](/paperwork.core/template-config/).
- **Look something up**: the [Reference](/paperwork.core/reference/) for HTML, CSS and expressions.
