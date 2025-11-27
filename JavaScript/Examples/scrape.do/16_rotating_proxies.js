const { chromium } = require("playwright");

(async () => {
    // Launch with a proxy
    const browser = await chromium.launch({
        headless: true,
        proxy: {
            server: "http://your-proxy-server.com:8000", // Replace with your proxy
        },
    });

    const page = await browser.newPage();

    // Navigate and scrape content through the proxy
    await page.goto("https://example.com");

    await browser.close();
})();