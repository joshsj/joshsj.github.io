// works in combination with theme scripts

const email = "am9zaHNqdWtAZ21haWwuY29t";

document
  .querySelectorAll(".my-email")
  .forEach((el) => (el.textContent = atob(email)));
