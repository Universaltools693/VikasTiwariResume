document.addEventListener("DOMContentLoaded", function () {
    // --- Greeting Pop-up Logic (Unchanged) ---
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

    // --- Download Functionality (OPTIMIZED FOR QUALITY & SIZE) ---
    const html2canvasLib = window.html2canvas;
    const jspdfLib = window.jspdf;

    document.getElementById("download-pdf").addEventListener("click", async function (e) {
        e.preventDefault();
        
        if (!html2canvasLib || !jspdfLib) {
            alert("PDF libraries load nahi hui. Refresh karein.");
            return;
        }
        
        try {
            const { jsPDF } = jspdfLib;
            // COMPRESS: TRUE (File size kam karne ke liye zaroori hai)
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'pt',
                format: 'a4',
                compress: true 
            });

            const pageW = doc.internal.pageSize.getWidth(); 
            const pageH = doc.internal.pageSize.getHeight(); 
            const headerH = 15; 
            const contentTop = headerH + 10; 
            
            // --- Background Image Loading ---
            let bgDataUrl = null;
            try {
                const bgPromise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = pageW;
                        canvas.height = pageH;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, pageW, pageH); 
                        // JPEG 0.8 = Good Quality + Low Size
                        resolve(canvas.toDataURL('image/jpeg', 0.8)); 
                    };
                    img.onerror = () => reject(new Error("BG Error"));
                    img.src = 'Dashboard Background Image DBI.webp';
                    img.crossOrigin = "anonymous";
                });
                bgDataUrl = await bgPromise;
            } catch (imgErr) {
                const canvas = document.createElement('canvas');
                canvas.width = pageW; canvas.height = pageH;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, pageW, pageH);
                bgDataUrl = canvas.toDataURL('image/jpeg', 0.8);
            }

            // --- Canvas Generation Function (Balanced Scale) ---
            const generatePageCanvas = async (mainSectionSelectors, sidebarSectionSelectors) => {
                const tempContainer = document.createElement('div');
                tempContainer.className = 'pdf-mode';
                
                // TEXT SHARPENING CSS:
                // Yeh CSS text ko sharp dikhane mein madad karegi
                tempContainer.style.cssText = `
                    width: ${pageW}px; 
                    display: flex;
                    background: transparent;
                    box-sizing: border-box;
                    padding-bottom: 40px;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: optimizeLegibility;
                `;

                // Sidebar
                const sideDiv = document.createElement('div');
                sideDiv.className = 'sidebar pdf-mode';
                sideDiv.style.cssText = `
                    width: 30%;
                    flex-shrink: 0;
                    background: transparent !important;
                    padding: 20px;
                    box-sizing: border-box;
                    border-right: 1px solid rgba(0, 0, 0, 0.2);
                `;
                
                sidebarSectionSelectors.forEach(selector => {
                    const originalSection = document.querySelector(selector);
                    if (originalSection) {
                        const clone = originalSection.cloneNode(true);
                        // Force black text for sharpness
                        clone.style.color = "#000000"; 
                        sideDiv.appendChild(clone);
                    }
                });
                tempContainer.appendChild(sideDiv);

                // Main Content
                const mainDiv = document.createElement('div');
                mainDiv.className = 'main-content pdf-mode';
                mainDiv.style.cssText = `
                    width: 70%;
                    padding: 30px;
                    background: transparent;
                    box-sizing: border-box;
                `;

                mainSectionSelectors.forEach(selector => {
                    const originalSection = document.querySelector(selector);
                    if (originalSection) {
                        const clone = originalSection.cloneNode(true);
                        clone.style.color = "#000000";
                        mainDiv.appendChild(clone);
                    }
                });
                tempContainer.appendChild(mainDiv);

                document.body.appendChild(tempContainer);
                await new Promise(resolve => setTimeout(resolve, 300)); 

                // *** SCALE OPTIMIZATION ***
                // Scale 2.5 is the sweet spot. 
                // Scale 4 was 17MB. Scale 2.5 will be around 2-3MB but still very sharp.
                const canvas = await html2canvasLib(tempContainer, {
                    scale: 2.5, 
                    useCORS: true,
                    allowTaint: true,
                    width: pageW,
                    backgroundColor: null 
                });

                document.body.removeChild(tempContainer);
                return canvas;
            };

            // --- Page 1 ---
            const canvas1 = await generatePageCanvas(
                ['.professional-summary', '.professional-experience'], 
                ['.profile', '.contact', '.personal-details']
            );
            
            // USE JPEG HERE TOO (Critical for file size)
            // 0.9 Quality is visually nearly perfect but saves huge space vs PNG
            const imgData1 = canvas1.toDataURL('image/jpeg', 0.9); 
            const imgHeight1 = canvas1.height * (pageW / canvas1.width);

            doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH);
            doc.setFillColor(0, 48, 135); 
            doc.rect(0, 0, pageW, headerH, 'F'); 
            doc.addImage(imgData1, 'JPEG', 0, contentTop, pageW, imgHeight1);

            // --- Page 2 ---
            const canvas2 = await generatePageCanvas(
                ['.education', '.certifications'], 
                ['.core-competencies', '.tools', '.languages']
            );
            
            const imgData2 = canvas2.toDataURL('image/jpeg', 0.9);
            const imgHeight2 = canvas2.height * (pageW / canvas2.width);

            doc.addPage(); 
            doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH);
            doc.setFillColor(0, 48, 135); 
            doc.rect(0, 0, pageW, headerH, 'F'); 
            doc.addImage(imgData2, 'JPEG', 0, contentTop, pageW, imgHeight2);

            doc.save('Vikas_Tiwari_Resume_Final_Optimized.pdf'); 
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    });

    // --- Download as Word (Unchanged) ---
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
            alert("Error: " + error.message);
        }
    });
});
