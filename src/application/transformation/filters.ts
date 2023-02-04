type Lang = "ts" | "cs" | "py" | "tex";

type Filters = { [L in Lang]: (s: string) => string };

// TODO guess
const filters: Filters = {
  cs: (s) => s,
  py: (s) => s,
  ts: (s) => s,
  tex: (s) => s,
};

export { filters };
