---
title: "Ceph and the SSRC"
date: "2026-09-20"
tags: ["research", "storage", "colleagues"]
excerpt: "Ceph’s origins in the SSRC, the earlier work on Swift and RAMA, and Sage Weil’s research and development of the file system."
---

Ceph came out of the [Storage Systems Research Center (SSRC)](https://www.ssrc.us/proj/exscale.html) at UC Santa Cruz, which Ethan Miller and I built together. I coauthored the [2006 Ceph paper](/publications/59/) with Sage Weil, Scott Brandt, Ethan Miller, and Carlos Maltzahn.

The research was sponsored as part of the Department of Energy’s Accelerated Strategic Computing Initiative (ASCI), through Gary Grider at Los Alamos National Laboratory (LANL), Steve Louis at Lawrence Livermore National Laboratory (LLNL), and Lee Ward at Sandia National Laboratories. Their support made this work possible.

## Swift and RAMA

The separation of metadata from data, with separate servers handling each, came from my work with Luis-Felipe Cabrera on Swift, beginning in 1989. A client obtained the information it needed from the metadata service and then transferred data directly to and from the storage servers. The metadata server did not have to carry the data traffic.

We presented this work at the [1991 Summer USENIX conference](/publications/227/). Our [Swift paper in Computing Systems](https://www.usenix.org/publications/compsystems/1991/fall_cabrera.pdf), also published in 1991, describes the architecture. The same separation later appeared in [IBM’s Storage Tank](https://www.usenix.org/legacy/events/fast02/wips/pease.pdf), which became IBM TotalStorage SAN File System.

Another part of Ceph’s history is Ethan’s Ph.D. work at Berkeley on [RAMA](https://www2.eecs.berkeley.edu/Pubs/TechRpts/1995/5206.html). RAMA used hashing to distribute data across storage devices. Ethan and his collaborators developed that line of research into [RUSH and CRUSH](https://www.ethanmiller.org/research/). CRUSH lets clients calculate where data belongs without consulting a central allocation directory, while accounting for replication, changes in the storage cluster, and the need to keep replicas in separate failure domains.

## Sage’s Work

Sage did brilliant work of his own in his dissertation, including scalable metadata management and the [CRUSH algorithm](https://ethanmiller.org/files/pubs/sc06.pdf). He then led the work of turning Ceph from a research file system into a storage system for production use. After his doctorate, he continued development with a team at DreamHost and cofounded Inktank to develop and support Ceph commercially. [Red Hat acquired Inktank in 2014](https://news.ucsc.edu/2018/01/year-of-alumni-weil-sage/).

Ceph is now used in some of the world’s [largest research and cloud storage installations](https://ceph.io/en/discover/vision/). Sage followed his research with years of engineering and led the developers and company that supported Ceph’s adoption.
