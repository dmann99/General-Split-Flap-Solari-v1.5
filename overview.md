# Generic Split-Flap Display

## Purpose of Project

This project is a web-based simulation of a classic split-flap display (also known as Solari board), which replicates the iconic mechanical displays commonly seen in train stations and airports. Unlike traditional implementations that show train or flight schedules, this is a **generic text display** that can show any custom text content.

The display supports:
- Configurable grid dimensions (rows and columns)
- Text centering capabilities
- Real-time content updates
- Authentic split-flap animation effects
- Dynamic configuration without code changes

## Implementation Overview

### Technology Stack
- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (jQuery, Underscore.js, Backbone.js)
- **Configuration**: Java-style .properties file
- **Data Format**: JSON

### Architecture

The application follows a simple client-server architecture:

1. **Backend Server** (`app.js`)
   - Reads configuration from `config.properties`
   - Serves text content from `output.json`
   - Provides REST API endpoints for configuration and display data
   - Auto-refreshes content at configured intervals

2. **Frontend Display** (`public/index.html`)
   - Fetches configuration to dynamically generate the display grid
   - Renders split-flap characters using sprite-based animations
   - Displays current time in the bottom-right corner
   - Centers the display in the browser viewport

3. **Configuration System**
   - `config.properties` - Display dimensions and behavior settings
   - `output.json` - Text content with optional centering per line

### Key Features

- **Dynamic Sizing**: Configure any number of rows (lines) and columns (characters per line)
- **Text Centering**: Optional per-line centering within the column limit
- **Hot Reload**: Content updates automatically without server restart
- **Responsive Layout**: Display centers in viewport regardless of configuration
- **Sprite-Based Animation**: Uses classic split-flap visual effects

## Installation Instructions

### Prerequisites
- Node.js (version 12 or higher recommended)
- npm (comes with Node.js)

### Steps

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**
   ```bash
   cd General-Split-Flap-Solari-v1.5
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

   This will install:
   - `express` - Web server framework
   - `properties-reader` - Configuration file parser

4. **Configure the display** (optional)

   Edit `config.properties` to set your desired dimensions:
   ```properties
   rows=15
   columns=50
   ```

5. **Add your content**

   Edit `output.json` to customize the text:
   ```json
   [
       {"text": "YOUR TEXT HERE", "centered": true},
       {"text": "MORE TEXT", "centered": false}
   ]
   ```

## How to Run the Program

### Starting the Server

1. **Start the application**
   ```bash
   node app.js
   ```

2. **Open your web browser** and navigate to:
   ```
   http://localhost:8080
   ```

3. **The display should appear** with your configured text

### Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

### Updating Content

To update the displayed text:

1. Edit `output.json` with your new content
2. Wait for the auto-refresh interval (default: 55 seconds)
   - OR restart the server for immediate update

### Changing Configuration

To change display dimensions or settings:

1. Stop the server (`Ctrl+C`)
2. Edit `config.properties`
3. Restart the server (`node app.js`)

## Reference Information

### Configuration File (`config.properties`)

| Property | Description | Default | Example |
|----------|-------------|---------|---------|
| `rows` | Number of display lines | 10 | `rows=15` |
| `columns` | Characters per line | 40 | `columns=50` |
| `dataFile` | Path to JSON data file | output.json | `dataFile=mydata.json` |
| `updateInterval` | Auto-refresh interval (ms) | 55000 | `updateInterval=30000` |

### Data File Format (`output.json`)

The data file is a JSON array of text objects:

```json
[
    {
        "text": "Text to display (up to columns limit)",
        "centered": true
    }
]
```

**Fields:**
- `text` (required): String to display. Will be truncated to the configured column limit.
- `centered` (optional): Boolean. If `true`, text is centered within the column width. Defaults to `false` (left-aligned).

**Important Notes:**
- Maximum number of lines is determined by the `rows` configuration
- Text exceeding `columns` length will be automatically truncated
- Use uppercase text for best visual appearance (matches the split-flap aesthetic)

### API Endpoints

The server provides two REST API endpoints:

1. **GET `/api/config`**
   - Returns current display configuration
   - Response format:
     ```json
     {
         "rows": 15,
         "columns": 50
     }
     ```

2. **GET `/api/display`**
   - Returns current display content
   - Response format:
     ```json
     {
         "data": [
             {"text": "FORMATTED TEXT LINE 1"},
             {"text": "FORMATTED TEXT LINE 2"}
         ]
     }
     ```

### Supported Characters

The split-flap display supports:
- **Uppercase letters**: A-Z
- **Numbers**: 0-9
- **Special characters**: . , ? ! / ' + - : @ # ↑ ↓
- **Space character** for blank positions

Lowercase letters will be converted to uppercase by the display.

### File Structure

```
General-Split-Flap-Solari-v1.5/
├── app.js                          # Backend server application
├── config.properties               # Configuration file
├── output.json                     # Display content data
├── package.json                    # Node.js dependencies
├── public/                         # Frontend files
│   ├── index.html                  # Main HTML page
│   ├── css/
│   │   └── base.css               # Display styling
│   ├── js/
│   │   └── split-flap.js          # Split-flap animation logic
│   ├── plugins/
│   │   └── arrivals/
│   │       └── custom.js          # Plugin configuration
│   └── img/                       # Split-flap character sprites
└── overview.md                     # This file
```

### Customization Tips

1. **Display Size**: For best results, adjust rows/columns based on your screen size
2. **Update Frequency**: Decrease `updateInterval` for more frequent updates (minimum recommended: 5000ms)
3. **Text Formatting**:
   - Use centered text for headings and emphasis
   - Left-align for list-style content
   - Mix centered and left-aligned lines for visual variety

### Troubleshooting

**Problem**: Display appears blank
- **Solution**: Check that `output.json` contains valid JSON and at least one entry

**Problem**: Text is cut off
- **Solution**: Increase the `columns` setting in `config.properties` and restart

**Problem**: Can't see all rows
- **Solution**: Increase the `rows` setting in `config.properties` and restart

**Problem**: Changes to `output.json` don't appear
- **Solution**: Wait for the update interval or restart the server

**Problem**: Display not centered
- **Solution**: Ensure `public/css/base.css` has the flexbox centering styles applied

### Credits

Based on the split-flap display concept popularized by Solari boards in transportation hubs worldwide. This implementation uses sprite-based animations to recreate the classic mechanical flip effect.

### License

This project is provided as-is for personal and educational use.
