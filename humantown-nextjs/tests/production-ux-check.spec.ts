/**
 * Production UX Check
 *
 * Visual verification of navigation accessibility on production site
 */

import { test, expect } from '@playwright/test';

test.describe('Production UX Check', () => {
  const PROD_URL = 'https://oso-v03.vercel.app';

  test('Check navigation accessibility - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 60000 });

    console.log('\n🖥️  Desktop UX Check (1920x1080)');

    // Take screenshot of initial viewport
    await page.screenshot({
      path: 'test-results/prod-homepage-desktop.png',
      fullPage: false
    });

    console.log('   ✅ Screenshot saved: prod-homepage-desktop.png');

    // Find all navigation links
    const navLinks = await page.locator('a[href="/rooms"]').all();
    console.log(`   Found ${navLinks.length} links to /rooms`);

    let accessibleLinks = 0;
    for (let i = 0; i < navLinks.length; i++) {
      const link = navLinks[i];
      const isVisible = await link.isVisible();
      const box = await link.boundingBox();
      const text = await link.textContent();

      if (isVisible && box && box.y >= 0 && box.y < 1080) {
        accessibleLinks++;
        console.log(`   ✅ Link ${i + 1}: "${text?.trim()}" is accessible`);
        console.log(`      Position: y=${box.y.toFixed(0)}, height=${box.height.toFixed(0)}`);
      } else if (isVisible && box) {
        console.log(`   ⚠️  Link ${i + 1}: "${text?.trim()}" is visible but y=${box.y.toFixed(0)} (outside viewport)`);
      }
    }

    console.log(`\n   Summary: ${accessibleLinks}/${navLinks.length} links accessible without scrolling`);

    if (accessibleLinks === 0) {
      console.log('   ❌ UX ISSUE: No navigation link to /rooms is visible in initial viewport!');
      console.log('   🔧 Recommendation: Add visible "공간목록" link in header or hero section');
    }
  });

  test('Check navigation accessibility - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 60000 });

    console.log('\n📱 Mobile UX Check (375x667)');

    // Take screenshot
    await page.screenshot({
      path: 'test-results/prod-homepage-mobile.png',
      fullPage: false
    });

    console.log('   ✅ Screenshot saved: prod-homepage-mobile.png');

    // Check for hamburger menu
    const menuButtons = await page.locator('button[aria-label*="menu"], button:has-text("메뉴"), button:has-text("Menu")').all();

    if (menuButtons.length > 0) {
      console.log(`   ✅ Found ${menuButtons.length} menu button(s)`);

      // Try to open menu
      try {
        await menuButtons[0].click();
        await page.waitForTimeout(1000);

        await page.screenshot({
          path: 'test-results/prod-mobile-menu-open.png',
          fullPage: false
        });

        console.log('   ✅ Menu opened successfully');

        // Check if navigation links are now visible
        const roomLinks = await page.locator('a[href="/rooms"]').all();
        let visibleInMenu = 0;

        for (const link of roomLinks) {
          if (await link.isVisible()) {
            const text = await link.textContent();
            console.log(`   ✅ Link visible in menu: "${text?.trim()}"`);
            visibleInMenu++;
          }
        }

        console.log(`   Summary: ${visibleInMenu} links visible in mobile menu`);

      } catch (error) {
        console.log('   ⚠️  Could not open mobile menu');
      }
    } else {
      console.log('   ℹ️  No hamburger menu button found on mobile');

      // Check if links are directly visible
      const roomLinks = await page.locator('a[href="/rooms"]').all();
      let visibleLinks = 0;

      for (const link of roomLinks) {
        if (await link.isVisible()) {
          const text = await link.textContent();
          const box = await link.boundingBox();
          if (box && box.y >= 0 && box.y < 667) {
            console.log(`   ✅ Link visible: "${text?.trim()}" at y=${box.y.toFixed(0)}`);
            visibleLinks++;
          }
        }
      }

      if (visibleLinks === 0) {
        console.log('   ❌ UX ISSUE: No visible navigation on mobile!');
      }
    }
  });

  test('Verify direct URL navigation works', async ({ page }) => {
    console.log('\n🔗 Testing direct navigation...');

    await page.goto(`${PROD_URL}/rooms`, { timeout: 60000 });
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: 'test-results/prod-rooms-page.png',
      fullPage: false
    });

    console.log('   ✅ Direct navigation to /rooms works');
    console.log('   URL:', page.url());

    // Check if page has content
    const heading = page.locator('h1').first();
    if (await heading.isVisible()) {
      const text = await heading.textContent();
      console.log(`   ✅ Page heading: "${text?.trim()}"`);
    }

    // Check for room cards
    const roomCards = await page.locator('a[href^="/rooms/"]').all();
    console.log(`   ✅ Found ${roomCards.length} room cards on page`);
  });
});
