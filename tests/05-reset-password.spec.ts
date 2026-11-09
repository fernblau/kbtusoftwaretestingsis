import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

test('Reset password flow with valid and invalid emails', async ({ page }) => {
  const p = new ForgotPasswordPage(page);
  await p.goto();
  await p.requestPasswordReset('customer@practicesoftwaretesting.com');
  await expect(p.getSuccessAlert()).toBeVisible();

  await p.goto();
  await p.requestPasswordReset(`non_existent_${Date.now()}@test.com`);
  await expect(p.getErrorAlert()).toBeVisible();
});
