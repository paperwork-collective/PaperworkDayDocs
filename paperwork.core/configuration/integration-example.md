---
layout: default
title: Integration Example
parent: Configuration & Extension
parent_url: /paperwork.core/configuration/
has_children: false
has_toc: false
nav_order: 11
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Complete Integration Example

This example brings the extension mechanisms together in one application:
- Custom components with namespace registration
- A document controller with outlets and actions
- Product images loaded from a custom path
- Custom font registration
- Data from the document builder

## Scenario

A **product catalog application** that generates PDF catalogs with:
- A custom `ProductCard` component, and a `RatingStars` component it uses
- A controller that sets the title, date and product count
- Product images loaded by the application from its own store
- A registered font (Open Sans)

## Project Structure

```
ProductCatalog/
├── Components/
│   ├── ProductCard.cs
│   └── RatingStars.cs
├── Controllers/
│   └── CatalogController.cs
├── Models/
│   └── Product.cs
├── Services/
│   └── ProductService.cs
├── Templates/
│   └── Catalog.html
├── Fonts/
│   ├── OpenSans-Regular.ttf
│   └── OpenSans-Bold.ttf
├── Images/
│   └── placeholder.png
├── appsettings.json
├── ProductCatalog.csproj
└── Program.cs
```

## Implementation

### 1. Custom Components

**Components/ProductCard.cs:**

The card's attributes are bound to the data in the template, so it builds its content once it has been data bound.

```csharp
using Scryber;
using Scryber.Components;
using Scryber.Drawing;

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

        // The attribute values are bound from the data ({{this.name}} etc.),
        // so the content is built once the card has been data bound
        protected override void OnDataBound(DataContext context)
        {
            base.OnDataBound(context);
            BuildCardContent();
        }

        private void BuildCardContent()
        {
            // Card container styling
            this.Style.Size.Width = 250;
            this.Style.Padding.All = 12;
            this.Style.Margins.Bottom = 12;
            this.Style.Background.Color = StandardColors.White;
            this.Style.Border.Width = 1;
            this.Style.Border.Color = new Color(200, 200, 200);
            this.Style.Border.CornerRadius = 8;

            // Product image
            if (!string.IsNullOrEmpty(ImageSource))
            {
                var image = new Image();
                image.Source = ImageSource;
                image.Style.Size.Width = 80;
                image.Style.Margins.Bottom = 8;
                this.Contents.Add(image);
            }

            AddLine(ProductName, 16, true, StandardColors.Black);
            AddLine(Price, 14, true, new Color(220, 20, 60));

            if (Rating > 0)
            {
                var stars = new RatingStars();
                stars.Rating = Rating;
                this.Contents.Add(stars);
            }

            AddLine(Description, 10, false, new Color(100, 100, 100));
            AddLine(StockLevel, 9, true, GetStockLevelColor(StockLevel));
        }

        private void AddLine(string text, double size, bool bold, Color color)
        {
            if (string.IsNullOrEmpty(text))
                return;

            var label = new Label();
            label.Text = text;
            label.Style.Font.FontSize = size;
            label.Style.Font.FontBold = bold;
            label.Style.Fill.Color = color;
            label.Style.Margins.Bottom = 4;
            label.Style.Position.DisplayMode = DisplayMode.Block;
            this.Contents.Add(label);
        }

        private Color GetStockLevelColor(string level)
        {
            return (level ?? "").ToLower() switch
            {
                "in stock" => new Color(34, 139, 34),
                "low stock" => new Color(255, 140, 0),
                "out of stock" => new Color(220, 20, 60),
                _ => StandardColors.Gray
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

        // Built just before layout, so it works when the stars are created in code
        // by another component, as well as from the template
        protected override void OnPreLayout(LayoutContext context)
        {
            base.OnPreLayout(context);

            // The standard PDF fonts have no star characters, so draw the
            // rating as text - or use an icon font such as Font Awesome
            int fullStars = (int)Math.Round(Rating);

            var stars = new Label();
            stars.Text = new string('*', fullStars) + new string('-', Math.Max(0, MaxRating - fullStars));
            stars.Style.Font.FontSize = 14;
            stars.Style.Fill.Color = new Color(218, 165, 32);
            this.Contents.Add(stars);

            var ratingLabel = new Label();
            ratingLabel.Text = $" {Rating:0.0} / {MaxRating}";
            ratingLabel.Style.Font.FontSize = 10;
            ratingLabel.Style.Fill.Color = StandardColors.Gray;
            this.Contents.Add(ratingLabel);
        }
    }
}
```

### 2. Document Controller

**Controllers/CatalogController.cs:**

The controller is created by the application, so it can be given the services it needs. Its outlets are assigned from the components in the template with the matching `id`, and its actions are named in the template.

