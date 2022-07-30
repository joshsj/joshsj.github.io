---
title: Time Complexity and Big-O
date: 2022-07-30
tags:
  - Notes
  - Computer Science
series: (Re)Learning CS
---

The most obvious approach to determine the performance of a program is with a
timer, returning human-understandable units like nanoseconds or minutes or
(hopefully not) days.

However, this doesn't represent the true efficiency of an algorithm, instead
showing the performance of its implementation. As this is affected by the test
machine, programming language, code quality, etc., we use something better.

## Time Complexity

_Time complexity_ expresses the execution time of an algorithm as a function of
its input size by measuring its number of operations. This
provides<!--excerpt--> a purely conceptual understanding of an algorithm's speed
at any scale<!--excerpt--> and a gauge for the quality/accuracy of an
implementation.

## Notation

The three main notations to describe time complexity are:

- Big-O ('big oh') --- the upper bound of operations performed
- Big-Ω ('big omega') --- the lower bound
- Big-ϴ ('big theta') --- both lower and upper

Generally, we only care about Big-O 'cause the fastest case of algorithm can be
taken for granted. When measuring Big-O, some rules apply:

1. Constant factors of {% math n %} are removed so {% math 3n+2%} becomes {%
   math n %}

   - Mathematical reasons apply which I can't quite follow but practically,
     constant time doesn't matter as {% math n\to\infty %}

2. Only the largest term of {% math n %} is considered, so {% math n^2+3n+1 %}
   becomes {% math n^2 %}
   - Again, as {% math n\to\infty %}, all but the greatest exponent becomes
     insignificant

{% caption graph.png "Graph of time complexities against input size." %}
