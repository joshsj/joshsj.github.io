(() => {
  const key = "DarkMode";

  const body = document.querySelector("body");
  const el = document.getElementById("theme-toggle");

  const update = (dark) => {
    body.classList[dark ? "add" : "remove"]("dark");
    el.textContent = ["Light", "Dark"][+dark];
    localStorage.setItem(key, dark);
  };

  // bind to toggle el
  el.addEventListener("click", () => update(!body.classList.contains("dark")));

  // try storage, fallback to media query
  const storedMode = localStorage.getItem(key);
  const initialMode = storedMode
    ? storedMode === "true"
    : matchMedia("(prefers-color-scheme: dark)").matches;

  update(initialMode);
})();
