---
layout: default
title: HTML Tags Support
parent: Quick Start
parent_url: /paperwork.core/quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 1
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# HTML Tags Support
{: .no_toc }

<style>
.main-content table td:first-child,
.main-content table th:first-child { min-width: 200px; }
</style>

A quick-reference chart showing which HTML elements are supported in Scryber templates, how they compare to standard HTML, and any PDF-specific differences.

**Support levels used in this chart:**

| Label | Meaning |
|-------|---------|
| **Supported** | Works as in standard HTML |
| **Partial** | Supported with PDF-specific differences — see Notes |
| **Scryber** | Scryber-specific extension not present in standard HTML |
| **No** | Not currently supported |

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

## Document Structure

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [HTML Root](/paperwork.core/reference/htmltags/elements/html_html_element) | `<html>` | **Supported** | Use `xmlns='http://www.w3.org/1999/xhtml'` for strict parsing |
| [Head](/paperwork.core/reference/htmltags/elements/html_head_element) | `<head>` | **Supported** | Holds metadata, linked styles, and title |
| [Body](/paperwork.core/reference/htmltags/elements/html_body_element) | `<body>` | **Supported** | Main content container |
| [Title](/paperwork.core/reference/htmltags/elements/html_head_element) | `<title>` | **Supported** | Sets the PDF document title |
| [Base Path](/paperwork.core/reference/htmltags/elements/html_head_element) | `<base>` | **Supported** | Sets root path for relative resource URLs |
| [Meta](/paperwork.core/reference/htmltags/elements/html_meta_element) | `<meta>` | **Supported** | Document info, security settings |
| [Link](/paperwork.core/reference/htmltags/elements/html_link_element) | `<link>` | **Supported** | External stylesheet references |
| [Style](/paperwork.core/reference/htmltags/elements/html_style_element) | `<style>` | **Supported** | Inline CSS; higher priority than linked sheets |
| [Frameset](/paperwork.core/reference/htmltags/elements/html_frameset_frame_element) | `<frameset>` | **Supported** | Replaces `<body>`; used for merging/trimming existing PDFs |
| [Frame](/paperwork.core/reference/htmltags/elements/html_frameset_frame_element) | `<frame>` | **Supported** | References pages from an existing PDF document |

---

## Content Sectioning

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Section](/paperwork.core/reference/htmltags/elements/html_section_element) | `<section>` | **Supported** | Starts on a new page by default (`page-break-before: always`) - set `page-break-before: auto` to flow with the content |
| [Header](/paperwork.core/reference/htmltags/elements/html_header_footer_element) | `<header>` | **Supported** | Repeats on first page (and all pages unless continuation header defined) |
| [Footer](/paperwork.core/reference/htmltags/elements/html_header_footer_element) | `<footer>` | **Supported** | Repeats on first page (and all pages unless continuation footer defined) |
| [Continuation Header](/paperwork.core/reference/htmltags/elements/html_continuation-header_element) | `<continuation-header>` | **Scryber** | Header shown on every page *except* the first |
| [Continuation Footer](/paperwork.core/reference/htmltags/elements/html_continuation-footer_element) | `<continuation-footer>` | **Scryber** | Footer shown on every page *except* the first |
| [Article](/paperwork.core/reference/htmltags/elements/html_article_element) | `<article>` | **Supported** | Treated as a block container |
| [Aside](/paperwork.core/reference/htmltags/elements/html_aside_element) | `<aside>` | **Supported** | Treated as a block container |
| [Nav](/paperwork.core/reference/htmltags/elements/html_nav_element) | `<nav>` | **Supported** | Treated as a block container |
| [Main](/paperwork.core/reference/htmltags/elements/html_main_element) | `<main>` | **Supported** | Treated as a block container |

---

## Content Embedding

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [iFrame](/paperwork.core/reference/htmltags/elements/html_iframe_embed_element) | `<iframe>` | **Supported** | Includes external referenced or bound content with control over supported types and styles |
| [Embed](/paperwork.core/reference/htmltags/elements/html_iframe_embed_element) | `<embed>` | **Supported** | Directly includes external or dynamic content, great for injecting your own snippets or sources. |
| [Object](/paperwork.core/reference/htmltags/elements/html_object_element) | `<object>` | **Supported** | Attaches external files within the template; linkable via anchor |

