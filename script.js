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
            // Custom HTML structure for Word to preserve the exact format
            const content = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #000;
                            margin: 48px;
                            width: 794px;
                        }
                        .resume-container {
                            display: flex;
                            flex-wrap: wrap;
                            width: 100%;
                        }
                        .sidebar {
                            width: 30%;
                            padding-right: 15px;
                            border-right: 1px solid #000;
                        }
                        .main-content {
                            width: 70%;
                            padding-left: 15px;
                        }
                        .profile {
                            text-align: center;
                            margin-bottom: 15px;
                        }
                        .profile img {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            margin-bottom: 8px;
                            border: 3px solid #000;
                        }
                        h1 {
                            font-size: 16px;
                            text-transform: uppercase;
                            margin: 0;
                        }
                        h2 {
                            font-size: 12px;
                            border-bottom: 2px solid #000;
                            padding-bottom: 4px;
                            margin-bottom: 8px;
                            display: flex;
                            align-items: center;
                        }
                        h2 i {
                            margin-right: 6px;
                        }
                        h3 {
                            font-size: 11px;
                            margin-bottom: 4px;
                        }
                        p, li {
                            font-size: 10px;
                            line-height: 1.3;
                            margin: 0;
                        }
                        ul {
                            list-style: none;
                            margin-left: 15px;
                            padding: 0;
                        }
                        li {
                            position: relative;
                            padding-left: 15px;
                            margin-bottom: 6px;
                        }
                        li:before {
                            content: "•";
                            position: absolute;
                            left: 0;
                        }
                        .section-content {
                            padding: 8px;
                            margin-bottom: 15px;
                        }
                        .contact p i, .personal-details p i {
                            margin-right: 6px;
                        }
                        section {
                            margin-bottom: 15px;
                        }
                        /* Page break for Word */
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
                                <img src="profile-image.jpg" alt="Profile Image">
                                <h1>VIKAS TIWARI</h1>
                            </div>
                            <div class="contact">
                                <h2><i class="fas fa-address-card"></i> CONTACT</h2>
                                <div class="section-content">
                                    <p><i class="fas fa-phone"></i> 7974123411</p>
                                    <p><i class="fas fa-envelope"></i> vikastiwari0693@gmail.com</p>
                                    <p><i class="fab fa-linkedin"></i> linkedin.com/in/vikas-tiwari-sales</p>
                                    <p><i class="fas fa-globe"></i> vikastiwari3.netlify.app</p>
                                    <p><i class="fas fa-map-marker-alt"></i> Avni Bihar, New Shastri Nagar, Jabalpur, Madhya Pradesh (482003)</p>
                                </div>
                            </div>
                            <div class="personal-details">
                                <h2><i class="fas fa-user"></i> PERSONAL DETAILS</h2>
                                <div class="section-content">
                                    <p>DOB: 12/11/1996</p>
                                    <p>Nationality: Indian</p>
                                    <p>Gender: Male</p>
                                    <p>Marital Status: Single</p>
                                </div>
                            </div>
                            <div class="core-competencies">
                                <h2><i class="fas fa-check-circle"></i> CORE COMPETENCIES</h2>
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
                                <h2><i class="fas fa-tools"></i> TOOLS & TECHNOLOGIES</h2>
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
                                <h2><i class="fas fa-language"></i> LANGUAGES</h2>
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
                                <h2><i class="fas fa-briefcase"></i> PROFESSIONAL SUMMARY</h2>
                                <div class="section-content">
                                    <p>I am an entry-level Marketing and Sales professional with experience in sales execution and customer handling. At HDFC Life, I worked on sales and marketing activities, meeting targets and coordinating sales tasks. At Magnum Group, I handled customer queries and resolved issues. With an M.B.A. in Marketing and Finance, I am ready to grow in this field.</p>
                                </div>
                            </section>
                            <section class="professional-experience">
                                <h2><i class="fas fa-briefcase"></i> PROFESSIONAL EXPERIENCE</h2>
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
                                        <li>Handled customer queries and resolved issues, achieving a 100% quality score in March and August 2023.</li>
                                        <li>Used CRM software to manage complaints and track solutions.</li>
                                        <li>Received Certificates of Excellence for good performance.</li>
                                        <li>Conducted real-time audits of customer bills, performing detailed analysis to ensure accuracy and compliance with company standards.</li>
                                    </ul>
                                </div>
                            </section>
                            <div class="page-break"></div>
                            <section class="education">
                                <h2><i class="fas fa-graduation-cap"></i> EDUCATION HISTORY</h2>
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
                                <h2><i class="fas fa-certificate"></i> CERTIFICATIONS</h2>
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
