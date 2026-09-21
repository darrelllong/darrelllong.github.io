---
title: "Threshold Secret Sharing in Pure Rust"
date: "2026-05-05"
tags: ["research", "cryptography", "rust", "secret-sharing"]
excerpt: "A Rust library for studying threshold sharing, ramp schemes, general access structures, visual cryptography, and share verification."
---

The third repository in this set is [`secret-sharing`](https://github.com/darrelllong/secret-sharing). The [cryptography crate](https://github.com/darrelllong/cryptography) covers ciphers, hashes, and public-key primitives. The [entropy library](/blog/2026-05-05-auditing-random-number-generators/) provides random generators, sampling methods, and statistical tests. This library brings together Rust implementations of threshold sharing, ramp schemes, general access structures, visual cryptography, and primitives for verifiable and proactive sharing.

In a perfect $(k, n)$ threshold scheme, a secret $s$ is split into $n$ shares such that any $k$ recover it and any $k - 1$ reveal no information about it. The observer's probability distribution for the secret is unchanged by seeing fewer than $k$ shares. Shamir's scheme has this property when its random coefficients are independent and uniformly distributed. Several other constructions in the library deliberately offer different guarantees, including partial disclosure or reconstruction without secrecy.

The secrecy theorem does not require a bound on the observer's computation. An implementation still depends on how its randomness is generated and how shares are stored, transported, and erased. Using a deterministic cryptographic generator in place of truly independent random coefficients introduces a computational assumption.

## The Schemes

Shamir's polynomial construction is a useful starting point. The other constructions illustrate different choices about share size, access rules, error recovery, and secrecy. The repository's catalogue identifies the papers associated with each module.

**Shamir, *How to Share a Secret*, 1979.** The classical $(k, n)$ polynomial threshold scheme. Pick a random polynomial of degree at most $k - 1$ $q(x)$ with $q(0) = s$, hand share $i$ the value $q(i)$, recover via Lagrange interpolation. The crate also implements the Karnin-Greene-Hellman 1983 multi-secret extension: pack $\ell \le k$ secrets into the low coefficients and recover all of them in one round.

**Blakley, *Safeguarding Cryptographic Keys*, 1979.** The secret is a coordinate of a point $P \in \mathrm{GF}(p)^k$, and shares describe hyperplanes through it. Reconstruction requires a full-rank system of equations. In the [current implementation](https://github.com/darrelllong/secret-sharing/blob/04f056a67ba3568d3cc8b9c968b710cd7e2c95da/src/blakley.rs), a rank check covers the first $k$ generated shares; it does not establish that every $k$-subset will reconstruct, or that every smaller subset hides the secret coordinate. Those guarantees cannot be inferred merely from the geometric description.

**McEliece and Sarwate, *On Sharing Secrets and Reed-Solomon Codes*, 1981.** A profound observation: Shamir's scheme *is* a Reed-Solomon code. That means the entire machinery of error-correcting codes — and in particular Berlekamp-Welch decoding — applies to secret sharing. The crate implements robust reconstruction: given $m$ shares of which up to $t$ may have been *tampered with*, the secret is recoverable whenever $m - 2t \ge k$. This is the property that makes secret sharing usable in adversarial environments where some shareholders may lie.

**Mignotte 1983 and Asmuth-Bloom 1983.** Both build $(k, n)$ schemes from the Chinese Remainder Theorem rather than from polynomial interpolation. Mignotte gives reconstruction-uniqueness without perfect secrecy; Asmuth-Bloom adds a public masking modulus to recover statistical secrecy. Useful illustrations that the threshold property is not specific to Shamir's algebra — it is a structural property that several different mathematical surfaces support.

**Karnin, Greene, Hellman, *On Secret Sharing Systems*, 1983.** The trivial $n$-of-$n$ additive split, the multi-secret extension, and the matrix scheme $v_i = u \cdot A_i$ for vector secrets. The matrix formulation generalizes neatly into Kothari's 1984 linear scheme, which in turn specializes back to Shamir (Vandermonde matrix), Blakley (random hyperplane matrix), or KGH (block-diagonal matrix) depending on what you choose.

**Yamamoto, 1986, $(k, L, n)$ ramp schemes.** Trade some secrecy for some bandwidth. Place $L$ secrets in a single polynomial; any $k$ shares recover all $L$, any $k - L$ shares reveal nothing, intermediate counts leak proportionally. $L = 1$ is exactly Shamir; $L = k$ is the McEliece-Sarwate ramp; the parameter $L$ interpolates between them. Important when the secret is large and per-share storage matters.

**Ito-Saito-Nishizeki, 1989.** Realize *any monotone access structure* — not just $k$-of-$n$, but arbitrary "this committee, or that committee, or any director plus any two managers" rules. The construction is a cumulative-array realization indexed by the maximal forbidden coalitions. Per-player share size can be exponential in the worst case, but for many practical structures it is reasonable.

**Benaloh-Leichter, 1988.** A second route to general access structures, this one walking a monotone Boolean formula tree: AND nodes additively split, OR nodes replicate, leaves go to the named party. Simpler than ITO when the access predicate is short to write down.

**Brickell, 1989.** *Ideal* vector-space secret sharing for access structures that admit this representation. Sample uniform $u$ with $\langle u, e_1 \rangle = s$; player $j$ holds $\langle v_j, u \rangle$ for a public vector $v_j$. Each player receives one field element. A coalition can reconstruct when its public vectors span the target vector; this does not mean every access structure has an ideal representation.

**Karchmer and Wigderson, *On Span Programs*, 1993.** The most general linear secret-sharing framework. A labeled matrix $(M, \rho)$ over $\mathrm{GF}(p)$ and a target vector $e_1$; a coalition is qualified if $e_1$ lies in the row span of its labeled rows. Subsumes every other linear SSS in the literature. Brickell and Massey are special cases.

**Massey, *Minimal Codewords and Secret Sharing*, 1993.** A linear-code formulation that ties secret sharing directly to the dual code structure. The minimal qualified coalitions correspond to the minimal codewords of a dual code. A perspective from coding theory rather than algebra.

**Naor and Shamir, *Visual Cryptography*, 1994.** The secret is a black-and-white image. Each share is also an image, printable on transparency film. Stack any $n$ shares physically and the original image becomes visible to the human eye, by literal optical superposition. Stack fewer and you see noise. There is no decryption algorithm — the eye is the decryption algorithm. The crate implements the basis-matrix construction so you can produce shares of an actual image and verify reconstruction by overlaying the bit patterns.

**Blakley-Meadows, 1984.** A $(k, L, n)$ ramp generalization of the Blakley hyperplane scheme — the geometric counterpart to Yamamoto.

**Rabin, *Efficient Dispersal of Information*, 1989.** Not a secret-sharing scheme but in the same family. Reed-Solomon-based information dispersal: per-share storage of $|F|/k$ bytes, any $k$ shares reconstruct the file, no secrecy. Use when the goal is erasure tolerance and load balancing rather than confidentiality.

**Rabin-Ben-Or, 1989.** The `vss` module implements bivariate-polynomial shares and pairwise consistency checks. Its [source documentation](https://github.com/darrelllong/secret-sharing/blob/04f056a67ba3568d3cc8b9c968b710cd7e2c95da/src/vss.rs) distinguishes these primitives from a complete distributed protocol: callers must supply private communication, broadcast, and complaint handling. The `deal_validated` constructor checks $2(k - 1) < n$; the ordinary `deal` constructor does not. A consistency check alone is not a guarantee that every cheating dealer will be detected.

**Feldman, *A Practical Scheme for Non-interactive Verifiable Secret Sharing*, 1987.** The crate's `cgma_vss` module uses Feldman-style commitments: $c_i = g^{a_i} \bmod p$, with verification by $g^{f(j)} = \prod c_i^{j^i}$. The module name refers to the earlier work of Chor, Goldwasser, Micali, and Awerbuch, who introduced VSS in 1985; [Feldman's paper](https://cgis.cs.umd.edu/~gasarch/TOPICS/secretsharing/feldmanVSS.pdf) describes the distinct non-interactive construction. Publishing $g^s$ permits offline guessing of a low-entropy secret, so these commitments do not preserve Shamir's information-theoretic secrecy.

**Herzberg, Jarecki, Krawczyk, Yung, *Proactive Secret Sharing*, 1995.** Periodic refresh adds zero-constant polynomials to the sharing polynomial, preserving the secret while changing the shares. The library [simulates this step in one process](https://github.com/darrelllong/secret-sharing/blob/04f056a67ba3568d3cc8b9c968b710cd7e2c95da/src/proactive.rs). A secure distributed deployment also needs authenticated private channels, verification of refresh contributions, erasure of obsolete shares and randomness, and the protocol's corruption bounds. The refresh function alone does not provide those properties.

Having these constructions in one language, built on shared algebraic primitives, makes them easier to compare. Brickell is a one-row-per-player specialization of a monotone span program; Yamamoto's ramp construction includes Shamir and the unpadded Reed–Solomon case at its endpoints; Ito and Benaloh-Leichter express general access rules in different ways.

## Implementation and Dependencies

The current source identifies itself as version 0.6.0. Its [Cargo manifest](https://github.com/darrelllong/secret-sharing/blob/04f056a67ba3568d3cc8b9c968b710cd7e2c95da/Cargo.toml) depends on `rust-mp`, the package for my companion [`rump`](https://github.com/darrelllong/rump) multiprecision library. The big-integer implementation has moved there; it is no longer accurate to describe this crate as dependency-free. The ChaCha20 generator and Unix operating-system entropy interface remain in this repository.

The code includes zeroing wrappers for sensitive buffers, redacted debugging output for share values, and comparison helpers that avoid early exits. These are useful implementation measures, but they are not a proof of complete erasure or resistance to timing attacks. The multiprecision arithmetic is explicitly variable-time. An application must assess the complete computation and its exposure to an observer; running on a different machine does not by itself rule out a timing attack.

## A C++ Port for Cross-Validation

A C++23 port of the foundational layer lives in `cpp/`: `BigUint`, the ChaCha20 RNG, the prime field with the Mersenne-127 fast path, polynomial Horner and Lagrange, and Shamir split/reconstruct. The cross-language contract is exercised in `test/test_compat.cpp` against vectors emitted by `cargo run --release --example dump_compat_vectors`. Same wire format, same byte stream from the CSPRNG, same Lagrange round-trip. This is a discipline I recommend to anyone implementing cryptographic primitives: write the core twice, in two different languages, and make the implementations agree byte-for-byte on the test vectors. A disagreement exposes a problem to investigate; agreement on test vectors does not prove that either implementation is free of errors.

## Performance

The repository's [performance report](https://github.com/darrelllong/secret-sharing/blob/04f056a67ba3568d3cc8b9c968b710cd7e2c95da/PERFORMANCE.md) records Pilot measurements with the machine, field, threshold, sample count, and confidence interval. For example, its Apple M4 measurement of Shamir with $(k=3, n=5)$ over $\mathrm{GF}(2^{127}-1)$ reports 2.911 µs per split and 5.685 µs per reconstruction, with 95% confidence-interval half-widths of 0.0369 and 0.0488 µs respectively. These are measurements of that configuration, not general performance guarantees.

The constructions share field arithmetic, but their reconstruction algorithms differ: polynomial interpolation, linear-system solution, and span-program reconstruction have different costs. The report and benchmark driver provide the details needed to compare them.

## Where It Earns Its Keep

The library is a way to study the constructions alongside their source papers and compare their assumptions. Threshold sharing can support distributed custody of a key; general access structures express rules such as “two officers must agree”; ramp schemes trade secrecy thresholds against storage; information dispersal provides erasure tolerance without confidentiality.

Those uses require more than the splitting operation. Authentication, reliable storage, recovery procedures, secure randomness, and the treatment of a reconstructed secret belong to the surrounding system. The distinctions between the schemes matter: in particular, Asmuth–Bloom's statistical secrecy and Rabin's information dispersal should not be described as interchangeable with perfect Shamir sharing.

The code is at [github.com/darrelllong/secret-sharing](https://github.com/darrelllong/secret-sharing). It is BSD-licensed. The papers are in `pubs/` for cross-checking. Clone the crate, run `cargo test`, run `bash scripts/bench_pilot.sh`, and read the algebra.

The crate is also published on [crates.io](https://crates.io/crates/secret-sharing-rs):

```toml
[dependencies]
secret-sharing-rs = "0.6"
```

The package name is `secret-sharing-rs`; the library import name is `secret_sharing`. Documentation is auto-built at [docs.rs/secret-sharing-rs](https://docs.rs/secret-sharing-rs).


*Updated September 20, 2026; implementation details checked against source revision `04f056a`.*
