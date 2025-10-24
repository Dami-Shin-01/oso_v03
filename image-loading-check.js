const { chromium } = require('playwright');
const fs = require('fs');

// 모든 테스트 페이지
const pagesToTest = [
  { url: 'https://oso-v03.vercel.app', name: 'home' },
  { url: 'https://oso-v03.vercel.app/about', name: 'about' },
  { url: 'https://oso-v03.vercel.app/rooms', name: 'rooms' },
  { url: 'https://oso-v03.vercel.app/rooms/26262', name: 'rooms-detail-1' },
  { url: 'https://oso-v03.vercel.app/rooms/26265', name: 'rooms-detail-2' },
  { url: 'https://oso-v03.vercel.app/special/swimming-pool', name: 'special-swimming-pool' },
  { url: 'https://oso-v03.vercel.app/special/barbecue', name: 'special-barbecue' },
  { url: 'https://oso-v03.vercel.app/special/cafe', name: 'special-cafe' },
  { url: 'https://oso-v03.vercel.app/special/playground', name: 'special-playground' },
  { url: 'https://oso-v03.vercel.app/special/sports', name: 'special-sports' },
  { url: 'https://oso-v03.vercel.app/special/trail', name: 'special-trail' },
  { url: 'https://oso-v03.vercel.app/travel', name: 'travel' },
  { url: 'https://oso-v03.vercel.app/view', name: 'view' },
  { url: 'https://oso-v03.vercel.app/location', name: 'location' },
  { url: 'https://oso-v03.vercel.app/reservation', name: 'reservation' },
];

async function checkImageLoading() {
  const browser = await chromium.launch();
  const results = {
    timestamp: new Date().toISOString(),
    pages: [],
    summary: {
      totalPages: pagesToTest.length,
      pagesWithErrors: 0,
      totalErrors: 0,
      errorTypes: {}
    }
  };

  console.log('🚀 Starting Image Loading Check\n');
  console.log(`Total pages to test: ${pagesToTest.length}\n`);
  console.log('═'.repeat(70) + '\n');

  for (const pageTest of pagesToTest) {
    const context = await browser.newContext();
    const page = await context.newPage();

    // 콘솔 메시지 수집
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleErrors.push({
          type: msg.type(),
          text: msg.text(),
          location: msg.location()
        });
      }
    });

    page.on('pageerror', error => {
      pageErrors.push({
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    });

    try {
      console.log(`📄 Testing: ${pageTest.name}`);
      console.log(`   URL: ${pageTest.url}`);

      // 페이지 로드
      await page.goto(pageTest.url, { waitUntil: 'networkidle', timeout: 30000 });

      // 5초 대기 (이미지 로드)
      await page.waitForTimeout(5000);

      // Next.js Image 컴포넌트 확인
      const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          currentSrc: img.currentSrc,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          visible: img.offsetParent !== null
        }));
      });

      // 배경 이미지 확인
      const backgroundImages = await page.evaluate(() => {
        const elements = [];
        document.querySelectorAll('[style*="background"]').forEach(el => {
          const bgImage = window.getComputedStyle(el).backgroundImage;
          if (bgImage && bgImage !== 'none') {
            elements.push({
              selector: el.tagName,
              class: el.className,
              backgroundImage: bgImage,
              ariaLabel: el.getAttribute('aria-label'),
              visible: el.offsetParent !== null,
              width: el.offsetWidth,
              height: el.offsetHeight
            });
          }
        });
        return elements;
      });

      // 모든 이미지 로드 상태 확인
      const allImagesLoaded = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        return images.every(img => img.complete && img.naturalHeight !== 0);
      });

      const pageResult = {
        page: pageTest.name,
        url: pageTest.url,
        status: 'success',
        imageStats: {
          totalImages: images.length,
          loadedImages: images.filter(img => img.complete && img.naturalWidth > 0).length,
          visibleImages: images.filter(img => img.visible).length,
          allImagesLoaded: allImagesLoaded
        },
        backgroundImageCount: backgroundImages.length,
        images: images,
        backgroundImages: backgroundImages,
        consoleErrors: consoleErrors,
        pageErrors: pageErrors,
        errorCount: consoleErrors.length + pageErrors.length
      };

      results.pages.push(pageResult);

      if (pageResult.errorCount > 0) {
        results.summary.pagesWithErrors++;
        results.summary.totalErrors += pageResult.errorCount;
      }

      // 에러 타입 카운팅
      consoleErrors.forEach(err => {
        results.summary.errorTypes[err.type] = (results.summary.errorTypes[err.type] || 0) + 1;
      });

      console.log(`   ✓ ${images.length} images found`);
      console.log(`   ✓ ${backgroundImages.length} background images found`);
      console.log(`   ⚠ ${consoleErrors.length} console errors`);
      console.log(`   ⚠ ${pageErrors.length} page errors`);

      if (consoleErrors.length > 0) {
        consoleErrors.forEach(err => {
          console.log(`     └─ [${err.type}] ${err.text.substring(0, 60)}`);
        });
      }
      if (pageErrors.length > 0) {
        pageErrors.forEach(err => {
          console.log(`     └─ [Error] ${err.message.substring(0, 60)}`);
        });
      }

      console.log();

    } catch (error) {
      console.log(`   ✗ Error: ${error.message}`);
      results.pages.push({
        page: pageTest.name,
        url: pageTest.url,
        status: 'error',
        error: error.message
      });
      results.summary.pagesWithErrors++;
      results.summary.totalErrors++;
    } finally {
      await context.close();
    }
  }

  console.log('═'.repeat(70) + '\n');
  console.log('📊 SUMMARY\n');
  console.log(`Total pages tested: ${results.summary.totalPages}`);
  console.log(`Pages with errors: ${results.summary.pagesWithErrors}`);
  console.log(`Total console/page errors: ${results.summary.totalErrors}`);
  console.log(`\nError types found:`);
  Object.entries(results.summary.errorTypes).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });

  // 에러가 있는 페이지만 출력
  console.log('\n📋 Pages with Errors:\n');
  const pagesWithErrors = results.pages.filter(p => p.errorCount > 0);

  if (pagesWithErrors.length === 0) {
    console.log('✅ No console errors found on any page!\n');
  } else {
    pagesWithErrors.forEach(pageResult => {
      console.log(`\n[${pageResult.page}]`);

      if (pageResult.consoleErrors && pageResult.consoleErrors.length > 0) {
        console.log('Console Errors:');
        pageResult.consoleErrors.forEach(err => {
          console.log(`  - [${err.type}] ${err.text}`);
          if (err.location) {
            console.log(`    at ${err.location.url}:${err.location.lineNumber}:${err.location.columnNumber}`);
          }
        });
      }

      if (pageResult.pageErrors && pageResult.pageErrors.length > 0) {
        console.log('Page Errors:');
        pageResult.pageErrors.forEach(err => {
          console.log(`  - [${err.name}] ${err.message}`);
        });
      }
    });
  }

  // 상세 데이터 저장
  const reportPath = 'image-loading-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Detailed report saved to: ${reportPath}`);

  await browser.close();
}

checkImageLoading().catch(err => {
  console.error('Check failed:', err);
  process.exit(1);
});
