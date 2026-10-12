---
layout: default
title: type
parent: HTML Attributes
parent_url: /paperwork.core/reference/htmlattributes/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# @type : The Input Type Attribute
{: .no_toc}

The `type` attribute specifies the type of input field to render in PDF documents. It controls both the visual appearance and the semantic meaning of form fields. Since Scryber PDFs are static documents, input types render as styled visual representations rather than interactive controls.

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



The `type` attribute determines how input fields are displayed:
- Controls the visual rendering style (text box, checkbox, radio button, etc.)
- Defines the semantic meaning of the field
- Affects default styling and behavior
- Supports various input types for different data types
- Renders as static visual representation in PDF output
- Can be combined with CSS styling for custom appearances

```html
<!-- Text input (default) -->
<input type="text" value="John Doe" />

<!-- Checkbox input -->
<input type="checkbox" value="checked" />

<!-- Radio button input -->
<input type="radio" value="selected" />

<!-- Button input -->
<input type="button" value="Click Me" />
```

{: .note }
> The forms input and types are not **CURRENTLY** implemented in the library. As such the rest of this help file will not be valid! It is only here for completeness.

---

