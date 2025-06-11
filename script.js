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

    // Simulate fetching the user's email and profile name
    let userName = null;

    // Prompt for the email to identify the logged-in user (simulation)
    const userEmail = prompt("Please enter your email to personalize the greeting:");
    
    // Instead of extracting the name from the email address, prompt for the profile name
    if (userEmail) {
        userName = prompt(`Please enter the name associated with ${userEmail} (as it appears in your email profile):`);
    }

    // If no profile name or email is provided, prompt for the name directly
    if (!userName) {
        userName = prompt("Please enter your name:");
        if (!userName) {
            userName = "Guest";
        } else {
            userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
        }
    } else {
        // Capitalize the profile name
        userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
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
