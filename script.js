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

    // Default name since we can't fetch the logged-in user's profile name in a static site
    let userName = "Guest";

    // In a production environment, use OAuth (e.g., Google Sign-In) to fetch the user's profile name
    // Example pseudocode for Google Sign-In (requires setup with Google Developer Console):
    /*
    gapi.auth2.getAuthInstance().signIn().then(function (googleUser) {
        const profile = googleUser.getBasicProfile();
        userName = profile.getName(); // e.g., "Rama Sharma"
    });
    */

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
