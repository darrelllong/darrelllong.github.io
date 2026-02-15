---
title: "Jehan-François Pâris"
date: "2026-02-14"
tags: ["biography"]
excerpt: "From Belgium to Berkeley to Houston, with stops at Purdue and UC San Diego — my doctoral advisor."
---

Jehan-François Pâris is Belgian. His path to computer science was not direct. He started with an Ingénieur Civil Chimiste degree from the Université Libre de Bruxelles in 1970 — chemical engineering. He then earned a Diplôme d'Études Approfondies in computer science from the Université Pierre et Marie Curie (Paris VI) in 1972, followed by Licence and Maîtrise degrees in Computer Science from the Facultés Universitaires Notre-Dame de la Paix in Namur in 1975. He came to the United States for doctoral work and received his Ph.D. in Electrical Engineering and Computer Sciences from UC Berkeley in 1981, under [Domenico Ferrari](/blog/2026-02-14-domenico-ferrari). His dissertation was on restructuring techniques for the optimization of virtual memory systems.

He started at Purdue as an assistant professor in 1979, overlapping with the end of his Ph.D. In 1982 he moved to UC San Diego, where he stayed until 1988. In 1988 he joined the University of Houston as an associate professor, was promoted to full professor in 2003, and is now Professor Emeritus. He spent 1997–98 as a visiting associate professor at UC Santa Cruz and returned to UCSC regularly for research visits over the years.

His early research was in consistency models for replicated data in distributed systems. In 1986, he proposed voting with witnesses — a quorum-based scheme where lightweight witness records replace some full replicas, participating in votes to determine the latest version of data without carrying a full copy. This reduced storage overhead while preserving fault tolerance. He followed it in 1989 with voting with bystanders, a further refinement. These papers and the work that followed them — evaluating dynamic voting, available copy protocols, and their reliability trade-offs — established his reputation in fault-tolerant distributed systems.

I was one of his students at UC San Diego. My dissertation, "The Management of Replication in a Distributed System," grew directly out of this line of research. We co-authored papers on optimistic dynamic voting and on the performance of available copy protocols, comparing replication strategies using probabilistic models. That work shaped my own career in storage systems.

In later years, Pâris's research moved toward storage reliability at scale: erasure coding, RAID architectures, disk failure prediction, and the problem of keeping exabytes of data safe over long periods. He was part of the team that introduced Alpha Entanglement Codes for archival storage, presented at IEEE DSN in 2018. A co-authored paper on exabyte-scale reliable storage won the Best Paper Award at MASCOTS 2016. He also developed Pirogue, a lighter dynamic version of the Raft consensus algorithm, which was a Best Paper Runner-Up at IPCCC 2015. Much of this later work was done in collaboration with colleagues at UCSC's Storage Systems Research Center, including me.

He also worked on video-on-demand broadcasting protocols in the late 1990s and early 2000s, devising schemes for efficient delivery of popular video content to many users simultaneously, and on scalable reliable multicast.

Pâris is a Senior Member of both the IEEE and the ACM. He supervised Ph.D. students at both UCSD and Houston across more than three decades. The academic line runs from [Barbagelata](/blog/2026-02-14-angelo-barbagelata) to [Bottani](/blog/2026-02-06-ercole-bottani) to [Dadda](/blog/2026-02-14-luigi-dadda) to [Ferrari](/blog/2026-02-14-domenico-ferrari) to Pâris to me. He is my advisor.
