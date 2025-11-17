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
    const html2canvasLib = window.html2canvas;
    const jspdfLib = window.jspdf;

    // Download as PDF (UPDATED - Custom single-column flow like Ashish's, full natural split)
    document.getElementById("download-pdf").addEventListener("click", async function (e) {
        e.preventDefault();
        
        if (!html2canvasLib || !jspdfLib) {
            alert("PDF libraries load nahi hui. Page ko refresh kar ke dobara try karo. (Console check karo F12 se)");
            console.error("Libraries missing:", { html2canvas: !!html2canvasLib, jspdf: !!jspdfLib });
            return;
        }
        
        try {
            const { jsPDF } = jspdfLib;
            const doc = new jsPDF('p', 'pt', 'a4');
            const pageW = doc.internal.pageSize.getWidth(); // ~595pt
            const pageH = doc.internal.pageSize.getHeight(); // ~842pt
            const headerH = 15; // Thin header height
            const gap = 10; // Gap below header
            const contentTop = headerH + gap;
            const contentH = pageH - contentTop; // ~817pt per page content

            // Load and prepare background image (full cover per page) with fallback
            let bgDataUrl = null;
            try {
                const bgPromise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = pageW;
                        canvas.height = pageH;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, pageW, pageH); // Scale to full page
                        resolve(canvas.toDataURL('image/jpeg', 0.98));
                    };
                    img.onerror = () => reject(new Error("Background image load nahi hui - fallback to white."));
                    img.src = 'Dashboard Background Image DBI.webp';
                    img.crossOrigin = "anonymous";
                });
                bgDataUrl = await bgPromise;
            } catch (imgErr) {
                console.warn("BG Image Error:", imgErr);
                // Fallback: Create white bg
                const canvas = document.createElement('canvas');
                canvas.width = pageW;
                canvas.height = pageH;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, pageW, pageH);
                bgDataUrl = canvas.toDataURL('image/jpeg', 1.0);
            }

            // Create custom single-column HTML for PDF (flow like Ashish: profile top, then all sections sequential full width)
            const profileImg = document.querySelector('.profile img');
            const canvasImg = document.createElement('canvas');
            canvasImg.width = profileImg.naturalWidth;
            canvasImg.height = profileImg.naturalHeight;
            const ctxImg = canvasImg.getContext('2d');
            ctxImg.drawImage(profileImg, 0, 0);
            const imgDataUrl = canvasImg.toDataURL('image/jpeg');

            const customHTML = `
                <div class="pdf-flow" style="width: ${pageW}px; background: transparent; font-family: Arial, sans-serif; color: #000; line-height: 1.6; padding: 20px; box-sizing: border-box;">
                    <!-- Profile -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${imgDataUrl}" alt="Profile" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #003087;">
                        <h1 style="font-size: 24px; text-transform: uppercase; color: #003087; margin: 10px 0;">VIKAS TIWARI</h1>
                    </div>

                    <!-- Contact -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-address-card" style="margin-right: 8px; color: #003087;"></i> CONTACT
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 20px; background: transparent;">
                        <p style="margin: 5px 0;"><i class="fas fa-phone" style="margin-right: 10px; color: #003087;"></i> 7974123411</p>
                        <p style="margin: 5px 0;"><i class="fas fa-envelope" style="margin-right: 10px; color: #003087;"></i> vikastiwari0693@gmail.com</p>
                        <p style="margin: 5px 0;"><i class="fab fa-linkedin" style="margin-right: 10px; color: #003087;"></i> linkedin.com/in/vikas-tiwari-sales</p>
                        <p style="margin: 5px 0;"><i class="fas fa-globe" style="margin-right: 10px; color: #003087;"></i> vikastiwari3.netlify.app</p>
                        <p style="margin: 5px 0;"><i class="fas fa-map-marker-alt" style="margin-right: 10px; color: #003087;"></i> Avni Bihar, New Shastri Nagar, Jabalpur, Madhya Pradesh (482003)</p>
                    </div>

                    <!-- Personal Details -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-user" style="margin-right: 8px; color: #003087;"></i> PERSONAL DETAILS
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 20px; background: transparent;">
                        <p style="margin: 5px 0;">DOB: 12/11/1996</p>
                        <p style="margin: 5px 0;">Nationality: Indian</p>
                        <p style="margin: 5px 0;">Gender: Male</p>
                        <p style="margin: 5px 0;">Marital Status: Single</p>
                    </div>

                    <!-- Core Competencies -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-check-circle" style="margin-right: 8px; color: #003087;"></i> CORE COMPETENCIES
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 20px; background: transparent;">
                        <ul style="list-style: none; padding-left: 0; margin: 0;">
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Quick Learner</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Time Management</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Negotiation</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Problem-Solving</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Client Handling</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Sales Planning</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Team Handling</li>
                        </ul>
                    </div>

                    <!-- Tools & Technologies -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-tools" style="margin-right: 8px; color: #003087;"></i> TOOLS & TECHNOLOGIES
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 20px; background: transparent;">
                        <ul style="list-style: none; padding-left: 0; margin: 0;">
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• MS Office (MS Excel, MS Word, MS PowerPoint)</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Tally ERP</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• CRM Software Management</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Advanced Photoshop</li>
                        </ul>
                    </div>

                    <!-- Languages -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-language" style="margin-right: 8px; color: #003087;"></i> LANGUAGES
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 30px; background: transparent;">
                        <ul style="list-style: none; padding-left: 0; margin: 0;">
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• Hindi (Native)</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px;">• English (Basic Proficiency)</li>
                        </ul>
                    </div>

                    <!-- Professional Summary -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-briefcase" style="margin-right: 8px; color: #003087;"></i> PROFESSIONAL SUMMARY
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 30px; background: transparent;">
                        <p style="margin: 0; font-size: 14px; color: #000;">I am an entry-level Marketing and Sales professional with experience in sales execution and customer handling. At HDFC Life, I worked on sales and marketing activities, meeting targets and coordinating sales tasks. At Magnum Group, I handled customer queries and resolved issues. With an M.B.A. in Marketing and Finance, I am ready to grow in this field.</p>
                    </div>

                    <!-- Professional Experience -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-briefcase" style="margin-right: 8px; color: #003087;"></i> PROFESSIONAL EXPERIENCE
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 30px; background: transparent;">
                        <h3 style="font-size: 16px; margin-bottom: 5px; color: #003087;">Sales Executive (Financial Consultant)</h3>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;"><strong>HDFC Life Insurance Company Ltd.</strong> | June 2024 – Present</p>
                        <ul style="list-style: none; padding-left: 20px; margin: 0;">
                            <li style="margin: 8px 0; position: relative; padding-left: 20px; font-size: 14px; color: #000;">• Found new clients and built relationships through direct sales and client meetings.</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px; font-size: 14px; color: #000;">• Met sales targets with good negotiation and client interaction skills.</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px; font-size: 14px; color: #000;">• Created a client list, ensuring business growth through regular follow-ups.</li>
                        </ul>
                        <h3 style="font-size: 16px; margin: 20px 0 5px 0; color: #003087;">Customer Service Expert (Customer Service Associate)</h3>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;"><strong>Magnum Group (Magnum Super Distributors (P) Ltd.)</strong> | Sep 2020 – Jun 2024 (3 years, 9 months)</p>
                        <ul style="list-style: none; padding-left: 20px; margin: 0;">
                            <li style="margin: 8px 0; position: relative; padding-left: 20px; font-size: 14px; color: #000;">• Handled customer queries and resolved issues, achieving a 100% quality score in March 2023 and August 2023.</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px; font-size: 14px; color: #000;">• Used CRM software to manage complaints and track solutions.</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px; font-size: 14px; color: #000;">• Received Certificates of Excellence for good performance.</li>
                            <li style="margin: 8px 0; position: relative; padding-left: 20px; font-size: 14px; color: #000;">• Conducted real-time audits of customer bills, performing detailed analysis to ensure accuracy and compliance with company standards.</li>
                        </ul>
                    </div>

                    <!-- Education History -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-graduation-cap" style="margin-right: 8px; color: #003087;"></i> EDUCATION HISTORY
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; margin-bottom: 30px; background: transparent;">
                        <h3 style="font-size: 16px; margin-bottom: 5px; color: #003087;">Master of Business Administration (M.B.A.) – Marketing and Finance</h3>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;"><strong>Maharishi Mahesh Yogi Vedic Vishwavidyalaya, Madhya Pradesh</strong> | 2024</p>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;">CGPA: 7.49 | Equivalent Percentage: 74.9% | First Division</p>
                        <h3 style="font-size: 16px; margin: 20px 0 5px 0; color: #003087;">Bachelor of Computer Applications (B.C.A.)</h3>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;"><strong>Makhanlal Chaturvedi National University of Journalism and Communication, Bhopal</strong> | 2021</p>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;">Percentage: 59.70% | Second Division</p>
                        <h3 style="font-size: 16px; margin: 20px 0 5px 0; color: #003087;">Higher Secondary School Certificate (10+2) – Science (PCM)</h3>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;"><strong>Board of Secondary Education, Madhya Pradesh, Bhopal</strong> | 2016</p>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;">Percentage: 43.6%</p>
                        <h3 style="font-size: 16px; margin: 20px 0 5px 0; color: #003087;">High School Certificate (10th)</h3>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;"><strong>Board of Secondary Education, Madhya Pradesh, Bhopal</strong> | 2014</p>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;">Percentage: 49% | Second Division</p>
                    </div>

                    <!-- Certifications -->
                    <h2 style="font-size: 16px; border-bottom: 2px solid #003087; padding-bottom: 5px; color: #003087; margin-bottom: 10px; display: flex; align-items: center;">
                        <i class="fas fa-certificate" style="margin-right: 8px; color: #003087;"></i> CERTIFICATIONS
                    </h2>
                    <div style="border: 1px solid #000; padding: 10px; background: transparent;">
                        <p style="margin: 5px 0; font-size: 14px; color: #000;">Certification in MS Office (MS Excel, MS Word, MS PowerPoint), Advanced Photoshop, and Tally ERP</p>
                        <p style="margin: 5px 0; font-size: 14px; color: #000;"><strong>British Heights Education, Jabalpur</strong> | 2012</p>
                    </div>
                </div>
            `;

            // Create temp element with custom HTML
            const temp = document.createElement('div');
            temp.innerHTML = customHTML;
            temp.style.cssText = `position: absolute; left: -9999px; top: 0; width: ${pageW}px; height: auto; background: transparent;`;
            document.body.appendChild(temp);
            await new Promise(resolve => setTimeout(resolve, 300)); // Render wait

            // Capture full tall canvas
            const fullCanvas = await html2canvasLib(temp, {
                scale: 1,
                useCORS: true,
                allowTaint: true,
                width: pageW,
                backgroundColor: null,
                logging: false
            });

            document.body.removeChild(temp);

            const fullHeight = fullCanvas.height;
            const numPages = Math.ceil(fullHeight / contentH);

            // Function to crop canvas
            const cropCanvas = (sourceCanvas, startY, cropH) => {
                const crop = document.createElement('canvas');
                crop.width = sourceCanvas.width;
                crop.height = cropH;
                const ctx = crop.getContext('2d');
                ctx.drawImage(sourceCanvas, 0, startY, pageW, cropH, 0, 0, pageW, cropH);
                return crop;
            };

            // Add pages
            for (let i = 0; i < numPages; i++) {
                if (i > 0) doc.addPage();

                // Full bg
                doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH);
                
                // Header
                doc.setFillColor(0, 48, 135);
                doc.rect(0, 0, pageW, headerH, 'F');

                // Crop content
                const startY = i * contentH;
                const remainingH = Math.min(contentH, fullHeight - startY);
                const pageCanvas = cropCanvas(fullCanvas, startY, remainingH);
                doc.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, contentTop, pageW, remainingH);
            }

            // Save
            doc.save('Vikas_Tiwari_Resume.pdf');
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("PDF download mein error: " + error.message + ". Console (F12) check karo ya page refresh karo.");
        }
    });

    // Download as Word (Unchanged)
    document.getElementById("download-word").addEventListener("click", function (e) {
        e.preventDefault();
        try {
            const profileImg = document.querySelector('.profile img');
            const canvas = document.createElement('canvas');
            canvas.width = profileImg.naturalWidth;
            canvas.height = profileImg.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(profileImg, 0, 0, canvas.width, canvas.height);
            const imgDataUrl = canvas.toDataURL('image/jpeg');

            const content = `
                <html>
                <head>
                    <style>
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
