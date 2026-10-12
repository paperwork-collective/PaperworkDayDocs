---
layout: default
title: random
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# random() : Random Number
{: .no_toc }

Generate a random number between 0 and 1.

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
random()
```

---

## Parameters

None.

---

## Returns

**Type:** Double

A random value between 0.0 (inclusive) and 1.0 (exclusive).

---

## Examples

### Basic Random


{% raw %}
```handlebars
<p>Random: {{format(random(), '0.000')}}</p>
```
{% endraw %}


**Output (example):**
```html
<p>Random: 0.742</p>
```

### Random Integer Range


{% raw %}
```handlebars
<!-- Random integer from 1 to 10 -->
<p>Random (1-10): {{floor(random() * 10) + 1}}</p>
```
{% endraw %}


### Random Selection


{% raw %}
```handlebars
<!-- Randomly select from array -->
<p>Selected: {{model.items[floor(random() * length(model.items))]}}</p>
```
{% endraw %}


### Random Percentage


{% raw %}
```handlebars
<p>Random percentage: {{format(random() * 100, '0.0')}}%</p>
```
{% endraw %}


---

## Notes

- Returns value ≥ 0 and < 1
- Different value each time (non-deterministic)
- **Warning**: PDFs are static documents - random values are generated once at template processing time
- Not cryptographically secure
- For range [min, max]: `random() * (max - min) + min`
- For integer range: `floor(random() * (max - min + 1)) + min`

---

## Important

PDF documents are static - random values are calculated during document generation and remain fixed in the output. If you need consistent values across multiple document generations, provide them in your model data instead of using `random()`.

---

## See Also

- [floor Function](./floor.md)
- [round Function](./round.md)
- [Multiplication Operator](../operators/multiplication.md)

---
