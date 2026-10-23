---
layout: default
title: concat
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# concat() : Concatenate Strings
{: .no_toc }

Concatenate multiple strings into one.

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
concat(str1, str2, str3, ...)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str1, str2, ...` | String | Yes | Strings to concatenate (variable number) |

---

## Returns

**Type:** String

All input strings joined together.

---

## Examples

### Basic Concatenation


{% raw %}
```handlebars
{{concat('Hello', ' ', 'World')}}
<!-- Output: Hello World -->
```
{% endraw %}


### With Variables


{% raw %}
```handlebars
<p>{{concat(model.firstName, ' ', model.lastName)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    firstName = "John",
    lastName = "Doe"
});
```

**Output:**
```html
<p>John Doe</p>
```

### Multiple Values


{% raw %}
```handlebars
{{concat('Order #', model.orderNumber, ' - ', model.status)}}
<!-- Output: Order #12345 - Shipped -->
```
{% endraw %}


### With Formatting


{% raw %}
```handlebars
{{concat('Total: ', format(model.total, 'C2'))}}
<!-- Output: Total: $99.99 -->
```
{% endraw %}


### In Log Statement


{% raw %}
```handlebars
{{log concat('Processing order ', model.id)}}
```
{% endraw %}


---

## Notes

- Null values are treated as empty strings
- Non-string values are converted to strings
- Empty strings are preserved
- More efficient than multiple `+` operations for many strings

---

## See Also

- [join Function](./join.md)
- [String Functions](./index.md#string-functions)

---
