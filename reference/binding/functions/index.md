---
layout: default
title: Expression Functions
parent: Data Binding
parent_url: /reference/binding/
grand_parent: Template reference
grand_parent_url: /reference/
has_children: true
has_toc: false
---

# Expression Functions Reference
{: .no_toc }

Built-in functions for data manipulation and formatting in Scryber binding expressions.

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

## Overview

Expression functions transform and manipulate data within binding expressions. Over 90 built-in functions are available across multiple categories.

**Usage:**




{% raw %}
```handlebars
{{functionName(param1, param2, ...)}}
```
{% endraw %}





---

## Conversion Functions

Convert values between different types.

| Function | Description | Example |
|----------|-------------|---------|
| [int](./int) | Convert to integer | `{% raw %}{{int(model.value)}}{% endraw %}` |
| [long](./long) | Convert to long integer | `{% raw %}{{long(model.bigNumber)}}{% endraw %}` |
| [double](./double) | Convert to double precision float | `{% raw %}{{double(model.value)}}{% endraw %}` |
| [decimal](./decimal) | Convert to decimal | `{% raw %}{{decimal(model.price)}}{% endraw %}` |
| [bool](./bool) | Convert to boolean | `{% raw %}{{bool(model.flag)}}{% endraw %}` |
| [date](./date) | Convert to DateTime | `{% raw %}{{date(model.dateString)}}{% endraw %}` |
| [typeof](./typeof) | Get type name | `{% raw %}{{typeof(model.value)}}{% endraw %}` |

---

## String Functions

Manipulate and format text.

| Function | Description | Example |
|----------|-------------|---------|
| [format](./format) / [string](./string.md) | Format values as strings | `{% raw %}{{format(model.price, 'C2')}}{% endraw %}` |
| [concat](./concat) | Concatenate strings | `{% raw %}{{concat(model.first, ' ', model.last)}}{% endraw %}` |
| [join](./join) | Join array with separator | `{% raw %}{{join(model.items, ', ')}}{% endraw %}` |
| [substring](./substring) | Extract substring | `{% raw %}{{substring(model.text, 0, 10)}}{% endraw %}` |
| [replace](./replace) | Replace text | `{% raw %}{{replace(model.text, 'old', 'new')}}{% endraw %}` |
| [toLower](./toLower) | Convert to lowercase | `{% raw %}{{toLower(model.text)}}{% endraw %}` |
| [toUpper](./toUpper) | Convert to UPPERCASE | `{% raw %}{{toUpper(model.code)}}{% endraw %}` |
| [trim](./trim) | Remove leading/trailing whitespace | `{% raw %}{{trim(model.text)}}{% endraw %}` |
| [trimEnd](./trimEnd) | Remove trailing whitespace | `{% raw %}{{trimEnd(model.text)}}{% endraw %}` |
| [length](./length) | Get string length | `{% raw %}{{length(model.text)}}{% endraw %}` |
| [contains](./contains) | Check if contains substring | `{% raw %}{{contains(model.text, 'search')}}{% endraw %}` |
| [startsWith](./startsWith) | Check if starts with substring | `{% raw %}{{startsWith(model.text, 'prefix')}}{% endraw %}` |
| [endsWith](./endsWith) | Check if ends with substring | `{% raw %}{{endsWith(model.text, 'suffix')}}{% endraw %}` |
| [indexOf](./indexOf) | Find substring position | `{% raw %}{{indexOf(model.text, 'search')}}{% endraw %}` |
| [padLeft](./padLeft) | Pad left with characters | `{% raw %}{{padLeft(model.num, 5, '0')}}{% endraw %}` |
| [padRight](./padRight) | Pad right with characters | `{% raw %}{{padRight(model.text, 10, ' ')}}{% endraw %}` |
| [split](./split) | Split string into array | `{% raw %}{{split(model.text, ',')}}{% endraw %}` |
| [isMatch](./isMatch) | Test regex pattern | `{% raw %}{{isMatch(model.email, '^.+@.+$')}}{% endraw %}` |
| [matches](./matches) | Find all regex matches | `{% raw %}{{matches(model.text, '\\d+')}}{% endraw %}` |
| [swap](./swap) | Replace using regex | `{% raw %}{{swap(model.text, '\\d+', 'X')}}{% endraw %}` |

---

## Mathematical Functions

Perform calculations and mathematical operations.

