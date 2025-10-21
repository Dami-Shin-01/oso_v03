const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('페이지 로드 중: https://humantown.co.kr/index.html');
    await page.goto('https://humantown.co.kr/index.html', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    console.log('페이지 로드 완료. 스크린샷 저장 중...');
    await page.screenshot({
      path: 'humantown-screenshot.png',
      fullPage: true
    });
    console.log('스크린샷 저장 완료: humantown-screenshot.png');

    console.log('CSS 정보 추출 중...');
    const results = await page.evaluate(() => {
      const data = {
        cssFiles: [],
        inlineStyles: [],
        computedStyles: {},
        colors: new Set(),
        fonts: new Set(),
        fontSizes: new Set(),
        buttons: []
      };

      // CSS 파일 URL
      document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        data.cssFiles.push(link.href);
      });

      // 인라인 스타일
      document.querySelectorAll('style').forEach(style => {
        data.inlineStyles.push(style.textContent);
      });

      // 헤더 스타일
      const header = document.querySelector('header') || document.querySelector('.header');
      if (header) {
        const computed = window.getComputedStyle(header);
        data.computedStyles.header = {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          height: computed.height,
          padding: computed.padding,
          display: computed.display,
          position: computed.position,
        };
      }

      // 버튼 스타일 (실시간예약 버튼 등)
      document.querySelectorAll('button, .button, a[href*="reservation"], .btn').forEach((btn, i) => {
        const computed = window.getComputedStyle(btn);
        data.buttons.push({
          index: i,
          text: btn.textContent.trim().substring(0, 30),
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          padding: computed.padding,
          borderRadius: computed.borderRadius,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          border: computed.border,
        });
      });

      // 헤딩 스타일
      ['h1', 'h2', 'h3'].forEach(tag => {
        const el = document.querySelector(tag);
        if (el) {
          const computed = window.getComputedStyle(el);
          data.computedStyles[tag] = {
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            color: computed.color,
            lineHeight: computed.lineHeight,
            fontFamily: computed.fontFamily,
          };
        }
      });

      // 색상 수집 (상위 100개 요소만)
      Array.from(document.querySelectorAll('*')).slice(0, 100).forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.color && computed.color !== 'rgba(0, 0, 0, 0)') {
          data.colors.add(computed.color);
        }
        if (computed.backgroundColor && computed.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          data.colors.add(computed.backgroundColor);
        }
        if (computed.fontFamily) {
          data.fonts.add(computed.fontFamily);
        }
        if (computed.fontSize) {
          data.fontSizes.add(computed.fontSize);
        }
      });

      // Set을 Array로 변환
      data.colors = Array.from(data.colors);
      data.fonts = Array.from(data.fonts);
      data.fontSizes = Array.from(data.fontSizes);

      return data;
    });

    console.log('CSS 파일 다운로드 시도 중...');
    const cssContents = [];

    for (const cssUrl of results.cssFiles) {
      try {
        console.log(`다운로드 중: ${cssUrl}`);
        const response = await page.goto(cssUrl, { timeout: 30000 });
        if (response && response.ok()) {
          const content = await response.text();
          cssContents.push({
            url: cssUrl,
            content: content,
            size: content.length
          });
          console.log(`다운로드 성공: ${cssUrl} (${content.length} bytes)`);
        }
      } catch (error) {
        console.log(`다운로드 실패: ${cssUrl} - ${error.message}`);
        cssContents.push({
          url: cssUrl,
          error: error.message
        });
      }
    }

    results.cssFileContents = cssContents;

    console.log('결과를 JSON 파일로 저장 중...');
    const outputPath = path.join(process.cwd(), 'extracted-styles.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify(results, null, 2),
      'utf8'
    );
    console.log(`저장 완료: ${outputPath}`);

    // 요약 출력
    console.log('\n===== 추출 요약 =====');
    console.log(`CSS 파일: ${results.cssFiles.length}개`);
    console.log(`인라인 스타일 블록: ${results.inlineStyles.length}개`);
    console.log(`추출된 색상: ${results.colors.length}개`);
    console.log(`추출된 폰트: ${results.fonts.length}개`);
    console.log(`추출된 폰트 크기: ${results.fontSizes.length}개`);
    console.log(`추출된 버튼: ${results.buttons.length}개`);
    console.log(`다운로드 성공한 CSS 파일: ${cssContents.filter(c => !c.error).length}/${cssContents.length}개`);

  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  } finally {
    await browser.close();
  }
})();
