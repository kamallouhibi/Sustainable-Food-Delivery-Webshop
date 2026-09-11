// products-data.js
// Product data for the Fram webshop, structured as an array of objects.
// Each object represents one product card rendered on products.html.
//
// NOTE: Only products we have real photography for are listed here.
// The Figma design mockup showed two additional placeholder cards
// (carrots and tomatoes) but both were mislabeled as "Garlic" in the
// design file itself and had no distinct real images provided, so they
// were intentionally left out rather than shipped with incorrect data.
// New products can be added to this array at any time — the grid layout
// in products.html is built to expand automatically (see CSS .product-grid).

const products = [
  {
    id: "oats",
    name: "Oats",
    quantity: 1,
    unit: "kg",
    pricePerKg: 48,
    image: "assets/images/oats.jpg",
  },
  {
    id: "red-onions",
    name: "Red Onions",
    quantity: 0.5,
    unit: "kg",
    pricePerKg: 36,
    image: "assets/images/red-onions.jpg",
  },
  {
    id: "garlic",
    name: "Garlic",
    quantity: 0.2,
    unit: "kg",
    pricePerKg: 48,
    image: "assets/images/garlic.jpg",
  },
];