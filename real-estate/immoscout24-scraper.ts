/**
 * Immoscout24 Scraper
 *
 * Extract German property listings, rental offers, and market data from Immobilien
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx immoscout24-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
  captcha: "solve",
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.immobilienscout24.de/Suche/de/berlin/berlin/wohnung-kaufen");

const data = await page.extractFields({
  title: ".result-list-entry__brand-title",
  price: ".result-list-entry__criteria dd:first-child",
  rooms: ".result-list-entry__criteria dd:nth-child(2)",
  area: ".result-list-entry__criteria dd:nth-child(3)",
  address: ".result-list-entry__map-link",
  landlord: ".result-list-entry__brand-title-container",
  image: { selector: ".result-list-entry__brand-logo img", attribute: "src" },
});

console.log(data);
await spider.close();
