/**
 * Footer Component JavaScript
 *
 * Features:
 * - Show/hide floating reservation button on scroll
 */

(function() {
  'use strict';

  // ===== FLOATING RESERVATION BUTTON =====
  // Show button when user scrolls down
  function handleFloatingButton() {
    const floatingBtn = document.querySelector('.ft_btn_reserve');
    if (!floatingBtn) return;

    window.addEventListener('scroll', function() {
      // Show button after scrolling 200px
      if (window.scrollY > 200) {
        floatingBtn.classList.add('on');
      } else {
        floatingBtn.classList.remove('on');
      }
    });
  }

  // ===== INITIALIZATION =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    handleFloatingButton();
  }

})();
