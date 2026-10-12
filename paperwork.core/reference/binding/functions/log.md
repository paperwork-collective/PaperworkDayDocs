---
layout: default
title: log
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# log() : Natural Logarithm
{: .no_toc }

Calculate the natural logarithm (base e) of a number.

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
log(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Number | Yes | The number (must be positive) |

---

## Returns

**Type:** Double

The natural logarithm of the value.

---

## Examples

### Basic Logarithm


{% raw %}
```handlebars
<p>ln({{model.value}}) = {{format(log(model.value), '0.000')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    value = 10
};
```

**Output:**
```html
<p>ln(10) = 2.303</p>
```

### Time to Double


{% raw %}
```handlebars
<p>Years to double: {{format(log(2) / model.rate, '0.0')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    rate = 0.07
};
```

**Output:**
```html
<p>Years to double: 9.9</p>
```

---

## Notes

- Inverse of `exp()` function
- Value must be positive (> 0)
- Returns double-precision floating-point
- For base-10 logarithm, use `log10()`
- Natural log uses base e ≈ 2.71828

---

## See Also

- [log10 Function](./log10.md)
- [exp Function](./exp.md)
- [e Function](./e.md)

---
