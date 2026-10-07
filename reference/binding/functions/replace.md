---
layout: default
title: replace
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# replace() : Replace Text
{: .no_toc }

Replace all occurrences of a substring with another string.

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
replace(str, find, replacement)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The source string |
| `find` | String | Yes | The substring to find |
| `replacement` | String | Yes | The replacement text |

---

## Returns

**Type:** String

A new string with all occurrences replaced.

---

## Examples

### Simple Replacement


{% raw %}
```handlebars
<p>{{replace(model.text, 'old', 'new')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    text = "The old car was sold to an old friend."
};
```

**Output:**
```html
<p>The new car was snew to an new friend.</p>
```

### Remove Characters


{% raw %}
```handlebars
<p>Phone: {{replace(model.phone -  '')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    phone = "555-123-4567"
};
```

**Output:**
```html
<p>Phone: 5551234567</p>
```

### Format Display


{% raw %}
```handlebars
<p>{{replace(model.code, '_', ' ')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    code = "PREMIUM_CUSTOMER_DISCOUNT"
};
```

**Output:**
```html
<p>PREMIUM CUSTOMER DISCOUNT</p>
```

### Sanitize Input


{% raw %}
```handlebars
{{#each model.items}}
  <p>{{replace(replace(this.name, '<', '&lt;'), '>', '&gt;')}}</p>
{{/each}}
```
{% endraw %}


### Template Variable Replacement


{% raw %}
```handlebars
<p>{{replace(replace(model.template, '{name}', model.name), '{date}', model.date)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    template = "Hello {name}, today is {date}",
    name = "John",
    date = "March 15"
};
```

**Output:**
```html
<p>Hello John, today is March 15</p>
```

---

## Notes

- Replaces all occurrences (not just first)
- Case-sensitive matching
- Returns original string if find text not found
- To remove text, use empty string as replacement
- For pattern-based replacement, use `swap()`
- For single character replacement, more efficient than regex

---

## See Also

- [swap Function](./swap.md)
- [concat Function](./concat.md)
- [substring Function](./substring.md)

---
