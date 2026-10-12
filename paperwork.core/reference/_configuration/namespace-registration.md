---
layout: default
title: Namespace Registration
parent: Configuration & Extension System
grand_parent: Reference
nav_order: 5
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
│ Namespace Registration (scrybersettings.json)        │
│  XMLNamespace: http://mycompany.com/components       │
│  AssemblyPrefix: MyCompany.Components, MyAssembly    │
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

**scrybersettings.json:**

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "XMLNamespace": "http://mycompany.com/schemas/components",
          "AssemblyPrefix": "MyCompany.Components, MyCompany.Components"
        },
        {
          "XMLNamespace": "http://mycompany.com/schemas/charts",
          "AssemblyPrefix": "MyCompany.Charts, MyCompany.Charts"
        }
      ]
    }
  }
}
```

### Configuration Properties

| Property | Description | Example |
|----------|-------------|---------|
| `XMLNamespace` | XML namespace URI (must match `xmlns:prefix` declaration) | `http://mycompany.com/components` |
| `AssemblyPrefix` | Assembly-qualified namespace: `Namespace, AssemblyName` | `MyCompany.Components, MyCompany.Components` |

## Template Declaration

Once registered, use the namespace in templates:

```xml
<?xml version='1.0' encoding='utf-8' ?>
<pdf:Document xmlns:pdf='http://www.scryber.co.uk/schemas/core/release/v1/Scryber.Components.xsd'
              xmlns:custom='http://mycompany.com/schemas/components'
              xmlns:charts='http://mycompany.com/schemas/charts'>
    
    <Pages>
        <pdf:Page>
            <Content>
                
                <!-- Resolves to MyCompany.Components.StatCard -->
                <custom:StatCard value='100' label='Sales' />
                
                <!-- Resolves to MyCompany.Charts.BarChart -->
                <charts:BarChart data='{@:ChartData}' />
                
            </Content>
        </pdf:Page>
    </Pages>
    
</pdf:Document>
```

## Type Resolution Process

### 1. Assembly Loading

When the parser encounters an unknown element (e.g., `<custom:StatCard>`), it:

1. Extracts the **namespace prefix** (`custom`)
2. Looks up the **XML namespace URI** (`http://mycompany.com/schemas/components`)
3. Finds the **AssemblyPrefix** (`MyCompany.Components, MyCompany.Components`)
4. Loads or locates the **assembly** (`MyCompany.Components.dll`)

### 2. Type Reflection

**Implementation in `ParserDefintionFactory.UnsafeGetType()`:**

```csharp
private static Type UnsafeGetType(string xmlnamespace, string name, 
    ParsingOptions options, bool throwNotFound, out NamespaceKey key)
{
    // Check cache first
    string fullkey = xmlnamespace + ":" + name;
    if (_knownTypes.TryGetValue(fullkey, out Type found))
    {
        key = default;
        return found;
    }

    // Look up assembly for XML namespace
    string assemblyPrefixString = 
        options.LookupAssemblyForXmlNamespace(xmlnamespace, throwNotFound);
    
    if (string.IsNullOrEmpty(assemblyPrefixString))
        return null;

    // Parse assembly-qualified name
    string[] parts = assemblyPrefixString.Split(',');
    string namespacePrefix = parts[0].Trim();
    string assemblyName = parts.Length > 1 ? parts[1].Trim() : null;

    // Load assembly
    Assembly assembly = null;
    if (!string.IsNullOrEmpty(assemblyName))
    {
        assembly = Assembly.Load(assemblyName);
    }

    // Build full type name
    string fullTypeName = namespacePrefix + "." + name;
    
    // Try to get type
    Type type = null;
    if (assembly != null)
    {
        type = assembly.GetType(fullTypeName, false);
    }
    else
    {
        type = Type.GetType(fullTypeName, false);
    }

    // Cache result
    if (type != null)
    {
        _knownTypes[fullkey] = type;
    }

    return type;
}
```

### 3. Type Caching

Resolved types are cached in `_knownTypes` dictionary to avoid repeated reflection:

