---
layout: default
title: ::after Pseudo-class
parent: CSS Selectors
parent_url: /paperwork.core/reference/cssselectors/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# ::after Pseudo-class Selector
{: .no_toc }

The `::after` pseudo-class selector targets the "after" state of an element, allowing you to style content or elements that appear after the main element. Both single-colon (`:after`) and double-colon (`::after`) syntax are supported (although the double-colon is recommended).

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

```css
element:after {
    property: value;
}

element::after {
    property: value;
}
```

Both syntaxes are equivalent and can be used interchangeably.

---

## Syntax Examples

```css
/* Single colon syntax */
p:after {
    content: " (read more)";
    font-style: italic;
}

/* Double colon syntax */
p::after {
    content: " (read more)";
    font-style: italic;
}

/* With class selector */
.alert:after {
    content: " !";
    color: red;
}

/* With ID selector */
#footer::after {
    content: "";
    display: block;
    height: 5pt;
    background-color: blue;
}
```

---

## Specificity

The pseudo-class adds to the base selector's specificity:
- `element:after` = element specificity + pseudo-class state
- `.class:after` = class specificity + pseudo-class state
- `#id:after` = ID specificity + pseudo-class state

---

## Notes

- Both `:after` and `::after` syntax are supported and equivalent
- Commonly used with the `content` property to insert text or symbols
- The after state is rendered after the element's actual content
- Can be used for decorative elements without modifying HTML
- Inherits properties from the parent element unless overridden
- Useful for adding suffixes, icons, or decorative elements

---

## Examples

### Example 1: Adding suffix text

```html
<style>
    .required:after {
        content: " *";
        color: red;
        font-weight: bold;
    }
</style>
<body>
    <label class="required">Email Address</label>
</body>
```

### Example 2: External link indicator

```html
<style>
    a.external::after {
        content: " ↗";
        color: #0066cc;
        font-size: 10pt;
    }
</style>
<body>
    <p>Visit <a href="https://example.com" class="external">our website</a> for details.</p>
</body>
```

### Example 3: Decorative underline

```html
<style>
    h2::after {
        content: "";
        display: block;
        width: 100%;
        height: 2pt;
        background-color: #333;
        margin-top: 5pt;
    }
</style>
<body>
    <h2>Section Heading</h2>
    <p>Content follows...</p>
</body>
```

### Example 4: Quote closing mark

```html
<style>
    blockquote:after {
        content: """;
        font-size: 24pt;
        color: #ccc;
        margin-left: 5pt;
    }
</style>
<body>
    <blockquote>This is a quoted text.</blockquote>
</body>
```

### Example 5: Unit suffix

```html
<style>
    .temperature:after {
        content: "°F";
        font-size: 10pt;
        color: #666;
    }
</style>
<body>
    <p>Current temperature: <span class="temperature">72</span></p>
</body>
```

### Example 6: Status badge

```html
<style>
    .new-item::after {
        content: " NEW";
        background-color: #ff0000;
        color: white;
        padding: 2pt 5pt;
        font-size: 8pt;
        font-weight: bold;
        margin-left: 5pt;
    }
</style>
<body>
    <div class="new-item">Product Name</div>
</body>
```

### Example 7: Currency symbol

```html
<style>
    .price:after {
        content: " USD";
        font-size: 10pt;
        color: #666;
    }
</style>
<body>
    <div class="price">$29.99</div>
</body>
```

### Example 8: Read more link

```html
<style>
    .excerpt::after {
        content: "... read more";
        font-style: italic;
        color: #0066cc;
    }
</style>
<body>
    <p class="excerpt">This is a short excerpt of the article</p>
</body>
```

### Example 9: Beta label

```html
<style>
    .beta-feature:after {
        content: " BETA";
        background-color: #ffa500;
        color: white;
        padding: 2pt 4pt;
        font-size: 8pt;
        border-radius: 2pt;
        margin-left: 5pt;
    }
</style>
<body>
    <h3 class="beta-feature">New Dashboard</h3>
</body>
```

### Example 10: Clearfix pattern

```html
<style>
    .clearfix::after {
        content: "";
        display: block;
        clear: both;
    }

    .float-left {
        float: left;
        width: 45%;
    }
</style>
<body>
    <div class="clearfix">
        <div class="float-left">Column 1</div>
        <div class="float-left">Column 2</div>
    </div>
</body>
```

---

## See Also

- [:before / ::before Pseudo-class](/paperwork.core/reference/cssselectors/selectors/css_before_selector)
- [:hover Pseudo-class](/paperwork.core/reference/cssselectors/selectors/css_hover_selector)
- [Element Selector](/paperwork.core/reference/cssselectors/selectors/css_element_selector)
- [Class Selector](/paperwork.core/reference/cssselectors/selectors/css_class_selector)

---
