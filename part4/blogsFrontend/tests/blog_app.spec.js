import { test, expect } from '@playwright/test'

test('front page can be opened', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('button', { name: 'Login' }).first()
  ).toBeVisible()
})

test('user can click login button', async ({ page }) => {
  await page.goto('/')

  const loginButton = page.getByRole('button', { name: 'Login' })

  await loginButton.click()
  await page.getByRole('textbox').first().fill('Andrew')
    await page.getByRole('textbox').last().fill('Andrew')
    await page.getByRole('button', { name: 'Login' }).click()
  
    await expect(page.getByText('Andrew logged in')).toBeVisible()
})