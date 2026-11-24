---
layout: default
title: Package Change Log
nav_order: 5
has_toc: false
parent: Paperwork.Core
parent_url: /paperwork.core/
render_with_liquid: false
---


# Package Change Log
{: .no_toc}

What changed in the `Paperwork.Core`, `Paperwork.Core.Extensions` and `Paperwork.CLI`
packages. The rendering engine underneath them has its own
[change log](scryber_core.html), and a breaking change there changes how your
documents come out even when nothing in this log did.

This log starts at 9.11.0. Earlier releases are listed on NuGet.

---

<details class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---


## Version 9

### 9.11.0 - 24 November 2026

The three packages share the engine's version number, so all of them move to
9.11.0 together. The engine moves with them: see the
[engine change log](scryber_core.html) for its breaking changes to list indents
and to svg images sized with a percentage.

#### Paperwork.Core

**New**

- **Form data in the document** - a template can attach the field values a
  document was made from, as an embedded file in the PDF's own catalog. Nothing
  is drawn on any page, but the file is listed in a reader's attachments panel:
  there is no flag in the format that would hide a name-tree entry, and we would
  not want one. The answers travel with the document, and anyone holding it can
  see what is there and take it out.

  It is off unless asked for. Set `formData` in the template's configuration, or
  call `WithFormData()` on the builder. Nothing is attached to a document whose
  template does not ask for it, so upgrading changes nothing about what your
  existing application produces.

  Only the fields someone filling in the form can change are attached.
  `$fields` holds every field in the published template, the designer's own
  included, with values baked in at publish - an internal rate, a reference, a
  threshold - so `TemplateFormData.Fields` is `"filled"` by default and lets
  through only a field whose `modify` includes `Viewer` or `Query`. A template
  where nothing is the person's to fill in attaches nothing at all. A document
  built in code keeps `"all"`, because there is no form and every value is the
  caller's own.

  The payload also records the document's own title - `doc.Info.Title`, from the
  template's `<title>`, after binding. Templates routinely bind something
  distinguishing into it, which is what tells two documents made from the same
  template apart once they come back as files.

**Fixes**

- **`AddPaperwork` no longer makes the auth wrapper depend on itself** - the
  wrapper was registered by type, so the container built it with its
  `IEnumerable<IPaperworkAuthService>` constructor, which included the wrapper.
  Building the provider with `ValidateOnBuild`, or resolving
  `IPaperworkAuthService`, threw a circular-dependency error
  ([#1](https://github.com/paperwork-collective/Paperwork.Core/issues/1)).

#### Paperwork.Core.Extensions

- Moves to 9.11.0 with `Paperwork.Core`. No changes of its own.

#### Paperwork.CLI

- **`list --portal <host>`** - the portal whose templates to list, e.g.
  `--portal paperwork.design`. It defaults to the environment's main portal, the
  same default `generate` uses. `list` had been listing across every portal
  while the Designer showed one, so the two disagreed about what existed.
- **`list --public` asks by publish scope** - a template published for your own
  use alone is no longer listed as public. Only one published to the public
  library is.
- **The CLI's version is the engine's version.** Moving from 9.9.1 to 9.11.0
  changes how your documents render, because the engine changed underneath it.
  Retest your templates after upgrading rather than treating it as a routine
  tool update.
