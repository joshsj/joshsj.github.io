---
title: Working with Strings
date: 2022-09-12
tags:
  - Computer Science
---

How long in a piece of string?

<!-- more -->

## Multiway Trie

Also known as a _prefix tree_, a _multiway trie_ is a tree structure where paths
compose words. Edges are labelled with a letter and the node value indicates
where the path can terminate; i.e., have we made a word yet?

{%
  caption_img
  "multiway trie.png"
  "A Multiway Trie containing can, car, and cry."
  https://stepik.org/lesson/30819/step/3
%}

We can iterate an ascending- or descending-order tree with a pre-order or
post-order traversal respectively.
