/* pw-site.js - behaviour for the Paperwork help layout.
   - light/dark toggle (the system setting is the default; a saved choice overrides it)
   - "/" focuses the search box
   - builds the "On this page" rail (wide screens) and drop-down (narrow screens) from the headings */
(function () {
  'use strict';

  var doc = document;

  // ── theme ──────────────────────────────────────────────────────────────────
  var light = doc.getElementById('pw-css-light');
  var dark = doc.getElementById('pw-css-dark');
  var systemDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function effectiveTheme() {
    var t = doc.documentElement.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return systemDark && systemDark.matches ? 'dark' : 'light';
  }

  function applyTheme(t) {
    if (!light || !dark) return;
    light.media = t === 'light' ? 'all' : 'not all';
    dark.media = t === 'dark' ? 'all' : 'not all';
    doc.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('pw-theme', t); } catch (e) { /* storage unavailable: the choice just won't persist */ }
  }

  function bindTheme() {
    var buttons = doc.querySelectorAll('.js-toggle-theme');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault();
        applyTheme(effectiveTheme() === 'dark' ? 'light' : 'dark');
      });
    }
  }

  // ── "/" focuses search ─────────────────────────────────────────────────────
  function bindSearchKey() {
    var input = doc.getElementById('search-input');
    if (!input) return;
    doc.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      var a = doc.activeElement, tag = a && a.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (a && a.isContentEditable)) return;
      e.preventDefault();
      input.focus();
    });
  }

  // ── on this page ───────────────────────────────────────────────────────────
  function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
  }

  function buildToc() {
    var content = doc.getElementById('main-content');
    var rail = doc.getElementById('pw-toc');
    var list = doc.getElementById('pw-toc-list');
    if (!content || !rail || !list) return;

    var found = content.querySelectorAll('h2, h3');
    var heads = [];
    for (var i = 0; i < found.length; i++) {
      var h = found[i];
      if (h.closest('.pwx, details, blockquote, .no_toc') || h.classList.contains('no_toc')) continue;
      if (!h.textContent.trim()) continue;
      heads.push(h);
    }
    if (heads.length < 2) return;

    var used = {};
    var items = [];
    heads.forEach(function (h) {
      if (!h.id) {
        var base = slug(h.textContent), id = base, n = 2;
        while (used[id] || doc.getElementById(id)) id = base + '-' + (n++);
        h.id = id;
      }
      used[h.id] = true;
    });

    function fill(target) {
      heads.forEach(function (h) {
        var li = doc.createElement('li');
        if (h.tagName === 'H3') li.className = 'pw-toc-sub';
        var a = doc.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/\s+/g, ' ').trim();
        li.appendChild(a);
        target.appendChild(li);
        items.push({ head: h, link: a });
      });
    }
    fill(list);

    // inline drop-down for narrow screens, placed before the first section heading
    var first = heads[0];
    var details = doc.createElement('details');
    details.className = 'pw-toc-inline';
    var summary = doc.createElement('summary');
    summary.textContent = 'On this page';
    var ul = doc.createElement('ul');
    ul.className = 'pw-toc-list';
    details.appendChild(summary);
    details.appendChild(ul);
    fill(ul);
    first.parentNode.insertBefore(details, first);

    rail.hidden = false;

    // highlight the section being read
    if (typeof IntersectionObserver === 'undefined') return;
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = null;
      for (var k = 0; k < heads.length; k++) { if (visible[heads[k].id]) { current = heads[k].id; break; } }
      if (current === null) {
        // nothing in the band: use the last heading that has scrolled past the top
        for (var j = heads.length - 1; j >= 0; j--) {
          if (heads[j].getBoundingClientRect().top < 120) { current = heads[j].id; break; }
        }
      }
      items.forEach(function (it) { it.link.classList.toggle('is-active', current !== null && it.head.id === current); });
    }, { rootMargin: '-80px 0px -65% 0px', threshold: 0 });
    heads.forEach(function (h) { io.observe(h); });
  }


  // ── code blocks: header with language + copy, and {{ }} expressions coloured ──
  function enhanceCode() {
    var blocks = doc.querySelectorAll('div.highlighter-rouge');
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (block.querySelector('.pw-code-head')) continue;
      var m = /language-([\w#+-]+)/.exec(block.className);
      var lang = m ? m[1] : 'text';
      var label = ({ csharp: 'C#', cs: 'C#', html: 'HTML', xml: 'XML', css: 'CSS', json: 'JSON', bash: 'Bash', shell: 'Bash', sh: 'Bash', js: 'JS', javascript: 'JS', yaml: 'YAML', plaintext: 'Text', text: 'Text' })[lang.toLowerCase()] || lang.toUpperCase();

      var head = doc.createElement('div');
      head.className = 'pw-code-head';
      var l = doc.createElement('span'); l.className = 'pw-code-lang'; l.textContent = label;
      var btn = doc.createElement('button');
      btn.type = 'button'; btn.className = 'pw-code-copy'; btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy ' + label + ' code to the clipboard');
      head.appendChild(l);
      var fileEl = block.hasAttribute('data-file') ? block : block.querySelector('[data-file]');
      if (fileEl) { var f = doc.createElement('span'); f.className = 'pw-code-file'; f.textContent = fileEl.getAttribute('data-file'); head.appendChild(f); }
      head.appendChild(btn);
      block.insertBefore(head, block.firstChild);

      (function (b, target) {
        b.addEventListener('click', function () {
          var text = target.querySelector('pre') ? target.querySelector('pre').innerText : target.innerText;
          function done() { b.textContent = 'Copied'; b.classList.add('is-copied'); setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('is-copied'); }, 1600); }
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
        });
      }(btn, block));

      // colour {{ expressions }} inside the highlighted text
      var walker = doc.createTreeWalker(block.querySelector('pre') || block, NodeFilter.SHOW_TEXT, null);
      var nodes = [], n;
      while ((n = walker.nextNode())) { if (n.nodeValue.indexOf('{{') >= 0) nodes.push(n); }
      nodes.forEach(function (node) {
        var re = /\{\{[\s\S]*?\}\}/g, text = node.nodeValue, last = 0, mm, frag = doc.createDocumentFragment(), any = false;
        while ((mm = re.exec(text))) {
          any = true;
          frag.appendChild(doc.createTextNode(text.slice(last, mm.index)));
          var sp = doc.createElement('span'); sp.className = 'pw-expr'; sp.textContent = mm[0]; frag.appendChild(sp);
          last = mm.index + mm[0].length;
        }
        if (!any) return;
        frag.appendChild(doc.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    }
  }

  // ── support markers: Supported / Partial / Not supported / New in table cells ──
  function markSupport() {
    var map = { 'supported': '', 'yes': '', 'partial': 'is-partial', 'partially supported': 'is-partial', 'not supported': 'is-no', 'no': 'is-no', 'new': 'is-new', 'scryber extension': 'is-ext', 'extension': 'is-ext' };
    var labels = { 'no': 'Not supported', 'yes': 'Supported', 'extension': 'Scryber extension' };
    var version = /^(since\s+|new in\s+)?v?\d+\.\d+(\.\d+)*\+?$/i;
    var cells = doc.querySelectorAll('.main-content td');
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var txt = c.textContent.trim().toLowerCase();
      if (c.querySelector('code, a')) continue;
      var known = Object.prototype.hasOwnProperty.call(map, txt);
      if (!known && !version.test(txt)) continue;
      var span = doc.createElement('span');
      span.className = 'pw-support ' + (known ? map[txt] : 'is-version');
      span.textContent = known && labels[txt] ? labels[txt] : c.textContent.trim();
      c.textContent = '';
      c.appendChild(span);
    }
  }


  // ── old "On this page" blocks: mark any that were written without the class so they are hidden ──
  function hideLegacyToc() {
    var all = doc.querySelectorAll('#main-content details');
    for (var i = 0; i < all.length; i++) {
      var d = all[i], sum = d.querySelector('summary');
      if (sum && /^\s*(on this page|table of contents)\s*$/i.test(sum.textContent) && !d.classList.contains('top-toc')) d.classList.add('top-toc');
    }
  }

  // ── tables scroll inside their own wrapper, so a wide table never widens the page ──
  function wrapTables() {
    var tables = doc.querySelectorAll('#main-content table');
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      if (t.closest('.table-wrapper')) continue;
      var w = doc.createElement('div');
      w.className = 'table-wrapper';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
      var heads = t.querySelectorAll('thead th');
      if (heads.length && heads.length <= 3) {
        w.classList.add('is-stack');
        var rows = t.querySelectorAll('tbody tr');
        for (var r = 0; r < rows.length; r++) {
          var cells = rows[r].children;
          for (var k = 0; k < cells.length && k < heads.length; k++) cells[k].setAttribute('data-label', heads[k].textContent.trim());
        }
      }
    }
  }

  // ── product sections that have no documentation yet are shown muted ──
  function markSoon() {
    var soon = ['/paperwork.view/', '/paperwork.design/', '/paperwork.cli/', '/paperwork.skill/'];
    var links = doc.querySelectorAll('.site-nav .nav-list-link');
    for (var i = 0; i < links.length; i++) {
      var path = links[i].getAttribute('href') || '';
      var item = links[i].parentNode;
      if (soon.indexOf(path) >= 0 && !(item.querySelector && item.querySelector('ul'))) links[i].classList.add('is-soon');
    }
  }

  // ── previous / next cards, in navigation order, in place of hand-written endings ──
  function buildPrevNext() {
    var content = doc.getElementById('main-content');
    if (!content || content.querySelector('.pw-prevnext') || doc.querySelector('.is-wide')) return;
    var here = location.pathname.replace(/index\.html$/, '');
    var links = Array.prototype.slice.call(doc.querySelectorAll('.site-nav a.nav-list-link')).filter(function (a) { return !a.classList.contains('is-soon'); });
    var at = -1;
    for (var i = 0; i < links.length; i++) { if (links[i].pathname.replace(/index\.html$/, '') === here) { at = i; break; } }
    if (at < 0) return;
    var nav = doc.createElement('nav');
    nav.className = 'pw-prevnext';
    nav.setAttribute('aria-label', 'Previous and next pages');
    function card(a, label) {
      var el = doc.createElement('a'); el.setAttribute('href', a.getAttribute('href'));
      var sm = doc.createElement('small'); sm.textContent = label;
      var sp = doc.createElement('span'); sp.textContent = a.textContent.replace(/\s+/g, ' ').trim();
      el.appendChild(sm); el.appendChild(sp); nav.appendChild(el);
    }
    if (at > 0) card(links[at - 1], 'Previous');
    if (at < links.length - 1) card(links[at + 1], 'Next');
    if (!nav.children.length) return;
    if (nav.children.length === 1 && at === 0) nav.style.gridTemplateColumns = '1fr';
    content.appendChild(nav);
  }

  // ── cancel: clear the search and close the results (the same as pressing Esc) ──
  function bindSearchCancel() {
    var btn = doc.querySelector('.pw-search-cancel'), input = doc.getElementById('search-input');
    if (!btn || !input) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      input.value = '';
      var ev = new Event('keyup', { bubbles: true });
      ev.keyCode = 27;                 // the theme's search listens for the Esc key code
      input.dispatchEvent(ev);
      input.blur();
      btn.blur();
    });
  }

  // ── search results: section label, title, snippet and an arrow, as in the design ──
  var KICKERS = { 'paperwork.core': 'Paperwork.Core', 'paperwork.view': 'Paperwork.View', 'paperwork.design': 'Paperwork.Design', 'paperwork.cli': 'Paperwork.CLI', 'paperwork.skill': 'Paperwork.Skill' };
  var AREAS = { reference: 'Reference', learning: 'Learning', quickstart: 'Quick Start', configuration: 'Configuration', changelog: 'Change Log' };
  var REF = { htmltags: 'HTML Elements', htmlattributes: 'HTML Attributes', cssproperties: 'CSS Properties', cssselectors: 'CSS Selectors', svgelements: 'SVG Elements', svgattributes: 'SVG Attributes', binding: 'Data Binding' };
  var CAP = 8;
  function kickerFor(relUrl) {
    var parts = (relUrl || '').split('/').filter(Boolean);
    if (!parts.length) return 'Home';
    var k = KICKERS[parts[0]] || 'Paperwork';
    if (parts[1] === 'reference') return 'Reference' + (parts[2] && REF[parts[2]] ? ' \u00b7 ' + REF[parts[2]] : '');
    return parts[1] && AREAS[parts[1]] ? k + ' \u00b7 ' + AREAS[parts[1]] : k;
  }
  function enhanceResults(box) {
    var items = box.querySelectorAll('.search-result');
    for (var i = 0; i < items.length; i++) {
      var r = items[i];
      if (r.getAttribute('data-pw')) continue;
      r.setAttribute('data-pw', '1');
      var rel = r.querySelector('.search-result-rel-url');
      if (rel) rel.textContent = kickerFor(rel.textContent);
    }
    var list = box.querySelector('.search-results-list');
    if (list && !list.getAttribute('data-pw')) {
      list.setAttribute('data-pw', '1');
      box.classList.remove('pw-show-all');
      var old = box.querySelectorAll('.pw-search-meta, .pw-search-keys');
      for (var o = 0; o < old.length; o++) old[o].parentNode.removeChild(old[o]);
    }
    if (list) {
      // the theme adds results in batches, so the cap and the count are refreshed as they arrive
      var total = items.length;
      for (var n = CAP; n < total; n++) if (!items[n].classList.contains('pw-extra')) items[n].classList.add('pw-extra');
      var meta = box.querySelector('.pw-search-meta');
      if (!meta) {
        meta = doc.createElement('div');
        meta.className = 'pw-search-meta';
        meta.appendChild(doc.createElement('span'));
        var keys = doc.createElement('div');
        keys.className = 'pw-search-keys';
        keys.innerHTML = '<span><kbd>\u2191</kbd> <kbd>\u2193</kbd> to move</span><span><kbd>\u21b5</kbd> to open</span><span><kbd>esc</kbd> to close</span>';
        box.appendChild(meta);
        box.appendChild(keys);
      }
      var shown = box.classList.contains('pw-show-all');
      var count = meta.firstChild, all = meta.querySelector('.pw-search-all');
      var label = total + (total === 1 ? ' result' : ' results');
      var text = total > CAP && !shown ? 'Showing ' + CAP + ' of ' + label : label;
      if (count.textContent !== text) count.textContent = text;
      if (total > CAP && !shown) {
        if (!all) {
          all = doc.createElement('button');
          all.type = 'button'; all.className = 'pw-search-all';
          all.addEventListener('click', function (e) { e.preventDefault(); box.classList.add('pw-show-all'); enhanceResults(box); });
          meta.appendChild(all);
        }
        var allText = 'See all ' + total + ' \u2192';
        if (all.textContent !== allText) all.textContent = allText;
      } else if (all) { meta.removeChild(all); }
    }
    var none = box.querySelector('.search-no-result');
    if (none && !none.getAttribute('data-pw')) {
      none.setAttribute('data-pw', '1');
      var input = doc.getElementById('search-input');
      var q = input ? input.value.trim() : '';
      none.textContent = '';
      var h = doc.createElement('div'); h.className = 'pw-noresult-title'; h.textContent = q ? 'No results for \u201c' + q + '\u201d' : 'No results';
      var p = doc.createElement('div'); p.className = 'pw-noresult-help'; p.textContent = 'Check the spelling, or try one of these:';
      var chips = doc.createElement('div'); chips.className = 'pw-noresult-chips';
      [['Quick Start', '/paperwork.core/quickstart/quickstart_core'], ['HTML Elements', '/paperwork.core/reference/htmltags/'], ['CSS Properties', '/paperwork.core/reference/cssproperties/'], ['Expression Functions', '/paperwork.core/reference/binding/']].forEach(function (c) {
        var a = doc.createElement('a'); a.className = 'pw-chip'; a.href = c[1]; a.textContent = c[0]; chips.appendChild(a);
      });
      none.appendChild(h); none.appendChild(p); none.appendChild(chips);
    }
  }
  function watchSearch() {
    var box = doc.getElementById('search-results');
    if (!box || typeof MutationObserver === 'undefined') return;
    new MutationObserver(function () { enhanceResults(box); }).observe(box, { childList: true, subtree: true });
  }

  function ready() {
    bindTheme();
    bindSearchKey();
    hideLegacyToc();
    wrapTables();
    markSoon();
    buildToc();
    enhanceCode();
    markSupport();
    watchSearch();
    bindSearchCancel();
    buildPrevNext();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', ready);
  else ready();
}());
