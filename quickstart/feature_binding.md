---
layout: default
title: Binding Expressions Support
parent: Quick Start
parent_url: /quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 4
---

# Binding Expressions Support
{: .no_toc }

<style>
.main-content table td:first-child,
.main-content table th:first-child { min-width: 200px; }
</style>

Scryber uses a Handlebars-style expression syntax (`{% raw %}{{...}}{% endraw %}`) to bind data and execute functions within templates. This chart covers all supported helpers, operators, functions, and special variables.

All binding features are Scryber-specific — standard HTML has no equivalent built-in template engine.

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

## Expression Syntax

{% raw %}

| Syntax | Example | Description |
|--------|---------|-------------|
| Output value | `{{model.name}}` | Renders a data value as text |
| Expression | `{{price * qty}}` | Evaluates an inline expression |
| Function call | `{{toUpper(model.name)}}` | Calls a built-in function |
| Conditional expression | `{{if(score >= 90, 'A', 'B')}}` | Inline ternary |
| CSS variable | `{{var(--theme-color)}}` | Reads a CSS custom property value |
| CSS calc | `{{calc(100% - 20pt)}}` | CSS calculation (prefer operators directly) |

{% endraw %}

---

## Handlebars Helpers

Block-level helpers for control flow and iteration.

{% raw %}

| Helper | Syntax | Description | Reference |
|--------|--------|-------------|-----------|
| [each](/reference/binding/helpers/each) | `{{#each items}}...{{/each}}` | Iterate over a collection; access current item with `{{this}}` | |
| [with](/reference/binding/helpers/with) | `{{#with object}}...{{/with}}` | Change the data context to a specific object | |
| [if](/reference/binding/helpers/if) | `{{#if condition}}...{{/if}}` | Conditional block; condition is any expression | |
| [else if](/reference/binding/helpers/elseif) | `{{else if condition}}` | Additional branch in an `if` block | |
| [else](/reference/binding/helpers/else) | `{{else}}` | Fallback branch when no condition is met | |
| [log](/reference/binding/helpers/log) | `{{log "message"}}` | Writes a debug message to the trace log | |

{% endraw %}

---

## Operators

{% raw %}

Used within `{{expression}}` bindings. Operator precedence follows standard mathematical rules.

### Mathematical

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `+` | `{{a + b}}` | Addition | [→](/reference/binding/operators/addition) |
| `-` | `{{a - b}}` | Subtraction | [→](/reference/binding/operators/subtraction) |
| `*` | `{{a * b}}` | Multiplication | [→](/reference/binding/operators/multiplication) |
| `/` | `{{a / b}}` | Division | [→](/reference/binding/operators/division) |
| `%` | `{{a % b}}` | Modulus (remainder) | [→](/reference/binding/operators/modulus) |
| `^` | `{{a ^ b}}` | Power (exponentiation) | [→](/reference/binding/operators/power) |

### Comparison

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `==` | `{{a == b}}` | Equality | [→](/reference/binding/operators/equality) |
| `!=` | `{{a != b}}` | Inequality | [→](/reference/binding/operators/inequality) |
| `<` | `{{a < b}}` | Less than | [→](/reference/binding/operators/lessthan) |
| `<=` | `{{a <= b}}` | Less than or equal | [→](/reference/binding/operators/lessorequal) |
| `>` | `{{a > b}}` | Greater than | [→](/reference/binding/operators/greaterthan) |
| `>=` | `{{a >= b}}` | Greater than or equal | [→](/reference/binding/operators/greaterorequal) |

### Logical

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `&&` | `{{a && b}}` | Logical AND | [→](/reference/binding/operators/and) |
| `\|\|` | `{{a \|\| b}}` | Logical OR | [→](/reference/binding/operators/or) |
| `!` | `{{!a}}` | Logical NOT | |

### Navigation & Null Handling

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `.` | `{{model.address.city}}` | Property access | |
| `[]` | `{{items[0]}}` | Array index access | |
| `..` | `{{../parentValue}}` | Navigate to parent context | |
| `??` | `{{value ?? 'default'}}` | Null coalescing — returns right side if left is null | [→](/reference/binding/operators/nullcoalesce) |
| `this` | `{{this.name}}` | Current context reference | |

