// Dependencies
import React from "react";
// Components
import Accordion from "./Accordion";
import Portrait from "./Portrait";
// Styles
import "../assets/css/about.scss";

const accordionData = [
  {
    title: "Education and Early Career",
    body: [
      'He received his B.S. degree in Computer Science from San Diego State University, and his M.S. and Ph.D. from the University of California, San Diego. His dissertation advisor was <a href="http://www2.cs.uh.edu/~paris/" target="_blank" rel="noreferrer">Jehan-François Pâris</a>, now at the <a href="http://www.cs.uh.edu" target="_blank" rel="noreferrer">University of Houston</a>. While in graduate school and before joining the University of California, Santa Cruz, he was a lecturer in Mathematics at San Diego State University and taught at the University of California, San Diego.',
    ],
  },
  {
    title: "Storage Systems and Ceph",
    body: [
      'The Ceph distributed file system grew out of the <a href="https://www.ssrc.us/proj/exscale.html" target="_blank" rel="noreferrer">Storage Systems Research Center (SSRC)</a> at UC Santa Cruz. Long coauthored the <a href="/publications/59/">2006 Ceph paper</a> with Sage Weil, Scott Brandt, Ethan Miller, and Carlos Maltzahn.',
      'Ceph was sponsored as part of the Department of Energy’s Accelerated Strategic Computing Initiative (ASCI), through Gary Grider at Los Alamos National Laboratory (LANL), Steve Louis at Lawrence Livermore National Laboratory (LLNL), and Lee Ward at Sandia National Laboratories.',
      'An architectural foundation was the separation of metadata management from data storage, using separate servers. Long and Luis-Felipe Cabrera developed this approach in <a href="https://www.usenix.org/publications/compsystems/1991/fall_cabrera.pdf" target="_blank" rel="noreferrer">Swift</a>, beginning in 1989 and presenting the work at the <a href="/publications/227/">1991 Summer USENIX conference</a>. Clients could transfer data directly to and from storage servers, independently of the metadata service. The same separation later appeared in <a href="https://www.usenix.org/legacy/events/fast02/wips/pease.pdf" target="_blank" rel="noreferrer">IBM’s Storage Tank</a>, commercialized as IBM TotalStorage SAN File System.',
      'Ceph’s use of hashing for distributed data placement has its roots in Ethan Miller’s Ph.D. work on <a href="https://www2.eecs.berkeley.edu/Pubs/TechRpts/1995/5206.html" target="_blank" rel="noreferrer">RAMA</a> at UC Berkeley. RAMA used hashing to spread data across storage devices. Miller and his collaborators subsequently developed this line of research into <a href="https://www.ethanmiller.org/research/" target="_blank" rel="noreferrer">RUSH and CRUSH</a>, the latter becoming Ceph’s data placement algorithm.',
      'Weil made substantial original contributions in his doctoral work on Ceph, including scalable metadata management and CRUSH. He then led its development from a research file system into production storage software now used in some of the world’s <a href="https://ceph.io/en/discover/vision/" target="_blank" rel="noreferrer">largest research and cloud installations</a>. He cofounded <a href="https://news.ucsc.edu/2018/01/year-of-alumni-weil-sage/" target="_blank" rel="noreferrer">Inktank</a> to develop and support Ceph commercially; Red Hat acquired the company in 2014.',
    ],
  },
  {
    title: "Conferences and Journals",
    body: [
      'He founded the <a href="https://www.usenix.org/legacy/events/fast02/" target="_blank" rel="noreferrer">USENIX Conference on File and Storage Technologies (FAST)</a> and chaired the program for its first meeting, held in Monterey in January 2002. He was also the founding general chair of the Workshop on Mobile Computing Systems and Applications (WMCSA) in 1994.',
      'He served as editor-in-chief of <em>ACM Transactions on Storage</em> from 2010 to 2016, following service as an associate editor from 2004 to 2010. From 2017 to 2020, he was editor-in-chief of <em>IEEE Letters of the Computer Society</em>. His <a href="/cv.pdf" target="_blank" rel="noreferrer">curriculum vitae</a> includes his other editorial appointments and conference service.',
    ],
  },
  {
    title: "Fellowships and Visiting Positions",
    body: [
      'In 2006 he was elevated to Fellow of the IEEE, the  <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Institute_of_Electrical_and_Electronics_Engineers">Institute of Electrical and Electronics Engineers</a>, “for contributions to storage systems architecture and performance”.  In 2008 he was inducted a <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Fellow_of_the_American_Association_for_the_Advancement_of_Science">Fellow of the American Association for the Advancement of Science</a>. He is a member of the IEEE Computer Society, the Association for Computing Machinery, the American Society for Engineering Education, the USENIX Association, Upsilon Pi Epsilon, and Sigma Xi.',
      'He has held visiting faculty positions at <a target="_blank" rel="noreferrer" href="http://www.dauphine.fr/fr/index.html">Université Paris–Dauphine (Paris IX)</a>, the <a target="_blank" rel="noreferrer" href="http://www.cnam.fr">Conservatoire National des Arts et Métiers</a>, the <a target="_blank" rel="noreferrer" href="https://u-paris.fr/en/498-2/">Université Paris–Descartes (Paris V)</a>, <a target="_blank" rel="noreferrer" href="https://www.sorbonne-universite.fr/en">Sorbonne Université (Pierre et Marie Curie, Paris VI)</a>, the <a target="_blank" rel="noreferrer" href="https://www.uts.edu.au">University of Technology, Sydney</a>, the Center for Communications Research, the <a target="_blank" rel="noreferrer" href="https://www.nps.edu">United States Naval Postgraduate School</a>, and is Professor <em>ad Honorem</em> de la <a target="_blank" rel="noreferrer" href="https://ucu.edu.uy/es">Universidad Católica del Uruguay</a>. He was an Associate Member of the European Organization for Nuclear Research (<a target="_blank" rel="noreferrer" href="https://home.cern">CERN</a>).',
    ],
  },
  {
    title: "Research and Federal Support",
    body: [
      "His research interests extend across mathematics and science. His work in computing has included data storage systems, operating systems, distributed computing, reliability and fault tolerance, and computer security.",
      "His research has been supported by the National Science Foundation (NSF), the Department of Energy (DOE), the Office of Naval Research (ONR), the Defense Advanced Research Projects Agency (DARPA), and NASA.",
      "These projects include NSF-funded research on reliable archival storage, DOE-funded work on scientific data management and exascale file systems, the ONR-supported Real-time Environmental Information Network and Analysis System (REINAS), and DARPA’s Trust Worthy Information Storage Technology Enhanced Devices (TWISTED) project.",
    ],
  },
  {
    title: "Service and Committee Engagements",
    body: [
      "He served as the Vice-Chair and then Chair of the University of California Committee on Research Policy. He has served on the University of California President’s Council on the National Laboratories, and the Science & Technology, National Security and Intelligence committees for those laboratories. He recently served on the University of California Academic Council Special Committee on Laboratory Issues (ACSCOLI). He served for several years on the National Research Council’s Standing Committee on Technology Insight-Gauge, Evaluate and Review (TIGER), on the Committee on Defense Intelligence Agency Technology Forecasts and Reviews and on the National Research Council’s Committee on Science and Technology for Defense Warning. He currently serves on the Intelligence Science and Technology Experts Group (ISTEG) for the National Academies of Sciences, Engineering and Medicine.",
    ],
  },
];

export default function About() {
  return (
    <>
      <section className="aboutSection dottedBorder">
        <p className="eyebrow">Biography</p>
        <h1>Darrell D. E. Long</h1>
        <Portrait />
        <p>
          Dr. Darrell D. E. Long is a Distinguished Visiting Scholar at Santa
          Clara University and is Distinguished Professor of Engineering,
          emeritus, at the University of California, Santa Cruz. He held the
          Kumar Malavalli Endowed Chair of Storage Systems Research and is
          Director, emeritus, of the Storage Systems Research Center and
          Director, emeritus, of the NSF I/UCRC Center for Research in Systems
          and Storage.
        </p>
      </section>
      <section className="accordions">
        {accordionData.map((data, index) => (
          <Accordion
            key={index}
            title={data.title}
            body={data.body}
            state={index === 0 ? true : false}
          />
        ))}
      </section>
    </>
  );
}
