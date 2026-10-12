---
layout: default
title: if
parent: Handlebars Helpers
parent_url: /paperwork.core/reference/binding/helpers/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# #if : Conditional Rendering Helper
{: .no_toc }

Conditionally render content based on expressions. Supports multiple branches with `{% raw %}{{else if}}{% endraw %}` and `{% raw %}{{else}}{% endraw %}`.

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
```handlebars
{{#if condition}}
  <!-- Rendered if condition is true -->
{{else if condition2}}
  <!-- Rendered if condition2 is true -->
{{else}}
  <!-- Rendered if all conditions are false -->
{{/if}}
```
{% endraw %}


---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `condition` | Expression | Yes | Expression that evaluates to true/false |

---

## Supported Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equality | `model.status == 'active'` |
| `!=` | Inequality | `model.count != 0` |
| `<` | Less than | `model.age < 18` |
| `<=` | Less than or equal | `model.score <= 100` |
| `>` | Greater than | `model.value > 0` |
| `>=` | Greater than or equal | `model.age >= 18` |
| `&&` | Logical AND | `model.age >= 18 && model.hasLicense` |
| `||` | Logical OR | `model.isAdmin || model.isModerator` |

---

## Examples

### Simple Condition


{% raw %}
```handlebars
{{#if model.isActive}}
  <span class="badge-active">Active</span>
{{/if}}
```
{% endraw %}


### If-Else


{% raw %}
```handlebars
{{#if model.stock > 0}}
  <button>Add to Cart</button>
{{else}}
  <span class="out-of-stock">Out of Stock</span>
{{/if}}
```
{% endraw %}


### Multiple Conditions


{% raw %}
```handlebars
{{#if model.score >= 90}}
  <span class="grade-a">Excellent (A)</span>
{{else if model.score >= 80}}
  <span class="grade-b">Good (B)</span>
{{else if model.score >= 70}}
  <span class="grade-c">Average (C)</span>
{{else}}
  <span class="grade-f">Needs Improvement (F)</span>
{{/if}}
```
{% endraw %}


### Comparison Operators


{% raw %}
```handlebars
<!-- Equality -->
{{#if model.status == 'approved'}}
  <span>✓ Approved</span>
{{/if}}

<!-- Greater than or equal -->
{{#if model.score >= 70}}
  <p class="pass">Passed</p>
{{/if}}

<!-- Less than -->
{{#if model.stock <= 10}}
  <p class="alert">Low stock warning!</p>
{{/if}}
```
{% endraw %}


### Logical Operators


{% raw %}
```handlebars
<!-- AND (&&) -->
{{#if model.age >= 18 && model.hasLicense}}
  <p>Eligible to drive</p>
{{else}}
  <p>Not eligible to drive</p>
{{/if}}

<!-- OR (||) -->
{{#if model.isAdmin || model.isModerator}}
  <div class="admin-panel">
    <h2>Administration</h2>
  </div>
{{/if}}
```
{% endraw %}


### With #each Context


{% raw %}
```handlebars
{{#each model.users}}
  <div class="user">
    <h3>{{this.name}}</h3>

    {{#if this.role == 'admin'}}
      <span class="badge-admin">Administrator</span>
    {{else if this.role == 'moderator'}}
      <span class="badge-mod">Moderator</span>
    {{else}}
      <span class="badge-user">User</span>
    {{/if}}
  </div>
{{/each}}
```
{% endraw %}


---

## Underlying Implementation

The `{% raw %}{{#if}}{% endraw %}` helper compiles to Scryber's conditional rendering elements:


{% raw %}
```xml
<choose>
  <when data-test="{{condition}}">
    <!-- Content when true -->
  </when>
  <when data-test="{{condition2}}">
    <!-- Content for else if -->
  </when>
  <otherwise>
    <!-- Content for else -->
  </otherwise>
</choose>
```
{% endraw %}


This structure allows Scryber to evaluate conditions at databinding time and only render the matching branch.

---

## Notes

- Expressions are evaluated at databinding time
- **Falsy values**: `false`, `null`, `0`, empty string
- **Truthy values**: everything else
- Use parentheses for complex expressions: `(a && b) || c`
- Cannot use `!` (NOT) operator - use `!=` or reverse logic instead
- Multiple `{% raw %}{{else if}}{% endraw %}` branches are supported
- Only one branch is rendered in the output

---

## See Also

- [else if Helper](./elseif.html)
- [else Helper](./else.html)
- [Comparison Operators](../operators/equality.html)
- [Logical Operators](../operators/and.html)
- [Conditional Rendering Guide](../../learning/02-data-binding/04_conditional_rendering.html)

---
