# frozen_string_literal: true

require 'cgi'
require 'json'
require 'set'

# Writes a small redirect page at the old URL of every page that moved under /paperwork.core/.
#
# The sections quickstart, learning, reference, configuration and changelog used to live at the
# site root. They now live in paperwork.core/<section>/..., so e.g.
#   /reference/htmltags/elements/html_a_element.html
# redirects to
#   /paperwork.core/reference/htmltags/elements/html_a_element.html
#
# The redirects are derived from the pages themselves, so there is no list to maintain: remove a
# section from MOVED (or delete this file) once the old URLs no longer need to work.
module PaperworkDocs
  class MovedPageRedirects < Jekyll::Generator
    safe true
    priority :lowest

    MOVED = %w[quickstart learning reference configuration changelog].freeze
    PREFIX = 'paperwork.core/'

    def generate(site)
      taken = site.pages.map(&:url).to_set
      stubs = []

      site.pages.each do |page|
        path = page.path
        next unless path.start_with?(PREFIX)

        old_path = path.delete_prefix(PREFIX)
        next unless MOVED.include?(old_path.split('/').first)

        ext = File.extname(old_path)
        next unless ['.md', '.markdown', '.html'].include?(ext)

        old_html = ext == '.html' ? old_path : old_path.delete_suffix(ext) + '.html'
        old_url = "/#{old_html}".sub(%r{/index\.html\z}, '/')
        next if taken.include?(old_url)

        stubs << [old_html, page.url]
      end

      stubs.each { |old_html, new_url| site.pages << stub(site, old_html, new_url) }
      Jekyll.logger.info 'Redirects:', "#{stubs.size} moved-page redirects generated"
    end

    private

    def stub(site, old_html, new_url)
      dir = File.dirname(old_html)
      dir = '' if dir == '.'
      page = Jekyll::PageWithoutAFile.new(site, site.source, dir, File.basename(old_html))
      target = "#{site.baseurl}#{new_url}"
      canonical = "#{site.config['url']}#{target}"
      page.content = html(target, canonical)
      page.data['layout'] = nil
      page.data['sitemap'] = false
      page.data['search_exclude'] = true
      page.data['nav_exclude'] = true
      page
    end

    def html(target, canonical)
      e = ->(s) { CGI.escapeHTML(s) }
      <<~HTML
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Page moved</title>
          <meta name="robots" content="noindex">
          <link rel="canonical" href="#{e.call(canonical)}">
          <meta http-equiv="refresh" content="0; url=#{e.call(target)}">
          <script>location.replace(#{target.to_json} + location.search + location.hash);</script>
        </head>
        <body>
          <p>This page has moved to <a href="#{e.call(target)}">#{e.call(target)}</a>.</p>
        </body>
        </html>
      HTML
    end
  end
end
