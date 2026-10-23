---
layout: default
title: var
parent: HTML Elements
parent_url: /paperwork.core/reference/htmltags/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# &lt;var&gt; : The Variable Storage Element
{: .no_toc }


The `<var>` element is used to store values in the document data stack for later retrieval. It can store calculated values, intermediate results, or any data that needs to be accessed across different parts of the document, including within repeating templates.

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

## Summary

The `<var>` element serves a dual purpose in Scryber:
1. **Semantic Markup**: Represents a variable or mathematical expression (rendered in italic by default)
2. **Data Storage**: Stores values in the document parameters using `data-id` and `data-value` attributes

When a `<var>` element includes both `data-id` and `data-value` attributes, the value is stored in the document parameters under the `data-id` name, and can be used in any later [binding expression](/paperwork.core/reference/binding/) by that name, e.g. `{% raw %}{{totalAmount}}{% endraw %}`.

---

## Temporary and incrementing values

A `<var>` is a simple way to keep a value while the document is bound - a calculation used several times, a running total, or a counter. Set it once, then set it again with the same `data-id` to update it: the `data-value` is a [binding expression](/paperwork.core/reference/binding/), and can use the current value.

{% raw %}
```html
<!-- Start a counter and a running total -->
<var data-id='count' data-value='{{0}}'></var>
<var data-id='running' data-value='{{0}}'></var>

{{#each model.items}}
    <!-- Update them for each item -->
    <var data-id='count' data-value='{{count + 1}}'></var>
    <var data-id='running' data-value='{{running + this.price}}'></var>
    <p>{{count}}. {{this.name}} - running total {{running}}</p>
{{/each}}

<p>{{count}} items, total {{running}}</p>
```
{% endraw %}

- Values are set in document order, as the template is bound, so a value is only available after the `<var>` that sets it.
- A starting value is written as a binding, e.g. `{% raw %}{{0}}{% endraw %}` or `{% raw %}{{'text'}}{% endraw %}` - a plain `data-value='0'` is not read.
- See [Names](/paperwork.core/reference/binding/navigation/names) for how stored values are referred to in expressions.

---

## Usage





{% raw %}
```html
<!-- Store a value in the document data stack -->
<var data-id="totalAmount" data-value="{{model.total}}"></var>

<!-- Later retrieve the value anywhere in the document -->
<p>Total: {{totalAmount}}</p>

<!-- Within repeating templates -->
{{#each model.items}}
    <p>Item total: {{.price}}</p>
    <p>Grand total: {{totalAmount}}</p>
{{/each}}
```
{% endraw %}





---

## Supported Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-id` | string | The key name to store the value under in the document parameters |
| `data-value` | expression | The value to store (supports data binding expressions) |
| `id` | string | Unique identifier for the element |
| `class` | string | CSS class name(s) for styling |
| `style` | string | Inline CSS styles |
| `title` | string | Title text (tooltip) |
| `hidden` | string | If set to "hidden", the element is not visible |

---

## Data Storage and Retrieval

### Storing Values

Values are stored during the data binding phase using the `data-id` and `data-value` attributes:





{% raw %}
```html
<var data-id="myVariable" data-value="{{someExpression}}"></var>
```
{% endraw %}





### Retrieving Values

Stored values are referred to by their `data-id` name in any later expression:





{% raw %}
```html
{{myVariable}}
```
{% endraw %}





### Scope

Values stored in `<var>` elements are available:
- Throughout the entire document after they are set
- Inside nested data binding contexts (repeating templates)
- Across different sections and pages
- In conditional expressions and calculations

---

## Notes

- The `<var>` element is hidden automatically if it has no text content
- By default, any visible content is rendered in italic font style (semantic HTML behavior)
- Values are stored during the data binding phase, so they must be set before they are referenced
- The `data-value` attribute supports full expression syntax including calculations
- Stored values persist for the lifetime of the document generation
- Multiple `<var>` elements can be used to store different values with unique `data-id` keys

---

