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
    const html2canvas = window.html2canvas;

    // Download as PDF (UPDATED - Full background per page, header on each, like Ashish's)
    document.getElementById("download-pdf").addEventListener("click", async function (e) {
        e.preventDefault();
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const headerH = 15; // Thin header height
        const gap = 10; // Gap below header
        const contentTop = headerH + gap;
        const contentH = pageH - contentTop;

        // Load and prepare background image (full cover per page)
        const bgPromise = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = pageW;
                canvas.height = pageH;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, pageW, pageH); // Scale to full page
                resolve(canvas.toDataURL('image/jpeg', 0.98));
            };
            img.src = 'Dashboard Background Image DBI.webp';
            img.crossOrigin = "anonymous";
        });
        const bgDataUrl = await bgPromise;

        // Function to generate canvas for page content (without bg, with styles)
        const generatePageCanvas = async (sections) => {
            const temp = document.createElement('div');
            temp.className = 'pdf-mode'; // Apply PDF styles
            temp.style.cssText = `
                width: ${pageW}px;
                height: ${contentH}px;
                display: flex;
                background: transparent;
                overflow: hidden;
                box-sizing: border-box;
            `;

            // Clone sidebar for left
            const side = document.querySelector('.sidebar').cloneNode(true);
            side.style.cssText = `
                width: 30%;
                flex-shrink: 0;
                background: transparent !important;
                padding: 20px;
                box-sizing: border-box;
                height: 100%;
                overflow: hidden;
            `;
            temp.appendChild(side);

            // Main content div for right
            const mainTemp = document.createElement('div');
            mainTemp.style.cssText = `
                width: 70%;
                padding: 30px;
                background: transparent;
                height: 100%;
                overflow: hidden;
                box-sizing: border-box;
            `;

            // Add selected sections
            sections.forEach(sec => {
                const cloneSec = sec.cloneNode(true);
                cloneSec.querySelectorAll('.section-content').forEach(el => {
                    el.style.backgroundColor = 'transparent';
                });
                mainTemp.appendChild(cloneSec);
            });

            temp.appendChild(mainTemp);

            // Append to body for rendering
            document.body.appendChild(temp);
            await new Promise(resolve => setTimeout(resolve, 100)); // Render wait

            // Capture canvas
            const canvas = await html2canvas(temp, {
                scale: 1,
                useCORS: true,
                allowTaint: true,
                width: pageW,
                height: contentH,
                backgroundColor: null // Transparent bg
            });

            // Remove temp
            document.body.removeChild(temp);
            return canvas;
        };

        // Get sections from DOM
        const summary = document.querySelector('.professional-summary');
        const experience = document.querySelector('.professional-experience');
        const education = document.querySelector('.education');
        const certifications = document.querySelector('.certifications');

        // Page 1: Summary + Experience
        const canvas1 = await generatePageCanvas([summary, experience]);
        doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH); // Full bg
        // Add thin header (empty blue strip)
        doc.setFillColor(0, 48, 135); // #003087
        doc.rect(0, 0, pageW, headerH, 'F');
        // Add content
        doc.addImage(canvas1.toDataURL('image/png'), 'PNG', 0, contentTop, pageW, contentH);

        // Page 2: Education + Certifications
        const canvas2 = await generatePageCanvas([education, certifications]);
        doc.addPage();
        doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH); // Full bg again
        doc.setFillColor(0, 48, 135); // Header again
        doc.rect(0, 0, pageW, headerH, 'F');
        doc.addImage(canvas2.toDataURL('image/png'), 'PNG', 0, contentTop, pageW, contentH);

        // Save
        doc.save('Vikas_Tiwari_Resume.pdf');
    });

    // Download as Word (UPDATED - Full content, no abbreviations)
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

            // Full content HTML for Word (white bg, no bg image)
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
                                <img src="${imgDataUrl}" alt="Profile Image"> 
                                <h1>VIKAS TIWARI</h1>
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
