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
    private almaDThumbnailBaseURL;
    render(): import("lit-html").TemplateResult<1>;
    /**
     * Check if this document has a valid thumbnail image available
     */
    hasThumbnailImage(): Promise<boolean>;
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
    private handleLink;
    private getSyndetixWithProxy;
}
//# sourceMappingURL=pnx-card.d.ts.map