console.log("Service");

const serviceLists = document.querySelectorAll(".service-list");
const serviceNames = document.querySelectorAll(".service-name");
const serviceDescs = document.querySelectorAll(".service-desc");
const serviceIcons = document.querySelectorAll(".service-icon");

serviceNames.forEach((name) => {
  name.addEventListener("click", () => {
    let isOpen = false;
    let parentNode = name.parentNode;
    let parentBox = parentNode.parentNode;
    let description = parentNode.querySelector(".service-desc");
    let icon = name.querySelector(".service-icon");

    description.classList.toggle("hidden");
    isOpen =
      !isOpen && !description.classList.contains("hidden") ? true : false;
    console.log(isOpen);
    icon.innerHTML = isOpen ? "south_east" : "north_east";

    resetAll(description, icon, parentBox);

    serviceLists.forEach((s) => {
      for (const c of s.children) {
        if (isOpen) {
          if (c != parentNode) {
            c.style.opacity = 0.5;
          } else c.style.opacity = 1;
        } else c.style.opacity = 1;
      }
    });
  });
});

const resetAll = (d, i, p) => {
  console.log("Hide class");
  serviceDescs.forEach((desc) => {
    if (!desc.classList.contains("hidden") && desc !== d) {
      desc.classList.add("hidden");
    }
  });
  serviceIcons.forEach((icon) => {
    if (icon.innerHTML == "south_east" && icon !== i) {
      icon.innerHTML = "north_east";
    }
  });
  for (const c of p.children) {
    if (c.style.opacity === 0.5 && c !== parentNode) {
      c.style.opacity = 1;
    }
  }
};
