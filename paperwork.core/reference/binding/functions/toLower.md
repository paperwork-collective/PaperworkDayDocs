---
layout: default
title: toLower
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# toLower() : Convert to Lowercase
{: .no_toc }

Convert a string to lowercase letters.

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
toLower(str)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The string to convert |

---

## Returns

**Type:** String

The string converted to lowercase.

---

## Examples

### Basic Lowercase


{% raw %}
```handlebars
<p>{{toLower(model.text)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    text = "HELLO WORLD"
});
```

**Output:**
```html
<p>hello world</p>
```

### Normalize for Comparison


{% raw %}
```handlebars
{{#if toLower(model.status) == 'active'}}
  <span class="badge-active">Active</span>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    status = "ACTIVE"
});
```

**Output:**
```html
<span class="badge-active">Active</span>
```

### Email Display


{% raw %}
```handlebars
<p>Email: {{toLower(model.email)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    email = "John.Doe@EXAMPLE.COM"
});
```

**Output:**
```html
<p>Email: john.doe@example.com</p>
```

### CSS Class Names


{% raw %}
```handlebars
{{#each model.categories}}
  <div class="category-{{toLower(replace(this.name, ' ', '-'))}}">
    {{this.name}}
  </div>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    categories = new[] {
        new { name = "Product Reviews" },
        new { name = "Technical Support" }
    }
});
```

**Output:**
```html
<div class="category-product-reviews">
  Product Reviews
</div>
<div class="category-technical-support">
  Technical Support
</div>
```

---

## Notes

- Converts all uppercase letters to lowercase
- Leaves numbers and special characters unchanged
- Culture-dependent (uses current culture)
- Useful for case-insensitive comparisons
- Does not modify the original value
- For uppercase, use `toUpper()`

---

## See Also

- [toUpper Function](./toUpper.md)
- [replace Function](./replace.md)
- [Equality Operator](../operators/equality.md)

---
