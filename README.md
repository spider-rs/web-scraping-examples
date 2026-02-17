# Web Scraping Examples

21 ready-to-run web scraping scripts for popular websites. Built with [spider-browser](https://github.com/spider-rs/spider-browser) — a browser automation SDK with stealth mode and anti-bot bypass.

## Quick Start

```bash
npm install
SPIDER_API_KEY=sk-... npx tsx amazon-scraper.ts
```

Get a free API key at [spider.cloud](https://spider.cloud).

## Examples

### E-Commerce

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [amazon-scraper.ts](amazon-scraper.ts) | amazon.com | `extractFields()` | Title, price, rating, reviews, availability, image |
| [walmart-scraper.ts](walmart-scraper.ts) | walmart.com | `extractFields()` | Name, price, rating, fulfillment |
| [ebay-scraper.ts](ebay-scraper.ts) | ebay.com | `evaluate()` | Title, price, shipping, condition |
| [target-scraper.ts](target-scraper.ts) | target.com | `extractFields()` | Name, price, rating, fulfillment |
| [costco-scraper.ts](costco-scraper.ts) | costco.com | `evaluate()` | Name, price, rating |
| [homedepot-scraper.ts](homedepot-scraper.ts) | homedepot.com | `extractFields()` | Name, price, model, rating, reviews |

### Search

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [google-search-scraper.ts](google-search-scraper.ts) | google.com | `evaluate()` | Title, URL, snippet, featured snippet |
| [google-play-scraper.ts](google-play-scraper.ts) | play.google.com | `extractFields()` | App name, developer, rating, genre |

### Jobs

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [google-jobs-scraper.ts](google-jobs-scraper.ts) | google.com/jobs | `evaluate()` | Title, company, location |
| [indeed-scraper.ts](indeed-scraper.ts) | indeed.com | `evaluate()` | Title, company, location, salary |
| [glassdoor-scraper.ts](glassdoor-scraper.ts) | glassdoor.com | `evaluate()` | Review title, rating, pros, cons |

### Travel & Real Estate

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [expedia-scraper.ts](expedia-scraper.ts) | expedia.com | `evaluate()` | Hotel name, price, rating |
| [zillow-scraper.ts](zillow-scraper.ts) | zillow.com | `evaluate()` | Address, price, details |
| [airbnb-scraper.ts](airbnb-scraper.ts) | airbnb.com | `evaluate()` | Title, price/night, rating |
| [tripadvisor-scraper.ts](tripadvisor-scraper.ts) | tripadvisor.com | `evaluate()` | Name, rating, reviews, cuisine |

### News & Media

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [google-news-scraper.ts](google-news-scraper.ts) | news.google.com | `evaluate()` | Headline, source, time |
| [youtube-scraper.ts](youtube-scraper.ts) | youtube.com | `extractFields()` | Title, channel, views, date, description |

### Social

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [reddit-scraper.ts](reddit-scraper.ts) | reddit.com | `evaluate()` | Title, score, comments, author |
| [linkedin-scraper.ts](linkedin-scraper.ts) | linkedin.com | `extractFields()` | Company name, industry, size, description |

### Reviews & AI

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [yelp-scraper.ts](yelp-scraper.ts) | yelp.com | `evaluate()` | Name, rating, reviews, categories |
| [chatgpt-scraper.ts](chatgpt-scraper.ts) | chatgpt.com | `evaluate()` | Conversation turns, roles, content |

## How It Works

Every example connects to a pre-warmed browser via Spider's cloud, navigates to the target URL, and extracts structured data.

### extractFields — Single-element extraction

Best for product pages where each field maps to one CSS selector:

```typescript
const data = await page.extractFields({
  title: "#productTitle",
  price: ".a-price .a-offscreen",
  image: { selector: "#landingImage", attribute: "src" },
});
// { title: "AirPods Pro", price: "$189.99", image: "https://..." }
```

### evaluate — List extraction

Best for search results and listings where you iterate over repeating elements:

```typescript
const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product").forEach(el => {
    const name = el.querySelector(".name")?.textContent?.trim();
    const price = el.querySelector(".price")?.textContent;
    if (name) items.push({ name, price });
  });
  return JSON.stringify(items);
})()`);
```

## Features

- **Stealth browsing** — Bypass Akamai, PerimeterX, DataDome, and Cloudflare
- **CAPTCHA solving** — Automatic CAPTCHA resolution when `captcha: "solve"` is set
- **Pre-warmed browsers** — Skip cold start, connect to ready browsers in ~5s

## SDKs

spider-browser is available for TypeScript, Python, and Rust:

```bash
npm install spider-browser        # TypeScript
pip install spider-browser        # Python
cargo add spider-browser          # Rust
```

## Related

- [spider-browser](https://github.com/spider-rs/spider-browser) — The SDK powering these examples
- [spider-browser-dataset](https://github.com/spider-rs/spider-browser-dataset) — 999-URL benchmark across 327 domains (100% pass rate)
- [spider.cloud](https://spider.cloud) — Browser fleet & web scraping API

## License

MIT
