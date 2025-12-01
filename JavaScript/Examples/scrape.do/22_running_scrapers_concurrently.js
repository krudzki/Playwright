const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });

    // Define a function to scrape a single page
    const scrapePage = async (url) => {
        const page = await browser.newPage();

        try {
            // Navigate to the given URL with a timeout
            await page.goto(url, { timeout: 30000 }); // 30 seconds timeout for page loading

            // Scrape the text of the h1 element
            const data = await page.$eval("h1", (el) => el.textContent.trim());

            // Loge the scraped data
            console.log(`Scraped data from ${url}: ${data}`);
        } catch (error) {
            // Handle errors such as timeout or element not found
            console.error(`Error scraping ${url}:`, error);
        } finally {
            // Close the page after scraping is complete
            await page.close();
        }
    };

    // List od URLs to scrape concurrently
    const urls = [
        "https://example.com/page1",
        "https://example.com/page2",
        "https://example.com/page3",
    ];

    try {
        // Run the scrapers concurrently and wait for all of them to finish
        await Promise.all(urls.map((url) => scrapePage(url)));
    } catch (error) {
        console.error("Error during the scraping process:", error);
    } finally {
        // Close the browser after all pages have been scraped
        await browser.close();
    }
})();