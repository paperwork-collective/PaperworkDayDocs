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

Image factories decode image content into the image data that is written to the PDF. Every document has a list of image factories, and each one handles a *type* of image, matched on the image path.

The standard factories handle paths that end in `.png`, `.jpg`, `.jpeg`, `.gif`, `.tif`, `.tiff`, `.webp` and `.svg`, along with `data:` URLs. A custom image factory is needed when images in a template use a path that does not end with one of these, such as `db://products/12345`.

---

## Requestors and handlers

Loading an image from a custom location takes two parts:

- A **requestor** for the custom *path*. It loads the content - from a database, cloud storage, a CMS or anywhere else - and passes it back to the document. See [Request Events and DOM](document-events-and-access).
- A **handler** for the image *type*. This is the image factory: it is matched on the path, and decodes the content the requestor passes back.

```
┌──────────────────────────────────────────────────────┐
│ PDF Template                                          │
│  <img src='db://products/12345' />                   │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Image factory (the handler) matched on the path      │
│  Match: ^db://   →  raises a request for the content │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ RemoteFileRegistered (the requestor)                  │
│  Loads the content, and passes the stream back       │
│  request.Callback(request.Owner, request, stream)    │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Image factory decodes the stream                      │
│  DoDecodeImageData(stream, ...)  →  ImageData        │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ The image is written to the PDF                       │
└──────────────────────────────────────────────────────┘
```

{: .note}
> If the custom path ends with a standard extension, e.g. `db://products/12345.png`, the standard factory for that type is the handler, and only the requestor is needed.

---

## Creating an Image Factory

An image factory inherits from `ImageFactoryBase` (in the `Scryber.Imaging` namespace). The constructor sets the pattern it matches, the type of image it produces, its name, and whether the decoded image can be cached and re-used for the same path.

```csharp
public ImageFactoryBase(Regex match, MimeType type, string name, bool shouldCache)
```

The factory overrides `DoDecodeImageData` to turn the content passed back by the requestor into image data.

```csharp
protected virtual ImageData DoDecodeImageData(Stream stream, IDocument document, IComponent owner, string path)
```

### Example: Database image factory

The images in the database are stored as PNG, so the factory reads the stream and decodes it with the document's own PNG image factory.

```csharp
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Scryber;
using Scryber.Components;
using Scryber.Drawing;
using Scryber.Imaging;

namespace MyCompany.Imaging
{
    /// <summary>
    /// The handler for images with a db:// path, which are stored as PNG.
    /// </summary>
    public class DatabaseImageFactory : ImageFactoryBase
    {
        public DatabaseImageFactory()
            : base(new Regex("^db://"), MimeType.PngImage, "Database", shouldCache: true)
        {
        }

        protected override ImageData DoDecodeImageData(Stream stream, IDocument document, IComponent owner, string path)
        {
            using var ms = new MemoryStream();
            stream.CopyTo(ms);

            // Decode with the document's own image factory for the type
            var png = ((Document)document).ImageFactories
                .First(f => f != this && f.ImageType.Equals(MimeType.PngImage));

            return png.LoadImageData(document, owner, ms.ToArray(), MimeType.PngImage);
        }
    }
}
```

The standard image types are `MimeType.PngImage`, `MimeType.JpegImage`, `MimeType.GifImage` and `MimeType.TiffImage`. A factory for a new image format would decode the stream itself.

### The requestor

The requestor loads the content for the path, and passes it back to the request. The document hands the stream to the matching image factory.

```csharp
using Microsoft.Data.SqlClient;

public class DatabaseImageRequestor
{
    private readonly string _connectionString;

    public DatabaseImageRequestor(string connectionString)
    {
        _connectionString = connectionString;
    }

    public void Attach(Document doc)
    {
        doc.RemoteFileRegistered += (sender, args) =>
        {
            var request = args.Request;
            if (!request.FilePath.StartsWith("db://"))
                return; // not ours

            try
            {
                using var stream = new MemoryStream(LoadImage(request.FilePath));
                request.Callback(request.Owner, request, stream);
            }
            catch (Exception ex)
            {
                request.CompleteRequest(null, false, ex);
            }
        };
    }

    private byte[] LoadImage(string path)
    {
        // Parse: db://tablename/id
        var uri = new Uri(path);
        string tableName = uri.Host;
        string id = uri.AbsolutePath.Trim('/');

        using var connection = new SqlConnection(_connectionString);
        connection.Open();

        using var command = new SqlCommand($"SELECT [ImageData] FROM [{tableName}] WHERE Id = @Id", connection);
        command.Parameters.AddWithValue("@Id", id);

        var result = command.ExecuteScalar();

        if (result == null || result is DBNull)
            throw new FileNotFoundException($"Image not found: {path}");

        return (byte[])result;
    }
}
```

### Register both with the document

The image factory is added to the document's image factories, and the requestor to the document's events. The document is then generated with the builder. See [The Engine Document](engine-document).

```csharp
using Scryber.Components;
using MyCompany.Imaging;

using var doc = Document.ParseDocument("ProductCatalog.html");

// The handler - checked in order, so insert at the start
doc.ImageFactories.Insert(0, new DatabaseImageFactory());

// The requestor
new DatabaseImageRequestor(connectionString).Attach(doc);

await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", catalog)
    .SaveAsync("ProductCatalog.pdf");
```

### Use in Templates

```html
<html xmlns='http://www.w3.org/1999/xhtml'>
    <body>
        <main>
            {{#each model.products}}
            <div class='product'>
                <span>{{this.name}}</span>

                <!-- Load the product image from the database -->
                <img src='db://Products/{{this.id}}' width='200' />
            </div>
            {{/each}}
        </main>
    </body>
</html>
```

---

## Factory Ordering

The document checks its image factories in order, and uses the first one whose pattern matches the path. Insert custom factories at the start of the list, so they are checked before the standard factories.

```csharp
doc.ImageFactories.Insert(0, new DatabaseImageFactory());
```

---

## Best Practices

### Handler Design
- **One type per factory**: each factory handles one kind of path and image type
- **Decode with the document**: for standard formats, use the document's own image factories to decode the content
- **Cache when you can**: pass `shouldCache: true` so the decoded image is re-used for the same path

### Requestor Design
- Only handle the paths you recognise, and leave the others to load as normal
- Complete the request as failed, with the exception, when content cannot be loaded
- Dispose connections and streams properly
- Requestors and factories may be used from multiple threads

### Pattern Design
- Use specific patterns: `^myprotocol://` not `.*`
- Avoid overlapping patterns between factories
- Use a standard extension in the path where you can, so no custom factory is needed

---

## Troubleshooting

### Image not shown
- Turn on the log (`doc.AppendTraceLog = true`) to see which factory matched the path, and any errors
- Check the factory's pattern matches the path exactly, and that it was inserted before the standard factories
- Check the requestor handles the path and calls `request.Callback`

### "Could not load image data"
- Verify the path or ID is correct
- Check database or API connectivity
- Ensure the image content is the type the factory decodes

---

## Related Documentation

- [Request Events and DOM](document-events-and-access) - Requestors for stylesheets, fonts, images and iframe content
- [The Engine Document](engine-document) - Configuring a document and generating it with the builder
- [Font Configuration](font-configuration) - Custom font loading
- [Best Practices](best-practices) - Factory design patterns
