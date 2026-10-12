---
layout: default
title: Integration Example
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 8
---

# Complete Integration Example

This example demonstrates **all extension mechanisms working together**:
- Custom components with namespace registration
- Document controller with outlets and actions
- Custom image factory for database images
- Custom font registration
- Processing instructions
- Complete configuration

## Scenario

A **product catalog application** that generates PDF catalogs with:
- Custom `ProductCard` component
- Custom `RatingStars` component  
- Controller loading products from database
- Product images loaded from database
- Custom fonts (Roboto, Open Sans)

## Project Structure

```
ProductCatalog/
├── Components/
│   ├── ProductCard.cs
│   └── RatingStars.cs
├── Controllers/
│   └── CatalogController.cs
├── Imaging/
│   └── DatabaseImageFactory.cs
├── Models/
│   └── Product.cs
├── Services/
│   └── ProductService.cs
├── Templates/
│   └── Catalog.pdfx
├── Fonts/
│   ├── Roboto-Regular.ttf
│   ├── Roboto-Bold.ttf
│   ├── OpenSans-Regular.ttf
│   └── OpenSans-Bold.ttf
├── scrybersettings.json
├── ProductCatalog.csproj
└── Program.cs
```

## Implementation

### 1. Custom Components

**Components/ProductCard.cs:**

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Drawing;
using Scryber.Styles;

namespace ProductCatalog.Components
{
    [PDFParsableComponent("ProductCard")]
    public class ProductCard : Panel
    {
        [PDFAttribute("product-name")]
        public string ProductName { get; set; }
        
        [PDFAttribute("price")]
        public string Price { get; set; }
        
        [PDFAttribute("description")]
        public string Description { get; set; }
        
        [PDFAttribute("image-src")]
        public string ImageSource { get; set; }
        
        [PDFAttribute("rating")]
        public double Rating { get; set; }
        
        [PDFAttribute("stock-level")]
        public string StockLevel { get; set; }
        
        public ProductCard() : base(ObjectTypes.Panel)
        {
        }
        
        protected override void OnInit(InitContext context)
        {
            base.OnInit(context);
            BuildCardContent();
        }
        
        private void BuildCardContent()
        {
            // Card container styling
            this.Style.Size.Width = 250;
            this.Style.Padding.All = 15;
            this.Style.Margins.All = 10;
            this.Style.Background.Color = PDFColors.White;
            this.Style.Border.Width = 1;
            this.Style.Border.Color = new PDFColor(200, 200, 200);
            this.Style.Border.CornerRadius = 8;
            
            // Product image
            if (!string.IsNullOrEmpty(ImageSource))
            {
                var image = new Image();
                image.Source = ImageSource;
                image.Style.Size.Width = 220;
                image.Style.Size.Height = 180;
                image.Style.Margins.Bottom = 10;
                this.Contents.Add(image);
            }
            
            // Product name
            if (!string.IsNullOrEmpty(ProductName))
            {
                var nameLabel = new Label();
                nameLabel.Text = ProductName;
                nameLabel.StyleClass = "product-name";
                nameLabel.Style.Font.FontFamily = new FontSelector("Roboto");
                nameLabel.Style.Font.FontSize = 16;
                nameLabel.Style.Font.FontBold = true;
                nameLabel.Style.Margins.Bottom = 5;
                this.Contents.Add(nameLabel);
            }
            
            // Price
            if (!string.IsNullOrEmpty(Price))
            {
                var priceLabel = new Label();
                priceLabel.Text = Price;
                priceLabel.StyleClass = "product-price";
                priceLabel.Style.Font.FontFamily = new FontSelector("Roboto");
                priceLabel.Style.Font.FontSize = 20;
                priceLabel.Style.Fill.Color = new PDFColor(220, 20, 60);
                priceLabel.Style.Font.FontBold = true;
                priceLabel.Style.Margins.Bottom = 8;
                this.Contents.Add(priceLabel);
            }
            
            // Rating stars
            if (Rating > 0)
            {
                var stars = new RatingStars();
                stars.Rating = Rating;
                stars.Style.Margins.Bottom = 8;
                this.Contents.Add(stars);
            }
            
            // Description
            if (!string.IsNullOrEmpty(Description))
            {
                var descLabel = new Label();
                descLabel.Text = Description;
                descLabel.StyleClass = "product-description";
                descLabel.Style.Font.FontFamily = new FontSelector("Open Sans");
                descLabel.Style.Font.FontSize = 10;
                descLabel.Style.Fill.Color = new PDFColor(100, 100, 100);
                descLabel.Style.Margins.Bottom = 8;
                this.Contents.Add(descLabel);
            }
            
            // Stock level badge
            if (!string.IsNullOrEmpty(StockLevel))
            {
                var stockPanel = new Panel();
                stockPanel.Style.Padding.All = 5;
                stockPanel.Style.Background.Color = GetStockLevelColor(StockLevel);
                stockPanel.Style.Border.CornerRadius = 4;
                
                var stockLabel = new Label();
                stockLabel.Text = StockLevel;
                stockLabel.Style.Font.FontSize = 9;
                stockLabel.Style.Fill.Color = PDFColors.White;
                stockPanel.Contents.Add(stockLabel);
                
                this.Contents.Add(stockPanel);
            }
        }
        
