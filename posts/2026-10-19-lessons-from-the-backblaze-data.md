---
title: "Lessons from the Backblaze Data"
date: "2026-10-19"
tags: ["research", "storage", "reliability", "statistics"]
excerpt: "Thirteen years of daily records from half a million disk drives: what they say about failure, what they cannot say, and what a storage simulator should assume."
---

Since 2013 Backblaze has published a daily record of every drive in its data centers: the serial number, the drive model, the SMART attributes (the counters a drive keeps about its own health: reallocated sectors, hours powered on, temperature and so on), and a flag on the day the drive was recorded as failed. Through June 2026 it covers 504,624 data drives (the drives of 1.4 TB and more that hold customers' data, as opposed to boot drives) of 103 models with a usable power-on age, two million drive-years of observation (one drive-year is one drive observed for one year), and 31,881 recorded failures. I know of nothing else of this size and detail that is public.

Dr. Ahmed Amer and I have spent the past months fitting lifetime distributions to this record, that is, estimating the probability that a drive survives to a given age; scoring them on held-out years, which are years whose data the fit did not see; and writing samplers, programs that draw random lifetimes from the fitted distributions, for storage simulators to call. The report is long and still under review, so the numbers below are those of the current draft and may move in their last digit. This post is about what we learned.

## Decide What a Failure Is

A failure in this record is an operational event: Backblaze removed and replaced the drive because it stopped working or, in their words, had "shown evidence of failing soon." Proactive removals count. The data do not say which failures were which. So every rate in the report is the rate at which an operator with a particular replacement policy records failures, not the rate at which hardware dies. The two are related but not the same, and the difference matters most for the SMART results below, where the operator's policy and the drives' behavior are tangled together.

Drives also leave without a failure flag. For every drive that fails, nearly four are removed: 120,377 against 31,899. Almost all of the removals are migrations, in which an operator retires a whole set of drives at once: 116,928 drives in 789 events in which twenty or more drives of one model left on the same day. The largest took 2,107 drives in a day at a median age of 8.6 years. Our models treat these departures as censoring: a drive whose record ends without a failure is known only to have survived until then, and the reason it left is taken to say nothing about its condition. That is wrong if drives are pulled because they are about to fail, and the data give no reason for any removal. We can only measure the pattern: a drive with a SMART warning is removed singly at 5.8 times the rate of a clear drive, but it is 22 times as likely to end with a failure flag as with a single removal. We therefore refit the lifetime distribution under several readings of the removals. Counting the warned single removals as failures lowers the fitted ten-year survival of the average drive model from 0.81 to 0.80; counting also the 42 bulk events in which the removed drives were warned far more often than those that stayed lowers it to 0.77; the deliberately severe reading, in which every warned drive ever removed was about to fail, lowers it to 0.63. Censoring in a record like this is a modeling decision, and its consequences have to be shown.

One more thing about the failure flag. 1,026 failed drives appear in the daily files again after their final failure flag, some for years, and 57 drives carry two flags. We do not know what the later records are. Perhaps a transient fault; perhaps a technician found a drive on a shelf and put it back. We treat a failure as absorbing, dated by the final flag: the drive is gone, and whatever appears under its serial number afterwards is not exposure, the drive-days during which a failure could have been recorded. Reading the later records instead as a second period of service changes the fitted survival probabilities in the fourth decimal place and, among the drive models with at least a hundred failures, the per-model failure-rate multipliers introduced below by at most 4.6 percent. Dropping those drives would be the one wrong choice: it throws away 3.2 percent of the failures, a third of them from the ST3000DM001, the worst drive model in the fleet, whose history is told below.

## Age Is Power-On Age, and Many Drives Arrive Old

The obvious age of a drive is the time since it first appears in the record. It is also the wrong one. Fifteen percent of drives were more than thirty days old when first seen, and among the data drives 2.8 percent were more than a year old. A drive that arrives at age two and fails at age three is a three-year-old failure, not a one-year-old one.

SMART attribute 9 counts power-on hours. For each drive we take the reading on its first observed day of each month, $s$ hours, $\Delta$ days after first sighting, which gives a candidate for the age at first sighting,

$$
a^{(0)} = \frac{s}{24} - \Delta \ \text{days},
$$

and we use the candidate from the earliest month that has one. Only the earliest, because the counter is unreliable later in life. On 21,404 drives a later reading disagrees with the first by more than 45 days and ten percent of the elapsed time. The largest group are Seagate 6 and 8 TB models whose counter drops by about 3,258 days, which is 78,200 hours: the counter overflowed and started again from zero. Had we required the readings to agree, we would have discarded the longest-lived drives in the fleet.

A drive that enters observation at age $a_0$ and leaves at age $a_1$, failing or not, contributes one interval to the likelihood, the probability of the observed record under the distribution being fitted. The interval is left-truncated, because the drive was not observed before $a_0$, and right-censored if the drive left without failing. With $S(a)$ the probability of surviving to age $a$ and failures known to the day,

$$
\ell = \sum_i \Bigl[\delta_i \log\bigl(S(a_{1i}-1) - S(a_{1i})\bigr) + (1-\delta_i)\log S(a_{1i}) - \log S(a_{0i})\Bigr],
$$

where $\delta_i$ is one for a failure. The last term is the left truncation: the drive could only be observed because it survived to $a_0$. Because ages are whole days, the likelihood depends on the data only through counts at each age, and a fit over half a million drives costs a few thousand evaluations of $S$.

Exposure, likewise, should be the days on which a drive actually appears in the files, not the span from its first sighting to its last. Drives go missing for weeks and come back. The difference for the data drives is 739 million calendar days against 732 million observed days. A drive that is absent from the files for a month and returns could not have been recorded as failed while it was gone, so those days are not exposure.

## A Pooled Fleet Is a Mixture

![Cumulative hazard of the pooled fleet, with fitted distributions](/posts/images/backblaze-cumhaz.png)

The hazard $h(a)$ is the failure rate at age $a$ among the drives that have survived to that age, and the cumulative hazard $H(a) = \int_0^a h$ determines survival through $S(a) = e^{-H(a)}$. The figure shows the Nelson–Aalen estimate of the fleet's cumulative hazard, which assumes no distribution: $\hat H(t) = \sum_{u\le t} d_u/Y_u$, with $d_u$ the failures at age $u$ and $Y_u$ the drives at risk at that age, beside several fitted distributions. On the right, age is power-on age. The hazard falls through the first months and rises after about four years. A Weibull distribution has cumulative hazard $(a/\eta)^\beta$: the hazard falls with age when the shape $\beta$ is below one and rises when it is above, and the scale $\eta$ sets the age at which the cumulative hazard reaches one. Two competing Weibulls describe the fleet about as well as anything we tried:

$$
H_0(a) = \Bigl(\frac{a}{\eta_1}\Bigr)^{\beta_1} + \Bigl(\frac{a}{\eta_2}\Bigr)^{\beta_2},
$$

a drive failing at the first of two independent mechanisms, so that the hazards add. Fitted to the pooled fleet, the shapes are $\beta_1 = 0.23$ and $\beta_2 = 1.46$, with a wear-out scale $\eta_2$ of 30.6 years. The early-life scale $\eta_1$ comes out near $1.3\times10^{9}$ years, which is not a lifetime of anything: with a shape of 0.23 it is only the way a small, slowly decaying cumulative hazard is written in Weibull form. A component scale is not an expected life.

The dashed grey curve is the fixed three-component bathtub that storage simulators, including ones I have worked on, have used for twenty years, with shapes 0.5, 1 and 3 and scales of $2.2\times10^7$, $8.77\times10^5$ and $1.2\times10^5$ hours. On this fleet it predicts 2.4 times the failures observed, and it loses to a constant hazard. Its constants describe drives of the mid-2010s tolerably and current drives poorly. The lesson is not that the bathtub is wrong in principle. It is that a lifetime distribution with fitted numbers describes the drives of the period it was fitted to, and should be dated.

There is a deeper point, which Proschan made in 1963 about aircraft air conditioners. A mixture of units with different constant failure rates has a decreasing hazard, because the bad units fail first and the survivors are, on average, better. Part of the "infant mortality" of the pooled fleet is this: the fleet is a hundred drive models with very different rates, and as the worst of them fail the mixture changes.

## The Drive Model Matters More Than the Lifetime Distribution

![Twelve drive models against the common curve](/posts/images/backblaze-per-model.png)

We fit to the data through each December and score the following year, for nine successive years. The score is the logarithm of the probability each fitted model assigned to the failure counts that occurred, by drive model, month and age bin, summed over the cells; a higher score means the model gave what happened a higher probability. On that score, adding a multiplier for each drive model to the two-Weibull distribution gains 2,667 log units. The largest gain from changing the distribution itself, with the drive model held fixed, is 535. Among drive models with at least 500 drive-years, the fitted multipliers run from 0.055 to 5.2, a factor of about a hundred. The drive model is the largest single thing the data tell you.

The model is a gamma frailty: frailty is the demographers' word for an unobserved multiplier on an individual's hazard, and the gamma distribution, a two-parameter distribution on the positive numbers with mean equal to its shape over its rate, is the standard choice for a positive multiplier. For a drive of model $g$ at age $a$,

$$
h(a \mid g) = Z_g\, h_0(a), \qquad Z_g \sim \mathrm{Gamma}\Bigl(\frac{1}{\phi},\ \frac{1}{\phi\mu_g}\Bigr),
$$

in shape–rate form, so that $\mathbb{E}[Z_g] = \mu_g$ and the coefficient of variation of $Z_g$, its standard deviation over its mean, is $\sqrt{\phi}$. This is the distribution of a drive model's multiplier before its failures are seen, the prior. Its mean depends on what is known about a model before it has failed: $\log\mu_g$ is linear in the model's vintage (the year the model first appears in the record), the logarithm of its capacity, and its manufacturer. After the failures are seen the distribution is updated, giving the posterior, and because a gamma prior combined with Poisson-distributed counts (the distribution of the number of events in a period when they occur at a constant rate) gives another gamma, the update is a formula. For a model with $D_g$ failures and baseline exposure $M_g = \sum_i [H_0(a_{1i}) - H_0(a_{0i})]$, the cumulative hazard its drives would have accumulated at multiplier one,

$$
Z_g \mid \text{data} \sim \mathrm{Gamma}\Bigl(\frac{1}{\phi} + D_g,\ \frac{1}{\phi\mu_g} + M_g\Bigr).
$$

A model with many failures gets its own rate; a model with few is shrunk toward what its vintage, capacity and manufacturer predict. The whole thing fits in a small table, one row per drive model. For a drive model with no history, a simulator draws the multiplier from the prior. The fitted baseline, for the reference drive model (an 8 TB Seagate introduced in 2018, $\mu_g = 1$), has $\beta_1 = 0.29$, $\beta_2 = 1.57$ and $\eta_2 = 11.8$ years; a drive model with multiplier $z$ has the effective wear-out scale $\eta_2 z^{-1/\beta_2}$, 74 years at $z = 0.055$ and 4 years at $z = 5.2$.

The figure shows the twelve drive models with the most failures, each with its Nelson–Aalen curve in black and $z_g H_0(a)$ in red. The common curve times one number fits about half of them. It does not fit the ST3000DM001, whose hazard rose steeply after about two years, nor the HGST HUH721212ALN604, which had almost no failures for four years and then wore out faster than the common curve. A model that lets the wear-out shape vary by drive model assigns higher probability to the held-out counts but predicts too many failures in total, and the numerical computation of its posterior did not converge; we report it as unresolved. A shared age curve with a per-model level captures most of what the data support, and the departures from it are systematic for some drive models.

The ST3000DM001 is the best-known case. Backblaze bought 4,829 of them during the drive shortage that followed the 2011 Thailand floods and described what happened in 2015: 2.7 percent failed in 2012, 5.4 percent in 2013 and 47.2 percent in 2014, and storage pods (Backblaze's chassis of 45 drives) full of them lost drive after drive during rebuilds, the reconstruction of a failed drive's contents onto a replacement from the other drives. Our record has 4,707 of them with 1,708 failures, 36 percent of the drives. In 2014 their annualized failure rate, failures per drive-year, was 43 percent and they were about 60 percent of the fleet's failures. A single Weibull fitted to them alone has shape 4.04 and scale 2.9 years, a wear-out as sharp as any in the fleet, and because they were deployed before the record begins in April 2013, every one of them entered observation already in service, so the left truncation of the previous section matters most for this model. The record has no lot numbers, so it cannot name a production run. But these drives were deployed over about a year, from February 2012 to January 2013, and that spread is enough to see age and calendar time separately. Among drives one to two years old, failures ran at 6 per hundred drive-years in the second quarter of 2013, 24 in the fourth, 61 in the third quarter of 2014, and 28 in the first quarter of 2015: the same age, a tenfold swing in rate by date. Within the third quarter of 2014, drives one to two years old failed at 61 per hundred drive-years and drives two to three years old at 178: the same date, a threefold difference by age. So the record shows an event in time, peaking in the summer of 2014 and hitting the older drives hardest, and not a wear-out curve alone. Of the drives that reappear in the files after a failure flag, a third are this model, which is consistent with Backblaze's account of pulling, bench-testing and reusing them. The event is what the next section's model-year shock, a multiplier on one drive model's failure rate in one calendar year, describes; the pods losing a second drive during a rebuild are what the dependence of the last section measures.

The covariates, vintage, capacity and manufacturer, improve the single-number forecast for drive models with little history, but not reliably. For the drive models with no history at all, the prior mean predicted 729 failures over the nine test years against 126 observed, and 499 of the 729 were two Seagate models in 2020. On those cells, scoring the full prior distribution of the multiplier, rather than its mean alone, gave what happened a higher probability than any single-number forecast.

## Calendar Time Is a Variable

With age and drive model accounted for, the fleet's failure rate still moves from year to year, and it fell: by 2026 the fleet-wide level was about a fifth of what it was in 2013. Calendar time enters the model as two multipliers on the hazard. A year effect $Q_y$ is shared by the whole fleet; its logarithm in each year is the previous year's plus a fixed drift plus a random step, a random walk with drift. A *shock* $U_{gy}$ is a multiplier on the failure rate of drive model $g$ in calendar year $y$ alone: a random variable with mean one, drawn independently for each drive model and year, so it raises or lowers that model's rate in that year without changing its level in any other. The hazard is

$$
h(a \mid g, y) = Q_y\, U_{gy}\, Z_g\, h_0(a).
$$

A shock stands for whatever happened to one drive model in one year that the age curve, the model's level and the fleet-wide year do not account for: a firmware fault, a bad production run, a hot aisle, a change in replacement policy. The record does not say which, and all of them would look the same. What the data determine is how large the shocks are, and that depends on how much is going on in the cell: the coefficient of variation of $U_{gy}$ is 0.97 for a drive model expected to have one failure in the year and 0.27 for one expected to have a thousand.

What the shocks buy is calibration: intervals that contain the truth as often as they claim to. On a prespecified set of 169 heavily observed drive-model-years, the 95 percent prediction intervals of the model without shocks contained the observed count 44 percent of the time. With shocks and the drifting year effect they contained it 92 percent of the time. The counts vary far more than Poisson counts with the same means would, and a model that is right on average but wrong about its own uncertainty is a poor guide to risk.

A technical remark that saved us a great deal of computing. If the hazard is taken as constant within each cell of a table of age by calendar period, the survival likelihood is the same, up to a constant, as the likelihood of Poisson counts in those cells with means proportional to their exposure. Holford showed this in 1980. Such a table, failures and drive-days by age and period, is called a Lexis table after the demographer Wilhelm Lexis. It means the Bayesian fits run on a table of drive model by calendar year by age bin, not on half a million drives, and every count model shares that one table.

## Age, Period and Cohort Cannot Be Separated

Here is the limit of what the record can say. A drive first seen at calendar time $t_0$ at age $a_0$ has age $a(t) = a_0 + t - t_0$ at time $t$. Age, calendar time and the start of service are linearly dependent, so a linear trend in one cannot be told from linear trends in the other two. Holford pointed this out for vital rates in 1983 and Clayton and Schifflers in 1987. What separates them in this corpus is the spread of service starts within a drive model, and it is small: the interquartile range of a model's service starts, the span between the first and third quarters of them, is 0.34 years at the median, and between 0.2 and 1.6 years across the models with at least 10,000 drives.

The consequence is that two models with similar forecasts a year or three ahead disagree about the far future. Without a year effect the wear-out shape is $\beta_2 = 1.57$. With a declining year effect it is 1.94, and the steeper ageing is offset by the fleet getting better over time. The two predict fifteen-year survival for the same drive models differing by up to 0.18, and alternative assumptions about whether the calendar improvement continues differ by up to 0.27. Only two percent of the exposure is beyond eight years of age, and above ten years there are 147 drive-years and no failures at all, which says almost nothing about the hazard there. Anyone who simulates a drive's second decade from this data is simulating an assumption, and should say which one.

## SMART Warnings Work, Within Limits

Backblaze judges drives by five SMART attributes: 5 (reallocated sectors), 187 (reported uncorrectable errors), 188 (command timeouts), 197 (pending sectors) and 198 (offline uncorrectable sectors). Over the whole record a drive on which none of them has been non-zero fails at 0.40 percent a year, and a drive on which one has at 16.3 percent, forty times the rate. Warned drives are 7.4 percent of the exposure and 76 percent of the failures. Backblaze reported 76.7 percent in 2016 for the drives that had failed by then; over thirteen years we find 76.2.

Three things limit what a forecaster can do with this. First, the forty-fold ratio is partly policy. Backblaze removes drives on the evidence of these same attributes, and a removal is a failure in the data. Second, the warning often arrives late: 850 of the warnings came on the day of failure, and of the failures in a calendar year, only 39 percent were on drives already warned on 1 January. The other 61 percent come from drives that were clear when the forecast was made. Third, the attributes mean different things to different manufacturers. Attributes 187 and 188 are reported almost only by Seagate drives, so a cross-manufacturer comparison on "any of the five" partly measures what each manufacturer reports.

Time since the warning matters. A drive fails at 86 percent a year in its first thirty days after a warning and at 5.7 percent a year once it has carried the warning for two years. Those are observed rates among the drives still in service at each point, not evidence that a warned drive's own risk declines; the drives that fail quickly leave the warned population. We fitted a transition model with states clear and warned, exits failure and removal, and hazards by age, calendar year, drive model and time since the warning. At a one-year horizon it forecasts the drives in service better than giving the warning a fixed multiplier, by a margin about the size of its standard error; it does not approach the boosted trees that read the whole SMART record.

For the question an operator actually asks, which of my drives will fail this year, a SMART warning raises the one-year area under the ROC curve, the probability that a drive that will fail is ranked above one that will not, from 0.64 to 0.74. Gradient-boosted trees, a machine-learning method that fits a sequence of decision trees each correcting the last, reading the whole monthly SMART record reach 0.74 at one year and 0.83 at ninety days, and assign the highest probability per drive to what actually happened of anything we built, yet they predict about twenty percent too many failures in total. Ranking drives and counting failures are different problems, and the best tool for one is not the best for the other.

## What a Simulator Should Assume

For twenty years I have estimated the durability of erasure-coded storage, in which data are spread over several drives with enough redundancy to survive some failures, by drawing drive lifetimes from a distribution and counting how often more drives fail at once than the code can tolerate. The distribution was the fixed bathtub above. The question was what the fitted distributions change.

We built samplers for the main fitted models, in R and in a C++ library with the parameters compiled in, and checked each against its own distribution. Drawing a remaining lifetime for a drive of a given age costs tens to hundreds of nanoseconds for the distributions whose inverse has a closed form. The calendar-time model, which redraws its shock every simulated year, costs about 150 nanoseconds per drive-year. None of this is a bottleneck in a simulation that must run billions of drive-years to see a rare loss.

Then we ran them all through one RAID simulation: RAID 5, which survives one failed drive, RAID 6, which survives two, and a 17+3 code, seventeen data blocks and three parity, which survives three; ten years of simulated service, with up to a hundred million simulated arrays per combination of code and distribution. The results, in order of how much they matter:

1. **Which fitted fleet-wide distribution you choose** changes the ten-year loss probability by about a factor of two for RAID 5 and about twelve for the 17+3 code, where the rarest cell has six losses in a hundred million trials and is known only to within a factor of two. The fixed bathtub gives six to thirty-three times the loss probability of the fitted two-Weibull distribution.
2. **Which drive model you simulate** changes it by four orders of magnitude. The fitted model covers all 103 drive models, and any of them can be simulated; the RAID example ran six as an illustration, chosen to span the fitted multipliers, and the four orders of magnitude are the spread among those six.
3. **Whether the drives in an array fail together** changes it most of all. Holding everything else fixed, letting the array's drives share the fitted calendar path (the same sequence of year effects $Q_y$ over the simulated years) and the same model-year shock multiplies the RAID 6 loss probability by twelve to sixteen when the shock is given the spread fitted for a group expected to have ten failures a year, and by fifty to ninety when it is given the larger spread fitted for a group with as few expected failures as the array itself. Sharing only the uncertainty in the drive model's multiplier changes it little; sharing the calendar path as well multiplies it by five to seven.

The third result is both the most important and the least settled. The fleet data fix the spread of a shock for a drive model across a whole data center in a year. They say nothing about how much of that shock ten drives in one chassis share. Backblaze's pods of ST3000DM001s in 2014, losing a second drive while rebuilding from the first, are an example of complete sharing. A simulator has to assume it, and between the two settings above the assumption changes the answer by a factor of two to six.

## Reading the Scores

Our comparisons sum a log score over nine held-out years. The unit of replication is the year, not the drive, and that governs what a difference means. A model that beats another by 630 log units in total did so in five years of nine and lost in four; the sum is 1.4 times its standard error (the standard deviation of the nine yearly differences times $\sqrt{9}$, the uncertainty of the sum), and the two models are not separated. The drive-model effect gains 2,667 units and wins eight years of nine. Every comparison in the report therefore carries the years won and that standard error, and a sum without them cannot be interpreted. Two further qualifications apply to all of them. The nine comparisons are not independent, since each year's training data contain the earlier years' test data, and the models were developed on the same nine years they are scored on.

The report, with the data tables, the fitted models and the sampler library, will appear when the review is finished.

## References

- Backblaze. *Hard Drive Data and Stats.* [backblaze.com/cloud-storage/resources/hard-drive-test-data](https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data).
- Backblaze. "[CSI: Backblaze — Dissecting 3TB Drive Failure](https://www.backblaze.com/blog/3tb-hard-drive-failure/)." Backblaze blog, 15 April 2015.
- Backblaze. "[What SMART Stats Tell Us About Hard Drives](https://www.backblaze.com/blog/what-smart-stats-indicate-hard-drive-failures/)." Backblaze blog, 6 October 2016.
- Frank Proschan. "Theoretical Explanation of Observed Decreasing Failure Rate." *Technometrics*, 5(3):375–383, 1963.
- James W. Vaupel, Kenneth G. Manton, and Eric Stallard. "The Impact of Heterogeneity in Individual Frailty on the Dynamics of Mortality." *Demography*, 16(3):439–454, 1979.
- Theodore R. Holford. "The Analysis of Rates and of Survivorship Using Log-Linear Models." *Biometrics*, 36(2):299–305, 1980.
- Theodore R. Holford. "The Estimation of Age, Period and Cohort Effects for Vital Rates." *Biometrics*, 39(2):311–324, 1983.
- D. Clayton and E. Schifflers. "Models for Temporal Variation in Cancer Rates. II: Age–Period–Cohort Models." *Statistics in Medicine*, 6(4):469–481, 1987.
