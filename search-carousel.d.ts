import { LitElement } from 'lit';
import './pnx-card.js';
export declare class SearchCarousel extends LitElement {
    searchUrl: string;
    titleText: string | undefined;
    titleLink: string | undefined;
    defaultThumbnailUrl: string | undefined;
    private data;
    private viewId;
    private language;
    private scope;
    private tab;
    private institution;
    private host;
    constructor();
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    performQuery(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    private getButtonHtml;
}
//# sourceMappingURL=search-carousel.d.ts.map