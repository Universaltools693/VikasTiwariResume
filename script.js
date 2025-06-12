document.addEventListener("DOMContentLoaded", function () {
    // Greeting Pop-up Logic
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

    const greetingText = document.getElementById("greeting-text");
    const welcomeText = document.getElementById("welcome-text");
    const greetingPopup = document.getElementById("greeting-popup");

    greetingText.textContent = greeting;
    welcomeText.textContent = "Welcome to my resume";

    setTimeout(() => {
        greetingPopup.classList.add("fade-out");
    }, 4000);

    // Download Functionality
    const resumeContainer = document.getElementById("resume-container");

    // Download as PDF
    document.getElementById("download-pdf").addEventListener("click", function (e) {
        e.preventDefault();
        const opt = {
            margin: 1, // 1 inch
            filename: 'Vikas_Tiwari_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(resumeContainer).save();
    });

    // Download as Word
    document.getElementById("download-word").addEventListener("click", function (e) {
        e.preventDefault();
        const content = resumeContainer.innerHTML;
        const converted = htmlDocx.asBlob(content);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(converted);
        link.download = 'Vikas_Tiwari_Resume.docx';
        link.click();
    });
});
