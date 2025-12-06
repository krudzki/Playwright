try {
    await pageXOffset.goto("https://example.com", { timeout: 5000 });
    const content = await page.$eval(".content", (el) => el.textContent.trim());
    console.log("Page content:", content);
} catch (error) {
    if (error.name === "TimeoutError") {
        console.log("Navigation timed out.");
    } else if (error.message.includes("No node found for selector")) {
        console.log("Element not found.");
    } else {
        console.log("Navigation failed.");
    }
}