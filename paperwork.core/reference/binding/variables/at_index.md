---
layout: default
title: "@index"
parent: Loop Variables
parent_url: /paperwork.core/reference/binding/variables/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 1
---

# @index : Item Position
{: .no_toc }

The zero-based position of the current item in a `{{#each}}` loop.

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
{{@index}}
```
{% endraw %}

---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    items = new[] { new { name = "Widget" }, new { name = "Gadget" } }
});
```

**Template:**

{% raw %}
```html
{{#each model.items}}
    <p>{{@index + 1}}. {{this.name}}</p>
    {{#if @index == 0}}
        <p>(our best seller)</p>
    {{/if}}
{{/each}}
```
{% endraw %}

**Output:**

```
1. Widget
(our best seller)
2. Gadget
```

---

## Notes

- `@index` starts at `0`; add `1` for a count that starts at 1.
- It can be used in any expression in the loop - calculations, conditions and attributes, e.g. {% raw %}`<rect y='{{@index * 30}}' />`{% endraw %}.
- In a nested loop, `@index` is the position in the innermost loop.

---

## See Also

- [@first](at_first)
- [@last](at_last)
- [each](/paperwork.core/reference/binding/helpers/each)
