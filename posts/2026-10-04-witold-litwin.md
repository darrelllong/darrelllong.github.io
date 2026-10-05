---
title: "Dr. Witold Litwin"
date: "2026-10-04"
tags: ["biography", "research", "colleagues"]
excerpt: "Witold Litwin’s pioneering work on linear hashing, multidatabase systems, scalable distributed data structures, and many other fields—and the friendship that grew from it."
---

I first encountered Dr. Witold Litwin in print. In 1985, when I was a graduate student taking a course from Professor Walter Burkhard, I read Witold’s 1980 paper, “[Linear Hashing: A New Tool for File and Table Addressing](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=6Rbf6EUAAAAJ&citation_for_view=6Rbf6EUAAAAJ:u-x6o8ySG0sC).” I did not know him personally then. I have now known him for almost thirty years, and he has become my friend and collaborator.

Linear hashing remains his most famous contribution, but describing Witold simply as its inventor would give a very incomplete account of his work. His research has ranged across graph theory, electrical circuits, medical signal processing, dynamic file structures, database languages, transaction processing, multidatabase systems, object-oriented databases, distributed storage, error-correcting codes, cloud security, deduplication, and the foundations of the relational model. He even worked on a model of artificial life for the future Internet.

![Elisabeth and Witold Litwin](/posts/images/witold-elisabeth-paris.png)

*Elisabeth and Witold Litwin*

No account of Witold would be complete without Elisabeth, his beautiful and charming wife and the love of his life. He returned to then-communist Poland for her. I have heard other stories about that journey, some involving considerable adventure, but I have them only secondhand and will not repeat them.

## From Warsaw to France

Witold was born on June 11, 1946. He earned his Magister-Engineer degree in computer science from the Warsaw Polytechnic School in 1969. His thesis concerned structural numbers, an algebraic method for representing and analyzing graphs and electrical circuits. The prototype he built for that work was stored on IBM punched cards.

Later that year, he came to France on a French government fellowship at the Institut de Recherche en Informatique et en Automatique, then known as IRIA and later renamed INRIA. He completed a doctorate in informatics at the Université Paul Sabatier in Toulouse in 1971.

That doctoral work was far removed from the database research for which he later became known. He studied the digital processing of phonocardiograms, recordings of heart sounds used in diagnosing cardiac disorders. His system applied interactive vocoding, Fast Fourier Transform filtering, and what was then called pattern recognition to the diagnosis of aortic and subaortic stenosis. These techniques would now be described as signal processing and machine learning.

Witold worked as an engineer at the Compagnie d'Études et de Réalisations de Cybernétique Industrielle from 1972 to 1974 and then at the French Ministry of Employment. He returned to INRIA in 1977, first as a research engineer and eventually as Research Director. In 1979, he received the *Doctorat ès Sciences Mathématiques* from the Université Paris VI.

