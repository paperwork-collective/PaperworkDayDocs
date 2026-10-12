---
layout: default
title: Handlebars Helpers
parent: Data Binding
parent_url: /paperwork.core/reference/binding/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: true
has_toc: false
---

# Handlebars Helpers Reference
{: .no_toc }

Handlebars-style block helpers for control flow and context management in Scryber templates.

---

<details open class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Overview

Handlebars helpers provide familiar syntax for common template patterns like iteration, conditionals, and context switching. They compile to native Scryber XML elements at parse time.

---

## Block Helpers

These helpers use `{% raw %}{{#helper}}...{{/helper}}{% endraw %}` syntax to wrap content.

| Helper | Description | Special Variables |
|--------|-------------|-------------------|
| [{% raw %}{{#each}}{% endraw %}](./each) | Iterate over arrays and collections | `@index`, `@first`, `@last` |
| [{% raw %}{{#with}}{% endraw %}](./with) | Switch data context to a specific object | `this`, `../` |
| [{% raw %}{{#if}}{% endraw %}](./if) | Conditional rendering based on expressions | - |

---

## Branch Helpers

These helpers work within block helpers to create conditional branches.

| Helper | Description | Used With |
|--------|-------------|-----------|
| [{% raw %}{{else if}}{% endraw %}](./elseif) | Alternative condition branch | `{% raw %}{{#if}}{% endraw %}` |
| [{{else}}](./else) | Fallback branch when conditions are false | `{% raw %}{{#if}}{% endraw %}`, `{% raw %}{{#each}}{% endraw %}`, `{% raw %}{{#with}}{% endraw %}` |

---

## Utility Helpers

| Helper | Description | Usage |
|--------|-------------|-------|
| [{{log}}](./log) | Debug output to console/trace | `{% raw %}{{log model.value level="debug"}}{% endraw %}` |

---

## Common Patterns

### Iteration with Conditionals





{% raw %}
```handlebars
{{#each model.items}}
  <div class="item {{if(@first, 'first', '')}}">
    {{#if this.isActive}}
      <span class="active">{{this.name}}</span>
    {{else}}
      <span class="inactive">{{this.name}}</span>
    {{/if}}
  </div>
{{/each}}
```
{% endraw %}





### Context Switching with Parent Access





{% raw %}
```handlebars
{{#with model.order}}
  <h2>Order #{{orderNumber}}</h2>

  {{#each items}}
    <div>{{this.name}} - Order #{{../orderNumber}}</div>
  {{/each}}
{{/with}}
```
{% endraw %}





### Multiple Conditions





{% raw %}
```handlebars
{{#if model.score >= 90}}
  <span class="grade-a">Excellent</span>
{{else if model.score >= 80}}
  <span class="grade-b">Good</span>
{{else if model.score >= 70}}
  <span class="grade-c">Average</span>
{{else}}
  <span class="grade-f">Needs Improvement</span>
{{/if}}
```
{% endraw %}





---

## See Also

- [Expression Functions](../functions/) - Built-in functions for data manipulation
- [Binding Operators](../operators/) - Mathematical, comparison, and logical operators
- [Data Binding Guide](../../learning/02-data-binding/01_data_binding_basics.html) - Complete guide to data binding

---
