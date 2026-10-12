---
layout: default
title: bool
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# bool() : Convert to Boolean
{: .no_toc }

Convert a value to a boolean (true/false).

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
bool(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Any | Yes | The value to convert to boolean |

---

## Returns

**Type:** Boolean

`true` or `false`

---

## Conversion Rules

| Input | Result |
|-------|--------|
| `"true"`, `"True"`, `"TRUE"` | `true` |
| `"false"`, `"False"`, `"FALSE"` | `false` |
| `1`, `>0` (numbers) | `true` |
| `0` | `false` |
| `null` | `false` |
| Non-empty string | `true` |
| Empty string | `false` |

---

## Examples

### String to Boolean


{% raw %}
```handlebars
{{#if bool(model.isActiveString)}}
  <span class="active">Active</span>
{{else}}
  <span class="inactive">Inactive</span>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    isActiveString = "true"
};
```

**Output:**
```html
<span class="active">Active</span>
```

### Number to Boolean


{% raw %}
```handlebars
{{#if bool(model.statusCode)}}
  <p>Operation successful</p>
{{else}}
  <p>Operation failed</p>
{{/if}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    statusCode = 1
};
```

**Output:**
```html
<p>Operation successful</p>
```

### Checkbox Value


{% raw %}
```handlebars
{{#each model.features}}
  <div>
    {{#if bool(this.enabled)}}
      ✓ {{this.name}} (Enabled)
    {{else}}
      ✗ {{this.name}} (Disabled)
    {{/if}}
  </div>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    features = new[] {
        new { name = "Email Notifications", enabled = "true" },
        new { name = "SMS Alerts", enabled = "false" },
        new { name = "Push Notifications", enabled = "1" }
    }
};
```

**Output:**
```html
<div>
  ✓ Email Notifications (Enabled)
</div>
<div>
  ✗ SMS Alerts (Disabled)
</div>
<div>
  ✓ Push Notifications (Enabled)
</div>
```

---

## Notes

- Case-insensitive for string "true" and "false"
- Numbers: 0 = false, anything else = true
- Null values convert to false
- Empty strings convert to false
- Throws exception if value cannot be converted to boolean
- Commonly used when data comes from external sources as strings

---

## See Also

- [int Function](./int.md)
- [#if Helper](../helpers/if.md)
- [Equality Operator](../operators/equality.md)

---
