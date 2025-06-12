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
            margin: 0.5, // 0.5 inch
            filename: 'Vikas_Tiwari_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css'] } // Respect CSS page breaks
        };
        html2pdf().set(opt).from(resumeContainer).save();
    });

    // Download as Word
    document.getElementById("download-word").addEventListener("click", function (e) {
        e.preventDefault();
        try {
            // Simplify content for Word
            const content = `
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; color: #000; }
                        h1 { font-size: 18px; text-align: center; text-transform: uppercase; }
                        h2 { font-size: 14px; border-bottom: 2px solid #000; padding-bottom: 4px; }
                        h3 { font-size: 13px; }
                        p, li { font-size: 12px; line-height: 1.4; }
                        ul { list-style: none; margin-left: 15px; }
                        li { position: relative; padding-left: 15px; margin-bottom: 6px; }
                        li:before { content: "•"; position: absolute; left: 0; }
                        .section-content { border: 1px solid #000; padding: 8px; margin-bottom: 15px; }
                    </style>
                </head>
                <body>
                    ${resumeContainer.innerHTML}
                </body>
                </html>
            `;
            const converted = htmlDocx.asBlob(content);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(converted);
            link.download = 'Vikas_Tiwari_Resume.docx';
            link.click();
        } catch (error) {
            console.error("Error generating Word document:", error);
            alert("There was an issue generating the Word document. Please try downloading as PDF instead.");
        }
    });
});
