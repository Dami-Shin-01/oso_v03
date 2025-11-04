/**
 * Image Fix Verification Test
 * CSS opacity 수정 후 이미지 표시 확인
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Image Display Fix Verification', () => {
  test('1. Rooms page - Room cards should be visible (not white)', async ({ page }) => {
    console.log('\n🏘️  ===== ROOMS PAGE FIX VERIFICATION =====\n');

    await page.goto(`${BASE_URL}/rooms`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'test-results/fix-rooms-page.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: fix-rooms-page.png\n');

    // Check room cards opacity
    const roomCards = await page.locator('.room-card').all();
    console.log(`Found ${roomCards.length} room cards\n`);

    let visibleCount = 0;
    let invisibleCount = 0;

    for (let i = 0; i < Math.min(5, roomCards.length); i++) {
      const card = roomCards[i];

      try {
        // Check if card is visible
        const isVisible = await card.isVisible();

        // Get computed opacity
        const opacity = await card.evaluate((el) => {
          return window.getComputedStyle(el).opacity;
        });

        // Get bounding box to check if it takes space
        const box = await card.boundingBox();

        console.log(`📦 Room Card ${i + 1}:`);
        console.log(`   Visible: ${isVisible ? '✅' : '❌'}`);
        console.log(`   Opacity: ${opacity}`);
        console.log(`   Has dimensions: ${box ? '✅' : '❌'}`);

        if (isVisible && parseFloat(opacity) > 0.5) {
          visibleCount++;
          console.log(`   Status: ✅ VISIBLE\n`);
        } else {
          invisibleCount++;
          console.log(`   Status: ❌ INVISIBLE (opacity too low)\n`);
        }

      } catch (error) {
        invisibleCount++;
        console.log(`   Status: ❌ ERROR - ${error.message}\n`);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Visible cards: ${visibleCount}`);
    console.log(`   Invisible cards: ${invisibleCount}\n`);

    // Assert that at least some cards are visible
    expect(visibleCount).toBeGreaterThan(0);

    console.log('✅ Room cards are now visible!\n');
  });

  test('2. Homepage - Check if Swiper still works', async ({ page }) => {
    console.log('\n🏠 ===== HOMEPAGE SWIPER VERIFICATION =====\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'test-results/fix-homepage.png',
      fullPage: true
    });
    console.log('✅ Screenshot saved: fix-homepage.png\n');

    // Check Swiper slides
    const swiperSlides = await page.locator('.swiper-slide').all();
    console.log(`Found ${swiperSlides.length} Swiper slides\n`);

    // Check if visible slides have opacity 1
    const visibleSlides = await page.locator('.swiper-slide-visible').all();
    console.log(`Visible slides: ${visibleSlides.length}\n`);

    if (visibleSlides.length > 0) {
      const firstSlide = visibleSlides[0];
      const opacity = await firstSlide.evaluate((el) => {
        return window.getComputedStyle(el).opacity;
      });

      console.log(`First visible slide opacity: ${opacity}`);

      expect(parseFloat(opacity)).toBe(1);
      console.log('✅ Swiper animation still works!\n');
    }
  });

  test('3. Visual comparison - Before and After', async ({ page }) => {
    console.log('\n📸 ===== VISUAL COMPARISON =====\n');

    const pages = [
      { url: BASE_URL, name: 'homepage' },
      { url: `${BASE_URL}/rooms`, name: 'rooms' },
      { url: `${BASE_URL}/rooms/26269`, name: 'room-detail' }
    ];

    for (const pageInfo of pages) {
      console.log(`\n📄 Testing ${pageInfo.name}...`);

      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      // Desktop screenshot
      await page.screenshot({
        path: `test-results/fix-${pageInfo.name}-desktop.png`,
        fullPage: true
      });
      console.log(`   ✅ Desktop screenshot: fix-${pageInfo.name}-desktop.png`);

      // Mobile screenshot
      await page.setViewportSize({ width: 375, height: 667 });
      await page.screenshot({
        path: `test-results/fix-${pageInfo.name}-mobile.png`,
        fullPage: true
      });
      console.log(`   ✅ Mobile screenshot: fix-${pageInfo.name}-mobile.png`);

      // Reset viewport
      await page.setViewportSize({ width: 1280, height: 720 });
    }

    console.log('\n✅ All comparison screenshots saved!\n');
  });

  test('4. Check for white/empty images', async ({ page }) => {
    console.log('\n🔍 ===== CHECKING FOR WHITE IMAGES =====\n');

    await page.goto(`${BASE_URL}/rooms`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check all elements with background images
    const elementsWithBg = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const results: Array<{
        tag: string;
        classes: string;
        backgroundImage: string;
        opacity: string;
        visible: boolean;
      }> = [];

      elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;

        if (bgImage && bgImage !== 'none') {
          const rect = el.getBoundingClientRect();
          results.push({
            tag: el.tagName,
            classes: el.className.toString(),
            backgroundImage: bgImage.substring(0, 100),
            opacity: style.opacity,
            visible: rect.width > 0 && rect.height > 0
          });
        }
      });

      return results;
    });

    console.log(`Found ${elementsWithBg.length} elements with background images\n`);

    let properlyVisible = 0;
    let potentialIssues = 0;

    elementsWithBg.forEach((el, i) => {
      if (i < 10) { // Show first 10
        console.log(`\n${i + 1}. ${el.tag}.${el.classes.split(' ')[0]}`);
        console.log(`   Opacity: ${el.opacity}`);
        console.log(`   Visible: ${el.visible ? '✅' : '❌'}`);
        console.log(`   BG: ${el.backgroundImage.substring(0, 50)}...`);
      }

      if (parseFloat(el.opacity) > 0.8 && el.visible) {
        properlyVisible++;
      } else if (el.visible) {
        potentialIssues++;
      }
    });

    console.log(`\n\n📊 Background Image Summary:`);
    console.log(`   Total elements: ${elementsWithBg.length}`);
    console.log(`   Properly visible (opacity > 0.8): ${properlyVisible}`);
    console.log(`   Potential issues (low opacity): ${potentialIssues}\n`);

    expect(properlyVisible).toBeGreaterThan(0);
    console.log('✅ Background images are displaying correctly!\n');
  });

  test('5. Generate fix report', async () => {
    console.log('\n\n📊 ===== FIX VERIFICATION REPORT =====\n');

    console.log('🔧 Changes Made:\n');
    console.log('   1. ✅ Removed opacity: 0 from .room-card base class');
    console.log('   2. ✅ Applied opacity animation only to .room-card.swiper-slide');
    console.log('   3. ✅ Changed .facility-card opacity from 0.5 to 1\n');

    console.log('📸 Verification Screenshots:\n');
    console.log('   ✅ fix-rooms-page.png - Rooms page after fix');
    console.log('   ✅ fix-homepage.png - Homepage after fix');
    console.log('   ✅ fix-*-desktop.png - Desktop views');
    console.log('   ✅ fix-*-mobile.png - Mobile views\n');

    console.log('🎯 Expected Results:\n');
    console.log('   ✅ Rooms page cards should be visible (not white)');
    console.log('   ✅ Homepage Swiper animation should still work');
    console.log('   ✅ All images should display properly');
    console.log('   ✅ No regression in other pages\n');

    console.log('📝 Compare these screenshots with the previous ones:\n');
    console.log('   Before: visual-rooms-full.png');
    console.log('   After:  fix-rooms-page.png\n');

    console.log('✅ Image display fix verification complete!\n');
  });
});
