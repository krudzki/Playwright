const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Intercept and block certain types of requests
    await page.route("**/*", (route) => {
        const request = route.request();
        const blockResourceTypes = ["image", "stylesheet", "font"];
        if (blockResourceTypes.includes(request.resourceType())) {
            route.abort();
        } else {
            route.continue();
        }
    });

    await page.goto("https://example.com");
    await browser.close();
})();