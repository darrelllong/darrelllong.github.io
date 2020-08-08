---
layout: frontmatter
---

<script type="text/javascript">
  function filter(text_) {
    var text = text_.toLowerCase();
    var id = 1;
    {% assign publications = site.publications | reverse %}
    {% for publication in publications %}
      var pubContent = {{
        publication.content |
        downcase | strip_html | strip_newlines |
        remove_chars | escape | truncate:200 | jsonify
      }};
      var pubHeader = {{
        publication.header | escape |
        downcase | strip_html | strip_newlines |
        remove_chars | escape | truncate:200 | jsonify
      }};
      var pubDate = {{
        publication.date | date: "%-d %B %Y" | escape |
        downcase | strip_html | strip_newlines |
        remove_chars | escape | truncate:200 | jsonify
      }};
      var div = document.getElementById(id);
      div.style.display = (
        text == "" || pubContent.includes(text) || pubHeader.includes(text) ||
        pubDate.includes(text)
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
        <input type="text" name="search" id="text">
        <button id="button" style="display: none;" onclick="filter(document.getElementById('text').value)"></button>
        <script>
          var input = document.getElementById("text");
          input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              document.getElementById("button").click();
            }
          });
        </script>
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

