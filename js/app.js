document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // 1. Mobile Hamburger Menu Toggle (Activity 8)
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("nav-open");
    });
  }

  // 2. Team Filter & Grid/List View Toggle (Activity 8)
  const teamFilter = document.getElementById("teamFilter");
  const gridViewBtn = document.getElementById("gridViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");
  const matchesGrid = document.getElementById("matchesGrid");
  const matchCards = document.querySelectorAll(".match-card");

  if (teamFilter) {
    teamFilter.addEventListener("change", () => {
      const selectedTeam = teamFilter.value;
      matchCards.forEach((card) => {
        const cardTeams = card.getAttribute("data-teams") || "";
        if (selectedTeam === "ALL" || cardTeams.includes(selectedTeam)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
      showToast(
        selectedTeam === "ALL"
          ? "Showing all IPL matches"
          : `Filtered matches for ${selectedTeam}`
      );
    });
  }

  if (gridViewBtn && listViewBtn && matchesGrid) {
    gridViewBtn.addEventListener("click", () => {
      matchesGrid.classList.remove("list-view");
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
    });

    listViewBtn.addEventListener("click", () => {
      matchesGrid.classList.add("list-view");
      listViewBtn.classList.add("active");
      gridViewBtn.classList.remove("active");
    });
  }

  // 3. Live Booking Summary Updates (Activity 7)
  const matchSelect = document.getElementById("matchSelect");
  const standSelect = document.getElementById("standSelect");
  const ticketQty = document.getElementById("ticketQty");
  const bookingForm = document.getElementById("bookingForm");

  const summaryMatch = document.getElementById("summaryMatch");
  const summaryStand = document.getElementById("summaryStand");
  const summaryPrice = document.getElementById("summaryPrice");
  const summaryQty = document.getElementById("summaryQty");
  const summaryTotal = document.getElementById("summaryTotal");

  function updateSummary(notify = true) {
    if (!matchSelect || !standSelect || !ticketQty) return;
    const selectedOption = standSelect.options[standSelect.selectedIndex];
    const unitPrice = Number(selectedOption.getAttribute("data-price")) || 1500;
    const quantity = Math.max(1, Number(ticketQty.value) || 1);
    const total = unitPrice * quantity;

    summaryMatch.textContent = matchSelect.value;
    summaryStand.textContent = standSelect.value;
    summaryPrice.textContent = `₹${unitPrice.toLocaleString("en-IN")}`;
    summaryQty.textContent = quantity;
    summaryTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

    if (notify) {
      showToast("Booking summary updated!");
    }
  }

  if (matchSelect && standSelect && ticketQty) {
    matchSelect.addEventListener("change", () => updateSummary(true));
    standSelect.addEventListener("change", () => updateSummary(true));
    ticketQty.addEventListener("change", () => updateSummary(true));
    updateSummary(false);
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Tickets reserved! Check your confirmation summary.");
    });
  }
});