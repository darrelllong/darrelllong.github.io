# Correctness audit — September 20–21, 2026

This audit starts from commit `06009054970c98824a306d4451efb6918f2a4dae`.
It updates 161 publication records, including 93 abstract fields, and all 11
patent records. Two duplicate publications and one incorrectly attributed
proposal were removed from the catalog, leaving 247 publication records.
Their old URLs remain usable through redirects.

The subsequent [biography audit](biography-audit.md) addresses the owner's
editorial queue: the uneven biography, missing substantive coverage of SSRC
and CRSS, and CRSS's distinction as the campus's only NSF I/UCRC. It also
records what the earlier review missed and the evidence for the revision.
The [editorial queue](editorial-queue.md) is complete.
The subsequent [academic genealogy audit](academic-genealogy-audit.md) documents
23 MGP-listed doctoral students and 41 total academic descendants, the new
mentoring paragraph, and stale advising entries found in the CV PDF.

The [field-by-field change ledger](correctness-changes.json) records the
previous and corrected values, source destinations, and hashes of the five
new local PDFs. The [download check](publication-link-check.json) records
the result for each current publication destination. The ledger separates
legacy date-string normalization from the 161 record updates.

## Scope and evidence

The review covered the site's six main pages, twelve essays, the original
250 publication entries, eleven patents, downloads, citation exports, and
generated routes. Publication evidence included paper title pages and
abstracts, the SSRC archive, publisher records and DOI metadata, the author's
CV and bibliography, and copies in the author's Publications repository.
Historical essays were checked against institutional histories, contemporary
accounts, and the subjects' own records. Software descriptions were checked
against specific repository revisions.

An HTTP success alone did not establish that a link was correct: some links
opened the wrong publication or a different version. Conversely, automated
access restrictions were not treated as proof that a publisher record was
dead. When the SSRC catalog, CV, DOI metadata, and actual paper disagreed,
the paper's byline, title, and publication information took precedence.
Accepted manuscripts and technical-report versions are labeled where needed.

This was a bibliographic and editorial correctness review, not a replication
of the research results or a security certification of the software. It did
not independently rederive every theorem or inspect every page of every
paper. Personal recollections remain the author's account. The CV PDF itself
was used as evidence and was not rewritten.

## Principal corrections

| Problem | Correction and evidence |
| --- | --- |
| Technical reports presented as conference papers | Restored report identity, number, date, and byline for records including 52, 75, 76, 89, 94, 100, 102, 104, 108, and 130. Their venue is now visible without opening BibTeX. Conference and journal versions remain separate when they are distinct publications. |
| Incorrect authors and titles | Corrected bylines and titles from the actual papers, including Twizzler, Inkpack, Anticipatory Scheduling, Tracking Emigrant Data, and the 2011 Horus paper. See the per-record ledger for exact changes. |
| Publication dates confused with submission, acceptance, or early access | Corrected journal issue dates and citation details for records 141–143, 148, 156, and 157, among others. |
| Abstracts cut off at percent signs | Restored omitted results and following sentences from the papers. Examples include aggregating-cache hit rates (22), MEMS capacity/performance (49), and disk-bandwidth and timeout results (211, 214). |
| Wrong abstract or non-abstract prose | Restored the relevant version's abstract; removed conclusions, introductions, and generated summaries that had been labeled as authored abstracts. Removed extracted keywords, funding footnotes, and markup from abstract text. |
| Incorrect numerical units and mathematical text | Restored Inkpack's 100–150 microsecond overhead, percentages, superscripts, and other lost mathematical notation from the source PDFs. |
| Duplicate records | Record 66 redirects to 242; record 238 redirects to 97. Duplicate entries are omitted from the catalog and sitemap. |
| Committee membership represented as authorship | Record 99's PDF identifies Aleatha Parker-Wood as its sole author and lists Long on the approval committee. The SSRC catalog incorrectly treats that committee as coauthors. The entry was removed; its URL redirects to the archive record. The National Academies book (151) now uses its publisher's corporate-author citation and separately states Long's committee service. |
| Wrong or unavailable download versions | Corrected 28 publication destinations. Added five local PDFs, including the actual 1999 journal article and book chapter previously linked to other versions. The token-ring report's source PDF had all twelve pages reversed; the local copy restores page order without changing page content. See [PDF provenance](../pdfs/README.md). |
| Patent attribution and misleading buttons | Checked all eleven patent records against their Google Patents source records; corrected inventor names/order and titles. Buttons now say “View at Google Patents” rather than implying a PDF download. |
| Outdated biography statements | Replaced present-tense ISTEG service with its documented 2015–2020 dates, specified ACSCOLI service periods, and repaired institutional links. The former laboratory destination is described as a research archive. |

## Essays

