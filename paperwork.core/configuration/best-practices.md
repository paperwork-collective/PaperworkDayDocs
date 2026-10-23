---
layout: default
title: Best Practices
parent: Configuration & Extension
parent_url: /paperwork.core/configuration/
has_children: false
has_toc: false
nav_order: 13
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Best Practices

Comprehensive guidelines for configuring and extending Scryber effectively.

## Configuration Management

### JSON Configuration Files

**Structure your configuration clearly:**

```json
{
  "Paperwork": {
    "Parsing": {
      "Namespaces": [ /* Custom component namespaces */ ]
    },
    "Fonts": {
      "Register": [ /* Custom fonts */ ]
    },
    "Imaging": {
      "Factories": [ /* Custom image handlers */ ]
    },
    "Tracing": {
      "TraceLevel": "Messages"
    }
  }
}
```

**✅ Do:**
- Use relative paths for portability: `"Fonts/Roboto-Regular.ttf"`
- Externalize connection strings and API keys
- Version configuration files with application code
- Document configuration options inline with comments (when JSON supports it)
- Use environment-specific configuration files

**❌ Don't:**
- Hard-code production credentials in configuration files
- Use absolute paths unless absolutely necessary
- Mix application and document engine configuration concerns
- Leave sensitive data in source control

### Environment-Specific Configuration

```csharp
var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{env}.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

PaperworkConfiguration.Init(config);   // or services.AddPaperwork(config)
```

**Development (appsettings.Development.json):**
```json
{
  "Paperwork": {
    "Tracing": {
      "TraceLevel": "Verbose"
    }
  }
}
```

**Production (appsettings.Production.json):**
```json
{
  "Paperwork": {
    "Tracing": {
      "TraceLevel": "Warnings"
    }
  }
}
```

## Document Controllers

### Controller Design

**✅ Do:**
- Keep controllers focused on coordination, not business logic
- Pass services and values to the controller's constructor, and give the controller instance to the parser settings (see [The Engine Document](engine-document))
- Mark outlets as `Required` when template contract demands them
- Use descriptive action method names
- Test controllers independently of PDF generation
- Log significant operations and errors
- Handle missing optional outlets gracefully

**❌ Don't:**
- Put business logic in controllers
- Access database directly (use services)
- Throw exceptions in action methods without handling
- Mutate global state
- Create tightly coupled controllers

### Example: Well-Designed Controller

```csharp
public class InvoiceController
{
    private readonly IInvoiceService _invoiceService;
    private readonly ILogger<InvoiceController> _logger;
    private readonly string _invoiceId;

    // The application creates the controller, so it can be given its services
    // and the invoice to show - and it can be unit tested on its own
    public InvoiceController(
        IInvoiceService invoiceService,
        ILogger<InvoiceController> logger,
        string invoiceId)
    {
        _invoiceService = invoiceService;
        _logger = logger;
        _invoiceId = invoiceId;
    }

    // Required outlets for critical template elements
    [PDFOutlet(Required = true)]
    public Label InvoiceNumberLabel { get; set; }

    [PDFOutlet(Required = true)]
    public ForEach LineItemsRepeater { get; set; }

    // Optional outlets with fallback handling
    [PDFOutlet]
    public Label CustomerNotesLabel { get; set; }

    // Clear, single-purpose action methods
    [PDFAction]
    public void InitInvoice(object sender, InitEventArgs args)
    {
        _logger.LogInformation("Initializing invoice document");

        var invoice = _invoiceService.GetInvoice(_invoiceId);
        InvoiceNumberLabel.Text = $"Invoice #{invoice.Number}";
    }

    [PDFAction]
    public void LoadInvoiceData(object sender, LoadEventArgs args)
    {
        _logger.LogInformation("Loading invoice data");

        var invoice = _invoiceService.GetInvoiceWithDetails(_invoiceId);

        // Transform for display (presentation concern)
        var lineItems = invoice.LineItems.Select(li => new
        {
            Description = li.Description,
            Quantity = li.Quantity,
            UnitPrice = li.UnitPrice.ToString("C"),
            Total = (li.Quantity * li.UnitPrice).ToString("C")
        }).ToList();

        LineItemsRepeater.Value = lineItems;

        // Handle optional outlet
        if (CustomerNotesLabel != null && !string.IsNullOrEmpty(invoice.Notes))
            CustomerNotesLabel.Text = invoice.Notes;

        _logger.LogInformation("Loaded {Count} line items", lineItems.Count);
    }
}
```

