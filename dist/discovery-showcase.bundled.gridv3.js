/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new WeakMap;class r{constructor(t,i,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}}const o=(t,...i)=>{const s=1===t.length?t[0]:i.reduce(((i,e,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return new r(s,t,e)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,e))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const a=window,h=a.trustedTypes,c=h?h.emptyScript:"",d=a.reactiveElementPolyfillSupport,u={toAttribute(t,i){switch(i){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},v=(t,i)=>i!==t&&(i==i||t==t),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:v};class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this._$Ep(e,i);void 0!==s&&(this._$Ev.set(s,e),t.push(s))})),t}static createProperty(t,i=p){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const r=this[t];this[i]=s,this.requestUpdate(t,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(n(t))}else void 0!==t&&i.push(n(t));return i}static _$Ep(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{i?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$EO(t,i,e=p){var s;const r=this.constructor._$Ep(t,e);if(void 0!==r&&!0===e.reflect){const o=(void 0!==(null===(s=e.converter)||void 0===s?void 0:s.toAttribute)?e.converter:u).toAttribute(i,e.type);this._$El=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,i){var e;const s=this.constructor,r=s._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=s.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(e=t.converter)||void 0===e?void 0:e.fromAttribute)?t.converter:u;this._$El=r,this[r]=o.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:f}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.1");const m=window,b=m.trustedTypes,y=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,$=`<${x}>`,k=document,S=(t="")=>k.createComment(t),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,C=/-->/g,L=/>/g,E=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),_=/'/g,j=/"/g,U=/^(?:script|style|textarea|title)$/i,O=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),F=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),R=new WeakMap,D=k.createTreeWalker(k,129,null,!1),I=(t,i)=>{const e=t.length-1,s=[];let r,o=2===i?"<svg>":"",n=z;for(let i=0;i<e;i++){const e=t[i];let l,a,h=-1,c=0;for(;c<e.length&&(n.lastIndex=c,a=n.exec(e),null!==a);)c=n.lastIndex,n===z?"!--"===a[1]?n=C:void 0!==a[1]?n=L:void 0!==a[2]?(U.test(a[2])&&(r=RegExp("</"+a[2],"g")),n=E):void 0!==a[3]&&(n=E):n===E?">"===a[0]?(n=null!=r?r:z,h=-1):void 0===a[1]?h=-2:(h=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?E:'"'===a[3]?j:_):n===j||n===_?n=E:n===C||n===L?n=z:(n=E,r=void 0);const d=n===E&&t[i+1].startsWith("/>")?" ":"";o+=n===z?e+$:h>=0?(s.push(l),e.slice(0,h)+"$lit$"+e.slice(h)+w+d):e+w+(-2===h?(s.push(void 0),i):d)}const l=o+(t[e]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(l):l,s]};class M{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let r=0,o=0;const n=t.length-1,l=this.parts,[a,h]=I(t,i);if(this.el=M.createElement(a,e),D.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=D.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(w)){const e=h[o++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split(w),i=/([.?@])?(.*)/.exec(e);l.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?V:"?"===i[1]?G:"@"===i[1]?Z:J})}else l.push({type:6,index:r})}for(const i of t)s.removeAttribute(i)}if(U.test(s.tagName)){const t=s.textContent.split(w),i=t.length-1;if(i>0){s.textContent=b?b.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],S()),D.nextNode(),l.push({type:2,index:++r});s.append(t[i],S())}}}else if(8===s.nodeType)if(s.data===x)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)l.push({type:7,index:r}),t+=w.length-1}r++}}static createElement(t,i){const e=k.createElement("template");return e.innerHTML=t,e}}function N(t,i,e=t,s){var r,o,n,l;if(i===F)return i;let a=void 0!==s?null===(r=e._$Co)||void 0===r?void 0:r[s]:e._$Cl;const h=A(i)?void 0:i._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,e,s)),void 0!==s?(null!==(n=(l=e)._$Co)&&void 0!==n?n:l._$Co=[])[s]=a:e._$Cl=a),void 0!==a&&(i=N(t,a._$AS(t,i.values),a,s)),i}class B{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:e},parts:s}=this._$AD,r=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:k).importNode(e,!0);D.currentNode=r;let o=D.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let i;2===a.type?i=new H(o,o.nextSibling,this,t):1===a.type?i=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(i=new q(o,this,t)),this.u.push(i),a=s[++l]}n!==(null==a?void 0:a.index)&&(o=D.nextNode(),n++)}return r}p(t){let i=0;for(const e of this.u)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class H{constructor(t,i,e,s){var r;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=s,this._$Cm=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=N(this,t,i),A(t)?t===P||null==t||""===t?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==F&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==P&&A(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){var i;const{values:e,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=M.createElement(s.h,this.options)),s);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===r)this._$AH.p(e);else{const t=new B(r,this),i=t.v(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let i=R.get(t.strings);return void 0===i&&R.set(t.strings,i=new M(t)),i}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,s=0;for(const r of t)s===i.length?i.push(e=new H(this.O(S()),this.O(S()),this,this.options)):e=i[s],e._$AI(r),s++;s<i.length&&(this._$AR(e&&e._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class J{constructor(t,i,e,s,r){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=r,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,s){const r=this.strings;let o=!1;if(void 0===r)t=N(this,t,i,0),o=!A(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let n,l;for(t=r[0],n=0;n<r.length-1;n++)l=N(this,s[e+n],i,n),l===F&&(l=this._$AH[n]),o||(o=!A(l)||l!==this._$AH[n]),l===P?t=P:t!==P&&(t+=(null!=l?l:"")+r[n+1]),this._$AH[n]=l}o&&!s&&this.j(t)}j(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===P?void 0:t}}const W=b?b.emptyScript:"";class G extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==P?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class Z extends J{constructor(t,i,e,s,r){super(t,i,e,s,r),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=N(this,t,i,0))&&void 0!==e?e:P)===F)return;const s=this._$AH,r=t===P&&s!==P||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==P&&(s===P||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class q{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const K=m.litHtmlPolyfillSupport;null==K||K(M,H),(null!==(g=m.litHtmlVersions)&&void 0!==g?g:m.litHtmlVersions=[]).push("2.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Q,X;class Y extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,e)=>{var s,r;const o=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let n=o._$litPart$;if(void 0===n){const t=null!==(r=null==e?void 0:e.renderBefore)&&void 0!==r?r:null;o._$litPart$=n=new H(i.insertBefore(S(),t),t,void 0,null!=e?e:{})}return n._$AI(t),n})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return F}}Y.finalized=!0,Y._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:Y});const tt=globalThis.litElementPolyfillSupport;null==tt||tt({LitElement:Y}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
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
var rt;null===(rt=window.HTMLSlotElement)||void 0===rt||rt.prototype.assignedElements;
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
 */class nt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,e){this._$Ct=t,this._$AM=i,this._$Ci=e}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=(t,i)=>{var e,s;const r=t._$AN;if(void 0===r)return!1;for(const t of r)null===(s=(e=t)._$AO)||void 0===s||s.call(e,i,!1),lt(t,i);return!0},at=t=>{let i,e;do{if(void 0===(i=t._$AM))break;e=i._$AN,e.delete(t),t=i}while(0===(null==e?void 0:e.size))},ht=t=>{for(let i;i=t._$AM;t=i){let e=i._$AN;if(void 0===e)i._$AN=e=new Set;else if(e.has(t))break;e.add(t),ut(i)}};function ct(t){void 0!==this._$AN?(at(this),this._$AM=t,ht(this)):this._$AM=t}function dt(t,i=!1,e=0){const s=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(i)if(Array.isArray(s))for(let t=e;t<s.length;t++)lt(s[t],!1),at(s[t]);else null!=s&&(lt(s,!1),at(s));else lt(this,t)}const ut=t=>{var i,e,s,r;t.type==ot&&(null!==(i=(s=t)._$AP)&&void 0!==i||(s._$AP=dt),null!==(e=(r=t)._$AQ)&&void 0!==e||(r._$AQ=ct))};class vt extends nt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,e){super._$AT(t,i,e),ht(this),this.isConnected=t._$AU}_$AO(t,i=!0){var e,s;t!==this.isConnected&&(this.isConnected=t,t?null===(e=this.reconnected)||void 0===e||e.call(this):null===(s=this.disconnected)||void 0===s||s.call(this)),i&&(lt(this,t),at(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class pt{constructor(t){this.Y=t}disconnect(){this.Y=void 0}reconnect(t){this.Y=t}deref(){return this.Y}}class ft{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){var t;null!==(t=this.Z)&&void 0!==t||(this.Z=new Promise((t=>this.q=t)))}resume(){var t;null===(t=this.q)||void 0===t||t.call(this),this.Z=this.q=void 0}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=t=>!(t=>null===t||"object"!=typeof t&&"function"!=typeof t)(t)&&"function"==typeof t.then;const mt=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends vt{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CK=new pt(this),this._$CX=new ft}render(...t){var i;return null!==(i=t.find((t=>!gt(t))))&&void 0!==i?i:F}update(t,i){const e=this._$Cyt;let s=e.length;this._$Cyt=i;const r=this._$CK,o=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){const n=i[t];if(!gt(n))return this._$Cwt=t,n;t<s&&n===e[t]||(this._$Cwt=1073741823,s=0,Promise.resolve(n).then((async t=>{for(;o.get();)await o.get();const i=r.deref();if(void 0!==i){const e=i._$Cyt.indexOf(n);e>-1&&e<i._$Cwt&&(i._$Cwt=e,i.setValue(t))}})))}return F}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}),bt=o`
  :host {
    /* Title styling - can be customized by host page */
    --title-font-color: var(--pnx-card-title-color, inherit);
    --title-font-weight: var(--pnx-card-title-weight, 700);
    --title-font-size: var(--pnx-card-title-size, 13px);
    --title-font-family: var(--pnx-card-title-font, inherit);
    --title-line-height: var(--pnx-card-title-line-height, 1.3);

    /* Description styling - can be customized by host page */
    --description-font-color: var(--pnx-card-description-color, inherit);
    --description-font-weight: var(--pnx-card-description-weight, 400);
    --description-font-size: var(--pnx-card-description-size, 12px);
    --description-font-family: var(--pnx-card-description-font, inherit);
    --description-line-height: var(--pnx-card-description-line-height, 1.4);
    
    /* Image styling - can be customized by host page */
    --image-height: var(--pnx-card-image-height, 210px);
    --image-object-fit: var(--pnx-card-image-fit, contain);
    --image-border-radius: var(--pnx-card-image-border-radius, 0);
    
    /* Card styling - can be customized by host page */
    --card-background: var(--pnx-card-background, transparent);
    --card-border: var(--pnx-card-border, none);
    --card-border-radius: var(--pnx-card-border-radius, 4px);
    --card-padding: var(--pnx-card-padding, 0);
    --card-shadow: var(--pnx-card-shadow, none);
    --card-hover-shadow: var(--pnx-card-hover-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
    --card-hover-transform: var(--pnx-card-hover-transform, translateY(-2px));
    
    /* Focus and accessibility - can be customized by host page */
    --focus-color: var(--pnx-card-focus-color, #0066cc);
    --focus-outline-width: var(--pnx-card-focus-width, 3px);
    
    /* Placeholder styling - can be customized by host page */
    --placeholder-background: var(--pnx-card-placeholder-bg, #f5f5f5);
    --placeholder-color: var(--pnx-card-placeholder-color, #666);
    --placeholder-border: var(--pnx-card-placeholder-border, 2px dashed #ccc);
    --placeholder-font-size: var(--pnx-card-placeholder-font-size, 2rem);
    
    display: block;
    width: 100%;
    background: var(--card-background);
    border: var(--card-border);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    box-shadow: var(--card-shadow);
  }
  
  a {
    text-decoration: none;
    color: var(--title-font-color);
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: var(--card-border-radius);
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
    transform: var(--card-hover-transform);
    box-shadow: var(--card-hover-shadow);
  }
  
  /* Title styling */
  .title {
    color: var(--title-font-color);
    font-weight: var(--title-font-weight);
    font-size: var(--title-font-size);
    font-family: var(--title-font-family);
    line-height: var(--title-line-height);
    margin: 8px 0 4px 0;
    padding: 0 8px;
  }
  
  /* Description styling */
  .description {
    color: var(--description-font-color);
    font-weight: var(--description-font-weight);
    font-size: var(--description-font-size);
    font-family: var(--description-font-family);
    line-height: var(--description-line-height);
    margin: 0;
    padding: 0 8px 8px 8px;
    flex-grow: 1;
  }
  
  /* Ensure images are accessible and responsive */
  img, .image-place-holder {
    height: var(--image-height);
    width: 100%;
    display: block;
    object-fit: var(--image-object-fit);
    border-radius: var(--image-border-radius);
  }

  .image-place-holder {
    background-color: var(--placeholder-background);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--placeholder-color);
    font-size: var(--placeholder-font-size);
    border: var(--placeholder-border);
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
`;var yt=function(t,i,e,s){for(var r,o=arguments.length,n=o<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,l=t.length-1;l>=0;l--)(r=t[l])&&(n=(o<3?r(n):o>3?r(i,e,n):r(i,e))||n);return o>3&&n&&Object.defineProperty(i,e,n),n};let wt=class extends Y{render(){this.almaDThumbnailBaseURL=this.getAlmaDThumbnailBaseUrl();const t=this.getThumbnailLinks(),i=this.getDocumentTitle(),e=this.getDocumentAuthor(),s=this.generateImageAltText(i,e),r=this.generateLinkAriaLabel(i,e),o=O`<div 
            style="background-color: ${this.getRandomColor()}" 
            class="image-place-holder"
            role="img"
            aria-label="${s}">
            <span aria-hidden="true">📚</span>
        </div>`,n=t.then((t=>O`<img src="${t}" alt="${s}" loading="lazy" />`)).catch((()=>o)),l=this.getDeeplink();return O`
            <a  
                href="${l||"#"}" 
                target="_blank" 
                aria-label="${r}"
                role="link">
                ${mt(n,o)}
                <!-- <div class="title">${i}</div>
                <div class="description">${e}</div> -->
            </a>
            
        `}async hasThumbnailImage(){try{const t=await this.getThumbnailLinks();return t&&""!==t&&t!==this.defaultThumbnailUrl}catch(t){return!1}}getDocumentTitle(){var t,i,e,s,r,o,n,l;const a=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.display,h=null===(s=null===(e=this.doc)||void 0===e?void 0:e.pnx)||void 0===s?void 0:s.addata;return(null===(r=null==a?void 0:a.title)||void 0===r?void 0:r[0])||(null===(o=null==h?void 0:h.btitle)||void 0===o?void 0:o[0])||(null===(n=null==h?void 0:h.addtitle)||void 0===n?void 0:n[0])||(null===(l=null==a?void 0:a.source)||void 0===l?void 0:l[0])||"Document"}getDocumentAuthor(){var t,i,e,s,r,o,n;const l=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.display,a=null===(s=null===(e=this.doc)||void 0===e?void 0:e.pnx)||void 0===s?void 0:s.addata,h=(null===(r=null==l?void 0:l.creator)||void 0===r?void 0:r[0])||(null===(o=null==a?void 0:a.au)||void 0===o?void 0:o[0])||(null===(n=null==a?void 0:a.aulast)||void 0===n?void 0:n[0]);return h?h.replace(/\$\$[A-Z].*?(?=\$\$|$)/g,"").replace(/\$\$.*$/,"").trim():""}generateImageAltText(t,i){const e=this.getDocumentType();return i?`Cover image for ${e} "${t}" by ${i}`:`Cover image for ${e} "${t}"`}generateLinkAriaLabel(t,i){const e=this.getDocumentType();return i?`View details for ${e} "${t}" by ${i}`:`View details for ${e} "${t}"`}getDocumentType(){var t,i,e,s,r,o,n,l;const a=null===(s=null===(e=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.display)||void 0===e?void 0:e.type)||void 0===s?void 0:s[0],h=null===(l=null===(n=null===(o=null===(r=this.doc)||void 0===r?void 0:r.pnx)||void 0===o?void 0:o.display)||void 0===n?void 0:n.format)||void 0===l?void 0:l[0],c={book:"book",journal:"journal",newspaper:"newspaper",article:"article",thesis:"thesis",dissertation:"dissertation",conference:"conference paper",patent:"patent",review:"review",report:"report"};return a&&c[a.toLowerCase()]?c[a.toLowerCase()]:h&&(h.toLowerCase().includes("electronic")||h.toLowerCase().includes("online"))?"digital resource":"item"}getAlmaDThumbnailBaseUrl(){return`${new URL(this.doc["@id"]).origin}/view/delivery/thumbnail`}getRandomColor(){let t="#";for(let i=0;i<6;i++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}getDeeplink(){var t,i,e,s;let r="";const o=new URL(this.doc["@id"]),n=this.getProtocol(o),l=this.isPrimo()?"/primo-explore":"/discovery",a=this.getState(),h=this.doc.pnx.control.recordid,c=this.doc.context,d=null!==(t=this.vid)&&void 0!==t?t:"",u=null!==(i=this.language)&&void 0!==i?i:"en",v=null!==(e=this.scope)&&void 0!==e?e:"",p=null!==(s=this.tab)&&void 0!==s?s:"";return r=n+this.host+l+a+"&docid="+h+"&context="+c+"&vid="+d+"&lang="+u+"&search_scope="+v+"&tab="+p,r}getProtocol(t){return t.protocol+"//"}isPrimo(){return!1}getState(){return"/fulldisplay?"}async getThumbnailLinks(){try{let t=(this.doc.delivery.link||[]).filter((t=>"thumbnail"===t.displayLabel));const i=await this.getThumbnailFromAlmaD();if(i)return i;let e=await this.getThumbnailFromOther(t);if(e)return e;const s=await this.getThumbnailFromSyndeticsEXL(t);if(s)return s;const r=await this.getThumbnailFromSyndetics(t);if(r)return r;const o=await this.getThumbnailFromGoogle(t);if(o)return o;if(this.defaultThumbnailUrl)return this.defaultThumbnailUrl;throw"no thumbnail"}catch(t){throw t}}async getThumbnailFromAlmaD(){try{if(this.isAlmaD()){const t=await this.getAlmaDigitalThumbnailForPnx();return await this.resolveAlmaDigitalImage(t)}return""}catch(t){return console.error("Error in getThumbnailFromAlmaD:",t),""}}async getThumbnailFromOther(t){let i=t.filter(this.getAllButSpecificLinkFilterFactory("amazon"));if(i=i.filter(this.getAllButSpecificLinkFilterFactory("syndetics.com")),i=i.filter(this.getAllButSpecificLinkFilterFactory("google.com")),!i.length)return"";{const t=i.map((t=>(this.removeLabelFromLinkUrl(t),this.getImageLink(t.linkURL))));try{return await Promise.race(t)||""}catch(t){return""}}}getAllButSpecificLinkFilterFactory(t){return i=>{if("string"==typeof i)return-1===i.indexOf(t);let e=null==i?void 0:i.linkURL;return!!e&&("string"==typeof e?-1===e.indexOf(t):-1===e.linkURL.indexOf(t))}}async getThumbnailFromSyndeticsEXL(t,i){var e,s,r,o,n,l,a,h,c,d,u,v,p,f,g;const m=t.filter((t=>this.getSpecificLink(t,"syndetics.com")||this.getSpecificLink(t,"primo")));if(m.length>0||!this.isPrimo()){const t=[...new Set(((null===(r=null===(s=null===(e=this.doc)||void 0===e?void 0:e.pnx)||void 0===s?void 0:s.addata)||void 0===r?void 0:r.isbn)||[]).concat((null===(l=null===(n=null===(o=this.doc)||void 0===o?void 0:o.pnx)||void 0===n?void 0:n.addata)||void 0===l?void 0:l.eisbn)||[]))],b=[...new Set(((null===(c=null===(h=null===(a=this.doc)||void 0===a?void 0:a.pnx)||void 0===h?void 0:h.addata)||void 0===c?void 0:c.issn)||[]).concat((null===(v=null===(u=null===(d=this.doc)||void 0===d?void 0:d.pnx)||void 0===u?void 0:u.addata)||void 0===v?void 0:v.eissn)||[]))],y=(null===(g=null===(f=null===(p=this.doc)||void 0===p?void 0:p.pnx)||void 0===f?void 0:f.addata)||void 0===g?void 0:g.upcid)||[],w="https://syndetics.com/index.php?client=primo&"+(i?"type=unbound&":"");for(const i of t)m.push(this.createLinkObj(`${w}isbn=${i}/lc.jpg`));for(const t of b)m.push(this.createLinkObj(`${w}issn=${t}/lc.jpg`));for(const t of y)m.push(this.createLinkObj(`${w}upc=${t}/lc.jpg`));if(m.length>0)return this.handleSyndeticsThumbnailLinks(m)}return""}async getThumbnailFromSyndetics(t){const i=t.filter((t=>this.getSpecificLink(t,"syndetics.com")));return i.length>0?this.handleSyndeticsThumbnailLinks(i):""}getSpecificLink(t,i){if("string"==typeof t)return t.indexOf(i)>-1;let e=t?t.linkURL:void 0;return!!e&&("string"==typeof e?e.indexOf(i)>-1:e.linkURL.indexOf(i)>-1)}async handleSyndeticsThumbnailLinks(t){let i=this.getSyndetixWithProxy(),e=t.map((t=>{const e=t.linkURL.replace("https://syndetics.com/index.php?client=",i);return this.getImageLink(e)}));return await this.createPromiseOnlyFailOnAllFailedResolveFirstSuccess(e)}async getThumbnailFromGoogle(t){if(this.showICPLicenseFooter())return"";const i=t.find((t=>this.getSpecificLink(t,"books.google.com")));if(!i)return"";try{const t=i.linkURL.replace("&callback=updateGBSCover",""),e=await fetch(t),s=await e.text();let r=JSON.parse(s.substring(s.indexOf("{"),s.indexOf("}")+2));const o=Object.keys(r);if(o.length>0){let t=r[o[0]].thumbnail_url;if(t){return{displayLabel:"thumbnail",linkType:"http://purl.org/pnx/linkType/thumbnail",linkURL:this.handleLink(t)}.linkURL}}}catch(t){return""}return""}async createPromiseOnlyFailOnAllFailedResolveFirstSuccess(t){const i=t.map(this.reflect),e=(await Promise.all(i)).find((t=>"resolved"===t.status));return e?e.value:""}reflect(t){return t.then((t=>({value:t,status:"resolved"})),(t=>({error:t,status:"rejected"})))}showICPLicenseFooter(){return!1}removeLabelFromLinkUrl(t){let i=t.linkURL;i&&i.includes("$$L")&&(t.linkURL=i.substr(0,i.indexOf("$$L")).trim())}isAlmaD(){var t,i,e,s;return!this.isPrimo()&&("SP"===this.doc.context&&"alma"===(null===(e=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.control)||void 0===e?void 0:e.sourceid)&&(null===(s=this.doc.delivery)||void 0===s?void 0:s.electronicServices)?this.doc.delivery.electronicServices.filter((t=>"DIGITAL"===t.serviceType)).length>0:!0===this.doc.delivery.hasD||!0===this.doc.delivery.digitalAuxiliaryMode)}async getAlmaDigitalThumbnailForPnx(){var t,i,e,s,r,o,n,l,a,h,c,d,u,v,p;const f=null===(s=null===(e=null===(i=null===(t=this.doc)||void 0===t?void 0:t.pnx)||void 0===i?void 0:i.control)||void 0===e?void 0:e.sourcerecordid)||void 0===s?void 0:s[0],g=(null===(o=null===(r=this.doc)||void 0===r?void 0:r.delivery)||void 0===o?void 0:o.recordInstitutionCode)||this.institution;let m=this.getAlmaDigitalThumbnailUrl(f);if((null===(l=null===(n=this.doc)||void 0===n?void 0:n.delivery)||void 0===l?void 0:l.sharedDigitalCandidates)&&this.doc.delivery.sharedDigitalCandidates.length>0){const t=await fetch(`${this.almaDThumbnailBaseURL}/${g}/${f}?vid=${this.vid}`,{method:"POST",body:JSON.stringify(null===(h=null===(a=this.doc)||void 0===a?void 0:a.delivery)||void 0===h?void 0:h.sharedDigitalCandidates)});m=(await t.json()).data}else if(null===(u=null===(d=null===(c=this.doc)||void 0===c?void 0:c.pnx)||void 0===d?void 0:d.control)||void 0===u?void 0:u.isDedup){const t=await fetch(`${this.almaDThumbnailBaseURL}/${f}?vid=${this.vid}`);if(!(null===(p=null===(v=await t.json())||void 0===v?void 0:v.data)||void 0===p?void 0:p.hasDigitalInventory))return""}return this.isEsploroRecord()&&(m+="?calculateAccessRights=true"),m}isEsploroRecord(){var t;return"ESPLORO"===(null===(t=this.doc.pnx.control.sourceformat)||void 0===t?void 0:t[0])||!1}getAlmaDigitalThumbnailUrl(t){return`${this.almaDThumbnailBaseURL}/${this.institution}/${t}`}resolveAlmaDigitalImage(t){return this.getImageLink(t)}createLinkObj(t){return{displayLabel:"thumbnail",linkType:"http://purl.org/pnx/linkType/thumbnail",linkURL:t}}async getImageLink(t){return new Promise(((i,e)=>{if(!t)return void e("");const s=new Image;s.onload=()=>{s.width>1?i(t):e("")},s.onerror=()=>{e("")},s.src=this.handleLink(t)}))}handleLink(t){let i=t;return"https:"===window.location.protocol&&(i=t.replace("http://","https://")),i}getSyndetixWithProxy(){return"https://proxy-na.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client="}};wt.styles=bt,yt([st()],wt.prototype,"doc",void 0),yt([st()],wt.prototype,"host",void 0),yt([st()],wt.prototype,"institution",void 0),yt([st()],wt.prototype,"vid",void 0),yt([st()],wt.prototype,"language",void 0),yt([st()],wt.prototype,"scope",void 0),yt([st()],wt.prototype,"tab",void 0),yt([st()],wt.prototype,"defaultThumbnailUrl",void 0),wt=yt([it("pnx-card")],wt);var xt=function(t,i,e,s){for(var r,o=arguments.length,n=o<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,l=t.length-1;l>=0;l--)(r=t[l])&&(n=(o<3?r(n):o>3?r(i,e,n):r(i,e))||n);return o>3&&n&&Object.defineProperty(i,e,n),n};let $t=class extends Y{constructor(){super(),this.searchUrl="",this.desiredCardCount=10}connectedCallback(){super.connectedCallback(),this.data=Promise.resolve({docs:[]})}async performQuery(){try{const t=await fetch(this.searchUrl);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);this.data=t.json()}catch(t){console.error("Failed to perform query:",t),this.data=Promise.resolve({docs:[]})}}async fetchResultsWithThumbnails(){var t;const i=[];let e=0;const s=Math.max(2*this.desiredCardCount,20);let r=0;for(;i.length<this.desiredCardCount&&r<5;)try{const o=new URL(this.searchUrl);o.searchParams.set("offset",e.toString()),o.searchParams.set("limit",s.toString());const n=await fetch(o.toString());if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const l=await n.json();if(!l||!l.docs||0===l.docs.length)break;for(const e of l.docs){if(i.length>=this.desiredCardCount)break;const s=document.createElement("pnx-card");s.doc=e,s.host=null!==(t=this.host)&&void 0!==t?t:"",s.institution=this.institution,s.vid=this.viewId,s.language=this.language,s.scope=this.scope,s.tab=this.tab,s.defaultThumbnailUrl=this.defaultThumbnailUrl;try{await s.hasThumbnailImage()&&i.push(e)}catch(t){console.warn("Error checking thumbnail for document:",t)}}if(e+=s,r++,l.docs.length<s)break}catch(t){console.error(`Failed to fetch batch at offset ${e}:`,t);break}return i.slice(0,this.desiredCardCount)}render(){if(console.log("SearchCarousel render called, data:",this.data),!this.data)return O`
                <div class="gallery-container">
                    <p role="status" aria-live="polite">Loading search results...</p>
                </div>`;const t=new URL(this.searchUrl);this.host=t.host,this.viewId=t.searchParams.get("vid"),this.language=t.searchParams.get("lang"),this.scope=t.searchParams.get("scope"),this.tab=t.searchParams.get("tab"),this.institution=t.searchParams.get("inst");const i=this.fetchResultsWithThumbnails().then((t=>{if(console.log("Filtered docs with thumbnails:",t),0===t.length)return O`
                    <p role="status" aria-live="polite">
                        No items with thumbnail images found in the search results.
                    </p>`;const i=t.length;return O`
                <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    ${`Showing ${i} item${1===i?"":"s"} with thumbnail images`}
                </div>
                ${t.map(((t,e)=>{var s;return O`
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
                    `}))}`})).catch((t=>(console.error("Error processing data for rendering:",t),O`
                <p role="alert" aria-live="assertive">
                    Error loading search results. Please try refreshing the page or contact support if the problem persists.
                </p>`)));return console.log("Rendering grid container"),O`
            <div class="gallery-container">
                <div 
                    class="grid-container"
                    role="grid"
                    aria-label="${this.titleText?`Search results for ${this.titleText}`:"Search results"}"
                    aria-live="polite">
                    ${mt(i,O`
                        <p role="status" aria-live="polite">
                            Loading search results, please wait...
                        </p>`)}
                </div>
                ${this.getButtonHtml()}
            </div>
        `}getButtonHtml(){return this.titleText&&this.titleLink?O`
                <div class="button-container">
                    <a href="${this.titleLink}" class="action-button">${this.titleText}</a>
                </div>
            `:O``}};$t.styles=o`
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
    `,xt([st()],$t.prototype,"searchUrl",void 0),xt([st()],$t.prototype,"titleText",void 0),xt([st()],$t.prototype,"titleLink",void 0),xt([st()],$t.prototype,"defaultThumbnailUrl",void 0),xt([st({type:Number})],$t.prototype,"desiredCardCount",void 0),xt([function(t){return st({...t,state:!0})}()],$t.prototype,"data",void 0),$t=xt([it("search-carousel")],$t);export{$t as SearchCarousel};
