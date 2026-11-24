---
layout: default
title: long
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# long() : Convert to Long Integer
{: .no_toc }

Convert a value to a 64-bit long integer. Useful for large numbers that exceed Int32 range.

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
long(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Any | Yes | The value to convert to long integer |

---

## Returns

**Type:** Int64

A 64-bit integer representation of the value.

---

## Examples

### Large Number Conversion


{% raw %}
```handlebars
<p>Population: {{format(long(model.population), 'N0')}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    population = "7800000000"
});
```

**Output:**
```html
<p>Population: 7,800,000,000</p>
```

### File Size Calculation


{% raw %}
```handlebars
<p>Total Size: {{format(long(model.bytes) / 1024 / 1024, '0.00')}} MB</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    bytes = "52428800"
});
```

**Output:**
```html
<p>Total Size: 50.00 MB</p>
```

### Timestamp Conversion


{% raw %}
```handlebars
<p>Timestamp: {{long(model.timestamp)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    timestamp = "1679875200000"
});
```

**Output:**
```html
<p>Timestamp: 1679875200000</p>
```

---

## Notes

- Rounds to the nearest whole number, with an exact half going to the even number, in the same way as `int()`. Text with a fraction, such as `'10.6'`, is read with a dot as the decimal point and rounded (from 9.11.0; before that it raised an error). To drop the fraction, use `truncate()`
- Handles string-to-long conversion
- Throws exception if value cannot be converted
- Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
- Use for large numbers that exceed Int32 range (-2.1B to 2.1B)
- For decimal precision, use `decimal()` instead

---

## See Also

- [int Function](/paperwork.core/reference/binding/functions/int.html)
- [double Function](/paperwork.core/reference/binding/functions/double.html)
- [decimal Function](/paperwork.core/reference/binding/functions/decimal.html)
- [format Function](/paperwork.core/reference/binding/functions/format.html)

---
