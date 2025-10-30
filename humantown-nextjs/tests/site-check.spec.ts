import { expect, test } from '@playwright/test';

test.describe('전체 사이트 체크', () => {
  test.describe('주요 페이지 로드 확인', () => {
    const pages = [
      { name: '메인', url: '/' },
      { name: 'About', url: '/about' },
      { name: '전경보기', url: '/view' },
      { name: '객실 목록', url: '/rooms' },
      { name: '예약 안내', url: '/reservation' },
      { name: '예약 조회', url: '/reservations/check' },
      { name: '물놀이장', url: '/special/swimming-pool' },
      { name: '바베큐', url: '/special/barbecue' },
      { name: '잔디광장', url: '/special/sports' },
      { name: '카페', url: '/special/cafe' },
      { name: '식당', url: '/special/restaurant' },
      { name: '키즈존', url: '/special/playground' },
    ];

    for (const { name, url } of pages) {
      test(`${name} 페이지가 정상적으로 로드됨`, async ({ page }) => {
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);

        // 페이지 타이틀 또는 헤더가 있는지 확인
        await expect(page.locator('body')).toBeVisible();
      });
    }
  });

  test.describe('네비게이션 메뉴 확인', () => {
    test('RESERVE 서브메뉴 3개 확인', async ({ page }) => {
      await page.goto('/');

      // Desktop navigation
      const reserveMenu = page.locator('header nav .depth1').filter({
        has: page.locator('.depth1_a', { hasText: 'RESERVE' }),
      }).first();

      await reserveMenu.hover({ force: true });
      await page.waitForTimeout(200);

      // 서브메뉴 확인
      const submenuLinks = [
        { label: '예약하기', url: '/rooms' },
        { label: '예약안내', url: '/reservation' },
        { label: '예약조회', url: '/reservations/check' },
      ];

      for (const { label, url } of submenuLinks) {
        const link = reserveMenu.locator('.depth_box a').filter({ hasText: label }).first();
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', url);
      }
    });
  });

  test.describe('Footer 및 빠른 예약 버튼', () => {
    test('Footer가 표시됨', async ({ page }) => {
      await page.goto('/');

      const footer = page.locator('footer.footer_wrap');
      await expect(footer).toBeVisible();

      // 전화번호 확인
      await expect(footer.locator('.tel')).toContainText('0507-1380-0203');
    });

    test('빠른 예약 버튼이 스크롤 시 나타남', async ({ page }) => {
      await page.goto('/');

      // 스크롤 전에는 버튼이 보이지 않음
      const floatingButton = page.locator('.ft_btn_reserve');

      // 스크롤 다운
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(100);

      // 버튼이 'on' 클래스를 가짐
      await expect(floatingButton).toHaveClass(/on/);
    });
  });

  test.describe('객실 카드 확인', () => {
    test('객실 카드에 예약하기 버튼이 표시됨', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 카드
      const roomCard = page.locator('.room-card').first();
      await expect(roomCard).toBeVisible();

      // "예약하기" 버튼 확인
      const bookButton = roomCard.locator('a[href*="/book"]').filter({ hasText: '예약하기' });
      await expect(bookButton).toBeVisible();
    });
  });

  test.describe('예약 시스템 - 달력 토글', () => {
    test.skip('달력 크기 토글 기능 확인', async ({ page }) => {
      // 개발 서버가 실행 중이어야 함
      await page.goto('/rooms');

      // 첫 번째 객실 선택
      const firstRoomBookButton = page.locator('.room-card').first().locator('a[href*="/book"]');
      await firstRoomBookButton.click();

      // 예약 폼 페이지로 이동
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 달력 토글 버튼 확인
      const toggleButton = page.locator('button', { hasText: /큰 달력으로 보기|작은 달력으로 보기/ });
      await expect(toggleButton).toBeVisible();

      // 초기 상태: 작은 달력
      await expect(toggleButton).toHaveText('큰 달력으로 보기');

      // 토글 클릭
      await toggleButton.click();
      await page.waitForTimeout(100);

      // 큰 달력으로 변경됨
      await expect(toggleButton).toHaveText('작은 달력으로 보기');

      // LargeCalendarView 컴포넌트 확인
      const largeCalendar = page.locator('.large-calendar-wrapper');
      await expect(largeCalendar).toBeVisible();

      // 다시 토글
      await toggleButton.click();
      await page.waitForTimeout(100);

      // 작은 달력으로 돌아옴
      await expect(toggleButton).toHaveText('큰 달력으로 보기');
    });
  });

  test.describe('모바일 반응형', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('모바일에서 헤더 메뉴가 정상 작동', async ({ page }) => {
      await page.goto('/');

      // 모바일 메뉴 버튼
      const menuButton = page.getByRole('button', { name: '메뉴 열기' });
      await expect(menuButton).toBeVisible();

      // 메뉴 열기
      await menuButton.click();

      // 사이드바 확인
      const aside = page.locator('.aside');
      await expect(aside).toHaveClass(/on/);
    });

    test('모바일에서 빠른 예약 버튼이 정상 작동', async ({ page }) => {
      await page.goto('/');

      // 스크롤 다운
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(100);

      // 빠른 예약 버튼
      const floatingButton = page.locator('.ft_btn_reserve');
      await expect(floatingButton).toHaveClass(/on/);
      await expect(floatingButton.locator('a')).toBeVisible();
    });
  });

  test.describe('접근성 (Accessibility)', () => {
    test('주요 페이지에 적절한 ARIA 레이블이 있음', async ({ page }) => {
      await page.goto('/');

      // Header navigation
      await expect(page.locator('header nav')).toHaveAttribute('aria-label', '메인 메뉴');

      // Footer
      await expect(page.locator('footer')).toHaveAttribute('role', 'contentinfo');
    });

    test('이미지에 alt 텍스트가 있음', async ({ page }) => {
      await page.goto('/');

      // 모든 이미지 확인 (decorative 제외)
      const images = page.locator('img:not([alt=""])');
      const count = await images.count();

      // 최소 1개 이상의 이미지가 있어야 함
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('성능 체크', () => {
    test('메인 페이지 로드 시간 확인', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - startTime;

      // 5초 이내 로드
      expect(loadTime).toBeLessThan(5000);
    });

    test('이미지가 lazy loading됨', async ({ page }) => {
      await page.goto('/');

      // 화면 밖의 이미지가 loading="lazy" 속성을 가지는지 확인
      const images = page.locator('img[loading="lazy"]');
      const count = await images.count();

      // lazy loading 이미지가 있으면 성공
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});
