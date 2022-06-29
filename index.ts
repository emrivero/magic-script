const playwright = require('playwright');
const preconfig = require('./preconfig.ts');

const main = async () => {
  try {
    const { pass, start, end, date } = await preconfig.configureEnv();
    const browser = await playwright.chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://emergya.myteam2go.com/emergya');
    await page.fill('#j_username', `${process.env.CLOCKWORK_USER}`);
    await page.fill('#j_password', pass);
    await page.click('[name="login"]');

    await clockAtWork(page, date, start, end);

    browser.close();
  } catch (e) {
    console.error(e);
  }
};

const clockAtWork = async (page, d, hS, hF) => {
  await page.goto(
    'https://emergya.myteam2go.com/pages/employeePortal/admin/workAssistanceForm'
  );
  await page.waitForTimeout(1000);
  await page
    .locator('id=workAssistanceEditForm:input_input')
    .fill(`${d} ${hS}`);
  await page
    .locator('id=workAssistanceEditForm:output_input')
    .fill(`${d} ${hF}`);
  await page.locator('id=workAssistanceEditForm:inputOption_label').click();
  await page.waitForTimeout(1000);
  await page.locator('id=workAssistanceEditForm:inputOption_1').click();
  await page.locator('id=workAssistanceEditForm:outputOption_label').click();
  await page.waitForTimeout(1000);
  await page.locator('id=workAssistanceEditForm:outputOption_2').click();
  await page.locator('id=workAssistanceEditForm:saveWithoutUpdate').click();
};

// start process
main();
