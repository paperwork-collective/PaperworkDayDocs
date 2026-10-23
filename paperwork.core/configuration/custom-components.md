---
layout: default
title: Custom Components
parent: Configuration & Extension
parent_url: /paperwork.core/configuration/
has_children: false
has_toc: false
nav_order: 10
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Custom Components

Custom components allow you to create reusable, parameterized PDF elements with clean XML syntax. Components can encapsulate complex layouts, apply consistent styling, and provide domain-specific abstractions.

## Component Structure

A custom component:
1. **Inherits** from a base Scryber component class
2. **Declares properties** with `PDFAttribute` or `PDFElement` for XML mapping
3. **Overrides lifecycle methods** to implement behavior
4. **Registers** via namespace configuration for XML discovery

```
┌──────────────────────────────────────────────────────┐
│ Component Class                                       │
│  - Inherits: Panel, Div, etc.                       │
│  - Properties: [PDFAttribute] for XML attributes     │
│  - Lifecycle: Init(), Load(), DataBind()            │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Namespace Registration (appsettings.json)        │
│  - XML namespace → .NET namespace                    │
│  - Assembly reference                                │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Template Usage                                        │
│  <custom:StatCard value='100' label='Sales' />      │
└──────────────────────────────────────────────────────┘
```

## Creating a Custom Component

### 1. Component Class

**Example: StatCard component**

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Styles;
using Scryber.Drawing;

namespace MyCompany.Components
{
    [PDFParsableComponent("StatCard")]
    public class StatCard : Panel
    {
        // Properties exposed as XML attributes
        
        // Text, or a character from an icon font such as Font Awesome -
        // emoji are not in the standard PDF fonts
        [PDFAttribute("icon")]
        public string Icon { get; set; }
        
        [PDFAttribute("value")]
        public string Value { get; set; }
        
        [PDFAttribute("label")]
        public string Label { get; set; }
        
        [PDFAttribute("trend")]
        public string Trend { get; set; }
        
        [PDFAttribute("trend-positive")]
        public bool TrendPositive { get; set; } = true;
        
        // Constructor
        public StatCard() : base(ObjectTypes.Panel)
        {
        }
        
        // Initialization lifecycle
        protected override void OnInitialized(InitContext context)
        {
            base.OnInitialized(context);
            BuildCardContent();
        }
        
        private void BuildCardContent()
        {
            // Container styling
            this.Style.Size.Width = 200;
            this.Style.Padding.All = 15;
            this.Style.Background.Color = new Color(240, 245, 250);
            this.Style.Border.Width = 1;
            this.Style.Border.Color = StandardColors.Gray;
            this.Style.Border.CornerRadius = 8;
            
            // Icon
            if (!string.IsNullOrEmpty(Icon))
            {
                var iconLabel = new Label();
                iconLabel.Text = Icon;
                iconLabel.StyleClass = "stat-icon";
                iconLabel.Style.Font.FontSize = 24;
                iconLabel.Style.Fill.Color = StandardColors.Blue;
                this.Contents.Add(iconLabel);
            }
            
            // Value
            if (!string.IsNullOrEmpty(Value))
            {
                var valueLabel = new Label();
                valueLabel.Text = Value;
                valueLabel.StyleClass = "stat-value";
                valueLabel.Style.Font.FontSize = 32;
                valueLabel.Style.Font.FontBold = true;
                valueLabel.Style.Padding.Top = 8;
                valueLabel.Style.Position.DisplayMode = DisplayMode.Block;
                this.Contents.Add(valueLabel);
            }
            
            // Label
            if (!string.IsNullOrEmpty(Label))
            {
                var labelText = new Label();
                labelText.Text = Label;
                labelText.StyleClass = "stat-label";
                labelText.Style.Font.FontSize = 12;
                labelText.Style.Fill.Color = StandardColors.Gray;
                labelText.Style.Padding.Top = 4;
                labelText.Style.Position.DisplayMode = DisplayMode.Block;
                this.Contents.Add(labelText);
            }
            
            // Trend indicator
            if (!string.IsNullOrEmpty(Trend))
            {
                var trendLabel = new Label();
                trendLabel.Text = (TrendPositive ? "Up " : "Down ") + Trend;
                trendLabel.StyleClass = "stat-trend";
                trendLabel.Style.Font.FontSize = 11;
                trendLabel.Style.Fill.Color = TrendPositive 
                    ? new Color(34, 139, 34) 
                    : new Color(220, 20, 60);
                trendLabel.Style.Padding.Top = 4;
                trendLabel.Style.Position.DisplayMode = DisplayMode.Block;
                this.Contents.Add(trendLabel);
            }
        }
    }
}
```

### 2. Namespace Registration

**appsettings.json:**

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "Source": "http://mycompany.com/schemas/components",
          "Namespace": "MyCompany.Components",
          "Assembly": "MyCompany.Components"
        }
      ]
    }
  }
}
```

