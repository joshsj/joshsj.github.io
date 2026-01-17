(getTransformer: GetTransformer) => 
async (sourceFiles: File[]) => {
  const transformations = sourceFiles.map((file) => getTransformer(file)(file));

  const transformResults = await Promise.allSettled(transformations);

  const buildFiles: File[] = transformResults
    .filter((r) => isFulfilled(r) && !!r.value)
    .map((r) => r.value);
};
