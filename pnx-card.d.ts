import { LitElement } from "lit";
export declare class PnxCard extends LitElement {
    static styles: import("lit").CSSResult;
    doc: any;
    host: string;
    institution: string | null;
    vid: string | null;
    language: string | null;
    scope: string | null;
    tab: string | null;
    defaultThumbnailUrl: string | undefined;
    preloadedThumbnailUrl: string | undefined;
    trustedDomains: string[];
    private almaDThumbnailBaseURL;
    render(): import("lit-html").TemplateResult<1>;
    /**
     * Check if this document has a valid thumbnail image available
     */
    hasThumbnailImage(): Promise<boolean>;
    /**
     * Static method to check thumbnail for a document without creating a DOM element
     * Used by search-carousel for efficient parallel thumbnail checking
     */
    static checkThumbnailForDoc(doc: any, config: {
        host: string;
        institution: string | null;
        vid: string | null;
        language: string | null;
        scope: string | null;
        tab: string | null;
        trustedDomains?: string[];
    }): Promise<string | null>;
    /**
     * Get thumbnail links without default fallback - for static checking
     */
    getThumbnailLinksStatic(): Promise<string | null>;
    /**
     * Extract the document title from various possible fields
     */
    private getDocumentTitle;
    /**
     * Extract the document author from various possible fields
     */
    private getDocumentAuthor;
    /**
     * Generate descriptive alt text for images
     */
    private generateImageAltText;
    /**
     * Generate aria-label for the main link
     */
    private generateLinkAriaLabel;
    /**
     * Get document type for better accessibility descriptions
     */
    private getDocumentType;
    getAlmaDThumbnailBaseUrl(): string;
    private getRandomColor;
    private getDeeplink;
    private getProtocol;
    private isPrimo;
    private getState;
    private getThumbnailLinks;
    private getThumbnailFromAlmaD;
    private getThumbnailFromOther;
    private getAllButSpecificLinkFilterFactory;
    private getThumbnailFromSyndeticsEXL;
    private getThumbnailFromSyndetics;
    getSpecificLink(thumbnailLink: any, linkIdentifier: any): boolean;
    private handleSyndeticsThumbnailLinks;
    private getThumbnailFromGoogle;
    createPromiseOnlyFailOnAllFailedResolveFirstSuccess(promiseArray: any): Promise<any>;
    private reflect;
    private showICPLicenseFooter;
    private removeLabelFromLinkUrl;
    private isAlmaD;
    private getAlmaDigitalThumbnailForPnx;
    private isEsploroRecord;
    private getAlmaDigitalThumbnailUrl;
    private resolveAlmaDigitalImage;
    private createLinkObj;
    getImageLink(imageUrl: string): Promise<unknown>;
    /**
     * Check if a URL is from a trusted domain (skip validation to avoid CORS)
     */
    private isFromTrustedDomain;
    private handleLink;
    private getSyndetixWithProxy;
}
//# sourceMappingURL=pnx-card.d.ts.map