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


## Version 9

### 9.7 - 6 August 2026

Significant new version with more general support for CSS and HTML5 features including *major* improvements in **CSS flex, CSS grid, CSS table-xxx**. Along with support for **z-index**, **colgroup**, and **column-fill**.

#### Breaking Changes

- Image width and height attributes now **only** accept integer values, as intrinsic size hints. Providing a unit (`pt`, `px`, `%`, etc.) throws an exception. Move unit-based image sizing to `style`: `style="width: 400pt;"`.

#### New Features

- **CSS `aspect-ratio` property** sets a fixed width-to-height ratio on images and block elements. When only one CSS dimension is specified, the other is derived from the ratio.
- **Added `<colgroup>` and `<col>` table column elements** to wire column widths, background colours, and CSS styling directly on column definitions. Also supports the `span` attribute to apply styling across multiple consecutive columns.
- **Added `grid-template-areas` and `grid-area`** — define named layout regions and place items into them by name.
- **Added named grid lines** in `grid-template-columns`/`grid-template-rows` along with reference names in `grid-column` and `grid-row`.
- **Added grid `auto-fill` and `auto-fit` in `repeat()`** to fill a row with as many fixed-width tracks as will fit without specifying a count.
- **Added grid `grid-auto-columns` and `grid-auto-rows`** to control the size of implicitly created tracks when items overflow the declared grid.
- **Added grid `justify-content` and `align-content`** to distribute the grid along the inline and block axes when tracks are smaller than the container.
- **Added full support for `flex-basis`, `flex-direction`, `flex-flow`, `flex-grow`, `flex-shrink`** so flex containers now output as expected.
- **Added flex `align-items` in column direction** so flex containers now correctly support cross-axis alignment.
- **CSS `var()` and `calc()` in flex/grid** now work inside all CSS property values.
- **column-fill** support for reflowing content in a multi-column layout to match heights in each. Default is still `auto` to match existing behaviour on templates.
- **`z-index`** support for positioned content, so order of rendering can be controlled.
- **Added `FindMatch()`** to component that can execute a JQuery'esque search for any Components that match that query, returning a collection of results, and queries can be chained.

#### Fixes

- **SVG image min/max sizing** — `min-width`, `max-width`, `min-height`, `max-height` are now honoured for SVG images, with correct aspect-ratio preservation when only one axis is constrained.
- **SVG images clipping** — unsized SVG images (no `viewBox`, no declared dimensions) no longer clipped to 300×150 regardless of the `<img>` box size.
- **Page breaks** — a `page-break-after: always` followed immediately by `page-break-before: always` no longer inserts a redundant blank page between sections.
- **Grid page overflow** — continuation row gaps are stripped and height corrections propagate correctly across page breaks.
- **Grid row-span** cell height and row-gap border rendering fixed for multi-row spanning cells.
- **Flex wrap** — various fixes for inter-row padding/margin/border.
- **List overflow** — fixed infinite layout loop when an `<ol>`/`<ul>` overflows with zero visible contents.
- **Anonymous table wrapping** — anonymous `<tr>`/`<td>` insertion no longer absorbs insignificant whitespace nodes, preventing empty cells.
- **Font glyph table** — `PDFFontDefinition` now outputs the correct glyph offset count in the `bfrange` CMap table.
- **Infinite pagination** — fixed a case where a header or footer that itself requested a page break caused the layout engine to loop indefinitely.

---

### 9.6-beta - 15 May 2026

- NEW: Added support for display flex layout.
- NEW: Added support for display grid layout
- NEW: Added support for table-x layout
- NEW: Added support for z-index rendering
- NEW: Added support for column balancing
- Fixed an issue with with multiple returns

### 9.5 - 6 May 2026

*Breaking change - removed support for .NET Standard.*

As an upgrade to SixLabors.Imaging library 3+ we have now dropped support for dotnet standard.
This will hopefully not cause issues, but reach out if so.

- Added support for webp image formats, both lossy and lossless including alpha


### 9.3 - 21 April 2026
- CSS *initial* support on generic tags for 
    - display: flex, 
    - display: grid,
    - display: table-xxx.
- CSS support for table cell rowspan across multiple rows with overflow and stepping calculation.
- CSS support for border radius on individual columns ()
- CSS support for setting individual variable values from the document.Params item collections
- CSS Support for column rule styles on multi-column layouts.
- CSS support for contain sizing on background images.

- Code fix pre-pended whitespace on soft return lines with bindings.
- Code fixes for labeled page sizes and falling back to previous sizes afterwards.
- Code fixes for sizing and positioning of referenced (rather than inline) SVG images, via the img tag (including %age widths)
- Code throws an exception when a font is not matched, when running in strict mode.

- Configuration loading improved for console and forms applications.
- Configuration section added for Expressions, that supports custom functions.
- Configuration of custom image factories improved to support async remote loading.



### 9.2.0.3 - 22 Jan 2026
- Fixed styling issue when components are hidden using css.



### 9.2.0.2 - 13 Nov 2025
- Fixed repeating raster background images with cover size.
- Added support for repeating SVG background images from Data urls




### 9.2.0.0 - 6 Nov 2025
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

