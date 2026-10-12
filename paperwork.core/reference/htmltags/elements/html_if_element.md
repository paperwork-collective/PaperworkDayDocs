---
layout: default
title: if
parent: HTML Elements
parent_url: /paperwork.core/reference/htmltags/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: false
has_toc: false
---

# &lt;if&gt; : The Conditional Rendering Element
{: .no_toc }

The `<if>` element is a powerful Scryber component that conditionally renders content based on boolean expressions. It enables dynamic content control, allowing you to show or hide sections of your PDF based on data, user permissions, configuration settings, or any boolean condition.

---

{: .note }
> The `if` element is similar to the handlebars `{% raw %}{{#if condition }}{% endraw %}` helper. However it does not provide support for `else` and `else if` content.
> The library also provides the `choose` with `when` and `otherwise` to match the `#if` capabilities, and more.

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

The `<if>` element controls content rendering that:
- Shows or hides content based on boolean expressions
- Evaluates conditions during data binding phase
- Supports complex expressions with logical operators
- Can nest other conditional elements
- Integrates seamlessly with data binding
- Removes content completely when false (not just hidden)
- Works with any type of content (text, elements, tables, images)





{% raw %}
```html
<!-- Simple condition -->
<if data-test="{{model.showDetails}}">
    <div>Detailed information here</div>
</if>

<!-- Conditional sections -->
<if data-test="{{model.userRole == 'Admin'}}">
    <div>Admin-only content</div>
</if>
```
{% endraw %}

---

## Supported Attributes

### Conditional Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-test` | boolean expression | **Required**. Boolean expression that determines if content is rendered. When true, content is included; when false, content is completely omitted. |
| `data-template` | HTML string | Optional. Inline HTML content to render when condition is true. Overrides child elements. |

### Standard Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `hidden` | string | Additional visibility control. Set to "hidden" to prevent rendering regardless of test condition. |

---

## Data Binding and Expressions

### Boolean Expressions

The `data-test` attribute accepts any expression that evaluates to a boolean:



{% raw %}
```html
<!-- Direct boolean property -->
<if data-test="{{model.isActive}}">Active content</if>

<!-- Comparison operators -->
<if data-test="{{model.age >= 18}}">Adult content</if>
<if data-test="{{model.status == 'approved'}}">Approved content</if>

<!-- Logical operators -->
<if data-test="{{model.isAdmin && model.isActive}}">Admin active content</if>
<if data-test="{{model.quantity > 0 || model.allowBackorder}}">Available</if>

<!-- Negation -->
<if data-test="{{!model.isDisabled}}">Enabled content</if>
```
{% endraw %}





### Comparison Operators

Supported operators in expressions:
- `==` - Equal to
- `!=` - Not equal to
- `>` - Greater than
- `>=` - Greater than or equal to
- `<` - Less than
- `<=` - Less than or equal to
- `&&` - Logical AND
- `||` - Logical OR
- `!` - Logical NOT

### Null and Empty Checks



{% raw %}
```html
<!-- Check for null or empty -->
<if data-test="{{model.description != null}}">
    <p>{{model.description}}</p>
</if>

<!-- String length check -->
<if data-test="{{model.items.length > 0}}">
    <p>Items available</p>
</if>
```
{% endraw %}



### &lt;if&gt; vs #if vs &lt;choose&gt;

The engine supports both the xml compliant and valid `<if>` element, along with the *handlebars* `#if` notation, along with the `<choose>` element. Decisions can also be made within styling and visibility based on binding expressions.

And they each offer various advantages and disadvantages...

- Use `{% raw %}{{#if test}} ..content.. {{/if}}{% endraw %}` when you are already using loops such as `{% raw %}{{#each model}} ..content.. {{/each}}{% endraw %}`
- Use `{% raw %}{{#if}}{% endraw %}` if you do not need to preserve the validity of an xml file.
- Use `<choose>` when you want to make multiple decisions (when that, or when that, otherwise), and prefer to keep valid xml for processing.
- Use `<if>` when you want to conditionally include some content based on a single state, and prefer to keep valid xml for processing.
- Use `hidden='calc(if(decision, "hidden", ""))'` when you want to show or hide an individual static component dynamically.

---

## Notes

### Rendering Behavior

The `<if>` element has important rendering characteristics:

