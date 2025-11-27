const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Handle alert dialogs by accepting them automatically
    page.on("dialog", async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(); // You can also use dialog.dismiss() if needed
    });

    // Navigate to a page that triggers an alert
    await page.goto("https://example.com");
    // Continue with scraping tasks...

    await browser.close();
})();