### 3. Template Usage

```xml
<?xml version='1.0' encoding='utf-8' ?>
<html xmlns='http://www.w3.org/1999/xhtml'
      xmlns:custom='http://mycompany.com/schemas/components'>
    <body>
        <main>
            
            <!-- Simple usage -->
            <custom:StatCard icon='$' 
                            value='$125,432' 
                            label='Total Sales' 
                            trend='+12.5%' 
                            trend-positive='true' />
            
            <!-- Negative trend -->
            <custom:StatCard icon='%' 
                            value='423' 
                            label='Returns' 
                            trend='-5.2%' 
                            trend-positive='false' />
            
            <!-- Without trend -->
            <custom:StatCard icon='#' 
                            value='1,847' 
                            label='Active Users' />
            
        </main>
    </body>
</html>
```

## Component Attributes

### PDFParsableComponent

Marks a class as a parseable component.

```csharp
[PDFParsableComponent("ElementName")]
```

- **ElementName**: XML element name (defaults to class name)

### PDFAttribute

Maps a property to an XML attribute.

```csharp
[PDFAttribute("attribute-name")]
public string PropertyName { get; set; }
```

- **attribute-name**: XML attribute name (defaults to property name, converted to lowercase)
- Works with: `string`, `int`, `bool`, `double`, `enum`, and typed values (`Unit`, `Color`)

### PDFElement

Maps a property to a child XML element.

```csharp
[PDFElement("element-name")]
public Label ChildElement { get; set; }
```

- **element-name**: XML child element name
- Property type must be a component type. For an element with child content, use a type that reads its children, such as `Div` - a `Panel` or `Label` property is created, but its content is not read.

### PDFArray

Maps a property to a collection of child elements.

```csharp
[PDFElement("Items")]
[PDFArray(typeof(Component))]
public ComponentList Items { get; set; }
```

- **ElementType**: Type of elements in collection - use `typeof(Component)` with a `ComponentList`
- Combined with `[PDFElement]` to name the child element that holds the collection
- The `ComponentList` is created in the constructor with `new ComponentList(this, ObjectTypes.Panel)`

## Advanced Component Example

**A card that wraps child content:**

A component that has its own child content in the template derives from `Div`. The child elements are read into its `Contents`, and the component can add to them. (A `Panel` does not read child elements.)

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Drawing;
using Scryber.Styles;

namespace MyCompany.Components
{
    [PDFParsableComponent("DashboardCard")]
    public class DashboardCard : Div
    {
        [PDFAttribute("title")]
        public string Title { get; set; }

        public DashboardCard() : base(ObjectTypes.Panel)
        {
        }

        protected override void OnInitialized(InitContext context)
        {
            base.OnInitialized(context);

            // Card container styling
            this.Style.Padding.All = 20;
            this.Style.Background.Color = StandardColors.White;
            this.Style.Border.Width = 1;
            this.Style.Border.Color = StandardColors.Gray;
            this.Style.Border.CornerRadius = 12;
            this.Style.Margins.Bottom = 20;

            // Add the title before the child content from the template
            if (!string.IsNullOrEmpty(Title))
            {
                var titleLabel = new Label();
                titleLabel.Text = Title;
                titleLabel.Style.Font.FontSize = 18;
                titleLabel.Style.Font.FontBold = true;
                titleLabel.Style.Margins.Bottom = 15;
                titleLabel.Style.Position.DisplayMode = DisplayMode.Block;
                this.Contents.Insert(0, titleLabel);
            }
        }
    }
}
```

**Template usage:**

```xml
<custom:DashboardCard title='Sales Overview'>
    <div>Q1 Sales: $45,000</div>
    <div>Q2 Sales: $52,000</div>
    <div>Q3 Sales: $48,000</div>
    <div>Q4 Sales: $61,000</div>
