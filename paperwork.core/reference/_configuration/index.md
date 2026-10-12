---
layout: default
title: Configuration & Extension System

has_children: true
nav_order: 100
---

# Scryber Configuration & Extension System

Scryber provides a comprehensive configuration and extension system that allows you to customize behavior, add custom components, integrate with external systems, and implement code-behind logic for PDF templates.

## Overview

This documentation covers the complete architecture for extending and configuring Scryber:

### Core Configuration
- **[Processing Instructions](processing-instructions)** - Document-level parser configuration via XML processing instructions
- **[Configuration Files](configuration-files)** - JSON-based application configuration with `scrybersettings.json`

### Extension Mechanisms
- **[Document Controllers](document-controllers)** - Code-behind functionality with outlets and actions
- **[Working in Code](working-in-code)** - Building and modifying component trees directly with the object model and typed style values
- **[Custom Components](custom-components)** - Creating reusable PDF components with custom namespaces
- **[Namespace Registration](namespace-registration)** - Mapping XML namespaces to .NET assemblies
- **[Image Factories](image-factories)** - Custom image loading from databases, APIs, or other sources
- **[Font Configuration](font-configuration)** - Registering custom fonts and managing font loading

### Integration
- **[Complete Integration Example](integration-example)** - All extension mechanisms working together
- **[Best Practices](best-practices)** - Guidelines, troubleshooting, and performance considerations

## Quick Start

### Basic Configuration

```json
{
  "Scryber": {
    "Parsing": {
      "Namespaces": [ /* Custom component namespaces */ ]
    },
    "Fonts": {
      "Register": [ /* Custom fonts */ ]
    },
    "Imaging": {
      "Factories": [ /* Custom image loaders */ ]
    }
  }
}
```

### Using Processing Instructions

```xml
<?xml version='1.0' encoding='utf-8' ?>
<?scryber parser-mode='Strict' 
          log-level='Warnings'
          controller='MyNamespace.MyController, MyAssembly' ?>
<pdf:Document xmlns:pdf="...">
    <!-- Document content -->
</pdf:Document>
```

### Creating a Controller

```csharp
public class MyController
{
    [PDFOutlet(Required = true)]
    public Label TitleLabel { get; set; }
    
    public void Init(InitContext context)
    {
        TitleLabel.Text = "Generated at " + DateTime.Now;
    }
}
```

## Extension Points Summary

| Extension Point | Purpose | Configuration |
|----------------|---------|---------------|
| **Processing Instructions** | Document-level settings | `<?scryber ... ?>` |
| **Controllers** | Code-behind with outlets/actions | `controller='Type, Assembly'` |
| **Custom Components** | Reusable widgets | Namespace registration |
| **Image Factories** | Custom image sources | `Imaging:Factories[]` |
| **Font Registration** | Custom fonts | `Fonts:Register[]` |
| **Namespaces** | Component discovery | `Parsing:Namespaces[]` |

## Architecture Principles

1. **Dependency Injection** - Configuration via `IScryberConfigurationService`
2. **Lazy Loading** - Types, assemblies, fonts loaded on-demand
3. **Caching** - Reflected definitions cached for performance
4. **Thread Safety** - Configuration access protected with locks
5. **Convention over Configuration** - Sensible defaults, explicit overrides

## Next Steps

- Start with **[Processing Instructions](processing-instructions)** for document-level configuration
- Learn **[Document Controllers](document-controllers)** for code-behind functionality
- Create **[Custom Components](custom-components)** for reusable elements
- See the **[Complete Integration Example](integration-example)** for everything working together

---

**Documentation Version**: 1.0  
**Last Updated**: February 2026  
**Target**: Scryber.Core 6.x / 7.x
