const directoryList = document.getElementById("directoryList");
const filter = document.getElementById("filter");

const businesses = [
  {
    name: "Kigali Tech Solutions",
    category: "technology",
    level: "Gold",
    email: "info@kigalitech.rw",
    phone: "+250 788 123 456",
    website: "https://kigalitech.rw"
  },
  {
    name: "Green Hills Hotel",
    category: "hospitality",
    level: "Silver",
    email: "contact@greenhillshotel.rw",
    phone: "+250 788 654 321",
    website: "https://greenhillshotel.rw"
  },
  {
    name: "Rwanda FinBank",
    category: "finance",
    level: "Gold",
    email: "support@finbank.rw",
    phone: "+250 788 987 654",
    website: "https://finbank.rw"
  },
  {
    name: "Kigali International School",
    category: "education",
    level: "Non-profit",
    email: "admin@kis.rw",
    phone: "+250 788 000 888",
    website: "https://kis.rw"
  }
];

function renderBusinesses(category) {
  directoryList.innerHTML = "";
  const filtered = category === "all" ? businesses : businesses.filter(b => b.category === category);
  filtered.forEach(biz => {
    const card = document.createElement("div");
    card.className = "business-card";
    card.innerHTML = `
      <h4>${biz.name}</h4>
      <p><strong>Category:</strong> ${biz.category}</p>
      <p><strong>Level:</strong> ${biz.level}</p>
      <p><strong>Email:</strong> <a href="mailto:${biz.email}">${biz.email}</a></p>
      <p><strong>Phone:</strong> ${biz.phone}</p>
      <p><strong>Website:</strong> <a href="${biz.website}" target="_blank">${biz.website}</a></p>
    `;
    directoryList.appendChild(card);
  });
}

filter.addEventListener("change", (e) => {
  renderBusinesses(e.target.value);
});

renderBusinesses("all");
