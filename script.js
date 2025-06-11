document.addEventListener("DOMContentLoaded", function () {
    // Get the current hour to determine the greeting
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
        greeting = "Good Morning";
    } else if (hours >= 12 && hours < 17) {
        greeting = "Good Afternoon";
    } else if (hours >= 17 && hours < 22) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    // Function to extract name from email
    function getNameFromEmail(email) {
        if (!email) return null;
        const namePart = email.split("@")[0];
        let name = namePart.replace(/[^a-zA-Z]/g, "");
        if (name) {
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        }
        return null;
    }

    // Try to get the user's email (simulated for demo)
    let userName = null;
    const dummyEmail = "vikastiwari0693@gmail.com"; // Replace with actual email fetching logic if available
    userName = getNameFromEmail(dummyEmail);

    // If no name is found, prompt the user for their name
    if (!userName) {
        userName = prompt("Please enter your name:");
        if (!userName) {
            userName = "Guest";
        } else {
            userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
        }
    }

    // Display the greeting and welcome message
    const greetingText = document.getElementById("greeting-text");
    const welcomeText = document.getElementById("welcome-text");
    const greetingPopup = document.getElementById("greeting-popup");

    greetingText.textContent = `${greeting} ${userName}`;
    welcomeText.textContent = "Welcome to my resume";

    // Auto-disappear after 4 seconds
    setTimeout(() => {
        greetingPopup.classList.add("fade-out");
    }, 4000);
});
