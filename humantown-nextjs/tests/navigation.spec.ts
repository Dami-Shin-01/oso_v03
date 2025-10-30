import { expect, test } from '@playwright/test';

import { navigationItems } from '@/lib/config/site';

test.describe('Navigation configuration', () => {
  test('desktop navigation matches config', async ({ page }) => {
    await page.goto('/');

    for (const item of navigationItems) {
      const listItem = page
        .locator('header nav .depth1')
        .filter({ has: page.locator('.depth1_a', { hasText: item.label }) })
        .first();

      const trigger = listItem.locator('.depth1_a').first();
      await expect(trigger).toHaveText(item.label);

      if (!item.submenu) {
        continue;
      }

      await listItem.hover({ force: true });
      await page.waitForTimeout(200);

      for (const subitem of item.submenu) {
        const link = listItem
          .locator('.depth_box a')
          .filter({ hasText: subitem.label })
          .first();
        await expect(link).toHaveAttribute('href', subitem.url);
      }
    }
  });

  test('mobile navigation matches config', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '메뉴 열기' }).click();

    for (const item of navigationItems) {
      const listItem = page
        .locator('.aside li')
        .filter({ has: page.locator('.depth1', { hasText: item.label }) })
        .first();

      const trigger = listItem.locator('.depth1').first();
      await expect(trigger).toHaveText(item.label);

      if (!item.submenu) {
        continue;
      }

      await trigger.click();
      const depthList = listItem.locator('.depth_list');
      await expect(depthList).toHaveClass(/on/);

      for (const subitem of item.submenu) {
        const link = depthList
          .locator('a')
          .filter({ hasText: subitem.label })
          .first();
        await expect(link).toHaveAttribute('href', subitem.url);
      }
    }
  });
});
