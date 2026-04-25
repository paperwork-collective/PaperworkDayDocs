---
layout: default
title: HTML Tags Support
parent: Quick Start
parent_url: /quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 1
---

# HTML Tags Support
{: .no_toc }

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
| [HTML Root](/reference/htmltags/elements/html_html_element) | `<html>` | **Supported** | Use `xmlns='http://www.w3.org/1999/xhtml'` for strict parsing |
| [Head](/reference/htmltags/elements/html_head_element) | `<head>` | **Supported** | Holds metadata, linked styles, and title |
| [Body](/reference/htmltags/elements/html_body_element) | `<body>` | **Supported** | Main content container |
| [Title](/reference/htmltags/elements/html_head_element) | `<title>` | **Supported** | Sets the PDF document title |
| [Base Path](/reference/htmltags/elements/html_head_element) | `<base>` | **Supported** | Sets root path for relative resource URLs |
| [Meta](/reference/htmltags/elements/html_meta_element) | `<meta>` | **Supported** | Document info, security settings |
| [Link](/reference/htmltags/elements/html_link_element) | `<link>` | **Supported** | External stylesheet references |
| [Style](/reference/htmltags/elements/html_style_element) | `<style>` | **Supported** | Inline CSS; higher priority than linked sheets |
| [Frameset](/reference/htmltags/elements/html_frameset_frame_element) | `<frameset>` | **Supported** | Replaces `<body>`; used for merging/trimming existing PDFs |
| [Frame](/reference/htmltags/elements/html_frameset_frame_element) | `<frame>` | **Supported** | References pages from an existing PDF document |

---

## Content Sectioning

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Section](/reference/htmltags/elements/html_section_element) | `<section>` | **Partial** | Each `<section>` starts on a new page by default |
| [Header](/reference/htmltags/elements/html_header_footer_element) | `<header>` | **Supported** | Repeats on first page (and all pages unless continuation header defined) |
| [Footer](/reference/htmltags/elements/html_header_footer_element) | `<footer>` | **Supported** | Repeats on first page (and all pages unless continuation footer defined) |
| [Continuation Header](/reference/htmltags/elements/html_continuation-header_element) | `<continuation-header>` | **Scryber** | Header shown on every page *except* the first |
| [Continuation Footer](/reference/htmltags/elements/html_continuation-footer_element) | `<continuation-footer>` | **Scryber** | Footer shown on every page *except* the first |
| [Article](/reference/htmltags/elements/html_article_element) | `<article>` | **Supported** | Treated as a block container |
| [Aside](/reference/htmltags/elements/html_aside_element) | `<aside>` | **Supported** | Treated as a block container |
| [Nav](/reference/htmltags/elements/html_nav_element) | `<nav>` | **Supported** | Treated as a block container |
| [Main](/reference/htmltags/elements/html_main_element) | `<main>` | **Supported** | Treated as a block container |

---

## Block Content

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Div](/reference/htmltags/elements/html_div_element) | `<div>` | **Supported** | Standard block container |
| [Paragraph](/reference/htmltags/elements/html_p_element) | `<p>` | **Supported** | |
| [Headings](/reference/htmltags/elements/html_headings_element) | `<h1>` – `<h6>` | **Supported** | |
| [Horizontal Rule](/reference/htmltags/elements/html_hr_element) | `<hr>` | **Supported** | |
| [Block Quote](/reference/htmltags/elements/html_blockquote_element) | `<blockquote>` | **Supported** | |
| [Pre-formatted](/reference/htmltags/elements/html_pre_element) | `<pre>` | **Supported** | Whitespace and line breaks preserved |
| [Address](/reference/htmltags/elements/html_address_element) | `<address>` | **Supported** | |
| [Figure](/reference/htmltags/elements/html_figure_element) | `<figure>` | **Supported** | |
| [Figure Caption](/reference/htmltags/elements/html_figure_element) | `<figcaption>` | **Supported** | |
| [Details](/reference/htmltags/elements/html_details_summary_element) | `<details>` | **Partial** | PDF always renders as expanded (open state) |
| [Summary](/reference/htmltags/elements/html_details_summary_element) | `<summary>` | **Partial** | Rendered as a heading; toggle behaviour not applicable in PDF |
| [Fieldset](/reference/htmltags/elements/html_fieldset_legend_element) | `<fieldset>` | **Supported** | |
| [Legend](/reference/htmltags/elements/html_fieldset_legend_element) | `<legend>` | **Supported** | |

