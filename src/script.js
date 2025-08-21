const li = document.querySelectorAll(".footer-accordion li");

li.forEach((subLi) => {
    subLi.addEventListener("click", () => {
        subLi.classList.toggle("active");
    });
});
