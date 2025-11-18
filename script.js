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

    // --- Download Functionality (FINAL - HIGH QUALITY OUTPUT) ---
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
            const doc = new jsPDF('p', 'pt', 'a4'); // Standard A4
            const pageW = doc.internal.pageSize.getWidth(); // A4 width in pts
            const pageH = doc.internal.pageSize.getHeight(); // A4 height in pts
            const headerH = 15; // Blue header strip height in pts
            const contentTop = headerH + 10; // Content start position (10pt gap below header)
            
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
                        resolve(canvas.toDataURL('image/jpeg', 1.0)); // Higher quality for BG image
                    };
                    img.onerror = () => reject(new Error("Background image load nahi hui."));
                    img.src = 'Dashboard Background Image DBI.webp';
                    img.crossOrigin = "anonymous";
                });
                bgDataUrl = await bgPromise;
            } catch (imgErr) {
                console.warn("BG Image Error:", imgErr, "White background istemal hoga.");
                const canvas = document.createElement('canvas');
                canvas.width = pageW; canvas.height = pageH;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, pageW, pageH);
                bgDataUrl = canvas.toDataURL('image/jpeg', 1.0);
            }

            // --- Canvas Generation Function (HIGH SCALE FOR QUALITY) ---
            const generatePageCanvas = async (mainSectionSelectors, sidebarSectionSelectors) => {
                const tempContainer = document.createElement('div');
                tempContainer.className = 'pdf-mode';
                tempContainer.style.cssText = `
                    width: ${pageW}px; /* PDF page width */
                    display: flex;
                    background: transparent;
                    box-sizing: border-box;
                    padding-bottom: 40px; /* Extra padding for bottom border of sections */
                `;

                // Sidebar construction
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
                        sideDiv.appendChild(originalSection.cloneNode(true));
                    }
                });
                tempContainer.appendChild(sideDiv);

                // Main content construction
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
                        mainDiv.appendChild(originalSection.cloneNode(true));
                    }
                });
                tempContainer.appendChild(mainDiv);

                document.body.appendChild(tempContainer);
                await new Promise(resolve => setTimeout(resolve, 300)); // Render delay

                // *** CRITICAL CHANGE FOR QUALITY: Increased scale ***
                const canvas = await html2canvasLib(tempContainer, {
                    scale: 4, // Higher scale for better resolution (try 3 or 4, more can crash browser)
                    useCORS: true,
                    allowTaint: true,
                    width: pageW, // Capture at PDF width for better mapping
                    backgroundColor: null, // Capture with transparent background
                    // imageTimeout: 15000 // If images are slow to load
                });

                document.body.removeChild(tempContainer);
                return canvas;
            };

            // --- Page 1 Rendering ---
            const main1_selectors = ['.professional-summary', '.professional-experience'];
            const sidebar1_selectors = ['.profile', '.contact', '.personal-details']; 
            
            const canvas1 = await generatePageCanvas(main1_selectors, sidebar1_selectors);
            const imgData1 = canvas1.toDataURL('image/png', 1.0); // PNG for transparency, 1.0 quality
            
            // Calculate proportional height of the captured image on PDF
            const imgWidth1 = pageW;
            const imgHeight1 = canvas1.height * (imgWidth1 / canvas1.width);

            doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH); // Background
            doc.setFillColor(0, 48, 135); // Blue header color
            doc.rect(0, 0, pageW, headerH, 'F'); // Blue header strip
            doc.addImage(imgData1, 'PNG', 0, contentTop, imgWidth1, imgHeight1); // Content image

            // --- Page 2 Rendering ---
            const main2_selectors = ['.education', '.certifications'];
            const sidebar2_selectors = ['.core-competencies', '.tools', '.languages'];
            
            const canvas2 = await generatePageCanvas(main2_selectors, sidebar2_selectors);
            const imgData2 = canvas2.toDataURL('image/png', 1.0); // PNG for transparency, 1.0 quality

            const imgWidth2 = pageW;
            const imgHeight2 = canvas2.height * (imgWidth2 / canvas2.width);

            doc.addPage(); // Add a new page
            doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH); // Background
            doc.setFillColor(0, 48, 135); // Blue header color
            doc.rect(0, 0, pageW, headerH, 'F'); // Blue header strip
            doc.addImage(imgData2, 'PNG', 0, contentTop, imgWidth2, imgHeight2); // Content image

            doc.save('Vikas_Tiwari_Resume_HighQuality.pdf'); // New filename
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("PDF download mein error: " + error.message + ". Console (F12) check karein.");
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
