const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://oso-v03.vercel.app';

// 테스트할 페이지 목록
const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'rooms', path: '/rooms' },
  { name: 'rooms-detail-1', path: '/rooms/26262' },
  { name: 'rooms-detail-2', path: '/rooms/26265' },
  { name: 'swimming-pool', path: '/special/swimming-pool' },
  { name: 'cafe', path: '/special/cafe' },
  { name: 'playground', path: '/special/playground' },
  { name: 'sports', path: '/special/sports' },
  { name: 'barbecue', path: '/special/barbecue' },
  { name: 'trail', path: '/special/trail' },
  { name: 'travel', path: '/travel' },
  { name: 'location', path: '/location' },
  { name: 'view', path: '/view' },
  { name: 'reservation', path: '/reservation' },
];

async function checkImageLoading() {
  const browser = await chromium.launch();
  const results = {
    timestamp: new Date().toISOString(),
    totalPages: pages.length,
    pagesChecked: 0,
    totalErrors: 0,
    errorDetails: [],
    pageResults: []
  };

  try {
    for (const page of pages) {
      console.log(`\n📄 Checking: ${page.name} (${page.path})`);

      const context = await browser.newContext();
      const pageObj = await context.newPage();

      // 모든 에러 메시지 수집
      const errors = [];
      const warnings = [];
      const failedImages = [];

      pageObj.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        } else if (msg.type() === 'warning') {
          warnings.push(msg.text());
        }
      });

      pageObj.on('response', (response) => {
        // 404 에러 추적
        if (response.status() === 404) {
          const url = response.url();
          if (url.includes('image') || url.includes('photo') || url.includes('unsplash')) {
            failedImages.push({
              url: url,
              status: response.status(),
              timestamp: new Date().toISOString()
            });
          }
        }
      });

      try {
        await pageObj.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle', timeout: 30000 });

        // 이미지 로드 대기
        await pageObj.waitForTimeout(5000);

        // 페이지 내 이미지 통계 수집
        const imageStats = await pageObj.evaluate(() => {
          // Next.js Image 컴포넌트 확인
          const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt,
            complete: img.complete,
            naturalHeight: img.naturalHeight,
            naturalWidth: img.naturalWidth
          }));

          // CSS 배경 이미지 확인
          const backgroundImages = Array.from(document.querySelectorAll('[style*="background"]'))
            .filter(el => window.getComputedStyle(el).backgroundImage)
            .map(el => ({
              url: window.getComputedStyle(el).backgroundImage,
              element: el.tagName
            }));

          return {
            totalImages: images.length,
            loadedImages: images.filter(img => img.complete).length,
            failedImages: images.filter(img => !img.complete).length,
            backgroundImageCount: backgroundImages.length,
            images: images,
            backgroundImages: backgroundImages
          };
        });

        const pageResult = {
          page: page.name,
          path: page.path,
          status: 'success',
          errorCount: errors.length + failedImages.length,
          warningCount: warnings.length,
          errors: errors.length > 0 ? errors : [],
          warnings: warnings.length > 0 ? warnings.slice(0, 3) : [], // 처음 3개만
          failedImageRequests: failedImages,
          imageStats: imageStats,
          timestamp: new Date().toISOString()
        };

        results.pageResults.push(pageResult);
        results.pagesChecked++;
        results.totalErrors += errors.length + failedImages.length;

        if (errors.length > 0 || failedImages.length > 0) {
          results.errorDetails.push({
            page: page.name,
            path: page.path,
            errors: errors,
            failedImages: failedImages
          });
        }

        console.log(`✓ ${page.name}: ${imageStats.loadedImages}/${imageStats.totalImages} 이미지 로드 (에러: ${errors.length + failedImages.length})`);

      } catch (error) {
        const pageResult = {
          page: page.name,
          path: page.path,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        };
        results.pageResults.push(pageResult);
        console.log(`✗ ${page.name}: 페이지 로드 실패 - ${error.message}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  // 결과 저장
  const reportPath = path.join(__dirname, '..', 'image-loading-report-after-fix.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  // 요약 출력
  console.log('\n' + '='.repeat(60));
  console.log('📊 검사 결과 요약');
  console.log('='.repeat(60));
  console.log(`✓ 테스트 페이지: ${results.pagesChecked}/${results.totalPages}`);
  console.log(`✓ 총 에러: ${results.totalErrors}`);
  console.log(`✓ 보고서 저장: ${reportPath}`);
  console.log('='.repeat(60));

  // 에러 페이지 요약
  if (results.errorDetails.length > 0) {
    console.log('\n⚠️ 에러가 발생한 페이지:');
    results.errorDetails.forEach(detail => {
      console.log(`\n  ${detail.page}:`);
      if (detail.failedImages.length > 0) {
        console.log(`    404 실패 이미지: ${detail.failedImages.length}개`);
        detail.failedImages.forEach(img => {
          console.log(`      - ${img.url.substring(0, 80)}...`);
        });
      }
      if (detail.errors.length > 0) {
        console.log(`    에러 메시지: ${detail.errors.length}개`);
        detail.errors.slice(0, 2).forEach(err => {
          console.log(`      - ${err.substring(0, 80)}...`);
        });
      }
    });
  } else {
    console.log('\n✅ 모든 페이지에서 에러 없음!');
  }
}

checkImageLoading().catch(console.error);
