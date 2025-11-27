function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the first page
    await page.goto("https://example.com");

    // Scrape data
    // ... 

    // Introduce a random delay before the next request
    await page.waitForTimeout(randomDelay(1000, 3000)); // Wait between 1-3 seconds

    // Navigate to the next page or repeat the process...
    await page.goto("https://example.com/page2");

    await browser.close();
})();