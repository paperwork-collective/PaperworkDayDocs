---
layout: default
title: exp
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# exp() : Exponential (e^x)
{: .no_toc }

Calculate e (Euler's number) raised to a specified power.

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
exp(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Number | Yes | The exponent |

---

## Returns

**Type:** Double

e raised to the power of the value (e^value).

---

## Examples

### Basic Exponential


{% raw %}
```handlebars
<p>e^{{model.value}} = {{format(exp(model.value), '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    value = 2
};
```

**Output:**
```html
<p>e^2 = 7.39</p>
```

### Growth Calculation


{% raw %}
```handlebars
<p>Population: {{format(model.initial * exp(model.rate * model.time), '0')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    initial = 1000,
    rate = 0.05,
    time = 10
};
```

**Output:**
```html
<p>Population: 1649</p>
```

### Exponential Decay


{% raw %}
```handlebars
<p>Remaining: {{format(model.initial * exp(-model.decayRate * model.time), '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    initial = 100,
    decayRate = 0.1,
    time = 5
};
```

**Output:**
```html
<p>Remaining: 60.65</p>
```

---

## Notes

- Returns e^x where e ≈ 2.71828
- Inverse of `log()` (natural logarithm)
- Used in continuous growth/decay models
- Returns double-precision floating-point
- For other bases, use `pow(base, exponent)`

---

## See Also

- [log Function](./log.md)
- [pow Function](./pow.md)
- [e Function](./e.md)

---
