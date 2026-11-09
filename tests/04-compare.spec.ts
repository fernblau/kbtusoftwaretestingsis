import { test, expect } from '@playwright/test';
import { ComparePages } from '../pages/ComparePages';

test('Compare two products and assert their data', async ({ page }) => {
  const p = new ComparePages(page);
  await p.openCatalog();
  const products = await p.addFirstTwoProductsToCompare();
  await p.goToComparePage();

  await expect(p.getProductTitles()).toHaveCount(2);
  await expect(p.getProductPrices()).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    await expect(p.getProductTitles().nth(i)).toHaveText(products[i].name);
    await expect(p.getProductPrices().nth(i)).toHaveText(products[i].price);
  }
});
