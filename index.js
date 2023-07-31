import puppeteer from 'puppeteer';
import { auth } from './auth.js';

async function run() {
  let browser;

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
    });

    return;
  } catch (e) {
    console.error('scrape failed', e);
  } finally {
    console.log(browser)
    await browser?.close();
  }
}

run();
