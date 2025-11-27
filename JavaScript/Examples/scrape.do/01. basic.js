const { chromium } = require("playwright");

(async () => {
    // Launch a browser instance
    const browser = await chromium.launch({
        headless: false, // Set to true if you want a headless browser (no UI)
    });

    // Create a new browser context
    const context = await browser.newContext();

    // Open a new page
    const page = await context.newPage();

    // Navigate to a URL
    await page.goto("https://www.scrapingcourse.com/ecommerce/");

    // Take a screenshot
    await page.screenshot({ path: "example.png" });

    // Close the browser
    await browser.close();
})();