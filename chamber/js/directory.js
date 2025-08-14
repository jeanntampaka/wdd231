// === directory.js (Improved Version) ===
const directoryList = document.getElementById("directoryList");
const filter = document.getElementById("filter");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const businesses = await response.json();

    renderBusinesses(businesses, "all");

    // Filter by category
    filter.addEventListener("change", (e) => {
      const selected = e.target.value.toLowerCase();
      renderBusinesses(businesses, selected);
    });

    // Grid view
    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");

    gridBtn.addEventListener("click", () => {
      directoryList.classList.add("grid");
      directoryList.classList.remove("list");
      gridBtn.setAttribute("aria-pressed", "true");
      listBtn.setAttribute("aria-pressed", "false");
    });

    // List view
    listBtn.addEventListener("click", () => {
      directoryList.classList.add("list");
      directoryList.classList.remove("grid");
      listBtn.setAttribute("aria-pressed", "true");
      gridBtn.setAttribute("aria-pressed", "false");
    });

  } catch (error) {
    console.error("Error fetching members:", error);
    showError("Failed to load directory. Please try again later.");
  }
}

function renderBusinesses(businesses, category) {
  directoryList.innerHTML = "";

  const filtered = category === "all"
    ? businesses
    : businesses.filter(biz =>
        biz.category.toLowerCase() === category
      );

  if (filtered.length === 0) {
    showError("No businesses found in this category.");
    return;
  }

  filtered.forEach(biz => {
    const card = document.createElement("article");
    card.className = "business-card";

    const imgSrc = biz.image
      ? `images/${biz.image}`
      : "images/default-logo.png"; // fallback image

    card.innerHTML = `
      <img src="${imgSrc}" alt="${biz.name} logo" loading="lazy" onerror="this.src='images/default-logo.png'">
      <div class="business-info">
        <h4>${biz.name}</h4>
        <p><strong>Address:</strong> ${biz.address}</p>
        <p><strong>Phone:</strong> ${biz.phone}</p>
        <p><strong>Level:</strong> ${biz.level}</p>
        <p><a href="${biz.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
      </div>
    `;
    directoryList.appendChild(card);
  });
}

function showError(message) {
  directoryList.innerHTML = `<p class="error-message" role="alert">${message}</p>`;
}

getMembers();
