````
# Fram — Sustainable Food Delivery Webshop

Project assignment for PRO1001 Frontend Essentials. A website for a sustainable
food delivery service connecting customers with fresh produce from local farms.

> ⚠️ This project is under active development. The README below only describes
> features that are actually implemented in the current code — sections not
> yet built are explicitly marked as **Planned**, not described as finished.

## Project Description

Fram is a frontend solution built with HTML5, CSS3, and vanilla JavaScript (ES6+).
The website implements a Figma design provided by the client.

### Implemented so far

- **Main page** (`index.html`) — semantic HTML structure matching the Figma
  design: header with logo/cart/hamburger menu, hero section, two specials
  cards, a "how it works" step list, a popular produce section, and a footer
  with a newsletter form.
- **Product listing page** (`products.html`) — displays all available
  produce, along with an interactive map of partnering farms (see below).
- **Contact page with AI chatbot** (`contact.html`) — a chat interface
  integrated with the OpenAI Chat Completions API (`gpt-4o-mini`). Sends
  user messages asynchronously (`fetch` + `async/await`) and renders the
  assistant's replies. Includes:
  - A visible loading state (animated "typing" indicator) while waiting
    for a response, and a send/stop toggle on the send button.
  - Explicit error handling: network or API failures show a persistent
    error banner ("Failed to connect. Wait and try again later.") rather
    than failing silently.
  - An AI-disclosure notice shown permanently under the chat input.
- **Interactive partner farms map** (`products.html`) — a live map built
  with Leaflet.js and OpenStreetMap tiles (no API key required), showing
  markers with popups for each partnering farm. Includes error handling:
  if the map tiles fail to load, a visible error message is shown instead
  of a blank map.
- **Dynamic product rendering** — product data lives as an array of objects
  in `js/products-data.js`. `js/products.js` renders each product card to
  the DOM using `Array.map()` and template literals, so new products can be
  added by editing the data file alone — no HTML changes required.
- **Responsive layout** — built with CSS Flexbox. Mobile-first: sections stack
  vertically by default, and switch to the desktop layout (side-by-side
  cards, horizontal step list) at a 1024px breakpoint, matching the Figma
  `desk/home`, `desk/produce`, and chat specifications.
- **Design tokens** — colors, typography (Frank Ruhl Libre + Arimo via Google
  Fonts), spacing, and border-radius values extracted directly from the Figma
  file and defined as CSS custom properties in `css/variables.css`.
- **Real images** — all product and hero photography exported from the
  Figma file and optimized (resized/compressed) for web performance.
- **Accessibility basics** — semantic landmarks, ARIA labels on icon-only
  controls, a skip-to-content link, a visible focus ring for keyboard
  navigation, and `aria-live`/`role="alert"` regions in the chat so screen
  readers announce new messages and errors.

### Planned (not yet implemented)

- Client-side form validation (newsletter signup form)
- Working hamburger menu toggle (currently static HTML/CSS only; needs JS)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge)
- A code editor, e.g. Visual Studio Code
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  extension — **required**, not just optional, from this point on: the
  chatbot's `fetch()` calls to the OpenAI API will not work correctly when
  the page is opened directly via `file://`.
- An OpenAI API key (see below) if you want to test the chatbot with real
  responses. Without one, the chatbot still works correctly and demonstrates
  its error-handling path (see "API Key" below).

### Running the Project Locally

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd frontend-essentials
   ```
2. Set up your API key (see "API Key" section below).
3. Open the project with Live Server (right-click `index.html` →
   "Open with Live Server").

### API Key

The chatbot on `contact.html` calls the OpenAI API directly from the browser.
To run it with real responses:

1. Copy `js/config.example.js` and rename the copy to `js/config.js`.
2. Get an API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).
3. Open `js/config.js` and replace the placeholder with your real key:
   ```js
   const OPENAI_API_KEY = "your-real-key-here";
   ```
4. `js/config.js` is listed in `.gitignore` and will never be committed.

If you skip this step, the chatbot still works — it will show the built-in
error banner ("Failed to connect...") instead of a real AI response, which
demonstrates the error-handling behaviour described above.

**Do not** commit your actual API key to this repository.

## Project Structure

```
frontend-essentials/
├── index.html             # Main page
├── products.html          # Product listing page (includes partner farms map)
├── contact.html           # Contact page with AI chatbot
├── css/
│   ├── variables.css      # Design tokens (colors, typography, spacing)
│   ├── reset.css          # CSS reset and base styles
│   └── style.css          # Main stylesheet (layout, components, responsiveness)
├── js/
│   ├── main.js             # Shared application logic
│   ├── products-data.js   # Product data (array of objects)
│   ├── products.js         # Renders product cards to the DOM
│   ├── chat.js              # OpenAI chatbot logic (fetch, error handling, UI states)
│   ├── map.js                # Leaflet map logic (partner farm markers, error handling)
│   ├── config.example.js  # API key template (committed)
│   └── config.js            # Your real API key (gitignored, not committed)
├── assets/
│   └── images/              # Product and hero photography
└── README.md
```

## Known Limitations

- The project runs entirely in the browser; no backend or database.
- The hamburger menu is visually styled but not yet functional — opening it
  requires JavaScript, which is planned for a later stage.
- No form validation yet on the newsletter signup form.
- The chatbot's API key lives in client-side JavaScript, which is inherently
  visible to anyone inspecting network requests. This is a known limitation
  of calling a paid third-party API directly from a static frontend with no
  backend, and matches the assignment's constraints (see the Reflective
  Journal for a fuller discussion of this and other ethical considerations).
- The partner farm coordinates on the map are illustrative example locations,
  not verified real farm addresses.

## Future Improvements

- Add a lightweight backend proxy for the OpenAI API key, so it is never
  exposed client-side.
- Persist chat history in `localStorage` so a page refresh doesn't lose
  the conversation.
- Replace the CSS-animated typing indicator with the exact animated icon
  from the Figma design.

## Resources

- Figma design file (provided by course), used as the visual specification
  for layout, colors, typography, and component structure.
- [Google Fonts](https://fonts.google.com/) for Frank Ruhl Libre and Arimo.
- [OpenAI API documentation](https://platform.openai.com/docs/api-reference/chat)
  for the Chat Completions endpoint used by the chatbot.
- [Leaflet.js documentation](https://leafletjs.com/) and
  [OpenStreetMap](https://www.openstreetmap.org/copyright) tile data for the
  interactive partner farms map.
- (Updated continuously — documentation, articles, and tools used along the way)
````
