const { chromium } = require("playwright-extra");
const stealth = require("playwright-extra-plugin-stealth");

// Use stealth plugin
chromium.use(stealth());

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto("https://example.com");

    // Scrape the page or perform actions here...
    console.log("Stealth mode enabled, scraping...");

    await browser.close();
})();