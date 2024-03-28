const li = document.querySelectorAll(".li");

li.forEach((subLi) =>{
    subLi.addEventListener("click", () => {
        subLi.classList.toggle("active")
    })
})