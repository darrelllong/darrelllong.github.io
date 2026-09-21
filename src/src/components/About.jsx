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
          <h2>Education and early career</h2>
          <p>
            Darrell Long earned his B.S. in computer science from San Diego
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
            to="/blog/2026-02-14-jehan-francois-paris/">Jehan-François Pâris</Link>.
          </p>
          <a className="text-link" href="/cv.pdf">
            Curriculum vitae <span aria-hidden="true">↗</span>
          </a>
        </div>
        <Portrait />
      </section>

      <div className="biography-narrative">
        <section aria-labelledby="ucsc-title">
          <h2 id="ucsc-title">Research and laboratory life at UC Santa Cruz</h2>
          <p>
            Long joined UC Santa Cruz in 1988. He built a laboratory with
            dozens of master&rsquo;s and doctoral students, supporting the
            research of several faculty members. Undergraduate researchers
            worked alongside them, gaining practical experience in systems
            research and a path into graduate study.
          </p>
          <p>
            His research focused on how computer systems store, protect,
            and provide access to data. In 1991, his work with Luis-Felipe
            Cabrera on <Link to="/publications/227/">Swift</Link> explored
            an architecture that separated metadata management from data
            transfers. His work has also addressed data deduplication,
            archival storage, reliability, and secure file systems.
          </p>
          <p>
            He directed the <a href="https://www.ssrc.us/about.html">Storage
            Systems Research Center (SSRC)</a> from its establishment in
            2001 until 2019, building the center with Ethan Miller and their
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
            on the Santa Cruz campus. Long worked with its founding director,
            Ethan Miller, to develop the center and directed it from 2019
            to 2023. These partnerships connected faculty and students with
            engineers in industry and brought research into practice.
          </p>
        </section>

        <section aria-labelledby="mentoring-title">
          <h2 id="mentoring-title">Teaching and mentoring</h2>
          <p>
            Teaching remained central to Long&rsquo;s work at Santa Cruz,
            from introductory programming and data structures to graduate
            courses in operating systems and cryptography. He encouraged
            undergraduates to undertake research and continue to advanced
            degrees. A <a href="https://news.ucsc.edu/2016/03/women-computer-science/">
            university profile</a> describes that path for Alexandra Holloway
            and Aleatha Parker-Wood, both of whom he first taught as
            undergraduates and later advised through their Ph.D.s.
          </p>
          <p>
            He supervised an unusually large number of women to Ph.D.
            completion, the largest total among faculty in the Baskin
            School of Engineering at the time. His students described a
            diverse, supportive laboratory where they could pursue demanding
            research while navigating the other responsibilities in their
            lives. In 2011, he received the <a
            href="https://news.ucsc.edu/2011/06/achievement-awards-diversity-recipients/">
            Chancellor&rsquo;s Achievement Award for Diversity</a>.
          </p>
          <p>
            His students have since trained researchers of their own. In
            September 2026, the <a href="https://www.mathgenealogy.org/id.php?id=10794">
            Mathematics Genealogy Project</a> recorded 23 of his doctoral
            students and 41 academic descendants in total, including the
            students of Randal Burns, Ahmed Amer, and Richard Golding.
          </p>
        </section>

        <section aria-labelledby="professional-title">
          <h2 id="professional-title">Professional service and later career</h2>
          <p>
            Long&rsquo;s work building a research community extended beyond
            his own laboratory. He was a founding member of the steering committee
            for the International Symposium on Modeling, Analysis, and
            Simulation of Computer and Telecommunication Systems (MASCOTS)
            and served for decades, including as <a
            href="https://sites.google.com/view/mascots-2019/organizers">steering
            committee chair</a>, as well as general chair and program chair.
            That sustained involvement was part of a broader record of
            service on dozens of program committees.
          </p>
          <p>
            He also helped create new venues for systems research, as
            founding general chair of the Workshop on Mobile
            Computing Systems and Applications in 1994 and founder of
            the <a href="https://www.usenix.org/legacy/events/fast02/">USENIX
            Conference on File and Storage Technologies (FAST)</a>, chairing
            its first program in January 2002. He has served for several
            years as general chair of the <a
            href="https://www.msstconference.org/2026/research-cfp.html">International
            Conference on Massive Storage Systems and Technology (MSST)</a>,
            where he also serves on the steering committee.
          </p>
          <p>
            His editorial service includes terms as editor-in-chief of <em>ACM
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
            At UCSC he served as associate dean of engineering and later
            as associate dean for research and graduate studies. He also
            chaired the University of California Committee on Research
            Policy. His scientific advisory work has included JASON, the
            UC President&rsquo;s Council on the National Laboratories, and
            National Research Council committees.
          </p>
          <p>
            Long retired from UC Santa Cruz in 2023, after 35 years on the
            faculty and eighteen years in the Malavalli chair. He is
            Distinguished Professor of Engineering, emeritus, and Director,
            emeritus, of SSRC and CRSS, and is a Distinguished Visiting
            Scholar at Santa Clara University.
          </p>
        </section>
      </div>
    </>
  );
}