## Examples

### Example 1: Basic Value Storage





{% raw %}
```html
<var data-id="username" data-value="{{user.name}}"></var>
<p>Welcome back, {{username}}!</p>
```
{% endraw %}





### Example 2: Storing Calculated Values





{% raw %}
```html
<var data-id="totalPrice" data-value="{{product.price * product.quantity}}"></var>
<var data-id="taxAmount" data-value="{{totalPrice * 0.08}}"></var>
<var data-id="grandTotal" data-value="{{totalPrice + taxAmount}}"></var>

<p>Subtotal: ${{totalPrice}}</p>
<p>Tax (8%): ${{taxAmount}}</p>
<p>Grand Total: ${{grandTotal}}</p>
```
{% endraw %}





### Example 3: Using in Repeating Templates





{% raw %}
```html
<!-- Store the customer name at document level -->
<var data-id="customerName" data-value="{{invoice.customerName}}"></var>

<!-- Use it within a repeating template -->
<table>
    <thead>
        <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Customer</th>
        </tr>
    </thead>
    <tbody>
        {{#each invoice.items}}
        <tr>
            <td>{{.itemName}}</td>
            <td>{{.price}}</td>
            <td>{{customerName}}</td>
        </tr>
        {{/each}}
    </tbody>
</table>
```
{% endraw %}





### Example 4: Counter for Item Numbers





{% raw %}
```html
<var data-id="itemCount" data-value="{{0}}"></var>

{{#each model.products}}
    <var data-id="itemCount" data-value="{{itemCount + 1}}"></var>
    <p>Item #{{itemCount}}: {{.name}}</p>
{{/each}}
```
{% endraw %}





### Example 5: Storing Date Information





{% raw %}
```html
<!-- The date is passed in the data - a template cannot read the clock -->
<var data-id="reportDate" data-value="{{model.reportDate}}"></var>
<var data-id="reportYear" data-value="{{yearOf(model.reportDate)}}"></var>

<h1>Annual Report {{reportYear}}</h1>
<p>Generated on: {{reportDate}}</p>
```
{% endraw %}





### Example 6: Page Total Calculations





{% raw %}
```html
<!-- Store page number or section -->
<var data-id="currentSection" data-value="{{'Financial Summary'}}"></var>

<!-- Calculate total -->
<var data-id="pageTotal" data-value="{{0}}"></var>
{{#each model.transactions}}
    <var data-id="pageTotal" data-value="{{pageTotal + .amount}}"></var>
    <p>{{.description}}: ${{.amount}}</p>
{{/each}}

<p><strong>Section: {{currentSection}}</strong></p>
<p><strong>Total: ${{pageTotal}}</strong></p>
```
{% endraw %}





### Example 7: Conditional Logic with Stored Values





{% raw %}
```html
<var data-id="hasErrors" data-value="{{model.errorCount > 0}}"></var>
<var data-id="statusColor" data-value="{{if(hasErrors, 'red', 'green')}}"></var>

<div style="color: {{statusColor}}">
    <p>Status: {{if(hasErrors, 'Failed', 'Success')}}</p>
</div>
```
{% endraw %}





### Example 8: Multi-page Document with Consistent Data





{% raw %}
```html
<!-- Store company info at start -->
<var data-id="companyName" data-value="{{config.companyName}}"></var>
<var data-id="companyLogo" data-value="{{config.logoPath}}"></var>

<!-- Use on every page header -->
<header>
    <img src="{{companyLogo}}" alt="Logo" />
    <h1>{{companyName}}</h1>
</header>

<!-- Multiple pages can reference the same stored values -->
<section>
    <p>This report is provided by {{companyName}}</p>
</section>
```
{% endraw %}





### Example 9: Running Totals Across Sections





