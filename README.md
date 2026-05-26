# General Split-Flap Display

A browser-based simulation of a split-flap (Solari) departure board. Type up to four rows of text, and the board animates each character into place — complete with the iconic mechanical sound of a real flap display.

No server, no build step, no dependencies to install. It runs entirely in the browser.

---

## Live Demo

**[https://dmann99.github.io/General-Split-Flap-Solari-v1.5/](https://dmann99.github.io/General-Split-Flap-Solari-v1.5/)**

---

## How It Works

The display is split into two pages:

| Page | Purpose |
|---|---|
| `launch.html` | Form where you type your message and generate a display URL |
| `target.html` | The actual board — receives text via a URL parameter and animates it |

`target.html` accepts a single query parameter, `INPUT`, containing a JSON-encoded array of up to 4 strings (one per row, max 40 characters each). `launch.html` handles the encoding for you automatically.

---

## Usage

### Option 1 — Use the Launch Page (easiest)

1. Open `launch.html` (or the live demo above)
2. Type your text into any of the four fields — input is automatically converted to uppercase
3. The **Launch URL** updates live as you type
4. Click the generated link to open the display board

The board animates all characters from blank to their target letters, plays the split-flap sound during the animation, and goes silent once all flaps have settled.

### Option 2 — Craft a URL Directly

If you want to link directly to a specific message without using `launch.html`, encode the URL yourself:

**Format:**
```
target.html?INPUT=<url-encoded JSON array>
```

**Step by step:**

1. Write your rows as a JSON array of strings:
   ```json
   ["GATE 7 NOW BOARDING", "FLIGHT AA 204 TO ORD", "DELAYED 45 MIN", ""]
   ```

2. URL-encode the entire JSON string. In JavaScript:
   ```javascript
   const encoded = encodeURIComponent(JSON.stringify(["GATE 7 NOW BOARDING", "FLIGHT AA 204 TO ORD", "DELAYED 45 MIN", ""]));
   const url = `target.html?INPUT=${encoded}`;
   ```

3. Or do it manually in any browser console:
   ```javascript
   encodeURIComponent('["GATE 7 NOW BOARDING","FLIGHT AA 204 TO ORD","DELAYED 45 MIN",""]')
   // → %5B%22GATE%207%20NOW%20BOARDING%22%2C%22FLIGHT%20AA%20204%20TO%20ORD%22%2C%22DELAYED%2045%20MIN%22%2C%22%22%5D
   ```

4. Append it to the base URL:
   ```
   https://dmann99.github.io/General-Split-Flap-Solari-v1.5/target.html?INPUT=%5B%22GATE%207%20NOW%20BOARDING%22%2C%22FLIGHT%20AA%20204%20TO%20ORD%22%2C%22DELAYED%2045%20MIN%22%2C%22%22%5D
   ```

**Rules:**
- The array must have exactly 4 elements (use `""` for blank rows)
- Each string is limited to 40 characters
- Text is automatically uppercased
- Supported characters: `A–Z`, `0–9`, and `. , ? ! / ' + - : @ # ↑ ↓`

---

## Running Locally

No installation required. Just serve the project root as a static site and open `launch.html`.

**Using Python:**
```bash
python -m http.server 8080
# then open http://localhost:8080/launch.html
```

**Using Node.js (`npx serve`):**
```bash
npx serve .
# then open the URL it prints
```

**Or open directly** — the pages also work when opened as local files (`file://`), though browsers may block the audio autoplay in that case; click anywhere on the page to enable sound.

---

## Audio

The board plays `freesound_community-split-flap-display.mp3` during the flap animation and stops automatically once all characters have settled. The audio loops if the animation takes longer than the clip.

Modern browsers block audio autoplay until the user has interacted with the page. If you don't hear anything on load, click anywhere and the sound will begin. To remove this restriction for a local or self-hosted instance, allow autoplay in your browser's site settings.

---

## Customization

All configuration lives in the `<script>` block at the bottom of `target.html`:

| Constant | Default | Description |
|---|---|---|
| `NUM_COLUMNS` | `40` | Characters per row |
| `NUM_ROWS` | `4` | Number of rows on the board |
| `stagger` | `300` | Milliseconds between each row starting to animate |

The character sprite sheet is `public/img/split-flap-letters-yellow-sm-full.png`. Swap in a different sheet to change the color or style of the tiles — character positions are mapped in `public/css/base.css`.

---

## Project Structure

```
├── launch.html                          # Message composer / URL generator
├── target.html                          # The split-flap display board
├── index.html                           # Root redirect → launch.html (GitHub Pages)
├── freesound_community-split-flap-display.mp3
├── public/
│   ├── css/base.css                     # Sprite layout and board styling
│   ├── js/split-flap.js                 # Core animation engine
│   └── js/scale.js                      # Auto-scales board to fill viewport
└── stations.csv                         # Station reference (legacy / upstream)
```

---

## Credits & License

This project is a general-purpose adaptation of **[Subway-Split-Flap-Solari-v2](https://github.com/DavidTropiansky/Subway-Split-Flap-Solari-v2)** by [DavidTropiansky](https://github.com/DavidTropiansky), which is itself built on the split-flap engine from [baspete/Split-Flap](https://github.com/baspete/Split-Flap).

---

MIT License

Copyright (c) David Mann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
