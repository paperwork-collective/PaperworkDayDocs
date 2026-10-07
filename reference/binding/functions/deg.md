---
layout: default
title: deg
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# deg() : Convert Radians to Degrees
{: .no_toc }

Convert an angle from radians to degrees.

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
deg(rad)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `radians` | Number | Yes | The angle in radians |

---

## Returns

**Type:** Double

The angle in degrees.

---

## Examples

### Convert Pi


{% raw %}
```handlebars
<p>π radians = {{format(deg(pi()), '0.0')}}°</p>
<p>π/2 radians = {{format(deg(pi() / 2), '0.0')}}°</p>
<p>π/4 radians = {{format(deg(pi() / 4), '0.0')}}°</p>
```
{% endraw %}


**Output:**
```html
<p>π radians = 180.0°</p>
<p>π/2 radians = 90.0°</p>
<p>π/4 radians = 45.0°</p>
```

### Convert Trigonometric Result


{% raw %}
```handlebars
<p>Angle: {{format(deg(asin(0.5)), '0.0')}}°</p>
```
{% endraw %}


**Output:**
```html
<p>Angle: 30.0°</p>
```

### Display Angles


{% raw %}
```handlebars
{{#each model.angles}}
  <li>{{this}} rad = {{format(deg(this), '0.0')}}°</li>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    angles = new[] { 0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2 }
};
```

**Output:**
```html
<li>0 rad = 0.0°</li>
<li>0.52 rad = 30.0°</li>
<li>0.79 rad = 45.0°</li>
<li>1.05 rad = 60.0°</li>
<li>1.57 rad = 90.0°</li>
```

---

## Notes

- Converts radians to degrees
- Formula: degrees = radians × (180/π)
- Inverse of `rad()` function
- Commonly used with trigonometric functions
- 2π radians = 360°, π radians = 180°

---

## See Also

- [rad Function](./rad.md)
- [pi Function](./pi.md)
- [sin Function](./sin.md)
- [asin Function](./asin.md)

---
