---
layout: default
title: abs
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# abs() : Absolute Value
{: .no_toc }

Get the absolute value of a number (remove negative sign).

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
abs(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Number | Yes | Number to get absolute value of |

---

## Returns

**Type:** Number (same type as input)

The absolute value of the input number.

---

## Examples

### Basic Usage


{% raw %}
```handlebars
{{abs(-5)}}     <!-- Output: 5 -->
{{abs(5)}}      <!-- Output: 5 -->
{{abs(-3.14)}}  <!-- Output: 3.14 -->
```
{% endraw %}


### Calculate Difference


{% raw %}
```handlebars
<p>Difference: {{abs(model.actual - model.expected)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    actual = 95,
    expected = 100
});
```

**Output:**
```html
<p>Difference: 5</p>
```

### Show Variance


{% raw %}
```handlebars
<p>Variance: {{format(abs(model.value - model.average), 'N2')}}</p>
```
{% endraw %}


### With Conditional


{% raw %}
```handlebars
{{#if abs(model.change) > 10}}
  <span class="significant">Significant change</span>
{{/if}}
```
{% endraw %}


---

## Notes

- Works with `int`, `long`, `double`, `decimal` types
- Returns same type as input
- `abs(0)` returns `0`
- Useful for calculating distances and differences

---

## See Also

- [sign Function](./sign.md)
- [Mathematical Functions](./index.md#mathematical-functions)

---
