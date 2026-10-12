---
layout: default
title: "% (Modulus)"
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# % : Modulus Operator
{: .no_toc }

Calculate the remainder after dividing one number by another.

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
{{operand1 % operand2}}
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
| Right | Number | Divisor (modulus value) |

---

## Returns

**Type:** Number (same type as operands)

The remainder after dividing the left operand by the right operand.

---

## Examples

### Even/Odd Detection


{% raw %}
```html 
{{#each model.items}}
  <div class="{{if(@index % 2 == 0, 'even', 'odd')}}">
    {{this.name}}
  </div>
{{/each}} 
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    items = new[] {
        new { name = "Item 1" },
        new { name = "Item 2" },
        new { name = "Item 3" },
        new { name = "Item 4" }
    }
};
```

**Output:**
```html
<div class="even">Item 1</div>
<div class="odd">Item 2</div>
<div class="even">Item 3</div>
<div class="odd">Item 4</div>
```

### Alternating Row Colors


{% raw %}
```html 
<table>
{{#each model.products}}
  <tr style="background-color: {{if(@index % 2 == 0, '#f9f9f9', '#ffffff')}}">
    <td>{{this.name}}</td>
    <td>${{this.price}}</td>
  </tr>
{{/each}} 
</table>
```
{% endraw %}


### Cycle Through Values


{% raw %}
```html 
{{#each model.items}}
  <!-- Cycle through 3 colors -->
  <div class="color-{{@index % 3}}">
    {{this.text}}
  </div>
{{/each}} 
```
{% endraw %}


### Check Divisibility


{% raw %}
```html 
{{#if model.quantity % model.packSize == 0}}
  <p>Perfect fit: {{model.quantity / model.packSize}} complete packs</p>
{{else}}
  <p>{{format(model.quantity / model.packSize, '0')}} packs plus {{model.quantity % model.packSize}} extra units</p>
{{/if}} 
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    quantity = 47,
    packSize = 12
};
```

**Output:**
```html
<p>3 packs plus 11 extra units</p>
```

### Grid Layout Column Wrapping


{% raw %}
```html 
{{#each model.images}}
  {{#if @index % 3 == 0 &amp;&amp; @index > 0}}
    <!-- Start new row every 3 items -->
    </div><div class="row">
  {{/if}}
  <img src="{{this.url}}" />
{{/each}} 
```
{% endraw %}


---

## Notes

- Works with all numeric types (int, long, double, decimal)
- Returns the remainder after division
- Common use: determining if number is even (`n % 2 == 0`) or odd (`n % 2 == 1`)
- Useful for alternating patterns in loops
- Can cycle through N values using `index % N`
- Modulus by zero will throw an error
- Has same precedence as multiplication and division

---

## See Also

- [Division Operator](./division)
- [Equality Operator](./equality)
- [#each Helper](../helpers/each)
- [if Function](../functions/if)

---
