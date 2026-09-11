// products.js
// Dynamically renders the product grid on products.html from the
// `products` array defined in products-data.js. Uses ES6+ syntax
// (arrow functions, template literals, array.map()) as required by
// the project brief.

/**
 * Builds the HTML markup for a single product card.
 * @param {Object} product - A single product object from products-data.js
 * @returns {string} HTML string for one <li> product card
 */
const createProductCard = (product) => {
  const { name, quantity, unit, pricePerKg, image } = product;

  return `
    <li class="product-card" data-product-id="${product.id}">
      <div class="product-card__image-wrap">
        <img src="${image}" alt="${name}" loading="lazy" />
        <button class="btn btn--add-basket" type="button" data-add-to-basket="${product.id}">
          Add to basket <span aria-hidden="true">↑</span>
        </button>
      </div>
      <div class="product-card__info">
        <div>
          <p class="product-card__name">${name}</p>
          <p class="product-card__qty">${quantity} ${unit}</p>
        </div>
        <p class="product-card__price">${pricePerKg} kr / kg</p>
      </div>
    </li>
  `;
};

/**
 * Renders the full product grid into the #product-grid element.
 * Shows a friendly message instead if the product list is empty,
 * rather than silently rendering nothing.
 */
const renderProductGrid = () => {
  const grid = document.getElementById("product-grid");
  if (!grid) return; // Denne siden er ikke products.html — ikke gjør noe

  if (!products || products.length === 0) {
    grid.innerHTML = `<li class="product-grid__empty">No products available right now. Please check back soon.</li>`;
    return;
  }

  grid.innerHTML = products.map(createProductCard).join("");
};

document.addEventListener("DOMContentLoaded", renderProductGrid);