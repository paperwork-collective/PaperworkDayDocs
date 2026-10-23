---
layout: default
title: Binding Operators
parent: Data Binding
parent_url: /paperwork.core/reference/binding/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: true
has_toc: false
---

# Binding Operators Reference
{: .no_toc }

Operators for building expressions in Scryber data binding.

---

## Overview

Binding operators allow you to perform calculations, comparisons, and logical operations within binding expressions. All operators follow standard precedence rules and can be combined in complex expressions.

---

## Arithmetic Operators

Perform mathematical calculations on numeric values.

| Operator | Description | Precedence | Example |
|----------|-------------|------------|---------|
| [+](./addition) | Addition | 5 | `{% raw %}{{model.price + model.tax}}{% endraw %}` |
| [-](./subtraction) | Subtraction | 5 | `{% raw %}{{model.total - model.discount}}{% endraw %}` |
| [*](./multiplication) | Multiplication | 4 | `{% raw %}{{model.quantity * model.price}}{% endraw %}` |
| [/](./division) | Division | 4 | `{% raw %}{{model.total / model.count}}{% endraw %}` |
| [%](./modulus) | Modulus (remainder) | 4 | `{% raw %}{{model.index % 2}}{% endraw %}` |
| [^](./power) | Exponentiation | 3 | `{% raw %}{{model.base ^ model.exponent}}{% endraw %}` |

---

## Comparison Operators

Compare values and return boolean results. Used primarily in `{% raw %}{{#if}}{% endraw %}` conditionals.

| Operator | Description | Precedence | Example |
|----------|-------------|------------|---------|
| [==](./equality) | Equality | 7 | `{% raw %}{{#if model.status == 'active'}}{% endraw %}` |
| [!=](./inequality) | Inequality | 7 | `{% raw %}{{#if model.count != 0}}{% endraw %}` |
| [<](./lessthan) | Less than | 6 | `{% raw %}{{#if model.age < 18}}{% endraw %}` |
| [<=](./lessorequal) | Less than or equal | 6 | `{% raw %}{{#if model.score <= 100}}{% endraw %}` |
| [>](./greaterthan) | Greater than | 6 | `{% raw %}{{#if model.value > 0}}{% endraw %}` |
| [>=](./greaterorequal) | Greater than or equal | 6 | `{% raw %}{{#if model.age >= 18}}{% endraw %}` |

---

## Logical Operators

Combine boolean expressions.

| Operator | Description | Precedence | Example |
|----------|-------------|------------|---------|
| [&&](./and) | Logical AND | 9 | `{% raw %}{{#if model.age >= 18 && model.hasLicense}}{% endraw %}` |
| [\|\|](./or) | Logical OR | 10 | <code>{% raw %}{{#if model.isAdmin &#124;&#124; model.isModerator}}{% endraw %}</code> |

---

## Null Coalescing Operator

Handle null or undefined values with fallback.

| Operator | Description | Precedence | Example |
|----------|-------------|------------|---------|
| [??](./nullcoalesce) | Null coalescing | 8 | `{% raw %}{{model.name ?? 'Unknown'}}{% endraw %}` |

---

## Operator Precedence

Operators are evaluated in order of precedence (1 = highest, 10 = lowest):

1. Parentheses `()`
2. Member access `.`
3. Exponentiation `^`
4. Multiplication, Division, Modulus `*`, `/`, `%`
5. Addition, Subtraction `+`, `-`
6. Comparison `<`, `<=`, `>`, `>=`
7. Equality `==`, `!=`
8. Null coalescing `??`
9. Logical AND `&&`
10. Logical OR `||`

Use parentheses to override precedence:




{% raw %}
```handlebars
{{(model.price + model.tax) * model.quantity}}
```
{% endraw %}





---

## Common Patterns

### Complex Arithmetic





{% raw %}
```handlebars
<p>Subtotal: ${{model.quantity * model.price}}</p>
<p>Tax: ${{(model.quantity * model.price) * model.taxRate}}</p>
<p>Total: ${{(model.quantity * model.price) * (1 + model.taxRate)}}</p>
```
{% endraw %}





### Multiple Comparisons





{% raw %}
```handlebars
{{#if model.age >= 13 && model.age < 20}}
  <span class="teen">Teenager</span>
{{/if}}
```
{% endraw %}





### Null Safety





{% raw %}
```handlebars
<h2>{{model.user.name ?? 'Guest User'}}</h2>
<p>{{model.description ?? 'No description available'}}</p>
```
{% endraw %}





### Conditional Classes





{% raw %}
```handlebars
<div class="item {{#if model.stock > 0}}in-stock{{else}}out-of-stock{{/if}}">
  <p>Price: ${{model.price}}</p>
  {{#if model.discount > 0}}
    <p class="sale">Save: ${{model.price * model.discount}}</p>
  {{/if}}
</div>
```
{% endraw %}





---

## See Also

- [Expression Functions](../functions/) - Built-in functions for data manipulation
- [Handlebars Helpers](../helpers/) - Control flow and context management
- [Expressions Guide](../../learning/02-data-binding/02_expression_functions.html) - Complete guide to expressions

---