The chronology and appointments are recorded in his detailed [curriculum vitae](https://www.lamsade.dauphine.fr/~litwin/Cv-2017.pdf).

## Linear Hashing

Hash tables provide fast access to records by applying a function to a key to determine where its record belongs. Traditionally, a hash table or hash-organized file had a fixed number of buckets. When it became too full, increasing its size could require rebuilding the whole structure and redistributing every record.

Linear hashing removed that requirement. A file can expand gradually, splitting one bucket at a time rather than being reorganized all at once. The buckets are split in a predictable sequence, and the structure requires no separate directory recording which buckets have already been divided. It can also contract by reversing the process.

Witold presented “[Linear Hashing: A New Tool for File and Table Addressing](https://www.sigmod.org/publications/dblp/db/conf/vldb/Litwin80.html)” at the Sixth International Conference on Very Large Data Bases in 1980. The paper described files that could grow or shrink without the deterioration in access time and storage utilization that afflicted earlier methods.

The idea was not immediately obvious even to experts. Per-Åke Larson later recalled that Witold sent him an early version of the paper in 1979. Larson initially thought that splitting buckets in a fixed sequence, rather than splitting whichever bucket happened to overflow, must be a bad idea. The question inspired several years of his own research. His eventual conclusion was simple: “[I was wrong—it was a good idea](https://sigmodrecord.org/?download_id=6044&smd_process_download=1).”

Linear hashing inspired numerous variations and became a standard topic in database and data-structure courses. Implementations and descendants appeared in database systems and storage software. It also provided the foundation for much of Witold’s later research.

The influence of linear hashing can also be measured in software. The hashing package developed by Margo Seltzer at Berkeley selected Litwin’s algorithm, and Berkeley DB’s Hash access method explicitly implements extended linear hashing and cites his 1980 paper. Berkeley DB subsequently became one of the most widely deployed embedded database systems. [Its technical documentation](https://docs.oracle.com/database/bdb181/html/programmer_reference/hash_usenix.pdf) identifies Litwin’s work as the basis of the implementation.

Linear hashing and its distributed descendants have also been used in web caches. LH\*LH was implemented on clusters of workstations and evaluated for distributed web caching. These uses demonstrate a stronger form of influence than citation alone: algorithms originating in Witold’s research became components of systems used to store and retrieve real data. [An evaluation of LH\*LH](https://staff.fnwi.uva.nl/a.d.pimentel/artemis/sac01.pdf) describes that work.

His other work on dynamic storage structures included virtual hashing and trie hashing. These projects addressed the same fundamental problem from different directions: how to preserve fast access as a collection changes in size, without periodically stopping to rebuild everything.

## Multidatabase Systems

At INRIA, Witold was also working on distributed databases. He joined the SIRIUS pilot project in 1977 and directed parts of it from 1981 to 1983. In 1983, he became director of the SESAME project on multidatabase systems.

A conventional distributed database presents data spread across machines as parts of a single integrated database. A multidatabase system addresses a different problem: how to query several existing, autonomous databases together without requiring their owners to surrender control or make their schemas identical.

That idea seems natural now. Organizations routinely combine information held in separate systems, and most major database products provide some ability to reach data outside the local database. It was not the prevailing view in 1980, when the ambition was often to construct one integrated database, however large it needed to become.

The SIRIUS project produced early multidatabase prototypes, including MRDSM and SYSIDORE. They were demonstrated at the first International Symposium on Distributed Databases in Paris in 1980. Witold and his collaborators also developed languages for expressing queries across multiple databases and studied the semantic discrepancies that arise when independently designed systems use different structures or meanings for similar data.

Multidatabase systems became one of the principal lines of Witold’s research and one of the achievements later recognized by the ACM.

## Scalable Distributed Data Structures

In the early 1990s, Witold returned to linear hashing and asked how it could be extended from one machine to a changing collection of machines.

While visiting Hewlett-Packard Laboratories in Palo Alto, he worked with Marie-Anne Neimat and Donovan Schneider on LH\*, the first of what they called scalable distributed data structures. They presented it at ACM SIGMOD in 1993 and later published a fuller account in ACM *Transactions on Database Systems* as “[LH\*: A Scalable, Distributed Data Structure](https://www.lamsade.dauphine.fr/~litwin/tods.pdf).”

An LH\* file distributes its buckets among servers. As the file grows, buckets split and new servers can be added. There is no central directory through which every request must pass. Clients may temporarily have an outdated idea of where a record belongs, but a server can forward the request to the correct destination and provide information that lets the client improve its view.

The result was a distributed file that could expand without requiring applications to manage its changing physical arrangement. Hewlett-Packard patented the work.

Witold and his collaborators developed numerous extensions. RP\* applied related ideas to ordered data. LH\*RS used Reed–Solomon erasure-correcting codes to provide scalable availability when servers failed. That work, with Rim Moussa and Fr. Dr. Thomas Schwarz, S.J., appeared in ACM *Transactions on Database Systems*.

Other work led to SD-SQL Server, a prototype distributed database system in which growing tables could be repartitioned transparently across additional servers. Today this process is usually described as elastic sharding. The user continued to see one table while the system changed how and where its contents were stored.

## An Unusually Broad Research Career

The scale of Witold’s contribution is difficult to convey by listing his best-known projects. His work did not remain within one narrow research program, or even within databases.

He began with structural numbers for graphs and electrical circuits. Structural numbers provide an algebra through which circuits, trees, cuts, and related graph properties can be manipulated. His work extended the method to generalized structural numbers applicable to hypergraphs and included an implementation at a time when programs were still kept on punched cards.

His doctoral work then moved into medical computing. The phonocardiogram system combined interactive signal processing with automated classification. It sought to reduce work that otherwise required a physician to inspect heart-sound recordings manually for long periods. The combination of digital filtering, feature extraction, and classification anticipated a great deal of later biomedical signal analysis.

In database transaction processing, Witold and his collaborators studied *value dates*. A value date specifies when a transaction should commit—not merely a deadline before which it ought to finish. The distinction was especially relevant to large distributed transactions whose components had to act independently but become effective at a predictable time.

He worked on implicit joins, dynamic and inherited attributes, main-memory database systems, temporal databases, object-oriented query languages, heterogeneous database interoperability, and query processing across systems with incompatible schemas. Some of these subjects became established research areas. Others appeared in commercial systems under different names.

His work with Galois connections extended ideas from formal concept analysis to multivalued relational data. This led to proposed operations and aggregate functions for queries that were cumbersome or impossible to express in conventional SQL.

Witold also ventured well beyond ordinary database questions. In work on “Computer Life,” he and his collaborators considered an Internet populated by computational beings with their own identities and activities. These beings might eventually become aware of their existence and perhaps infer the existence of their creators. The model was recursive: human beings might themselves exist within a computation created at some higher level.

One paper on the subject became an invited USENIX presentation, and another was presented as a keynote at InfoJapan 1990. The other keynote speaker was Steve Jobs, who spoke about NeXT. This was how Witold met him.

His later work ranged from scalable virtual data structures for massive cloud calculations to encrypted databases, key recovery, searchable encrypted storage, data deduplication, and new foundations for relational systems.

These subjects differ greatly, but several questions recur. How can a system grow without disruptive reorganization? How can independently controlled systems cooperate without losing their autonomy? How can data remain available when components fail? How can a language express what its users mean with less procedural machinery? How can important work and information survive when the systems around them change?

Witold has published more than 200 papers. The breadth of that record is matched by the distinction of his collaborators. His coauthors have included Avi Silberschatz, Nick Roussopoulos, Gio Wiederhold, Sushil Jajodia, Tore Risch, William Kent, Marie-Anne Neimat, Donovan Schneider, James Menon, Thomas Schwarz, and Jehan-François Pâris, among many others. They came from leading universities and industrial laboratories, including Stanford, Yale, Maryland, George Mason, Hewlett-Packard Laboratories, IBM Almaden, and Microsoft Research. His publication record is not simply large; it connects several generations of database and storage research across academia and industry.

## Paris-Dauphine

Witold became a professor at the Université Paris IX Dauphine in 1989 and remained there until his retirement in 2014. He was director of the Centre d'Études et de Recherches en Informatique Appliquée, or CERIA, from 1997 to 2009. He is now Professor Emeritus and a member of LAMSADE.

He taught database systems at Dauphine for nearly twenty-five years. He also taught or gave extended courses at Stanford, Berkeley, Santa Clara, Linköping, Uppsala, and Dakar. His visiting appointments included Hewlett-Packard Laboratories, IBM Almaden, Microsoft Research, the University of California at Santa Cruz, and the Center for Secure Information Systems at George Mason University.

The list in his CV is remarkable not only for its length but for its geographic and intellectual range. He carried ideas among European and American universities, industrial research laboratories, and generations of students.

In 2001, Witold was elected an ACM Fellow “for pioneering research in dynamic storage structures, scalable distributed file structures and multidatabases.” He was the first ACM Fellow in France, an achievement of which he is intensely and justifiably proud. It is not buried in his curriculum vitae: immediately beneath his name, his [homepage](https://www.lamsade.dauphine.fr/~litwin/) announces “ACM-Fellow 2001 (1st ever in France).” He also preserves photographs and an amateur film of the 2009 ACM ceremony honoring leading European computer scientists. For Witold, the fellowship is recognition not of one isolated result, but of decades spent developing ideas that often preceded the systems eventually built from them.

## Our Work Together

In 2009, Witold was my first host when I went to Paris as a *professeur invité* at Dauphine. The visit became an annual habit for a number of years. What had begun with my encountering his work in a graduate course became a friendship, and the friendship became a collaboration.

Our common friend Fr. Dr. Thomas Schwarz, S.J., frequently connected our work. Thomas is one of my closest friends and someone with whom I particularly enjoy arguing theology.

Witold, Thomas, and I were among the authors of a paper on [reliability mechanisms for very large storage systems](/publications/38/). We later worked on deduplication, the process of avoiding the storage of repeated data. “[Combining Chunk Boundary and Chunk Signature Calculations for Deduplication](/publications/98/)” reused information computed while dividing data into chunks to strengthen the signatures used to identify identical chunks.

With Zhike Zhang and Deepavali Bhagwat, we also wrote “[Improved Deduplication through Parallel Binning](/publications/107/),” which reduced the amount of historical information a deduplication system had to examine. Witold, Jehan-François Pâris, and I later worked on [three-dimensional redundancy codes for archival storage](/publications/189/).

These projects brought together interests that had run through Witold’s career: hashing, distributed storage, scalability, and the protection of data.

## After Retirement

Witold became Professor Emeritus in September 2014, but retirement did not end his research.

His later work has included cloud database security, encrypted data, recoverable encryption keys, and scalable distributed virtual data structures. With Sushil Jajodia and Thomas Schwarz, he studied database systems that could operate on encrypted cloud data while limiting the exposure of plaintext.

He also returned to an idea he had proposed in 1992: relations containing both stored and inherited attributes. In the traditional relational model, a base relation contains stored attributes, while a view derives its attributes from other relations. Witold argued that a single relation could usefully contain both.

He revived the idea in depth after retirement, developing it into stored and inherited relations and, more recently, SIR SQL. The objective is to reduce the amount of explicit navigation and calculation required in ordinary SQL queries. His [official Dauphine profile](https://dauphine.psl.eu/recherche/cvtheque/profil/litwin-witold) lists publications on SIR SQL from 2024 and 2025. In 2026, the year he turned eighty, his homepage continued to announce new work.

## Remembering the Work

Witold has also created a [Virtual Computer History Museum](https://www.lamsade.dauphine.fr/~litwin/My%20Virtual%20Computer%20History%20Museum.htm). Its subject is the early history of distributed and multidatabase systems, particularly work done in Europe that survives only in reports, workshop proceedings, photographs, and other grey literature.

Search engines are poor custodians of history. Work that was never digitized, appeared in a language other than English, or remained in an institutional report can disappear from the record even when it influenced what followed. Witold’s museum preserves not only documents but the names of colleagues, students, engineers, and organizers whose work might otherwise be forgotten.

That concern with memory is characteristic of him. His homepage discusses ideas proposed too early, technologies rediscovered under different names, and people whose contributions deserve to remain visible. It also contains the occasional alligator, French terminological dispute, and characteristically dry aside.

I first knew Witold as the name attached to an elegant algorithm. Linear hashing alone would have been enough for a distinguished career. It is no longer what I think of first.

I think of Paris, our annual visits, the papers we wrote, Thomas, and the welcome Witold and Elisabeth extended to me. I think of a man whose curiosity repeatedly carried him beyond the boundaries of his previous work, who continued to develop ideas long after other people would have considered them complete, and who took equal care to remember the people who helped create them.