{% endraw %}

---

## Special Variables

Available automatically in specific contexts.

{% raw %}

| Variable | Context | Description |
|----------|---------|-------------|
| `@index` | `{{#each}}` loops | Zero-based index of the current item |
| `@first` | `{{#each}}` loops | `true` if this is the first item |
| `@last` | `{{#each}}` loops | `true` if this is the last item |
| `this` | Any | Current data context |
| `.` | Any | Shorthand for current context |
| `..` | Nested contexts | Parent context reference |
| `model` | Root | Root data model (from `doc.Params["model"]`) |

{% endraw %}

---

## Functions

### Conversion

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [string](/reference/binding/functions/format) | `string(value, format?)` | Convert to string with optional format | |
| [int](/reference/binding/functions/int) | `int(value)` | Convert to 32-bit integer | |
| [long](/reference/binding/functions/long) | `long(value)` | Convert to 64-bit integer | |
| [double](/reference/binding/functions/double) | `double(value)` | Convert to double-precision float | |
| [decimal](/reference/binding/functions/decimal) | `decimal(value)` | Convert to decimal number | |
| [bool](/reference/binding/functions/bool) | `bool(value)` | Convert to boolean | |
| [date](/reference/binding/functions/date) | `date(value)` | Convert to DateTime | |
| [typeof](/reference/binding/functions/typeof) | `typeof(value)` | Returns the type name as a string | |

### String

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [concat](/reference/binding/functions/concat) | `concat(s1, s2, ...)` | Concatenate strings | |
| [join](/reference/binding/functions/join) | `join(separator, array)` | Join array elements with a separator | |
| [substring](/reference/binding/functions/substring) | `substring(str, start, length?)` | Extract a portion of a string | |
| [replace](/reference/binding/functions/replace) | `replace(str, find, replace)` | Replace text in a string | |
| [toLower](/reference/binding/functions/toLower) | `toLower(str)` | Convert to lowercase | |
| [toUpper](/reference/binding/functions/toUpper) | `toUpper(str)` | Convert to uppercase | |
| [trim](/reference/binding/functions/trim) | `trim(str)` | Remove whitespace from both ends | |
| [trimEnd](/reference/binding/functions/trimEnd) | `trimEnd(str)` | Remove trailing whitespace | |
| [length](/reference/binding/functions/length) | `length(str)` | Get string length | |
| [contains](/reference/binding/functions/contains) | `contains(str, search)` | Check if string contains text | |
| [startsWith](/reference/binding/functions/startsWith) | `startsWith(str, prefix)` | Check if string starts with prefix | |
| [endsWith](/reference/binding/functions/endsWith) | `endsWith(str, suffix)` | Check if string ends with suffix | |
| [indexOf](/reference/binding/functions/indexOf) | `indexOf(str, search)` | Find position of a substring | |
| [padLeft](/reference/binding/functions/padLeft) | `padLeft(str, len, char)` | Pad string on the left | |
| [padRight](/reference/binding/functions/padRight) | `padRight(str, len, char)` | Pad string on the right | |
| [split](/reference/binding/functions/split) | `split(str, separator)` | Split string into an array | |
| [format](/reference/binding/functions/format) | `format(value, formatStr)` | Format value using a .NET format string | |
| [regexIsMatch](/reference/binding/functions/regexIsMatch) | `regexIsMatch(str, pattern)` | Test if string matches a regex | |
| [regexMatches](/reference/binding/functions/regexMatches) | `regexMatches(str, pattern)` | Return all regex matches | |
| [regexSwap](/reference/binding/functions/regexSwap) | `regexSwap(str, pattern, replacement)` | Replace using a regex | |

