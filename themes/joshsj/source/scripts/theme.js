const key = "themeMode";

const toMode = (b) => ["light", "dark"][+b];

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const el = document.getElementById("theme-toggle");

  const update = (mode) => {
    // toggle css class
    body.classList[mode === "light" ? "remove" : "add"]("dark");
    el.textContent = mode;
    localStorage.setItem(key, mode);
  };

  el.addEventListener("click", () =>
    update(toMode(!body.classList.contains("dark")))
  );

  // try storage, fallback to media query
  const initialMode =
    localStorage.getItem(key) ||
    toMode(matchMedia("(prefers-color-scheme: dark)").matches);

  update(initialMode);
});
