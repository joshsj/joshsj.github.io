---
title: Hashing
date: 2022-09-11
tags:
  - Computer Science
---

With data structures like a sorted
<a href="{% post_path (re)learning-cs/lists %}#Array">array</a> or a balanced
<a href="{% post_path (re)learning-cs/trees %}#Binary-Search-Tree">binary search
tree</a>, we can find random values in logarithmic time. With hashing, we make
it constant.

<!-- more -->

This is the basic idea: for a given key, we use a function to produce a unique
value based on the key; we transform this value into an index where we can store
some data.

Naturally, we need a backing structure to use the indexes --- an array, cos it's
hella quick.

## Structures

How is hashing used to store data?

### Hash Table

A set, storing the key itself at the index.

### Hash Map

A <a href="{% post_path (re)learning-cs/abstract-data-types %}#Map">map</a>,
storing a key-value pair for association.

### Bloom Filter

An alternate take on a hash map, useful only to check if a value exists in the
structure.

It stores boolean values only; for a given value {% tex V %}, we use {% tex K %}
hash functions to calculate its indexes and set them to true.

The structure is _probabilistic_; false negatives aren't possible but false
positives are, so the precision of a hash map is sacrificed for memory
efficiency. For example, for an array of length {% tex m %}, let:

{% dtex H_1(K)=ascii(K)\mod{m} \\ H_2(K)=ascii(K)+4\mod{m} \\  H_3(K)=4\times{}ascii(K)\mod{m} %}

Inserting B returns indexes 1, 3, and 4; inserting L also returns 1, 3, and 4.

### Count-Min Sketches

Extending on bloom filters, _count-min sketches_ store the frequency of values
in an {% tex m\times{}k %} 2D array.

They're still probabilistic meaning the frequencies provide an upper limit.
Using the example above, inserting B and L would produce values of 2 at each
index so the upper limit of B or L is 2.

Keys with fewer collisions are more accurate but we can't know which those are
🤔

## Hash Functions

A _hash function_ {% tex h(k) %} is any function which transforms data of an
arbitrary size into a fixed size. They're used to compute the index of a key in
hashing structures.

All hash function obey the _equality_ property: given two keys of equal value,
their hashes must also be equal.

A _perfect_ hash function also obeys the _inequality_ property: given two keys
of inequal value, their hashes must be unequal. In the real world, this is
difficult to achieve so a 'good' hash function minimises _collisions_.

Note: As well as hash tables/maps, there are many more uses of hashing including
cryptography, version control diffs, password storage etc. Common
implementations include MD5, SHA-1, and CRC.

### Make It Gud

Starting with a hash function for only characters, we can return the ASCII
numerical value and ensure its unique.

Making things harder, lets accept string; applying the same principle, we can
sum the ASCII values to produce an index. This has a glaring issue in that
`hello` and `olleh` return the same value.

This means good hash functions must have a time complexity of {% tex K %}, where
{% tex K %} is the length of the input, and must also perform non-commutative
arithmetic.

### Producing An Index

To store a object {% tex o %} in an array of length {% tex m %}:

1. Create the hash value {% tex hv=h(o) %}
2. Transform the hash value into a valid index {% tex i=hv\mod{m} %}

## Collision Resolution

We can control two aspects of hash tables to minimise collisions: the size of
the backing array and the hash function itself.

There are four categories of collision resolution mechanisms:

|            | Closed                                               | Open                                                                   |
| ---------- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| Addressing | Indexes are directly determined by the hash function | Indexes are determined algorithmically to account for colliding keys   |
| Hashing    | At at key's index, the key is stored                 | At a key's index, a [separate](#Separate-Chaining) structure is stored |

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
using another hash function. A common choice is {% tex
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

Where previous methods store the key at their index, _separate chaining_ uses a
separate data structure (such as a linked list) to store all keys with the same
hash.

Implicitly, clumps are now irrelevant as the structure itself is a clump and we
can now store multiple values at a given index --- which is cool.

### Cuckoo Hashing 🐦

(Open addressing, closed hashing (?))

For those not biologically-inclined (like me), the name comes from the habits of
cuckoos.

When a key {% tex K_1 %} has been inserted and another key {% tex K_2 %}
collides, the new key is inserted and the previous key is rehashed to a new
location.

_Cuckoo hashing_ uses multiple hash tables {% tex T_1, T_2 %} with different
hash functions to reduce the probability of collisions. The algorithm for cuckoo
hashing is limited to a maximum number of attempts, usually 10, to ensure we
don't
[try forever](https://docs.google.com/presentation/d/1uNYS51BNM66GJmM0vDIWnac-Y9VUQxOpYikpJoKXJyo/embed)
The algorithm is as follows:

1. A key collides in {%
   tex T_1 %}
2. It moves to {% tex T_2 %}
3. If it collides again in {% tex T_2 %}, the existing key is rehashed for {%
   tex T_1 %}
4. If this key collides, the existing key if rehashed for {% tex T_2 %} and so
   on and so on...

See this
[visualisation](https://docs.google.com/presentation/d/1enss8FYHLN5VfPXA1ODzV0rxnr62lFrUrlURqKnkaj8/embed?start=true&loop=true&delayms=1000)
if that isn't so clear.

Cuckoo hashing is {% bigo 1 %} for find & delete operations --- if the key isn't
at {% tex H_1(K) %} or {% tex H_2(K) %} then it isn't in the table.
