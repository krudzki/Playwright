const { chromium } = require("playwright");
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    // Navigate to the page with products ordered by price
    await page.goto("https://www.scrapingcourse.com/ecommerce/?orderby=price");
    // Extract the 'src' attribute from all product images 
    const imageUrls = await page.$$eval(".products img", (imgs) =>
        imgs.map((img) => img.getAttribute("src"))
    );
    // Log the extracted image URLs
    console.log("Image URLs:", imageUrls)
    await browser.close();
})();