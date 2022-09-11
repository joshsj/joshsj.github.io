---
title: Graphs
date: 2022-09-10
tags:
  - Computer Science
---

Graphs come from maths, and allow computers to model many types of related data
like geographical maps or social networks.

<!-- more -->

## The Basics

A _node_, or _vertex_, is a element (a house).

An _edge_, is a connection between nodes (the road between houses). These are
not required: nodes are _connected_ when they have an edge to another node and
are _disconnected_ without.

A _path_ is a sequence of edges (driving from house 1 to 3). A _cycle_ is a path
starting and ending at the same node (driving from house 1 to 2 to 1).

A _graph_ is <!--excerpt-->a collection of nodes and edges<!--excerpt-->, like a
<a href="{% post_path(re)learning-cs/lists %}#Linked-List">linked list</a> (a
map of the street).

There's also the _multigraph_, which allows two nodes to have multiple
undirected edges between them --- we aren't talking about these 🤫

### Directionality

_Directionality_ is a property of an edge, indicating how the edge can be
traversed (which way can you drive down the street).

In an _directed_ graph, defining an edge {% math e = (v, w) %} means we can only
traverse from {% math v %} to {% math w %}. In an _undirected_ graph, we can go
both ways.

To convert from an undirected graph, for each {% math (v, w) %} in {% math E
%}, we add {% math (w, v) %} to allow traversal in both directions.

### Weight

Another property of edges is _weight_ (or _cost_); on a map, the cost between
two places could be distance or elevation change.

We define an edge with weight as {% math e = (v, w, 2) %}, where {% math 2 %}
represents the cost.

### Density

What's the most edges a graph can have? Excluding multigraphs, defining a edge
from each vertex to every other vertex, plus itself, gives an upper-bound of {%
math |E| = |V| \times |V| = |V|^2 %};

Therefore we consider a graph to be _dense_ or _sparse_ when its amount of edges
is near or far to the upper-bound respectively.

## Notation

Graphs can be proper big so we can't always traverse a pretty picture.

We represent graph {% math G = (V, E) %}, where {% math V %} is the set of
vertices in {% math G %} and {% math E %} is the set of edges in {% math G %}.

An edge {% math E %} is represented as a pair {% math (v, w) %} such that {%
math v %} and {% math w %} are vertices.

When considering the [size](#size) of a graph, {% math |V| %} (or {% math n %})
is the total number of vertices and {% math |E| %} (or {% math m %}) is the
total number of edges.

For a full list, see
[this document](https://www3.nd.edu/~dgalvin1/60610/60610_S09/60610graphnotation.pdf).

## Representations

An _adjacency matrix_ is a wham table, where rows represent the vertex 'from'
and columns represent 'to'. The cell value comes from the edge's weight or
simply a boolean when unweighted.

Undirected graphs have a party trick; because each edge runs in both directions,
the table is [symmetric](https://en.wikipedia.org/wiki/Symmetric_matrix) through
the diagonal.

{% caption_img "adjacency matrix.png" "An Adjacency Matrix" https://stepik.org/lesson/28877/step/2 %}

Adjacency matrices are suited for dense graphs, as they reserve space for every
edge, whereas an _adjacency list_ only specifies existant edges to minimise
space. For each vertex, its connected nodes are listed, plus the weight is
necessary (with something tuple-y).

{% caption_img "adjacency list.png" "An Adjacency List" https://stepik.org/lesson/28877/step/6 %}

<!--
TODO implementations

- Breadth-first Search
- Depth-first Search
- Dijkstra's Algorithm
-->
