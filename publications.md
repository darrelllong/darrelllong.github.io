---
layout: frontmatter
title: Darrell Long | Publications
---

<script type="text/javascript">
  function filter(input) {
    var text = input.toLowerCase();
    var id = 1;
    {% assign publications = site.publications | reverse %}
    {% for publication in publications %}
      var content = {{
        publication.content | downcase | strip_html | jsonify
      }};
      var header = {{
        publication.header | downcase | strip_html | jsonify
        }};
      var date = {{
        publication.date | date: "%-d %B %Y" | downcase | strip_html | jsonify
      }};
      var authors = {{
        publication.authors | downcase | strip_html | jsonify
      }};
      var div = document.getElementById(id);
      div.style.display = (
        content.includes(text) || header.includes(text) || date.includes(text) ||
        authors.includes(text) || text == ""
      ) ? 'unset' : 'none';
      id += 1;
    {% endfor %}
  }
</script>

<ul class="posts">
  <li class="posts-labelgroup" id="posts-labelgroup">
    <h1 id="posts-label">Search</h1>
    <div class="search-container">
      <div class="search-section">
        <i class="icon-search"></i>
        <input type="text" name="search" id="text" oninput="filter(document.getElementById('text').value)">
      </div>
    </div>
  </li>

  {% assign id = 0 %}
  {%- assign date_format = site.darrell.date_format | default: "%B %-d, %Y" -%}
  <li>
    {% assign publications = site.publications | reverse %}
    {% for publication in publications %}
      {% assign id = id | plus: 1 %}
      <div id="{{ id }}">
        <a class="post-link" href="{{ publication.url | relative_url }}">
          <h3 class="post-title">{{ publication.header | escape }}</h3>
        </a>
        <div class="post-meta">
          <div class="post-authors">
            {{ publication.authors }}
          </div>
          <div class="post-date">
            <i class="icon-calendar"></i>
              {{ publication.date | date: date_format }}
          </div>
        </div>
        <div class="post">
          {%- if site.show_excerpts -%}
            {{ publication.excerpt }}
          {%- endif -%}
        </div>
      </div>
    {% endfor %}
  </li>
</ul>

