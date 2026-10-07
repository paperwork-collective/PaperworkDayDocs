---
layout: default
title: monthOf
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# monthOf() : Extract Month from Date
{: .no_toc }

Extract the month component from a datetime value as a number (1-12).

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
monthOf(date)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | DateTime | Yes | The datetime to extract the month from |

---

## Returns

**Type:** Number (Integer)

The month as a number from 1 (January) to 12 (December).

---

## Examples

### Display Month Number


{% raw %}
```handlebars
<p>Month: {{monthOf(model.date)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    date = new DateTime(2024, 3, 15)
};
```

**Output:**
```html
<p>Month: 3</p>
```

### Quarter Calculation


{% raw %}
```handlebars
<p>Quarter: Q{{ceiling(monthOf(model.date) / 3)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    date = new DateTime(2024, 8, 15)
};
```

**Output:**
```html
<p>Quarter: Q3</p>
```

### Seasonal Classification


{% raw %}
```handlebars
<p>Season:
{{#if (monthOf(model.date) >= 3 && monthOf(model.date) <= 5)}}
  Spring
{{else if (monthOf(model.date) >= 6 && monthOf(model.date) <= 8)}}
  Summer
{{else if (monthOf(model.date) >= 9 && monthOf(model.date) <= 11)}}
  Fall
{{else}}
  Winter
{{/if}}
</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    date = new DateTime(2024, 7, 15)
};
```

**Output:**
```html
<p>Season: Summer</p>
```

### Sales by Month


{% raw %}
```handlebars
<h3>Monthly Sales</h3>
{{#each model.sales}}
  <p>Month {{monthOf(this.date)}}: ${{this.amount}}</p>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    sales = new[] {
        new { date = new DateTime(2024, 1, 15), amount = 5000 },
        new { date = new DateTime(2024, 2, 15), amount = 6000 },
        new { date = new DateTime(2024, 3, 15), amount = 5500 }
    }
};
```

**Output:**
```html
<h3>Monthly Sales</h3>
<p>Month 1: $5000</p>
<p>Month 2: $6000</p>
<p>Month 3: $5500</p>
```

---

## Notes

- Returns numeric value 1-12
- 1 = January, 12 = December
- Time component is ignored
- For month names, use `format(date, 'MMMM')` or `format(date, 'MMM')`
- Combine with conditional logic for seasonal or quarterly grouping
- Use with `yearOf()` and `dayOfMonth()` for complete date parsing

---

## See Also

- [yearOf Function](./yearOf.md)
- [dayOfMonth Function](./dayOfMonth.md)
- [addMonths Function](./addMonths.md)
- [format Function](./format.md)

---
