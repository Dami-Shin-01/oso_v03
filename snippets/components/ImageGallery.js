/**
 * Image Gallery Component JavaScript
 *
 * Features:
 * - Click to open lightbox
 * - Navigate with prev/next buttons
 * - Navigate with keyboard arrows
 * - Close with ESC or click outside
 * - Thumbnail navigation
 */

(function() {
  'use strict';

  let currentImageIndex = 0;
  let images = [];

  // ===== INITIALIZATION =====
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');

    if (!galleryItems.length || !lightbox) return;

    // Collect all images
    images = Array.from(galleryItems);

    // Add click handlers to gallery items
    images.forEach((img, index) => {
      img.addEventListener('click', function() {
        openLightbox(index);
      });
    });

    // Setup lightbox controls
    setupLightboxControls();
  }

  // ===== OPEN LIGHTBOX =====
  function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    if (!lightbox || !lightboxImage) return;

    // Set image
    lightboxImage.src = images[index].src;
    lightboxImage.alt = images[index].alt;

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Generate thumbnails
    generateThumbnails();
  }

  // ===== CLOSE LIGHTBOX =====
  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== NAVIGATE TO NEXT IMAGE =====
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
  }

  // ===== NAVIGATE TO PREVIOUS IMAGE =====
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  // ===== UPDATE LIGHTBOX IMAGE =====
  function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    if (!lightboxImage) return;

    lightboxImage.src = images[currentImageIndex].src;
    lightboxImage.alt = images[currentImageIndex].alt;

    // Update active thumbnail
    updateActiveThumbnail();
  }

  // ===== GENERATE THUMBNAILS =====
  function generateThumbnails() {
    const thumbnailsContainer = document.querySelector('.lightbox-thumbnails');
    if (!thumbnailsContainer) return;

    thumbnailsContainer.innerHTML = '';

    images.forEach((img, index) => {
      const thumb = document.createElement('img');
      thumb.src = img.src;
      thumb.alt = img.alt;
      thumb.classList.toggle('active', index === currentImageIndex);

      thumb.addEventListener('click', function() {
        currentImageIndex = index;
        updateLightboxImage();
      });

      thumbnailsContainer.appendChild(thumb);
    });
  }

  // ===== UPDATE ACTIVE THUMBNAIL =====
  function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.lightbox-thumbnails img');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentImageIndex);
    });
  }

  // ===== SETUP LIGHTBOX CONTROLS =====
  function setupLightboxControls() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const overlay = document.querySelector('.lightbox-overlay');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    // Click overlay to close
    if (overlay) {
      overlay.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', prevImage);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextImage);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    });
  }

  // ===== RUN ON DOM READY =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

})();
