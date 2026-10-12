---
layout: default
title: typeof
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# typeof() : Get Type Name
{: .no_toc }

Get the type name of a value. Useful for debugging and conditional logic.

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
typeof(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Any | Yes | The value to get the type of |

---

## Returns

**Type:** String

The .NET type name of the value.

---

## Common Type Names

| Type | Result |
|------|--------|
| String | `"System.String"` |
| Int32 | `"System.Int32"` |
| Int64 | `"System.Int64"` |
| Double | `"System.Double"` |
| Decimal | `"System.Decimal"` |
| Boolean | `"System.Boolean"` |
| DateTime | `"System.DateTime"` |
| Array | `"System.Object[]"` or specific array type |
| Null | `"System.Object"` or null |

---

## Examples

### Debug Output


{% raw %}
```handlebars
{{log "Value type: " typeof(model.value) level="debug"}}
<p>Value: {{model.value}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    value = 42
};
```

**Log Output:**
```
Value type: System.Int32
```

### Type-Based Conditional


{% raw %}
```handlebars
{{#if typeof(model.data) == 'System.String'}}
  <p>String value: {{model.data}}</p>
{{else if typeof(model.data) == 'System.Int32'}}
  <p>Integer value: {{model.data}}</p>
{{else}}
  <p>Type: {{typeof(model.data)}}, Value: {{model.data}}</p>
{{/if}}
```
{% endraw %}


### Debugging Collection Types


{% raw %}
```handlebars
{{#each model.items}}
  {{log "Item type: " typeof(this) " Value: " this level="debug"}}
  <p>{{this}}</p>
{{/each}}
```
{% endraw %}


### Type Inspection for Troubleshooting


{% raw %}
```handlebars
<div class="debug-info">
  <h3>Type Information</h3>
  <ul>
    <li>model: {{typeof(model)}}</li>
    <li>model.user: {{typeof(model.user)}}</li>
    <li>model.count: {{typeof(model.count)}}</li>
    <li>model.price: {{typeof(model.price)}}</li>
    <li>model.isActive: {{typeof(model.isActive)}}</li>
  </ul>
</div>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    user = "John Doe",
    count = 42,
    price = 19.99m,
    isActive = true
};
```

**Output:**
```html
<div class="debug-info">
  <h3>Type Information</h3>
  <ul>
    <li>model: <>f__AnonymousType0</li>
    <li>model.user: System.String</li>
    <li>model.count: System.Int32</li>
    <li>model.price: System.Decimal</li>
    <li>model.isActive: System.Boolean</li>
  </ul>
</div>
```

---

## Notes

- Returns full .NET type name
- Useful for debugging data binding issues
- Can be used in conditional logic
- Anonymous types show generated names
- For null values, behavior may vary
- Primarily a debugging tool
- Use with `{% raw %}{{log}}{% endraw %}` helper for tracing

---

## See Also

- [log Helper](../helpers/log.md)
- [#if Helper](../helpers/if.md)
- [Equality Operator](../operators/equality.md)

---
