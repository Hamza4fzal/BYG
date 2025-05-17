document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidelist a");

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1); // Remove the '#' from href
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // GSAP and ScrollTrigger for scaling the first contentItem image
    gsap.registerPlugin(ScrollTrigger);

    // Select the first contentItem image
    const firstContentItemImage = document.querySelector("#list1 .contentItemImage img");
    const sidelist = document.querySelector(".sidelist");
    const contentItemWrap = document.querySelector(".contentItemWrap");

    // GSAP animation for scaling the first image
    gsap.fromTo(
        firstContentItemImage,
        { scale: 1.85 }, // Initial scale
        {
            scale: 1, // Final scale
            scrollTrigger: {
                trigger: sidelist, // Trigger when the sidelist reaches the top
                start: "top top", // Start when the top of sidelist reaches the top of the viewport
                end: "+=500", // End after 500px of scrolling
                scrub: true, // Smooth animation on scroll
                pin: contentItemWrap, // Pin the contentItemWrap during the animation
                pinSpacing: false, // Prevent extra space from being added
            },
        }
    );

    // Pin the sidelist during the animation
    gsap.fromTo(
        sidelist,
        {},
        {
            scrollTrigger: {
                trigger: sidelist,
                start: "top top",
                end: "+=500",
                pin: true, // Pin the sidelist
                pinSpacing: false, // Prevent extra space from being added
            },
        }
    );


    // popup  work ====================================================

    // Popup logic for multiple popups
    const contentItems = document.querySelectorAll('.contentItem');
    contentItems.forEach(item => {
        item.addEventListener('click', function () {
            const id = item.id; // e.g., "list1"
            const popup = document.getElementById('popup-' + id);
            if (popup) {
                popup.style.display = 'block';
                document.documentElement.style.overflow = 'hidden';
            }
        });
    });

    // Close popup logic
    const closeButtons = document.querySelectorAll('.closePopup');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const popup = btn.closest('.contentPopup');
            if (popup) {
                popup.style.display = 'none';
                document.documentElement.style.overflow = '';
            }
        });
    });

    // Optional: Close popup when clicking outside popupContent
    const popups = document.querySelectorAll('.contentPopup');
    popups.forEach(popup => {
        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                popup.style.display = 'none';
                document.documentElement.style.overflow = '';
            }
        });
    });
});