## Block Content

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Div](/paperwork.core/reference/htmltags/elements/html_div_element) | `<div>` | **Supported** | Standard block container |
| [Paragraph](/paperwork.core/reference/htmltags/elements/html_p_element) | `<p>` | **Supported** | |
| [Headings](/paperwork.core/reference/htmltags/elements/html_headings_element) | `<h1>` – `<h6>` | **Supported** | |
| [Horizontal Rule](/paperwork.core/reference/htmltags/elements/html_hr_element) | `<hr>` | **Supported** | |
| [Block Quote](/paperwork.core/reference/htmltags/elements/html_blockquote_element) | `<blockquote>` | **Supported** | |
| [Pre-formatted](/paperwork.core/reference/htmltags/elements/html_pre_element) | `<pre>` | **Supported** | Whitespace and line breaks preserved |
| [Address](/paperwork.core/reference/htmltags/elements/html_address_element) | `<address>` | **Supported** | |
| [Figure](/paperwork.core/reference/htmltags/elements/html_figure_element) | `<figure>` | **Supported** | |
| [Figure Caption](/paperwork.core/reference/htmltags/elements/html_figure_element) | `<figcaption>` | **Supported** | |
| [Details](/paperwork.core/reference/htmltags/elements/html_details_summary_element) | `<details>` | **Partial** | PDF always renders as expanded (open state) |
| [Summary](/paperwork.core/reference/htmltags/elements/html_details_summary_element) | `<summary>` | **Partial** | Rendered as a heading; toggle behaviour not applicable in PDF |
| [Fieldset](/paperwork.core/reference/htmltags/elements/html_fieldset_legend_element) | `<fieldset>` | **Supported** | |
| [Legend](/paperwork.core/reference/htmltags/elements/html_fieldset_legend_element) | `<legend>` | **Supported** | |

---

## Inline & Text Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Span](/paperwork.core/reference/htmltags/elements/html_span_element) | `<span>` | **Supported** | Inline container |
| [Anchor](/paperwork.core/reference/htmltags/elements/html_a_element) | `<a>` | **Supported** | Internal document links and external URLs |
| [Line Break](/paperwork.core/reference/htmltags/elements/html_br_element) | `<br>` | **Supported** | |
| [Bold](/paperwork.core/reference/htmltags/elements/html_strong_em_element) | `<b>` | **Supported** | |
| [Italic](/paperwork.core/reference/htmltags/elements/html_strong_em_element) | `<i>` | **Supported** | |
| [Strong](/paperwork.core/reference/htmltags/elements/html_strong_em_element) | `<strong>` | **Supported** | |
| [Emphasised](/paperwork.core/reference/htmltags/elements/html_strong_em_element) | `<em>` | **Supported** | |
| [Underline](/paperwork.core/reference/htmltags/elements/html_del_ins_u_s_element) | `<u>` | **Supported** | |
| [Strikethrough](/paperwork.core/reference/htmltags/elements/html_del_ins_u_s_element) | `<s>` / `<strike>` | **Supported** | |
| [Deleted](/paperwork.core/reference/htmltags/elements/html_del_ins_u_s_element) | `<del>` | **Supported** | |
| [Inserted](/paperwork.core/reference/htmltags/elements/html_del_ins_u_s_element) | `<ins>` | **Supported** | |
| [Mark](/paperwork.core/reference/htmltags/elements/html_mark_sub_sup_elements) | `<mark>` | **Supported** | Highlighted text |
| [Subscript](/paperwork.core/reference/htmltags/elements/html_mark_sub_sup_elements) | `<sub>` | **Supported** | |
| [Superscript](/paperwork.core/reference/htmltags/elements/html_mark_sub_sup_elements) | `<sup>` | **Supported** | |
| [Small](/paperwork.core/reference/htmltags/elements/html_mark_sub_sup_elements) | `<small>` | **Supported** | Renders at 70% font size |
| [Big](/paperwork.core/reference/htmltags/elements/html_big_element) | `<big>` | **Supported** | Renders at 120% font size |
| [Code](/paperwork.core/reference/htmltags/elements/html_code_kbd_samp_elements) | `<code>` | **Supported** | Monospace font |
| [Keyboard](/paperwork.core/reference/htmltags/elements/html_code_kbd_samp_elements) | `<kbd>` | **Supported** | |
| [Sample](/paperwork.core/reference/htmltags/elements/html_code_kbd_samp_elements) | `<samp>` | **Supported** | |
| [Abbreviation](/paperwork.core/reference/htmltags/elements/html_abbr_element) | `<abbr>` | **Supported** | |
| [Citation](/paperwork.core/reference/htmltags/elements/html_cite_defn_q_elements) | `<cite>` | **Supported** | |
| [Definition](/paperwork.core/reference/htmltags/elements/html_cite_defn_q_elements) | `<dfn>` | **Supported** | |
| [Quoted Span](/paperwork.core/reference/htmltags/elements/html_cite_defn_q_elements) | `<q>` | **Supported** | |
| [Label](/paperwork.core/reference/htmltags/elements/html_label_element) | `<label>` | **Supported** | |
| [Output](/paperwork.core/reference/htmltags/elements/html_output_slot_num_elements) | `<output>` | **Supported** | Displays a calculated value |
| [Variable](/paperwork.core/reference/htmltags/elements/html_var_element) | `<var>` | **Supported** | Store, calculate, and display values during processing |
| [Font (legacy)](/paperwork.core/reference/htmltags/elements/html_font_element) | `<font>` | **Supported** | Legacy attribute-based styling |
| [Time](/paperwork.core/reference/htmltags/elements/html_time_element) | `<time>` | **Supported** | Outputs a date/time value in a specific format |

