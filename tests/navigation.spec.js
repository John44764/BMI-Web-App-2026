import { test, expect } from '@playwright/test';

test.describe('Index Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/src/index/index.html');
  });

  test('acceptance criterion 1: can click the dashboard link and the page loads', async ({ page }) => {
    // First navigate away or click dashboard link directly
    const dashboardLink = page.locator('.sidebar a', { hasText: /übersicht|dashboard/i });
    await expect(dashboardLink).toBeVisible();

    await dashboardLink.click();

    // Verify dashboard content is loaded into the custom-body container
    const dashboardHeading = page.locator('#custom-body h1', { hasText: 'BMI Dashboard' });
    await expect(dashboardHeading).toBeVisible();
    await expect(page.locator('#myChart')).toBeAttached();
    await expect(page.locator('#latest-bmi')).toBeVisible();
  });

  test('acceptance criterion 2: can click the forms link and the page loads', async ({ page }) => {
    const formsLink = page.locator('.sidebar a', { hasText: /eingabe|forms/i });
    await expect(formsLink).toBeVisible();

    await formsLink.click();

    // Verify forms content is loaded into the custom-body container
    const formsHeading = page.locator('#custom-body h1', { hasText: 'Gewicht' });
    await expect(formsHeading).toBeVisible();
    await expect(page.locator('#weight-form')).toBeVisible();
    await expect(page.locator('#weight')).toBeVisible();
  });

  test('can navigate between dashboard and forms links', async ({ page }) => {
    // 1. Click forms link
    const formsLink = page.locator('.sidebar a', { hasText: /eingabe|forms/i });
    await formsLink.click();
    await expect(page.locator('#weight-form')).toBeVisible();

    // 2. Click dashboard link
    const dashboardLink = page.locator('.sidebar a', { hasText: /übersicht|dashboard/i });
    await dashboardLink.click();
    await expect(page.locator('#custom-body h1', { hasText: 'BMI Dashboard' })).toBeVisible();
  });
});
