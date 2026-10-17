
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const searchInput = document.getElementById("gameSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const gameCards = document.querySelectorAll(".game-card");
const noResults = document.getElementById("noResults");

let activeFilter = "all";

function filterGames() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  gameCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const genre = card.dataset.genre;
    const text = card.textContent.toLowerCase();

    const matchesSearch =
      name.includes(searchTerm) || text.includes(searchTerm);

    const matchesFilter =
      activeFilter === "all" || genre === activeFilter;

    const visible = matchesSearch && matchesFilter;

    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterGames);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);

      if (active) {
        item.setAttribute("aria-pressed", "true");
      } else {
        item.setAttribute("aria-pressed", "false");
      }
    });

    filterGames();
  });
});

// Wishlist buttons
document.querySelectorAll(".favorite-btn").forEach((button) => {
  button.setAttribute("aria-pressed", "false");

  button.addEventListener("click", () => {
    const isFavorite = button.getAttribute("aria-pressed") === "true";

    button.setAttribute("aria-pressed", String(!isFavorite));
    button.textContent = isFavorite ? "♡" : "♥";

    button.setAttribute(
      "aria-label",
      `${isFavorite ? "Add" : "Remove"} ${
        button.closest(".game-card").dataset.name
      } ${isFavorite ? "to" : "from"} wishlist`
    );
  });
});

// Game information dialog
const modal = document.getElementById("gameModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

const gameDescriptions = {
  "Cyber Strike": "Enter a neon-lit futuristic city filled with action and high-speed challenges.",
  "Lost Galaxy": "Explore distant planets, uncover cosmic mysteries, and venture into the unknown.",
  "Shadow Tactics": "Plan every move carefully and use strategy to overcome your opponents.",
  "Velocity X": "Take on the streets in a futuristic racing adventure built around speed.",
  "Mystic Realms": "Discover a fantasy world packed with ancient secrets and magical places.",
  "Mech Dominion": "Build a powerful mech squad and plan your path to victory."
};

let previousFocus = null;

function openGameModal(gameName) {
  previousFocus = document.activeElement;
  modalTitle.textContent = gameName;
  modalText.textContent =
    gameDescriptions[gameName] || "Discover your next gaming adventure.";

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeGameModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");

  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll(".play-btn").forEach((button) => {
  button.addEventListener("click", () => {
    openGameModal(button.dataset.game);
  });
});

modalClose.addEventListener("click", closeGameModal);
modalOk.addEventListener("click", closeGameModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeGameModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeGameModal();
  }
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Automatically update the footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Start with all games visible
filterGames();