### Mathematical

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [abs](/reference/binding/functions/abs) | `abs(value)` | Absolute value | |
| [ceiling](/reference/binding/functions/ceiling) | `ceiling(value)` | Round up to nearest integer | |
| [floor](/reference/binding/functions/floor) | `floor(value)` | Round down to nearest integer | |
| [round](/reference/binding/functions/round) | `round(value, decimals?)` | Round to nearest value | |
| [truncate](/reference/binding/functions/truncate) | `truncate(value)` | Remove decimal portion | |
| [sqrt](/reference/binding/functions/sqrt) | `sqrt(value)` | Square root | |
| [pow](/reference/binding/functions/pow) | `pow(base, exponent)` | Raise to a power | |
| [exp](/reference/binding/functions/exp) | `exp(value)` | e raised to a power | |
| [log](/reference/binding/functions/log) | `log(value)` | Natural logarithm | |
| [log10](/reference/binding/functions/log10) | `log10(value)` | Base-10 logarithm | |
| [sign](/reference/binding/functions/sign) | `sign(value)` | Returns -1, 0, or 1 | |
| [sin](/reference/binding/functions/sin) | `sin(angle)` | Sine (radians) | |
| [cos](/reference/binding/functions/cos) | `cos(angle)` | Cosine (radians) | |
| [tan](/reference/binding/functions/tan) | `tan(angle)` | Tangent (radians) | |
| [asin](/reference/binding/functions/asin) | `asin(value)` | Arcsine | |
| [acos](/reference/binding/functions/acos) | `acos(value)` | Arccosine | |
| [atan](/reference/binding/functions/atan) | `atan(value)` | Arctangent | |
| [degrees](/reference/binding/functions/degrees) | `degrees(radians)` | Convert radians to degrees | |
| [radians](/reference/binding/functions/radians) | `radians(degrees)` | Convert degrees to radians | |
| [pi](/reference/binding/functions/pi) | `pi()` | π constant (3.14159…) | |
| [e](/reference/binding/functions/e) | `e()` | Euler's number (2.71828…) | |
| [random](/reference/binding/functions/random) | `random()` | Random value between 0 and 1 | |

### Date & Time

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [addDays](/reference/binding/functions/addDays) | `addDays(date, n)` | Add days to a date | |
| [addMonths](/reference/binding/functions/addMonths) | `addMonths(date, n)` | Add months to a date | |
| [addYears](/reference/binding/functions/addYears) | `addYears(date, n)` | Add years to a date | |
| [addHours](/reference/binding/functions/addHours) | `addHours(date, n)` | Add hours to a date | |
| [addMinutes](/reference/binding/functions/addMinutes) | `addMinutes(date, n)` | Add minutes to a date | |
| [addSeconds](/reference/binding/functions/addSeconds) | `addSeconds(date, n)` | Add seconds to a date | |
| [addMilliseconds](/reference/binding/functions/addMilliseconds) | `addMilliseconds(date, n)` | Add milliseconds to a date | |
| [daysBetween](/reference/binding/functions/daysBetween) | `daysBetween(d1, d2)` | Days between two dates | |
| [hoursBetween](/reference/binding/functions/hoursBetween) | `hoursBetween(d1, d2)` | Hours between two dates | |
| [minutesBetween](/reference/binding/functions/minutesBetween) | `minutesBetween(d1, d2)` | Minutes between two dates | |
| [secondsBetween](/reference/binding/functions/secondsBetween) | `secondsBetween(d1, d2)` | Seconds between two dates | |
| [yearOf](/reference/binding/functions/yearOf) | `yearOf(date)` | Extract the year | |
| [monthOfYear](/reference/binding/functions/monthOfYear) | `monthOfYear(date)` | Extract the month (1–12) | |
| [dayOfMonth](/reference/binding/functions/dayOfMonth) | `dayOfMonth(date)` | Extract the day of month | |
| [dayOfWeek](/reference/binding/functions/dayOfWeek) | `dayOfWeek(date)` | Extract the day of week | |
| [dayOfYear](/reference/binding/functions/dayOfYear) | `dayOfYear(date)` | Extract the day of year (1–365) | |
| [hourOf](/reference/binding/functions/hourOf) | `hourOf(date)` | Extract the hour (0–23) | |
| [minuteOf](/reference/binding/functions/minuteOf) | `minuteOf(date)` | Extract the minute (0–59) | |
| [secondOf](/reference/binding/functions/secondOf) | `secondOf(date)` | Extract the second (0–59) | |
| [millisecondOf](/reference/binding/functions/millisecondOf) | `millisecondOf(date)` | Extract the millisecond (0–999) | |

