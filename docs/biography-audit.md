# Biography audit and queue completion

Date: September 21, 2026. Starting commit:
`5ad843007a9f07b07f170daf5db99c876ef830b7`.

## What the earlier review missed

The previous biography mentioned SSRC and CRSS only in a list of emeritus
titles. It did not explain their history, their relationship, Long's work
building them, or CRSS's NSF I/UCRC distinction. Research and teaching received
less attention than lists of appointments and committee memberships. Checking
individual claims had not established that the biography was complete or
balanced. That was a substantive omission in the earlier review.

## Revision

The revised page gives a continuous, visible account of Long's work. Six
sections cover storage research and SSRC; CRSS and industry collaboration;
education and teaching; conferences and journals; honors and international
work; and university and scientific service. The introduction identifies his
current affiliations and career at UCSC. The portrait and introduction sit
above the narrative, replacing the uneven layout with most of the biography
hidden in closed accordions.

The revision adds the centers' dates and Long's directorships, explains how
CRSS built on SSRC, includes the campus's sole NSF I/UCRC distinction, and
connects research and teaching to concrete examples. It preserves the
distinction between Long's research contributions, his students' work, and
collaborative projects. Detailed appointment and membership lists remain in
the CV. Both generated and client-rendered About metadata now describe the
same biography.

## Claim and source ledger

