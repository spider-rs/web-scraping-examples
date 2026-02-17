/**
 * WhatsApp Scraper
 *
 * Extract public channel content, business profiles, and product catalog data from
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx whatsapp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://whatsapp.com/channel");

const data = await page.extractFields({
  channelName: ".channel-card__name",
  followers: ".channel-card__followers",
  description: ".channel-card__description",
  category: ".channel-card__category",
  preview: ".channel-card__last-message",
  image: ".channel-card__avatar img[src]",
});

console.log(data);
await spider.close();
