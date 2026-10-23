---
layout: default
title: Values & Navigation
parent: Data Binding
parent_url: /paperwork.core/reference/binding/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: true
has_toc: false
nav_order: 3
---

# Values & Navigation
{: .no_toc }

How a binding expression finds a value in the data: by name, through properties and indexes, relative to the current item, and grouped with parentheses.

| Syntax | Example | Description |
|--------|---------|-------------|
| [Names](names) | {% raw %}`{{model}}`{% endraw %} | The data added with `WithData(name, value)`, and template variables |
| [`.` Property access](dot) | {% raw %}`{{model.customer.name}}`{% endraw %} | A property of a value |
| [`[]` Indexer](indexer) | {% raw %}`{{model.items[0]}}`, `{{model.rates["GBP"]}}`{% endraw %} | An item in an array, list or dictionary |
| [`this` and `.`](this) | {% raw %}`{{this.name}}`, `{{.name}}`{% endraw %} | The current item in a loop or `with` block |
| [`../` Parent](parent) | {% raw %}`{{../title}}`{% endraw %} | The enclosing data context, one level up |
| [`( )` Parentheses](parentheses) | {% raw %}`{{(price + shipping) * qty}}`{% endraw %} | Group part of an expression so it is evaluated first |

See also the [loop variables](/paperwork.core/reference/binding/variables/) `@index`, `@first` and `@last`.
