---
layout: default
title: Document Controllers
parent: Configuration & Extension
parent_url: /configuration/
has_children: false
has_toc: false
nav_order: 4
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
<html xmlns='http://www.w3.org/1999/xhtml'>
    <body>
        <!-- Binds to HeaderPanel field -->
        <header id='HeaderPanel' />
        <main>

            <!-- Binds to CustomerLabel property -->
            <span id='CustomerLabel' />
            
            <!-- Binds to TotalLabel property -->
            <span id='invoice-total' />
            
            <!-- Binds to InvoiceItems property (required) -->
            <table id='InvoiceItems' />
            
        </main>
    </body>
</html>
```

## Actions

**Actions** are methods invoked during document lifecycle events. Action methods must:
- Be public instance methods
- Be marked with `[PDFAction]`
- Match the event handler signature: `(object sender, <ContextType>EventArgs args)`
- Return `void`

### Supported Lifecycle Events

| Event | Context Type | When Invoked | Use Case |
|-------|--------------|--------------|----------|
| `Init` | `InitEventArgs` | After parsing, before data binding | Initialize state, set default values |
| `Load` | `LoadEventArgs` | After Init, before data binding | Load data, prepare data sources |
| `DataBinding` | `DataBindEventArgs` | Before databinding expressions evaluated | Modify data context |
| `DataBound` | `DataBindEventArgs` | After databinding complete | Post-process bound data |
| `PreLayout` | `LayoutEventArgs` | Before layout calculations | Modify structure before layout |
| `PostLayout` | `LayoutEventArgs` | After layout complete | Access calculated positions/sizes |
| `PreRender` | `RenderEventArgs` | Before PDF rendering | Final modifications |
| `PostRender` | `RenderEventArgs` | After PDF rendering | Cleanup, logging |

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
    public void Init(object sender, InitEventArgs args)
    {
        args.Context.TraceLog.Add(TraceLevel.Message, "Report Controller", "Initializing report");
        ReportDateLabel.Text = DateTime.Now.ToString("MMMM dd, yyyy");
    }

    // Load: Prepare data sources
    [PDFAction]
    public void Load(object sender, LoadEventArgs args)
    {
        var data = LoadReportData();
        DataRepeater.DataSource = data;
        
        args.Context.Document.Params["RecordCount"] = data.Count;
    }

    // DataBinding: Modify binding context
    [PDFAction]
    public void HandleDataBinding(object sender, DataBindEventArgs args)
    {
        if (args.Context.DataStack.HasData)
        {
            var current = args.Context.DataStack.Current;
            // Augment data object
        }
    }

    // DataBound: Post-process after binding
    [PDFAction]
    public void HandleDataBound(object sender, DataBindEventArgs args)
    {
        args.Context.TraceLog.Add(TraceLevel.Verbose, "Report Controller", 
            $"Data binding complete for {DataRepeater.ChildCount} items");
    }

    // PreLayout: Modify before layout
    [PDFAction]
    public void HandlePreLayout(object sender, LayoutContext args)
    {
        if (DataRepeater.Contents.Count == 0)
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

Actions are bound via **event handler attributes** on any components:

```xml
<body on-init='Init' 
      on-load='Load' 
      on-databinding='HandleDataBinding'
      on-databound='HandleDataBound'
      on-prelayout='HandlePreLayout'
      on-postlayout='HandlePostLayout'>
    
    <main>
        <span id='ReportDateLabel' />
        <data id='DataRepeater' data-bind='foreach'>
            <!-- Template content -->
        </data>
    </main>
    
</body>
```


## Complete Controller Example

**Template XML:**

```xml
<?xml version='1.0' encoding='utf-8' ?>
<?scryber controller='MyCompany.Reports.SalesReportController, MyCompany.Reports' ?>

