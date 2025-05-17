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

    // Popup functionality
    const contentItems = document.querySelectorAll(".contentItem");
    const popup = document.querySelector(".contentPopup");
    const popupImage = popup.querySelector(".popupImage img");
    const popupTitle = popup.querySelector(".popupText h2");
    const popupDescription = popup.querySelector(".popupText p");
    const closePopupButton = popup.querySelector(".closePopup");

    const htmlDom = document.querySelector("html");
    contentItems.forEach(item => {
        item.addEventListener("click", () => {
            const image = item.querySelector("img");
            const title = image.alt; // Use the alt attribute as the title
            const description = `Description for ${title}`; // Customize this as needed

            // Set popup content
            popupImage.src = image.src;
            popupImage.alt = title;
            popupTitle.textContent = title;
            popupDescription.textContent = description;

            // Show popup
            popup.style.display = "block";
            htmlDom.style.overflow = "hidden"; // Prevent background scrolling
            htmlDom.style.height = "100%"; // Prevent background scrolling
        });
    });

    // Close popup
    closePopupButton.addEventListener("click", () => {
        popup.style.display = "none";
        htmlDom.style.overflow = "auto"; // Restore background scrolling
        htmlDom.style.height = "auto"; // Restore background scrolling
    });

    // Close popup when clicking outside of it
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});