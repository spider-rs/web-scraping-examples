/**
 * DigitalOcean Scraper
 *
 * Extract community tutorials, product documentation, pricing plans, and marketpla
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx digitalocean-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.digitalocean.com/community/tutorials");

const data = await page.extractFields({
  title: ".TutorialCard h3 a",
  author: ".TutorialCard .author-name",
  date: ".TutorialCard time",
  tags: ".TutorialCard .tag",
  description: ".TutorialCard p",
  difficulty: ".TutorialCard .difficulty",
});

console.log(data);
await spider.close();
