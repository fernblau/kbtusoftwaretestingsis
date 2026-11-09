import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
  async open() {
    await this.page.goto('/');
    await this.page.locator('a.card').first().waitFor();
  }

  async openFirstProduct(): Promise<{ name: string; price: string }> {
    await this.open();
    const card = this.page.locator('a.card').first();
    const name = (await card.getByTestId('product-name').innerText()).trim();
    const price = (await card.getByTestId('product-price').innerText()).trim();
    await card.click();
    await this.page.getByTestId('product-name').waitFor();
    return { name, price };
  }

  async addProductToCart() {
    await this.page.getByTestId('add-to-cart').click();
    await this.page.getByTestId('cart-quantity').filter({ hasText: /^\s*1\s*$/ }).waitFor();
  }

  async goToCart() {
    await this.page.getByTestId('nav-cart').click();
    await this.page.waitForURL(/\/checkout/);
  }

  cartItemTitles(): Locator {
    return this.page.getByTestId('product-title');
  }
}
