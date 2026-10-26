---
layout: default
title: eachOf
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# eachOf() : Extract a Property from Every Item
{: .no_toc }

Extract a property (or the result of an expression) from every item in a collection, returning a new array of the values.

Null values, empty strings and `false` are left out of the result.

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
eachOf(collection, propertyName)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collection` | Array/Collection | Yes | The collection of objects |
| `propertyName` | String or path | Yes | The property to read from each item - quoted (`'name'`, `'owner.city'`, from 9.8) or as a path (`.name`) |

---

## Returns

**Type:** Array

An array containing the values of the specified property from each item.

---

## Examples

### Extract Property Values


{% raw %}
```handlebars
<p>Product names: {{join(eachOf(model.products, 'name'), ', ')}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    products = new[] {
        new { name = "Widget A", price = 15.50 },
        new { name = "Widget B", price = 22.00 },
        new { name = "Widget C", price = 8.75 }
    }
});
```

**Output:**
```html
<p>Product names: Widget A, Widget B, Widget C</p>
```

### Calculate Total from Property


{% raw %}
```handlebars
<p>Total price: ${{sum(eachOf(model.items, 'price'))}}</p>
<p>Average price: ${{round(average(eachOf(model.items, 'price')), 2)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new[] {
        new { name = "Item A", price = 10.00, quantity = 2 },
        new { name = "Item B", price = 15.50, quantity = 1 },
        new { name = "Item C", price = 8.25, quantity = 3 }
    }
});
```

**Output:**
```html
<p>Total price: $33.75</p>
<p>Average price: $11.25</p>
```

### Extract IDs for Display


{% raw %}
```handlebars
<p>Order IDs: {{join(eachOf(model.orders, 'id'), ', ')}}</p>
<p>Total orders: {{count(eachOf(model.orders, 'id'))}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    orders = new[] {
        new { id = "ORD001", customer = "Alice", total = 150.00 },
        new { id = "ORD002", customer = "Bob", total = 200.00 },
        new { id = "ORD003", customer = "Charlie", total = 175.50 }
    }
});
```

**Output:**
```html
<p>Order IDs: ORD001, ORD002, ORD003</p>
<p>Total orders: 3</p>
```

### Statistical Analysis


{% raw %}
```handlebars
<h3>Sales Performance</h3>
<p>Total sales: ${{sum(eachOf(model.sales, 'amount'))}}</p>
<p>Average sale: ${{round(average(eachOf(model.sales, 'amount')), 2)}}</p>
<p>Highest sale: ${{max(eachOf(model.sales, 'amount'))}}</p>
<p>Lowest sale: ${{min(eachOf(model.sales, 'amount'))}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    sales = new[] {
        new { date = "2024-03-01", amount = 1250.00 },
        new { date = "2024-03-02", amount = 1580.50 },
        new { date = "2024-03-03", amount = 1420.00 },
        new { date = "2024-03-04", amount = 1890.25 }
    }
});
```

**Output:**
```html
<h3>Sales Performance</h3>
<p>Total sales: $6140.75</p>
<p>Average sale: $1535.19</p>
<p>Highest sale: $1890.25</p>
<p>Lowest sale: $1250</p>
```

### Nested Property Collection


{% raw %}
```handlebars
{{#each model.teams}}
  <h4>{{this.name}}</h4>
  <p>Members: {{join(eachOf(this.members, 'name'), ', ')}}</p>
  <p>Total experience: {{sum(eachOf(this.members, 'yearsExperience'))}} years</p>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    teams = new[] {
        new {
            name = "Development",
            members = new[] {
                new { name = "Alice", yearsExperience = 5 },
                new { name = "Bob", yearsExperience = 3 }
            }
        },
        new {
            name = "Design",
            members = new[] {
                new { name = "Charlie", yearsExperience = 7 },
                new { name = "Diana", yearsExperience = 4 }
            }
        }
    }
});
```

**Output:**
```html
<h4>Development</h4>
<p>Members: Alice, Bob</p>
<p>Total experience: 8 years</p>
<h4>Design</h4>
<p>Members: Charlie, Diana</p>
<p>Total experience: 11 years</p>
```

---

## Notes

- Returns empty array if collection is null or empty
- Property must exist on all items (or be null)
- Case-sensitive property names
- Does not modify original collection
- Essential for aggregation operations on object collections
- Useful for:
  - Extracting values for calculations
  - Creating comma-separated lists
  - Statistical operations on properties
  - Data transformation pipelines
- Often combined with:
  - `sum()` - total property values
  - `average()` - average property values
  - `min()`/`max()` - find extremes
  - `join()` - create delimited string
  - `count()` - count extracted values
- Alternative specific functions exist: `sumOf()`, `averageOf()`, `minOf()`, `maxOf()`

---

## See Also

- [sumOf Function](./sumOf.md)
- [averageOf Function](./averageOf.md)
- [join Function](./join.md)
- [#each Helper](../helpers/each.md)

---
