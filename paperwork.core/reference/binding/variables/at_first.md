---
layout: default
title: "@first"
parent: Loop Variables
parent_url: /paperwork.core/reference/binding/variables/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 2
---

# @first : First Item
{: .no_toc }

`true` for the first item in a `{{#each}}` loop, and `false` for the others.

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
{{@first}}
{{#if @first}}...{{/if}}
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
    {{#if !@first}}<span>, </span>{{/if}}
    <span>{{this.name}}</span>
{{/each}}
```
{% endraw %}

**Output:**

```
Widget, Gadget, Gizmo
```

---

## Notes

- Equivalent to `@index == 0`.
- Useful for separators, borders and headings that only belong on the first item.

{: .note }
> `@first` is added in Paperwork.Core 10. In earlier versions use {% raw %}`{{#if @index == 0}}`{% endraw %} instead.

---

## See Also

- [@index](at_index)
- [@last](at_last)
- [each](/paperwork.core/reference/binding/helpers/each)
