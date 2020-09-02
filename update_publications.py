from getpass import getpass
import psycopg2
import psycopg2.extras
import re

#
# Creates markdown file for a row in the database.
#
def create_md(row):
    with open(f"_publications/{row['date']}-{row['pubid']}.md", "w") as file:
        # Frontmatter prelude.
        file.write("---\n")

        # Layout.
        file.write("layout: publication\n")

        # Title.
        file.write(f"title: Darrell Long | {row['title']}\n")

        # Header (same as title but without the name).
        file.write(f"header: {row['title']}\n")

        # Permalink.
        file.write(f"permalink: /publications/{row['pubid']}/\n")

        # Authors.
        file.write(f"authors: {row['authors']}\n")

        # Date.
        file.write(f"date: {row['date']}\n")

        # File source.
        file.write(f"file: {row['file']}\n")

        # Excerpt (first two sentences of abstract).
        excerpt = ' '.join(re.split(r'(?<=[.:;])\s', row['abstract'])[:2])
        file.write(f"excerpt: >\n  {excerpt}\n")

        # Frontmatter postlude.
        file.write("---\n")

        # Abstract.
        file.write("\n# Abstract\n\n")
        file.write(f"{row['abstract']}\n")

        # BibTex.
        file.write("\n# BibTeX\n\n")
        file.write(f"```latex\n{row['bibtex']}\n```\n")

def main():
    try:
        conn = psycopg2.connect(
            user = "darrell",
            host = "darrell.soe.ucsc.edu",
            database = "website",
            password = getpass()
        )

        with conn:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            cursor.execute("SELECT * FROM public.publications;")

            for row in cursor:
                create_md(row)

    except (Exception, psycopg2.Error) as error:
        print("Error connecting PostgreSQL:", error)

    finally:
        if conn:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    main()
