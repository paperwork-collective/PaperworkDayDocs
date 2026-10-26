---
layout: default
title: collect
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# collect() : Combine Values into One Array
{: .no_toc }

Combine any number of values and collections into a single array. Each collection is added item by item; any other value is added as one item.

To read a property from every item in a collection, use [eachOf()](./eachOf).

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

## Signature

```
collect(value1, value2, ...)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value1, value2, ...` | Any | Yes (at least one) | Values or collections to combine |

---

## Returns

**Type:** Array

A new array with the items of every collection, and every other value, in order.

---

## Examples

### Combining Two Lists

**Data:**
```csharp
builder.WithData("model", new
{
    staff = new[] { "Ann", "Bob" },
    contractors = new[] { "Cy", "Di" }
});
```

**Template:**
{% raw %}
```html
<p>Everyone: {{join(', ', collect(model.staff, model.contractors))}}</p>
<p>Headcount: {{count(collect(model.staff, model.contractors))}}</p>
```
{% endraw %}

**Output:**
```html
<p>Everyone: Ann, Bob, Cy, Di</p>
<p>Headcount: 4</p>
```

### Adding Single Values

{% raw %}
```html
<p>{{join(', ', collect('Manager', model.staff, 'Visitor'))}}</p>
```
{% endraw %}

**Output:**
```html
<p>Manager, Ann, Bob, Visitor</p>
```

### Totals Across Lists

{% raw %}
```html
<p>All costs: {{sum(collect(model.fixedCosts, model.variableCosts))}}</p>
```
{% endraw %}

---

## Notes

- Collections are flattened one level - their items are added, not the collection itself
- The order of the parameters is kept
- Use [eachOf()](./eachOf) to extract a property from each item

---

## See Also

- [eachOf Function](./eachOf)
- [join Function](./join)
- [count Function](./count)
- [sum Function](./sum)
