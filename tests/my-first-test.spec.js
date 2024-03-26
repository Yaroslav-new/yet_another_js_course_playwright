import { test, expect } from '@playwright/test';

const standardUser = "standard_user";
const password = "secret_sauce";

test.describe('Set of two tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.locator('#user-name').fill(standardUser);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();
  });

  test('Perform Login', async ({ page }) => {
    await expect (page.locator('.title')).toBeVisible();
    await expect (page.locator('.shopping_cart_link')).toBeVisible();
    const productsItems = await (page.locator('.inventory_item')).count()
    expect(productsItems).toBeGreaterThan(1);
  });

  test('Add product to the cart', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator(".cart_list > .removed_cart_item"));
  });
});