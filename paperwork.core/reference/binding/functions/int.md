---
layout: default
title: int
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# int() : Convert to Integer
{: .no_toc }

Convert a value to a 32-bit integer. A number with a fraction is rounded to the nearest whole number. To drop the fraction instead, use `truncate()`.

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
int(value)
integer(value)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Any | Yes | The value to convert to integer |

---

## Returns

**Type:** Int32

A 32-bit integer representation of the value.

---

## Examples

### Convert String to Integer


{% raw %}
```handlebars
<p>Value: {{int(model.stringValue)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    stringValue = "42"
});
```

**Output:**
```html
<p>Value: 42</p>
```

### Round a Decimal


{% raw %}
```handlebars
<p>Rounded: {{int(model.decimalValue)}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    decimalValue = 19.95m
});
```

**Output:**
```html
<p>Rounded: 20</p>
```

### Calculate Whole Units


{% raw %}
```handlebars
<p>Full boxes: {{int(model.items / model.boxSize)}}</p>
<p>Remaining items: {{model.items % model.boxSize}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    items = 47,
    boxSize = 12
});
```

**Output:**
```html
<p>Full boxes: 3</p>
<p>Remaining items: 11</p>
```

### Age Calculation


{% raw %}
```handlebars
<p>Age: {{int(daysBetween(model.birthDate, model.today) / 365)}} years</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    birthDate = new DateTime(1990, 5, 15),
    today = new DateTime(2024, 3, 15)
});
```

**Output:**
```html
<p>Age: 33 years</p>
```

---

## Notes

- Rounds to the nearest whole number, with an exact half going to the even number: `int(10.4)` is 10, `int(10.6)` is 11, `int(10.5)` is 10 and `int(11.5)` is 12
- Text such as `'42'` is read as that number. Text with a fraction, such as `'10.6'`, is read as a number with a dot as the decimal point (whatever the culture) and then rounded, so it gives 11. Before 9.11.0 it raised an error
- Hex (`'0x1F'`) and binary (`'0b101'`) text are converted from that base
- Handles string-to-integer conversion
- Throws exception if value cannot be converted
- To drop the fraction rather than round, use the `truncate()` function
- Range: -2,147,483,648 to 2,147,483,647
- For larger values, use `long()` function
- Alias `integer()` provides same functionality

---

## See Also

- [long Function](/paperwork.core/reference/binding/functions/long.html)
- [double Function](/paperwork.core/reference/binding/functions/double.html)
- [decimal Function](/paperwork.core/reference/binding/functions/decimal.html)
- [round Function](/paperwork.core/reference/binding/functions/round.html)
- [truncate Function](/paperwork.core/reference/binding/functions/truncate.html)

---
