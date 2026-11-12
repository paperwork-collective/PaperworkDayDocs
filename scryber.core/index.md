---
layout: default
title: Scryber.Core
nav_order: 6
has_children: false
has_toc: false
description: "Scryber.Core is the open-source engine that lays out HTML and CSS as PDF. It sits underneath Paperwork.Core, the command line and the viewer."
render_with_liquid: false
---
# Scryber.Core
{: .no_toc }

**The PDF engine.** Scryber.Core lays out HTML and CSS as PDF. It is open source under the LGPL, and it sits underneath Paperwork.Core, the command line and the Viewer.

This page is part of the [Paperwork.Core overview](/paperwork.core/), which covers when to use Scryber.Core and when to use Paperwork.Core.

## What it does

Give the engine an HTML template, some CSS and your data, and it writes a PDF: the page layout, text, tables, images, SVG, forms and fields, with `{{ }}` expressions to bind your data.

If you want to build documents from published templates, with the fluent builder, dependency injection and the rest of the Paperwork tools, use [Paperwork.Core](/paperwork.core/). If you want the engine itself, to lay out HTML and CSS as PDF in your own code, use Scryber.Core directly. It will continue to be maintained.

## Where to find it

- **Source and README**: [github.com/richard-scryber/scryber.core](https://github.com/richard-scryber/scryber.core){:target="_blank"}
- **Package**: [Scryber.Core on NuGet](https://www.nuget.org/packages/Scryber.Core){:target="_blank"}
- **The template language**: the [Reference](/paperwork.core/reference/) for HTML elements, CSS properties and expressions.
