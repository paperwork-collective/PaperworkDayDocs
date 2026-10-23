---
layout: default
title: e
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# e() : Euler's Number Constant
{: .no_toc }

Get the mathematical constant e (Euler's number), approximately 2.71828.

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
e()
```

---

## Parameters

None.

---

## Returns

**Type:** Double

The value of e (approximately 2.71828182845905).

---

## Examples

### Display Constant


{% raw %}
```handlebars
<p>Euler's number: {{format(e(), '0.00000')}}</p>
```
{% endraw %}


**Output:**
```html
<p>Euler's number: 2.71828</p>
```

### Exponential Growth


{% raw %}
```handlebars
<p>Result: {{format(model.initial * pow(e(), model.rate * model.time), '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    initial = 100,
    rate = 0.05,
    time = 10
});
```

**Output:**
```html
<p>Result: 164.87</p>
```

### Natural Exponential


{% raw %}
```handlebars
<!-- e^2 using constant vs exp function -->
<p>e^2 = {{format(pow(e(), 2), '0.000')}}</p>
<p>exp(2) = {{format(exp(2), '0.000')}}</p>
```
{% endraw %}


**Output:**
```html
<p>e^2 = 7.389</p>
<p>exp(2) = 7.389</p>
```

---

## Notes

- Returns constant value (no parameters)
- Value: 2.71828182845905...
- Base of natural logarithms
- Used in continuous growth/decay models
- `exp(x)` is same as `pow(e(), x)`
- For π (pi), use `pi()`

---

## See Also

- [exp Function](./exp.md)
- [log Function](./log.md)
- [pi Function](./pi.md)
- [pow Function](./pow.md)

---
