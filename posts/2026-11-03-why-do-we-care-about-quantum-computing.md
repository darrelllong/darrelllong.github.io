---
title: "Why do we care about Quantum Computing?"
date: "2026-11-03"
tags: ["quantum-computing", "cryptography", "mathematics", "computer-security"]
excerpt: "What a cryptographically relevant quantum computer would require, why RSA and Diffie–Hellman are vulnerable, and how Shor's algorithm turns quantum interference into factors."
---

A sufficiently capable quantum computer could recover the private keys behind much of the public-key cryptography we use. It could read communications protected by vulnerable key exchanges and forge signatures that we rely on to authenticate people, computers, and software updates.

The machine needed to do this is called a *cryptographically relevant quantum computer*, or CRQC. It must be able to complete a cryptographic attack at a useful key size and within a useful amount of time. Its requirements include enough **logical qubits**, sufficiently reliable operations, and an enormous amount of classical computation to keep the quantum computation working.

A **physical qubit** is a physical system in which we use two distinguishable quantum states to represent $|0\rangle$ and $|1\rangle$. They might be two internal states of an atom or ion, or two energy levels of a superconducting circuit. We must be able to prepare the system, manipulate it, couple it to other qubits, and measure it.

A **logical qubit** is encoded across multiple physical qubits using an error-correcting code.

The notation $|0\rangle$ and $|1\rangle$, pronounced “ket zero” and “ket one,” denotes two basis vectors, just as $(1,0)$ and $(0,1)$ do in linear algebra. A **superposition** is a normalized linear combination of them:

$$
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle.
$$

The coefficients $\alpha$ and $\beta$ are called **amplitudes**. Measuring in this basis gives zero with probability $|\alpha|^2$ and one with probability $|\beta|^2$, with $|\alpha|^2+|\beta|^2=1$. Writing a complex amplitude as $\rho e^{i\gamma}$, $\rho$ is its magnitude and $\gamma$ is its **phase**, the angle in the complex plane. The relative phase is the difference between the two amplitudes' angles.

When an operation combines contributions to the same measurement outcome, their amplitudes add before we take the squared magnitude. Contributions with matching phases reinforce one another; opposing contributions can cancel. This is **interference**.

The usual geometric representation is the [Bloch sphere](https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/density-matrices/bloch-sphere). Ignoring a common phase multiplying the entire vector, which does not change measurement probabilities, we can write a pure single-qubit state as

$$
|\psi\rangle=\cos(\theta/2)|0\rangle
+e^{i\phi}\sin(\theta/2)|1\rangle.
$$

![Bloch sphere with zero and one at the poles, a state vector on the surface, polar angle theta, and relative-phase angle phi around the equator.](/images/quantum-bloch-sphere.png)

*The polar angle $\theta$ sets the measurement probabilities: $\cos^2(\theta/2)$ for zero and $\sin^2(\theta/2)$ for one. The angle $\phi$ is the relative phase between the two amplitudes. Every point on the equator gives equal zero/one probabilities, although those states behave differently in subsequent operations.*

A point on the surface represents a **pure state**, one described by a single state vector. Preparing $|0\rangle$ or $|1\rangle$ with equal classical probabilities gives a statistical mixture at the center; preparing $(|0\rangle+|1\rangle)/\sqrt2$ gives a pure state on the equator. A reversible single-qubit gate moves the point by rotating the sphere's radius vector. This is what “rotation” means here: a controlled change of the quantum state. A relative phase shift moves the point around the vertical axis while preserving its zero/one measurement probabilities.

An ordinary digital circuit represents zero and one by ranges of voltages. Small disturbances within those ranges can be removed as gates regenerate the signal. A qubit must preserve the amplitudes and relative phase needed by the computation. An unwanted phase change can spoil the answer even when the probabilities of immediately measuring zero or one have not changed.

