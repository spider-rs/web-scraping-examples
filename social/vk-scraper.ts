/**
 * VK Scraper
 *
 * Extract public community posts, group profiles, and user content from VK social 
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx vk-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://vk.com/team");

const data = await page.extractFields({
  groupName: ".page_name",
  description: ".group_info_row .line_value",
  members: ".pm_counter .count",
  status: ".current_text",
  wallPost: ".wall_post_text",
  postDate: ".rel_date",
});

console.log(data);
await spider.close();
