---
title: "Delta Compression"
date: "2026-10-03"
tags: ["research", "storage", "compression", "algorithms"]
excerpt: "Encoding a file as its differences from an earlier version, in linear time, and rebuilding it in the space the old version occupies."
---

Most of the data we store and send is a revision of something we already have. Tonight's backup differs little from last night's. A new kernel release shares nearly all of its bytes with the one before. Firmware for a telephone is last month's firmware with a few changes. Delta compression, or differencing, takes advantage of this: given a *reference* file $R$ that both parties hold and a new *version* $V$, it encodes $V$ as a short list of instructions for building it from $R$. The list is the *delta*. The receiver applies it to its copy of $R$ to reconstruct $V$.

I worked on this problem in the 1990s with my student Dr. Randal Burns, and then with him and Dr. Miklós Ajtai, Dr. Ron Fagin, and Dr. Larry Stockmeyer at the IBM Almaden Research Center, where I was a visiting scientist. I have recently put implementations of the algorithms from that work in a [repository](https://github.com/darrelllong/Delta-Compression), with versions in six languages. This post describes the algorithms and reports a few measurements.

## Copies and Adds

A delta has two kinds of command. A *copy* names an offset and a length in $R$ and says: these bytes come next. An *add* carries literal bytes that $R$ does not have. Executed in order, the commands write $V$ from beginning to end.

The copies need not come in order, and a string in $R$ may be copied more than once. This is what separates differencing from the older string-to-string correction problem of Wagner and Fischer, and from the longest-common-subsequence methods behind `diff`, which assume that what the two files share appears in the same order in both. Dr. Tichy called the more general problem string-to-string correction with block move. Its difficulty is finding the matching strings. The dynamic-programming and greedy algorithms that find the best set of copies take time proportional to the product of the two lengths, or space proportional to the input. That is acceptable for a source file and useless for a disk image.

Dr. Burns and I came to the problem through backup. A client that sends the server a delta against the file it sent yesterday, in place of the whole file, saves the network and the server's disks alike. We described such a system in "[Efficient Distributed Back-up with Delta Compression](/publications/210)" in 1997. For it to be practical, the client must difference files of any size and any format in time linear in their length and in a fixed amount of memory. That is what "[A Linear Time, Constant Space Differencing Algorithm](/publications/213)" provided the same year.

## The Algorithms

The work with the Almaden group refined these ideas, proved what could be proved about them, and measured them. It appeared in the *Journal of the ACM* in 2002 as "[Compactly Encoding Unstructured Inputs with Differential Compression](/publications/26)." The algorithms became the Adaptive Differencing technology in IBM's Tivoli Storage Manager.

All of them rest on fingerprints. A *seed* is a string of $p$ bytes, 16 by default. Its fingerprint is a Karp-Rabin hash, a polynomial in the bytes of the seed taken modulo a prime, here $2^{61} - 1$. The fingerprint at the next offset can be computed from the previous one in constant time, so computing the fingerprints of all seeds in a file takes one pass. Two seeds with different fingerprints are different; two with the same fingerprint are compared byte by byte, and if they are equal, the match is extended as far as it will go.

**Greedy.** Index every seed of $R$ by its fingerprint. At each position of $V$, look up the seed there, try every place in $R$ where it occurs, and take the longest match. This is the classical method, and the paper gives a short proof that it produces a delta of minimum cost when matches of every length are found. It takes space proportional to $R$ and, in the worst case, time proportional to the product of the lengths. It is the standard against which the others are measured.

**One-pass.** Scan $R$ and $V$ together, one seed at a time in each. Keep two hash tables, one for the seeds seen in $R$ and one for those seen in $V$, each holding at most one offset for a fingerprint. Look each new seed up in the other file's table. On a match, extend it forward, emit the copy, discard everything in both tables, and resume after the match in both files. Each byte is examined a bounded number of times and the tables have a fixed size, so the time is linear and the space constant. When the two files have their common strings in the same order, as successive versions of most things do, it compresses nearly as well as greedy.

Its weakness is in its name. If $R$ is $\cdots X \cdots Y \cdots$ and $V$ is $\cdots Y \cdots X \cdots$, the algorithm matches one of the two blocks and has passed the other by the time it would be useful. The paper proves that this is not a defect of the particular algorithm: any algorithm that makes a single pass with limited memory must, on some transposed inputs, produce a delta close to half the length of the version, even when a short delta exists.

**Correcting.** The remedy is to give up a little of the single pass. The correcting 1.5-pass algorithm first scans all of $R$, entering its seeds in a hash table, and then scans $V$, looking each seed up. A block that has moved is found wherever it went. Two further devices make this work in fixed space.

The first is *correction*. Because the table keeps one offset for a fingerprint, the scan may find the middle of a match before its beginning, or encode some bytes as an add and then discover a copy that covers them. So a match is extended backward as well as forward, and the most recent commands are held in a small buffer where they can still be replaced or trimmed by a better match that follows.

The second is *checkpointing*. A fixed table cannot hold a seed for every offset of a large file. Checkpointing admits only the seeds whose fingerprints fall in one residue class modulo $m$, with $m$ chosen so that the admitted seeds fill about half the table. The same test is applied in $V$, so a lookup is made only where an entry could exist. A match longer than the spacing between checkpoints is likely to contain one, and backward extension recovers the part of the match that precedes it. Short matches may be missed, which is the price.

## In Place

A delta is applied by reading $R$ and writing $V$, and so the receiver must hold both at once. That is no burden to a backup server. It is a serious one for a telephone or an embedded controller whose storage holds one copy of its software and little more. Such devices, on slow links, are the ones that most need small updates.

The idea came from a conversation with [Bob Rees](https://www.linkedin.com/in/bob-rees-62b48b24/), an IBM Distinguished Engineer, now emeritus. We were walking down the hall toward lunch at IBM, and I was telling him about the delta compression work. When he heard that reconstruction required scratch space, he said, "You can do better than that."

On the drive home, I came up with cycle breaking based on topological sorting. I called Dr. Burns from my truck and told him to write it down. He was worried that I was talking on the phone while driving Highway 17 over the mountains. That is how our in-place work began. I have Bob to thank for telling me to do better.

Dr. Burns and I described the work in "[In-Place Reconstruction of Delta Compressed Files](/publications/9)" at PODC in 1998, and with Dr. Stockmeyer in "[In-Place Reconstruction of Version Differences](/publications/39)" in 2003. The idea is to rewrite a delta so that it can be applied in the very buffer that holds $R$, with no second copy.

The danger is that one command writes over bytes that another has yet to read. If copy $i$ reads a region that copy $j$ writes, then $i$ must be executed before $j$. Make each copy a vertex and draw an edge from $i$ to $j$ for each such conflict. If the resulting digraph is acyclic, a topological order of it is a safe order of execution; the adds read nothing from the buffer and go last. If it has a cycle, no order will do, and one copy on the cycle is replaced by an add that carries its bytes in the delta. The cycle is broken at the cost of some compression.

Which copy to give up is the interesting question. Minimizing the bytes lost is the feedback vertex set problem with weights, and we showed that it remains NP-hard for the digraphs that arise here. The practical choices are to take whatever copy is at hand, in constant time, or to walk the cycle and take the shortest copy on it. In the experiments of the 2003 paper, the first policy increased delta size by 3.6 percent and the second by half of one percent.

## The Repository

The [repository](https://github.com/darrelllong/Delta-Compression) has the three differencing algorithms and the in-place conversion in Python, Rust, C, C++, Java, and Go. The six implementations produce byte-identical deltas, so a file encoded by one can be decoded by any other. The tests check this compatibility. A delta carries CRC-64 checksums of the reference and the version, both verified when the delta is applied. The Rust implementation is also on crates.io as `delta-compression`.

The following measurements are from an Apple M4 Pro. The repository includes results for other machines, along with the method and the raw output.

The tarballs of Linux 5.1 and 5.1.1 are 871 MB each. The one-pass delta between them is 5.1 MB, 0.58% of the version, and the correcting delta is 6.9 MB, 0.80%. One-pass does better here because the changes are small and in order, and checkpointing passes over short matches. The whole command, including reading both files and checksumming them, takes between 1.4 and 1.8 seconds for one-pass in the five compiled languages, and between 7.0 and 12.1 seconds for correcting, most of which is the pass that indexes the reference.

Transposition reverses the comparison. Take a 16 MB file made of 32,000 blocks and rearrange those blocks to make the new version. With every block displaced, the one-pass delta is 99% of the size of the version: it has found almost nothing. Correcting produces the same delta as greedy: 2.5% of the size of the version, with a copy for each block and no adds. Correcting takes 0.15 seconds, compared with 2.6 seconds for greedy.

In-place conversion leaves the one-pass kernel delta unchanged in size because its copies have no cycles. The correcting delta has 1,333 cycles, and breaking each at its shortest copy enlarges the delta from 6.95 to 7.03 MB, about one percent. Breaking them at whatever copy comes first converts 109,081 copies, long ones among them, and the delta grows to 569 MB.

The permuted blocks are the hard case by construction: every copy is in conflict with others, 10,265 of the 31,998 copies must become adds, and the delta grows from 2.5% of the version to 26%. Applying an in-place delta takes the same time as applying an ordinary one.

The throughput measurements in the repository were made with [Pilot](/blog/2026-03-06-performance-evaluation/) and are reported with their confidence intervals.

## References

- Randal C. Burns and Darrell D. E. Long. "[A Linear Time, Constant Space Differencing Algorithm](/publications/213)." In *Proceedings of the International Performance Conference on Computers and Communication*, February 1997. IEEE.
- Randal C. Burns and Darrell D. E. Long. "[Efficient Distributed Back-up with Delta Compression](/publications/210)." In *Proceedings of I/O in Parallel and Distributed Systems*, November 1997. ACM.
- Randal C. Burns and Darrell D. E. Long. "[In-Place Reconstruction of Delta Compressed Files](/publications/9)." In *Proceedings of Principles of Distributed Computing (PODC)*, Puerto Vallarta, June 1998. ACM.
- Randal Burns, Larry Stockmeyer, and Darrell D. E. Long. "[Experimentally Evaluating In-Place Delta Reconstruction](/publications/165)." In *Proceedings of the NASA and IEEE Mass Storage Conference*, April 2002. IEEE.
- Miklós Ajtai, Randal Burns, Ronald Fagin, Darrell D. E. Long, and Larry Stockmeyer. "[Compactly Encoding Unstructured Inputs with Differential Compression](/publications/26)." *Journal of the ACM*, 49(3):318–367, May 2002.
- Randal C. Burns, Larry Stockmeyer, and Darrell D. E. Long. "[In-Place Reconstruction of Version Differences](/publications/39)." *IEEE Transactions on Knowledge and Data Engineering*, 15(4):973–984, July 2003.
