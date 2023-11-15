def binary_search(arr: List[int], el: int):
  left = 0
  right = len(arr) - 1

  while True:
    # Indexes have passed each other
    # Call off the search
    if left > right:
      return False

    middle = (left + right) // 2

    if el == arr[middle]:
      return True
    elif el < arr[middle]:
      # Reduce search to lower half
      right = middle - 1
    else:
      # Reduce search to upper half
      left = middle + 1