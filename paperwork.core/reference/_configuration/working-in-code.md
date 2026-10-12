---
layout: default
title: Working in Code
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 3
---

# Working in Code

Scryber supports a full object model, so you can build, inspect, and modify documents directly in C# without relying only on template markup.

This is often most useful when you need:
- dynamic structure generation at runtime
- shared document composition logic across many templates
- strongly typed style and layout values
- central control of rendering behavior

---

## Common Namespaces

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Drawing;
using Scryber.Styles;
```

---

## Build a Document in Code

You can construct components directly and add them to the content tree.

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Drawing;

var doc = new Document();
var page = new Page();
var section = new Section();

var title = new Label();
title.Text = "Runtime Report";
title.Style.Font.FontSize = 24;
title.Style.Font.FontBold = true;
title.Style.Margins.Bottom = 10;

var body = new Div();
body.Style.Padding.All = 12;
body.Style.Border.Width = 1;
body.Style.Border.Color = StandardColors.Gray;
body.Contents.Add(new TextLiteral("Generated entirely in code."));

section.Contents.Add(title);
section.Contents.Add(body);
page.Contents.Add(section);
doc.Pages.Add(page);

doc.SaveAsPDF("working-in-code.pdf");
```

---

## Build XHTML in Code and Parse a Component

If part of your document is easier to generate as markup, you can build an XHTML fragment and parse it into a component.

```csharp
using System.IO;
using System.Text;
using Scryber;
using Scryber.Components;

var xhtml = new StringBuilder()
    .AppendLine("<div xmlns='http://www.w3.org/1999/xhtml' id='runtime-card' class='card'>")
    .AppendLine("  <h2>Summary</h2>")
    .AppendLine("  <p>This section was generated from an XHTML string.</p>")
    .AppendLine("</div>")
    .ToString();

var parsed = Document.ParseComponent(new StringReader(xhtml), ParseSourceType.Template);

var doc = new Document();
var page = new Page();
var section = new Section();

if (parsed is Div card)
{
    section.Contents.Add(card);
}

page.Contents.Add(section);
doc.Pages.Add(page);
doc.SaveAsPDF("component-from-xhtml.pdf");
```

Use `ParseSourceType.Template` for fragments (single component trees) and include the XHTML namespace on the fragment root.

---

## Working with Styles in Code

Most style values map naturally to typed properties:

```csharp
var card = new Panel();

card.Style.Size.Width = 320;
card.Style.Size.Height = 180;

card.Style.Padding.All = 12;
card.Style.Margins.Bottom = 10;

card.Style.Background.Color = Color.Parse("#f6f8fb");
card.Style.Border.Width = 1;
card.Style.Border.Color = new Color(210, 218, 230);
card.Style.Border.CornerRadius = 8;

card.Style.Font.FontFamily = "Helvetica";
card.Style.Font.FontSize = 11;
```

---

## Value Types (Unit, Thickness, Color)

### Unit

`Unit` represents CSS-like measurement values (`pt`, `mm`, `in`, `%`, `em`, etc.).

```csharp
Unit w1 = 120;                              // points
Unit w2 = new Unit(25, PageUnits.Millimeters);
Unit w3 = Unit.Parse("75%");
Unit w4 = Unit.Parse("12pt");

component.Style.Size.Width = w2;
component.Style.Size.MaxWidth = w3;
```

### Thickness

`Thickness` represents 1/2/4-edge values (top, right, bottom, left).

```csharp
var all = new Thickness(8);                                    // all edges
var verticalHorizontal = Thickness.Parse("12pt 18pt");        // TB RL
var eachEdge = new Thickness(10, 20, 10, 20);                  // T R B L

component.Style.Padding = all;
component.Style.Margins = verticalHorizontal;
component.Style.Border.Dash.Offset = 0; // normal property still typed
```

### Color

`Color` supports named values, hex, `rgb(...)`, `cmyk(...)`, and constants via `StandardColors`.

```csharp
component.Style.Fill.Color = StandardColors.Blue;
component.Style.Background.Color = Color.Parse("#1f2937");
component.Style.Border.Color = new Color(34, 139, 34); // RGB
component.Style.Outline.Color = Color.Parse("cmyk(0,100,100,0)");
```

---

## Parsing CSS-Like Values from Strings

When values come from configuration or data, parse to strongly typed values:

```csharp
if (Unit.TryParse(input.Width, out var width))
    component.Style.Size.Width = width;

if (Thickness.TryParse(input.Padding, out var padding))
    component.Style.Padding = padding;

if (Color.TryParse(input.AccentColor, out var accent))
    component.Style.Border.Color = accent;
```

This is useful for admin-configured themes or per-tenant branding.

---

## Mixing Templates and Code

A common pattern is:
1. Parse template
2. Find key components by ID / outlet
3. Apply runtime logic and typed styles
4. Render PDF

```csharp
var doc = Document.ParseDocument("invoice.html");

if (doc.TryFindComponentById("StatusBadge", out IComponent found) && found is Label badge)
{
    badge.Text = "PAID";
    badge.Style.Background.Color = StandardColors.Green;
    badge.Style.Fill.Color = StandardColors.White;
    badge.Style.Padding = new Thickness(4, 8, 4, 8);
}

doc.SaveAsPDF("invoice.pdf");
```

---

## Helpful Patterns

- Prefer typed values (`Unit`, `Thickness`, `Color`) over raw strings when writing code.
- Use `TryParse(...)` for user/data-driven values to avoid runtime failures.
- Keep controller actions focused and extract reusable style-building methods.
- Use `StandardColors` for common colors, and `Color.Parse(...)` for configurable values.
- Use outlets/controllers for known template anchors; use DOM search for cross-template transforms.

---

## Related Docs

- [Document Controllers](document-controllers)
- [Processing Instructions](processing-instructions)
- [Custom Components](custom-components)
- [Complete Integration Example](integration-example)
