/**
 * Bluesky Scraper
 *
 * Extract posts, user profiles, follower counts, and feed data from the Bluesky de
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx bluesky-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://bsky.app/profile/bsky.app");

const data = await page.extractFields({
  displayName: "[data-testid='profileHeaderDisplayName']",
  handle: "[data-testid='profileHeaderHandle']",
  bio: "[data-testid='profileHeaderDescription']",
  followers: "[data-testid='profileHeaderFollowersButton']",
  following: "[data-testid='profileHeaderFollowsButton']",
  posts: "[data-testid='profileHeaderPostsCount']",
});

console.log(data);
await spider.close();
