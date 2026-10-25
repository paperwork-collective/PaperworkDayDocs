---
layout: default
title: Binding Expressions Support
parent: Quick Start
parent_url: /paperwork.core/quickstart/quickstart_core
has_children: false
has_toc: false
nav_order: 4
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
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
| CSS calc | `{{calc(100% - 20pt)}}` | CSS calculation |

{% endraw %}

---

## Handlebars Helpers

Block-level helpers for control flow and iteration.

{% raw %}

| Helper | Syntax | Description |
|--------|--------|-------------|
| [each](/paperwork.core/reference/binding/helpers/each) | `{{#each items}}...{{/each}}` | Iterate over a collection; access current item with `{{this}}` |
| [with](/paperwork.core/reference/binding/helpers/with) | `{{#with object}}...{{/with}}` | Change the data context to a specific object |
| [if](/paperwork.core/reference/binding/helpers/if) | `{{#if condition}}...{{/if}}` | Conditional block; condition is any expression |
| [else if](/paperwork.core/reference/binding/helpers/elseif) | `{{else if condition}}` | Additional branch in an `if` block |
| [else](/paperwork.core/reference/binding/helpers/else) | `{{else}}` | Fallback branch when no condition is met |
| [log](/paperwork.core/reference/binding/helpers/log) | `{{log "message"}}` | Writes a debug message to the trace log |

{% endraw %}

---

## Operators

{% raw %}

Used within `{{expression}}` bindings. Operator precedence follows standard mathematical rules.

### Mathematical

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `+` | `{{a + b}}` | Addition | [→](/paperwork.core/reference/binding/operators/addition) |
| `-` | `{{a - b}}` | Subtraction | [→](/paperwork.core/reference/binding/operators/subtraction) |
| `*` | `{{a * b}}` | Multiplication | [→](/paperwork.core/reference/binding/operators/multiplication) |
| `/` | `{{a / b}}` | Division | [→](/paperwork.core/reference/binding/operators/division) |
| `%` | `{{a % b}}` | Modulus (remainder) | [→](/paperwork.core/reference/binding/operators/modulus) |
| `^` | `{{a ^ b}}` | Power (exponentiation) | [→](/paperwork.core/reference/binding/operators/power) |

### Comparison

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `==` | `{{a == b}}` | Equality | [→](/paperwork.core/reference/binding/operators/equality) |
| `!=` | `{{a != b}}` | Inequality | [→](/paperwork.core/reference/binding/operators/inequality) |
| `<` | `{{a < b}}` | Less than | [→](/paperwork.core/reference/binding/operators/lessthan) |
| `<=` | `{{a <= b}}` | Less than or equal | [→](/paperwork.core/reference/binding/operators/lessorequal) |
| `>` | `{{a > b}}` | Greater than | [→](/paperwork.core/reference/binding/operators/greaterthan) |
| `>=` | `{{a >= b}}` | Greater than or equal | [→](/paperwork.core/reference/binding/operators/greaterorequal) |

### Logical

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `&&` | `{{a && b}}` | Logical AND | [→](/paperwork.core/reference/binding/operators/and) |
| <code>&#124;&#124;</code> | <code>{{a &#124;&#124; b}}</code> | Logical OR | [→](/paperwork.core/reference/binding/operators/or) |
| `!` | `{{!a}}` | Logical NOT | |

### Navigation & Null Handling

| Operator | Example | Description | Reference |
|----------|---------|-------------|-----------|
| `.` | `{{model.address.city}}` | Property access | [→](/paperwork.core/reference/binding/navigation/dot) |
| `[]` | `{{items[0]}}`, `{{rates["GBP"]}}` | Array, list and dictionary index access | [→](/paperwork.core/reference/binding/navigation/indexer) |
| `../` | `{{../parentValue}}` | Parent context - one level only, cannot be chained | [→](/paperwork.core/reference/binding/navigation/parent) |
| `( )` | `{{(a + b) * c}}` | Grouping - evaluated first | [→](/paperwork.core/reference/binding/navigation/parentheses) |
| `??` | `{{value ?? 'default'}}` | Null coalescing — returns right side if left is null | [→](/paperwork.core/reference/binding/operators/nullcoalesce) |
| `this` | `{{this.name}}` | Current context reference | [→](/paperwork.core/reference/binding/navigation/this) |

