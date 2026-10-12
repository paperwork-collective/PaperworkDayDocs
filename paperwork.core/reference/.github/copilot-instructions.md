# AI Coding Agent Instructions - Scryber Reference Documentation

## Project Overview
This is a comprehensive API reference documentation repository for **Scryber**, a templating and document generation library. The site documents:
- Handlebars templating syntax (helpers, operators, expressions)
- 90+ built-in functions for data binding
- CSS selectors, properties, and styling
- HTML tags and attributes with library-specific extensions
- SVG drawing elements and attributes

## Architecture & Organization

### Directory Structure Pattern
Each major feature area follows identical hierarchical patterns:
```
feature/
├── index.md              # Overview with navigation summary
├── {sub_category}/
│   ├── index.md          # Sub-section overview
│   └── {item}.md         # Individual reference docs
└── *_template.md         # Structural template (function_template.md, etc.)
```

**Key directories:**
- `binding/` - Data binding, Handlebars helpers (6), operators (15+), functions (90+)
- `htmltags/`, `htmlattributes/` - HTML element and attribute support
- `cssselectors/`, `cssproperties/` - CSS styling support
- `svgelements/`, `svgattributes/` - SVG drawing primitives

### Content Organization Convention
The binding section demonstrates the pattern:
- **Handlebars Helpers** (6): `each`, `with`, `if`, `else if`, `else`, `log`
- **Operators** (15+): arithmetic, logical, comparison, power, null coalescing
- **Functions** (90+): math, date/time, string manipulation, aggregation, type conversion

## Documentation Standards

### Front Matter (Jekyll)
All markdown files follow Jekyll front matter structure:
```yaml
---
layout: default
title: Item Name
parent: Parent Section
parent_url: /reference/path/
grand_parent: Grandparent Section
grand_parent_url: /reference/path/
has_children: true/false
has_toc: false
---
```

**Critical naming:**
- Files use snake_case (e.g., `addDays.md`, `css_prop_font-display.md`)
- Use `parent_url` only when referencing index pages
- Set `has_toc: false` on leaf pages, `true` for category pages with subsections

### Reference Page Structure
Standard 7-section pattern for function/operator/element documentation:
1. **Title** with type indicator: `# functionName() : Brief Description`
2. **Details toggle** (collapsible TOC)
3. **Summary** - One sentence overview
4. **Signature** - Syntax with parameters
5. **Parameters** - Table with Type, Required, Description
6. **Returns** - Type and description
7. **Examples** - 2-3 practical examples with data context and output

Use `{% raw %}{{functionName}}{% endraw %}` notation for Handlebars/template code blocks.

### File Naming Convention
- Functions/helpers: lowercase `functionName.md`
- CSS properties: `css_prop_propertyName.md` or `_css_prop_specialProp.md` (underscore for custom/prefixed)
- Operators: lowercase `operatorname.md` (e.g., `greaterorequal.md`)
- HTML tags/attributes: lowercase or with hyphens as used

## Key Patterns & Workflows

### Adding New Function Documentation
1. Copy [function_template.md](binding/function_template.md) → `binding/functions/newFunction.md`
2. Update front matter: title, parent_url references
3. Follow signature/parameters/returns/examples structure exactly
4. Verify `binding/functions/index.md` contains the new function in its listing

### Updating Category Indexes
Category indexes (e.g., `binding/index.md`) maintain:
- Overview statement with count of items (e.g., "6 Handlebars Helpers")
- Navigation tables with syntax, brief description
- Links to child pages as markdown tables or sections

### Handlebars Syntax
- Template syntax: `{% raw %}{{#helper}}...{{/helper}}{% endraw %}` for block helpers
- Expressions: `{% raw %}{{ this }}{% endraw %}`, `{% raw %}{{ model.property }}{% endraw %}`
- Special vars: `@index`, `this`, `..` (parent context)
- Operators combine with parentheses: `{% raw %}{{ (value > 10) && (value < 20) }}{% endraw %}`

### Data Type Documentation
Functions specify return types and parameter requirements:
- **Numeric types**: Number, int, long, double, decimal
- **Temporal**: Date (datetime objects)
- **Collections**: Array/List for iteration
- **Special**: Nullable types noted when functions return `null` on error

## Integration Notes
- All examples assume Handlebars template context (not C# backend context)
- Links between pages use Jekyll relative paths (`parent_url: /reference/binding/functions/`)
- Code blocks specify language: `handlebars`, `csharp`, `html`, `css`, `svg`
- Custom library-specific attributes/properties documented with description and supported elements

## Guidelines for Contributors
- Keep summaries under 25 words
- Every function requires minimum 2 examples with realistic use cases
- CSS properties must list supported HTML tags/elements
- Update parent index.md count when adding/removing items
- Test front matter links in Jekyll build before committing
- Use consistent capitalization: "Handlebars" (capital H), "Scryber" (capital S)
