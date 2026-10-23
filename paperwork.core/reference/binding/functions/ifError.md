---
layout: default
title: ifError
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# ifError() : Error Handling Expression
{: .no_toc }

Evaluate an expression and return a fallback value if an error occurs. This provides graceful error handling within binding expressions.

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
ifError(expression, fallbackValue)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `expression` | Any | Yes | The expression to evaluate |
| `fallbackValue` | Any | Yes | Value to return if expression causes an error |

---

## Returns

**Type:** Any (matches type of expression or fallbackValue)

Returns the result of `expression` if successful, otherwise returns `fallbackValue` if an error occurs.

---

## Examples

### Safe Division


{% raw %}
```handlebars
<p>Average: {{ifError(model.total / model.count, 0)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    total = 100,
    count = 0  // Would cause division by zero
});
```

**Output:**
```html
<p>Average: 0</p>
```

### Safe Property Access


{% raw %}
```handlebars
{{#each model.items}}
  <p>{{this.name}}: {{ifError(this.details.description, 'No description available')}}</p>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new[] {
        new { name = "Item A", details = (object)new { description = "Description A" } },
        new { name = "Item B", details = (object)null }  // Null details
    }
});
```

**Output:**
```html
<p>Item A: Description A</p>
<p>Item B: No description available</p>
```

### Safe Type Conversion


{% raw %}
```handlebars
<p>Value: {{ifError(int(model.userInput), -1)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    userInput = "not a number"
});
```

**Output:**
```html
<p>Value: -1</p>
```

### Safe Date Parsing


{% raw %}
```handlebars
{{#each model.records}}
  <p>{{this.id}}: {{ifError(format(date(this.dateString), 'yyyy-MM-dd'), 'Invalid date')}}</p>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    records = new[] {
        new { id = "A", dateString = "2024-03-15" },
        new { id = "B", dateString = "not-a-date" }
    }
});
```

**Output:**
```html
<p>A: 2024-03-15</p>
<p>B: Invalid date</p>
```

### Safe Array Access


{% raw %}
```handlebars
<p>First item: {{ifError(model.items[0], 'No items')}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new string[] { }  // Empty array
});
```

**Output:**
```html
<p>First item: No items</p>
```

---

## Notes

- Catches all errors from the expression evaluation
- Does not log or expose error details (use for graceful degradation)
- Both parameters are evaluated, but expression errors are caught
- Useful for:
  - Division by zero protection
  - Null reference handling
  - Type conversion safety
  - Missing property graceful handling
  - Array bounds protection
- Consider using null coalescing operator (`??`) for simple null checks
- For debugging errors, use `{% raw %}{{log}}{% endraw %}` helper instead
- Performance: Has slight overhead due to error catching
- Best practice: Use when you expect potential errors in data
- Alternative to extensive null checking with `{% raw %}{{#if}}{% endraw %}`

---

## See Also

- [if Function](./if.md)
- [Null Coalesce Operator](../operators/nullcoalesce.md)
- [log Helper](../helpers/log.md)
- [typeof Function](./typeof.md)

---