{% endraw %}

---

## Special Variables

Available automatically in specific contexts.

{% raw %}

| Variable | Context | Description |
|----------|---------|-------------|
| [`@index`](/paperwork.core/reference/binding/variables/at_index) | `{{#each}}` loops | Zero-based index of the current item |
| [`@first`](/paperwork.core/reference/binding/variables/at_first) | `{{#each}}` loops | `true` if this is the first item (9.8) |
| [`@last`](/paperwork.core/reference/binding/variables/at_last) | `{{#each}}` loops | `true` if this is the last item (9.8) |
| [`@key`](/paperwork.core/reference/binding/variables/at_key) | `{{#each}}` loops | The key of the current entry for a dictionary or object, or the index for a collection (9.8) |
| [`this`](/paperwork.core/reference/binding/navigation/this) | Any | Current data context |
| [`.`](/paperwork.core/reference/binding/navigation/this) | Any | Shorthand for current context |
| [`../`](/paperwork.core/reference/binding/navigation/parent) | Nested contexts | Parent context - one level only |
| [`model`](/paperwork.core/reference/binding/navigation/names) | Root | Data added with `WithData("model", ...)` - any name can be used |

{% endraw %}

---

## Functions

### Conversion

| Function | Signature | Description |
|----------|-----------|-------------|
| [string](/paperwork.core/reference/binding/functions/format) | `string(value, format?)` | Convert to string with optional format |
| [int](/paperwork.core/reference/binding/functions/int) | `int(value)` | Convert to 32-bit integer |
| [long](/paperwork.core/reference/binding/functions/long) | `long(value)` | Convert to 64-bit integer |
| [double](/paperwork.core/reference/binding/functions/double) | `double(value)` | Convert to double-precision float |
| [decimal](/paperwork.core/reference/binding/functions/decimal) | `decimal(value)` | Convert to decimal number |
| [bool](/paperwork.core/reference/binding/functions/bool) | `bool(value)` | Convert to boolean |
| [date](/paperwork.core/reference/binding/functions/date) | `date(value)` | Convert to DateTime |
| [typeof](/paperwork.core/reference/binding/functions/typeof) | `typeof(value)` | Returns the type name as a string |

### String

