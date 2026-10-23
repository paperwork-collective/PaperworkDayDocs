---
layout: default
title: Namespace Registration
parent: Configuration & Extension
parent_url: /paperwork.core/configuration/
has_children: false
has_toc: false
nav_order: 9
grand_parent: Paperwork.Core
grand_parent_url: /paperwork.core/
---

# Namespace Registration

Namespace registration maps **XML namespaces** to **.NET assembly namespaces**, enabling the parser to discover and instantiate custom components when it encounters unknown XML elements.

## How It Works

```
┌──────────────────────────────────────────────────────┐
│ Template XML                                          │
│  <custom:StatCard ... />                             │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ XML Namespace                                         │
│  xmlns:custom='http://mycompany.com/components'      │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Namespace Registration (appsettings.json)            │
│  Source: http://mycompany.com/components             │
│  Namespace: MyCompany.Components                     │
│  Assembly: MyAssembly                                │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Type Resolution                                       │
│  Load assembly → Reflect types → Match "StatCard"   │
│  Found: MyCompany.Components.StatCard               │
└──────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────┐
│ Component Instantiation                               │
│  Activator.CreateInstance(typeof(StatCard))          │
└──────────────────────────────────────────────────────┘
```

## Configuration

### JSON Configuration

**appsettings.json:**

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "Source": "http://mycompany.com/schemas/components",
          "Namespace": "MyCompany.Components",
          "Assembly": "MyCompany.Components"
        },
        {
          "Source": "http://mycompany.com/schemas/charts",
          "Namespace": "MyCompany.Charts",
          "Assembly": "MyCompany.Charts"
        }
      ]
    }
  }
}
```

### Configuration Properties

| Property | Description | Example |
|----------|-------------|---------|
| `Source` | XML namespace URI (must match the `xmlns:prefix` declaration) | `http://mycompany.com/components` |
| `Namespace` | The .NET namespace of the component classes | `MyCompany.Components` |
| `Assembly` | The name of the assembly that contains them | `MyCompany.Components` |

The configuration is passed to the engine at startup, e.g. with `services.AddPaperwork(builder.Configuration)` - see [Configuration Structure](configuration-structure).

## Template Declaration

Once registered, use the namespace in templates:

```xml
<?xml version='1.0' encoding='utf-8' ?>
<html xmlns='http://www.w3.org/1999/xhtml'
      xmlns:custom='http://mycompany.com/schemas/components'
      xmlns:charts='http://mycompany.com/schemas/charts'>
    <body>
        <main>
            
            <!-- Resolves to MyCompany.Components.StatCard -->
            <custom:StatCard value='100' label='Sales' />
            
            <!-- Resolves to MyCompany.Charts.BarChart -->
            <charts:BarChart data='{@:ChartData}' />
            
        </main>
    </body>
</html>
```

## Type Resolution Process

### 1. Assembly Loading

When the parser encounters an unknown element (e.g., `<custom:StatCard>`), it:

1. Extracts the **namespace prefix** (`custom`)
2. Looks up the **XML namespace URI** (`http://mycompany.com/schemas/components`)
3. Finds the registered **Namespace** and **Assembly** (`MyCompany.Components`, `MyCompany.Components`)
4. Loads or locates the **assembly** (`MyCompany.Components.dll`)

### 2. Type Resolution

The element name (`StatCard`) is looked up as a type in the registered namespace and assembly (`MyCompany.Components.StatCard`), or as the name given in its `[PDFParsableComponent("Name")]` attribute. The lookup is made by `ParserDefintionFactory` in the engine - see [Configuration Structure](configuration-structure) for the code.

### 3. Type Caching

Resolved types are cached, so the reflection only happens the first time an element is used.

## Complete Example

### 1. Component Assembly

**MyCompany.Components/StatCard.cs:**

```csharp
using Scryber;
using Scryber.Components;

namespace MyCompany.Components
{
    [PDFParsableComponent("StatCard")]
    public class StatCard : Panel
    {
        [PDFAttribute("value")]
        public string Value { get; set; }
        
        [PDFAttribute("label")]
        public string Label { get; set; }
        
        public StatCard() : base(ObjectTypes.Panel)
        {
        }
        
        protected override void OnInitialized(InitContext context)
        {
            base.OnInitialized(context);
            BuildContent();
        }
        
        private void BuildContent()
        {
            var valueLabel = new Label { Text = Value };
            valueLabel.Style.Font.FontSize = 24;
            this.Contents.Add(valueLabel);
            
            var labelText = new Label { Text = Label };
            labelText.Style.Font.FontSize = 12;
            this.Contents.Add(labelText);
        }
    }
}
```

### 2. Configuration