| Function | Description | Example |
|----------|-------------|---------|
| [abs](./abs) | Absolute value | `{% raw %}{{abs(model.value)}}{% endraw %}` |
| [ceiling](./ceiling) | Round up to integer | `{% raw %}{{ceiling(model.value)}}{% endraw %}` |
| [floor](./floor) | Round down to integer | `{% raw %}{{floor(model.value)}}{% endraw %}` |
| [round](./round) | Round to nearest | `{% raw %}{{round(model.value, 2)}}{% endraw %}` |
| [truncate](./truncate) | Truncate decimal | `{% raw %}{{truncate(model.value)}}{% endraw %}` |
| [sqrt](./sqrt) | Square root | `{% raw %}{{sqrt(model.value)}}{% endraw %}` |
| [pow](./pow) | Raise to power | `{% raw %}{{pow(model.base, model.exp)}}{% endraw %}` |
| [exp](./exp) | Exponential (e^x) | `{% raw %}{{exp(model.value)}}{% endraw %}` |
| [log](./log) | Natural logarithm | `{% raw %}{{log(model.value)}}{% endraw %}` |
| [log10](./log10) | Base-10 logarithm | `{% raw %}{{log10(model.value)}}{% endraw %}` |
| [sign](./sign) | Sign of number (-1, 0, 1) | `{% raw %}{{sign(model.value)}}{% endraw %}` |
| [sin](./sin) | Sine | `{% raw %}{{sin(model.radians)}}{% endraw %}` |
| [cos](./cos) | Cosine | `{% raw %}{{cos(model.radians)}}{% endraw %}` |
| [tan](./tan) | Tangent | `{% raw %}{{tan(model.radians)}}{% endraw %}` |
| [asin](./asin) | Arcsine | `{% raw %}{{asin(model.value)}}{% endraw %}` |
| [acos](./acos) | Arccosine | `{% raw %}{{acos(model.value)}}{% endraw %}` |
| [atan](./atan) | Arctangent | `{% raw %}{{atan(model.value)}}{% endraw %}` |
| [deg](./deg) | Convert radians to degrees | `{% raw %}{{deg(model.radians)}}{% endraw %}` |
| [rad](./rad) | Convert degrees to radians | `{% raw %}{{rad(model.degrees)}}{% endraw %}` |
| [pi](./pi) | Pi constant (3.14159...) | `{% raw %}{{pi()}}{% endraw %}` |
| [e](./e) | Euler's number (2.71828...) | `{% raw %}{{e()}}{% endraw %}` |
| [random](./random) | Random number | `{% raw %}{{random()}}{% endraw %}` |

---

## Date & Time Functions

Work with dates and timestamps.

| Function | Description | Example |
|----------|-------------|---------|
| [addDays](./addDays) | Add days to date | `{% raw %}{{addDays(model.date, 7)}}{% endraw %}` |
| [addMonths](./addMonths) | Add months to date | `{% raw %}{{addMonths(model.date, 1)}}{% endraw %}` |
| [addYears](./addYears) | Add years to date | `{% raw %}{{addYears(model.date, 1)}}{% endraw %}` |
| [addHours](./addHours) | Add hours to date | `{% raw %}{{addHours(model.date, 2)}}{% endraw %}` |
| [addMinutes](./addMinutes) | Add minutes to date | `{% raw %}{{addMinutes(model.date, 30)}}{% endraw %}` |
| [addSeconds](./addSeconds) | Add seconds to date | `{% raw %}{{addSeconds(model.date, 45)}}{% endraw %}` |
| [addMilliseconds](./addMilliseconds) | Add milliseconds to date | `{% raw %}{{addMilliseconds(model.date, 500)}}{% endraw %}` |
| [daysBetween](./daysBetween) | Days between two dates | `{% raw %}{{daysBetween(model.start, model.end)}}{% endraw %}` |
| [hoursBetween](./hoursBetween) | Hours between two dates | `{% raw %}{{hoursBetween(model.start, model.end)}}{% endraw %}` |
| [minutesBetween](./minutesBetween) | Minutes between two dates | `{% raw %}{{minutesBetween(model.start, model.end)}}{% endraw %}` |
| [secondsBetween](./secondsBetween) | Seconds between two dates | `{% raw %}{{secondsBetween(model.start, model.end)}}{% endraw %}` |
| [yearOf](./yearOf) | Extract year | `{% raw %}{{yearOf(model.date)}}{% endraw %}` |
| [monthOf](./monthOf) | Extract month (1-12) | `{% raw %}{{monthOf(model.date)}}{% endraw %}` |
| [dayOfMonth](./dayOfMonth) | Extract day (1-31) | `{% raw %}{{dayOfMonth(model.date)}}{% endraw %}` |
| [dayOfWeek](./dayOfWeek) | Extract day of week (0-6) | `{% raw %}{{dayOfWeek(model.date)}}{% endraw %}` |
| [dayOfYear](./dayOfYear) | Extract day of year (1-366) | `{% raw %}{{dayOfYear(model.date)}}{% endraw %}` |
| [hourOf](./hourOf) | Extract hour (0-23) | `{% raw %}{{hourOf(model.date)}}{% endraw %}` |
| [minuteOf](./minuteOf) | Extract minute (0-59) | `{% raw %}{{minuteOf(model.date)}}{% endraw %}` |
| [secondOf](./secondOf) | Extract second (0-59) | `{% raw %}{{secondOf(model.date)}}{% endraw %}` |
| [millisecondOf](./millisecondOf) | Extract millisecond (0-999) | `{% raw %}{{millisecondOf(model.date)}}{% endraw %}` |

---

## Logical Functions

Control flow and conditional logic within expressions.

