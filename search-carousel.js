var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import './pnx-card.js'; // Ensures PnxCard is defined
let SearchCarousel = class SearchCarousel extends LitElement {
    constructor() {
        super();
        this.searchUrl = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.performQuery();
    }
    async performQuery() {
        try {
            const response = await fetch(this.searchUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = response.json(); // This returns a promise
        }
        catch (error) {
            console.error("Failed to perform query:", error);
            this.data = Promise.resolve({ docs: [] }); // Ensure data is a resolved promise with empty docs on error
        }
    } // Removed createRenderRoot override to allow shadow DOM and proper CSS scoping
    render() {
        console.log('SearchCarousel render called, data:', this.data);
        if (!this.data) {
            return html `
                <div class="gallery-container">
                    <p role="status" aria-live="polite">Loading search results...</p>
                </div>`;
        }
        const parsedUrl = new URL(this.searchUrl);
        this.host = parsedUrl.host;
        this.viewId = parsedUrl.searchParams.get("vid");
        this.language = parsedUrl.searchParams.get("lang");
        this.scope = parsedUrl.searchParams.get("scope");
        this.tab = parsedUrl.searchParams.get("tab");
        this.institution = parsedUrl.searchParams.get("inst");
        const titleHtml = this.getTitleHtml();
        const docsPromise = this.data.then((data) => {
            console.log('Data received:', data);
            if (!data || !data.docs || data.docs.length === 0) {
                return html `
                    <p role="status" aria-live="polite">
                        No search results found. Try different search terms or check your search criteria.
                    </p>`;
            }
            const totalResults = data.docs.length;
            const resultsAnnouncement = `Showing ${totalResults} search result${totalResults === 1 ? '' : 's'}`;
            return html `
                <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    ${resultsAnnouncement}
                </div>
                ${data.docs.map((doc, index) => {
                var _a;
                return html `
                        <pnx-card 
                            .doc="${doc}" 
                            .host="${(_a = this.host) !== null && _a !== void 0 ? _a : ''}" 
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
                    `;
            })}`;
        }).catch((error) => {
            console.error("Error processing data for rendering:", error);
            return html `
                <p role="alert" aria-live="assertive">
                    Error loading search results. Please try refreshing the page or contact support if the problem persists.
                </p>`;
        });
        console.log('Rendering grid container');
        return html `
            <div class="gallery-container">
                ${titleHtml}
                <div 
                    class="grid-container"
                    role="grid"
                    aria-label="${this.titleText ? `Search results for ${this.titleText}` : 'Search results'}"
                    aria-live="polite">
                    ${until(docsPromise, html `
                        <p role="status" aria-live="polite">
                            Loading search results, please wait...
                        </p>`)}
                </div>
            </div>
        `;
    }
    // Removed updated() method as it was for Swiper initialization
    // Removed activateChangeAriaLabel() method
    getTitleHtml() {
        if (this.titleText) {
            if (this.titleLink) {
                return html `<h2><a href="${this.titleLink}">${this.titleText}</a></h2>`;
            }
            return html `<h2>${this.titleText}</h2>`;
        }
        return html ``;
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
        font-family: var(--search-carousel-title-font, inherit);
        font-weight: var(--search-carousel-title-weight, bold);
        text-align: var(--search-carousel-title-align, center);
        margin: var(--search-carousel-title-margin, 0 0 1em 0);
        line-height: var(--search-carousel-title-line-height, 1.2);
      }

      /* Specific styling for title links - inherits h2 color */
      .gallery-container h2 a {
        color: inherit; /* Inherits the h2 color */
        text-decoration: none;
      }

      .gallery-container h2 a:hover, 
      .gallery-container h2 a:focus {
        color: var(--search-carousel-title-hover-color, var(--search-carousel-title-color, #000));
        text-decoration: var(--search-carousel-title-hover-decoration, underline);
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
    property()
], SearchCarousel.prototype, "defaultThumbnailUrl", void 0);
__decorate([
    state()
], SearchCarousel.prototype, "data", void 0);
SearchCarousel = __decorate([
    customElement('search-carousel')
], SearchCarousel);
export { SearchCarousel };
//# sourceMappingURL=search-carousel.js.map