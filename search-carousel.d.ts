import { LitElement } from 'lit';
import './pnx-card.js';
export declare class SearchCarousel extends LitElement {
    searchUrl: string;
    titleText: string | undefined;
    titleLink: string | undefined;
    desiredCardCount: number;
    parallelBatchSize: number;
    private docsWithThumbnails;
    private isLoading;
    private viewId;
    private language;
    private scope;
    private tab;
    private institution;
    private host;
    private thumbnailCache;
    constructor();
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    /**
     * Parse URL parameters from searchUrl
     */
    private parseUrlParams;
    /**
     * Get cache key for a document
     */
    private getDocCacheKey;
    /**
     * Start progressive fetching - cards render as they are found
     */
    private startProgressiveFetch;
    /**
     * Process documents in parallel batches for thumbnail checking
     * Cards are added to docsWithThumbnails as they are validated (progressive rendering)
     */
    private processDocsInParallel;
    /**
     * Check if a document has a valid thumbnail using static method
     * Returns {doc, thumbnailUrl} if valid, null otherwise
     */
    private checkDocumentThumbnail;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=search-carousel.d.ts.map