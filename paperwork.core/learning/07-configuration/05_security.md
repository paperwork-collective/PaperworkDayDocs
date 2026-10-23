---
layout: default
title: Security
nav_order: 5
parent: Document Configuration
parent_url: /paperwork.core/learning/07-configuration/
grand_parent: Learning Guides
grand_parent_url: /paperwork.core/learning/
has_toc: false
ancestor: Paperwork.Core
---

# Security

Protect documents with encryption, passwords and permission controls.

---

## Learning Objectives

By the end of this article, you'll be able to:
- Restrict printing, copying and editing from the template
- Choose the encryption level
- Add owner and user passwords
- Set permissions in code
- Apply security best practices

---

## PDF Security Basics

A secured PDF is encrypted, and carries a set of **permissions** - what a reader may do with it, such as print or copy text.

- The **owner password** protects the permissions: a reader needs it to change or remove them.
- The **user password**, when set, must be entered to open the document at all.

When a document has restrictions but no passwords, it is still encrypted, and PDF viewers apply the permissions.

---

## Restrictions in the Template

The simplest way to secure a document is with `<meta>` tags in the template head.

```html
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <title>Quarterly Results</title>

    <!-- Restrict everything except printing and copying -->
    <meta name='print-restrictions' content='printing, copying' />

    <!-- 128 bit encryption (the default) -->
    <meta name='print-encryption' content='128bit' />
</head>
<body>
    ...
</body>
</html>
```

### print-restrictions

When any restriction is set, everything is restricted except the permissions listed.

| Content | Effect |
|---------|--------|
| `none` | No restrictions (the default) |
| `all` | Everything is restricted |
| `printing` (or `allow-printing`) | Allows printing, including high quality |
| `copying` (or `allow-copying`) | Allows copying text and graphics |
| `modifications` (or `allow-modifications`) | Allows changes to the document |
| `annotations` (or `allow-annotations`) | Allows comments and annotations |
| `forms` (or `allow-forms`) | Allows form filling |
| `accessibility` (or `allow-accessibility`) | Allows screen readers and other accessibility tools |

Combine permissions with spaces or commas: `content='printing, accessibility'`.

### print-encryption

| Content | Encryption |
|---------|------------|
| `128bit` | 128 bit (PDF 1.4 and later) - the default |
| `40bit` | 40 bit (PDF 1.3) - for very old viewers only |

---

## Passwords

Passwords are set in code, on an engine `Document`, so they are never stored in a template. Parse the template, set a password provider, and generate it with the builder (see [The Engine Document](/paperwork.core/configuration/engine-document)).

### Owner Password (Permissions)

```csharp
using Paperwork;
using Scryber.Components;
using Scryber.PDF.Secure;

using var factory = PaperworkFactory.Create().Build();
using var doc = Document.ParseDocument("report.html");

// The owner password protects the restrictions set in the template
doc.RenderOptions.PasswordProvider = new DocumentPasswordProvider(ownerPassword);

await factory.NewDocument()
    .WithLayout(doc)
    .WithData("model", report)
    .SaveAsync("report.pdf");
```

### Owner and User Passwords (Document Open)

```csharp
// The user password must be entered to open the document
doc.RenderOptions.PasswordProvider = new DocumentPasswordProvider(ownerPassword, userPassword);
```

The passwords can also be given as `SecureString` values.

---

## Permissions in Code

The permissions can be set in code, as well as, or instead of, the template.

```csharp
using var doc = Document.ParseDocument("report.html");

var permissions = doc.RenderOptions.Permissions;
permissions.AllowPrinting = true;
permissions.AllowHighQualityPrinting = true;
permissions.AllowCopying = false;
permissions.AllowModification = false;
permissions.AllowAnnotations = false;
permissions.AllowFormFilling = false;
permissions.AllowDocumentAssembly = false;
permissions.AllowAccessiblity = true;   // keep screen readers working

doc.RenderOptions.PasswordProvider = new DocumentPasswordProvider(ownerPassword);

await factory.NewDocument()
    .WithLayout(doc)
    .SaveAsync("report.pdf");
```

### Permission Descriptions

| Permission | Description |
|------------|-------------|
| `AllowPrinting` | Print the document |
| `AllowHighQualityPrinting` | Print at full quality (otherwise a lower resolution) |
| `AllowCopying` | Copy text and graphics |
| `AllowModification` | Change the document |
| `AllowAnnotations` | Add comments and annotations |
| `AllowFormFilling` | Fill in form fields |
| `AllowDocumentAssembly` | Insert, rotate or delete pages |
| `AllowAccessiblity` | Extract content for screen readers and other accessibility tools |

