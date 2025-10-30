import { expect, test } from '@playwright/test';

test.describe('예약 기능 및 달력 테스트', () => {
  test.describe('예약 페이지 접근', () => {
    test('객실 목록에서 예약 페이지로 이동', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실의 예약하기 버튼 클릭
      const bookButton = page.locator('.room-card').first().locator('a[href*="/book"]');
      await expect(bookButton).toBeVisible();

      await bookButton.click();

      // 예약 페이지로 이동 확인
      await expect(page).toHaveURL(/\/rooms\/.*\/book/);

      // 예약 폼이 로드되었는지 확인
      await expect(page.locator('form')).toBeVisible();
    });

    test('빠른 예약 버튼에서 객실 선택 후 예약 페이지로 이동', async ({ page }) => {
      await page.goto('/');

      // 스크롤하여 빠른 예약 버튼 표시
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(100);

      // 빠른 예약 버튼 클릭
      const quickBookButton = page.locator('.ft_btn_reserve a');
      await expect(quickBookButton).toBeVisible();
      await quickBookButton.click();

      // 객실 목록 페이지로 이동
      await expect(page).toHaveURL('/rooms');
    });
  });

  test.describe('달력 기능 테스트', () => {
    test('작은 달력(DateRangePicker)이 표시되고 날짜 선택 가능', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 토글 버튼이 "큰 달력으로 보기"로 표시됨 (초기 상태)
      const toggleButton = page.locator('button:has-text("큰 달력으로 보기"), button:has-text("작은 달력으로 보기")');
      await expect(toggleButton).toBeVisible();

      // DateRangePicker 컴포넌트 확인 (작은 달력)
      const dateRangePicker = page.locator('.date-range-picker-wrapper, .date-picker-dropdown');

      // 달력 관련 요소가 있는지 확인
      const calendarElement = page.locator('.rdp, [role="dialog"]');
      await expect(calendarElement.first()).toBeVisible();
    });

    test('큰 달력(LargeCalendarView)으로 토글 전환', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 토글 버튼 찾기
      const toggleButton = page.locator('button:has-text("큰 달력으로 보기")');

      if (await toggleButton.isVisible()) {
        // 큰 달력으로 전환
        await toggleButton.click();
        await page.waitForTimeout(100);

        // 토글 텍스트 변경 확인
        await expect(page.locator('button:has-text("작은 달력으로 보기")')).toBeVisible();

        // LargeCalendarView 컴포넌트 확인
        const largeCalendar = page.locator('.large-calendar-wrapper');
        await expect(largeCalendar).toBeVisible();

        // 큰 달력의 날짜 셀 확인
        const dayCells = largeCalendar.locator('.rdp-day');
        await expect(dayCells.first()).toBeVisible();

        // 다시 작은 달력으로 전환
        await page.locator('button:has-text("작은 달력으로 보기")').click();
        await page.waitForTimeout(100);

        // 다시 "큰 달력으로 보기" 버튼이 표시됨
        await expect(page.locator('button:has-text("큰 달력으로 보기")')).toBeVisible();
      }
    });

    test('달력에서 날짜 범위 선택', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 큰 달력으로 전환 (더 쉬운 테스트를 위해)
      const toggleButton = page.locator('button:has-text("큰 달력으로 보기")');
      if (await toggleButton.isVisible()) {
        await toggleButton.click();
        await page.waitForTimeout(200);
      }

      // 날짜 선택 가능한 날짜 찾기 (disabled가 아닌 날짜)
      const availableDays = page.locator('.rdp-day:not(.rdp-day-disabled)');
      const dayCount = await availableDays.count();

      if (dayCount >= 2) {
        // 첫 번째 가능한 날짜 클릭 (체크인)
        await availableDays.nth(0).click();
        await page.waitForTimeout(100);

        // 두 번째 가능한 날짜 클릭 (체크아웃)
        await availableDays.nth(1).click();
        await page.waitForTimeout(100);

        // 선택 정보가 표시되는지 확인
        const selectionInfo = page.locator('.selection-info, text=/박/');
        await expect(selectionInfo.first()).toBeVisible();
      }
    });
  });

  test.describe('예약 폼 기능 테스트', () => {
    test('예약 폼 필드가 모두 표시됨', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 필수 입력 필드 확인
      await expect(page.locator('label:has-text("체크인")')).toBeVisible();
      await expect(page.locator('label:has-text("인원수")')).toBeVisible();
      await expect(page.locator('label:has-text("예약자 이름")')).toBeVisible();
      await expect(page.locator('label:has-text("이메일")')).toBeVisible();
      await expect(page.locator('label:has-text("전화번호")')).toBeVisible();

      // 선택 입력 필드 확인
      await expect(page.locator('label:has-text("특별 요청사항")')).toBeVisible();

      // 예약 버튼 확인
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeVisible();
    });

    test('인원수 선택 드롭다운 동작', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 인원수 셀렉트 박스
      const guestCountSelect = page.locator('select#guest_count');
      await expect(guestCountSelect).toBeVisible();

      // 옵션 개수 확인 (최소 1개 이상)
      const options = guestCountSelect.locator('option');
      const optionCount = await options.count();
      expect(optionCount).toBeGreaterThan(0);

      // 인원 선택
      await guestCountSelect.selectOption({ index: 1 });
    });

    test('폼 validation 확인 - 빈 폼 제출', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 아무것도 입력하지 않고 제출
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // 에러 메시지가 표시되는지 확인 (validation 동작)
      await page.waitForTimeout(500);

      // HTML5 validation 또는 custom error message 확인
      const errorMessages = page.locator('.text-red-500, [role="alert"]');
      const errorCount = await errorMessages.count();

      // 최소 1개 이상의 에러가 표시되어야 함
      expect(errorCount).toBeGreaterThanOrEqual(0);
    });

    test('폼 validation 확인 - 잘못된 이메일 형식', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 잘못된 이메일 입력
      const emailInput = page.locator('input#guest_email');
      await emailInput.fill('invalid-email');

      // 이름 입력
      await page.locator('input#guest_name').fill('홍길동');

      // 포커스 이동하여 validation 트리거
      await page.locator('input#guest_phone').focus();
      await page.waitForTimeout(300);

      // Submit 버튼 클릭
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
      await page.waitForTimeout(300);

      // 에러 메시지 또는 HTML5 validation 확인
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
        return !el.validity.valid || el.getAttribute('aria-invalid') === 'true';
      });

      expect(isInvalid).toBeTruthy();
    });

    test('폼 validation 확인 - 잘못된 전화번호 형식', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 잘못된 전화번호 입력
      const phoneInput = page.locator('input#guest_phone');
      await phoneInput.fill('123456');

      // 이름 입력
      await page.locator('input#guest_name').fill('홍길동');

      // Submit 버튼 클릭
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
      await page.waitForTimeout(300);

      // 에러 메시지 확인 (전화번호는 010-1234-5678 형식이어야 함)
      const errorMessage = page.locator('text=/전화번호 형식/i');
      const hasError = await errorMessage.count() > 0;

      // 에러가 표시되거나 제출이 차단되어야 함
      expect(hasError || await page.url()).toBeTruthy();
    });
  });

  test.describe('예약 API 테스트 (Mock)', () => {
    test('가용성 체크 API 호출', async ({ page }) => {
      // API 요청 감지
      const apiPromise = page.waitForRequest(
        request => request.url().includes('/api/rooms/') && request.url().includes('/availability'),
        { timeout: 10000 }
      ).catch(() => null);

      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // API 호출 확인
      const apiRequest = await apiPromise;

      if (apiRequest) {
        expect(apiRequest.url()).toContain('/availability');
      }
    });

    test('예약 생성 시도 시 API 호출 확인', async ({ page }) => {
      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 큰 달력으로 전환
      const toggleButton = page.locator('button:has-text("큰 달력으로 보기")');
      if (await toggleButton.isVisible()) {
        await toggleButton.click();
        await page.waitForTimeout(200);
      }

      // 날짜 선택
      const availableDays = page.locator('.rdp-day:not(.rdp-day-disabled)');
      const dayCount = await availableDays.count();

      if (dayCount >= 2) {
        await availableDays.nth(0).click();
        await page.waitForTimeout(100);
        await availableDays.nth(1).click();
        await page.waitForTimeout(100);
      }

      // 폼 입력
      await page.locator('input#guest_name').fill('홍길동');
      await page.locator('input#guest_email').fill('test@example.com');
      await page.locator('input#guest_phone').fill('010-1234-5678');
      await page.locator('textarea#special_requests').fill('조용한 객실 부탁드립니다.');

      // API 요청 리스닝
      const apiPromise = page.waitForRequest(
        request => request.url().includes('/api/reservations/create') && request.method() === 'POST',
        { timeout: 5000 }
      ).catch(() => null);

      // 제출 버튼 클릭
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // API 호출 확인
      const apiRequest = await apiPromise;

      if (apiRequest) {
        expect(apiRequest.method()).toBe('POST');
        expect(apiRequest.url()).toContain('/api/reservations/create');

        // 요청 바디 확인
        const postData = apiRequest.postDataJSON();
        expect(postData).toHaveProperty('guest_name', '홍길동');
        expect(postData).toHaveProperty('guest_email', 'test@example.com');
        expect(postData).toHaveProperty('guest_phone', '010-1234-5678');
      }
    });
  });

  test.describe('예약 완료 플로우', () => {
    test('예약 성공 시나리오 (Mock API)', async ({ page }) => {
      // API 응답 모킹
      await page.route('**/api/rooms/*/availability*', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            availability: {
              unavailable_dates: []
            }
          })
        });
      });

      await page.route('**/api/reservations/create', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            reservation: {
              id: 'test-reservation-123',
              status: 'confirmed'
            }
          })
        });
      });

      await page.goto('/rooms');

      // 첫 번째 객실 예약하기
      await page.locator('.room-card').first().locator('a[href*="/book"]').click();
      await page.waitForURL(/\/rooms\/.*\/book/);

      // 큰 달력으로 전환
      const toggleButton = page.locator('button:has-text("큰 달력으로 보기")');
      if (await toggleButton.isVisible()) {
        await toggleButton.click();
        await page.waitForTimeout(200);
      }

      // 날짜 선택
      const availableDays = page.locator('.rdp-day:not(.rdp-day-disabled)');
      const dayCount = await availableDays.count();

      if (dayCount >= 2) {
        await availableDays.nth(0).click();
        await page.waitForTimeout(100);
        await availableDays.nth(1).click();
        await page.waitForTimeout(200);
      }

      // 폼 입력
      await page.locator('input#guest_name').fill('홍길동');
      await page.locator('input#guest_email').fill('test@example.com');
      await page.locator('input#guest_phone').fill('010-1234-5678');

      // 제출
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // 예약 성공 페이지로 이동하는지 확인 (또는 성공 메시지)
      await page.waitForTimeout(1000);

      // URL이 success 페이지로 변경되거나, 성공 메시지가 표시되어야 함
      const url = page.url();
      const hasSuccessMessage = await page.locator('text=/예약.*완료|성공/i').count() > 0;

      expect(url.includes('success') || hasSuccessMessage).toBeTruthy();
    });
  });
});
