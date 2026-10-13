---
title: "The Church of AI"
date: "2026-10-13"
tags: ["artificial-intelligence", "mathematics", "philosophy", "algorithms"]
excerpt: "Faith, mathematical proof, and the engineering cost of algorithms that promise their advantages beyond the reach of any real computer."
---

![Blaise Pascal looks skeptically at a computer server on an altar while Vernor Vinge looks on optimistically, with a stone statue of Sam Altman in the background.](/images/pascal-vinge-church-of-ai-v2.png)

*Pascal and Vinge at the Church of AI.*

Pierre de Fermat wrote that

$$
a^n+b^n=c^n
$$

has no solution in positive integers when the integer $n>2$. He added that he had discovered a marvelous proof, but the margin was too small to contain it.

We do not know what argument Fermat had in mind, or whether it was correct. What we have is his assertion that he possessed a proof. The distinction matters.

More than three centuries later, [Andrew Wiles announced a proof](https://abelprize.no/sites/default/files/2021-04/bio_en_2016_A.%20Wiles.pdf). Mathematicians examined it and found a gap. Wiles, working with Richard Taylor, repaired the argument, and the completed work appeared in 1995. Even Wiles had to supply an argument that survived scrutiny. His reputation could not fill the gap.

That is how mathematics works. One mathematician convinces the others by giving them an argument they can examine. They question the assumptions, follow the deductions, and look for mistakes. The argument has to withstand that examination.

Now OpenAI has released a collection of mathematical manuscripts whose readability is itself a subject of dispute. [Tristan Humbert described the manuscript concerning a problem from his doctoral research](https://proofsandprompts.com/2026/10/08/100-reactions-to-100-solutions/comment-page-1/) as “mostly unreadable slop.” [OpenAI’s own repository](https://github.com/openai/math) acknowledges that the results are at different stages of verification, that not all have accompanying Lean formalizations, and that “Some of the unformalized results could have issues.”

An unreadable manuscript accompanied by an admission that it may contain holes does not become established mathematics because a machine produced it.

I have no objection to machine checking through rules we understand. [Lean](https://lean-lang.org/faq/) is a proof assistant: its proof objects can be checked by a small kernel implementing specified logical rules, and independent checkers can examine them too. That is a concrete procedure we can investigate.

But a checked Lean proof establishes a particular formal proposition from particular assumptions. Mathematicians must still examine whether those are the proposition and assumptions being claimed. [Lean’s own documentation](https://lean-lang.org/doc/reference/latest/ValidatingProofs/) explains the need to inspect the statement and its axiom dependencies. The presence of some Lean formalizations does not certify every manuscript in a repository.

To paraphrase Juvenal, who checks the checkers? That remains a proper question. We can examine the rules, inspect the implementation, and check the result independently. An enormous enumeration may leave me intellectually unsatisfied, but dissatisfaction is different from invalidity.

My objection arises when examination is replaced by an instruction to believe. If no human can understand the argument, but we are told to accept it because the machine knows better, we are being asked for faith.

That is theology.

Once you have proof of a proposition, you no longer need faith in it, nor can your acceptance of it still be an act of faith. The thing has been demonstrated. Faith and proof are incompatible as grounds for accepting the same proposition.

You can have faith, or you can have proof, but you do not get both. Sorry.

Someone will remind me that I am a Christian: surely I accept that God knows things I do not, and that His understanding exceeds mine.

Certainly. That is theology, which is precisely what I said. I know [Isaiah](https://www.biblegateway.com/passage/?search=Isaiah+55%3A8-9&version=KJV):

> For my thoughts are not your thoughts, neither are your ways my ways, saith the Lord.

I do not pretend to know the mind of God. That does not entitle anyone to put OpenAI in His place.

[Pascal understood the distinction](https://www.gutenberg.org/files/18269/18269-h/18269-h.htm). His wager reasoned about the consequences of belief under uncertainty; it did not demonstrate God’s existence. Its force came from the asymmetry of the stakes: finite worldly costs against the possibility of infinite gain, finite worldly gains against the possibility of infinite loss. That reasoning anticipated decision theory. It did not turn faith into a theorem.

If you accept OpenAI’s purported proofs without mathematicians examining them, simply because you believe OpenAI knows better, you are operating on faith. Calling the source a machine does not change what you are doing.

If you work on faith, atheism is not for you. You just have a different God.

If I am wrong about the mathematics, show me the proof. I will change my mind. What perdition awaits the AI skeptic?

There is a second objection, and this one comes from the engineer in me.

Among OpenAI’s manuscripts is a [claimed improvement in the complexity of the discrete Fourier transform](https://github.com/openai/math/blob/main/preprints/An-explicit-power-saving-for-the-exact-discrete-Fourier-transform-September-25-2026/build/sections/introduction.tex). Its advertised asymptotic bound is

$$
O\!\left(n(\log n)^{1-10^{-13}}\right).
$$

The arithmetic model permits exact complex arithmetic at unit cost, without bounds on the magnitudes of coefficients or intermediate values. The paper makes no claim about finite precision or numerical stability. It also expressly acknowledges enormous constants and supplies no useful crossover estimate.

Those assumptions matter. On an actual computer, precision has a cost. Storing a number has a cost. Multiplying numbers has a cost that cannot always be charged as one convenient, indivisible operation.

[Ben Recht’s rough estimate](https://www.argmin.net/p/faster-fourier-transforms) puts the crossover scale around

$$
n \gtrsim 10^{\,10^{\,10^{15}}}.
$$

That is his estimate, not a measured performance result. The precise height of the tower is hardly the engineering issue.

Well, that’s useful, isn’t it?

Big-$O$ notation permits us to suppress constants and ignore an initial range of input sizes. It does not require that the suppressed constant fit anywhere in the physical universe, or that the initial range end before the universe does.

Using that notation to advertise a practical computational improvement is an abuse of notation. The symbols can be perfectly legitimate while the engineering implication is nonsense.

Dick Lipton and Ken Regan gave us the term [*galactic algorithms*](https://rjlipton.com/2010/10/23/galactic-algorithms/): algorithms with splendid asymptotic behavior that lose to ordinary methods on every input we could conceivably care about. I can almost hear Dick laughing.

We have known for decades that the mathematical universe of computation contains beautiful things far removed from useful computation.

[Borodin proved the existence of arbitrarily large gaps in computational complexity](https://www.cs.toronto.edu/~bor/Papers/complexity-gaps.pdf): ranges of asymptotic resource behavior that no computation occupies. Empty places. His point was the gap itself.

[Blum proved that some computable functions admit an endless succession of asymptotically better algorithms](https://doi.org/10.1145/321386.321395). There need be no best algorithm. Each improvement, however, may move the promised advantage to larger inputs. The theorem imposes no fixed ceiling on time or memory. The engineer lives under both.

These are theorems. Borodin and Blum proved them. They reveal extraordinary properties of the mathematical structure of computation.

They do not give me a useful algorithm for the calculation I need to perform. I can admire them as I admire an abstract painting. Beauty alone is a perfectly respectable reason to be interested in something. It does not make it an engineering achievement.

Even within $P$, the region in which we can comfortably do useful work is narrow. Unless the input is small, cubic time already makes us uneasy. Exponential and factorial growth demand smaller inputs still. Calling an algorithm polynomial does not oblige a computer to finish it before the electricity bill arrives.

I have spent weeks working on the general number field sieve. Its customary [heuristic running-time estimate](https://arxiv.org/abs/2007.02730) is

$$
\begin{aligned}
L_N\!\left[\frac13,\left(\frac{64}{9}\right)^{1/3}\right]
&=\exp\!\left(
\left(\left(\frac{64}{9}\right)^{1/3}+o(1)\right)
(\ln N)^{1/3}(\ln\ln N)^{2/3}
\right).
\end{aligned}
$$

Here $N$ is the integer being factored. It is not the number of bits in its representation. An integer with $b$ bits is on the scale of $2^b$. Keeping track of what the variable means is part of understanding what the computation costs.

In an implementation, I have to care about memory, arithmetic, data movement, and elapsed time. Those costs do not disappear into the notation.

Consider something much more familiar: a deck of cards.

There are

$$
52! \approx 8.066\times10^{67}
$$

possible orderings.

Suppose we write down every one. At one byte per card, each complete ordering takes 52 bytes. The resulting collection requires

$$
52\times52!\approx4.194\times10^{69}\text{ bytes}.
$$

Suppose further that we can print an entire ordering every nanosecond: a billion complete decks every second, continuously, without interruption.

The job takes

$$
\begin{aligned}
\frac{52!}{10^9}
&\approx8.066\times10^{58}\text{ seconds}\\
&\approx2.556\times10^{51}\text{ years}.
\end{aligned}
$$

The universe is about [13.8 billion years old](https://science.nasa.gov/exoplanets/what-is-the-universe/). Our little printing job would therefore take approximately

$$
1.85\times10^{41}
$$

times its present age.

Perhaps the storage medium needs improvement. [Earth’s mass and estimated composition](https://arxiv.org/html/2505.02641v1#S7) give roughly $1.4\times10^{50}$ atoms. Suppose we could store an *entire deck ordering on each atom*. We would still need approximately $6\times10^{17}$ Earths: **six hundred quadrillion Earths** to record all the shuffles.

Fifty-two cards.

No clever algorithm eliminates the need to produce $52!$ separate orderings when producing every ordering is the job. Faster hardware changes the rate. It does not repeal the output requirement.

Engineers do not need infinity to encounter impossibility. Fifty-two will do.

A friend put it nicely: “The real world is a messy place. Welcome to it, mathematicians.”

My piddling brain runs on less than 30 watts; the usual estimate for a [human brain’s power consumption](https://pmc.ncbi.nlm.nih.gov/articles/PMC6092772/) is around 20. My friend Richard Garwin’s probably ran at 100 watts. If you ever sat with him eating ice cream, you will understand.

Allow him that generous 100 watts continuously from birth to [his doctorate at twenty-one](https://rlg.fas.org/). That comes to about eighteen megawatt-hours. The [International Energy Agency estimates](https://iea.blob.core.windows.net/assets/ed0483fd-aab4-4cf9-b25a-5aa362b56a2f/EnergyandAI.pdf) that training GPT-4 consumed 42.4 gigawatt-hours, more than two thousand times that budget.

And GPT-4 is not even close to Garwin.

Don’t get me started on how much data GPT-4 was trained on versus the number of books and papers Garwin read. There is a fundamental difference we do not understand and try to paper over with bytes.

[Anthropic announced access to more than 300 megawatts of capacity](https://www.anthropic.com/news/higher-limits-spacex) at Elon Musk’s Colossus 1 data center. At a continuous draw of 300 megawatts, Colossus would consume Garwin’s entire twenty-one-year allowance in less than four minutes.

That is a facility-scale comparison. For Fable itself, I want the power consumption of the working system and the useful work delivered. Put a meter on it.

Call me when you have a Garwin equivalent running on less than 1 kW.

Vernor Vinge was a dear friend of mine. We used to talk through his ideas for books on our way to Square Pan Pizza. He had been telling me about his ideas around the Singularity since at least 1980, assuring me that it might be just around the corner.

My friends in holographic storage and controlled nuclear fusion have made similar assurances for the same forty years. The Singularity may come, or it may not, a possibility Vernor explored in [*A Deepness in the Sky*](https://us.macmillan.com/books/9781250905970/adeepnessinthesky/).
