---
layout: default
title: keys
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# keys() : Keys of a Dictionary or Object
{: .no_toc }

Returns the keys of a dictionary, or the names of the properties of an object, as an array of text values that can be counted, sorted and enumerated.

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
keys(object)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object` | Dictionary, object or JSON object | Yes | The dictionary or object to get the keys of |

---

## Returns

**Type:** Array of text

- A `Dictionary<,>` (or any `IDictionary` or read-only dictionary) returns its keys, in the order the dictionary enumerates them. Keys that are not text, such as numbers, are converted to text.
- A JSON object (Newtonsoft `JObject` or `System.Text.Json`) returns the property names, in the order they are in the JSON.
- Any other object returns the names of its public properties.
- A `null` value, text, a number, or an array or list has no keys, and returns an empty array.

---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    prices = new Dictionary<string, decimal> {
        { "Widget", 9.50m }, { "Gizmo", 3.25m }, { "Gadget", 14.00m }
    }
});
```

### List the keys

{% raw %}
```handlebars
<p>{{join(keys(model.prices), ', ')}}</p>
```
{% endraw %}

**Output:**
```html
<p>Widget, Gizmo, Gadget</p>
```

### Sort the keys

Use `.` to sort the keys themselves, and `'desc'` as the third parameter for descending order.

{% raw %}
```handlebars
{{#each sortBy(keys(model.prices), .)}}
  <p>{{this}}: {{model.prices[this]}}</p>
{{/each}}
```
{% endraw %}

**Output:**
```html
<p>Gadget: 14.00</p>
<p>Gizmo: 3.25</p>
<p>Widget: 9.50</p>
```

### Check the number of entries

{% raw %}
```handlebars
{{#if count(keys(model.prices)) > 2}}
  <p>{{count(keys(model.prices))}} prices</p>
{{else}}
  <p>Not enough prices</p>
{{/if}}
```
{% endraw %}

### Property names of an object

{% raw %}
```handlebars
<p>{{join(keys(model.person), ', ')}}</p>
```
{% endraw %}

With `model.person` as `new { name = "Ann", age = 30 }` this outputs `name, age`.

---

## Notes

- To loop over the entries in their own order, with the value as `this`, use `{% raw %}{{#each model.prices}}{% endraw %}` and [`@key`](../variables/at_key). Use `keys()` when the keys need to be sorted, counted or tested first.
- Takes exactly one parameter.
- Added in Paperwork.Core 9.8.

---

## See Also

- [@key](../variables/at_key)
- [sortBy](./sortBy)
- [count](./count)
- [join](./join)
