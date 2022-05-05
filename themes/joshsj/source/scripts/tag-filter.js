const TagSelector = ".card > .extra > span";
const SelectedClass = "highlight";

const removeSelectedClass = (el) => el.classList.remove(SelectedClass);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("main");
  const select = document.getElementById("tag-filter");

  select.addEventListener("change", () => {
    if (!select.value) {
      return;
    }

    const handler =
      select.value === "All"
        ? removeSelectedClass
        : (el) => {
            removeSelectedClass(el);
            el.textContent === select.value && el.classList.add(SelectedClass);
          };

    container.querySelectorAll(TagSelector).forEach(handler);
  });
});
