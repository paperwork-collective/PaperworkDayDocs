---
layout: default
title: padRight
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# padRight() : Pad String on Right
{: .no_toc }

Pad a string on the right side to reach a specified length.

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
padRight(str, totalLength, padChar?)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `str` | String | Yes | The string to pad |
| `totalLength` | Number | Yes | The desired total length |
| `padChar` | String | No | The padding character (default: space) |

---

## Returns

**Type:** String

The padded string.

---

## Examples

### Align Left in Fixed Width


{% raw %}
```handlebars
<pre>
{{#each model.items}}
{{padRight(this.name, 20, ' ')}} ${{format(this.price, '0.00')}}
{{/each}}
</pre>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new[] {
        new { name = "Widget", price = 19.99m },
        new { name = "Gadget", price = 29.99m },
        new { name = "Tool", price = 9.99m }
    }
});
```

**Output:**
```html
<pre>
Widget               $19.99
Gadget               $29.99
Tool                 $9.99
</pre>
```

### Table-Like Formatting


{% raw %}
```handlebars
<pre>
{{padRight('Name', 15, ' ')}} {{padRight('Status', 10, ' ')}} Price
{{#each model.products}}
{{padRight(this.name, 15, ' ')}} {{padRight(this.status, 10, ' ')}} ${{this.price}}
{{/each}}
</pre>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    products = new[] {
        new { name = "Product A", status = "Active", price = "99.99" },
        new { name = "Product B", status = "Sold Out", price = "149.99" }
    }
});
```

**Output:**
```html
<pre>
Name            Status     Price
Product A       Active     $99.99
Product B       Sold Out   $149.99
</pre>
```

### Custom Padding Character


{% raw %}
```handlebars
<p>{{padRight(model.label, 20, '.')}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    label = "Total"
});
```

**Output:**
```html
<p>Total...............</p>
```

### Create Separators


{% raw %}
```handlebars
<div>
  <span>{{model.title}}</span>
  <span>{{padRight('', 40, '-')}}</span>
</div>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    title = "Section Header"
});
```

**Output:**
```html
<div>
  <span>Section Header</span>
  <span>----------------------------------------</span>
</div>
```

---

## Notes

- Pads on the right (adds characters after the string)
- If string is already longer than totalLength, returns unchanged
- Default padding character is space
- Pad character must be a single character
- Useful for formatting tables and aligning text
- For left padding, use `padLeft()`

---

## See Also

- [padLeft Function](./padLeft.md)
- [format Function](./format.md)
- [concat Function](./concat.md)

---
