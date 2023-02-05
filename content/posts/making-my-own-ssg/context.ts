for (const changed of files) {
  const index = context.find((f) => f.full === changed.full);
  
  if (index > -1) {
    context[index] = something;
  } else {
    context.push(something);
  }
}
