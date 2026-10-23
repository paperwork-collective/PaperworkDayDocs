---
layout: default
title: addMinutes
parent: Expression Functions
parent_url: /paperwork.core/reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
---

# addMinutes() : Add Minutes to Date
{: .no_toc }

Add minutes to a datetime. Use negative values to subtract minutes.

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
addMinutes(date, minutes)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | DateTime | Yes | The datetime to modify |
| `minutes` | Number | Yes | Number of minutes to add (can be negative) |

---

## Returns

**Type:** DateTime

A new DateTime with the specified minutes added.

---

## Examples

### Add Minutes


{% raw %}
```handlebars
<p>Departs: {{format(addMinutes(model.boardingTime, 45), 'h:mm tt')}}</p>
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    boardingTime = new DateTime(2024, 3, 15, 14, 15, 0)
});
```

**Output:**
```html
<p>Departs: 3:00 PM</p>
```

### Appointment Schedule


{% raw %}
```handlebars
{{#each model.appointments}}
  <p>{{this.name}}: {{format(addMinutes(model.startTime, this.offset), 'h:mm tt')}}</p>
{{/each}}
```
{% endraw %}


**Data:**
```csharp
builder.WithData("model", new {
    startTime = new DateTime(2024, 3, 15, 9, 0, 0),
    appointments = new[] {
        new { name = "Check-in", offset = 0 },
        new { name = "Consultation", offset = 15 },
        new { name = "Procedure", offset = 30 }
    }
});
```

**Output:**
```html
<p>Check-in: 9:00 AM</p>
<p>Consultation: 9:15 AM</p>
<p>Procedure: 9:30 AM</p>
```

### Duration Calculation


{% raw %}
```handlebars
<p>End time: {{format(addMinutes(model.start, model.durationMinutes), 'h:mm tt')}}</p>
```
{% endraw %}


---

## Notes

- Input datetime is not modified (returns new datetime)
- Can add positive or negative minutes
- Automatically handles hour and day boundaries
- Use `addSeconds()` for second increments
- Use `addHours()` for hour increments

---

## See Also

- [addHours Function](./addHours.md)
- [addSeconds Function](./addSeconds.md)
- [minutesBetween Function](./minutesBetween.md)
- [format Function](./format.md)

---
