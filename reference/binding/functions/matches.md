---
layout: default
title: matches
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# matches() : Find All Pattern Matches
{: .no_toc }

Find all occurrences of a regular expression pattern in a string.

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
matches(str, pattern)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The string to search |
| `pattern` | String | Yes | The regular expression pattern |

---

## Returns

**Type:** Array of strings

An array containing all matches found.

---

## Examples

### Extract All Numbers


{% raw %}
```handlebars
<ul>
{{#each matches(model.text, '\\d+')}}
  <li>Number: {{this}}</li>
{{/each}}
</ul>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    text = "Order 123 contains 45 items at $67.89"
};
```

**Output:**
```html
<ul>
  <li>Number: 123</li>
  <li>Number: 45</li>
  <li>Number: 67</li>
  <li>Number: 89</li>
</ul>
```

### Extract Email Addresses


{% raw %}
```handlebars
<h3>Found Emails:</h3>
{{#each matches(model.text, '[\\w\\.]+@[\\w\\.]+')}}
  <p>{{this}}</p>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    text = "Contact john@example.com or jane.doe@company.co.uk for details"
};
```

**Output:**
```html
<h3>Found Emails:</h3>
<p>john@example.com</p>
<p>jane.doe@company.co.uk</p>
```

### Extract Hashtags


{% raw %}
```handlebars
<div class="tags">
{{#each matches(model.post, '#\\w+')}}
  <span class="tag">{{this}}</span>
{{/each}}
</div>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    post = "Great day! #travel #adventure #nature #photography"
};
```

**Output:**
```html
<div class="tags">
  <span class="tag">#travel</span>
  <span class="tag">#adventure</span>
  <span class="tag">#nature</span>
  <span class="tag">#photography</span>
</div>
```

### Extract URLs


{% raw %}
```handlebars
<h3>Links:</h3>
{{#each matches(model.content, 'https?://[^\\s]+')}}
  <a href="{{this}}">{{this}}</a>
{{/each}}
```
{% endraw %}


### Count Matches


{% raw %}
```handlebars
<p>Found {{length(matches(model.text, '\\d'))}} digits</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    text = "ABC123XYZ456"
};
```

**Output:**
```html
<p>Found 6 digits</p>
```

---

## Notes

- Uses .NET regex syntax
- Returns array of all matches (not just first)
- Returns empty array if no matches found
- Backslashes must be escaped: `\\d`, `\\w`, etc.
- Use with `{% raw %}{{#each}}{% endraw %}` to iterate matches
- For testing if match exists, use `isMatch()`
- For replacement, use `swap()`

---

## Common Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `\\d+` | One or more digits | `123`, `45` |
| `\\w+` | Word characters | `hello`, `test123` |
| `[A-Z]+` | Uppercase letters | `ABC`, `XYZ` |
| `#\\w+` | Hashtags | `#tag1`, `#tag2` |
| `@\\w+` | Mentions | `@user1`, `@user2` |
| `\\$\\d+\\.\\d{2}` | Currency | `$19.99`, `$100.00` |

---

## See Also

- [isMatch Function](./isMatch.md)
- [swap Function](./swap.md)
- [#each Helper](../helpers/each.md)
- [length Function](./length.md)

---
