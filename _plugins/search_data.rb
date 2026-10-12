# frozen_string_literal: true

require 'cgi'
require 'fileutils'
require 'json'

# Writes /assets/js/search-data.json from the *rendered* pages.
#
# The theme builds this file from each page's markdown source, so snippets showed raw markdown
# (## headings, backticks, table pipes) and headings inside code samples became separate "sections".
# This builds it from the HTML each page actually produces: code blocks are left out, the markup is
# stripped, and each h2/h3 becomes a section that links to its anchor.
#
# Format (the one the theme's search script reads):
#   { "0": { "doc": page title, "title": section heading, "content": text, "url": ..., "relUrl": ... }, ... }
module PaperworkDocs
  module SearchData
    SECTION_TAGS = /(<h[23]\b[^>]*>.*?<\/h[23]>)/m.freeze
    MAX_CONTENT = 1800

    module_function

    def build(site)
      docs = {}
      index = 0

      site.pages.each do |page|
        next unless page.data['title'] && page.data['search_exclude'] != true
        next unless page.output.is_a?(String) && page.output_ext == '.html'

        body = main_content(page.output)
        next if body.nil?

        body = clean(body)
        parts = body.split(SECTION_TAGS)
        intro = parts.shift.to_s

        add = lambda do |title, content, anchor|
          text = to_text(content)
          docs[index.to_s] = {
            'doc' => page.data['title'].to_s,
            'title' => title,
            'content' => text[0, MAX_CONTENT],
            'url' => "#{site.baseurl}#{page.url}#{anchor ? "##{anchor}" : ''}",
            'relUrl' => "#{page.url}#{anchor ? "##{anchor}" : ''}"
          }
          index += 1
        end

        add.call(page.data['title'].to_s, intro, nil)

        parts.each_slice(2) do |heading, content|
          next if heading.nil?

          title = to_text(heading)
          next if title.empty?

          anchor = heading[/\bid="([^"]+)"/, 1]
          add.call(title, content, anchor)
        end
      end

      docs
    end

    def main_content(html)
      start = html.index('id="main-content"')
      return nil unless start

      from = html.index('>', start)
      return nil unless from

      stop = html.index('<footer class="pw-footer">', from) || html.length
      html[(from + 1)...stop]
    end

    def clean(html)
      html = html.gsub(%r{<pre\b.*?</pre>}m, ' ')
      html = html.gsub(%r{<details class="top-toc".*?</details>}m, ' ')
      html = html.gsub(%r{<(script|style|svg|noscript)\b.*?</\1>}m, ' ')
      html = html.gsub(%r{<div class="pwx\b.*?<div class="pwx-foot">.*?</div>\s*</div>}m, ' ')
      html.gsub(%r{<h1\b[^>]*>.*?</h1>}m, ' ')
    end

    def to_text(html)
      text = html.to_s.gsub(%r{</(p|li|tr|div|h[1-6])>|<br\s*/?>}, ' ').gsub(/<[^>]+>/, ' ')
      CGI.unescapeHTML(text).gsub(/\s+/, ' ').strip
    end
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  docs = PaperworkDocs::SearchData.build(site)
  dir = File.join(site.dest, 'assets', 'js')
  FileUtils.mkdir_p(dir)
  File.write(File.join(dir, 'search-data.json'), JSON.generate(docs))
  Jekyll.logger.info 'Search:', "#{docs.size} sections indexed from the rendered pages"
end