### Outlet Naming

**✅ Do:**
- Use descriptive names: `CustomerNameLabel` not `Label1`
- Match outlet names to template IDs for clarity
- Use consistent naming conventions across controllers
- Suffix with component type: `...Label`, `...Repeater`, `...Panel`

**❌ Don't:**
- Use cryptic abbreviations: `CustNmLbl`
- Mix naming conventions in same controller
- Use generic names: `Data`, `Content`, `Item`

## Custom Components

### Component Design Principles

**Single Responsibility:**
```csharp
// ✅ Good: Focused component
[PDFParsableComponent("StatCard")]
public class StatCard : Panel
{
    [PDFAttribute("value")]
    public string Value { get; set; }
    
    [PDFAttribute("label")]
    public string Label { get; set; }
}

// ❌ Bad: Kitchen sink component
[PDFParsableComponent("Dashboard")]
public class Dashboard : Panel
{
    // Too many responsibilities:
    // - Data loading
    // - Chart rendering
    // - Table generation
    // - Export functionality
}
```

**Composability:**
```html
<!-- ✅ Good: Composable components -->
<custom:DashboardCard title='Sales'>
    <div>
        <custom:StatCard value='$125K' label='Revenue' />
    </div>
    <div>
        <custom:LineChart data='{{model.sales}}' />
    </div>
</custom:DashboardCard>

<!-- ❌ Bad: Monolithic component -->
<custom:SalesDashboard
    revenue='$125K'
    chartData='...'
    tableData='...'
    showExport='true' />
```

**Lifecycle Usage:**
```csharp
protected override void OnInitialized(InitContext context)
{
    base.OnInitialized(context);

    // ✅ Do: Build child content from fixed attribute values
    BuildCardContent();

    // ❌ Don't: Load external data here - pass it in as data or attributes
}

protected override void OnDataBound(DataContext context)
{
    base.OnDataBound(context);

    // ✅ Do: Build content from attributes bound to data ({{...}}) -
    //        their values are only set once the component is bound
    BuildCardFromBoundValues();
}
```

### Property Design

**✅ Do:**
- Provide sensible defaults
- Support common data types (string, int, bool, enum)
- Validate property values
- Document property purposes

**❌ Don't:**
- Require all properties
- Use complex object types for attributes
- Throw in property setters
- Add properties "just in case"

**Example:**
```csharp
[PDFParsableComponent("ProgressBar")]
public class ProgressBar : Panel
{
    // Sensible default
    [PDFAttribute("percentage")]
    public double Percentage { get; set; } = 0;
    
    // Validation in lifecycle method
    protected override void OnInitialized(InitContext context)
    {
        base.OnInitialized(context);
        
        // Validate and clamp
        if (Percentage < 0) Percentage = 0;
        if (Percentage > 100) Percentage = 100;
        
        BuildProgressBar();
    }
}
```

## Namespace Registration

### Namespace URI Design

**✅ Do:**
- Use your company domain: `http://mycompany.com/schemas/components`
- Include version for breaking changes: `http://mycompany.com/schemas/v2/components`
- Group related components: `http://mycompany.com/components/charts`
- Document namespace URIs in README

**❌ Don't:**
- Use `http://localhost` or `http://example.com`
- Change URIs without versioning
- Use generic names: `http://components`
- Mix unrelated components in same namespace

