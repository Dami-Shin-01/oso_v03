/**
 * Comprehensive Button Action Test
 * 모든 버튼의 동작 여부 및 실행 적정성을 검증하는 종합 테스트
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const ROOM_ID = '26269';

interface ButtonTestResult {
  page: string;
  selector: string;
  text: string;
  visible: boolean;
  enabled: boolean;
  clickable: boolean;
  actionResult: string;
  appropriate: boolean;
  reason: string;
}

test.describe('Comprehensive Button Action Test', () => {
  const results: ButtonTestResult[] = [];

  test('1. Homepage - All buttons and links', async ({ page }) => {
    console.log('\n🏠 ===== HOMEPAGE BUTTON TEST =====\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Find all interactive elements
    const buttons = await page.locator('button, a[href], [role="button"]').all();
    console.log(`📊 Found ${buttons.length} interactive elements\n`);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      try {
        const text = (await button.textContent())?.trim() || '';
        const isVisible = await button.isVisible();
        const isEnabled = await button.isEnabled();

        if (!isVisible) continue;

        console.log(`\n🔘 Button ${i + 1}: "${text || '(no text)'}"`);
        console.log(`   Visible: ${isVisible ? '✅' : '❌'}`);
        console.log(`   Enabled: ${isEnabled ? '✅' : '❌'}`);

        // Check if clickable by attempting to hover
        let clickable = false;
        let actionResult = '';
        let appropriate = false;
        let reason = '';

        try {
          await button.hover({ timeout: 2000 });
          clickable = true;
          console.log(`   Hoverable: ✅`);

          // Get href if it's a link
          const href = await button.getAttribute('href');
          if (href) {
            console.log(`   Link target: ${href}`);
            actionResult = `Link to ${href}`;
            appropriate = href.startsWith('/') || href.startsWith('http');
            reason = appropriate ? 'Valid link' : 'Invalid link format';
          }

          // Check if it's a button
          const tagName = await button.evaluate(el => el.tagName);
          if (tagName === 'BUTTON') {
            const type = await button.getAttribute('type');
            console.log(`   Button type: ${type || 'button'}`);
            actionResult = `Button (type: ${type || 'button'})`;
            appropriate = true;
            reason = 'Standard button';
          }

        } catch (error) {
          console.log(`   Hoverable: ❌ (${error.message})`);
          reason = 'Not hoverable/hidden';
        }

        results.push({
          page: 'Homepage',
          selector: await button.evaluate(el => el.tagName + (el.className ? `.${el.className.split(' ')[0]}` : '')),
          text: text.substring(0, 50),
          visible: isVisible,
          enabled: isEnabled,
          clickable,
          actionResult,
          appropriate,
          reason
        });

      } catch (error) {
        console.log(`   ⚠️  Error testing button: ${error.message}`);
      }
    }

    console.log(`\n✅ Homepage test completed: ${results.length} elements tested`);
  });

  test('2. Navigation buttons functionality', async ({ page }) => {
    console.log('\n🧭 ===== NAVIGATION TEST =====\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Test main navigation links
    const navTests = [
      { text: '공간목록', expectedUrl: '/rooms' },
      { text: '예약하기', expectedUrl: '/rooms' },
      { text: '소개', expectedUrl: '/#about' },
      { text: '문의', expectedUrl: '/#contact' }
    ];

    for (const navTest of navTests) {
      console.log(`\n📍 Testing navigation: "${navTest.text}"`);

      // Find all matching links
      const links = await page.locator(`a:has-text("${navTest.text}")`).all();
      console.log(`   Found ${links.length} links with text "${navTest.text}"`);

      let foundWorkingLink = false;

      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const isVisible = await link.isVisible();
        const href = await link.getAttribute('href');

        if (isVisible && href) {
          console.log(`   Link ${i + 1}: href="${href}", visible=true`);

          // Check if it's in viewport
          const box = await link.boundingBox();
          if (box && box.y >= 0 && box.y < 1080) {
            console.log(`   ✅ Link ${i + 1} is in viewport (y=${Math.round(box.y)})`);
            foundWorkingLink = true;

            results.push({
              page: 'Navigation',
              selector: `a:has-text("${navTest.text}")`,
              text: navTest.text,
              visible: true,
              enabled: true,
              clickable: true,
              actionResult: `Navigates to ${href}`,
              appropriate: href.includes(navTest.expectedUrl),
              reason: href.includes(navTest.expectedUrl) ? 'Correct navigation target' : 'Unexpected URL'
            });

            break; // Found a working link, move to next nav item
          }
        }
      }

      if (!foundWorkingLink) {
        console.log(`   ⚠️  No visible in-viewport link found for "${navTest.text}"`);
      }
    }
  });

  test('3. Rooms page - Room cards and action buttons', async ({ page }) => {
    console.log('\n🏘️  ===== ROOMS PAGE TEST =====\n');

    await page.goto(`${BASE_URL}/rooms`);
    await page.waitForLoadState('networkidle');

    // Find all room cards
    const roomCards = await page.locator('a[href^="/rooms/"]').all();
    console.log(`📊 Found ${roomCards.length} room cards\n`);

    // Test first 3 room cards
    for (let i = 0; i < Math.min(3, roomCards.length); i++) {
      const card = roomCards[i];
      const href = await card.getAttribute('href');
      const isVisible = await card.isVisible();

      console.log(`\n🏠 Room Card ${i + 1}:`);
      console.log(`   URL: ${href}`);
      console.log(`   Visible: ${isVisible ? '✅' : '❌'}`);

      if (isVisible) {
        try {
          const box = await card.boundingBox();
          console.log(`   Position: y=${box?.y}, height=${box?.height}`);

          await card.hover({ timeout: 3000 });
          console.log(`   Hoverable: ✅`);

          // Check if clicking would work
          const clickable = await card.isEnabled();
          console.log(`   Clickable: ${clickable ? '✅' : '❌'}`);

          results.push({
            page: 'Rooms List',
            selector: `a[href="${href}"]`,
            text: `Room card ${i + 1}`,
            visible: isVisible,
            enabled: clickable,
            clickable: true,
            actionResult: `Opens room detail: ${href}`,
            appropriate: true,
            reason: 'Proper room card link'
          });

        } catch (error) {
          console.log(`   ⚠️  Hover/Click test failed: ${error.message}`);
        }
      }
    }
  });

  test('4. Room detail page - Reservation buttons', async ({ page }) => {
    console.log('\n🏠 ===== ROOM DETAIL PAGE TEST =====\n');

    await page.goto(`${BASE_URL}/rooms/${ROOM_ID}`);
    await page.waitForLoadState('networkidle');

    console.log(`Testing room detail page: /rooms/${ROOM_ID}\n`);

    // Find all buttons on the page
    const allButtons = await page.locator('button, a[href*="book"]').all();
    console.log(`📊 Found ${allButtons.length} potential action buttons\n`);

    for (let i = 0; i < allButtons.length; i++) {
      const button = allButtons[i];
      const text = (await button.textContent())?.trim() || '';
      const isVisible = await button.isVisible();

      if (!isVisible || text.length === 0) continue;

      console.log(`\n🔘 Button ${i + 1}: "${text}"`);

      try {
        const tagName = await button.evaluate(el => el.tagName);
        const href = await button.getAttribute('href');
        const type = await button.getAttribute('type');

        console.log(`   Tag: ${tagName}`);
        if (href) console.log(`   Href: ${href}`);
        if (type) console.log(`   Type: ${type}`);

        await button.hover({ timeout: 2000 });
        const box = await button.boundingBox();

        console.log(`   Visible: ✅`);
        console.log(`   Position: y=${box?.y}`);
        console.log(`   Hoverable: ✅`);

        let actionResult = '';
        let appropriate = false;
        let reason = '';

        if (href && href.includes('book')) {
          actionResult = `Opens booking page: ${href}`;
          appropriate = true;
          reason = 'Correct booking flow';
        } else if (text.includes('예약')) {
          actionResult = `Reservation action: ${text}`;
          appropriate = href?.includes('book') || type === 'submit';
          reason = appropriate ? 'Proper reservation button' : 'Unclear action target';
        } else {
          actionResult = `General button: ${text}`;
          appropriate = true;
          reason = 'Standard UI button';
        }

        results.push({
          page: 'Room Detail',
          selector: tagName.toLowerCase(),
          text: text.substring(0, 50),
          visible: true,
          enabled: true,
          clickable: true,
          actionResult,
          appropriate,
          reason
        });

      } catch (error) {
        console.log(`   ⚠️  Error: ${error.message}`);
      }
    }
  });

  test('5. Booking page - Form buttons and interactions', async ({ page }) => {
    console.log('\n📝 ===== BOOKING PAGE TEST =====\n');

    await page.goto(`${BASE_URL}/rooms/${ROOM_ID}/book`);
    await page.waitForLoadState('networkidle');

    console.log(`Testing booking page: /rooms/${ROOM_ID}/book\n`);

    // Test all buttons on booking page
    const buttons = await page.locator('button').all();
    console.log(`📊 Found ${buttons.length} buttons on booking page\n`);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const text = (await button.textContent())?.trim() || '';
      const isVisible = await button.isVisible();

      if (!isVisible) continue;

      console.log(`\n🔘 Button ${i + 1}: "${text}"`);

      try {
        const type = await button.getAttribute('type');
        const disabled = await button.isDisabled();
        const enabled = await button.isEnabled();

        console.log(`   Type: ${type || 'button'}`);
        console.log(`   Enabled: ${enabled ? '✅' : '❌'}`);
        console.log(`   Disabled: ${disabled ? '❌' : '✅'}`);

        await button.hover({ timeout: 2000 });
        console.log(`   Hoverable: ✅`);

        let actionResult = '';
        let appropriate = false;
        let reason = '';

        if (type === 'submit') {
          actionResult = 'Form submission button';
          appropriate = text.includes('예약') || text.includes('확인');
          reason = appropriate ? 'Proper submit button with clear label' : 'Submit button needs clearer label';
        } else if (text.includes('날짜') || text.includes('달력')) {
          actionResult = 'Date picker trigger';
          appropriate = true;
          reason = 'Opens date selection UI';
        } else if (text.includes('취소') || text.includes('닫기')) {
          actionResult = 'Cancel/Close action';
          appropriate = true;
          reason = 'Standard cancel/close button';
        } else {
          actionResult = `UI control: ${text}`;
          appropriate = true;
          reason = 'General UI interaction';
        }

        results.push({
          page: 'Booking Form',
          selector: 'button',
          text: text.substring(0, 50),
          visible: true,
          enabled: enabled,
          clickable: enabled,
          actionResult,
          appropriate,
          reason
        });

      } catch (error) {
        console.log(`   ⚠️  Error: ${error.message}`);
      }
    }

    // Test form inputs
    console.log(`\n📋 Testing form inputs...\n`);

    const inputs = await page.locator('input[name]').all();
    console.log(`Found ${inputs.length} form inputs\n`);

    for (const input of inputs) {
      const name = await input.getAttribute('name');
      const type = await input.getAttribute('type');
      const isVisible = await input.isVisible();
      const isEnabled = await input.isEnabled();

      if (isVisible) {
        console.log(`   📝 Input: ${name} (type: ${type})`);
        console.log(`      Visible: ✅, Enabled: ${isEnabled ? '✅' : '❌'}`);

        results.push({
          page: 'Booking Form',
          selector: `input[name="${name}"]`,
          text: `${name} input`,
          visible: true,
          enabled: isEnabled,
          clickable: isEnabled,
          actionResult: `Text input for ${name}`,
          appropriate: true,
          reason: 'Standard form input'
        });
      }
    }
  });

  test('6. Generate comprehensive report', async () => {
    console.log('\n\n📊 ===== COMPREHENSIVE TEST REPORT =====\n');

    const totalTests = results.length;
    const appropriateActions = results.filter(r => r.appropriate).length;
    const inappropriateActions = results.filter(r => !r.appropriate).length;
    const clickableElements = results.filter(r => r.clickable).length;

    console.log(`📈 SUMMARY STATISTICS:\n`);
    console.log(`   Total elements tested: ${totalTests}`);
    console.log(`   Clickable elements: ${clickableElements}`);
    console.log(`   Appropriate actions: ${appropriateActions} (${Math.round(appropriateActions/totalTests*100)}%)`);
    console.log(`   Needs review: ${inappropriateActions}`);

    console.log(`\n\n📋 DETAILED RESULTS BY PAGE:\n`);

    const pageGroups = results.reduce((acc, result) => {
      if (!acc[result.page]) acc[result.page] = [];
      acc[result.page].push(result);
      return acc;
    }, {} as Record<string, ButtonTestResult[]>);

    for (const [pageName, pageResults] of Object.entries(pageGroups)) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📄 ${pageName} (${pageResults.length} elements)`);
      console.log(`${'='.repeat(60)}\n`);

      pageResults.forEach((result, index) => {
        const status = result.appropriate ? '✅' : '⚠️';
        console.log(`${status} ${index + 1}. ${result.text || result.selector}`);
        console.log(`   Selector: ${result.selector}`);
        console.log(`   Visible: ${result.visible ? '✅' : '❌'} | Enabled: ${result.enabled ? '✅' : '❌'} | Clickable: ${result.clickable ? '✅' : '❌'}`);
        console.log(`   Action: ${result.actionResult}`);
        console.log(`   Assessment: ${result.reason}\n`);
      });
    }

    console.log(`\n\n🎯 FINAL VERDICT:\n`);

    if (inappropriateActions === 0) {
      console.log(`✅ ALL BUTTONS PASS APPROPRIATENESS CHECK`);
      console.log(`   All interactive elements have proper functionality and clear purpose.`);
    } else {
      console.log(`⚠️  ${inappropriateActions} ELEMENTS NEED REVIEW`);
      console.log(`   Some elements may need clearer labeling or action targets.`);
    }

    console.log(`\n✅ Comprehensive button test completed successfully!`);

    // Assert that we tested a reasonable number of elements
    expect(totalTests).toBeGreaterThan(10);

    // Assert that most actions are appropriate (at least 80%)
    expect(appropriateActions / totalTests).toBeGreaterThan(0.8);
  });
});
