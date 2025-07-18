const directoryList = document.getElementById("directoryList");
const filter = document.getElementById("filter");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const businesses = await response.json();

    renderBusinesses(businesses, "all");

    // Filter by category
    filter.addEventListener("change", (e) => {
      const selected = e.target.value.toLowerCase();
      renderBusinesses(businesses, selected);
    });

    // Grid view
    document.getElementById("gridView").addEventListener("click", () => {
      directoryList.classList.add("grid");
      directoryList.classList.remove("list");
    });

    // List view
    document.getElementById("listView").addEventListener("click", () => {
      directoryList.classList.add("list");
      directoryList.classList.remove("grid");
    });

  } catch (error) {
    console.error("Error fetching members:", error);
    directoryList.innerHTML = "<p>Failed to load directory.</p>";
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
    directoryList.innerHTML = "<p>No businesses found in this category.</p>";
    return;
  }

  filtered.forEach(biz => {
    const card = document.createElement("div");
    card.className = "business-card";
    card.innerHTML = `
      <img src="images/${biz.image}" alt="${biz.name} logo" loading="lazy">
      <div class="business-info">
        <h4>${biz.name}</h4>
        <p><strong>Address:</strong> ${biz.address}</p>
        <p><strong>Phone:</strong> ${biz.phone}</p>
        <p><strong>Level:</strong> ${biz.level}</p>
        <p><a href="${biz.website}" target="_blank">Visit Website</a></p>
      </div>
    `;
    directoryList.appendChild(card);
  });
}

getMembers();