### Assembly Organization

**✅ Good Structure:**
```
MyCompany.Components/
├── Cards/
│   ├── StatCard.cs
│   └── ProductCard.cs
├── Charts/
│   ├── BarChart.cs
│   └── LineChart.cs
└── Forms/
    ├── TextField.cs
    └── Checkbox.cs
```

**Configuration:**
```json
{
  "Namespaces": [
    {
      "Source": "http://mycompany.com/components/cards",
      "Namespace": "MyCompany.Components.Cards",
      "Assembly": "MyCompany.Components"
    },
    {
      "Source": "http://mycompany.com/components/charts",
      "Namespace": "MyCompany.Components.Charts",
      "Assembly": "MyCompany.Components"
    }
  ]
}
```

## Image Factories

### Factory Design

**✅ Do:**
- Use specific, non-overlapping patterns
- Handle errors gracefully with placeholders
- Dispose resources properly
- Make factories thread-safe
- Add caching when appropriate
- Log factory operations

**❌ Don't:**
- Use overly broad patterns: `.*`
- Throw exceptions without context
- Block on synchronous I/O in production
- Ignore thread safety
- Cache unbounded amounts of data

### Pattern Design

The pattern a factory handles is given to the `ImageFactoryBase` constructor. See [Image Factories](image-factories).

```csharp
// ✅ Good: Specific, unambiguous pattern
: base(new Regex(@"^product://[\w-]+$"), MimeType.PngImage, "Products", true)

// ❌ Bad: Overly broad pattern
: base(new Regex(@".*"), MimeType.PngImage, "Everything", true)

// ✅ Good: Protocol-based patterns
new Regex(@"^db://")       // Database
new Regex(@"^s3://")       // S3
new Regex(@"^azblob://")   // Azure Blob
```

### Error Handling

In the requestor that loads the content, fall back to a placeholder, or complete the request as failed with the reason:

```csharp
doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;
    if (!request.FilePath.StartsWith("product://"))
        return;

    try
    {
        using var stream = new MemoryStream(LoadFromSource(request.FilePath));
        request.Callback(request.Owner, request, stream);
    }
    catch (FileNotFoundException ex)
    {
        _logger.LogWarning(ex, "Image not found: {Path}", request.FilePath);

        // Graceful degradation
        using var placeholder = new MemoryStream(GetPlaceholderImage());
        request.Callback(request.Owner, request, placeholder);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Failed to load image: {Path}", request.FilePath);
        request.CompleteRequest(null, false, ex);
    }
};
```

## Font Configuration

### Font Selection

**✅ Do:**
- Choose fonts with complete character sets
- Test with expected character ranges (including special characters)
- Provide fallback fonts
- Document font licenses
- Use web-safe fonts as last resort

**❌ Don't:**
- Assume fonts support all Unicode characters
- Use unlicensed fonts in production
- Forget to register all font weights/styles
- Use excessive number of font families

### Font Organization

```
MyApp/
└── wwwroot/
    └── fonts/
        ├── Roboto/
        │   ├── Roboto-Regular.ttf
        │   ├── Roboto-Bold.ttf
        │   ├── Roboto-Italic.ttf
        │   └── Roboto-BoldItalic.ttf
        ├── OpenSans/
        │   ├── OpenSans-Regular.ttf
        │   └── OpenSans-Bold.ttf
        └── LICENSE.txt  # Font licenses
```

### Font Fallback

```xml
<html>
    <head>
        <style>
            body {
                /* Primary → Fallback 1 → Fallback 2 → Generic */
                font-family: Roboto, 'Open Sans', Helvetica, sans-serif;
            }
        </style>
    </head>
</html>
```

## Performance Optimization

### Document Generation

**✅ Do:**
- Use async/await for I/O operations
- Cache frequently used data
- Lazy-load images and fonts
- Monitor memory usage for large documents
- Use streaming for large output files

