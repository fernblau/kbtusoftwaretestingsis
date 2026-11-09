import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login with valid credentials', async ({ page }) => {
  const p = new LoginPage(page);
  await p.goto();
  await p.login('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL(/\/account/);
  await expect(page.getByTestId('nav-menu')).toBeVisible();
});

test('Login with invalid credentials shows an error', async ({ page }) => {
  const p = new LoginPage(page);
  await p.goto();
  await p.login('customer@practicesoftwaretesting.com', 'wrong-password');
  await expect(p.getErrorMessage()).toBeVisible();
  await expect(page).toHaveURL(/auth\/login/);
});
