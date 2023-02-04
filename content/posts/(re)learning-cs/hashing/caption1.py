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