---
layout: default
title: Best Practices
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 9
---

# Best Practices

Comprehensive guidelines for configuring and extending Scryber effectively.

## Configuration Management

### JSON Configuration Files

**Structure your configuration clearly:**

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [ /* Custom component namespaces */ ]
    },
    "Fonts": {
      "Register": [ /* Custom fonts */ ]
    },
    "Imaging": {
      "Factories": [ /* Custom image loaders */ ]
    },
    "Tracing": {
      "TraceLevel": "Messages",
      "LogOutput": true
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
- Mix application and Scryber configuration concerns
- Leave sensitive data in source control

### Environment-Specific Configuration

```csharp
var config = new ConfigurationBuilder()
    .AddJsonFile("scrybersettings.json", optional: false)
    .AddJsonFile($"scrybersettings.{env}.json", optional: true)
    .AddEnvironmentVariables()
    .Build();
```

**Development (scrybersettings.Development.json):**
```json
{
  "Scryber": {
    "Tracing": {
      "TraceLevel": "Verbose",
      "LogOutput": true
    }
  }
}
```

**Production (scrybersettings.Production.json):**
```json
{
  "Scryber": {
    "Tracing": {
      "TraceLevel": "Warnings",
      "LogOutput": false
    }
  }
}
```

## Document Controllers

### Controller Design

**✅ Do:**
- Keep controllers focused on coordination, not business logic
- Use dependency injection for services
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
    private readonly ICustomerService _customerService;
    private readonly ILogger<InvoiceController> _logger;
    
    // Constructor injection for testability
    public InvoiceController(
        IInvoiceService invoiceService,
        ICustomerService customerService,
        ILogger<InvoiceController> logger)
    {
        _invoiceService = invoiceService;
        _customerService = customerService;
        _logger = logger;
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
    public void InitInvoice(InitContext context)
    {
        _logger.LogInformation("Initializing invoice document");
        
        try
        {
            var invoiceId = context.Document.Params["InvoiceId"] as string;
            var invoice = _invoiceService.GetInvoice(invoiceId);
            
            InvoiceNumberLabel.Text = $"Invoice #{invoice.Number}";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to initialize invoice");
            throw;
        }
    }
    
    public void LoadInvoiceData(LoadContext context)
    {
        _logger.LogInformation("Loading invoice data");
        
        try
        {
            var invoiceId = context.Document.Params["InvoiceId"] as string;
            var invoice = _invoiceService.GetInvoiceWithDetails(invoiceId);
            
            // Transform for display (presentation concern)
            var lineItems = invoice.LineItems.Select(li => new
            {
                Description = li.Description,
                Quantity = li.Quantity,
                UnitPrice = li.UnitPrice.ToString("C"),
                Total = (li.Quantity * li.UnitPrice).ToString("C")
            }).ToList();
            
            LineItemsRepeater.DataSource = lineItems;
            LineItemsRepeater.Value = lineItems;
            
            // Handle optional outlet
            if (CustomerNotesLabel != null && !string.IsNullOrEmpty(invoice.Notes))
            {
                CustomerNotesLabel.Text = invoice.Notes;
            }
            
            _logger.LogInformation($"Loaded {lineItems.Count} line items");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to load invoice data");
            throw;
        }
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
```csharp
// ✅ Good: Composable components
<custom:DashboardCard title='Sales'>
    <Sections>
        <pdf:Panel>
            <custom:StatCard value='$125K' label='Revenue' />
        </pdf:Panel>
        <pdf:Panel>
            <custom:LineChart data='{@:SalesData}' />
        </pdf:Panel>
    </Sections>
</custom:DashboardCard>

// ❌ Bad: Monolithic component
<custom:SalesDashboard 
    revenue='$125K' 
    chartData='...' 
    tableData='...' 
    showExport='true' />
```

**Lifecycle Usage:**
```csharp
protected override void OnInit(InitContext context)
{
    base.OnInit(context);
    
    // ✅ Do: Build child content
    BuildCardContent();
    
    // ❌ Don't: Load external data (use OnLoad)
    // var data = _httpClient.GetAsync("...").Result;
}

protected override void OnLoad(LoadContext context)
{
    base.OnLoad(context);
    
    // ✅ Do: Load external data, access services
    var service = context.ServiceProvider.GetService<IDataService>();
    var data = service.LoadData();
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
    protected override void OnInit(InitContext context)
    {
        base.OnInit(context);
        
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
      "XMLNamespace": "http://mycompany.com/components/cards",
      "AssemblyPrefix": "MyCompany.Components.Cards, MyCompany.Components"
    },
    {
      "XMLNamespace": "http://mycompany.com/components/charts",
      "AssemblyPrefix": "MyCompany.Components.Charts, MyCompany.Components"
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

```csharp
// ✅ Good: Specific, unambiguous pattern
public string FactoryKey => @"^product://[\w-]+$";

// ❌ Bad: Overly broad pattern
public string FactoryKey => @".*";

// ✅ Good: Protocol-based patterns
public string FactoryKey => @"^db://[\w/]+$";        // Database
public string FactoryKey => @"^s3://[\w/]+$";        // S3
public string FactoryKey => @"^azblob://[\w/]+$";    // Azure Blob
```

### Error Handling

```csharp
public byte[] LoadImageData(IDocument document, IComponent component, string source)
{
    try
    {
        return LoadFromSource(source);
    }
    catch (FileNotFoundException ex)
    {
        _logger.LogWarning(ex, $"Image not found: {source}");
        return GetPlaceholderImage();  // Graceful degradation
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Failed to load image: {source}");
        throw new PDFImageException($"Image load failed: {source}", ex);
    }
}
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
<pdf:Styles>
    <pdf:Style>
        <!-- Primary → Fallback 1 → Fallback 2 → Generic -->
        <pdf:Font-Family>Roboto, 'Open Sans', Helvetica, sans-serif</pdf:Font-Family>
    </pdf:Style>
</pdf:Styles>
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
public class ReportController
{
    private readonly IReportService _reportService;
    private readonly IMemoryCache _cache;
    
    public async Task LoadReportDataAsync(LoadContext context)
    {
        var cacheKey = $"report-{context.Document.Params["ReportId"]}";
        
        // Check cache first
        if (!_cache.TryGetValue(cacheKey, out ReportData data))
        {
            // Load from database
            data = await _reportService.GetReportDataAsync(reportId);
            
            // Cache for 5 minutes
            _cache.Set(cacheKey, data, TimeSpan.FromMinutes(5));
        }
        
        // Bind to template
        DataRepeater.DataSource = data.Items;
    }
}
```

### Component Performance

```csharp
// ✅ Good: Efficient child creation
protected override void OnInit(InitContext context)
{
    base.OnInit(context);
    
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
<?scryber parser-mode='Lax' 
          parser-log='true' 
          append-log='true' 
          log-level='Diagnostic' ?>
```

**Production:**
```xml
<?scryber parser-mode='Strict' 
          log-level='Warnings' ?>
```

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
public void InitReport(InitContext context)
{
    try
    {
        // Validate document parameters
        if (!context.Document.Params.ContainsKey("ReportId"))
        {
            throw new PDFControllerException(
                "Required parameter 'ReportId' not provided",
                nameof(InitReport));
        }
        
        // Validate outlets
        if (TitleLabel == null)
        {
            throw new PDFControllerException(
                "Required outlet 'TitleLabel' not found in template",
                nameof(InitReport));
        }
        
        // Initialize
        var reportId = context.Document.Params["ReportId"] as string;
        _logger.LogInformation($"Initializing report: {reportId}");
        
        TitleLabel.Text = $"Report {reportId}";
    }
    catch (PDFControllerException)
    {
        // Re-throw controller exceptions
        throw;
    }
    catch (Exception ex)
    {
        // Wrap other exceptions
        _logger.LogError(ex, "Report initialization failed");
        throw new PDFControllerException(
            "Failed to initialize report", 
            nameof(InitReport), 
            ex);
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
        
        var controller = new InvoiceController(mockService.Object);
        controller.InvoiceNumberLabel = new Label();
        
        var context = new InitContext(new Document(), new TraceLog(TraceRecordLevel.Off), null);
        context.Document.Params["InvoiceId"] = "12345";
        
        // Act
        controller.InitInvoice(context);
        
        // Assert
        Assert.AreEqual("Invoice #INV-12345", controller.InvoiceNumberLabel.Text);
    }
}
```

### Integration Testing Templates

```csharp
[TestMethod]
public void GenerateInvoice_ProducesValidPDF()
{
    // Arrange
    var service = new InvoiceService(connectionString);
    var controller = new InvoiceController(service);
    
    var settings = new ParserSettings();
    settings.Controller = controller;
    
    // Act
    using (var reader = new StreamReader("Invoice.pdfx"))
    using (var output = new MemoryStream())
    {
        var doc = Document.ParseDocument(reader, ParseSourceType.DynamicContent, settings);
        doc.ProcessDocument(output);
        
        // Assert
        Assert.IsTrue(output.Length > 0);
        Assert.IsTrue(output.ToArray().StartsWith(new byte[] { 0x25, 0x50, 0x44, 0x46 })); // %PDF
    }
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
public void LoadCustomerData(LoadContext context)
{
    // Validate and sanitize inputs
    var customerId = context.Document.Params["CustomerId"] as string;
    
    // ✅ Validate format
    if (string.IsNullOrWhiteSpace(customerId))
        throw new ArgumentException("Customer ID is required");
    
    // ✅ Sanitize for SQL
    if (!Regex.IsMatch(customerId, @"^[A-Z0-9-]+$"))
        throw new ArgumentException("Invalid customer ID format");
    
    // ✅ Use parameterized queries
    var customer = _service.GetCustomer(customerId);  // Parameterized internally
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
    - CatalogId: string - Catalog identifier (required)
    - IncludeOutOfStock: bool - Include out-of-stock products (optional, default: false)
    
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
<?scryber controller='ProductCatalog.Controllers.CatalogController, ProductCatalog' ?>
<pdf:Document ...>
    <!-- Template content -->
</pdf:Document>
```

## Deployment

### Checklist

**Pre-Deployment:**
- [ ] Switch to `parser-mode='Strict'`
- [ ] Set `log-level='Warnings'` or `'Errors'`
- [ ] Disable `append-log`
- [ ] Remove verbose logging
- [ ] Test with production-like data volumes
- [ ] Verify font licensing for production
- [ ] Check image factory error handling
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
protected override void OnInit(InitContext context)
{
    BuildContent();  // Base.OnInit not called!
}

// ✅ Good: Call base first
protected override void OnInit(InitContext context)
{
    base.OnInit(context);
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

// ✅ Good: Build structure in Init
protected override void OnInit(InitContext context)
{
    base.OnInit(context);
    this.Contents.Add(new Label());  // Correct phase
}
```

### Pitfall 3: Blocking on Async

```csharp
// ❌ Bad: Blocking async call
public void LoadData(LoadContext context)
{
    var data = _httpClient.GetAsync("...").Result;  // Deadlock risk!
}

// ✅ Good: Use sync version or refactor
public void LoadData(LoadContext context)
{
    var data = _httpClient.GetStringAsync("...").GetAwaiter().GetResult();
    // Or better: Make service provide sync API
}
```

### Pitfall 4: Ignoring Disposal

```csharp
// ❌ Bad: Resource leak
public byte[] LoadImageData(...)
{
    var connection = new SqlConnection(_connectionString);
    connection.Open();
    // connection never disposed!
    return LoadFromDatabase(connection);
}

// ✅ Good: Proper disposal
public byte[] LoadImageData(...)
{
    using (var connection = new SqlConnection(_connectionString))
    {
        connection.Open();
        return LoadFromDatabase(connection);
    }
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
| **Image Factories** | Specific patterns, graceful errors, thread-safe |
| **Fonts** | Test character sets, document licenses, provide fallbacks |
| **Performance** | Cache data, lazy-load resources, monitor memory |
| **Error Handling** | Validate early, log with context, fail fast |
| **Testing** | Unit test controllers, integration test templates |
| **Security** | Vault secrets, validate inputs, parameterized queries |
| **Documentation** | Document components, templates, configuration |
| **Deployment** | Strict mode, minimal logging, test thoroughly |

## Related Documentation

- [Processing Instructions](processing-instructions)
- [Document Controllers](document-controllers)
- [Custom Components](custom-components)
- [Namespace Registration](namespace-registration)
- [Image Factories](image-factories)
- [Font Configuration](font-configuration)
- [Integration Example](integration-example)