```csharp
using System;
using Scryber;
using Scryber.Components;
using ProductCatalog.Services;

namespace ProductCatalog.Controllers
{
    public class CatalogController
    {
        private readonly ProductService _productService;

        // Outlets - assigned from the template elements with matching ids
        [PDFOutlet(Required = true)]
        public Label CatalogTitleLabel { get; set; }

        [PDFOutlet(Required = true)]
        public Label GeneratedDateLabel { get; set; }

        [PDFOutlet]
        public Label TotalProductsLabel { get; set; }

        public CatalogController(ProductService productService)
        {
            _productService = productService;
        }

        // Actions - named in the template with on-init, on-loaded and so on
        [PDFAction]
        public void InitCatalog(object sender, InitEventArgs args)
        {
            args.Context.TraceLog.Add(TraceLevel.Message, "Catalog", "Initializing product catalog");

            CatalogTitleLabel.Text = "Product Catalog 2026";
            GeneratedDateLabel.Text = $"Generated: {_productService.CatalogDate:MMMM dd, yyyy}";

            if (TotalProductsLabel != null)
                TotalProductsLabel.Text = $"Total Products: {_productService.GetAllProducts().Count}";
        }

        [PDFAction]
        public void CatalogLaidOut(object sender, LayoutEventArgs args)
        {
            var layout = args.Context.GetLayout<Scryber.PDF.Layout.PDFLayoutDocument>();
            args.Context.TraceLog.Add(TraceLevel.Message, "Catalog",
                $"Catalog generated: {layout.AllPages.Count} pages");
        }
    }
}
```

### 3. Models and Services

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
    }
}
```

**Services/ProductService.cs:**

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using ProductCatalog.Models;

namespace ProductCatalog.Services
{
    /// <summary>
    /// The products and their images. Replace with your own database or API calls.
    /// </summary>
    public class ProductService
    {
        public DateTime CatalogDate { get; } = new DateTime(2026, 3, 15);

        public List<Product> GetAllProducts()
        {
            return new List<Product>
            {
                new Product { Id = 1, Name = "Widget Pro", Description = "Our best selling widget.", Price = 99.99m, StockQuantity = 42, AverageRating = 4.5 },
                new Product { Id = 2, Name = "Gadget Plus", Description = "Twice the gadget.", Price = 149.00m, StockQuantity = 6, AverageRating = 4.0 },
                new Product { Id = 3, Name = "Gizmo Mini", Description = "Small but mighty.", Price = 24.50m, StockQuantity = 0, AverageRating = 3.5 }
            };
        }

        public byte[] GetProductImage(int productId)
        {
            // e.g. SELECT ImageData FROM ProductImages WHERE ProductId = @ProductId
            return File.ReadAllBytes(Path.Combine("Images", "placeholder.png"));
        }
    }
}
```

### 4. Configuration

