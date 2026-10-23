---
layout: default
title: ". (Property Access)"
parent: Values & Navigation
parent_url: /paperwork.core/reference/binding/navigation/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 2
---

# . : Property Access
{: .no_toc }

Reads a property of a value, and can be chained to walk down through nested objects.

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
{{value.property}}
{{value.property.property}}
```
{% endraw %}

---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    customer = new {
        name = "Acme",
        address = new { city = "Leeds" }
    }
});
```

**Template:**

{% raw %}
```html
<p>{{model.customer.name}}</p>
<p>{{model.customer.address.city}}</p>
```
{% endraw %}

**Output:**

```
Acme
Leeds
```

---

## Notes

- Works with C# objects, dictionaries, and JSON data (`WithData` with a JSON string or file).
- Property names are case sensitive, and must match the data exactly.
- If any part of the path is missing or null, the result is null and nothing is output - there is no error. Use `??` for a default.
- A leading `.` refers to the current item - see [this](this).
- Combine with an [indexer](indexer) to read an item in a collection: {% raw %}`{{model.items[0].name}}`{% endraw %}.

---

## See Also

- [Indexer](indexer)
- [this and .](this)
