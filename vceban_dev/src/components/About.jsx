/* eslint-disable react/prop-types */
import React from "react";
import Accordion from "./Accordion";
import picture from "../assets/img/DLong.avif";

const accordionData = [
  {
    title: "Professional Affiliations and Fellowships",
    body: [
      'He received his B.S. degree in Computer Science from San Diego State University, and his M.S. and Ph.D. from the University of California, San Diego. His dissertation advisor was <a href="http://www2.cs.uh.edu/~paris/" target="_blank" rel="norefferer">Jehan-François Pâris</a>, now at the <a href="http://www.cs.uh.edu" target="_blank" rel="norefferer">University of Houston</a>. While in graduate school and before joining the University of California, Santa Cruz, he was a lecturer in Mathematics at San Diego State University and taught at the University of California, San Diego.',
    ],
  },
  {
    title: "Visiting Positions and Collaborations",
    body: [
      'In 2006 he was elevated to Fellow of the IEEE, the  <a target="_blank" rel="norefferer" href="https://en.wikipedia.org/wiki/Institute_of_Electrical_and_Electronics_Engineers">Institute of Electrical and Electronics Engineers</a>, “for contributions to storage systems architecture and performance”.  In 2008 he was inducted a <a target="_blank" rel="norefferer" href="https://en.wikipedia.org/wiki/Fellow_of_the_American_Association_for_the_Advancement_of_Science">Fellow of the American Association for the Advancement of Science</a>. He is a member of the IEEE Computer Society, the Association for Computing Machinery, the American Society for Engineering Education, the USENIX Association, Upsilon Pi Epsilon, and Sigma Xi.',
      'He has held visiting faculty positions at <a target="_blank" rel="norefferer" href="http://www.dauphine.fr/fr/index.html">Université Paris–Dauphine (Paris IX)</a>, the <a target="_blank" rel="norefferer" href="http://www.cnam.fr">Conservatoire National des Arts et Métiers</a>, the <a target="_blank" rel="norefferer" href="https://u-paris.fr/en/498-2/">Université Paris–Descartes (Paris V)</a>, <a target="_blank" rel="norefferer" href="https://www.sorbonne-universite.fr/en">Sorbonne Université (Pierre et Marie Curie, Paris VI)</a>, the <a target="_blank" rel="norefferer" href="https://www.uts.edu.au">University of Technology, Sydney</a>, the Center for Communications Research, the <a target="_blank" rel="norefferer" href="https://www.nps.edu">United States Naval Postgraduate School</a>, and is Professor <em>ad Honorem</em> de la <a target="_blank" rel="norefferer" href="https://ucu.edu.uy/es">Universidad Católica del Uruguay</a>. He was an Associate Member of the European Organization for Nuclear Research (<a target="_blank" rel="norefferer" href="https://home.cern">CERN</a>).',
    ],
  },
  {
    title: "Research Interests and Contributions",
    body: [
      "He has broad research interests in many areas of mathematics and science, and in the field of computer science include data storage systems, operating systems, distributed computing, reliability & fault tolerance, and computer security. His research has been supported by the National Science Foundation, the Department of Energy (Office of Science and National Nuclear Security Administration), Lawrence Livermore, Los Alamos and Sandia National Laboratories, NASA, the Office of Naval Research, and many industrial sponsors that include Avago, Broadcom, Data Domain, eBay, Exablox, Facebook, Hewlett-Packard Enterprise, Huawei, IBM, Intel, Kioxia, LSI Logic, Microsoft, NetApp, Pure Storage, SK Hynix, Samsung, Sandisk, Scality, Seagate, Symantec, Toshiba, and Veritas.",
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
      <section className="about dottedBorder">
        <h2>About</h2>
        <img src={picture} alt="Darrell Long" />
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
