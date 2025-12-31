const fs = require('fs');
const express = require('express');
const app = express();

const jsonFilePath = 'output.json'; // Replace with the path to your JSON file

// Function to read JSON file
function readJsonFile() {
    try {
        return JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    } catch (error) {
        console.error('Error reading the JSON file:', error);
        return []; // Return an empty array in case of an error
    }
}

// Initially read the JSON file
let jsonData = readJsonFile();

// Update jsonData every 55 seconds
setInterval(() => {
    jsonData = readJsonFile();
}, 55000);

app.use('/api/display', (_req, res) => {
    let r = { data: [] };

    // Convert array to simple text rows (max 10 rows)
    const rows = Array.isArray(jsonData) ? jsonData : [];

    rows.forEach((entry, index) => {
        if (index < 10) { // Maximum 10 lines
            let data = {
                text: entry.text || ''  // Just text, up to 40 characters
            };
            r.data.push(data);
        }
    });

    res.json(r);
});

// Static files and web server setup remain unchanged
app.use('/', express.static('public'));

const port = process.env.PORT || 8080;
app.listen(port);
console.log('split flap started on port ' + port);
