---
layout: default
title: if
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# if() : Ternary Conditional
{: .no_toc }

Evaluate a condition and return one value if true, another if false. Similar to the ternary operator in programming languages.

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
if(condition, trueValue, falseValue)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `condition` | Boolean | Yes | Expression that evaluates to true/false |
| `trueValue` | Any | Yes | Value to return if condition is true |
| `falseValue` | Any | Yes | Value to return if condition is false |

---

## Returns

**Type:** Any (type of trueValue or falseValue)

Returns `trueValue` if condition is true, `falseValue` otherwise.

---

## Examples

### Basic Usage


{% raw %}
```handlebars
{{if(model.isActive, 'Active', 'Inactive')}}
<!-- Output: Active (if isActive is true) -->
```
{% endraw %}


### Conditional CSS Class


{% raw %}
```handlebars
<div class="{{if(model.isPremium, 'premium', 'standard')}}">
  <h3>{{model.name}}</h3>
</div>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    name = "John Doe",
    isPremium = true
});
```

**Output:**
```html
<div class="premium">
  <h3>John Doe</h3>
</div>
```

### With Comparison


{% raw %}
```handlebars
{{if(model.score >= 70, 'Pass', 'Fail')}}
```
{% endraw %}


### Nested Conditions


{% raw %}
```handlebars
{{if(model.age >= 18, if(model.hasLicense, 'Can drive', 'No license'), 'Too young')}}
```
{% endraw %}


### With Special Variables


{% raw %}
```handlebars
{{#each model.items}}
  <tr class="{{if(@index % 2 == 0, 'even-row', 'odd-row')}}">
    <td>{{this.name}}</td>
  </tr>
{{/each}}
```
{% endraw %}


### Avoid Division by Zero


{% raw %}
```handlebars
<p>Average: {{if(model.count > 0, model.total / model.count, 0)}}</p>
```
{% endraw %}


---

## Notes

- Both `trueValue` and `falseValue` are evaluated (no short-circuit)
- Can be nested for complex logic
- Consider using `{% raw %}{{#if}}{% endraw %}` helper for cleaner multi-line conditionals
- Useful for inline conditional values

---

## See Also

- [#if Helper](../helpers/if.md)
- [Comparison Operators](../operators/equality.md)
- [Logical Functions](./index.md#logical-functions)

---
