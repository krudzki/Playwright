const { resolve } = require("path");
const { chromium } = require("playwright");
const retry = async (fn, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Attempt ${i + 1} failed: ${error.message}`);
            if (i < retries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                throw error; // Throw error after exhausting all retries
            }
        }
    }
};

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Retry scraping the page up to 3 times in case of failures
    await retry(async () => {
        await page.goto("https://example.com", { timeout: 5000 });
        const data = await page.$eval("h1", (el) => el.textContent.trim());
        console.log("Scraped data:", data)
    });

    await browser.close();
})();