        private PDFColor GetStockLevelColor(string level)
        {
            return level.ToLower() switch
            {
                "in stock" => new PDFColor(34, 139, 34),
                "low stock" => new PDFColor(255, 140, 0),
                "out of stock" => new PDFColor(220, 20, 60),
                _ => PDFColors.Gray
            };
        }
    }
}
```

**Components/RatingStars.cs:**

```csharp
using System;
using Scryber;
using Scryber.Components;
using Scryber.Drawing;

namespace ProductCatalog.Components
{
    [PDFParsableComponent("RatingStars")]
    public class RatingStars : Panel
    {
        [PDFAttribute("rating")]
        public double Rating { get; set; }
        
        [PDFAttribute("max-rating")]
        public int MaxRating { get; set; } = 5;
        
        public RatingStars() : base(ObjectTypes.Panel)
        {
        }
        
        protected override void OnInit(InitContext context)
        {
            base.OnInit(context);
            BuildStars();
        }
        
        private void BuildStars()
        {
            int fullStars = (int)Math.Floor(Rating);
            bool hasHalfStar = (Rating - fullStars) >= 0.5;
            
            for (int i = 0; i < MaxRating; i++)
            {
                var star = new Label();
                
                if (i < fullStars)
                {
                    star.Text = "★";  // Full star
                    star.Style.Fill.Color = new PDFColor(255, 215, 0);  // Gold
                }
                else if (i == fullStars && hasHalfStar)
                {
                    star.Text = "⯨";  // Half star
                    star.Style.Fill.Color = new PDFColor(255, 215, 0);
                }
                else
                {
                    star.Text = "☆";  // Empty star
                    star.Style.Fill.Color = new PDFColor(200, 200, 200);
                }
                
                star.Style.Font.FontSize = 14;
                this.Contents.Add(star);
            }
            
            // Add rating number
            var ratingLabel = new Label();
            ratingLabel.Text = $" {Rating:0.0}";
            ratingLabel.Style.Font.FontSize = 11;
            ratingLabel.Style.Fill.Color = PDFColors.Gray;
            this.Contents.Add(ratingLabel);
        }
    }
}
```

### 2. Document Controller

**Controllers/CatalogController.cs:**

```csharp
using System.Collections.Generic;
using Scryber;
using Scryber.Components;
using Scryber.Data;
using ProductCatalog.Models;
using ProductCatalog.Services;

namespace ProductCatalog.Controllers
{
    public class CatalogController
    {
        private readonly ProductService _productService;
        
        // Outlets
        [PDFOutlet(Required = true)]
        public Label CatalogTitleLabel { get; set; }
        
        [PDFOutlet(Required = true)]
        public Label GeneratedDateLabel { get; set; }
        
        [PDFOutlet(Required = true)]
        public ForEach ProductRepeater { get; set; }
        
        [PDFOutlet]
        public Label TotalProductsLabel { get; set; }
        
        public CatalogController(ProductService productService)
        {
            _productService = productService;
        }
        
        // Actions
        public void InitCatalog(InitContext context)
        {
            context.TraceLog.Add(TraceLevel.Message, "Catalog", "Initializing product catalog");
            
            CatalogTitleLabel.Text = "Product Catalog 2026";
            GeneratedDateLabel.Text = $"Generated: {DateTime.Now:MMMM dd, yyyy}";
        }
        
