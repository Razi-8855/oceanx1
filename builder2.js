const fs = require('fs');

const ages = [];
for(let i=18; i<=60; i++) ages.push(`                            <option value="${i}">${i}</option>`);

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar", "Chandigarh", "Dadra and Nagar Haveli", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
const stateOptions = states.map(s => `                            <option value="${s}">${s}</option>`);

const FullModalHTML = `
    <!-- Premium Application Modal -->
    <div id="applyModal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content" data-lenis-prevent>
            <button class="modal-close" id="closeModalBtn" aria-label="Close modal"><i class="fas fa-times"></i></button>
            <div class="modal-header">
                <img src="Oceanix_Logo_4K_Final.png" alt="Oceanix Logo" class="modal-logo">
                <h2>Begin Your Journey</h2>
                <p>Complete the form below to initiate your application process.</p>
            </div>
            <form id="applyForm" class="premium-form">
                <div class="form-group">
                    <input type="text" id="candName" name="name" placeholder=" " required>
                    <label for="candName">Full Name</label>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <input type="email" id="candEmail" name="email" placeholder=" " required>
                        <label for="candEmail">Email Address</label>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="candPhone" name="phone" placeholder=" " required pattern="[0-9\\\\+\\\\-\\\\s]+">
                        <label for="candPhone">Phone Number</label>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <input type="date" id="candDob" name="dob" required>
                        <label for="candDob" class="active-label">Date of Birth</label>
                    </div>
                    <div class="form-group">
                        <select id="candAge" name="age" required>
                            <option value="" disabled selected></option>
${ages.join('\n')}
                        </select>
                        <label for="candAge">Age</label>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <select id="candGender" name="gender" required>
                            <option value="" disabled selected></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <label for="candGender">Gender</label>
                    </div>
                    <div class="form-group">
                        <select id="candLocation" name="location" required>
                            <option value="" disabled selected></option>
${stateOptions.join('\n')}
                        </select>
                        <label for="candLocation">Location / State</label>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <select id="candDept" name="department" required>
                            <option value="" disabled selected></option>
                            <option value="Security">Security</option>
                            <option value="Food Production">Food Production</option>
                            <option value="F & B Service">F & B Service</option>
                            <option value="Housekeeping">Housekeeping</option>
                            <option value="Accounts/Finance">Accounts/Finance</option>
                            <option value="Front Office">Front Office</option>
                            <option value="Kitchen Management">Kitchen Management</option>
                            <option value="Photography">Photography</option>
                            <option value="Medical">Medical</option>
                            <option value="Spa/Salon">Spa/Salon</option>
                            <option value="Sales">Sales</option>
                        </select>
                        <label for="candDept">Department</label>
                    </div>
                    <div class="form-group">
                        <select id="candPosition" name="position" required>
                            <option value="" disabled selected>Select Dept First</option>
                        </select>
                        <label for="candPosition" class="active-label">Position</label>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <select id="candExperience" name="experience" required>
                            <option value="" disabled selected></option>
                            <option value="Fresher">Fresher</option>
                            <option value="1-2 Years">1-2 Years</option>
                            <option value="3+ Years">3+ Years</option>
                        </select>
                        <label for="candExperience">Experience Level</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="candCdc" name="cdc" placeholder=" ">
                        <label for="candCdc">CDC Status (Optional)</label>
                    </div>
                </div>
                <div class="form-group">
                    <textarea id="candMessage" name="message" rows="2" placeholder=" "></textarea>
                    <label for="candMessage">Message (Optional)</label>
                </div>
                <button type="submit" id="submitBtn" class="submit-btn btn-primary">
                    <span id="btnText">Submit via WhatsApp</span>
                    <i id="btnIcon" class="fab fa-whatsapp"></i>
                </button>
            </form>
        </div>
    </div>
`;

const htmlPath = 'C:\\Users\\razi7\\.motu\\index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace Apply Now links
html = html.replace(/<a href="https:\/\/wa.me\/919446481424" class="mobile-cta-btn" target="_blank">Apply Now<\/a>/g, '<a href="javascript:void(0)" class="mobile-cta-btn open-apply-modal">Apply Now</a>');
html = html.replace(/<a href="https:\/\/wa.me\/919446481424" class="btn btn-primary" target="_blank">Apply Now<\/a>/g, '<a href="javascript:void(0)" class="btn btn-primary open-apply-modal">Apply Now</a>');
// Also cache bust main.js and style.css just to be safe
html = html.replace(/<script src="main.js"><\/script>/g, '<script src="main.js?v=4"><\/script>');
html = html.replace(/<link rel="stylesheet" href="style.css">/g, '<link rel="stylesheet" href="style.css?v=2">');

// Inject modal before script tags
html = html.replace('<!-- GSAP for Animations -->', FullModalHTML + '\n    <!-- GSAP for Animations -->');

fs.writeFileSync(htmlPath, html);
console.log("Restoration Complete!");
