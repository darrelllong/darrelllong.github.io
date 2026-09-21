# Random number generator post audit

Reviewed September 21, 2026 against entropy revision
`9f72d34e0785af1ec2a8445cb9fb02643daf028a` (September 17, 2026).

The post gave jump-ahead operations in xoshiro and xoroshiro disproportionate
attention while leaving much of the comparison framework undescribed.
The revision explains the noncryptographic families, stream-cipher and
block-cipher adapters, historical runtime generators, and deliberate test
controls. It retains the PCG64 example and reduces the jump discussion to
its relevance to reproducible worker streams.

Evidence checked: `src/rng/mod.rs` for exported generators and actual
`CryptoRng` implementations; `USAGE.md` for the supported seeding interfaces
and individual generators; `stream_rng.rs` and `block_ctr.rs` for adapters;
`alternatives.rs` for controlled defects; and `corpus.rs` for external input.
Links identify the reviewed source revision. The guide's generator-section
anchor was checked against its heading.

The revision does not imply that all generators implement `Seedable` or
`CryptoRng`, classify plain counter-mode encryption as CTR_DRBG, or treat
statistical test results as a proof of cryptographic security. The code
examples are unchanged. This is a correction of the article's scope and
emphasis, not a new security audit of the underlying implementations.

Validation: ESLint, content validation, and the production build passed.
The rendered article was inspected in the browser.
