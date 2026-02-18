/**
 * CurseForge Scraper
 *
 * Extract Minecraft mods, modpacks, resource packs, and addon metadata from CurseF
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx curseforge-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.curseforge.com/minecraft/search?page=1&sortType=2");
await page.content();

const data = await page.extractFields({
  title: ".project-card .name a",
  downloads: ".project-card .count--download",
  author: ".project-card .author a",
  category: ".project-card .category-icon__text",
  updated: ".project-card .date",
  description: ".project-card .description",
});

console.log(data);
await spider.close();
