const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the website and scrape data
    await page.goto("https://example.com");
    const scrapedData = await page.$$eval(".data-item", (items) =>
        items.map((item) => ({
            title: item.querySelector(".title").textContent.trim(),
            price: item.querySelector(".price").textContent.trim(),
        }))
    );

    // Save the data as JSON
    fs.writeFileSync("scrapedData.json", JSON.stringify(scrapedData, null, 2));
    console.log("Data saved to scrapedData.json");

    await browser.close();
})();