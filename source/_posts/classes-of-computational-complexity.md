---
title: Classes of Computational Complexity
date: 2022-08-01
tags:
  - Notes
  - Computer Science
series: (Re)Learning CS
---

<!-- TODO add reference to space complexity ?? -->

With {% post_link time-complexity-and-big-o "time complexity" %}, we can analyse
the complexity of a solution. But what about <!--excerpt-->the complexity of a
problem?<!--excerpt-->

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
