---
layout: default
title: else
parent: Handlebars Helpers
parent_url: /paperwork.core/reference/binding/helpers/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# else : Fallback Branch Helper
{: .no_toc }

Provides a fallback branch when conditional expressions are false or when collections are empty.

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

**With {% raw %}{{#if}}{% endraw %}:**


{% raw %}
```handlebars
{{#if condition}}
  <!-- Content when true -->
{{else}}
  <!-- Content when false -->
{{/if}}
```
{% endraw %}


**With {% raw %}{{#each}}{% endraw %}:**


{% raw %}
```handlebars
{{#each collection}}
  <!-- Content for each item -->
{{else}}
  <!-- Content when collection is empty -->
{{/each}}
```
{% endraw %}


**With {% raw %}{{#with}}{% endraw %}:**


{% raw %}
```handlebars
{{#with object}}
  <!-- Content when object exists -->
{{else}}
  <!-- Content when object is null -->
{{/with}}
```
{% endraw %}


---

## Parameters

No parameters. The `{% raw %}{{else}}{% endraw %}` helper is used as a separator within block helpers.

---

## Examples

### With If Statement


{% raw %}
```handlebars
{{#if model.hasStock}}
  <button class="btn-primary">Add to Cart</button>
{{else}}
  <button class="btn-disabled" disabled>Out of Stock</button>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    hasStock = false
});
```

**Output:**
```html
<button class="btn-disabled" disabled>Out of Stock</button>
```

### With Each Loop (Empty Collection)


{% raw %}
```handlebars
<ul>
{{#each model.items}}
  <li>{{this.name}}</li>
{{else}}
  <li class="empty">No items available</li>
{{/each}}
</ul>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new object[] { }  // Empty array
});
```

**Output:**
```html
<ul>
  <li class="empty">No items available</li>
</ul>
```

### With Context Switch (Null Object)


{% raw %}
```handlebars
{{#with model.user}}
  <div class="user-profile">
    <h2>{{name}}</h2>
    <p>{{email}}</p>
  </div>
{{else}}
  <div class="no-profile">
    <p>User profile not available</p>
  </div>
{{/with}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    user = (object)null
});
```

**Output:**
```html
<div class="no-profile">
  <p>User profile not available</p>
</div>
```

### Multiple Else If with Final Else


{% raw %}
```handlebars
{{#if model.grade >= 90}}
  <span class="a">A - Excellent</span>
{{else if model.grade >= 80}}
  <span class="b">B - Good</span>
{{else if model.grade >= 70}}
  <span class="c">C - Average</span>
{{else}}
  <span class="f">F - Needs Improvement</span>
{{/if}}
```
{% endraw %}


---

## Underlying Implementation

**In {% raw %}{{#if}}{% endraw %} blocks**, `{% raw %}{{else}}{% endraw %}` compiles to:


{% raw %}
```xml
<choose>
  <when data-test="{{condition}}">
    <!-- If content -->
  </when>
  <otherwise>
    <!-- Else content -->
  </otherwise>
</choose>
```
{% endraw %}


**In {% raw %}{{#each}}{% endraw %} blocks**, `{% raw %}{{else}}{% endraw %}` creates a conditional wrapper:


{% raw %}
```xml
<template data-bind="{{collection}}">
  <!-- Each content -->
</template>
<template data-test="count({{collection}}) == 0">
  <!-- Else content shown when empty -->
</template>
```
{% endraw %}


---

## Notes

- Can be used with `{% raw %}{{#if}}{% endraw %}`, `{% raw %}{{#each}}{% endraw %}`, and `{% raw %}{{#with}}{% endraw %}`
- Only one `{% raw %}{{else}}{% endraw %}` block allowed per helper (use `{% raw %}{{else if}}{% endraw %}` for multiple conditions)
- For `{% raw %}{{#if}}{% endraw %}`, the else block renders when all conditions are false
- For `{% raw %}{{#each}}{% endraw %}`, the else block renders when the collection is empty
- For `{% raw %}{{#with}}{% endraw %}`, the else block renders when the object is null or undefined
- Position matters: must come after all `{% raw %}{{else if}}{% endraw %}` blocks

---

## See Also

- [#if Helper](./if.html)
- [else if Helper](./elseif.html)
- [#each Helper](./each.html)
- [#with Helper](./with.html)
- [Conditional Rendering Guide](../../learning/02-data-binding/04_conditional_rendering.html)

---
