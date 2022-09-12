---
title: Hashing
date: 2022-09-11
tags:
  - Computer Science
---

With data structures like a sorted
<a href="{% post_path (re)learning-cs/lists %}#Array">array</a> or a balanced
<a href="{% post_path (re)learning-cs/trees %}#Binary-Search-Tree">binary search
tree</a>, we achieve {% bigo \log{n} %} to find a random value. With _hash
tables_, we make that {% bigo 1 %} 🎉

<!-- more -->

This is the basic idea: for a given key, we use a function to produce a unique
value based on the key; we transform this value into an index where we can store
to the key.

Naturally, we need a backing structure to use the indexes --- an array, cos it's
hella quick.

Note: As well as hash tables, there are many more uses in cryptography, version
control diffs, password storage etc. Common implementations include MD5, SHA-1,
and CRC.

## Hash Functions

A _hash function_ {% math h(k) %} is any function which transforms data of an
arbitrary size into a fixed size.

All hash function obey the _equality_ property: given two keys of equal value,
their hashes must also be equal.

A _perfect_ hash function also obeys the _inequality_ property: given two keys
of inequal value, their hashes must be unequal. In the real world, this is
difficult to achieve so a 'good' hash function minimises _collisions_.

### Make It Gud

Starting with a hash function for only characters, we can return the ASCII
numerical value and ensure its unique.

Making things harder, lets accept string; applying the same principle, we can
sum the ASCII values to produce an index. This has a glaring issue in that
`hello` and `olleh` return the same value.

This means good hash functions must have a time complexity of {% math K %},
where {% math K %} is the length of the input, and must also perform
non-commutative arithmetic.

### Producing An Index

To store a object {% math o %} in an array of length {% math m %}:

1. Create the hash value {% math hv=h(o) %}
2. Transform the hash value into a valid index {% math i=hv\mod{m} %}

## Collision Resolution

We can control two aspects of hash tables to minimise collisions: the size of
the backing array and the hash function itself.

There are four categories of collision resolution mechanisms:

|            | Closed                                               | Open                                                                       |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| Addressing | Indexes are determined entirely by the hash function | Indexes are determined beyond by the hash function                         |
| Hashing    | Keys are stored at their index                       | Addresses to another structure (containing the keys) are stored at indexes |

### Linear Probe

(Open addressing, closed hashing)

Simply put, when an index collides, we try the next one and keep going until we
find an empty index 🤷‍♂️. If no index is available, we extend the backing array
and rehash all the values which minimises previous collisions.

{% caption "Insertion via Linear Probing" %}

```python
def insert(arr, k):
  i = hash(k)

  while True:
    # available
    if not arr[i]:
      arr[i] = K
      return True

    # duplicate
    elif arr[i] == k:
      return False

    else:
      # new index
      i = (i + 1) % len(arr)

    # full circle
    if i == hash(k):
      # enlarge the array
      # rehash

      # reset the hash
      i = hash(k)
```

{% endcaption %}

### Double Hashing

(Open addressing, closed hashing)

An issue with linear probing is _clumping_: groups of adjacent indexes. They're
[statistically likely](https://stepik.org/lesson/31223/step/11) but I never
liked stats.

You can use _double hashing_ to eliminate clumping which determines the _offset_
using another hash function. A common choice is {% math
1+\frac{K}{M}\mod{(M-1)} %}.

### Random Hashing

(Open addressing, closed hashing)

Another solution to clumping is _random hashing_ in which the offset is produced
by a random number generator **seeded with the key** which ensures the values
comply with the equality property.

Because good random number generators are computationally expensive, it's better
to just go with double hashing.

### Supporting Deletion

For all the methods above, we need a mechanism to allow for deletion.

A naive approach is to follow the same logic until an empty cell is reached;
this means the value isn't in the hash table and we can move on. However, if
another key has been deleted in the same index, the logic fails as it may stop
too early.

This is resolved using a deleted flag to indicate the cell is available for
insertion but it previously held a value.

### Separate Chaining

(Closed addressing, open hashing)

Where previous methods store the key at their index, _separate chaining_ stores
addresses to other data structures which contain keys.

Duplicates are resolved when inserting or deleting and we can now store multiple
values at a given index --- which is cool.

### Cuckoo Hashing
