---
layout: default
title: operator_symbol
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding Reference
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# Operator Symbol : Operator Name
{: .no_toc }

---

<details open class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Summary

Brief description of what this operator does.

## Syntax





{% raw %}
```handlebars
{{operand1 operator operand2}}
```
{% endraw %}





---

## Operands

| Position | Type | Description |
|----------|------|-------------|
| Left | Type | Description of left operand |
| Right | Type | Description of right operand |

---

## Returns

Description of what the operator returns.

---

## Examples

### Basic Usage





{% raw %}
```handlebars
{{5 operator 3}}
<!-- Output: result -->
```
{% endraw %}





### With Variables





{% raw %}
```handlebars
<p>Result: {{model.value1 operator model.value2}}</p>
```
{% endraw %}





**Data:**
```csharp
builder.WithData("model", new {
    value1 = 10,
    value2 = 5
});
```

**Output:**
```html
<p>Result: 15</p>
```

### In Conditional





{% raw %}
```handlebars
{{#if model.score operator threshold}}
  <span>Condition met</span>
{{/if}}
```
{% endraw %}





---

## Precedence

Priority level in expression evaluation (1 = highest, 10 = lowest): **N**

---

## Notes

- Type conversion behavior
- Edge cases
- Common uses

---

## See Also

- [Related Operator](./related.md)
- [Operator Precedence](./index.md#operator-precedence)

---
