const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to a page with a table
    await page.goto("https://example.com/table-page");

    // Extract table data 
    const tableData = await page.$$eval("table tr", (rows) => {
        return rows.map((row) => {
            const cells = Array.from(row.querySelectorAll("td"));
            return cells.map((cell) => cell.textContent.trim());
        });
    });

    console.log("Table Data:", tableData)
})();