---

## Security Profiles

### Read-Only Document

```html
<meta name='print-restrictions' content='printing, accessibility' />
```

### Confidential Document

```html
<meta name='print-restrictions' content='accessibility' />
```

With an owner and user password set in code.

### Form Document

```html
<meta name='print-restrictions' content='printing, forms, accessibility' />
```

---

## Practical Example: Security by Classification

The template sets nothing; the application chooses the security for each document.

```csharp
public async Task<byte[]> GenerateAsync(string templatePath, object data, Classification classification)
{
    using var doc = Document.ParseDocument(templatePath);
    var permissions = doc.RenderOptions.Permissions;

    switch (classification)
    {
        case Classification.Public:
            // No security
            break;

        case Classification.Internal:
            permissions.AllowModification = false;
            permissions.AllowAnnotations = false;
            doc.RenderOptions.PasswordProvider = new DocumentPasswordProvider(_secrets.OwnerPassword);
            break;

        case Classification.Confidential:
            permissions.AllowCopying = false;
            permissions.AllowModification = false;
            permissions.AllowAnnotations = false;
            permissions.AllowDocumentAssembly = false;
            doc.RenderOptions.PasswordProvider = new DocumentPasswordProvider(
                _secrets.OwnerPassword, _secrets.GetUserPassword(data));
            break;
    }

    return await _factory.NewDocument()
        .WithLayout(doc)
        .WithData("model", data)
        .BuildBytesAsync();
}
```

---

## Encryption Levels

### 40-bit Encryption (PDF 1.3)

- Supported by very old PDF readers
- Weak by modern standards - use only when required

### 128-bit Encryption (PDF 1.4+)

- The default
- Supported by all modern PDF readers

AES encryption is not currently supported.

---

## Security Best Practices

### Passwords

- Never put passwords in templates, source code or configuration files - load them from a secret store (Azure Key Vault, AWS Secrets Manager, environment variables)
- Use long passwords with mixed characters
- Always set an owner password when you set restrictions, so they cannot simply be removed
- Use a different user password per recipient where documents are distributed

### Accessibility

Keep `accessibility` allowed (or `AllowAccessiblity = true`), so screen readers can still read secured documents.

---

## Try It Yourself

### Exercise 1: Security Profiles

Create read-only, confidential and form versions of the same template using `print-restrictions`.

### Exercise 2: Passwords from Configuration

Read the owner password from an environment variable, and apply it to every generated document.

### Exercise 3: Permission Tester

Generate a document with each permission turned off in turn, and check the result in two PDF viewers.

---

## Common Pitfalls

### ❌ Restrictions Without an Owner Password

Without an owner password, the restrictions can be removed by anyone with a PDF editor.

✅ **Solution:** Always set an owner password when restricting a document.

### ❌ Disabling Accessibility

```html
<meta name='print-restrictions' content='printing' />
```

✅ **Solution:** Include accessibility

```html
<meta name='print-restrictions' content='printing, accessibility' />
```

### ❌ Hard-Coded Passwords

```csharp
doc.RenderOptions.PasswordProvider = new DocumentPasswordProvider("admin");
```

✅ **Solution:** Load passwords from a secret store at runtime.

---

## Security Checklist

- [ ] Restrictions chosen for the document's audience
- [ ] Owner password set
- [ ] Accessibility allowed
- [ ] Passwords loaded from a secret store, not hard-coded
- [ ] Tested in more than one PDF viewer

---

## Security Limitations

**PDF Security is NOT:**
- Unbreakable (password-protected PDFs can be cracked)
- DRM (doesn't prevent screenshots)
- Perfect protection (determined users can bypass)

**PDF Security IS:**
- A deterrent for casual users
- Compliance with basic security requirements
- Protection for basic confidentiality

**For high security needs, consider:**
- Secure transmission channels (HTTPS, SFTP)
- Access control at distribution level
- Watermarks for traceability
- Digital signatures for authenticity

---

## Next Steps

1. **[Optimization & Performance](06_optimization_performance.html)** - File size and speed optimization
2. **[Production & Deployment](07_production_deployment.html)** - Production configuration

---

**Continue learning →** [Optimization & Performance](06_optimization_performance.html)