</custom:DashboardCard>
```

## Component Lifecycle

Components participate in the standard Scryber lifecycle:

### Initialization Phase

```csharp
protected override void OnInitialized(InitContext context)
{
    base.OnInitialized(context);
    
    // Called once after component is constructed and all properties are set
    // Use for: Building child content, setting up initial state
    
    BuildChildComponents();
}
```

### Loading Phase

```csharp
protected override void OnLoaded(LoadContext context)
{
    base.OnLoaded(context);
    
    // Called during document load phase
    // Use for: Loading data, accessing services
    
    LoadDataFromService(context);
}
```

### Data Binding Phase

```csharp
protected override void OnDataBinding(DataContext context)
{
    base.OnDataBinding(context);
    
    // Called before databinding expressions are evaluated
    // Use for: Setting up data context
}

protected override void OnDataBound(DataContext context)
{
    base.OnDataBound(context);
    
    // Called after databinding expressions are evaluated
    // Use for: Using databound values
}
```

### Layout Phase

```csharp
protected override void OnPreLayout(LayoutContext context)
{
    base.OnPreLayout(context);
    
    // Called before layout calculations
    // Use for: Final content modifications
}
```

## Using Custom Components with Controllers

Custom components work seamlessly with document controllers:

**Controller:**

```csharp
public class DashboardController
{
    [PDFOutlet(Required = true)]
    public StatCard SalesCard { get; set; }
    
    [PDFOutlet(Required = true)]
    public StatCard UsersCard { get; set; }
    
    [PDFOutlet]
    public StatCard RevenueCard { get; set; }
    
    public void LoadData(LoadContext context)
    {
        // Fetch dashboard metrics
        var metrics = GetDashboardMetrics();
        
        // Update stat cards
        SalesCard.Value = metrics.TotalSales.ToString("C");
        SalesCard.Trend = metrics.SalesTrend;
        SalesCard.TrendPositive = metrics.SalesTrend.StartsWith("+");
        
        UsersCard.Value = metrics.ActiveUsers.ToString("N0");
        UsersCard.Trend = metrics.UsersTrend;
        UsersCard.TrendPositive = metrics.UsersTrend.StartsWith("+");
        
        if (RevenueCard != null)
        {
            RevenueCard.Value = metrics.Revenue.ToString("C");
        }
    }
    
    private DashboardMetrics GetDashboardMetrics()
    {
        // Database or API call
        return new DashboardMetrics();
    }
}
```

**Template:**

```xml
<?scryber controller='MyCompany.Controllers.DashboardController, MyCompany.Reports' ?>
<html xmlns='http://www.w3.org/1999/xhtml' 
      xmlns:custom='http://mycompany.com/schemas/components'>
    <body on-loaded='LoadData'>
        <main>
            
            <custom:StatCard id='SalesCard' 
                            icon='$' 
                            label='Total Sales' />
            
            <custom:StatCard id='UsersCard' 
                            icon='#' 
                            label='Active Users' />
            
            <custom:StatCard id='RevenueCard' 
                            icon='📈' 
                            label='Monthly Revenue' />
            
        </main>
    </body>
</html>
```

## Component Design Patterns

### 1. Composite Components

Build complex components from simpler ones:

```csharp
[PDFParsableComponent("ProductCard")]
public class ProductCard : Panel
{
    [PDFAttribute("product-name")]
    public string ProductName { get; set; }
    
    [PDFAttribute("price")]
    public decimal Price { get; set; }
    
    [PDFElement("Image")]
    public Image ProductImage { get; set; }
    
    // A Div reads the child content of the <Description> element
    [PDFElement("Description")]
    public Div Description { get; set; }
    
