(() => {
  const els = document.querySelectorAll(":where(h1,h2,h3)[id]");
  let current = undefined;

  const handlers = {
    ArrowUp: () => (current > 0 ? current - 1 : els.length - 1),
    ArrowDown: () => (current < els.length - 1 ? current + 1 : 0),
  };

  if (!els.length) {
    return;
  }

  window.addEventListener("keydown", ({ code, ctrlKey }) => {
    if (!ctrlKey) {
      return;
    }

    const handler = handlers[code];

    if (!handler) {
      return;
    }

    current = typeof current !== "undefined" ? handler() : 0;

    location.hash = els[current].id;
  });
})();
