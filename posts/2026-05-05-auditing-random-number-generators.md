---
title: "Random Number Generators in Rust"
date: "2026-05-05"
tags: ["research", "cryptography", "rust", "randomness"]
excerpt: "The entropy library provides PRNGs and CSPRNGs, exact integer sampling, continuous distributions, reproducible parallel streams, and statistical tests."
---

[`entropy`](https://github.com/darrelllong/entropy) provides random number generators for simulation, randomized algorithms, and cryptographic applications. It implements several families of generators: generators used in simulation, cryptographic constructions, historical library implementations, and deliberately defective controls. Shared interfaces for drawing words, sampling distributions, and filling byte buffers allow their output to be examined with the same statistical tests and their performance to be measured through consistent interfaces.

The library handles details that affect the results of a computation: bias when mapping words into an integer range, precision near zero when drawing floating-point values, reproducibility across parallel workers, and the lifetime of a cryptographic generator's key. Derivations, reference vectors, and tests accompany the code.

## PRNGs and Reproducibility

The noncryptographic implementations span several approaches: linear congruential generators and the permuted congruential PCG family; Mersenne Twister (MT19937); xorshift, xoroshiro, and xoshiro; and the small-state SFC64 and JSF64 generators. Their inclusion allows comparisons among different state transitions and output functions. It does not imply that every generator is suitable for every application.

All implement the `Rng` interface. PCG32, PCG64, MT19937, SFC64, JSF64, Xoshiro256, and Xoroshiro128 also implement `Seedable`, which supplies construction from explicit seed bytes, expansion of a 64-bit seed with SplitMix64, and seeding from the operating system.

For a fixed generator and implementation, an explicit seed makes a sequence reproducible. Here PCG64 is one example of the shared sampling interface:

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

Parallel reproducibility also requires a stable assignment of streams to workers. The library supplies jump-ahead operations for `Xoshiro256` and `Xoroshiro128`, allowing workers to use designated segments of a sequence independently of scheduling order. This is a capability of those implementations; the common `Rng` interface does not require it.

Known-answer tests pin seeded sequences and sampling results. Changes to those sequences are recorded as breaking changes: the 0.6.0 changelog, for example, identifies the new sequences produced by the normal and exponential samplers.

## Sampling Without Introducing Bias

A generator supplies words; an application usually needs something more specific. The [`Sample` implementation](https://github.com/darrelllong/entropy/blob/main/src/rng/sample.rs) supplies bounded integers, Bernoulli trials, floating-point values, normal and exponential variates, shuffles, weighted choices, and sampling without replacement.

For bounded integers, the library uses Lemire's multiply-and-reject method. Reducing a random word modulo a bound gives some results more preimages than others unless the bound divides the word space. Rejection removes that imbalance. The implementation's test enumerates every 12-bit word for every representable positive bound and checks that all results have the same number of accepted preimages.

`ratio(a, b)` samples probability $a/b$. `bernoulli(p)` compares random bits with the binary expansion of the supplied double, reading further bits when necessary, so small probabilities are retained. Integer-weighted choices sum their weights in 128 bits. These methods preserve the specified probabilities given independent, uniform generator words.

There are two useful floating-point interfaces. `unit_f64()` draws uniformly from the $2^{53}$-point grid in $[0,1)$. `unit_f64_dense()` instead models a uniform real rounded down to a double: representable values receive probability according to the interval they represent, including subnormal values near zero. This matters when a transformation such as $-\ln U$ turns small values of $U$ into the tail of a distribution.

The normal and exponential samplers use Marsaglia and Tsang's ziggurat method. Their tables are derived once from the equal-area recurrence. Most draws require one generator word and no transcendental function. Separate inverse-transform methods remain available for finely resolved tails. Tests check the table areas, distribution moments, and the tail distribution itself.

## Cryptographic Constructions

The cryptographic generators include ChaCha20, Hash_DRBG with SHA-256, HMAC_DRBG with HMAC-SHA-256, and CTR_DRBG with AES-256. Their underlying cipher and DRBG mechanisms come from the companion [`cryptography`](https://github.com/darrelllong/cryptography) library.

The comparison framework also wraps stream ciphers such as Rabbit, Salsa20, SNOW 3G, and ZUC-128, and block ciphers in counter mode, including AES, Camellia, Twofish, and Serpent. These adapters make different cryptographic constructions available to the same tests. A block cipher in counter mode is distinct from CTR_DRBG, which also specifies state initialization and update procedures.

`CryptoRng` provides a marker trait that applications can require where a simulation generator would be inappropriate. The marker is implemented for selected generators, including ChaCha20 and the three DRBGs above; it is not attached to every implementation in the comparison framework.

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

The library includes NIST SP 800-22, DIEHARD, DIEHARDER, and additional research tests. These exercise the generators through several views of their output, including the low and high halves of 64-bit words and bit-reversed output. External byte streams can also be tested.

The historical implementations include System V `rand`, the `rand48` family, BSD and Linux generators, and generators from Microsoft runtime libraries. Constant and counter streams serve as controls. Separate adapters introduce biased bits, stuck low bits, repeated blocks, lagged-bit dependence, or a short period, so a test can be evaluated against a specified defect. The [generator source](https://github.com/darrelllong/entropy/tree/9f72d34e0785af1ec2a8445cb9fb02643daf028a/src/rng) and [usage guide](https://github.com/darrelllong/entropy/blob/9f72d34e0785af1ec2a8445cb9fb02643daf028a/USAGE.md#generator-categories) describe the individual implementations.

The mathematical work includes deriving null distributions, measuring false-alarm rates, and measuring detection power against specified defects. The repository keeps the [results](https://github.com/darrelllong/entropy/blob/main/TESTS.md), [power measurements](https://github.com/darrelllong/entropy/blob/main/POWER.md), and [remaining calibration work](https://github.com/darrelllong/entropy/blob/main/AUDIT.md) available for examination. Passing statistical tests does not establish cryptographic unpredictability. The code and reports separately examine statistical behavior, conformance to published algorithms, sampling correctness, and cryptographic construction.

## Using the Source

The examples above use the [September 17, 2026 source revision](https://github.com/darrelllong/entropy/tree/9f72d34e0785af1ec2a8445cb9fb02643daf028a), whose package version is 0.6.0. At this update, [crates.io](https://crates.io/crates/rng-entropy) carries 0.5.0. The package name is `rng-entropy`; the Rust library name is `entropy`.

In the current source, disabling default features gives an application the PRNGs, sampling methods, seeding interfaces, and probability functions with no external dependencies. The `cryptography` feature adds the cryptographic generators; the `batteries` feature adds the statistical suites and FFT dependency. Both features are enabled by default. The [usage guide](https://github.com/darrelllong/entropy/blob/main/USAGE.md#random-values-in-applications) describes the application interfaces, and the source is available under the BSD two-clause license.

*Updated September 21, 2026.*
