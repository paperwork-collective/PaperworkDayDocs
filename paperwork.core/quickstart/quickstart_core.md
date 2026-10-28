---
layout: default
title: Quick Start
nav_order: 1
has_children: true
has_toc: false
parent: Paperwork.Core
parent_url: /paperwork.core/
---


# Library Quick Start
{: .no_toc}

Follow along if you want to understand some of the key features and benefits of the Paperwork.Core library. Here we add the package and build out a data template with dynamic styling and some repeating content. Based on your knowledge level you may then want to dive straight into your own use-cases to complete, or review the reference section to understand supported features.

---

<details class='top-toc' markdown="block">
  <summary>
    On this page
  </summary>
  {: .text-delta }
- TOC
{: toc}
</details>

---

## Application Type

If you don't have an existing application, or platform you want to add Paperwork.Core to, then create a new console application.

```bash
dotnet new console -n HelloPaperwork
cd HelloPaperwork
```

Paperwork.Core can be run and loaded from executables in all platforms that run dotnet, including client side Blazor WASM, but in this example we will not cover the outer execution.

Consult your own IDE documentation if you are not sure how to do this, or follow the [Learning Guides](/paperwork.core/learning/) articles.

---

## Adding Paperwork.Core

The easiest way to get started is to add the NuGet package to a new or existing project, either from your IDE or from the command line in the project folder.

```bash
dotnet add package Paperwork.Core
```

