document.addEventListener("DOMContentLoaded", () => {
  // MOBILE MENU
  const menuIcon = document.querySelector(".menu-icon");
  const mobileMenu = document.querySelector("#mobileMenu");
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // NEWSLETTER FORM VALIDATION
  const form = document.querySelector("#newsletterForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();

      if (!name || !email) {
        alert("Please enter both name and email.");
        return;
      }

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmail.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert(`Thanks ${name}, you are subscribed!`);
      form.reset();
    });
  }

  // MAP API (Leaflet + OpenStreetMap)
  const mapContainer = document.getElementById("farmMap");
  if (mapContainer) {
    const map = L.map("farmMap").setView([59.9139, 10.7522], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const farms = [
      { name: "Østfold Farm", coords: [59.283, 11.109], description: "Organic vegetables and oats from Østfold." },
      { name: "Vestfold Farm", coords: [59.25, 10.42], description: "Root vegetables and garlic from Vestfold." },
      { name: "Buskerud Farm", coords: [60.05, 9.55], description: "Fresh onions and sustainable potatoes." },
    ];

    farms.forEach((farm) => {
      const marker = L.marker(farm.coords).addTo(map);
      marker.bindPopup(`<b>${farm.name}</b><br>${farm.description}`);
    });
  }
});