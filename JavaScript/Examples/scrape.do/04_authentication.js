const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto("https://example.com/login");

    // Fill in the login form
    await page.fill('input[name="username"]', "your-username"); // Fill in the username
    await page.fill('input[name="password"]', "your-password"); // Fill in the password

    // Submit the form
    await page.click('button[type="submit"]'); // Click the login button

    // Wait for navigation after login
    await page.waitForNavigation();

    // Check if login was successful by checking for an element only visible after login
    const loggedIn = await page.$("selector-for-logged-in-element");
    if (loggedIn) {
        console.log("Login successful!");
    } else {
        console.log("Login failed.");
    }

    await browser.close();
})();