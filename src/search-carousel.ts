import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import './pnx-card.js'; // Ensures PnxCard is defined
import {PnxCard} from './pnx-card.js';

@customElement('search-carousel')
export class SearchCarousel extends LitElement {
    @property() searchUrl: string = '';
    @property() titleText: string | undefined;
    @property() titleLink: string | undefined;
    @property({type: Number}) desiredCardCount: number = 10; // Desired number of cards to display
    @property({type: Number}) parallelBatchSize: number = 10; // How many documents to check in parallel
    @property() trustedThumbnailDomains: string = ''; // Comma-separated list of domains to skip thumbnail validation (avoids CORS issues)

    @state()
    private docsWithThumbnails: Array<{doc: any, thumbnailUrl: string}> = []; // Progressive rendering array
    
    @state()
    private isLoading: boolean = false;
    
    private viewId!: string | null;
    private language!: string | null;
    private scope!: string | null;
    private tab!: string | null;
    private institution!: string | null;
    private host!: string | null;
    
    // Per-instance cache for thumbnail URLs (isolated from other search-carousel components)
    private thumbnailCache: Map<string, string | null> = new Map();

    constructor() {
        super();
    }

    static override styles = css`
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

    override connectedCallback() {
        super.connectedCallback();
        // Parse URL parameters and start fetching
        this.parseUrlParams();
        this.startProgressiveFetch();
    }

    /**
     * Parse URL parameters from searchUrl
     */
    private parseUrlParams() {
        if (!this.searchUrl) return;
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
    private getDocCacheKey(doc: any): string {
        return doc?.pnx?.control?.recordid?.[0] || doc?.['@id'] || JSON.stringify(doc?.pnx?.control);
    }

    /**
     * Start progressive fetching - cards render as they are found
     */
    private async startProgressiveFetch() {
        if (this.isLoading) return;
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

            } catch (error) {
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
    private async processDocsInParallel(docs: any[]) {
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
    private async checkDocumentThumbnail(doc: any): Promise<{doc: any, thumbnailUrl: string} | null> {
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
                host: this.host ?? '',
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
        } catch (error) {
            // Cache as no thumbnail on error
            this.thumbnailCache.set(cacheKey, null);
            return null;
        }
    }

    // Removed createRenderRoot override to allow shadow DOM and proper CSS scoping
    override render() {
        return html`
            <div class="gallery-container">
                <ul 
                    class="grid-container"
                    aria-label="${this.titleText ? `Search results for ${this.titleText}` : 'Search results'}"
                    aria-live="polite">
                    ${this.docsWithThumbnails.map((item) =>
                        html`
                            <li>
                                <pnx-card 
                                    .doc="${item.doc}" 
                                    .host="${this.host ?? ''}" 
                                    .institution="${this.institution}"
                                    .vid="${this.viewId}"
                                    .language="${this.language}" 
                                    .scope="${this.scope}"
                                    .tab="${this.tab}"
                                    .preloadedThumbnailUrl="${item.thumbnailUrl}">
                                </pnx-card>
                            </li>
                        `)}
                </ul>
            </div>
        `;
    }
}
