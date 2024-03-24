import { test, expect } from '@playwright/test';
import { exec } from 'child_process';

const standardUser = "standard_user";
const password = "secret_sauce";
const url = 'https://www.saucedemo.com/';

test.describe('Set of two tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
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

  });
});