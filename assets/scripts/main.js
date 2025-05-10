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