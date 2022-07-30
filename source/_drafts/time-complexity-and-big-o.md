---
title: Time Complexity and Big-O
date: 2022-07-24
tags:
  - Notes
  - Computer Science
series: (Re)Learning CS
---

The most obvious approach to determine the performance of a program is with a
timer, returning human-understandable units like nanoseconds or minutes or
(hopefully not) days. However, this doesn't represent the true efficiency of an
algorithm, instead showing the performance of its implementation. As this is
affected by the test machine, programming language, code quality, etc., we use
something better.

## Time Complexity

_Time complexity_ expresses the execution time of an algorithm as a function of
its input size by measuring its number of operations. This offers a a purely
theoretical understanding of an algorithm's speed at any scale.

<!-- TODO a bit more -->

## Notation

The three main notations to describe time complexity are:

- Big-O ('big oh') --- the upper bound of operations performed
- Big-Ω ('big omega') --- the lower bound
- Big-ϴ ('big theta') --- both lower and upper

Generally, we only care about Big-O 'cause the fastest case of algorithm can be
taken for granted.

When determining the Big-O of an algorithm, only the largest terms of 'n' are
considered, so a complexity of {% math x^2+3x+1 %} is reduced to {% math x^2 %}.
