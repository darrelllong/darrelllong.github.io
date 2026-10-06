---
title: "A Solutions Manual for Theory of Finite Automata"
date: "2026-10-06"
tags: ["automata-theory", "formal-languages", "education", "history"]
excerpt: "I proposed an automata theory textbook to John Carroll when I was an undergraduate. The book now has a restored edition and a new solutions manual."
---

I proposed writing [*Theory of Finite Automata*](/publications/152/) to Professor John L. Carroll when I was an undergraduate at San Diego State University. I am still surprised that he agreed. Prentice-Hall published the book in 1989, just after I finished my Ph.D.

![John Carroll standing beside his Sun-3 workstation](/posts/images/john-carroll-sun-3.jpg)

*John Carroll with his Sun-3, in the mid-1980s.*

## Writing the Book

The book covers mathematical preliminaries, finite automata, Nerode's theorem, minimization, nondeterminism, closure properties, regular expressions, transducers, grammars, pushdown automata, Turing machines, and decidability.

The work took several years. I left San Diego State for doctoral study at UC San Diego before the manuscript was finished. Circumstances required me to complete the Ph.D. in four years. Between my research in distributed systems and teaching at UCSD and San Diego State, I had little time for the book. John did the hard work required to finish it.

## Restoring the Book

Printed copies became difficult to find, and the production files were obsolete. The [Automata Theory repository](https://github.com/darrelllong/Automata-Theory) contains a reconstruction of the book in LaTeX. The figures have been restored, and the table of contents and index are navigable. The original Pascal programs are included along with Python 3 and Rust versions.

The repository also provides a place to correct errors and maintain the book.

## The Solutions Manual

John and I have now prepared a [*Solutions Manual for Theory of Finite Automata with an Introduction to Formal Languages*](/publications/258/). It contains worked solutions organized by chapter. It is intended for instructors, independent readers, and students who want to check their work after attempting the exercises.

The manual is maintained in the same public repository as the book. When we correct or improve a solution, we rebuild the PDF and push it to GitHub. The link on the publications page therefore always points to the latest version.
