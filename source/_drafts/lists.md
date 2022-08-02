---
title: Lists
series: (Re)Learning CS
tags:
  - Notes
  - Computer Science
---

In computing, a _list_ is a data collection which stores <!--excerpt-->a linear,
ordered collection of values of the same data type.<!--excerpt-->

## Terminology

- _Index_ --- a number representing the position of an element
- _Random access_ --- a property of a list, where all elements can be accessed
  in constant time ({% bigo 1 %})
- _Node_ --- a container for a list element

## Arrays

An array stores its values in adjacent memory locations and (generally) has a
fixed length like `int[]`. For cases where the program doesn't know the data
size in advance, languages also use dynamic arrays, like `vector<T>`, which
resize on the fly (see [adding & removing](#Adding-amp-Removing))

### Indexing

Because array elements are stored together, they can use _pointer arithmetic_
for indexing. For any array of type {% math T %}, where {% math B %} is the size
of {% math T %} in bytes and {% math X %} is its starting memory address, an
item at index {% math I %} is at address {% math X+BI %}.

{% caption_img array.png "Pointer Arithmetic" https://stepik.org/lesson/28868/step/1 %}

This means they have random access with {% bigo 1 %}.

### Adding & Removing

For fixed-length arrays, pushing and popping new elements is {% bigo 1 %}
because it's just indexing. Removing an element from the middle requires all
subsequent elements to be shifted a position, making it {% bigo n %}. Removing
the first value is {% bigo 1 %} however, as the pointer to the first value can
be incremented to the next element.

For dynamic arrays, appending a new value beyond the current array length is {%
bigo n %}:

1. The array size is doubled
2. New memory is allocated
3. Its values are copied across
4. The new element is stored at the end

### Searching

For an unsorted array, finding an element is {% bigo n %} as it must be iterated
to compare against each value.

Sorted arrays can utilise random access and the binary search algorithm to
achieve {% bigo \log n %}. The algorithm compares the middle item in the array
to determine whether the search value is in the lower or upper half; this is
performed iteratively/recursively, reducing the array's length for each run and
thus the time complexity.

{% caption "Binary Search implementation in Python" %}

```python
def binary_search(arr: List[int], el: int):
  left = 0
  right = len(array) - 1

  while True:
    # Indexes have passed each other
    # Call off the search
    if left > right:
      return False

    middle = (left + right) // 2

    if element == arr[middle]:
      return True
    elif element < arr[middle]:
      # Reduce search to lower half
      right = middle - 1
    else:
      # Reduce search to upper half
      left = middle + 1
```

{% endcaption %}

## Linked Lists

A linked list is composed of nodes which store a pointer to the next node in a
_singly-linked_ list, and an additional pointer to the previous node in a
_doubly-linked_ list.

A global _head pointer_ is kept to directly access the start of the chain, and a
_tail pointer_ is also typically kept to access the end.

### Indexing

Accessing nodes in a linked list is {% bigo n %}, as the nodes must be traversed
until the index is reached. To lessen the blow, we can store the length of the
list {% math L %} to determine if an index {% math I %} is closer to the head
({% math 0 %}) or tail ({% math L-1 %}).

### Adding & Removing

Again, it's {% bigo n %}.

To insert a new element {% math E %} at index {% math I %}, the current node at
index {% math I %} is updated to point to {% math E %} and {% math E %} is
updated to point at node {% math I+1 %}. For a double-linked list, the previous
pointer is also updated.

Removal is the same idea but the current value is forgotten about.
