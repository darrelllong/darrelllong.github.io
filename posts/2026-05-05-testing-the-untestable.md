---
title: "Testing the Untestable: A Statistical Audit Suite for RNGs"
date: "2026-05-05"
tags: ["research", "cryptography", "rust", "randomness"]
excerpt: "A pure-Rust harness that runs NIST SP 800-22, DIEHARD, and DIEHARDER against 43 generators — from deliberately broken historical PRNGs to ChaCha20 and the known-backdoored Dual_EC_DRBG."
---

The companion to the [cryptography library](/blog/2026-05-05-cryptography-from-the-specifications) I described earlier is a separate repository called [`entropy`](https://github.com/darrelllong/entropy). It exists for a different purpose: not to *produce* cryptographic primitives, but to *examine* the random number generators that feed them. That distinction matters more than people usually realize.

A cipher with a strong implementation and a weak random source is a broken cipher. The history of practical cryptographic failures is mostly a history of bad randomness, not a history of bad ciphers. Debian OpenSSL in 2008. The Sony PS3 ECDSA leak in 2010. The Juniper Dual_EC backdoor exposed in 2015. The countless TLS handshakes James Hughes documented in his 2022 dissertation, where low-entropy seeds let the same private key turn up in unrelated certificates. The cipher worked perfectly in every one of those cases. The randomness did not.

So `entropy` is a statistical test harness. It is also a cabinet of cautionary examples.

## What Is in It

The harness implements three of the canonical batteries:

- **NIST SP 800-22 Rev. 1a** — the federal recommendation: frequency, block frequency, runs, longest run, matrix rank, spectral, non-overlapping templates (all 148 aperiodic 9-bit templates), serial, approximate entropy, cumulative sums, universal, linear complexity, random excursions, random excursions variant.
- **DIEHARD** — Marsaglia's 1995 battery: birthday spacings, binary rank, bitstream, the various monkey tests, count-the-ones, craps.
- **DIEHARDER** — Brown's modernization: `fill_tree`, `gcd`, `bit_distribution`, and the others that survived the cull.

Each test is implemented in pure Rust, written from the published reference rather than wrapped over Brown's C tree. Some are line-for-line faithful; some are close ports; a small number are still approximate, and the README is explicit about which is which. That honesty matters. A statistical test you trust without understanding it is almost as dangerous as the bad RNG it is supposed to catch.

On top of the three classic batteries there are five auxiliary research probes: Knuth's permutation, gap, and runs-above/below-median tests from TAOCP Vol. 2 §3.3.2 swept against approximate entropy at multiple embedding dimensions; the TestU01 Lempel-Ziv compression statistic with the empirical calibration table; the TestU01 `HammingCorr` and `HammingIndep` statistics; the PractRand `FPF(4,14,6)` floating-point bucket test; and an implementation of the Webster-Tavares Strict Avalanche Criterion and Bit Independence Criterion from CRYPTO 1985, applied as a differential probe against seeded PRNG families.

There is also a parametric form of Maurer's 1992 universal test, swept across `L = 6..16` rather than locked to the single value the NIST document fixes. The full parametric family is substantially more sensitive than the NIST setting, and the harness emits every parameter set that fits the available sample.

## What It Tests Against

The runner ships with 43 built-in generators arranged in six deliberate tiers.

**Degenerate.** `ConstantRng` (the same word forever) and `CounterRng` (0, 1, 2, …). These exist as negative controls. They must fail every test the battery is capable of running. If they ever pass anything, the battery is broken, not the generator.

**Historical broken generators.** The unix libc heritage in all its embarrassing variety: System V `rand()`, `mrand48()`, BSD `random()`, glibc `rand()/random()`, FreeBSD `rand_r()`, plus Microsoft's CRT `rand()`, the VB6 `Rnd()`, the .NET `Random` class, and the classic LCGs — ANSI C, MINSTD, Borland C++. These are kept verbatim, with their original constants. They fail the batteries thoroughly and predictably, and that is the point: the failures look the way the literature says they should look.

**Quality simulation generators.** MT19937, the xorshift family, PCG32 and PCG64, Xoshiro256, Xoroshiro128, WyRand, SFC64, JSF64. These pass the classic batteries and are appropriate for Monte Carlo work and reproducible scientific simulation. They are also all *invertible* — an adversary who can observe output can reconstruct the internal state and predict everything that follows. The crate is unsubtle about this. None of them belong in any adversarial context, no matter how well they perform on a goodness-of-fit test.

**Cipher-CTR CSPRNGs.** The cryptography crate's block ciphers run in CTR mode as random sources: AES-128, Camellia-128, Twofish-128, Serpent-128, SM4, Grasshopper, CAST-128, SEED. Plus the stream ciphers as direct keystream sources: Rabbit, Salsa20, SNOW 3G, ZUC-128. This is where the dependency on the [cryptography](/blog/2026-05-05-cryptography-from-the-specifications) crate earns its keep — the test harness is exercising the *same* primitive code that would ship in a real deployment.

**NIST DRBGs.** SP 800-90A's `HashDrbg` (SHA-256), `HmacDrbg` (HMAC-SHA-256), and `CtrDrbgAes256`, plus a ChaCha20 stream-DRBG and two more for variety: `SpongeBob` (a SHA3-512 chain) and `Squidward` (a SHA-256 chain).

**Backdoored.** `Dual_EC_DRBG`, with the standardized NIST P-256 `Q` point. Bernstein, Lange, and Niederhagen showed in 2014, and Checkoway and his coauthors confirmed in detail in 2015, that this generator is backdoored at the standard level: an adversary who knows the discrete log relationship between the standard `P` and `Q` can recover the entire internal state from 32 bytes of output and predict everything that follows. The Snowden documents made the political dimension public; the math made it inescapable. It is in the harness as a reference implementation of a known-bad design and as a reminder that "passes statistical tests" is a much weaker claim than "is cryptographically secure." Dual_EC, run honestly, *passes* most of the batteries here. That is precisely the warning.

The 43-generator mix means the output is useful in two directions at once: it confirms that the batteries reject the obviously broken constructions, and it confirms that they pass the strong ones. Run them side by side and the contrast is the lesson.

## Why a Test Battery Is Not a Security Proof

There is a recurring misunderstanding in the literature, and especially in the marketing material, that runs roughly: "our generator passed NIST SP 800-22, therefore it is secure." That is false in a way that should be more widely understood than it is.

The classical batteries test *distributional uniformity*. They check that the output looks like a fair coin in increasingly clever ways. They do not, and cannot, test for *unpredictability*. A generator whose state is recoverable from a short output window — every LCG, every xorshift, every PCG, MT19937, and Dual_EC_DRBG — can produce output that is statistically indistinguishable from a true random stream and still be catastrophically broken. The adversary does not care about your chi-square statistic. The adversary cares whether they can predict your next nonce.

This is the asymmetry that the harness is built to make visible. Passing 738 tests at α = 0.01 — the standard runner exercises 738 test slots per generator at 16 Mbit — is a lower bound on quality, not an upper bound. The READMEs, the USAGE document, and the per-generator notes all hammer this point, because the field has shown over and over that one slip in this direction produces a working cipher protecting nothing.

## How It Is Organized

The crate builds and runs as plain Rust, with no C dependencies for any of the test code. The full audit is one shell script:

```text
tests/run_all.sh
```

It runs the complete NIST/DIEHARD/DIEHARDER battery plus the five auxiliary probes against every built-in generator, and writes a timestamped log. A Python helper turns that log back into the table that lives in `TESTS.md`. Throughput benchmarks are measured with [Pilot](/blog/2026-03-06-performance-evaluation), so the MW/s numbers come with confidence intervals and a sample size, not a hand-picked best run.

The reference shelf is in `pubs/`: NIST SP 800-22, SP 800-90A, SP 800-90B, SP 800-90C, FIPS 140-3, the original Diehard 1995 distribution, the dieharder 3.31 source archive and manual, the L'Ecuyer-Simard TestU01 paper, Maurer's 1992 universal-test paper, Marsaglia and Tsang on difficult-to-pass tests, Webster and Tavares from CRYPTO 1985, and Hughes's 2022 BADRANDOM dissertation. When the code claims fidelity to a published test, the canonical document is right there in the repository for cross-checking. There is no excuse for trusting a summary.

## What It Is Not

It is not a production RNG library. None of the generators in it should be copied into deployment code on the strength of having passed these tests. The harness is for *auditing and comparison* — the negative space, not the positive recommendation. If you need a CSPRNG in real code, use the OS entropy source, full stop, and feed it through one of the standardized DRBGs from the cryptography crate.

It is also not a substitute for TestU01's BigCrush or for PractRand's full streaming analysis. Both are more sensitive than the classical batteries on small-state generators, and the harness implements only the core statistics from each, not the complete suites. The TestU01 and PractRand sections of the README are explicit about what is and is not in scope.

What it is, is a single readable codebase that lets you watch the classic batteries do exactly what the literature says they should do — punish the obviously broken, pass the strong, and leave you with a clear picture of where the line falls and where it does not.

## Why Both Repositories Matter Together

The cryptography crate provides the primitives. The entropy crate examines the *quality of the randomness those primitives consume*. Either one alone is incomplete. A cipher implementation, however careful, depends on the discipline of its caller; the test harness exists to make that dependency visible, measurable, and impossible to wave away.

The two repositories are designed to be read together — and, I hope, to remind anyone who deploys cryptographic code that the cipher is rarely the weakest link. The randomness almost always is.

The code is at [github.com/darrelllong/entropy](https://github.com/darrelllong/entropy). It is BSD-licensed.