| Claim or editorial decision | Evidence and treatment |
| --- | --- |
| Current affiliations; UCSC appointment in 1988; Malavalli chair, 2005–2023; retirement in 2023 | [January 7, 2026 CV](../cv.pdf), PDF page 1. The [university's 2005 appointment announcement](https://news.ucsc.edu/2005/04/computer-scientist-darrell-long-appointed-to-the-kumar-malavalli-endowed-chair-in-storage-systems/) independently confirms the chair appointment. Current affiliations retain the owner's established biography and CV. |
| SSRC began in 2001 | [SSRC archive](https://www.ssrc.us/about.html), which records activity from 2001–2024; CV lists Long as director beginning in 2001. The center's activity dates are not confused with his directorship. |
| Long directed SSRC, 2001–2019, and CRSS, 2019–2023 | CV, PDF page 1. [NSF's CRSS record](https://iucrc.nsf.gov/centers/center-for-research-in-storage-systems/) identifies Long and Miller as directors emeriti. |
| CRSS was established in 2013 and built on SSRC | [Center history](https://www.crss.us/about.html), [NSF center directory](https://iucrc.nsf.gov/centers/), and [UCSC's 2014 account](https://news.ucsc.edu/2014/05/data-storage/). CRSS is not described as simply a new name for SSRC. |
| CRSS is the only NSF I/UCRC on the UC Santa Cruz campus | The owner supplied this fact. Independently, the NSF center directory inspected on the audit date contains one UCSC center entry: CRSS. The statement is supported by that directory, not presented as a direct quotation from the CRSS profile. It makes no claim that UCSC never participated in any other historical center or that CRSS was the university's only NSF-funded research center. |
| Long and Miller built the centers together; Miller was CRSS's founding director | Owner's first-person account in [Retiring with Ethan Miller](../posts/2026-09-20-retiring-with-ethan-miller.md); CV's 2013–2018 CRSS grant with Miller; [Miller's center profile](https://www.crss.ucsc.edu/person/elm.html); [UCSC's 2013 account](https://news.ucsc.edu/2013/10/rev-fall-13-data-dilemma/). The page does not call Long CRSS's founding director. |
| Research scope and industry partnerships | SSRC and CRSS records, NSF profile, and UCSC's 2014 account. No current sponsor count, funding total, or employment guarantee is asserted. |
| Swift and Ceph as research examples | Catalog records [227](../publications/227/index.html) and [59](../publications/59/index.html), with original paper links. The text credits Cabrera and identifies Long as a Ceph coauthor rather than sole creator. |
| Degrees in 1984, 1986, and 1988; Pâris as doctoral advisor; early teaching and systems programming | CV, PDF pages 1–2, and the established Pâris biography. The individual institutions and dates are stated explicitly. |
| Teaching programming, data structures, operating systems, and cryptography; doctoral supervision | CV's teaching record, PDF pages 39–51, and mentoring record, pages 52–53. No unsupported student count or claim that every center student was Long's advisee is added. |
| FAST founder and first program chair; inaugural meeting in January 2002 | [USENIX FAST 2002 archive](https://www.usenix.org/legacy/events/fast02/) and CV conference-service record. The CV's 2001 planning/program-chair entry is not used as the meeting date. |
| WMCSA founding general chair, 1994; journal editorships, 2010–2016 and 2017–2020 | CV conference service and editorial duties, including PDF page 31 for the editorships. |
| IEEE Fellow, 2006; AAAS Fellow, 2008 | CV honors; [UCSC CITRIS profile](https://citris.ucsc.edu/pi-list/) for the IEEE citation; [UCSC's AAAS announcement](https://news.ucsc.edu/2008/12/three-ucsc-professors-elected-aaas-fellows/). Election in 2008 is distinguished from the AAAS presentation ceremony in 2009. |
| Visiting appointments; Uruguay honorary professorship in 2010; CERN, 2016–2019 | CV, PDF pages 2–3. These are expressed historically and summarized without implying that all appointments are current. |
| Associate deanships, 1998–2001 and 2004–2010 | CV, PDF page 1; university's 2005 chair announcement corroborates the latter role. |
| UC research-policy vice-chair, 2001–2002, and chair, 2002–2003 | CV, PDF page 38. |
| JASON, UC President's Council, and National Research Council service | CV consulting, professional-service, and system-wide-service records, including PDF pages 31 and 38. These now appear in the biography's relevant service section. The unrelated paragraph is not restored to the physics essay. |

## Verification

- `npm run lint`, the build-time content validator, and `npm run deploy`
  passed after the final wording change. The catalog remains at 247
  publications, eleven patents, twelve posts, three publication redirects,
  and 276 sitemap URLs.
- The rendered biography contains approximately 650 words in six visible
  narrative sections. Desktop inspection at 1280 pixels and mobile checks
  at 390 and 320 pixels found no horizontal overflow. Screenshots confirmed
  readable headings, paragraph spacing, and portrait placement; the portrait
  loaded successfully.
- The browser's About title and description agree with the generated route
  metadata. All six narrative sections are accessible without expanding
  controls. The final build's fresh browser tab had no console errors.
- The Swift and Ceph links opened the expected publication records, with
  their correct titles, bylines, dates, and paper destinations. The Pâris link
  opened his essay, including through client-side navigation in the final
  build. The three local routes returned HTTP 200; the CV returned HTTP 200
  as a 213,356-byte PDF.
- The five external destinations in the biography were read through the
  web source reader. The NSF profile also returned HTTP 200 directly.
  A plain Python HTTP client received 403 responses from SSRC, USENIX,
  and UCSC News; those responses were not mislabeled as dead links or as
  successful direct downloads.
- A final chronology review changed “subsequent work” to “research has also
  included” so that the paragraph does not imply that Long's deduplication
  research began after the 2006 Ceph paper.
- A tab left open while the local build replaced its JavaScript files needed
  a reload before opening the lazily loaded essay. The freshly loaded final
  build completed that navigation without errors. Existing tabs spanning a
  site deployment may similarly need a reload.
- `git diff --check` passed. This revision changes the biography and its
  presentation and metadata; the publication and patent source records and
  the previous audit's numerical findings are unchanged.

## Relation to the wider audit

The [correctness audit](correctness-audit.md) documents the preceding source
review: 161 updated publication records, 93 corrected abstract fields, eleven
corrected patent records, two removed duplicate entries, one removed
misattributed proposal, 28 changed publication destinations, and corrections
to historical and technical essays. Those counts describe the preceding
audit; this biography revision does not inflate them.

The [publication change ledger](correctness-changes.json),
[publication download checks](publication-link-check.json), and
[dependency check](dependency-check.json) retain their dated evidence.
The earlier limitations remain: IEEE may restrict access to WinnowML, the
Sea Technology source lacks its figures and remains a citation by the owner's
instruction, and record 119 has no full-text link. Contact-form validation
was tested without sending a message. This is a source and presentation audit,
not a guarantee that every historical source or research result is error-free.
