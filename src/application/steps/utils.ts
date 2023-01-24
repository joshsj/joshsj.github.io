const counts = (obj: { [key: string]: any[] }) =>
  Object.entries(obj)
    .map(([key, arr]) => key + "=" + arr.length)
    .join(", ");

export { counts };
