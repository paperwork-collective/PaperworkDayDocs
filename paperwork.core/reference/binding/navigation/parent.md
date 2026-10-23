---
layout: default
title: "../ (Parent)"
parent: Values & Navigation
parent_url: /paperwork.core/reference/binding/navigation/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 5
---

# ../ : Parent Context
{: .no_toc }

Refers to the enclosing data context - the item one level up from the current `with` block or loop.

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
{{../property}}
```
{% endraw %}

---

## Single level only

`../` moves up **one** level. It cannot be chained - `../../` is not supported. To reach a value further up, use its data name from the top, such as {% raw %}`{{model.title}}`{% endraw %}, which is available everywhere.

---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    title = "Fleet Report",
    groups = new[] {
        new { name = "Vans", vehicles = new[] { "V1", "V2" } }
    }
});
```

**Template:**

{% raw %}
```html
{{#with model}}
    {{#with groups[0]}}
        <h2>{{name}} - part of {{../title}}</h2>
    {{/with}}
{{/with}}

{{#each model.groups}}
    {{#each this.vehicles}}
        <p>{{this}} in {{../name}}</p>
    {{/each}}
{{/each}}
```
{% endraw %}

**Output:**

```
Vans - part of Fleet Report
V1 in Vans
V2 in Vans
```

---

## Notes

- At the outermost `with` block or loop, the enclosing context is the document's data itself, so use the data name directly - {% raw %}`{{model.currency}}`, not `{{../currency}}`{% endraw %}.
- Data names such as `model` never need `../`.

---

## See Also

- [this and .](this)
- [Names](names)
- [each](/paperwork.core/reference/binding/helpers/each)
- [with](/paperwork.core/reference/binding/helpers/with)
