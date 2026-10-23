---
layout: default
title: "/ (Division)"
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# / : Division Operator
{: .no_toc }

Divide one numeric value by another.

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
{{operand1 / operand2}}
```
{% endraw %}


---

## Precedence

Priority level in expression evaluation (1 = highest, 10 = lowest): **4**

Evaluated after: `^`

Evaluated before: `+`, `-`, `<`, `<=`, `>`, `>=`, `==`, `!=`, `??`, `&&`, `||`

---

## Operands

| Position | Type | Description |
|----------|------|-------------|
| Left | Number | Dividend (value to be divided) |
| Right | Number | Divisor (value to divide by) |

---

## Returns

**Type:** Number (Double or Decimal depending on operands)

The quotient of the left operand divided by the right operand.

---

## Examples

### Average Calculation


{% raw %}
```html 
<p>Average: {{format(model.total / model.count, '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    total = 487.50m,
    count = 5
});
```

**Output:**
```html
<p>Average: $97.50</p>
```

### Unit Price


{% raw %}
```html 
<p>Price per unit: ${{format(model.totalPrice / model.quantity, '0.00')}}</p> 
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    totalPrice = 149.99m,
    quantity = 12
});
```

**Output:**
```html
<p>Price per unit: $12.50</p>
```

### Percentage Calculation


{% raw %}
```html 
<p>Completion: {{format((model.completed / model.total) * 100, '0.0')}}%</p> 
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    completed = 17,
    total = 25
});
```

**Output:**
```html
<p>Completion: 68.0%</p>
```

### Rate Calculation


{% raw %}
```html 
<p>Speed: {{format(model.distance / model.time, '0.0')}} mph</p> 
```
{% endraw %}


### Ratio Comparison


{% raw %}
```html 
<p>Efficiency Ratio: {{format(model.output / model.input, '0.00')}}</p>

{{#if model.output / model.input > 1.5}}
  <span class="excellent">Highly efficient</span>
{{else if model.output / model.input > 1.0}}
  <span class="good">Efficient</span>
{{else}}
  <span class="poor">Needs improvement</span>
{{/if}} 
```
{% endraw %}


---

## Notes

- Works with all numeric types (int, long, double, decimal)
- Result is typically a decimal or double for precision
- Division by zero will throw an error
- Use `round()`, `ceiling()`, or `floor()` to control decimal places
- For integer division (with remainder), use `%` (modulus) operator
- Division has same precedence as multiplication
- Use parentheses to control order of operations

---

## See Also

- [Multiplication Operator](./multiplication)
- [Modulus Operator](./modulus)
- [round Function](../functions/round)
- [ceiling Function](../functions/ceiling)
- [floor Function](../functions/floor)
- [format Function](../functions/format)

---
