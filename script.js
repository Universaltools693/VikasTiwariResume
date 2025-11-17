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

    // Download as PDF (Unchanged, relies on new CSS fixes)
    document.getElementById("download-pdf").addEventListener("click", function (e) {
        e.preventDefault();
        const opt = {
            margin: 0.5, // 0.5 inch (Standard A4 margin)
            filename: 'Vikas_Tiwari_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, // High quality render
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css'] } // Uses CSS rules like 'page-break-inside: avoid'
        };
        html2pdf().set(opt).from(resumeContainer).save();
    });

    // Download as Word (UPDATED AND FIXED)
    document.getElementById("download-word").addEventListener("click", function (e) {
        e.preventDefault();
        try {
            // --- NEW FIX: Convert profile image to Base64 data URI ---
            // Isse image Word file mein 100% embed ho jayegi.
            const profileImg = document.querySelector('.profile img');
            const canvas = document.createElement('canvas');
            canvas.width = profileImg.naturalWidth;
            canvas.height = profileImg.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(profileImg, 0, 0, canvas.width, canvas.height);
            // Image ko Base64 string mein convert kiya
            const imgDataUrl = canvas.toDataURL('image/jpeg');
            // --- End of new fix ---

            // We use a placeholder '__PROFILE_IMAGE_DATA__' for the src
            // We also remove all <i ...> tags as they don't work in Word
            const content = `
                <html>
                <head>
                    <style>
                        /* Updated CSS for Word */
                        body {
                            font-family: Arial, sans-serif;
                            color: #000; /* Updated: Dark black text */
                            margin: 48px; /* Approx 0.5 inch margin */
                            width: 794px; /* A4 width */
                        }
                        .resume-container {
                            display: flex;
                            width: 100%;
                            background: #ffffff;
                        }
                        .sidebar {
                            width: 30%;
                            background: #f9f9f9;
                            padding: 20px;
                            border-right: 1px solid #e0e0e0;
                        }
                        .main-content {
                            width: 70%;
                            padding: 30px;
                            background: #ffffff;
                        }
                        .profile {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .profile img {
                            width: 150px;
                            height: 150px;
                            border-radius: 50%;
                            margin-bottom: 10px;
                            border: 4px solid #003087;
                        }
                        h1 {
                            font-size: 24px;
                            text-transform: uppercase;
                            color: #003087;
                            margin: 0;
                        }
                        h2 {
                            font-size: 16px;
                            border-bottom: 2px solid #003087;
                            padding-bottom: 5px;
                            margin-bottom: 10px;
                            display: flex;
                            align-items: center;
                            color: #003087;
                        }
                        h3 {
                            font-size: 16px;
                            margin-bottom: 5px;
                            color: #003087;
                        }
                        p, li {
                            font-size: 14px;
                            line-height: 1.6;
                            color: #000; /* Updated: Dark black text */
                        }
                        .contact p {
                            line-height: 1.8;
                        }
                        ul {
                            list-style: none;
                            margin-left: 20px;
                            padding: 0;
                        }
                        li {
                            position: relative;
                            padding-left: 20px;
                            margin-bottom: 8px;
                        }
                        li:before {
                            content: "•";
                            color: #003087;
                            position: absolute;
                            left: 0;
                        }
                        .section-content {
                            border: 1px solid #000;
                            padding: 10px;
                        }
                        .contact p {
                           margin-right: 10px;
                           color: #003087;
                        }
                        section {
                            margin-bottom: 30px;
                        }
                        /* Updated: Page break logic */
                        .contact, .personal-details, .core-competencies, .tools, .languages,
                        .professional-summary, .professional-experience, .education, .certifications {
                            page-break-inside: avoid;
                        }
                        .page-break {
                            page-break-before: always;
                            height: 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="resume-container">
                        <div class="sidebar">
                            <div class="profile">
                                <img src="__PROFILE_IMAGE_DATA__" alt="Profile Image">
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
                                    <p>I am an entry-level Marketing and Sales professional with experience in sales execution and customer handling. At HDFC Life, I worked on sales and marketing activities, meeting targets and coordinating sales tasks. At Magnum Group, I handled customer queries and resolved issues. With an M.B.A. in Marketing and Finance, I am ready to grow in this field.</p>
                                </div>
                            </section>
                            <section class="professional-experience">
                                <h2> PROFESSIONAL EXPERIENCE</h2>
                                <div class="section-content">
                                    <h3>Sales Executive (Financial Consultant)</h3>
                                    <p><strong>HDFC Life Insurance Company Ltd.</strong> | June 2024 – Present</p>
                                    <ul>
                                        <li>Found new clients and built relationships through direct sales and client meetings.</li>
                                        <li>Met sales targets with good negotiation and client interaction skills.</li>
                                        <li>Created a client list, ensuring business growth through regular follow-ups.</li>
                                    </ul>
                                    <h3>Customer Service Expert (Customer Service Associate)</h3>
                                    <p><strong>Magnum Group (Magnum Super Distributors (P) Ltd.)</strong> | Sep 2020 – Jun 2024 (3 years, 9 months)</p>
                                    <ul>
                                        <li>Handled customer queries and resolved issues, achieving a 100% quality score in March 2023 and August 2023.</li>
                                        <li>Used CRM software to manage complaints and track solutions.</li>
                                        <li>Received Certificates of Excellence for good performance.</li>
                                        <li>Conducted real-time audits of customer bills, performing detailed analysis to ensure accuracy and compliance with company standards.</li>
                                    </ul>
                                </div>
                            </section>
                            <div class="page-break"></div>
                            <section class="education">
                                <h2> EDUCATION HISTORY</h2>
                                <div class="section-content">
                                    <h3>Master of Business Administration (M.B.A.) – Marketing and Finance</h3>
                                    <p><strong>Maharishi Mahesh Yogi Vedic Vishwavidyalaya, Madhya Pradesh</strong> | 2024</p>
                                    <p>CGPA: 7.49 | Equivalent Percentage: 74.9% | First Division</p>
                                    <h3>Bachelor of Computer Applications (B.C.A.)</h3>
                                    <p><strong>Makhanlal Chaturvedi National University of Journalism and Communication, Bhopal</strong> | 2021</p>
                                    <p>Percentage: 59.70% | Second Division</p>
                                    <h3>Higher Secondary School Certificate (10+2) – Science (PCM)</h3>
                                    <p><strong>Board of Secondary Education, Madhya Pradesh, Bhopal</strong> | 2016</p>
                                    <p>Percentage: 43.6%</p>
                                    <h3>High School Certificate (10th)</h3>
                                    <p><strong>Board of Secondary Education, Madhya Pradesh, Bhopal</strong> | 2014</p>
                                    <p>Percentage: 49% | Second Division</p>
                                </div>
                            </section>
                            <section class="certifications">
                                <h2> CERTIFICATIONS</h2>
                                <div class="section-content">
                                    <p>Certification in MS Office (MS Excel, MS Word, MS PowerPoint), Advanced Photoshop, and Tally ERP</p>
                                    <p><strong>British Heights Education, Jabalpur</strong> | 2012</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            // Placeholder ko actual Base64 image data se replace kiya
            const finalContent = content.replace('__PROFILE_IMAGE_DATA__', imgDataUrl);

            const converted = htmlDocx.asBlob(finalContent);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(converted);
            link.download = 'Vikas_Tiwari_Resume.docx';
            link.click();
        } catch (error) {
            console.error("Error generating Word document:", error);
            alert("Word document generate karne mein error aa gaya hai. Kripya profile image file 'profile-image.jpg' check karein ki wo available hai ya nahi.");
        }
    });
});