{% raw %}
```html
<var data-id="runningTotal" data-value="{{0}}"></var>

<h2>Q1 Sales</h2>
{{#each sales.q1}}
    <var data-id="runningTotal" data-value="{{runningTotal + .amount}}"></var>
    <p>{{.month}}: ${{.amount}} (Running Total: ${{runningTotal}})</p>
{{/each}}

<h2>Q2 Sales</h2>
{{#each sales.q2}}
    <var data-id="runningTotal" data-value="{{runningTotal + .amount}}"></var>
    <p>{{.month}}: ${{.amount}} (Running Total: ${{runningTotal}})</p>
{{/each}}

<h2>Year-to-Date Total: ${{runningTotal}}</h2>
```
{% endraw %}





### Example 10: Storing Complex Objects





{% raw %}
```html
<var data-id="selectedProduct" data-value="{{model.products[0]}}"></var>

<h2>Featured Product: {{selectedProduct.name}}</h2>
<p>Price: ${{selectedProduct.price}}</p>
<p>Description: {{selectedProduct.description}}</p>
```
{% endraw %}





### Example 11: Max/Min Value Tracking





{% raw %}
```html
<var data-id="maxValue" data-value="{{0}}"></var>
<var data-id="minValue" data-value="{{999999}}"></var>

{{#each model.measurements}}
    <var data-id="maxValue" data-value="{{if(.value &gt; maxValue, .value, maxValue)}}"></var>
    <var data-id="minValue" data-value="{{if(.value &lt; minValue, .value, minValue)}}"></var>
    <p>Reading: {{.value}}</p>
{{/each}}

<p>Maximum: {{maxValue}}</p>
<p>Minimum: {{minValue}}</p>
<p>Range: {{maxValue - minValue}}</p>
```
{% endraw %}





### Example 12: Invoice with Line Item Totals





{% raw %}
```html
<var data-id="invoiceNumber" data-value="{{invoice.number}}"></var>
<var data-id="invoiceSubtotal" data-value="{{0}}"></var>

<h1>Invoice #{{invoiceNumber}}</h1>

<table>
    <thead>
        <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        {{#each invoice.lineItems}}
        <tr>
            <var data-id="lineTotal" data-value="{{.quantity * .unitPrice}}"></var>
            <var data-id="invoiceSubtotal" data-value="{{invoiceSubtotal + lineTotal}}"></var>
            <td>{{.description}}</td>
            <td>{{.quantity}}</td>
            <td>${{.unitPrice}}</td>
            <td>${{lineTotal}}</td>
        </tr>
        {{/each}}
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Subtotal:</td>
            <td>${{invoiceSubtotal}}</td>
        </tr>
        <tr>
            <td colspan="3">Tax (8%):</td>
            <td>${{invoiceSubtotal * 0.08}}</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Total:</strong></td>
            <td><strong>${{invoiceSubtotal * 1.08}}</strong></td>
        </tr>
    </tfoot>
</table>
```
{% endraw %}





### Example 13: Nested Repeating Templates





{% raw %}
```html
<var data-id="reportTitle" data-value="{{report.title}}"></var>

{{#each report.departments}}
    <var data-id="deptName" data-value="{{.name}}"></var>
    <h2>{{deptName}} - {{reportTitle}}</h2>

    {{#each .employees}}
        <p>Employee: {{.name}} (Department: {{deptName}})</p>
        <p>Report: {{reportTitle}}</p>
    {{/each}}
{{/each}}
```
{% endraw %}





### Example 14: Storing Configuration Values





{% raw %}
```html
<!-- Store configuration at document start -->
<var data-id="currency" data-value="USD"></var>
<var data-id="currencySymbol" data-value="$"></var>
<var data-id="locale" data-value="en-US"></var>
<var data-id="dateFormat" data-value="MM/dd/yyyy"></var>

<!-- Use throughout document -->
<p>Amount: {{currencySymbol}}100.00 {{currency}}</p>
<p>Locale: {{locale}}</p>
```
{% endraw %}





### Example 15: Visible Content with Storage





