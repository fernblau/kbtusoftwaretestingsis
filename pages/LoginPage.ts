import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, pass: string) {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('password').fill(pass);
    await this.page.getByTestId('login-submit').click();
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  getErrorMessage(): Locator {
    return this.page.getByTestId('login-error');
  }
}