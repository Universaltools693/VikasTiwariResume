// Dynamic Greeting Based on Time
document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting-message');
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Night';
    }

    greetingElement.textContent = `${greeting}, Welcome to My Resume`;
    greetingElement.style.display = 'block'; // Show the greeting on page load

    // Optional: Ensure the element is removed from the DOM after the animation
    setTimeout(() => {
        greetingElement.style.display = 'none';
    }, 4000); // 4000ms (3s animation + 1s buffer)
});

// Smooth scrolling for any anchor links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
