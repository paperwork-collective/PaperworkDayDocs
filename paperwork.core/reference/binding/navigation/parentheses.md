---
layout: default
title: "( ) (Parentheses)"
parent: Values & Navigation
parent_url: /paperwork.core/reference/binding/navigation/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 6
---

# ( ) : Parentheses
{: .no_toc }

Groups part of an expression so it is evaluated first, before the operators around it.

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
{{(expression) operator value}}
```
{% endraw %}

---

## Examples

Without parentheses, operators are evaluated by [precedence](/paperwork.core/reference/binding/operators/) - multiplication before addition.

**Data:**

```csharp
builder.WithData("model", new { price = 10, shipping = 5, qty = 2 });
```

**Template:**

{% raw %}
```html
<p>{{(model.price + model.shipping) * model.qty}}</p>
<p>{{model.price + model.shipping * model.qty}}</p>
<p>{{(model.qty > 1) &amp;&amp; (model.price &lt; 20)}}</p>
```
{% endraw %}

**Output:**

```
30
20
True
```

---

## Notes

- Parentheses can be nested: {% raw %}`{{((a + b) * c) / d}}`{% endraw %}.
- Use them to make comparisons and calculations clear, even where the precedence would give the same result.
- In an attribute value, `<`, `>` and `&` are written `&lt;`, `&gt;` and `&amp;`.
- Parentheses after a function name are the function's arguments, e.g. {% raw %}`{{round(model.price * 1.2, 2)}}`{% endraw %}.

---

## See Also

- [Operators](/paperwork.core/reference/binding/operators/)
- [Functions](/paperwork.core/reference/binding/functions/)
