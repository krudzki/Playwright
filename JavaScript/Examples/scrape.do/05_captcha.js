const { chromium } = require("playwright");
const { getReCaptchaSolution } = require("playwright-recaptcha-plugin");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Navigate to the login page
        await page.goto("https://example.com/login");

        // Solve reCAPTCHA (requires a CAPTCHA-solving service)
        const { solved, error } = await getReCaptchaSolution(page, {
            provider: {
                id: "2captcha",
                token: "YOUR_2CAPTCHA_API_KEY", // Replace with your 2Captcha API key
            },
        });

        if (solved) {
            console.log("CAPTCHA solved successfully!");
        } else {
            throw new Error(`CAPTCHA not solved: ${error}`);
        }

        // Fill the login form and submit
        await page.fill('input[name="username"]', "your-username");
        await page.fill('input[name="password"]', "your-password");
        await page.click('button[type="submit"]');

        // Wait for navigation to ensure login was successful
        await page.waitForNavigation();

        console.log("Login form submitted successfully!");
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await browser.close();
    }
})();