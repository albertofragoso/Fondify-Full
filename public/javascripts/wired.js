var WebElements=function(t){"use strict";const e=new WeakMap,s=t=>"function"==typeof t&&e.has(t),i=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,s=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.removeChild(i),i=e}},o={},r={},a=`{{lit-${String(Math.random()).slice(2)}}}`,h=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${h}`),c="$lit$";class d{constructor(t,e){this.parts=[],this.element=e;let s=-1,i=0;const n=[],o=e=>{const r=e.content,h=document.createTreeWalker(r,133,null,!1);let d=0;for(;h.nextNode();){s++;const e=h.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let o=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(a)>=0&&o++;for(;o-- >0;){const n=t.strings[i],o=f.exec(n)[2],r=o.toLowerCase()+c,a=e.getAttribute(r).split(l);this.parts.push({type:"attribute",index:s,name:o,strings:a}),e.removeAttribute(r),i+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const o=e.parentNode,r=t.split(l),a=r.length-1;for(let t=0;t<a;t++)o.insertBefore(""===r[t]?p():document.createTextNode(r[t]),e),this.parts.push({type:"node",index:++s});""===r[a]?(o.insertBefore(p(),e),n.push(e)):e.data=r[a],i+=a}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&s!==d||(s++,t.insertBefore(p(),e)),d=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(n.push(e),s--),i++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of n)t.parentNode.removeChild(t)}}const u=t=>-1!==t.index,p=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=i?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let s=0,n=0;const o=t=>{const i=document.createTreeWalker(t,133,null,!1);let r=i.nextNode();for(;s<e.length&&null!==r;){const t=e[s];if(u(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));s++}else n++,"TEMPLATE"===r.nodeName&&o(r.content),r=i.nextNode();else this._parts.push(void 0),s++}};return o(t),i&&(document.adoptNode(t),customElements.upgrade(t)),t}}class m{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s],i=f.exec(t);e+=i?t.substr(0,i.index)+i[1]+i[2]+c+i[3]+a:t+h}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>null===t||!("object"==typeof t||"function"==typeof t);class b{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new v(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class v{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===o||y(t)&&t===this.value||(this.value=t,s(t)||(this.committer.dirty=!0))}commit(){for(;s(this.value);){const t=this.value;this.value=o,t(this)}this.value!==o&&this.committer.commit()}}class w{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(p()),this.endNode=t.appendChild(p())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=p()),t._insert(this.endNode=p())}insertAfterPart(t){t._insert(this.startNode=p()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o,t(this)}const t=this._pendingValue;t!==o&&(y(t)?t!==this.value&&this._commitText(t):t instanceof m?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===r?(this.value=r,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const s=new g(e,t.processor,this.options),i=s._clone();s.update(t.values),this._commitNode(i),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)void 0===(s=e[i])&&(s=new w(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o,t(this)}if(this._pendingValue===o)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=o}}class k extends b{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends v{}let S=!1;try{const t={get capture(){return S=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class M{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=o,t(this)}if(this._pendingValue===o)return;const t=this._pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=P(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=o}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const P=t=>t&&(S?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const C=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];return"."===n?new k(t,e.slice(1),s).parts:"@"===n?[new M(t,e.slice(1),i.eventContext)]:"?"===n?[new x(t,e.slice(1),s)]:new b(t,e,s).parts}handleTextExpression(t){return new w(t)}};function E(t){let e=A.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},A.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(a);return void 0===(s=e.keyString.get(i))&&(s=new d(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const A=new Map,N=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const T=(t,...e)=>new m(t,e,"html",C),O=133;function R(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,O,null,!1);let o=I(i),r=i[o],a=-1,h=0;const l=[];let c=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(l.push(t),null===c&&(c=t)),null!==c&&h++;void 0!==r&&r.index===a;)r.index=null!==c?-1:r.index-h,r=i[o=I(i,o)]}l.forEach(t=>t.parentNode.removeChild(t))}const L=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,O,null,!1);for(;s.nextNode();)e++;return e},I=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(u(e))return s}return-1};const z=(t,e)=>`${t}--${e}`;let $=!0;void 0===window.ShadyCSS?$=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),$=!1);const D=t=>e=>{const s=z(e.type,t);let i=A.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},A.set(s,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const o=e.strings.join(a);if(void 0===(n=i.keyString.get(o))){const s=e.getTemplateElement();$&&window.ShadyCSS.prepareTemplateDom(s,t),n=new d(e,s),i.keyString.set(o,n)}return i.stringsArray.set(e.strings,n),n},V=["html","svg"],j=new Set,B=(t,e,s)=>{j.add(s);const i=t.querySelectorAll("style");if(0===i.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,s);const n=document.createElement("style");for(let t=0;t<i.length;t++){const e=i[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{V.forEach(e=>{const s=A.get(z(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),R(t,s)})})})(s),function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const o=document.createTreeWalker(i,O,null,!1);let r=I(n),a=0,h=-1;for(;o.nextNode();)for(h++,o.currentNode===s&&(a=L(e),s.parentNode.insertBefore(e,s));-1!==r&&n[r].index===h;){if(a>0){for(;-1!==r;)n[r].index+=a,r=I(n,r);return}r=I(n,r)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,s),window.ShadyCSS.nativeShadow){const s=e.element.content.querySelector("style");t.insertBefore(s.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),R(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const W={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},U=(t,e)=>e!==t&&(e==e||t==t),q={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:U},G=Promise.resolve(!0),X=1,F=4,H=8,Y=16,J=32;class Q extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=G,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=q){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const i=this[t];this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=U){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||W,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||W.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|J,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=q){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|H,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~H}}_attributeToProperty(t,e){if(this._updateState&H)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||q;this._updateState=this._updateState|Y,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Y}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,n=i._classProperties.get(t)||q;i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|F;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&J}get _hasRequestedUpdate(){return this._updateState&F}get hasUpdated(){return this._updateState&X}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&X||(this._updateState=this._updateState|X,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~F}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}Q.finalized=!0;const Z=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),K=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}}:Object.assign({},e,{finisher(s){s.createProperty(e.key,t)}}),tt=(t,e,s)=>{e.constructor.createProperty(s,t)};function et(t){return(e,s)=>void 0!==s?tt(t,e,s):K(t,e)}const st=(t,e,s)=>{Object.defineProperty(e,s,t)},it=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t}),nt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class rt{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const at=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof rt)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new rt(s,ot)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const ht=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let i=0,n=e.length;i<n;i++){const n=e[i];Array.isArray(n)?t(n,s):s.push(n)}return s}(t);class lt extends Q{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ht(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof m&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}lt.finalized=!0,lt.render=((t,e,s)=>{const i=s.scopeName,o=N.has(e),r=e instanceof ShadowRoot&&$&&t instanceof m,a=r&&!j.has(i),h=a?document.createDocumentFragment():e;if(((t,e,s)=>{let i=N.get(e);void 0===i&&(n(e,e.firstChild),N.set(e,i=new w(Object.assign({templateFactory:E},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,h,Object.assign({templateFactory:D(i)},s)),a){const t=N.get(h);N.delete(h),t.value instanceof g&&B(h,t.value.template,i),n(e,e.firstChild),e.appendChild(h),N.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)});const ct="undefined"!=typeof self;class dt{constructor(t,e){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1},this.config=t||{},this.surface=e,this.config.options&&(this.defaultOptions=this._options(this.config.options))}_options(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_drawable(t,e,s){return{shape:t,sets:e||[],options:s||this.defaultOptions}}getCanvasSize(){const t=t=>t&&"object"==typeof t&&t.baseVal&&t.baseVal.value?t.baseVal.value:t||100;return this.surface?[t(this.surface.width),t(this.surface.height)]:[100,100]}computePolygonSize(t){if(t.length){let e=t[0][0],s=t[0][0],i=t[0][1],n=t[0][1];for(let o=1;o<t.length;o++)e=Math.min(e,t[o][0]),s=Math.max(s,t[o][0]),i=Math.min(i,t[o][1]),n=Math.max(n,t[o][1]);return[s-e,n-i]}return[0,0]}polygonPath(t){let e="";if(t.length){e=`M${t[0][0]},${t[0][1]}`;for(let s=1;s<t.length;s++)e=`${e} L${t[s][0]},${t[s][1]}`}return e}computePathSize(t){let e=[0,0];if(ct&&self.document)try{const s="http://www.w3.org/2000/svg",i=self.document.createElementNS(s,"svg");i.setAttribute("width","0"),i.setAttribute("height","0");const n=self.document.createElementNS(s,"path");n.setAttribute("d",t),i.appendChild(n),self.document.body.appendChild(i);const o=n.getBBox();o&&(e[0]=o.width||0,e[1]=o.height||0),self.document.body.removeChild(i)}catch(t){}const s=this.getCanvasSize();return e[0]*e[1]||(e=s),e}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,i=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:"none"};break;case"fillPath":e={d:this.opsToPath(t),stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"fillSketch":e=this.fillSketch(t,s);break;case"path2Dfill":e={d:t.path||"",stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"path2Dpattern":{const i=t.size,n={x:0,y:0,width:1,height:1,viewBox:`0 0 ${Math.round(i[0])} ${Math.round(i[1])}`,patternUnits:"objectBoundingBox",path:this.fillSketch(t,s)};e={d:t.path,stroke:"none",strokeWidth:0,pattern:n};break}}e&&i.push(e)}return i}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||"none",strokeWidth:s,fill:"none"}}opsToPath(t){let e="";for(const s of t.ops){const t=s.data;switch(s.op){case"move":e+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":e+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"qcurveTo":e+=`Q${t[0]} ${t[1]}, ${t[2]} ${t[3]} `;break;case"lineTo":e+=`L${t[0]} ${t[1]} `}}return e.trim()}}function ut(t,e){return t.type===e}const pt={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:4,t:2,V:1,v:1,Z:0,z:0};class ft{constructor(t){this.COMMAND=0,this.NUMBER=1,this.EOD=2,this.segments=[],this.parseData(t),this.processPoints()}tokenize(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:this.COMMAND,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return console.error("Unrecognized segment command: "+t),[];e[e.length]={type:this.NUMBER,text:`${parseFloat(RegExp.$1)}`},t=t.substr(RegExp.$1.length)}return e[e.length]={type:this.EOD,text:""},e}parseData(t){const e=this.tokenize(t);let s=0,i=e[s],n="BOD";for(this.segments=new Array;!ut(i,this.EOD);){let o;const r=new Array;if("BOD"===n){if("M"!==i.text&&"m"!==i.text)return void this.parseData("M0,0"+t);s++,o=pt[i.text],n=i.text}else ut(i,this.NUMBER)?o=pt[n]:(s++,o=pt[i.text],n=i.text);if(s+o<e.length){for(let t=s;t<s+o;t++){const s=e[t];if(!ut(s,this.NUMBER))return void console.error("Parameter type is not a number: "+n+","+s.text);r[r.length]=+s.text}if("number"!=typeof pt[n])return void console.error("Unsupported segment type: "+n);{const t={key:n,data:r};this.segments.push(t),i=e[s+=o],"M"===n&&(n="L"),"m"===n&&(n="l")}}else console.error("Path data ended before all parameters were found")}}get closed(){if(void 0===this._closed){this._closed=!1;for(const t of this.segments)"z"===t.key.toLowerCase()&&(this._closed=!0)}return this._closed}processPoints(){let t=null,e=[0,0];for(let s=0;s<this.segments.length;s++){const i=this.segments[s];switch(i.key){case"M":case"L":case"T":i.point=[i.data[0],i.data[1]];break;case"m":case"l":case"t":i.point=[i.data[0]+e[0],i.data[1]+e[1]];break;case"H":i.point=[i.data[0],e[1]];break;case"h":i.point=[i.data[0]+e[0],e[1]];break;case"V":i.point=[e[0],i.data[0]];break;case"v":i.point=[e[0],i.data[0]+e[1]];break;case"z":case"Z":t&&(i.point=[t[0],t[1]]);break;case"C":i.point=[i.data[4],i.data[5]];break;case"c":i.point=[i.data[4]+e[0],i.data[5]+e[1]];break;case"S":i.point=[i.data[2],i.data[3]];break;case"s":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"Q":i.point=[i.data[2],i.data[3]];break;case"q":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"A":i.point=[i.data[5],i.data[6]];break;case"a":i.point=[i.data[5]+e[0],i.data[6]+e[1]]}"m"!==i.key&&"M"!==i.key||(t=null),i.point&&(e=i.point,t||(t=i.point)),"z"!==i.key&&"Z"!==i.key||(t=null)}}}class gt{constructor(t){this._position=[0,0],this._first=null,this.bezierReflectionPoint=null,this.quadReflectionPoint=null,this.parsed=new ft(t)}get segments(){return this.parsed.segments}get closed(){return this.parsed.closed}get linearPoints(){if(!this._linearPoints){const t=[];let e=[];for(const s of this.parsed.segments){const i=s.key.toLowerCase();("m"!==i&&"z"!==i||(e.length&&(t.push(e),e=[]),"z"!==i))&&(s.point&&e.push(s.point))}e.length&&(t.push(e),e=[]),this._linearPoints=t}return this._linearPoints}get first(){return this._first}set first(t){this._first=t}setPosition(t,e){this._position=[t,e],this._first||(this._first=[t,e])}get position(){return this._position}get x(){return this._position[0]}get y(){return this._position[1]}}class mt{constructor(t,e,s,i,n,o){if(this._segIndex=0,this._numSegs=0,this._rx=0,this._ry=0,this._sinPhi=0,this._cosPhi=0,this._C=[0,0],this._theta=0,this._delta=0,this._T=0,this._from=t,t[0]===e[0]&&t[1]===e[1])return;const r=Math.PI/180;this._rx=Math.abs(s[0]),this._ry=Math.abs(s[1]),this._sinPhi=Math.sin(i*r),this._cosPhi=Math.cos(i*r);const a=this._cosPhi*(t[0]-e[0])/2+this._sinPhi*(t[1]-e[1])/2,h=-this._sinPhi*(t[0]-e[0])/2+this._cosPhi*(t[1]-e[1])/2;let l=0;const c=this._rx*this._rx*this._ry*this._ry-this._rx*this._rx*h*h-this._ry*this._ry*a*a;if(c<0){const t=Math.sqrt(1-c/(this._rx*this._rx*this._ry*this._ry));this._rx=this._rx*t,this._ry=this._ry*t,l=0}else l=(n===o?-1:1)*Math.sqrt(c/(this._rx*this._rx*h*h+this._ry*this._ry*a*a));const d=l*this._rx*h/this._ry,u=-l*this._ry*a/this._rx;this._C=[0,0],this._C[0]=this._cosPhi*d-this._sinPhi*u+(t[0]+e[0])/2,this._C[1]=this._sinPhi*d+this._cosPhi*u+(t[1]+e[1])/2,this._theta=this.calculateVectorAngle(1,0,(a-d)/this._rx,(h-u)/this._ry);let p=this.calculateVectorAngle((a-d)/this._rx,(h-u)/this._ry,(-a-d)/this._rx,(-h-u)/this._ry);!o&&p>0?p-=2*Math.PI:o&&p<0&&(p+=2*Math.PI),this._numSegs=Math.ceil(Math.abs(p/(Math.PI/2))),this._delta=p/this._numSegs,this._T=8/3*Math.sin(this._delta/4)*Math.sin(this._delta/4)/Math.sin(this._delta/2)}getNextSegment(){if(this._segIndex===this._numSegs)return null;const t=Math.cos(this._theta),e=Math.sin(this._theta),s=this._theta+this._delta,i=Math.cos(s),n=Math.sin(s),o=[this._cosPhi*this._rx*i-this._sinPhi*this._ry*n+this._C[0],this._sinPhi*this._rx*i+this._cosPhi*this._ry*n+this._C[1]],r=[this._from[0]+this._T*(-this._cosPhi*this._rx*e-this._sinPhi*this._ry*t),this._from[1]+this._T*(-this._sinPhi*this._rx*e+this._cosPhi*this._ry*t)],a=[o[0]+this._T*(this._cosPhi*this._rx*n+this._sinPhi*this._ry*i),o[1]+this._T*(this._sinPhi*this._rx*n-this._cosPhi*this._ry*i)];return this._theta=s,this._from=[o[0],o[1]],this._segIndex++,{cp1:r,cp2:a,to:o}}calculateVectorAngle(t,e,s,i){const n=Math.atan2(e,t),o=Math.atan2(i,s);return o>=n?o-n:2*Math.PI-(n-o)}}class yt{constructor(t,e){this.sets=t,this.closed=e}fit(t){const e=[];for(const s of this.sets){const i=s.length;let n=Math.floor(t*i);if(n<5){if(i<=5)continue;n=5}e.push(this.reduce(s,n))}let s="";for(const t of e){for(let e=0;e<t.length;e++){const i=t[e];s+=0===e?"M"+i[0]+","+i[1]:"L"+i[0]+","+i[1]}this.closed&&(s+="z ")}return s}distance(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))}reduce(t,e){if(t.length<=e)return t;const s=t.slice(0);for(;s.length>e;){let t=-1,e=-1;for(let i=1;i<s.length-1;i++){const n=this.distance(s[i-1],s[i]),o=this.distance(s[i],s[i+1]),r=this.distance(s[i-1],s[i+1]),a=(n+o+r)/2,h=Math.sqrt(a*(a-n)*(a-o)*(a-r));(t<0||h<t)&&(t=h,e=i)}if(!(e>0))break;s.splice(e,1)}return s}}class bt{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,s=Number.MAX_VALUE,i=0,n=0;const o=this.a,r=this.b,a=this.c;return Math.abs(r)>1e-5&&(e=-o/r,i=-a/r),Math.abs(t.b)>1e-5&&(s=-t.a/t.b,n=-t.c/t.b),e===Number.MAX_VALUE?s===Number.MAX_VALUE?-a/o==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=s*this.xi+n,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):s===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+i,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(o)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===s?i===n&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(n-i)/(e-s),this.yi=e*this.xi+i,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}function vt(t,e){const s=t[1][1]-t[0][1],i=t[0][0]-t[1][0],n=s*t[0][0]+i*t[0][1],o=e[1][1]-e[0][1],r=e[0][0]-e[1][0],a=o*e[0][0]+r*e[0][1],h=s*r-o*i;return h?[Math.round((r*n-i*a)/h),Math.round((s*a-o*n)/h)]:null}class wt{constructor(t,e,s,i,n,o,r,a){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=s,this.right=i,this.gap=n,this.sinAngle=o,this.tanAngle=a,Math.abs(o)<1e-4?this.pos=s+n:Math.abs(o)>.9999?this.pos=t+n:(this.deltaX=(e-t)*Math.abs(a),this.pos=s-Math.abs(this.deltaX),this.hGap=Math.abs(n/r),this.sLeft=new bt([s,e],[s,t]),this.sRight=new bt([i,e],[i,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,s=this.bottom,i=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const n=new bt([t,s],[e,i]);this.sLeft&&n.intersects(this.sLeft)&&(t=n.xi,s=n.yi),this.sRight&&n.intersects(this.sRight)&&(e=n.xi,i=n.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const o=[t,s,e,i];return this.pos+=this.hGap,o}}return null}}function xt(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}function kt(t,e){const s=[],i=new bt([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const n=new bt(e[t],e[(t+1)%e.length]);i.intersects(n)&&s.push([i.xi,i.yi])}return s}function _t(t,e,s,i,n,o,r){return[-s*o-i*n+s+o*t+n*e,r*(s*n-i*o)+i+-r*n*t+r*o*e]}function St(t,e){const s=[];if(t&&t.length){let i=t[0][0],n=t[0][0],o=t[0][1],r=t[0][1];for(let e=1;e<t.length;e++)i=Math.min(i,t[e][0]),n=Math.max(n,t[e][0]),o=Math.min(o,t[e][1]),r=Math.max(r,t[e][1]);const a=e.hachureAngle;let h=e.hachureGap;h<0&&(h=4*e.strokeWidth),h=Math.max(h,.1);const l=a%180*(Math.PI/180),c=Math.cos(l),d=Math.sin(l),u=Math.tan(l),p=new wt(o-1,r+1,i-1,n+1,h,d,c,u);let f;for(;null!=(f=p.nextLine());){const e=kt(f,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const i=e[t],n=e[t+1];s.push([i,n])}}}return s}function Mt(t,e,s,i,n,o){const r=[];let a=Math.abs(i/2),h=Math.abs(n/2);a+=t.randOffset(.05*a,o),h+=t.randOffset(.05*h,o);const l=o.hachureAngle;let c=o.hachureGap;c<=0&&(c=4*o.strokeWidth);let d=o.fillWeight;d<0&&(d=o.strokeWidth/2);const u=l%180*(Math.PI/180),p=Math.tan(u),f=h/a,g=Math.sqrt(f*p*f*p+1),m=f*p/g,y=1/g,b=c/(a*h/Math.sqrt(h*y*(h*y)+a*m*(a*m))/a);let v=Math.sqrt(a*a-(e-a+b)*(e-a+b));for(let t=e-a+b;t<e+a;t+=b){const i=_t(t,s-(v=Math.sqrt(a*a-(e-t)*(e-t))),e,s,m,y,f),n=_t(t,s+v,e,s,m,y,f);r.push([i,n])}return r}class Pt{constructor(t){this.helper=t}fillPolygon(t,e){return this._fillPolygon(t,e)}fillEllipse(t,e,s,i,n){return this._fillEllipse(t,e,s,i,n)}fillArc(t,e,s,i,n,o,r){return null}_fillPolygon(t,e,s=!1){const i=St(t,e);return{type:"fillSketch",ops:this.renderLines(i,e,s)}}_fillEllipse(t,e,s,i,n,o=!1){const r=Mt(this.helper,t,e,s,i,n);return{type:"fillSketch",ops:this.renderLines(r,n,o)}}renderLines(t,e,s){let i=[],n=null;for(const o of t)i=i.concat(this.helper.doubleLineOps(o[0][0],o[0][1],o[1][0],o[1][1],e)),s&&n&&(i=i.concat(this.helper.doubleLineOps(n[0],n[1],o[0][0],o[0][1],e))),n=o[1];return i}}class Ct extends Pt{fillPolygon(t,e){return this._fillPolygon(t,e,!0)}fillEllipse(t,e,s,i,n){return this._fillEllipse(t,e,s,i,n,!0)}}class Et extends Pt{fillPolygon(t,e){const s=this._fillPolygon(t,e),i=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),n=this._fillPolygon(t,i);return s.ops=s.ops.concat(n.ops),s}fillEllipse(t,e,s,i,n){const o=this._fillEllipse(t,e,s,i,n),r=Object.assign({},n,{hachureAngle:n.hachureAngle+90}),a=this._fillEllipse(t,e,s,i,r);return o.ops=o.ops.concat(a.ops),o}}class At{constructor(t){this.helper=t}fillPolygon(t,e){const s=St(t,e=Object.assign({},e,{curveStepCount:4,hachureAngle:0}));return this.dotsOnLines(s,e)}fillEllipse(t,e,s,i,n){n=Object.assign({},n,{curveStepCount:4,hachureAngle:0});const o=Mt(this.helper,t,e,s,i,n);return this.dotsOnLines(o,n)}fillArc(t,e,s,i,n,o,r){return null}dotsOnLines(t,e){let s=[],i=e.hachureGap;i<0&&(i=4*e.strokeWidth),i=Math.max(i,.1);let n=e.fillWeight;n<0&&(n=e.strokeWidth/2);for(const o of t){const t=xt(o)/i,r=Math.ceil(t)-1,a=Math.atan((o[1][1]-o[0][1])/(o[1][0]-o[0][0]));for(let t=0;t<r;t++){const r=i*(t+1),h=r*Math.sin(a),l=r*Math.cos(a),c=[o[0][0]-l,o[0][1]+h],d=this.helper.randOffsetWithRange(c[0]-i/4,c[0]+i/4,e),u=this.helper.randOffsetWithRange(c[1]-i/4,c[1]+i/4,e),p=this.helper.ellipse(d,u,n,n,e);s=s.concat(p.ops)}}return{type:"fillSketch",ops:s}}}class Nt{constructor(t){this.helper=t}fillPolygon(t,e){const s=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER],i=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER];t.forEach(t=>{s[0]=Math.min(s[0],t[0]),s[1]=Math.max(s[1],t[0]),i[0]=Math.min(i[0],t[1]),i[1]=Math.max(i[1],t[1])});const n=function(t){let e=0,s=0,i=0;for(let s=0;s<t.length;s++){const i=t[s],n=s===t.length-1?t[0]:t[s+1];e+=i[0]*n[1]-n[0]*i[1]}e/=2;for(let e=0;e<t.length;e++){const n=t[e],o=e===t.length-1?t[0]:t[e+1];s+=(n[0]+o[0])*(n[0]*o[1]-o[0]*n[1]),i+=(n[1]+o[1])*(n[0]*o[1]-o[0]*n[1])}return[s/(6*e),i/(6*e)]}(t),o=Math.max(Math.sqrt(Math.pow(n[0]-s[0],2)+Math.pow(n[1]-i[0],2)),Math.sqrt(Math.pow(n[0]-s[1],2)+Math.pow(n[1]-i[1],2))),r=e.hachureGap>0?e.hachureGap:4*e.strokeWidth,a=[];if(t.length>2)for(let e=0;e<t.length;e++)e===t.length-1?a.push([t[e],t[0]]):a.push([t[e],t[e+1]]);let h=[];const l=Math.max(1,Math.PI*o/r);for(let t=0;t<l;t++){const e=t*Math.PI/l,r=[n,[n[0]+o*Math.cos(e),n[1]+o*Math.sin(e)]];a.forEach(t=>{const e=vt(t,r);e&&e[0]>=s[0]&&e[0]<=s[1]&&e[1]>=i[0]&&e[1]<=i[1]&&h.push(e)})}h=this.removeDuplocatePoints(h);const c=this.createLinesFromCenter(n,h);return{type:"fillSketch",ops:this.drawLines(c,e)}}fillEllipse(t,e,s,i,n){return this.fillArcSegment(t,e,s,i,0,2*Math.PI,n)}fillArc(t,e,s,i,n,o,r){return this.fillArcSegment(t,e,s,i,n,o,r)}fillArcSegment(t,e,s,i,n,o,r){const a=[t,e],h=s/2,l=i/2,c=Math.max(s/2,i/2);let d=r.hachureGap;d<0&&(d=4*r.strokeWidth);const u=Math.max(1,Math.abs(o-n)*c/d);let p=[];for(let t=0;t<u;t++){const e=t*((o-n)/u)+n,s=c*Math.cos(e),i=c*Math.sin(e),r=Math.sqrt(h*h*i*i+l*l*s*s),d=h*l*s/r,f=h*l*i/r;p.push([a[0]+d,a[1]+f])}p=this.removeDuplocatePoints(p);const f=this.createLinesFromCenter(a,p);return{type:"fillSketch",ops:this.drawLines(f,r)}}drawLines(t,e){let s=[];return t.forEach(t=>{const i=t[0],n=t[1];s=s.concat(this.helper.doubleLineOps(i[0],i[1],n[0],n[1],e))}),s}createLinesFromCenter(t,e){return e.map(e=>[t,e])}removeDuplocatePoints(t){const e=new Set;return t.filter(t=>{const s=t.join(",");return!e.has(s)&&(e.add(s),!0)})}}class Tt{constructor(t){this.helper=t}fillPolygon(t,e){const s=St(t,e);return{type:"fillSketch",ops:this.dashedLine(s,e)}}fillEllipse(t,e,s,i,n){const o=Mt(this.helper,t,e,s,i,n);return{type:"fillSketch",ops:this.dashedLine(o,n)}}fillArc(t,e,s,i,n,o,r){return null}dashedLine(t,e){const s=e.dashOffset<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashOffset,i=e.dashGap<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashGap;let n=[];return t.forEach(t=>{const o=xt(t),r=Math.floor(o/(s+i)),a=(o+i-r*(s+i))/2;let h=t[0],l=t[1];h[0]>l[0]&&(h=t[1],l=t[0]);const c=Math.atan((l[1]-h[1])/(l[0]-h[0]));for(let t=0;t<r;t++){const o=t*(s+i),r=o+s,l=[h[0]+o*Math.cos(c)+a*Math.cos(c),h[1]+o*Math.sin(c)+a*Math.sin(c)],d=[h[0]+r*Math.cos(c)+a*Math.cos(c),h[1]+r*Math.sin(c)+a*Math.sin(c)];n=n.concat(this.helper.doubleLineOps(l[0],l[1],d[0],d[1],e))}}),n}}class Ot{constructor(t){this.helper=t}fillPolygon(t,e){const s=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,i=e.zigzagOffset<0?s:e.zigzagOffset,n=St(t,e=Object.assign({},e,{hachureGap:s+i}));return{type:"fillSketch",ops:this.zigzagLines(n,i,e)}}fillEllipse(t,e,s,i,n){const o=n.hachureGap<0?4*n.strokeWidth:n.hachureGap,r=n.zigzagOffset<0?o:n.zigzagOffset;n=Object.assign({},n,{hachureGap:o+r});const a=Mt(this.helper,t,e,s,i,n);return{type:"fillSketch",ops:this.zigzagLines(a,r,n)}}fillArc(t,e,s,i,n,o,r){return null}zigzagLines(t,e,s){let i=[];return t.forEach(t=>{const n=xt(t),o=Math.round(n/(2*e));let r=t[0],a=t[1];r[0]>a[0]&&(r=t[1],a=t[0]);const h=Math.atan((a[1]-r[1])/(a[0]-r[0]));for(let t=0;t<o;t++){const n=2*t*e,o=2*(t+1)*e,a=Math.sqrt(2*Math.pow(e,2)),l=[r[0]+n*Math.cos(h),r[1]+n*Math.sin(h)],c=[r[0]+o*Math.cos(h),r[1]+o*Math.sin(h)],d=[l[0]+a*Math.cos(h+Math.PI/4),l[1]+a*Math.sin(h+Math.PI/4)];i=(i=i.concat(this.helper.doubleLineOps(l[0],l[1],d[0],d[1],s))).concat(this.helper.doubleLineOps(d[0],d[1],c[0],c[1],s))}}),i}}const Rt={};function Lt(t,e){let s=t.fillStyle||"hachure";if(!Rt[s])switch(s){case"zigzag":Rt[s]||(Rt[s]=new Ct(e));break;case"cross-hatch":Rt[s]||(Rt[s]=new Et(e));break;case"dots":Rt[s]||(Rt[s]=new At(e));break;case"starburst":Rt[s]||(Rt[s]=new Nt(e));break;case"dashed":Rt[s]||(Rt[s]=new Tt(e));break;case"zigzag-line":Rt[s]||(Rt[s]=new Ot(e));break;case"hachure":default:Rt[s="hachure"]||(Rt[s]=new Pt(e))}return Rt[s]}const It={randOffset:function(t,e){return Gt(t,e)},randOffsetWithRange:function(t,e,s){return qt(t,e,s)},ellipse:jt,doubleLineOps:function(t,e,s,i,n){return Xt(t,e,s,i,n)}};function zt(t,e,s,i,n){return{type:"path",ops:Xt(t,e,s,i,n)}}function $t(t,e,s){const i=(t||[]).length;if(i>2){let n=[];for(let e=0;e<i-1;e++)n=n.concat(Xt(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&(n=n.concat(Xt(t[i-1][0],t[i-1][1],t[0][0],t[0][1],s))),{type:"path",ops:n}}return 2===i?zt(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function Dt(t,e,s,i,n){return function(t,e){return $t(t,!0,e)}([[t,e],[t+s,e],[t+s,e+i],[t,e+i]],n)}function Vt(t,e){const s=Ht(t,1*(1+.2*e.roughness),e),i=Ht(t,1.5*(1+.22*e.roughness),e);return{type:"path",ops:s.concat(i)}}function jt(t,e,s,i,n){const o=2*Math.PI/n.curveStepCount;let r=Math.abs(s/2),a=Math.abs(i/2);const h=Jt(o,t,e,r+=Gt(.05*r,n),a+=Gt(.05*a,n),1,o*qt(.1,qt(.4,1,n),n),n),l=Jt(o,t,e,r,a,1.5,0,n);return{type:"path",ops:h.concat(l)}}function Bt(t,e,s,i,n,o,r,a,h){const l=t,c=e;let d=Math.abs(s/2),u=Math.abs(i/2);d+=Gt(.01*d,h),u+=Gt(.01*u,h);let p=n,f=o;for(;p<0;)p+=2*Math.PI,f+=2*Math.PI;f-p>2*Math.PI&&(p=0,f=2*Math.PI);const g=2*Math.PI/h.curveStepCount,m=Math.min(g/2,(f-p)/2),y=Qt(m,l,c,d,u,p,f,1,h),b=Qt(m,l,c,d,u,p,f,1.5,h);let v=y.concat(b);return r&&(a?v=(v=v.concat(Xt(l,c,l+d*Math.cos(p),c+u*Math.sin(p),h))).concat(Xt(l,c,l+d*Math.cos(f),c+u*Math.sin(f),h)):(v.push({op:"lineTo",data:[l,c]}),v.push({op:"lineTo",data:[l+d*Math.cos(p),c+u*Math.sin(p)]}))),{type:"path",ops:v}}function Wt(t,e){const s=[];if(t.length){const i=e.maxRandomnessOffset||0,n=t.length;if(n>2){s.push({op:"move",data:[t[0][0]+Gt(i,e),t[0][1]+Gt(i,e)]});for(let o=1;o<n;o++)s.push({op:"lineTo",data:[t[o][0]+Gt(i,e),t[o][1]+Gt(i,e)]})}}return{type:"fillPath",ops:s}}function Ut(t,e){return Lt(e,It).fillPolygon(t,e)}function qt(t,e,s){return s.roughness*(Math.random()*(e-t)+t)}function Gt(t,e){return qt(-t,t,e)}function Xt(t,e,s,i,n){const o=Ft(t,e,s,i,n,!0,!1),r=Ft(t,e,s,i,n,!0,!0);return o.concat(r)}function Ft(t,e,s,i,n,o,r){const a=Math.pow(t-s,2)+Math.pow(e-i,2);let h=n.maxRandomnessOffset||0;h*h*100>a&&(h=Math.sqrt(a)/10);const l=h/2,c=.2+.2*Math.random();let d=n.bowing*n.maxRandomnessOffset*(i-e)/200,u=n.bowing*n.maxRandomnessOffset*(t-s)/200;d=Gt(d,n),u=Gt(u,n);const p=[],f=()=>Gt(l,n),g=()=>Gt(h,n);return o&&(r?p.push({op:"move",data:[t+f(),e+f()]}):p.push({op:"move",data:[t+Gt(h,n),e+Gt(h,n)]})),r?p.push({op:"bcurveTo",data:[d+t+(s-t)*c+f(),u+e+(i-e)*c+f(),d+t+2*(s-t)*c+f(),u+e+2*(i-e)*c+f(),s+f(),i+f()]}):p.push({op:"bcurveTo",data:[d+t+(s-t)*c+g(),u+e+(i-e)*c+g(),d+t+2*(s-t)*c+g(),u+e+2*(i-e)*c+g(),s+g(),i+g()]}),p}function Ht(t,e,s){const i=[];i.push([t[0][0]+Gt(e,s),t[0][1]+Gt(e,s)]),i.push([t[0][0]+Gt(e,s),t[0][1]+Gt(e,s)]);for(let n=1;n<t.length;n++)i.push([t[n][0]+Gt(e,s),t[n][1]+Gt(e,s)]),n===t.length-1&&i.push([t[n][0]+Gt(e,s),t[n][1]+Gt(e,s)]);return Yt(i,null,s)}function Yt(t,e,s){const i=t.length;let n=[];if(i>3){const o=[],r=1-s.curveTightness;n.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];o[0]=[s[0],s[1]],o[1]=[s[0]+(r*t[e+1][0]-r*t[e-1][0])/6,s[1]+(r*t[e+1][1]-r*t[e-1][1])/6],o[2]=[t[e+1][0]+(r*t[e][0]-r*t[e+2][0])/6,t[e+1][1]+(r*t[e][1]-r*t[e+2][1])/6],o[3]=[t[e+1][0],t[e+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;n.push({op:"lineTo",data:[e[0]+Gt(t,s),e[1]+Gt(t,s)]})}}else 3===i?(n.push({op:"move",data:[t[1][0],t[1][1]]}),n.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&(n=n.concat(Xt(t[0][0],t[0][1],t[1][0],t[1][1],s)));return n}function Jt(t,e,s,i,n,o,r,a){const h=Gt(.5,a)-Math.PI/2,l=[];l.push([Gt(o,a)+e+.9*i*Math.cos(h-t),Gt(o,a)+s+.9*n*Math.sin(h-t)]);for(let r=h;r<2*Math.PI+h-.01;r+=t)l.push([Gt(o,a)+e+i*Math.cos(r),Gt(o,a)+s+n*Math.sin(r)]);return l.push([Gt(o,a)+e+i*Math.cos(h+2*Math.PI+.5*r),Gt(o,a)+s+n*Math.sin(h+2*Math.PI+.5*r)]),l.push([Gt(o,a)+e+.98*i*Math.cos(h+r),Gt(o,a)+s+.98*n*Math.sin(h+r)]),l.push([Gt(o,a)+e+.9*i*Math.cos(h+.5*r),Gt(o,a)+s+.9*n*Math.sin(h+.5*r)]),Yt(l,null,a)}function Qt(t,e,s,i,n,o,r,a,h){const l=o+Gt(.1,h),c=[];c.push([Gt(a,h)+e+.9*i*Math.cos(l-t),Gt(a,h)+s+.9*n*Math.sin(l-t)]);for(let o=l;o<=r;o+=t)c.push([Gt(a,h)+e+i*Math.cos(o),Gt(a,h)+s+n*Math.sin(o)]);return c.push([e+i*Math.cos(r),s+n*Math.sin(r)]),c.push([e+i*Math.cos(r),s+n*Math.sin(r)]),Yt(c,null,h)}function Zt(t,e,s,i,n,o,r,a){const h=[],l=[a.maxRandomnessOffset||1,(a.maxRandomnessOffset||1)+.5];let c=[0,0];for(let d=0;d<2;d++)0===d?h.push({op:"move",data:[r.x,r.y]}):h.push({op:"move",data:[r.x+Gt(l[0],a),r.y+Gt(l[0],a)]}),c=[n+Gt(l[d],a),o+Gt(l[d],a)],h.push({op:"bcurveTo",data:[t+Gt(l[d],a),e+Gt(l[d],a),s+Gt(l[d],a),i+Gt(l[d],a),c[0],c[1]]});return r.setPosition(c[0],c[1]),h}function Kt(t,e,s,i){let n=[];switch(e.key){case"M":case"m":{const s="m"===e.key;if(e.data.length>=2){let o=+e.data[0],r=+e.data[1];s&&(o+=t.x,r+=t.y);const a=1*(i.maxRandomnessOffset||0);o+=Gt(a,i),r+=Gt(a,i),t.setPosition(o,r),n.push({op:"move",data:[o,r]})}break}case"L":case"l":{const s="l"===e.key;if(e.data.length>=2){let o=+e.data[0],r=+e.data[1];s&&(o+=t.x,r+=t.y),n=n.concat(Xt(t.x,t.y,o,r,i)),t.setPosition(o,r)}break}case"H":case"h":{const s="h"===e.key;if(e.data.length){let o=+e.data[0];s&&(o+=t.x),n=n.concat(Xt(t.x,t.y,o,t.y,i)),t.setPosition(o,t.y)}break}case"V":case"v":{const s="v"===e.key;if(e.data.length){let o=+e.data[0];s&&(o+=t.y),n=n.concat(Xt(t.x,t.y,t.x,o,i)),t.setPosition(t.x,o)}break}case"Z":case"z":t.first&&(n=n.concat(Xt(t.x,t.y,t.first[0],t.first[1],i)),t.setPosition(t.first[0],t.first[1]),t.first=null);break;case"C":case"c":{const s="c"===e.key;if(e.data.length>=6){let o=+e.data[0],r=+e.data[1],a=+e.data[2],h=+e.data[3],l=+e.data[4],c=+e.data[5];s&&(o+=t.x,a+=t.x,l+=t.x,r+=t.y,h+=t.y,c+=t.y);const d=Zt(o,r,a,h,l,c,t,i);n=n.concat(d),t.bezierReflectionPoint=[l+(l-a),c+(c-h)]}break}case"S":case"s":{const o="s"===e.key;if(e.data.length>=4){let r=+e.data[0],a=+e.data[1],h=+e.data[2],l=+e.data[3];o&&(r+=t.x,h+=t.x,a+=t.y,l+=t.y);let c=r,d=a;const u=s?s.key:"";let p=null;"c"!==u&&"C"!==u&&"s"!==u&&"S"!==u||(p=t.bezierReflectionPoint),p&&(c=p[0],d=p[1]);const f=Zt(c,d,r,a,h,l,t,i);n=n.concat(f),t.bezierReflectionPoint=[h+(h-r),l+(l-a)]}break}case"Q":case"q":{const s="q"===e.key;if(e.data.length>=4){let o=+e.data[0],r=+e.data[1],a=+e.data[2],h=+e.data[3];s&&(o+=t.x,a+=t.x,r+=t.y,h+=t.y);const l=1*(1+.2*i.roughness),c=1.5*(1+.22*i.roughness);n.push({op:"move",data:[t.x+Gt(l,i),t.y+Gt(l,i)]});let d=[a+Gt(l,i),h+Gt(l,i)];n.push({op:"qcurveTo",data:[o+Gt(l,i),r+Gt(l,i),d[0],d[1]]}),n.push({op:"move",data:[t.x+Gt(c,i),t.y+Gt(c,i)]}),d=[a+Gt(c,i),h+Gt(c,i)],n.push({op:"qcurveTo",data:[o+Gt(c,i),r+Gt(c,i),d[0],d[1]]}),t.setPosition(d[0],d[1]),t.quadReflectionPoint=[a+(a-o),h+(h-r)]}break}case"T":case"t":{const o="t"===e.key;if(e.data.length>=2){let r=+e.data[0],a=+e.data[1];o&&(r+=t.x,a+=t.y);let h=r,l=a;const c=s?s.key:"";let d=null;"q"!==c&&"Q"!==c&&"t"!==c&&"T"!==c||(d=t.quadReflectionPoint),d&&(h=d[0],l=d[1]);const u=1*(1+.2*i.roughness),p=1.5*(1+.22*i.roughness);n.push({op:"move",data:[t.x+Gt(u,i),t.y+Gt(u,i)]});let f=[r+Gt(u,i),a+Gt(u,i)];n.push({op:"qcurveTo",data:[h+Gt(u,i),l+Gt(u,i),f[0],f[1]]}),n.push({op:"move",data:[t.x+Gt(p,i),t.y+Gt(p,i)]}),f=[r+Gt(p,i),a+Gt(p,i)],n.push({op:"qcurveTo",data:[h+Gt(p,i),l+Gt(p,i),f[0],f[1]]}),t.setPosition(f[0],f[1]),t.quadReflectionPoint=[r+(r-h),a+(a-l)]}break}case"A":case"a":{const s="a"===e.key;if(e.data.length>=7){const o=+e.data[0],r=+e.data[1],a=+e.data[2],h=+e.data[3],l=+e.data[4];let c=+e.data[5],d=+e.data[6];if(s&&(c+=t.x,d+=t.y),c===t.x&&d===t.y)break;if(0===o||0===r)n=n.concat(Xt(t.x,t.y,c,d,i)),t.setPosition(c,d);else for(let e=0;e<1;e++){const e=new mt([t.x,t.y],[c,d],[o,r],a,!!h,!!l);let s=e.getNextSegment();for(;s;){const o=Zt(s.cp1[0],s.cp1[1],s.cp2[0],s.cp2[1],s.to[0],s.to[1],t,i);n=n.concat(o),s=e.getNextSegment()}}}break}}return n}class te extends dt{line(t,e,s,i,n){const o=this._options(n);return this._drawable("line",[zt(t,e,s,i,o)],o)}rectangle(t,e,s,i,n){const o=this._options(n),r=[];if(o.fill){const n=[[t,e],[t+s,e],[t+s,e+i],[t,e+i]];"solid"===o.fillStyle?r.push(Wt(n,o)):r.push(Ut(n,o))}return r.push(Dt(t,e,s,i,o)),this._drawable("rectangle",r,o)}ellipse(t,e,s,i,n){const o=this._options(n),r=[];if(o.fill)if("solid"===o.fillStyle){const n=jt(t,e,s,i,o);n.type="fillPath",r.push(n)}else r.push(function(t,e,s,i,n){return Lt(n,It).fillEllipse(t,e,s,i,n)}(t,e,s,i,o));return r.push(jt(t,e,s,i,o)),this._drawable("ellipse",r,o)}circle(t,e,s,i){const n=this.ellipse(t,e,s,s,i);return n.shape="circle",n}linearPath(t,e){const s=this._options(e);return this._drawable("linearPath",[$t(t,!1,s)],s)}arc(t,e,s,i,n,o,r=!1,a){const h=this._options(a),l=[];if(r&&h.fill)if("solid"===h.fillStyle){const r=Bt(t,e,s,i,n,o,!0,!1,h);r.type="fillPath",l.push(r)}else l.push(function(t,e,s,i,n,o,r){const a=Lt(r,It).fillArc(t,e,s,i,n,o,r);if(a)return a;const h=t,l=e;let c=Math.abs(s/2),d=Math.abs(i/2);c+=Gt(.01*c,r),d+=Gt(.01*d,r);let u=n,p=o;for(;u<0;)u+=2*Math.PI,p+=2*Math.PI;p-u>2*Math.PI&&(u=0,p=2*Math.PI);const f=(p-u)/r.curveStepCount,g=[];for(let t=u;t<=p;t+=f)g.push([h+c*Math.cos(t),l+d*Math.sin(t)]);return g.push([h+c*Math.cos(p),l+d*Math.sin(p)]),g.push([h,l]),Ut(g,r)}(t,e,s,i,n,o,h));return l.push(Bt(t,e,s,i,n,o,r,!0,h)),this._drawable("arc",l,h)}curve(t,e){const s=this._options(e);return this._drawable("curve",[Vt(t,s)],s)}polygon(t,e){const s=this._options(e),i=[];if(s.fill)if("solid"===s.fillStyle)i.push(Wt(t,s));else{const e=this.computePolygonSize(t),n=Ut([[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],s);n.type="path2Dpattern",n.size=e,n.path=this.polygonPath(t),i.push(n)}return i.push($t(t,!0,s)),this._drawable("polygon",i,s)}path(t,e){const s=this._options(e),i=[];if(!t)return this._drawable("path",i,s);if(s.fill)if("solid"===s.fillStyle){const e={type:"path2Dfill",path:t,ops:[]};i.push(e)}else{const e=this.computePathSize(t),n=Ut([[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],s);n.type="path2Dpattern",n.size=e,n.path=t,i.push(n)}return i.push(function(t,e){t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");let s=new gt(t);if(e.simplification){const t=new yt(s.linearPoints,s.closed).fit(e.simplification);s=new gt(t)}let i=[];const n=s.segments||[];for(let t=0;t<n.length;t++){const o=Kt(s,n[t],t>0?n[t-1]:null,e);o&&o.length&&(i=i.concat(o))}return{type:"path",ops:i}}(t,s)),this._drawable("path",i,s)}}const ee="undefined"!=typeof document;class se{constructor(t){this.canvas=t,this.ctx=this.canvas.getContext("2d")}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.ctx;for(const t of e)switch(t.type){case"path":i.save(),i.strokeStyle=s.stroke,i.lineWidth=s.strokeWidth,this._drawToContext(i,t),i.restore();break;case"fillPath":i.save(),i.fillStyle=s.fill||"",this._drawToContext(i,t),i.restore();break;case"fillSketch":this.fillSketch(i,t,s);break;case"path2Dfill":{this.ctx.save(),this.ctx.fillStyle=s.fill||"";const e=new Path2D(t.path);this.ctx.fill(e),this.ctx.restore();break}case"path2Dpattern":{const e=this.canvas.ownerDocument||ee&&document;if(e){const i=t.size,n=e.createElement("canvas"),o=n.getContext("2d"),r=this.computeBBox(t.path);r&&(r.width||r.height)?(n.width=this.canvas.width,n.height=this.canvas.height,o.translate(r.x||0,r.y||0)):(n.width=i[0],n.height=i[1]),this.fillSketch(o,t,s),this.ctx.save(),this.ctx.fillStyle=this.ctx.createPattern(n,"repeat");const a=new Path2D(t.path);this.ctx.fill(a),this.ctx.restore()}else console.error("Cannot render path2Dpattern. No defs/document defined.");break}}}computeBBox(t){if(ee)try{const e="http://www.w3.org/2000/svg",s=document.createElementNS(e,"svg");s.setAttribute("width","0"),s.setAttribute("height","0");const i=self.document.createElementNS(e,"path");i.setAttribute("d",t),s.appendChild(i),document.body.appendChild(s);const n=i.getBBox();return document.body.removeChild(s),n}catch(t){}return null}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2),t.save(),t.strokeStyle=s.fill||"",t.lineWidth=i,this._drawToContext(t,e),t.restore()}_drawToContext(t,e){t.beginPath();for(const s of e.ops){const e=s.data;switch(s.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"qcurveTo":t.quadraticCurveTo(e[0],e[1],e[2],e[3]);break;case"lineTo":t.lineTo(e[0],e[1])}}"fillPath"===e.type?t.fill():t.stroke()}}class ie extends se{constructor(t,e){super(t),this.gen=new te(e||null,this.canvas)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,s,i,n){const o=this.gen.line(t,e,s,i,n);return this.draw(o),o}rectangle(t,e,s,i,n){const o=this.gen.rectangle(t,e,s,i,n);return this.draw(o),o}ellipse(t,e,s,i,n){const o=this.gen.ellipse(t,e,s,i,n);return this.draw(o),o}circle(t,e,s,i){const n=this.gen.circle(t,e,s,i);return this.draw(n),n}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s),s}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s),s}arc(t,e,s,i,n,o,r=!1,a){const h=this.gen.arc(t,e,s,i,n,o,r,a);return this.draw(h),h}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s),s}path(t,e){const s=this.gen.path(t,e);return this.draw(s),s}}const ne="undefined"!=typeof document;class oe{constructor(t){this.svg=t}get defs(){const t=this.svg.ownerDocument||ne&&document;if(t&&!this._defs){const e=t.createElementNS("http://www.w3.org/2000/svg","defs");this.svg.firstChild?this.svg.insertBefore(e,this.svg.firstChild):this.svg.appendChild(e),this._defs=e}return this._defs||null}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.svg.ownerDocument||window.document,n=i.createElementNS("http://www.w3.org/2000/svg","g");for(const t of e){let e=null;switch(t.type){case"path":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke=s.stroke,e.style.strokeWidth=s.strokeWidth+"",e.style.fill="none";break;case"fillPath":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"fillSketch":e=this.fillSketch(i,t,s);break;case"path2Dfill":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"path2Dpattern":if(this.defs){const n=t.size,o=i.createElementNS("http://www.w3.org/2000/svg","pattern"),r=`rough-${Math.floor(Math.random()*(Number.MAX_SAFE_INTEGER||999999))}`;o.setAttribute("id",r),o.setAttribute("x","0"),o.setAttribute("y","0"),o.setAttribute("width","1"),o.setAttribute("height","1"),o.setAttribute("height","1"),o.setAttribute("viewBox",`0 0 ${Math.round(n[0])} ${Math.round(n[1])}`),o.setAttribute("patternUnits","objectBoundingBox");const a=this.fillSketch(i,t,s);o.appendChild(a),this.defs.appendChild(o),(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=`url(#${r})`}else console.error("Cannot render path2Dpattern. No defs/document defined.")}e&&n.appendChild(e)}return n}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2);const n=t.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",this.opsToPath(e)),n.style.stroke=s.fill||null,n.style.strokeWidth=i+"",n.style.fill="none",n}}class re extends oe{constructor(t,e){super(t),this.gen=new te(e||null,this.svg)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t){return this.gen.opsToPath(t)}line(t,e,s,i,n){const o=this.gen.line(t,e,s,i,n);return this.draw(o)}rectangle(t,e,s,i,n){const o=this.gen.rectangle(t,e,s,i,n);return this.draw(o)}ellipse(t,e,s,i,n){const o=this.gen.ellipse(t,e,s,i,n);return this.draw(o)}circle(t,e,s,i){const n=this.gen.circle(t,e,s,i);return this.draw(n)}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s)}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s)}arc(t,e,s,i,n,o,r=!1,a){const h=this.gen.arc(t,e,s,i,n,o,r,a);return this.draw(h)}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s)}path(t,e){const s=this.gen.path(t,e);return this.draw(s)}}var ae={canvas:(t,e)=>new ie(t,e),svg:(t,e)=>new re(t,e),generator:(t,e)=>new te(t,e)};class he extends lt{fireEvent(t,e,s=!0,i=!0){if(t){const n={bubbles:"boolean"!=typeof s||s,composed:"boolean"!=typeof i||i};e&&(n.detail=e);const o=window.SlickCustomEvent||CustomEvent;this.dispatchEvent(new o(t,n))}}}const le=2,ce=1,de=.85,ue=0,pe=9;class fe{constructor(){this.p=""}get value(){return this.p.trim()}moveTo(t,e){this.p=`${this.p}M ${t} ${e} `}bcurveTo(t,e,s,i,n,o){this.p=`${this.p}C ${t} ${e}, ${s} ${i}, ${n} ${o} `}}function ge(t,e){const s=document.createElementNS("http://www.w3.org/2000/svg",t);if(e)for(const t in e)s.setAttributeNS(null,t,e[t]);return s}function me(t,e){return ce*(Math.random()*(e-t)+t)}function ye(t,e,s,i,n){const o=Math.pow(t-s,2)+Math.pow(e-i,2);let r=le;r*r*100>o&&(r=Math.sqrt(o)/10);const a=r/2,h=.2+.2*Math.random();let l=de*le*(i-e)/200,c=de*le*(t-s)/200;l=me(-l,l),c=me(-c,c);const d=n||new fe;return d.moveTo(t+me(-r,r),e+me(-r,r)),d.bcurveTo(l+t+(s-t)*h+me(-r,r),c+e+(i-e)*h+me(-r,r),l+t+2*(s-t)*h+me(-r,r),c+e+2*(i-e)*h+me(-r,r),s+me(-r,r),i+me(-r,r)),d.moveTo(t+me(-a,a),e+me(-a,a)),d.bcurveTo(l+t+(s-t)*h+me(-a,a),c+e+(i-e)*h+me(-a,a),l+t+2*(s-t)*h+me(-a,a),c+e+2*(i-e)*h+me(-a,a),s+me(-a,a),i+me(-a,a)),d}function be(t,e,s,i,n=!1,o=!1,r){r=r||new fe;const a=Math.pow(t-s,2)+Math.pow(e-i,2);let h=le;h*h*100>a&&(h=Math.sqrt(a)/10);const l=h/2,c=.2+.2*Math.random();let d=de*le*(i-e)/200,u=de*le*(t-s)/200;return d=me(-d,d),u=me(-u,u),n&&r.moveTo(t+me(-h,h),e+me(-h,h)),o?r.bcurveTo(d+t+(s-t)*c+me(-l,l),u+e+(i-e)*c+me(-l,l),d+t+2*(s-t)*c+me(-l,l),u+e+2*(i-e)*c+me(-l,l),s+me(-l,l),i+me(-l,l)):r.bcurveTo(d+t+(s-t)*c+me(-h,h),u+e+(i-e)*c+me(-h,h),d+t+2*(s-t)*c+me(-h,h),u+e+2*(i-e)*c+me(-h,h),s+me(-h,h),i+me(-h,h)),r}function ve(t,e,s,i,n,o,r,a){const h=me(-.5,.5)-Math.PI/2,l=[];l.push([me(-o,o)+e+.9*i*Math.cos(h-t),me(-o,o)+s+.9*n*Math.sin(h-t)]);for(let r=h;r<2*Math.PI+h-.01;r+=t)l.push([me(-o,o)+e+i*Math.cos(r),me(-o,o)+s+n*Math.sin(r)]);return l.push([me(-o,o)+e+i*Math.cos(h+2*Math.PI+.5*r),me(-o,o)+s+n*Math.sin(h+2*Math.PI+.5*r)]),l.push([me(-o,o)+e+.98*i*Math.cos(h+r),me(-o,o)+s+.98*n*Math.sin(h+r)]),l.push([me(-o,o)+e+.9*i*Math.cos(h+.5*r),me(-o,o)+s+.9*n*Math.sin(h+.5*r)]),function(t,e){const s=t.length;let i=e||new fe;if(s>3){const e=[],n=1-ue;i.moveTo(t[1][0],t[1][1]);for(let o=1;o+2<s;o++){const s=t[o];e[0]=[s[0],s[1]],e[1]=[s[0]+(n*t[o+1][0]-n*t[o-1][0])/6,s[1]+(n*t[o+1][1]-n*t[o-1][1])/6],e[2]=[t[o+1][0]+(n*t[o][0]-n*t[o+2][0])/6,t[o+1][1]+(n*t[o][1]-n*t[o+2][1])/6],e[3]=[t[o+1][0],t[o+1][1]],i.bcurveTo(e[1][0],e[1][1],e[2][0],e[2][1],e[3][0],e[3][1])}}else 3===s?(i.moveTo(t[0][0],t[0][1]),i.bcurveTo(t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1])):2===s&&(i=ye(t[0][0],t[0][1],t[1][0],t[1][1],i));return i}(l,a)}function we(t,e,s,i,n){const o=ge("path",{d:ye(e,s,i,n).value});return t.appendChild(o),o}function xe(t,e,s,i,n){n-=4;let o=ye(e+=2,s+=2,e+(i-=4),s);o=ye(e+i,s,e+i,s+n,o),o=ye(e+i,s+n,e,s+n,o);const r=ge("path",{d:(o=ye(e,s+n,e,s,o)).value});return t.appendChild(r),r}function ke(t,e,s,i,n){i=Math.max(i>10?i-4:i-1,1),n=Math.max(n>10?n-4:n-1,1);const o=2*Math.PI/pe;let r=Math.abs(i/2),a=Math.abs(n/2),h=ve(o,e,s,r+=me(.05*-r,.05*r),a+=me(.05*-a,.05*a),1,o*me(.1,me(.4,1)));const l=ge("path",{d:(h=ve(o,e,s,r,a,1.5,0,h)).value});return t.appendChild(l),l}const _e={bowing:de,curveStepCount:pe,curveTightness:ue,dashGap:0,dashOffset:0,fill:"#000",fillStyle:"hachure",fillWeight:1,hachureAngle:-41,hachureGap:5,maxRandomnessOffset:le,roughness:ce,simplification:1,stroke:"#000",strokeWidth:2,zigzagOffset:0};function Se(t){return function(t){const e=ge("g");let s=null;return t.forEach(t=>{we(e,t[0][0],t[0][1],t[1][0],t[1][1]),s&&we(e,s[0],s[1],t[0][0],t[0][1]),s=t[1]}),e}(St(t,_e))}window.JSCompiler_renameProperty=function(t,e){return t};let Me=0,Pe=0,Ce=[],Ee=0,Ae=document.createTextNode("");new window.MutationObserver(function(){const t=Ce.length;for(let e=0;e<t;e++){let t=Ce[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}Ce.splice(0,t),Pe+=t}).observe(Ae,{characterData:!0});const Ne={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},Te={run:t=>(Ae.textContent=Ee++,Ce.push(t),Me++),cancel(t){const e=t-Pe;if(e>=0){if(!Ce[e])throw new Error("invalid async handle: "+t);Ce[e]=null}}};class Oe{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,Re.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),Re.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,s){return t instanceof Oe?t._cancelAsync():t=new Oe,t.setConfig(e,s),t}}let Re=new Set;window.ShadyDOM,Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;(Le=document.baseURI||window.location.href).substring(0,Le.lastIndexOf("/")+1);var Le;window.Polymer&&window.Polymer.sanitizeDOMValue;let Ie=!1;const ze=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:t=>t;let $e="string"==typeof document.head.style.touchAction,De="__polymerGestures",Ve="__polymerGesturesHandled",je="__polymerGesturesTouchAction",Be=25,We=5,Ue=2500,qe=["mousedown","mousemove","mouseup","click"],Ge=[0,1,4,2],Xe=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function Fe(t){return qe.indexOf(t)>-1}let He=!1;function Ye(t){if(!Fe(t)&&"touchend"!==t)return $e&&He&&Ie?{passive:!0}:void 0}!function(){try{let t=Object.defineProperty({},"passive",{get(){He=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let Je=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const Qe=[],Ze={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},Ke={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function ts(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let s=t.getRootNode();if(t.id){let i=s.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<i.length;t++)e.push(i[t])}}return e}let es=function(t){let e=t.sourceCapabilities;var s;if((!e||e.firesTouchEvents)&&(t[Ve]={skip:!0},"click"===t.type)){let e=!1,i=as(t);for(let t=0;t<i.length;t++){if(i[t].nodeType===Node.ELEMENT_NODE)if("label"===i[t].localName)Qe.push(i[t]);else if(s=i[t],Ze[s.localName]){let s=ts(i[t]);for(let t=0;t<s.length;t++)e=e||Qe.indexOf(s[t])>-1}if(i[t]===ns.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function ss(t){let e=Je?["click"]:qe;for(let s,i=0;i<e.length;i++)s=e[i],t?(Qe.length=0,document.addEventListener(s,es,!0)):document.removeEventListener(s,es,!0)}function is(t){let e=t.type;if(!Fe(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!Xe&&(e=Ge[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let ns={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function os(t,e,s){t.movefn=e,t.upfn=s,document.addEventListener("mousemove",e),document.addEventListener("mouseup",s)}function rs(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",function(t){ns.mouse.mouseIgnoreJob||ss(!0),ns.mouse.target=as(t)[0],ns.mouse.mouseIgnoreJob=Oe.debounce(ns.mouse.mouseIgnoreJob,Ne.after(Ue),function(){ss(),ns.mouse.target=null,ns.mouse.mouseIgnoreJob=null})},!!He&&{passive:!0});const as=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:t=>t.composedPath&&t.composedPath()||[],hs={},ls=[];function cs(t){const e=as(t);return e.length>0?e[0]:t.target}function ds(t){let e,s=t.type,i=t.currentTarget[De];if(!i)return;let n=i[s];if(n){if(!t[Ve]&&(t[Ve]={},"touch"===s.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===s&&1===t.touches.length&&(ns.touch.id=e.identifier),ns.touch.id!==e.identifier)return;$e||"touchstart"!==s&&"touchmove"!==s||function(t){let e=t.changedTouches[0],s=t.type;if("touchstart"===s)ns.touch.x=e.clientX,ns.touch.y=e.clientY,ns.touch.scrollDecided=!1;else if("touchmove"===s){if(ns.touch.scrollDecided)return;ns.touch.scrollDecided=!0;let s=function(t){let e="auto",s=as(t);for(let t,i=0;i<s.length;i++)if((t=s[i])[je]){e=t[je];break}return e}(t),i=!1,n=Math.abs(ns.touch.x-e.clientX),o=Math.abs(ns.touch.y-e.clientY);t.cancelable&&("none"===s?i=!0:"pan-x"===s?i=o>n:"pan-y"===s&&(i=n>o)),i?t.preventDefault():gs("track")}}(t)}if(!(e=t[Ve]).skip){for(let s,i=0;i<ls.length;i++)n[(s=ls[i]).name]&&!e[s.name]&&s.flow&&s.flow.start.indexOf(t.type)>-1&&s.reset&&s.reset();for(let i,o=0;o<ls.length;o++)n[(i=ls[o]).name]&&!e[i.name]&&(e[i.name]=!0,i[s](t))}}}function us(t,e,s){return!!hs[e]&&(function(t,e,s){let i=hs[e],n=i.deps,o=i.name,r=t[De];r||(t[De]=r={});for(let e,s,i=0;i<n.length;i++)e=n[i],Je&&Fe(e)&&"click"!==e||((s=r[e])||(r[e]=s={_count:0}),0===s._count&&t.addEventListener(e,ds,Ye(e)),s[o]=(s[o]||0)+1,s._count=(s._count||0)+1);t.addEventListener(e,s),i.touchAction&&function(t,e){$e&&t instanceof HTMLElement&&Te.run(()=>{t.style.touchAction=e});t[je]=e}(t,i.touchAction)}(t,e,s),!0)}function ps(t){ls.push(t);for(let e=0;e<t.emits.length;e++)hs[t.emits[e]]=t}function fs(t,e,s){let i=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=s,ze(t).dispatchEvent(i),i.defaultPrevented){let t=s.preventer||s.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function gs(t){let e=function(t){for(let e,s=0;s<ls.length;s++){e=ls[s];for(let s,i=0;i<e.emits.length;i++)if((s=e.emits[i])===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function ms(t,e,s,i){e&&fs(e,t,{x:s.clientX,y:s.clientY,sourceEvent:s,preventer:i,prevent:function(t){return gs(t)}})}function ys(t,e,s){if(t.prevent)return!1;if(t.started)return!0;let i=Math.abs(t.x-e),n=Math.abs(t.y-s);return i>=We||n>=We}function bs(t,e,s){if(!e)return;let i,n=t.moves[t.moves.length-2],o=t.moves[t.moves.length-1],r=o.x-t.x,a=o.y-t.y,h=0;n&&(i=o.x-n.x,h=o.y-n.y),fs(e,"track",{state:t.state,x:s.clientX,y:s.clientY,dx:r,dy:a,ddx:i,ddy:h,sourceEvent:s,hover:function(){return function(t,e){let s=document.elementFromPoint(t,e),i=s;for(;i&&i.shadowRoot&&!window.ShadyDOM&&i!==(i=i.shadowRoot.elementFromPoint(t,e));)i&&(s=i);return s}(s.clientX,s.clientY)}})}function vs(t,e,s){let i=Math.abs(e.clientX-t.x),n=Math.abs(e.clientY-t.y),o=cs(s||e);!o||Ke[o.localName]&&o.hasAttribute("disabled")||(isNaN(i)||isNaN(n)||i<=Be&&n<=Be||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=cs(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let s=e.getBoundingClientRect(),i=t.pageX,n=t.pageY;return!(i>=s.left&&i<=s.right&&n>=s.top&&n<=s.bottom)}return!1}(e))&&(t.prevent||fs(o,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:s}))}ps({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){rs(this.info)},mousedown:function(t){if(!is(t))return;let e=cs(t),s=this;os(this.info,function(t){is(t)||(ms("up",e,t),rs(s.info))},function(t){is(t)&&ms("up",e,t),rs(s.info)}),ms("down",e,t)},touchstart:function(t){ms("down",cs(t),t.changedTouches[0],t)},touchend:function(t){ms("up",cs(t),t.changedTouches[0],t)}}),ps({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,rs(this.info)},mousedown:function(t){if(!is(t))return;let e=cs(t),s=this,i=function(t){let i=t.clientX,n=t.clientY;ys(s.info,i,n)&&(s.info.state=s.info.started?"mouseup"===t.type?"end":"track":"start","start"===s.info.state&&gs("tap"),s.info.addMove({x:i,y:n}),is(t)||(s.info.state="end",rs(s.info)),e&&bs(s.info,e,t),s.info.started=!0)};os(this.info,i,function(t){s.info.started&&i(t),rs(s.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=cs(t),s=t.changedTouches[0],i=s.clientX,n=s.clientY;ys(this.info,i,n)&&("start"===this.info.state&&gs("tap"),this.info.addMove({x:i,y:n}),bs(this.info,e,s),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=cs(t),s=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:s.clientX,y:s.clientY}),bs(this.info,e,s))}}),ps({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){is(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){is(t)&&vs(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){vs(this.info,t.changedTouches[0],t)}});var ws=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},xs=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let ks=class extends he{constructor(){super(...arguments),this._value=0,this.min=0,this.max=100,this.knobradius=10,this.disabled=!1,this.step=1,this.barWidth=0,this.intermediateValue=this.min,this.pct=0,this.startx=0,this.dragging=!1}static get styles(){return at`
    :host {
      display: inline-block;
      position: relative;
      width: 300px;
      height: 40px;
      outline: none;
      box-sizing: border-box;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 5px;
    }
  
    :host(.wired-disabled) .knob {
      pointer-events: none !important;
    }
  
    :host(:focus) .knob {
      cursor: move;
      stroke: var(--wired-slider-knob-outline-color, #000);
      fill-opacity: 0.8;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .knob {
      pointer-events: auto;
      fill: var(--wired-slider-knob-zero-color, gray);
      stroke: var(--wired-slider-knob-zero-color, gray);
      transition: transform 0.15s ease;
      cursor: pointer;
    }
  
    .hasValue {
      fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
      stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
    }
  
    .bar {
      stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
    }
    `}render(){return T`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}get value(){return this._value}set value(t){this.setValue(t,!0)}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`);const s=this.knobradius||10;this.barWidth=e.width-2*s,this.bar=we(t,s,e.height/2,e.width-s,e.height/2),this.bar.classList.add("bar"),this.knobGroup=ge("g"),t.appendChild(this.knobGroup),this.knob=ke(this.knobGroup,s,e.height/2,2*s,2*s),this.knob.classList.add("knob"),this.onValueChange(),this.classList.add("wired-rendered"),this.setAttribute("role","slider"),this.setAttribute("aria-valuemax",`${this.max}`),this.setAttribute("aria-valuemin",`${this.min}`),this.setAriaValue(),us(this.knob,"down",t=>{this.disabled||this.knobdown(t)}),us(this.knob,"up",()=>{this.disabled||this.resetKnob()}),us(this.knob,"track",t=>{this.disabled||this.onTrack(t)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 38:case 39:this.incremenent();break;case 37:case 40:this.decrement();break;case 36:this.setValue(this.min);break;case 35:this.setValue(this.max)}})}updated(t){t.has("disabled")&&this.refreshDisabledState()}setAriaValue(){this.setAttribute("aria-valuenow",`${this.value}`)}setValue(t,e=!1){this._value=t,this.setAriaValue(),this.onValueChange(),e||this.fireEvent("change",{value:this.intermediateValue})}incremenent(){const t=Math.min(this.max,Math.round(this.value+this.step));t!==this.value&&this.setValue(t)}decrement(){const t=Math.max(this.min,Math.round(this.value-this.step));t!==this.value&&this.setValue(t)}onValueChange(){if(!this.knob)return;let t=0;this.max>this.min&&(t=Math.min(1,Math.max((this.value-this.min)/(this.max-this.min),0))),this.pct=t,t?this.knob.classList.add("hasValue"):this.knob.classList.remove("hasValue");const e=t*this.barWidth;this.knobGroup.style.transform=`translateX(${Math.round(e)}px)`}knobdown(t){this.knobExpand(!0),t.preventDefault(),this.focus()}resetKnob(){this.knobExpand(!1)}knobExpand(t){this.knob&&(t?this.knob.classList.add("expanded"):this.knob.classList.remove("expanded"))}onTrack(t){switch(t.stopPropagation(),t.detail.state){case"start":this.trackStart();break;case"track":this.trackX(t);break;case"end":this.trackEnd()}}trackStart(){this.intermediateValue=this.value,this.startx=this.pct*this.barWidth,this.dragging=!0}trackX(t){this.dragging||this.trackStart();const e=t.detail.dx||0,s=Math.max(Math.min(this.startx+e,this.barWidth),0);this.knobGroup.style.transform=`translateX(${Math.round(s)}px)`;const i=s/this.barWidth;this.intermediateValue=this.min+i*(this.max-this.min)}trackEnd(){this.dragging=!1,this.resetKnob(),this.setValue(this.intermediateValue),this.pct=(this.value-this.min)/(this.max-this.min)}};ws([et({type:Number}),xs("design:type",Object)],ks.prototype,"_value",void 0),ws([et({type:Number}),xs("design:type",Object)],ks.prototype,"min",void 0),ws([et({type:Number}),xs("design:type",Object)],ks.prototype,"max",void 0),ws([et({type:Number}),xs("design:type",Object)],ks.prototype,"knobradius",void 0),ws([et({type:Boolean,reflect:!0}),xs("design:type",Object)],ks.prototype,"disabled",void 0),ks=ws([Z("wired-slider")],ks);var _s=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},Ss=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let Ms=class extends he{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.iconsize=24}static get styles(){return at`
    :host {
      display: inline-block;
      position: relative;
      padding: 5px;
      font-family: inherit;
      width: 150px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      display: inline-block;
      white-space: nowrap;
    }
  
    .inline {
      display: inline-block;
      vertical-align: middle;
      -moz-user-select: none;
      user-select: none;
    }
  
    #checkPanel {
      cursor: pointer;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-radio-icon-color, currentColor);
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .filledPath {
      fill: var(--wired-radio-icon-color, currentColor);
    }
    `}render(){return T`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);this.dot=void 0;const s={width:this.iconsize||24,height:this.iconsize||24};e.setAttribute("width",`${s.width}`),e.setAttribute("height",`${s.height}`),ke(e,s.width/2,s.height/2,s.width,s.height);const i=Math.max(.6*s.width,5),n=Math.max(.6*s.height,5);this.dot=ke(e,s.width/2,s.height/2,i,n),this.dot.classList.add("filledPath"),this.dot.style.display=this.checked?"":"none",this.classList.add("wired-rendered")}};_s([et({type:Boolean}),Ss("design:type",Object)],Ms.prototype,"checked",void 0),_s([et({type:Boolean,reflect:!0}),Ss("design:type",Object)],Ms.prototype,"disabled",void 0),_s([et({type:String}),Ss("design:type",String)],Ms.prototype,"name",void 0),_s([et({type:Number}),Ss("design:type",Object)],Ms.prototype,"iconsize",void 0),Ms=_s([Z("wired-radio")],Ms);var Ps=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},Cs=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let Es=class extends he{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return at`
    :host {
      display: inline-block;
    }
  
    :host ::slotted(*) {
      padding: var(--wired-radio-group-item-padding, 5px);
    }
    `}render(){return T`
    <slot id="slot" @slotchange="${this.slotChange}"></slot>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("checked",this.checkListener)}handleChecked(t){const e=t.detail.checked,s=t.target,i=s.name||"";e?(this.selected=e&&i||"",this.fireSelected()):s.checked=!0}fireSelected(){this.fireEvent("selected",{selected:this.selected})}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],t&&t.length)for(let e=0;e<t.length;e++){const s=t[e];if("WIRED-RADIO"===s.tagName){this.radioNodes.push(s);const t=s.name||"";this.selected&&t===this.selected?s.checked=!0:s.checked=!1}}}selectPrevious(){const t=this.radioNodes;if(t.length){let e=null,s=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){s=e;break}}s<0?e=t[0]:(--s<0&&(s=t.length-1),e=t[s])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}selectNext(){const t=this.radioNodes;if(t.length){let e=null,s=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){s=e;break}}s<0?e=t[0]:(++s>=t.length&&(s=0),e=t[s])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}};Ps([et({type:String}),Cs("design:type",String)],Es.prototype,"selected",void 0),Es=Ps([Z("wired-radio-group")],Es);var As=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},Ns=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let Ts=class extends he{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return at`
    :host {
      display: block;
      font-family: inherit;
      outline: none;
      opacity: 0;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      display: inline-block;
      white-space: nowrap;
    }
  
    .inline {
      display: inline-block;
      vertical-align: middle;
      -moz-user-select: none;
      user-select: none;
    }
  
    #checkPanel {
      cursor: pointer;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-checkbox-icon-color, currentColor);
      stroke-width: 0.7;
    }
    `}render(){return T`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const s=24,i=24;e.setAttribute("width",`${s}`),e.setAttribute("height",`${i}`),xe(e,0,0,s,i);const n=[];n.push(we(e,.3*s,.4*i,.5*s,.7*i)),n.push(we(e,.5*s,.7*i,s+5,-5)),n.forEach(t=>{t.style.strokeWidth="2.5"}),this.checked?n.forEach(t=>{t.style.display=""}):n.forEach(t=>{t.style.display="none"}),this.classList.add("wired-rendered")}};As([et({type:Boolean}),Ns("design:type",Object)],Ts.prototype,"checked",void 0),As([et({type:Boolean,reflect:!0}),Ns("design:type",Object)],Ts.prototype,"disabled",void 0),Ts=As([Z("wired-checkbox")],Ts);var Os=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},Rs=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let Ls=class extends he{constructor(){super(...arguments),this.elevation=1}static get styles(){return at`
    :host {
      display: inline-block;
      position: relative;
      padding: 10px;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
    `}render(){return T`
    <div>
      <slot @slotchange="${()=>this.requestUpdate()}"></slot>
    </div>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.updated.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler)),setTimeout(()=>this.updated())}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}debounce(t,e,s,i){let n=0;return()=>{const o=arguments,r=s&&!n;clearTimeout(n),n=window.setTimeout(()=>{n=0,s||t.apply(i,o)},e),r&&t.apply(i,o)}}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect(),s=Math.min(Math.max(1,this.elevation),5),i=e.width+2*(s-1),n=e.height+2*(s-1);t.setAttribute("width",`${i}`),t.setAttribute("height",`${n}`),xe(t,2,2,e.width-4,e.height-4);for(let i=1;i<s;i++)we(t,2*i,e.height-4+2*i,e.width-4+2*i,e.height-4+2*i).style.opacity=`${(85-10*i)/100}`,we(t,e.width-4+2*i,e.height-4+2*i,e.width-4+2*i,2*i).style.opacity=`${(85-10*i)/100}`,we(t,2*i,e.height-4+2*i,e.width-4+2*i,e.height-4+2*i).style.opacity=`${(85-10*i)/100}`,we(t,e.width-4+2*i,e.height-4+2*i,e.width-4+2*i,2*i).style.opacity=`${(85-10*i)/100}`;this.classList.add("wired-rendered")}};Os([et({type:Number}),Rs("design:type",Object)],Ls.prototype,"elevation",void 0),Ls=Os([Z("wired-card")],Ls);var Is=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},zs=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let $s=class extends he{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return at`
    :host {
      display: inline-block;
      font-size: 14px;
      text-align: left;
    }
    button {
      cursor: pointer;
      outline: none;
      overflow: hidden;
      color: inherit;
      user-select: none;
      position: relative;
      font-family: inherit;
      text-align: inherit;
      font-size: inherit;
      letter-spacing: 1.25px;
      padding: 1px 10px;
      min-height: 36px;
      text-transform: inherit;
      background: none;
      border: none;
      transition: background-color 0.3s ease, color 0.3s ease;
      width: 100%;
      box-sizing: border-box;
      white-space: nowrap;
    }
    button.selected {
      color: var(--wired-item-selected-color, #fff);
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: currentColor;
      opacity: 0;
    }
    button span {
      display: inline-block;
      transition: transform 0.2s ease;
      position: relative;
    }
    button:active span {
      transform: scale(1.02);
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      display: none;
    }
    button.selected .overlay {
      display: block;
    }
    svg {
      display: block;
    }
    path {
      stroke: var(--wired-item-selected-bg, #000);
      stroke-width: 2.75;
      fill: transparent;
      transition: transform 0.05s ease;
    }
    @media (hover: hover) {
      button:hover::before {
        opacity: 0.05;
      }
    }
    `}render(){return T`
    <button class="${this.selected?"selected":""}">
      <div class="overlay">
        <svg></svg>
      </div>
      <span>
        <slot></slot>
      </span>
    </button>`}firstUpdated(){this.selected&&setTimeout(()=>this.requestUpdate())}updated(){if(this.svg){for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);const t=this.getBoundingClientRect();this.svg.setAttribute("width",`${t.width}`),this.svg.setAttribute("height",`${t.height}`);const e=Se([[0,0],[t.width,0],[t.width,t.height],[0,t.height]]);this.svg.appendChild(e)}}};var Ds;Is([et(),zs("design:type",Object)],$s.prototype,"value",void 0),Is([et(),zs("design:type",Object)],$s.prototype,"name",void 0),Is([et({type:Boolean}),zs("design:type",Object)],$s.prototype,"selected",void 0),Is([(Ds="svg",(t,e)=>{const s={get(){return this.renderRoot.querySelector(Ds)},enumerable:!0,configurable:!0};return void 0!==e?st(s,t,e):it(s,t)}),zs("design:type",SVGSVGElement)],$s.prototype,"svg",void 0),$s=Is([Z("wired-item")],$s);var Vs=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},js=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let Bs=class extends he{constructor(){super(...arguments),this.disabled=!1,this.cardShowing=!1,this.itemNodes=[]}static get styles(){return at`
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }
  
    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }
    
    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      white-space: nowrap;
      position: relative;
    }
  
    .inline {
      display: inline-block;
      vertical-align: top
    }
  
    #textPanel {
      min-width: 90px;
      min-height: 18px;
      padding: 8px;
    }
  
    #dropPanel {
      width: 34px;
      cursor: pointer;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    #card {
      position: absolute;
      background: var(--wired-combo-popup-bg, white);
      z-index: 1;
      box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
    }

    ::slotted(wired-item) {
      display: block;
    }
    `}render(){return T`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value&&this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg id="svg"></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}"
      style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext();break;case 27:t.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:t.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:t.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const s=this.shadowRoot.getElementById("container").getBoundingClientRect();e.setAttribute("width",`${s.width}`),e.setAttribute("height",`${s.height}`);const i=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=i.height+"px",xe(e,0,0,i.width,i.height);const n=i.width-4;xe(e,n,0,34,i.height);const o=Math.max(0,Math.abs((i.height-24)/2)),r=function(t,e){let s;const i=e.length;if(i>2)for(let t=0;t<2;t++){let n=!0;for(let t=1;t<i;t++)s=be(e[t-1][0],e[t-1][1],e[t][0],e[t][1],n,t>0,s),n=!1;s=be(e[i-1][0],e[i-1][1],e[0][0],e[0][1],n,t>0,s)}else s=2===i?ye(e[0][0],e[0][1],e[1][0],e[1][1]):new fe;const n=ge("path",{d:s.value});return t.appendChild(n),n}(e,[[n+8,5+o],[n+26,5+o],[n+17,o+Math.min(i.height,18)]]);if(r.style.fill="currentColor",r.style.pointerEvents=this.disabled?"none":"auto",r.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const s=t[e];"WIRED-ITEM"===s.tagName&&(s.setAttribute("role","option"),this.itemNodes.push(s))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let s=0;s<t.length;s++){const i=t[s];if("WIRED-ITEM"===i.tagName){const t=i.value||"";if(this.selected&&t===this.selected){e=i;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}setCardShowing(t){this.cardShowing=t;const e=this.shadowRoot.getElementById("card");e.style.display=t?"":"none",t&&setTimeout(()=>{e.requestUpdate(),this.shadowRoot.getElementById("slot").assignedNodes().filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach(t=>{const e=t;e.requestUpdate&&e.requestUpdate()})},10),this.setAttribute("aria-expanded",`${this.cardShowing}`)}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let s=0;s<t.length;s++)if(t[s]===this.lastSelectedItem){e=s;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let s=0;s<t.length;s++)if(t[s]===this.lastSelectedItem){e=s;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(t){t.stopPropagation(),this.setCardShowing(!this.cardShowing)}};Vs([et({type:Object}),js("design:type",Object)],Bs.prototype,"value",void 0),Vs([et({type:String}),js("design:type",String)],Bs.prototype,"selected",void 0),Vs([et({type:Boolean,reflect:!0}),js("design:type",Object)],Bs.prototype,"disabled",void 0),Bs=Vs([Z("wired-combo")],Bs);var Ws=function(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r},Us=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let qs=class extends he{constructor(){super(...arguments),this.elevation=1,this.disabled=!1}static get styles(){return at`
    :host {
      display: inline-block;
      font-family: inherit;
      cursor: pointer;
      padding: 8px 10px;
      position: relative;
      text-align: center;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      display: inline-flex;
      outline: none;
      letter-spacing: 1.25px;
      font-size: 14px;
      text-transform: uppercase;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:active) path {
      transform: scale(0.97) translate(1.5%, 1.5%);
    }

    :host(.wired-disabled) {
      opacity: 0.6 !important;
      background: rgba(0, 0, 0, 0.07);
      cursor: default;
      pointer-events: none;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    svg {
      display: block;
    }

    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
      transition: transform 0.05s ease;
    }
    `}render(){return T`
    <slot></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const s=this.getBoundingClientRect(),i=Math.min(Math.max(1,this.elevation),5),n=s.width+2*(i-1),o=s.height+2*(i-1);e.setAttribute("width",`${n}`),e.setAttribute("height",`${o}`),xe(e,0,0,s.width,s.height);for(let t=1;t<i;t++)we(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t).style.opacity=`${(75-10*t)/100}`,we(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`,we(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t).style.opacity=`${(75-10*t)/100}`,we(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`;this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}};Ws([et({type:Number}),Us("design:type",Object)],qs.prototype,"elevation",void 0),Ws([et({type:Boolean,reflect:!0}),Us("design:type",Object)],qs.prototype,"disabled",void 0),qs=Ws([Z("wired-button")],qs);class Gs extends lt{render(){return T`
    <style>
      :host {
        display: block;
        font-size: 16px;
      }
    
      #container {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      }
    
      .layout.horizontal,
      .layout.vertical {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      }
    
      .layout.horizontal {
        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      }
    
      .layout.vertical {
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      }
    
      .layout.center,
      .layout.center-center {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
    
      .flex {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
    
      canvas {
        display: block;
      }
    
      .controls {
        padding: 10px 15px;
      }
    
      label {
        display: block;
        padding-bottom: 5px;
        padding-top: 8px;
      }
    
      wired-slider {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      wired-item {
        font-size: 18px;
      }
    
      @media (max-width: 600px) {
        #container {
          -ms-flex-direction: column-reverse;
          -webkit-flex-direction: column-reverse;
          flex-direction: column-reverse;
        }
      }
    </style>
    <div id="container">
      <div class="flex controls">
        <div style="padding: 5px 0;">
          <wired-checkbox id="strokeShape" checked @change="${this._draw}">Stroke shape</wired-checkbox>
        </div>
        <div>
          <label>Color</label>
          <wired-combo id="colorCombo" selected="red" @selected="${this._draw}">
            <wired-item value="red">Red</wired-item>
            <wired-item value="green">Green</wired-item>
            <wired-item value="blue">Blue</wired-item>
          </wired-combo>
        </div>
        <div>
          <label>Fill Style</label>
          <wired-radio-group id="fillStyleGroup" selected="hachure" @selected="${this._draw}">
            <wired-radio name="hachure">Hachure</wired-radio>
            <wired-radio name="solid">Solid</wired-radio>
          </wired-radio-group>
        </div>
        <div>
          <label>Roughness</label>
          <wired-slider id="slider" value="33" knobradius="15" @change="${this._draw}"></wired-slider>
        </div>
      </div>
      <div>
        <canvas id="canvas" width="280" height="280"></canvas>
      </div>
    </div>
    `}constructor(){super(),this.props={roughness:1,fill:"red",strokeWidth:3,stroke:"#000",fillStyle:"hachure"}}firstUpdated(){this.canvas=this.shadowRoot.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.rc=ae.canvas(this.canvas),this.slider=this.shadowRoot.getElementById("slider"),this.fillStyle=this.shadowRoot.getElementById("fillStyleGroup"),this.strokeShape=this.shadowRoot.getElementById("strokeShape"),this.colorCombo=this.shadowRoot.getElementById("colorCombo"),this._draw()}_draw(){this.props.roughness=3*+this.slider.value/100,this.props.fillStyle=this.fillStyle.selected,this.props.stroke=this.strokeShape.checked?"#000":"transparent",this.props.fill=this.colorCombo.selected,this.ctx.clearRect(0,0,280,280),this.rc.circle(140,140,200,this.props),this.style.setProperty("--wired-item-selected-bg",this.props.fill)}}return customElements.define("rough-demo",Gs),t.RoughDemo=Gs,t}({});