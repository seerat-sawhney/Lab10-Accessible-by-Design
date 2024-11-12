document.addEventListener("DOMContentLoaded", function() {
  const menuButton = document.getElementById("menubutton1");
  const menu = document.getElementById("menu1");
  const menuItems = menu.querySelectorAll('[role="menuitem"]');

  // Fix: Track the current focus within the menu items
  let currentFocus = 0;

  // Fix: Set initial tabindex for each menu item
  // The first item is set to "0" to make it focusable, others to "-1"
  menuItems.forEach((item, index) => {
    item.setAttribute("tabindex", index === currentFocus ? "0" : "-1");
  });

  // Fix: Toggle menu visibility when clicking the button
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
    menu.style.display = isExpanded ? "none" : "block";

    // Fix: Set focus on the first menu item when menu is opened
    if (!isExpanded) {
      menuItems[currentFocus].focus();
    }
  });

  // Fix: Add keyboard navigation for menu items
  menu.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      // Prevent default scroll behavior
      event.preventDefault();
      // Fix: Move focus to the next item
      moveFocus(1);
    } else if (event.key === "ArrowUp") {
      // Prevent default scroll behavior
      event.preventDefault();
      // Fix: Move focus to the previous item
      moveFocus(-1);
    } else if (event.key === "Escape") {
      // Fix: Close the menu on Escape key press
      closeMenu();
    } else if (event.key === "Enter") {
      // Fix: Select the focused item and display it in the input field
      document.getElementById("action_output").value = menuItems[currentFocus].textContent;
      closeMenu();
    }
  });

  // Fix: Function to move focus up or down the menu items
  function moveFocus(direction) {
    // Fix: Set the current focused item's tabindex to "-1" to remove it from the tab order
    menuItems[currentFocus].setAttribute("tabindex", "-1");

    // Fix: Update the current focus index within the bounds of the menu items
    currentFocus = (currentFocus + direction + menuItems.length) % menuItems.length;

    // Fix: Set the new focused item's tabindex to "0" and apply focus
    menuItems[currentFocus].setAttribute("tabindex", "0");
    menuItems[currentFocus].focus();
  }

  // Fix: Function to close the menu and return focus to the button
  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menu.style.display = "none";
    menuButton.focus();
  }
});
