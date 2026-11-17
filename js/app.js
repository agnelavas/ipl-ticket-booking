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

// Initialize DOM Interactions
document.addEventListener("DOMContentLoaded", () => {
  const scheduleLinks = document.querySelectorAll('#schedule tbody a[href="#book-tickets"]');
  const bookingSection = document.getElementById("book-tickets");
  const matchDropdown = document.getElementById("match-select");

  scheduleLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Extract match name from the clicked table row
      const row = link.closest("tr");
      const matchName = row ? row.cells[1].textContent.trim() : "Selected Match";

      // Smooth scroll to the booking form
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Pre-select the corresponding match in the form dropdown
      if (matchDropdown && matchDropdown.options[index + 1]) {
        matchDropdown.selectedIndex = index + 1;
      }

      // Display confirmation toast
      showToast(`Selected ${matchName}. Complete your booking below!`);
    });
  });

  // Optional: Trigger toast on booking.html form reset
  const bookingForm = document.querySelector("#booking-section form");
  if (bookingForm) {
    bookingForm.addEventListener("reset", () => {
      showToast("Form fields have been reset.");
    });
  }
});