    protected override void OnInitialized(InitContext context)
    {
        base.OnInitialized(context);
        
        // Add product image
        if (ProductImage != null)
        {
            this.Contents.Add(ProductImage);
        }
        
        // Add product name
        var nameLabel = new Label { Text = ProductName };
        nameLabel.Style.Font.FontSize = 16;
        nameLabel.Style.Font.FontBold = true;
        this.Contents.Add(nameLabel);
        
        // Add description
        if (Description != null)
        {
            this.Contents.Add(Description);
        }
        
        // Add price
        var priceLabel = new Label { Text = Price.ToString("C") };
        priceLabel.Style.Font.FontSize = 14;
        priceLabel.Style.Fill.Color = new Color(220, 20, 60);
        this.Contents.Add(priceLabel);
    }
}
```

### 2. Data-Driven Components

Accept data objects and render accordingly:

```csharp
[PDFParsableComponent("ChartBar")]
public class ChartBar : Panel
{
    [PDFAttribute("percentage")]
    public double Percentage { get; set; }
    
    [PDFAttribute("color")]
    public string BarColor { get; set; } = "#3498db";
    
    [PDFAttribute("height")]
    public Unit Height { get; set; } = 20;
    
    protected override void OnInitialized(InitContext context)
    {
        base.OnInitialized(context);
        
        // Bar container
        this.Style.Size.Height = Height;
        this.Style.Background.Color = Color.Parse("#ecf0f1");
        
        // Bar fill
        var fill = new Panel();
        fill.Style.Size.Width = new Unit(Percentage, PageUnits.Percent);
        fill.Style.Size.Height = Height;
        fill.Style.Background.Color = Color.Parse(BarColor);
        
        this.Contents.Add(fill);
    }
}
```

### 3. Template Components

Provide structure for child content:

```csharp
[PDFParsableComponent("TitledSection")]
public class TitledSection : Panel
{
    [PDFAttribute("title")]
    public string Title { get; set; }
    
    [PDFAttribute("collapsible")]
    public bool Collapsible { get; set; }
    
    // A Div reads the child content of the <Content> element
    [PDFElement("Content")]
    public Div ContentPanel { get; set; }
    
    protected override void OnInitialized(InitContext context)
    {
        base.OnInitialized(context);
        
        // Section header
        var header = new Div();
        header.Style.Background.Color = new Color(240, 240, 240);
        header.Style.Padding.All = 10;
        
        var titleLabel = new Label { Text = Title };
        titleLabel.Style.Font.FontSize = 14;
        titleLabel.Style.Font.FontBold = true;
        header.Contents.Add(titleLabel);
        
        this.Contents.Add(header);
        
        // Section content
        if (ContentPanel != null)
        {
            ContentPanel.Style.Padding.All = 10;
            this.Contents.Add(ContentPanel);
        }
    }
}
```

## Best Practices

### Component Design
- **Single Responsibility**: Each component should do one thing well
- **Composability**: Build complex components from simple ones
- **Reusability**: Design for use across multiple templates
- **Flexibility**: Provide sensible defaults, allow customization
- **Documentation**: Document properties and usage examples

### Property Design
- Use descriptive property names
- Provide default values for optional properties
- Validate property values in lifecycle methods
- Support both attributes and child elements where appropriate

### Lifecycle Usage
- Use `OnInitialized` for building child content
- Use `OnLoaded` for loading data
- Use `OnDataBinding`/`OnDataBound` for data manipulation
- Keep lifecycle methods focused and fast

### Namespace Organization
- Group related components in same namespace
- Use descriptive XML namespace URIs
- Document namespace registration requirements
- Version namespaces for breaking changes

## Troubleshooting

### "Unknown element 'custom:StatCard'"
- Check namespace registration in configuration
- Verify XML namespace URI matches registration
- Ensure assembly is referenced by application
- Check component class is marked `[PDFParsableComponent]`

### "Could not set property 'Value'"
- Verify property has public setter
- Check property type matches attribute value
- Ensure property is marked with `[PDFAttribute]`
- Check for type conversion issues

### Component not rendering
- Verify `OnInitialized` calls `base.OnInitialized(context)`
- Check child components are added to `Contents`
- Ensure properties are being set correctly
- Add trace logging to lifecycle methods

## Related Documentation

- [Namespace Registration](namespace-registration) - Registering component namespaces
- [Document Controllers](document-controllers) - Using controllers with custom components
- [Integration Example](integration-example) - Complete working example
- [Best Practices](best-practices) - Component design patterns
