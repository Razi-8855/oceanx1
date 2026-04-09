const fs = require('fs');

const ages = [];
for(let i=18; i<=60; i++) ages.push(`<option value="${i}">${i}</option>`);

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar", "Chandigarh", "Dadra and Nagar Haveli", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const stateOptions = states.map(s => `<option value="${s}">${s}</option>`);

const htmlPath = 'C:\\Users\\razi7\\.motu\\index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// I need to replace the section from candDob to candExperience.
// Wait! Let's do a more precise replacement using regular expressions or splits.

// The block to replace starts with <div class="form-grid"> \n <div class="form-group"> \n <input type="date" id="candDob"
// Let's find index of id="candDob" and then locate the parent div.

const newHTMLBlock = `                <div class="form-grid">
                    <div class="form-group">
                        <input type="date" id="candDob" name="dob" required>
                        <label for="candDob" class="active-label">Date of Birth</label>
                    </div>
                    <div class="form-group">
                        <select id="candAge" name="age" required>
                            <option value="" disabled selected></option>
                            ${ages.join('\n                            ')}
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
                            ${stateOptions.join('\n                            ')}
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
                </div>`;

const dobStart = html.indexOf('<div class="form-grid">\\n                    <div class="form-group">\\n                        <input type="date" id="candDob"');
// Wait, newlines might be \r\n
const lines = html.split(/\\r?\\n/);
let startLine = -1;
let endLine = -1;
for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('id="candDob"')) startLine = i - 2; // the <div class="form-grid">
    if (lines[i].includes('label for="candCdc"')) endLine = i + 2; // the </div> enclosing grid
}

if (startLine !== -1 && endLine !== -1) {
    const before = lines.slice(0, startLine).join('\\n');
    const after = lines.slice(endLine + 1).join('\\n');
    fs.writeFileSync(htmlPath, before + '\\n' + newHTMLBlock + '\\n' + after);
    console.log("HTML successfully updated.");
} else {
    console.log("Could not find targets.", startLine, endLine);
}
