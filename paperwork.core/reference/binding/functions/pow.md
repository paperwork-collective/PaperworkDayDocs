---
layout: default
title: pow
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# pow() : Power (Exponentiation)
{: .no_toc }

Raise a number to a specified power.

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
pow(base, exponent)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `base` | Number | Yes | The base value |
| `exponent` | Number | Yes | The power to raise to |

---

## Returns

**Type:** Double

The base raised to the power of the exponent.

---

## Examples

### Square


{% raw %}
```handlebars
<p>{{model.value}} squared = {{pow(model.value, 2)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    value = 5
};
```

**Output:**
```html
<p>5 squared = 25</p>
```

### Cube


{% raw %}
```handlebars
<p>Volume: {{pow(model.side, 3)}} cubic units</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    side = 3
};
```

**Output:**
```html
<p>Volume: 27 cubic units</p>
```

### Compound Interest


{% raw %}
```handlebars
<p>Future Value: ${{format(model.principal * pow(1 + model.rate, model.years), '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    principal = 1000,
    rate = 0.05,
    years = 10
};
```

**Output:**
```html
<p>Future Value: $1628.89</p>
```

### Nth Root


{% raw %}
```handlebars
<!-- Cube root using pow(value, 1/3) -->
<p>Cube root of 27: {{format(pow(27, 1/3), '0.0')}}</p>
```
{% endraw %}


**Output:**
```html
<p>Cube root of 27: 3.0</p>
```

---

## Notes

- Alternative to `^` operator
- Returns double-precision floating-point
- Supports fractional exponents (for roots)
- Supports negative exponents (for reciprocals)
- `pow(x, 0.5)` is same as `sqrt(x)`
- `pow(x, -1)` calculates 1/x

---

## See Also

- [Power Operator](../operators/power.md)
- [sqrt Function](./sqrt.md)
- [exp Function](./exp.md)

---
