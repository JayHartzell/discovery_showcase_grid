import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from './pnx-card-style';
import { until } from 'lit-html/directives/until.js';


@customElement('pnx-card')
export class PnxCard extends LitElement {


    static override styles = styles;
    @property()
    doc: any;
    @property()
    host!: string;
    @property()
    institution!: string | null; // Allow null
    @property()
    vid!: string | null; // Allow null
    @property()
    language!: string | null; // Allow null
    @property()
    scope!: string | null; // Allow null
    @property()
    tab!: string | null; // Allow null
    @property()
    defaultThumbnailUrl: string | undefined;
    @property()
    preloadedThumbnailUrl: string | undefined; // Pre-validated thumbnail URL from search-carousel
    
    private almaDThumbnailBaseURL!: string;

    override render() {
        this.almaDThumbnailBaseURL = this.getAlmaDThumbnailBaseUrl()
        
        // Extract document metadata for accessibility
        const title = this.getDocumentTitle();
        const author = this.getDocumentAuthor();
        const altText = this.generateImageAltText(title, author);
        const linkAriaLabel = this.generateLinkAriaLabel(title, author);
        
        const imagePlaceHolder = html`<div 
            style="background-color: ${this.getRandomColor()}" 
            class="image-place-holder"
            role="img"
            aria-label="${altText}">
            <span aria-hidden="true">📚</span>
        </div>`;
        
        // Use preloaded thumbnail URL if available (from progressive loading)
        // Otherwise fall back to fetching thumbnail
        let imgPromise: Promise<any>;
        if (this.preloadedThumbnailUrl) {
            imgPromise = Promise.resolve(html`<img src="${this.preloadedThumbnailUrl}" alt="${altText}" loading="lazy" />`);
        } else {
            const img = this.getThumbnailLinks();
            imgPromise = img.then(url => {
                return html`<img src="${url}" alt="${altText}" loading="lazy" />`;
            }).catch(() => imagePlaceHolder);
        }
        
        const deeplink = this.getDeeplink();
        return html`
            <a  
                href="${deeplink ? deeplink : '#'}" 
                target="_blank" 
                aria-label="${linkAriaLabel}"
                role="link">
                ${until(imgPromise, imagePlaceHolder)}
                <!-- <div class="title">${title}</div>
                <div class="description">${author}</div> -->
            </a>
            
        `
    }

    /**
     * Check if this document has a valid thumbnail image available
     */
    async hasThumbnailImage(): Promise<boolean> {
        try {
            const thumbnailUrl = await this.getThumbnailLinks();
            // Consider it has a thumbnail if we get a URL that's not empty
            return !!thumbnailUrl && thumbnailUrl !== '';
        } catch (error) {
            return false;
        }
    }

