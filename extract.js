const https = require('https');
const fs = require('fs');

https.get('https://induscareers.com/apply-for-cruiseline-jobs/', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        const selects = [];
        const regex = /<select.*?name="([^"]+)".*?>([\s\S]*?)<\/select>/gi;
        let match;
        while ((match = regex.exec(data)) !== null) {
            const name = match[1];
            const inner = match[2];
            const optRegex = /<option.*?value="([^"]*)".*?>([\s\S]*?)<\/option>/gi;
            const options = [];
            let optMatch;
            while ((optMatch = optRegex.exec(inner)) !== null) {
                options.push(optMatch[2].trim());
            }
            selects.push({ name, options });
        }
        fs.writeFileSync('C:\\Users\\razi7\\.motu\\scraped.json', JSON.stringify(selects, null, 2));
    });
});