---

## Inline & Text Elements

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Span](/reference/htmltags/elements/html_span_element) | `<span>` | **Supported** | Inline container |
| [Anchor](/reference/htmltags/elements/html_a_element) | `<a>` | **Supported** | Internal document links and external URLs |
| [Line Break](/reference/htmltags/elements/html_br_element) | `<br>` | **Supported** | |
| [Bold](/reference/htmltags/elements/html_strong_em_element) | `<b>` | **Supported** | |
| [Italic](/reference/htmltags/elements/html_strong_em_element) | `<i>` | **Supported** | |
| [Strong](/reference/htmltags/elements/html_strong_em_element) | `<strong>` | **Supported** | |
| [Emphasised](/reference/htmltags/elements/html_strong_em_element) | `<em>` | **Supported** | |
| [Underline](/reference/htmltags/elements/html_del_ins_u_s_element) | `<u>` | **Supported** | |
| [Strikethrough](/reference/htmltags/elements/html_del_ins_u_s_element) | `<s>` / `<strike>` | **Supported** | |
| [Deleted](/reference/htmltags/elements/html_del_ins_u_s_element) | `<del>` | **Supported** | |
| [Inserted](/reference/htmltags/elements/html_del_ins_u_s_element) | `<ins>` | **Supported** | |
| [Mark](/reference/htmltags/elements/html_mark_sub_sup_elements) | `<mark>` | **Supported** | Highlighted text |
| [Subscript](/reference/htmltags/elements/html_mark_sub_sup_elements) | `<sub>` | **Supported** | |
| [Superscript](/reference/htmltags/elements/html_mark_sub_sup_elements) | `<sup>` | **Supported** | |
| [Small](/reference/htmltags/elements/html_mark_sub_sup_elements) | `<small>` | **Supported** | Renders at 70% font size |
| [Big](/reference/htmltags/elements/html_big_element) | `<big>` | **Supported** | Renders at 120% font size |
| [Code](/reference/htmltags/elements/html_code_kbd_samp_elements) | `<code>` | **Supported** | Monospace font |
| [Keyboard](/reference/htmltags/elements/html_code_kbd_samp_elements) | `<kbd>` | **Supported** | |
| [Sample](/reference/htmltags/elements/html_code_kbd_samp_elements) | `<samp>` | **Supported** | |
| [Abbreviation](/reference/htmltags/elements/html_abbr_element) | `<abbr>` | **Supported** | |
| [Citation](/reference/htmltags/elements/html_cite_defn_q_elements) | `<cite>` | **Supported** | |
| [Definition](/reference/htmltags/elements/html_cite_defn_q_elements) | `<dfn>` | **Supported** | |
| [Quoted Span](/reference/htmltags/elements/html_cite_defn_q_elements) | `<q>` | **Supported** | |
| [Label](/reference/htmltags/elements/html_label_element) | `<label>` | **Supported** | |
| [Output](/reference/htmltags/elements/html_output_slot_num_elements) | `<output>` | **Supported** | Displays a calculated value |
| [Variable](/reference/htmltags/elements/html_var_element) | `<var>` | **Supported** | Store, calculate, and display values during processing |
| [Font (legacy)](/reference/htmltags/elements/html_font_element) | `<font>` | **Supported** | Legacy attribute-based styling |
| [Time](/reference/htmltags/elements/html_time_element) | `<time>` | **Supported** | Outputs a date/time value in a specific format |

---

## Lists

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Unordered List](/reference/htmltags/elements/html_ul_element) | `<ul>` | **Supported** | |
| [Ordered List](/reference/htmltags/elements/html_ol_element) | `<ol>` | **Supported** | |
| [List Item](/reference/htmltags/elements/html_li_element) | `<li>` | **Supported** | Supports `-pdf-li-*` properties for custom markers |
| [Menu List](/reference/htmltags/elements/html_menu_element) | `<menu>` | **Supported** | |
| [Definition List](/reference/htmltags/elements/html_dl_dt_dd_elements) | `<dl>` | **Supported** | |
| [Definition Term](/reference/htmltags/elements/html_dl_dt_dd_elements) | `<dt>` | **Supported** | |
| [Definition Item](/reference/htmltags/elements/html_dl_dt_dd_elements) | `<dd>` | **Supported** | |