        public void LoadProducts(LoadContext context)
        {
            context.TraceLog.Add(TraceLevel.Message, "Catalog", "Loading products from database");
            
            // Load products via service
            var products = _productService.GetAllProducts();
            
            // Transform for display
            var productData = products.Select(p => new
            {
                ProductName = p.Name,
                Price = p.Price.ToString("C"),
                Description = p.Description,
                ImageSource = $"db://ProductImages/{p.Id}",  // Database image factory
                Rating = p.AverageRating,
                StockLevel = GetStockLevelText(p.StockQuantity)
            }).ToList();
            
            // Bind to repeater
            ProductRepeater.DataSource = productData;
            ProductRepeater.Value = productData;
            
            // Set total count
            if (TotalProductsLabel != null)
            {
                TotalProductsLabel.Text = $"Total Products: {products.Count}";
            }
            
            context.TraceLog.Add(TraceLevel.Verbose, "Catalog", 
                $"Loaded {products.Count} products");
        }
        
        public void PreLayoutHandler(LayoutContext context)
        {
            context.TraceLog.Add(TraceLevel.Verbose, "Catalog", "Pre-layout processing");
            
            // Adjust layout based on product count
            if (ProductRepeater.ChildCount > 50)
            {
                context.TraceLog.Add(TraceLevel.Warning, "Catalog", 
                    "Large product count may affect performance");
            }
        }
        
        public void PostLayoutHandler(LayoutContext context)
        {
            var pageCount = context.DocumentLayout.AllPages.Count;
            
            context.TraceLog.Add(TraceLevel.Message, "Catalog", 
                $"Catalog generated: {pageCount} pages, {ProductRepeater.ChildCount} products");
        }
        
        private string GetStockLevelText(int quantity)
        {
            if (quantity == 0) return "Out of Stock";
            if (quantity < 10) return "Low Stock";
            return "In Stock";
        }
    }
}
```

### 3. Custom Image Factory

**Imaging/DatabaseImageFactory.cs:**

```csharp
using System;
using System.Data.SqlClient;
using System.IO;
using System.Text.RegularExpressions;
using Scryber;
using Scryber.Components;
using Scryber.Imaging;

namespace ProductCatalog.Imaging
{
    public class DatabaseImageFactory : IPDFImageDataFactory
    {
        private readonly string _connectionString;
        private readonly Regex _pattern;
        
        public string FactoryKey => @"^db://[\w/]+$";
        
        public DatabaseImageFactory(string connectionString)
        {
            _connectionString = connectionString;
            _pattern = new Regex(FactoryKey, RegexOptions.IgnoreCase);
        }
        
        public bool ShouldMatch(string source)
        {
            return !string.IsNullOrEmpty(source) && _pattern.IsMatch(source);
        }
        
        public byte[] LoadImageData(IDocument document, IComponent component, string source)
        {
            // Parse: db://ProductImages/12345
            var uri = new Uri(source);
            var parts = uri.AbsolutePath.Trim('/').Split('/');
            
            if (parts.Length != 2)
                throw new ArgumentException($"Invalid database image path: {source}");
            
            string tableName = parts[0];
            string id = parts[1];
            
            return LoadFromDatabase(tableName, id);
        }
        
        private byte[] LoadFromDatabase(string tableName, string id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                
                var query = $"SELECT ImageData FROM {tableName} WHERE ProductId = @ProductId";
                
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ProductId", id);
                    
                    var result = command.ExecuteScalar();
                    
                    if (result == null || result is DBNull)
                    {
                        // Return placeholder image
                        return GetPlaceholderImage();
                    }
                    
                    return (byte[])result;
                }
            }
        }
        
        private byte[] GetPlaceholderImage()
        {
            // Return a simple placeholder PNG
            var placeholderPath = Path.Combine("Images", "placeholder.png");
            return File.ReadAllBytes(placeholderPath);
        }
    }
}
```

### 4. Models and Services

**Models/Product.cs:**

```csharp
namespace ProductCatalog.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public double AverageRating { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
```

**Services/ProductService.cs:**

```csharp
using System.Collections.Generic;
using System.Data.SqlClient;
using ProductCatalog.Models;

namespace ProductCatalog.Services
{
    public class ProductService
    {
        private readonly string _connectionString;
        
        public ProductService(string connectionString)
        {
            _connectionString = connectionString;
        }
        
