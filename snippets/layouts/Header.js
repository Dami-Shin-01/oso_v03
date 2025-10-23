/**
 * Header Component JavaScript
 *
 * Features:
 * - Sticky header with scroll detection
 * - Dropdown menu on hover
 * - Mobile sidebar menu toggle
 * - Background overlay for mobile menu
 */

(function() {
  'use strict';

  // ===== SCROLL DETECTION =====
  // Add 'on' class to header when user scrolls down
  function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('on');
      } else {
        header.classList.remove('on');
      }
    });
  }

  // ===== DROPDOWN MENU =====
  // Show/hide dropdown menu and background on hover
  function handleDropdownMenu() {
    const depth1Items = document.querySelectorAll('.header .hd_lnb ul .depth1');
    const dropdownBg = document.querySelector('.header .hd_lnb_bg');

    if (!depth1Items.length || !dropdownBg) return;

    depth1Items.forEach(function(item) {
      const depthBox = item.querySelector('.depth_box');
      if (!depthBox) return;

      // Mouse enter
      item.addEventListener('mouseenter', function() {
        // Show this menu's dropdown
        depthBox.classList.add('on');

        // Show background overlay
        dropdownBg.classList.add('on');
      });

      // Mouse leave
      item.addEventListener('mouseleave', function() {
        // Hide this menu's dropdown
        depthBox.classList.remove('on');

        // Check if any other dropdowns are open
        const anyOpen = Array.from(depth1Items).some(function(otherItem) {
          return otherItem.querySelector('.depth_box.on');
        });

        // If no dropdowns are open, hide background
        if (!anyOpen) {
          dropdownBg.classList.remove('on');
        }
      });
    });

    // Also hide background when mouse leaves the entire nav area
    const nav = document.querySelector('.header .hd_lnb');
    if (nav) {
      nav.addEventListener('mouseleave', function() {
        dropdownBg.classList.remove('on');
        depth1Items.forEach(function(item) {
          const depthBox = item.querySelector('.depth_box');
          if (depthBox) {
            depthBox.classList.remove('on');
          }
        });
      });
    }
  }

  // ===== MOBILE MENU TOGGLE =====
  // Open/close mobile sidebar menu
  function handleMobileMenu() {
    const menuBtn = document.querySelector('.header .btn_menu');
    const closeBtn = document.querySelector('.aside .btn_close');
    const aside = document.querySelector('.aside');
    const asideBg = document.querySelector('.aside_bg');

    if (!menuBtn || !aside || !asideBg) return;

    // Open menu
    menuBtn.addEventListener('click', function() {
      aside.classList.add('on');
      asideBg.classList.add('on');
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    });

    // Close menu
    function closeMenu() {
      aside.classList.remove('on');
      asideBg.classList.remove('on');
      document.body.style.overflow = ''; // Restore body scroll
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // Close on background click
    asideBg.addEventListener('click', closeMenu);
  }

  // ===== MOBILE SUBMENU TOGGLE =====
  // Toggle submenu in mobile sidebar
  function handleMobileSubmenu() {
    const mobileDepth1Links = document.querySelectorAll('.aside .depth1');

    mobileDepth1Links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        // Only toggle if this menu has a submenu
        const depthList = link.nextElementSibling;
        if (!depthList || !depthList.classList.contains('depth_list')) {
          return; // Let the link work normally
        }

        e.preventDefault();

        // Close all other submenus
        const allDepthLists = document.querySelectorAll('.aside .depth_list');
        allDepthLists.forEach(function(otherList) {
          if (otherList !== depthList) {
            otherList.style.display = 'none';
          }
        });

        // Toggle this submenu
        if (depthList.style.display === 'block') {
          depthList.style.display = 'none';
        } else {
          depthList.style.display = 'block';
        }
      });
    });
  }

  // ===== INITIALIZATION =====
  // Run all functions when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    handleHeaderScroll();
    handleDropdownMenu();
    handleMobileMenu();
    handleMobileSubmenu();
  }

})();