1. **Complete Removal**: When false, content is not rendered at all (not just hidden with CSS)
2. **Data Binding Phase**: Evaluation occurs during data binding, before layout
3. **No Output**: The `<if>` element itself produces no output in the PDF
4. **Child Content**: Only child content is rendered when condition is true
5. **Performance**: False conditions skip all child processing, improving performance

### Nesting and Logic

You can nest `<if>` elements for complex logic:





{% raw %}
```html
<if data-test="{{model.hasPermission}}">
    <if data-test="{{model.isActive}}">
        <!-- Content shown only if both conditions true -->
    </if>
</if>
```
{% endraw %}





### Alternative Approaches

For simple show/hide, you can also use:
- `hidden` attribute with expression: `{% raw %}<div hidden="{{!model.show ? 'hidden' : ''}}">{% endraw %}`
- CSS display: `{% raw %}style="display: {{model.show ? 'block' : 'none'}}"{% endraw %}`

However, `<if>` is more efficient as it doesn't process content at all when false.

### Inline Template

The `data-template` attribute allows inline content definition, useful for simple conditional text:





{% raw %}
```html
<if data-test="{{model.status == 'urgent'}}"
    data-template="<span style='color: red; font-weight: bold;'>URGENT</span>">
</if>
```
{% endraw %}





---

## Examples

### Basic Conditional Content





{% raw %}
```html
<!-- Show discount section only if discount exists -->
<if data-test="{{model.discount > 0}}">
    <div style="color: red; font-weight: bold;">
        Save {{model.discount}}%!
    </div>
</if>
```
{% endraw %}





### User Role-Based Content





{% raw %}
```html
<!-- Admin-only section -->
<if data-test="{{model.userRole == 'Admin'}}">
    <div style="background-color: #fff3cd; padding: 10pt; margin: 10pt 0;">
        <strong>Admin View:</strong> Internal reference #{{model.internalId}}
    </div>
</if>

<!-- Public content always shows -->
<div>
    <h2>{{model.title}}</h2>
    <p>{{model.description}}</p>
</div>
```
{% endraw %}





### Conditional Table Sections





{% raw %}
```html
<table style="width: 100%;">
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <if data-test="{{model.showCost}}">
                <th>Cost</th>
                <th>Margin</th>
            </if>
        </tr>
    </thead>
    <tbody>
        <template data-bind="{{model.products}}">
            <tr>
                <td>{{.name}}</td>
                <td>${{.price}}</td>
                <if data-test="{{model.showCost}}">
                    <td>${{.cost}}</td>
                    <td>{{.margin}}%</td>
                </if>
            </tr>
        </template>
    </tbody>
</table>
```
{% endraw %}





### Status-Dependent Styling





{% raw %}
```html
<div class="order">
    <h3>Order #{{model.orderNumber}}</h3>

    <if data-test="{{model.status == 'completed'}}">
        <div style="color: green; font-weight: bold;">
            Status: Completed ✓
        </div>
    </if>

    <if data-test="{{model.status == 'pending'}}">
        <div style="color: orange; font-weight: bold;">
            Status: Pending...
        </div>
    </if>

    <if data-test="{{model.status == 'cancelled'}}">
        <div style="color: red; font-weight: bold;">
            Status: Cancelled ✗
        </div>
    </if>
</div>
```
{% endraw %}





### Nested Conditions





{% raw %}
```html
<if data-test="{{model.hasOrders}}">
    <div class="orders-section">
        <h2>Your Orders</h2>

        <if data-test="{{model.orders.length > 0}}">
            <template data-bind="{{model.orders}}">
                <div class="order-item">
                    <span>Order {{.id}}</span>

                    <if data-test="{{.isRush}}">
                        <span style="color: red; font-weight: bold;">RUSH</span>
                    </if>
                </div>
            </template>
        </if>

        <if data-test="{{model.orders.length == 0}}">
            <p style="color: #666; font-style: italic;">No orders found.</p>
        </if>
    </div>
</if>
```
{% endraw %}





### Conditional Warnings and Notices





{% raw %}
```html
<!-- Low stock warning -->
<if data-test="{{model.stockLevel < 10}}">
    <div style="background-color: #fff3cd; border: 1pt solid #ffc107;
                padding: 10pt; margin: 10pt 0;">
        <strong>Warning:</strong> Low stock - only {{model.stockLevel}} items remaining
    </div>
</if>

<!-- Out of stock error -->
<if data-test="{{model.stockLevel == 0}}">
    <div style="background-color: #f8d7da; border: 1pt solid #dc3545;
                padding: 10pt; margin: 10pt 0;">
        <strong>Error:</strong> Out of stock
    </div>
</if>
```
{% endraw %}





