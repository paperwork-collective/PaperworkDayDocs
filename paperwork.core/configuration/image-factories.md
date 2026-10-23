---
layout: default
title: Image Factories
parent: Configuration & Extension
parent_url: /paperwork.core/configuration/
has_children: false
has_toc: false
nav_order: 8
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Image Factories

Image factories provide **custom image loading** from sources beyond the file system and HTTP URLs. Use image factories to load images from:
- Databases (binary blobs)
- Cloud storage (S3, Azure Blob, etc.)
- Content management systems
- Custom protocols

Images in `data:` URLs (PNG, JPEG, GIF, WebP and SVG) are supported without a custom factory.

## Architecture

```
┌──────────────────────────────────────────────────────┐
│ PDF Template                                          │
│  <img src='db://Products/12345' />                   │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Document image factories                              │
│  Configured (appsettings) and per-document factories │
│  are checked first, then the standard factories      │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Factory Matching (Regex)                              │
│  The first factory whose pattern matches the source  │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Image Loading                                         │
│  factory.LoadImageData(document, owner, "db://...")  │
│  Returns: ImageData                                   │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Image Rendering                                       │
│  The image data is written to the PDF                │
└──────────────────────────────────────────────────────┘
```

## IPDFImageDataFactory Interface

A custom factory implements `IPDFImageDataFactory` (in the `Scryber` namespace). The pattern it matches is set when it is registered, not by the factory itself.

```csharp
public interface IPDFImageDataFactory
{
    // True if the loaded image data can be cached and re-used for the same source
    bool ShouldCache { get; }

    // Load the image for a source path in the template, e.g. 'db://Products/12345'
    ImageData LoadImageData(IDocument document, IComponent owner, string path);

    // Load the image from binary data of a known type
    ImageData LoadImageData(IDocument document, IComponent owner, byte[] data, MimeType type);
}
```

## Creating a Custom Image Factory

Most custom factories load the binary content of an image (a PNG or JPEG file) from somewhere. The document already has factories that decode each image type, so the custom factory can load the bytes and hand them to the document's own image factory for that type.

### 1. A base class for binary images

```csharp
using System;
using System.Linq;
using Scryber;
using Scryber.Components;
using Scryber.Drawing;

namespace MyCompany.Imaging
{
    /// <summary>
    /// Loads the bytes of an image, and decodes them with the document's own image factories.
    /// </summary>
    public abstract class BinaryImageFactory : IPDFImageDataFactory
    {
        public virtual bool ShouldCache => true;

        public ImageData LoadImageData(IDocument document, IComponent owner, string path)
        {
            byte[] data = LoadImageBytes(path, out MimeType type);
            return LoadImageData(document, owner, data, type);
        }

        public ImageData LoadImageData(IDocument document, IComponent owner, byte[] data, MimeType type)
        {
            // Find the document's image factory for this type of image, e.g. image/png
            var factory = ((Document)document).ImageFactories
                .FirstOrDefault(f => f.ImageType.Equals(type))
                ?? throw new NotSupportedException($"No image factory is available for the type {type}");

            return factory.LoadImageData(document, owner, data, type);
        }

        /// <summary>
        /// Inheritors load the binary content of the image for the path, and return its type.
        /// </summary>
        protected abstract byte[] LoadImageBytes(string path, out MimeType type);
    }
}
```

The standard image types are `MimeType.PngImage`, `MimeType.JpegImage`, `MimeType.GifImage` and `MimeType.TiffImage`.

### 2. Implement the factory

**Example: Database image factory**

```csharp
using System;
using System.IO;
using Microsoft.Data.SqlClient;
using Scryber;

namespace MyCompany.Imaging
{
    public class DatabaseImageFactory : BinaryImageFactory
    {
        private readonly string _connectionString;

        // Used when the factory is registered in configuration
        public DatabaseImageFactory()
            : this(Environment.GetEnvironmentVariable("PRODUCT_DB"))
        {
        }

        public DatabaseImageFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override byte[] LoadImageBytes(string path, out MimeType type)
        {
            // Parse source: db://tablename/id or db://tablename/columnname/id
            var uri = new Uri(path);
            var parts = (uri.Host + uri.AbsolutePath).Trim('/').Split('/');

            string tableName;
            string columnName = "ImageData";  // Default column
            string id;

            if (parts.Length == 2)
            {
                tableName = parts[0];
                id = parts[1];
            }
            else if (parts.Length == 3)
            {
                tableName = parts[0];
                columnName = parts[1];
                id = parts[2];
            }
            else
            {
                throw new ArgumentException($"Invalid database image path: {path}");
            }

            type = MimeType.PngImage; // The images in this database are all PNG
            return LoadFromDatabase(tableName, columnName, id);
        }

        private byte[] LoadFromDatabase(string tableName, string columnName, string id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var query = $"SELECT [{columnName}] FROM [{tableName}] WHERE Id = @Id";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);

                    var result = command.ExecuteScalar();

                    if (result == null || result is DBNull)
                        throw new FileNotFoundException($"Image not found: {tableName}/{id}");

                    return (byte[])result;
                }
            }
        }
    }
}
```

