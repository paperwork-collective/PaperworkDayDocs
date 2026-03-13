---
layout: default
title: Change Log
nav_order: 100
has_toc: false
---


# Core Library Change Log
{: .no_toc}


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

## Version History

### Version 9

*Breaking change from anything on V6.0 or below.*

#### 9.2.0.3 - 22 Jan 2026
- Fixed styling issue when components are hidden using css.

#### 9.2.0.2 - 13 Nov 2025
- Fixed repeating raster background images with cover size.
- Added support for repeating SVG background images from Data urls


#### 9.2.0.0 - 6 Nov 2025
- Public release with all added features from the betas. Too many to list.
- The documentation is here [learning](https://www.paperworkday.info/learning/) 
- And the refererence section here [refererence](https://www.paperworkday.info/reference/)
        
---

### Version 9 pre-release

#### 9.1.2-rc.5/6 - 4 Nov 2025
- Couple of fixes for overflowing tables in a kept together parent
- SVG font-weight bold and light are now supported
- Fixed an issue with the reverse function.
        
#### 9.1.2-rc.4 - 3 Nov 2025
- Working modification of PDFs and templates using framesets and frames
- Support for SVG background images with opacity. 

#### 9.1.0.7-beta - 22 Sept 2025
- First release of framesets for trimming and merging documents. 
- Hiding variables that do not have any content.

#### 9.0.0.1-rc.3 - 26 May 2025
- Added extra html entity (&...;) values to match available sources.

#### 9.0.0.1-rc.2 - 22 May 2025
- Fixes for template parsing 
- Added data-content to the template element
- Minor fixes and unit test updates.
- Second release candidate.

#### 9.0.0.1-rc.1 - 13 May 2025
 - Minor fixes for layout. 
 - First release candidate.
        
#### 9.0.0.1-beta - 6 May 2025
- Fixed a minor layout issue with multiple footer elements
        
#### 9.0.0.0-beta - 6 May 2025
- Completely updated version for .NET 9.0 with support for html, css, svg and binding.
- WASM compatible package with remote asset and content requests.

NOTE: If upgrading, PLEASE CHECK THE OUTPUT of your documents before releasing.

---

### Version 8

#### 8.0.0.2-beta - 19 March 2025
Added a fix for the rounding of expression results on decimal and double values when the results are very small.

#### 8.0.0.1-beta - 17 Feb 2025
Updated to net8.0 sdk and dependancies updated to the latest stable versions.  

---

## Legacy Versions

### Version 6

#### 6.0.5.0-beta
Updated to net8.0 sdk and dependencies updated to latest version.

#### 6.0.4.0-beta
Big updates to whitespace handling, support for &amp;nbsp; and hyphens in line breaks.

#### 6.0.3.2-beta
Fix for prioritising parsing unit values in invariant culture on OS's set to non-invariant culture.

#### 6.0.3.1-beta
Minor fix for transforming svg components (that do not have explict position values).

#### 6.0.3.0-beta
Added fixes for parsing (x)html content on systems not running the english culture. All numeric values are expected to be in english decimal notation - e.g. 1,0234.56 for values in CSS, styles, svg etc.
Unit testing works for non-english. May be a couple of values / options missed but hoping not.
Added the AddRange option to top level component wrapping lists - (Rows, Cells, Items, etc.) that accepts an IEnumerable&lt;InnerType&gt; instance.

#### 6.0.2.1-beta
Added fix for large inline images. Tested SaveAsPDFAsync.

#### 6.0.1.1-alfa
Support for SaveAsPDFTimer, to check for asyncronous execution in a single threaded
application - blazor (or windows forms?), using asyncronous loading of http requests for css images, fonts etc).

#### 6.0.1.0-beta

We now support html - in many of its flavours, through the HTMLAgilityPack

Added parsing non-formal html documents and components from local and remote files (using the ParseHtml and ParseHtmlDocument on the Document class)
Added the data-content and data-content-type attributes to visual components so that html and xhtml content can be data bound into pages.
Added support for the hyphens css property and it's use in hypenating long text.

#### 6.0.0.16-beta

Some Big additions and fixes

Added support for the css counters (reset, increment and the counter(s) functions)
Added support for css content properties
Added support for css ::before and ::after selectors
Added support for relative units in styles e.g. 30% and 0.5em - not supported in calc() with multiple units e.g calc(50% - 5px) will not work.

A lot of layout tests to get everything working - precisely.


#### 6.0.0.14-beta

Added support for transformations including css transform property.

#### 6.0.0.12-beta

Changed the reference for ImageSharp to the 2.1.3 Nuget package, rather than the dll.
Checks added for support on thread culture in dates and numbers.

#### 6.0.0.10-beta

Added support for Netwtonsoft.Json and the System.Text.Json objects in binding expressions and templates too.
Along with adding SoryBy, MaxOf, EachOf, SelectWhere collection functions.

#### 6.0.0.5-beta

Updated to the .net 6.0 sdk, now with support for running as a web assembly with asyncronous loads of stylesheets, images and fonts.
Some TTC and TTF font files do not render glyfs correctly, but working for many fonts.

---

### Version 5

#### 5.1.0.2-beta

A major update that now fully supports expressions in attributes, css var and clac along with text, using the handlebars notation - {% raw %}{{...}}{% endraw %}
This includes support for simple mathematical expressions from the document variables as welll as functions such as 'concat', 'if(value, 'true', 'false')' or 'index() + model.property'

#### 5.0.7

Adding support for the float left and right within blocks along with css linear and radial gradients

#### 5.0.6.3

Fixes an issue with some TTF fonts on Windows (specifically azure) to look for the best character mapping table, and multi-span text not flowing well due to some changes to try and get float working.

#### 5.0.6

The April release is a bit of a catch up and fix with updates for:

- Supporting parsed JSON objects in binding - along with std types and dynamic objects.
- margin:value is applied to all margins even if explicit left, right etc. has been previously applied.
- Conformance is now carried through to templates, so errors are not indavertantly raised inside the template.
- Missing background images will not raise an error.
- Support for data images (src='data:image/..') within content - thanks Dan Rusu!
- Images are not duplicated within the output for the same source.


#### 5.0.5

Multiple enhancements including

- Embed and iFrame support.
- Binding speed improvements for longer documents.
- Support for border-left, border-right, etc
- Support for encryption and restrictions
- Support for base href in template files.
- Classes and styles on templates are supported.
- Added em, strong, strike, del, ins elements
- Html column width and break inside
- CSS and HTML Logging
- Fixed application of multiple styles with the same word inside
- Allow missing images on the document is now supported.
- Contain fill style for background images.

