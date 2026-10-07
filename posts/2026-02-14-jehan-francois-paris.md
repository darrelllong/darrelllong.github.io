---
title: "Dr. Jehan-François Pâris"
date: "2026-02-14"
tags: ["biography", "research", "colleagues"]
excerpt: "My doctoral advisor at UC San Diego, the Gemini replicated file system, and a collaboration spanning nearly four decades and sixty-nine publications."
---

I came to UC San Diego after earning my undergraduate degree at San Diego State University. I was delighted when Professor Jehan-François Pâris invited me to become his Ph.D. student. He became my doctoral advisor, but that description is too narrow for a relationship that grew into nearly four decades of collaboration and friendship.

![Jehan-François Pâris](/posts/images/jehan-francois-paris-portrait.jpg)

*Jehan-François Pâris.*

## Becoming His Student

UC San Diego's computer science program admitted only ten Ph.D. students each year in those days. Admission was merely the first filter. We still faced the dreaded comprehensive examination, normally taken in the second year, and we were allowed only two attempts.

The result could be a pass at the Ph.D. level or at the M.S. level. The distinction was decisive: an M.S.-level pass meant that you completed a master's degree and left the doctoral program. The year I took the examination, only two of us passed at the Ph.D. level. I was one of them. The other student did not ultimately complete the Ph.D., and most of our cohort exited with an M.S. degree.

I also remember taking a computer architecture course from Jehan-François in which he discussed the minimization of sequential circuits. It occurred to me that a finite-state transducer could be minimized using essentially the same method used for a finite automaton. Instead of beginning by separating accepting from nonaccepting states, one begins by grouping states according to the outputs of the transducer and then refines those groups in the usual way. It was a connection that Jehan-François himself had not noticed.

The observation did not come from nowhere. I was still working with Professor John L. Carroll on our book, [*Theory of Finite Automata*](/publications/152/), which we had begun while I was an undergraduate at San Diego State. Prentice-Hall finally published it in 1989. My Ph.D. research, together with teaching at both UCSD and San Diego State, did not leave a great deal of free time for finishing a book.

Passing meant that I could get on with the work I had come to UCSD to do. I began working with Professor Pâris and Professor Walter A. Burkhard on Gemini, a replicated file system designed to remain available when sites or communication links failed.

Replication sounds simple until a system must decide which copy is current, what to do when machines cannot communicate, and how to recover after failures without presenting users with contradictory versions of a file. Gemini made those questions concrete. It was a testbed in which algorithms for consistency, availability, and recovery could be implemented and evaluated rather than discussed only in the abstract.

Our early work included “[On Improving the Availability of Replicated Files](/publications/236/),” “[The Management of Consistency in Fault-Tolerant File Systems](/publications/254/),” with Walter Burkhard, and “[A Realistic Evaluation of Optimistic Dynamic Voting](/publications/232/).” My dissertation, *The Management of Replication in a Distributed System*, grew from this work. I have worked on storage systems ever since.

## From Belgium to California

Jehan-François began his education in Belgium, earning an *Ingénieur Civil Chimiste* degree in chemical engineering from the Université Libre de Bruxelles in 1970. He then turned to computer science, completing a *Diplôme d'Études Approfondies* at the Université Pierre et Marie Curie in 1972 and *Licence* and *Maîtrise* degrees at the Facultés Universitaires Notre-Dame de la Paix in Namur in 1975. His [curriculum vitae](https://www2.cs.uh.edu/~paris/CV_short.pdf) records these degrees and his subsequent appointments.

He came to Berkeley for doctoral study with [Domenico Ferrari](/blog/2026-02-14-domenico-ferrari/) and received his Ph.D. in Electrical Engineering and Computer Sciences in 1981. His dissertation examined restructuring techniques for optimizing virtual memory systems.

Jehan-François joined Purdue as an assistant professor in 1979 while completing his doctorate. He moved to UC San Diego in 1982 and remained there until 1988, when he joined the University of Houston as an associate professor. He became a full professor in 2003 and is now Professor Emeritus.

His move to Houston did not end our work together. It only changed the distance across which we worked. He later spent the 1997–98 academic year as a visiting associate professor at UC Santa Cruz and returned regularly for research visits.

## Replication and Availability

