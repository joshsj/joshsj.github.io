---
title: Lists
series: (Re)Learning CS
---

In computing, a _list_ is a data collection which stores <!--excerpt-->a linear,
ordered collection of values of the same data type.<!--excerpt-->

## Terminology

- _Index_ --- a number representing the position of an element
- _Random access_ --- a property of a list, where all elements can be accessed
  in constant time ()

## Arrays

An array stores its values in adjacent memory locations ang (generally) has a
fixed length. For cases where the program doesn't know the data size in advance,
languages also use dynamic arrays (e.g., `vector<T>` in C++) which resize on the
fly (see []())

### Indexing

Because array elements are stored together, they can use _pointer arithmetic_
for indexing. For any array of type {% math T %}, where {% math B %} is the size
of {% math T %} in bytes and {% math X %} is its starting memory address, an
item at index {% math I %} is at address {% math X+BI %}.

{% caption array.png "Pointer Arithmetic" https://stepik.org/lesson/28868/step/1 %}

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

```python
def binary_search(arr: List[int], el: int):
    leftIndex = 0
    rightIndex = len(array) - 1

    while True:
        # Indexes have passed each other
        # Call off the search
        if leftIndex > rightIndex:
            return False

        middleIndex = (leftIndex + rightIndex) // 2

        if element == arr[middleIndex]:
            return True

        elif element < arr[middleIndex]:
            # Reduce search to lower half
            rightIndex = middleIndex - 1
        else:
            # Reduce search to upper half
            leftIndex = middleIndex + 1
```
