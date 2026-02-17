/**
 * Discord Scraper
 *
 * Extract public server listings, community info, and channel directories from Dis
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx discord-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://discord.com/servers");

const data = await page.extractFields({
  serverName: "[data-testid='guild-card'] h3",
  description: "[data-testid='guild-card'] p",
  memberCount: "[data-testid='guild-card'] [data-testid='member-count']",
  onlineCount: "[data-testid='guild-card'] [data-testid='online-count']",
  category: "[data-testid='guild-card'] [data-testid='category']",
  tags: "[data-testid='guild-card'] [data-testid='tag']",
});

console.log(data);
await spider.close();
