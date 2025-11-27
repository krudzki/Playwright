const axios = require("axios");
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the login page
        await page.goto("https://example.com/login");

        // Capture the CAPTCHA image
        const captchaImage = await page.$("img#captcha"); // Example selector for the CAPTCHA image
        await captchaImage.screenshot({ path: "captcha.png" });

        // Convert CAPTCHA image to base64
        const captchaBase64 = fs.readFileSync("captcha.png", {
            encoding: "base64",
        });

        // Send the CAPTCHA to 2Captcha for solving
        const apiKey = "YOUR_2CAPTCHA_API_KEY";
        const captchaResponse = await axios.post(
            `https://2captcha.com/in.php`,
            null,
            {
                params: {
                    key: apiKey,
                    method: "base64",
                    body: captchaBase64,
                    json: 1,
                },
            }
        );

        const captchaId = captchaResponse.data.request;

        // Poll 2Captcha for the solution
        let captchaSolution = null;
        while (true) {
            const result = await axios.get(`https://2captcha.com/res.php`, {
                params: {
                    key: apiKey,
                    action: "get",
                    id: captchaId,
                    json: 1,
                },
            });

            if (result.data.status === 1) {
                captchaSolution = result.data.request;
                break;
            } else if (result.data.status === 0) {
                console.log("Waiting for CAPTCHA solution...");
                await new Promise((res) => setTimeout(res, 5000)); // Wait for 5 seconds before trying again
            } else {
                throw new Error(`Captcha solving failed: ${result.data.request}`);
            }
        }

        console.log("CAPTCHA solution received:", captchaSolution);

        // Fill in the CAPTCHA solution and other form fields
        await page.fill('input[name="captcha"]', captchaSolution);
        await page.fill('input[name="username"]', "your-username");
        await page.fill('input[name="password"]', "your-password");

        // Submit the form
        await page.click('button[type="submit"]');
        await page.waitForNavigation();

        console.log("Form submitted successfully!");
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await browser.close();
    }
})();