---
title: Trees
date: 2022-08-04
series: (Re)Learning CS
tags:
  - Notes
  - Computer Science
---

The tree data structure is different to those in graph, but they overlap a a
lot.

{% spotify track/4iVTSRiJAA18d3QglhyJ6Q %}

## The Basics

A _node_, or _vertex_, is a value in the data structure (in this context).

An _edge_, is a connection between nodes.

_Directionality_ is a property of an edge, indicating how the edge can be
traversed; i.e., which way can you drive down the street.

A _cycle_ is a path starting and ending at the same node.

A _graph_ is <!--excerpt-->a collection of nodes and edges<!--excerpt-->, like a
<a href="{% post_path lists %}#Linked-List">linked list</a>.

A _tree_ is a graph with these constraints:

- No cycles
- No unconnected nodes; everything needs an edge
- No directionality

The _null tree_, or _empty tree_, is a tree with zero nodes or edges.

## Rooted Tree

In a _rooted tree_, all nodes have a one parent with many children. All above
nodes are _ancestors_ and all below nodes are _descendants_.

The single node at the top is the _root node_ (no parents) and the nodes are the
bottom are leaves (no children). Any node with children is also an _internal
node_.

{%
  caption_img
  "rooted tree.svg"
  "A rooted tree."
  https://stepik.org/lesson/28726/step/4
%}

Rooted trees have an implicit hierarchical structure. With only one parent and
multiple children, they can be considered 'top-down'.

## Unrooted Tree

In an _unrooted tree_, there is no notion of parents or children. A given node
has _neighbours_; any nodes with one neighbour is a _leaf_ and any node with
many neighbours is an _internal node_.

{%
  caption_img
  "unrooted tree.svg"
  "An unrooted tree."
  https://stepik.org/lesson/28726/step/4
%}

Unrooted trees do not have a string implicit hierarchy. They can be interpreted
as 'outside-in', where only the relationships from lead to internal node are
considered , or vice versa with 'inside-out'.

## Binary Tree

A _binary tree_ is a rooted tree with these constraints:

- All nodes have a parent except the root
- All nodes have either 0, 1, or 2 children

Generally, we only maintain a pointer to the root node and access its children
programmatically. Maintaining pointers to children is possible but complex, as
the structure changes.

{%
  caption_img
  "binary tree.svg"
  "A binary tree."
  https://stepik.org/lesson/28726/step/8
%}

We can further consider a binary tree as _full_, meaning every node has two
children, excluding the leaves; or _complete_, meaning every level, but possibly
the last, is completely filled and all nodes are to leftmost.

To make the diagram above complete, 8 would become the right child of 3 and 9
would become the left child of 4. To make it full, 5 and 6 would need two
children (or 7, 8, and 9 would need removing).

### Traversal

We have four algorithms to remember! All of which are {% bigo n %} 'cause every
node is visited.

| Algorithm   | Order            | Example               |
| ----------- | ---------------- | --------------------- |
| Pre-order   | Visit Left Right | `0 1 3 7 4 2 5 8 6 9` |
| In-order    | Left Visit Right | `7 3 1 4 0 5 8 2 6 9` |
| Post-order  | Left Right Visit | `7 3 4 1 8 5 9 6 2 0` |
| Level-order | Visit each level | `0 1 2 3 4 5 6 7 8 9` |

## Heap

A heap is a tree that satisfies the _heap property_: a parent node means higher
priority. A binary heap must also satisfy the binary tree constraints and be
_complete_.

Within the world of heaps, we firstly have **min-heaps**, in which a parent node
has a lesser-or-equal value to all of its children. That is, a smaller value
means higher priority. A **max-heap** is the opposite.

{%
  caption_img
  "min max heap.svg"
  "A min and max-heap."
  https://stepik.org/lesson/28863/step/4
%}

It is also valid for duplicate node values in a heap --- two things can have the
same priority.

## Binary Search Tree

A _Binary Search Tree (BST)_ allows arbitrary values to be found fairly quickly.
It's structured as a rooted binary tree, where every node is greater than all
nodes to its left and less than all to its right. Inherently, only comparable
types can be stored in a BST.

{%
  caption_img
  "bst.svg"
  "A binary search tree."
  https://stepik.org/lesson/28727/step/1
%}

The _height_ of a BST is the longest distance from the root of the tree to a
leaf; a tree with no nodes has a height of -1, only a root has a height of 0,
and a node+leaf has a height of 1, etc.

We can also consider the balance of a BST. When balanced, most leaves are
equidistant from the root and most internal nodes have two children. When
**perfectly** balanced, it's all of em. Unbalanced trees are also a thing.

{%
  caption_img
  "perfectly balanced bst.svg"
  "A perfectly balanced BST."
  https://stepik.org/lesson/28727/step/9
%}

The average-case time complexity to find an element {% math N %} is {% bigo
\log N %}; there is a proof, but it's [fucking mental](https://stepik.org/lesson/28730/step/4)
and I can't understand math so complex any more.

## Implementations

<!-- TODO add link to implementations -->

Generally, implementing a tree structure involves a `Node` object containing a a
value and child pointers --- an array for normal trees, `left` and `right`
properties for binary trees.

{%
  caption_img
  "heap array.png"
  "A heap structured with an array."
  https://stepik.org/lesson/28863/step/11
%}

Alternatively, we can utilise pointer arithmetic to store binary trees in
<a href="{% post_path lists %}#Array">arrays</a>. The start of the array
represents the tree root and the following formulae can access nodes relative to
an index {% math I %}:

- Parent: {% math \lfloor\frac{I-1}{2}\rfloor %}
- Left Child: {% math 2i+1 %}
- Right Child: {% math 2i+2 %}
