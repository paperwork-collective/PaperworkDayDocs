---
layout: default
title: substring
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# substring() : Extract Substring
{: .no_toc }

Extract a portion of a string starting at a specified position.

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
substring(str, start, length?)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The source string |
| `start` | Number | Yes | Zero-based starting position |
| `length` | Number | No | Number of characters to extract (omit for rest of string) |

---

## Returns

**Type:** String

The extracted substring.

---

## Examples

### Extract First N Characters


{% raw %}
```handlebars
<p>Short Name: {{substring(model.fullName, 0, 10)}}...</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    fullName = "Christopher Anderson"
});
```

**Output:**
```html
<p>Short Name: Christophe...</p>
```

### Extract from Position to End


{% raw %}
```handlebars
<p>Last Name: {{substring(model.fullName, 5)}}</p>
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
<p>Last Name: Doe</p>
```

### Truncate Long Text


{% raw %}
```handlebars
{{#each model.articles}}
  <div class="article">
    <h3>{{this.title}}</h3>
    {{#if length(this.content) > 100}}
      <p>{{substring(this.content, 0, 100)}}... <a href="#">Read more</a></p>
    {{else}}
      <p>{{this.content}}</p>
    {{/if}}
  </div>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    articles = new[] {
        new { title = "Article 1", content = "Short content." },
        new { title = "Article 2", content = "This is a very long article content that exceeds one hundred characters and should be truncated with a read more link." }
    }
});
```

**Output:**
```html
<div class="article">
  <h3>Article 1</h3>
  <p>Short content.</p>
</div>
<div class="article">
  <h3>Article 2</h3>
  <p>This is a very long article content that exceeds one hundred characters and should be truncated with... <a href="#">Read more</a></p>
</div>
```

### Extract Middle Portion


{% raw %}
```handlebars
<p>Code: {{substring(model.fullCode, 4, 8)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    fullCode = "PRE-12345678-SUF"
});
```

**Output:**
```html
<p>Code: 12345678</p>
```

### First Initial


{% raw %}
```handlebars
<p>Initial: {{toUpper(substring(model.name, 0, 1))}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    name = "alice"
});
```

**Output:**
```html
<p>Initial: A</p>
```

---

## Notes

- Start position is zero-based (0 = first character)
- If length is omitted, extracts to end of string
- Throws exception if start position exceeds string length
- If length exceeds remaining characters, returns rest of string
- For finding position first, use `indexOf()` then `substring()`
- Negative indices are not supported

---

## See Also

- [length Function](./length.md)
- [indexOf Function](./indexOf.md)
- [trim Function](./trim.md)
- [concat Function](./concat.md)

---
