---
layout: default
title: Installation & Setup
nav_order: 1
parent: Getting Started
parent_url: /paperwork.core/learning/01-getting-started/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Installation & Setup

Get Paperwork.Core installed and configured in your .NET project in minutes.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Install Paperwork.Core via NuGet
- Configure your project for PDF generation
- Verify your installation
- Set up your IDE for optimal development

---

## Prerequisites

- **.NET 8.0 or later**
- **Visual Studio 2022**, **VS Code**, or **Rider**
- **Basic C# knowledge**

---

## Installation Methods

### Method 1: NuGet Package Manager (Visual Studio)

1. **Open your project** in Visual Studio
2. **Right-click** on your project in Solution Explorer
3. Select **Manage NuGet Packages**
4. Click the **Browse** tab
5. Search for **`Paperwork.Core`**
6. Click **Install**

### Method 2: Package Manager Console

```powershell
Install-Package Paperwork.Core
```

### Method 3: .NET CLI

```bash
dotnet add package Paperwork.Core
```

### Method 4: Direct `.csproj` Edit

```xml
<ItemGroup>
  <PackageReference Include="Paperwork.Core" Version="9.*" />
</ItemGroup>
```

Then restore packages:

```bash
dotnet restore
```

---

## Project Types Supported

Paperwork.Core works with various .NET project types:

| Project Type | Supported | Notes |
|--------------|-----------|-------|
| **ASP.NET Core** | ✅ | Web applications, APIs |
| **Console App** | ✅ | Batch processing, CLI tools |
| **Windows Forms** | ✅ | Desktop applications |
| **WPF** | ✅ | Desktop applications |
| **Azure Functions** | ✅ | Serverless PDF generation |
| **Blazor Server** | ✅ | Interactive web apps |
| **Blazor WebAssembly** | ✅ | Full support for client side |

---

## Verifying Installation

Replace the contents of `Program.cs` with a simple test to verify Paperwork.Core is installed correctly:

```csharp
using Paperwork;

// Create a simple HTML document
string html = @"
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Installation Test</title>
</head>
<body>
    <h1>Hello, Paperwork!</h1>
    <p>If you can see this PDF, Paperwork.Core is installed correctly.</p>
</body>
</html>";

// Create the factory, and generate the PDF from the html
using var factory = PaperworkFactory.Create().Build();

await factory.NewDocument()
    .WithLayout(html)
    .SaveAsync("test.pdf");

Console.WriteLine("PDF generated successfully: test.pdf");
```

**Run the program:**

```bash
dotnet run
```

**Expected output:**
```
PDF generated successfully: test.pdf
```

Open `test.pdf` to verify it contains "Hello, Paperwork!"

---

## IDE Setup

### Visual Studio

**Recommended Extensions:**
- **C# IntelliSense** (built-in)
- **NuGet Package Manager** (built-in)
- **HTML/CSS IntelliSense** (built-in)

**Project Configuration:**
1. **Target Framework**: .NET 8.0 or later
2. **Language Version**: C# 10.0 or later
3. **Nullable Reference Types**: Optional but recommended

### VS Code

**Required Extensions:**
- **C# Dev Kit** (Microsoft)
- **HTML CSS Support**
- **XML Tools** (for XHTML templates)

**Create `.vscode/launch.json`:**

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": ".NET Core Launch (console)",
            "type": "coreclr",
            "request": "launch",
            "preLaunchTask": "build",
            "program": "${workspaceFolder}/bin/Debug/net8.0/YourProject.dll",
            "args": [],
            "cwd": "${workspaceFolder}",
            "stopAtEntry": false,
            "console": "internalConsole"
        }
    ]
}
```

### Rider

**Setup:**
1. Open your solution in Rider
2. NuGet packages are managed automatically
3. Rider provides excellent HTML/CSS support out of the box

---

## Project Structure

Recommended folder structure for Paperwork.Core projects:

```
YourProject/
├── Program.cs              # Entry point
├── Templates/              # HTML/XHTML templates
│   ├── invoice.html
│   ├── report.html
│   └── letter.html
├── Styles/                 # External CSS files
│   ├── common.css
│   └── invoice.css
├── Images/                 # Static images
│   ├── logo.png
│   └── background.jpg
├── Fonts/                  # Custom fonts (optional)
│   └── CustomFont.ttf
└── Output/                 # Generated PDFs
    └── .gitkeep
```

**Add to `.gitignore`:**

```
# Generated PDFs
Output/*.pdf

# But keep the directory
!Output/.gitkeep
```

---

## Configuration Options

### Dependency Injection Setup (ASP.NET Core)

Register the factory once at startup, and it can then be injected as an `IPaperworkFactory` wherever documents are generated.

```csharp
using Paperwork.Generation;

var builder = WebApplication.CreateBuilder(args);

// Add the Paperwork factory, and pass the configuration to the engine
builder.Services.AddPaperwork(builder.Configuration);
```

The factory uses the application's `HttpClient` to load remote fonts, images and stylesheets if one is registered, or its own if not.

### Configuration Loading on Command Line

Fonts, imaging, output and other engine options can be set in `appsettings.json`, under the `"Scryber"` section. Load the configuration once at startup (in ASP.NET Core, `AddPaperwork(builder.Configuration)` does this for you).

```csharp
using Microsoft.Extensions.Configuration;

IConfigurationRoot config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

Scryber.ServiceProvider.Init(config);    
```


---

## Common Installation Issues

### Issue 1: NuGet Package Not Found

**Problem:** Cannot find `Paperwork.Core` in NuGet

**Solution:**
- Ensure NuGet package sources include nuget.org
- Clear NuGet cache: `dotnet nuget locals all --clear`
- Check internet connection

### Issue 2: Version Conflicts

**Problem:** Dependency version conflicts

**Solution:**
```xml
<ItemGroup>
  <PackageReference Include="Paperwork.Core" Version="9.*" />
  <!-- Explicitly specify conflicting dependencies if needed -->
</ItemGroup>
```

### Issue 3: File Access Permissions

**Problem:** Cannot write PDF files

**Solution:**
- Ensure output directory exists
- Check folder permissions
- Use absolute paths for testing:

```csharp
string outputPath = Path.Combine(
    Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
    "test.pdf"
);
```

---

## Next Steps

Now that Paperwork.Core is installed and configured:

1. **[Create Your First Document](02_first_document.html)** - Build a simple PDF from scratch
2. **[HTML to PDF](03_html_to_pdf.html)** - Learn how HTML converts to PDF
3. **[Troubleshooting](08_troubleshooting.html)** - If you encounter issues

---

## Additional Resources

- **[NuGet Package](https://www.nuget.org/packages/Paperwork.Core/)** - Official package
- **[Scryber engine on GitHub](https://github.com/richard-scryber/scryber.core)** - Source code and issues for the open-source layout and rendering engine
- **[API Documentation](/api/)** - Complete API reference

---

**Ready to create your first PDF?** → [Your First Document](02_first_document.html)
