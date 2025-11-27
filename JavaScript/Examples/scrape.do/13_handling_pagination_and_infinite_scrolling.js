const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the first page
    await page.goto("https://www.scrapingcourse.com/ecommerce/");

    let hasNextPage = true;

    while (hasNextPage) {
        // Scrape product names and prices on the current page
        const products = await page.$$eval(".products .product", (items) =>
            items.map((item) => {
                const name = item
                    .querySelector(".woocommerce-loop-product__title")
                    .textContent.trim();
                const price = item.querySelector(".price").textContent.trim();
                return { name, price };
            })
        );

        console.log("Scraped Products:", products);

        // Check if the "Next" button exists
        const nextButton = await page.$("a.next.page-numbers");

        if (nextButton) {
            // Click the "Next" button and wait for the next page to load
            try {
                await Promise.all([
                    page.click("a.next.page-numbers"),
                    // Wait for the product grid to appear on the next page, increasing the timeout
                    page.waitForSelector(".products", { timeout: 60000 }),
                ]);
            } catch (error) {
                console.error("Navigation failed, retrying...", error);
                // Optionally, implement retry logic here
            }
        } else {
            // No more pages 
            hasNextPage = false;
        }
    }

    await browser.close();
})();