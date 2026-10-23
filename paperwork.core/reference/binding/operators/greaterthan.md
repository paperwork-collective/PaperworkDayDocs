---
layout: default
title: "> (Greater Than)"
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# > : Greater Than Operator
{: .no_toc }

Compare if the left value is greater than the right value.

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

## Syntax


{% raw %}
``` 
{{operand1 > operand2}}
``` 
{% endraw %}

---

## Precedence

Priority level in expression evaluation (1 = highest, 10 = lowest): **6**

Evaluated after: `^`, `*`, `/`, `%`, `+`, `-`

Evaluated before: `==`, `!=`, `??`, `&&`, `||`

---

## Operands

| Position | Type | Description |
|----------|------|-------------|
| Left | Comparable | First value to compare |
| Right | Comparable | Second value to compare |

---

## Returns

**Type:** Boolean

`true` if left operand is greater than right operand, `false` otherwise.

---

## Examples

### Adult Verification


{% raw %}
```html 
{{#if model.age > 18}}
  <div class="access-granted">
    <p>Age verified: {{model.age}} years old</p>
  </div>
{{else}}
  <div class="access-denied">
    <p>Must be 18 or older</p>
  </div>
{{/if}} 
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    age = 25
});
```

**Output:**
```html
<div class="access-granted">
  <p>Age verified: 25 years old</p>
</div>
```

### High Value Order


{% raw %}
```html 
{{#if model.orderTotal > 1000}}
  <div class="vip-order">
    <strong>High-Value Order</strong>
    <p>Expedited processing approved</p>
  </div>
{{/if}} 
```
{% endraw %}


### Stock Availability


{% raw %}
```html 
{{#if model.quantity > 0}}
  <p>{{model.quantity}} in stock</p>
{{else}}
  <p class="disabled" >Out of Stock</button>
{{/if}} 
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    quantity = 15
});
```

**Output:**
```html
<p>15 in stock</p>
```

### Performance Indicator


{% raw %}
```html 
{{#if model.revenue > model.target}}
  <div class="success">
    <h3>Target Exceeded!</h3>
    <p>Revenue: ${{format(model.revenue, 'N0')}}</p>
    <p>Target: ${{format(model.target, 'N0')}}</p>
    <p>Surplus: ${{format(model.revenue - model.target, 'N0')}}</p>
  </div>
{{/if}} 
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    revenue = 125000m,
    target = 100000m
});
```

**Output:**
```html
<div class="success">
  <h3>Target Exceeded!</h3>
  <p>Revenue: $125,000</p>
  <p>Target: $100,000</p>
  <p>Surplus: $25,000</p>
</div>
```

### Temperature Warning


{% raw %}
```html 
{{#if model.temperature > 100}}
  <span class="danger">⚠ High Temperature Alert: {{model.temperature}}°F</span>
{{else if model.temperature > 80}}
  <span class="warning">Warm: {{model.temperature}}°F</span>
{{else}}
  <span class="normal">{{model.temperature}}°F</span>
{{/if}} 
```
{% endraw %}


---

## Notes

- Works with numbers, dates, and comparable types
- String comparison is case-sensitive and uses lexicographic ordering
- Date comparison compares chronological order
- Cannot compare incompatible types
- Commonly used with `{% raw %}{{#if}}{% endraw %}` for conditional rendering
- Can be combined with logical operators (`&&`, `||`)
- For "greater than or equal", use `>=` operator

---

## See Also

- [Greater Than or Equal Operator](./greaterorequal.md)
- [Less Than Operator](./lessthan.md)
- [Less Than or Equal Operator](./lessorequal.md)
- [#if Helper](../helpers/if.md)
- [Equality Operator](./equality.md)

---
