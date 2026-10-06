---
title: "A Solutions Manual for Theory of Finite Automata"
date: "2026-10-06"
tags: ["automata-theory", "formal-languages", "education", "history"]
excerpt: "The story of the automata theory book I proposed to John Carroll as an undergraduate, the work he did to bring it to completion, and its new living solutions manual."
---

Some projects belong to more than one period of a life. [*Theory of Finite Automata*](/publications/152/) began with an idea I took to Professor John L. Carroll when I was an undergraduate at San Diego State University. It followed me into graduate school and through my doctorate. Prentice-Hall published the book in 1989, just after I finished my Ph.D.

![John Carroll standing beside his Sun-3 workstation](/posts/images/john-carroll-sun-3.jpg)

*John Carroll with his Sun-3, in the mid-1980s.*

The book now has a new companion: a [solutions manual](/publications/258/) that John and I have made available as a living edition.

## Beginning the Book

The book was my idea. As an undergraduate, I proposed to John that we write a textbook on automata theory. I am still surprised that he agreed. His willingness to take seriously such an ambitious proposal from an undergraduate made the book possible.

The subject's combination of machinery and abstraction had already captured me. Finite automata are simple enough to draw, simulate, and reason about directly, yet they lead almost immediately to deep questions: What can a machine recognize? When are two machines equivalent? How can a machine be minimized? What changes when memory is added? Where does decidability end?

Those questions gave the book its path. It begins with mathematical preliminaries and the definitions of finite automata, then moves through Nerode's theorem, minimization, nondeterminism, closure properties, regular expressions, transducers, grammars, pushdown automata, Turing machines, and decidability. The aim was not merely to catalogue models, but to show how definitions, constructions, and proofs fit together.

The work took years. While the manuscript continued, I left San Diego State for doctoral study at UC San Diego. Circumstances required me to finish the Ph.D. in four years. My dissertation research in distributed systems, together with teaching at UCSD and San Diego State, consumed my time. John took on the hard work of bringing the manuscript to completion. Its publication in 1989, immediately after the Ph.D., marked the end of one long apprenticeship and the beginning of another.

## Returning to It

Books written for paper do not age in quite the same way as their ideas. The mathematics remains useful, while the physical book becomes scarce and its production files become artifacts of an earlier technical world.

The [Automata Theory repository](https://github.com/darrelllong/Automata-Theory) is an effort to give the book a durable modern form. The text has been reconstructed in LaTeX from the surviving material, the figures restored, and the table of contents and index made navigable. The original Pascal programs are collected with corresponding Python 3 and Rust versions, so that the computational examples remain usable rather than merely historical.

This is restoration, but it is also revision. Errors can be corrected, notation can be made consistent, and improvements can be recorded openly. A repository gives the book something a printed edition could not have: a visible history after publication.

## The Solutions Manual

Exercises are part of the argument of a theoretical computer science book. They are where a reader has to turn a definition into a construction, recognize which theorem applies, and discover whether an apparently plausible proof actually works. A useful solution should do more than state an answer. It should expose the step that makes the problem tractable.

The new [*Solutions Manual for Theory of Finite Automata with an Introduction to Formal Languages*](/publications/258/) collects worked solutions across the book. It follows the chapters of the text, from the preliminary mathematics through finite-state machines, formal languages, pushdown automata, Turing machines, and decidability. It is intended for instructors, independent readers, and students who want to compare their reasoning with a complete argument after doing the work themselves.

Calling it a living edition matters. The manual is generated from source in the same public repository as the restored book. When a solution is clarified or corrected, the PDF can be rebuilt and pushed to the same location. The link on the publications page therefore continues to point to the current version rather than to a frozen copy on this site.

More than three decades separate the printed book from this manual. The subject connects those decades. Automata theory still offers one of the clearest introductions to the habits of theoretical computer science: define the machine precisely, prove what it can do, transform it without changing its language, and identify the boundary beyond which no algorithm can decide every case.

For me, the manual also completes something personal. A project I proposed to John Carroll as an undergraduate, and that he did the hard work of carrying to publication while I completed my doctorate, can now be read, built, corrected, and extended in public. That is a satisfying second life for a first book.
