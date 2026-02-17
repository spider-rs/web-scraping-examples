/**
 * Firebase Scraper
 *
 * Extract product documentation, quickstart guides, API specs, and pricing details
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx firebase-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://firebase.google.com/docs/firestore");
await page.content(8000);

const data = await page.extractFields({
  title: "h1",
  description: "[class*='description'] p",
  sections: "h2",
  codeExamples: "pre code",
  platforms: "[class*='platform'] span",
  nextSteps: "[class*='next-steps'] a",
});

console.log(data);
await spider.close();
