---
layout: default
title: floor
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# floor() : Round Down to Integer
{: .no_toc }

Round a number down to the nearest integer.

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
floor(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Number | Yes | The number to round down |

---

## Returns

**Type:** Integer

The largest integer less than or equal to the value.

---

## Examples

### Round Down Prices


{% raw %}
```handlebars
<p>Base Price: ${{floor(model.price)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    price = 19.99m
};
```

**Output:**
```html
<p>Base Price: $19</p>
```

### Calculate Completed Items


{% raw %}
```handlebars
<p>Full sets: {{floor(model.items / model.setSize)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    items = 47,
    setSize = 10
};
```

**Output:**
```html
<p>Full sets: 4</p>
```

### Age Calculation


{% raw %}
```handlebars
<p>Age: {{floor(model.days / 365)}} years</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    days = 10950
};
```

**Output:**
```html
<p>Age: 30 years</p>
```

### Always Round Down


{% raw %}
```handlebars
{{#each model.values}}
  <li>{{this}} → {{floor(this)}}</li>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    values = new[] { 1.1, 2.5, 3.9, 4.0 }
};
```

**Output:**
```html
<li>1.1 → 1</li>
<li>2.5 → 2</li>
<li>3.9 → 3</li>
<li>4.0 → 4</li>
```

---

## Notes

- Always rounds down (towards negative infinity)
- Returns integer type
- For up rounding, use `ceiling()`
- For nearest rounding, use `round()`
- For removing decimals without rounding, use `truncate()`
- Negative numbers round away from zero: `-1.5` → `-2`

---

## See Also

- [ceiling Function](./ceiling.md)
- [round Function](./round.md)
- [truncate Function](./truncate.md)
- [Division Operator](../operators/division.md)

---