| Function | Signature | Description |
|----------|-----------|-------------|
| [concat](/paperwork.core/reference/binding/functions/concat) | `concat(s1, s2, ...)` | Concatenate strings |
| [join](/paperwork.core/reference/binding/functions/join) | `join(separator, array)` | Join array elements with a separator |
| [substring](/paperwork.core/reference/binding/functions/substring) | `substring(str, start, length?)` | Extract a portion of a string |
| [replace](/paperwork.core/reference/binding/functions/replace) | `replace(str, find, replace)` | Replace text in a string |
| [toLower](/paperwork.core/reference/binding/functions/toLower) | `toLower(str)` | Convert to lowercase |
| [toUpper](/paperwork.core/reference/binding/functions/toUpper) | `toUpper(str)` | Convert to uppercase |
| [trim](/paperwork.core/reference/binding/functions/trim) | `trim(str)` | Remove whitespace from both ends |
| [trimEnd](/paperwork.core/reference/binding/functions/trimEnd) | `trimEnd(str)` | Remove trailing whitespace |
| [length](/paperwork.core/reference/binding/functions/length) | `length(str)` | Get string length |
| [contains](/paperwork.core/reference/binding/functions/contains) | `contains(str, search)` | Check if string contains text |
| [startsWith](/paperwork.core/reference/binding/functions/startsWith) | `startsWith(str, prefix)` | Check if string starts with prefix |
| [endsWith](/paperwork.core/reference/binding/functions/endsWith) | `endsWith(str, suffix)` | Check if string ends with suffix |
| [indexOf](/paperwork.core/reference/binding/functions/indexOf) | `indexOf(str, search)` | Find position of a substring |
| [padLeft](/paperwork.core/reference/binding/functions/padLeft) | `padLeft(str, len, char)` | Pad string on the left |
| [padRight](/paperwork.core/reference/binding/functions/padRight) | `padRight(str, len, char)` | Pad string on the right |
| [split](/paperwork.core/reference/binding/functions/split) | `split(str, separator)` | Split string into an array |
| [format](/paperwork.core/reference/binding/functions/format) | `format(value, formatStr)` | Format value using a .NET format string |
| [isMatch](/paperwork.core/reference/binding/functions/isMatch) | `isMatch(str, pattern)` | Test if string matches a regex |
| [matches](/paperwork.core/reference/binding/functions/matches) | `matches(str, pattern)` | Return all regex matches |
| [swap](/paperwork.core/reference/binding/functions/swap) | `swap(str, pattern, replacement)` | Replace using a regex |

### Mathematical

| Function | Signature | Description |
|----------|-----------|-------------|
| [abs](/paperwork.core/reference/binding/functions/abs) | `abs(value)` | Absolute value |
| [ceiling](/paperwork.core/reference/binding/functions/ceiling) | `ceiling(value)` | Round up to nearest integer |
| [floor](/paperwork.core/reference/binding/functions/floor) | `floor(value)` | Round down to nearest integer |
| [round](/paperwork.core/reference/binding/functions/round) | `round(value, decimals?)` | Round to nearest value |
| [truncate](/paperwork.core/reference/binding/functions/truncate) | `truncate(value)` | Remove decimal portion |
| [sqrt](/paperwork.core/reference/binding/functions/sqrt) | `sqrt(value)` | Square root |
| [pow](/paperwork.core/reference/binding/functions/pow) | `pow(base, exponent)` | Raise to a power |
| [exp](/paperwork.core/reference/binding/functions/exp) | `exp(value)` | e raised to a power |
| [log](/paperwork.core/reference/binding/functions/log) | `log(value)` | Natural logarithm |
| [log10](/paperwork.core/reference/binding/functions/log10) | `log10(value)` | Base-10 logarithm |
| [sign](/paperwork.core/reference/binding/functions/sign) | `sign(value)` | Returns -1, 0, or 1 |
| [sin](/paperwork.core/reference/binding/functions/sin) | `sin(angle)` | Sine (rad) |
| [cos](/paperwork.core/reference/binding/functions/cos) | `cos(angle)` | Cosine (rad) |
| [tan](/paperwork.core/reference/binding/functions/tan) | `tan(angle)` | Tangent (rad) |
| [asin](/paperwork.core/reference/binding/functions/asin) | `asin(value)` | Arcsine |
| [acos](/paperwork.core/reference/binding/functions/acos) | `acos(value)` | Arccosine |
| [atan](/paperwork.core/reference/binding/functions/atan) | `atan(value)` | Arctangent |
| [deg](/paperwork.core/reference/binding/functions/deg) | `deg(rad)` | Convert radians to degrees |
| [rad](/paperwork.core/reference/binding/functions/rad) | `rad(deg)` | Convert degrees to radians |
| [pi](/paperwork.core/reference/binding/functions/pi) | `pi()` | π constant (3.14159…) |
| [e](/paperwork.core/reference/binding/functions/e) | `e()` | Euler's number (2.71828…) |
| [random](/paperwork.core/reference/binding/functions/random) | `random()` | Random value between 0 and 1 |

### Date & Time

