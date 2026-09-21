import { Link } from "react-router-dom";
import Portrait from "./Portrait";
import "../assets/css/about.scss";

export default function About() {
  return (
    <>
      <section className="about-introduction" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">Biography</p>
          <h1 id="about-title">Darrell D. E. Long</h1>
          <p>
            Darrell Long is Distinguished Professor of Engineering, emeritus,
            at the University of California, Santa Cruz, and a Distinguished
            Visiting Scholar at Santa Clara University. His research concerns
            how computer systems store, protect, and provide access to data.
          </p>
          <p>
            He joined UC Santa Cruz in 1988 and held the Kumar Malavalli
            Endowed Chair in Storage Systems Research from 2005 until his
            retirement in 2023. He is Director, emeritus, of the Storage
            Systems Research Center and the Center for Research in Systems
            and Storage, which he built with Ethan Miller and their colleagues.
          </p>
          <a className="text-link" href="/cv.pdf">
            Curriculum vitae <span aria-hidden="true">↗</span>
          </a>
        </div>
        <Portrait />
      </section>

      <div className="biography-narrative">
        <section aria-labelledby="ssrc-title">
          <h2 id="ssrc-title">Storage research and the SSRC</h2>
          <p>
            The <a href="https://www.ssrc.us/about.html">Storage Systems
            Research Center (SSRC)</a> began in 2001. Long directed it from
            2001 to 2019, bringing together faculty, students, and collaborators
            in industry and the national laboratories. Its research addressed
            distributed file systems, archival storage, performance,
            reliability, and security.
          </p>
          <p>
            His work with Luis-Felipe Cabrera on <Link to="/publications/227/">
            Swift</Link> explored a storage architecture that separated
            metadata management from data transfers. He was also a coauthor
            of the <Link to="/publications/59/">2006 Ceph paper</Link>, which
            grew out of the SSRC&rsquo;s research on large-scale distributed
            storage. His research has also included data deduplication,
            storage for nonvolatile memory, and secure file systems.
          </p>
        </section>

        <section aria-labelledby="crss-title">
          <h2 id="crss-title">CRSS and industry collaboration</h2>
          <p>
            Established in 2013, the <a href="https://iucrc.nsf.gov/centers/center-for-research-in-storage-systems/">
            Center for Research in Systems and Storage (CRSS)</a> built on
            the SSRC&rsquo;s research and industry relationships. It is the
            only NSF Industry/University Cooperative Research Center
            (I/UCRC) on the UC Santa Cruz campus. Long worked with founding
            director Ethan Miller to develop the center and served as its
            director from 2019 to 2023.
          </p>
          <p>
            CRSS connects university research with problems faced by the
            storage industry. Its partnerships support student research,
            collaboration with company engineers, and the transfer of
            research into practice. The <a href="https://news.ucsc.edu/2014/05/data-storage/">
            university&rsquo;s account of this work</a> describes how those
            relationships helped graduate students contribute to products
            while completing their degrees.
          </p>
        </section>

        <section aria-labelledby="education-title">
          <h2 id="education-title">Education and teaching</h2>
          <p>
            Long received his B.S. in computer science from San Diego State
            University in 1984, and his M.S. and Ph.D. from UC San Diego in
            1986 and 1988. His doctoral advisor was <Link to="/blog/2026-02-14-jehan-francois-paris/">
            Jehan-François Pâris</Link>. Before joining UC Santa Cruz, he
            worked as a systems programmer and taught mathematics at San
            Diego State and computer science at UC San Diego.
          </p>
          <p>
            At UC Santa Cruz, he taught undergraduate and graduate courses
            in programming, data structures, operating systems, and
            cryptography. His doctoral students have investigated file
            systems, replication, caching, archival storage, and security.
            Research supervision and collaboration with industry have been
            central parts of his work as a teacher.
          </p>
        </section>

        <section aria-labelledby="professional-title">
          <h2 id="professional-title">Conferences and journals</h2>
          <p>
            Long founded the <a href="https://www.usenix.org/legacy/events/fast02/">
            USENIX Conference on File and Storage Technologies (FAST)</a>
            {" "}and chaired the program for its first meeting in Monterey in
            January 2002. He was also the founding general chair of the
            Workshop on Mobile Computing Systems and Applications (WMCSA)
            in 1994.
          </p>
          <p>
            He served as editor-in-chief of <em>ACM Transactions on Storage</em>
            {" "}from 2010 to 2016 and of <em>IEEE Letters of the Computer
            Society</em> from 2017 to 2020.
          </p>
        </section>

        <section aria-labelledby="honors-title">
          <h2 id="honors-title">Honors and international work</h2>
          <p>
            He became an IEEE Fellow in 2006 for contributions to storage
            systems architecture and performance, and an <a href="https://news.ucsc.edu/2008/12/three-ucsc-professors-elected-aaas-fellows/">
            AAAS Fellow in 2008</a> for contributions to computing systems,
            particularly high-performance storage systems.
          </p>
          <p>
            His visiting appointments have included universities in France
            and Australia and the U.S. Naval Postgraduate School. He was
            named Professor <em>ad Honorem</em> at the Universidad Católica
            del Uruguay in 2010 and was an Associate Member of CERN from
            2016 to 2019.
          </p>
        </section>

        <section aria-labelledby="service-title">
          <h2 id="service-title">University and scientific service</h2>
          <p>
            At the Baskin School of Engineering, Long served as associate
            dean from 1998 to 2001 and as associate dean for research and
            graduate studies from 2004 to 2010. He was vice-chair of the
            University of California Committee on Research Policy in
            2001–2002 and chair in 2002–2003.
          </p>
          <p>
            His scientific advisory work has included JASON, the University
            of California President&rsquo;s Council on the National
            Laboratories, and National Research Council committees concerned
            with technology and national security. His <a href="/cv.pdf">
            curriculum vitae</a> documents these appointments and his other
            research, teaching, and professional service.
          </p>
        </section>
      </div>
    </>
  );
}
