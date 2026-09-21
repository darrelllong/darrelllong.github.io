---
title: "Performance Evaluation: Do It Right or Don't Do It"
date: "2026-03-06"
tags: ["research", "systems", "performance"]
excerpt: "Bad performance evaluation is endemic in systems research. We have the methods and tools to do it correctly."
---

Performance evaluation is one of the oldest problems in computer systems research, and we still get it wrong with depressing regularity. I have watched this for decades. It came to a head for me recently at FAST and MSST, two of the better venues in the storage systems community. Both should know better.

After a talk, I asked the presenter how many times the experiment had been repeated to produce the graph on their slide. The answer was "ten." Another presenter did not know. In a third case, the presenter admitted, without apparent embarrassment, that the graph showed the best run they got.

Ten repetitions can be adequate for some experiments; the count alone does not tell us whether the uncertainty is acceptable. What matters is a defensible sampling method and an honest account of the variation. Presenting a selected best run as representative performance is misleading.

## Variation and Sampling

A single run does not establish how much a measurement varies, and selecting favorable runs can bias the result. Performance is affected by cache state, OS scheduling, memory layout, thermal throttling, I/O queue depth, and dozens of other sources of variance that interact in ways you cannot fully control. Those effects must be considered when designing and reporting an experiment.

The statistical machinery for doing this correctly has existed for a long time. You need enough samples to estimate the distribution and report the uncertainty in your estimate. The number depends on the variance of what you are measuring, which must itself be estimated from the data. Too few trials leave the estimate imprecise; more trials than necessary waste time.

## Pilot

In 2016, my student Dr. Elliot (Yan) Li and I, along with Dr. Ethan Miller and Yash Gupta, published [Pilot](/publications/127) to determine how much measurement a benchmark needs. Pilot is a benchmarking framework that instruments your workload, monitors measurements as they accumulate, and uses configured statistical checks and precision requirements to decide when to stop. It analyzes autocorrelation, a common problem when successive measurements share cache or queue state, and includes methods for detecting warm-up behavior. These checks help estimate steady-state performance; they do not establish that a workload is representative or that every assumption of the statistical model holds.

Pilot reports an estimate and its uncertainty under its statistical model, with a stopping rule specified before inspecting a favorable result. The source is at [github.com/darrelllong/pilot-bench](https://github.com/darrelllong/pilot-bench).

## Using Pilot on Real Code

I recently resurrected Pilot and used it to benchmark two of my own projects.

The first is a [library of standard cryptographic primitives](https://github.com/darrelllong/cryptography). The work is almost purely CPU-bound, with no I/O, tight loops, and predictable memory access patterns. Even here, frequency scaling, branch prediction state, cache warming, and instruction-level parallelism introduce variance. Pilot checks for warm-up behavior and terminates when its configured statistical and precision requirements are met.

The second is a [delta compression library](https://github.com/darrelllong/Delta-Compression) for differential encoding of data in backup and storage deduplication pipelines. Its [Pilot benchmark](https://github.com/darrelllong/Delta-Compression/blob/main/src/rust/delta/src/bin/pilot_delta.rs) operates on buffers in memory, with input generation outside the timed region. It measures differencing, reconstruction, and conversion to an in-place delta; it does not measure disk I/O. Algorithm choice, input size, and the pattern of changes between the inputs all matter when interpreting the results.

In both cases, the number of trials Pilot required varied with the workload and data size. A fixed count of ten or a hundred cannot account for that variation. The stopping rule must reflect the precision the experiment requires.

## Who Is to Blame

The people I questioned at FAST included Ph.D. students who had not yet finished, postdocs, and faculty. Some did not know how to do this correctly. Their advisors, and people like me who teach systems research, bear responsibility for that failure. We are supposed to instill these habits. If a student goes to FAST and does not know how many times they ran their experiment, their advisor sent them there unprepared.

The worst case at FAST involved a presenter who knew perfectly well what they had done: they ran the experiment multiple times and presented the best result. Deliberately presenting a selected best run as representative performance misrepresents the data. It is an academic sin. The program committee accepted it, the reviewers passed it, and the audience applauded. Everyone in that room should have been more uncomfortable than they appeared to be.

Peer review is supposed to catch this. Reviewers should be asking how many trials were run, what the confidence intervals are, and whether the reported numbers reflect a statistically sound summary or a selected best case. When they do not ask, they are complicit in letting bad science through. And when the rest of us sit in the audience and say nothing, we are too.

The statistical methods are well established, and tools such as Pilot are freely available. Students, faculty, and program committees have no excuse for ignoring them. If you are presenting performance results and you cannot say how you got them, you should not be presenting them.

Do it right, or do not do it.
