---
layout: default
title: allow
parent: HTML Attributes
parent_url: /reference/htmlattributes/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# @allow : The Content Permissions Attribute
{: .no_toc }

The `allow` attribute controls what an `<iframe>` is permitted to bring in from its embedded content, and what it is permitted to receive from its parent document. It supersedes the older `data-passthrough` boolean (still available for backward compatibility — see the [migration note](/reference/htmlattributes/attributes/attr_data_passthrough.html)) with a single, extensible policy string covering ten independent permission types.

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

## Usage

`allow` is supported on `<iframe>` only (`<embed>` has no isolation model — see [iframe vs embed](#iframe-vs-embed)). Its value is a semicolon-separated list of `type value` pairs:

```html
<iframe src="content.html"
        allow="inner-images any; inner-navigation any; outer-html any"></iframe>
```

Each permission type is independent, so you only need to specify the types you want to change from their default:

```html
<!-- Only change outer-html; everything else keeps its default -->
<iframe src="report.html" allow="outer-html any"></iframe>
```

If `allow` is omitted entirely, `<iframe>` falls back to its built-in default policy:

```
inline-styles any; inner-images any; inner-navigation any
```

Every other permission type defaults to `none` (denied) unless explicitly allowed.

---

## Value Grammar

Each entry in the policy string has the form `type-key value`:

| Value | Meaning |
|-------|---------|
| `any` | The permission is allowed. |
| `self` | The permission is allowed. Currently equivalent to `any` — reserved for future origin-scoped checks. |
| `none` | The permission is denied (default for any type not listed). |

```html
<!-- Equivalent: both allow inner images -->
<iframe src="a.html" allow="inner-images any"></iframe>
<iframe src="a.html" allow="inner-images self"></iframe>

<!-- Explicitly deny (same as omitting the type) -->
<iframe src="a.html" allow="inner-images none"></iframe>
```

Unrecognised type keys are ignored; unrecognised values are treated as denied.

---

## Permission Types

| Type key | Governs | Default |
|----------|---------|---------|
| `data-passthrough` | Whether the parent's current data-binding stack (params/model) is visible to the embedded content. | `none` |
| `style-passthrough` | Whether the parent document's CSS styles apply to the embedded content's elements. | `none` |
| `inner-style` | Whether `<style>` blocks *inside* the embedded content are kept and applied. | `none` |
| `inner-link` | Whether `<link rel="stylesheet">` elements inside the embedded content are kept and their CSS loaded. | `none` |
| `inner-navigation` | Whether `<a href="...">` links inside the embedded content keep their target (denied strips the `href`). | `any` |
| `inner-images` | Whether `<img>` elements inside the embedded content are kept. | `any` |
| `outer-html` | Whether a full `<html>`/`<head>`/`<body>` document is wrapped and kept as-is, or reduced to just its body content. See [Outer HTML Handling](#outer-html-handling). | `none` |
| `inline-styles` | Whether `style="..."` attributes on elements inside the embedded content are kept. | `any` |
| `inner-frames` | Whether nested `<iframe>`, `<embed>`, or `<object>` elements inside the embedded content are kept. | `none` |
| `inner-forms` | Whether `<form>`, `<input>`, `<select>`, `<button>` elements inside the embedded content are kept. | `none` |

**Note the naming**: `inner-style` (singular concept: the `<style>` tag itself) and `inline-styles` (the `style="..."` attribute) are separate permissions with different defaults — `inline-styles` is allowed by default, `inner-style` is not.

---

## Outer HTML Handling

`outer-html` changes *how* a full document is embedded, not just whether it's included:

**`outer-html none` (default)** — the embedded `<html>`/`<body>` is unwrapped and its body content is placed inside an internal `<article>` container. No `id`, `class`, or root-level styling from the embedded document's `<html>`/`<body>` tags carries over — only the body's children.

**`outer-html any`** — the embedded document's `<html>` and `<body>` elements are preserved as their own container (with `class`/`id` intact), so selectors that target the embedded document's own root elements continue to work, and any allowed `<style>`/`<link>` content from its `<head>` is retained.

```html
<!-- Default: body content only, wrapped in an internal article -->
<iframe src="fragment.html"></iframe>

<!-- Full document structure preserved -->
<iframe src="full-page.html" allow="outer-html any"></iframe>
```

This applies identically whether the content comes from `src` or from a bound [`data-content`](/reference/htmlattributes/attributes/attr_data_content.html) value — both loading paths run through the same content-cleaning pipeline.

---

## Examples

### Deny everything except what's needed for a themed section

```html
<iframe src="sections/summary.html"
        allow="style-passthrough any; inner-images any"></iframe>
```

### Fully open (trusted internal content)

```html
<iframe src="internal/full-report.html"
        allow="data-passthrough any; style-passthrough any; inner-style any;
               inner-link any; inner-navigation any; inner-images any;
               outer-html any; inline-styles any; inner-frames any; inner-forms any">
</iframe>
```

### Strip navigation from untrusted content

```html
<!-- Links inside third-party.html will have their href blanked -->
<iframe src="third-party.html" allow="inner-navigation none"></iframe>
```

### Pass data through to a bound fragment

{% raw %}
```html
<!-- Model: { customer: { name: "Acme Corp" } } -->
<iframe data-content="<div>Hello {{model.customer.name}}</div>"
        allow="data-passthrough any"></iframe>
```
{% endraw %}

Without `data-passthrough any`, the parent's data stack (including `model`) is cleared before the embedded content data-binds, so `{{model.customer.name}}` would resolve to nothing.

---

## iframe vs embed

**`<iframe>`**:
- Supports `allow` with the full ten-type policy described above
- Default policy applies when `allow` is omitted

**`<embed>`**:
- Does **not** support `allow`
- Always inherits parent styles and data
- No content cleaning — images, links, navigation, nested frames, forms, and inline styles are all kept as-is
- Use `<iframe>` instead when you need any isolation

---

## See Also

- [iframe and embed elements](/reference/htmltags/elements/html_iframe_embed_element.html) - Full element reference
- [data-content attribute](/reference/htmlattributes/attributes/attr_data_content.html) - Dynamic content binding
- [data-passthrough (migration note)](/reference/htmlattributes/attributes/attr_data_passthrough.html) - Migrating from the old boolean attribute
- [Data Binding](/reference/binding/) - Data binding and expressions

---
