---
layout: default
title: acos
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# acos() : Arccosine (Inverse Cosine)
{: .no_toc }

Calculate the arccosine (inverse cosine) of a value, returning the angle in radians.

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
acos(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Number | Yes | Value between -1 and 1 |

---

## Returns

**Type:** Double

The angle in radians (between 0 and π).

---

## Examples

### Basic Arccosine


{% raw %}
```handlebars
<p>acos(0.5) = {{format(acos(0.5), '0.000')}} radians</p>
<p>acos(0.5) = {{format(deg(acos(0.5)), '0.0')}}°</p>
```
{% endraw %}


**Output:**
```html
<p>acos(0.5) = 1.047 radians</p>
<p>acos(0.5) = 60.0°</p>
```

### Find Angle from Adjacent Side


{% raw %}
```handlebars
<p>Angle: {{format(deg(acos(model.adjacent / model.hypotenuse)), '0.0')}}°</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    adjacent = 8.66,
    hypotenuse = 10
};
```

**Output:**
```html
<p>Angle: 30.0°</p>
```

---

## Notes

- Value must be between -1 and 1
- Returns angle in radians
- Result range: 0 to π
- Inverse of `cos()` function
- For degrees, use: `deg(acos(value))`

---

## See Also

- [cos Function](./cos.md)
- [asin Function](./asin.md)
- [atan Function](./atan.md)
- [deg Function](./deg.md)

---
