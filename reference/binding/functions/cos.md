---
layout: default
title: cos
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# cos() : Cosine Function
{: .no_toc }

Calculate the cosine of an angle (in radians).

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
cos(angleInRadians)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `angleInRadians` | Number | Yes | The angle in radians |

---

## Returns

**Type:** Double

The cosine of the angle (value between -1 and 1).

---

## Examples

### Basic Cosine


{% raw %}
```handlebars
<p>cos(0) = {{format(cos(0), '0.000')}}</p>
<p>cos(π) = {{format(cos(pi()), '0.000')}}</p>
```
{% endraw %}


**Output:**
```html
<p>cos(0) = 1.000</p>
<p>cos(π) = -1.000</p>
```

### Convert Degrees to Radians


{% raw %}
```handlebars
<p>cos(0°) = {{format(cos(rad(0)), '0.000')}}</p>
<p>cos(60°) = {{format(cos(rad(60)), '0.000')}}</p>
<p>cos(90°) = {{format(cos(rad(90)), '0.000')}}</p>
```
{% endraw %}


**Output:**
```html
<p>cos(0°) = 1.000</p>
<p>cos(60°) = 0.500</p>
<p>cos(90°) = 0.000</p>
```

### Calculate Position


{% raw %}
```handlebars
<p>X = {{format(model.radius * cos(model.angle), '0.00')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    radius = 10,
    angle = Math.PI / 3  // 60 degrees
};
```

**Output:**
```html
<p>X = 5.00</p>
```

---

## Notes

- Input must be in radians (not degrees)
- Returns value between -1 and 1
- For degrees, use: `cos(rad(deg))`
- Common values:
  - cos(0) = 1
  - cos(π/3) = 0.5
  - cos(π/2) = 0
  - cos(π) = -1

---

## See Also

- [sin Function](./sin.md)
- [tan Function](./tan.md)
- [acos Function](./acos.md)
- [rad Function](./rad.md)
- [pi Function](./pi.md)

---
