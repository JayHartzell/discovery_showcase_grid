import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {until} from 'lit/directives/until.js';
import './pnx-card.js'; // Ensures PnxCard is defined

@customElement('search-carousel')
export class SearchCarousel extends LitElement {
    @property() searchUrl: string = '';
    @property() titleText: string | undefined;
    @property() titleLink: string | undefined;
    @property() defaultThumbnailUrl: string | undefined;
    @property({type: Number}) desiredCardCount: number = 10; // New property for desired number of cards to display

    @state()
    private data: any;
    private viewId!: string | null;
    private language!: string | null;
    private scope!: string | null;
    private tab!: string | null;
    private institution!: string | null;
    private host!: string | null;

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
        // We'll initialize the data promise here but actual fetching happens in render
        // when we have access to parsed URL parameters
        this.data = Promise.resolve({ docs: [] });
    }

    async performQuery() {
        try {
            const response = await fetch(this.searchUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = response.json(); // This returns a promise
        } catch (error) {
            console.error("Failed to perform query:", error);
            this.data = Promise.resolve({ docs: [] }); // Ensure data is a resolved promise with empty docs on error
        }
    }

    /**
     * Fetch additional results to ensure we have enough cards with thumbnails
     */
    async fetchResultsWithThumbnails(): Promise<any[]> {
        const docsWithThumbnails: any[] = [];
        let offset = 0;
        const batchSize = Math.max(this.desiredCardCount * 2, 20); // Fetch 2x desired amount or minimum 20
        const maxAttempts = 5; // Prevent infinite loops
        let attempts = 0;

        while (docsWithThumbnails.length < this.desiredCardCount && attempts < maxAttempts) {
            try {
                // Modify the search URL to include current offset and increased limit
                const url = new URL(this.searchUrl);
                url.searchParams.set('offset', offset.toString());
                url.searchParams.set('limit', batchSize.toString());

                const response = await fetch(url.toString());
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (!data || !data.docs || data.docs.length === 0) {
                    break; // No more results available
                }

                // Check each document for thumbnail availability
                for (const doc of data.docs) {
                    if (docsWithThumbnails.length >= this.desiredCardCount) {
                        break;
                    }

                    // Create a temporary card to check if it has a thumbnail
                    const tempCard = document.createElement('pnx-card') as any;
                    tempCard.doc = doc;
                    tempCard.host = this.host ?? '';
                    tempCard.institution = this.institution;
                    tempCard.vid = this.viewId;
                    tempCard.language = this.language;
                    tempCard.scope = this.scope;
                    tempCard.tab = this.tab;
                    tempCard.defaultThumbnailUrl = this.defaultThumbnailUrl;

                    try {
                        const hasThumbnail = await tempCard.hasThumbnailImage();
                        if (hasThumbnail) {
                            docsWithThumbnails.push(doc);
                        }
                    } catch (error) {
                        console.warn('Error checking thumbnail for document:', error);
                        // Skip this document if we can't determine thumbnail status
                    }
                }

                offset += batchSize;
                attempts++;

                // If we got fewer results than requested, we've reached the end
                if (data.docs.length < batchSize) {
                    break;
                }

            } catch (error) {
                console.error(`Failed to fetch batch at offset ${offset}:`, error);
                break;
            }
        }

        return docsWithThumbnails.slice(0, this.desiredCardCount); // Ensure we don't exceed desired count
    }

    // Removed createRenderRoot override to allow shadow DOM and proper CSS scoping
    override render() {
        console.log('SearchCarousel render called, data:', this.data);
        if (!this.data) {
            return html`
                <div class="gallery-container">
                    <p role="status" aria-live="polite">Loading search results...</p>
                </div>`;
        }
        const parsedUrl = new URL(this.searchUrl);
        this.host = parsedUrl.host;
        this.viewId = parsedUrl.searchParams.get("vid");
        this.language = parsedUrl.searchParams.get("lang")
        this.scope = parsedUrl.searchParams.get("scope")
        this.tab = parsedUrl.searchParams.get("tab")
        this.institution = parsedUrl.searchParams.get("inst")

        const docsPromise = this.fetchResultsWithThumbnails().then((docsWithThumbnails: any[]) => {
            console.log('Filtered docs with thumbnails:', docsWithThumbnails);
            
            if (docsWithThumbnails.length === 0) {
                return html`
                    <p role="status" aria-live="polite">
                        No items with thumbnail images found in the search results.
                    </p>`;
            }
            
            const totalResults = docsWithThumbnails.length;
            const resultsAnnouncement = `Showing ${totalResults} item${totalResults === 1 ? '' : 's'} with thumbnail images`;
            
            return html`
                <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    ${resultsAnnouncement}
                </div>
                ${docsWithThumbnails.map((doc: any, index: number) =>
                    html`
                        <pnx-card 
                            .doc="${doc}" 
                            .host="${this.host ?? ''}" 
                            .institution="${this.institution}"
                            .vid="${this.viewId}"
                            .language="${this.language}" 
                            .scope="${this.scope}"
                            .tab="${this.tab}" 
                            .defaultThumbnailUrl="${this.defaultThumbnailUrl}"
                            role="gridcell"
                            aria-posinset="${index + 1}"
                            aria-setsize="${totalResults}">
                        </pnx-card>
                    `)}`;
        }).catch((error: any) => {
            console.error("Error processing data for rendering:", error);
            return html`
                <p role="alert" aria-live="assertive">
                    Error loading search results. Please try refreshing the page or contact support if the problem persists.
                </p>`;
        });

        console.log('Rendering grid container');
        return html`
            <div class="gallery-container">
                <div 
                    class="grid-container"
                    role="grid"
                    aria-label="${this.titleText ? `Search results for ${this.titleText}` : 'Search results'}"
                    aria-live="polite">
                    ${until(docsPromise, html`
                        <p role="status" aria-live="polite">
                            Loading search results, please wait...
                        </p>`)}
                </div>
                ${this.getButtonHtml()}
            </div>
        `;
    }

    // Removed updated() method as it was for Swiper initialization

    // Removed activateChangeAriaLabel() method

    private getButtonHtml() {
        if (this.titleText && this.titleLink) {
            return html`
                <div class="button-container">
                    <a href="${this.titleLink}" class="action-button">${this.titleText}</a>
                </div>
            `;
        }
        return html``;
    }
}
