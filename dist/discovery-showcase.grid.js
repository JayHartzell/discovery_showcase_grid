/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),e=new WeakMap;class n{constructor(t,i,e){if(this._$cssResult$=!0,e!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const s=this.t;if(i&&void 0===t){const i=void 0!==s&&1===s.length;i&&(t=e.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&e.set(s,t))}return t}toString(){return this.cssText}}const o=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new n(e,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const h=window,a=h.trustedTypes,d=a?a.emptyScript:"",c=h.reactiveElementPolyfillSupport,u={toAttribute(t,i){switch(i){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,i)=>i!==t&&(i==i||t==t),f={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:v};class p extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e))})),t}static createProperty(t,i=f){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const n=this[t];this[i]=e,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(r(t))}else void 0!==t&&i.push(r(t));return i}static _$Ep(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var s;const e=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,e)=>{i?s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((i=>{const e=document.createElement("style"),n=t.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,s.appendChild(e)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$EO(t,i,s=f){var e;const n=this.constructor._$Ep(t,s);if(void 0!==n&&!0===s.reflect){const o=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:u).toAttribute(i,s.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,i){var s;const e=this.constructor,n=e._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=e.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=n,this[n]=o.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:p}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.6.1");const m=window,y=m.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,$="?"+w,S=`<${$}>`,x=document,k=(t="")=>x.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,_=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,E=/-->/g,L=/>/g,C=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),O=/'/g,U=/"/g,j=/^(?:script|style|textarea|title)$/i,R=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),P=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),F=new WeakMap,M=x.createTreeWalker(x,129,null,!1),z=(t,i)=>{const s=t.length-1,e=[];let n,o=2===i?"<svg>":"",r=_;for(let i=0;i<s;i++){const s=t[i];let l,h,a=-1,d=0;for(;d<s.length&&(r.lastIndex=d,h=r.exec(s),null!==h);)d=r.lastIndex,r===_?"!--"===h[1]?r=E:void 0!==h[1]?r=L:void 0!==h[2]?(j.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=C):void 0!==h[3]&&(r=C):r===C?">"===h[0]?(r=null!=n?n:_,a=-1):void 0===h[1]?a=-2:(a=r.lastIndex-h[2].length,l=h[1],r=void 0===h[3]?C:'"'===h[3]?U:O):r===U||r===O?r=C:r===E||r===L?r=_:(r=C,n=void 0);const c=r===C&&t[i+1].startsWith("/>")?" ":"";o+=r===_?s+S:a>=0?(e.push(l),s.slice(0,a)+"$lit$"+s.slice(a)+w+c):s+w+(-2===a?(e.push(void 0),i):c)}const l=o+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(l):l,e]};class I{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[h,a]=z(t,i);if(this.el=I.createElement(h,s),M.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=M.nextNode())&&l.length<r;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(w)){const s=a[o++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(w),i=/([.?@])?(.*)/.exec(s);l.push({type:1,index:n,name:i[2],strings:t,ctor:"."===i[1]?G:"?"===i[1]?q:"@"===i[1]?K:J})}else l.push({type:6,index:n})}for(const i of t)e.removeAttribute(i)}if(j.test(e.tagName)){const t=e.textContent.split(w),i=t.length-1;if(i>0){e.textContent=y?y.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],k()),M.nextNode(),l.push({type:2,index:++n});e.append(t[i],k())}}}else if(8===e.nodeType)if(e.data===$)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=e.data.indexOf(w,t+1));)l.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,i){const s=x.createElement("template");return s.innerHTML=t,s}}function N(t,i,s=t,e){var n,o,r,l;if(i===P)return i;let h=void 0!==e?null===(n=s._$Co)||void 0===n?void 0:n[e]:s._$Cl;const a=A(i)?void 0:i._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,e)),void 0!==e?(null!==(r=(l=s)._$Co)&&void 0!==r?r:l._$Co=[])[e]=h:s._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,e)),i}class B{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,n=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:x).importNode(s,!0);M.currentNode=n;let o=M.nextNode(),r=0,l=0,h=e[0];for(;void 0!==h;){if(r===h.index){let i;2===h.type?i=new H(o,o.nextSibling,this,t):1===h.type?i=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(i=new V(o,this,t)),this.u.push(i),h=e[++l]}r!==(null==h?void 0:h.index)&&(o=M.nextNode(),r++)}return n}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class H{constructor(t,i,s,e){var n;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(n=null==e?void 0:e.isConnected)||void 0===n||n}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),A(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==P&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==D&&A(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var i;const{values:s,_$litType$:e}=t,n="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=I.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===n)this._$AH.p(s);else{const t=new B(n,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t}}_$AC(t){let i=F.get(t.strings);return void 0===i&&F.set(t.strings,i=new I(t)),i}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const n of t)e===i.length?i.push(s=new H(this.O(k()),this.O(k()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class J{constructor(t,i,s,e,n){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const n=this.strings;let o=!1;if(void 0===n)t=N(this,t,i,0),o=!A(t)||t!==this._$AH&&t!==P,o&&(this._$AH=t);else{const e=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=N(this,e[s+r],i,r),l===P&&(l=this._$AH[r]),o||(o=!A(l)||l!==this._$AH[r]),l===D?t=D:t!==D&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!e&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const W=y?y.emptyScript:"";class q extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class K extends J{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=N(this,t,i,0))&&void 0!==s?s:D)===P)return;const e=this._$AH,n=t===D&&e!==D||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,o=t!==D&&(e===D||n);n&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class V{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const Z=m.litHtmlPolyfillSupport;null==Z||Z(I,H),(null!==(g=m.litHtmlVersions)&&void 0!==g?g:m.litHtmlVersions=[]).push("2.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Q,X;class Y extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{var e,n;const o=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new H(i.insertBefore(k(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return P}}Y.finalized=!0,Y._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:Y});const tt=globalThis.litElementPolyfillSupport;null==tt||tt({LitElement:Y}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=t=>i=>"function"==typeof i?((t,i)=>(customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){customElements.define(t,i)}}})(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,st=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(s){s.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};function et(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):st(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var nt;null===(nt=window.HTMLSlotElement)||void 0===nt||nt.prototype.assignedElements;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=(t,i)=>{var s,e;const n=t._$AN;if(void 0===n)return!1;for(const t of n)null===(e=(s=t)._$AO)||void 0===e||e.call(s,i,!1),lt(t,i);return!0},ht=t=>{let i,s;do{if(void 0===(i=t._$AM))break;s=i._$AN,s.delete(t),t=i}while(0===(null==s?void 0:s.size))},at=t=>{for(let i;i=t._$AM;t=i){let s=i._$AN;if(void 0===s)i._$AN=s=new Set;else if(s.has(t))break;s.add(t),ut(i)}};function dt(t){void 0!==this._$AN?(ht(this),this._$AM=t,at(this)):this._$AM=t}function ct(t,i=!1,s=0){const e=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(i)if(Array.isArray(e))for(let t=s;t<e.length;t++)lt(e[t],!1),ht(e[t]);else null!=e&&(lt(e,!1),ht(e));else lt(this,t)}const ut=t=>{var i,s,e,n;t.type==ot&&(null!==(i=(e=t)._$AP)&&void 0!==i||(e._$AP=ct),null!==(s=(n=t)._$AQ)&&void 0!==s||(n._$AQ=dt))};class vt extends rt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,s){super._$AT(t,i,s),at(this),this.isConnected=t._$AU}_$AO(t,i=!0){var s,e;t!==this.isConnected&&(this.isConnected=t,t?null===(s=this.reconnected)||void 0===s||s.call(this):null===(e=this.disconnected)||void 0===e||e.call(this)),i&&(lt(this,t),ht(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ft{constructor(t){this.Y=t}disconnect(){this.Y=void 0}reconnect(t){this.Y=t}deref(){return this.Y}}class pt{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){var t;null!==(t=this.Z)&&void 0!==t||(this.Z=new Promise((t=>this.q=t)))}resume(){var t;null===(t=this.q)||void 0===t||t.call(this),this.Z=this.q=void 0}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=t=>!(t=>null===t||"object"!=typeof t&&"function"!=typeof t)(t)&&"function"==typeof t.then;const mt=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends vt{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CK=new ft(this),this._$CX=new pt}render(...t){var i;return null!==(i=t.find((t=>!gt(t))))&&void 0!==i?i:P}update(t,i){const s=this._$Cyt;let e=s.length;this._$Cyt=i;const n=this._$CK,o=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){const r=i[t];if(!gt(r))return this._$Cwt=t,r;t<e&&r===s[t]||(this._$Cwt=1073741823,e=0,Promise.resolve(r).then((async t=>{for(;o.get();)await o.get();const i=n.deref();if(void 0!==i){const s=i._$Cyt.indexOf(r);s>-1&&s<i._$Cwt&&(i._$Cwt=s,i.setValue(t))}})))}return P}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}),yt=o`
  :host {
    --title-font-color: inherit;
    --title-font-weight: 700;
    --title-font-size: 13px;

    --description-font-color: inherit;
    --description-font-weight: 400;
    --description-font-size: 12px;
    
    --image-height: 210px; /* Default image height, can be adjusted or made responsive */
    display: block; /* Ensure the host takes up block space for grid layout */
    width: 100%; /* Ensure card takes full width of grid cell */
  }
  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    height: 100%; /* Make anchor fill the card for better clickability */
  }
  
   img, .image-place-holder {
     height: var(--image-height);
     width: 100%; /* Make image responsive within its container */
     display: block;
     object-fit: contain; /* Or cover, depending on desired image scaling */
  }

  .image-place-holder {
    background-color: #eee; /* Default placeholder color */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #aaa;
    font-size: 1rem;
  }
`;var bt=function(t,i,s,e){for(var n,o=arguments.length,r=o<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(r=(o<3?n(r):o>3?n(i,s,r):n(i,s))||r);return o>3&&r&&Object.defineProperty(i,s,r),r};let wt=class extends Y{render(){this.almaDThumbnailBaseURL=this.getAlmaDThumbnailBaseUrl();const t=this.getThumbnailLinks(),i=R`<div style="background-color: ${this.getRandomColor()}" 
                                          class="image-place-holder"></div>`,s=t.then((t=>(console.log(`getImageUrl returned ${t}`),R`<img src=${t} alt="">`))).catch((()=>i)),e=this.getDeeplink();return R`
            <a  href="${e||"#"}" target="_blank" aria-label="">
                ${mt(s,i)}
            </a>
            
        `}getAlmaDThumbnailBaseUrl(){return`${new URL(this.doc["@id"]).origin}/view/delivery/thumbnail`}getRandomColor(){let t="#";for(let i=0;i<6;i++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}getDeeplink(){var t,i,s,e;let n="";const o=new URL(this.doc["@id"]),r=this.getProtocol(o),l=this.isPrimo()?"/primo-explore":"/discovery",h=this.getState(),a=this.doc.pnx.control.recordid,d=this.doc.context,c=null!==(t=this.vid)&&void 0!==t?t:"",u=null!==(i=this.language)&&void 0!==i?i:"en",v=null!==(s=this.scope)&&void 0!==s?s:"",f=null!==(e=this.tab)&&void 0!==e?e:"";return n=r+this.host+l+h+"&docid="+a+"&context="+d+"&vid="+c+"&lang="+u+"&search_scope="+v+"&tab="+f,n}getProtocol(t){return t.protocol+"//"}isPrimo(){return!1}getState(){return"/fulldisplay?"}async getThumbnailLinks(){try{let t=(this.doc.delivery.link||[]).filter((t=>"thumbnail"===t.displayLabel));const i=await this.getThumbnailFromAlmaD();if(i)return i;let s=await this.getThumbnailFromOther(t);if(s)return s;const e=await this.getThumbnailFromSyndeticsEXL(t);if(e)return e;const n=await this.getThumbnailFromSyndetics(t);if(n)return n;const o=await this.getThumbnailFromGoogle(t);if(o)return o;if(this.defaultThumbnailUrl)return this.defaultThumbnailUrl;throw"no thumbnail"}catch(t){throw t}}async getThumbnailFromAlmaD(){try{if(this.isAlmaD()){const t=await this.getAlmaDigitalThumbnailForPnx();return await this.resolveAlmaDigitalImage(t)}return""}catch(t){return console.error("Error in getThumbnailFromAlmaD:",t),""}}async getThumbnailFromOther(t){let i=t.filter(this.getAllButSpecificLinkFilterFactory("amazon"));if(i=i.filter(this.getAllButSpecificLinkFilterFactory("syndetics.com")),i=i.filter(this.getAllButSpecificLinkFilterFactory("google.com")),!i.length)return"";{const t=i.map((t=>(this.removeLabelFromLinkUrl(t),this.getImageLink(t.linkURL))));try{return await Promise.race(t)||""}catch(t){return""}}}getAllButSpecificLinkFilterFactory(t){return i=>{if("string"==typeof i)return-1===i.indexOf(t);let s=null==i?void 0:i.linkURL;return!!s&&("string"==typeof s?-1===s.indexOf(t):-1===s.linkURL.indexOf(t))}}async getThumbnailFromSyndeticsEXL(t,i){var s,e,n,o,r,l,h,a,d,c,u,v,f,p,g;const m=t.filter((t=>this.getSpecificLink(t,"syndetics.com")||this.getSpecificLink(t,"primo")));if(m.length>0||!this.isPrimo()){const t=[...new Set(((null===(n=null===(e=null===(s=this.doc)||void 0===s?void 0:s.pnx)||void 0===e?void 0:e.addata)||void 0===n?void 0:n.isbn)||[]).concat((null===(l=null===(r=null===(o=this.doc)||void 0===o?void 0:o.pnx)||void 0===r?void 0:r.addata)||void 0===l?void 0:l.eisbn)||[]))],y=[...new Set(((null===(d=null===(a=null===(h=this.doc)||void 0===h?void 0:h.pnx)||void 0===a?void 0:a.addata)||void 0===d?void 0:d.issn)||[]).concat((null===(v=null===(u=null===(c=this.doc)||void 0===c?void 0:c.pnx)||void 0===u?void 0:u.addata)||void 0===v?void 0:v.eissn)||[]))],b=(null===(g=null===(p=null===(f=this.doc)||void 0===f?void 0:f.pnx)||void 0===p?void 0:p.addata)||void 0===g?void 0:g.upcid)||[],w="https://syndetics.com/index.php?client=primo&"+(i?"type=unbound&":"");for(const i of t)m.push(this.createLinkObj(`${w}isbn=${i}/lc.jpg`));for(const t of y)m.push(this.createLinkObj(`${w}issn=${t}/lc.jpg`));for(const t of b)m.push(this.createLinkObj(`${w}upc=${t}/lc.jpg`));if(m.length>0)return this.handleSyndeticsThumbnailLinks(m)}return""}async getThumbnailFromSyndetics(t){const i=t.filter((t=>this.getSpecificLink(t,"syndetics.com")));return i.length>0?this.handleSyndeticsThumbnailLinks(i):""}getSpecificLink(t,i){if("string"==typeof t)return t.indexOf(i)>-1;let s=t?t.linkURL:void 0;return!!s&&("string"==typeof s?s.indexOf(i)>-1:s.linkURL.indexOf(i)>-1)}async handleSyndeticsThumbnailLinks(t){let i=this.getSyndetixWithProxy(),s=t.map((t=>{const s=t.linkURL.replace("https://syndetics.com/index.php?client=",i);return this.getImageLink(s)}));return await this.createPromiseOnlyFailOnAllFailedResolveFirstSuccess(s)}async getThumbnailFromGoogle(t){if(this.showICPLicenseFooter())return"";const i=t.find((t=>this.getSpecificLink(t,"books.google.com")));if(!i)return"";try{const t=i.linkURL.replace("&callback=updateGBSCover",""),s=await fetch(t),e=await s.text();let n=JSON.parse(e.substring(e.indexOf("{"),e.indexOf("}")+2));const o=Object.keys(n);if(o.length>0){let t=n[o[0]].thumbnail_url;if(t){return{displayLabel:"thumbnail",linkType:"http://purl.org/pnx/linkType/thumbnail",linkURL:this.handleLink(t)}.linkURL}}}catch(t){return""}return""}async createPromiseOnlyFailOnAllFailedResolveFirstSuccess(t){const i=t.map(this.reflect),s=(await Promise.all(i)).find((t=>"resolved"===t.status));return s?s.value:""}reflect(t){return t.then((t=>({value:t,status:"resolved"})),(t=>({error:t,status:"rejected"})))}showICPLicenseFooter(){return!1}removeLabelFromLinkUrl(t){let i=t.linkURL;i&&i.includes("$$L")&&(t.linkURL=i.substr(0,i.indexOf("$$L")).trim())}isAlmaD(){var t,i,s,e;return!this.isPrimo()&&("SP"===this.doc.context&&"alma"===(null===(s=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.control)||void 0===s?void 0:s.sourceid)&&(null===(e=this.doc.delivery)||void 0===e?void 0:e.electronicServices)?this.doc.delivery.electronicServices.filter((t=>"DIGITAL"===t.serviceType)).length>0:!0===this.doc.delivery.hasD||!0===this.doc.delivery.digitalAuxiliaryMode)}async getAlmaDigitalThumbnailForPnx(){var t,i,s,e,n,o,r,l,h,a,d,c,u,v,f;const p=null===(e=null===(s=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.control)||void 0===s?void 0:s.sourcerecordid)||void 0===e?void 0:e[0],g=(null===(o=null===(n=this.doc)||void 0===n?void 0:n.delivery)||void 0===o?void 0:o.recordInstitutionCode)||this.institution;let m=this.getAlmaDigitalThumbnailUrl(p);if((null===(l=null===(r=this.doc)||void 0===r?void 0:r.delivery)||void 0===l?void 0:l.sharedDigitalCandidates)&&this.doc.delivery.sharedDigitalCandidates.length>0){const t=await fetch(`${this.almaDThumbnailBaseURL}/${g}/${p}?vid=${this.vid}`,{method:"POST",body:JSON.stringify(null===(a=null===(h=this.doc)||void 0===h?void 0:h.delivery)||void 0===a?void 0:a.sharedDigitalCandidates)});m=(await t.json()).data}else if(null===(u=null===(c=null===(d=this.doc)||void 0===d?void 0:d.pnx)||void 0===c?void 0:c.control)||void 0===u?void 0:u.isDedup){const t=await fetch(`${this.almaDThumbnailBaseURL}/${p}?vid=${this.vid}`);if(!(null===(f=null===(v=await t.json())||void 0===v?void 0:v.data)||void 0===f?void 0:f.hasDigitalInventory))return""}return this.isEsploroRecord()&&(m+="?calculateAccessRights=true"),m}isEsploroRecord(){var t;return"ESPLORO"===(null===(t=this.doc.pnx.control.sourceformat)||void 0===t?void 0:t[0])||!1}getAlmaDigitalThumbnailUrl(t){return`${this.almaDThumbnailBaseURL}/${this.institution}/${t}`}resolveAlmaDigitalImage(t){return this.getImageLink(t)}createLinkObj(t){return{displayLabel:"thumbnail",linkType:"http://purl.org/pnx/linkType/thumbnail",linkURL:t}}async getImageLink(t){return new Promise(((i,s)=>{if(!t)return void s("");const e=new Image;e.onload=()=>{e.width>1?i(t):s("")},e.onerror=()=>{s("")},e.src=this.handleLink(t)}))}handleLink(t){let i=t;return"https:"===window.location.protocol&&(i=t.replace("http://","https://")),i}getSyndetixWithProxy(){return"https://proxy-na.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client="}};wt.styles=yt,bt([et()],wt.prototype,"doc",void 0),bt([et()],wt.prototype,"host",void 0),bt([et()],wt.prototype,"institution",void 0),bt([et()],wt.prototype,"vid",void 0),bt([et()],wt.prototype,"language",void 0),bt([et()],wt.prototype,"scope",void 0),bt([et()],wt.prototype,"tab",void 0),bt([et()],wt.prototype,"defaultThumbnailUrl",void 0),wt=bt([it("pnx-card")],wt);var $t=function(t,i,s,e){for(var n,o=arguments.length,r=o<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(r=(o<3?n(r):o>3?n(i,s,r):n(i,s))||r);return o>3&&r&&Object.defineProperty(i,s,r),r};let St=class extends Y{constructor(){super(),this.searchUrl=""}connectedCallback(){super.connectedCallback(),this.performQuery()}async performQuery(){try{const t=await fetch(this.searchUrl);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);this.data=t.json()}catch(t){console.error("Failed to perform query:",t),this.data=Promise.resolve({docs:[]})}}render(){if(console.log("SearchCarousel render called, data:",this.data),!this.data)return R`<div class="gallery-container"><p>Loading...</p></div>`;const t=new URL(this.searchUrl);this.host=t.host,this.viewId=t.searchParams.get("vid"),this.language=t.searchParams.get("lang"),this.scope=t.searchParams.get("scope"),this.tab=t.searchParams.get("tab"),this.institution=t.searchParams.get("inst");const i=this.getTitleHtml(),s=this.data.then((t=>(console.log("Data received:",t),t&&t.docs&&0!==t.docs.length?t.docs.map((t=>{var i;return R`
                    <pnx-card .doc="${t}" .host="${null!==(i=this.host)&&void 0!==i?i:""}" .institution="${this.institution}"
                              .vid="${this.viewId}"
                              .language="${this.language}" .scope="${this.scope}"
                              .tab="${this.tab}" .defaultThumbnailUrl="${this.defaultThumbnailUrl}">
                    </pnx-card>
                `})):R`<p>No items to display.</p>`))).catch((t=>(console.error("Error processing data for rendering:",t),R`<p>Error loading items.</p>`)));return console.log("Rendering grid container"),R`
            <div class="gallery-container">
                ${i}
                <div class="grid-container">
                    ${mt(s,R`<p>Loading items...</p>`)}
                </div>
            </div>
        `}getTitleHtml(){return this.titleText?this.titleLink?R`<h2><a href="${this.titleLink}">${this.titleText}</a></h2>`:R`<h2>${this.titleText}</h2>`:R``}};St.styles=o`
      search-carousel { /* Style the host element itself if needed */
        display: block; /* Or inline-block, etc. */
        max-width: var(--width-param, 1200px); /* Default width, can be overridden by CSS custom prop */
        margin: 0 auto;
        font-size: 14px;
        color: #000;
      }

      .gallery-container {
        padding: 20px;
      }

      .gallery-container a {
        text-decoration: none;
        color: black;
      }

      .gallery-container a:hover, .gallery-container a:focus {
        text-decoration: underline;
      }

      .gallery-container h2 {
        text-align: center;
        margin-block-end: 1em;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Responsive grid */
        gap: 20px; /* Space between cards */
      }

      /* Styles for pnx-card if needed, e.g., if it doesn't define its own width/height appropriately for a grid */
      /* pnx-card {
        width: 100%;
      } */

      /* Responsive adjustments for the grid */
      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
        }
      }
    `,$t([et()],St.prototype,"searchUrl",void 0),$t([et()],St.prototype,"titleText",void 0),$t([et()],St.prototype,"titleLink",void 0),$t([et()],St.prototype,"defaultThumbnailUrl",void 0),$t([function(t){return et({...t,state:!0})}()],St.prototype,"data",void 0),St=$t([it("search-carousel")],St);export{St as SearchCarousel};