| Function | Description | Example |
|----------|-------------|---------|
| [if](./if) | Ternary conditional | `{% raw %}{{if(model.active, 'Yes', 'No')}}{% endraw %}` |
| [ifError](./ifError) | Fallback on error | `{% raw %}{{ifError(model.value, 'default')}}{% endraw %}` |
| [in](./in) | Check if value in list | `{% raw %}{{in(model.status, 'active', 'pending')}}{% endraw %}` |

---

## Collection Functions

Aggregate and manipulate collections.

| Function | Description | Example |
|----------|-------------|---------|
| [count](./count) | Count items in collection | `{% raw %}{{count(model.items)}}{% endraw %}` |
| [countOf](./countOf) | Count with condition | `{% raw %}{{countOf(model.items, 'isActive')}}{% endraw %}` |
| [sum](./sum) | Sum numeric values | `{% raw %}{{sum(model.numbers)}}{% endraw %}` |
| [sumOf](./sumOf) | Sum property values | `{% raw %}{{sumOf(model.items, 'price')}}{% endraw %}` |
| [min](./min) | Minimum value | `{% raw %}{{min(model.numbers)}}{% endraw %}` |
| [minOf](./minOf) | Minimum property value | `{% raw %}{{minOf(model.items, 'price')}}{% endraw %}` |
| [max](./max) | Maximum value | `{% raw %}{{max(model.numbers)}}{% endraw %}` |
| [maxOf](./maxOf) | Maximum property value | `{% raw %}{{maxOf(model.items, 'price')}}{% endraw %}` |
| [collect](./collect) | Extract property values | `{% raw %}{{collect(model.items, 'name')}}{% endraw %}` |
| [each](./each) | Iterate with function | `{% raw %}{{each(model.items, 'transform')}}{% endraw %}` |
| [eachOf](./eachOf) | Iterate property with function | `{% raw %}{{eachOf(model.items, 'prop', 'fn')}}{% endraw %}` |
| [firstWhere](./firstWhere) | Find first matching item | `{% raw %}{{firstWhere(model.items, 'isActive')}}{% endraw %}` |
| [selectWhere](./selectWhere) | Filter collection | `{% raw %}{{selectWhere(model.items, 'isActive')}}{% endraw %}` |
| [sortBy](./sortBy) | Sort by property | `{% raw %}{{sortBy(model.items, 'name')}}{% endraw %}` |
| [reverse](./reverse) | Reverse order | `{% raw %}{{reverse(model.items)}}{% endraw %}` |

---

## Statistical Functions

Calculate statistics on collections.

| Function | Description | Example |
|----------|-------------|---------|
| [average](./average) | Average of values | `{% raw %}{{average(model.numbers)}}{% endraw %}` |
| [averageOf](./averageOf) | Average of property | `{% raw %}{{averageOf(model.items, 'price')}}{% endraw %}` |
| [mean](./mean) | Mean value | `{% raw %}{{mean(model.numbers)}}{% endraw %}` |
| [median](./median) | Median value | `{% raw %}{{median(model.numbers)}}{% endraw %}` |
| [mode](./mode) | Mode (most frequent) | `{% raw %}{{mode(model.numbers)}}{% endraw %}` |

---

## CSS Functions

Dynamic CSS calculations.

| Function | Description | Example |
|----------|-------------|---------|
| [calc](./calc.md) | CSS calc expression | `{% raw %}{{calc('100% - 20pt')}}{% endraw %}` |
| [var](./var.md) | CSS variable reference | `{% raw %}{{var('primary-color')}}{% endraw %}` |

---

## Common Patterns

### Formatting Currency





{% raw %}
```handlebars
<p>Total: {{format(model.total, 'C2')}}</p>
<!-- Output: Total: $1,234.56 -->
```
{% endraw %}





### Date Calculations





{% raw %}
```handlebars
<p>Due: {{format(addDays(model.orderDate, 30), 'MMMM dd, yyyy')}}</p>
<!-- Output: Due: April 14, 2024 -->
```
{% endraw %}





### Conditional Values





{% raw %}
```handlebars
<span class="{{if(model.score >= 70, 'pass', 'fail')}}">
  Score: {{model.score}}
</span>
<!-- Output: <span class="pass">Score: 85</span> -->
```
{% endraw %}





### Collection Aggregation





{% raw %}
```handlebars
<p>Total Items: {{count(model.items)}}</p>
<p>Total Price: {{format(sumOf(model.items, 'price'), 'C2')}}</p>
<p>Average: {{format(averageOf(model.items, 'price'), 'C2')}}</p>
```
{% endraw %}





### String Manipulation





{% raw %}
```handlebars
<h2>{{toUpper(substring(model.title, 0, 1))}}{{substring(model.title, 1)}}</h2>
<!-- Output: Capitalize first letter -->
```
{% endraw %}





---

## See Also

- [Handlebars Helpers](../helpers/) - Control flow and context management
- [Binding Operators](../operators/) - Mathematical, comparison, and logical operators
- [Expressions Guide](../../learning/02-data-binding/02_expression_functions.html) - Complete guide to expressions

---
