(() => {
  const keys = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];
  let pos = 0;
  const h1 = document.querySelector("h1");

  const handler = ({ code, ctrlKey, shiftKey, metaKey, altKey }) => {
    if (ctrlKey || shiftKey || metaKey || altKey) {
      return;
    }

    if (keys[pos] !== code) {
      pos = 0;
      return;
    }

    if (++pos === keys.length) {
      alert("TODO something cool");
      pos = 0;
    }
  };

  document.querySelector(":root").addEventListener("keydown", handler);
})();
