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
            pagebreak: { mode: ['avoid-all', 'css'] }
        };
        html2pdf().set(opt).from(resumeContainer).save();
    });

    // Download as Word
    document.getElementById("download-word").addEventListener("click", function (e) {
        e.preventDefault();
        try {
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
                            width: 100%;
                        }
                        .sidebar {
                            width: 35%;
                            padding-right: 10px;
                            border-right: 1px solid #000;
                        }
                        .main-content {
                            width: 65%;
                            padding-left: 10px;
                        }
                        .profile {
                            text-align: center;
                            margin-bottom: 8px;
                        }
                        .profile img {
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                            margin-bottom: 5px;
                            border: 2px solid #000;
                        }
                        h1 {
                            font-size: 14px;
                            text-transform: uppercase;
                            margin: 0;
                        }
                        h2 {
                            font-size: 10px;
                            border-bottom: 1px solid #000;
                            padding-bottom: 2px;
                            margin-bottom: 4px;
                            display: flex;
                            align-items: center;
                        }
                        h2 i {
                            margin-right: 4px;
                        }
                        h3 {
                            font-size: 9.5px;
                            margin-bottom: 2px;
                        }
                        p, li {
                            font-size: 9px;
                            line-height: 1.2;
                            margin: 0;
                        }
                        ul {
                            list-style: none;
                            margin-left: 10px;
                            padding: 0;
                        }
                        li {
                            position: relative;
                            padding-left: 10px;
                            margin-bottom: 3px;
                        }
                        li:before {
                            content: "•";
                            position: absolute;
                            left: 0;
                        }
                        .section-content {
                            padding: 4px;
                            margin-bottom: 8px;
                        }
                        .contact p i {
                            margin-right: 4px;
                        }
                        section {
                            margin-bottom: 8px;
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
                                        <li>MS Office (Excel, Word, PowerPoint)</li>
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
                                    <p>Entry-level Marketing and Sales professional with experience in sales execution and customer handling. At HDFC Life, I worked on sales and marketing, meeting targets and coordinating tasks. At Magnum Group, I resolved customer queries. With an M.B.A. in Marketing and Finance, I aim to grow in this field.</p>
                                </div>
                            </section>
                            <section class="professional-experience">
                                <h2><i class="fas fa-briefcase"></i> PROFESSIONAL EXPERIENCE</h2>
                                <div class="section-content">
                                    <h3>Sales Executive (Financial Consultant)</h3>
                                    <p><strong>HDFC Life Insurance Company Ltd.</strong> | Jun 2024 – Present</p>
                                    <ul>
                                        <li>Built client relationships via direct sales and meetings.</li>
                                        <li>Met sales targets with strong negotiation skills.</li>
                                        <li>Ensured business growth through regular follow-ups.</li>
                                    </ul>
                                    <h3>Customer Service Expert (Associate)</h3>
                                    <p><strong>Magnum Group (Magnum Super Distributors (P) Ltd.)</strong> | Sep 2020 – Jun 2024 (3 yrs, 9 mos)</p>
                                    <ul>
                                        <li>Resolved customer queries, achieving 100% quality score in Mar & Aug 2023.</li>
                                        <li>Managed complaints using CRM software.</li>
                                        <li>Earned Certificates of Excellence for performance.</li>
                                        <li>Audited customer bills for accuracy and compliance.</li>
                                    </ul>
                                </div>
                            </section>
                            <section class="education">
                                <h2><i class="fas fa-graduation-cap"></i> EDUCATION HISTORY</h2>
                                <div class="section-content">
                                    <p><strong>M.B.A. in Marketing and Finance</strong> | Maharishi Mahesh Yogi Vedic Vishwavidyalaya, Madhya Pradesh | 2024 | CGPA: 7.49 (74.9%), First Division</p>
                                    <p><strong>B.C.A.</strong> | Makhanlal Chaturvedi National University, Bhopal | 2021 | 59.70%, Second Division</p>
                                    <p><strong>Higher Secondary (10+2), Science (PCM)</strong> | Board of Secondary Education, Madhya Pradesh | 2016 | 43.6%</p>
                                    <p><strong>High School (10th)</strong> | Board of Secondary Education, Madhya Pradesh | 2014 | 49%, Second Division</p>
                                </div>
                            </section>
                            <section class="certifications">
                                <h2><i class="fas fa-certificate"></i> CERTIFICATIONS</h2>
                                <div class="section-content">
                                    <p>MS Office (Excel, Word, PowerPoint), Advanced Photoshop, Tally ERP | British Heights Education, Jabalpur | 2012</p>
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
