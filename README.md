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
  produce along with a "partnering farms" section (currently a placeholder,
  see "Planned" below).
- **Dynamic product rendering** — product data lives as an array of objects
  in `js/products-data.js`. `js/products.js` renders each product card to
  the DOM using `Array.map()` and template literals, so new products can be
  added by editing the data file alone — no HTML changes required.
- **Responsive layout** — built with CSS Flexbox. Mobile-first: sections stack
  vertically by default, and switch to the desktop layout (side-by-side
  cards, horizontal step list) at a 1024px breakpoint, matching the Figma
  `desk/home` and `desk/produce` specifications.
- **Design tokens** — colors, typography (Frank Ruhl Libre + Arimo via Google
  Fonts), spacing, and border-radius values extracted directly from the Figma
  file and defined as CSS custom properties in `css/variables.css`.
- **Real images** — all product and hero photography exported from the
  Figma file and optimized (resized/compressed) for web performance.
- **Accessibility basics** — semantic landmarks, ARIA labels on icon-only
  controls, a skip-to-content link, and a visible focus ring for keyboard
  navigation.

### Planned (not yet implemented)

- Contact form / chatbot for customer inquiries
- Integration with an external API (OpenAI or third-party) — the map on
  `products.html` is a static placeholder reserved for this
- Client-side form validation
- Working hamburger menu toggle (currently static HTML/CSS only; needs JS)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge)
- A code editor, e.g. Visual Studio Code
- (Optional) [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for a local development server with auto-reload

### Running the Project Locally

1. Clone the repository:

```bash
   git clone <repo-url>
   cd frontend-essentials
```

2. Open `index.html` directly in your browser, or use Live Server for
   automatic reloading on save. Live Server is recommended, since a future
   API integration (Day 4) will require the page to be served over `http://`
   rather than opened via `file://`.

### API Key

This project will integrate with an external API (planned for Day 4). Once
implemented, instructions for obtaining and configuring your own API key will
be added here. **Do not** commit any actual API key to this repository —
`.gitignore` is already configured to exclude `.env` files.

## Project Structure

```
frontend-essentials/
├── index.html            # Main page
├── products.html          # Product listing page
├── css/
│   ├── variables.css     # Design tokens (colors, typography, spacing)
│   ├── reset.css         # CSS reset and base styles
│   └── style.css         # Main stylesheet (layout, components, responsiveness)
├── js/
│   ├── main.js            # Shared application logic
│   ├── products-data.js  # Product data (array of objects)
│   └── products.js        # Renders product cards to the DOM
├── assets/
│   └── images/             # Product and hero photography
└── README.md
```

## Known Limitations

- The project runs entirely in the browser; no backend or database.
- The hamburger menu is visually styled but not yet functional — opening it
  requires JavaScript, which is planned for a later stage.
- The map on the product listing page is a static placeholder pending a
  real map API integration.
- No form validation or external API integration yet.

## Future Improvements

- (To be expanded as the remaining features above are implemented)

## Resources

- Figma design file (provided by course), used as the visual specification
  for layout, colors, typography, and component structure.
- [Google Fonts](https://fonts.google.com/) for Frank Ruhl Libre and Arimo.
- (Updated continuously — documentation, articles, and tools used along the way)
