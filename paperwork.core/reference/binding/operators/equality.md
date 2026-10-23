---
layout: default
title: == (Equality)
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# == : Equality Operator
{: .no_toc }

Compares two values for equality. Returns `true` if values are equal, `false` otherwise.

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
{{operand1 == operand2}}
```
{% endraw %}


---

## Operands

| Position | Type | Description |
|----------|------|-------------|
| Left | Any | First value to compare |
| Right | Any | Second value to compare |

---

## Returns

**Type:** Boolean

`true` if the operands are equal, `false` otherwise.

---

## Examples

### Basic Comparison

{% raw %}
```

{{5 == 5}}
<!-- Output: true -->

{{5 == 3}}
<!-- Output: false --> 
```
{% endraw %}


### String Comparison


{% raw %}
```html 
{{#if model.status == 'active'}}
  <span class="badge-active">Active</span>
{{/if}} 
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    status = "active"
});
```

### Number Comparison


{% raw %}
```html 
{{#if model.quantity == 0}}
  <span class="out-of-stock">Out of Stock</span>
{{else}}
  <span>{{model.quantity}} in stock</span>
{{/if}} 
```
{% endraw %}


### Boolean Comparison


{% raw %}
```html 
{{#if model.isPremium == true}}
  <span class="premium-badge">Premium Member</span>
{{/if}} 
```
{% endraw %}


### Multiple Conditions


{% raw %}
```html 
{{#if model.role == 'admin'}}
  <button>Delete</button>
{{else if model.role == 'editor'}}
  <button>Edit</button>
{{else if model.role == 'viewer'}}
  <button>View</button>
{{/if}} 
```
{% endraw %}


### With #each


{% raw %}
```html 
{{#each model.products}}
  {{#if this.category == 'Electronics'}}
    <div class="electronics-product">
      <h3>{{this.name}}</h3>
    </div>
  {{/if}}
{{/each}} 
```
{% endraw %}


---

## Precedence

Priority level in expression evaluation: **7** (after comparison operators)

---

## Notes

- String comparisons are **case-sensitive**: `"Hello" == "hello"` is `false`
- `null == null` returns `true`
- Comparing `null` to any non-null value returns `false`
- Numbers and strings can be compared (automatic type conversion)
- Boolean values: `true` != `false`

---

## See Also

- [Inequality (!=)](./inequality)
- [Greater Than (>)](./greaterthan)
- [Less Than (<)](./lessthan)
- [#if Helper](../helpers/if)

---
