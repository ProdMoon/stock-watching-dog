import 'dotenv/config';
import crawl from './crawler.js';
import { post } from './request.js';

const TARGET_URL = 'https://estore.kr.canon/estore/detailview/40620';
const PRODUCT_NAME = 'PowerShot V1';
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!WEBHOOK_URL) {
  throw new Error('Cannot find WEBHOOK_URL');
}

// Detection: If this button exists, product is OUT OF STOCK
const OUT_OF_STOCK_PATTERN = /재입고 알림 신청/;

async function sendSlackNotification() {
  await post(WEBHOOK_URL, {
    text: `${PRODUCT_NAME} is now IN STOCK!`,
    blocks: [{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${PRODUCT_NAME} is now available!\n<${TARGET_URL}|Buy Now>`
      }
    }]
  });
}

function getTimestamp() {
  return new Date().toLocaleTimeString();
}

async function checkStock() {
  console.log(`[${getTimestamp()}] Checking stock...`);

  try {
    const html = await crawl(TARGET_URL);

    // If pattern NOT found -> product is IN STOCK
    if (!OUT_OF_STOCK_PATTERN.test(html)) {
      console.log(`[${getTimestamp()}] IN STOCK! Sending webhook...`);
      await sendSlackNotification();
      console.log(`[${getTimestamp()}] Webhook sent successfully!`);
    } else {
      console.log(`[${getTimestamp()}] Out of stock.`);
    }
  } catch (error) {
    console.error(`[${getTimestamp()}] Error:`, error.message);
  }
}

// Run once and exit
checkStock().then(() => {
  process.exit(0);
}).catch(() => {
  process.exit(1);
});