---

## Tables

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Table](/reference/htmltags/elements/html_table_element) | `<table>` | **Supported** | |
| [Table Header Group](/reference/htmltags/elements/html_table_element) | `<thead>` | **Supported** | Repeats across columns and pages by default |
| [Table Body](/reference/htmltags/elements/html_table_element) | `<tbody>` | **Supported** | |
| [Table Footer Group](/reference/htmltags/elements/html_table_element) | `<tfoot>` | **Supported** | |
| [Table Row](/reference/htmltags/elements/html_tr_element) | `<tr>` | **Supported** | |
| [Table Cell](/reference/htmltags/elements/html_td_element) | `<td>` | **Supported** | `rowspan` across multiple rows with overflow supported from v9.3 |
| [Table Header Cell](/reference/htmltags/elements/html_td_element) | `<th>` | **Supported** | |

---

## Media & Graphics

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Image](/reference/htmltags/elements/html_img_element) | `<img>` | **Supported** | JPEG, PNG, GIF, BMP, SVG; `srcset` supported |
| [Picture](/reference/htmltags/elements/html_picture_element) | `<picture>` | **Supported** | |
| [Source](/reference/htmltags/elements/html_picture_element) | `<source>` | **Supported** | Media-query-based image source selection |
| [Figure](/reference/htmltags/elements/html_figure_element) | `<figure>` | **Supported** | |
| [Meter](/reference/htmltags/elements/html_meter_element) | `<meter>` | **Supported** | Renders a scalar value within a range |
| [Progress](/reference/htmltags/elements/html_progress_element) | `<progress>` | **Supported** | Renders a progress bar |
| [SVG Drawing](/reference/svgelements/) | `<svg>` | **Supported** | Inline, embedded, or referenced; see SVG chart |
| [iFrame](/reference/htmltags/elements/html_iframe_embed_element) | `<iframe>` | **Supported** | Includes external template content without inheriting outer styles |
| [Embed](/reference/htmltags/elements/html_iframe_embed_element) | `<embed>` | **Supported** | Includes external or dynamic content using the outer document style |
| [Object](/reference/htmltags/elements/html_object_element) | `<object>` | **Supported** | Attaches external content; linkable via anchor |

---

## Dynamic Content

| Element | Tag | Support | Notes |
|---------|-----|---------|-------|
| [Template](/reference/htmltags/elements/html_template_element) | `<template>` | **Supported** | Repeats inner content based on bound data |
| [If](/reference/htmltags/elements/html_if_element) | `<if>` | **Scryber** | Conditionally renders content when `data-test` is true |
| [Page Number](/reference/htmltags/elements/html_pagenumber_element) | `<page>` | **Scryber** | Outputs current or referenced page number |
| [Number](/reference/htmltags/elements/html_output_slot_num_elements) | `<num>` | **Scryber** | Outputs a numeric value in a specific display format |
| [Slot](/reference/htmltags/elements/html_output_slot_num_elements) | `<slot>` | **Scryber** | Content placeholder |

---

## Not Supported

Standard HTML elements that are not currently supported. Any unknown element is silently skipped (or raises an error in strict conformance mode).

| Element | Tag | Notes |
|---------|-----|-------|
| Form | `<form>` | No interactive form support in PDF output |
| Input | `<input>` | — |
| Select | `<select>` | — |
| Button | `<button>` | — |
| Textarea | `<textarea>` | — |
| Canvas | `<canvas>` | PDF has no raster drawing surface |
| Video | `<video>` | PDF is a static format |
| Audio | `<audio>` | PDF is a static format |
| Dialog | `<dialog>` | — |
| Map / Area | `<map>` / `<area>` | — |

---

## See Also

- [HTML Elements Reference](/reference/htmltags/)
- [CSS Styles Support](/quickstart/feature_css_styles)
- [SVG Drawing Support](/quickstart/feature_svg)
- [Binding Expressions Support](/quickstart/feature_binding)
