const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Listen for popups and close them based on their URLs
    page.on("popup", async (popup) => {
        const popupUrl = popup.url();
        console.log(`Popup detected with URL: ${popupUrl}`);

        // Check if the popup URL contains specific keywords
        if (popupUrl.includes("ads") || popupUrl.includes("marketing")) {
            console.log("Ad popup detected, closing it...");
            await popup.close();
        } else {
            console.log("Non-ad popup detected, closing it...");
            await popup.close();
        }
    });

    // Navigate to the page
    await page.goto("https://example.com");

    // Continue scraping...

    await browser.close();
})();