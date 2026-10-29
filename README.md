# Discovery Showcase Grid

A fork of the Ex Libris Discovery Showcase carousel, rebuilt as a **grid** that is easy to drop into a LibGuides (LibApps) page. It works with search queries or Collections, but it was designed for Collections where most items have thumbnails.

The component is a [Lit](https://lit.dev/) web component written in TypeScript (`<search-carousel>`, which renders `<pnx-card>` items).

## How it works

- [src/search-carousel.ts](src/search-carousel.ts) is the main element. It takes a Primo PNX REST URL (`searchurl`), fetches results, and renders a grid of cards.
- [src/pnx-card.ts](src/pnx-card.ts) renders a single record and resolves its thumbnail (Primo/Syndetics, Google Books, Alma Digital, etc.). Styles live in [src/pnx-card-style.ts](src/pnx-card-style.ts).
- **Thumbnail filtering:** records without a usable thumbnail are skipped, so the grid only shows image cards.
- **Progressive loading:** the carousel requests PNX results in pages of `max(desiredCardCount × 3, 30)` (overriding the URL's `offset`/`limit`). Each page is checked for thumbnails, valid cards are added and rendered as they are found, and fetching stops once `desiredCardCount` cards are collected or results run out.
- **Parallel checks:** each page is checked in chunks of `parallelBatchSize` records at once. Results are cached per component instance.

### Attributes

| Attribute | Default | Description |
|---|---|---|
| `searchurl` | – | PNX REST URL (see below). Required. |
| `desiredCardCount` | `4` | Number of cards with thumbnails to display. |
| `parallelBatchSize` | `10` | How many records have their thumbnails verified at the same time. Higher values fill the grid faster but make more simultaneous network requests; lower values are gentler on the network/servers but slower. |
| `titleText` / `titleLink` | – | Optional heading text and link. |
| `trustedThumbnailDomains` | – | Comma-separated domains whose thumbnails skip validation (avoids CORS issues). |

## Getting the `searchUrl`

Follow the Ex Libris guide: [Primo Showcase – how to embed](https://developers.exlibrisgroup.com/blog/primo-showcase-how-to-embed/). It shows how to capture the PNX query URL used to populate `searchurl`.

## Allowing your domain in Alma

Add your LibApps domain as an allowed domain: [Adding Domains for Discovery Showcase](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/020Primo_VE/Primo_VE_(English)/120Other_Configurations/Adding_Domains_for_Discovery_Showcase).

## Using it in LibGuides

1. Build the bundle (see below) and take the minified file from `dist/` (currently `discovery-showcase.mini.js`).
2. In LibGuides go to **Admin > Look and Feel > Custom JS/CSS > Customization Files** and upload it.
3. Copy the **Include URL** shown after upload.
4. In the guide, **Add Media/Widget** where you want the grid and paste this into the embed code box, with your own URL and settings:

```html
<script type="module" src="https://YOUR-LIBAPPS-INCLUDE-URL/discovery-showcase.mini.js"></script>
<search-carousel
  searchurl="https://caccl-miracosta.primo.exlibrisgroup.com/primaws/rest/external/pnxs?acTriggered=false&amp;disableCache=false&amp;getMore=0&amp;inst=01CACCL_MIRACOSTA&amp;isCDSearch=true&amp;lang=en&amp;limit=10&amp;newspapersActive=false&amp;newspapersSearch=false&amp;offset=0&amp;q=cdparentid,exact,8199591380005274&amp;qExclude=&amp;qInclude=&amp;refEntryActive=false&amp;rtaLinks=true&amp;scope=browse_search&amp;skipDelivery=Y&amp;sort=date_d&amp;tab=Everything&amp;vid=01CACCL_MIRACOSTA:MIRACOSTA"
  desiredCardCount="4"
  parallelBatchSize="10">
</search-carousel>
```

Notes:

- The script tag **must** use `type="module"`, not `text/javascript`.
- Set `desiredCardCount` to the number of cards you want.
- Keep `&amp;` between URL parameters in the HTML attribute.

## Accessibility

Cards are image-only visually, but title and author are exposed to screen readers inside the shadow DOM (see [src/pnx-card.ts](src/pnx-card.ts)):

- **Link label:** each card is an `<a>` with `aria-label="View details for <type> "<title>" by <author> (opens in a new tab)"` (author omitted when the record has none). Links open in a new tab with `rel="noopener noreferrer"`.
- **Image alt text:** thumbnails use `alt="Cover image for <type> "<title>" by <author>"`. The fallback placeholder (when no image loads) is `role="img"` with the same label, and its 📚 icon is `aria-hidden`.
- **Metadata source:** title comes from the PNX `display.title` (falling back to `addata` title fields); author from `display.creator` with Primo `$$` markup stripped.
- **Structure:** cards are rendered as a list (`<ul>`/`<li>`) labelled "Search results" (or "Search results for `titleText`"), and the list is `aria-live="polite"` so cards added during progressive loading may be announced.
- **Keyboard and visual:** cards are focusable links with a visible, customizable focus outline (`--pnx-card-focus-color`, `--pnx-card-focus-width`). High-contrast (`prefers-contrast`) and reduced-motion (`prefers-reduced-motion`) preferences are respected.

Caveats:

- The visible title/author text is currently commented out, so that information is available to screen readers only.

## Development

Standard Lit starter (`lit-starter-ts`) tooling:

```bash
npm i                 # install dependencies
npm run build         # compile TypeScript
npm run build:watch   # rebuild on change
npm run serve         # dev server: http://localhost:8000/dev/index.html
npm test              # web-test-runner (dev and prod Lit modes)
npm run lint          # ESLint + lit-analyzer
rollup -c             # bundle/minify into dist/
```

Prettier handles formatting (`.prettierrc.json`). The [lit-plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin) VS Code extension is recommended. See [Lit's Get started](https://lit.dev/docs/getting-started/) for more.