**appsettings.json:**

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "Source": "http://productcatalog.com/components",
          "Namespace": "ProductCatalog.Components",
          "Assembly": "ProductCatalog"
        }
      ]
    },
    "Fonts": {
      "Register": [
        {
          "Family": "Open Sans",
          "File": "Fonts/OpenSans-Regular.ttf"
        },
        {
          "Family": "Open Sans",
          "File": "Fonts/OpenSans-Bold.ttf"
        }
      ]
    }
  }
}
```

A registered font is used for the weight and style of the font file itself - register a file for each weight and style used, such as regular and bold.

### 5. Template

**Templates/Catalog.html:**

```html
{% raw %}<?xml version='1.0' encoding='utf-8' ?>
<html xmlns='http://www.w3.org/1999/xhtml'
      xmlns:prod='http://productcatalog.com/components'>
    <head>
        <title>Product Catalog</title>
        <style>
            body {
                font-family: 'Open Sans', sans-serif;
                font-size: 11pt;
                padding: 20pt;
            }
            .header {
                display: block;
                font-size: 28pt;
                font-weight: bold;
                color: #1a1a1a;
                margin-bottom: 4pt;
            }
            .subheader {
                display: block;
                font-size: 12pt;
                color: #666666;
                margin-bottom: 20pt;
            }
            footer {
                font-size: 9pt;
                color: #666666;
                padding: 0pt 20pt 10pt 20pt;
            }
        </style>
    </head>
    <body on-init='InitCatalog' on-postlayout='CatalogLaidOut'>

        <main>
            <!-- Outlets are found in the main content - not in a header or footer -->
            <label id='CatalogTitleLabel' class='header'></label>
            <label id='GeneratedDateLabel' class='subheader'></label>
            {{#each model.products}}
                <!-- Custom ProductCard component -->
                <prod:ProductCard product-name='{{this.name}}'
                                  price='{{format(this.price, "C")}}'
                                  description='{{this.description}}'
                                  image-src='{{this.imageSource}}'
                                  rating='{{this.rating}}'
                                  stock-level='{{this.stockLevel}}' />
            {{/each}}

            <label id='TotalProductsLabel' class='subheader'></label>
        </main>

        <footer>
            <span>Page <page-number /> of <page-count /></span>
        </footer>

    </body>
</html>
{% endraw %}
```

Outlets are found in the main content of the template. Components in a header or footer are repeated on every page, and are not assigned to outlets.

### 6. Application

**Program.cs:**

```csharp
using Microsoft.Extensions.Configuration;
using Paperwork;
using Scryber;
using Scryber.Components;
using ProductCatalog.Controllers;
using ProductCatalog.Services;

// 1. Pass the configuration - namespaces and fonts - to the engine once at startup
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

Scryber.ServiceProvider.Init(config);

using var factory = PaperworkFactory.Create().Build();
var productService = new ProductService();

// 2. Parse the template with a controller instance, so it can use the product service
var templatePath = "Templates/Catalog.html";
var controller = new CatalogController(productService);
var settings = Document.CreateParserSettings(templatePath, ParserConformanceMode.Lax, controller);

using var reader = new StreamReader(templatePath);
using var doc = (Document)Document.Parse(templatePath, reader, ParseSourceType.LocalFile, settings.Resolver, settings);

// 3. Load the product images for product:// paths - the requestor
doc.RemoteFileRegistered += (sender, args) =>
{
    var request = args.Request;
    if (!request.FilePath.StartsWith("product://"))
        return;

    try
    {
        // product://12.png -> 12
        var id = int.Parse(System.IO.Path.GetFileNameWithoutExtension(request.FilePath.Substring("product://".Length)));

        using var stream = new MemoryStream(productService.GetProductImage(id));
        request.Callback(request.Owner, request, stream);
    }
    catch (Exception ex)
    {
        request.CompleteRequest(null, false, ex);
    }
};

// 4. The data for the template
var products = productService.GetAllProducts().Select(p => new
{
    name = p.Name,
    price = p.Price,
    description = p.Description,
    imageSource = $"product://{p.Id}.png",
    rating = p.AverageRating,
    stockLevel = p.StockQuantity == 0 ? "Out of Stock" : p.StockQuantity < 10 ? "Low Stock" : "In Stock"
});

// 5. Generate the catalog
await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", new { products })
    .SaveAsync("ProductCatalog.pdf");

Console.WriteLine("Product catalog generated successfully!");
```

## How It Works Together

### 1. Configuration Loading
- `Scryber.ServiceProvider.Init(config)` passes `appsettings.json` to the engine
- Namespace registration: `http://productcatalog.com/components` → `ProductCatalog.Components`
- Fonts registered: Open Sans regular and bold from the `Fonts/` directory

### 2. Template Parsing
- The template is parsed with the application's own `CatalogController` instance in the parser settings
- The parser finds `<prod:ProductCard>` in the `{{#each}}` template
- The namespace resolves to `ProductCatalog.Components.ProductCard`
- Outlets are assigned: `CatalogTitleLabel`, `GeneratedDateLabel`, `TotalProductsLabel`

### 3. Document Lifecycle
- **Init**: `InitCatalog()` sets the title, date and product count
- **DataBind**: the `{{#each}}` creates a `ProductCard` for each product, with its attributes bound from the data
- **DataBound**: each `ProductCard` builds its content
- **PreLayout**: each `RatingStars` builds its stars
- **PostLayout**: `CatalogLaidOut()` logs the page count

### 4. Image Loading
- `ProductCard` creates an image with `product://1.png`
- The `RemoteFileRegistered` handler loads the image from the product service, and passes it back with `request.Callback(...)`
- The `.png` extension means the document's standard PNG image factory decodes it
- See [Request Events and DOM](document-events-and-access) and [Image Factories](image-factories)

### 5. Generation
- The parsed document is passed to the builder with `WithLayout(doc)`, with the products as data
- The builder generates the PDF, with any `WithLogLevel`, auth and file request settings applied

## Result

The generated `ProductCatalog.pdf` contains:
- The title, date and product count set by the controller
- A `ProductCard` for each product, with its image, price, rating, description and stock level
- The Open Sans font throughout
- Page numbers in the footer

## Extension Points Summary

| Extension | File | Purpose |
|-----------|------|---------|
| Custom Components | `ProductCard.cs`, `RatingStars.cs` | Reusable product display widgets |
| Document Controller | `CatalogController.cs` | Title, date and count, lifecycle logging |
| Remote file requests | `Program.cs` | Load product images from the application |
| Font Registration | `appsettings.json` | Custom font (Open Sans) |
| Namespace Registration | `appsettings.json` | Component discovery |
| Document builder | `Program.cs` | Data and generation |

## Key Benefits

1. **Separation of Concerns**: Presentation (template), logic (controller), data (service)
2. **Reusability**: `ProductCard` and `RatingStars` can be used in multiple templates
3. **Testability**: The controller, components and service can be unit tested
4. **Maintainability**: Change the data source without touching the template
5. **Extensibility**: Add new components and resource sources without core changes

## Related Documentation

- [Custom Components](custom-components) - Creating parseable components
- [Document Controllers](document-controllers) - Controller architecture
- [Request Events and DOM](document-events-and-access) - Loading content from your own sources
- [Image Factories](image-factories) - Custom image types
- [Font Configuration](font-configuration) - Font registration
- [Namespace Registration](namespace-registration) - Component discovery
- [The Engine Document](engine-document) - Parsing and configuring a document for the builder
