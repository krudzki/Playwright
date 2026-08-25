# Playwright

Learning / example repository for [Playwright](https://playwright.dev/) browser
automation, with JavaScript and Python examples.

## Contents

- `JavaScript/Examples/scrape.do/` - 25 numbered Playwright (Node.js) scripts
  covering common scraping techniques:
  - Basic page scraping and product-name extraction
  - Infinite scrolling, pagination, delays between requests
  - Authentication, popups, iframes, and modal dialogs
  - Extracting and manipulating data
  - Saving scraped data to JSON, CSV, or a database
  - Rotating user agents and proxies
  - Stealth mode to bypass bot detection, CAPTCHA handling (2captcha)
  - Disabling images/stylesheets/resources, running scrapers concurrently
  - Retry mechanism and specific error handling
  - Debugging with the built-in Playwright tools (`25_debugging_with_playwright_build_in_tools.js`)
- `Python/test_test.py` - basic pytest-style Playwright Python test
  (checks the title of https://playwright.dev/ and clicks "Get started").

## Usage

Each script in `JavaScript/Examples/scrape.do/` is standalone; run it directly:

```
node JavaScript/Examples/scrape.do/01.\ basic.js
```

The Python test requires Playwright installed for Python:

```
pytest Python/test_test.py
```
