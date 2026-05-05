---
title: "Threshold Secret Sharing in Pure Rust"
date: "2026-05-05"
tags: ["research", "cryptography", "rust", "secret-sharing"]
excerpt: "Pure-Rust implementations of every constructive secret-sharing scheme from the foundational papers — Shamir, Blakley, McEliece-Sarwate, Asmuth-Bloom, Brickell, Karchmer-Wigderson, Naor-Shamir visual cryptography, and the rest."
---

The third repository in this set is [`secret-sharing`](https://github.com/darrelllong/secret-sharing). The [cryptography crate](/blog/2026-05-05-cryptography-from-the-specifications) covers ciphers, hashes, and public-key primitives. The [entropy harness](/blog/2026-05-05-auditing-random-number-generators) audits the random sources those primitives depend on. This one is an in-tree, pure-Rust implementation of every constructive *threshold secret-sharing* scheme from the foundational literature — including several that mainstream libraries omit.

Secret sharing is one of the more elegant ideas in cryptography and one of the most under-used. The setup is simple. You have a secret $s$ — a key, a passphrase, the combination to a vault. You want to split it into $n$ pieces such that any $k$ of them recover $s$ and any $k - 1$ reveal nothing whatsoever about it. Not "computationally nothing." Information-theoretically nothing. Every candidate value of $s$ remains exactly as likely as it was before.

That is a remarkable property. Most cryptographic constructions hide a secret behind a hardness assumption — factoring, discrete log, lattice problems — that would crumble in front of an attacker with unbounded computation. A perfect threshold scheme survives that attacker unchanged. The hardness is replaced by algebra, and the algebra is unconditional.

## The Schemes

Most software libraries that touch secret sharing implement Shamir 1979 and stop. Shamir is the right default, but the literature around it is much richer, and the alternatives illuminate the design space in ways the canonical scheme alone cannot. This crate implements all of them.

**Shamir, *How to Share a Secret*, 1979.** The classical $(k, n)$ polynomial threshold scheme. Pick a random degree-$(k - 1)$ polynomial $q(x)$ with $q(0) = s$, hand share $i$ the value $q(i)$, recover via Lagrange interpolation. The crate also implements the Karnin-Greene-Hellman 1983 multi-secret extension: pack $\ell \le k$ secrets into the low coefficients and recover all of them in one round.

**Blakley, *Safeguarding Cryptographic Keys*, 1979.** Same year as Shamir, completely different idea. The secret is the first coordinate of a point $P \in \mathrm{GF}(p)^k$, and each share is a random hyperplane through $P$. Any $k$ hyperplanes intersect at a unique point; fewer leave a positive-dimensional affine subspace of candidates. Geometric where Shamir is algebraic.

**McEliece and Sarwate, *On Sharing Secrets and Reed-Solomon Codes*, 1981.** A profound observation: Shamir's scheme *is* a Reed-Solomon code. That means the entire machinery of error-correcting codes — and in particular Berlekamp-Welch decoding — applies to secret sharing. The crate implements robust reconstruction: given $m$ shares of which up to $t$ may have been *tampered with*, the secret is recoverable whenever $m - 2t \ge k$. This is the property that makes secret sharing usable in adversarial environments where some shareholders may lie.

**Mignotte 1983 and Asmuth-Bloom 1983.** Both build $(k, n)$ schemes from the Chinese Remainder Theorem rather than from polynomial interpolation. Mignotte gives reconstruction-uniqueness without perfect secrecy; Asmuth-Bloom adds a public masking modulus to recover statistical secrecy. Useful illustrations that the threshold property is not specific to Shamir's algebra — it is a structural property that several different mathematical surfaces support.

**Karnin, Greene, Hellman, *On Secret Sharing Systems*, 1983.** The trivial $n$-of-$n$ additive split, the multi-secret extension, and the matrix scheme $v_i = u \cdot A_i$ for vector secrets. The matrix formulation generalizes neatly into Kothari's 1984 linear scheme, which in turn specializes back to Shamir (Vandermonde matrix), Blakley (random hyperplane matrix), or KGH (block-diagonal matrix) depending on what you choose.

**Yamamoto, 1986, $(k, L, n)$ ramp schemes.** Trade some secrecy for some bandwidth. Place $L$ secrets in a single polynomial; any $k$ shares recover all $L$, any $k - L$ shares reveal nothing, intermediate counts leak proportionally. $L = 1$ is exactly Shamir; $L = k$ is the McEliece-Sarwate ramp; the parameter $L$ interpolates between them. Important when the secret is large and per-share storage matters.

**Ito-Saito-Nishizeki, 1989.** Realize *any monotone access structure* — not just $k$-of-$n$, but arbitrary "this committee, or that committee, or any director plus any two managers" rules. The construction is a cumulative-array realization indexed by the maximal forbidden coalitions. Per-player share size can be exponential in the worst case, but for many practical structures it is reasonable.

**Benaloh-Leichter, 1988.** A second route to general access structures, this one walking a monotone Boolean formula tree: AND nodes additively split, OR nodes replicate, leaves go to the named party. Simpler than ITO when the access predicate is short to write down.

**Brickell, 1989.** *Ideal* vector-space secret sharing — one field element per player regardless of structure. Sample uniform $u$ with $\langle u, e_1 \rangle = s$; player $j$ holds $\langle v_j, u \rangle$ for a public vector $v_j$. The "ideal" property — share size equal to secret size — is the gold standard for efficiency.

**Karchmer and Wigderson, *On Span Programs*, 1993.** The most general linear secret-sharing framework. A labeled matrix $(M, \rho)$ over $\mathrm{GF}(p)$ and a target vector $e_1$; a coalition is qualified if $e_1$ lies in the row span of its labeled rows. Subsumes every other linear SSS in the literature. Brickell and Massey are special cases.

**Massey, *Minimal Codewords and Secret Sharing*, 1993.** A linear-code formulation that ties secret sharing directly to the dual code structure. The minimal qualified coalitions correspond to the minimal codewords of a dual code. A perspective from coding theory rather than algebra.

**Naor and Shamir, *Visual Cryptography*, 1994.** The secret is a black-and-white image. Each share is also an image, printable on transparency film. Stack any $n$ shares physically and the original image becomes visible to the human eye, by literal optical superposition. Stack fewer and you see noise. There is no decryption algorithm — the eye is the decryption algorithm. The crate implements the basis-matrix construction so you can produce shares of an actual image and verify reconstruction by overlaying the bit patterns.

**Blakley-Meadows, 1984.** A $(k, L, n)$ ramp generalization of the Blakley hyperplane scheme — the geometric counterpart to Yamamoto.

**Rabin, *Efficient Dispersal of Information*, 1989.** Not a secret-sharing scheme but in the same family. Reed-Solomon-based information dispersal: per-share storage of $|F|/k$ bytes, any $k$ shares reconstruct the file, no secrecy. Use when the goal is erasure tolerance and load balancing rather than confidentiality.

**Rabin-Ben-Or, 1989.** Information-theoretic *verifiable* secret sharing via bivariate polynomials. Honest players catch a cheating dealer with probability 1 through pairwise cross-checks. The honest-majority bound $2(k - 1) < n$ is enforced at construction time.

**Chor-Goldwasser-Micali-Awerbuch, *Verifiable Secret Sharing*, 1985.** Computational VSS via Feldman-style discrete-log commitments. Each polynomial coefficient is committed as $c_i = g^{a_i} \bmod p$, and each share is verified by checking $g^{f(j)} = \prod c_i^{j^i}$. The crate validates the Schnorr-group parameters with Miller-Rabin and checks every commitment in the prime-order subgroup.

**Herzberg, Jarecki, Krawczyk, Yung, *Proactive Secret Sharing*, 1995.** Periodic share refresh: each player contributes a degree-$(k - 1)$ polynomial $r_i$ with $r_i(0) = 0$, and shares are updated by adding $\sum_i r_i(j)$ at player $j$. Old shares no longer combine with new ones, so an attacker who slowly compromises players over time gets nothing usable as long as no $k$-subset is compromised in the same epoch. Lost shares can also be reconstructed via Lagrange evaluation. This is what makes secret sharing survive in the real world, where compromises are not instantaneous events.

Having all of these in one place, in one language, built on the same algebraic primitives, makes them directly comparable for the first time. Read the constructions side by side and the structural relationships become visible: Brickell is a one-row Karchmer-Wigderson, Yamamoto generalizes both Shamir and McEliece-Sarwate, Ito and Benaloh-Leichter solve the same problem from opposite directions. The literature is opaque when it is scattered across thirty papers in different notations. In a single crate, it is pedagogical.

## Pure Rust, No Dependencies

The `Cargo.toml` `[dependencies]` section is empty. Not "small," not "minimal" — *empty*. The big-integer arithmetic is in-tree. The Miller-Rabin primality testing is in-tree. The CSPRNG is in-tree: a ChaCha20 RFC 7539 implementation, scrubbed on drop, with the counter and nonce treated as a single 128-bit block index. The OS entropy source reads `/dev/urandom` directly. The `Cargo.lock` lists exactly one crate: this one.

That posture is rare. Most Rust cryptographic crates pull in `num-bigint`, `rand`, `rand_chacha`, `subtle`, `zeroize`, and a long tail of supporting libraries. Several of those are excellent — but the price is a transitive dependency surface that nobody reads end-to-end. Writing the bigint and the CSPRNG in-tree once is the simpler bargain.

## Defensive Hygiene

The crate is pure Rust and has no `unsafe` outside the volatile-zeroize primitive. Every secret-bearing intermediate buffer — polynomial coefficient vectors, bivariate matrices, refresh contributions, RNG keystream buffers — is wrapped in `Zeroizing<T>` so its contents are volatile-zeroed on every exit path, including panic unwind. `BigUint::Drop` zeros the entire allocated capacity, not just the live limbs. `BigUint`'s `Debug` prints `BigUint(<elided>)` so panic backtraces and `dbg!` calls cannot leak secret limbs.

Equality of secret-derived values stays on constant-time paths end-to-end. `BigUint`'s own `PartialEq` is a no-short-circuit OR-fold across all limbs — `==` on two `BigUint`s leaks neither the position of the first differing limb nor the operands' bit lengths beyond their (public) modulus. The `ct_eq_biguint` and `ct_eq_biguint_padded` helpers widen the same discipline to byte granularity and to cases where the operand byte length itself must be hidden. Every share-equality check in `shamir.rs` and `proactive.rs` — the consistency checks that catch a tampered share during reconstruction — routes through these helpers, never through an early-return comparator.

What is *not* claimed: side-channel resistance against a co-located timing observer of the *arithmetic*. The bigint multiplication, addition, subtraction, modular inverse, and modular exponentiation are variable-time and documented as such (the `pow` docstring, in particular, lists window-table indexing and zero-window skip as known leaks and forbids passing a secret exponent). Constant-time bigint code at this scale is a research-grade undertaking and is explicitly out of scope. The threat model is a remote adversary who never gets to share a CPU with the dealer or the trustees.

## A C++ Port for Cross-Validation

A C++23 port of the foundational layer lives in `cpp/`: `BigUint`, the ChaCha20 RNG, the prime field with the Mersenne-127 fast path, polynomial Horner and Lagrange, and Shamir split/reconstruct. The cross-language contract is exercised in `test/test_compat.cpp` against vectors emitted by `cargo run --release --example dump_compat_vectors`. Same wire format, same byte stream from the CSPRNG, same Lagrange round-trip. This is a discipline I recommend to anyone implementing cryptographic primitives: write the core twice, in two different languages, and make the implementations agree byte-for-byte on the test vectors. Bugs that hide in one tree show up immediately when the other tree disagrees.

## Performance

All numbers are measured with [Pilot](/blog/2026-03-06-performance-evaluation), with confidence intervals reported alongside the means. On Apple Silicon, $(k=3, n=5)$ Shamir over $\mathrm{GF}(2^{127} - 1)$ runs in ~5 µs to split and ~7 µs to reconstruct. Brickell, Massey, Kothari, and Karchmer-Wigderson all sit in the same range — the linear schemes cluster together because they all reduce to a single Lagrange-style interpolation over a Mersenne field element. Blakley is the outlier on reconstruction (~64 µs) because it solves a $k \times k$ linear system end-to-end where Shamir just evaluates a single denominator product.

The field layer recognises a catalogue of pseudo-Mersenne / Solinas / Crandall primes and dispatches each to a specialised reducer. The hand-rolled `u128` path for Mersenne-127 ($p = 2^{127} - 1$) is the tightest case — operands fit in two `u64`s and the 2×2 schoolbook plus Mersenne fold stays entirely in machine words. Beyond that, a templated reducer keyed on `δ = 2^k - p` covers Mersenne-521 ($2^{521} - 1$), the Curve25519 field ($2^{255} - 19$), Poly1305 ($2^{130} - 5$), the secp256k1 prime ($2^{256} - 2^{32} - 977$), Curve448 ($2^{448} - 2^{224} - 1$), and the NIST curves P-192, P-224, P-256, and P-384. Detection is a single BigUint comparison at field construction; arithmetic afterwards bypasses Montgomery setup entirely. The order-of-magnitude speedup over the previous Montgomery-only path applies across the whole catalogue, not only Mersenne-127. (P-256's four-term, four-offset fold is more expensive than its Montgomery alternative on the bench hardware, so its entry is kept for fuzz validation but routed to the generic Montgomery path.)

## Where It Earns Its Keep

Secret sharing is under-used. The literature deserves a readable, dependency-light, mathematically correct implementation that students and practitioners can both read end-to-end. Visual cryptography in particular almost never appears in mainstream libraries, and it is one of the most striking ideas in the subject.

The practical applications that deserve more attention:

- **Key splitting for high-value cryptographic keys.** Master signing keys, root CA keys, cold-storage Bitcoin keys. Single-machine custody is a single point of failure; threshold custody removes it.
- **Information-theoretically secure cloud storage.** Distribute Asmuth-Bloom or Shamir shares across providers; restore from any $k$, lose access from any $k - 1$.
- **Multi-party authorization.** "Two officers must agree." Benaloh-Leichter or Ito implements arbitrary monotone authorization predicates exactly.
- **Survivability under partial compromise.** Herzberg-Jarecki-Krawczyk-Yung proactive refresh lets the system survive a slow attacker who eventually compromises every machine, provided they never compromise enough at once.

The code is at [github.com/darrelllong/secret-sharing](https://github.com/darrelllong/secret-sharing). It is BSD-licensed. The papers are in `pubs/` for cross-checking. Clone the crate, run `cargo test`, run `bash scripts/bench_pilot.sh`, and read the algebra.

The crate is also published on [crates.io](https://crates.io/crates/secret-sharing-rs):

```toml
[dependencies]
secret-sharing-rs = "0.5"
```

The package name is `secret-sharing-rs` (the bare `secret-sharing` is held by an unrelated dormant 2019 crate); the library import name remains `secret_sharing`, so downstream code keeps writing `use secret_sharing::shamir;` and so on. Documentation is auto-built at [docs.rs/secret-sharing-rs](https://docs.rs/secret-sharing-rs).
