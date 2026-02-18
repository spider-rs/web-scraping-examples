/**
 * USPTO Scraper
 *
 * Extract patent applications, trademark filings, examiner data, and prosecution h
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx uspto-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&p=1&f=S&l=50&Query=TTL%2Fartificial+intelligence&d=PTXT");
await page.content();

const data = await page.evaluate(`(() => {
  const patents = [];
  document.querySelectorAll("table tr").forEach(el => {
    const number = el.querySelector("td:nth-child(2) a")?.textContent?.trim();
    const title = el.querySelector("td:nth-child(4)")?.textContent?.trim();
    if (number && title) patents.push({ number, title });
  });
  return JSON.stringify({ total: patents.length, patents: patents.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
