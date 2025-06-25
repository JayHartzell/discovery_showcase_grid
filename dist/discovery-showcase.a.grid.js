/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new WeakMap;class o{constructor(t,i,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}}const n=(t,...i)=>{const s=1===t.length?t[0]:i.reduce(((i,e,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return new o(s,t,e)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,e))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const h=window,a=h.trustedTypes,d=a?a.emptyScript:"",c=h.reactiveElementPolyfillSupport,u={toAttribute(t,i){switch(i){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},v=(t,i)=>i!==t&&(i==i||t==t),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:v};class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this._$Ep(e,i);void 0!==s&&(this._$Ev.set(s,e),t.push(s))})),t}static createProperty(t,i=p){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const o=this[t];this[i]=s,this.requestUpdate(t,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(r(t))}else void 0!==t&&i.push(r(t));return i}static _$Ep(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{i?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$EO(t,i,e=p){var s;const o=this.constructor._$Ep(t,e);if(void 0!==o&&!0===e.reflect){const n=(void 0!==(null===(s=e.converter)||void 0===s?void 0:s.toAttribute)?e.converter:u).toAttribute(i,e.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,i){var e;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(e=t.converter)||void 0===e?void 0:e.fromAttribute)?t.converter:u;this._$El=o,this[o]=n.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:f}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.6.1");const m=window,y=m.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,$="?"+w,x=`<${$}>`,S=document,k=(t="")=>S.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,_=/>/g,C=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),j=/'/g,O=/"/g,U=/^(?:script|style|textarea|title)$/i,R=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),P=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),F=new WeakMap,M=S.createTreeWalker(S,129,null,!1),I=(t,i)=>{const e=t.length-1,s=[];let o,n=2===i?"<svg>":"",r=E;for(let i=0;i<e;i++){const e=t[i];let l,h,a=-1,d=0;for(;d<e.length&&(r.lastIndex=d,h=r.exec(e),null!==h);)d=r.lastIndex,r===E?"!--"===h[1]?r=L:void 0!==h[1]?r=_:void 0!==h[2]?(U.test(h[2])&&(o=RegExp("</"+h[2],"g")),r=C):void 0!==h[3]&&(r=C):r===C?">"===h[0]?(r=null!=o?o:E,a=-1):void 0===h[1]?a=-2:(a=r.lastIndex-h[2].length,l=h[1],r=void 0===h[3]?C:'"'===h[3]?O:j):r===O||r===j?r=C:r===L||r===_?r=E:(r=C,o=void 0);const c=r===C&&t[i+1].startsWith("/>")?" ":"";n+=r===E?e+x:a>=0?(s.push(l),e.slice(0,a)+"$lit$"+e.slice(a)+w+c):e+w+(-2===a?(s.push(void 0),i):c)}const l=n+(t[e]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==b?b.createHTML(l):l,s]};class z{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let o=0,n=0;const r=t.length-1,l=this.parts,[h,a]=I(t,i);if(this.el=z.createElement(h,e),M.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=M.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(w)){const e=a[n++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split(w),i=/([.?@])?(.*)/.exec(e);l.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?V:"?"===i[1]?W:"@"===i[1]?Z:J})}else l.push({type:6,index:o})}for(const i of t)s.removeAttribute(i)}if(U.test(s.tagName)){const t=s.textContent.split(w),i=t.length-1;if(i>0){s.textContent=y?y.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],k()),M.nextNode(),l.push({type:2,index:++o});s.append(t[i],k())}}}else if(8===s.nodeType)if(s.data===$)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)l.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,i){const e=S.createElement("template");return e.innerHTML=t,e}}function N(t,i,e=t,s){var o,n,r,l;if(i===P)return i;let h=void 0!==s?null===(o=e._$Co)||void 0===o?void 0:o[s]:e._$Cl;const a=A(i)?void 0:i._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,e,s)),void 0!==s?(null!==(r=(l=e)._$Co)&&void 0!==r?r:l._$Co=[])[s]=h:e._$Cl=h),void 0!==h&&(i=N(t,h._$AS(t,i.values),h,s)),i}class B{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:e},parts:s}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:S).importNode(e,!0);M.currentNode=o;let n=M.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let i;2===h.type?i=new H(n,n.nextSibling,this,t):1===h.type?i=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(i=new q(n,this,t)),this.u.push(i),h=s[++l]}r!==(null==h?void 0:h.index)&&(n=M.nextNode(),r++)}return o}p(t){let i=0;for(const e of this.u)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class H{constructor(t,i,e,s){var o;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),A(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==P&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==D&&A(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var i;const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=z.createElement(s.h,this.options)),s);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(e);else{const t=new B(o,this),i=t.v(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let i=F.get(t.strings);return void 0===i&&F.set(t.strings,i=new z(t)),i}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,s=0;for(const o of t)s===i.length?i.push(e=new H(this.O(k()),this.O(k()),this,this.options)):e=i[s],e._$AI(o),s++;s<i.length&&(this._$AR(e&&e._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class J{constructor(t,i,e,s,o){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,s){const o=this.strings;let n=!1;if(void 0===o)t=N(this,t,i,0),n=!A(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{const s=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=N(this,s[e+r],i,r),l===P&&(l=this._$AH[r]),n||(n=!A(l)||l!==this._$AH[r]),l===D?t=D:t!==D&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const G=y?y.emptyScript:"";class W extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class Z extends J{constructor(t,i,e,s,o){super(t,i,e,s,o),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=N(this,t,i,0))&&void 0!==e?e:D)===P)return;const s=this._$AH,o=t===D&&s!==D||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==D&&(s===D||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class q{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const K=m.litHtmlPolyfillSupport;null==K||K(z,H),(null!==(g=m.litHtmlVersions)&&void 0!==g?g:m.litHtmlVersions=[]).push("2.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Q,X;class Y extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,e)=>{var s,o;const n=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==e?void 0:e.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new H(i.insertBefore(k(),t),t,void 0,null!=e?e:{})}return r._$AI(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return P}}Y.finalized=!0,Y._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:Y});const tt=globalThis.litElementPolyfillSupport;null==tt||tt({LitElement:Y}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=t=>i=>"function"==typeof i?((t,i)=>(customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:e,elements:s}=i;return{kind:e,elements:s,finisher(i){customElements.define(t,i)}}})(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,et=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(e){e.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(e){e.createProperty(i.key,t)}};function st(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):et(t,i)
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
var ot;null===(ot=window.HTMLSlotElement)||void 0===ot||ot.prototype.assignedElements;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,e){this._$Ct=t,this._$AM=i,this._$Ci=e}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=(t,i)=>{var e,s;const o=t._$AN;if(void 0===o)return!1;for(const t of o)null===(s=(e=t)._$AO)||void 0===s||s.call(e,i,!1),lt(t,i);return!0},ht=t=>{let i,e;do{if(void 0===(i=t._$AM))break;e=i._$AN,e.delete(t),t=i}while(0===(null==e?void 0:e.size))},at=t=>{for(let i;i=t._$AM;t=i){let e=i._$AN;if(void 0===e)i._$AN=e=new Set;else if(e.has(t))break;e.add(t),ut(i)}};function dt(t){void 0!==this._$AN?(ht(this),this._$AM=t,at(this)):this._$AM=t}function ct(t,i=!1,e=0){const s=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(i)if(Array.isArray(s))for(let t=e;t<s.length;t++)lt(s[t],!1),ht(s[t]);else null!=s&&(lt(s,!1),ht(s));else lt(this,t)}const ut=t=>{var i,e,s,o;t.type==nt&&(null!==(i=(s=t)._$AP)&&void 0!==i||(s._$AP=ct),null!==(e=(o=t)._$AQ)&&void 0!==e||(o._$AQ=dt))};class vt extends rt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,e){super._$AT(t,i,e),at(this),this.isConnected=t._$AU}_$AO(t,i=!0){var e,s;t!==this.isConnected&&(this.isConnected=t,t?null===(e=this.reconnected)||void 0===e||e.call(this):null===(s=this.disconnected)||void 0===s||s.call(this)),i&&(lt(this,t),ht(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class pt{constructor(t){this.Y=t}disconnect(){this.Y=void 0}reconnect(t){this.Y=t}deref(){return this.Y}}class ft{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){var t;null!==(t=this.Z)&&void 0!==t||(this.Z=new Promise((t=>this.q=t)))}resume(){var t;null===(t=this.q)||void 0===t||t.call(this),this.Z=this.q=void 0}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=t=>!(t=>null===t||"object"!=typeof t&&"function"!=typeof t)(t)&&"function"==typeof t.then;const mt=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends vt{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CK=new pt(this),this._$CX=new ft}render(...t){var i;return null!==(i=t.find((t=>!gt(t))))&&void 0!==i?i:P}update(t,i){const e=this._$Cyt;let s=e.length;this._$Cyt=i;const o=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){const r=i[t];if(!gt(r))return this._$Cwt=t,r;t<s&&r===e[t]||(this._$Cwt=1073741823,s=0,Promise.resolve(r).then((async t=>{for(;n.get();)await n.get();const i=o.deref();if(void 0!==i){const e=i._$Cyt.indexOf(r);e>-1&&e<i._$Cwt&&(i._$Cwt=e,i.setValue(t))}})))}return P}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}),yt=n`
  :host {
    --title-font-color: inherit;
    --title-font-weight: 700;
    --title-font-size: 13px;

    --description-font-color: inherit;
    --description-font-weight: 400;
    --description-font-size: 12px;
    
    --image-height: 210px; /* Default image height, can be adjusted or made responsive */
    --focus-color: #0066cc; /* Accessible blue for focus indicators */
    --focus-outline-width: 3px;
    
    display: block; /* Ensure the host takes up block space for grid layout */
    width: 100%; /* Ensure card takes full width of grid cell */
  }
  
  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
    height: 100%; /* Make anchor fill the card for better clickability */
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.2s ease;
    position: relative;
  }
  
  /* Enhanced focus styles for better accessibility */
  a:focus {
    outline: var(--focus-outline-width) solid var(--focus-color);
    outline-offset: 2px;
    box-shadow: 0 0 0 1px var(--focus-color);
  }
  
  /* Hover styles for better user feedback */
  a:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Ensure images are accessible and responsive */
  img, .image-place-holder {
    height: var(--image-height);
    width: 100%; /* Make image responsive within its container */
    display: block;
    object-fit: contain; /* Or cover, depending on desired image scaling */
  }

  .image-place-holder {
    background-color: #f5f5f5; /* Improved contrast placeholder color */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #666; /* Better contrast for accessibility */
    font-size: 2rem;
    border: 2px dashed #ccc;
    box-sizing: border-box;
  }
  
  /* Improve placeholder accessibility with high contrast mode support */
  @media (prefers-contrast: high) {
    .image-place-holder {
      background-color: #ffffff;
      color: #000000;
      border-color: #000000;
    }
    
    a:focus {
      outline-color: #000000;
      box-shadow: 0 0 0 1px #000000;
    }
  }
  
  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    a {
      transition: none;
    }
    
    a:hover {
      transform: none;
    }
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
`;var bt=function(t,i,e,s){for(var o,n=arguments.length,r=n<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(i,e,r):o(i,e))||r);return n>3&&r&&Object.defineProperty(i,e,r),r};let wt=class extends Y{render(){this.almaDThumbnailBaseURL=this.getAlmaDThumbnailBaseUrl();const t=this.getThumbnailLinks(),i=this.getDocumentTitle(),e=this.getDocumentAuthor(),s=this.generateImageAltText(i,e),o=this.generateLinkAriaLabel(i,e),n=R`<div 
            style="background-color: ${this.getRandomColor()}" 
            class="image-place-holder"
            role="img"
            aria-label="${s}">
            <span aria-hidden="true">📚</span>
        </div>`,r=t.then((t=>(console.log(`getImageUrl returned ${t}`),R`<img src=${t} alt="${s}">`))).catch((()=>n)),l=this.getDeeplink();return R`
            <a  
                href="${l||"#"}" 
                target="_blank" 
                aria-label="${o}"
                role="link">
                ${mt(r,n)}
            </a>
            
        `}getDocumentTitle(){var t,i,e,s,o,n,r,l;const h=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.display,a=null===(s=null===(e=this.doc)||void 0===e?void 0:e.pnx)||void 0===s?void 0:s.addata;return(null===(o=null==h?void 0:h.title)||void 0===o?void 0:o[0])||(null===(n=null==a?void 0:a.btitle)||void 0===n?void 0:n[0])||(null===(r=null==a?void 0:a.addtitle)||void 0===r?void 0:r[0])||(null===(l=null==h?void 0:h.source)||void 0===l?void 0:l[0])||"Document"}getDocumentAuthor(){var t,i,e,s,o,n,r;const l=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.display,h=null===(s=null===(e=this.doc)||void 0===e?void 0:e.pnx)||void 0===s?void 0:s.addata,a=(null===(o=null==l?void 0:l.creator)||void 0===o?void 0:o[0])||(null===(n=null==h?void 0:h.au)||void 0===n?void 0:n[0])||(null===(r=null==h?void 0:h.aulast)||void 0===r?void 0:r[0]);return a?a.replace(/\$\$[A-Z].*?(?=\$\$|$)/g,"").replace(/\$\$.*$/,"").trim():""}generateImageAltText(t,i){const e=this.getDocumentType();return i?`Cover image for ${e} "${t}" by ${i}`:`Cover image for ${e} "${t}"`}generateLinkAriaLabel(t,i){const e=this.getDocumentType();return i?`View details for ${e} "${t}" by ${i}`:`View details for ${e} "${t}"`}getDocumentType(){var t,i,e,s,o,n,r,l;const h=null===(s=null===(e=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.display)||void 0===e?void 0:e.type)||void 0===s?void 0:s[0],a=null===(l=null===(r=null===(n=null===(o=this.doc)||void 0===o?void 0:o.pnx)||void 0===n?void 0:n.display)||void 0===r?void 0:r.format)||void 0===l?void 0:l[0],d={book:"book",journal:"journal",newspaper:"newspaper",article:"article",thesis:"thesis",dissertation:"dissertation",conference:"conference paper",patent:"patent",review:"review",report:"report"};return h&&d[h.toLowerCase()]?d[h.toLowerCase()]:a&&(a.toLowerCase().includes("electronic")||a.toLowerCase().includes("online"))?"digital resource":"item"}getAlmaDThumbnailBaseUrl(){return`${new URL(this.doc["@id"]).origin}/view/delivery/thumbnail`}getRandomColor(){let t="#";for(let i=0;i<6;i++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}getDeeplink(){var t,i,e,s;let o="";const n=new URL(this.doc["@id"]),r=this.getProtocol(n),l=this.isPrimo()?"/primo-explore":"/discovery",h=this.getState(),a=this.doc.pnx.control.recordid,d=this.doc.context,c=null!==(t=this.vid)&&void 0!==t?t:"",u=null!==(i=this.language)&&void 0!==i?i:"en",v=null!==(e=this.scope)&&void 0!==e?e:"",p=null!==(s=this.tab)&&void 0!==s?s:"";return o=r+this.host+l+h+"&docid="+a+"&context="+d+"&vid="+c+"&lang="+u+"&search_scope="+v+"&tab="+p,o}getProtocol(t){return t.protocol+"//"}isPrimo(){return!1}getState(){return"/fulldisplay?"}async getThumbnailLinks(){try{let t=(this.doc.delivery.link||[]).filter((t=>"thumbnail"===t.displayLabel));const i=await this.getThumbnailFromAlmaD();if(i)return i;let e=await this.getThumbnailFromOther(t);if(e)return e;const s=await this.getThumbnailFromSyndeticsEXL(t);if(s)return s;const o=await this.getThumbnailFromSyndetics(t);if(o)return o;const n=await this.getThumbnailFromGoogle(t);if(n)return n;if(this.defaultThumbnailUrl)return this.defaultThumbnailUrl;throw"no thumbnail"}catch(t){throw t}}async getThumbnailFromAlmaD(){try{if(this.isAlmaD()){const t=await this.getAlmaDigitalThumbnailForPnx();return await this.resolveAlmaDigitalImage(t)}return""}catch(t){return console.error("Error in getThumbnailFromAlmaD:",t),""}}async getThumbnailFromOther(t){let i=t.filter(this.getAllButSpecificLinkFilterFactory("amazon"));if(i=i.filter(this.getAllButSpecificLinkFilterFactory("syndetics.com")),i=i.filter(this.getAllButSpecificLinkFilterFactory("google.com")),!i.length)return"";{const t=i.map((t=>(this.removeLabelFromLinkUrl(t),this.getImageLink(t.linkURL))));try{return await Promise.race(t)||""}catch(t){return""}}}getAllButSpecificLinkFilterFactory(t){return i=>{if("string"==typeof i)return-1===i.indexOf(t);let e=null==i?void 0:i.linkURL;return!!e&&("string"==typeof e?-1===e.indexOf(t):-1===e.linkURL.indexOf(t))}}async getThumbnailFromSyndeticsEXL(t,i){var e,s,o,n,r,l,h,a,d,c,u,v,p,f,g;const m=t.filter((t=>this.getSpecificLink(t,"syndetics.com")||this.getSpecificLink(t,"primo")));if(m.length>0||!this.isPrimo()){const t=[...new Set(((null===(o=null===(s=null===(e=this.doc)||void 0===e?void 0:e.pnx)||void 0===s?void 0:s.addata)||void 0===o?void 0:o.isbn)||[]).concat((null===(l=null===(r=null===(n=this.doc)||void 0===n?void 0:n.pnx)||void 0===r?void 0:r.addata)||void 0===l?void 0:l.eisbn)||[]))],y=[...new Set(((null===(d=null===(a=null===(h=this.doc)||void 0===h?void 0:h.pnx)||void 0===a?void 0:a.addata)||void 0===d?void 0:d.issn)||[]).concat((null===(v=null===(u=null===(c=this.doc)||void 0===c?void 0:c.pnx)||void 0===u?void 0:u.addata)||void 0===v?void 0:v.eissn)||[]))],b=(null===(g=null===(f=null===(p=this.doc)||void 0===p?void 0:p.pnx)||void 0===f?void 0:f.addata)||void 0===g?void 0:g.upcid)||[],w="https://syndetics.com/index.php?client=primo&"+(i?"type=unbound&":"");for(const i of t)m.push(this.createLinkObj(`${w}isbn=${i}/lc.jpg`));for(const t of y)m.push(this.createLinkObj(`${w}issn=${t}/lc.jpg`));for(const t of b)m.push(this.createLinkObj(`${w}upc=${t}/lc.jpg`));if(m.length>0)return this.handleSyndeticsThumbnailLinks(m)}return""}async getThumbnailFromSyndetics(t){const i=t.filter((t=>this.getSpecificLink(t,"syndetics.com")));return i.length>0?this.handleSyndeticsThumbnailLinks(i):""}getSpecificLink(t,i){if("string"==typeof t)return t.indexOf(i)>-1;let e=t?t.linkURL:void 0;return!!e&&("string"==typeof e?e.indexOf(i)>-1:e.linkURL.indexOf(i)>-1)}async handleSyndeticsThumbnailLinks(t){let i=this.getSyndetixWithProxy(),e=t.map((t=>{const e=t.linkURL.replace("https://syndetics.com/index.php?client=",i);return this.getImageLink(e)}));return await this.createPromiseOnlyFailOnAllFailedResolveFirstSuccess(e)}async getThumbnailFromGoogle(t){if(this.showICPLicenseFooter())return"";const i=t.find((t=>this.getSpecificLink(t,"books.google.com")));if(!i)return"";try{const t=i.linkURL.replace("&callback=updateGBSCover",""),e=await fetch(t),s=await e.text();let o=JSON.parse(s.substring(s.indexOf("{"),s.indexOf("}")+2));const n=Object.keys(o);if(n.length>0){let t=o[n[0]].thumbnail_url;if(t){return{displayLabel:"thumbnail",linkType:"http://purl.org/pnx/linkType/thumbnail",linkURL:this.handleLink(t)}.linkURL}}}catch(t){return""}return""}async createPromiseOnlyFailOnAllFailedResolveFirstSuccess(t){const i=t.map(this.reflect),e=(await Promise.all(i)).find((t=>"resolved"===t.status));return e?e.value:""}reflect(t){return t.then((t=>({value:t,status:"resolved"})),(t=>({error:t,status:"rejected"})))}showICPLicenseFooter(){return!1}removeLabelFromLinkUrl(t){let i=t.linkURL;i&&i.includes("$$L")&&(t.linkURL=i.substr(0,i.indexOf("$$L")).trim())}isAlmaD(){var t,i,e,s;return!this.isPrimo()&&("SP"===this.doc.context&&"alma"===(null===(e=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.control)||void 0===e?void 0:e.sourceid)&&(null===(s=this.doc.delivery)||void 0===s?void 0:s.electronicServices)?this.doc.delivery.electronicServices.filter((t=>"DIGITAL"===t.serviceType)).length>0:!0===this.doc.delivery.hasD||!0===this.doc.delivery.digitalAuxiliaryMode)}async getAlmaDigitalThumbnailForPnx(){var t,i,e,s,o,n,r,l,h,a,d,c,u,v,p;const f=null===(s=null===(e=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.control)||void 0===e?void 0:e.sourcerecordid)||void 0===s?void 0:s[0],g=(null===(n=null===(o=this.doc)||void 0===o?void 0:o.delivery)||void 0===n?void 0:n.recordInstitutionCode)||this.institution;let m=this.getAlmaDigitalThumbnailUrl(f);if((null===(l=null===(r=this.doc)||void 0===r?void 0:r.delivery)||void 0===l?void 0:l.sharedDigitalCandidates)&&this.doc.delivery.sharedDigitalCandidates.length>0){const t=await fetch(`${this.almaDThumbnailBaseURL}/${g}/${f}?vid=${this.vid}`,{method:"POST",body:JSON.stringify(null===(a=null===(h=this.doc)||void 0===h?void 0:h.delivery)||void 0===a?void 0:a.sharedDigitalCandidates)});m=(await t.json()).data}else if(null===(u=null===(c=null===(d=this.doc)||void 0===d?void 0:d.pnx)||void 0===c?void 0:c.control)||void 0===u?void 0:u.isDedup){const t=await fetch(`${this.almaDThumbnailBaseURL}/${f}?vid=${this.vid}`);if(!(null===(p=null===(v=await t.json())||void 0===v?void 0:v.data)||void 0===p?void 0:p.hasDigitalInventory))return""}return this.isEsploroRecord()&&(m+="?calculateAccessRights=true"),m}isEsploroRecord(){var t;return"ESPLORO"===(null===(t=this.doc.pnx.control.sourceformat)||void 0===t?void 0:t[0])||!1}getAlmaDigitalThumbnailUrl(t){return`${this.almaDThumbnailBaseURL}/${this.institution}/${t}`}resolveAlmaDigitalImage(t){return this.getImageLink(t)}createLinkObj(t){return{displayLabel:"thumbnail",linkType:"http://purl.org/pnx/linkType/thumbnail",linkURL:t}}async getImageLink(t){return new Promise(((i,e)=>{if(!t)return void e("");const s=new Image;s.onload=()=>{s.width>1?i(t):e("")},s.onerror=()=>{e("")},s.src=this.handleLink(t)}))}handleLink(t){let i=t;return"https:"===window.location.protocol&&(i=t.replace("http://","https://")),i}getSyndetixWithProxy(){return"https://proxy-na.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client="}};wt.styles=yt,bt([st()],wt.prototype,"doc",void 0),bt([st()],wt.prototype,"host",void 0),bt([st()],wt.prototype,"institution",void 0),bt([st()],wt.prototype,"vid",void 0),bt([st()],wt.prototype,"language",void 0),bt([st()],wt.prototype,"scope",void 0),bt([st()],wt.prototype,"tab",void 0),bt([st()],wt.prototype,"defaultThumbnailUrl",void 0),wt=bt([it("pnx-card")],wt);var $t=function(t,i,e,s){for(var o,n=arguments.length,r=n<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(i,e,r):o(i,e))||r);return n>3&&r&&Object.defineProperty(i,e,r),r};let xt=class extends Y{constructor(){super(),this.searchUrl=""}connectedCallback(){super.connectedCallback(),this.performQuery()}async performQuery(){try{const t=await fetch(this.searchUrl);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);this.data=t.json()}catch(t){console.error("Failed to perform query:",t),this.data=Promise.resolve({docs:[]})}}render(){if(console.log("SearchCarousel render called, data:",this.data),!this.data)return R`
                <div class="gallery-container">
                    <p role="status" aria-live="polite">Loading search results...</p>
                </div>`;const t=new URL(this.searchUrl);this.host=t.host,this.viewId=t.searchParams.get("vid"),this.language=t.searchParams.get("lang"),this.scope=t.searchParams.get("scope"),this.tab=t.searchParams.get("tab"),this.institution=t.searchParams.get("inst");const i=this.getTitleHtml(),e=this.data.then((t=>{if(console.log("Data received:",t),!t||!t.docs||0===t.docs.length)return R`
                    <p role="status" aria-live="polite">
                        No search results found. Try different search terms or check your search criteria.
                    </p>`;const i=t.docs.length;return R`
                <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    ${`Showing ${i} search result${1===i?"":"s"}`}
                </div>
                ${t.docs.map(((t,e)=>{var s;return R`
                        <pnx-card 
                            .doc="${t}" 
                            .host="${null!==(s=this.host)&&void 0!==s?s:""}" 
                            .institution="${this.institution}"
                            .vid="${this.viewId}"
                            .language="${this.language}" 
                            .scope="${this.scope}"
                            .tab="${this.tab}" 
                            .defaultThumbnailUrl="${this.defaultThumbnailUrl}"
                            role="gridcell"
                            aria-posinset="${e+1}"
                            aria-setsize="${i}">
                        </pnx-card>
                    `}))}`})).catch((t=>(console.error("Error processing data for rendering:",t),R`
                <p role="alert" aria-live="assertive">
                    Error loading search results. Please try refreshing the page or contact support if the problem persists.
                </p>`)));return console.log("Rendering grid container"),R`
            <div class="gallery-container">
                ${i}
                <div 
                    class="grid-container"
                    role="grid"
                    aria-label="${this.titleText?`Search results for ${this.titleText}`:"Search results"}"
                    aria-live="polite">
                    ${mt(e,R`
                        <p role="status" aria-live="polite">
                            Loading search results, please wait...
                        </p>`)}
                </div>
            </div>
        `}getTitleHtml(){return this.titleText?this.titleLink?R`<h2><a href="${this.titleLink}">${this.titleText}</a></h2>`:R`<h2>${this.titleText}</h2>`:R``}};xt.styles=n`
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
        gap: 10px; /* Space between cards */
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

      /* Styles for pnx-card if needed, e.g., if it doesn't define its own width/height appropriately for a grid */
      /* pnx-card {
        width: 100%;
      } */

      /* Responsive adjustments for the grid */
      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 10px;
        }
      }
    `,$t([st()],xt.prototype,"searchUrl",void 0),$t([st()],xt.prototype,"titleText",void 0),$t([st()],xt.prototype,"titleLink",void 0),$t([st()],xt.prototype,"defaultThumbnailUrl",void 0),$t([function(t){return st({...t,state:!0})}()],xt.prototype,"data",void 0),xt=$t([it("search-carousel")],xt);export{xt as SearchCarousel};
