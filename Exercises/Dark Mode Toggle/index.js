window.addEventListener("load", (event) => {
  console.log(localStorage.getItem("dark-mode"));
  if (
    localStorage.getItem("dark-mode") !== undefined &&
    localStorage.getItem("dark-mode") !== null
  ) {
    document.body.className = "dark";
  }
});

function toggle() {
  const element = document.body;
  element.classList.toggle("dark");

  const className = element.className;
  switch (className) {
    case "dark":
      console.log("DARK");
      localStorage.setItem("dark-mode", true);
      break;

    case "":
      console.log("CLEAR");
      localStorage.clear();
      break;
  }
}
