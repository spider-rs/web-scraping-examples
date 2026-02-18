/**
 * ShipStation Scraper
 *
 * Extract order management features, carrier integrations, automation rules, and f
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx shipstation-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.shipstation.com/pricing/");
await page.content();

const data = await page.extractFields({
  title: "h1",
  plans: ".pricing-card h3",
  prices: ".pricing-card .price",
  shipments: ".pricing-card .shipments",
  features: ".pricing-card .features li",
  carriers: ".carrier-logo img[alt]",
  cta: ".pricing-card .cta-button",
});

console.log(data);
await spider.close();
