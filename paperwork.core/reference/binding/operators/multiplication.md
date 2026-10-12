---
layout: default
title: "* (Multiplication)"
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# * : Multiplication Operator
{: .no_toc }

Multiply two numeric values together.

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
{{operand1 * operand2}}
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
| Left | Number | First multiplicand |
| Right | Number | Second multiplicand |

---

## Returns

**Type:** Number (Int, Long, Double, or Decimal depending on operands)

The product of the left and right operands.

---

## Examples

### Line Item Total


{% raw %}
```html 
<p>Total: ${{format(model.quantity * model.price, '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    quantity = 5,
    price = 19.99m
};
```

**Output:**
```html
<p>Total: $99.95</p>
```

### Area Calculation


{% raw %}
```html 
<p>Area: {{model.width * model.height}} sq ft</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    width = 12.5,
    height = 8.0
};
```

**Output:**
```html
<p>Area: 100 sq ft</p>
```

### Tax Calculation


{% raw %}
```html 
<p>Subtotal: ${{format(model.price, '0.00')}}</p>
<p>Tax ({{model.taxRate * 100}}%): ${{format(model.price * model.taxRate, '0.00')}}</p>
<p>Total: ${{format(model.price * (1 + model.taxRate), '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    price = 100.00m,
    taxRate = 0.08m
};
```

**Output:**
```html
<p>Subtotal: $100.00</p>
<p>Tax (8%): $8.00</p>
<p>Total: $108.00</p>
```

### Percentage Calculation


{% raw %}
```html 
<p>{{format(model.score / model.total * 100, '0.0')}}% correct</p>
```
{% endraw %}


### Scaling Values


{% raw %}
```html 
<!-- SVG bar chart with scaled heights -->
{{#each model.data}}
  <rect height="{{this.value * model.scaleFactor}}" />
{{/each}} 
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    data = new[] {
        new { value = 50 },
        new { value = 75 },
        new { value = 100 }
    },
    scaleFactor = 2
};
```

---

## Notes

- Works with all numeric types (int, long, double, decimal)
- Result type depends on operand types (follows C# numeric promotion rules)
- Use parentheses to control order of operations
- Multiplication has higher precedence than addition/subtraction
- For exponentiation, use the `^` operator or `pow()` function
- Cannot multiply non-numeric types

---

## See Also

- [Addition Operator](./addition.md)
- [Subtraction Operator](./subtraction.md)
- [Division Operator](./division.md)
- [Power Operator](./power.md)
- [pow Function](../functions/pow.md)

---