```csharp
private static Dictionary<string, Type> _knownTypes = 
    new Dictionary<string, Type>();
```

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
        
        protected override void OnInit(InitContext context)
        {
            base.OnInit(context);
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

**scrybersettings.json:**

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [
        {
          "XMLNamespace": "http://mycompany.com/schemas/components",
          "AssemblyPrefix": "MyCompany.Components, MyCompany.Components"
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
<pdf:Document xmlns:pdf='http://www.scryber.co.uk/schemas/core/release/v1/Scryber.Components.xsd'
              xmlns:custom='http://mycompany.com/schemas/components'>
    
    <Pages>
        <pdf:Page>
            <Content>
                <custom:StatCard value='$125,432' label='Total Sales' />
                <custom:StatCard value='1,847' label='Active Users' />
            </Content>
        </pdf:Page>
    </Pages>
    
</pdf:Document>
```

### 4. Application

**Program.cs:**

```csharp
using Microsoft.Extensions.DependencyInjection;
using Scryber;
using Scryber.Components;

// Setup dependency injection
var services = new ServiceCollection();
services.AddScryber();  // Loads scrybersettings.json
var provider = services.BuildServiceProvider();

// Parse document with custom components
using (var reader = new StreamReader("Dashboard.pdfx"))
{
    var doc = Document.ParseDocument(reader, ParseSourceType.DynamicContent);
    doc.ProcessDocument("Dashboard.pdf");
}
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
          "XMLNamespace": "http://mycompany.com/components",
          "AssemblyPrefix": "MyCompany.Components, MyCompany.Components"
        },
        {
          "XMLNamespace": "http://mycompany.com/charts",
          "AssemblyPrefix": "MyCompany.Charting, MyCompany.Charting"
        },
        {
          "XMLNamespace": "http://thirdparty.com/widgets",
          "AssemblyPrefix": "ThirdParty.Widgets, ThirdParty.Widgets"
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
          "XMLNamespace": "http://mycompany.com/components",
          "AssemblyPrefix": "MyCompany.Components, MyCompany.Components"
        },
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
  }
}
```

**Template:**
```xml
<pdf:Document xmlns:pdf='...'
              xmlns:custom='http://mycompany.com/components'
              xmlns:cards='http://mycompany.com/components/cards'
              xmlns:charts='http://mycompany.com/components/charts'>
    
    <custom:StatCard ... />       <!-- MyCompany.Components.StatCard -->
    <cards:ProductCard ... />     <!-- MyCompany.Components.Cards.ProductCard -->
    <charts:BarChart ... />       <!-- MyCompany.Components.Charts.BarChart -->
    
</pdf:Document>
```

## Implementation Details

### Namespace Lookup

**`ParsingOptions.LookupAssemblyForXmlNamespace()`:**

```csharp
public string LookupAssemblyForXmlNamespace(string xmlnamespace, bool throwNotFound)
{
    NamespaceDefn found = null;
    
    // Search registered namespaces
    foreach (NamespaceDefn defn in this.Namespaces)
    {
        if (string.Equals(defn.XmlNamespace, xmlnamespace, 
            StringComparison.OrdinalIgnoreCase))
        {
            found = defn;
            break;
        }
    }
    
    if (found == null)
    {
        if (throwNotFound)
            throw new PDFParserException(
                $"No assembly registered for XML namespace: {xmlnamespace}");
        return null;
    }
    
    return found.AssemblyPrefix;
}
```

### Namespace Discovery

**`ParserDefintionFactory.PopulateNamespaceFromAssembly()`:**

When an assembly is loaded, Scryber scans for types with `[PDFParsableComponent]`:

```csharp
private static void PopulateNamespaceFromAssembly(
    string xmlnamespace, Assembly assembly, NamespaceDefn defn)
{
    Type[] alltypes = assembly.GetTypes();
    
    foreach (Type atype in alltypes)
    {
        // Check for PDFParsableComponent attribute
        Attribute found = System.Attribute.GetCustomAttribute(
            atype, typeof(PDFParsableComponentAttribute), false);
        
        if (found != null)
        {
            PDFParsableComponentAttribute parseable = 
                (PDFParsableComponentAttribute)found;
            
            string name = string.IsNullOrEmpty(parseable.Name) 
                ? atype.Name 
                : parseable.Name;
            
            // Cache type definition
            defn.Components[name] = new ComponentTypeDefinition(atype, name);
        }
    }
}
```

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
- Check scrybersettings.json is loaded
- Ensure JSON syntax is valid
- Verify namespace is in `Parsing:Namespaces[]` array

### "Could not load type 'MyCompany.Components.StatCard'"
- Check assembly name matches AssemblyPrefix
- Verify assembly is referenced by application
- Ensure namespace matches AssemblyPrefix
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
