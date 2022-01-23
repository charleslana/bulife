import config from './config';
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto('https://www.ulife.com.br', { waitUntil: 'networkidle0' });
  await page.type('#txtLogin', config.username);
  await page.type('#txtPassword', config.password);
  await page.click('#imbLogin');
  await page.waitForNavigation();
  console.log('New page URL:', page.url());
  const [response] = await Promise.all([
    page.waitForResponse(response =>
      response.url().includes('/Calendar/GetCalendarByMonth')
    ),
  ]);
  console.log(await response.json());
  await browser.close();
})();
