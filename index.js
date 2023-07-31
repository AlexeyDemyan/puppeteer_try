import puppeteer from 'puppeteer';
import { auth } from './auth.js';

async function run() {
  let browser;
  let page;
  let body;
  let html;

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
    });

    // main script

    page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    await page.goto('https://amazon.com/');

    body = await page.$('body');

    html = await page.evaluate(() => {
      document.documentElement.outerHTML;
    });

    console.log(html);

    // main script end

    return;
  } catch (e) {
    console.error('scrape failed', e);
  } finally {
    console.log(body);
    console.log(html);
    await browser?.close();
  }
}

run();
