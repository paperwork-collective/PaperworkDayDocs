---
layout: default
title: "? : (Conditional)"
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# ? : Conditional (Ternary) Operator
{: .no_toc }

Choose one of two values depending on a condition, inside a single expression.

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
{{condition ? valueIfTrue : valueIfFalse}}
```
{% endraw %}


---

## Precedence

Priority level in expression evaluation (1 = highest, 10 = lowest): **lowest**, after `||`.

The condition and both values are complete expressions, so `a > 5 && b ? x + 1 : y * 2` reads as `(a > 5 && b) ? (x + 1) : (y * 2)`.

---

## Operands

| Position | Type | Description |
|----------|------|-------------|
| Condition | Any | Decides which value is used |
| Value if true | Any | Used when the condition is true |
| Value if false | Any | Used when the condition is false |

The condition is false when it is null, `false`, `0`, an empty string or the text `'false'`. Anything else is true.

---

## Returns

**Type:** Type of the chosen value

Only the chosen value is evaluated. The other is not.

---

## Examples

### Singular or plural


{% raw %}
```html
<p>{{model.count}} {{model.count == 1 ? 'item' : 'items'}}</p>
```
{% endraw %}


With `model.count` of 1 this gives `1 item`, and with 3 it gives `3 items`.

### Choose a class


{% raw %}
```html
{{#each model.items}}
  <div class="{{this.isActive ? 'active' : 'inactive'}}">{{this.name}}</div>
{{/each}}
```
{% endraw %}


### Chained choices

Chains read from the right, so each `:` takes the next condition:


{% raw %}
```html
<span>{{model.score >= 90 ? 'A' : model.score >= 70 ? 'B' : 'C'}}</span>
```
{% endraw %}


A score of 95 gives `A`, 75 gives `B` and 40 gives `C`.

---

## Notes

- `===` and `!==` are read as `==` and `!=`, so a condition written in the JavaScript style still works.
- The [`if()` function](/paperwork.core/reference/binding/functions/if.html) does the same job as a function call. Use whichever reads better.
- For a block of content rather than a value, use the [#if helper](/paperwork.core/reference/binding/helpers/if.html).
- Quoted text inside an attribute in an XML template may need escaping, such as `&lt;` for `<`.

---

## See Also

- [Null Coalescing Operator](/paperwork.core/reference/binding/operators/nullcoalesce.html)
- [Equality Operator](/paperwork.core/reference/binding/operators/equality.html)
- [Logical AND Operator](/paperwork.core/reference/binding/operators/and.html)
- [if Function](/paperwork.core/reference/binding/functions/if.html)
- [#if Helper](/paperwork.core/reference/binding/helpers/if.html)

---