**❌ Don't:**
- Load entire databases into memory
- Generate PDFs on UI thread
- Create excessive objects during layout
- Ignore memory leaks
- Block on synchronous I/O

### Example: Efficient Data Loading

```csharp
public class ReportService
{
    private readonly IPaperworkFactory _factory;
    private readonly IReportRepository _reports;
    private readonly IMemoryCache _cache;

    public ReportService(IPaperworkFactory factory, IReportRepository reports, IMemoryCache cache)
    {
        _factory = factory;
        _reports = reports;
        _cache = cache;
    }

    public async Task<byte[]> GenerateReportAsync(string reportId)
    {
        var cacheKey = $"report-{reportId}";

        // Check cache first
        if (!_cache.TryGetValue(cacheKey, out ReportData data))
        {
            // Load from database, asynchronously
            data = await _reports.GetReportDataAsync(reportId);

            // Cache for 5 minutes
            _cache.Set(cacheKey, data, TimeSpan.FromMinutes(5));
        }

        // Load the data before generating, and pass it to the template
        return await _factory.NewDocument()
            .WithLayoutFile("Templates/report.html")
            .WithData("model", data)
            .BuildBytesAsync();
    }
}
```

### Component Performance

```csharp
// ✅ Good: Efficient child creation
protected override void OnInitialized(InitContext context)
{
    base.OnInitialized(context);
    
    // Create children once
    BuildContent();
}

// ❌ Bad: Recreating children on every layout
protected override void OnPreLayout(LayoutContext context)
{
    base.OnPreLayout(context);
    
    // Don't recreate children in layout phase!
    this.Contents.Clear();
    BuildContent();
}
```

## Error Handling

### Processing Instruction Modes

**Development:**
```xml
<?paperwork parser-mode='Strict'
            parser-log='true'
            append-log='true'
            log-level='Verbose' ?>
```

**Production:**
```xml
<?paperwork parser-mode='Lax'
            log-level='Warnings' ?>
```

Strict mode stops on any unknown element, attribute or error, so problems are found during development; Lax mode logs them and still produces the document for the user. See [Processing Instructions](processing-instructions).

### Validation

**✅ Do:**
- Validate early (in Init phase)
- Provide descriptive error messages
- Log errors with context
- Fail fast on configuration errors
- Handle optional outlets gracefully

**❌ Don't:**
- Swallow exceptions silently
- Throw generic exceptions
- Continue processing after critical errors
- Log sensitive data

### Example: Robust Controller

```csharp
[PDFAction]
public void InitReport(object sender, InitEventArgs args)
{
    try
    {
        // Validate the values the controller was created with
        if (string.IsNullOrEmpty(_reportId))
            throw new InvalidOperationException("A report id is required");

        // Validate optional outlets before use
        if (TitleLabel == null)
            throw new InvalidOperationException("The template has no 'TitleLabel' outlet");

        _logger.LogInformation("Initializing report: {ReportId}", _reportId);

        TitleLabel.Text = $"Report {_reportId}";
    }
    catch (Exception ex)
    {
        // Log with context, and let the generation fail
        _logger.LogError(ex, "Report initialization failed");
        throw;
    }
}
```

## Testing

### Unit Testing Controllers

```csharp
[TestClass]
public class InvoiceControllerTests
{
    [TestMethod]
    public void InitInvoice_SetsInvoiceNumber()
    {
        // Arrange
        var mockService = new Mock<IInvoiceService>();
        mockService.Setup(s => s.GetInvoice("12345"))
            .Returns(new Invoice { Number = "INV-12345" });

        var controller = new InvoiceController(
            mockService.Object, NullLogger<InvoiceController>.Instance, "12345");
        controller.InvoiceNumberLabel = new Label();

        // Act - the action does not use its arguments
        controller.InitInvoice(controller, null);

        // Assert
        Assert.AreEqual("Invoice #INV-12345", controller.InvoiceNumberLabel.Text);
    }
}
```

