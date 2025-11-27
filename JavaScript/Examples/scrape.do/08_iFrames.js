const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to a page with an iFrame
    await page.goto("https://example.com/page-with-iframe");

    // Wait for the iFrame to load
    const frame = await page.frame({ url: /iframe-url-pattern/ });

    // Interact with elements inside the iFrame
    const iframeContent = await frame.$eval(
        "#iframe-element",
        (el) => el.textContent
    );
    console.log("iFrame Content:", iframeContent);

    await browser.close();
})();