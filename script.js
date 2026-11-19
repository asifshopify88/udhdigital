// UDH Digital interactions
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");

    if (menuToggle && navbar) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navbar.querySelectorAll('a[href*="#"]').forEach((link) => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open Menu");
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    document.querySelectorAll(".faq-question").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        button.addEventListener("click", () => {
            const item = button.closest(".faq-item");
            const isOpen = item.classList.toggle("active");
            button.setAttribute("aria-expanded", String(isOpen));
            const answer = item.querySelector(".faq-answer");
            if (answer) answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : "0";
        });
    });

    const year = document.getElementById("currentYear");
    if (year) year.textContent = String(new Date().getFullYear());

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = new FormData(contactForm);
            const value = (key) => String(data.get(key) || "").trim();
            const message = [
                "Hello UDH Digital, I would like to discuss a project.",
                "",
                "Name: " + value("name"),
                "Email: " + value("email"),
                "Website: " + (value("website") || "Not provided"),
                "Request: " + value("service"),
                "Preferred day/time: " + (value("preferred_time") || "Flexible"),
                "",
                "Project details: " + value("message")
            ].join("\n");
            const whatsappUrl = "https://wa.me/923027358710?text=" + encodeURIComponent(message);
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        });
    }
});
