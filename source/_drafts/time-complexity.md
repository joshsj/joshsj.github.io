---
title: Time Complexity
date: 2022-07-24
tags:
  - Notes
  - Computer Science
collection: (Re)Learning CS
---

The most obvious approach to determine the performance of a program is with a
timer, returning human-understandable units like nanoseconds or minutes or
(hopefully not) days. However, this doesn't represent the true efficiency of an
algorithm, and instead it shows the performance of its implementation. As this
is affected by the test machine, programming language, code quality, etc., we
use something better.

_Time complexity_ expresses its execution time as a function of its input size.
