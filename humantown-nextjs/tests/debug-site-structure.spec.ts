/**
 * Debug test to understand site structure
 */

import { test, expect } from '@playwright/test';

test('Debug: Explore site structure', async ({ page }) => {
  test.setTimeout(120000);

  // Go to homepage
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ path: 'test-results/01-homepage.png', fullPage: true });

  console.log('Homepage title:', await page.title());

  // Find all links to rooms
  const roomLinks = await page.locator('a[href*="/rooms"]').all();
  console.log(`Found ${roomLinks.length} links containing "/rooms"`);

  for (let i = 0; i < Math.min(roomLinks.length, 5); i++) {
    const href = await roomLinks[i].getAttribute('href');
    const text = await roomLinks[i].textContent();
    console.log(`  Link ${i + 1}: "${text?.trim()}" -> ${href}`);
  }

  // Try to navigate to rooms page directly
  console.log('\nNavigating to /rooms directly...');
  await page.goto('http://localhost:3000/rooms');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-results/02-rooms-page.png', fullPage: true });

  console.log('Rooms page title:', await page.title());
  console.log('Rooms page URL:', page.url());

  // Find room cards/links
  const roomCards = await page.locator('a[href^="/rooms/"]').all();
  console.log(`Found ${roomCards.length} room cards/links`);

  if (roomCards.length > 0) {
    const firstRoomHref = await roomCards[0].getAttribute('href');
    console.log(`\nNavigating to first room: ${firstRoomHref}`);

    await page.goto(`http://localhost:3000${firstRoomHref}`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/03-room-detail.png', fullPage: true });

    console.log('Room detail page title:', await page.title());

    // Find reservation button
    const reserveButtons = await page.locator('a:has-text("예약"), button:has-text("예약")').all();
    console.log(`Found ${reserveButtons.length} reservation buttons`);

    for (let i = 0; i < reserveButtons.length; i++) {
      const text = await reserveButtons[i].textContent();
      const href = await reserveButtons[i].getAttribute('href');
      console.log(`  Button ${i + 1}: "${text?.trim()}" -> ${href || 'no href (button)'}`);
    }

    // Try to navigate to booking page
    const bookingUrl = `http://localhost:3000${firstRoomHref}/book`;
    console.log(`\nNavigating to booking page: ${bookingUrl}`);

    await page.goto(bookingUrl);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/04-booking-page.png', fullPage: true });

    console.log('Booking page title:', await page.title());
    console.log('Booking page URL:', page.url());

    // Find form elements
    const forms = await page.locator('form').all();
    console.log(`Found ${forms.length} forms`);

    const inputs = await page.locator('input').all();
    console.log(`Found ${inputs.length} inputs`);

    for (let i = 0; i < Math.min(inputs.length, 10); i++) {
      const name = await inputs[i].getAttribute('name');
      const type = await inputs[i].getAttribute('type');
      const placeholder = await inputs[i].getAttribute('placeholder');
      console.log(`  Input ${i + 1}: name="${name}" type="${type}" placeholder="${placeholder}"`);
    }

    const buttons = await page.locator('button').all();
    console.log(`Found ${buttons.length} buttons`);

    for (let i = 0; i < Math.min(buttons.length, 5); i++) {
      const text = await buttons[i].textContent();
      const type = await buttons[i].getAttribute('type');
      console.log(`  Button ${i + 1}: type="${type}" text="${text?.trim()}"`);
    }
  }

  console.log('\n✅ Site structure exploration complete!');
  console.log('Check test-results/ folder for screenshots');
});
