/**
 * One Medical Scraper
 *
 * Extract primary care provider profiles, office locations, service offerings, and
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx one-medical-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.onemedical.com/locations/");

const data = await page.extractFields({
  title: "h1",
  locations: ".location-card h3",
  addresses: ".location-card .address",
  services: ".services-list li",
  hours: ".office-hours",
  phone: ".phone-number",
});

console.log(data);
await spider.close();
