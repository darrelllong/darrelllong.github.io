import { Link } from "react-router-dom";
import Portrait from "./Portrait";
import "../assets/css/about.scss";

export default function About() {
  return (
    <>
      <section className="about-introduction" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">Biography</p>
          <h1 id="about-title">Dr. Darrell D. E. Long</h1>
          <p>
            Dr. Darrell Long is Distinguished Professor of Engineering, emeritus,
            at the University of California, Santa Cruz, and a Distinguished
            Visiting Scholar at Santa Clara University. His research spans
            distributed and fault-tolerant computing, operating systems,
            storage, networking, computer security, and performance evaluation.
            He has also served as a scientific adviser to the U.S. government
            and the national laboratories.
          </p>
          <a className="text-link" href="/cv.pdf">
            Curriculum vitae <span aria-hidden="true">↗</span>
          </a>
        </div>
        <Portrait />
      </section>

      <div className="biography-narrative">
        <section aria-labelledby="education-title">
          <h2 id="education-title">Education and early career</h2>
          <p>
            Dr. Long earned his B.S. in computer science from San Diego
            State University in 1984 and began working there as a lecturer
            in mathematics immediately after graduation. He had already
            worked as a systems programmer at the university while an
            undergraduate.
          </p>
          <p>
            During his doctoral studies at UC San Diego, he also taught
            computer science as a lecturer, taking responsibility for
            university courses while still a graduate student. He received his M.S.
            in 1986 and his Ph.D. in 1988, under the supervision of <Link
            to="/blog/2026-02-14-jehan-francois-paris/">Dr. Jehan-François Pâris</Link>.
          </p>
        </section>
        <section aria-labelledby="ucsc-title">
          <h2 id="ucsc-title">Research at UC Santa Cruz</h2>
          <p>
            Dr. Long joined UC Santa Cruz in 1988. He built a laboratory with
            dozens of master&rsquo;s and doctoral students, supporting the
            research of several faculty members. Undergraduate researchers
            also worked in the laboratory, gaining experience in systems
            research.
          </p>
          <p>
            His work on distributed computing has examined data replication,
            consistency, and fault tolerance, alongside studies of Internet
            host reliability and the modeling and simulation of computer
            systems. In 1991, his work with Dr. Luis-Felipe
            Cabrera on <Link to="/publications/227/">Swift</Link> explored
            an architecture that separated metadata management from data
            transfers. His work has also addressed data deduplication,
            archival storage, caching and prefetching, and high-performance
            scientific computing.
          </p>
          <p>
            His networking and multimedia research included performance
            guarantees for communication networks and <Link
            to="/publications/211/">video-on-demand delivery</Link>. With
            Dr. Patrick Mantey and colleagues, he developed <Link
            to="/publications/175/">REINAS</Link>, a system for managing
            real-time and historical environmental data. Work with Dr. David
            Helmbold and others explored <Link to="/publications/214/">adaptive
            disk power management</Link> for mobile computers, part of a
            broader interest in energy-efficient computing.
          </p>
          <p>
            He directed the <a href="https://www.ssrc.us/about.html">Storage
            Systems Research Center (SSRC)</a> from its establishment in
            2001 until 2019, building the center with Dr. Ethan Miller and their
            colleagues. In 2005, he became the first holder of the Kumar
            Malavalli Endowed Chair in Storage Systems Research. The
            SSRC&rsquo;s work on distributed storage included <Link
            to="/publications/59/">Ceph</Link>, whose 2006 paper he coauthored.
          </p>
          <p>
            In 2013, the <a href="https://iucrc.nsf.gov/centers/center-for-research-in-storage-systems/">
            Center for Research in Systems and Storage (CRSS)</a> built on
            the SSRC&rsquo;s research and industry partnerships. CRSS is the
            only NSF Industry/University Cooperative Research Center (I/UCRC)
            on the Santa Cruz campus. Dr. Long worked with its founding director,
            Dr. Ethan Miller, to develop the center and directed it from 2019
            to 2023.
          </p>
          <p>
            His operating systems research includes <Link
            to="/publications/148/">Twizzler</Link>, which reconsiders how
            an operating system manages data in nonvolatile memory. His
            security work encompasses encryption and access control,
            deniable storage, digital forensics, provenance-based intrusion
            detection, and <Link to="/publications/160/">anonymous
            communication resistant to traffic analysis</Link>. He has also
            applied machine learning to systems problems, including <Link
            to="/publications/129/">automatic performance tuning</Link>,
            workload prediction, and anomaly detection.
          </p>
        </section>

        <section aria-labelledby="mentoring-title">
          <h2 id="mentoring-title">Teaching and mentoring</h2>
          <p>
            Dr. Long&rsquo;s teaching at Santa Cruz spanned the undergraduate
            and graduate curriculum. In his first year, 1988–89, he taught
            compiler design and advanced operating systems. His upper-division
            courses included operating systems, compiler construction,
            comparative programming languages, and systems programming. He
            also taught introductory and honors programming, data structures,
            computer systems and C programming, and courses on Internet
            security and privacy.
          </p>
          <p>
            At the graduate level, he taught advanced operating systems,
            compiler design, programming languages and environments, storage
            systems, advanced computer security, and cryptography. He led
            computer systems seminars and advanced topics courses, and taught
            advanced computer security at Los Alamos National Laboratory.
            He received the Student Alumni Council Favorite Professor Award
            in 1991 and an honorable mention for the 1994–95 Excellence in
            Teaching Award.
          </p>
          <p>
            His seminar &ldquo;Dangerous World&rdquo; examined real-world
            existential risks to human civilization and was highly popular
            with undergraduate and graduate students, although the dean
            allowed him to offer it only once.
          </p>
          <p>
            He supervised undergraduate research and
            encouraged students to continue to graduate study. <a
            href="https://news.ucsc.edu/2016/03/women-computer-science/">Dr. Alexandra
            Holloway and Dr. Aleatha Parker-Wood</a> were among his undergraduate
            students who later completed Ph.D.s under his supervision. Dr. Holloway
            has since led the flight software team for NASA&rsquo;s <a
            href="https://www-robotics.jpl.nasa.gov/media/documents/Wheels_Made_for_Arcing.pdf#page=12">
            Curiosity Mars rover</a> at the Jet Propulsion Laboratory.
          </p>
          <p>
            He supervised more women to Ph.D. completion than any other
            faculty member in the Baskin School of Engineering at the time.
            In 2011, he received the <a
            href="https://news.ucsc.edu/2011/06/achievement-awards-diversity-recipients/">
            Chancellor&rsquo;s Achievement Award for Diversity</a>.
          </p>
          <p>
            Dr. Long has supervised 24 doctoral students to completion. Three
            have become tenured faculty: <a
            href="https://researchinfo.fju.edu.tw/professors/1632">Dr. Tsozen
            Yeh</a> at Fu Jen Catholic University, <a
            href="https://www.scu.edu/engineering/faculty/amer-ahmed/">Dr. Ahmed
            Amer</a> at Santa Clara University, and <a
            href="https://www.cs.jhu.edu/faculty/randal-burns/">Dr. Randal
            Burns</a> at Johns Hopkins. Dr. Burns now holds the Bill and Lisa
            Stromberg endowed headship of Hopkins&rsquo;s Department of
            Computer Science. Other graduates have led research in
            industry. The <a
            href="https://www.mathgenealogy.org/id.php?id=10794">Mathematics
            Genealogy Project</a> records a further generation of doctoral
            students advised by Dr. Long&rsquo;s graduates.
          </p>
        </section>

        <section aria-labelledby="national-service-title">
          <h2 id="national-service-title">National service and research policy</h2>
          <p>
            Dr. Long joined <a href="https://news.ucsc.edu/2019/01/long-appointment/">
            JASON</a>, a scientific advisory group to the U.S. government,
            in 2002. He has served on National Research Council committees
            on technology assessment and defense warning, and on the
            National Academies&rsquo; Intelligence Science and Technology
            Experts Group.
          </p>
          <p>
            He served on the University of California
            President&rsquo;s Council on the National Laboratories and on
            science and technology, national security, and intelligence
            committees for Los Alamos and Lawrence Livermore. He also took
            part in advisory and review work at Sandia and Pacific Northwest
            national laboratories. Through the Academic Council&rsquo;s <a
            href="https://senate.universityofcalifornia.edu/_files/committees/acscoli/acscoli-annual-report-2022-23.pdf">
            Special Committee on Laboratory Issues</a>, he also took part
            in the university&rsquo;s oversight of the laboratories.
          </p>
          <p>
            Within the university, he served as vice-chair and then chair
            of the University of California Committee on Research Policy,
            and as associate dean of engineering and associate dean for
            research and graduate studies at Santa Cruz. In 2025, he joined the
            Board of Trustees of the Institute for Defense Analyses.
          </p>
        </section>

        <section aria-labelledby="professional-title">
          <h2 id="professional-title">Professional service and later career</h2>
          <p>
            Dr. Long was a founding member of the <a
            href="https://sites.google.com/view/mascots-2019/organizers">MASCOTS
            steering committee</a> and served on it for decades, including
            as chair. He also served as the conference&rsquo;s general chair
            and program chair. His other conference work includes dozens
            of program committee appointments.
          </p>
          <p>
            He was founding general chair of the Workshop on Mobile
            Computing Systems and Applications in 1994 and founded
            the <a href="https://www.usenix.org/legacy/events/fast02/">USENIX
            Conference on File and Storage Technologies (FAST)</a>, chairing
            its first program in January 2002. He has served for several
            years as general chair of the <a
            href="https://www.msstconference.org/2026/research-cfp.html">International
            Conference on Massive Storage Systems and Technology (MSST)</a>,
            where he also serves on the steering committee.
          </p>
          <p>
            He was editor-in-chief of <em>ACM
            Transactions on Storage</em> from
            2010 to 2016 and <em>IEEE Letters of the Computer Society</em>
            {" "}from 2017 to 2020.
          </p>
          <p>
            He became an IEEE Fellow in 2006 and an <a
            href="https://news.ucsc.edu/2008/12/three-ucsc-professors-elected-aaas-fellows/">
            AAAS Fellow in 2008</a> for his contributions to computing and
            storage systems. His international work included visiting
            appointments in France and Australia, an honorary professorship
            at the Universidad Católica del Uruguay in 2010, and an
            Associate Membership of CERN from 2016 to 2019.
          </p>
          <p>
            Dr. Long retired from UC Santa Cruz in 2023, after 35 years on the
            faculty and eighteen years in the Malavalli chair. He remains
            Director, emeritus, of SSRC and CRSS.
          </p>
        </section>
      </div>
    </>
  );
}