Physical qubits interact with their surroundings. An excited (higher-energy) state can lose energy to the environment and decay. Fluctuating electric or magnetic fields can change the relative phase. Uncontrolled interaction with the environment can carry away information about the qubit and destroy **coherence**, the phase relationships needed for interference. These processes are called [relaxation and dephasing](https://quantum.cloud.ibm.com/learning/en/courses/tools-for-quantum-advantage/noise-and-errors).

Control introduces further opportunities for error. A microwave or laser pulse can change the amplitudes or relative phase by the wrong amount. A signal intended for one qubit can disturb its neighbor. The engineering problem is to suppress unwanted interactions while retaining the deliberate interactions needed to compute. Cooling, shielding, vacuum systems, and precisely controlled fields address different parts of that problem, depending on the hardware.

The encoding of a logical qubit distributes its information so that certain errors can be detected and corrected without learning the encoded amplitudes. It is not a collection of identical backups: the [no-cloning theorem](https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/quantum-circuits/limitations-on-quantum-information) rules out copying an arbitrary unknown quantum state.

The code repeatedly measures selected relationships among physical qubits. Those measurements produce *error syndromes*, which a classical decoder interprets. The checks reveal evidence of errors while preserving the logical information. More physical qubits can provide stronger protection when the hardware and code meet the necessary conditions. There is no fixed conversion rate from physical qubits to logical qubits.

[RSA](https://people.csail.mit.edu/rivest/Rsapaper.pdf) starts with two large primes, $p$ and $q$, and publishes their product:

$$
N=pq.
$$

Multiplying the primes is easy. Recovering them from a properly chosen, sufficiently large $N$ is beyond the reach of the best known classical factoring methods. Someone who factors $N$ can calculate the private exponent from the public exponent. That compromises both RSA encryption and RSA signatures.

[Diffie–Hellman key exchange](https://ee.stanford.edu/~hellman/publications/24.pdf) uses a different problem. In a suitable group, Alice publishes $g^a$ and Bob publishes $g^b$. Their exponents remain secret. Each can calculate $g^{ab}$ using the other person's public value and their own exponent. An eavesdropper sees the public values, but recovering an exponent requires solving a *discrete logarithm* problem. An efficient discrete-logarithm algorithm therefore breaks the exchange.

Elliptic-curve cryptography changes the group. Its public key is a point $P=aG$, obtained by adding a publicly known point $G$ to itself $a$ times. The secret is $a$. Classical attacks on well-chosen curves are expensive, which allows much shorter keys than RSA at comparable classical security levels. But [Shor's discrete-logarithm algorithm applies to elliptic curves too](https://arxiv.org/abs/1706.06752). ECDH key exchange and elliptic-curve signatures, including ECDSA and EdDSA, are vulnerable.

These attacks exploit periods and discrete logarithms in efficiently computable abelian groups, where combining elements in either order gives the same result. Shor solves the problems on which RSA and these discrete-logarithm systems depend. Merely using a group does not mean a cryptosystem's security depends on either problem.

[Peter Shor's result](https://arxiv.org/abs/quant-ph/9508027) makes factoring and discrete logarithms possible in polynomial time on a suitable quantum computer. Here, polynomial time means that the number of operations grows as a polynomial in the number of bits used to describe the problem. Increasing an RSA key's length makes the quantum attack more expensive, but it does not restore the mathematical obstacle that protects it against known classical attacks.

To reduce factoring to period finding, choose an integer $a$ that is relatively prime to $N$. We can check that condition efficiently with Euclid's algorithm. Then consider

$$
f(x)=a^x\bmod N.
$$

The values repeat. The smallest positive integer $r$ for which $a^r\equiv1\pmod N$ is the *order* of $a$ modulo $N$, and it is the period of $f$.

Suppose we can find $r$. If it is even, let $z=a^{r/2}\bmod N$. Then

$$
z^2\equiv1\pmod N,
\qquad
(z-1)(z+1)\equiv0\pmod N.
$$

When $z$ is neither $1$ nor $-1$ modulo $N$, calculating $\gcd(z-1,N)$ and $\gcd(z+1,N)$ yields nontrivial factors. If the order is odd or the result is unhelpful, we try another choice of $a$. The greatest-common-divisor calculations are ordinary classical arithmetic. The difficult part is finding the period.

For a small example, take $N=21$ and $a=2$. The successive powers, reduced modulo $21$, are

$$
1,\;2,\;4,\;8,\;16,\;11,\;1,\;2,\ldots
$$

The period is six. Thus $z=2^3=8$, and

$$
\gcd(8-1,21)=7,
\qquad
\gcd(8+1,21)=3.
$$

We have factored $21$ by finding a period. The same reduction works for a large RSA modulus. Enumerating its powers until they repeat would take too long, so we need another way to discover the period.

A **register** is a collection of qubits treated as one system. An $m$-qubit register has $2^m$ computational-basis states, labeled by the possible bit strings or their integer values. Its state vector has one complex amplitude per basis state. This is a mathematical description of the state; measuring the register returns one bit string.

A quantum algorithm arranges interference among these amplitudes so that a useful measurement becomes likely.

For period finding, prepare a **uniform superposition** of integers from $0$ through $Q-1$, where $Q$ is a power of two: each has the same amplitude, initially with the same phase. Reversible modular arithmetic then computes $a^x\bmod N$ into a second register:

$$
\frac{1}{\sqrt Q}
\sum_{x=0}^{Q-1}|x\rangle|a^x\bmod N\rangle.
$$

Two kets written together specify the values in the two registers.

The two registers are **entangled**: their joint state cannot be written as an independent state for each register. The second register's value is linked to the first register's input. For the explanation, imagine measuring the second register and obtaining one particular function value. The first register is then a superposition of the inputs that produced that value:

$$
|\psi\rangle=
\frac{1}{\sqrt L}
\sum_{j=0}^{L-1}|x_0+jr\rangle.
$$

Here $L$ counts the terms that fit inside the register, and $x_0$ is the smallest nonnegative input giving the measured function value. The terms are evenly spaced by the unknown period $r$. Measuring this register immediately would give us one of those inputs. Instead, we change from the basis labeled by input values to a basis that reveals frequencies.

The [quantum Fourier transform](https://quantum.cloud.ibm.com/learning/en/modules/computer-science/qft) acts on each basis state as follows:

$$
F_Q|x\rangle=
\frac{1}{\sqrt Q}
\sum_{k=0}^{Q-1}e^{2\pi i xk/Q}|k\rangle.
$$

For our periodic state, the amplitude of a possible output $k$ contains the sum

$$
\sum_{j=0}^{L-1}e^{2\pi i jrk/Q}.
$$

When $rk/Q$ is an integer, the terms have the same phase and reinforce one another. At other values, the phases rotate around the circle and tend to cancel. The measurement probabilities concentrate near

$$
\frac{k}{Q}=\frac{s}{r}
$$

for integer values of $s$. The unknown spacing in the input has become a pattern of likely frequencies in the output.

If $r$ divides $Q$, the peaks are exact. Otherwise, they fall near the corresponding frequencies. Choosing $Q$ large enough, conventionally at least $N^2$ in this version of the algorithm, gives enough precision for **continued fractions**, a classical method for finding accurate rational approximations, to recover candidate periods.

![Two probability plots for factoring 21. Before the quantum Fourier transform, equally likely inputs are spaced six apart. After the transform, probability concentrates near six evenly spaced frequencies.](/images/quantum-period-finding.png)

*A calculated example with $N=21$, $a=2$, and a nine-qubit input register, so $Q=512$. The upper plot shows the state conditional on measuring the function value $1$. The lower plot shows its Fourier measurement probabilities.*

In this example, one likely measurement is $k=85$. The fraction $85/512$ is close to $1/6$, and continued fractions recover the denominator six. We check it by calculating $2^6\bmod21$. Other measurements can give less information: $k=256$ produces $1/2$, whose denominator is only a divisor of the period, and $k=0$ is unhelpful. Repetition and classical verification are part of the algorithm.

For $Q=2^m$, the transform's standard circuit uses only $O(m^2)$ elementary gates. These operations mix amplitudes and make conditional phase shifts, changing a component's complex angle depending on another qubit's value. It transforms $2^m$ amplitudes without requiring $2^m$ separate gates. Implementing those operations accurately on error-corrected hardware adds work. We do not get to read out all those amplitudes. A measurement gives one $k$. The carefully prepared periodic state is what makes a few such measurements useful.

The discrete-logarithm version uses related interference in two dimensions. Let $g$ generate a cyclic group of prime order $\ell$, so its powers run through all $\ell$ elements. Suppose $y=g^s$, and $s$ is secret. Take $u$ and $v$ modulo $\ell$ and consider

$$
h(u,v)=g^u y^v=g^{u+sv}.
$$

Changing $(u,v)$ by $(-s,1)$ leaves the value unchanged. Prepare a uniform superposition of the pairs $(u,v)$ and compute $h(u,v)$ into a third register. Apply a Fourier transform modulo $\ell$ to each input register. Measuring those registers gives two frequencies, $c$ and $d$, related by

$$
d\equiv cs\pmod\ell.
$$

For a nonzero $c$, ordinary modular inversion gives $s$. With elliptic curves, we write the function as $uG+vP$ instead. The same hidden relation is present. Changing from multiplication modulo a prime to addition of elliptic-curve points does not remove it.

The logical qubits must support reliable gates as well as reliable storage. The machine must perform a long sequence of reversible arithmetic operations, preserve the information throughout, and read out the result. For factoring, modular exponentiation accounts for much of the work. The Fourier transform is a comparatively small part of the circuit.

A classical circuit can be built entirely from NAND gates, or entirely from NOR gates. Each is [universal for Boolean logic](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c4/c4s1/): it can express every Boolean function, given enough gates and wires. For NAND, tying the two inputs together produces NOT. Negating a NAND output produces AND. Applying NAND to two inverted inputs produces OR, by De Morgan's law.

![Three classical circuits made only from NAND gates. One tied-input NAND implements NOT, two NAND gates implement AND, and three implement OR.](/images/classical-nand-universality.png)

*The small circle at a gate's output means inversion. NAND alone can build NOT, AND, and OR; NOR has the same universality property. Practical circuit designs use a broader gate library to improve area, power, and delay.*

A **quantum gate** acts on the state vector. For the computation between measurements, it is a *unitary* transformation: a reversible linear map that preserves the sum of the squared magnitudes of the amplitudes, and therefore total probability. An ordinary AND gate maps three different inputs to zero, so its output cannot tell us which input was supplied. We can implement that Boolean function reversibly by preserving its inputs and writing the result into an additional qubit.

That is one job for a **Toffoli gate**, also called controlled-controlled-NOT. It has two control qubits, $a$ and $b$, and a target qubit, $c$. On computational-basis inputs, it leaves $a$ and $b$ unchanged and flips $c$ exactly when both controls are one:

$$
|a,b,c\rangle\longmapsto
|a,b,c\oplus(a\land b)\rangle.
$$

Here $\oplus$ is exclusive-or and $\land$ is AND. Start the target at zero and it receives $a\land b$. Apply the gate twice and the original state is restored. Together with simpler reversible gates, [Toffoli gates build adders, multipliers, and other Boolean computations](https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/quantum-algorithmic-foundations/simulating-classical-computations). In a quantum circuit, the operation acts on superpositions without measuring the controls. That is how we can perform the modular arithmetic in Shor's algorithm coherently.

![Circuit symbols and actions for the Hadamard, T, controlled-NOT, and Toffoli gates. Hadamard mixes amplitudes, T changes relative phase, CNOT flips a target controlled by one qubit, and Toffoli flips a target controlled by two.](/images/quantum-gates.png)

*Time runs from left to right. A filled dot is a control; a circled plus is a NOT target. The basis-state mappings shown for CNOT and Toffoli extend linearly to superpositions.*

Reversible Boolean gates alone just permute computational-basis states. Quantum universality also requires control over superpositions and phases. The **Hadamard gate**, $H$, mixes the zero and one amplitudes. The **T gate** advances the phase of the one component relative to the zero component by $\pi/4$. **CNOT** provides an interaction that can entangle two qubits.

The set $\{H,T,\mathrm{CNOT}\}$ is [universal for quantum computation](https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/quantum-algorithmic-foundations/measuring-computational-cost): circuits made from these gates can approximate any unitary operation to any desired accuracy, up to an unobservable overall phase. More precision generally requires more gates.

The **Clifford gates** are the operations that can be built from $H$, CNOT, and the phase gate $S$, which advances the relative phase by $\pi/2$. Starting with qubits initialized to $|0\rangle$, Clifford gates and measurements in the zero/one basis alone give circuits that can be simulated efficiently on a classical computer. They do not provide universal quantum computation.

The T and Toffoli gates are **non-Clifford** operations: they lie outside that restricted family. A common error-correcting scheme, the **surface code**, uses local checks on a two-dimensional arrangement of qubits. Computation must be **fault-tolerant**, meaning that errors in individual components, including the correction machinery, are contained rather than allowed to spread into an uncorrectable logical error.

In surface-code architectures, supplying non-Clifford operations requires additional machinery. One approach consumes specially prepared auxiliary states called **magic states**. For example, the state used to supply a T gate is

$$
|A\rangle=
\frac{|0\rangle+e^{i\pi/4}|1\rangle}{\sqrt2}.
$$

The [magic-state construction](https://arxiv.org/abs/quant-ph/0403025) combines these resources with Clifford gates, measurements, and classical feedback to perform the required operation on the data. This is called **gate injection**: consuming an auxiliary state to implement a gate. **Feed-forward** means using a measurement result to choose a subsequent operation. Preparing the resource state supplies what the Clifford operations cannot do alone.

![A magic-state factory improves noisy non-Clifford resource states and supplies more reliable encoded states to gate injection. Protected data pass through an injection circuit, while classical decoding and control interpret measurements and provide corrections.](/images/quantum-magic-state-factory.png)

*A factory supplies auxiliary quantum states to the computation. Clifford operations, measurements, and classical feedback use them to enact non-Clifford gates. Encoded states throughout this system still require error correction.*

A **magic-state factory** dedicates physical qubits, gates, and time to producing those states reliably. Distillation protocols consume multiple imperfect resource states to obtain fewer, cleaner ones. Other approaches, including [magic-state cultivation](https://research.google/pubs/magic-state-cultivation-on-a-superconducting-quantum-processor/), change how the states are prepared and checked. The supply rate matters: a computation that needs these states cannot simply run ahead when the factory has not produced them.

In March 2026, Google's researchers reported two circuit designs for a 256-bit elliptic-curve discrete-logarithm problem:

| Logical qubits | Toffoli gates |
| --- | --- |
| Fewer than 1,200 | Fewer than 90 million |
| Fewer than 1,450 | Fewer than 70 million |

These are **logical** resource estimates. Each protected Toffoli operation can require many physical operations and additional auxiliary states. Turning a gate count into a runtime requires the circuit's dependencies, opportunities for parallelism, factory throughput, and classical response times.

Under its superconducting-hardware assumptions, [Google's study](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) estimated fewer than 500,000 physical qubits and a runtime of minutes for this elliptic-curve attack.

For RSA-2048, [Craig Gidney's 2025 estimate](https://arxiv.org/abs/2505.15917) put the physical requirement below a million noisy qubits, with a runtime below a week, under specified assumptions about gate errors, connectivity, error-correction cycles, and classical control. These numbers change as algorithms, codes, and hardware improve. There is no single qubit count that defines a CRQC independently of its target and operating conditions.

Error correction remains a substantial part of the machine. An uncorrected physical error probability that looks small for one gate is disastrous over a long computation. As a simple illustration, a billion vulnerable operations, each independently failing with probability $10^{-6}$, would produce about a thousand failures on average. We need a much smaller *logical* error rate across the whole computation.

An error-correction scheme has an **error threshold**: under its assumed noise model, this is the physical error level below which adding redundancy improves protection. [Surface-code constructions](https://arxiv.org/abs/1208.0928) show how to do this, including the additional machinery needed for a universal set of logical gates.

The syndrome measurements go to a **classical decoder**. It must infer the likely errors and determine the corrections, often tracking them in a classical record rather than immediately applying a physical correction. That computation continues throughout the quantum calculation.

Both the bandwidth and the computation can be enormous. If 100,000 error checks each produce one syndrome bit every microsecond, the raw stream is $10^{11}$ bits per second: **12.5 gigabytes per second**. An illustrative larger system with ten million such checks would produce **1.25 terabytes per second**, before compression or communications overhead. The measurements continue throughout the calculation, potentially for hours or days.

The decoder must compare check results from neighboring qubits over successive rounds to infer likely error patterns. Under their surface-code and decoder assumptions, [Camps and colleagues](https://daancamps.com/publication/hardware-evaluation/) estimated **petaflop-scale classical capacity** for decoding in a 1,000-logical-qubit chemistry calculation: roughly $10^{15}$ floating-point operations per second. Their model converts CPU decoder timings into equivalent floating-point capacity.

Throughput and latency both matter. The classical system must keep pace with incoming measurements, and it must deliver the information needed by later quantum operations. A growing backlog slows the computation. Google's [Willow real-time decoding experiment](https://www.nature.com/articles/s41586-024-08449-y) ran error-correction rounds every $1.1$ microseconds, while decoder latency averaged $63$ microseconds.

Reducing the logical-qubit requirement does not eliminate the physical-qubit overhead, the gate count, or the classical decoding workload. A CRQC is an integrated quantum and classical computer.

Conflating artificial intelligence with quantum computing is nonsense. Today's mainstream AI systems are trained and run on classical computers. Shor's algorithm does not depend on a trained model. There are specific research connections, including [neural networks for decoding quantum error syndromes](https://www.nature.com/articles/s41586-024-08148-8). In that work, classical software interprets the quantum processor's error measurements. It does not make the two technologies interchangeable. A sales pitch that simply bundles “AI” and “quantum” together is asking for your money with two buzzwords.

Post-quantum cryptography (PQC) supplies replacements for vulnerable key exchanges and signature schemes, using different mathematical assumptions. It runs on classical computers. NIST's [first three finalized standards](https://csrc.nist.gov/News/2024/postquantum-cryptography-fips-approved/) cover key establishment and digital signatures using lattice-based and hash-based constructions. Shor's algorithm does not solve their underlying problems.

For readers interested in the algorithms, I have implemented classical and post-quantum cryptography in pure Rust. The code is available in my [cryptography repository](https://github.com/darrelllong/cryptography).

The timing depends partly on how long information must remain secret. An adversary can retain a vulnerable key exchange and the encrypted traffic associated with it, then attack the exchange when a suitable machine becomes available. NIST calls this [harvest now, decrypt later](https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography). Upgrading the systems later does not retrieve the copies already recorded.
