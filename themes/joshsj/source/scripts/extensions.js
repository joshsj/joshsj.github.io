const email = "am9zaHNqdWtAZ21haWwuY29t";

document.addEventListener("DOMContentLoaded", () =>
  document
    .querySelectorAll(".my-email")
    .forEach((el) => (el.textContent = atob(email)))
);