### 3. Register the factory

In the `Imaging` section of the configuration, give the factory a name, a regular expression for the sources it loads, and its type and assembly. A configured factory is created with its parameterless constructor.

**appsettings.json:**

```json
{
  "Scryber": {
    "Imaging": {
      "Factories": [
        {
          "Name": "Database",
          "Match": "^db://",
          "FactoryType": "MyCompany.Imaging.DatabaseImageFactory",
          "FactoryAssembly": "MyCompany.Imaging"
        }
      ]
    }
  }
}
```

The configuration must be passed to the engine at startup with `Scryber.ServiceProvider.Init(configuration)`. See [Configuration Structure](configuration-structure).

### 4. Use in Templates

```xml
<html xmlns='http://www.w3.org/1999/xhtml'>
    <body>
        <main>

            <!-- Load from database: Products table, row 12345 -->
            <img src='db://Products/12345' />

            <!-- Specify column: Products table, Thumbnail column, row 67890 -->
            <img src='db://Products/Thumbnail/67890' />

        </main>
    </body>
</html>
```

## Factory Examples

### Azure Blob Storage Factory

```csharp
using System;
using System.IO;
using Azure.Storage.Blobs;
using Scryber;

namespace MyCompany.Imaging
{
    public class AzureBlobImageFactory : BinaryImageFactory
    {
        private readonly BlobServiceClient _client;

        // Pattern: azblob://container/blobname
        public AzureBlobImageFactory(string connectionString)
        {
            _client = new BlobServiceClient(connectionString);
        }

        protected override byte[] LoadImageBytes(string path, out MimeType type)
        {
            // Parse: azblob://container/blob/path
            var uri = new Uri(path);
            var containerName = uri.Host;
            var blobName = uri.AbsolutePath.TrimStart('/');

            // The type from the blob name
            type = blobName.EndsWith(".png", StringComparison.OrdinalIgnoreCase)
                ? MimeType.PngImage
                : MimeType.JpegImage;

            // Download blob
            var container = _client.GetBlobContainerClient(containerName);
            var blobClient = container.GetBlobClient(blobName);

            using (var memoryStream = new MemoryStream())
            {
                blobClient.DownloadTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
```

### CMS Image Factory

```csharp
using System.Net.Http;
using Scryber;

namespace MyCompany.Imaging
{
    public class CMSImageFactory : BinaryImageFactory
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private readonly string _cmsApiUrl;
        private readonly string _apiKey;

        // Pattern: cms://12345 or cms://images/12345
        public CMSImageFactory(string cmsApiUrl, string apiKey)
        {
            _cmsApiUrl = cmsApiUrl;
            _apiKey = apiKey;
        }

        protected override byte[] LoadImageBytes(string path, out MimeType type)
        {
            // Parse: cms://12345 or cms://images/12345
            var assetId = path.Substring("cms://".Length);

            // Build API request
            var request = new HttpRequestMessage(HttpMethod.Get, $"{_cmsApiUrl}/assets/{assetId}");
            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

            // Download image
            var response = _httpClient.Send(request);
            response.EnsureSuccessStatusCode();

            // Use the content type returned by the CMS
            type = new MimeType(response.Content.Headers.ContentType?.MediaType ?? "image/png");

            return response.Content.ReadAsByteArrayAsync().Result;
        }
    }
}
```

## Configuration

### Factory Registration

Several factories can be registered. They are checked in order, before the standard factories.

**appsettings.json:**

```json
{
  "Scryber": {
    "Imaging": {
      "Factories": [
        {
          "Name": "Database",
          "Match": "^db://",
          "FactoryType": "MyCompany.Imaging.DatabaseImageFactory",
          "FactoryAssembly": "MyCompany.Imaging"
        },
        {
          "Name": "AzureBlob",
          "Match": "^azblob://",
          "FactoryType": "MyCompany.Imaging.AzureBlobImageFactory",
          "FactoryAssembly": "MyCompany.Imaging"
        }
      ]
    }
  }
}
```

### Programmatic Registration

Factories can also be added to the engine configuration in code at startup. They apply to every document created afterwards.

```csharp
using Scryber;
using Scryber.Options;

var config = Scryber.ServiceProvider.GetService<IScryberConfigurationService>();

config.ImagingOptions.Factories ??= new List<ImageDataFactoryOption>();
config.ImagingOptions.Factories.Add(
    new ImageDataFactoryOption("Database", "^db://", typeof(DatabaseImageFactory)));
```

### Per-document Registration

To use a factory that needs constructor arguments, or for a single document only, add it to the document's own image factories, and generate the document with the builder. See [The Engine Document](engine-document).

```csharp
using System.Text.RegularExpressions;
using Scryber.Components;
using Scryber.Imaging;

using var doc = Document.ParseDocument("ProductCatalog.html");

// Checked in order, so insert at the start
doc.ImageFactories.Insert(0, new ImageFactoryCustom(
    new Regex("^cms://"), "CMS", shouldCache: true,
    new CMSImageFactory(cmsApiUrl, apiKey)));

await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", catalog)
    .SaveAsync("ProductCatalog.pdf");
```

