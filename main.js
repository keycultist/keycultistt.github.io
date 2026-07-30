const tabs = document.querySelectorAll(".hero-tab");
const backgrounds = document.querySelectorAll(".hero-bg");

const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");

// this part is for the main page tabs
tabs.forEach(tab => {

    tab.addEventListener("mouseenter", () => {

        // Active tab
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Background
        backgrounds.forEach(bg => bg.classList.remove("active"));

        document
            .getElementById("bg-" + tab.dataset.bg)
            .classList.add("active");

        // Text
        heroTitle.textContent = tab.dataset.title;
        heroDescription.textContent = tab.dataset.description;

    });

});

// this part is for sidebar active nav
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight){

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});