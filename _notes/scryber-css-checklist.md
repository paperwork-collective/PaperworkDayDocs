# Scryber.Core - CSS properties to add (checklist)

Started 2026-10-26. Ordered in blocks, highest value first. Each item is done when it has: the parser/layout change, unit tests (including expressions where they apply), a reference page under `paperwork.core/reference/cssproperties/properties/`, an index entry, and a changelog line.

Status of each, as checked on 9.8.0-beta: none of these have any effect today (no parser), except where noted.

## Block 1 - Layout correctness and common print styling (high value)

- [x] `text-indent` (done 2026-10-26, commit 'Add the text-indent css property') - very small. The style key and layout support already exist (`TextFirstLineIndentKey`, `FirstLineInset`); only the CSS parser is missing.
- [x] `box-sizing` (done 2026-10-26) - FINDING: Scryber's default already includes the padding in the width (border-box like; the border is drawn inside and does not reduce the content). So `border-box` is accepted and is the default, and `content-box` is the new opt-in (adds padding + border). Not yet checked for flex items, grid items and table cells, which size some boxes their own way. Changing the default to browser sizing (content-box) is a v10 decision.
- [x] `border-collapse`, `border-spacing` - tables. (done 2026-10-26) Check `cellspacing`/`cellpadding` handling first. Medium.
- [x] `object-fit`, `object-position` on `<img>` (done 2026-10-26) - `fill`, `contain`, `cover`, `none`, `scale-down`. Medium; reuse the aspect-ratio and background-size logic.
- [x] `visibility: hidden` (done 2026-10-26; hidden blocks hide their whole subtree, so a visible child of a hidden block is not shown) - the element keeps its space but is not painted. There is no `visibility` CSS parser today (the `display: none` path is separate). Medium.

## Block 2 - Visual polish

- [x] `box-shadow` - start with offset, spread and colour (no blur), then consider blur. Medium.
- [x] `text-decoration-color`, `text-decoration-style`, `text-decoration-thickness` - the line is currently always drawn in the text colour. Small to medium.
- [x] `outline`, `outline-offset` (and `outline-color`, `-style`, `-width`) - drawn outside the border box, no layout space. Medium.
- [x] `text-shadow` - draw the text twice, offset (no blur at first). Medium.

## Block 3 - Text flow

- [x] `word-break`, `overflow-wrap`, `word-wrap` - break-all fills lines (no hyphen); others accepted (long words already break). Tests in TextFlow_Tests.
- [x] `text-overflow: ellipsis` / clip / string - nowrap + overflow hidden or clip. Single value only. Tests in TextFlow_Tests.

## Block 4 - Shorthands and noise reduction

- [x] `margin-block`, `padding-block`, `inset` (and `inset-block`, `inset-inline`) - shorthands over properties we already have. Small.
- [ ] `place-items`, `place-content`, `place-self`, `justify-self` - `justify-items` and `justify-self` do not exist yet either (only `justify-content`, `align-items`, `align-content`, `align-self`). Small to medium; grid-aware.
- [x] Accept and ignore `cursor`, `pointer-events`, `will-change`, `scroll-behavior` (consider `user-select`, `transition`, `animation`) - no warning, no effect. Trivial.

## Scheduled separately

- [ ] Global values `inherit`, `initial`, `unset`, `revert`, `revert-layer` - moderate; plan in the conversation of 2026-10-26 (marker value resolved when the full style is built; parsers report the keys they affect).
- [ ] CSS3 list styles replacing the `-pdf-li-*` properties - for v10. Stage 1 (`list-style-type` values, `list-style-position`, full `list-style` shorthand) could ship earlier.

## Notes

- Release as 9.8.x betas as each block completes.
- Pre-existing test failures to ignore: 3 remote-URL image tests, `Scryber.UnitLayouts` `Inline_20` and `Inline_22`.