---

## Lists

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Unordered List](/paperwork.core/reference/htmltags/elements/html_ul_element) | `<ul>` | **Supported** | |
| [Ordered List](/paperwork.core/reference/htmltags/elements/html_ol_element) | `<ol>` | **Supported** | |
| [List Item](/paperwork.core/reference/htmltags/elements/html_li_element) | `<li>` | **Supported** | Supports `-pdf-li-*` properties for custom markers |
| [Menu List](/paperwork.core/reference/htmltags/elements/html_menu_element) | `<menu>` | **Supported** | |
| [Definition List](/paperwork.core/reference/htmltags/elements/html_dl_dt_dd_elements) | `<dl>` | **Supported** | |
| [Definition Term](/paperwork.core/reference/htmltags/elements/html_dl_dt_dd_elements) | `<dt>` | **Supported** | |
| [Definition Item](/paperwork.core/reference/htmltags/elements/html_dl_dt_dd_elements) | `<dd>` | **Supported** | |

---

## Tables

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Table](/paperwork.core/reference/htmltags/elements/html_table_element) | `<table>` | **Supported** | |
| [Table Header Group](/paperwork.core/reference/htmltags/elements/html_table_element) | `<thead>` | **Supported** | Repeats across columns and pages by default |
| [Table Body](/paperwork.core/reference/htmltags/elements/html_table_element) | `<tbody>` | **Supported** | |
| [Table Footer Group](/paperwork.core/reference/htmltags/elements/html_table_element) | `<tfoot>` | **Supported** | |
| [Table Row](/paperwork.core/reference/htmltags/elements/html_tr_element) | `<tr>` | **Supported** | |
| [Table Cell](/paperwork.core/reference/htmltags/elements/html_td_element) | `<td>` | **Supported** | `rowspan` across multiple rows with overflow supported from v9.3 |
| [Table Header Cell](/paperwork.core/reference/htmltags/elements/html_td_element) | `<th>` | **Supported** | |

---

## Media & Graphics

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Image](/paperwork.core/reference/htmltags/elements/html_img_element) | `<img>` | **Supported** | JPEG, PNG, GIF, BMP, SVG, WEBP; `srcset` supported |
| [Picture](/paperwork.core/reference/htmltags/elements/html_picture_element) | `<picture>` | **Supported** | |
| [Source](/paperwork.core/reference/htmltags/elements/html_picture_element) | `<source>` | **Supported** | Media-query-based image source selection |
| [Figure](/paperwork.core/reference/htmltags/elements/html_figure_element) | `<figure>` | **Supported** | |
| [Meter](/paperwork.core/reference/htmltags/elements/html_meter_element) | `<meter>` | **Supported** | Renders a scalar value within a range |
| [Progress](/paperwork.core/reference/htmltags/elements/html_progress_element) | `<progress>` | **Supported** | Renders a progress bar |
| [SVG Drawing](/paperwork.core/reference/svgelements/) | `<svg>` | **Supported** | Inline, embedded, or referenced; see SVG chart |


---

## Dynamic Content

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Template](/paperwork.core/reference/htmltags/elements/html_template_element) | `<template>` | **Supported** | Repeats inner content based on bound data |
| [If](/paperwork.core/reference/htmltags/elements/html_if_element) | `<if>` | **Scryber** | Conditionally renders content when `data-test` is true |
| [Page Number](/paperwork.core/reference/htmltags/elements/html_pagenumber_element) | `<page>` | **Scryber** | Outputs current or referenced page number |
| [Number](/paperwork.core/reference/htmltags/elements/html_output_slot_num_elements) | `<num>` | **Scryber** | Outputs a numeric value in a specific display format |
| [Slot](/paperwork.core/reference/htmltags/elements/html_output_slot_num_elements) | `<slot>` | **Scryber** | Content placeholder |

---

## Not Supported

Standard HTML elements that are not currently supported. Any unknown element is silently skipped (or raises an error in strict conformance mode).

| Element | Tag | Notes |
|---------|-----|-------|
| Form | `<form>` | Expected v10.0 |
| Input | `<input>` | Expected v10.0 |
| Select | `<select>` | Expected v10.0 |
| Button | `<button>` | Expected v10.0 |
| Textarea | `<textarea>` | Expected v10.0 |
| Canvas | `<canvas>` | PDF has no raster drawing surface |
| Video | `<video>` | Expected v10.5 |
| Audio | `<audio>` | Expected v10.5 |
| Dialog | `<dialog>` | — |
| Map / Area | `<map>` / `<area>` | — |

---

## See Also

- [HTML Elements Reference](/paperwork.core/reference/htmltags/)
- [CSS Styles Support](/paperwork.core/quickstart/feature_css_styles)
- [SVG Drawing Support](/paperwork.core/quickstart/feature_svg)
- [Binding Expressions Support](/paperwork.core/quickstart/feature_binding)