**appsettings.json:**

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "Source": "http://mycompany.com/schemas/components",
          "Namespace": "MyCompany.Components",
          "Assembly": "MyCompany.Components"
        }
      ]
    }
  }
}
```

### 3. Template

**Dashboard.pdfx:**

```xml
<?xml version='1.0' encoding='utf-8' ?>
<html xmlns='http://www.w3.org/1999/xhtml'
      xmlns:custom='http://mycompany.com/schemas/components'>
    <body>
        <main>
            <custom:StatCard value='$125,432' label='Total Sales' />
            <custom:StatCard value='1,847' label='Active Users' />
        </main>
    </body>
</html>
```

### 4. Application

**Program.cs:**

```csharp
using Microsoft.Extensions.Configuration;
using Paperwork;

// Pass the configuration, with the namespace registration, to the engine once at startup
var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

Scryber.ServiceProvider.Init(config);

// Generate the document with custom components
using var factory = PaperworkFactory.Create().Build();

await factory.NewDocument()
    .WithLayoutFile("Dashboard.html")
    .SaveAsync("Dashboard.pdf");
```

## Advanced Configuration

### Multiple Namespaces

Register multiple component libraries:

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "Source": "http://mycompany.com/components",
          "Namespace": "MyCompany.Components",
          "Assembly": "MyCompany.Components"
        },
        {
          "Source": "http://mycompany.com/charts",
          "Namespace": "MyCompany.Charting",
          "Assembly": "MyCompany.Charting"
        },
        {
          "Source": "http://thirdparty.com/widgets",
          "Namespace": "ThirdParty.Widgets",
          "Assembly": "ThirdParty.Widgets"
        }
      ]
    }
  }
}
```

### Nested Namespaces

Components can exist in nested namespaces:

**Code structure:**
```
MyCompany.Components
├── StatCard.cs
├── Cards
│   └── ProductCard.cs
└── Charts
    └── BarChart.cs
```

**Configuration:**
```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "Source": "http://mycompany.com/components",
          "Namespace": "MyCompany.Components",
          "Assembly": "MyCompany.Components"
        },
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
  }
}
```

**Template:**
```xml
<html xmlns='http://www.w3.org/1999/xhtml'
      xmlns:custom='http://mycompany.com/components'
      xmlns:cards='http://mycompany.com/components/cards'
      xmlns:charts='http://mycompany.com/components/charts'>
    
    <custom:StatCard ... />       <!-- MyCompany.Components.StatCard -->
    <cards:ProductCard ... />     <!-- MyCompany.Components.Cards.ProductCard -->
    <charts:BarChart ... />       <!-- MyCompany.Components.Charts.BarChart -->
    
</html>
```

## Implementation Details

Namespaces are registered from the `Scryber:Parsing:Namespaces` configuration the first time a document is parsed, and the engine's own namespaces (HTML, SVG and the Scryber component namespaces) are always included. Component types are found by reflection on the registered assembly, and cached. See [Configuration Structure](configuration-structure) for the engine code.

## Best Practices

### Namespace URI Design
- Use your company domain: `http://mycompany.com/schemas/...`
- Include version for breaking changes: `http://mycompany.com/schemas/v2/components`
- Group related components: `http://mycompany.com/components/charts`
- Document namespace URIs

### Assembly Organization
- Group related components in same assembly
- Use consistent naming: `Company.Product.Components`
- Version assemblies appropriately
- Document component libraries

### Component Discovery
- Mark all components with `[PDFParsableComponent]`
- Use descriptive element names
- Avoid name collisions across namespaces
- Document component APIs

### Performance
- Namespace resolution is cached - registration order doesn't impact performance
- Assembly loading happens once per namespace
- Type reflection is cached - repeated use is fast

## Troubleshooting

### "No assembly registered for XML namespace"
- Verify namespace URI matches exactly (including http/https, case)
- Check the configuration is passed to the engine (`AddPaperwork(configuration)` or `Scryber.ServiceProvider.Init(configuration)`)
- Ensure JSON syntax is valid
- Verify namespace is in `Parsing:Namespaces[]` array

### "Could not load type 'MyCompany.Components.StatCard'"
- Check the assembly name matches `Assembly`
- Verify assembly is referenced by application
- Ensure the class namespace matches `Namespace`
- Check component class is public
- Verify [PDFParsableComponent] attribute is present

### Type not found in assembly
- Check class is public
- Verify namespace matches configuration
- Ensure class name matches element name (or [PDFParsableComponent("Name")])
- Check assembly is compiled and up-to-date

### Namespace prefix undeclared
- Add `xmlns:prefix='...'` to Document root element
- Verify URI matches registered namespace exactly
- Check for typos in namespace URI

## Related Documentation

- [Custom Components](custom-components) - Creating parseable components
- [Processing Instructions](processing-instructions) - Document-level configuration
- [Integration Example](integration-example) - Complete namespace registration example
- [Best Practices](best-practices) - Namespace design patterns
