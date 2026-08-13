---
layout: default
title: data-passthrough
parent: HTML Attributes
parent_url: /reference/htmlattributes/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: false
has_toc: false
---

# @data-passthrough : Legacy attribute, superseded by allow
{: .no_toc }

`data-passthrough` is a boolean attribute on `<iframe>` retained for backward compatibility with templates written before the [`allow`](/reference/htmlattributes/attributes/attr_allow.html) attribute existed. It is marked `[Obsolete]` — new templates should use `allow` directly, which offers ten independent permission types instead of one all-or-nothing switch.

`data-passthrough` still works, but it is **not** equivalent to a single `allow` permission. Setting it sets **both** `data-passthrough` and `style-passthrough` in the underlying policy together, matching the original (pre-`allow`) behaviour where a single flag controlled both the parent's data and its styles:

```html
<!-- Equivalent to allow="data-passthrough any; style-passthrough any" -->
<iframe src="section.html" data-passthrough="true"></iframe>

<!-- Equivalent to allow="data-passthrough none; style-passthrough none" (the default) -->
<iframe src="section.html" data-passthrough="false"></iframe>
```

---

## Migration

If you're updating a template that uses `data-passthrough`, decide whether you actually want both permissions together or want to split them apart — `allow` lets you control each independently, which `data-passthrough` cannot:

| Old | New (equivalent) | New (split, recommended) |
|-----|-------------------|---------------------------|
| `<iframe src="a.html">` (default) | `<iframe src="a.html">` (unchanged) | — |
| `<iframe src="a.html" data-passthrough="true">` | `<iframe src="a.html" allow="data-passthrough any; style-passthrough any">` | Use just `allow="style-passthrough any"` if you only want styles, or just `allow="data-passthrough any"` if you only want data |
| `<iframe src="a.html" data-passthrough="false">` | `<iframe src="a.html">` (both already default to `none`) | — |

```html
<!-- Before -->
<iframe src="section.html" data-passthrough="true"></iframe>

<!-- After: explicit, and independently adjustable -->
<iframe src="section.html" allow="data-passthrough any; style-passthrough any"></iframe>
```

---

## See Also

- [allow attribute](/reference/htmlattributes/attributes/attr_allow.html) - Full content permissions policy reference
- [iframe and embed elements](/reference/htmltags/elements/html_iframe_embed_element.html) - Element reference
- [data-content attribute](/reference/htmlattributes/attributes/attr_data_content.html) - Dynamic content binding

---
