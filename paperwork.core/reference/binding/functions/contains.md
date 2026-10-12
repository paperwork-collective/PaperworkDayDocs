---
layout: default
title: contains
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# contains() : Check if String Contains Substring
{: .no_toc }

Check if a string contains a specified substring.

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

## Signature

```
contains(str, search)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The string to search in |
| `search` | String | Yes | The substring to search for |

---

## Returns

**Type:** Boolean

`true` if the substring is found, `false` otherwise.

---

## Examples

### Simple Search


{% raw %}
```handlebars
{{#if contains(model.description, 'premium')}}
  <span class="badge-premium">Premium Product</span>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    description = "This is a premium quality product"
};
```

**Output:**
```html
<span class="badge-premium">Premium Product</span>
```

### Filter Items


{% raw %}
```handlebars
{{#each model.products}}
  {{#if contains(this.name, 'Pro')}}
    <div class="product-pro">
      <h3>{{this.name}}</h3>
      <span>Professional Edition</span>
    </div>
  {{/if}}
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    products = new[] {
        new { name = "Widget" },
        new { name = "Widget Pro" },
        new { name = "Gadget Pro Max" }
    }
};
```

**Output:**
```html
<div class="product-pro">
  <h3>Widget Pro</h3>
  <span>Professional Edition</span>
</div>
<div class="product-pro">
  <h3>Gadget Pro Max</h3>
  <span>Professional Edition</span>
</div>
```

### Keyword Highlighting


{% raw %}
```handlebars
{{#each model.items}}
  {{#if contains(toLower(this.title), toLower(model.searchTerm))}}
    <div class="search-result">
      <h4>{{this.title}}</h4>
      <p>{{this.description}}</p>
    </div>
  {{/if}}
{{/each}}
```
{% endraw %}


### Email Validation


{% raw %}
```handlebars
{{#if contains(model.email, '@')}}
  <p>Email: {{model.email}}</p>
{{else}}
  <p class="error">Invalid email format</p>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    email = "user@example.com"
};
```

**Output:**
```html
<p>Email: user@example.com</p>
```

---

## Notes

- Case-sensitive by default
- Returns false if search string is not found
- Empty search string returns true
- For case-insensitive search, use with `toLower()`: `contains(toLower(str), toLower(search))`
- For position information, use `indexOf()`
- Returns false for null values

---

## See Also

- [indexOf Function](./indexOf.md)
- [startsWith Function](./startsWith.md)
- [endsWith Function](./endsWith.md)
- [toLower Function](./toLower.md)

---
