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

An _Abstract Data Type (ADT)_ is <!--excerpt-->a model for a data type defined
by its behaviour from the perspective of a consumer, not its
implementation.<!--excerpt-->

Basically, it's what it does, not how it does it.

## Double-Ended Queue

Think of browser history (😬). Values are exclusively added to the end and the
oldest values are removed to limit its size.

The _Double-Ended Queue_ ADT (or dequeue, or deque, pronounced 'deck') is
generally defined with:

- `addFront(x)`
- `addBack(x)`
- `peekFront()`
- `peekBack()`
- `removeFront()`
- `removeBack()`
- `size()`

Using a <a href="{% post_path lists %}#Circular-Array">circular array</a>, all
operations are {% bigo 1 %}.
