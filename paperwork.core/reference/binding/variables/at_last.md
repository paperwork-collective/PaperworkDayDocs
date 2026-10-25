---
layout: default
title: "@last"
parent: Loop Variables
parent_url: /paperwork.core/reference/binding/variables/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 3
---

# @last : Last Item
{: .no_toc }

`true` for the last item in a `{{#each}}` loop, and `false` for the others.

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
{{@last}}
{{#if @last}}...{{/if}}
```
{% endraw %}

---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    items = new[] { new { name = "Widget" }, new { name = "Gadget" }, new { name = "Gizmo" } }
});
```

**Template:**

{% raw %}
```html
{{#each model.items}}
    <span>{{this.name}}</span>
    {{#if !@last}}<span>, </span>{{/if}}
{{/each}}
```
{% endraw %}

**Output:**

```
Widget, Gadget, Gizmo
```

---

## Notes

- Equivalent to `@index == count(collection) - 1`.
- Works in output, in `{{#if}}` conditions, in functions such as {% raw %}`{{if(@last, '.', ',')}}`{% endraw %}, and in CSS expressions inside the loop.
- With a single item, `@first` and `@last` are both `true`. Outside a loop both are `false`. In nested loops each refers to the innermost loop.
- Useful for separators, borders and headings that only belong on the last item.

{: .note }
> `@last` is added in Paperwork.Core 9.8. In earlier versions use {% raw %}`{{#if @index == count(model.items) - 1}}`{% endraw %} instead.

---

## See Also

- [@index](at_index)
- [@first](at_first)
- [each](/paperwork.core/reference/binding/helpers/each)
