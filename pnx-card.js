var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PnxCard_1;
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from './pnx-card-style';
import { until } from 'lit-html/directives/until.js';
let PnxCard = PnxCard_1 = class PnxCard extends LitElement {
    render() {
        this.almaDThumbnailBaseURL = this.getAlmaDThumbnailBaseUrl();
        // Extract document metadata for accessibility
        const title = this.getDocumentTitle();
        const author = this.getDocumentAuthor();
        const altText = this.generateImageAltText(title, author);
        const linkAriaLabel = this.generateLinkAriaLabel(title, author);
        const imagePlaceHolder = html `<div 
            style="background-color: ${this.getRandomColor()}" 
            class="image-place-holder"
            role="img"
            aria-label="${altText}">
            <span aria-hidden="true">📚</span>
        </div>`;
        // Use preloaded thumbnail URL if available (from progressive loading)
        // Otherwise fall back to fetching thumbnail
        let imgPromise;
        if (this.preloadedThumbnailUrl) {
            imgPromise = Promise.resolve(html `<img src="${this.preloadedThumbnailUrl}" alt="${altText}" loading="lazy" />`);
        }
        else {
            const img = this.getThumbnailLinks();
            imgPromise = img.then(url => {
                return html `<img src="${url}" alt="${altText}" loading="lazy" />`;
            }).catch(() => imagePlaceHolder);
        }
        const deeplink = this.getDeeplink();
        return html `
            <a  
                href="${deeplink ? deeplink : '#'}" 
                target="_blank" 
                aria-label="${linkAriaLabel}"
                role="link">
                ${until(imgPromise, imagePlaceHolder)}
                <!-- <div class="title">${title}</div>
                <div class="description">${author}</div> -->
            </a>
            
        `;
    }
    /**
     * Check if this document has a valid thumbnail image available
     */
    async hasThumbnailImage() {
        try {
            const thumbnailUrl = await this.getThumbnailLinks();
            // Consider it has a thumbnail if we get a URL that's not empty
            return !!thumbnailUrl && thumbnailUrl !== '';
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Static method to check thumbnail for a document without creating a DOM element
     * Used by search-carousel for efficient parallel thumbnail checking
     */
    static async checkThumbnailForDoc(doc, config) {
        // Create a minimal instance just for thumbnail checking (not attached to DOM)
        const checker = new PnxCard_1();
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
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Get thumbnail links without default fallback - for static checking
     */
    async getThumbnailLinksStatic() {
        var _a;
        try {
            this.almaDThumbnailBaseURL = this.getAlmaDThumbnailBaseUrl();
            const linksArray = ((_a = this.doc.delivery) === null || _a === void 0 ? void 0 : _a.link) || [];
            const thumbnailLinks = linksArray.filter((e) => e.displayLabel === 'thumbnail');
            const almaD = await this.getThumbnailFromAlmaD();
            if (almaD && typeof almaD === 'string' && almaD !== '')
                return almaD;
            const other = await this.getThumbnailFromOther(thumbnailLinks);
            if (other && typeof other === 'string' && other !== '')
                return other;
            const syndeticsEXL = await this.getThumbnailFromSyndeticsEXL(thumbnailLinks);
            if (syndeticsEXL && typeof syndeticsEXL === 'string' && syndeticsEXL !== '')
                return syndeticsEXL;
            const syndetics = await this.getThumbnailFromSyndetics(thumbnailLinks);
            if (syndetics && typeof syndetics === 'string' && syndetics !== '')
                return syndetics;
            const google = await this.getThumbnailFromGoogle(thumbnailLinks);
            if (google && typeof google === 'string' && google !== '')
                return google;
            // No default fallback - return null if no thumbnail found
            return null;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Extract the document title from various possible fields
     */
    getDocumentTitle() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const display = (_b = (_a = this.doc) === null || _a === void 0 ? void 0 : _a.pnx) === null || _b === void 0 ? void 0 : _b.display;
        const addata = (_d = (_c = this.doc) === null || _c === void 0 ? void 0 : _c.pnx) === null || _d === void 0 ? void 0 : _d.addata;
        // Try multiple title fields in order of preference
        return ((_e = display === null || display === void 0 ? void 0 : display.title) === null || _e === void 0 ? void 0 : _e[0]) ||
            ((_f = addata === null || addata === void 0 ? void 0 : addata.btitle) === null || _f === void 0 ? void 0 : _f[0]) ||
            ((_g = addata === null || addata === void 0 ? void 0 : addata.addtitle) === null || _g === void 0 ? void 0 : _g[0]) ||
            ((_h = display === null || display === void 0 ? void 0 : display.source) === null || _h === void 0 ? void 0 : _h[0]) ||
            'Document';
    }
    /**
     * Extract the document author from various possible fields
     */
    getDocumentAuthor() {
        var _a, _b, _c, _d, _e, _f, _g;
        const display = (_b = (_a = this.doc) === null || _a === void 0 ? void 0 : _a.pnx) === null || _b === void 0 ? void 0 : _b.display;
        const addata = (_d = (_c = this.doc) === null || _c === void 0 ? void 0 : _c.pnx) === null || _d === void 0 ? void 0 : _d.addata;
        // Try multiple author fields in order of preference
        const author = ((_e = display === null || display === void 0 ? void 0 : display.creator) === null || _e === void 0 ? void 0 : _e[0]) ||
            ((_f = addata === null || addata === void 0 ? void 0 : addata.au) === null || _f === void 0 ? void 0 : _f[0]) ||
            ((_g = addata === null || addata === void 0 ? void 0 : addata.aulast) === null || _g === void 0 ? void 0 : _g[0]);
        if (author) {
            // Clean up author name (remove $$ markup and extra formatting)
            return author.replace(/\$\$[A-Z].*?(?=\$\$|$)/g, '').replace(/\$\$.*$/, '').trim();
        }
        return '';
    }
    /**
     * Generate descriptive alt text for images
     */
    generateImageAltText(title, author) {
        const type = this.getDocumentType();
        if (author) {
            return `Cover image for ${type} "${title}" by ${author}`;
        }
        else {
            return `Cover image for ${type} "${title}"`;
        }
    }
    /**
     * Generate aria-label for the main link
     */
    generateLinkAriaLabel(title, author) {
        const type = this.getDocumentType();
        if (author) {
            return `View details for ${type} "${title}" by ${author}`;
        }
        else {
            return `View details for ${type} "${title}"`;
        }
    }
    /**
     * Get document type for better accessibility descriptions
     */
    getDocumentType() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const type = (_d = (_c = (_b = (_a = this.doc) === null || _a === void 0 ? void 0 : _a.pnx) === null || _b === void 0 ? void 0 : _b.display) === null || _c === void 0 ? void 0 : _c.type) === null || _d === void 0 ? void 0 : _d[0];
        const format = (_h = (_g = (_f = (_e = this.doc) === null || _e === void 0 ? void 0 : _e.pnx) === null || _f === void 0 ? void 0 : _f.display) === null || _g === void 0 ? void 0 : _g.format) === null || _h === void 0 ? void 0 : _h[0];
        // Map common types to more user-friendly terms
        const typeMap = {
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
        return `${parsedUrl.origin}/view/delivery/thumbnail`;
    }
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    getDeeplink() {
        var _a, _b, _c, _d;
        let deeplink = "";
        const parsedUrl = new URL(this.doc["@id"]);
        const protocol = this.getProtocol(parsedUrl);
        const primoMapping = this.isPrimo() ? "/primo-explore" : "/discovery";
        const state = this.getState();
        const recordId = this.doc.pnx.control.recordid;
        const context = this.doc.context;
        // Ensure all parts are strings before concatenation
        const vid = (_a = this.vid) !== null && _a !== void 0 ? _a : '';
        const lang = (_b = this.language) !== null && _b !== void 0 ? _b : 'en'; // Default to 'en' if null
        const scp = (_c = this.scope) !== null && _c !== void 0 ? _c : '';
        const tb = (_d = this.tab) !== null && _d !== void 0 ? _d : '';
        deeplink = protocol + this.host + primoMapping + state + "&docid=" + recordId + "&context=" + context + "&vid=" + vid + "&lang=" + lang + "&search_scope=" + scp + "&tab=" + tb;
        return deeplink;
    }
    getProtocol(url) {
        return url.protocol + "//";
    }
    isPrimo() {
        return false;
        //TODO
    }
    getState() {
        return "/fulldisplay?";
    }
    async getThumbnailLinks() {
        try {
            let linksArray = this.doc.delivery.link || [];
            // let type = this.getType(false, this.doc);
            // const defaultThumbnail = this.defineDefaultThumbnail(type);
            let thumbnailLinks = linksArray.filter((e) => e.displayLabel === 'thumbnail');
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
                return this.defaultThumbnailUrl;
            }
            throw 'no thumbnail';
        }
        catch (error) {
            throw error; // Rethrow the error for higher-level error handling
        }
    }
    async getThumbnailFromAlmaD() {
        try {
            if (this.isAlmaD()) {
                const thumbnailLink = await this.getAlmaDigitalThumbnailForPnx();
                return await this.resolveAlmaDigitalImage(thumbnailLink);
            }
            else {
                return '';
            }
        }
        catch (error) {
            console.error('Error in getThumbnailFromAlmaD:', error);
            return '';
        }
    }
    async getThumbnailFromOther(thumbnailLinks) {
        let otherThumbnailLinks = thumbnailLinks.filter(this.getAllButSpecificLinkFilterFactory('amazon'));
        otherThumbnailLinks = otherThumbnailLinks.filter(this.getAllButSpecificLinkFilterFactory('syndetics.com'));
        otherThumbnailLinks = otherThumbnailLinks.filter(this.getAllButSpecificLinkFilterFactory('google.com'));
        if (otherThumbnailLinks.length) {
            const promiseArray = otherThumbnailLinks.map((link) => {
                this.removeLabelFromLinkUrl(link);
                return this.getImageLink(link.linkURL);
            });
            try {
                const result = await Promise.race(promiseArray);
                return result || '';
            }
            catch (error) {
                // console.error('Error fetching images:', error);
                return '';
            }
        }
        else {
            return '';
        }
    }
    getAllButSpecificLinkFilterFactory(linkIdentifier) {
        return (thumbnailLink) => {
            if (typeof thumbnailLink === 'string') {
                return thumbnailLink.indexOf(linkIdentifier) === -1;
            }
            let linkURL = thumbnailLink === null || thumbnailLink === void 0 ? void 0 : thumbnailLink.linkURL;
            if (!linkURL) {
                return false;
            }
            if (typeof linkURL === 'string') {
                return linkURL.indexOf(linkIdentifier) === -1;
            }
            return linkURL.linkURL.indexOf(linkIdentifier) === -1;
        };
    }
    async getThumbnailFromSyndeticsEXL(thumbnailLinks, useUnbound) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const syndeticsLinks = thumbnailLinks.filter((link) => this.getSpecificLink(link, 'syndetics.com') || this.getSpecificLink(link, 'primo'));
        if (syndeticsLinks.length > 0 || !this.isPrimo()) {
            const isbns = [...new Set((((_c = (_b = (_a = this.doc) === null || _a === void 0 ? void 0 : _a.pnx) === null || _b === void 0 ? void 0 : _b.addata) === null || _c === void 0 ? void 0 : _c.isbn) || []).concat(((_f = (_e = (_d = this.doc) === null || _d === void 0 ? void 0 : _d.pnx) === null || _e === void 0 ? void 0 : _e.addata) === null || _f === void 0 ? void 0 : _f.eisbn) || []))];
            const issns = [...new Set((((_j = (_h = (_g = this.doc) === null || _g === void 0 ? void 0 : _g.pnx) === null || _h === void 0 ? void 0 : _h.addata) === null || _j === void 0 ? void 0 : _j.issn) || []).concat(((_m = (_l = (_k = this.doc) === null || _k === void 0 ? void 0 : _k.pnx) === null || _l === void 0 ? void 0 : _l.addata) === null || _m === void 0 ? void 0 : _m.eissn) || []))];
            const upc = ((_q = (_p = (_o = this.doc) === null || _o === void 0 ? void 0 : _o.pnx) === null || _p === void 0 ? void 0 : _p.addata) === null || _q === void 0 ? void 0 : _q.upcid) || [];
            const syntetixBaseUrl = `https://syndetics.com/index.php?client=primo&${useUnbound ? 'type=unbound&' : ''}`;
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
    async getThumbnailFromSyndetics(thumbnailLinks) {
        const syndeticsLinks = thumbnailLinks.filter((link) => this.getSpecificLink(link, 'syndetics.com'));
        if (syndeticsLinks.length > 0) {
            return this.handleSyndeticsThumbnailLinks(syndeticsLinks);
        }
        return '';
    }
    getSpecificLink(thumbnailLink, linkIdentifier) {
        if (typeof thumbnailLink === 'string') { //todo change
            return thumbnailLink.indexOf(linkIdentifier) > -1;
        }
        let linkURL = thumbnailLink ? thumbnailLink.linkURL : undefined;
        if (!linkURL) {
            return false;
        }
        if (typeof linkURL === 'string') { //todo change
            return linkURL.indexOf(linkIdentifier) > -1;
        }
        return linkURL.linkURL.indexOf(linkIdentifier) > -1;
    }
    async handleSyndeticsThumbnailLinks(syndeticsLinks) {
        let syndeticsProxy = this.getSyndetixWithProxy();
        let promiseArray = syndeticsLinks.map((link) => {
            const imageUrl = link.linkURL.replace('https://syndetics.com/index.php?client=', syndeticsProxy);
            return this.getImageLink(imageUrl);
        });
        return await this.createPromiseOnlyFailOnAllFailedResolveFirstSuccess(promiseArray);
    }
    async getThumbnailFromGoogle(thumbnailLinks) {
        if (this.showICPLicenseFooter()) {
            return '';
        }
        const googleLink = thumbnailLinks.find((link) => this.getSpecificLink(link, 'books.google.com'));
        if (!googleLink) {
            return ''; // early return if no Google link is found
        }
        try {
            const linkUrl = googleLink.linkURL;
            const gbUrl = linkUrl.replace('&callback=updateGBSCover', '');
            const response = await fetch(gbUrl);
            const data = await response.text();
            let jsonData = JSON.parse(data.substring(data.indexOf('{'), data.indexOf('}') + 2));
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
        }
        catch (error) {
            return '';
        }
        return '';
    }
    async createPromiseOnlyFailOnAllFailedResolveFirstSuccess(promiseArray) {
        const reflectedPromises = promiseArray.map(this.reflect);
        const results = await Promise.all(reflectedPromises);
        const successfulResult = results.find(result => result.status === 'resolved');
        if (successfulResult) {
            return (successfulResult.value);
        }
        else {
            return ('');
        }
    }
    reflect(promise) {
        return promise.then((v) => ({ value: v, status: "resolved" }), (e) => ({ error: e, status: "rejected" }));
    }
    showICPLicenseFooter() {
        return false;
    }
    removeLabelFromLinkUrl(thumbnailLink) {
        let linkUrl = thumbnailLink.linkURL;
        if (linkUrl && linkUrl.includes('$$L')) {
            thumbnailLink.linkURL = linkUrl.substr(0, linkUrl.indexOf('$$L')).trim();
        }
    }
    isAlmaD() {
        var _a, _b, _c, _d;
        if (this.isPrimo()) {
            return false;
        }
        if (this.doc.context === 'SP' && ((_c = (_b = (_a = this.doc) === null || _a === void 0 ? void 0 : _a.pnx) === null || _b === void 0 ? void 0 : _b.control) === null || _c === void 0 ? void 0 : _c.sourceid) === 'alma' && ((_d = this.doc.delivery) === null || _d === void 0 ? void 0 : _d.electronicServices)) {
            return (this.doc.delivery.electronicServices.filter((svc) => svc.serviceType === 'DIGITAL').length > 0);
        }
        else {
            return this.doc.delivery['hasD'] === true || this.doc.delivery['digitalAuxiliaryMode'] === true;
        }
    }
    async getAlmaDigitalThumbnailForPnx() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const mmsId = (_d = (_c = (_b = (_a = this.doc) === null || _a === void 0 ? void 0 : _a.pnx) === null || _b === void 0 ? void 0 : _b.control) === null || _c === void 0 ? void 0 : _c.sourcerecordid) === null || _d === void 0 ? void 0 : _d[0];
        const institutionCode = ((_f = (_e = this.doc) === null || _e === void 0 ? void 0 : _e.delivery) === null || _f === void 0 ? void 0 : _f.recordInstitutionCode) || this.institution;
        let thumbnailUrl = this.getAlmaDigitalThumbnailUrl(mmsId);
        // For shared D - find the correct link to the thumbnail
        if (((_h = (_g = this.doc) === null || _g === void 0 ? void 0 : _g.delivery) === null || _h === void 0 ? void 0 : _h.sharedDigitalCandidates) && this.doc.delivery.sharedDigitalCandidates.length > 0) {
            const response = await fetch(`${this.almaDThumbnailBaseURL}/${institutionCode}/${mmsId}?vid=${this.vid}`, { method: 'POST', body: JSON.stringify((_k = (_j = this.doc) === null || _j === void 0 ? void 0 : _j.delivery) === null || _k === void 0 ? void 0 : _k.sharedDigitalCandidates) });
            thumbnailUrl = (await response.json()).data;
        }
        else if ((_o = (_m = (_l = this.doc) === null || _l === void 0 ? void 0 : _l.pnx) === null || _m === void 0 ? void 0 : _m.control) === null || _o === void 0 ? void 0 : _o.isDedup) {
            const response = await fetch(`${this.almaDThumbnailBaseURL}/${mmsId}?vid=${this.vid}`);
            if (!((_q = (_p = (await response.json())) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.hasDigitalInventory)) {
                return '';
            }
        }
        if (this.isEsploroRecord()) {
            thumbnailUrl += '?calculateAccessRights=true';
        }
        return thumbnailUrl;
    }
    isEsploroRecord() {
        var _a;
        return ((_a = this.doc.pnx.control.sourceformat) === null || _a === void 0 ? void 0 : _a[0]) === 'ESPLORO' || false;
    }
    getAlmaDigitalThumbnailUrl(mmsId) {
        return `${this.almaDThumbnailBaseURL}/${this.institution}/${mmsId}`;
    }
    resolveAlmaDigitalImage(thumbnailUrl) {
        return this.getImageLink(thumbnailUrl);
    }
    createLinkObj(url) {
        return {
            displayLabel: 'thumbnail',
            linkType: 'http://purl.org/pnx/linkType/thumbnail',
            linkURL: url
        };
    }
    async getImageLink(imageUrl) {
        return new Promise((resolve, reject) => {
            if (!imageUrl) {
                reject('');
                return;
            }
            const image = new Image();
            image.onload = () => {
                if (image.width > 1) {
                    resolve(imageUrl);
                }
                else {
                    reject('');
                }
            };
            image.onerror = () => {
                reject('');
            };
            image.src = this.handleLink(imageUrl);
        });
    }
    handleLink(link) {
        let newLink = link;
        if (window.location.protocol === 'https:') {
            newLink = link.replace('http://', 'https://');
        }
        return newLink;
    }
    getSyndetixWithProxy() {
        return "https://proxy-na.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=";
    }
};
PnxCard.styles = styles;
__decorate([
    property()
], PnxCard.prototype, "doc", void 0);
__decorate([
    property()
], PnxCard.prototype, "host", void 0);
__decorate([
    property()
], PnxCard.prototype, "institution", void 0);
__decorate([
    property()
], PnxCard.prototype, "vid", void 0);
__decorate([
    property()
], PnxCard.prototype, "language", void 0);
__decorate([
    property()
], PnxCard.prototype, "scope", void 0);
__decorate([
    property()
], PnxCard.prototype, "tab", void 0);
__decorate([
    property()
], PnxCard.prototype, "defaultThumbnailUrl", void 0);
__decorate([
    property()
], PnxCard.prototype, "preloadedThumbnailUrl", void 0);
PnxCard = PnxCard_1 = __decorate([
    customElement('pnx-card')
], PnxCard);
export { PnxCard };
//# sourceMappingURL=pnx-card.js.map