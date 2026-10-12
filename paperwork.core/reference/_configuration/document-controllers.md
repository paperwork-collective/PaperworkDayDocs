---
layout: default
title: Document Controllers
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 2
---

# Document Controllers

Document controllers provide **code-behind** functionality for PDF templates, similar to ASP.NET MVC controllers or iOS ViewControllers. Controllers can:
- Access template components via **outlets** (properties/fields)
- Respond to document lifecycle events via **actions** (methods)
- Manipulate document content programmatically
- Implement business logic separate from presentation

## Controller Architecture

Controllers implement a **two-phase initialization pattern**:

1. **Parsing Phase**: Controller is instantiated, outlets are assigned as components are parsed
2. **Lifecycle Phase**: Actions are invoked during document Init, Load, DataBind, Layout, and Render

```
┌─────────────────────────────────────────────────────────────┐
│ Document Parsing                                             │
│  1. <?scryber controller='...' ?> → Instantiate controller  │
│  2. <Component id='myLabel' /> → Assign to outlet           │
│  3. All required outlets assigned? → Attach controller      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Document Lifecycle                                           │
│  Init → Load → DataBind → PreLayout → Layout → PostLayout  │
│         ↓      ↓          ↓           ↓         ↓           │
│      Actions invoked on each event                          │
└─────────────────────────────────────────────────────────────┘
```

## Outlets

**Outlets** are properties or fields that receive references to components in the template, identified by `id` attribute.

### PDFOutlet Attribute

```csharp
[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
public class PDFOutletAttribute : Attribute
{
    // Optional: Component ID to bind (defaults to member name)
    public string ComponentID { get; set; }
    
    // If true, parsing fails if component not found
    public bool Required { get; set; }
    
    // If false, member is ignored (allows selective disabling)
    public bool IsOutlet { get; set; }
}
```

### Outlet Declaration Examples

```csharp
public class InvoiceController
{
    // Outlet named by property - looks for id='CustomerLabel'
    [PDFOutlet]
    public Label CustomerLabel { get; set; }
    
    // Explicit component ID - looks for id='invoice-total'
    [PDFOutlet(ComponentID = "invoice-total")]
    public Label TotalLabel { get; set; }
    
    // Required outlet - parser throws if not found
    [PDFOutlet(Required = true)]
    public TableGrid InvoiceItems { get; set; }
    
    // Field outlets work too
    [PDFOutlet]
    public Panel HeaderPanel;
    
    // Non-outlet property (no attribute)
    public decimal TotalAmount { get; set; }
}
```

### Template Binding

```xml
<pdf:Document xmlns:pdf="...">
    <Pages>
        <pdf:Page>
            <Content>
                <!-- Binds to CustomerLabel property -->
                <pdf:Label id='CustomerLabel' />
                
                <!-- Binds to TotalLabel property -->
                <pdf:Label id='invoice-total' />
                
                <!-- Binds to InvoiceItems property (required) -->
                <pdf:TableGrid id='InvoiceItems' />
                
                <!-- Binds to HeaderPanel field -->
                <pdf:Panel id='HeaderPanel' />
            </Content>
        </pdf:Page>
    </Pages>
</pdf:Document>
```

## Actions

**Actions** are methods invoked during document lifecycle events. Action methods must:
- Be public instance methods
- Be marked with `[PDFAction]`
- Match the event handler signature: `(object sender, <ContextType> args)`
- Return `void`

### Supported Lifecycle Events

| Event | Context Type | When Invoked | Use Case |
|-------|--------------|--------------|----------|
| `Init` | `InitContext` | After parsing, before data binding | Initialize state, set default values |
| `Load` | `LoadContext` | After Init, before data binding | Load data, prepare data sources |
| `DataBinding` | `DataBindContext` | Before databinding expressions evaluated | Modify data context |
| `DataBound` | `DataBindContext` | After databinding complete | Post-process bound data |
| `PreLayout` | `LayoutContext` | Before layout calculations | Modify structure before layout |
| `PostLayout` | `LayoutContext` | After layout complete | Access calculated positions/sizes |
| `PreRender` | `RenderContext` | Before PDF rendering | Final modifications |
| `PostRender` | `RenderContext` | After PDF rendering | Cleanup, logging |

