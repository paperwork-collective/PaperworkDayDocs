---
layout: default
render_with_liquid: false
title: Return a PDF from an ASP.NET controller
parent: Recipes
parent_url: /recipes/
nav_order: 4
has_children: false
has_toc: false
description: "Take a company and a month on a request, load your own data, and return the invoice as a PDF from an ASP.NET controller."
---
# Return a PDF from an ASP.NET controller

## What you'll do

Return a PDF from a web request. The caller asks for a company and a month, your own code loads the data, and Paperwork.Core makes the document and sends it back.

## Before you start

- A .NET web application, such as ASP.NET Core MVC or Razor Pages.
- The `Paperwork.Core` package.
- A template exported from [Paperwork.Design](/paperwork.design/). Open the template and choose **Export**. That gives one `.config` file holding the layout, styles, data and fields.

This recipe uses the exported invoice template, `InvoiceAcme.config`. It has the fields `name`, `companyCode` and `invoiceMonth`, and a data source named `model`. Put the file in a `Templates` folder in your project. The code below is also in [Paperwork.Samples](https://github.com/paperwork-collective/Paperwork.Samples/tree/master/recipes/aspnet-controller), as `Program.cs`, `InvoiceController.cs` and `InvoiceModel.cs`.

## Steps

**1. Register Paperwork once, at startup.**

```csharp
using Paperwork.Generation;

builder.Services.AddPaperwork(builder.Configuration);
```

This registers `IPaperworkFactory` so you can inject it. Passing the configuration also applies the `Paperwork` section of `appsettings.json` (fonts, imaging, parsing, output and tracing) to every document.

**2. Add the controller.**

```csharp
using Microsoft.AspNetCore.Mvc;
using Paperwork;                 // NewDocument / FromConfig extensions
using Paperwork.Generation;      // IPaperworkFactory

public class InvoiceController : Controller
{
    private readonly IPaperworkFactory _paperwork;
    private readonly IWebHostEnvironment _env;

    public InvoiceController(IPaperworkFactory paperwork, IWebHostEnvironment env)
    {
        _paperwork = paperwork;
        _env = env;
    }

    // GET /invoice/summary?company=Acme&month=3
    [HttpGet]
    public async Task<IActionResult> Summary(string company, int month, CancellationToken cancel)
    {
        if (!TryValidate(company, month, out var error))
            return BadRequest(error);

        var model = await LoadInvoiceDataAsync(company, month, cancel);
        if (model is null)
            return NotFound($"No invoices for {company} in month {month}.");

        var templatePath = Path.Combine(_env.ContentRootPath, "Templates", "InvoiceAcme.config");
        await using var template = System.IO.File.OpenRead(templatePath);

        var pdf = await _paperwork.FromConfig(template)
            .WithData("model", model)              // the name the template binds to
            .WithField("name", company)
            .WithField("companyCode", model.CompanyCode)
            .WithField("invoiceMonth", month.ToString())
            .BuildBytesAsync();

        return File(pdf, "application/pdf", $"{company}-{month:00}.pdf");
    }

    private static bool TryValidate(string company, int month, out string error)
    {
        if (string.IsNullOrWhiteSpace(company)) { error = "A company is required."; return false; }
        if (month < 1 || month > 12)            { error = "Month must be 1 to 12."; return false; }
        error = string.Empty;
        return true;
    }

    private Task<InvoiceModel?> LoadInvoiceDataAsync(string company, int month, CancellationToken cancel)
    {
        // your repository or API call - anything serialisable
        throw new NotImplementedException();
    }
}
```

The data model, which is your own type. Any object works:

```csharp
public class InvoiceModel
{
    public string CompanyCode { get; set; } = "";
    // the rest of what the invoice template reads
}
```

## How it works

1. **Validate first.** Nothing reaches the template until the request makes sense. A field the template requires, left out here, would fail later and less clearly.
2. **Load your own data.** Paperwork does not reach into your database. `WithData` takes any object, so your own model type works without serialising it yourself.
3. **Fields are strings.** They match the ids in the template: `name`, `companyCode` and `invoiceMonth`. In the template they read as `$fields.name`, and the data as `model`.
4. **`BuildBytesAsync` returns the PDF.** `File(...)` sends it to the caller.

## Check it worked

Run the application and open `/invoice/summary?company=Acme&month=3`. The browser downloads `Acme-03.pdf`. A missing company or a month outside 1 to 12 returns a 400 message instead.

## Options

- **Show it in the browser** instead of downloading it: leave out the file name, `File(pdf, "application/pdf")`.
- **Handle failures without exceptions:** use `BuildAsync()`. It returns a result with `Success`, `Error`, `Message` and `GenerationDuration`, and you map a failure to a 500 yourself.
- **Protect the document:** `.WithUserPassword("...")` asks for a password to open it, and `.WithSecurity(...)` sets what a reader may still do. See [Password-protect a PDF](/recipes/password-protect.html).
- **Other sources:** `WithDataFile` and `WithDataUrl` for data, and `WithLayoutFile` and `WithStyleFile` to build a document without an exported template, starting from `NewDocument()` instead of `FromConfig`.

## Things to watch

- **Read the template once if it does not change.** This example opens the file on every request. Read it into a `byte[]` at startup, and give the builder a new `MemoryStream` for each request.
- **A template that reads a shared asset or a remote source** fetches it over the network while the document is made. The server needs outbound access, and it adds to the time.

## Next

- [Paperwork.Core](/paperwork.core/), for the library.
- [Paperwork.CLI](/paperwork.cli/), if a script or a scheduled job makes the document rather than a request.
