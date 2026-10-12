---
layout: default
title: trim
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# trim() : Remove Whitespace
{: .no_toc }

Remove leading and trailing whitespace from a string.

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
trim(str)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The string to trim |

---

## Returns

**Type:** String

The string with leading and trailing whitespace removed.

---

## Examples

### Remove Extra Spaces


{% raw %}
```handlebars
<p>"{{trim(model.text)}}"</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    text = "  Hello World  "
};
```

**Output:**
```html
<p>"Hello World"</p>
```

### Clean User Input


{% raw %}
```handlebars
{{#each model.names}}
  <li>{{trim(this)}}</li>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    names = new[] { "  John  ", " Jane ", "Bob   " }
};
```

**Output:**
```html
<li>John</li>
<li>Jane</li>
<li>Bob</li>
```

### Normalize for Comparison


{% raw %}
```handlebars
{{#if trim(model.status) == 'active'}}
  <span class="active">Active</span>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    status = " active "
};
```

**Output:**
```html
<span class="active">Active</span>
```

### Clean Multi-Line Text


{% raw %}
```handlebars
<p>{{trim(model.description)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    description = @"
        This is a description
        with extra whitespace
    "
};
```

**Output:**
```html
<p>This is a description
        with extra whitespace</p>
```

---

## Notes

- Removes spaces, tabs, newlines from both ends
- Does not affect whitespace in the middle of string
- Returns original string if no whitespace at ends
- For trailing whitespace only, use `trimEnd()`
- Does not modify the original value
- Useful for cleaning user input and data

---

## See Also

- [trimEnd Function](./trimEnd.md)
- [replace Function](./replace.md)
- [length Function](./length.md)

---
