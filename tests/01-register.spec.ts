import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test('Register a new customer successfully', async ({ page }) => {
  const p = new RegisterPage(page);
  await p.goto();
  await p.registerNewUser({
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    street: 'Main St',
    houseNumber: '1',
    postcode: '10115',
    city: 'Berlin',
    state: 'Berlin',
    country: 'DE',
    phone: '123456789',
    email: `user_${Date.now()}@test.com`,
    pass: 'Password123!',
  });
  await expect(page).toHaveURL(/auth\/login/);
});
