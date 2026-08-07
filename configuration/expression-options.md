---
layout: default
title: Expression Options
parent: Configuration & Extension
parent_url: /configuration/
has_children: false
has_toc: false
nav_order: 8
---

# Expression Options

Expression options configure the built-in expression engine and allow custom functions or operators to be added for use in template expressions (`{% raw %}{{...}}{% endraw %}`).

## Configuration Structure

```json
{
  "Scryber": {
    "Expressions": {
      "UseStandardFunctions": true,
      "AllowEval": true,
      "IsCaseSensitive": false,
      "Register": [
        {
          "Name": "myFunc",
          "Type": "Function",
          "FunctionType": "MyNamespace.MyCustomFunction",
          "FunctionAssembly": "MyAssembly, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
          "Override": false,
          "Enabled": true
        }
      ]
    }
  }
}
```

## Top-Level Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `UseStandardFunctions` | bool | `true` | Load the 90+ built-in expression functions (string, math, date, collection, etc.) |
| `AllowEval` | bool | `true` | Allow dynamic expression evaluation at runtime |
| `IsCaseSensitive` | bool | `false` | Whether function name lookups are case-sensitive |
| `Register[]` | array | `[]` | Custom function and operator registrations |

## Custom Registration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Name` | string | Yes | Name used to call the function or operator in template expressions |
| `Type` | string | Yes | `Function` or `Operator` |
| `FunctionType` | string | Yes | Fully qualified type name of the implementation class |
| `FunctionAssembly` | string | Yes | Full assembly name with version and public key token |
| `Override` | bool | No | If `true`, replaces an existing function or operator with the same name. Default `false` |
| `Enabled` | bool | No | Set to `false` to disable without removing the entry. Default `true` |

---

## Adding Custom Functions in Code

Use `CustomFunctionOption` to register functions or operators before any documents are parsed.

### Register by type name

```csharp
var config = Scryber.ServiceProvider.GetService<IScryberConfigurationService>();

config.ExpressionOptions.Register ??= new List<CustomFunctionOption>();

config.ExpressionOptions.Register.Add(new CustomFunctionOption(
    name: "myFunc",
    type: CustomFunctionType.Function,
    typeName: "MyNamespace.MyCustomFunction",
    assemblyName: "MyAssembly, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
));
```

### Register with an existing instance

If you already have an instance (useful when the class has constructor dependencies), the type and assembly names are inferred automatically:

```csharp
var config = Scryber.ServiceProvider.GetService<IScryberConfigurationService>();

config.ExpressionOptions.Register ??= new List<CustomFunctionOption>();

config.ExpressionOptions.Register.Add(new CustomFunctionOption(
    name: "myFunc",
    type: CustomFunctionType.Function,
    functionInstance: new MyNamespace.MyCustomFunction(myDependency)
));
```

### Replacing a built-in function

Set `forceOverride: true` to replace an existing function with the same name:

```csharp
config.ExpressionOptions.Register.Add(new CustomFunctionOption(
    name: "concat",
    type: CustomFunctionType.Function,
    typeName: "MyNamespace.MyConcatReplacement",
    assemblyName: "MyAssembly, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    forceOverride: true
));
```

### Registering a custom operator

```csharp
config.ExpressionOptions.Register.Add(new CustomFunctionOption(
    name: "??=",
    type: CustomFunctionType.Operator,
    typeName: "MyNamespace.MyNullCoalesceAssignOperator",
    assemblyName: "MyAssembly, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"
));
```

---

## Implementing a Custom Function

Custom functions must implement the expression function interface used by the Scryber expression engine. The function is invoked during data binding whenever the registered name appears in a template expression.

```csharp
using Scryber.Expressive.Expressions;
using Scryber.Expressive.Expressions.Functions;

namespace MyNamespace
{
    public class MyCustomFunction : FunctionBase
    {
        public override string Name => "myFunc";

        public override object Evaluate(IExpression[] parameters, IVariableCollection variables,
            Context context)
        {
            // Evaluate the first parameter
            var input = parameters[0].Evaluate(variables, context);

            // Your custom logic here
            return input?.ToString()?.ToUpperInvariant();
        }
    }
}
```

**Template usage** once registered:

```html
{% raw %}<p>{{myFunc(model.name)}}</p>{% endraw %}
```

---

## Disabling Standard Functions

If you want a minimal expression engine without the built-in function library:

```json
{
  "Scryber": {
    "Expressions": {
      "UseStandardFunctions": false
    }
  }
}
```

Only functions explicitly listed in `Register` will be available.

---

## Related Documentation

- [Configuration Structure](configuration-structure) - Full configuration file overview
- [Namespace Registration](namespace-registration) - Registering custom components
- [Image Factories](image-factories) - Custom image loading
- [Font Configuration](font-configuration) - Custom font registration
