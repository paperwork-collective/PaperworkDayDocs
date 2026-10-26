---
layout: default
title: mean
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# mean() : Calculate Mean (Average)
{: .no_toc }

Calculate the arithmetic mean of numeric values in a collection. This is a mathematical synonym for the `average()` function.

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
mean(collection)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | Array of Numbers | Yes | The collection of numeric values |

---

## Returns

**Type:** Number (Decimal)

The arithmetic mean of all values. Returns null for empty collections.

---

## Examples

### Basic Mean Calculation


{% raw %}
```handlebars
<p>Mean temperature: {{round(mean(model.temperatures), 1)}}°F</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    temperatures = new[] { 72, 68, 75, 70, 73 }
});
```

**Output:**
```html
<p>Mean temperature: 71.6°F</p>
```

### Statistical Summary


{% raw %}
```handlebars
<h3>Data Analysis</h3>
<p>Mean: {{round(mean(model.values), 2)}}</p>
<p>Median: {{round(median(model.values), 2)}}</p>
<p>Min: {{min(model.values)}}</p>
<p>Max: {{max(model.values)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    values = new[] { 10, 15, 20, 25, 30, 35, 40 }
});
```

**Output:**
```html
<h3>Data Analysis</h3>
<p>Mean: 25.00</p>
<p>Median: 25.00</p>
<p>Min: 10</p>
<p>Max: 40</p>
```

### Comparing Mean and Median


{% raw %}
```handlebars
<h3>Score Distribution</h3>
<p>Mean score: {{round(mean(model.scores), 1)}}</p>
<p>Median score: {{round(median(model.scores), 1)}}</p>
{{#if (abs(mean(model.scores) - median(model.scores)) > 5)}}
  <p style="color: orange;">Note: Large difference suggests outliers in data</p>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    scores = new[] { 85, 87, 90, 92, 95, 45 }  // 45 is an outlier
});
```

**Output:**
```html
<h3>Score Distribution</h3>
<p>Mean score: 82.3</p>
<p>Median score: 88.5</p>
<p style="color: orange;">Note: Large difference suggests outliers in data</p>
```

### Property-Based Mean


{% raw %}
```handlebars
<p>Mean rating: {{round(mean(eachOf(model.reviews, 'rating')), 1)}} stars</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    reviews = new[] {
        new { author = "Alice", rating = 5 },
        new { author = "Bob", rating = 4 },
        new { author = "Charlie", rating = 5 },
        new { author = "Diana", rating = 3 }
    }
});
```

**Output:**
```html
<p>Mean rating: 4.2 stars</p>
```

---

## Notes

- Identical functionality to `average()` function
- Mathematical terminology preferred in statistical contexts
- Returns null for empty or null collections
- All items must be numeric
- Result is a decimal (use `round()` for formatting)
- Formula: sum of all values divided by count
- For property-based means, combine with `eachOf()`: `mean(eachOf(items, 'property'))`
- Useful for:
  - Statistical reports
  - Scientific calculations
  - Academic grading
  - Data analysis
  - Quality metrics
- Sensitive to outliers (extreme values affect the result)
- Consider using `median()` when outliers are present
- Use `average()` for more intuitive business contexts

---

## See Also

- [average Function](./average.md)
- [median Function](./median.md)
- [sum Function](./sum.md)
- [mode Function](./mode.md)

---
