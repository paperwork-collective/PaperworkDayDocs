---
layout: default
title: Image Factories
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 6
---

# Image Factories

Image factories provide **custom image loading** from sources beyond the file system and HTTP URLs. Use image factories to load images from:
- Databases (binary blobs)
- Cloud storage (S3, Azure Blob, etc.)
- Content management systems
- In-memory caches
- Custom protocols

## Architecture

```
┌──────────────────────────────────────────────────────┐
│ PDF Template                                          │
│  <pdf:Image src='db://product/12345' />             │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Image Factory Registration (scrybersettings.json)    │
│  Factories: [ DatabaseImageFactory, ... ]           │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Factory Matching (Regex)                              │
│  Factory.ShouldMatch("db://...") → true             │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Image Loading                                         │
│  Factory.LoadImageData("db://...", document)        │
│  Returns: byte[] of image data                       │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Image Rendering                                       │
│  Scryber renders loaded image data to PDF           │
└──────────────────────────────────────────────────────┘
```

## IPDFImageDataFactory Interface

```csharp
public interface IPDFImageDataFactory
{
    // Regex pattern to match image sources this factory handles
    string FactoryKey { get; }
    
    // Test if this factory should handle the given source
    bool ShouldMatch(string source);
    
    // Load image data as byte array
    byte[] LoadImageData(IDocument document, IComponent component, string source);
}
```

## Creating a Custom Image Factory

### 1. Implement IPDFImageDataFactory

**Example: Database image factory**

```csharp
using System;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using Scryber;
using Scryber.Components;
using Scryber.Imaging;

namespace MyCompany.Imaging
{
    public class DatabaseImageFactory : IPDFImageDataFactory
    {
        private readonly string _connectionString;
        private readonly Regex _pattern;
        
        // Pattern: db://tablename/id or db://tablename/columnname/id
        public string FactoryKey => @"^db://[\w]+/[\w]+(/[\w]+)?$";
        
        public DatabaseImageFactory(string connectionString)
        {
            _connectionString = connectionString;
            _pattern = new Regex(FactoryKey, RegexOptions.IgnoreCase);
        }
        
        public bool ShouldMatch(string source)
        {
            if (string.IsNullOrEmpty(source))
                return false;
                
            return _pattern.IsMatch(source);
        }
        
        public byte[] LoadImageData(IDocument document, IComponent component, string source)
        {
            // Parse source: db://tablename/id or db://tablename/columnname/id
            var uri = new Uri(source);
            var parts = uri.AbsolutePath.Trim('/').Split('/');
            
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
                throw new ArgumentException($"Invalid database image path: {source}");
            }
            
            // Load from database
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

### 2. Register Factory

**scrybersettings.json:**

```json
{
  "Scryber": {
    "Imaging": {
      "Factories": [
        {
          "Key": "database",
          "Type": "MyCompany.Imaging.DatabaseImageFactory, MyCompany.Imaging",
          "Config": {
            "ConnectionString": "Server=localhost;Database=ProductCatalog;..."
          }
        }
      ]
    }
  }
}
```

### 3. Use in Templates

```xml
<pdf:Document xmlns:pdf='...'>
    <Pages>
        <pdf:Page>
            <Content>
                
                <!-- Load from database: Products table, row 12345 -->
                <pdf:Image src='db://Products/12345' />
                
                <!-- Specify column: Products table, Thumbnail column, row 67890 -->
                <pdf:Image src='db://Products/Thumbnail/67890' />
                
            </Content>
        </pdf:Page>
    </Pages>
</pdf:Document>
```

## Factory Examples

### Azure Blob Storage Factory

```csharp
using Azure.Storage.Blobs;
using System.Text.RegularExpressions;
using Scryber.Imaging;

namespace MyCompany.Imaging
{
    public class AzureBlobImageFactory : IPDFImageDataFactory
    {
        private readonly BlobServiceClient _client;
        private readonly Regex _pattern;
        
        // Pattern: azblob://container/blobname
        public string FactoryKey => @"^azblob://[\w-]+/[\w/.]+$";
        
        public AzureBlobImageFactory(string connectionString)
        {
            _client = new BlobServiceClient(connectionString);
            _pattern = new Regex(FactoryKey, RegexOptions.IgnoreCase);
        }
        
        public bool ShouldMatch(string source)
        {
            return !string.IsNullOrEmpty(source) && _pattern.IsMatch(source);
        }
        
