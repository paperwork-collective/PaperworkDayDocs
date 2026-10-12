---
layout: default
title: + (Addition)
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# + : Addition Operator
{: .no_toc }

Adds two numeric values together. Or joins two string values together.

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
{{operand1 + operand2}}
```
{% endraw %}


---

## Operands

| Position | Type | Description |
|----------|------|-------------|
| Left | Number | First value to add |
| Right | Number | Second value to add |

---

## Returns

**Type:** Number (same type as operands, or promoted type)

The sum of the two operands.

---

## Examples

### Basic Addition


{% raw %}
```
{{5 + 3}}
<!-- Output: 8 -->
```
{% endraw %}


### With Variables


{% raw %}
```html
<p>Subtotal: ${{model.price}}</p>
<p>Tax: ${{model.tax}}</p>
<p>Total: ${{model.price + model.tax}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    price = 99.99m,
    tax = 8.00m
};
```

**Output:**
```html
<p>Subtotal: $99.99</p>
<p>Tax: $8.00</p>
<p>Total: $107.99</p>
```

### Multiple Additions


{% raw %}
```html
<p>Total: {{model.base + model.shipping + model.tax}}</p>
```
{% endraw %}


### With Formatting

{% raw %}
```html

<p>Grand Total: {{format(model.subtotal + model.tax, 'C2')}}</p>
```
{% endraw %}


### In #each Loop

{% raw %}
```

{{#each model.items}}
  <p>Item {{@index + 1}}: {{this.name}}</p>
{{/each}}
```
{% endraw %}


---

## Precedence

Priority level in expression evaluation: **5** (after *, /, %)

---

## Notes

- Works with `int`, `long`, `double`, `decimal` types
- Works with strings, if, and only if, the first value is a string (e.g. 'item_' + index() = 'item_1`
- Mixed types are automatically converted (e.g., `int + double` = `double`)
- Left-to-right associativity: `a + b + c` = `(a + b) + c`
- Use parentheses to control order: `(a + b) * c`

---

## See Also

- [Subtraction (-)](./subtraction)
- [Multiplication (*)](./multiplication)
- [Operator Precedence](./index.html#operator-precedence)

---
