---
layout: default
title: "@key"
parent: Loop Variables
parent_url: /paperwork.core/reference/binding/variables/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 4
---

# @key : Item Key
{: .no_toc }

The key (or property name) of the current entry when a `{{#each}}` loop iterates a dictionary or an object. For an array or other collection it is the index of the current item.

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
{{@key}}
{{#if @key == 'total'}}...{{/if}}
```
{% endraw %}

---

## Examples

**Data:**

```csharp
builder.WithData("model", new {
    prices = new Dictionary<string, decimal> {
        { "Widget", 9.50m }, { "Gadget", 14.00m }, { "Gizmo", 3.25m }
    }
});
```

**Template:**

{% raw %}
```html
{{#each model.prices}}
    <p>{{@key}}: {{this}}</p>
{{/each}}
```
{% endraw %}

**Output:**

```
Widget: 9.50
Gadget: 14.00
Gizmo: 3.25
```

### Nested loops

Each loop has its own key. When an inner loop ends, `@key` goes back to the key of the outer loop.

{% raw %}
```html
{{#each model.regions}}
    <h3>{{@key}}</h3>
    {{#each this}}
        <p>{{@key}} = {{this}}</p>
    {{/each}}
    <p>Finished {{@key}}</p>
{{/each}}
```
{% endraw %}

Here the last `@key` is the region again, not the last key of the inner loop.

---

## Notes

- Works with `Dictionary<,>` and other `IDictionary` objects, Newtonsoft `JObject` and `System.Text.Json` objects. Entries are in the order the dictionary or object enumerates them.
- For a collection, `@key` is the zero-based index, the same value as [`@index`](at_index).
- `@index`, [`@first`](at_first) and [`@last`](at_last) also work when iterating a dictionary or object.
- Outside any loop `@key` is empty.
- Added in Paperwork.Core 9.8.

---

## See Also

- [@index](at_index)
- [each](/paperwork.core/reference/binding/helpers/each)
