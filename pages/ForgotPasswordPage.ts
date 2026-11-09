import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  async goto() {
    await this.page.goto('/auth/forgot-password');
  }

  async requestPasswordReset(email: string) {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('forgot-password-submit').click();
  }

  getSuccessAlert(): Locator {
    return this.page.locator('.alert-success');
  }

  getErrorAlert(): Locator {
    return this.page.locator('.alert-danger').filter({ hasText: /\S/ });
  }
}