{% raw %}
```html
<!-- Store value AND display it -->
<p>
    Tax Rate: <var data-id="taxRate" data-value="{{config.taxRate}}">{{config.taxRate}}%</var>
</p>

<!-- Later use the stored value in calculations -->
<p>Tax Amount: ${{orderTotal * taxRate / 100}}</p>
```
{% endraw %}





### Example 16: Accumulating Statistics





{% raw %}
```html
<var data-id="totalOrders" data-value="{{0}}"></var>
<var data-id="completedOrders" data-value="{{0}}"></var>
<var data-id="cancelledOrders" data-value="{{0}}"></var>

{{#each orders}}
    <var data-id="totalOrders" data-value="{{totalOrders + 1}}"></var>
    <var data-id="completedOrders" data-value="{{if(.status == 'completed', completedOrders + 1, completedOrders)}}"></var>
    <var data-id="cancelledOrders" data-value="{{if(.status == 'cancelled', cancelledOrders + 1, cancelledOrders)}}"></var>
    <p>Order {{.id}}: {{.status}}</p>
{{/each}}

<h2>Order Statistics</h2>
<p>Total Orders: {{totalOrders}}</p>
<p>Completed: {{completedOrders}}</p>
<p>Cancelled: {{cancelledOrders}}</p>
<p>Success Rate: {{completedOrders / totalOrders * 100}}%</p>
```
{% endraw %}





### Example 17: Section Headers with Context





{% raw %}
```html
{{#each report.sections}}
    <var data-id="sectionTitle" data-value="{{.title}}"></var>
    <var data-id="sectionIndex" data-value="{{$index + 1}}"></var>

    <h2>Section {{sectionIndex}}: {{sectionTitle}}</h2>

    {{#each .items}}
        <p>Item {{$index + 1}} in {{sectionTitle}}</p>
    {{/each}}
{{/each}}
```
{% endraw %}





### Example 18: Average Calculations





{% raw %}
```html
<var data-id="sum" data-value="{{0}}"></var>
<var data-id="count" data-value="{{0}}"></var>

{{#each model.scores}}
    <var data-id="sum" data-value="{{sum + .score}}"></var>
    <var data-id="count" data-value="{{count + 1}}"></var>
    <p>Score: {{.score}}</p>
{{/each}}

<p><strong>Average Score: {{sum / count}}</strong></p>
```
{% endraw %}





### Example 19: Conditional Display Based on Stored Values





{% raw %}
```html
<var data-id="itemCount" data-value="{{model.items.length}}"></var>
<var data-id="hasItems" data-value="{{itemCount > 0}}"></var>

<div data-if="{{hasItems}}">
    <p>Showing {{itemCount}} items</p>
    {{#each model.items}}
        <p>{{.name}}</p>
    </div>
{{/each}}

<div data-if="{{!hasItems}}">
    <p>No items to display</p>
</div>
```
{% endraw %}





### Example 20: Multi-level Totals





{% raw %}
```html
<var data-id="grandTotal" data-value="{{0}}"></var>

{{#each categories}}
    <var data-id="categoryTotal" data-value="{{0}}"></var>
    <h2>{{.categoryName}}</h2>

    {{#each .items}}
        <var data-id="categoryTotal" data-value="{{categoryTotal + .amount}}"></var>
        <var data-id="grandTotal" data-value="{{grandTotal + .amount}}"></var>
        <p>{{.name}}: ${{.amount}}</p>
    {{/each}}

    <p><strong>Category Total: ${{categoryTotal}}</strong></p>
{{/each}}

<h2>Grand Total: ${{grandTotal}}</h2>
```
{% endraw %}





---

## See Also

- [Data Binding](/paperwork.core/reference/databinding/)
- [Expressions](/paperwork.core/reference/expressions/)
- [Repeating Templates](/paperwork.core/reference/databinding/repeating)
- [Document Parameters](/paperwork.core/reference/document/parameters)
- [span Element](/paperwork.core/reference/htmlelements/html_span_element)
- [@data-bind attribute](/paperwork.core/reference/htmlattributes/attr_data_bind)

---