### Integration Testing Templates

```csharp
[TestMethod]
public async Task GenerateInvoice_ProducesValidPDF()
{
    // Arrange
    var controller = new InvoiceController(new InvoiceService(connectionString),
        NullLogger<InvoiceController>.Instance, "12345");

    var settings = Document.CreateParserSettings("Invoice.html", ParserConformanceMode.Strict, controller);
    using var reader = new StreamReader("Invoice.html");
    using var doc = (Document)Document.Parse("Invoice.html", reader, ParseSourceType.LocalFile, settings.Resolver, settings);

    using var factory = PaperworkFactory.Create().Build();

    // Act
    var result = await factory.NewDocument()
        .WithLayout(doc)
        .BuildAsync();

    // Assert
    Assert.IsTrue(result.Success, result.Message);
    CollectionAssert.AreEqual(new byte[] { 0x25, 0x50, 0x44, 0x46 }, result.Document.Binary.Take(4).ToArray()); // %PDF
}
```

## Security

### Configuration Security

**✅ Do:**
- Use Azure Key Vault, AWS Secrets Manager for secrets
- Encrypt connection strings
- Use environment variables for sensitive data
- Implement least-privilege access
- Rotate credentials regularly

**❌ Don't:**
- Store credentials in source control
- Hard-code secrets
- Use same credentials across environments
- Log sensitive data

### Input Validation

```csharp
public CustomerController(ICustomerService service, string customerId)
{
    // ✅ Validate format before using the value
    if (string.IsNullOrWhiteSpace(customerId))
        throw new ArgumentException("Customer ID is required");

    // ✅ Restrict to the expected characters
    if (!Regex.IsMatch(customerId, @"^[A-Z0-9-]+$"))
        throw new ArgumentException("Invalid customer ID format");

    _service = service;
    _customerId = customerId;
}

[PDFAction]
public void LoadCustomerData(object sender, LoadEventArgs args)
{
    // ✅ Use parameterized queries
    var customer = _service.GetCustomer(_customerId);  // Parameterized internally
}
```

## Documentation

### Component Documentation

```csharp
/// <summary>
/// Displays a metric card with value, label, and optional trend indicator.
/// </summary>
/// <example>
/// <code>
/// &lt;custom:StatCard value='$125,432' 
///                   label='Total Sales' 
///                   trend='+12.5%' 
///                   trend-positive='true' /&gt;
/// </code>
/// </example>
[PDFParsableComponent("StatCard")]
public class StatCard : Panel
{
    /// <summary>
    /// Gets or sets the main value to display (e.g., "$125,432").
    /// </summary>
    [PDFAttribute("value")]
    public string Value { get; set; }
    
    /// <summary>
    /// Gets or sets the descriptive label (e.g., "Total Sales").
    /// </summary>
    [PDFAttribute("label")]
    public string Label { get; set; }
}
```

### Template Documentation

```xml
<!--
    Product Catalog Template
    
    Parameters:
    - model: the catalog data, added with WithData("model", ...)
    - $fields["includeOutOfStock"]: include out-of-stock products (optional, default: false)
    
    Controller: ProductCatalog.Controllers.CatalogController
    
    Custom Components:
    - prod:ProductCard - Displays individual product with image, pricing, rating
    - prod:RatingStars - Displays star rating visualization
    
    Image Sources:
    - db://ProductImages/{productId} - Loads from ProductImages table
    
    Fonts:
    - Roboto: Headers and product names
    - Open Sans: Body text and descriptions
-->
<?xml version='1.0' encoding='utf-8' ?>
<?paperwork controller='ProductCatalog.Controllers.CatalogController, ProductCatalog' ?>
<html xmlns='http://www.w3.org/1999/xhtml'>
    <!-- Template content -->
</html>
```

## Deployment

### Checklist

