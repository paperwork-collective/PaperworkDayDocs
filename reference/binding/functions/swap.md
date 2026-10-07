---
layout: default
title: swap
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# swap() : Replace Using Regular Expression
{: .no_toc }

Replace all occurrences matching a regular expression pattern with a replacement string.

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
swap(str, pattern, replacement)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The source string |
| `pattern` | String | Yes | The regular expression pattern |
| `replacement` | String | Yes | The replacement text |

---

## Returns

**Type:** String

The string with all pattern matches replaced.

---

## Examples

### Remove All Digits


{% raw %}
```handlebars
<p>{{swap(model.text, '\\d', '')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    text = "Product ABC123 costs $45.99"
};
```

**Output:**
```html
<p>Product ABC costs $.</p>
```

### Mask Phone Numbers


{% raw %}
```handlebars
<p>{{swap(model.phone, '\\d', 'X')}}</p>
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
<p>XXX-XXX-XXXX</p>
```

### Replace Multiple Spaces


{% raw %}
```handlebars
<p>{{swap(model.text, '\\s+', ' ')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    text = "Too    many     spaces"
};
```

**Output:**
```html
<p>Too many spaces</p>
```

### Sanitize Special Characters


{% raw %}
```handlebars
<p>{{swap(model.filename, '[^a-zA-Z0-9_.-]', '_')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    filename = "My File (2024)!.pdf"
};
```

**Output:**
```html
<p>My_File__2024__.pdf</p>
```

### Format Numbers with Separators


{% raw %}
```handlebars
<p>{{swap(model.number, '(\\d)(?=(\\d{3})+$)', '$1,')}}</p>
```
{% endraw %}


### Remove HTML Tags


{% raw %}
```handlebars
<p>{{swap(model.html, '<[^>]+>', '')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    html = "<strong>Bold</strong> and <em>italic</em> text"
};
```

**Output:**
```html
<p>Bold and italic text</p>
```

### Convert Dates


{% raw %}
```handlebars
<!-- Convert MM/DD/YYYY to YYYY-MM-DD -->
<p>{{swap(model.date, '(\\d{2})/(\\d{2})/(\\d{4})', '$3-$1-$2')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    date = "03/15/2024"
};
```

**Output:**
```html
<p>2024-03-15</p>
```

---

## Notes

- Uses .NET regex syntax
- Replaces all occurrences (not just first)
- Backslashes must be escaped: `\\d`, `\\w`, etc.
- Supports capture groups: `$1`, `$2`, etc.
- For simple replacement, `replace()` is faster
- More powerful but slower than `replace()`
- Returns original string if pattern doesn't match

---

## Common Patterns

| Pattern | Replacement | Description |
|---------|-------------|-------------|
| `\\s+` | `' '` | Normalize whitespace |
| `\\d` | `'X'` | Mask digits |
| `<[^>]+>` | `''` | Remove HTML tags |
| `[^a-zA-Z0-9]` | `'_'` | Replace special chars |
| `(\\d{3})(\\d{3})(\\d{4})` | `'($1) $2-$3'` | Format phone |

---

## See Also

- [isMatch Function](./isMatch.md)
- [matches Function](./matches.md)
- [replace Function](./replace.md)

---
