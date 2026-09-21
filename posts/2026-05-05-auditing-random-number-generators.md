---
title: "Random Number Generators in Rust"
date: "2026-05-05"
tags: ["research", "cryptography", "rust", "randomness"]
excerpt: "The entropy library provides PRNGs and CSPRNGs, exact integer sampling, continuous distributions, reproducible parallel streams, and statistical tests."
---

[`entropy`](https://github.com/darrelllong/entropy) provides random number generators for simulation, randomized algorithms, and cryptographic applications. It implements modern PRNGs and CSPRNGs in Rust, with a common interface for seeding, drawing values, sampling distributions, and filling byte buffers. The repository also contains statistical test batteries and performance measurements for the generators.

The library handles details that affect the results of a computation: bias when mapping words into an integer range, precision near zero when drawing floating-point values, reproducibility across parallel workers, and the lifetime of a cryptographic generator's key. These are part of the implementation, with derivations, reference vectors, and tests alongside the code.

## PRNGs and Reproducibility

The simulation generators include PCG32 and PCG64, the star-star variants of xoshiro256 and xoroshiro128, SFC64, JSF64, and MT19937. They implement the same `Rng` interface. The `Seedable` trait supplies construction from explicit seed bytes, expansion of a 64-bit seed with SplitMix64, and seeding from the operating system.

A fixed seed makes an experiment reproducible:

```rust
use entropy::rng::{Pcg64, Sample, Seedable};

fn main() {
    let mut rng = Pcg64::seed_from_u64(42);
    let die = rng.range(1, 7);       // Integers 1 through 6.
    let event = rng.ratio(1, 3);     // Probability exactly 1/3.
    let normal = rng.normal();      // Standard normal variate.

    let mut order: Vec<usize> = (0..100).collect();
    rng.shuffle(&mut order);
    println!("{die} {event} {normal} {order:?}");
}
```

`Xoshiro256` and `Xoroshiro128` also support jumping ahead and assigning segments of a stream to workers. `Xoshiro256::stream(k)` begins at offset $k\,2^{128}$ from the starting state; the corresponding spacing for `Xoroshiro128` is $2^{64}$. Assigning a fixed segment to each worker makes its sequence independent of scheduling order. The jump polynomial is derived from the generator's state transition using Berlekamp–Massey. The implementation checks jumps against repeated ordinary steps.

Known-answer tests pin seeded sequences and sampling results. Changes to those sequences are recorded as breaking changes: the 0.6.0 changelog, for example, identifies the new sequences produced by the normal and exponential samplers.

## Sampling Without Introducing Bias

A generator supplies words; an application usually needs something more specific. The [`Sample` implementation](https://github.com/darrelllong/entropy/blob/main/src/rng/sample.rs) supplies bounded integers, Bernoulli trials, floating-point values, normal and exponential variates, shuffles, weighted choices, and sampling without replacement.

For bounded integers, the library uses Lemire's multiply-and-reject method. Reducing a random word modulo a bound gives some results more preimages than others unless the bound divides the word space. Rejection removes that imbalance. The implementation's test enumerates every 12-bit word for every representable positive bound and checks that all results have the same number of accepted preimages.

`ratio(a, b)` samples probability $a/b$. `bernoulli(p)` compares random bits with the binary expansion of the supplied double, reading further bits when necessary, so small probabilities are retained. Integer-weighted choices sum their weights in 128 bits. These methods preserve the specified probabilities given independent, uniform generator words.

There are two useful floating-point interfaces. `unit_f64()` draws uniformly from the $2^{53}$-point grid in $[0,1)$. `unit_f64_dense()` instead models a uniform real rounded down to a double: representable values receive probability according to the interval they represent, including subnormal values near zero. This matters when a transformation such as $-\ln U$ turns small values of $U$ into the tail of a distribution.

The normal and exponential samplers use Marsaglia and Tsang's ziggurat method. Their tables are derived once from the equal-area recurrence. Most draws require one generator word and no transcendental function. Separate inverse-transform methods remain available for finely resolved tails. Tests check the table areas, distribution moments, and the tail distribution itself.

## Cryptographically Secure Generators

The cryptographic generators include ChaCha20, Hash_DRBG with SHA-256, HMAC_DRBG with HMAC-SHA-256, and CTR_DRBG with AES-256. Their underlying cipher and DRBG mechanisms come from the companion [`cryptography`](https://github.com/darrelllong/cryptography) library. `CryptoRng` provides a marker trait that applications can require where a simulation generator would be inappropriate.

For applications, `thread_rng()` maintains a generator for each thread, seeded from the operating system. It uses ChaCha20 with Bernstein's fast key erasure construction. Each refill produces 512 bytes: the first 32 replace the key, and the remaining 480 supply output. Consumed bytes are erased from the internal buffer. Replacing the key protects earlier output if the current generator state is later exposed, under the security assumption of ChaCha20.

The thread-local generator takes fresh key material after about a GiB of output and when it detects a changed process ID after a fork. Bulk fills split at the reseeding boundary. Fallible methods report operating-system errors to the caller:

```rust
use entropy::rng::try_thread_rng;

fn main() -> std::io::Result<()> {
    let mut rng = try_thread_rng()?;
    let mut bytes = [0u8; 32];
    rng.try_fill(&mut bytes)?;
    Ok(())
}
```

The current operating-system entropy backend supports Unix. Applications can also use explicit keys and seeds through the individual generator interfaces.

## Performance

The repository measures both raw generation and the operations applications perform. Buffered generators have a bulk byte interface, `fill_native`, that avoids extracting output one word at a time. For 64-bit PRNGs it also uses the full word; the statistical runner's `next_u32` interface takes only the high half.

The [generator benchmarks](https://github.com/darrelllong/entropy/blob/9f72d34e0785af1ec2a8445cb9fb02643daf028a/BENCHMARKS.md) use [Pilot](/blog/2026-03-06-performance-evaluation/) and report throughput with confidence intervals across several machines. The report identifies compiler and implementation changes that prevent some columns from being compared directly. Its normal unit is millions of 32-bit words per second; a generator's rate in that interface is different from its bulk-byte rate or the rate of a distribution sampler.

The repository also contains best-of-rounds development timings for sampling operations. Those timings do not establish a statistically supported speed advantage over another library, so I do not use them here as comparative performance results.

## Testing the Generators

The library includes NIST SP 800-22, DIEHARD, DIEHARDER, and additional research tests. These exercise the generators through several views of their output, including the low and high halves of 64-bit words and bit-reversed output. Historical generators, constant streams, and deliberately introduced defects provide comparison cases. External byte streams can also be tested.

The mathematical work includes deriving null distributions, measuring false-alarm rates, and measuring detection power against specified defects. The repository keeps the [results](https://github.com/darrelllong/entropy/blob/main/TESTS.md), [power measurements](https://github.com/darrelllong/entropy/blob/main/POWER.md), and [remaining calibration work](https://github.com/darrelllong/entropy/blob/main/AUDIT.md) available for examination. Statistical evidence, conformance to published algorithms, sampling correctness, and cryptographic construction answer different questions; the code and reports address each in its own terms.

## Using the Source

The examples above use the [September 17, 2026 source revision](https://github.com/darrelllong/entropy/tree/9f72d34e0785af1ec2a8445cb9fb02643daf028a), whose package version is 0.6.0. At this update, [crates.io](https://crates.io/crates/rng-entropy) carries 0.5.0. The package name is `rng-entropy`; the Rust library name is `entropy`.

In the current source, disabling default features gives an application the PRNGs, sampling methods, seeding interfaces, and probability functions with no external dependencies. The `cryptography` feature adds the cryptographic generators; the `batteries` feature adds the statistical suites and FFT dependency. Both features are enabled by default. The [usage guide](https://github.com/darrelllong/entropy/blob/main/USAGE.md#random-values-in-applications) describes the application interfaces, and the source is available under the BSD two-clause license.

*Updated September 20, 2026.*
