import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ProductInfo {
  name: string;
  price: string;
}

export class ComparePages extends BasePage {
  async openCatalog() {
    await this.page.goto('/');
    await this.page.locator('a.card').first().waitFor();
  }

  /** Нажимает кнопку «сравнить» у первых двух карточек и возвращает их название и цену. */
  async addFirstTwoProductsToCompare(): Promise<ProductInfo[]> {
    const products: ProductInfo[] = [];
    for (let i = 0; i < 2; i++) {
      const card = this.page.locator('a.card').nth(i);
      products.push({
        name: (await card.getByTestId('product-name').innerText()).trim(),
        price: (await card.getByTestId('product-price').innerText()).trim(),
      });
      await card.getByTestId('compare-btn').click();
    }
    return products;
  }

  async goToComparePage() {
    await this.page.getByTestId('compare-link').click();
    await this.page.waitForURL(/\/comparison/);
    await this.page.getByTestId('comparison-table').waitFor();
  }

  getProductTitles(): Locator {
    return this.page.getByTestId('comparison-table').getByTestId('product-name');
  }

  getProductPrices(): Locator {
    return this.page.getByTestId('compare-price');
  }
}