        public List<Product> GetAllProducts()
        {
            var products = new List<Product>();
            
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                
                var query = @"
                    SELECT Id, Name, Description, Price, StockQuantity, AverageRating
                    FROM Products 
                    WHERE IsActive = 1
                    ORDER BY Name";
                
                using (var command = new SqlCommand(query, connection))
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        products.Add(new Product
                        {
                            Id = reader.GetInt32(0),
                            Name = reader.GetString(1),
                            Description = reader.GetString(2),
                            Price = reader.GetDecimal(3),
                            StockQuantity = reader.GetInt32(4),
                            AverageRating = reader.GetDouble(5)
                        });
                    }
                }
            }
            
            return products;
        }
    }
}
```

### 5. Configuration

**scrybersettings.json:**

```json
{
  "ConnectionStrings": {
    "ProductCatalog": "Server=localhost;Database=ProductCatalog;Integrated Security=true;"
  },
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "XMLNamespace": "http://productcatalog.com/components",
          "AssemblyPrefix": "ProductCatalog.Components, ProductCatalog"
        }
      ]
    },
    "Fonts": {
      "Register": [
        {
          "Family": "Roboto",
          "File": "Fonts/Roboto-Regular.ttf",
          "Bold": "Fonts/Roboto-Bold.ttf"
        },
        {
          "Family": "Open Sans",
          "File": "Fonts/OpenSans-Regular.ttf",
          "Bold": "Fonts/OpenSans-Bold.ttf"
        }
      ]
    },
    "Imaging": {
      "Factories": [
        {
          "Key": "database-images",
          "Type": "ProductCatalog.Imaging.DatabaseImageFactory, ProductCatalog"
        }
      ]
    },
    "Tracing": {
      "TraceLevel": "Messages",
      "LogOutput": true
    }
  }
}
```

### 6. Template

**Templates/Catalog.pdfx:**

```xml
<?xml version='1.0' encoding='utf-8' ?>
<?scryber controller='ProductCatalog.Controllers.CatalogController, ProductCatalog' 
          parser-mode='Strict' 
          log-level='Messages' ?>

<pdf:Document xmlns:pdf='http://www.scryber.co.uk/schemas/core/release/v1/Scryber.Components.xsd'
              xmlns:prod='http://productcatalog.com/components'>
    
    <Styles>
        <pdf:Style applied-class='header'>
            <pdf:Font-Family>Roboto</pdf:Font-Family>
            <pdf:Font-Size>28pt</pdf:Font-Size>
            <pdf:Font-Bold>true</pdf:Font-Bold>
            <pdf:Fill-Color>#1a1a1a</pdf:Fill-Color>
            <pdf:Margins-Bottom>10pt</pdf:Margins-Bottom>
        </pdf:Style>
        
        <pdf:Style applied-class='subheader'>
            <pdf:Font-Family>Open Sans</pdf:Font-Family>
            <pdf:Font-Size>12pt</pdf:Font-Size>
            <pdf:Fill-Color>#666666</pdf:Fill-Color>
            <pdf:Margins-Bottom>20pt</pdf:Margins-Bottom>
        </pdf:Style>
    </Styles>
    
    <Pages>
        <pdf:Page on-init='InitCatalog' 
                  on-load='LoadProducts'
                  on-prelayout='PreLayoutHandler'
                  on-postlayout='PostLayoutHandler'>
            
            <Header>
                <pdf:Div>
                    <pdf:Label id='CatalogTitleLabel' class='header' />
                    <pdf:Label id='GeneratedDateLabel' class='subheader' />
                </pdf:Div>
            </Header>
            
            <Content>
                
                <!-- Product grid -->
                <pdf:Div style:column-count='3' style:column-gap='20pt'>
                    
                    <pdf:ForEach id='ProductRepeater' value='.'>
                        
                        <!-- Custom ProductCard component -->
                        <prod:ProductCard product-name='{@:ProductName}'
                                         price='{@:Price}'
                                         description='{@:Description}'
                                         image-src='{@:ImageSource}'
                                         rating='{@:Rating}'
                                         stock-level='{@:StockLevel}' />
                        
                    </pdf:ForEach>
                    
                </pdf:Div>
                
            </Content>
            
            <Footer>
                <pdf:Div>
                    <pdf:Label id='TotalProductsLabel' />
                    <pdf:Label text=' | Page ' />
                    <pdf:PageNumber />
                    <pdf:Label text=' of ' />
                    <pdf:PageCount />
                </pdf:Div>
            </Footer>
            
        </pdf:Page>
    </Pages>
    
