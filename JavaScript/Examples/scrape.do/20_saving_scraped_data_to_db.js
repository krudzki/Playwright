const { chromium } = require("playwright");
const { MongoClient } = require("mongodb");

(async () => {
    // Launch the Chromium browser in headless mode (without GUI)
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage(); // Open a new page/tab

    try {
        // Navigate to the target website
        await page.goto("https://example.com");

        // Scrape data from the page: Select elements with the class ".data-item"
        // and extract the title and price for each product
        const scrapedData = await page.$$eval(".data-item", (items) =>
            items.map((item) => ({
                title: item.querySelector(".title").textContent.trim(),
                price: item.querySelector(".price").textContent.trim(),
            }))
        );

        // Log the scraped data for verification
        console.log("Scraped Data:", scrapedData);

        // MongoDB connection string (local MongoDB instance)
        const uri = "mongodb://localhost:27017";
        const client = new MongoClient(uri); // Initializa the MongoDB client

        try {
            // Connect to MongoDB server
            await client.connect();

            // Access the 'scrapingDB' database and the 'products' collection
            const db = client.db("scrapingDB");
            const collection = db.collection("products");

            // Insert the scraped data into the 'products' collection
            await collection.insertMany(scrapedData);

            // Log the number of inserted records for verification
            console.log(`${result.insertedCount} records inserted into MongoDB`);
        } catch (dbError) {
            // Catch any errors reloated to MongoDB connection or insertion
            console.error("Error inserting data into MongoDB", dbError);
        } finally {
            // Ensure the MongoDB connection is closed after the operations are complete
            await client.close();
        }
    } catch (scrapedError) {
        // Catch any errors that occur during the scraping process
        console.error("Error during scraping:", scrapedError);
    } finally {
        // Ensure the browser is closed after the operations are complete
        await browser.close();
    }
})();