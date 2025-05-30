// Show Greeting Message on Page Load
function showGreeting() {
    setTimeout(() => {
        document.getElementById('greeting').style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

// Toggle Section Content
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}
