/**
 * Amazon Product Scraper
 *
 * Extract product data from Amazon product pages — title, price,
 * rating, reviews, availability, and images.
 *
 * Uses `extractFields()` for clean, single-call field extraction.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx amazon-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});
await spider.connect();
const page = spider.page!;

await page.goto(
  "https://www.amazon.com/Apple-Generation-Cancelling-Transparency-Personalized/dp/B0CHWRXH8B",
);

const data = await page.extractFields({
  title: "#productTitle",
  price: ".a-price .a-offscreen",
  rating: "#acrPopover .a-icon-alt",
  reviews: "#acrCustomerReviewText",
  availability: "#availability span",
  image: { selector: "#landingImage", attribute: "src" },
});

console.log(data);
await spider.close();
