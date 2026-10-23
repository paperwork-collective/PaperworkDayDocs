---
layout: default
title: functionName
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding Reference
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# functionName() : Function Description
{: .no_toc }

---

<details open class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Summary

Brief description of what this function does.

## Signature

```
functionName(param1, param2, ...)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `param1` | Type | Yes/No | Description of parameter |
| `param2` | Type | Yes/No | Description of parameter |

---

## Returns

**Type:** Return type

Description of what the function returns.

---

## Examples

### Basic Usage





{% raw %}
```handlebars
{{functionName(value)}}
<!-- Output: result -->
```
{% endraw %}





### With Variables





{% raw %}
```handlebars
<p>Result: {{functionName(model.value)}}</p>
```
{% endraw %}





**Data:**
```csharp
builder.WithData("model", new {
    value = "input"
});
```

**Output:**
```html
<p>Result: output</p>
```

### Complex Example





{% raw %}
```handlebars
<!-- More advanced usage -->
{{functionName(expression, model.param)}}
```
{% endraw %}





---

## Notes

- Edge cases
- Performance considerations
- Common uses

---

## See Also

- [Related Function](./related.md)
- [Function Category Index](./index.md)

---
