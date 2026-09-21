---
title: "Dr. Jehan-François Pâris"
date: "2026-02-14"
tags: ["biography"]
excerpt: "My doctoral advisor at UC San Diego and a longtime collaborator in replication, distributed systems, and storage reliability."
---

Dr. Jehan-François Pâris was my doctoral advisor at UC San Diego. We worked on replication in distributed systems: how to keep data available, maintain consistency, and understand the reliability of competing approaches. My dissertation, “The Management of Replication in a Distributed System,” grew out of that work. I have worked on storage systems ever since.

Dr. Pâris began his education in Belgium, earning an *Ingénieur Civil Chimiste* degree in chemical engineering from the Université Libre de Bruxelles in 1970. He then turned to computer science, completing a *Diplôme d'Études Approfondies* at the Université Pierre et Marie Curie in 1972 and *Licence* and *Maîtrise* degrees at the Facultés Universitaires Notre-Dame de la Paix in Namur in 1975. His [curriculum vitae](https://www2.cs.uh.edu/~paris/CV_short.pdf) records these degrees and his subsequent appointments.

He came to Berkeley for doctoral study with [Domenico Ferrari](/blog/2026-02-14-domenico-ferrari) and received his Ph.D. in Electrical Engineering and Computer Sciences in 1981. His dissertation examined restructuring techniques for optimizing virtual memory systems.

Dr. Pâris joined Purdue as an assistant professor in 1979 while completing his doctorate. He moved to UC San Diego in 1982 and remained there until 1988, when he joined the University of Houston as an associate professor. He became a full professor in 2003 and is now Professor Emeritus. He spent 1997–98 as a visiting associate professor at UC Santa Cruz and returned regularly for research visits.

His early work on replicated data included voting with witnesses, proposed in 1986. In that quorum-based scheme, lightweight witness records participate in determining the latest version of the data without storing a complete replica. This reduces storage costs while preserving fault tolerance. Voting with bystanders, introduced in 1989, developed the idea further.

We co-authored papers on optimistic dynamic voting and the performance of available copy protocols, using probabilistic models to compare replication strategies. Questions about availability, consistency, and the cost of redundancy continued into our later work on storage reliability.

That work encompassed erasure coding, RAID architectures, disk-failure prediction, and long-term protection of very large data stores. Dr. Pâris was part of the team that presented Alpha Entanglement Codes for archival storage at IEEE DSN in 2018. A paper on exabyte-scale reliable storage received the Best Paper Award at MASCOTS 2016. His Pirogue protocol, a lighter dynamic version of Raft, was a Best Paper Runner-Up at IPCCC 2015. Much of this research involved colleagues at UCSC's Storage Systems Research Center, including me.

Dr. Pâris also studied video-on-demand broadcasting in the late 1990s and early 2000s, developing protocols for delivering popular content efficiently to many viewers. Related work addressed scalable, reliable multicast.

He is a Senior Member of both the IEEE and the ACM and supervised doctoral students at UC San Diego and Houston over more than three decades. Through Ferrari, his academic lineage leads back to [Luigi Dadda](/blog/2026-02-14-luigi-dadda), [Ercole Bottani](/blog/2026-02-06-ercole-bottani), and [Angelo Barbagelata](/blog/2026-02-14-angelo-barbagelata).
