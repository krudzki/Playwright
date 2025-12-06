await page.tracing.start({ screenshots: true, snapshots: true });
await page.goto("https://example.com");

// Perform your scraping tasks... 

// Save the trace for analysis
await page.tracing.stop({ path: "trace.zip" });
console.log("Trace saved: trace.zip");