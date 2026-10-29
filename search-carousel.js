var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './pnx-card.js'; // Ensures PnxCard is defined
import { PnxCard } from './pnx-card.js';
let SearchCarousel = class SearchCarousel extends LitElement {
    constructor() {
        super();
        this.searchUrl = '';
        this.desiredCardCount = 10; // Desired number of cards to display
        this.parallelBatchSize = 10; // How many documents to check in parallel
        this.trustedThumbnailDomains = ''; // Comma-separated list of domains to skip thumbnail validation (avoids CORS issues)
        this.docsWithThumbnails = []; // Progressive rendering array
        this.isLoading = false;
        // Per-instance cache for thumbnail URLs (isolated from other search-carousel components)
        this.thumbnailCache = new Map();
    }
    connectedCallback() {
        super.connectedCallback();
        // Parse URL parameters and start fetching
        this.parseUrlParams();
        this.startProgressiveFetch();
    }
    /**
     * Parse URL parameters from searchUrl
     */
    parseUrlParams() {
        if (!this.searchUrl)
            return;
        const parsedUrl = new URL(this.searchUrl);
        this.host = parsedUrl.host;
        this.viewId = parsedUrl.searchParams.get("vid");
        this.language = parsedUrl.searchParams.get("lang");
        this.scope = parsedUrl.searchParams.get("scope");
        this.tab = parsedUrl.searchParams.get("tab");
        this.institution = parsedUrl.searchParams.get("inst");
    }
    /**
     * Get cache key for a document
     */
    getDocCacheKey(doc) {
        var _a, _b, _c, _d;
        return ((_c = (_b = (_a = doc === null || doc === void 0 ? void 0 : doc.pnx) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.recordid) === null || _c === void 0 ? void 0 : _c[0]) || (doc === null || doc === void 0 ? void 0 : doc['@id']) || JSON.stringify((_d = doc === null || doc === void 0 ? void 0 : doc.pnx) === null || _d === void 0 ? void 0 : _d.control);
    }
    /**
     * Start progressive fetching - cards render as they are found
     */
    async startProgressiveFetch() {
        if (this.isLoading)
            return;
        this.isLoading = true;
        this.docsWithThumbnails = [];
        let offset = 0;
        const fetchBatchSize = Math.max(this.desiredCardCount * 3, 30); // Fetch 3x desired to have enough candidates
        const maxAttempts = 5;
        let attempts = 0;
        while (this.docsWithThumbnails.length < this.desiredCardCount && attempts < maxAttempts) {
            try {
                // Fetch a batch of documents
                const url = new URL(this.searchUrl);
                url.searchParams.set('offset', offset.toString());
                url.searchParams.set('limit', fetchBatchSize.toString());
                const response = await fetch(url.toString());
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!data || !data.docs || data.docs.length === 0) {
                    break; // No more results available
                }
                // Process documents in parallel batches
                await this.processDocsInParallel(data.docs);
                offset += fetchBatchSize;
                attempts++;
                // If we got fewer results than requested, we've reached the end
                if (data.docs.length < fetchBatchSize) {
                    break;
                }
            }
            catch (error) {
                console.error(`Failed to fetch batch at offset ${offset}:`, error);
                break;
            }
        }
        this.isLoading = false;
    }
    /**
     * Process documents in parallel batches for thumbnail checking
     * Cards are added to docsWithThumbnails as they are validated (progressive rendering)
     */
    async processDocsInParallel(docs) {
        // Process in chunks of parallelBatchSize
        for (let i = 0; i < docs.length && this.docsWithThumbnails.length < this.desiredCardCount; i += this.parallelBatchSize) {
            const chunk = docs.slice(i, i + this.parallelBatchSize);
            // Check all documents in this chunk in parallel
            const thumbnailPromises = chunk.map(doc => this.checkDocumentThumbnail(doc));
            const results = await Promise.allSettled(thumbnailPromises);
            // Process results and add valid ones progressively
            for (let j = 0; j < results.length; j++) {
                if (this.docsWithThumbnails.length >= this.desiredCardCount) {
                    break;
                }
                const result = results[j];
                if (result.status === 'fulfilled' && result.value) {
                    // Add to reactive array - triggers re-render
                    this.docsWithThumbnails = [...this.docsWithThumbnails, result.value];
                }
            }
        }
    }
    /**
     * Check if a document has a valid thumbnail using static method
     * Returns {doc, thumbnailUrl} if valid, null otherwise
     */
    async checkDocumentThumbnail(doc) {
        var _a;
        const cacheKey = this.getDocCacheKey(doc);
        // Check cache first
        if (this.thumbnailCache.has(cacheKey)) {
            const cachedUrl = this.thumbnailCache.get(cacheKey);
            if (cachedUrl) {
                return { doc, thumbnailUrl: cachedUrl };
            }
            return null; // Cached as no thumbnail
        }
        try {
            // Parse trusted domains from comma-separated string
            const trustedDomains = this.trustedThumbnailDomains
                ? this.trustedThumbnailDomains.split(',').map(d => d.trim()).filter(d => d)
                : [];
            // Use the static method from PnxCard to check thumbnail
            const thumbnailUrl = await PnxCard.checkThumbnailForDoc(doc, {
                host: (_a = this.host) !== null && _a !== void 0 ? _a : '',
                institution: this.institution,
                vid: this.viewId,
                language: this.language,
                scope: this.scope,
                tab: this.tab,
                trustedDomains
            });
            // Cache the result
            this.thumbnailCache.set(cacheKey, thumbnailUrl || null);
            if (thumbnailUrl) {
                return { doc, thumbnailUrl };
            }
            return null;
        }
        catch (error) {
            // Cache as no thumbnail on error
            this.thumbnailCache.set(cacheKey, null);
            return null;
        }
    }
    // Removed createRenderRoot override to allow shadow DOM and proper CSS scoping
    render() {
        return html `
            <div class="gallery-container">
                <ul 
                    class="grid-container"
                    aria-label="${this.titleText ? `Search results for ${this.titleText}` : 'Search results'}"
                    aria-live="polite">
                    ${this.docsWithThumbnails.map((item) => {
            var _a;
            return html `
                            <li>
                                <pnx-card 
                                    .doc="${item.doc}" 
                                    .host="${(_a = this.host) !== null && _a !== void 0 ? _a : ''}" 
                                    .institution="${this.institution}"
                                    .vid="${this.viewId}"
                                    .language="${this.language}" 
                                    .scope="${this.scope}"
                                    .tab="${this.tab}"
                                    .preloadedThumbnailUrl="${item.thumbnailUrl}">
                                </pnx-card>
                            </li>
                        `;
        })}
                </ul>
            </div>
        `;
    }
};
SearchCarousel.styles = css `
      search-carousel {
        display: block;
        max-width: var(--search-carousel-max-width, 1200px);
        margin: 0 auto;
        font-size: var(--search-carousel-font-size, 14px);
        color: var(--search-carousel-text-color, #000);
      }

      .gallery-container {
        padding: var(--search-carousel-padding, 20px);
      }

      .gallery-container a {
        text-decoration: none;
        color: var(--search-carousel-link-color, black);
      }

      .gallery-container a:hover, .gallery-container a:focus {
        text-decoration: underline;
      }

      .gallery-container h2 {
        color: var(--search-carousel-title-color, #000);
        font-size: var(--search-carousel-title-size, 1.5em);
        font-family: var(--search-carousel-title-font, Arial, sans-serif);
        font-weight: var(--search-carousel-title-weight, bold);
        text-align: var(--search-carousel-title-align, center);
        margin: var(--search-carousel-title-margin, 0 0 1em 0);
        line-height: var(--search-carousel-title-line-height, 1.2);
      }

      .action-button {
        display: inline-block;
        margin-top: var(--search-carousel-button-margin, 20px);
        padding: var(--search-carousel-button-padding, 12px 24px);
        background-color: var(--search-carousel-button-bg, #FFFFFF);
        color: var(--search-carousel-button-color, #000000) !important;
        border: var(--search-carousel-button-border, none);
        border-radius: var(--search-carousel-button-radius, 6px);
        font-size: var(--search-carousel-button-size, 14px);
        font-family: var(--search-carousel-button-font, Arial, sans-serif);
        font-weight: var(--search-carousel-button-weight, 500);
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
        text-align: center;
      }

      .action-button:hover,
      .action-button:focus {
        background-color: var(--search-carousel-button-hover-bg, #0056b3);
        color: var(--search-carousel-button-color, #000000) !important;
        text-decoration: none;
      }

      .button-container {
        text-align: var(--search-carousel-button-align, center);
        margin-top: var(--search-carousel-button-container-margin, 20px);
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--search-carousel-min-card-width, 200px), 1fr));
        gap: var(--search-carousel-gap, 20px);
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .grid-container li {
        display: contents;
      }

      /* Screen reader only text for additional context */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      /* Responsive adjustments for the grid */
      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: repeat(auto-fill, minmax(var(--search-carousel-min-card-width-mobile, 150px), 1fr));
          gap: var(--search-carousel-gap-mobile, 15px);
        }
      }
    `;
__decorate([
    property()
], SearchCarousel.prototype, "searchUrl", void 0);
__decorate([
    property()
], SearchCarousel.prototype, "titleText", void 0);
__decorate([
    property()
], SearchCarousel.prototype, "titleLink", void 0);
__decorate([
    property({ type: Number })
], SearchCarousel.prototype, "desiredCardCount", void 0);
__decorate([
    property({ type: Number })
], SearchCarousel.prototype, "parallelBatchSize", void 0);
__decorate([
    property()
], SearchCarousel.prototype, "trustedThumbnailDomains", void 0);
__decorate([
    state()
], SearchCarousel.prototype, "docsWithThumbnails", void 0);
__decorate([
    state()
], SearchCarousel.prototype, "isLoading", void 0);
SearchCarousel = __decorate([
    customElement('search-carousel')
], SearchCarousel);
export { SearchCarousel };
//# sourceMappingURL=search-carousel.js.map