/**
 * Transfermarkt Scraper
 *
 * Extract football player valuations, transfer history, club data, and market valu
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx transfermarkt-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.transfermarkt.com/spieler-statistik/wertvollstespieler/marktwertetop");
await page.content();

const data = await page.evaluate(`(() => {
  const players = [];
  document.querySelectorAll("#yw1 .items tbody tr").forEach(el => {
    const name = el.querySelector(".hauptlink a")?.textContent?.trim();
    const position = el.querySelector(".inline-table tr:last-child td")?.textContent?.trim();
    const club = el.querySelector(".zentriert img.tiny_wappen")?.getAttribute("alt");
    const value = el.querySelector(".rechts.hauptlink a")?.textContent?.trim();
    const age = el.querySelector(".zentriert:nth-child(3)")?.textContent?.trim();
    if (name) players.push({ name, position, club, value, age });
  });
  return JSON.stringify({ total: players.length, players: players.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
