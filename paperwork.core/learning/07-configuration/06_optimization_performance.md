---
layout: default
title: Optimization & Performance
nav_order: 6
parent: Document Configuration
parent_url: /paperwork.core/learning/07-configuration/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Optimization & Performance

Keep file sizes small and generation fast, and scale document generation in production.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Control output compression
- Choose images and fonts that keep files small
- Use the image cache
- Re-use the factory for faster generation
- Measure where the time goes
- Scale generation

---

## Compression

Output is compressed by default (FlateDecode). As an example, an 87 page text document is **78 KB** compressed, and **917 KB** without compression.

Compression can be turned off for a document - only useful when you need to read the PDF content while debugging.

```csharp
using Scryber;
using Scryber.Components;

using var doc = Document.ParseDocument("report.html");
doc.RenderOptions.Compression = OutputCompressionType.None;

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("report-debug.pdf");
```

Or for every document in configuration:

```json
{
  "Paperwork": {
    "Output": {
      "Compression": "None"
    }
  }
}
```

---

## Images

Images are usually most of a document's size.

- **Size images before adding them.** An image is added at its full resolution, whatever size it is shown at. A 4000 pixel photo shown 5cm wide still adds the whole photo.
- **Use JPEG for photos.** JPEG data is added as it is, without being decoded and re-encoded.
- **Use PNG for logos, diagrams and screenshots.**
- **Use SVG for icons and charts.** Vector graphics are small and sharp at any size.
- **Re-use images.** The same image used more than once is only added to the file once.

### The image cache

Images loaded from a file path or url are kept in a cache shared by all documents in the application, so a logo used on every invoice is only loaded once. Data URLs are not cached.

The `ImageCacheDuration` setting controls how long they are kept, in minutes:

| Value | Effect |
|-------|--------|
| `-1` | Kept for the life of the application (the default) |
| `0` | Not cached |
| `60` | Kept for 60 minutes |

```json
{
  "Paperwork": {
    "Imaging": {
      "ImageCacheDuration": 60
    }
  }
}
```

{: .note }
> With the default, an image file that changes while the application is running is not reloaded. Set a duration if your images change.

---

## Fonts

- **The standard fonts add nothing.** Helvetica, Times and Courier are built in to PDF viewers, so they are not added to the file.
- **Custom fonts are added to the file.** Only the fonts that are used are added. Each weight and style is a separate font file - use only the weights you need.
- **Load fonts once.** Register the fonts you use in [configuration](/paperwork.core/configuration/font-configuration), rather than loading them from a remote url for every document.

---

## Generation Speed

### Re-use the factory

The first document is slower, as the engine loads its configuration and code. Later documents are much faster.

```
First document   370 ms
Second document  133 ms
```

Create one factory when the application starts, and use it for every document. With dependency injection, `AddPaperwork()` does this for you.

```csharp
// ✅ Once, at startup
builder.Services.AddPaperwork(builder.Configuration);
```

```csharp
// ❌ A new factory for every document
using var factory = PaperworkFactory.Create().Build();
```

A parsed engine `Document` is used once - parse a new one for each document.

### Keep the log level low

`Verbose` and `Diagnostic` logging record every step of the layout, which takes time on large documents. Use `Warnings` or `Errors` in production. See [Logging](02_logging.html).

### Load remote content once

Every remote stylesheet, font, image and data url is a request. Use local files, or a [file request service](/paperwork.core/configuration/document-events-and-access) that caches content, for anything used by every document.

---

## Measuring Performance

### The appended log

The appended log includes the time taken by each stage - parsing, binding, layout and rendering - and by text layout, expressions and styles. It is the quickest way to see where the time goes.

```csharp
await factory.NewDocument()
    .WithLayoutFile("catalog.html")
    .WithData("model", catalog)
    .WithLogLevel(PaperworkRequestLogOption.Warnings)
    .SaveAsync("catalog-timings.pdf");
```

The **Performance Metrics** table, at the end of the document, lists each stage with its time and count.

### Timing in code

```csharp
using System.Diagnostics;

var stopwatch = Stopwatch.StartNew();

var pdf = await factory.NewDocument()
    .WithLayoutFile("catalog.html")
    .WithData("model", catalog)
    .BuildBytesAsync();

stopwatch.Stop();
_logger.LogInformation("Catalog: {Ms} ms, {Kb} KB", stopwatch.ElapsedMilliseconds, pdf.Length / 1024);
```

Measure after the first document, so the start-up time is not included.

---

## Scaling

### Many documents

The factory can generate many documents at the same time. Limit how many run at once, as each document uses memory and processor time while it is laid out.

```csharp
public async Task GenerateAllAsync(IEnumerable<Invoice> invoices, string outputFolder)
{
    using var limit = new SemaphoreSlim(4);

    var tasks = invoices.Select(async invoice =>
    {
        await limit.WaitAsync();
        try
        {
            await _factory.NewDocument()
                .WithLayoutFile("Templates/invoice.html")
                .WithData("model", invoice)
                .SaveAsync(System.IO.Path.Combine(outputFolder, $"{invoice.Number}.pdf"));
        }
        finally
        {
            limit.Release();
        }
    });

    await Task.WhenAll(tasks);
}
```

Measure the throughput with your own templates - the best limit depends on the documents and the server.

### Large and slow documents

For documents that take more than a few seconds, generate them in the background rather than in a web request:

1. Accept the request and add it to a queue
2. A background worker generates the document
3. Store the result, and notify the user
4. The user downloads the finished document

### More servers

Document generation needs no shared state between servers, so it scales by adding instances behind a load balancer or queue.

---

## Memory

- Dispose of engine `Document` objects with `using` once generated.
- Use `SaveAsync(stream)` to write directly to a response or file, rather than holding the bytes.
- Very large documents (thousands of pages) need a lot of memory during layout. Split them into parts where you can.

---

## Try It Yourself

### Exercise 1: Compression

Generate the same document with and without compression, and compare the sizes.

### Exercise 2: Find the Slow Stage

Append the log to your largest document, and find the stage that takes longest.

### Exercise 3: Throughput

Generate 100 documents with concurrency limits of 1, 2, 4 and 8, and find the best limit for your server.

---

## Common Pitfalls

### ❌ A New Factory per Document

Every document pays the start-up cost.

✅ **Solution:** One factory for the application.

### ❌ Full Size Photos

A document of a few pages is many megabytes.

✅ **Solution:** Resize images to the size they are shown at (at 150-300 dpi) before adding them.

### ❌ Verbose Logging in Production

✅ **Solution:** `Warnings` or `Errors`.

### ❌ Unlimited Parallel Generation

Hundreds of documents at once can run out of memory.

✅ **Solution:** Limit concurrency, or use a queue.

---

## Optimization Checklist

- [ ] Compression on (the default)
- [ ] Images sized for their use, JPEG for photos
- [ ] Only the font weights you need
- [ ] One factory for the application
- [ ] Production log level `Warnings` or `Errors`
- [ ] Concurrency limited for bulk generation
- [ ] Performance measured with the appended log

---

## Next Steps

1. **[Production & Deployment](07_production_deployment.html)** - Deploy to production
2. **[Practical Applications](/paperwork.core/learning/08-practical/)** - Real-world examples

---

**Continue learning →** [Production & Deployment](07_production_deployment.html)
