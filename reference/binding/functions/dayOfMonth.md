---
layout: default
title: dayOfMonth
parent: Expression Functions
parent_url: /reference/binding/functions/
grand_parent: Data Binding
grand_parent_url: /reference/binding/
has_children: false
has_toc: false
---

# dayOfMonth() : Extract Day from Date
{: .no_toc }

Extract the day of the month component from a datetime value as a number (1-31).

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
dayOfMonth(date)
```

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | DateTime | Yes | The datetime to extract the day from |

---

## Returns

**Type:** Number (Integer)

The day of the month as a number from 1 to 31.

---

## Examples

### Display Day


{% raw %}
```handlebars
<p>Day: {{dayOfMonth(model.date)}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    date = new DateTime(2024, 3, 15)
};
```

**Output:**
```html
<p>Day: 15</p>
```

### Custom Date Format


{% raw %}
```handlebars
<p>Date: {{yearOf(model.date)}}-{{padLeft(string(monthOf(model.date)), 2, '0')}}-{{padLeft(string(dayOfMonth(model.date)), 2, '0')}}</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    date = new DateTime(2024, 3, 5)
};
```

**Output:**
```html
<p>Date: 2024-03-05</p>
```

### Day Range Filter


{% raw %}
```handlebars
<h3>Events in First Half of Month</h3>
{{#each model.events}}
  {{#if (dayOfMonth(this.date) <= 15)}}
    <p>{{format(this.date, 'MMM dd')}}: {{this.title}}</p>
  {{/if}}
{{/each}}
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    events = new[] {
        new { date = new DateTime(2024, 3, 10), title = "Team Meeting" },
        new { date = new DateTime(2024, 3, 20), title = "Project Review" },
        new { date = new DateTime(2024, 3, 5), title = "Sprint Planning" }
    }
};
```

**Output:**
```html
<h3>Events in First Half of Month</h3>
<p>Mar 10: Team Meeting</p>
<p>Mar 05: Sprint Planning</p>
```

### Payment Schedule


{% raw %}
```handlebars
<p>Next payment due:
{{#if (dayOfMonth(model.today) < 15)}}
  {{format(addDays(model.today, 15 - dayOfMonth(model.today)), 'MMMM dd')}}
{{else}}
  {{format(addMonths(model.today, 1), 'MMMM')}} 15
{{/if}}
</p>
```
{% endraw %}


**Data:**
```csharp
doc.Params["model"] = new {
    today = new DateTime(2024, 3, 10)
};
```

**Output:**
```html
<p>Next payment due: March 15</p>
```

---

## Notes

- Returns numeric value 1-31
- Actual maximum depends on the month (28-31)
- Time component is ignored
- Useful for custom date formatting and date-based logic
- For day of week, use `dayOfWeek()` function
- For day of year, use `dayOfYear()` function

---

## See Also

- [dayOfWeek Function](./dayOfWeek.md)
- [dayOfYear Function](./dayOfYear.md)
- [addDays Function](./addDays.md)
- [format Function](./format.md)

---
