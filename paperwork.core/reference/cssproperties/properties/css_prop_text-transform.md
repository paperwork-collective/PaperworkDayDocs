---
layout: default
title: text-transform
parent: CSS Properties
parent_url: /paperwork.core/reference/cssproperties/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# text-transform : Text Case Property
{: .no_toc }

The `text-transform` property changes the case of text as it is laid out, without changing the content. It is inherited, so it can be set on a container and applies to all the text inside.

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

## Usage

```css
text-transform: none;
text-transform: uppercase;
text-transform: lowercase;
text-transform: capitalize;
```

---

## Values

- **none** - The text is not changed. This is the default.
- **uppercase** - All the characters are converted to upper case.
- **lowercase** - All the characters are converted to lower case.
- **capitalize** - The first letter of each word is converted to upper case. The other letters are not changed.

---

## Examples

```html
<p style="text-transform: uppercase">upper case me</p>        <!-- UPPER CASE ME -->
<p style="text-transform: lowercase">LOWER Case ME</p>        <!-- lower case me -->
<p style="text-transform: capitalize">capitalize each word</p> <!-- Capitalize Each Word -->
```

### Inherited and overridden

```html
<style>
    .caps { text-transform: uppercase; }
    .caps .normal { text-transform: none; }
</style>

<div class="caps">
    <p>Inherited from the div</p>
    <p class="normal">Not Changed</p>
</div>
```

---

## Notes

- Inherited by child elements, and can be overridden by setting a different value on a child.
- With `capitalize` a word continues across inline elements, so `un<b>bro</b>ken` becomes `Unbroken`.
- Applies to the text content of the element. Generated values, such as page numbers, are not changed.
- The characters are converted using the invariant culture.
- Added in Paperwork.Core 9.8. In earlier versions the property is ignored.

---

## Data Binding

The value can be set from data.

{% raw %}
```html
<h1 style="text-transform: {{model.headingCase}}">{{model.title}}</h1>
```
{% endraw %}

---

## See Also

- [letter-spacing](css_prop_letter-spacing)
- [word-spacing](css_prop_word-spacing)
- [text-decoration](css_prop_text-decoration)