### Action Declaration

```csharp
public class ReportController
{
    [PDFOutlet(Required = true)]
    public Label ReportDateLabel { get; set; }
    
    [PDFOutlet(Required = true)]
    public ForEach DataRepeater { get; set; }

    // Init: Set up initial state
    [PDFAction]
    public void Init(object sender, InitContext args)
    {
        args.TraceLog.Add(TraceLevel.Message, "Report Controller", "Initializing report");
        ReportDateLabel.Text = DateTime.Now.ToString("MMMM dd, yyyy");
    }

    // Load: Prepare data sources
    [PDFAction]
    public void Load(object sender, LoadContext args)
    {
        var data = LoadReportData();
        DataRepeater.DataSource = data;
        
        args.Document.Params["RecordCount"] = data.Count;
    }

    // DataBinding: Modify binding context
    [PDFAction]
    public void HandleDataBinding(object sender, DataBindContext args)
    {
        if (args.DataStack.HasData)
        {
            var current = args.DataStack.Current;
            // Augment data object
        }
    }

    // DataBound: Post-process after binding
    [PDFAction]
    public void HandleDataBound(object sender, DataBindContext args)
    {
        args.TraceLog.Add(TraceLevel.Verbose, "Report Controller", 
            $"Data binding complete for {DataRepeater.ChildCount} items");
    }

    // PreLayout: Modify before layout
    [PDFAction]
    public void HandlePreLayout(object sender, LayoutContext args)
    {
        if (DataRepeater.ChildCount == 0)
        {
            // Show "no data" message
        }
    }

    // PostLayout: Access layout information
    [PDFAction]
    public void HandlePostLayout(object sender, LayoutContext args)
    {
        args.TraceLog.Add(TraceLevel.Message, "Report Controller", 
            $"Layout complete: {args.DocumentLayout.AllPages.Count} pages");
    }

    private List<ReportData> LoadReportData()
    {
        // Database or API call
        return new List<ReportData>();
    }
}
```

### Action Binding in Templates

Actions are bound via **event handler attributes** on components:

```xml
<pdf:Page on-init='Init' 
          on-load='Load' 
          on-databinding='HandleDataBinding'
          on-databound='HandleDataBound'
          on-prelayout='HandlePreLayout'
          on-postlayout='HandlePostLayout'>
    
    <Content>
        <pdf:Label id='ReportDateLabel' />
        <pdf:ForEach id='DataRepeater'>
            <!-- Template content -->
        </pdf:ForEach>
    </Content>
    
</pdf:Page>
```

## Complete Controller Example

**Controller class:**

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Data;

namespace MyCompany.Reports
{
    public class SalesReportController
    {
        // Outlets - assigned during parsing
        [PDFOutlet(Required = true)]
        public Label CompanyNameLabel { get; set; }
        
        [PDFOutlet(ComponentID = "report-title")]
        public Label TitleLabel { get; set; }
        
        [PDFOutlet(Required = true)]
        public ForEach SalesDataRepeater { get; set; }
        
        [PDFOutlet]
        public Label TotalSalesLabel { get; set; }
        
        [PDFOutlet]
        public Panel NoDataPanel { get; set; }
        
        // Controller state
        private List<SalesRecord> _salesData;
        private decimal _totalSales;

        // Action: Initialize report
        [PDFAction]
        public void InitReport(object sender, InitContext args)
        {
            args.TraceLog.Add(TraceLevel.Message, "SalesReport", "Initializing sales report");
            
            CompanyNameLabel.Text = "Acme Corporation";
            TitleLabel.Text = "Monthly Sales Report";
            TitleLabel.StyleClass = "report-header";
        }

        // Action: Load data
        [PDFAction]
        public void LoadReportData(object sender, LoadContext args)
        {
            args.TraceLog.Add(TraceLevel.Message, "SalesReport", "Loading sales data");
            
            // Load data from database/API
            _salesData = FetchSalesData();
            _totalSales = _salesData.Sum(s => s.Amount);
            
            // Bind to repeater
            SalesDataRepeater.DataSource = _salesData;
            SalesDataRepeater.Value = _salesData;
            
            // Set total
            TotalSalesLabel.Text = _totalSales.ToString("C");
            
            // Show/hide no-data message
            NoDataPanel.Visible = (_salesData.Count == 0);
        }