* **Angelo Barbagelata:** corrected the workers' school, age at death, CGS
  chairmanship, book title, and journal role; removed unsupported or conflicting
  counts and dates. Sources include [Adriano Morando's historical account](https://www.adrianomorando.it/wp-content/uploads/Angelo-Barbagelata.pdf)
  and the [Treccani biography](https://www.treccani.it/enciclopedia/angelo-barbagelata_(Dizionario-Biografico)/).
* **Ercole Bottani and Luigi Dadda:** corrected the 1954 Los Angeles work on
  the CRC computer and 1955 computing-center chronology; removed unsupported
  “first in Europe,” NSF, Caltech, San Diego, and appointment claims. Sources
  include the [Politecnico historical collection](https://www.historicalcollections.deib.polimi.it/en/protagonisti/bottani/),
  [DEIB's Dadda record](https://www.deib.polimi.it/eng/people/details/58996),
  [USI's account](https://www.usi25.usi.ch/en/feeds/9505), and the
  [official 1976 Grand Cross record](https://www.quirinale.it/onorificenze/insigniti/35611).
* **Domenico Ferrari and Jehan-François Pâris:** corrected Ferrari's Berkeley
  CSRG chronology and removed unsupported award primacy and student counts.
  Added Pâris's own CV as evidence. Sources include [Berkeley's faculty record](https://www2.eecs.berkeley.edu/Faculty/Homepages/ferrari.html),
  [McKusick's BSD history](https://www.oreilly.com/openbook/opensources/book/kirkmck.html),
  and [Pâris's CV](https://www2.cs.uh.edu/~paris/CV_short.pdf).
* **Performance evaluation:** corrected Pilot's chronology and the description
  of Delta's in-memory measurements; qualified claims about sample size,
  stopping rules, and statistical validity.
* **Secret sharing:** distinguished perfect secrecy, computational assumptions,
  statistical secrecy, and erasure tolerance. Corrected descriptions of the
  actual Blakley rank check, Feldman commitments, VSS primitives, proactive
  refresh, dependencies, timing behavior, and benchmark units. Implementation
  claims are pinned to [`04f056a`](https://github.com/darrelllong/secret-sharing/tree/04f056a67ba3568d3cc8b9c968b710cd7e2c95da).
* **Random generators:** corrected dependency/feature claims, source versus
  published versions, thread-local generator buffering/reseeding, and benchmark
  descriptions. Source claims are pinned to [`9f72d34`](https://github.com/darrelllong/entropy/tree/9f72d34e0785af1ec2a8445cb9fb02643daf028a).
* **On Time:** changed an unsupported historical generalization about barter
  into an illustrative example and identified the translation of the biblical
  quotation.

Post index titles, tags, dates, and excerpts now agree with their Markdown
front matter. Previously corrected consultancy wording and expertise areas,
including communications and networking, remain intact. There is no external
Pentexoire website link in runtime content. The physics essay remains focused
on the professorship and experimental physics, without the unrelated service
paragraph previously removed.

## Verification and limits

* `npm run lint` and `npm run deploy` pass. The build produces 247 current
  publication routes, eleven patent routes, twelve post routes, and 276 sitemap
  URLs, plus redirects and preserved older not-found URLs.
* The new build-time content check rejects duplicate IDs/BibTeX keys, invalid
  citation years/months, missing local PDFs, paper links to Scholar searches,
  suspect abstract endings/markup, inconsistent post indexes, broken referenced
  internal paths, invalid redirects, and the unwanted external consultancy link.
  These checks detect specific regressions; they cannot establish factual truth.
* Browser checks covered all six main pages, all twelve posts, representative
  report/conference/journal/book records, a patent detail page, and all three
  redirects. The checked pages had no missing images or render errors. All
  twelve posts rendered without horizontal overflow or KaTeX errors at desktop
  width; mobile checks included long publication titles, search, consultancy,
  navigation, and the secret-sharing essay's 52 formulas.
* Publication search correctly distinguishes the two different Horus papers.
  Empty contact-form submission displays field errors. No contact message was
  sent, so end-to-end email delivery was not tested.
* A live browser check exposed stale publication JSON despite a newly deployed
  page. Publication and patent fetches now revalidate their HTTP cache, matching
  the existing blog and consultancy behavior. This prevents GitHub Pages'
  ten-minute JSON cache lifetime from hiding corrections after a reload.
* Download results: 227 external PDFs and fifteen local PDFs; three reachable
  non-PDF destinations (National Academies reader, Google Books record, and
  REINAS bibliography); one restricted publisher destination; one citation-only
  record. PDF retrieval is documented separately from source identity checks.
* WinnowML (162) retains the [IEEE record supplied by the owner](https://ieeexplore.ieee.org/document/9671602).
  Automated retrieval returned an HTTP 202 interstitial; this is recorded as
  restricted access, not a verified PDF or a dead link.
* The Sea Technology item (169) remains a citation linked to the REINAS
  bibliography. Its incomplete local source was not reconstructed into a paper
  without its four figures, following the owner's instruction to skip it.
* Record 119 remains citation-only. No substitute paper or invented download
  was attached. Third-party sources and software repositories can change after
  the audit; dated checks and pinned revisions make that boundary explicit.

## Dependency follow-up

GitHub reported dependency alerts when the content corrections were published.
A fresh `npm audit` confirmed ten affected packages. Compatible lockfile
remediation cleared those findings, including React Router 7.18.4, JS-YAML
3.15.2/4.3.2, and PostCSS 8.5.28. Within Vite's existing dependency range, npm
selected the unaffected esbuild 0.27.2 instead of vulnerable 0.27.7. No forced
major-version upgrade was used. React Router's declared minimum was also raised
to the installed patched version.

Lint, content validation, and the production build passed after these changes.
The final npm advisory check reported zero known vulnerabilities. This is the
registry's result on the audit date, not a guarantee of absence of security
defects. The dependency evidence is recorded in
[dependency-check.json](dependency-check.json).
