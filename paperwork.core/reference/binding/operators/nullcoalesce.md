---
layout: default
title: "?? (Null Coalescing)"
parent: Binding Operators
parent_url: /paperwork.core/reference/binding/operators/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# ?? : Null Coalescing Operator
{: .no_toc }

Provide a fallback value when an expression evaluates to null or undefined.

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
{{expression ?? fallbackValue}}
```
{% endraw %}


---

## Precedence

Priority level in expression evaluation (1 = highest, 10 = lowest): **8**

Evaluated after: `^`, `*`, `/`, `%`, `+`, `-`, `<`, `<=`, `>`, `>=`, `==`, `!=`

Evaluated before: `&&`, `||`

---

## Operands

| Position | Type | Description |
|----------|------|-------------|
| Left | Any | Expression that might be null |
| Right | Any | Fallback value if left is null |

---

## Returns

**Type:** Same as operands

Returns the left operand if it's not null, otherwise returns the right operand.

---

## Examples

### Default User Name


{% raw %}
```html
<h2>Welcome, {{model.user.name ?? 'Guest'}}!</h2>
```
{% endraw %}


**Data (with name):**
```csharp
builder.WithData("model", new {
    user = new {
        name = "John Doe"
    }
});
```

**Output:**
```html
<h2>Welcome, John Doe!</h2>
```

**Data (without name):**
```csharp
builder.WithData("model", new {
    user = new {
        name = (string)null
    }
});
```

**Output:**
```html
<h2>Welcome, Guest!</h2>
```

### Missing Description


{% raw %}
```html
{{#each model.products}}
  <div class="product">
    <h3>{{this.name}}</h3>
    <p>{{this.description ?? 'No description available'}}</p>
  </div>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    products = new[] {
        new { name = "Widget A", description = "High quality widget" },
        new { name = "Widget B", description = (string)null },
        new { name = "Widget C", description = "Premium widget" }
    }
});
```

**Output:**
```html
<div class="product">
  <h3>Widget A</h3>
  <p>High quality widget</p>
</div>
<div class="product">
  <h3>Widget B</h3>
  <p>No description available</p>
</div>
<div class="product">
  <h3>Widget C</h3>
  <p>Premium widget</p>
</div>
```

### Optional Contact Information


{% raw %}
```handlebars
<div class="contact-info">
  <p>Email: {{model.email ?? 'Not provided'}}</p>
  <p>Phone: {{model.phone ?? 'Not provided'}}</p>
  <p>Address: {{model.address ?? 'Not provided'}}</p>
</div>
```
{% endraw %}


### Nested Property Access


{% raw %}
```handlebars
<p>City: {{model.user.address.city ?? 'Unknown'}}</p>
```
{% endraw %}


**Data (nested null):**
```csharp
builder.WithData("model", new {
    user = new {
        address = (object)null
    }
});
```

**Output:**
```html
<p>City: Unknown</p>
```

### Default Values in Lists


{% raw %}
```handlebars
{{#each model.items}}
  <tr>
    <td>{{this.name}}</td>
    <td>{{this.category ?? 'Uncategorized'}}</td>
    <td>${{this.price ?? 0}}</td>
    <td>{{this.notes ?? '-'}}</td>
  </tr>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = new[] {
        new { name = "Item 1", category = "Electronics", price = 99.99m, notes = "In stock" },
        new { name = "Item 2", category = (string)null, price = (decimal?)null, notes = (string)null }
    }
});
```

**Output:**
```html
<tr>
  <td>Item 1</td>
  <td>Electronics</td>
  <td>$99.99</td>
  <td>In stock</td>
</tr>
<tr>
  <td>Item 2</td>
  <td>Uncategorized</td>
  <td>$0</td>
  <td>-</td>
</tr>
```

### Chaining Multiple Defaults


{% raw %}
```handlebars
<p>Display Name: {{model.displayName ?? model.username ?? model.email ?? 'Anonymous'}}</p>
```
{% endraw %}


### Default Image


{% raw %}
```handlebars
{{#each model.products}}
  <img src="{{this.imageUrl ?? '/images/placeholder.png'}}" alt="{{this.name}}" />
{{/each}}
```
{% endraw %}


---

## Notes

- Returns left operand if not null/undefined, otherwise returns right operand
- Very useful for providing default values
- Can chain multiple null coalescing operators
- Evaluates left-to-right when chained
- Does not check for empty strings - only null/undefined
- More concise than `{% raw %}{{#if value}}{{value}}{{else}}default{{/if}}{% endraw %}`
- Similar to C# null-coalescing operator
- Use `ifError()` function for error handling instead of null checking

---

## Null vs Empty String

The `??` operator only checks for null/undefined, not empty strings:


{% raw %}
```handlebars
<!-- Empty string is NOT null -->
{{model.name ?? 'Default'}}
<!-- If model.name = "", output is "" not "Default" -->

<!-- To handle empty strings, use a conditional -->
{{#if model.name}}{{model.name}}{{else}}Default{{/if}}
```
{% endraw %}


---

## See Also

- [Equality Operator](./equality.md)
- [Inequality Operator](./inequality.md)
- [#if Helper](../helpers/if.md)
- [#with Helper](../helpers/with.md)
- [ifError Function](../functions/ifError.md)

---
