document.addEventListener("DOMContentLoaded", function () {
    // --- Greeting Pop-up Logic ---
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

    if(greetingText && welcomeText && greetingPopup) {
        greetingText.textContent = greeting;
        welcomeText.textContent = "Welcome to my resume";
        setTimeout(() => {
            greetingPopup.classList.add("fade-out");
        }, 4000);
    }

    // --- Download Functionality ---
    const html2canvasLib = window.html2canvas;
    const jspdfLib = window.jspdf;

    document.getElementById("download-pdf").addEventListener("click", async function (e) {
        e.preventDefault();
        
        if (!html2canvasLib || !jspdfLib) {
            alert("PDF libraries loading... Please wait and try again.");
            return;
        }
        
        try {
            const { jsPDF } = jspdfLib;
            // A4 Size in Points: 595.28 x 841.89
            const doc = new jsPDF('p', 'pt', 'a4');
            const pageW = 595.28; 
            const pageH = 841.89;
            const headerH = 20;
            const contentTop = headerH + 10; 
            const maxContentH = pageH - contentTop - 20; 

            // Load Background (High Res Handling)
            let bgDataUrl = null;
            try {
                const bgPromise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        // Use Scale 2 for Background to keep it crisp
                        canvas.width = pageW * 2; 
                        canvas.height = pageH * 2;
                        const ctx = canvas.getContext('2d');
                        ctx.scale(2, 2);
                        ctx.drawImage(img, 0, 0, pageW, pageH); 
                        // High Quality JPEG
                        resolve(canvas.toDataURL('image/jpeg', 1.0));
                    };
                    img.onerror = () => {
                        // Fallback if image not found
                        resolve(null);
                    };
                    img.src = 'Dashboard Background Image DBI.webp';
                    img.crossOrigin = "anonymous";
                });
                bgDataUrl = await bgPromise;
            } catch (err) {
                console.log("Bg load fail, using white");
            }

            // *** Ultra HD Canvas Generation Function ***
            const generatePageCanvas = async (mainSectionSelectors, sidebarSectionSelectors) => {
                const temp = document.createElement('div');
                temp.className = 'pdf-mode';
                // Enforce A4 Width in Pixels for Rendering (approx 300PPI logic)
                temp.style.cssText = `
                    width: 794px; 
                    min-height: 1123px;
                    display: flex;
                    background: transparent;
                    box-sizing: border-box;
                    padding-bottom: 40px; 
                    position: absolute; 
                    left: -9999px;
                    top: 0;
                `;

                // Sidebar
                const side = document.createElement('div');
                side.className = 'sidebar pdf-mode';
                side.style.cssText = `
                    width: 30%;
                    flex-shrink: 0;
                    background: transparent !important;
                    padding: 20px;
                    box-sizing: border-box;
                    border-right: 1px solid rgba(0, 0, 0, 0.4);
                `;
                
                sidebarSectionSelectors.forEach(selector => {
                    const originalSection = document.querySelector(selector);
                    if (originalSection) side.appendChild(originalSection.cloneNode(true));
                });
                temp.appendChild(side);

                // Main Content
                const mainTemp = document.createElement('div');
                mainTemp.className = 'main-content pdf-mode';
                mainTemp.style.cssText = `
                    width: 70%;
                    padding: 30px;
                    background: transparent;
                    box-sizing: border-box;
                `;

                mainSectionSelectors.forEach(selector => {
                    const originalSection = document.querySelector(selector);
                    if (originalSection) mainTemp.appendChild(originalSection.cloneNode(true));
                });
                
                temp.appendChild(mainTemp);
                document.body.appendChild(temp);
                
                // Wait for render
                await new Promise(resolve => setTimeout(resolve, 100)); 

                // *** CRITICAL: SCALE 4 FOR ULTRA SHARP TEXT ***
                const canvas = await html2canvasLib(temp, {
                    scale: 4, 
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    logging: false
                });

                document.body.removeChild(temp);
                return canvas;
            };

            // --- Page 1 ---
            const canvas1 = await generatePageCanvas(
                ['.professional-summary', '#exp-1'], 
                ['.profile', '.contact', '.personal-details']
            );
            
            // Calculate Aspect Ratio to fit PDF perfectly
            let imgH1 = (canvas1.height * pageW) / canvas1.width;
            
            // Add Background if exists
            if(bgDataUrl) {
                doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH);
            } else {
                doc.setFillColor(255, 255, 255);
                doc.rect(0,0,pageW, pageH, 'F');
            }

            // Top Blue Bar
            doc.setFillColor(0, 35, 102); // Darker Blue
            doc.rect(0, 0, pageW, headerH, 'F');
            
            // Add Content Image (High Quality)
            doc.addImage(canvas1.toDataURL('image/png'), 'PNG', 0, contentTop, pageW, imgH1, undefined, 'FAST');

            // --- Page 2 ---
            const canvas2 = await generatePageCanvas(
                ['#exp-2', '.education', '.certifications'], 
                ['.core-competencies', '.tools', '.languages']
            );
            
            let imgH2 = (canvas2.height * pageW) / canvas2.width;

            doc.addPage();
            if(bgDataUrl) {
                doc.addImage(bgDataUrl, 'JPEG', 0, 0, pageW, pageH);
            }
            doc.setFillColor(0, 35, 102);
            doc.rect(0, 0, pageW, headerH, 'F');
            doc.addImage(canvas2.toDataURL('image/png'), 'PNG', 0, contentTop, pageW, imgH2, undefined, 'FAST');

            doc.save('Vikas_Tiwari_Resume_HD.pdf');
        } catch (error) {
            console.error(error);
            alert("Error generating PDF: " + error.message);
        }
    });

    // --- Download as Word (Updated for Dark Text) ---
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
                        body { font-family: 'Segoe UI', Arial, sans-serif; color: #000; margin: 48px; width: 794px; }
                        .resume-container { display: flex; width: 100%; background: #ffffff; }
                        .sidebar { width: 30%; background: #f4f4f4; padding: 20px; border-right: 2px solid #000; }
                        .main-content { width: 70%; padding: 30px; background: #ffffff; }
                        .profile { text-align: center; margin-bottom: 20px; }
                        .profile img { width: 150px; height: 150px; border-radius: 50%; border: 4px solid #002366; }
                        h1 { font-size: 26px; text-transform: uppercase; color: #002366; font-weight: bold; }
                        h2 { font-size: 18px; border-bottom: 2px solid #002366; padding-bottom: 5px; color: #002366; font-weight: bold; }
                        h3 { font-size: 16px; margin-bottom: 5px; color: #002366; font-weight: bold; }
                        p, li { font-size: 14px; line-height: 1.5; color: #000000; font-weight: 500; }
                        ul { list-style: none; margin-left: 20px; padding: 0; }
                        li:before { content: "•"; color: #002366; font-weight: bold; position: absolute; left: 0; }
                        .section-content { border: 1px solid #000; padding: 10px; margin-top:5px; }
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
                                <h2>CONTACT</h2>
                                <div class="section-content">
                                    <p>7974123411</p>
                                    <p>vikastiwari0693@gmail.com</p>
                                    <p>linkedin.com/in/vikas-tiwari-sales</p>
                                    <p>vikastiwari3.netlify.app</p>
                                    <p>Avni Bihar, New Shastri Nagar, Jabalpur, MP (482003)</p>
                                </div>
                            </div>
                            </div>
                        <div class="main-content">
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
