---
title: "Cryptography From the Specifications"
date: "2026-05-05"
tags: ["research", "cryptography", "rust"]
excerpt: "A pure-Rust crate that implements classical and modern cryptographic primitives directly from their published specifications — auditable, portable, and written so you can read it."
---

I have been building a [cryptography library](https://github.com/darrelllong/cryptography) in Rust. It is now broad enough that it is worth describing what is in it and what it is for.

The premise is simple. Take the published specifications — FIPS, NIST SP 800, IETF RFCs, the original design papers — and turn each of them into safe, idiomatic Rust. No C/FFI escape hatches. No architecture intrinsics in the cipher cores. Minimal dependencies. One language, top to bottom, that you can read.

Most production cryptography in the wild is a thin wrapper over OpenSSL, BoringSSL, or a vendor's hand-tuned assembly. Those are the right choice when the only metric is throughput on a known platform. They are the wrong choice when the goal is to understand what is happening, audit it, port it, or teach from it. The standard libraries are large, multi-language, and dense with platform-specific paths; they were written to be fast, not to be read.

This crate is written to be read. Speed is a secondary objective, and Pilot-measured benchmarks confirm it remains a competitive one.

## What Is in It

The coverage is intentionally wide, because the point is to demonstrate that an entire modern cryptographic toolbox can be built from primary sources in one auditable language.

**Block ciphers.** AES-128/192/256, Camellia, Serpent, Twofish, CAST-128, SEED, PRESENT, SIMON and SPECK in all ten published variants, the two GOST ciphers (Magma and Grasshopper/Kuznyechik), the Chinese standard SM4, and DES with full Triple-DES. Where a fast table-driven implementation would otherwise leak through cache timing, there is a separately-named software constant-time variant suffixed `Ct` — `Aes128Ct`, `Sm4Ct`, and so on. The API does not hide the trade-off; you choose explicitly.

**Stream ciphers.** ChaCha20 and XChaCha20, Salsa20, Rabbit, the 3GPP ciphers SNOW 3G and ZUC-128, plus Poly1305 as a one-time authenticator and the full ChaCha20-Poly1305 AEAD from RFC 8439.

**Modes of operation.** The complete SP 800-38 family (ECB, CBC, CFB, CFB8, OFB, CTR, CMAC, CCM, GCM, GMAC, XTS, AES Key Wrap), plus the modern AEADs the standards committees missed the first time round: SIV (RFC 5297), OCB3 (RFC 7253), AES-GCM-SIV (RFC 8452), and the Bellare-Rogaway-Wagner EAX construction. GCM enforces the SP 800-38D per-call payload bound so callers cannot accidentally wrap the counter.

**Hashes and MACs.** SHA-1, the full SHA-2 family, SHA-3 and the SHAKE XOFs, RIPEMD-160 and MD5 for legacy compatibility, generic HMAC and HKDF parameterized by any in-tree digest. The SHA-3 module has one carefully-scoped exception to the no-intrinsics rule: an aarch64 `FEAT_SHA3` Keccak fast path gated on runtime feature detection, with the portable scalar Keccak as the always-correct fallback.

**Public-key primitives.** RSA with the standards-backed wrappers (OAEP, PSS, PKCS #1, PKCS #8, SPKI in DER and PEM), DSA per FIPS 186-5, ElGamal, Rabin, Cocks's 1973 non-secret encryption note, Paillier with its homomorphic ciphertext addition still exposed, and Schmidt-Samoa. The bigint kernel underneath is in-tree — Karatsuba, Comba, Montgomery — written from the original papers, not pulled in as a dependency.

**Elliptic curves.** X25519 and X448 ECDH per RFC 7748, validated against the full reference test vector set including the one-million-iteration vectors. These are constant-time in the secret scalar by construction: mask-driven `cswap`, fixed-radix limbs, no data-dependent branches.

**Post-quantum.** Pure-Rust implementations of ML-KEM (FIPS 203, formerly Kyber) at all three parameter sets, and ML-DSA (FIPS 204, formerly Dilithium) at all three. These are the standards NIST settled on after the post-quantum competition concluded. They are here, working, with strict wire-format parsing and differential testing against the reference C code.

**A CSPRNG.** SP 800-90A's CTR-DRBG over AES-256, deterministic once seeded — the crate intentionally does not provide an OS entropy source, because inventing your own entropy source is a classic way to ship a broken product. Seed it from `getentropy` or the platform equivalent.

## Why a Variable-Time Public-Key Path

Public-key operations in this crate are variable-time by policy, and that is declared in the namespace itself: everything lives under `cryptography::vt`. Writing constant-time public-key code at the bigint level is a research-grade undertaking, and pretending otherwise would be dishonest. The namespace tells you what you are getting. X25519 and X448 are exceptions, because the RFC 7748 ladder is constant-time at the algorithm level and the implementation preserves that.

The symmetric side is the inverse: the bare-named types like `Aes128` are the fast table-driven path, and the `Ct` suffix marks the constant-time variant. AEAD wrappers `Gcm`, `Gmac`, `GcmVt`, and `GmacVt` make the choice explicit per construction. There is no hidden default that "tries to do the right thing." You picked it.

## What This Buys You

There are several existing Rust cryptography crates — `ring`, RustCrypto, `rustls` — and OpenSSL and BoringSSL on the C side. This one is built around four properties the others largely do not provide.

*Coverage.* The mainstream crates implement what is in current production use. They do not include Cocks's 1973 paper, Paillier with its homomorphism exposed, SNOW 3G, ZUC, PRESENT, all ten SIMON and SPECK variants, or Magma and Grasshopper. There is research and pedagogical value in having those, in one place, to one consistent style, written from the original sources.

*Auditability.* Every cipher core, every mode, every bigint operation is in the same crate, in the same language, with no FFI boundary. The full encryption path from `encrypt_block` down to the integer multiplication primitive reads in one tool, without dropping into hand-tuned assembly. That matters for teaching, for reviewing, for porting to unusual targets, and for understanding what a cryptographic library is actually doing on your machine.

*Post-quantum.* ML-KEM and ML-DSA are not optional going forward. Pure-Rust implementations of FIPS 203 and FIPS 204, written from the standard rather than wrapped over a reference C tree, make the math directly accessible.

*Honest measurement.* All publication-facing benchmarks use [Pilot](/blog/2026-03-06-performance-evaluation), the adaptive benchmarking framework. No hand-picked loop counts, no cherry-picked best runs, no graphs without confidence intervals. The `pilot_cipher` and `pilot_pk` workload binaries ship with the crate, and the scripts that drive them are in `scripts/`. Anyone can re-run the numbers on their own hardware, and they come with `±` and a sample size.

## Where It Fits

This is a portable, readable, dependency-light cryptographic toolbox in one language, built from primary sources, with the variable-time and constant-time trade-offs declared at the type level and the post-quantum standards already implemented. The optional `fast/` sibling crates provide Apple Silicon AES/GHASH/SHA-256 and x86 PCLMULQDQ kernels behind explicit `is_supported()` capability checks, kept outside the root crate's perimeter and tested separately.

A companion repository, [`entropy`](https://github.com/darrelllong/entropy), depends on this crate and provides everything around the cryptographic core: non-cryptographic generators (LCG, MT19937, PCG, xoshiro, SFC, WyRand), stream-cipher and block-cipher CTR-mode RNGs wrapping ciphers from this crate, deliberately broken historical generators retained for comparison (including Dual_EC_DRBG, because the lesson is worth keeping), and the NIST SP 800-22, DIEHARD, and DIEHARDER statistical test batteries. The two repositories are designed to be read together.

The code is at [github.com/darrelllong/cryptography](https://github.com/darrelllong/cryptography). It is BSD-licensed. Read it, run the tests, run the benchmarks, file issues.
