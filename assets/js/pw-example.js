/* pw-example.js — behaviour for the tabbed example component (_includes/example.html).
   - ARIA tabs with keyboard support
   - code tabs fetch their source on first open and highlight it (no innerHTML: text only)
   - the Example tab is rendered by the Paperwork viewer through er.js, using the same
     three source files sent inline (pw.show layouts/styles/datas). The viewer is only
     started when the example scrolls into view, so off-screen examples cost nothing. */
(function () {
  'use strict';

  function span(parent, cls, text) {
    if (!text) return;
    if (!cls) { parent.appendChild(document.createTextNode(text)); return; }
    var s = document.createElement('span');
    s.className = 'tk-' + cls;
    s.textContent = text;
    parent.appendChild(s);
  }

  // text that may contain {{expressions}}
  function withExpr(out, cls, text) {
    var re = /\{\{[\s\S]*?\}\}/g, last = 0, m;
    while ((m = re.exec(text))) {
      span(out, cls, text.slice(last, m.index));
      span(out, 'x', m[0]);
      last = m.index + m[0].length;
    }
    span(out, cls, text.slice(last));
  }

  function highlightHtml(src, out) {
    var tag = /(<!--[\s\S]*?-->)|(<![^>]*>)|(<\/?)([A-Za-z][\w:-]*)((?:\s+[^\s=<>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)(\s*\/?>)|(\{\{[\s\S]*?\}\})/g;
    var attr = /(\s+)([^\s=<>\/]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g;
    var last = 0, m;
    while ((m = tag.exec(src))) {
      span(out, null, src.slice(last, m.index));
      last = m.index + m[0].length;
      if (m[1]) { span(out, 'c', m[1]); continue; }
      if (m[2]) { span(out, 'c', m[2]); continue; }
      if (m[7]) { span(out, 'x', m[7]); continue; }
      span(out, 'p', m[3]);
      span(out, 't', m[4]);
      var a, al = 0, attrs = m[5] || '';
      attr.lastIndex = 0;
      while ((a = attr.exec(attrs))) {
        span(out, null, a[1]);
        span(out, 'a', a[2]);
        if (a[3]) { span(out, 'p', a[3]); withExpr(out, 's', a[4]); }
        al = attr.lastIndex;
      }
      span(out, null, attrs.slice(al));
      span(out, 'p', m[6]);
    }
    span(out, null, src.slice(last));
  }

  function highlightCss(src, out) {
    var i = 0, depth = 0, j;
    function stop(from, inBlock) {
      var k = from;
      while (k < src.length) {
        var c = src.charAt(k);
        if (c === '{' || c === '}' || (inBlock && c === ';') || src.substr(k, 2) === '/*') break;
        k++;
      }
      return k;
    }
    function value(text) {
      var re = /(#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:pt|px|em|rem|mm|cm|in|%)?)/g, last = 0, m;
      while ((m = re.exec(text))) {
        span(out, null, text.slice(last, m.index));
        span(out, 'n', m[0]);
        last = m.index + m[0].length;
      }
      span(out, null, text.slice(last));
    }
    while (i < src.length) {
      var ch = src.charAt(i);
      if (src.substr(i, 2) === '/*') {
        j = src.indexOf('*/', i + 2); j = j < 0 ? src.length : j + 2;
        span(out, 'c', src.slice(i, j)); i = j; continue;
      }
      if (ch === '{') { span(out, 'p', ch); depth++; i++; continue; }
      if (ch === '}') { span(out, 'p', ch); depth = Math.max(0, depth - 1); i++; continue; }
      if (ch === ';') { span(out, 'p', ch); i++; continue; }
      if (depth === 0) {
        j = stop(i, false);
        span(out, 't', src.slice(i, j)); i = j; continue;
      }
      j = stop(i, true);
      var decl = src.slice(i, j), d = /^(\s*)([\w-]+)(\s*:\s*)([\s\S]*)$/.exec(decl);
      if (d) {
        span(out, null, d[1]);
        span(out, d[2].indexOf('--') === 0 ? 'x' : 'a', d[2]);
        span(out, 'p', d[3]);
        value(d[4]);
      } else { span(out, null, decl); }
      i = j;
    }
  }

  function highlightJson(src, out) {
    var re = /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b/g, last = 0, m;
    while ((m = re.exec(src))) {
      span(out, null, src.slice(last, m.index));
      last = m.index + m[0].length;
      if (m[1]) { span(out, m[2] ? 'a' : 's', m[1]); span(out, 'p', m[2] || ''); }
      else if (m[3]) span(out, 'n', m[3]);
      else span(out, 'n', m[4]);
    }
    span(out, null, src.slice(last));
  }

  var highlighters = { html: highlightHtml, css: highlightCss, json: highlightJson };

  function loadCode(pre) {
    if (pre.getAttribute('data-loaded')) return;
    pre.setAttribute('data-loaded', '1');
    var code = pre.querySelector('code');
    fetch(pre.getAttribute('data-src'), { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (text) {
        var out = document.createDocumentFragment();
        (highlighters[pre.getAttribute('data-lang')] || span.bind(null, out, null))(text.replace(/\s+$/, ''), out);
        code.textContent = '';
        code.appendChild(out);
      })
      .catch(function () {
        pre.removeAttribute('data-loaded');
        code.textContent = 'Could not load this source file.';
      });
  }


  // ── Rendered example (viewer via er.js, inline content) ───────────────────

  function getText(url) {
    return fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error(url + ' ' + r.status);
      return r.text();
    });
  }

  // each top-level key of the data file becomes one named data source ("model" -> {{model.x}})
  function toDatas(jsonText) {
    var obj = JSON.parse(jsonText);
    return Object.keys(obj).map(function (k) {
      return { name: k, content: JSON.stringify(obj[k]), format: 'json' };
    });
  }

  function mountViewer(el) {
    if (el.getAttribute('data-mounted')) return;
    el.setAttribute('data-mounted', '1');
    if (typeof window.pw === 'undefined') { el.setAttribute('data-failed', '1'); return; }
    var name = el.getAttribute('data-name');
    var height = el.getAttribute('data-height') || '520px';
    var template = el.getAttribute('data-template');
    if (template) {
      // published template: the id is used as-is; collection only for private ones
      var collection = el.getAttribute('data-collection');
      window.pw.init({ container: el, name: name, ui: 'Minimal', zoom: 'FullWidth', height: height });
      window.pw.show(collection ? { name: name, template: template, collection: collection } : { name: name, template: template });
      return;
    }
    Promise.all([getText(el.getAttribute('data-html')), getText(el.getAttribute('data-css')), getText(el.getAttribute('data-json'))])
      .then(function (src) {
        window.pw.init({ container: el, name: name, ui: 'Minimal', zoom: 'FullWidth', height: height });
        window.pw.show({
          name: name,
          layouts: [{ name: 'main', content: src[0], format: 'html' }],
          styles: [{ name: 'invoice.css', content: src[1], format: 'css' }],
          datas: toDatas(src[2])
        });
      })
      .catch(function () { el.removeAttribute('data-mounted'); el.setAttribute('data-failed', '1'); });
  }

  function watchViewer(root) {
    var el = root.querySelector('[data-pwx-viewer]');
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { mountViewer(el); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); mountViewer(el); } });
    }, { rootMargin: '200px' });
    io.observe(el);
  }

  window.pwExample = { mount: mountViewer };

  function select(root, tab) {
    var tabs = root.querySelectorAll('.pwx-tab');
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i] === tab;
      tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
      tabs[i].tabIndex = on ? 0 : -1;
      var panel = document.getElementById(tabs[i].getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
      if (on && panel) {
        var pre = panel.querySelector('.pwx-code');
        if (pre) loadCode(pre);
      }
    }
  }

  function init(root) {
    watchViewer(root);
    var tabs = Array.prototype.slice.call(root.querySelectorAll('.pwx-tab'));
    tabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () { select(root, tab); });
      tab.addEventListener('keydown', function (e) {
        var n = -1;
        if (e.key === 'ArrowRight') n = (idx + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') n = (idx + tabs.length - 1) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n >= 0) { e.preventDefault(); tabs[n].focus(); select(root, tabs[n]); }
      });
    });
  }

  function ready() {
    var roots = document.querySelectorAll('[data-pwx]');
    for (var i = 0; i < roots.length; i++) init(roots[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
}());
