document.addEventListener("DOMContentLoaded", () => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    // Remove hash from URL on page load
    if (window.location.hash) {
        history.replaceState(null, null, " ");
    }

    // Scroll to the top of the page on load
    window.scrollTo(0, 0);

    const navLinks = document.querySelectorAll("nav a"); // Select all navbar links
    const sections = document.querySelectorAll("section"); // Select all sections
    const contactForm = document.getElementById("contact-form"); // Select the contact form

    // Function to update the active link
    function updateActiveLink() {
        let currentSection = "home";

        // Determine which section is currently in view
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        // Update the active class on the navbar links
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    // Add scroll event listener to update the active link
    window.addEventListener("scroll", updateActiveLink);

    // Add click event listener to smooth scroll and set active link
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // Smooth scroll to the target section
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // Update active class immediately after clicking
            navLinks.forEach((link) => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Handle contact form submission
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevents empty form submission

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Send email using EmailJS
        emailjs.send("service_cm0u63s", "template_c87bs26", {
            name: name,
            email: email,
            message: message,
        }).then(
            (response) => {
                alert("Email sent successfully!");
                contactForm.reset(); // Reset the form after successful submission
            },
            (error) => {
                alert("Failed to send email. Please try again later.");
                console.error("Error sending email:", error);
            }
        );
    });
});
// function sendMail() {
//     var params = {
//         from_name: document.getElementById("name").value,
//         from_email: document.getElementById("email").value,
//         message: document.getElementById("message").value,
//     };

//     const serviceId = "service_cm0u63s";
//     const templateId = "template_c87bs26";

//     emailjs.send(serviceId, templateId, params).then((res) => {
//         document.getElementById("name").value = "";
//         document.getElementById("email").value = "";
//         document.getElementById("message").value = "";
//         console.log(res);
//         alert("Your Email was sent succesfully")
//     })
//     .catch(err => console.log(err));
// }

