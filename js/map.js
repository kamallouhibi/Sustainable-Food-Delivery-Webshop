// map.js
// Initializes an interactive Leaflet map on products.html showing Fram's
// partnering farms. Uses OpenStreetMap tiles (no API key required).
//
// Structured similarly to chat.js: async initialization with explicit
// error handling and user feedback, as required by the project brief
// (asynchronous JavaScript + API error handling with user feedback).

// Example partnering farms — replace with real locations/data as needed.
const partnerFarms = [
  {
    name: "Solheim Gård",
    description: "Organic vegetables and berries, partner since 2021.",
    lat: 60.7945,
    lng: 11.0679, // Hamar area
  },
  {
    name: "Lillevik Farm",
    description: "Root vegetables and herbs, partner since 2022.",
    lat: 59.9139,
    lng: 10.7522, // Oslo area
  },
  {
    name: "Fjordly Gartneri",
    description: "Greenhouse produce and seasonal fruit, partner since 2023.",
    lat: 60.3913,
    lng: 5.3221, // Bergen area
  },
];

/**
 * Creates the Leaflet map, adds a marker with a popup for each partner
 * farm, and fits the view to show all of them.
 */
const initPartnerFarmsMap = () => {
  const mapEl = document.getElementById("partner-farms-map");
  if (!mapEl) return; // ikke på products.html — ikke gjør noe

  try {
    if (typeof L === "undefined") {
      throw new Error("Leaflet library failed to load");
    }

    const map = L.map(mapEl.id, { scrollWheelZoom: false });

    const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    });

    // Hvis selve tile-bildene feiler å laste (f.eks. ingen nettverkstilgang),
    // vis feilmeldingen i stedet for et tomt/ødelagt kart.
    tileLayer.on("tileerror", () => {
      document.getElementById("map-error").classList.add("chat-error--visible");
    });

    tileLayer.addTo(map);

    const markers = partnerFarms.map(({ name, description, lat, lng }) =>
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<strong>${name}</strong><br>${description}`)
    );

    const bounds = L.latLngBounds(partnerFarms.map((farm) => [farm.lat, farm.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  } catch (error) {
    console.error("Failed to initialize map:", error);
    document.getElementById("map-error").classList.add("chat-error--visible");
  }
};

document.addEventListener("DOMContentLoaded", initPartnerFarmsMap);