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
    var map = { 'supported': '', 'partial': 'is-partial', 'partially supported': 'is-partial', 'not supported': 'is-no', 'new': 'is-new' };
    var cells = doc.querySelectorAll('.main-content td');
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var txt = c.textContent.trim().toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(map, txt) || c.querySelector('code, a')) continue;
      var span = doc.createElement('span');
      span.className = 'pw-support ' + map[txt];
      span.textContent = c.textContent.trim();
      c.textContent = '';
      c.appendChild(span);
    }
  }

  function ready() {
    bindTheme();
    bindSearchKey();
    buildToc();
    enhanceCode();
    markSupport();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', ready);
  else ready();
}());
