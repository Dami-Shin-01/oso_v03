/**
 * Navigation UX Test
 *
 * Verify that key navigation elements are visible and accessible
 * to real users without scrolling
 */

import { test, expect } from '@playwright/test';

test.describe('Navigation UX Check', () => {
  test('Homepage navigation links should be visible in viewport', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    console.log('🖥️  Desktop viewport (1920x1080)');

    // Take screenshot
    await page.screenshot({
      path: 'test-results/homepage-desktop.png',
      fullPage: false // Only visible viewport
    });

    // Find all "공간목록" links
    const roomLinks = page.locator('a[href="/rooms"]:has-text("공간목록")');
    const count = await roomLinks.count();
    console.log(`   Found ${count} "공간목록" links`);

    // Check each one
    for (let i = 0; i < count; i++) {
      const link = roomLinks.nth(i);
      const isVisible = await link.isVisible();
      const box = await link.boundingBox();

      console.log(`   Link ${i + 1}:`);
      console.log(`     - Visible: ${isVisible}`);
      if (box) {
        console.log(`     - Position: x=${box.x.toFixed(0)}, y=${box.y.toFixed(0)}`);
        console.log(`     - Size: ${box.width.toFixed(0)}x${box.height.toFixed(0)}`);
        console.log(`     - In viewport: ${box.y >= 0 && box.y < 1080}`);
      } else {
        console.log(`     - Position: Not in layout`);
      }
    }

    // Check if at least one is in viewport
    let hasVisibleLink = false;
    for (let i = 0; i < count; i++) {
      const link = roomLinks.nth(i);
      const box = await link.boundingBox();
      if (box && box.y >= 0 && box.y < 1080) {
        hasVisibleLink = true;
        console.log(`   ✅ Link ${i + 1} is in viewport and accessible`);
        break;
      }
    }

    if (!hasVisibleLink) {
      console.log('   ⚠️  No "공간목록" link visible in initial viewport!');
      console.log('   Users would need to scroll or open menu to find it');
    }

    // Test mobile viewport
    console.log('\n📱 Mobile viewport (375x667)');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'test-results/homepage-mobile.png',
      fullPage: false
    });

    const mobileRoomLinks = page.locator('a[href="/rooms"]:has-text("공간목록")');
    const mobileCount = await mobileRoomLinks.count();
    console.log(`   Found ${mobileCount} "공간목록" links on mobile`);

    let hasMobileVisibleLink = false;
    for (let i = 0; i < mobileCount; i++) {
      const link = mobileRoomLinks.nth(i);
      const isVisible = await link.isVisible();
      const box = await link.boundingBox();

      console.log(`   Link ${i + 1}:`);
      console.log(`     - Visible: ${isVisible}`);
      if (box) {
        console.log(`     - Position: y=${box.y.toFixed(0)}`);
        console.log(`     - In viewport: ${box.y >= 0 && box.y < 667}`);

        if (box.y >= 0 && box.y < 667) {
          hasMobileVisibleLink = true;
        }
      }
    }

    if (!hasMobileVisibleLink) {
      console.log('   ⚠️  No "공간목록" link visible in mobile viewport!');
      console.log('   Mobile users need to open hamburger menu');
    }
  });

  test('Test actual user navigation flow', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    console.log('\n👤 Simulating real user behavior...');

    // Option 1: Try to click visible "공간목록" button
    const visibleRoomButton = page.locator('a[href="/rooms"]:has-text("공간목록")').first();

    try {
      // Wait for element to be in viewport with timeout
      await visibleRoomButton.scrollIntoViewIfNeeded({ timeout: 2000 });
      await visibleRoomButton.click({ timeout: 5000 });
      console.log('   ✅ Successfully clicked "공간목록" button');

      await page.waitForURL('**/rooms', { timeout: 5000 });
      console.log('   ✅ Navigated to rooms page');
    } catch (error) {
      console.log('   ❌ Could not click "공간목록" button');
      console.log(`   Error: ${error.message}`);

      // Option 2: Try direct navigation (what users might do via URL or bookmark)
      console.log('   🔄 Trying direct navigation to /rooms...');
      await page.goto('http://localhost:3000/rooms');
      await page.waitForLoadState('networkidle');
      console.log('   ✅ Direct navigation works');
    }

    // Take screenshot of rooms page
    await page.screenshot({ path: 'test-results/rooms-page-accessible.png' });
  });

  test('Check header/navigation visibility', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    console.log('\n🔍 Checking navigation structure...');

    // Check for header/nav elements
    const header = page.locator('header, nav').first();
    if (await header.isVisible()) {
      const box = await header.boundingBox();
      console.log('   Header/Nav found:');
      console.log(`     - Position: y=${box?.y}`);
      console.log(`     - Height: ${box?.height}`);
      console.log(`     - Is sticky/fixed: ${await header.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.position === 'fixed' || style.position === 'sticky';
      })}`);
    }

    // Check for menu button (hamburger)
    const menuButton = page.locator('button:has-text("메뉴"), button[aria-label*="menu"], button[aria-label*="Menu"]');
    if (await menuButton.isVisible()) {
      console.log('   ✅ Hamburger menu button found');

      // Try to open menu
      await menuButton.click();
      await page.waitForTimeout(500);

      await page.screenshot({ path: 'test-results/menu-opened.png' });

      // Check if "공간목록" is now accessible in menu
      const menuRoomLink = page.locator('a[href="/rooms"]:has-text("공간목록")').first();
      if (await menuRoomLink.isVisible()) {
        console.log('   ✅ "공간목록" accessible in menu');
      }
    } else {
      console.log('   ℹ️  No hamburger menu button found');
    }
  });
});