| Function | Signature | Description |
|----------|-----------|-------------|
| [addDays](/paperwork.core/reference/binding/functions/addDays) | `addDays(date, n)` | Add days to a date |
| [addMonths](/paperwork.core/reference/binding/functions/addMonths) | `addMonths(date, n)` | Add months to a date |
| [addYears](/paperwork.core/reference/binding/functions/addYears) | `addYears(date, n)` | Add years to a date |
| [addHours](/paperwork.core/reference/binding/functions/addHours) | `addHours(date, n)` | Add hours to a date |
| [addMinutes](/paperwork.core/reference/binding/functions/addMinutes) | `addMinutes(date, n)` | Add minutes to a date |
| [addSeconds](/paperwork.core/reference/binding/functions/addSeconds) | `addSeconds(date, n)` | Add seconds to a date |
| [addMilliseconds](/paperwork.core/reference/binding/functions/addMilliseconds) | `addMilliseconds(date, n)` | Add milliseconds to a date |
| [daysBetween](/paperwork.core/reference/binding/functions/daysBetween) | `daysBetween(d1, d2)` | Days between two dates |
| [hoursBetween](/paperwork.core/reference/binding/functions/hoursBetween) | `hoursBetween(d1, d2)` | Hours between two dates |
| [minutesBetween](/paperwork.core/reference/binding/functions/minutesBetween) | `minutesBetween(d1, d2)` | Minutes between two dates |
| [secondsBetween](/paperwork.core/reference/binding/functions/secondsBetween) | `secondsBetween(d1, d2)` | Seconds between two dates |
| [yearOf](/paperwork.core/reference/binding/functions/yearOf) | `yearOf(date)` | Extract the year |
| [monthOf](/paperwork.core/reference/binding/functions/monthOf) | `monthOf(date)` | Extract the month (1–12) |
| [dayOfMonth](/paperwork.core/reference/binding/functions/dayOfMonth) | `dayOfMonth(date)` | Extract the day of month |
| [dayOfWeek](/paperwork.core/reference/binding/functions/dayOfWeek) | `dayOfWeek(date)` | Extract the day of week |
| [dayOfYear](/paperwork.core/reference/binding/functions/dayOfYear) | `dayOfYear(date)` | Extract the day of year (1–365) |
| [hourOf](/paperwork.core/reference/binding/functions/hourOf) | `hourOf(date)` | Extract the hour (0–23) |
| [minuteOf](/paperwork.core/reference/binding/functions/minuteOf) | `minuteOf(date)` | Extract the minute (0–59) |
| [secondOf](/paperwork.core/reference/binding/functions/secondOf) | `secondOf(date)` | Extract the second (0–59) |
| [millisecondOf](/paperwork.core/reference/binding/functions/millisecondOf) | `millisecondOf(date)` | Extract the millisecond (0–999) |

### Logical

| Function | Signature | Description |
|----------|-----------|-------------|
| [if](/paperwork.core/reference/binding/functions/if) | `if(condition, trueVal, falseVal)` | Ternary conditional |
| [ifError](/paperwork.core/reference/binding/functions/ifError) | `ifError(expression, fallback)` | Return fallback if expression throws |
| [in](/paperwork.core/reference/binding/functions/in) | `in(value, a, b, ...)` | Check if value exists in a list |

### Collection

