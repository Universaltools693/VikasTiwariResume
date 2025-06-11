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
