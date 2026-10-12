---
layout: default
title: data-outline-title
parent: HTML Attributes
parent_url: /paperwork.core/reference/htmlattributes/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# @data-outline-title : The Custom Outline Title Attribute
{: .no_toc }

---

## Summmary

The `data-outline-title` attribute specifies a custom title for PDF bookmarks and outlines on components (aka. tags) that have a specific, existing, meaning for the [`@title`](/paperwork.core/reference/htmlattributes/attributes/attr_title) attribute with the template content. This allows you to provide a different text for the document navigation structure (as per 'title') than what appears in the visible content, enabling more descriptive or concise bookmark entries when needed.

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

The `data-outline-title` attribute is used to support the :
- Create custom bookmark titles in PDF navigation panels
- Provide descriptive outline entries different from visible content
- Simplify long headings for navigation purposes
- Add context to bookmark titles
- Control PDF document navigation structure

```html
<!-- Visible heading -->
<defn title='Portable Document Format' data-outline-title="PDF Definition">PDF</defn> Output

<!-- bookmark will show "PDF Definition" -->
```

---

## Supported Elements

The `data-outline-title` attribute is supported by various elements that can generate PDF bookmarks:

| Element | Description |
|---------|-------------|
| `<abbr>` | Abbreviations |
| `<cite>` | Citations |
| `<defn>` | Definitions |

---

## Attribute Values

### Syntax

```html
<abbr data-outline-title="Bookmark Title">Actual Heading Text</abbr>
```

### Value Type

| Type | Description | Example |
|------|-------------|---------|
| String | Any text string for the bookmark | `data-outline-title="Chapter 1"` |
| Short text | Concise bookmark label | `data-outline-title="Summary"` |
| Descriptive | More context than visible text | `data-outline-title="Q4 Financial Results"` |

---

## Binding Values

The `data-outline-title` attribute supports data binding:

### Static Outline Title

```html
<defn title='C1 - Introduction' data-outline-title="Chapter 1: Introduction">
    Chapter 1: Introduction to PDF Generation with Scryber
</defn>
```

### Dynamic Outline Title with Binding


{% raw %}
```html
<!-- Model: { cites : [{ author: 'John Smith', title: "Advanced Features" }] } -->
<cite data-outline-title="Citation: {{model.cites[0].title}}: {{model.cites[0].author}}">
    As stated in '{{model.cites[0].title}}', a comprehensive guide...
</cite>
```
{% endraw %}


---

## Notes

### PDF Bookmarks/Outlines

In PDF documents:
- **Bookmarks** (also called **Outlines**) provide hierarchical navigation
- They appear in the navigation panel of PDF readers
- Clicking a bookmark navigates to that section
- The bookmark hierarchy follows the document structure (h1 > h2 > h3, etc.)

### Title vs Outline Title

| Attribute | Purpose |
|-----------|---------|
| `title` | Standard behaviour for document structure. (PDF) |
| `data-outline-title` | Used specifically on components that already have a 'title' value definiton |


### Hierarchical Structure

PDF bookmarks automatically create a hierarchy based on heading levels:

```html
<h1>Part 1: Foundations</h1>
<div title="Part 1">
    <h2>Chapter 1: Getting Started</h2>
    <div title="Chapter 1">
        <h3>1.1: Installation Guide</h3>
        <div title="1.1 Installation">
            <abbr data-outline-title='Portable Document Format'>PDF</abbr>
        </div>
    </div>
    <h2>Chapter 2: Basic Concepts</h2>
    <div title="Chapter 2">
        More content
    </div>
</div>
```

Creates this bookmark structure:
```
📖 Part 1
   📄 Chapter 1
      📄 1.1 Installation
        📄 Portable Document Format
   📄 Chapter 2
```



---

## See Also

- [title attribute](/paperwork.core/reference/htmlattributes/attributes/attr_title.html) - Title tooltip attribute
- [id attribute](/paperwork.core/reference/htmlattributes/attributes/attr_id.html) - Element identifier
- [PDF Outlines](/articles/outlines.html) - PDF outline structure
- [Document Navigation](/articles/navigation.html) - PDF navigation features
- [Data Binding](/paperwork.core/reference/binding/) - Dynamic data binding

---