### Logical

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [if](/reference/binding/functions/if) | `if(condition, trueVal, falseVal)` | Ternary conditional | |
| [ifError](/reference/binding/functions/ifError) | `ifError(expression, fallback)` | Return fallback if expression throws | |
| [in](/reference/binding/functions/in) | `in(value, a, b, ...)` | Check if value exists in a list | |

### Collection

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [count](/reference/binding/functions/count) | `count(array)` | Count elements | |
| [countOf](/reference/binding/functions/countOf) | `countOf(array)` | Alias for `count()` | |
| [sum](/reference/binding/functions/sum) | `sum(array)` | Sum numeric values | |
| [sumOf](/reference/binding/functions/sumOf) | `sumOf(array, 'prop')` | Sum a property across elements | |
| [min](/reference/binding/functions/min) | `min(array)` | Minimum value | |
| [minOf](/reference/binding/functions/minOf) | `minOf(array, 'prop')` | Minimum of a property | |
| [max](/reference/binding/functions/max) | `max(array)` | Maximum value | |
| [maxOf](/reference/binding/functions/maxOf) | `maxOf(array, 'prop')` | Maximum of a property | |
| [collect](/reference/binding/functions/collect) | `collect(expr, array)` | Map an expression over an array | |
| [each](/reference/binding/functions/count) | `each(array)` | Iterate over array (returns array) | |
| [firstWhere](/reference/binding/functions/firstWhere) | `firstWhere(array, condition)` | First matching element | |
| [selectWhere](/reference/binding/functions/selectWhere) | `selectWhere(array, condition)` | Filter array by condition | |
| [sortBy](/reference/binding/functions/sortBy) | `sortBy(array, 'prop')` | Sort by property | |
| [reverse](/reference/binding/functions/reverse) | `reverse(array)` | Reverse array order | |

### Statistical

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [average](/reference/binding/functions/average) | `average(array)` | Mean of array values | |
| [averageOf](/reference/binding/functions/averageOf) | `averageOf(array, 'prop')` | Mean of a property | |
| [mean](/reference/binding/functions/mean) | `mean(array)` | Alias for `average()` | |
| [median](/reference/binding/functions/median) | `median(array)` | Middle value | |
| [mode](/reference/binding/functions/mode) | `mode(array)` | Most common value | |

### CSS / Document

| Function | Signature | Description | Reference |
|----------|-----------|-------------|-----------|
| [calc](/reference/binding/functions/calc) | `calc(expression)` | CSS calculation (prefer inline operators) | |
| [var](/reference/binding/functions/var) | `var(--name)` | Read a CSS custom property value | |

---

## Custom Functions & Operators

The binding system can be extended with custom functions and operators registered at startup:

```csharp
// Register a custom function
BindingCalcExpressionFactory.RegisterFunction(new MyCustomFunction());

// Register a custom operator
BindingCalcExpressionFactory.RegisterOperator(new MyCustomOperator());
```

See the [Configuration section](/configuration/) for more on extending Scryber.

---

## Common Patterns

{% raw %}

**Format a currency value:**
```handlebars
{{format(price, 'C2')}}
```

**Format a date:**
```handlebars
{{format(orderDate, 'yyyy-MM-dd')}}
```

**Conditional class:**
```handlebars
<div class="{{if(isActive, 'active', 'inactive')}}">
```

**Null-safe navigation:**
```handlebars
{{user.address.city ?? 'No city'}}
```

**Sum a collection property:**
```handlebars
Total: {{format(sumOf(items, 'price'), 'C2')}}
```

**Loop with index:**
```handlebars
{{#each items}}
  <p>{{@index}}. {{this.name}}</p>
{{/each}}
```

{% endraw %}

---

## See Also

- [Data Binding Reference](/reference/binding/)
- [Binding Functions](/reference/binding/functions/)
- [Binding Helpers](/reference/binding/helpers/)
- [Binding Operators](/reference/binding/operators/)
- [HTML Tags Support](/quickstart/feature_html_tags)
- [CSS Styles Support](/quickstart/feature_css_styles)