## Factory Ordering

**Custom factories are checked BEFORE standard factories:**

```csharp
// Scryber.Imaging/Options/_Extensions.cs (simplified)
public static ImageFactoryList GetConfiguredFactories(this ImagingOptions options)
{
    var list = new ImageFactoryList();

    // 1. Custom factories from configuration (checked first)
    foreach (var configFactory in options.Factories)
    {
        var instance = configFactory.GetInstance() as IPDFImageDataFactory;
        list.Add(new ImageFactoryCustom(new Regex(configFactory.Match),
            configFactory.Name, instance.ShouldCache, instance));
    }

    // 2. Standard factories (png, jpeg, gif, tiff, webp and data urls)
    list.AddRange(GetStandardFactories());

    return list;
}
```

This allows custom factories to **override** standard behavior for specific patterns.

## Complete Example

### Factory Implementation

```csharp
using System;
using System.IO;
using Microsoft.Data.SqlClient;
using Scryber;

namespace ProductCatalog.Imaging
{
    public class ProductImageFactory : BinaryImageFactory
    {
        private readonly string _connectionString;

        public ProductImageFactory()
            : this(Environment.GetEnvironmentVariable("PRODUCT_CATALOG_DB"))
        {
        }

        public ProductImageFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override byte[] LoadImageBytes(string path, out MimeType type)
        {
            // Parse: product://SKU-12345
            var productSku = path.Substring("product://".Length);

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var query = @"
                    SELECT ImageData
                    FROM ProductImages
                    WHERE ProductSKU = @SKU AND IsPrimary = 1";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@SKU", productSku);

                    var result = command.ExecuteScalar();

                    if (result == null || result is DBNull)
                        throw new FileNotFoundException($"Product image not found: {productSku}");

                    type = MimeType.JpegImage;
                    return (byte[])result;
                }
            }
        }
    }
}
```

### Configuration

```json
{
  "Scryber": {
    "Imaging": {
      "Factories": [
        {
          "Name": "ProductImages",
          "Match": "^product://",
          "FactoryType": "ProductCatalog.Imaging.ProductImageFactory",
          "FactoryAssembly": "ProductCatalog"
        }
      ]
    }
  }
}
```

### Template

```xml
<html xmlns='http://www.w3.org/1999/xhtml'>
    <body>
        <main>

            <div>
                <span>Product: Widget Pro</span>

                <!-- Load product image from database -->
                <img src='product://WIDGET-PRO-001'
                     width='200'
                     height='200' />

                <span>Price: $99.99</span>
            </div>

            <!-- Load another product -->
            <div>
                <span>Product: Gadget Plus</span>
                <img src='product://GADGET-PLUS-002'
                     width='200'
                     height='200' />
            </div>

        </main>
    </body>
</html>
```

### Usage

```csharp
using Microsoft.Extensions.Configuration;
using Paperwork;

// Pass the configuration, with the image factory, to the engine once at startup
var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

Scryber.ServiceProvider.Init(config);

// Generate documents
using var factory = PaperworkFactory.Create().Build();

await factory.NewDocument()
    .WithLayoutFile("ProductCatalog.html")
    .SaveAsync("ProductCatalog.pdf");
```

## Best Practices

### Factory Design
- **Single Responsibility**: Each factory handles one type of source
- **Decode with the document**: Load the bytes, and use the document's image factories to decode them
- **Error Handling**: Throw descriptive exceptions for missing images
- **Resource Management**: Dispose connections, streams properly
- **Thread Safety**: Factories may be called from multiple threads

### Pattern Design
- Use specific patterns: `^myprotocol://` not `.*`
- Avoid overlapping patterns between factories
- Document the pattern format alongside the factory
- Test patterns thoroughly

### Performance
- Return `true` from `ShouldCache` so loaded images are re-used for the same source
- Use connection pooling for database factories
- Monitor factory performance in production

### Configuration
- Externalize connection strings and API keys
- Register factories in order of specificity (most specific first)
- Use per-document registration for factories that need constructor arguments
- Document required configuration

## Troubleshooting

### Image not shown
- Check the factory's `Match` pattern matches the source exactly
- Verify the configuration is passed to `Scryber.ServiceProvider.Init` at startup
- Check the factory assembly is loaded, and the type has a parameterless constructor
- Turn on the log to see which factory was used, and any errors

### "Could not load image data"
- Verify source path/ID is correct
- Check database/API connectivity
- Ensure image data exists, and the returned type matches the data
- Add logging to factory implementation

### Performance issues
- Return `true` from `ShouldCache`
- Use connection pooling
- Monitor database query performance
- Consider pre-loading images

## Related Documentation

- [Font Configuration](font-configuration) - Custom font loading
- [Custom Components](custom-components) - Using images in custom components
- [Integration Example](integration-example) - Complete example with image factories
- [Best Practices](best-practices) - Factory design patterns
