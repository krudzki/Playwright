const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to a page that shows a modal dialog
    await page.goto("https://example.com");

    // Wait for the modal dialog and close it
    await page.waitForSelector(".modal-dialog");
    await page.click(".modal-dialog .close-button"); // Close the modal by clicking the close button

    // Continue with scraping tasks...

    await browser.close();
})();