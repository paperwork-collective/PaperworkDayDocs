---
layout: default
render_with_liquid: false
title: Choose the engine version
parent: Paperwork.Viewer
parent_url: /paperwork.view/
nav_order: 6
has_children: false
has_toc: false
description: "A published Paperwork template keeps running on the engine release it was published with. How to see it on another release with the engine parameter."
---
# Choose the engine version
{: .no_toc }

## What you'll do

See a published template made by a different release of the engine from the one it was published with.

## Before you start

The engine is the part of Paperwork that lays out and writes the document. A new release can change how a document is laid out. So that a template that worked keeps working:

- A template records the engine release it was published on.
- The Viewer makes its documents on that release. Each release's engine is kept for good, so a published template does not stop working when Paperwork is updated.
- Publishing the template again from a newer Designer moves it to the newer engine. The check-in dialog says so: "Publishing moves this template from Paperwork {old} to {new}. Published links use {old} until then."
- A template published before engines were recorded is made on the Viewer's current engine.
- The Designer always runs the latest engine, and tells you in the editor when a template was published on an older one. See [Publish and share](/paperwork.design/publishing.html#when-the-engine-is-newer).
- The [CLI](/paperwork.cli/) and [Paperwork.Core](/paperwork.core/) are not affected. They use the version you install.

You do not need to do anything for this to happen. You only need this page to compare a template on another release.

## Steps

**1. Add `engine` and a version to the link.**

```text
https://paperwork.vu/richard-prod/invoice-example?engine=9.9.0
```

The version is written as three or four numbers separated by dots, such as `9.9.0`.

## Check it worked

Open the browser console. The Viewer logs which engine it used, and whether it was asked for in the address or recorded by the template.

If that engine is not available, the Viewer uses its own and shows a note: "This template was published on Paperwork {version}, which isn't available here, so it was created with {the Viewer's version}."

## Next

- [Link to a document](/paperwork.view/links.html), for the other options you can add to a link.
- [Troubleshooting](/paperwork.view/troubleshooting.html).
