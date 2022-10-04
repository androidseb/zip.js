!function(){"use strict";const{Array:e,Object:t,Math:n,Error:s,Uint8Array:r,Uint16Array:a,Uint32Array:o,Int32Array:i,Map:c,DataView:l,Promise:h,TextEncoder:u,crypto:f,postMessage:p,TransformStream:d,ReadableStream:g,WritableStream:w,CompressionStream:y,DecompressionStream:m}=self;class _{constructor(e){return class extends d{constructor(t){const n=new e(t);super({transform(e,t){t.enqueue(n.append(e))},flush(e){const t=n.flush();t&&e.enqueue(t)}})}}}}const b=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;b[e]=t}class S{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,s=0|e.length;s>n;n++)t=t>>>8^b[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class v extends d{constructor(){const e=new S;super({transform(t){e.append(t)},flush(t){const n=new r(4);new l(n.buffer).setUint32(0,e.get()),t.enqueue(n)}})}}const k={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],s=k.getPartial(n);return 32===s?e.concat(t):k._shiftRight(t,s,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+k.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const s=(e=e.slice(0,n.ceil(t/32))).length;return t&=31,s>0&&t&&(e[s-1]=k.partial(t,e[s-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>n.round(e/1099511627776)||32,_shiftRight(e,t,n,s){for(void 0===s&&(s=[]);t>=32;t-=32)s.push(n),n=0;if(0===t)return s.concat(e);for(let r=0;r<e.length;r++)s.push(n|e[r]>>>t),n=e[r]<<32-t;const r=e.length?e[e.length-1]:0,a=k.getPartial(r);return s.push(k.partial(t+a&31,t+a>32?n:s.pop(),1)),s}},z={bytes:{fromBits(e){const t=k.bitLength(e)/8,n=new r(t);let s;for(let r=0;t>r;r++)0==(3&r)&&(s=e[r/4]),n[r]=s>>>24,s<<=8;return n},toBits(e){const t=[];let n,s=0;for(n=0;n<e.length;n++)s=s<<8|e[n],3==(3&n)&&(t.push(s),s=0);return 3&n&&t.push(k.partial(8*(3&n),s)),t}}},D={sha1:function(e){e?(this._h=e._h.slice(0),this._buffer=e._buffer.slice(0),this._length=e._length):this.reset()}};D.sha1.prototype={blockSize:512,reset(){const e=this;return e._h=this._init.slice(0),e._buffer=[],e._length=0,e},update(e){const t=this;"string"==typeof e&&(e=z.utf8String.toBits(e));const n=t._buffer=k.concat(t._buffer,e),r=t._length,a=t._length=r+k.bitLength(e);if(a>9007199254740991)throw new s("Cannot hash more than 2^53 - 1 bits");const i=new o(n);let c=0;for(let e=t.blockSize+r-(t.blockSize+r&t.blockSize-1);a>=e;e+=t.blockSize)t._block(i.subarray(16*c,16*(c+1))),c+=1;return n.splice(0,16*c),t},finalize(){const e=this;let t=e._buffer;const s=e._h;t=k.concat(t,[k.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(n.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),s},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(e,t,n,s)=>e>19?e>39?e>59?e>79?void 0:t^n^s:t&n|t&s|n&s:t^n^s:t&n|~t&s,_S:(e,t)=>t<<e|t>>>32-e,_block(t){const s=this,r=s._h,a=e(80);for(let e=0;16>e;e++)a[e]=t[e];let o=r[0],i=r[1],c=r[2],l=r[3],h=r[4];for(let e=0;79>=e;e++){16>e||(a[e]=s._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16]));const t=s._S(5,o)+s._f(e,i,c,l)+h+a[e]+s._key[n.floor(e/20)]|0;h=l,l=c,c=s._S(30,i),i=o,o=t}r[0]=r[0]+o|0,r[1]=r[1]+i|0,r[2]=r[2]+c|0,r[3]=r[3]+l|0,r[4]=r[4]+h|0}};const C={getRandomValues(e){const t=new o(e.buffer),s=e=>{let t=987654321;const s=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&s,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&s)&s)/4294967296+.5)*(n.random()>.5?1:-1))};for(let r,a=0;a<e.length;a+=4){const e=s(4294967296*(r||n.random()));r=987654071*e(),t[a/4]=4294967296*e()|0}return e}},I={importKey:e=>new I.hmacSha1(z.bytes.toBits(e)),pbkdf2(e,t,n,r){if(n=n||1e4,0>r||0>n)throw new s("invalid params to pbkdf2");const a=1+(r>>5)<<2;let o,i,c,h,u;const f=new ArrayBuffer(a),p=new l(f);let d=0;const g=k;for(t=z.bytes.toBits(t),u=1;(a||1)>d;u++){for(o=i=e.encrypt(g.concat(t,[u])),c=1;n>c;c++)for(i=e.encrypt(i),h=0;h<i.length;h++)o[h]^=i[h];for(c=0;(a||1)>d&&c<o.length;c++)p.setInt32(d,o[c]),d+=4}return f.slice(0,r/8)},hmacSha1:class{constructor(e){const t=this,n=t._hash=D.sha1,s=[[],[]],r=n.prototype.blockSize/32;t._baseHash=[new n,new n],e.length>r&&(e=n.hash(e));for(let t=0;r>t;t++)s[0][t]=909522486^e[t],s[1][t]=1549556828^e[t];t._baseHash[0].update(s[0]),t._baseHash[1].update(s[1]),t._resultHash=new n(t._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new s("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},R=void 0!==f&&"function"==typeof f.getRandomValues,A="Invalid password",q="Invalid signature";function B(e){return R?f.getRandomValues(e):C.getRandomValues(e)}const H=16,V={name:"PBKDF2"},K=t.assign({hash:{name:"HMAC"}},V),x=t.assign({iterations:1e3,hash:{name:"SHA-1"}},V),T=["deriveBits"],E=[8,12,16],N=[16,24,32],P=10,M=[0,0,0,0],U="undefined",W="function",L=typeof f!=U,F=L&&f.subtle,G=L&&typeof F!=U,O=L&&G&&typeof F.importKey==W,X=L&&G&&typeof F.deriveBits==W,j=z.bytes,J=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],r=t._tables[1],a=e.length;let o,i,c,l=1;if(4!==a&&6!==a&&8!==a)throw new s("invalid aes key size");for(t._key=[i=e.slice(0),c=[]],o=a;4*a+28>o;o++){let e=i[o-1];(o%a==0||8===a&&o%a==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],o%a==0&&(e=e<<8^e>>>24^l<<24,l=l<<1^283*(l>>7))),i[o]=i[o-a]^e}for(let e=0;o;e++,o--){const t=i[3&e?o:o-4];c[e]=4>=o||4>e?t:r[0][n[t>>>24]]^r[1][n[t>>16&255]]^r[2][n[t>>8&255]]^r[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],s=t[4],r=[],a=[];let o,i,c,l;for(let e=0;256>e;e++)a[(r[e]=e<<1^283*(e>>7))^e]=e;for(let h=o=0;!n[h];h^=i||1,o=a[o]||1){let a=o^o<<1^o<<2^o<<3^o<<4;a=a>>8^255&a^99,n[h]=a,s[a]=h,l=r[c=r[i=r[h]]];let u=16843009*l^65537*c^257*i^16843008*h,f=257*r[a]^16843008*a;for(let n=0;4>n;n++)e[n][h]=f=f<<24^f>>>8,t[n][a]=u=u<<24^u>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new s("invalid aes block size");const n=this._key[t],r=n.length/4-2,a=[0,0,0,0],o=this._tables[t],i=o[0],c=o[1],l=o[2],h=o[3],u=o[4];let f,p,d,g=e[0]^n[0],w=e[t?3:1]^n[1],y=e[2]^n[2],m=e[t?1:3]^n[3],_=4;for(let e=0;r>e;e++)f=i[g>>>24]^c[w>>16&255]^l[y>>8&255]^h[255&m]^n[_],p=i[w>>>24]^c[y>>16&255]^l[m>>8&255]^h[255&g]^n[_+1],d=i[y>>>24]^c[m>>16&255]^l[g>>8&255]^h[255&w]^n[_+2],m=i[m>>>24]^c[g>>16&255]^l[w>>8&255]^h[255&y]^n[_+3],_+=4,g=f,w=p,y=d;for(let e=0;4>e;e++)a[t?3&-e:e]=u[g>>>24]<<24^u[w>>16&255]<<16^u[y>>8&255]<<8^u[255&m]^n[_++],f=g,g=w,w=y,y=m,m=f;return a}},Q=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,s=255&e;255===t?(t=0,255===n?(n=0,255===s?s=0:++s):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=s}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let s;if(!(s=t.length))return[];const r=k.bitLength(t);for(let r=0;s>r;r+=4){this.incCounter(n);const s=e.encrypt(n);t[r]^=s[0],t[r+1]^=s[1],t[r+2]^=s[2],t[r+3]^=s[3]}return k.clamp(t,r)}},Y=I.hmacSha1;class Z extends d{constructor(e,n,a){super({start(){t.assign(this,{ready:new h((e=>this.resolveReady=e)),password:e,signed:n,strength:a-1,pending:new r})},async transform(e,t){const n=this,{password:a,strength:o,resolveReady:i,ready:c}=n;a?(await(async(e,t,n,r)=>{const a=await te(e,t,n,se(r,0,E[t])),o=se(r,E[t]);if(a[0]!=o[0]||a[1]!=o[1])throw new s(A)})(n,o,a,se(e,0,E[o]+2)),e=se(e,E[o]+2),i()):await c;const l=new r(e.length-P-(e.length-P)%H);t.enqueue(ee(n,e,l,0,P,!0))},async flush(e){const{signed:t,ctr:n,hmac:a,pending:o,ready:i}=this;await i;const c=se(o,0,o.length-P),l=se(o,o.length-P);let h=new r;if(c.length){const e=ae(j,c);a.update(e);const t=n.update(e);h=re(j,t)}if(t){const e=se(re(j,a.digest()),0,P);for(let t=0;P>t;t++)if(e[t]!=l[t])throw new s(q)}e.enqueue(h)}})}}class $ extends d{constructor(e,n){let s;super({start(){t.assign(this,{ready:new h((e=>this.resolveReady=e)),password:e,strength:n-1,pending:new r})},async transform(e,t){const n=this,{password:s,strength:a,resolveReady:o,ready:i}=n;let c=new r;s?(c=await(async(e,t,n)=>{const s=B(new r(E[t]));return ne(s,await te(e,t,n,s))})(n,a,s),o()):await i;const l=new r(c.length+e.length-e.length%H);l.set(c,0),t.enqueue(ee(n,e,l,c.length,0))},async flush(e){const{ctr:t,hmac:n,pending:a,ready:o}=this;await o;let i=new r;if(a.length){const e=t.update(ae(j,a));n.update(e),i=re(j,e)}s.signature=re(j,n.digest()).slice(0,P),e.enqueue(ne(i,s.signature))}}),s=this}}function ee(e,t,n,s,a,o){const{ctr:i,hmac:c,pending:l}=e,h=t.length-a;let u;for(l.length&&(t=ne(l,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new r(t)).set(n,0)}return e})(n,h-h%H)),u=0;h-H>=u;u+=H){const e=ae(j,se(t,u,u+H));o&&c.update(e);const r=i.update(e);o||c.update(r),n.set(re(j,r),u+s)}return e.pending=se(t,u),n}async function te(n,s,a,o){n.password=null;const i=(e=>{if(void 0===u){const t=new r((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new u).encode(e)})(a),c=await((e,t,n,s,r)=>O?F.importKey("raw",t,n,!1,r):I.importKey(t))(0,i,K,0,T),l=await(async(e,t,n)=>X?await F.deriveBits(e,t,n):I.pbkdf2(t,e.salt,x.iterations,n))(t.assign({salt:o},x),c,8*(2*N[s]+2)),h=new r(l),f=ae(j,se(h,0,N[s])),p=ae(j,se(h,N[s],2*N[s])),d=se(h,2*N[s]);return t.assign(n,{keys:{key:f,authentication:p,passwordVerification:d},ctr:new Q(new J(f),e.from(M)),hmac:new Y(p)}),d}function ne(e,t){let n=e;return e.length+t.length&&(n=new r(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function se(e,t,n){return e.subarray(t,n)}function re(e,t){return e.fromBits(t)}function ae(e,t){return e.toBits(t)}class oe extends d{constructor(e,n){super({start(){t.assign(this,{password:e,passwordVerification:n}),he(this,e)},transform(e,t){const n=this;if(n.password){const t=ce(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new s(A);e=e.subarray(12)}t.enqueue(ce(n,e))}})}}class ie extends d{constructor(e,n){super({start(){t.assign(this,{password:e,passwordVerification:n}),he(this,e)},transform(e,t){const n=this;let s,a;if(n.password){n.password=null;const t=B(new r(12));t[11]=n.passwordVerification,s=new r(e.length+t.length),s.set(le(n,t),0),a=12}else s=new r(e.length),a=0;s.set(le(n,e),a),t.enqueue(s)}})}}function ce(e,t){const n=new r(t.length);for(let s=0;s<t.length;s++)n[s]=fe(e)^t[s],ue(e,n[s]);return n}function le(e,t){const n=new r(t.length);for(let s=0;s<t.length;s++)n[s]=fe(e)^t[s],ue(e,t[s]);return n}function he(e,n){const s=[305419896,591751049,878082192];t.assign(e,{keys:s,crcKey0:new S(s[0]),crcKey2:new S(s[2])});for(let t=0;t<n.length;t++)ue(e,n.charCodeAt(t))}function ue(e,t){let[s,r,a]=e.keys;e.crcKey0.append([t]),s=~e.crcKey0.get(),r=de(n.imul(de(r+pe(s)),134775813)+1),e.crcKey2.append([r>>>24]),a=~e.crcKey2.get(),e.keys=[s,r,a]}function fe(e){const t=2|e.keys[2];return pe(n.imul(t,1^t)>>>8)}function pe(e){return 255&e}function de(e){return 4294967295&e}const ge="deflate-raw";class we extends d{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:s}){super({});const{compressed:r,encrypted:a,useCompressionStream:o,password:i,passwordVerification:c,encryptionStrength:h,zipCrypto:u,signed:f,level:p}=e,d=this;let g,w,y=me(super.readable);a&&!u||!f||([y,g]=y.tee(),g=Se(g,new v)),r&&(y=be(y,o,{level:p,chunkSize:t},s,n)),a&&(u?y=Se(y,new ie(i,c)):(w=new $(i,h),y=Se(y,w))),_e(d,y,(async()=>{let e;a&&!u&&(e=w.signature),a&&!u||!f||(e=await g.getReader().read(),e=new l(e.value.buffer).getUint32(0)),d.signature=e}))}}class ye extends d{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:r}){super({});const{zipCrypto:a,encrypted:o,password:i,passwordVerification:c,signed:h,signature:u,encryptionStrength:f,compressed:p,useCompressionStream:d}=e;let g,w,y=me(super.readable);o&&(a?y=Se(y,new oe(i,c)):(w=new Z(i,h,f),y=Se(y,w))),p&&(y=be(y,d,{chunkSize:t},r,n)),o&&!a||!h||([y,g]=y.tee(),g=Se(g,new v)),_e(this,y,(async()=>{if((!o||a)&&h){const e=await g.getReader().read(),t=new l(e.value.buffer);if(u!=t.getUint32(0,!1))throw new s(q)}}))}}function me(e){return Se(e,new d({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function _e(e,n,s){n=Se(n,new d({flush:s})),t.defineProperty(e,"readable",{get:()=>n})}function be(e,t,n,s,r){try{e=Se(e,new(t&&s?s:r)(ge,n))}catch(s){if(!t)throw s;e=Se(e,new r(ge,n))}return e}function Se(e,t){return e.pipeThrough(t)}const ve="data";class ke extends d{constructor(e,n){super({});const s=this,{codecType:r}=e;let a;r.startsWith("deflate")?a=we:r.startsWith("inflate")&&(a=ye);let o=0;const i=new a(e,n),c=super.readable,l=new d({transform(e,t){e&&e.length&&(o+=e.length,t.enqueue(e))},flush(){const{signature:e}=i;t.assign(s,{signature:e,size:o})}});t.defineProperty(s,"readable",{get:()=>c.pipeThrough(i).pipeThrough(l)})}}const ze=new c,De=new c;let Ce=0;async function Ie(e){try{const{options:t,scripts:n,config:s}=e;n&&n.length&&importScripts.apply(void 0,n),self.initCodec&&self.initCodec(),s.CompressionStreamNative=self.CompressionStream,s.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(s.CompressionStream=new _(self.Deflate)),self.Inflate&&(s.DecompressionStream=new _(self.Inflate));const r={highWaterMark:1,size:()=>s.chunkSize},a=e.readable||new g({async pull(e){const t=new h((e=>ze.set(Ce,e)));Re({type:"pull",messageId:Ce}),Ce=(Ce+1)%Number.MAX_SAFE_INTEGER;const{value:n,done:s}=await t;e.enqueue(n),s&&e.close()}},r),o=e.writable||new w({async write(e){let t;const n=new h((e=>t=e));De.set(Ce,t),Re({type:ve,data:e,messageId:Ce}),Ce=(Ce+1)%Number.MAX_SAFE_INTEGER,await n}},r),i=new ke(t,s);await a.pipeThrough(i).pipeTo(o,{preventAbort:!0});try{await o.close()}catch(e){}const{signature:c,size:l}=i;Re({type:"close",result:{signature:c,size:l}})}catch(e){Ae(e)}}function Re(e){if(e.data){let{data:t}=e;if(t&&t.length)try{t=new r(t),e.data=t.buffer,p(e,[e.data])}catch(t){p(e)}else p(e)}else p(e)}function Ae(e){const{message:t,stack:n,code:s,name:r}=e;p({error:{message:t,stack:n,code:s,name:r}})}function qe(e,n,s){return class{constructor(a){const o=this;t.hasOwn(a,"level")&&void 0===a.level&&delete a.level,o.codec=new e(t.assign({},n,a)),s(o.codec,(e=>{if(o.pendingData){const{pendingData:t}=o;o.pendingData=new r(t.length+e.length),t.set(t,0),t.set(e,t.length)}else o.pendingData=new r(e)}))}append(e){return this.codec.push(e),a(this)}flush(){return this.codec.push(new r,!0),a(this)}};function a(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new r}}addEventListener("message",(e=>{const t=e.data,{type:n,messageId:s,data:a,done:o}=t;try{if("start"==n&&Ie(t),n==ve){const e=ze.get(s);ze.delete(s),e({value:new r(a),done:o})}if("ack"==n){const e=De.get(s);De.delete(s),e()}}catch(e){Ae(e)}})),self.initCodec=()=>{const{Deflate:e,Inflate:t}=((e,t={},n)=>({Deflate:qe(e.Deflate,t.deflate,n),Inflate:qe(e.Inflate,t.inflate,n)}))(pako,{deflate:{raw:!0},inflate:{raw:!0}},((e,t)=>e.onData=t));self.Deflate=e,self.Inflate=t}}();
