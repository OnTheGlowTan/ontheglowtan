document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".site-header");

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.pushState(null, "", targetId);
        });
    });

    function updateHeaderState() {
        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    }

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, {
        passive: true
    });

    const animationStyles = document.createElement("style");

    animationStyles.textContent = `
        .site-header.is-scrolled {
            box-shadow: 0 18px 55px rgba(47, 33, 27, 0.18);
            background: rgba(255, 248, 239, 0.94);
        }

        .reveal-item {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .reveal-item.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .reveal-item {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(animationStyles);

    const revealItems = document.querySelectorAll(
        ".section-heading, .intro-grid, .service-card, .review-card, .instagram-card, .faq-item, .booking-card"
    );

    revealItems.forEach(function (item) {
        item.classList.add("reveal-item");
    });

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14
        }
    );

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });
});