### Date-Based Content





{% raw %}
```html
<!-- Show expiration warning if date is soon -->
<if data-test="{{model.daysUntilExpiration < 30}}">
    <div style="color: red;">
        Expires in {{model.daysUntilExpiration}} days!
    </div>
</if>

<!-- Show renewal message if expired -->
<if data-test="{{model.isExpired}}">
    <div style="background-color: #f8d7da; padding: 10pt;">
        This subscription has expired. Please renew.
    </div>
</if>
```
{% endraw %}





### Conditional Footers





{% raw %}
```html
<div class="page-footer">
    <div style="text-align: center;">
        Page <page></page> of <page property="total"></page>
    </div>

    <if data-test="{{model.isConfidential}}">
        <div style="text-align: center; color: red; font-weight: bold; margin-top: 5pt;">
            CONFIDENTIAL - DO NOT DISTRIBUTE
        </div>
    </if>

    <if data-test="{{model.isDraft}}">
        <div style="text-align: center; color: #666; font-style: italic; margin-top: 5pt;">
            DRAFT - Not for Distribution
        </div>
    </if>
</div>
```
{% endraw %}





### Complex Business Logic





{% raw %}
```html
<if data-test="{{model.customer.isPremium && model.order.total > 100}}">
    <div style="background-color: #d4edda; border: 1pt solid #28a745; padding: 10pt;">
        <strong>Premium Discount Applied!</strong> You saved ${{model.premiumDiscount}}
    </div>
</if>

<if data-test="{{!model.customer.isPremium && model.order.total > 500}}">
    <div style="background-color: #cce5ff; border: 1pt solid #0066cc; padding: 10pt;">
        <strong>Upgrade to Premium</strong> and save {{model.potentialSavings}} on this order!
    </div>
</if>
```
{% endraw %}





### Conditional Images





{% raw %}
```html
<if data-test="{{model.product.hasImage}}">
    <img src="{{model.product.imageUrl}}"
         style="width: 200pt; height: 200pt; object-fit: cover;"/>
</if>

<if data-test="{{!model.product.hasImage}}">
    <div style="width: 200pt; height: 200pt; background-color: #eee;
                display: flex; align-items: center; justify-content: center;">
        <span style="color: #999;">No image available</span>
    </div>
</if>
```
{% endraw %}





### Report Sections Based on Data





{% raw %}
```html
<h1>{{model.reportTitle}}</h1>

<if data-test="{{model.includeSummary}}">
    <section>
        <h2>Executive Summary</h2>
        <p>{{model.summary}}</p>
    </section>
</if>

<if data-test="{{model.includeDetails}}">
    <section>
        <h2>Detailed Analysis</h2>
        <template data-bind="{{model.details}}">
            <div>{{.content}}</div>
        </template>
    </section>
</if>

<if data-test="{{model.includeCharts}}">
    <section>
        <h2>Charts and Graphs</h2>
        <!-- Chart content -->
    </section>
</if>
```
{% endraw %}





### Conditional Terms and Conditions





{% raw %}
```html
<h2>Terms and Conditions</h2>

<div>{{model.standardTerms}}</div>

<if data-test="{{model.contractType == 'enterprise'}}">
    <div style="margin-top: 15pt;">
        <h3>Enterprise Terms</h3>
        <p>{{model.enterpriseTerms}}</p>
    </div>
</if>

<if data-test="{{model.hasCustomTerms}}">
    <div style="margin-top: 15pt;">
        <h3>Custom Terms</h3>
        <p>{{model.customTerms}}</p>
    </div>
</if>
```
{% endraw %}





### Conditional Price Display





{% raw %}
```html
<div class="product-price">
    <if data-test="{{model.onSale}}">
        <div>
            <span style="text-decoration: line-through; color: #999;">
                ${{model.regularPrice}}
            </span>
            <span style="color: red; font-weight: bold; font-size: 14pt; margin-left: 10pt;">
                ${{model.salePrice}}
            </span>
        </div>
    </if>

    <if data-test="{{!model.onSale}}">
        <div style="font-size: 14pt; font-weight: bold;">
            ${{model.regularPrice}}
        </div>
    </if>
</div>
```
{% endraw %}





