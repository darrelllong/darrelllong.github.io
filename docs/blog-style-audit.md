# Blog prose review

September 21, 2026. Read all twelve posts in full, then reviewed the edits
in context. This pass addressed prose and punctuation, not a fresh audit
of the historical sources or software implementations.

| Post | Result |
| --- | --- |
| Ercole Bottani | Reviewed; no further edit needed. |
| Angelo Barbagelata | Removed generic praise and an explanation that repeated the closing quotation. |
| Domenico Ferrari | Replaced a generic claim about generations of researchers and simplified the opening. |
| Jehan-François Pâris | Reviewed; no further edit needed. |
| Luigi Dadda | Removed generic praise while retaining his work and the IEEE recognition. |
| Performance Evaluation | Removed dash asides, staged questions, repeated fragments, and inflated descriptions of Pilot. Preserved the criticism of misleading measurements. |
| On Time | Reread the revision from the preceding pass; retained it without further changes. |
| Random Number Generators in Rust | Simplified framing and removed redundant explanations. |
| Threshold Secret Sharing in Pure Rust | Removed inflated descriptions, rhetorical contrasts, and promotional headings; clarified sentence structure. |
| Ceph and the SSRC | Replaced promotional descriptions with direct accounts of development work. |
| Long Professorship in Experimental Physics | Removed institutional slogans and redundant explanations. |
| Retiring with Ethan Miller | Removed an unnecessary transition from the closing sentence. |

The edits retain personal recollections, attributed quotations, code blocks,
link destinations, and the technical qualifications concerning secrecy,
verification, timing behavior, and statistical inference. Meaningful
contrasts and mathematical notation remain. YAML front-matter delimiters
and date-range punctuation are structural, not prose flourishes.

Validation: code blocks and link destinations compared against the previous
revision; excerpt consistency, content validation, ESLint, and production
build passed. All twelve rendered articles checked in the browser.

## American English and possessives, October 31, 2026

Scanned all 27 published Markdown posts for possessives ending in s and
British spelling and usage, then reviewed the candidates in context.
The possessives already consistently distinguished singular names (Davis's,
Ellis's, Galois's) from plurals (bikers', customers', Regents'). No malformed
"Davids's" was present. Added this convention and the American English
preference to the README's blog style instructions.

Made 14 American English edits across eight posts:

| Post | Changes |
| --- | --- |
| Angelo Barbagelata | aged eighty-four → at age eighty-four |
| On Time | backwards → backward |
| Threshold Secret Sharing in Pure Rust | catalogue → catalog |
| Dr. Witold Litwin | grey literature → gray literature |
| Lessons from the Backblaze Data | afterwards → afterward; grey → gray |
| Politicization of the UCSC Humanities | catalogue → catalog |
| Die Like a Scientist | axe → ax (twice); sledge → sled; waistcoat → vest; aged → at age (twice) |
| The Beast | spilt → spilled |

These edits select a consistent American house style; several original forms
are also accepted in American English. Preserved quotations, cited titles,
proper names (including Holy Sepulchre, St. Petersburg Encyclopaedia, the
French Centre d'Études et de Recherches en Informatique Appliquée, and the
French degree Licence), code, mathematical notation, and link destinations.

Validation: compared metadata, link destinations, code, quotations, and math
against the prior revision across all 27 posts. Content checks and the
production build passed; verified the changed wording in all eight rendered
articles. The follow-up scan found none of the targeted variants remaining
in the authored prose.
