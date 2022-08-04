---
title: Abstract Data Types
date: 2022-08-04
series: (Re)Learning CS
tags:
  - Notes
  - Computer Science
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

Think of browser history (😬). Values are added and removed from the front as
navigation moves forwards and backwards; to limit its size, the oldest values
are removed from the back.

The _double-ended queue_ ADT (or dequeue, or deque, pronounced 'deck') is
generally defined with:

- `addFront(x)`
- `addBack(x)`
- `peekFront()`
- `peekBack()`
- `removeFront()`
- `removeBack()`
- `size()`

Both a <a href="{% post_path lists %}#Circular-Array">circular array</a> or a
<a href="{% post_path lists %}#Linked-List">linked list</a> can implement a
deque. Neither is perfect, as they are both {% bigo n %} when inserting and
indexing/searching respectively.

The following structures can also use a deque as a backing structure.

## Queue

Think of a queue. Values are only added to the back and are only removed from
the front, making it _first in, first out (FIFO)_.

A _queue_ is a generally defined with:

| Function     | Using Deque     |
| ------------ | --------------- |
| `enqueue(x)` | `addBack(x)`    |
| `peek()`     | `peekFront()`   |
| `dequeue()`  | `removeFront()` |

## Stack

Think a pile of plates ready for the washing up. Values are only added **and**
removed to the front, making it _last in, first out (LIFO)_.

A _stack_ is generally defined with:

| Function  | Using Deque     |
| --------- | --------------- |
| `push(x)` | `addFront(x)`   |
| `peek()`  | `peekFront()`   |
| `pop()`   | `removeFront()` |

## Priority Queue

Think of the queue in A&E. It's still FIFO but the elements are reordered by
their priority, making it _highest priority in, first out (HPIFO)_.

A _priority queue_ is generally defined with:

- `insert(x)`
- `peek()`
- `pop()`

Implementing a priority queue with a list structure realises an issue: a sorted
linked list would result in {% bigo 1 %} to peek and remove, but {% bigo n %} to
insert into a sorted position. An unsorted linked list swaps the time
complexities and array implementations suffer the same pain.

Instead we can use a <a href="{% post_path trees %}#Heap">Heap</a>.
