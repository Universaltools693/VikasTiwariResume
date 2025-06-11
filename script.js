function toggleSection(contentId, buttonId) {
    const content = document.getElementById(contentId);
    const button = document.getElementById(buttonId);

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        button.style.display = "none";
    } else {
        content.style.display = "none";
        button.style.display = "block";
    }
}

function displayGreeting() {
    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    const greetingMessage = document.getElementById("greeting-message");
    greetingMessage.textContent = greeting;

    const greetingPopup = document.getElementById("greeting-popup");
    greetingPopup.classList.add("show");

    setTimeout(() => {
        greetingPopup.classList.remove("show");
    }, 3000);
}

window.onload = displayGreeting;
