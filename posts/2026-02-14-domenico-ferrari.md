---
title: "Domenico Ferrari"
date: "2026-02-14"
tags: ["biography"]
excerpt: "From Politecnico di Milano to Berkeley, shaping performance evaluation, BSD Unix, and Internet QoS."
---

Domenico Ferrari came from Piacenza and earned his Dottore in Ingegneria Elettronica from the Politecnico di Milano in 1963, studying under [Luigi Dadda](/blog/2026-02-14-luigi-dadda). He stayed briefly as an assistant professor, then left for the United States. In 1970, he joined the faculty at UC Berkeley in the Department of Electrical Engineering and Computer Sciences, where he would spend twenty-five years.

He rose through the ranks to full professor, chaired the Computer Science Division from 1983 to 1987, and retired in 1995 as Professor Emeritus. Along the way he kept ties to Italy, spending 1976-77 as a visiting professor back at Politecnico.

## Performance Evaluation

Ferrari's early work at Berkeley was in computer systems performance. He applied rigorous statistical and analytical methods — queueing theory, workload characterization — to the measurement and modeling of time-sharing systems and virtual memory. His 1978 book *Computer Systems Performance Evaluation* became a standard reference. In 1984, he wrote a pointed technical report arguing that performance evaluation had developed too much in isolation and needed to be woven into mainstream computer architecture and software design, not treated as an afterthought. He was right, and the field moved that way.

In 1987, he received the A.A. Michelson Award for outstanding contributions to computer metrics and was named an IEEE Fellow.

## Berkeley Unix

When Bob Fabry stepped aside from the Computer Systems Research Group in the mid-1980s, Ferrari and Susan Graham took over administration of CSRG and the development of Berkeley Unix. Under their watch, the BSD project released 4.2BSD and 4.3BSD, which introduced the Berkeley Fast File System and early implementations of the TCP/IP stack. One of Ferrari's own students, Ozalp Babaoglu, had implemented the virtual memory subsystem for BSD on the VAX. The BSD releases became the standard research platform for networking and distributed computing, and the open dissemination of the code fed directly into FreeBSD, OpenBSD, NeXTSTEP, and eventually macOS. Elements of BSD that were developed during this period — the Berkeley socket API, the networking code — are still running today.

## The Tenet Group

In 1989, Ferrari founded the Tenet Group at Berkeley and the International Computer Science Institute, shifting his focus to a problem most people hadn't thought about yet: how to provide quality-of-service guarantees for real-time multimedia over packet-switched networks. At that point the Internet was best-effort only, and the idea of bounded delay and reserved bandwidth over IP seemed ambitious.

The group designed and built two real-time protocol suites, Tenet I and II, and demonstrated that it was possible to carry video and audio with strict timing guarantees over wide-area networks. They published extensively on delay jitter control, traffic specification, admission control, and rate-controlled scheduling. Many of the concepts — per-flow resource reservation, real-time transport protocols — anticipated later standards like Integrated Services and RSVP. Ferrari directed the Tenet Group until his retirement in 1995.

## Students

Ferrari supervised over three dozen Ph.D. students at Berkeley between the early 1970s and 2000. A partial list gives a sense of the range:

- **Ozalp Babaoglu** (1981) — distributed operating systems, later professor at the University of Bologna
- **Joseph Pasquale** (1988) — operating systems and distributed computing, professor at UC San Diego
- **Srinivasan Keshav** (1991) — packet scheduling and congestion control, later professor at Cornell and Waterloo
- **Hui Zhang** (1993) — QoS scheduling algorithms, professor at Carnegie Mellon, who in turn advised Ion Stoica
- **Vern Paxson** (1997) — Internet measurement and network security, later Berkeley faculty, creator of Bro/Zeek

Others include Bruce Mah, Edward Knightly (Rice), Dinesh Verma (IBM), Riccardo Gusella, Peter Danzig, and P. Venkat Rangan. The academic line from [Bottani](/blog/2026-02-06-welcome) to Dadda to Ferrari keeps branching.

## Return to Italy

After retiring from Berkeley in 1995, Ferrari went home. He founded the Center for Research on the Applications of Telematics to Organizations and Society (CRATOS) at the Universita Cattolica del Sacro Cuore in Piacenza, applying networking research to telemedicine, e-government, and the emerging internet economy. In 2000, he was appointed Professore Ordinario per Chiara Fama — full professor "by clear renown" — in Computer Science, and he launched a Master's program in Management in the Network Economy.

## Honors

Ferrari was named an IEEE Fellow in 1987 and an ACM Fellow in 2001. In 2006, he became the first Italian to receive the ACM SIGCOMM Award, one of the highest honors in computer networking. The citation recognized his contributions to Internet QoS architecture, his leadership of ICSI as a networking research center, his management of the Berkeley Unix project, and his mentorship of future leaders in the field.

He is my academic grandfather.
