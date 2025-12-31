const fs = require('fs');
const express = require('express');
const propertiesReader = require('properties-reader');
const app = express();

// Load configuration from properties file
const config = propertiesReader('config.properties');
const rows = config.get('rows') || 10;
const columns = config.get('columns') || 40;
const jsonFilePath = config.get('dataFile') || 'output.json';
const updateInterval = config.get('updateInterval') || 55000;

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

// Update jsonData based on configured interval
setInterval(() => {
    jsonData = readJsonFile();
}, updateInterval);

// Configuration endpoint
app.use('/api/config', (_req, res) => {
    res.json({
        rows: rows,
        columns: columns
    });
});

app.use('/api/display', (_req, res) => {
    let r = { data: [] };

    // Convert array to simple text rows (max configured rows)
    const dataRows = Array.isArray(jsonData) ? jsonData : [];

    dataRows.forEach((entry, index) => {
        if (index < rows) { // Maximum configured lines
            let text = entry.text || '';

            // Center the text if centered option is true
            if (entry.centered === true && text.length < columns) {
                const totalPadding = columns - text.length;
                const leftPadding = Math.floor(totalPadding / 2);
                text = ' '.repeat(leftPadding) + text;
            }

            // Ensure text doesn't exceed configured columns
            text = text.substring(0, columns);

            let data = {
                text: text
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
