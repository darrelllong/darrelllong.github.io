// Expose the publication's venue so reports, proceedings, and journal versions
// with similar titles can be distinguished without reading the BibTeX.
export const formatVenue = (bib = {}) => {
  const clean = (text) => String(text || "").replace(/\\&/g, "&").replace(/[{}]/g, "");
  if (bib["@techreport"]) {
    return ["Technical report", bib.number, bib.institution].filter(Boolean).join(" · ");
  }
  if (bib["@incollection"]) return `Book chapter · ${clean(bib.booktitle)}`;
  if (bib.journal) {
    const volume = bib.volume ? ` ${bib.volume}${bib.number ? `(${bib.number})` : ""}` : "";
    return `${clean(bib.journal)}${volume}`;
  }
  if (bib.booktitle) return clean(bib.booktitle);
  if (bib["@book"]) return ["Book", bib.publisher].filter(Boolean).join(" · ");
  return clean(bib.publisher || bib.institution);
};
