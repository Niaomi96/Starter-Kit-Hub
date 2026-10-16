


document.addEventListener("DOMContentLoaded", () => {
  // Expand and collapse the main sections.
  document.querySelectorAll("[data-section]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.getElementById(
        `content-${trigger.dataset.section}`
      );

      if (!panel) return;

      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });

  // Switch between topics within the same section.
  document.querySelectorAll("[data-subsection]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.subsection;
      const section = button.closest(".section-content");
      const target = document.getElementById(`guide-${topic}`);

      // Make sure the topic belongs to the correct section.
      if (!section || !target || !section.contains(target)) return;

      // Show only the selected guide.
      section.querySelectorAll(".guide-panel").forEach((guide) => {
        guide.hidden = guide !== target;
      });

      // Update the selected topic button.
      const group = button.closest(".subnav");

      if (group) {
        group.querySelectorAll("[data-subsection]").forEach((item) => {
          item.setAttribute(
            "aria-pressed",
            String(item === button)
          );
        });
      }

      // Reset scrolling when opening a different guide.
      target.scrollTop = 0;
    });
  });

  // Initialize topic buttons for each section independently.
  document.querySelectorAll(".section-content").forEach((section) => {
    const buttons = section.querySelectorAll(
      ".subnav [data-subsection]"
    );

    if (!buttons.length) return;

    const firstButton = buttons[0];
    const firstTopic = document.getElementById(
      `guide-${firstButton.dataset.subsection}`
    );

    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button === firstButton)
      );
    });

    section.querySelectorAll(".guide-panel").forEach((guide) => {
      guide.hidden = guide !== firstTopic;
    });
  });
});
