---
title: "The War Criminals who invented Sensor Networks"
date: "2026-10-28"
tags: ["research", "history", "sensor-networks", "uc-santa-cruz"]
excerpt: "In 1992, we began connecting environmental sensors to the Internet with Navy funding. The research produced a working system. The campus response included a wanted poster."
---

In 1992, we started REINAS, the Real-Time Environmental Information Network and Analysis System, at UC Santa Cruz. The Office of Naval Research funded us to develop a system for monitoring weather and ocean conditions.

[Dr. Patrick Mantey](https://mantey.soe.ucsc.edu/), our principal investigator, brought electrical engineering. [Dr. Alex Pang](https://campusdirectory.ucsc.edu/cd_detail?uid=pang) worked on visualization, [Dr. J. J. Garcia-Luna-Aceves](https://media.utoronto.ca/bluebook/jj-garcia-luna-aceves/) on networking, and [Dr. Glen Langdon](https://news.ucsc.edu/2014/03/langdon-obituary/) on data compression. Dr. Langdon was one of the inventors of [arithmetic coding](https://patents.google.com/patent/US4122440A/en). I worked on systems, networking, and databases. I was also the guy with the supposedly insane idea that the instruments should be on the network all the time.

Our meteorology collaborators at the Naval Postgraduate School included [Dr. Carlyle H. Wash](https://nps.edu/web/meteorology/people) and [Dr. Wendell A. Nuss](https://nps.edu/faculty-profiles/-/cv/nuss).

The grant was nearly \$5 million—[\$4,767,112 over 1992–1997](/cv.pdf#page=6), to be precise. At the time, it was by far the largest grant in what would become the School of Engineering.

We wrote the proposal in 1991. I suggested that every sensor should be a TCP/IP node, continuously online. I was told that I was crazy: computers were too big. I said to trust me.

The idea was to put computation and networking at the instruments, collect their measurements continuously, and make those measurements available to scientists as they arrived. Scientists could also control the instruments remotely. We worked with the Naval Postgraduate School, the Monterey Bay Aquarium Research Institute, and NOAA's Center for Ocean Analysis and Prediction. The initial scientific problem was the development of the sea breeze over Monterey Bay and its effect on the ocean. The university's [July 21, 1992 announcement](/downloads/reinas-announcement-1992.pdf) described applications ranging from weather forecasting to understanding currents and responding to oil spills.

We built Port-a-Met, a trailer carrying an i386 computer, a meteorological station, a GPS receiver, and a radio. It was a sensor node that could travel. We put it aboard a ship, and radio ducting let us follow the ship's progress as it traveled past San Diego.

Dr. Mantey and I also had a wireless network connecting his house atop the ridge to mine below, with routes through Monterey and up to campus. My link ran at 1 Mb/s at 900 MHz. I used a circularly polarized Yagi antenna to cope with fringing and multipath. Our postdoc, [Dr. Daniel Fernandez](https://researchprofiles.csumb.edu/en/persons/daniel-fernandez/), now a professor at California State University, Monterey Bay, made it from white PVC pipe and stainless steel wire cut to length.

Radio waves can bend around the edge of a hill, a process called diffraction—the fringing I was dealing with. They can also reflect off terrain. These routes can deliver multiple copies of the same transmission to the receiver: [*multipath*](https://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-lan-wlan/27147-multipath.html). The copies travel different distances and arrive with different phases. When a crest meets a trough, they partially cancel, making the signal harder to receive. The Yagi's directionality helped reject signals arriving from unwanted directions. Circular polarization helped reject some reflections because a reflection can [reverse the wave's polarization handedness](https://www.ion.org/publications/abstract.cfm?articleID=5933).

The link actually worked better in the rain. A hill between my house and campus created an unwanted second path, and wet weather suppressed it. Weakening that interfering copy reduced the cancellation at the receiver and improved reception. At 900 MHz, attenuation by falling rain itself is very small; the useful change was in the unwanted path associated with the hill.

We had a meteorological station and video camera atop the Dream Inn. Surfers loved that very early live video. Yes, that was us too. Another installation operated for years at Long Marine Laboratory, at UC Santa Cruz's Coastal Campus.

The written record makes clear how much we were putting together. Our [January 1993 concept statement](https://tr.soe.ucsc.edu/sites/default/files/technical-reports/UCSC-CRL-93-05.pdf#page=25) specifies Internet access to data and sensor control through standard protocols, including TCP/IP. By [July 1993](https://tr.soe.ucsc.edu/sites/default/files/technical-reports/UCSC-CRL-93-34.pdf#page=38), the report describes software reading meteorological instruments, sending their measurements over the Internet into a database, and letting users display either current conditions or historical observations. The [1995 CompCon paper](/publications/167/) describes instrument nodes built from PCs running BSD/386. Scientific instruments, online, using Internet protocols over wired and wireless networks.

Making that work meant dealing with unreliable radio links. Instruments kept local logs, and records remained there until the receiving system acknowledged them. Our [journal paper](/publications/175/) describes a UDP-based retransmission protocol tuned for the wireless links. TCP/IP was the protocol family; we chose the transport behavior to suit the job. The database had its own incoming logs, so collection could continue through database maintenance or a backlog. Scientists could also interact with an instrument while its data collection continued.

We even used an SGI Challenge computer with a 64 MB solid-state disk to hold the log and keep up with the flow of data from the instruments. At the time, a 1 GB SCSI disk cost \$1,500.

We also wanted the measurements to remain scientifically useful years later. The data model kept their context: which instrument produced them, how they were calibrated, and how they had been processed. Dr. Pang's visualization work grew to include scientists at different locations exploring the same three-dimensional data together, as well as ways to show uncertainty in the measurements. The [project reports](https://tr.soe.ucsc.edu/sites/default/files/technical-reports/UCSC-CRL-94-43.pdf#page=55) connect these efforts: networked instruments, a scientific archive, and tools for understanding what was happening as the data arrived.

The [January 1997 status report](https://tr.soe.ucsc.edu/sites/default/files/technical-reports/UCSC-CRL-97-02.pdf#page=16) even recalls the objection that putting a “whole 386” at each instrument site would be too expensive. By then, the system was collecting measurements from more than 70 instrument platforms, with more than 220 sensor streams at about 50 fixed and mobile sites. Later that year, [NSF support through NPACI](https://www1.ucsc.edu/news_events/press_releases/archive/96-97/03-97/033197-UCSC_is_member_of_n.html) would help extend the work.

There is a strong argument that we helped invent the modern Internet-connected sensor network. Earlier sensor networks existed; our contribution was to make the instruments continuously accessible participants in an Internet-based system for measurement, control, data management, and visualization. That sounds ordinary now. In 1991, putting a computer at every instrument was the crazy part. I think we were a little too early to receive the credit we deserved.

We did, however, receive attention from the campus Left. How dare we work for the United States Navy on weather?

Protests ensued. Posters appeared. Booklets were published. The faculty were declared war criminals.

![A protest poster headed “WANTED,” showing Dr. Glen Langdon, Dr. Patrick Mantey, Dr. Alex Pang, Dr. J. J. Garcia-Luna-Aceves, and Dr. Darrell Long, and denouncing Navy funding for REINAS.](/images/war-criminal.png)

*The REINAS wanted poster. [Full-resolution scan](/images/war-criminal.png).*

The poster called us an “Outlaw Gang” and described REINAS as “posing as a fancy weather forecasting system.” Apparently, the Navy's interest in the weather was evidence enough.

Fortunately, we had a supportive chancellor in [Dr. M. R. C. Greenwood](https://library.ucsc.edu/reg-hist/from-complex-organisms-to-a-complex-organization-an-oral-history-with-ucsc-chancellor-mrc), who stood by us during the REINAS protests. She had followed the amazing [Dr. Karl Pister](https://cshe.berkeley.edu/node/145), who helped us secure the grant over MIT by meeting with the visiting team from ONR.

The broader campaign against military-funded university research continued. I kept a copy of the 2003 booklet [*The Militarization of America's Universities*](/downloads/militarization-of-americas-universities-2003.pdf), published by the ¡Escrache! media collective. It gives a sense of the politics surrounding this work.

Nor was REINAS the last episode. From 2000 through 2004, I chaired the [Engineering II Building Committee](/cv.pdf#page=36), overseeing the design and construction of Engineering 2. I also served on the University of California's [National Security Panel, Science & Technology Panel, and President's Council](/cv.pdf#page=38), work connected with the national laboratories. That was enough for student groups to claim that the excavation for our new engineering building was really the construction of an underground nuclear weapons laboratory.

Someone replaced the sign on my lab with “Nuclear Weapons Laboratory.” That did not please our dean at the time, [Dr. Steve Kang](https://news.ucsc.edu/2022/07/kang-retirement/).

Steve is a wonderful human being—a brilliant and kind man. He led the development of the [BELLMAC-32 microprocessor](https://ethw.org/First-Hand:The_AT%26T_BELLMAC-32_Microprocessor_Development) at Bell Labs and is a leader in memristor research. He went on to serve as chancellor of UC Merced and president of KAIST. The Baskin School of Engineering would be a much different place if we still had a man like Steve Kang at the helm.

![The BELLMAC-32A development team gathered behind an enormous paper plot of the chip layout on the floor of the Bell Labs lobby in Murray Hill.](/images/bellmac-32a-team-layout.jpg)

*The BELLMAC-32A team and their paper layout at Murray Hill. In his account linked above, Steve describes taping together a 20-by-20-foot plot and tracing the connections with colored pencils. Photograph from [Dr. Kang’s UCSC gallery](https://nisl.soe.ucsc.edu/dr-kang/). See also IEEE Spectrum’s [“32 Bits That Changed Microprocessor Design.”](https://spectrum.ieee.org/bellmac-32-ieee-milestone)*

Some of it was entertaining. Once, students staged a performance in the Engineering 2 courtyard. One student was dressed as a cruise missile, while the others lay down and pretended to die.

When we found this poster on the door outside the lab, we brought it inside and put it on the wall.

![A hand-drawn protest poster headed “BRAINPOWER,” depicting Engineering 2 as a smoking factory and declaring that the struggle against the university begins with the struggle against Engineering 2.](/images/engineering-2-brainpower.jpg)

*The “BRAINPOWER” poster, promoted from the door outside to our lab wall. [Full-resolution photograph](/images/engineering-2-brainpower.jpg).*

REINAS had finished by then. Once a war criminal, always a war criminal.

My work with the Navy and the National Nuclear Security Administration (NNSA) laboratories did not please some of my fellow faculty members, both within Engineering and in the humanities and social sciences—the more politically active side of campus.

The laboratory collaboration also helped make Ceph possible. Our first laboratory grant for the storage work that presaged it was a modest \$15,000 from the Department of Energy's Lawrence Livermore National Laboratory for [*A Distributed Architecture for High-speed I/O*](/cv.pdf#page=6), in 1991–1992. A slightly larger grant from the National Science Foundation, [*High-speed Distributed Storage Management*](/cv.pdf#page=6), provided \$68,955 over 1991–1993. Later support from Los Alamos, Lawrence Livermore, and Sandia, through the Department of Energy's Accelerated Strategic Computing Initiative, funded the storage research behind Ceph.

Ceph grew out of [Dr. Sage Weil](https://news.ucsc.edu/2018/01/year-of-alumni-weil-sage/)'s doctoral research in the Storage Systems Research Center, which [Dr. Ethan Miller](https://www.ethanmiller.org/) and I built together. The [file system](/publications/59/) was designed to distribute data across large numbers of storage devices, replicate it, and recover from failures as the system grew. Dr. Weil went on to lead its development into a production storage system. I have written more about that history in [*Ceph and the SSRC*](/blog/2026-09-20-ceph-and-the-ssrc/).

Weather matters to a navy. So do ocean currents, wind, and the ability to understand what instruments are telling you. I was proud of the research, proud of my colleagues and students, and proud to do useful work for the United States Navy.

I still am.
