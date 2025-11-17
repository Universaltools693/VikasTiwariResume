document.addEventListener("DOMContentLoaded", function () {
    // Greeting Pop-up Logic (Unchanged)
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
    const resumeContainer = document.querySelector(".resume-container");

    // Download as PDF (Targets the main container)
    document.getElementById("download-pdf").addEventListener("click", function (e) {
        e.preventDefault();
        const opt = {
            margin: 0, // No margin, background image will be edge-to-edge
            filename: 'Vikas_Tiwari_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, // High quality
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css'] } // Uses CSS page-break-inside
        };
        html2pdf().set(opt).from(resumeContainer).save();
    });

    // Download as Word (FIXED - with Base64 image)
    document.getElementById("download-word").addEventListener("click", function (e) {
        e.preventDefault();
        
        // Zaroori Note: MS Word download library (html-docx-js) background images ko support NAHI KARTI hai.
        // Isliye, Word file hamesha white background ke saath hi download hogi.
        // Ye is library ki limitation hai. Sirf PDF hi background ke saath aayega.
        
        try {
            // Convert profile image to Base64 to embed in Word
            const profileImg = document.querySelector('.profile img');
            const canvas = document.createElement('canvas');
            canvas.width = profileImg.naturalWidth;
            canvas.height = profileImg.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(profileImg, 0, 0, canvas.width, canvas.height);
            const imgDataUrl = canvas.toDataURL('image/jpeg');

            // We create a standard white-background HTML for Word export
            // (Using the logic from your original code, as it's standard)
            const content = `
                <html>
                <head>
                    <style>
                        /* Standard Word/Print styles */
                        body { font-family: Arial, sans-serif; color: #333; margin: 48px; width: 794px; }
                        .resume-container { display: flex; width: 100%; background: #ffffff; }
                        .sidebar { width: 30%; background: #f9f9f9; padding: 20px; border-right: 1px solid #e0e0e0; }
                        .main-content { width: 70%; padding: 30px; background: #ffffff; }
                        .profile { text-align: center; margin-bottom: 20px; }
                        .profile img { width: 150px; height: 150px; border-radius: 50%; border: 4px solid #003087; }
                        h1 { font-size: 24px; text-transform: uppercase; color: #003087; }
                        h2 { font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; }
                        h3 { font-size: 16px; margin-bottom: 5px; color: #003087; }
                        p, li { font-size: 14px; line-height: 1.6; color: #444; }
                        ul { list-style: none; margin-left: 20px; padding: 0; }
                        li:before { content: "•"; color: #003087; position: absolute; left: 0; }
                        .section-content { border: 1px solid #000; padding: 10px; }
                        section { page-break-inside: avoid; }
                    </style>
                </head>
                <body>
                    <div class="resume-container">
                        <div class="sidebar">
                            <div class="profile">
                                <img src="${imgDataUrl}" alt="Profile Image"> <h1>VIKAS TIWARI</h1>
                            </div>
                            <div class="contact">
                                <h2> CONTACT</h2>
                                <div class="section-content">
                                    <p> 7974123411</p>
                                    <p> vikastiwari0693@gmail.com</p>
                                    <p> linkedin.com/in/vikas-tiwari-sales</p>
                                    <p> vikastiwari3.netlify.app</p>
                                    <p> Avni Bihar, New Shastri Nagar, Jabalpur, Madhya Pradesh (482003)</p>
                                </div>
                            </div>
                            <div class="personal-details">
                                <h2> PERSONAL DETAILS</h2>
                                <div class="section-content">
                                    <p>DOB: 12/11/1996</p>
                                    <p>Nationality: Indian</p>
                                    <p>Gender: Male</p>
                                    <p>Marital Status: Single</p>
                                </div>
                            </div>
                            <div class="core-competencies">
                                <h2> CORE COMPETENCIES</h2>
                                <div class="section-content">
                                    <ul>
                                        <li>Quick Learner</li>
                                        <li>Time Management</li>
                                        <li>Negotiation</li>
                                        <li>Problem-Solving</li>
                                        <li>Client Handling</li>
                                        <li>Sales Planning</li>
                                        <li>Team Handling</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tools">
                                <h2> TOOLS & TECHNOLOGIES</h2>
                                <div class="section-content">
                                    <ul>
                                        <li>MS Office (MS Excel, MS Word, MS PowerPoint)</li>
                                        <li>Tally ERP</li>
                                        <li>CRM Software Management</li>
                                        <li>Advanced Photoshop</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="languages">
                                <h2> LANGUAGES</h2>
                                <div class="section-content">
                                    <ul>
                                        <li>Hindi (Native)</li>
                                        <li>English (Basic Proficiency)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="main-content">
                            <section class="professional-summary">
                                <h2> PROFESSIONAL SUMMARY</h2>
                                <div class="section-content">
                                    <p>I am an entry-level Marketing and Sales professional...</p>
                                </div>
                            </section>
                            <section class="professional-experience">
                                <h2> PROFESSIONAL EXPERIENCE</h2>
                                <div class="section-content">
                                    <h3>Sales Executive (Financial Consultant)</h3>
                                    <p><strong>HDFC Life...</strong></p>
                                    <ul>...</ul>
                                    <h3>Customer Service Expert...</h3>
                                    <p><strong>Magnum Group...</strong></p>
                                    <ul>...</ul>
                                </div>
                            </section>
                            <section class="education">
                                <h2> EDUCATION HISTORY</h2>
                                <div class="section-content">
                                    <h3>Master of Business Administration...</h3>
                                    <p><strong>Maharishi Mahesh Yogi...</strong></p>
                                    <h3>Bachelor of Computer Applications...</h3>
                                    <p><strong>Makhanlal Chaturvedi...</strong></p>
                                    <h3>Higher Secondary School...</h3>
                                    <p><strong>Board of Secondary Education...</strong></p>
                                    <h3>High School Certificate...</h3>
                                    <p><strong>Board of Secondary Education...</strong></p>
                                </div>
                            </section>
                            <section class="certifications">
                                <h2> CERTIFICATIONS</h2>
                                <div class="section-content">
                                    <p>Certification in MS Office...</p>
                                    <p><strong>British Heights Education...</strong></p>
                                </div>
                            </section>
                        </div>
                    </div>
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
            alert("Word document generate karne mein error aa gaya hai. Kripya PDF download karne ka prayas karein.");
        }
    });
});
