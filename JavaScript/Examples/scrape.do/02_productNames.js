const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({
        headless: true,
    });
    const page = await browser.newPage();

    // Navigate to the r-commerce page
    await page.goto("https://www.scrapingcourse.com/ecommerce/");

    // Wait for the product names to load (using the class selector for "product-name")
    await page.waitForSelector(".product-name"); // Wait until the product names are loaded

    // Extract the content od all elements with the class "product-name"
    const productNames = await page.$$eval(
        ".product-name",
        (elements) => elements.map((el) => el.textContent.trim()) // Map over all product names a nd get their text 
    );

    console.log("Extracted Product Names:", productNames) // Log the extracted product names

    await browser.close();
})();