        // Action: Invoked for each generated row/item in the foreach template
        [PDFAction]
        public void HandleSalesItemDataBound(object sender, TemplateItemDataBoundArgs args)
        {
            if (args.Item is TableRow row && args.Context.CurrentIndex % 2 == 1)
            {
                row.StyleClass = "alternate-row";
            }
        }

        // Action: Pre-layout modifications
        [PDFAction]
        public void BeforeLayout(object sender, LayoutContext args)
        {
            if (_salesData.Count > 100)
            {
                args.TraceLog.Add(TraceLevel.Warning, "SalesReport", 
                    "Large dataset may cause performance issues");
            }
        }

        // Action: Post-layout inspection
        [PDFAction]
        public void AfterLayout(object sender, LayoutContext args)
        {
            var pageCount = args.DocumentLayout.AllPages.Count;
            args.TraceLog.Add(TraceLevel.Message, "SalesReport", 
                $"Report generated: {pageCount} pages, {_salesData.Count} records, total ${_totalSales:N2}");
        }

        private List<SalesRecord> FetchSalesData()
        {
            // Database query
            return new List<SalesRecord>
            {
                new SalesRecord { Product = "Widget", Amount = 1250.00m },
                new SalesRecord { Product = "Gadget", Amount = 2100.50m },
            };
        }
    }

