const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to a page with infinite scroll
    await page.goto("https://example.com/infinite-scroll");

    // Scroll down to load more content
    let previousHeight;
    while (true) {
        previousHeight = await page.evaluate("document.body.scrollHeight");
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForTimeout(1000); // Adjust timeout as needed

        let newHeight = await page.evaluate("document.body.scrollHeight");
        if (newHeight === previousHeight) {
            break; // Stop scrolling if no new content loads
        }
    }

    // Extract the dynamic content
    const items = await page.$$eval(".item-selector", (elements) =>
        elements.map((el) => el.textContent)
    );
    console.log("Extracted Items:", items);

    await browser.close();
})();