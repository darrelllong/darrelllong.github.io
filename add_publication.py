from getpass import getpass
from tkinter import *
from tkinter.scrolledtext import ScrolledText
import tkinter
import psycopg2
import psycopg2.extras
import sys

labels = [
    "pubid",
    "title",
    "booktitle",
    "authors",
    "date",
    "file",
    "abstract",
    "bibtex",
    "type"
]

fields = {}
entries = {}

def create_form(window):
    scrollbar = Scrollbar(window)

    for r, label in enumerate(labels):
        fields[label] = Label(window, text=label)
        fields[label].pack(padx=10, pady=1)

        if label == "abstract" or label == "bibtex":
            entries[label] = ScrolledText(window, height=8, relief="solid")
        else:
            entries[label] = Entry(window)

        entries[label].pack(padx=10, pady=3)

    submit = Button(window, text="Add", fg="Black", bg="Red", command=add_pub)
    submit.pack(pady=6)

def add_pub():
    pubid = f"\'{entries['pubid'].get()}\'"
    title = f"\'{entries['title'].get()}\'"
    booktitle = f"\'{entries['booktitle'].get()}\'"
    authors = f"\'{entries['authors'].get()}\'"
    date = f"\'{entries['date'].get()}\'"
    file = f"\'{entries['file'].get()}\'"
    abstract = f"\'{entries['abstract'].get('1.0', tkinter.END)[:-1]}\'"
    bibtex = f"\'{entries['bibtex'].get('1.0', tkinter.END)[:-1]}\'"
    type = f"\'{entries['type'].get()}\'"

    query = (
        "INSERT INTO "
        "publications(pubid, title, booktitle, authors, date, file, abstract, bibtex, type) "
        f"VALUES ({pubid}, {title}, {booktitle}, {authors}, {date}, {file}, {abstract}, {bibtex}, {type});"
    )

    try:
        conn = psycopg2.connect(
            user = "darrell",
            host = "darrell.soe.ucsc.edu",
            database = "website",
            password = getpass()
        )

        with conn:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            cursor.execute(query)

    except (Exception, psycopg2.Error) as error:
        print("Error connecting PostgreSQL:", error)

    finally:
        if conn:
            cursor.close()
            conn.close()

    sys.exit(0)


window = Tk()
window.title("Publications Adder")
window.geometry("640x800")
window.minsize("640", "800")

create_form(window)

window.mainloop()