    public class SalesRecord
    {
        public string Product { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
```

**Template XML:**

```xml
<?xml version='1.0' encoding='utf-8' ?>
<?scryber controller='MyCompany.Reports.SalesReportController, MyCompany.Reports' ?>

<pdf:Document xmlns:pdf='http://www.scryber.co.uk/schemas/core/release/v1/Scryber.Components.xsd'>
    
    <Pages>
        <pdf:Page on-init='InitReport' 
                  on-load='LoadReportData'
                  on-prelayout='BeforeLayout'
                  on-postlayout='AfterLayout'>
            
            <Header>
                <pdf:Label id='CompanyNameLabel' />
                <pdf:Label id='report-title' />
            </Header>
            
            <Content>
                
                <pdf:TableGrid>
                    <pdf:TableHeaderRow>
                        <pdf:TableHeaderCell>Product</pdf:TableHeaderCell>
                        <pdf:TableHeaderCell>Amount</pdf:TableHeaderCell>
                    </pdf:TableHeaderRow>
                    
                    <pdf:TableRow>
                        <pdf:ForEach id='SalesDataRepeater' value='.' on-item-databound='HandleSalesItemDataBound'>
                            <pdf:TableCell>
                                <pdf:Label text='{@:Product}' />
                            </pdf:TableCell>
                            <pdf:TableCell>
                                <pdf:Label text='{@:Amount}' />
                            </pdf:TableCell>
                        </pdf:ForEach>
                    </pdf:TableRow>
                </pdf:TableGrid>
                
                <pdf:Div>
                    <pdf:Label text='Total Sales: ' />
                    <pdf:Label id='TotalSalesLabel' />
                </pdf:Div>
                
                <pdf:Panel id='NoDataPanel' visible='false'>
                    <pdf:Label text='No sales data available for this period.' />
                </pdf:Panel>
                
            </Content>
            
        </pdf:Page>
    </Pages>
    
</pdf:Document>
```

**Usage:**

```csharp
using (var reader = new StreamReader("SalesReport.pdfx"))
{
    var doc = Document.ParseDocument(reader, ParseSourceType.DynamicContent);
    doc.ProcessDocument("SalesReport.pdf");
}
```

## Controller Specification

Controllers are specified in three ways:

### 1. Processing Instruction (Document-level)

```xml
<?scryber controller='MyNamespace.MyController, MyAssembly' ?>
```

### 2. Programmatic (Code-level)

```csharp
var settings = new ParserSettings(/* ... */);
settings.ControllerType = typeof(MyController);
// OR
settings.Controller = new MyController();

var doc = Document.ParseDocument(stream, ParseSourceType.DynamicContent, settings);
```

### 3. Attribute (Component-level)

```csharp
[PDFController(typeof(MyController))]
public class CustomDocument : Document
{
    // ...
}
```

## Implementation Details

### Controller Reflection

**Definition creation via reflection in `ParserDefintionFactory`:**

```csharp
private static ParserControllerDefinition LoadControllerDefinition(string name, Type type)
{
    ParserControllerDefinition defn = new ParserControllerDefinition(name, type);
    
    // Fill outlets (properties and fields)
    FillControllerOutlets(defn);
    
    // Fill actions (methods)
    FillControllerActions(defn);
    
    return defn;
}

private static void FillControllerOutlets(ParserControllerDefinition defn)
{
    // Reflect properties
    PropertyInfo[] allprops = defn.ControllerType.GetProperties(
        BindingFlags.Public | BindingFlags.Instance);
    
    foreach (PropertyInfo aprop in allprops)
    {
        Attribute found = System.Attribute.GetCustomAttribute(aprop, 
            typeof(PDFOutletAttribute), true);
        if (found != null)
        {
            PDFOutletAttribute outletAttr = (PDFOutletAttribute)found;
            if (outletAttr.IsOutlet)
            {
                ParserControllerOutlet outlet = new ParserControllerOutlet(
                    aprop, 
                    outletAttr.ComponentID, 
                    outletAttr.Required);
                
                defn.Outlets.Add(outlet);
            }
        }
    }
    
    // Similar process for fields...
}
```

### Outlet Assignment

**Parser implementation:**

```csharp
private void TryAssignToControllerOutlet(XmlReader reader, object instance, string outletName)
{
    ParserControllerOutlet outlet;
    if (this.HasController && 
        this.ControllerDefinition.Outlets.TryGetOutlet(outletName, out outlet))
    {
        try
        {
            outlet.SetValue(this.Controller, instance);
            LogAdd(reader, TraceLevel.Verbose, 
                "Assigned component with id '{0}' to outlet '{1}'", 
                outletName, outlet.OutletMember.Name);
        }
        catch (Exception ex)
        {
            if (outlet.Required || this.Mode == ParserConformanceMode.Strict)
                throw BuildParserXMLException(ex, reader, 
                    "Could not assign component to outlet");
        }

        this.UnassignedOutlets.Remove(outlet);
    }
}
```

### Outlet Validation

```csharp
protected virtual void EnsureAllOutletsAreAssigned(XmlReader reader, IComponent parsed)
{
    if (parsed is IControlledComponent && this.HasController)
    {
        foreach (ParserControllerOutlet outlet in this.UnassignedOutlets)
        {
            if (outlet.Required)
                throw new PDFParserException(
                    $"Required outlet {outlet.OutletMember.Name} not assigned");
        }

        ((IControlledComponent)parsed).Controller = this.Controller;
    }
}
```

## Best Practices

### Controller Design
- Keep controllers focused on coordination, not business logic
- Use dependency injection for services
- Mark outlets as `Required` when template contract demands them
- Use descriptive action method names
- Test controllers independently of PDF generation

### Outlet Naming
- Use descriptive names: `CustomerNameLabel` not `Label1`
- Match outlet names to component IDs for clarity
- Use `ComponentID` parameter when names must differ
- Document required outlets in controller comments

### Action Method Guidelines
- One responsibility per action method
- Log significant operations
- Handle errors gracefully
- Avoid heavy computation in layout/render actions
- Document expected data context

## Troubleshooting

### "Could not assign... to the outlet"
- Check outlet type matches component type
- Verify component has correct `id` attribute
- Ensure outlet is public property or field
- Check for typos in ComponentID parameter

### "Required outlet not assigned"
- Verify component with matching ID exists in template
- Check ComponentID attribute spelling
- Ensure component is in main content (not comments)
- Consider making outlet optional if conditionally present

### "Controller type not found"
- Verify assembly-qualified name is correct
- Ensure controller assembly is referenced
- Check for typos in processing instruction
- Verify controller class is public

## Related Documentation

- [Processing Instructions](processing-instructions) - Specifying controllers
- [Custom Components](custom-components) - Using controllers with custom components
- [Integration Example](integration-example) - Complete working example
- [Best Practices](best-practices) - Controller design patterns
