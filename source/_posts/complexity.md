---
title: Complexity
date: 2022-07-30
updated: 2022-08-01
tags:
  - Notes
  - Computer Science
series: (Re)Learning CS
---

Looking at the theoretical complexity of computational problems and solutions.

<!-- more -->

## Time Complexity

The most obvious approach to determine the performance of a program is with a
timer, returning human-understandable units like nanoseconds or minutes or
(hopefully not) days.

However, this doesn't represent the true efficiency of an algorithm, instead
showing the performance of its implementation. As this is affected by the test
machine, programming language, code quality, etc., we use something better.

_Time complexity_ expresses the execution time of an algorithm as a function of
its input size by measuring its number of operations. This provides a purely
conceptual understanding of an algorithm's speed at any scale and a gauge for
the quality/accuracy of an implementation.

### Notation

The three main notations to describe time complexity are:

- Big-O ('big oh') --- the upper bound of operations performed
- Big-Ω ('big omega') --- the lower bound
- Big-ϴ ('big theta') --- both lower and upper

Generally, we only care about Big-O 'cause the fastest case of algorithm can be
taken for granted. When measuring Big-O, some rules apply:

1. Constant factors of {% math n %} are removed so {% math 3n+2%} becomes {%
   math n %}.

   Mathematical reasons apply which I can't quite follow but practically,
   constant time doesn't matter as {% math n\to\infty %}.

2. Only the largest term of {% math n %} is considered, so {% math n^2+3n+1 %}
   becomes {% math n^2 %}.

   Again, as {% math n\to\infty %}, all but the greatest exponent becomes
   insignificant.

{% caption_img graph.png "Graph of time complexities against input size." %}

## (Classes of) Computational Complexity

[Time complexity](#Time-Complexity) looks at the complexity of a solution, but
_computational complexity_ assesses the practical difficulty of solving a
computational problem.

There are four common classes of computational complexity:

- **P**olynomial --- solvable in polynomial time

  - An algorithm exists which answers the problem

  <!-- spellchecker: disable-next-line -->

- **N**ondeterministic **P**olynomial --- verifiable in polynomial time

  - An algorithm exists which can verify that an answer to the problem is valid
  - This means {% math \text{P} \subseteq \text{NP} %}, as solving the problem
    can verify an answer implicitly
  - There may be an algorithm to solve the problem but with a worse time
    complexity

- **NP-Hard** --- the hardest problems in NP, and harder

- **NP-Complete** --- the hardest problems in NP
  - Or, the problems in NP-Hard which can be verified in polynomial time
  - {% math \text{NP} \cap \text{NP-Hard} %}

When tackling a computational problem in the real world, it's ideal for the
solution to exist within {% math P %}, or to be simplifiable into {% math P %}.
If not, two options are available:

- For small input sizes, a non-polynomial-time solution may work
- For larger inputs, heuristics may allow for a 'good enough' solution
