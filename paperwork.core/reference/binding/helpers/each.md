---
layout: default
title: each
parent: Handlebars Helpers
parent_url: /paperwork.core/reference/binding/helpers/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# #each : Iteration Helper
{: .no_toc }

Iterate over arrays or collections, rendering the enclosed template for each item. The data context changes to the current item within the block.

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

## Syntax


{% raw %}
```handlebars
{{#each collection}}
  <!-- Content repeated for each item -->
{{/each}}
```
{% endraw %}


---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | Array/IEnumerable, Dictionary or object | Yes | The collection to iterate over, or a dictionary or JSON object to iterate the entries of |

---

## Special Variables

| Variable | Description |
|----------|-------------|
| `@index` | Zero-based index of current item (0, 1, 2, ...) |
| `@first` | Boolean, `true` for the first item |
| `@last` | Boolean, `true` for the last item |
| `@key` | The key of the current entry (dictionary or object), or the index (collection) |
| `this` | Reference to the current item |
| `../` | Access parent context |

---

## Examples

### Basic Iteration


{% raw %}
```handlebars
<ul>
{{#each model.items}}
  <li>{{this}}</li>
{{/each}}
</ul>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new[] { "Apple", "Banana", "Orange" }
});
```

**Output:**
```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>
```

### With Object Properties


{% raw %}
```handlebars
<table>
  {{#each model.products}}
  <tr>
    <td>{{add(@index, 1)}}</td>
    <td>{{this.name}}</td>
    <td>${{format(this.price, '0.00')}}</td>
  </tr>
  {{/each}}
</table>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    products = new[] {
        new { name = "Widget", price = 19.99m },
        new { name = "Gadget", price = 29.99m }
    }
});
```

### Using Special Variables


{% raw %}
```handlebars
{{#each model.items}}
  <div class="{{if(@first, 'first', '')}} {{if(@last, 'last', '')}}">
    <span>Item {{add(@index, 1)}}</span>
    <h3>{{this.title}}</h3>
  </div>
{{/each}}
```
{% endraw %}


### Iterating a Dictionary or Object

From 9.8, `{% raw %}{{#each}}{% endraw %}` over a dictionary, or a JSON object (Newtonsoft `JObject` or `System.Text.Json`), runs once for each entry. `this` is the value, and [`@key`](../variables/at_key) is the key or property name.


{% raw %}
```handlebars
{{#each model.prices}}
  <p>{{@key}}: {{this}}</p>
{{/each}}
```
{% endraw %}


{: .note }
> Before 9.8 a dictionary or JSON object was bound once, with the whole object as `this`. To bind an object once now, use `{% raw %}{{#with}}{% endraw %}`.

### Accessing Parent Context


{% raw %}
```handlebars
<h1>{{model.companyName}}</h1>
{{#each model.departments}}
  <h2>{{this.name}}</h2>
  {{#each this.employees}}
    <li>{{this.name}} works at {{model.companyName}} in {{../name}}</li>
  {{/each}}
{{/each}}
```
{% endraw %}


---

## Underlying Implementation

The `{% raw %}{{#each}}{% endraw %}` helper compiles to the following Scryber template element:


{% raw %}
```xml
<template data-bind="{{collection}}">
  <!-- Your content here with {{this}} context -->
</template>
```
{% endraw %}


This uses Scryber's [`ForEach` component](../../components/foreach.html) internally, which provides the iteration and context management.

---

## Notes

- Empty arrays render nothing (no error)
- Works with any IEnumerable collection
- Can be nested for multi-dimensional data
- Context changes to current item within the block
- Use `{% raw %}{{.}}{% endraw %}` to reference the entire current item
- Provides `@index`, `@first`, `@last` and `@key` special variables
- Iterates the entries of a dictionary or JSON object (9.8 onwards)

---

## See Also

- [#with Helper](./with.html)
- [#if Helper](./if.html)
- [Template Iteration Guide](../../learning/02-data-binding/03_template_iteration.html)

---
