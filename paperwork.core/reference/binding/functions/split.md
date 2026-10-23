---
layout: default
title: split
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# split() : Split String into Array
{: .no_toc }

Split a string into an array of substrings based on a separator.

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
split(str, separator)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The string to split |
| `separator` | String | Yes | The separator to split on |

---

## Returns

**Type:** Array of strings

An array containing the split substrings.

---

## Examples

### Split CSV


{% raw %}
```handlebars
<ul>
{{#each split(model.tags, ',')}}
  <li>{{trim(this)}}</li>
{{/each}}
</ul>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    tags = "javascript, html, css, react"
});
```

**Output:**
```html
<ul>
  <li>javascript</li>
  <li>html</li>
  <li>css</li>
  <li>react</li>
</ul>
```

### Split Full Name


{% raw %}
```handlebars
<p>First Name: {{split(model.fullName, ' ')[0]}}</p>
<p>Last Name: {{split(model.fullName, ' ')[1]}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    fullName = "John Doe"
});
```

**Output:**
```html
<p>First Name: John</p>
<p>Last Name: Doe</p>
```

### Split Path


{% raw %}
```handlebars
<ul class="breadcrumb">
{{#each split(model.path, '/')}}
  <li>{{this}}</li>
{{/each}}
</ul>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    path = "home/documents/reports/2024"
});
```

**Output:**
```html
<ul class="breadcrumb">
  <li>home</li>
  <li>documents</li>
  <li>reports</li>
  <li>2024</li>
</ul>
```

### Count Occurrences


{% raw %}
```handlebars
<p>Words: {{length(split(model.sentence, ' '))}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    sentence = "This is a sample sentence"
});
```

**Output:**
```html
<p>Words: 5</p>
```

---

## Notes

- Returns array of substrings
- Empty strings included if separator appears consecutively
- If separator not found, returns array with single element (original string)
- Case-sensitive matching
- Use with `{% raw %}{{#each}}{% endraw %}` to iterate results
- Use with `trim()` to clean up whitespace
- Opposite of `join()` function

---

## See Also

- [join Function](./join.md)
- [trim Function](./trim.md)
- [#each Helper](../helpers/each.md)
- [length Function](./length.md)

---