### Permission-Based Document Sections





{% raw %}
```html
<div class="document">
    <!-- Public section - always visible -->
    <section>
        <h2>Overview</h2>
        <p>{{model.publicOverview}}</p>
    </section>

    <!-- Member-only section -->
    <if data-test="{{model.userLevel >= 1}}">
        <section style="page-break-before: always;">
            <h2>Member Information</h2>
            <p>{{model.memberContent}}</p>
        </section>
    </if>

    <!-- Premium member section -->
    <if data-test="{{model.userLevel >= 2}}">
        <section style="page-break-before: always;">
            <h2>Premium Analysis</h2>
            <p>{{model.premiumContent}}</p>
        </section>
    </if>

    <!-- Admin section -->
    <if data-test="{{model.userLevel >= 99}}">
        <section style="page-break-before: always; background-color: #f0f0f0;">
            <h2>Administrative Data</h2>
            <p>{{model.adminContent}}</p>
        </section>
    </if>
</div>
```
{% endraw %}





### Conditional QR Codes or Barcodes





{% raw %}
```html
<if data-test="{{model.includeQRCode}}">
    <div style="text-align: center; margin: 20pt 0;">
        <img src="{{model.qrCodeUrl}}" style="width: 100pt; height: 100pt;"/>
        <div style="font-size: 8pt; color: #666; margin-top: 5pt;">
            Scan for more information
        </div>
    </div>
</if>
```
{% endraw %}





### Multi-Language Conditional Content





{% raw %}
```html
<if data-test="{{model.language == 'en'}}">
    <div>
        <h1>Welcome</h1>
        <p>Thank you for your order.</p>
    </div>
</if>

<if data-test="{{model.language == 'es'}}">
    <div>
        <h1>Bienvenido</h1>
        <p>Gracias por su pedido.</p>
    </div>
</if>

<if data-test="{{model.language == 'fr'}}">
    <div>
        <h1>Bienvenue</h1>
        <p>Merci pour votre commande.</p>
    </div>
</if>
```
{% endraw %}





### Conditional Page Breaks





{% raw %}
```html
<template data-bind="{{model.sections}}">
    <div class="section">
        <h2>{{.title}}</h2>
        <p>{{.content}}</p>

        <!-- Only break page if this isn't the last section -->
        <if data-test="{{!$islast}}">
            <div style="page-break-after: always;"></div>
        </if>
    </div>
</template>
```
{% endraw %}





### Invoice Payment Status





{% raw %}
```html
<div class="invoice">
    <h1>Invoice #{{model.invoiceNumber}}</h1>

    <!-- Invoice details -->
    <div>Total: ${{model.total}}</div>

    <if data-test="{{model.isPaid}}">
        <div style="color: green; font-size: 16pt; font-weight: bold; margin-top: 20pt;">
            PAID - {{model.paymentDate}}
        </div>
    </if>

    <if data-test="{{!model.isPaid && !model.isOverdue}}">
        <div style="color: orange; font-size: 16pt; font-weight: bold; margin-top: 20pt;">
            PAYMENT DUE - {{model.dueDate}}
        </div>
    </if>

    <if data-test="{{!model.isPaid && model.isOverdue}}">
        <div style="color: red; font-size: 16pt; font-weight: bold; margin-top: 20pt;">
            OVERDUE - Payment Required Immediately
        </div>
        <div style="background-color: #f8d7da; padding: 10pt; margin-top: 10pt;">
            This invoice is {{model.daysOverdue}} days overdue.
            Late fees may apply.
        </div>
    </if>
</div>
```
{% endraw %}





---

## See Also

- [template](/paperwork.core/reference/htmltags/elements/html_template_element.html) - Template element for repeating content
- [Data Binding](/paperwork.core/reference/binding/) - Complete guide to data binding expressions
- [Expressions](/paperwork.core/reference/expressions/) - Expression syntax and functions
- [hidden attribute](/paperwork.core/reference/attributes/hidden.html) - Alternative visibility control
- [Choose Component](/paperwork.core/reference/components/choose.html) - Multi-condition selection (if/else if/else)
- [div](/paperwork.core/reference/htmltags/elements/html_div_element.html) - Generic container element

---
