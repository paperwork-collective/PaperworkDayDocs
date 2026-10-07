---
layout: default
title: tan
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# tan() : Tangent Function
{: .no_toc }

Calculate the tangent of an angle (in radians).

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
tan(angleInRadians)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `angleInRadians` | Number | Yes | The angle in radians |

---

## Returns

**Type:** Double

The tangent of the angle.

---

## Examples

### Basic Tangent


{% raw %}
```handlebars
<p>tan(0) = {{format(tan(0), '0.000')}}</p>
<p>tan(π/4) = {{format(tan(pi() / 4), '0.000')}}</p>
```
{% endraw %}


**Output:**
```html
<p>tan(0) = 0.000</p>
<p>tan(π/4) = 1.000</p>
```

### Convert Degrees


{% raw %}
```handlebars
<p>tan(45°) = {{format(tan(rad(45)), '0.000')}}</p>
```
{% endraw %}


**Output:**
```html
<p>tan(45°) = 1.000</p>
```

### Calculate Slope


{% raw %}
```handlebars
<p>Slope: {{format(tan(model.angle), '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    angle = Math.PI / 6  // 30 degrees
};
```

**Output:**
```html
<p>Slope: 0.58</p>
```

---

## Notes

- Input must be in radians (not degrees)
- Undefined at π/2, 3π/2, etc. (where cosine = 0)
- For degrees, use: `tan(rad(deg))`
- tan(x) = sin(x) / cos(x)
- Common values:
  - tan(0) = 0
  - tan(π/4) = 1
  - tan(π/6) ≈ 0.577

---

## See Also

- [sin Function](./sin.md)
- [cos Function](./cos.md)
- [atan Function](./atan.md)
- [rad Function](./rad.md)

---
