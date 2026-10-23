---
layout: default
title: format
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# format() : Format and Convert Values
{: .no_toc }

Convert values to formatted strings using .NET format strings. Supports numeric, currency, percentage, and date formatting.

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
format(value, format?)
string(value, format?)  // Alias
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Any | Yes | Value to format |
| `format` | String | No | .NET format string |

---

## Returns

**Type:** String

The formatted string representation of the value.

---

## Format Strings

### Numeric Formats

| Format | Description | Example Input | Example Output |
|--------|-------------|---------------|----------------|
| `N0` | Number, no decimals | `1234.56` | `1,235` |
| `N2` | Number, 2 decimals | `1234.56` | `1,234.56` |
| `C0` | Currency, no decimals | `1234.56` | `$1,235` |
| `C2` | Currency, 2 decimals | `1234.56` | `$1,234.56` |
| `P0` | Percentage, no decimals | `0.1234` | `12%` |
| `P2` | Percentage, 2 decimals | `0.1234` | `12.34%` |

### Date Formats

| Format | Example Output |
|--------|----------------|
| `yyyy-MM-dd` | `2024-03-15` |
| `MM/dd/yyyy` | `03/15/2024` |
| `MMMM dd, yyyy` | `March 15, 2024` |
| `HH:mm:ss` | `14:30:45` |

---

## Examples

### Currency Formatting


{% raw %}
```handlebars
<p>Price: {{format(model.price, 'C2')}}</p>
<!-- Output: Price: $19.99 -->
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new { price = 19.99m });
```

### Number Formatting


{% raw %}
```handlebars
<p>Population: {{format(model.population, 'N0')}}</p>
<!-- Output: Population: 1,234,567 -->
```
{% endraw %}


### Percentage Formatting


{% raw %}
```handlebars
<p>Growth: {{format(model.growth, 'P1')}}</p>
<!-- Output: Growth: 15.6% -->
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new { growth = 0.156 });
```

### Date Formatting


{% raw %}
```handlebars
<p>Date: {{format(model.orderDate, 'yyyy-MM-dd')}}</p>
<!-- Output: Date: 2024-03-15 -->

<p>Published: {{format(model.publishDate, 'MMMM dd, yyyy')}}</p>
<!-- Output: Published: March 15, 2024 -->
```
{% endraw %}


### With Calculations


{% raw %}
```handlebars
<p>Total: {{format(model.price * model.quantity, 'C2')}}</p>

<p>Complete: {{format(model.completed / model.total, 'P0')}}</p>
```
{% endraw %}


---

## Notes

- If `format` parameter is omitted, uses default `.ToString()` conversion
- Format strings are culture-sensitive
- Invalid format strings may throw exceptions
- Use with `??` operator for safety: `{% raw %}{{format(value ?? 0, 'C2')}}{% endraw %}`

---

## See Also

- [string Function](./string.md)
- [Conversion Functions](./index.md#conversion-functions)

---
