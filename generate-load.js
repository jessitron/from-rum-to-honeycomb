const puppeteer = require('puppeteer');

const duration = 10 * 60; // 10 minutes in seconds
const intervalMin = 2; // Minimum interval between requests in seconds
const intervalMax = 5; // Maximum interval between requests in seconds

let totalRequests = 0;

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const end = Date.now() + duration * 1000;
  while (Date.now() < end) {
    const interval = Math.random() * (intervalMax - intervalMin) + intervalMin;

    console.log("Go to page")
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    totalRequests++;

    if (totalRequests % 1 === 0) {
      console.log(`Sent ${totalRequests} requests so far.`);
    }

    console.log("Now wait " + interval * 1000 + " ms")
    await page.waitForTimeout(interval * 1000);
  }

  await browser.close();
  console.log(`Total requests sent: ${totalRequests}`);
};

run().catch(console.error);