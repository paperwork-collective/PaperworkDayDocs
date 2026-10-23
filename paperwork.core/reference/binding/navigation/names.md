---
layout: default
title: "Names (model)"
parent: Values & Navigation
parent_url: /paperwork.core/reference/binding/navigation/
grand_parent: Data Binding
grand_parent_url: /paperwork.core/reference/binding/
has_children: false
has_toc: false
nav_order: 1
---

# Names : Data and Variable Names
{: .no_toc }

A name at the start of an expression refers to the data added to the document, or to a template variable.

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

## Syntax

{% raw %}
```
{{name}}
{{name.property}}
```
{% endraw %}

---

## Data names

Each call to `WithData(name, value)` on the document builder adds a value that the template refers to by that name. `model` is the conventional name for the main data, but any name can be used.

```csharp
await factory.NewDocument()
    .WithLayoutFile("report.html")
    .WithData("model", report)
    .WithData("title", "Quarterly Report")
    .SaveAsync("report.pdf");
```

{% raw %}
```html
<h1>{{title}}</h1>
<p>{{model.customer.name}}</p>
```
{% endraw %}

Names are available everywhere in the template - inside loops and `with` blocks too - so `../` is not needed to reach them.

Fields added with `WithField(id, value)` are available as {% raw %}`{{$fields["id"]}}`{% endraw %}.

---

## Template variables

A value stored with a `<var>` element is also referred to by its name. See [the var element](/paperwork.core/reference/htmltags/elements/html_var_element).

{% raw %}
```html
<var data-id='total' data-value='{{sumOf(model.items, .price)}}' />
<p>Total: {{total}}</p>
```
{% endraw %}

---

## Notes

- Names are case sensitive: `{{Model}}` is not `{{model}}`.
- A name that has not been set gives no value, and nothing is output. Use `??` to give a default, e.g. {% raw %}`{{title ?? 'Untitled'}}`{% endraw %}.

---

## See Also

- [Property access](dot)
- [this](this)
- [Null coalescing ??](/paperwork.core/reference/binding/operators/nullcoalesce)
