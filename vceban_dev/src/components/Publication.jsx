/* eslint-disable react/prop-types */
import React from "react";

const BibTeX = ({ bibTeX }) => {
  return (
    <section>
      <h3>BibTeX</h3>
      <pre>
        {`@article{${bibTeX["@article"]},
  author       = {${bibTeX.author}},
  title        = {${bibTeX.title}},
  journal      = {${bibTeX.journal}},
  pages        = {${bibTeX.pages}},
  volume       = {${bibTeX.volume}},
  number       = {${bibTeX.number}},
  month        = {${bibTeX.month}},
  year         = {${bibTeX.year}},
}`}
      </pre>
    </section>
  );
};

const Abstract = ({ paragraphs }) => {
  return (
    <section>
      <h3>Abstract</h3>
      {paragraphs.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </section>
  );
};

const Publication = ({ publication }) => {
  let lines = [];
  if (publication.full_content) {
    lines = publication.full_content.split("\n");
  }

  return (
    <article>
      <header>
        <h2>{publication.title}</h2>
      </header>
      <main>
        {lines && <Abstract paragraphs={lines} />}
        {publication.bibTeX && <BibTeX bibTeX={publication.bibTeX} />}
      </main>
    </article>
  );
};

export default Publication;
