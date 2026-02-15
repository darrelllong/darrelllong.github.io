---
title: "Domenico Ferrari"
date: "2026-02-14"
tags: ["biography"]
excerpt: "From Politecnico di Milano to Berkeley, shaping performance evaluation, BSD Unix, and Internet QoS."
---

Domenico Ferrari came from Piacenza and earned his Dottore in Ingegneria Elettronica from the Politecnico di Milano in 1963, studying under [Luigi Dadda](/blog/2026-02-14-luigi-dadda). He stayed briefly as an assistant professor, then left for the United States. In 1970, he joined the faculty at UC Berkeley in the Department of Electrical Engineering and Computer Sciences, where he would spend twenty-five years.

He rose through the ranks to full professor, chaired the Computer Science Division from 1983 to 1987, and retired in 1995 as Professor Emeritus. Through all of it he kept ties to Italy, spending 1976–77 as a visiting professor back at Politecnico.

## Performance Evaluation

Ferrari's early work at Berkeley was in computer systems performance. He brought rigorous statistical and analytical methods — queueing theory, workload characterization — to the measurement and modeling of time-sharing systems and virtual memory. His 1978 book *Computer Systems Performance Evaluation* became a standard reference, the kind of book that graduate students actually read rather than just cited.

In 1984, he wrote a pointed technical report arguing that performance evaluation had developed too much in isolation and needed to be woven into mainstream computer architecture and software design, not treated as an afterthought. He was right, and the field moved that way.

In 1987, he received the A.A. Michelson Award for outstanding contributions to computer metrics and was named an IEEE Fellow.

## Berkeley Unix

When Bob Fabry stepped aside from the Computer Systems Research Group in the mid-1980s, Ferrari and Susan Graham took over administration of CSRG and the development of Berkeley Unix. Under their watch, the BSD project released 4.2BSD and 4.3BSD, which introduced the Berkeley Fast File System and early implementations of the TCP/IP stack. The BSD releases became the standard research platform for networking and distributed computing, and the open dissemination of the code fed directly into FreeBSD, OpenBSD, NeXTSTEP, and eventually macOS. The Berkeley socket API and networking code from this period are still with us — every time you open a network connection on practically any operating system, you're using abstractions that passed through Ferrari's shop.

## The Tenet Group

In 1989, Ferrari founded the Tenet Group at Berkeley and the International Computer Science Institute, turning his attention to a problem most people hadn't worried about yet: how to provide quality-of-service guarantees for real-time multimedia over packet-switched networks. The Internet at that point was best-effort only, and the idea of bounded delay and reserved bandwidth over IP was, to put it mildly, ahead of its time.

The group designed and built two real-time protocol suites, Tenet I and II, and showed that you could carry video and audio with strict timing guarantees over wide-area networks if you got the scheduling and admission control right. They published extensively on delay jitter control, traffic specification, admission control, and rate-controlled scheduling. Many of the ideas — per-flow resource reservation, real-time transport protocols — anticipated later standards like Integrated Services and RSVP. Ferrari directed the Tenet Group until his retirement in 1995.

## Students

Ferrari supervised over three dozen Ph.D. students at Berkeley between the early 1970s and 2000. The Mathematics Genealogy Project lists them, and the names read like a who's who of systems and networking research. His students went on to faculty positions at Bologna, Carnegie Mellon, Cornell, Rice, UC San Diego, Waterloo, and Berkeley itself, and to research labs at IBM and beyond. Some of them advised students who became major figures in their own right — the tree keeps branching.

One of those students was Jehan-François Pâris, who became my own doctoral advisor. So the line runs from [Bottani](/blog/2026-02-06-welcome) to Dadda to Ferrari to Pâris to me. I did not choose this lineage, but I am glad to have it. It is a lineage of people who built things — computing centers, operating systems, network protocols, academic programs — and who believed that good engineering and good science are not separate endeavors.

## Return to Italy

After retiring from Berkeley in 1995, Ferrari went home. He founded the Center for Research on the Applications of Telematics to Organizations and Society (CRATOS) at the Universita Cattolica del Sacro Cuore in Piacenza, applying networking research to telemedicine, e-government, and the emerging internet economy. In 2000, he was appointed Professore Ordinario per Chiara Fama — full professor "by clear renown" — in Computer Science, and he launched a Master's program in Management in the Network Economy.

## Honors

Ferrari was named an IEEE Fellow in 1987 and an ACM Fellow in 2001. In 2006, he became the first Italian to receive the ACM SIGCOMM Award, one of the highest honors in computer networking. The citation recognized his contributions to Internet QoS architecture, his leadership of ICSI as a networking research center, his management of the Berkeley Unix project, and his mentorship of future leaders in the field.

He is my academic grandfather. I never studied with him directly, but his influence reached me through Pâris, and through the systems and ideas he helped build. That is how academic lineage works when it works well — not as a credential, but as a way of thinking that gets passed along.