    /**
     * Static method to check thumbnail for a document without creating a DOM element
     * Used by search-carousel for efficient parallel thumbnail checking
     */
    static async checkThumbnailForDoc(
        doc: any, 
        config: {
            host: string;
            institution: string | null;
            vid: string | null;
            language: string | null;
            scope: string | null;
            tab: string | null;
        }
    ): Promise<string | null> {
        // Create a minimal instance just for thumbnail checking (not attached to DOM)
        const checker = new PnxCard();
        checker.doc = doc;
        checker.host = config.host;
        checker.institution = config.institution;
        checker.vid = config.vid;
        checker.language = config.language;
        checker.scope = config.scope;
        checker.tab = config.tab;
        
        try {
            const thumbnailUrl = await checker.getThumbnailLinksStatic();
            return thumbnailUrl || null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Get thumbnail links without default fallback - for static checking
     */
    async getThumbnailLinksStatic(): Promise<string | null> {
        try {
            this.almaDThumbnailBaseURL = this.getAlmaDThumbnailBaseUrl();
            const linksArray = this.doc.delivery?.link || [];
            const thumbnailLinks = linksArray.filter((e: any) => e.displayLabel === 'thumbnail');

            const almaD = await this.getThumbnailFromAlmaD();
            if (almaD && typeof almaD === 'string' && almaD !== '') return almaD;

            const other = await this.getThumbnailFromOther(thumbnailLinks);
            if (other && typeof other === 'string' && other !== '') return other;

            const syndeticsEXL = await this.getThumbnailFromSyndeticsEXL(thumbnailLinks);
            if (syndeticsEXL && typeof syndeticsEXL === 'string' && syndeticsEXL !== '') return syndeticsEXL;

            const syndetics = await this.getThumbnailFromSyndetics(thumbnailLinks);
            if (syndetics && typeof syndetics === 'string' && syndetics !== '') return syndetics;

            const google = await this.getThumbnailFromGoogle(thumbnailLinks);
            if (google && typeof google === 'string' && google !== '') return google;

            // No default fallback - return null if no thumbnail found
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Extract the document title from various possible fields
     */
    private getDocumentTitle(): string {
        const display = this.doc?.pnx?.display;
        const addata = this.doc?.pnx?.addata;
        
        // Try multiple title fields in order of preference
        return display?.title?.[0] || 
               addata?.btitle?.[0] || 
               addata?.addtitle?.[0] || 
               display?.source?.[0] || 
               'Document';
    }

    /**
     * Extract the document author from various possible fields
     */
    private getDocumentAuthor(): string {
        const display = this.doc?.pnx?.display;
        const addata = this.doc?.pnx?.addata;
        
        // Try multiple author fields in order of preference
        const author = display?.creator?.[0] || 
                      addata?.au?.[0] || 
                      addata?.aulast?.[0];
        
        if (author) {
            // Clean up author name (remove $$ markup and extra formatting)
            return author.replace(/\$\$[A-Z].*?(?=\$\$|$)/g, '').replace(/\$\$.*$/, '').trim();
        }
        
        return '';
    }

    /**
     * Generate descriptive alt text for images
     */
    private generateImageAltText(title: string, author: string): string {
        const type = this.getDocumentType();
        
        if (author) {
            return `Cover image for ${type} "${title}" by ${author}`;
        } else {
            return `Cover image for ${type} "${title}"`;
        }
    }

    /**
     * Generate aria-label for the main link
     */
    private generateLinkAriaLabel(title: string, author: string): string {
        const type = this.getDocumentType();
        
        if (author) {
            return `View details for ${type} "${title}" by ${author}`;
        } else {
            return `View details for ${type} "${title}"`;
        }
    }

    /**
     * Get document type for better accessibility descriptions
     */
    private getDocumentType(): string {
        const type = this.doc?.pnx?.display?.type?.[0];
        const format = this.doc?.pnx?.display?.format?.[0];
        
        // Map common types to more user-friendly terms
        const typeMap: { [key: string]: string } = {
            'book': 'book',
            'journal': 'journal',
            'newspaper': 'newspaper',
            'article': 'article',
            'thesis': 'thesis',
            'dissertation': 'dissertation',
            'conference': 'conference paper',
            'patent': 'patent',
            'review': 'review',
            'report': 'report'
        };

        if (type && typeMap[type.toLowerCase()]) {
            return typeMap[type.toLowerCase()];
        }

        // Check format if type is not clear
        if (format) {
            if (format.toLowerCase().includes('electronic') || format.toLowerCase().includes('online')) {
                return 'digital resource';
            }
        }

        return 'item';
    }

    getAlmaDThumbnailBaseUrl() {
        const parsedUrl = new URL(this.doc["@id"]);
        return `${parsedUrl.origin}/view/delivery/thumbnail`
    }

    private getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    private getDeeplink() {
        let deeplink = "";
        const parsedUrl = new URL(this.doc["@id"]);
        const protocol = this.getProtocol(parsedUrl);
        const primoMapping = this.isPrimo() ? "/primo-explore" : "/discovery";
        const state = this.getState();
        const recordId = this.doc.pnx.control.recordid;
        const context = this.doc.context;

        // Ensure all parts are strings before concatenation
        const vid = this.vid ?? '';
        const lang = this.language ?? 'en'; // Default to 'en' if null
        const scp = this.scope ?? '';
        const tb = this.tab ?? '';

        deeplink = protocol + this.host + primoMapping + state + "&docid=" + recordId + "&context=" + context + "&vid=" + vid + "&lang=" + lang + "&search_scope=" + scp + "&tab=" + tb;

        return deeplink;
    }
    private getProtocol(url: URL) {
        return url.protocol + "//";
    }

    private isPrimo() {
        return false;
        //TODO
    }
    private getState() {
        return "/fulldisplay?"
    }

    private async getThumbnailLinks() {

        try {
            let linksArray = this.doc.delivery.link || [];
            // let type = this.getType(false, this.doc);

            // const defaultThumbnail = this.defineDefaultThumbnail(type);
            let thumbnailLinks = linksArray.filter((e: any) => e.displayLabel === 'thumbnail')

            const almaD = await this.getThumbnailFromAlmaD();
            if (almaD) {
              return almaD;
            }

            let other = await this.getThumbnailFromOther(thumbnailLinks);
            if (other) {
                return other;
            }

            const syndeticsEXL = await this.getThumbnailFromSyndeticsEXL(thumbnailLinks);
            if (syndeticsEXL) {
                return syndeticsEXL;
            }

            const syndetics = await this.getThumbnailFromSyndetics(thumbnailLinks);
            if (syndetics) {
                return syndetics;
            }

            const google = await this.getThumbnailFromGoogle(thumbnailLinks);
            if (google) {
                return google;
            }

            if (this.defaultThumbnailUrl) {
                return this.defaultThumbnailUrl
            }

            throw 'no thumbnail';

        } catch (error) {
            throw error; // Rethrow the error for higher-level error handling
        }
    }

    private async getThumbnailFromAlmaD() {
        try {
            if (this.isAlmaD()) {
                const thumbnailLink = await this.getAlmaDigitalThumbnailForPnx();
                return await this.resolveAlmaDigitalImage(thumbnailLink);
            } else {
                return '';
            }
        } catch (error) {
            console.error('Error in getThumbnailFromAlmaD:', error);
            return '';
        }
    }

    private async getThumbnailFromOther(thumbnailLinks: any) {

        let otherThumbnailLinks = thumbnailLinks.filter(this.getAllButSpecificLinkFilterFactory('amazon'));
        otherThumbnailLinks = otherThumbnailLinks.filter(this.getAllButSpecificLinkFilterFactory('syndetics.com'));
        otherThumbnailLinks = otherThumbnailLinks.filter(this.getAllButSpecificLinkFilterFactory('google.com'));

        if (otherThumbnailLinks.length) {
            const promiseArray = otherThumbnailLinks.map((link: any) => {
                this.removeLabelFromLinkUrl(link);
                return this.getImageLink(link.linkURL);
            });

            try {
                const result = await Promise.race(promiseArray);
                return result || '';
            } catch (error) {
                // console.error('Error fetching images:', error);
                return '';
            }
        } else {
            return '';
        }
    }
    private getAllButSpecificLinkFilterFactory( linkIdentifier:string) {
        return (thumbnailLink : any) => {
            if (typeof thumbnailLink === 'string') {
                return thumbnailLink.indexOf(linkIdentifier) === -1
            }
            let linkURL = thumbnailLink?.linkURL;
            if(!linkURL) {
                return false;
            }
            if (typeof linkURL === 'string') {
                return linkURL.indexOf(linkIdentifier) === -1;
            }
            return linkURL.linkURL.indexOf(linkIdentifier) === -1;
        }
    }

    private async getThumbnailFromSyndeticsEXL(thumbnailLinks: any, useUnbound?: boolean) {
        const syndeticsLinks = thumbnailLinks.filter((link: any) => this.getSpecificLink(link, 'syndetics.com') || this.getSpecificLink(link, 'primo'));

        if (syndeticsLinks.length > 0 || !this.isPrimo()) {
            const isbns = [...new Set((this.doc?.pnx?.addata?.isbn || []).concat(this.doc?.pnx?.addata?.eisbn || []))];
            const issns = [...new Set((this.doc?.pnx?.addata?.issn || []).concat(this.doc?.pnx?.addata?.eissn || []))];
            const upc = this.doc?.pnx?.addata?.upcid || [];

            const syntetixBaseUrl = `https://syndetics.com/index.php?client=primo&${useUnbound? 'type=unbound&' : ''}`;

            for (const isbn of isbns) {
                syndeticsLinks.push(this.createLinkObj(`${syntetixBaseUrl}isbn=${isbn}/lc.jpg`));
            }

            for (const issn of issns) {
                syndeticsLinks.push(this.createLinkObj(`${syntetixBaseUrl}issn=${issn}/lc.jpg`));
            }

            for (const code of upc) {
                syndeticsLinks.push(this.createLinkObj(`${syntetixBaseUrl}upc=${code}/lc.jpg`));
            }

            if (syndeticsLinks.length > 0) {
                return this.handleSyndeticsThumbnailLinks(syndeticsLinks);
            }
        }

        return '';
    }

    private async getThumbnailFromSyndetics(thumbnailLinks: any) {
        const syndeticsLinks = thumbnailLinks.filter((link: any) => this.getSpecificLink(link, 'syndetics.com'));

        if (syndeticsLinks.length > 0) {
            return this.handleSyndeticsThumbnailLinks(syndeticsLinks);
        }
        return '';
    }

    public getSpecificLink(thumbnailLink: any, linkIdentifier: any) {

        if (typeof thumbnailLink === 'string') {//todo change
            return thumbnailLink.indexOf(linkIdentifier) > -1;
        }
        let linkURL = thumbnailLink ? thumbnailLink.linkURL : undefined;
        if (!linkURL) {
            return false;
        }
        if (typeof linkURL === 'string') {//todo change
            return linkURL.indexOf(linkIdentifier) > -1;
        }
        return linkURL.linkURL.indexOf(linkIdentifier) > -1;
    }

    private async handleSyndeticsThumbnailLinks(syndeticsLinks: any) {
        let syndeticsProxy = this.getSyndetixWithProxy();
        let promiseArray = syndeticsLinks.map((link: any) => {
            const imageUrl = link.linkURL.replace('https://syndetics.com/index.php?client=', syndeticsProxy);
            return this.getImageLink(imageUrl);
        })
        return await this.createPromiseOnlyFailOnAllFailedResolveFirstSuccess(promiseArray);
    }

    private async getThumbnailFromGoogle(thumbnailLinks: any) {

        if (this.showICPLicenseFooter()) {
            return '';
        }

        const googleLink = thumbnailLinks.find((link: any) => this.getSpecificLink(link, 'books.google.com'));

        if (!googleLink) {
            return ''; // early return if no Google link is found
        }

        try {
            const linkUrl = googleLink.linkURL;
            const gbUrl = linkUrl.replace('&callback=updateGBSCover', '');
            const response = await fetch(gbUrl);
            const data = await response.text();
            let jsonData = JSON.parse(data.substring(data.indexOf('{'),data.indexOf('}')+2));
            const keys = Object.keys(jsonData);

            if (keys.length > 0) {
                let thumbnailUrl = jsonData[keys[0]].thumbnail_url;

                if (thumbnailUrl) {
                    const returnedLink = {
                        displayLabel: 'thumbnail',
                        linkType: 'http://purl.org/pnx/linkType/thumbnail',
                        linkURL: this.handleLink(thumbnailUrl),
                    };
                    return returnedLink.linkURL;
                }
            }


        } catch (error) {
            return '';
        }

        return '';
    }

    public async createPromiseOnlyFailOnAllFailedResolveFirstSuccess(promiseArray: any) {
        const reflectedPromises = promiseArray.map(this.reflect);
        const results = await Promise.all(reflectedPromises);

        const successfulResult = results.find(result => result.status === 'resolved');
        if (successfulResult) {
            return (successfulResult.value);
        } else {
            return ('');
        }
    }
    private reflect(promise: any) {
        return promise.then(
            (v: any) => ({ value: v, status: "resolved" }),
            (e: any) => ({ error: e, status: "rejected" })
        );
    }
    private showICPLicenseFooter() {
        return false;
    }
    private removeLabelFromLinkUrl(thumbnailLink: any) {
        let linkUrl = thumbnailLink.linkURL;
        if (linkUrl && linkUrl.includes('$$L')) {
            thumbnailLink.linkURL = linkUrl.substr(0, linkUrl.indexOf('$$L')).trim();
        }
    }

    private isAlmaD() {
        if (this.isPrimo()) {
            return false;
        }
        if (this.doc.context === 'SP' && this.doc?.pnx?.control?.sourceid === 'alma' && this.doc.delivery?.electronicServices) {
            return (this.doc.delivery.electronicServices.filter(
                (svc: any) => svc.serviceType === 'DIGITAL').length > 0);
        } else {
            return this.doc.delivery['hasD'] === true || this.doc.delivery['digitalAuxiliaryMode'] === true;
        }
    }

    private async getAlmaDigitalThumbnailForPnx(): Promise<string> {
        const mmsId = this.doc?.pnx?.control?.sourcerecordid?.[0];
        const institutionCode = this.doc?.delivery?.recordInstitutionCode || this.institution;
        let thumbnailUrl = this.getAlmaDigitalThumbnailUrl(mmsId);

        // For shared D - find the correct link to the thumbnail
        if (this.doc?.delivery?.sharedDigitalCandidates && this.doc.delivery.sharedDigitalCandidates.length > 0) {
            const response = await fetch(`${this.almaDThumbnailBaseURL}/${institutionCode}/${mmsId}?vid=${this.vid}`, {method: 'POST', body: JSON.stringify(this.doc?.delivery?.sharedDigitalCandidates)});
            thumbnailUrl = (await response.json()).data as string;
        } else if (this.doc?.pnx?.control?.isDedup) {
            const response = await fetch(`${this.almaDThumbnailBaseURL}/${mmsId}?vid=${this.vid}`);
            if (!(await response.json())?.data?.hasDigitalInventory) {
                return '';
            }
        }

        if (this.isEsploroRecord()) {
            thumbnailUrl += '?calculateAccessRights=true';
        }

        return thumbnailUrl;
    }

    private isEsploroRecord() {
        return this.doc.pnx.control.sourceformat?.[0] === 'ESPLORO' || false;
    }
    private getAlmaDigitalThumbnailUrl(mmsId: any) {
        return `${this.almaDThumbnailBaseURL}/${this.institution}/${mmsId}`
    }

    private resolveAlmaDigitalImage(thumbnailUrl: any) {
        return this.getImageLink(thumbnailUrl);
    }

    private createLinkObj(url: any) {
        return {
            displayLabel: 'thumbnail',
            linkType: 'http://purl.org/pnx/linkType/thumbnail',
            linkURL: url
        };
    }

    public async getImageLink(imageUrl: string) {
        return new Promise((resolve, reject) => {
            if (!imageUrl) {
                reject('');
                return;
            }

            const image = new Image();
            image.onload = () => {
                if (image.width > 1) {
                    resolve(imageUrl);
                } else {
                    reject('');
                }
            };

            image.onerror = () => {
                reject('');
            };

            image.src = this.handleLink(imageUrl);
        });
    }

    private handleLink(link: string) {
        let newLink = link;
        if (window.location.protocol === 'https:') {
            newLink = link.replace('http://', 'https://');
        }
        return newLink;
    }

    private getSyndetixWithProxy() {
        return "https://proxy-na.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client="
    }
}



