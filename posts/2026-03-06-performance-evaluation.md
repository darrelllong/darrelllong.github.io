---
title: "Performance Evaluation: Do It Right or Don't Do It"
date: "2026-03-06"
tags: ["research", "systems", "performance"]
excerpt: "Bad performance evaluation is endemic in systems research. It is not hard to do it correctly — so why don't we?"
---

Performance evaluation is one of the oldest problems in computer systems research, and we still get it wrong with depressing regularity. I have watched this for decades. It came to a head for me recently at FAST and MSST, two of the better venues in the storage systems community — conferences that should know better.

After a talk, I asked the presenter how many times the experiment had been repeated to produce the graph on their slide. The answer was "ten." Another presenter did not know. In a third case, the presenter admitted, without apparent embarrassment, that the graph showed their best results. Not the average. Not a statistically sound summary. The best run they got.

Ten repetitions can be adequate for some experiments; the count alone does not tell us whether the uncertainty is acceptable. What matters is a defensible sampling method and an honest account of the variation. Presenting a selected best run as representative performance is misleading.

## Why This Matters

A single run does not establish how much a measurement varies, and selecting favorable runs can bias the result. Performance is affected by cache state, OS scheduling, memory layout, thermal throttling, I/O queue depth, and dozens of other sources of variance that interact in ways you cannot fully control. Those effects must be considered when designing and reporting an experiment.

The statistical machinery for doing this correctly has existed for a long time. You need enough samples to estimate the distribution, and you need to report a summary that reflects that distribution honestly — a confidence interval, not a cherry-picked run. The question is always: how many samples do I need? The answer depends on the variance of what you are measuring, and you cannot know that in advance. This is why naive approaches fail — you either run too few trials and get garbage, or you run far more than you need and waste time.

## Pilot

In 2016, my student Elliot (Yan) Li and I, along with Ethan Miller and Yash Gupta, published [Pilot](/publications/127) to address exactly this. Pilot is a benchmarking framework that instruments your workload, monitors measurements as they accumulate, and uses configured statistical checks and precision requirements to decide when to stop. It analyzes autocorrelation, a common problem when successive measurements share cache or queue state, and includes methods for detecting warm-up behavior. These checks help estimate steady-state performance; they do not establish that a workload is representative or that every assumption of the statistical model holds.

Pilot reports an estimate and its uncertainty under its statistical model, with a stopping rule specified before inspecting a favorable result. The source is at [github.com/darrelllong/pilot-bench](https://github.com/darrelllong/pilot-bench).

## Using Pilot on Real Code

I recently resurrected Pilot and used it to benchmark two of my own projects.

The first is a [cryptography library](https://github.com/darrelllong/cryptography) — implementations of standard cryptographic primitives. This is almost purely CPU-bound work: no I/O, tight loops, predictable memory access patterns. You might think this is easy to measure. It is not, because modern CPUs are not simple. Frequency scaling, branch prediction state, cache warming, and instruction-level parallelism all introduce variance. Pilot handles this cleanly: it detects the warm-up period, waits for measurements to stabilize, and terminates when the confidence interval is tight enough to be meaningful.

The second is a [delta compression library](https://github.com/darrelllong/Delta-Compression) — differential encoding of data, used in backup and storage deduplication pipelines. Its [Pilot benchmark](https://github.com/darrelllong/Delta-Compression/blob/main/src/rust/delta/src/bin/pilot_delta.rs) operates on buffers in memory, with input generation outside the timed region. It measures differencing, reconstruction, and conversion to an in-place delta; it does not measure disk I/O. Algorithm choice, input size, and the pattern of changes between the inputs all matter when interpreting the results.

In both cases, the number of trials Pilot determined to be necessary was not a round number, and it was not the same across different workloads or data sizes. That is the point. There is no magic number — not ten, not a hundred. The right number depends on the measurement, and you have to let the data tell you when you are done.

## Who Is to Blame

The people I questioned at FAST included Ph.D. students who had not yet finished, postdocs, and faculty. Some did not know how to do this correctly. That is their advisors' failure — and the failure of people like me who teach systems research. We are supposed to instill these habits. If a student goes to FAST and does not know how many times they ran their experiment, their advisor sent them there unprepared.

But the worst case at FAST was not ignorance. It was a presenter who knew perfectly well what they had done: they ran the experiment multiple times and presented the best result. That is not sloppiness. That is a deliberate choice to misrepresent your data at one of the premier venues in the field. Call it what it is: an academic sin. The program committee accepted it, the reviewers passed it, and the audience applauded. Everyone in that room should have been more uncomfortable than they appeared to be.

Peer review is supposed to catch this. Reviewers should be asking how many trials were run, what the confidence intervals are, and whether the reported numbers reflect a statistically sound summary or a selected best case. When they do not ask, they are complicit in letting bad science through. And when the rest of us sit in the audience and say nothing, we are too.

It is not hard to do performance evaluation correctly. The tools exist. The theory is not exotic. Pilot is open source. There is no excuse — not for a Ph.D. student, not for a faculty member, not for a program committee. If you are presenting performance results and you cannot say how you got them, you should not be presenting them.

Do it right, or do not do it.
