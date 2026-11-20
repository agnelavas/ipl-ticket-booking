/**
 * Reusable Toast Notification Function
 * @param {string} message - Text to display inside the toast
 * @param {number} duration - Display duration in milliseconds (default: 3000ms)
 */
function showToast(message, duration = 3000) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  // Trigger CSS transition on next animation frame
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Remove toast after duration
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duration);
}

// Match-specific pricing table (INR) matching the schedule table
const MATCH_PRICING = {
  "match-01": {
    label: "Match 01: RCB vs CSK",
    prices: { general: 1200, premium: 3500, vip: 8000 }
  },
  "match-02": {
    label: "Match 02: MI vs KKR",
    prices: { general: 1000, premium: 3000, vip: 7500 }
  },
  "match-03": {
    label: "Match 03: GT vs RCB",
    prices: { general: 800, premium: 2500, vip: 6000 }
  }
};

const STAND_LABELS = {
  general: "General",
  premium: "Premium",
  vip: "VIP Hospitality"
};

document.addEventListener("DOMContentLoaded", () => {
  // DOM Selectors for Form Controls
  const matchSelect = document.getElementById("match-select");
  const standSelect = document.getElementById("stand-category");
  const qtyInput = document.getElementById("ticket-quantity");

  // DOM Selectors for Booking Summary Card
  const summaryMatch = document.getElementById("summary-match");
  const summaryStand = document.getElementById("summary-stand");
  const summaryPrice = document.getElementById("summary-price");
  const summaryQty = document.getElementById("summary-qty");
  const summaryTotal = document.getElementById("summary-total");

  /**
   * Reads form dropdowns/inputs, calculates total price, and updates summary card
   * @param {boolean} notify - Whether to display a confirmation toast
   */
  function updateBookingSummary(notify = true) {
    if (!matchSelect || !standSelect || !qtyInput) return;

    const selectedMatchKey = matchSelect.value;
    const selectedStandKey = standSelect.value;
    const quantity = Math.max(1, parseInt(qtyInput.value, 10) || 1);

    const matchData = MATCH_PRICING[selectedMatchKey];
    const unitPrice = matchData && selectedStandKey ? matchData.prices[selectedStandKey] : 0;
    const totalAmount = unitPrice * quantity;

    // Update Summary Card DOM elements
    summaryMatch.textContent = matchData ? matchData.label : "Not selected";
    summaryStand.textContent = selectedStandKey ? STAND_LABELS[selectedStandKey] : "Not selected";
    summaryPrice.textContent = `₹${unitPrice.toLocaleString("en-IN")}`;
    summaryQty.textContent = quantity;
    summaryTotal.textContent = `₹${totalAmount.toLocaleString("en-IN")}`;

    if (notify) {
      showToast(`Booking summary updated: ₹${totalAmount.toLocaleString("en-IN")}`);
    }
  }

  // Activity 7: Add 'change' event listeners to form controls
  if (matchSelect && standSelect && qtyInput) {
    matchSelect.addEventListener("change", () => updateBookingSummary(true));
    standSelect.addEventListener("change", () => updateBookingSummary(true));
    qtyInput.addEventListener("change", () => updateBookingSummary(true));
  }

  // Activity 5: Smooth scroll from schedule table "Book" buttons
  const scheduleLinks = document.querySelectorAll('#schedule tbody a[href="#book-tickets"]');
  const bookingSection = document.getElementById("book-tickets");

  scheduleLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const row = link.closest("tr");
      const matchName = row ? row.cells[1].textContent.trim() : "Selected Match";

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (matchSelect && matchSelect.options[index + 1]) {
        matchSelect.selectedIndex = index + 1;
        updateBookingSummary(false);
      }

      showToast(`Selected ${matchName}. Choose a stand category to see total!`);
    });
  });

  // Optional: Reset toast on standalone booking.html
  const standaloneForm = document.querySelector("#booking-section form");
  if (standaloneForm) {
    standaloneForm.addEventListener("reset", () => {
      showToast("Form fields have been reset.");
    });
  }
});