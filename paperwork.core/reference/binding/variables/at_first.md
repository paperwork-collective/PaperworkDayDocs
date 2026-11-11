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
render_with_liquid: false
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


```
{{@first}}
{{#if @first}}...{{/if}}
```


---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    items = new[] { new { name = "Widget" }, new { name = "Gadget" }, new { name = "Gizmo" } }
});
```

**Template:**


```html
{{#each model.items}}
    {{#if !@first}}<span>, </span>{{/if}}
    <span>{{this.name}}</span>
{{/each}}
```


**Output:**

```
Widget, Gadget, Gizmo
```

---

## Notes

- Equivalent to `@index == 0`.
- Works in output, in `{{#if}}` conditions, in functions such as `{{if(@last, '.', ',')}}`, and in CSS expressions inside the loop.
- With a single item, `@first` and `@last` are both `true`. Outside a loop both are `false`. In nested loops each refers to the innermost loop.
- Useful for separators, borders and headings that only belong on the first item.

{: .note }
> `@first` is added in Paperwork.Core 9.8. In earlier versions use `{{#if @index == 0}}` instead.

---

## See Also

- [@index](at_index)
- [@last](at_last)
- [each](/paperwork.core/reference/binding/helpers/each)
