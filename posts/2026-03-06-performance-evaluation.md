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

In 2016, my student Dr. Elliot (Yan) Li and I, along with Dr. Ethan Miller and Yash Gupta, published Pilot to determine how much measurement a benchmark needs. The paper is "[Pilot: A Framework that Understands How to Do Performance Benchmarks the Right Way](/publications/127)," which appeared at MASCOTS 2016 in London ([PDF](https://ssrc.us/media/pubs/1fc262bbb19b5ff0ec48ec4912d9f75c15917ce7.pdf)). Pilot is a benchmarking framework that instruments your workload, monitors measurements as they accumulate, and uses configured statistical checks and precision requirements to decide when to stop. It analyzes autocorrelation, a common problem when successive measurements share cache or queue state, and includes methods for detecting warm-up behavior. These checks help estimate steady-state performance; they do not establish that a workload is representative or that every assumption of the statistical model holds.

Pilot reports an estimate and its uncertainty under its statistical model, with a stopping rule specified before inspecting a favorable result. The source is at [github.com/darrelllong/pilot-bench](https://github.com/darrelllong/pilot-bench), a fork of the [original](https://github.com/ascar-io/pilot-bench) that I have brought up to date with current versions of CMake and Boost and that can be built without the text interface for use in scripts.

Pilot contains no new statistics. The methods are in Ferrari's 1978 textbook, *Computer Systems Performance Evaluation*, and in the statistical literature. What Pilot does is apply them in the correct order while the benchmark is running, so that the person running the experiment does not have to remember to.

## The Mathematics

I show the mathematics so that students who read this post can understand why things are as they are. Being told to use a tool, or being told that ten runs are too few, teaches nothing. A student who knows where the formulas come from can tell when they apply and when they do not. These methods are old: Student's paper was published in 1908, Welch's in 1947, and Ferrari's book in 1978. Our field does not seem to learn from its past, and so it is doomed to reinvent it.

The sections follow the order in which Pilot works: the confidence interval, the effect of autocorrelation and its remedy, the number of samples required, the treatment of rates and proportions, the removal of warm-up and cool-down phases, the regression used when a workload reports only a total, and the comparison of two results.

### The Confidence Interval

Suppose a benchmark yields samples $x_1, \ldots, x_n$ with mean $\bar{x}$ and sample standard deviation $s$. If the samples are independent and identically distributed, the two-sided confidence interval at level $1 - \alpha$ is $\bar{x} \pm C/2$, with width

$$
C = 2\, t^{*}_{n-1}\, \frac{s}{\sqrt{n}}
$$

where $t^{*}_{n-1}$ is the $1 - \alpha/2$ quantile of Student's $t$ distribution with $n - 1$ degrees of freedom. The width shrinks as $1/\sqrt{n}$, so halving it costs four times the samples.

A single number such as "100 MB/s" carries no $C$. The reader cannot tell whether the mean is known to within 1 MB/s or to within 40.

### Autocorrelation

That formula assumes independence, and measurements of computer systems are seldom independent. A request that finds the cache warm is followed by another that finds it warm. A sample taken during one scheduler quantum resembles the next sample taken in the same quantum. The lag-$k$ autocorrelation coefficient measures this:

$$
\rho_k = \frac{\operatorname{E}\left[(x_i - \mu)(x_{i+k} - \mu)\right]}{\sigma^2}
$$

For a stationary sequence, the variance of the sample mean is

$$
\operatorname{Var}(\bar{x}) = \frac{\sigma^2}{n}\left[\,1 + 2\sum_{k=1}^{n-1}\left(1 - \frac{k}{n}\right)\rho_k\right]
$$

Call the bracket $\gamma_n$. When the samples are uncorrelated, $\gamma_n = 1$ and the variance is $\sigma^2/n$, as the confidence interval assumed. Otherwise the standard deviation of $\bar{x}$ is $\sigma\sqrt{\gamma_n/n}$, and an interval built on $\sigma/\sqrt{n}$ has the wrong width by the factor $\sqrt{\gamma_n}$.

The *effective sample size* is the number $n_{\text{eff}}$ of uncorrelated samples whose mean would have the same variance as the mean of the $n$ correlated ones:

$$
\frac{\sigma^2}{n_{\text{eff}}} = \operatorname{Var}(\bar{x}) \qquad\Longrightarrow\qquad n_{\text{eff}} = \frac{n}{\gamma_n}
$$

To obtain numbers we need a model of the correlation. Take the first-order autoregressive process, for which $\rho_k = \rho^k$ with $0 \le \rho < 1$. The sum can be evaluated exactly:

$$
\gamma_n = 1 + 2\left[\frac{\rho}{1 - \rho} - \frac{\rho\,(1 - \rho^n)}{n\,(1 - \rho)^2}\right] \;\longrightarrow\; \gamma = \frac{1 + \rho}{1 - \rho} \qquad (n \to \infty)
$$

For $n = 1000$ and $\rho = 0.8$ this gives $\gamma_n = 8.96$ and $n_{\text{eff}} = 1000/8.96 \approx 112$. The mean of those thousand samples has the variance that the mean of 112 uncorrelated samples would have.

The consequence for the confidence interval can be stated as a coverage probability. For large $n$ the mean is approximately normal, and an interval computed at the nominal 95% level from the uncorrelated formula contains the true mean with probability $2\,\Phi\!\left(1.96/\sqrt{\gamma}\right) - 1$, where $\Phi$ is the standard normal distribution function:

| $\rho$ | $\gamma$ | $\sqrt{\gamma}$ | $n_{\text{eff}}/n$ | Coverage of the nominal 95% interval |
|---|---|---|---|---|
| 0 | 1 | 1 | 1 | 95.0% |
| 0.1 | 1.22 | 1.11 | 0.82 | 92.4% |
| 0.2 | 1.50 | 1.22 | 0.67 | 89.0% |
| 0.5 | 3.00 | 1.73 | 0.33 | 74.2% |
| 0.8 | 9.00 | 3.00 | 0.11 | 48.6% |

At $\rho = 0.8$ the interval reported as 95% contains the true mean less than half the time. The factor $\sqrt{\gamma}$ does not depend on $n$: the computed width and the correct width both shrink as $1/\sqrt{n}$, and their ratio stays fixed, so collecting more samples does not correct the error.

These figures take $\sigma$ as known. The sample variance is itself biased when the samples are positively correlated, since $\operatorname{E}[s^2] = \sigma^2\,(n - \gamma_n)/(n - 1) < \sigma^2$, which narrows the computed interval further. The bias is of order $1/n$; for the example above the factor is 0.992.

Ferrari treats $\lvert\rho_1\rvert \le 0.1$ as negligible, and Pilot's strictest setting uses that threshold.

### Subsession Analysis

The remedy, also from Ferrari, is to average adjacent samples into batches. Choose a subsession size $q$, let $h = \lfloor n/q \rfloor$, and form

$$
y_j = \frac{1}{q}\sum_{i=(j-1)q+1}^{jq} x_i, \qquad j = 1, \ldots, h
$$

The covariance of two adjacent batch means is $q^{-2}\sum_{k=1}^{2q-1}\min(k,\,2q-k)\,\sigma^2\rho_k$, which is at most $q^{-2}\sigma^2\sum_k k\,\lvert\rho_k\rvert$, while the variance of a batch mean is $\sigma^2\gamma_q/q$. If $\sum_k k\,\lvert\rho_k\rvert$ is finite and $\gamma_q$ is bounded away from zero, the lag-1 autocorrelation of the batch means is therefore of order $1/q$ and can be made as small as required by taking $q$ large enough. For the autoregressive process with $\rho = 0.8$ it is 0.80 at $q = 1$, 0.36 at $q = 8$, and 0.08 at $q = 32$. Pilot estimates the lag-1 autocorrelation of the batches,

$$
\hat{\rho}_1(q) = \frac{\sum_{j=1}^{h-1}(y_j - \bar{x})(y_{j+1} - \bar{x})}{\sum_{j=1}^{h}(y_j - \bar{x})^2}
$$

and tries $q = 1, 2, \ldots, \lfloor n/3 \rfloor$, taking the smallest $q$ for which $\lvert\hat{\rho}_1(q)\rvert$ is within the configured limit. If no such $q$ exists, there is not yet enough data and the session continues. The confidence interval is then computed from the batches rather than from the raw samples:

$$
s_q^2 = \frac{1}{h-1}\sum_{j=1}^{h}(y_j - \bar{x})^2, \qquad C = 2\, t^{*}_{h-1}\, \frac{s_q}{\sqrt{h}}
$$

The interval now rests on $h$ batch means in place of $n$ readings. What has been established about those batch means is that their estimated lag-1 autocorrelation is within the limit. That is a weaker condition than independence, which the test does not establish.

### How Many Samples

Solving the width formula for the number of batches needed to reach a target width $C^{*}$ gives

$$
h^{*} = \left\lceil \left(\frac{2\, t^{*} s_q}{C^{*}}\right)^{2} \right\rceil, \qquad n^{*} = q\, h^{*}
$$

Pilot normally takes the target as a fraction $p$ of the mean, $C^{*} = p\,\bar{x}$. Writing $c_v = s_q/\bar{x}$ for the coefficient of variation,

$$
h^{*} = \left\lceil \left(\frac{2\, t^{*} c_v}{p}\right)^{2} \right\rceil
$$

The quantile depends on $h$, so the requirement is the smallest $h$ for which $h \ge (2\,t^{*}_{h-1}\,c_v/p)^2$. At 95% confidence:

| Coefficient of variation $c_v$ | Width 10% of mean ($\pm 5\%$) | Width 2% of mean ($\pm 1\%$) |
|---|---|---|
| 5% | 7 | 99 |
| 10% | 18 | 387 |
| 25% | 99 | 2,404 |
| 50% | 387 | 9,607 |

The entries count batch means. The number of raw samples is $q$ times greater.

This table is the answer to the question I asked at FAST. Ten runs are enough when the coefficient of variation is 5% and an interval of $\pm 5\%$ will do. With a coefficient of variation of 25%, the same interval requires 99. To report the mean of that system to within $\pm 1\%$ requires 2,404.

Both $s_q$ and $q$ are estimated from the data, so Pilot recomputes $h^{*}$ after every round. It also enforces a minimum sample size, so that a few early samples that happen to agree cannot end the session.

### Rates and Proportions

When the quantity measured is a rate, such as megabytes per second, and each sample covers the same amount of work $w$, the arithmetic mean of the rates is the wrong summary. The total work is $nw$ and the total time is $\sum w/x_i$, so the rate over the whole run is the harmonic mean:

$$
\bar{x}_H = \frac{n w}{\sum_{i=1}^{n} w/x_i} = \frac{n}{\sum_{i=1}^{n} 1/x_i}
$$

Pilot uses the harmonic mean for any quantity declared as a ratio, and finds its interval from the reciprocals $y_i = 1/x_i$. Their mean $\bar{y} = 1/\bar{x}_H$ is an arithmetic mean, to which everything above applies. If $d$ is the half-width of the interval for $\bar{y}$, the interval for the rate is

$$
\left[\frac{1}{\bar{y} + d},\ \frac{1}{\bar{y} - d}\right]
$$

which is not symmetric about $\bar{x}_H$, and which has no upper end when $d \ge \bar{y}$. A rate must therefore be positive. Until September 2026 Pilot did not do this: the function that declares a quantity did not store the method of its mean, so every rate was averaged arithmetically. The arithmetic mean of rates is greater than their harmonic mean unless they are all equal, so every throughput that Pilot reported was overstated. The defect was found when my repositories were run again with the revised Pilot.

For a quantity that is 0 or 1 on each trial, such as whether a request met its deadline, the mean is a proportion $\hat{p}$ and the width is

$$
C = 2\, t^{*}_{h-1} \sqrt{\frac{\hat{p}\,(1 - \hat{p})}{h}}
$$

This is the normal approximation to the binomial distribution. It is inaccurate when $h$ is small or when $\hat{p}$ is near 0 or 1.

### Warm-up and Cool-down

Most systems take time to reach a steady state, and multi-threaded workloads slow down at the end as threads finish. Samples from those phases do not belong in an estimate of steady-state performance, so Pilot looks for the places where the level of the readings changes. It does so in two steps.

The first step proposes change-points. For a split of $n$ readings after the first $\tau$, with means $\bar{x}_L$ and $\bar{x}_R$ on the two sides, the split reduces the sum of squared deviations by

$$
\frac{\tau\,(n - \tau)}{n}\,\left(\bar{x}_L - \bar{x}_R\right)^2
$$

The split with the greatest reduction is a candidate. The same is done to each side, and again, until the sides are too short to split. No segment may be shorter than 30 readings.

The second step keeps a candidate only if the segments on its two sides differ. The readings are merged into subsession means, as for the confidence interval, and the subsession means of the two segments are compared by the rank-sum test of Wilcoxon and of Mann and Whitney. Let the smaller segment have $k$ subsession means and the other $m$. All $k + m$ are ranked together, and $U$ is the sum of the ranks of the $k$ less its least possible value, $k(k+1)/2$. If the segments do not differ, every choice of $k$ ranks among $k + m$ is equally likely, and the number of choices with $U = u$ is the coefficient of $x^u$ in the Gaussian binomial coefficient:

$$
\binom{k+m}{k}_{\!x} = \prod_{i=1}^{k} \frac{1 - x^{m+i}}{1 - x^{i}}, \qquad
P(U \le u) = \frac{1}{\binom{k+m}{k}} \sum_{j=0}^{u}\, [x^j] \binom{k+m}{k}_{\!x}
$$

Pilot computes this probability exactly. When many of the subsession means are equal, as they are when the readings are the 0 and 1 of a success rate, they have no ranks, and Pilot uses Fisher's exact test on the two classes of lower and higher values. The candidate with the largest $p$-value is removed and its neighbors are tested again, until every candidate that remains has $p \le \alpha/n$ with $\alpha = 0.01$. The division by $n$ is there because the candidate was placed where the two sides differ most, which is a choice among about $n$ places.

The exact distribution is necessary. The smallest $p$-value that $k$ values among $k + m$ can produce is $2/\binom{k+m}{k}$, which for 3 among 100 is $1.2 \times 10^{-5}$. Approximations by the normal or the $t$ distribution do not have this limit: for 3 values that are all below 97 others, Welch's test applied to the ranks gives $p = 5 \times 10^{-31}$. Autocorrelated readings wander, and a short excursion amounts to two or three subsession means, so a test that relies on such an approximation reports excursions as changes.

A test of this kind assumes that the subsession means are independent, which is only approximately true, so its error rates have to be measured and cannot be read from $\alpha$. In 1,000 samples each of 100 to 3,000 readings that contain no change, a change-point was reported in at most 0.7% of the samples of independent readings, whether normal, exponential, lognormal, Cauchy, or taking only the values 0 and 1, and in at most 2.0% of the samples of a first-order autoregressive process with $\rho$ of 0.5, 0.8, or 0.9. A session applies the test repeatedly as readings arrive, which gives it more than one opportunity to err: in 1,000 sessions of 1,000 rounds each, a change-point was reported at some round in at most 3.1% of the sessions of independent readings and in 11% to 23% of those of the autoregressive process. Most of these do not last; one was still present at the last round in at most 0.7% of sessions. A warm-up of 50 readings among 500 that is lower by one standard deviation was found in 96% to 97% of the samples with independent noise. With $\rho = 0.8$ a warm-up lower by two standard deviations was found in 15% of the samples. The effective sample size of 50 such readings, as defined above, is $50 \cdot (1 - \rho)/(1 + \rho) \approx 6$.

Until September 2026 Pilot used E-Divisive with Medians, the method of James, Kejariwal, and Matteson that our paper describes. As Pilot applied it, a change-point was accepted if it raised the goodness of fit by 25% of its previous value. The value before the first change-point is zero, so the first change-point was always accepted. In 200 samples each of 60, 100, 300, and 1,000 independent readings that contained no change, it reported a change-point in every sample. Pilot does not use the readings before the last change-point, so a session that needed more than about 60 readings was left with the most recent 30 to 60, and a session under the strictest preset, which requires 200, could not finish. The defect was found by giving the method readings whose answer was known. The numbers above come from a program in Pilot's repository that does the same for the method that replaced it.

Pilot then takes the stable phase to be the longest segment, and requires it to contain more than half of the samples. If no segment qualifies, Pilot discards the unit readings from that round and says so; it does not guess.

### Workloads That Report One Number

Many programs report only a total elapsed time. For these Pilot varies the amount of work from round to round and fits a line. Let $w$ be the work in a round and $T$ its duration. The round has setup, warm-up, stable, and cool-down phases:

$$
\begin{aligned}
T &= T_{\text{setup}} + T_{\text{warm}} + T_{\text{stable}} + T_{\text{cool}} \\
w &= w_{\text{warm}} + w_{\text{stable}} + w_{\text{cool}}
\end{aligned}
$$

The quantity we want is the stable rate $v = w_{\text{stable}}/T_{\text{stable}}$. Substituting $T_{\text{stable}} = (w - w_{\text{warm}} - w_{\text{cool}})/v$ gives

$$
T = \underbrace{\left(T_{\text{setup}} + T_{\text{warm}} + T_{\text{cool}} - \frac{w_{\text{warm}} + w_{\text{cool}}}{v}\right)}_{\alpha} + \frac{1}{v}\, w
$$

This is a line in $w$ with intercept $\alpha$ and slope $\beta = 1/v$. The overhead of the unstable phases is collected in the intercept, and the stable rate is the reciprocal of the slope. The usual calculation, total work divided by total time, gives

$$
\frac{w}{T} = \frac{v}{1 + \alpha v / w}
$$

which underestimates $v$ whenever $\alpha > 0$. The relative error is $\alpha v/(w + \alpha v)$, and holding it below $\varepsilon$ requires $w \ge \alpha v\,(1 - \varepsilon)/\varepsilon$. Running the benchmark longer does reduce the error, but the length required depends on $\alpha$ and $v$, which are the unknowns.

Given $h$ rounds $(w_j, T_j)$, grouped into subsessions first if they are autocorrelated, ordinary least squares gives

$$
\hat{\beta} = \frac{\sum_j (w_j - \bar{w})(T_j - \bar{T})}{\sum_j (w_j - \bar{w})^2}, \qquad \hat{\alpha} = \bar{T} - \hat{\beta}\,\bar{w}, \qquad \hat{v} = \frac{1}{\hat{\beta}}
$$

with residual variance and standard error

$$
\hat{\sigma}^2 = \frac{1}{h - 2}\sum_j \left(T_j - \hat{\alpha} - \hat{\beta}\, w_j\right)^2, \qquad \operatorname{SE}(\hat{\beta}) = \sqrt{\frac{\hat{\sigma}^2}{\sum_j (w_j - \bar{w})^2}}
$$

The interval for the slope is $\hat{\beta} \pm \delta$ with $\delta = t^{*}_{h-2}\operatorname{SE}(\hat{\beta})$, and the interval for the rate comes from inverting its endpoints:

$$
\frac{1}{\hat{\beta} + \delta} \;\le\; v \;\le\; \frac{1}{\hat{\beta} - \delta}
$$

This requires $\hat{\beta} - \delta > 0$. Otherwise the interval on the slope contains zero and the data do not bound the rate from above; Pilot then reports $\hat{v}$ with no interval and continues to run rounds. The interval is not symmetric about $\hat{v}$. If the relationship between work and time is not linear, or the overhead varies from round to round, the residuals are large and the interval is wide, so a violated assumption shows up in the result.

The slope is well determined only if the work amounts are spread out, since $\sum_j (w_j - \bar{w})^2$ is in the denominator of the standard error. Pilot spreads them across the permitted range and refines the spacing as rounds accumulate. Rounds too short to contain a stable phase are excluded. To produce a first estimate quickly, Pilot sizes the early rounds so that each is $k$ seconds longer than the one before. If the first round takes $s$ seconds, then $n$ rounds take

$$
B = \sum_{i=1}^{n}\left[s + (i - 1)k\right] = ns + \frac{k\,n(n-1)}{2}, \qquad\text{so}\qquad k = \frac{2(B - ns)}{n(n-1)}
$$

for a time budget $B$.

### Comparing Two Results

Most performance claims are comparisons: system A against system B, or this commit against the last. If the two confidence intervals do not overlap, the conclusion is immediate. If they overlap, the test to use is Welch's, which does not assume that the two samples have equal variances or equal sizes, and which Pilot implements. With means $\bar{x}_A$ and $\bar{x}_B$, subsession variances $s_A^2$ and $s_B^2$, and subsession sample sizes $n_A$ and $n_B$,

$$
t = \frac{\bar{x}_A - \bar{x}_B}{\sqrt{\dfrac{s_A^2}{n_A} + \dfrac{s_B^2}{n_B}}}
$$

The degrees of freedom come from the Welch–Satterthwaite equation,

$$
\nu = \frac{\left(\dfrac{s_A^2}{n_A} + \dfrac{s_B^2}{n_B}\right)^{2}}{\dfrac{s_A^4}{n_A^2\,(n_A - 1)} + \dfrac{s_B^4}{n_B^2\,(n_B - 1)}}
$$

and the two-sided $p$-value is $p = 2\,F_\nu(-\lvert t \rvert)$, where $F_\nu$ is the cumulative distribution function of Student's $t$ with $\nu$ degrees of freedom.

The same expression tells Pilot how long to keep measuring B against a baseline A that has already been measured, which is the form of comparison that the library carries out on its own. Let $d = \bar{x}_A - \bar{x}_B$ and let $t^{*}$ be the critical value for the required $p$. Requiring $\lvert t \rvert \ge t^{*}$ and solving for $n_B$,

$$
n_B^{*} = \frac{s_B^2}{\left(d / t^{*}\right)^2 - s_A^2 / n_A}
$$

If the denominator is not positive, no number of new samples is sufficient, because the uncertainty in the baseline alone exceeds what the required $p$ allows.

Consider two systems with the same standard deviation $s$, each measured with $n$ samples. Write $c_v = s/\bar{x}_A$ and $\varepsilon = \lvert d \rvert/\bar{x}_A$. Setting $\lvert t \rvert = t^{*}$ gives

$$
n = 2\left(\frac{t^{*} c_v}{\varepsilon}\right)^{2}
$$

For $c_v = 25\%$ and $\varepsilon = 2\%$, with the large-sample value $t^{*} = 1.96$, this is 1,201 samples from each system. That is the sample size at which an observed difference of exactly 2% reaches $p = 0.05$. If the true difference is 2%, the observed difference is smaller than 2% with probability one half, and the test then fails. For the test to succeed with probability $1 - \beta$, replace $t^{*}$ with $t^{*} + z_{\beta}$, where $z_\beta$ is the $1 - \beta$ quantile of the standard normal distribution. For a probability of 80%, $z_\beta = 0.84$ and $n$ is 2,453 from each system. Ten runs of each cannot establish a 2% improvement on such a system.

### Presets

Pilot packages these requirements as presets. Each can be overridden individually, and the confidence level defaults to 95%.

| Preset | Autocorrelation limit | Interval width | Minimum samples | Minimum round |
|---|---|---|---|---|
| `quick` | $\pm 0.8$ | 20% of mean | 30 | 3 s |
| `normal` | $\pm 0.2$ | 10% of mean | 50 | 10 s |
| `strict` | $\pm 0.1$ | 10% of mean | 200 | 20 s |

The `quick` preset is for iteration while developing. If the samples it accepts follow the autoregressive model above with $\rho$ at its limit of 0.8, the interval is too narrow by a factor of three; at the `normal` limit of 0.2, by a factor of 1.22. The `strict` preset follows Ferrari's threshold.

Until September 2026 the limits of `quick` and `normal`, and a limit given with `--ac`, were not used for the readings: Pilot always chose the subsession size with the limit of `strict`, 0.1, so every preset behaved as `strict` does. The presets now do what the table says.

## Using Pilot on Real Code

When I first wrote this post I had used the resurrected Pilot on two of my own projects. I now use it in nearly every repository of mine that requires an experiment.

The first was a [library of standard cryptographic primitives](https://github.com/darrelllong/cryptography). The work is almost purely CPU-bound, with no I/O, tight loops, and predictable memory access patterns. Even here, frequency scaling, branch prediction state, cache warming, and instruction-level parallelism introduce variance. Pilot checks for warm-up behavior and terminates when its configured statistical and precision requirements are met. Every benchmark figure in that repository's documentation comes from Pilot.

The second was a [delta compression library](https://github.com/darrelllong/Delta-Compression) for differential encoding of data in backup and storage deduplication pipelines. Its [Pilot benchmark](https://github.com/darrelllong/Delta-Compression/blob/main/src/rust/delta/src/bin/pilot_delta.rs) operates on buffers in memory, with input generation outside the timed region. It measures differencing, reconstruction, and conversion to an in-place delta; it does not measure disk I/O. Algorithm choice, input size, and the pattern of changes between the inputs all matter when interpreting the results.

In both cases, the number of trials Pilot required varied with the workload and data size. A fixed count of ten or a hundred cannot account for that variation. The stopping rule must reflect the precision the experiment requires.

The others followed the same pattern. Each has a small program that performs one operation and prints its measurements as a line of comma-separated values, and Pilot runs that program until the requirements are met.

- [rump](https://github.com/darrelllong/rump), multiprecision arithmetic. Each primitive is measured over random operands and compared with GMP, which is measured by a C program that mirrors the Rust one and runs under the same harness.
- [entropy](https://github.com/darrelllong/entropy), random number generators. Throughput of each generator.
- [secret-sharing](https://github.com/darrelllong/secret-sharing), in Rust and C++. Every operation of every scheme, reported as a mean, a 95% interval, and the number of runs needed to reach it.
- [huffman](https://github.com/darrelllong/huffman), Huffman coding. Timing comparisons between implementations.
- Public-key cryptography in [Python](https://github.com/darrelllong/Public-key-Cryptography-in-Python) and in [Julia](https://github.com/darrelllong/Public-key-Cryptography-in-Julia). Key generation, encryption, and decryption. Where the session limit is reached before the interval converges, the tables say so and report the interval that was obtained.
- [sorting](https://github.com/darrelllong/sorting), eleven sorting algorithms in C. Every sort is timed on random keys from $n = 2$ to $n = 2^{23}$. A quadratic sort, or Shell sort, is not run at larger $n$ once the lower end of its 95% interval is above the upper end of the interval of the slowest $O(n \log n)$ sort at the same $n$: bubble sort stops at $n = 32$, insertion sort at 362, and Shell sort at 1,024. For the tables they are then timed at larger sizes; at $n = 65{,}536$ bubble sort takes 5.55 s, and quicksort 4.7 ms. The order of each sort is known from its analysis, and what the benchmark measures is the constant: the time of a sort is $c \cdot f(n)$ plus terms of lower order, with $f(n)$ equal to $n^2$ or $n \log_2 n$, and $c$ is the time per unit of $f(n)$ for that sort on that machine. It is never 1, and it can change with $n$. Measured in cycles, which do not depend on the clock rate, insertion sort takes 0.72 cycles per $n^2$ at $n = 1{,}024$ and 0.69 at $65{,}536$, while bubble sort takes 1.95 and 4.84.
- BIBD-DC, simulations of block designs applied to racks and tape libraries.
- Mojette, simulations of Mojette and Radon transform storage layouts.

The last two are simulations, and the quantities are mean time to data loss, probability of loss, and unavailability. Nothing in the mathematics above depends on the measurement being a time. A Monte Carlo simulation is an experiment, its output has a variance, and the question of how many trials are enough has the same answer. The simulator prints one estimate per invocation and Pilot runs it until the interval on each quantity is narrow enough.

The sorting benchmark shows two ways a measurement can go wrong before any statistics are applied. A sort of a few keys takes less time than the clock can resolve, so each reading times a batch of sorts. In the first version every sort in the batch was of the same keys, and the branch predictor learned their branches: at $n = 181$ on an Intel i5-8259U, quicksort and heap sort took a third of the time they take on keys they have not seen. Each sort in a batch is now of fresh random keys. The first attempt to run it was on an Apple M4, which has performance and efficiency cores; a sort on an efficiency core took 2.7 times as long, and a session that drew readings from both kinds of core did not converge. It was run again on the Intel machine, pinned to one core. Pilot decides how many readings are enough. It cannot tell whether a reading measures the right thing.

A reading need not be a time. The sorting program can also count hardware events over the sorts it times (cycles, instructions, branch mispredictions, and misses of each level of cache) and print each count as another column, and Pilot gives every count a mean and a confidence interval, as it does the time. The counts say why the constants are what they are. Bubble sort runs the same $6n^2$ instructions at every size, and its constant rises because its branch mispredictions per $n^2$ rise six times from $n = 1{,}024$ to $65{,}536$; min sort takes as many cache misses as bubble sort at $65{,}536$, and its constant falls. Heap sort runs the same number of instructions per $n \log_2 n$ at every size, and its constant rises as its accesses outgrow the L2 and L3 caches.

The intervals were narrow enough, between 0.1% and 0.5% of the mean for most sessions, to show something else: two builds of the same source disagreed by far more than that. Heap sort was 20% slower in one, Shell sort 39% slower at $n = 1{,}024$, and bubble sort 30% faster. The second build had more code in front of the sorts, so each was at another address. To test that, I linked the same object files with 0 to 112 bytes of padding in front of the sorts and ran a Pilot session for each sort in each build. The instructions were the same in every build, and the cycles changed by up to a factor of 1.5, with a period of 32 bytes. The hardware counters separate two causes. For Shell sort, heap sort, and min sort, the processor, an Intel i5-8259U, has an erratum in jumps that cross or end at a 32-byte boundary, and its fix keeps such code out of the cache of decoded instructions (Intel, 2019). Built so that no jump crosses a boundary, those sorts ran from that cache in every build, and their cycles varied by 1% or less. For bubble sort, the placement changed how often its branches were mispredicted, by a factor of 2.7.

The constants of a sort on this machine are therefore those of one build, and a difference between two sorts smaller than 1.5 times may be one of placement, not of algorithm. Pilot's interval is the precision within a build; the placement of the code is a factor that the experiment has to vary if it is to measure it. Mytkowicz and his colleagues showed the same with the order of linking and the size of the environment (2009), and Curtsinger and Berger's Stabilizer randomizes the placement of code as a program runs, so that a benchmark measures over it (2013). The measurements are in the [repository](https://github.com/darrelllong/sorting#where-the-code-is).

## Who Is to Blame

The people I questioned at FAST included Ph.D. students who had not yet finished, postdocs, and faculty. Some did not know how to do this correctly. Their advisors, and people like me who teach systems research, bear responsibility for that failure. We are supposed to instill these habits. If a student goes to FAST and does not know how many times they ran their experiment, their advisor sent them there unprepared.

The worst case at FAST involved a presenter who knew perfectly well what they had done: they ran the experiment multiple times and presented the best result. Deliberately presenting a selected best run as representative performance misrepresents the data. It is an academic sin. The program committee accepted it, the reviewers passed it, and the audience applauded. Everyone in that room should have been more uncomfortable than they appeared to be.

Peer review is supposed to catch this. Reviewers should be asking how many trials were run, what the confidence intervals are, and whether the reported numbers reflect a statistically sound summary or a selected best case. When they do not ask, they are complicit in letting bad science through. And when the rest of us sit in the audience and say nothing, we are too.

The statistical methods are well established, and tools such as Pilot are freely available. Students, faculty, and program committees have no excuse for ignoring them. If you are presenting performance results and you cannot say how you got them, you should not be presenting them.

Do it right, or do not do it.

*Expanded in September 2026 with the mathematics behind Pilot and an account of its use in my other repositories.*

## References

- Student. "The Probable Error of a Mean." *Biometrika*, 6(1):1–25, 1908.
- R. A. Fisher. *Statistical Methods for Research Workers*, fifth edition. Oliver and Boyd, Edinburgh, 1934.
- Frank Wilcoxon. "Individual Comparisons by Ranking Methods." *Biometrics Bulletin*, 1(6):80–83, 1945.
- H. B. Mann and D. R. Whitney. "On a Test of Whether One of Two Random Variables Is Stochastically Larger than the Other." *Annals of Mathematical Statistics*, 18(1):50–60, 1947.
- B. L. Welch. "The Generalization of 'Student's' Problem when Several Different Population Variances are Involved." *Biometrika*, 34(1–2):28–35, 1947.
- Domenico Ferrari. *Computer Systems Performance Evaluation*. Prentice-Hall, Englewood Cliffs, New Jersey, 1978.
- Todd Mytkowicz, Amer Diwan, Matthias Hauswirth, and Peter F. Sweeney. "Producing Wrong Data Without Doing Anything Obviously Wrong!" In *Proceedings of the 14th International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS XIV)*, pages 265–276, 2009.
- Charlie Curtsinger and Emery D. Berger. "Stabilizer: Statistically Sound Performance Evaluation." In *Proceedings of the 18th International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS XVIII)*, pages 219–228, 2013.
- Nicholas A. James, Arun Kejariwal, and David S. Matteson. "Leveraging Cloud Data to Mitigate User Experience from 'Breaking Bad'." [arXiv:1411.7955](https://arxiv.org/abs/1411.7955), 2014.
- Yan Li, Yash Gupta, Ethan L. Miller, and Darrell D. E. Long. "[Pilot: A Framework that Understands How to Do Performance Benchmarks the Right Way](/publications/127)." In *Proceedings of the Twenty-fourth International Symposium on Modeling, Analysis and Simulation of Computer and Telecommunication Systems (MASCOTS 2016)*, London, September 2016. IEEE.
- Intel Corporation. *Mitigations for Jump Conditional Code Erratum*. White paper, November 2019.