| Function | Signature | Description |
|----------|-----------|-------------|
| [count](/paperwork.core/reference/binding/functions/count) | `count(array)` | Count elements |
| [countOf](/paperwork.core/reference/binding/functions/countOf) | `countOf(array)` | Alias for `count()` |
| [sum](/paperwork.core/reference/binding/functions/sum) | `sum(array)` | Sum numeric values |
| [sumOf](/paperwork.core/reference/binding/functions/sumOf) | `sumOf(array, 'prop')` | Sum a property across elements |
| [min](/paperwork.core/reference/binding/functions/min) | `min(array)` | Minimum value |
| [minOf](/paperwork.core/reference/binding/functions/minOf) | `minOf(array, 'prop')` | Minimum of a property |
| [max](/paperwork.core/reference/binding/functions/max) | `max(array)` | Maximum value |
| [maxOf](/paperwork.core/reference/binding/functions/maxOf) | `maxOf(array, 'prop')` | Maximum of a property |
| [collect](/paperwork.core/reference/binding/functions/collect) | `collect(expr, array)` | Map an expression over an array |
| [each](/paperwork.core/reference/binding/functions/count) | `each(array)` | Iterate over array (returns array) |
| [firstWhere](/paperwork.core/reference/binding/functions/firstWhere) | `firstWhere(array, condition)` | First matching element |
| [selectWhere](/paperwork.core/reference/binding/functions/selectWhere) | `selectWhere(array, condition)` | Filter array by condition |
| [sortBy](/paperwork.core/reference/binding/functions/sortBy) | `sortBy(array, 'prop')` | Sort by property |
| [reverse](/paperwork.core/reference/binding/functions/reverse) | `reverse(array)` | Reverse array order |

### Statistical

| Function | Signature | Description |
|----------|-----------|-------------|
| [average](/paperwork.core/reference/binding/functions/average) | `average(array)` | Mean of array values |
| [averageOf](/paperwork.core/reference/binding/functions/averageOf) | `averageOf(array, 'prop')` | Mean of a property |
| [mean](/paperwork.core/reference/binding/functions/mean) | `mean(array)` | Alias for `average()` |
| [median](/paperwork.core/reference/binding/functions/median) | `median(array)` | Middle value |
| [mode](/paperwork.core/reference/binding/functions/mode) | `mode(array)` | Most common value |

### CSS / Document

| Function | Signature | Description |
|----------|-----------|-------------|
| [calc](/paperwork.core/reference/binding/functions/calc) | `calc(expression)` | CSS calculation (prefer inline operators) |
| [var](/paperwork.core/reference/binding/functions/var) | `var(--name)` | Read a CSS custom property value |

---

## Custom Functions & Operators

The binding system can be extended with your own functions, registered once at startup. A function inherits from `FunctionBase`, and is used in templates by its `Name`.

```csharp
using Scryber.Binding;
using Scryber.Expressive;
using Scryber.Expressive.Expressions;
using Scryber.Expressive.Functions;

public class InitialsFunction : FunctionBase
{
    public override string Name => "initials";

    public override object Evaluate(IExpression[] parameters, IDictionary<string, object> variables, ExpressionContext context)
    {
        this.ValidateParameterCount(parameters, 1, 1);

        var text = parameters[0].Evaluate(variables)?.ToString();
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        return string.Concat(text.Split(' ', StringSplitOptions.RemoveEmptyEntries).Select(w => char.ToUpper(w[0])));
    }
}

// Once, at startup
BindingCalcExpressionFactory.RegisterFunction(new InitialsFunction());
```

{% raw %}
```html
<p>{{initials(model.name)}}</p>   <!-- "Ada Mary Lovelace" → AML -->
```
{% endraw %}

Custom operators implement `IOperator` (in `Scryber.Expressive.Operators`) and are registered with `BindingCalcExpressionFactory.RegisterOperator(...)`.

---

## Common Patterns

{% raw %}

**Format a currency value:**
```handlebars
{{format(model.price, 'C2')}}
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
Total: {{format(sumOf(items, .price), 'C2')}}
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

- [Data Binding Reference](/paperwork.core/reference/binding/)
- [Binding Functions](/paperwork.core/reference/binding/functions/)
- [Binding Helpers](/paperwork.core/reference/binding/helpers/)
- [Binding Operators](/paperwork.core/reference/binding/operators/)
- [HTML Tags Support](/paperwork.core/quickstart/feature_html_tags)
- [CSS Styles Support](/paperwork.core/quickstart/feature_css_styles)