        public byte[] LoadImageData(IDocument document, IComponent component, string source)
        {
            // Parse: azblob://container/blob/path
            var uri = new Uri(source);
            var containerName = uri.Host;
            var blobName = uri.AbsolutePath.TrimStart('/');
            
            // Get container
            var container = _client.GetBlobContainerClient(containerName);
            
            // Download blob
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

### Base64 Embedded Image Factory

```csharp
using System;
using System.Text.RegularExpressions;
using Scryber.Imaging;

namespace MyCompany.Imaging
{
    public class Base64ImageFactory : IPDFImageDataFactory
    {
        private readonly Regex _pattern;
        
        // Pattern: data:image/png;base64,iVBORw0KGgo...
        public string FactoryKey => @"^data:image/[\w]+;base64,";
        
        public Base64ImageFactory()
        {
            _pattern = new Regex(FactoryKey, RegexOptions.IgnoreCase);
        }
        
        public bool ShouldMatch(string source)
        {
            return !string.IsNullOrEmpty(source) && _pattern.IsMatch(source);
        }
        
        public byte[] LoadImageData(IDocument document, IComponent component, string source)
        {
            // Extract base64 content after "base64,"
            var index = source.IndexOf("base64,") + 7;
            var base64 = source.Substring(index);
            
            return Convert.FromBase64String(base64);
        }
    }
}
```

### CMS Image Factory

```csharp
using System.Net.Http;
using System.Text.RegularExpressions;
using Scryber.Imaging;

namespace MyCompany.Imaging
{
    public class CMSImageFactory : IPDFImageDataFactory
    {
        private readonly HttpClient _httpClient;
        private readonly string _cmsApiUrl;
        private readonly string _apiKey;
        private readonly Regex _pattern;
        
        // Pattern: cms://12345 or cms://images/12345
        public string FactoryKey => @"^cms://([\w/]+)$";
        
        public CMSImageFactory(string cmsApiUrl, string apiKey)
        {
            _cmsApiUrl = cmsApiUrl;
            _apiKey = apiKey;
            _httpClient = new HttpClient();
            _pattern = new Regex(FactoryKey, RegexOptions.IgnoreCase);
        }
        
        public bool ShouldMatch(string source)
        {
            return !string.IsNullOrEmpty(source) && _pattern.IsMatch(source);
        }
        
        public byte[] LoadImageData(IDocument document, IComponent component, string source)
        {
            // Parse: cms://12345 or cms://images/12345
            var assetId = source.Substring("cms://".Length);
            
            // Build API request
            var requestUrl = $"{_cmsApiUrl}/assets/{assetId}";
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
            
            // Download image
            var response = _httpClient.GetAsync(requestUrl).Result;
            response.EnsureSuccessStatusCode();
            
            return response.Content.ReadAsByteArrayAsync().Result;
        }
    }
}
```

### Cached Image Factory

Wrap another factory with caching:

```csharp
using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using Scryber.Imaging;

namespace MyCompany.Imaging
{
    public class CachedImageFactory : IPDFImageDataFactory
    {
        private readonly IPDFImageDataFactory _innerFactory;
        private readonly ConcurrentDictionary<string, byte[]> _cache;
        private readonly int _maxCacheSize;
        
        public string FactoryKey => _innerFactory.FactoryKey;
        
        public CachedImageFactory(IPDFImageDataFactory innerFactory, int maxCacheSize = 100)
        {
            _innerFactory = innerFactory;
            _cache = new ConcurrentDictionary<string, byte[]>();
            _maxCacheSize = maxCacheSize;
        }
        
        public bool ShouldMatch(string source)
        {
            return _innerFactory.ShouldMatch(source);
        }
        
        public byte[] LoadImageData(IDocument document, IComponent component, string source)
        {
            // Check cache
            var cacheKey = GetCacheKey(source);
            if (_cache.TryGetValue(cacheKey, out byte[] cached))
            {
                return cached;
            }
            
            // Load from inner factory
            var data = _innerFactory.LoadImageData(document, component, source);
            
            // Cache result (with size limit)
            if (_cache.Count < _maxCacheSize)
            {
                _cache.TryAdd(cacheKey, data);
            }
            
            return data;
        }
        
        private string GetCacheKey(string source)
        {
            using (var sha256 = SHA256.Create())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(source));
                return Convert.ToBase64String(hash);
            }
        }
    }
}
```

## Configuration

### Factory Registration

**scrybersettings.json:**

```json
{
  "Scryber": {
    "Imaging": {
      "Factories": [
        {
          "Key": "database",
          "Type": "MyCompany.Imaging.DatabaseImageFactory, MyCompany.Imaging",
          "Config": {
            "ConnectionString": "Server=localhost;Database=MyDB;..."
          }
        },
        {
          "Key": "azblob",
          "Type": "MyCompany.Imaging.AzureBlobImageFactory, MyCompany.Imaging",
          "Config": {
            "ConnectionString": "DefaultEndpointsProtocol=https;..."
          }
        },
        {
          "Key": "base64",
          "Type": "MyCompany.Imaging.Base64ImageFactory, MyCompany.Imaging"
        }
      ]
    }
  }
}
```

### Programmatic Registration

```csharp
using Microsoft.Extensions.DependencyInjection;
using Scryber;
using Scryber.Imaging;

var services = new ServiceCollection();

// Add Scryber with custom image factory
services.AddScryber(config =>
{
    config.ImagingOptions.Register.Add(new DatabaseImageFactory(connectionString));
    config.ImagingOptions.Register.Add(new AzureBlobImageFactory(azureConnectionString));
    config.ImagingOptions.Register.Add(new Base64ImageFactory());
});

var provider = services.BuildServiceProvider();
```

## Factory Ordering

**Custom factories are checked BEFORE standard factories:**

```csharp
// From Scryber.Extensions/ImageOptionExtensions.cs
public static IEnumerable<IPDFImageDataFactory> GetConfiguredFactories(
    this ImagingOptions options)
{
    List<IPDFImageDataFactory> all = new List<IPDFImageDataFactory>();

    // 1. Custom factories from configuration (checked first)
    if (null != options.Register)
    {
        foreach (var one in options.Register)
            all.Add(one);
    }

    // 2. Standard factories (file system, HTTP, etc.)
    var standard = GetStandardImageFactories();
    all.AddRange(standard);

    return all;
}
```

This allows custom factories to **override** standard behavior for specific patterns.

## Complete Example

### Factory Implementation

```csharp
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using Scryber;
using Scryber.Components;
using Scryber.Imaging;

namespace ProductCatalog.Imaging
{
    public class ProductImageFactory : IPDFImageDataFactory
    {
        private readonly string _connectionString;
        private readonly Regex _pattern;
        
        public string FactoryKey => @"^product://[\w-]+$";
        
        public ProductImageFactory(string connectionString)
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
            // Parse: product://SKU-12345
            var productSku = source.Substring("product://".Length);
            
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
                    
                    if (result == null)
                        throw new FileNotFoundException($"Product image not found: {productSku}");
                    
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
  "ConnectionStrings": {
    "ProductCatalog": "Server=localhost;Database=ProductCatalog;Integrated Security=true;"
  },
  "Scryber": {
    "Imaging": {
      "Factories": [
        {
          "Key": "product-images",
          "Type": "ProductCatalog.Imaging.ProductImageFactory, ProductCatalog",
          "Config": {
            "ConnectionString": "Server=localhost;Database=ProductCatalog;..."
          }
        }
      ]
    }
  }
}
```

### Template

```xml
<?xml version='1.0' encoding='utf-8' ?>
<pdf:Document xmlns:pdf='...'>
    
    <Pages>
        <pdf:Page>
            <Content>
                
                <pdf:Div>
                    <pdf:Label text='Product: Widget Pro' />
                    
                    <!-- Load product image from database -->
                    <pdf:Image src='product://WIDGET-PRO-001' 
                              width='200' 
                              height='200' />
                    
                    <pdf:Label text='Price: $99.99' />
                </pdf:Div>
                
                <!-- Load another product -->
                <pdf:Div>
                    <pdf:Label text='Product: Gadget Plus' />
                    <pdf:Image src='product://GADGET-PLUS-002' 
                              width='200' 
                              height='200' />
                </pdf:Div>
                
            </Content>
        </pdf:Page>
    </Pages>
    
</pdf:Document>
```

### Usage

```csharp
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Scryber;
using Scryber.Components;
using ProductCatalog.Imaging;

// Build configuration
var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

// Setup dependency injection
var services = new ServiceCollection();

// Add Scryber with custom factory
services.AddScryber(options =>
{
    var connectionString = config.GetConnectionString("ProductCatalog");
    options.ImagingOptions.Register.Add(new ProductImageFactory(connectionString));
});

var provider = services.BuildServiceProvider();

// Generate document
using (var reader = new StreamReader("ProductCatalog.pdfx"))
{
    var doc = Document.ParseDocument(reader, ParseSourceType.DynamicContent);
    doc.ProcessDocument("ProductCatalog.pdf");
}
```

## Best Practices

### Factory Design
- **Single Responsibility**: Each factory handles one type of source
- **Fast Pattern Matching**: Use compiled regex for `ShouldMatch`
- **Error Handling**: Throw descriptive exceptions for missing images
- **Resource Management**: Dispose connections, streams properly
- **Thread Safety**: Factories may be called from multiple threads

### Pattern Design
- Use specific patterns: `^myprotocol://` not `.*`
- Avoid overlapping patterns between factories
- Document pattern format in FactoryKey property
- Test patterns thoroughly

### Performance
- Cache loaded images when appropriate
- Use connection pooling for database factories
- Async operations where possible (though interface is synchronous)
- Monitor factory performance in production

### Configuration
- Externalize connection strings and API keys
- Use dependency injection for testability
- Register factories in order of specificity (most specific first)
- Document required configuration

## Troubleshooting

### "No factory matched source"
- Check factory pattern matches source exactly
- Verify factory is registered in configuration
- Test pattern with regex tester
- Check factory assembly is loaded

### "Could not load image data"
- Verify source path/ID is correct
- Check database/API connectivity
- Ensure image data exists
- Add logging to factory implementation

### Factory not called
- Verify `ShouldMatch` returns true for source
- Check factory is registered before standard factories
- Ensure pattern regex is correct
- Check for exceptions in `ShouldMatch`

### Performance issues
- Add caching layer
- Use connection pooling
- Monitor database query performance
- Consider pre-loading images

## Related Documentation

- [Font Configuration](font-configuration) - Custom font loading
- [Custom Components](custom-components) - Using images in custom components
- [Integration Example](integration-example) - Complete example with image factories
- [Best Practices](best-practices) - Factory design patterns
