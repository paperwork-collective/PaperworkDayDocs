---
layout: default
title: "[] (Indexer)"
parent: Values & Navigation
parent_url: /paperwork.core/reference/binding/navigation/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 3
---

# [] : Indexer
{: .no_toc }

Reads an item from an array or list by its position, or from a dictionary by its key.

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
{{collection[index]}}
{{dictionary["key"]}}
{{dictionary[expression]}}
```
{% endraw %}

---

## Arrays and lists

The index is zero based - the first item is `[0]`.

**Data:**

```csharp
builder.WithData("model", new {
    items = new[] {
        new { name = "Widget", price = 10.0 },
        new { name = "Gadget", price = 15.5 }
    }
});
```

**Template:**

{% raw %}
```html
<p>{{model.items[0].name}}</p>
<p>{{model.items[1].price}}</p>
```
{% endraw %}

**Output:**

```
Widget
15.5
```

---

## Dictionaries

A dictionary is read with its key in quotes, or with an expression that gives the key.

**Data:**

```csharp
builder.WithData("model", new {
    currency = "EUR",
    rates = new Dictionary<string, double> { ["GBP"] = 1.0, ["EUR"] = 1.17 }
});
```

**Template:**

{% raw %}
```html
<p>{{model.rates["GBP"]}}</p>
<p>{{model.rates[model.currency]}}</p>
```
{% endraw %}

**Output:**

```
1
1.17
```

JSON objects can be read in the same way.

---

## Notes

- An index outside the collection, or a key that is not in the dictionary, gives no value rather than an error.
- A key in quotes reads a dictionary or JSON object. It does not read a property of a C# object - use the [property access](dot) `.` for those.
- The index can be any expression, e.g. {% raw %}`{{model.items[count(model.items) - 1].name}}`{% endraw %} for the last item.

---

## See Also

- [Property access](dot)
- [Collection functions](/paperwork.core/reference/binding/functions/)
