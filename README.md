# Darrell's GitHub Page

## Publications

Publications go in ```_publications```. See any publication inside for a general
template. Each publication is given its own Markdown post for formatting.

## Assets

Assets, or static files, for the page go in ```assets```. This includes images,
PDFs, etc.

## Layouts

There are a couple layouts of note, each with its own purpose:
  - ```frontmatter.html```: for the side profile
  - ```page.html```: for displaying just the content of a markdown file,
  - ```pdf.html```: for displaying embedded PDFs
  - ```publication.html```: for displaying a publication
  - ```publications.html```: for formatting the display of all publications

## Navigation

Adding additional pages requires changing ```_config.yml```, under the
```navigation``` list, which should be self-explanatory. If the additional page
is to be on the same domain, a markdown or HTML file in the root directory
should be added as well (like with ```cv.md```).

## Credits

Credits to the ```plainwhite-jekyll``` gem for the base HTML/CSS.
