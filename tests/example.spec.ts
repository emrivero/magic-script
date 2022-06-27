import { test, type Page } from '@playwright/test';
import moment from 'moment';

test.beforeEach(async ({ page }) => {
  await page.goto('https://emergya.myteam2go.com/emergya');
  await page.fill('#j_username', 'erivero');
  await page.fill('#j_password', '?rl146UC');
  await page.click('[name="login"]')
});

const timeStart = '07:00'
const timeEnd = '14:00';

const days = [
  moment().format('DD/MM/YYYY')
]


test.describe('Clock at work', () => {
  test('should allow me to add todo items', async ({ page }) => {
    for (const d of days) {
      await clockAtWork(page, d, timeStart, timeEnd);
      await page.waitForTimeout(3000)
    }
  });
});

const clockAtWork = async(page: Page, d: string, hS: string, hF: string) => {
  await page.goto('https://emergya.myteam2go.com/pages/employeePortal/admin/workAssistanceForm')
  await page.waitForTimeout(1000)
  await page.locator('id=workAssistanceEditForm:input_input').fill( `${d} ${hS}`)
  await page.locator('id=workAssistanceEditForm:output_input').fill( `${d} ${hF}`)
  await page.locator('id=workAssistanceEditForm:inputOption_label').click()
  await page.waitForTimeout(1000)
  await page.locator('id=workAssistanceEditForm:inputOption_1').click()
  await page.locator('id=workAssistanceEditForm:outputOption_label').click()
  await page.waitForTimeout(1000)
  await page.locator('id=workAssistanceEditForm:outputOption_2').click()
  await page.locator('id=workAssistanceEditForm:saveWithoutUpdate').click()
}