Jehan-François's early research asked how replicated data could remain both available and consistent in the presence of failures. These goals conflict more often than an introductory description of replication suggests. Additional copies improve the chance that data will remain reachable, but every update must determine which copies may act and how stale copies will be repaired.

His voting-with-witnesses scheme, proposed in 1986, let lightweight witness records participate in determining the latest version of an object without storing a complete replica. This reduced the storage cost of a quorum while preserving its ability to establish which data were current. Voting with bystanders developed the idea further.

Our work tested replication protocols under realistic assumptions rather than judging them only by their behavior in idealized cases. We studied optimistic dynamic voting, available-copy protocols, regeneration, volatile witnesses, media failures, and block-level consistency. “[The Performance of Available Copy Protocols for the Management of Replicated Data](/publications/179/)” used probabilistic models to compare the behavior of alternative strategies. The recurring question was practical: under actual patterns of failure and repair, which policy kept data available most often without sacrificing correctness?

## A Collaboration Across Research Areas

My current [curriculum vitae](/cv.pdf) lists sixty-nine publications that Jehan-François and I coauthored. The number surprised even me when I counted them. More important than the total is the distance the work traveled.

We began with replicated files in the 1980s. By the late 1990s, we were studying video-on-demand. A popular video had to be delivered to many viewers who began watching at different times, without requiring a separate full-rate stream for each person. Broadcasting protocols traded server bandwidth, client bandwidth, startup delay, and temporary storage against one another.

Our survey of [video-on-demand broadcasting protocols](/publications/153/) organized the major approaches. Other papers developed zero-delay, low-bandwidth, hybrid, reactive, proactive, and variable-bandwidth protocols. We also studied stream tapping, partial preloading, peer-assisted delivery, and “[Accelerated Chaining](/publications/190/).” It was a different application from replicated files, but the intellectual habit was the same: formulate the system precisely, identify the resources that matter, and compare policies with analytical and experimental models.

We also worked on file-access prediction and caching, and then returned to reliability as storage systems grew much larger. That later collaboration included disk arrays, erasure coding, storage-class memories, shingled disks, early disk failures, irrecoverable read errors, and the long-term protection of archival data.

Jehan-François was part of the team that presented Alpha Entanglement Codes for archival storage at IEEE DSN in 2018. Our paper “[RESAR: Reliable Storage at Exabyte Scale](/publications/128/)” received the Best Paper Award at MASCOTS 2016. “[Disk Failure Prediction in Heterogeneous Environments](/publications/180/)” extended the work to devices whose failure behavior could not be treated as identical.

Our collaboration even returned from storage to distributed agreement. “[Pirogue: A Lighter Dynamic Version of the Raft Distributed Consensus Algorithm](/publications/181/)” was named Best Paper Runner-Up at IPCCC 2015. Pirogue reduced the number of active participants when conditions allowed it, conserving resources while retaining the ability to expand the voting group when failures required greater resilience.

## A Way of Thinking About Systems

The subjects changed, but Jehan-François's approach remained remarkably consistent. His background is in applied performance evaluation. A protocol is not interesting merely because it is elegant; one must ask how it behaves, what assumptions it makes, and when it is better than the alternatives.

Across our joint work we used probabilistic models, discrete-event simulation, trace-driven simulation, and measurements of implemented systems. Those methods let us study events that were too rare, systems that were too large, or design spaces that were too expensive to explore by construction alone.

Jehan-François has a gift for finding the essential structure of a problem. He can strip away accidental complexity without stripping away the part that determines the answer. That quality made him an excellent advisor and has made him an enduring collaborator.

He is a Senior Member of both the IEEE and the ACM and supervised doctoral students at UC San Diego and Houston over more than three decades. Through Ferrari, his academic lineage leads back to [Luigi Dadda](/blog/2026-02-14-luigi-dadda/), [Ercole Bottani](/blog/2026-02-06-ercole-bottani/), and [Angelo Barbagelata](/blog/2026-02-14-angelo-barbagelata/).

When Jehan-François invited a young graduate of San Diego State to become his doctoral student, neither of us could have known how long the resulting collaboration would last. It began with Gemini and the problem of keeping replicated files consistent. It continued through video delivery, caching, disk arrays, archival systems, and consensus protocols. More than the subjects or the publication count, I value the continuity: an advisor who became a colleague, and a colleague who became a lifelong friend.
