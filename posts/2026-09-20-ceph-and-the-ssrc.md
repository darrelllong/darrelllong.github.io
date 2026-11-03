---
title: "Ceph and the SSRC"
date: "2026-09-20"
tags: ["research", "storage", "colleagues"]
excerpt: "Ceph’s roots in Swift, Storage Tank, and RAMA, the Tri-Labs’ support, the students’ research, and a journey that came full circle at IBM."
---

Ceph came out of the [Storage Systems Research Center (SSRC)](https://www.ssrc.us/proj/exscale.html) at UC Santa Cruz, which Dr. Ethan Miller and I built together. I coauthored the [2006 Ceph paper](/publications/59/) with Dr. Sage Weil, Dr. Scott Brandt, Dr. Ethan Miller, and Dr. Carlos Maltzahn.

Ceph has strong roots in the storage architecture work I began with Dr. Luis-Felipe Cabrera on Swift in 1989 and later carried into IBM Storage Tank. I helped design all three systems. Ethan brought his work at Berkeley on RAID-II and RAMA to the SSRC. The original design work for the proposal that became Ceph took place on the board in our lab in Baskin Engineering, room 308.

## Swift

Felipe and I began Swift at IBM Almaden in 1989. Felipe was at IBM’s Almaden Research Center and I was at UC Santa Cruz. Our first publications appeared in 1991. We presented [“Exploiting Multiple I/O Streams to Provide High Data-Rates”](/publications/227/) at the Summer USENIX conference in June, and [“Swift: A Storage Architecture for Large Objects”](/publications/4/) at the Symposium on Mass Storage Systems that October. The full architecture appeared in [*Computing Systems*, volume 4, number 4](https://www.usenix.org/publications/compsystems/1991/fall_cabrera.pdf), also in 1991.

The two biggest ideas were **using objects** and **separating data from metadata**. Swift’s storage agents held the data and managed their local storage. A separate service, which we called the storage mediator, managed directory information, access rights, and the information needed to locate and transfer an object. The client’s distribution agent obtained a transfer plan from the mediator, then moved the data directly to or from the storage agents. The mediator did not have to carry the data traffic.

Swift striped large objects across multiple storage agents and transferred their pieces in parallel. We could combine the bandwidth of several disks and network connections while leaving each storage agent responsible for its own devices. These were the architectural ideas we later drew on for Ceph.

Swift’s early funding came from Lawrence Livermore National Laboratory (LLNL) and the National Science Foundation (NSF). The [awards listed in my CV](/cv.pdf) were \$15,183 from LLNL for 1991–92 and \$68,955 from NSF for 1991–93. A whopping \$15,000 from Livermore helped start a line of work that lasted decades. Bruce Montague, Felipe, and I subsequently developed [Swift/RAID](/publications/176/), published in *Computing Systems* in 1994, adding distributed RAID fault tolerance to the implementation.

I carried Swift’s separation of data from metadata into **IBM Storage Tank** as one of its architects. I was a [visiting scientist at IBM Almaden from 1995 to 2011](/cv.pdf). Bob Rees, David Pease, Randal Burns, Wayne Hineman, and I put the Storage Tank architecture together on the second floor of the B wing at IBM Almaden.

![The IBM Storage Tank team posing with motorcycles outside a building.](/images/ibm-storage-tank-team.jpg)

*The IBM Storage Tank team: architects, programmers, and staff.*

We put metadata and locking in separate services. Our [2002 Storage Tank paper](https://www.usenix.org/legacy/events/fast02/wips/pease.pdf) describes clients contacting those services, then reading and writing data directly on the storage area network (SAN). The metadata services coordinated access and maintained the shared file system; the bulk data traveled over the Fibre Channel SAN.

This allowed machines running AIX, Linux, and Windows to access the same file system concurrently. Their clients used a common metadata and locking service to keep their views consistent while accessing the shared storage directly. Storage Tank became [IBM TotalStorage SAN File System](https://home.cern/cern-openlab-adds-a-new-dimension-to-grid-computing/).

## RAID-II and RAMA

Ethan brought another important line of storage research to the SSRC. At Berkeley, he was part of the team that built [RAID-II](https://ethanmiller.org/files/pubs/isca94.pdf). The first RAID prototype had exposed a basic problem: an array of disks could supply more data than the host workstation’s memory system could move. RAID-II used a custom crossbar memory system, the XBUS board, to connect the disks to a high-speed network. Large data transfers could bypass the server workstation. This was another way to keep the machine controlling the storage from becoming the bottleneck for the data itself.

RAMA, **Rapid Access to Massive Archive**, addressed the problem of locating and distributing data across a parallel machine. Ethan and Dr. Randy Katz described it in their [1993 mass-storage paper](https://ethanmiller.org/files/pubs/mss93.pdf), and Ethan developed it in his [1995 dissertation, *Storage Hierarchy Management for Scientific Computing*](https://www2.eecs.berkeley.edu/Pubs/TechRpts/1995/5206.html). RAMA integrated disk with archival storage, treating disks as a cache for a larger store on tape or other tertiary media.

The crucial idea was to use hashing to determine placement. Given a file’s identifier and a block’s offset within that file, a node could calculate the destination node and the region of disk in which to look. It did not need to consult a central directory of block locations. The destination maintained the local information needed to find the block within that region. This reduced the shared state and coordination required to locate data, while distributing requests across many disks.

Randomized placement also addressed a problem with regular striping: an application’s access pattern could repeatedly hit the same subset of disks. RAMA’s goal was to provide useful parallel I/O performance across different access patterns without requiring every application to arrange its accesses around a particular disk layout. Ethan’s dissertation evaluated that approach using simulations with both real and synthetic workloads.

At Santa Cruz, Ethan and R. J. Honicky extended this line of work with [RUSH, Replication Under Scalable Hashing](https://www.ssrc.us/pub/honicky-ipdps04.html), published in 2004. RUSH calculated the placement of replicated objects across storage servers, accounted for servers with different weights, and limited data movement as the system changed. Clients could calculate locations independently, and replicas of an object went to different servers.

The [2006 CRUSH paper](https://www.ssrc.us/media/pubs/9c7bcd06ff4eeccef2cb4c7813fe33ba7d4805c7.pdf), by Sage Weil, Scott Brandt, Ethan Miller, and Carlos Maltzahn, explicitly builds on RUSH. CRUSH added a hierarchy describing the storage system and placement rules that could keep replicas in different failure domains, such as separate racks. Clients could calculate placement from an object identifier, the cluster map, and those rules. RAMA, RUSH, and CRUSH developed the idea of calculating where data belongs through successive generations of storage systems.

## The ASCI Proposal

The proposal that led to Ceph drew heavily on Swift. We worked out the original design on the board in the lab in Baskin 308, then took it into a proposal to the Tri-Labs: Lawrence Livermore National Laboratory (LLNL), Los Alamos National Laboratory (LANL), and Sandia National Laboratories. The funding came through the Department of Energy’s Accelerated Strategic Computing Initiative (ASCI). The original proposal, [*Scalable File Systems for High Performance Computing*](/pdfs/long-trilabs-asci-proposal-2001.pdf), is dated **June 1, 2001**.

The core architectural ideas were already there. We proposed a system built from thousands of object-based storage devices, which we called OBSDs, connected by high-speed networks. Each device would manage its own block allocation, free space, and local consistency. A request would identify a file and a range of bytes; the device would decide where those bytes belonged on its disks. That distributed the work of managing storage across the devices and allowed them to transfer data in parallel. It also allowed each device to check its own consistency, avoiding a serial check of the entire file system.

Metadata had its own cluster of servers, responsible for translating names into file identifiers and managing file attributes and high-level placement information. Section 2.2.1 states the reason directly: “storing it on a metadata server cluster separates data from metadata, allowing OBSD and metadata servers to be scaled independently.” The proposal called for clients to contact the metadata service when opening or closing a file, then transfer data directly to the storage devices. Reads and writes would not have to pass through the metadata servers. The [architecture diagram on page 4](/pdfs/long-trilabs-asci-proposal-2001.pdf#page=4) shows the metadata cluster, storage devices, supercomputers, visualization systems, and remote clients sharing a network.

We were designing for the laboratories’ post-Purple requirements: two petabytes of data, with sustained transfer rates of 100 GB/s to 1 TB/s. The same storage system had to serve large simulations, interactive visualization, and workstations accessing small files. A POSIX interface would let existing applications use the shared data. We proposed building a prototype from commodity components, initially with two metadata servers and eight storage devices, and testing its scalability on larger installations at the laboratories.

The [division of work in Section 2.4](/pdfs/long-trilabs-asci-proposal-2001.pdf#page=8) assigned me the metadata-server software, workload characterization, and coordination with the Tri-Labs. Ethan was to lead the storage-device software, and Scott the client file-system software. Patrick Mantey, Alexandre Brandwajn, and Katia Obraczka were also named in the proposal. We had hoped they would participate, but they had other priorities and did not work on the project. The proposal also identified me as one of the architects of IBM Storage Tank, recording the connection between that work and the system we were proposing.

Our friends at the laboratories helped us make it happen: Gary Grider at LANL, Steve Louis at LLNL, and Lee Ward at Sandia. The proposal names Steve as our primary technical contact and describes an existing ASCI Level 3 collaboration on object-based storage that we planned to fold into the larger project.

The [grant history in my CV](/cv.pdf#page=5) records the funding for this next stage: **\$65,000 from LLNL for 2001–02** to build high-performance storage from commodity components, followed by **\$900,000 from the DOE Defense Programs Laboratories for 2002–05** for *Scalable File Systems for High Performance Computing*. The same project received another **\$250,000 for 2005–06**. The proposal was written in 2001; the larger Tri-Labs award is listed under its 2002–05 funded period. These awards supported the research that became Ceph, a decade after Livermore’s first small Swift grant.

Funding from the Department of Energy’s National Nuclear Security Administration (NNSA) did not make me popular in certain quarters of campus. I have written about that hostility in [*The War Criminals who invented Sensor Networks*](/blog/2026-10-28-a-proud-war-criminal/).

## Dr. Weil’s Research

Dr. Weil did brilliant research. His December 2007 dissertation, [*Ceph: Reliable, Scalable, and High-Performance Distributed Storage*](https://ceph.io/assets/pdfs/weil-thesis.pdf), developed three major contributions: adaptive distributed metadata management, the CRUSH placement algorithm, and a distributed object store that could maintain consistent data while devices failed and the cluster changed.

Metadata management was a substantial research problem in its own right. Dividing the directory tree among servers could preserve locality, but a fixed division could leave one server overwhelmed while others sat idle. Sage’s dynamic subtree partitioning moved responsibility for parts of the directory tree as the workload changed. The [2004 paper with Kristal Pollack, Scott Brandt, and Ethan Miller](https://www.ssrc.us/pub/weil-sc04.html) compared that approach with static partitioning and hashing through simulation, examining performance, scaling, and adaptation to changing workloads. It addressed how to distribute the work while preserving the relationships among directories, files, and permissions.

The dissertation extended this work to the storage and recovery of metadata. Sage embedded file metadata within directory objects, used journals to combine repeated updates, and divided large or busy directories into fragments that could be managed separately. He developed recovery protocols for failed metadata servers. These choices connected the on-disk representation to load balancing, consistency, and availability.

His work on [CRUSH](https://www.ssrc.us/media/pubs/9c7bcd06ff4eeccef2cb4c7813fe33ba7d4805c7.pdf) addressed the competing demands of balanced placement, fast calculation, limited movement when the cluster changed, and protection against failures affecting multiple devices. The hierarchy and placement rules made the physical organization of the storage system part of the algorithm. Its evaluation examined those tradeoffs, including the behavior of different structures used to select devices within the hierarchy.

The third contribution was [RADOS, the Reliable Autonomic Distributed Object Store](https://ceph.io/assets/pdfs/weil-rados-pdsw07.pdf). Sage, Andrew Leung, Scott Brandt, and Carlos Maltzahn published the RADOS paper in 2007. Storage devices shared responsibility for replication, detecting failures, and recovering data. Versioned cluster maps let clients and devices determine which view of the system an operation used, while a small monitor cluster maintained agreement on the authoritative map. Placement groups organized objects whose replicas were managed together. The research problem was to let devices act independently enough to scale while maintaining consistent reads and writes through failures and membership changes.

Sage evaluated these designs in a working Ceph prototype, studying metadata throughput, data distribution, I/O performance, and recovery. The dissertation brought algorithms, storage layout, distributed protocols, and experimental evaluation together into a substantial body of systems research.

The other students made important research contributions too. Lan Xue worked with us on the earlier Lazy Hybrid approach to metadata management. Feng Wang developed OBFS, a file system designed specifically for object-storage devices. Qin Xin studied reliability and distributed recovery, including how using available capacity and bandwidth across many disks could shorten recovery after a failure. Their papers appear in the references below, along with R. J. Honicky’s work on RUSH and Kristal Pollack’s work with Sage on metadata management.

Feng Wang, Qin Xin, and Bo Hong also worked with us and Tyce McLarty on characterizing scientific I/O workloads. Understanding those applications was part of designing the storage system: their traces exposed bursty access and the importance of large transfers and file sharing. The [March 2006 Ceph technical report](/publications/52/) includes Feng and Qin among its authors. The research program produced a series of contributions before the November 2006 OSDI paper brought the system together.

## Full Circle

After his doctorate, Sage continued Ceph’s development with a team at DreamHost and cofounded Inktank to develop and support it commercially. [Red Hat acquired Inktank in 2014](https://ceph.io/en/news/blog/2014/red-hat-to-acquire-inktank/). [IBM completed its acquisition of Red Hat in 2019](https://www.ibm.com/investor/news/ibm-completes-acquisition-of-red-hat).

Felipe and I started Swift at IBM. Swift helped shape both Storage Tank and Ceph. Sage carried Ceph forward and built a company around it. Red Hat bought the company, and IBM bought Red Hat. It all came home in the end.

## References

These papers trace the work leading to the 2006 Ceph paper, with the full author lists.

1. Luis-Felipe Cabrera and Darrell D. E. Long. [“Swift: Using Distributed Disk Striping to Provide High I/O Data Rates.”](https://www.usenix.org/publications/compsystems/1991/fall_cabrera.pdf) *Computing Systems* 4(4), 1991.

2. Ethan L. Miller and Randy H. Katz. [“RAMA: A Filesystem for Massively Parallel Computers.”](https://ethanmiller.org/files/pubs/mss93.pdf) *Twelfth IEEE Symposium on Mass Storage Systems*, 1993.

3. Ann L. Drapeau, Ken W. Shirriff, John H. Hartman, Ethan L. Miller, Srinivasan Seshan, Randy H. Katz, Ken Lutz, David A. Patterson, Edward K. Lee, Peter M. Chen, and Garth A. Gibson. [“RAID-II: A High-Bandwidth Network File Server.”](https://ethanmiller.org/files/pubs/isca94.pdf) *International Symposium on Computer Architecture (ISCA)*, 1994.

4. Darrell D. E. Long, Bruce R. Montague, and Luis-Felipe Cabrera. [“Swift/RAID: A Distributed RAID System.”](/publications/176/) *Computing Systems* 7(3), 1994.

5. D. A. Pease, R. M. Rees, W. C. Hineman, D. L. Plantenberg, R. A. Becker-Szendy, R. Ananthanarayanan, M. Sivan-Zimet, C. J. Sullivan, R. C. Burns, and D. D. E. Long. [“IBM Storage Tank: A Distributed Storage System.”](https://www.usenix.org/legacy/events/fast02/wips/pease.pdf) *Conference on File and Storage Technologies (FAST), Work-in-Progress presentation*, 2002.

6. Scott A. Brandt, Ethan L. Miller, Darrell D. E. Long, and Lan Xue. [“Efficient Metadata Management in Large Distributed Storage Systems.”](/publications/37/) *IEEE/NASA Goddard Conference on Mass Storage Systems and Technologies (MSST)*, 2003.

7. Qin Xin, Ethan L. Miller, Thomas J. E. Schwarz, Darrell D. E. Long, Scott A. Brandt, and Witold Litwin. [“Reliability Mechanisms for Very Large Storage Systems.”](/publications/38/) *MSST*, 2003.

8. R. J. Honicky and Ethan L. Miller. [“Replication Under Scalable Hashing: A Family of Algorithms for Scalable Decentralized Data Distribution.”](https://www.ssrc.us/pub/honicky-ipdps04.html) *International Parallel and Distributed Processing Symposium (IPDPS)*, 2004.

9. Feng Wang, Scott A. Brandt, Ethan L. Miller, and Darrell D. E. Long. [“OBFS: A File System for Object-Based Storage Devices.”](/publications/45/) *MSST*, 2004.

10. Feng Wang, Qin Xin, Bo Hong, Scott A. Brandt, Ethan L. Miller, Darrell D. E. Long, and Tyce T. McLarty. [“File System Workload Analysis for Large Scale Scientific Computing Applications.”](/publications/44/) *MSST*, 2004.

11. Qin Xin, Ethan L. Miller, and Thomas J. E. Schwarz. [“Evaluation of Distributed Recovery in Large-Scale Storage Systems.”](https://www.ssrc.us/pub/xin-hpdc04.html) *International Symposium on High Performance Distributed Computing (HPDC)*, 2004.

12. Sage A. Weil, Kristal T. Pollack, Scott A. Brandt, and Ethan L. Miller. [“Dynamic Metadata Management for Petabyte-Scale File Systems.”](https://www.ssrc.us/pub/weil-sc04.html) *ACM/IEEE Conference on Supercomputing (SC)*, 2004.

13. Sage A. Weil, Feng Wang, Qin Xin, Scott A. Brandt, Ethan L. Miller, Darrell D. E. Long, and Carlos Maltzahn. [“Ceph: A Scalable Object-Based Storage System.”](/publications/52/) *UCSC-SSRC-06-01*, March 2006.

14. Sage A. Weil, Scott A. Brandt, Ethan L. Miller, and Carlos Maltzahn. [“CRUSH: Controlled, Scalable, Decentralized Placement of Replicated Data.”](https://www.ssrc.us/media/pubs/9c7bcd06ff4eeccef2cb4c7813fe33ba7d4805c7.pdf) *SC*, 2006.

15. Sage A. Weil, Scott A. Brandt, Ethan L. Miller, Darrell D. E. Long, and Carlos Maltzahn. [“Ceph: A Scalable, High-Performance Distributed File System.”](/publications/59/) *Symposium on Operating Systems Design and Implementation (OSDI)*, November 2006.
