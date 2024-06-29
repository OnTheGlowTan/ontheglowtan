document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation and submission for booking form
    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const service = document.getElementById("service");
        const date = document.getElementById("date");
        const time = document.getElementById("time");

        if (validateForm([name, email, service, date, time])) {
            showAlert("Thank you for booking with On The Glow Tan!", "success");
            bookingForm.reset();
        } else {
            showAlert("Please fill out all fields.", "error");
        }
    });

    // Form validation and submission for contact form
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const contactName = document.getElementById("contact-name");
        const contactEmail = document.getElementById("contact-email");
        const message = document.getElementById("message");

        if (validateForm([contactName, contactEmail, message])) {
            showAlert("Thank you for contacting On The Glow Tan!", "success");
            contactForm.reset();
        } else {
            showAlert("Please fill out all fields.", "error");
        }
    });

    function validateForm(fields) {
        let valid = true;
        fields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add("error");
                valid = false;
            } else {
                field.classList.remove("error");
            }
        });
        return valid;
    }

    function showAlert(message, type) {
        const alertBox = document.createElement("div");
        alertBox.className = `alert ${type}`;
        alertBox.innerText = message;
        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
});
