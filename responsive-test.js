const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Define device profiles to test
const deviceProfiles = [
  // Mobile Devices
  {
    name: 'iPhone 12',
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPhone SE',
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'Samsung Galaxy S21',
    viewport: { width: 360, height: 800 },
    userAgent: 'Mozilla/5.0 (Linux; Android 11; Samsung Galaxy S21) AppleWebKit/537.36'
  },
  // Tablets
  {
    name: 'iPad',
    viewport: { width: 768, height: 1024 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    name: 'iPad Air',
    viewport: { width: 820, height: 1180 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  // Desktop
  {
    name: 'Desktop 1920',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    name: 'Desktop 1366',
    viewport: { width: 1366, height: 768 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    name: 'Desktop 1024',
    viewport: { width: 1024, height: 768 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
];

// Pages to test
const pagesToTest = [
  { url: 'https://oso-v03.vercel.app', name: 'home' },
  { url: 'https://oso-v03.vercel.app/about', name: 'about' },
  { url: 'https://oso-v03.vercel.app/rooms', name: 'rooms' },
  { url: 'https://oso-v03.vercel.app/special/swimming-pool', name: 'swimming-pool' },
  { url: 'https://oso-v03.vercel.app/travel', name: 'travel' },
  { url: 'https://oso-v03.vercel.app/location', name: 'location' },
];

async function runResponsiveTests() {
  const browser = await chromium.launch();
  const results = {
    timestamp: new Date().toISOString(),
    devices: [],
    issues: []
  };

  try {
    console.log('🚀 Starting Responsive Test Suite\n');
    console.log(`Testing ${deviceProfiles.length} device profiles`);
    console.log(`Testing ${pagesToTest.length} pages\n`);

    // Create screenshots directory if it doesn't exist
    const screenshotDir = path.join(process.cwd(), 'responsive-screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    for (const device of deviceProfiles) {
      console.log(`\n📱 Testing: ${device.name} (${device.viewport.width}x${device.viewport.height})`);
      const deviceResults = {
        name: device.name,
        viewport: device.viewport,
        pages: []
      };

      const context = await browser.newContext({
        viewport: device.viewport,
        userAgent: device.userAgent
      });
      const page = await context.newPage();

      for (const testPage of pagesToTest) {
        try {
          console.log(`  ├─ Testing ${testPage.name}...`);
          await page.goto(testPage.url, { waitUntil: 'networkidle' });

          // Wait for images to load
          await page.waitForTimeout(1000);

          // Check for layout issues
          const layoutCheck = await page.evaluate(() => {
            const body = document.body;
            const html = document.documentElement;

            return {
              scrollWidth: Math.max(body.scrollWidth, html.scrollWidth),
              clientWidth: Math.max(body.clientWidth, html.clientWidth),
              hasHorizontalScroll: Math.max(body.scrollWidth, html.scrollWidth) > Math.max(body.clientWidth, html.clientWidth) + 10,
              viewportWidth: window.innerWidth,
              viewportHeight: window.innerHeight
            };
          });

          // Take screenshot
          const screenshotPath = path.join(
            screenshotDir,
            `${device.name.replace(/\s+/g, '-').toLowerCase()}-${testPage.name}.png`
          );
          await page.screenshot({ path: screenshotPath, fullPage: true });

          const pageResult = {
            name: testPage.name,
            url: testPage.url,
            status: 'success',
            layoutCheck: layoutCheck,
            screenshot: path.relative(process.cwd(), screenshotPath)
          };

          // Check for horizontal scroll issues
          if (layoutCheck.hasHorizontalScroll) {
            pageResult.warning = `Horizontal scroll detected: ${layoutCheck.scrollWidth}px > ${layoutCheck.clientWidth}px`;
            results.issues.push({
              device: device.name,
              page: testPage.name,
              issue: pageResult.warning
            });
          }

          deviceResults.pages.push(pageResult);
          console.log(`  │  ✓ Screenshot saved`);
        } catch (error) {
          deviceResults.pages.push({
            name: testPage.name,
            url: testPage.url,
            status: 'error',
            error: error.message
          });
          results.issues.push({
            device: device.name,
            page: testPage.name,
            issue: `Error: ${error.message}`
          });
          console.log(`  │  ✗ Error: ${error.message}`);
        }
      }

      await context.close();
      results.devices.push(deviceResults);
    }

    // Generate summary
    console.log('\n\n' + '='.repeat(60));
    console.log('📊 RESPONSIVE TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`\n✓ Total tests completed: ${pagesToTest.length * deviceProfiles.length}`);
    console.log(`⚠ Issues found: ${results.issues.length}`);

    if (results.issues.length > 0) {
      console.log('\n⚠ Issues:');
      results.issues.forEach(issue => {
        console.log(`  • [${issue.device}] ${issue.page}: ${issue.issue}`);
      });
    }

    // Save results
    const reportPath = path.join(process.cwd(), 'responsive-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n✓ Report saved to: responsive-test-report.json`);
    console.log(`✓ Screenshots saved to: responsive-screenshots/`);

  } finally {
    await browser.close();
  }
}

runResponsiveTests().catch(err => {
  console.error('Test suite error:', err);
  process.exit(1);
});
