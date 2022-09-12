(() => {
  const els = document.querySelectorAll("h1, .headerlink");
  let current = undefined;

  const handlers = {
    ArrowUp: () => {
      current > 0 && --current;
    },

    ArrowDown: () => {
      current < els.length - 1 && ++current;
    },
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

    if (typeof current !== "undefined") {
      handler();
    } else {
      // initial value
      current = 0;
    }

    els[current].scrollIntoView({ behavior: "smooth" });
  });
})();