<html xmlns='http://www.w3.org/1999/xhtml'>
<body on-init='InitReport'
      on-loaded='LoadReportData'
      on-prelayout='BeforeLayout'
      on-postlayout='AfterLayout'>

    <header>
        <!-- header is a template that repeats each page, so use an Action event for each one, (not an Outlet) -->
        <label on-loaded="HandleNameLoaded" /><br/>
        <label on-loaded="HandleTitleLoaded" />
    </header>

    <main>

        <table>
            <thead>
            <tr>
                <th>Product</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            <!-- The HandleSalesItemDataBound, will be called for each row after it has been generated -->
            <template id='SalesDataRepeater'
                    on-item-databound='HandleSalesItemDataBound'>
                <tr id="SalesRow">
                    <td>
                        <label text='{{this.Product}}' />
                    </td>
                    <td>
                        <!-- using a number for this, so we can add custom formatting (maybe based on client currency) -->
                        <num id="ProductValue" data-value='{{this.Amount}}' />
                    </td>
                </tr>
            </template>
            </tbody>
        </table>

        <div>
            <span>Total Sales: </span>
            <label id='TotalSalesLabel' />
        </div>

        <div id='NoDataPanel' hidden="hidden" on-prelayout="ShowHideNoData">
            <span>No sales data available for this period.</span>
        </div>

    </main>

</body>
</html>
```


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
        public void InitReport(object sender, InitEventArgs args)
        {
            args.Context.TraceLog.Add(TraceLevel.Message, "SalesReport", "Initializing sales report");
        }

        // Action: Load data
        [PDFAction]
        public void LoadReportData(object sender, LoadEventArgs args)
        {
            args.Context.TraceLog.Add(TraceLevel.Message, "SalesReport", "Loading sales data");

            // Load data from database/API
            _salesData = FetchSalesData();
            _totalSales = _salesData.Sum(s => s.Amount);

            // Bind to repeater
            SalesDataRepeater.Value = _salesData;

            // Set total
            TotalSalesLabel.Text = _totalSales.ToString("C");

            // Show/hide no-data message
            NoDataPanel.Visible = (_salesData.Count == 0);
        }

        // Action: for each header name on all pages
        [PDFAction]
        public void HandleNameLoaded(object sender, LoadEventArgs args)
        {
            var label = (Label)sender;
            label.Text = "Acme Corporation";
        }
        
        // Action: for each header title on all pages
        [PDFAction]
        public void HandleTitleLoaded(object sender, LoadEventArgs args)
        {
            var label = (Label)sender;
            label.Text = "Monthly Sales Report";
            label.StyleClass = "report-header";
        }

        // Action: Invoked for each generated row/item in the foreach template
        [PDFAction]
        public void HandleSalesItemDataBound(object sender, TemplateItemDataBoundArgs args)
        {
            var instance = (TemplateInstance)args.Item;
            var found = instance.Content.First<Component>(i => (i.ID == "SalesRow") ? true : false );
            
            if (null != found && found is TableRow row)
            {
                if (args.Context.CurrentIndex % 2 == 1)
                    row.StyleClass = "alternate-row";
                
                // FindAComponentById is more flexible, as it does not tie our 
                // 'ProductValue' to be a direct descendant of the row.
                var amountComponent = row.FindAComponentById("ProductValue") as Number;
                amountComponent.NumberFormat = "£###,##0.00";
            }

            
        }

        // Action: Pre-layout modifications
        [PDFAction]
        public void BeforeLayout(object sender, LayoutEventArgs args)
        {
            if (_salesData.Count > 10000)
            {
                args.Context.TraceLog.Add(TraceLevel.Warning, "SalesReport",
                    "Large dataset may cause performance issues");
            }
        }

        // Action: Post-layout inspection
        [PDFAction]
        public void AfterLayout(object sender, LayoutEventArgs args)
        {
            var doc = args.Context.GetLayout<PDFLayoutDocument>();
            var pageCount = doc.AllPages.Count;
            args.Context.TraceLog.Add(TraceLevel.Message, "SalesReport",
                $"Report generated: {pageCount} pages, {_salesData.Count} records, total ${_totalSales:N2}");
        }

        public void ShowHideNoData(object sender, LayoutEventArgs args)
        {
            if(_salesData.Count > 0)
            {
                ((Component)sender).Visible = false;
            }
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

**Usage:**

```csharp
using (var stream = new System.IO.FileStream("../../../Output/Invoice.pdf", FileMode.Create))
{
    var doc = Document.ParseDocument("SalesReport.html");
    doc.SaveAsPDF("SalesReport.pdf");
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
