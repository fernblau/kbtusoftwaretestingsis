import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';

test('Buy a product workflow', async ({ page }) => {
  const p = new CatalogPage(page);
  const product = await p.openFirstProduct();
  await p.addProductToCart();
  await p.goToCart();
  await expect(p.cartItemTitles()).toHaveCount(1);
  await expect(p.cartItemTitles().first()).toContainText(product.name);
});
