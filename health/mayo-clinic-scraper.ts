/**
 * Mayo Clinic Scraper
 *
 * Extract disease descriptions, symptom lists, treatment options, and clinical res
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx mayo-clinic-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.mayoclinic.org/diseases-conditions/diabetes/symptoms-causes/syc-20371444");

const data = await page.extractFields({
  condition: "h1.heading",
  overview: ".content p:first-of-type",
  symptoms: "#symptoms-heading + .content",
  causes: "#causes-heading + .content",
  riskFactors: "#risk-factors-heading + .content",
  treatment: "#treatment-heading + .content",
});

console.log(data);
await spider.close();
