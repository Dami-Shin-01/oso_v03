/**
 * Visual Display & Image Loading Test
 * 이미지 표시 및 화면 정상 표시 여부 종합 검증
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const ROOM_ID = '26269';

interface ImageTestResult {
  page: string;
  src: string;
  alt: string;
  loaded: boolean;
  naturalWidth: number;
  naturalHeight: number;
  displayWidth: number;
  displayHeight: number;
  visible: boolean;
  issue?: string;
}

interface LayoutTestResult {
  page: string;
  element: string;
  visible: boolean;
  width: number;
  height: number;
  position: { x: number; y: number };
  issue?: string;
}

test.describe('Visual Display & Image Loading Test', () => {
  const imageResults: ImageTestResult[] = [];
  const layoutResults: LayoutTestResult[] = [];

  test('1. Homepage - Images and Layout', async ({ page }) => {
    console.log('\n🏠 ===== HOMEPAGE VISUAL TEST =====\n');

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for images to load

    // Take full page screenshot
    await page.screenshot({ path: 'test-results/visual-homepage-full.png', fullPage: true });
    console.log('✅ Full page screenshot saved\n');

    // Check all images
    console.log('📸 Testing images...\n');
    const images = await page.locator('img').all();
    console.log(`Found ${images.length} images\n`);

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        const src = await img.getAttribute('src') || '';
        const alt = await img.getAttribute('alt') || '';
        const isVisible = await img.isVisible();

        if (!isVisible) continue;

        // Check if image is loaded
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
        const complete = await img.evaluate((el: HTMLImageElement) => el.complete);

        const box = await img.boundingBox();
        const displayWidth = box?.width || 0;
        const displayHeight = box?.height || 0;

        const loaded = complete && naturalWidth > 0 && naturalHeight > 0;

        console.log(`📷 Image ${i + 1}:`);
        console.log(`   Src: ${src.substring(0, 60)}${src.length > 60 ? '...' : ''}`);
        console.log(`   Alt: ${alt || '(no alt text)'}`);
        console.log(`   Natural size: ${naturalWidth}x${naturalHeight}`);
        console.log(`   Display size: ${Math.round(displayWidth)}x${Math.round(displayHeight)}`);
        console.log(`   Loaded: ${loaded ? '✅' : '❌'}`);
        console.log(`   Visible: ${isVisible ? '✅' : '❌'}\n`);

        let issue = undefined;
        if (!loaded) issue = 'Failed to load';
        if (naturalWidth === 0) issue = 'Image has 0 width';
        if (!alt || alt.trim() === '') issue = 'Missing alt text';

        imageResults.push({
          page: 'Homepage',
          src,
          alt,
          loaded,
          naturalWidth,
          naturalHeight,
          displayWidth,
          displayHeight,
          visible: isVisible,
          issue
        });

      } catch (error) {
        console.log(`   ⚠️ Error checking image: ${error.message}\n`);
      }
    }

    // Check main layout elements
    console.log('\n📐 Testing layout elements...\n');

    const layoutElements = [
      { selector: 'header', name: 'Header' },
      { selector: 'nav', name: 'Navigation' },
      { selector: 'main', name: 'Main content' },
      { selector: 'footer', name: 'Footer' }
    ];

    for (const element of layoutElements) {
      try {
        const el = page.locator(element.selector).first();
        const count = await page.locator(element.selector).count();

        if (count === 0) {
          console.log(`⚠️  ${element.name}: Not found`);
          layoutResults.push({
            page: 'Homepage',
            element: element.name,
            visible: false,
            width: 0,
            height: 0,
            position: { x: 0, y: 0 },
            issue: 'Element not found'
          });
          continue;
        }

        const isVisible = await el.isVisible();
        const box = await el.boundingBox();

        console.log(`📦 ${element.name}:`);
        console.log(`   Visible: ${isVisible ? '✅' : '❌'}`);
        console.log(`   Size: ${Math.round(box?.width || 0)}x${Math.round(box?.height || 0)}`);
        console.log(`   Position: (${Math.round(box?.x || 0)}, ${Math.round(box?.y || 0)})\n`);

        layoutResults.push({
          page: 'Homepage',
          element: element.name,
          visible: isVisible,
          width: box?.width || 0,
          height: box?.height || 0,
          position: { x: box?.x || 0, y: box?.y || 0 },
          issue: !isVisible ? 'Not visible' : undefined
        });

      } catch (error) {
        console.log(`   ⚠️ Error: ${error.message}\n`);
      }
    }
  });

  test('2. Rooms page - Room card images', async ({ page }) => {
    console.log('\n🏘️  ===== ROOMS PAGE VISUAL TEST =====\n');

    await page.goto(`${BASE_URL}/rooms`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'test-results/visual-rooms-full.png', fullPage: true });
    console.log('✅ Rooms page screenshot saved\n');

    // Check room card images
    const roomImages = await page.locator('a[href^="/rooms/"] img').all();
    console.log(`📊 Found ${roomImages.length} room card images\n`);

    for (let i = 0; i < Math.min(5, roomImages.length); i++) {
      const img = roomImages[i];
      try {
        const src = await img.getAttribute('src') || '';
        const alt = await img.getAttribute('alt') || '';

        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
        const complete = await img.evaluate((el: HTMLImageElement) => el.complete);
        const box = await img.boundingBox();

        const loaded = complete && naturalWidth > 0;

        console.log(`📷 Room Image ${i + 1}:`);
        console.log(`   Src: ${src.substring(0, 60)}${src.length > 60 ? '...' : ''}`);
        console.log(`   Natural: ${naturalWidth}x${naturalHeight}`);
        console.log(`   Display: ${Math.round(box?.width || 0)}x${Math.round(box?.height || 0)}`);
        console.log(`   Status: ${loaded ? '✅ Loaded' : '❌ Failed'}\n`);

        imageResults.push({
          page: 'Rooms List',
          src,
          alt,
          loaded,
          naturalWidth,
          naturalHeight,
          displayWidth: box?.width || 0,
          displayHeight: box?.height || 0,
          visible: true,
          issue: !loaded ? 'Failed to load' : undefined
        });

      } catch (error) {
        console.log(`   ⚠️ Error: ${error.message}\n`);
      }
    }

    // Check for broken images
    console.log('🔍 Checking for broken images...\n');
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
      return imgs
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => ({
          src: img.src,
          alt: img.alt
        }));
    });

    if (brokenImages.length > 0) {
      console.log(`⚠️  Found ${brokenImages.length} broken images:`);
      brokenImages.forEach(img => {
        console.log(`   - ${img.src}`);
      });
    } else {
      console.log('✅ No broken images found');
    }
  });

  test('3. Room detail page - Gallery and images', async ({ page }) => {
    console.log('\n🏠 ===== ROOM DETAIL PAGE VISUAL TEST =====\n');

    await page.goto(`${BASE_URL}/rooms/${ROOM_ID}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'test-results/visual-room-detail.png', fullPage: true });
    console.log('✅ Room detail screenshot saved\n');

    // Check all images on room detail page
    const images = await page.locator('img').all();
    console.log(`📊 Found ${images.length} images on room detail page\n`);

    let loadedCount = 0;
    let failedCount = 0;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        const src = await img.getAttribute('src') || '';
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        const complete = await img.evaluate((el: HTMLImageElement) => el.complete);
        const isVisible = await img.isVisible();

        if (!isVisible) continue;

        const loaded = complete && naturalWidth > 0;

        if (loaded) {
          loadedCount++;
          console.log(`✅ Image ${i + 1}: Loaded (${naturalWidth}px wide)`);
        } else {
          failedCount++;
          console.log(`❌ Image ${i + 1}: Failed to load`);
          console.log(`   Src: ${src}`);
        }

      } catch (error) {
        failedCount++;
        console.log(`❌ Image ${i + 1}: Error - ${error.message}`);
      }
    }

    console.log(`\n📊 Summary: ${loadedCount} loaded, ${failedCount} failed\n`);

    expect(failedCount).toBe(0);
  });

  test('4. Booking page - Form layout and images', async ({ page }) => {
    console.log('\n📝 ===== BOOKING PAGE VISUAL TEST =====\n');

    await page.goto(`${BASE_URL}/rooms/${ROOM_ID}/book`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take screenshots at different scroll positions
    await page.screenshot({ path: 'test-results/visual-booking-top.png' });
    console.log('✅ Booking page (top) screenshot saved');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/visual-booking-middle.png' });
    console.log('✅ Booking page (middle) screenshot saved');

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Check form layout
    console.log('\n📐 Checking form layout...\n');

    const formElements = [
      { selector: 'form', name: 'Form container' },
      { selector: 'input[name="guest_name"]', name: 'Name input' },
      { selector: 'input[name="guest_email"]', name: 'Email input' },
      { selector: 'input[name="guest_phone"]', name: 'Phone input' },
      { selector: 'button[type="submit"]', name: 'Submit button' }
    ];

    let allVisible = true;

    for (const element of formElements) {
      try {
        const el = page.locator(element.selector).first();
        const isVisible = await el.isVisible();
        const box = await el.boundingBox();

        console.log(`📦 ${element.name}:`);
        console.log(`   Visible: ${isVisible ? '✅' : '❌'}`);
        console.log(`   Size: ${Math.round(box?.width || 0)}x${Math.round(box?.height || 0)}`);
        console.log(`   Position: y=${Math.round(box?.y || 0)}\n`);

        if (!isVisible) allVisible = false;

        layoutResults.push({
          page: 'Booking Form',
          element: element.name,
          visible: isVisible,
          width: box?.width || 0,
          height: box?.height || 0,
          position: { x: box?.x || 0, y: box?.y || 0 },
          issue: !isVisible ? 'Not visible' : undefined
        });

      } catch (error) {
        allVisible = false;
        console.log(`   ⚠️ Error: ${error.message}\n`);
      }
    }

    expect(allVisible).toBeTruthy();
  });

  test('5. Mobile viewport - Responsive images', async ({ page }) => {
    console.log('\n📱 ===== MOBILE VISUAL TEST =====\n');

    await page.setViewportSize({ width: 375, height: 667 });

    const pages = [
      { url: BASE_URL, name: 'Homepage' },
      { url: `${BASE_URL}/rooms`, name: 'Rooms' },
      { url: `${BASE_URL}/rooms/${ROOM_ID}`, name: 'Room Detail' },
      { url: `${BASE_URL}/rooms/${ROOM_ID}/book`, name: 'Booking' }
    ];

    for (const pageInfo of pages) {
      console.log(`\n📄 Testing ${pageInfo.name} (mobile)...\n`);

      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const screenshotName = pageInfo.name.toLowerCase().replace(' ', '-');
      await page.screenshot({
        path: `test-results/visual-mobile-${screenshotName}.png`,
        fullPage: true
      });
      console.log(`✅ Mobile screenshot saved: ${screenshotName}`);

      // Check if images are responsive
      const images = await page.locator('img').all();
      let responsiveCount = 0;
      let fixedCount = 0;

      for (const img of images) {
        const isVisible = await img.isVisible();
        if (!isVisible) continue;

        const box = await img.boundingBox();
        const width = box?.width || 0;

        // Check if image fits within mobile viewport (375px)
        if (width <= 375) {
          responsiveCount++;
        } else {
          fixedCount++;
          const src = await img.getAttribute('src');
          console.log(`⚠️  Image may overflow: ${width}px wide`);
          console.log(`   Src: ${src?.substring(0, 60)}\n`);
        }
      }

      console.log(`📊 ${pageInfo.name}: ${responsiveCount} responsive, ${fixedCount} may overflow\n`);
    }
  });

  test('6. Check for console errors and network issues', async ({ page }) => {
    console.log('\n🔍 ===== ERROR DETECTION TEST =====\n');

    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];

    // Listen to console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Listen to network failures
    page.on('response', response => {
      if (!response.ok() && response.url().match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
        networkErrors.push(`${response.status()} ${response.url()}`);
      }
    });

    // Visit all main pages
    const pages = [
      BASE_URL,
      `${BASE_URL}/rooms`,
      `${BASE_URL}/rooms/${ROOM_ID}`,
      `${BASE_URL}/rooms/${ROOM_ID}/book`
    ];

    for (const url of pages) {
      console.log(`🔍 Checking ${url}...`);
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
    }

    console.log('\n📊 Error Summary:\n');
    console.log(`Console errors: ${consoleErrors.length}`);
    console.log(`Network errors (images): ${networkErrors.length}\n`);

    if (consoleErrors.length > 0) {
      console.log('🔴 Console Errors:');
      consoleErrors.slice(0, 5).forEach(err => {
        console.log(`   - ${err.substring(0, 100)}`);
      });
      console.log('');
    }

    if (networkErrors.length > 0) {
      console.log('🔴 Network Errors (Failed Images):');
      networkErrors.forEach(err => {
        console.log(`   - ${err}`);
      });
      console.log('');
    }

    if (consoleErrors.length === 0 && networkErrors.length === 0) {
      console.log('✅ No errors detected!\n');
    }
  });

  test('7. Generate visual test report', async () => {
    console.log('\n\n📊 ===== VISUAL TEST REPORT =====\n');

    const totalImages = imageResults.length;
    const loadedImages = imageResults.filter(r => r.loaded).length;
    const failedImages = imageResults.filter(r => !r.loaded).length;
    const imagesWithIssues = imageResults.filter(r => r.issue).length;

    console.log('📸 IMAGE ANALYSIS:\n');
    console.log(`   Total images tested: ${totalImages}`);
    console.log(`   Successfully loaded: ${loadedImages} (${Math.round(loadedImages/totalImages*100)}%)`);
    console.log(`   Failed to load: ${failedImages}`);
    console.log(`   With issues: ${imagesWithIssues}\n`);

    if (imagesWithIssues > 0) {
      console.log('⚠️  Images with issues:\n');
      imageResults
        .filter(r => r.issue)
        .slice(0, 10)
        .forEach(r => {
          console.log(`   [${r.page}] ${r.issue}`);
          console.log(`   Src: ${r.src.substring(0, 60)}${r.src.length > 60 ? '...' : ''}\n`);
        });
    }

    console.log('\n📐 LAYOUT ANALYSIS:\n');
    const totalElements = layoutResults.length;
    const visibleElements = layoutResults.filter(r => r.visible).length;
    const layoutIssues = layoutResults.filter(r => r.issue).length;

    console.log(`   Total elements tested: ${totalElements}`);
    console.log(`   Visible elements: ${visibleElements} (${Math.round(visibleElements/totalElements*100)}%)`);
    console.log(`   Layout issues: ${layoutIssues}\n`);

    if (layoutIssues > 0) {
      console.log('⚠️  Layout issues:\n');
      layoutResults
        .filter(r => r.issue)
        .forEach(r => {
          console.log(`   [${r.page}] ${r.element}: ${r.issue}\n`);
        });
    }

    console.log('\n🎯 FINAL VERDICT:\n');

    const imageScore = (loadedImages / totalImages) * 100;
    const layoutScore = (visibleElements / totalElements) * 100;
    const overallScore = (imageScore + layoutScore) / 2;

    console.log(`   Image Loading: ${imageScore.toFixed(1)}%`);
    console.log(`   Layout Quality: ${layoutScore.toFixed(1)}%`);
    console.log(`   Overall Score: ${overallScore.toFixed(1)}%\n`);

    if (overallScore >= 95) {
      console.log('✅ EXCELLENT - All visual elements display correctly!');
    } else if (overallScore >= 85) {
      console.log('✅ GOOD - Minor issues detected, but overall quality is good');
    } else if (overallScore >= 70) {
      console.log('⚠️  FAIR - Some visual issues need attention');
    } else {
      console.log('❌ POOR - Significant visual issues detected');
    }

    console.log('\n📁 Screenshots saved in: test-results/\n');

    // Assert minimum quality thresholds
    expect(imageScore).toBeGreaterThan(80);
    expect(layoutScore).toBeGreaterThan(90);
  });
});
