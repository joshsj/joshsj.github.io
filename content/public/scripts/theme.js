(() => {
  const key = "DarkMode";

  const root = document.querySelector(":root");
  const el = document.getElementById("theme-toggle");

  const update = (dark) => {
    root.classList[dark ? "add" : "remove"]("dark");
    el.textContent = ["Light", "Dark"][+dark] + " Mode";
    localStorage.setItem(key, dark);
  };

  // bind to toggle el
  el.addEventListener("click", () => update(!root.classList.contains("dark")));

  // try storage, fallback to media query
  const storedMode = localStorage.getItem(key);
  const initialMode = storedMode
    ? storedMode === "true"
    : matchMedia("(prefers-color-scheme: dark)").matches;

  update(initialMode);
})();
