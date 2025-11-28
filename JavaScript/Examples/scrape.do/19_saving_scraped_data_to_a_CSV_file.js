const { chromium } = require("playwright");
const fs = require("fs");
const { parse } = require("json2csv");

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to the new website and scrape data
    await page.goto("https://example.com");
    const scrapedData = await page.$$eval(".data-item", (items) =>
        items.map((item) => ({
            title: item.querySelector(".title").textContent,
            price: item.querySelector(".price").textContent,
        }))
    );

    // Convert data to CSV format
    const csv = parse(scrapedData);

    // Save the data as CSV
    fs.writeFileSync("scrapedData.csv", csv);
    console.log("Data saved to scrapedData.csv");

    await browser.close();
}) 