import { chromium } from 'playwright';

/**
 * Web crawler that fetches full HTML including CSR elements
 * @param {string} url - The website URL to crawl
 * @returns {Promise<string>} Full HTML content
 */
async function crawl(url) {
  const browser = await chromium.launch({
    headless: true
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to URL and wait for DOM to load
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait for CSR content to render
    await page.waitForTimeout(3000);

    // Get the full HTML after JavaScript execution
    const html = await page.content();
    
    return html;
  } finally {
    await browser.close();
  }
}

export default crawl;