The package is located at [https://www.nuget.org/packages/Paperwork.Core](https://www.nuget.org/packages/Paperwork.Core)

It brings in everything needed to generate documents, including the open-source Scryber engine that does the layout and rendering.

---

## Create a template file

The first thing we can do is add a simple html template file (the ubiquitous Hello World) as a starter and call the file 'hello.html'.

#### hello.html
{: .no_toc}
```handlebars
{% raw %}<!-- the namespace is important  -->
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <!-- Give it a title -->
    <title>Hello World</title>
</head>
<!-- a bit of styling -->
<body style='margin: 20pt'>
    <!-- A heading title -->
    <h1>Hello, World</h1>

    <!-- custom style support -->
    <p class='intro'>
      This is my first dynamic PDF generated with Paperwork.Core.
    </p>
</body>
</html>{% endraw %}
```

Save the file in your project, and we can move on to generate our first PDF in code.


---


## Generate our first template


At an appropriate location within your code (in the main function, responding to an event, or handling a web request) add the following.

#### PDF Generation
{: .no_toc}
```csharp
using Paperwork;

//Create a factory once, and re-use it for every document you generate
using var factory = PaperworkFactory.Create().Build();

//Start a new document, give it the template you saved, and write the PDF file
await factory.NewDocument()
             .WithLayoutFile("hello.html")
             .SaveAsync("hello.pdf");
```

The factory is the entry point to the library. Each call to `NewDocument()` returns a fluent builder that collects the layout, styles and data, and then generates the document when you call one of the output methods.

| Method | Returns |
|---|---|
| `SaveAsync(path)` | Writes the PDF to a file. |
| `BuildBytesAsync()` | The PDF as a `byte[]`, to stream to a response or store. Throws if generation fails. |
| `BuildAsync()` | A `PaperworkResult` with `Success`, `Message` and `Error`, plus the generated `Document.Binary`. |

The layout can also be given as a string with `WithLayout(html)`, a `Stream`, or a remote address with `WithLayoutUrl(url)`.

---

## Viewing the result

The resultant file should now be able to be opened in any PDF Viewer application or browser, and should look like this.

![Hello World Preview](../assets/sampleImages/HelloWorld1.png)


---

## Troubleshooting

If it didn't work at all, then check the package and the template structure (it needs to be valid xml and include the namespace).

If it did work, but doesn't look like it should, then you can see what the library is doing by turning on the log. Any errors and messages are then added as pages at the end of the output.

```csharp
using Paperwork.Generation;

await factory.NewDocument()
             .WithLayoutFile("hello.html")
             .WithLogLevel(PaperworkRequestLogOption.Messages)
             .SaveAsync("hello.pdf");
```

The levels are `Off` (the default), `Errors`, `Warnings`, `Messages` and `Verbose`.


---

## Making it dynamic

This is fine, but not exactly dynamic! We can add a little more 'pizzazz' with some data. We can do anything we want between parsing, setting content, adding components (tables, lists, sections etc), updating styles and much more.

But - one of the core principles of **Paperwork** is a clear *separation of data*, from layout and style. So we can add a named data object to the document, which the template can access during processing.

#### Add our user
{: .no_toc}
```csharp
await factory.NewDocument()
             .WithLayoutFile("hello.html")
             //set the 'user' to an instance value
             .WithData("user", new { firstName = "John", lastName = "Smith" })
             .SaveAsync("hello.pdf");
```

The data can be any object, or a JSON string, stream or file.

```csharp
await factory.NewDocument()
             .WithLayoutFile("hello.html")
             .WithData("user", "{ \"firstName\": \"Jane\", \"lastName\": \"Doe\" }")
             .SaveAsync("hello.pdf");

//or .WithDataFile("user", "user.json")

```
---

### Content binding syntax

The template databinding syntax is based on `{% raw %}{{handlebars}}{% endraw %}`, which can appear in the content, or within attribute values. 

```html{% raw %}
<h1>Hello {{user.firstName}}</h1>
{% endraw %}```

The library supports the standard 'dot' notation to access inner values (along with indexors '[]' for arrays and dictionarys).

---

### Personalize the template

So we can update our template to use this data within the content.

#### Adding expressions
{: .no_toc}
```handlebars
{% raw %}<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <!-- Give it a title using the value if it is available -->
    <title>Hello {{user.firstName ?? "World"}}</title>
</head>
<body style="margin: 20pt;">
<!-- complex expression with function support -->
<h1>Hello, {{concat(user.firstName, " ", user.lastName) ?? "World"}}</h1>

<p class='intro'>
    This is {{(user.firstName + "'s") ?? "my"}} first dynamic PDF generated with Paperwork.Core.
</p>
</body>
</html>
{% endraw %}```

---

### With dynamic content

Generating the output we should have custom values placed **naturally** within the document.

![Hello World with values](/assets/sampleImages/HelloWorld2.png)

---

## Style binding syntax

Along with content, the template styles can be 'bound' to dynamic values using the well known `var()` and `calc()` functions.

```html{% raw %}
<h1 style='color: var(brand.mainColor, black)'>Hello {{concat(user.firstName, " ", user.lastName)}}</h1>
{% endraw %}```

And these can either be used directly, or indirectly through css variables, within the template styles, or referenced stylesheets.

```html{% raw %}
<style>
    :root{
        --brand-bg : var(brand.lightColor, transparent);
    }

    .branded{
        background-color : var(--brand-bg);
        color: var(brand.mainColor);
    }
</style>
{% endraw %}```

---

## Looping through content.

The library also uses the standard `{% raw %}{{#each items}}{% endraw %}` and `{% raw %}{{#if test}}{% endraw %}` expressions for loops and decisions.
The current item within the loop can be accessed using the `this` reference. 

```html{% raw %}
{{#if count(container.items) > 0 }}
{{#each container.items}}<span class='item'>{{this.property}}</span><{{/each}}>
{{/if }}
{% endraw %}```

---

## Extending our sample

If we add more data to our user - a role and some skills with a level - and also add some custom branding.

#### Add our user
```csharp
await factory.NewDocument()
             .WithLayoutFile("hello.html")
             //set the user to an instance (or JSON) value
             .WithData("user", new { firstName = "John", lastName = "Smith", role = "Engineering Lead",
                                     emailAddress = "j.smith@company.com", profilePicture = "",
                                     skills = new[] {
                                         new { name = "C Sharp", level = 90 },
                                         new { name = "JavaScript", level = 75 },
                                         new { name = "Scrum master", level = 60 },
                                         new { name = "Team leader", level = 80 } } })
             //add some custom style information.
             .WithData("brand", new { mainColor = "#5980a6", darkColor = "#1f3347", lightColor = "#e8eef4" })
             .SaveAsync("hello.pdf");
```

---

## Update the template

We can now make some changes to our template and use the provided data to create a more useful template. Including:

- remote fonts from Google ('Barlow' and 'Barlow Condensed') and icons from Font Awesome
- css variables from the brand data, with fallback defaults
- a header band with a diagonal gradient, and positioned, rotated and transparent text
- a decision for a profile picture, or an icon if there isn't one
- a clickable email link
- a collection function to count the skills, shown in a rotated stamp with a radial gradient
- a two column list of skills, each with a gradient level bar sized from the data
- a fallback when there are no skills

```handlebars
{% raw %}<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
    <!-- Give it a title -->
    <title>Hello {{concat(user.firstName, " ", user.lastName) ?? "World"}}</title>
    <!-- Remote fonts from google, and icons from font-awesome -->
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600&amp;family=Barlow+Condensed:wght@500;700&amp;display=swap" rel="stylesheet" />
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.css' />
    <style>
        /* css variables from the brand properties, with fallback defaults */
        :root{
            --brand-color: var(brand.mainColor, #5980a6);
            --brand-dark: var(brand.darkColor, #1f3347);
            --brand-bg: var(brand.lightColor, #e8eef4);
        }
        body{ font-family: 'Barlow', Arial, Helvetica, sans-serif; margin: 0; color: #1d1f20; font-size: 11pt; }

        /* header holds the band and the overlapping picture */
        .head{ position: relative; height: 150pt; }

        /* a header band with a diagonal gradient, and everything inside it positioned */
        .band{ position: relative; height: 150pt; overflow: hidden; color: white;
               background: linear-gradient(135deg, var(--brand-dark), var(--brand-color)); }
        .band .watermark{ position: absolute; right: -10pt; top: -40pt; font-family: 'Barlow Condensed';
               font-weight: 700; font-size: 170pt; color: white; opacity: 0.08; transform: rotate(-8deg); }
        .band .kicker{ position: absolute; left: 30pt; top: 34pt; width: 300pt; font-size: 9pt; letter-spacing: 2pt; text-transform: uppercase; opacity: 0.8; }
        .band .title{ position: absolute; left: 30pt; top: 48pt; margin: 0; font-family: 'Barlow Condensed'; font-weight: 700; font-size: 44pt; }
        .band .title a{ color: white; text-decoration: none; }
        .band .role{ position: absolute; left: 30pt; top: 104pt; font-size: 12pt; opacity: 0.9; }

        /* profile picture overlapping the bottom edge of the band */
        .profile-picture{ position: absolute; right: 40pt; top: 105pt; width: 80pt; height: 80pt; border-radius: 40pt;
               object-fit: cover; border: solid 4pt white; background-color: var(--brand-bg); }
        div.profile-picture{ font-size: 40pt; color: var(--brand-color); text-align: center; line-height: 80pt; }

        .content{ position: relative; padding: 30pt; }
        .email{ font-size: 11pt; margin-bottom: 30pt; }
        .email a{ color: var(--brand-dark); }
        .email i{ color: var(--brand-color); margin-right: 4pt; }

        /* a rotated stamp with a radial gradient fill */
        .stamp{ position: absolute; right: 52pt; top: 80pt; width: 60pt; height: 60pt; border-radius: 30pt;
               border: dashed 1.5pt var(--brand-color); text-align: center; color: var(--brand-dark);
               background: radial-gradient(circle, white, var(--brand-bg)); transform: rotate(-12deg); }
        .stamp b{ display: block; font-family: 'Barlow Condensed'; font-size: 26pt; padding-top: 8pt; }
        .stamp span{ font-size: 7pt; letter-spacing: 1.5pt; text-transform: uppercase; }

        h2{ font-family: 'Barlow Condensed'; font-weight: 500; font-size: 16pt; color: var(--brand-dark);
            border-bottom: solid 1pt var(--brand-color); padding-bottom: 4pt; margin: 0 0 12pt 0; width: 60%; }

        /* skills in two columns, each with a gradient level bar */
        .skills{ column-count: 2; column-gap: 24pt; list-style: none; margin: 0; padding: 0; width: 60%; }
        .skills li{ margin-bottom: 12pt; }
        .skills .level{ float: right; color: var(--brand-color); font-size: 9pt; }
        .skills .track{ height: 4pt; margin-top: 3pt; background-color: var(--brand-bg); }
        .skills .fill{ height: 4pt; background: linear-gradient(90deg, var(--brand-color), var(--brand-dark)); }
    </style>
</head>
<body>
<div class="head">
<div class="band">
    <div class="watermark">Hello</div>
    <div class="kicker">Hello, my name is</div>
    <!-- make the name a clickable email link -->
    <h1 class="title"><a href="mailto:{{user.emailAddress}}">{{concat(user.firstName, " ", user.lastName) ?? "World"}}</a></h1>
    <div class="role">{{user.role}}</div>
</div>

<!-- Only include the picture if it exists, otherwise fall back to an icon -->
{{#if (length(user.profilePicture) > 0) }}
    <img src='{{user.profilePicture}}' class='profile-picture'/>
{{else}}
    <div class="profile-picture"><i class='far fa-user'></i></div>
{{/if}}
</div>

<div class="content">
    <div class="email"><i class="far fa-envelope"></i><a href="mailto:{{user.emailAddress}}">{{user.emailAddress}}</a></div>

    <!-- if we have skills, show a count stamp and loop through them -->
    {{#if count(user.skills)}}
        <div class="stamp"><b>{{count(user.skills)}}</b><span>Skills</span></div>
        <h2>What {{user.firstName}} brings</h2>
        <ul class="skills">
            {{#each user.skills}}
                <li>{{this.name}} <span class="level">{{this.level}}%</span>
                    <div class="track"><div class="fill" style="width: {{this.level}}%;"></div></div>
                </li>
            {{/each}}
        </ul>
    {{else}}
        <div><em>{{user.firstName}} has no known skills</em></div>
    {{/if}}
</div>
</body>
</html>
{% endraw %}```

## Checking the result

Hopefully you are able re-generate and see the following output.

<div class='pdf-container' data-pw-container='quick-start-styled' data-pw-template='RaXBkrp7dQpSwiXIBjQm' data-pw-zoom='FullWidth' style='height:400pt' ></div>

We have added a lot into the template - looping, gradients, transforms, columns, images, links, styles, functions, positioning, remote fonts and stylesheets.
But the static styles can be moved to a separate linked file (or added with `.WithStyleFile("styles.css")`), and the actual body is only about 35 lines long, and quite readable.

---

## Returning a PDF from a web request

In an ASP.NET application, register the factory with dependency injection once at startup.

```csharp
using Paperwork.Generation;

builder.Services.AddPaperwork(builder.Configuration);
```

Then ask for an `IPaperworkFactory` wherever you need it, and return the bytes as the response.

```csharp
app.MapGet("/hello", async (IPaperworkFactory factory) =>
{
    var pdf = await factory.NewDocument()
                           .WithLayoutFile("hello.html")
                           .WithData("user", new { firstName = "John", lastName = "Smith" })
                           .BuildBytesAsync();

    return Results.File(pdf, "application/pdf", "hello.pdf");
});
```

---

## What's next

This has been a quick dive into the capabilities of the core engine. There is still a lot that is possible!

- The [Factory](/paperwork.core/quickstart/factory.html) and the [Document Builder](/paperwork.core/quickstart/builder.html) - every option for setting up the factory and building documents

- [Data binding functions](/paperwork.core/learning/02-data-binding/) and the [reference](/paperwork.core/reference/binding) listing

- Dynamic [SVG drawings and charts](/paperwork.core/learning/06-content/02_svg_basics/) and the [reference](/paperwork.core/reference/svgelements) contents.

- [Typography and fonts](/paperwork.core/learning/05-typography/) for using the standard fonts, and including [custom fonts](/paperwork.core/reference/cssselectors/selectors/css_font_face_rule).

- [Tables](/paperwork.core/learning/04-layout/06_tables) and [Lists](/paperwork.core/learning/06-content/04_lists) in pages with binding.

- Updating and modifying existing PDFs using [Framesets and Frames](/paperwork.core/reference/htmltags/elements/html_frameset_frame_element)

- [Page sizes](/paperwork.core/learning/04-layout/01_page_sizes_orientation) and column layout.

- [Embedding content and Attachments](/paperwork.core/learning/06-content/07_attachments_embedded) in files.

- Complete CSS property support [reference](/paperwork.core/reference/cssproperties)

- Security, permissions and document meta-data [output](/paperwork.core/learning/07-configuration/)

- [Logging](/paperwork.core/learning/07-configuration/02_logging) and Tracing output.

---

**Or just jump into the [Learning Guides](/paperwork.core/learning/) to take you through each feature in turn.**