</pdf:Document>
```

### 7. Application Startup

**Program.cs:**

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Scryber;
using Scryber.Components;
using ProductCatalog.Controllers;
using ProductCatalog.Services;
using ProductCatalog.Imaging;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =>
    {
        var config = context.Configuration;
        var connectionString = config.GetConnectionString("ProductCatalog");
        
        // Register Scryber with configuration
        services.AddScryber(options =>
        {
            // Custom image factory
            options.ImagingOptions.Register.Add(
                new DatabaseImageFactory(connectionString));
        });
        
        // Register application services
        services.AddSingleton(new ProductService(connectionString));
        services.AddTransient<CatalogController>();
    })
    .Build();

// Generate catalog
var productService = host.Services.GetRequiredService<ProductService>();
var controller = new CatalogController(productService);

var settings = new ParserSettings();
settings.Controller = controller;

using (var reader = new StreamReader("Templates/Catalog.pdfx"))
{
    var doc = Document.ParseDocument(reader, ParseSourceType.DynamicContent, settings);
    doc.ProcessDocument("ProductCatalog.pdf");
}

Console.WriteLine("Product catalog generated successfully!");
```

## How It Works Together

### 1. Configuration Loading
- `AddScryber()` loads `scrybersettings.json`
- Namespace registration: `http://productcatalog.com/components` → `ProductCatalog.Components`
- Fonts registered: Roboto, Open Sans from `Fonts/` directory
- Image factory registered: `DatabaseImageFactory` for `db://` URLs

### 2. Template Parsing
- Processing instruction specifies `CatalogController`
- Parser encounters `<prod:ProductCard>` element
- Namespace lookup resolves to `ProductCatalog.Components.ProductCard`
- Component instantiated, properties set from XML attributes

### 3. Controller Initialization
- Controller instantiated with `ProductService` dependency
- Outlets assigned: `CatalogTitleLabel`, `GeneratedDateLabel`, `ProductRepeater`, `TotalProductsLabel`
- Outlets validated (required outlets must be assigned)

### 4. Document Lifecycle
- **Init**: `InitCatalog()` sets title and date labels
- **Load**: `LoadProducts()` queries database, transforms data, binds to repeater
- **DataBind**: ForEach creates `ProductCard` for each product
- **PreLayout**: `PreLayoutHandler()` logs warnings for large datasets
- **Layout**: Scryber calculates positions, pages
- **PostLayout**: `PostLayoutHandler()` logs final page count

### 5. Image Loading
- `ProductCard` specifies `image-src='db://ProductImages/12345'`
- `DatabaseImageFactory.ShouldMatch()` returns true (matches pattern)
- `LoadImageData()` queries database, retrieves BLOB
- Image rendered in PDF

### 6. Font Rendering
- "Roboto" requested for product name
- Font lookup: Custom registry → finds `Fonts/Roboto-Bold.ttf`
- Font metrics extracted, glyphs subset
- Text rendered with Roboto font in PDF

## Result

The generated `ProductCatalog.pdf` contains:
- Custom fonts (Roboto, Open Sans) throughout
- Product grid with custom `ProductCard` components
- Rating stars (custom `RatingStars` components)
- Product images loaded from database
- Dynamic product count and page numbers
- Controller-driven data binding

## Extension Points Summary

| Extension | File | Purpose |
|-----------|------|---------|
| Custom Components | `ProductCard.cs`, `RatingStars.cs` | Reusable product display widgets |
| Document Controller | `CatalogController.cs` | Data loading, lifecycle management |
| Image Factory | `DatabaseImageFactory.cs` | Load product images from database |
| Font Registration | `scrybersettings.json` | Custom fonts (Roboto, Open Sans) |
| Namespace Registration | `scrybersettings.json` | Component discovery |
| Processing Instructions | `Catalog.pdfx` | Controller specification, parser mode |

## Key Benefits

1. **Separation of Concerns**: Presentation (PDFX), logic (Controller), data (Service)
2. **Reusability**: `ProductCard` and `RatingStars` can be used in multiple templates
3. **Testability**: Controller and components can be unit tested
4. **Maintainability**: Change data source without touching template
5. **Extensibility**: Add new components, factories without core changes

## Related Documentation

- [Custom Components](custom-components) - Creating parseable components
- [Document Controllers](document-controllers) - Controller architecture
- [Image Factories](image-factories) - Custom image loading
- [Font Configuration](font-configuration) - Font registration
- [Namespace Registration](namespace-registration) - Component discovery
- [Processing Instructions](processing-instructions) - Document configuration
- [Best Practices](best-practices) - Design patterns and guidelines
