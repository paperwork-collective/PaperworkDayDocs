---
layout: default
title: "this and ."
parent: Values & Navigation
parent_url: /paperwork.core/reference/binding/navigation/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 4
---

# this and . : The Current Item
{: .no_toc }

Inside a loop or `with` block, `this` - or a leading `.` - refers to the current item.

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
{{this}}
{{this.property}}
{{.property}}
{{.}}
```
{% endraw %}

---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    tags = new[] { "urgent", "finance" },
    items = new[] {
        new { name = "Widget", price = 10.0 },
        new { name = "Gadget", price = 15.5 }
    }
});
```

**Template:**

{% raw %}
```html
{{#each model.tags}}
    <span>{{this}}</span>
{{/each}}

{{#each model.items}}
    <p>{{this.name}} - {{.price}}</p>
{{/each}}
```
{% endraw %}

**Output:**

```
urgent finance
Widget - 10
Gadget - 15.5
```

---

## Notes

- `this.name` and `.name` are the same.
- A plain name is also looked up on the current item, so inside a loop {% raw %}`{{name}}`{% endraw %} usually works too. `this` makes it clear, and avoids a clash with a data name of the same name.
- Outside any loop or `with` block, `this` is the document's data.

---

## See Also

- [each](/paperwork.core/reference/binding/helpers/each)
- [with](/paperwork.core/reference/binding/helpers/with)
- [Parent ../](parent)
