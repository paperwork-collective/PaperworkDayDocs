---
layout: default
title: join
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# join() : Join Array with Separator
{: .no_toc }

Join array elements into a single string with a separator.

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
join(array, separator)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `array` | Array | Yes | The array to join |
| `separator` | String | Yes | The separator to use between elements |

---

## Returns

**Type:** String

A single string with all array elements joined by the separator.

---

## Examples

### Comma-Separated List


{% raw %}
```handlebars
<p>Tags: {{join(model.tags, ', ')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    tags = new[] { "JavaScript", "HTML", "CSS", "React" }
};
```

**Output:**
```html
<p>Tags: JavaScript, HTML, CSS, React</p>
```

### Pipe-Separated Values


{% raw %}
```handlebars
<p>Categories: {{join(model.categories, ' | ')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    categories = new[] { "Electronics", "Computers", "Accessories" }
};
```

**Output:**
```html
<p>Categories: Electronics | Computers | Accessories</p>
```

### Create Full Name


{% raw %}
```handlebars
<p>Name: {{join(model.nameParts, ' ')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    nameParts = new[] { "John", "Q", "Doe" }
};
```

**Output:**
```html
<p>Name: John Q Doe</p>
```

### Bullet List


{% raw %}
```handlebars
<p>Features: {{join(model.features, ' • ')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    features = new[] { "Fast", "Reliable", "Secure", "Scalable" }
};
```

**Output:**
```html
<p>Features: Fast • Reliable • Secure • Scalable</p>
```

### Create Path


{% raw %}
```handlebars
<p>Path: {{join(model.pathParts, '/')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    pathParts = new[] { "home", "user", "documents", "file.txt" }
};
```

**Output:**
```html
<p>Path: home/user/documents/file.txt</p>
```

---

## Notes

- Works with string arrays
- Non-string array elements are converted to strings
- Empty arrays return empty string
- Null elements are treated as empty strings
- For collection of objects, use with `collect()` to extract property first
- Alternative to manually iterating with `{% raw %}{{#each}}{% endraw %}`

---

## See Also

- [concat Function](./concat.md)
- [split Function](./split.md)
- [collect Function](./collect.md)
- [#each Helper](../helpers/each.md)

---
