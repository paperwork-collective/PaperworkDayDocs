---
layout: default
title: Configuration & Extension
has_children: true
nav_order: 100
---

# Scryber Configuration and Extension

Scryber provides a comprehensive configuration and extension system that allows you to customize behavior, add custom components, integrate with external systems, and implement code-behind logic for PDF templates.

## Overview

This documentation covers the complete architecture for extending and configuring Scryber:

## Document Configuration
Applies to individual document templates

- **[Processing Instructions](processing-instructions)** - Document-level parser configuration via XML processing instructions
- **[DOM and Event Handling](document-events-and-access)** - Directly accessing content and responding to document remote file request events
- **[Working in Code](working-in-code)** - Building and modifying component trees directly with the object model and typed style values.
- **[Document Controllers](document-controllers)** - Code-behind functionality with outlets and actions

## Core Engine Configuration
Applies to all documents within the application or process.

- **[Configuration Files](configuration-structure)** - JSON-based application configuration file (such as `scrybersettings.json`) with sections for.
  - **[Namespace Registration](namespace-registration)** - Mapping XML namespaces to .NET assemblies
  - **[Image Factories](image-factories)** - Custom image loading from databases, APIs, or other sources
  - **[Font Configuration](font-configuration)** - Registering custom fonts and managing font loading

## Extension Mechanisms
Applies to any number of applications or processes

- **[Custom Components](custom-components)** - Creating reusable PDF components with custom namespaces

## Putting it all together

- **[Complete Integration Example](integration-example)** - All extension mechanisms working together

## Further Reading

- **[Library Architecture](ARCHITECTURE)** - An overview of the libraries, important namespaces and class hierarchies, and the strategies used for parsing; layout; and rendering.
- **[Best Practices](best-practices)** - Guidelines, troubleshooting, and performance considerations

---

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
<html xmlns='http://www.w3.org/1999/xhtml'>
    <!-- Document content -->
</html>
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

## Initializing the configuration in Scryber.Core



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
