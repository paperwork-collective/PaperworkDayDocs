---
layout: default
title: length
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# length() : Get String/Array Length
{: .no_toc }

Get the length of a string or count of items in an array.

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
length(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | String/Array | Yes | The string or array to measure |

---

## Returns

**Type:** Integer

The number of characters in the string or items in the array.

---

## Examples

### String Length


{% raw %}
```handlebars
<p>Length: {{length(model.text)}} characters</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    text = "Hello World"
});
```

**Output:**
```html
<p>Length: 11 characters</p>
```

### Array Count


{% raw %}
```handlebars
<p>Total items: {{length(model.items)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new[] { "Item 1", "Item 2", "Item 3" }
});
```

**Output:**
```html
<p>Total items: 3</p>
```

### Conditional Truncation


{% raw %}
```handlebars
{{#each model.descriptions}}
  {{#if length(this) > 50}}
    <p>{{substring(this, 0, 50)}}...</p>
  {{else}}
    <p>{{this}}</p>
  {{/if}}
{{/each}}
```
{% endraw %}


### Character Limit Validation


{% raw %}
```handlebars
{{#if length(model.comment) > 200}}
  <p class="error">Comment too long ({{length(model.comment)}}/200 characters)</p>
{{else}}
  <p>{{model.comment}}</p>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    comment = "This is a sample comment."
});
```

**Output:**
```html
<p>This is a sample comment.</p>
```

### List Size Display


{% raw %}
```handlebars
<h3>Products ({{length(model.products)}})</h3>
<ul>
{{#each model.products}}
  <li>{{this.name}}</li>
{{/each}}
</ul>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    products = new[] {
        new { name = "Widget A" },
        new { name = "Widget B" },
        new { name = "Widget C" }
    }
});
```

**Output:**
```html
<h3>Products (3)</h3>
<ul>
  <li>Widget A</li>
  <li>Widget B</li>
  <li>Widget C</li>
</ul>
```

---

## Notes

- Works with both strings and arrays
- Returns character count for strings
- Returns item count for arrays/collections
- Returns 0 for empty string or array
- Null values may throw exception
- For collection operations, also see `count()` function

---

## See Also

- [count Function](./count.md)
- [substring Function](./substring.md)
- [#each Helper](../helpers/each.md)
- [Greater Than Operator](../operators/greaterthan.md)

---
