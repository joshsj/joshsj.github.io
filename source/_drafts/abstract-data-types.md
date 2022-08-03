---
title: Abstract Data Types
tags:
  - Notes
  - Computer Science
series: (Re)Learning CS
---

Producing software with a real-world purpose means translating a high-level
problem into something computational. When considering its data, we don't
immediately jump to `CREATE TABLE`; we start by considering what data is needed,
how it relates, and how we can represent it.

For example, we can represent a Person with a `Map`, with keys to identify
something about them and corresponding values. More technically, we can model a
`List` data type with the functions `insert`, `find`, `reduce` with specifying
it as an array or linked list.

An _Abstract Data Type (ADT)_ is a model for a data type defined by its
behaviour from the perspective of a consumer, not its implementation.

Basically, it's what it does, not how it does it.