**Pre-Deployment:**
- [ ] Switch to `parser-mode='Lax'`, so users always receive a document
- [ ] Set `log-level='Warnings'` or `'Errors'`
- [ ] Disable `append-log`
- [ ] Remove verbose logging
- [ ] Test with production-like data volumes
- [ ] Verify font licensing for production
- [ ] Check image and resource loading error handling
- [ ] Validate connection strings
- [ ] Test error scenarios
- [ ] Review security settings

**Deployment:**
- [ ] Deploy configuration files
- [ ] Deploy font files
- [ ] Deploy custom assemblies
- [ ] Configure logging/monitoring
- [ ] Set up health checks
- [ ] Configure PDF storage location
- [ ] Test in production environment

**Post-Deployment:**
- [ ] Monitor error logs
- [ ] Check PDF generation performance
- [ ] Verify PDF output quality
- [ ] Monitor memory usage
- [ ] Test user-facing workflows

## Common Pitfalls

### Pitfall 1: Forgetting Base Calls

```csharp
// ❌ Bad: Missing base call
protected override void OnInitialized(InitContext context)
{
    BuildContent();  // Base.OnInit not called!
}

// ✅ Good: Call base first
protected override void OnInitialized(InitContext context)
{
    base.OnInitialized(context);
    BuildContent();
}
```

### Pitfall 2: Modifying During Layout

```csharp
// ❌ Bad: Changing structure during layout
protected override void OnPreLayout(LayoutContext context)
{
    base.OnPreLayout(context);
    this.Contents.Add(new Label());  // Can cause layout issues
}

// ✅ Good: Build structure in Init (or OnDataBound for values bound from data)
protected override void OnInitialized(InitContext context)
{
    base.OnInitialized(context);
    this.Contents.Add(new Label());  // Correct phase
}
```

### Pitfall 3: Blocking on Async

```csharp
// ❌ Bad: Blocking on async calls inside an action
[PDFAction]
public void LoadData(object sender, LoadEventArgs args)
{
    var data = _httpClient.GetAsync("...").Result;  // Deadlock risk!
}

// ✅ Good: Load the data asynchronously before generating, and pass it in
var data = await _httpClient.GetStringAsync("...");

await factory.NewDocument()
    .WithLayoutFile("report.html")
    .WithData("model", data)
    .SaveAsync("report.pdf");
```

### Pitfall 4: Ignoring Disposal

```csharp
// ❌ Bad: Resource leak
private byte[] LoadImage(string path)
{
    var connection = new SqlConnection(_connectionString);
    connection.Open();
    // connection never disposed!
    return LoadFromDatabase(connection, path);
}

// ✅ Good: Proper disposal
private byte[] LoadImage(string path)
{
    using var connection = new SqlConnection(_connectionString);
    connection.Open();
    return LoadFromDatabase(connection, path);
}
```

## Summary

### Quick Reference

| Topic | Key Guideline |
|-------|--------------|
| **Configuration** | Use environment-specific files, externalize secrets |
| **Controllers** | Inject dependencies, keep focused, log operations |
| **Components** | Single responsibility, composable, sensible defaults |
| **Namespaces** | Use domain-based URIs, version for breaking changes |
| **Images & Resources** | Specific patterns, graceful errors, thread-safe |
| **Fonts** | Test character sets, document licenses, provide fallbacks |
| **Performance** | Cache data, lazy-load resources, monitor memory |
| **Error Handling** | Validate early, log with context, fail fast |
| **Testing** | Unit test controllers, integration test templates |
| **Security** | Vault secrets, validate inputs, parameterized queries |
| **Documentation** | Document components, templates, configuration |
| **Deployment** | Lax mode, minimal logging, test thoroughly |

## Related Documentation

- [Processing Instructions](processing-instructions)
- [Document Controllers](document-controllers)
- [Custom Components](custom-components)
- [Namespace Registration](namespace-registration)
- [Image Factories](image-factories)
- [Font Configuration](font-configuration)
- [Integration Example](integration-example)
