/*
脚本作者：Yao Qinsher
更新时间：2024-10-14
说明：WPS Cookie获取脚本
*/

const $ = new ToolClient();

const captureRequest = () => {
  const parse = (delimiter) => (str) =>
    Object.fromEntries(str.split(delimiter).map((v) => v.split("=")));

  const { wps_sids } = parse(/;\s+?/g)($request.headers?.cookie ?? "");

  wps_sids && $.writeJson({ cookie: { wps_sids } }, "WPS_info");

  const message = wps_sids
    ? "WPS每日签到,,已成功捕获Cookie，请前往WPS每日签到插件的详情页面关闭捕获Cookie，避免持续运行造成不必要的开销。"
    : "WPS每日签到,,捕获Cookie失败，请检查请求内容。";

  $.msg(...message.split(","));
};

!(async () => {
  await $.runScript();
  if (this.$request) {
    captureRequest();
  }
})()
  .catch($.error)
  .finally($done);

function ToolClient(t,e){class MyPromise extends Promise{static withResolvers(){let t,e;return{promise:new this(((s,r)=>{t=s,e=r})),resolve:t,reject:e}}toJson(t=(t=>t)){return this.then((({body:e})=>t(JSON.parse(e))))}toStr(t=(t=>t)){return this.then((({body:e})=>t('string'==typeof e?e:JSON.stringify(e,null,2))))}toBinaryString(t){return t.reduce(((t,e)=>t+String.fromCharCode(e)),'')}toBase64Image(t){return this.then((({body:e,bodyBytes:s,headers:r})=>{const i=t?`data:${r['Content-Type']};base64,`:'',o=s?this.toBinaryString(new Uint8Array(s)):this.toBinaryString(e);return i+btoa(o)}))}}class Fetch{static setResponse(t){return this.#t=t.bind(this),this}static#t=({error:t,body:e,bodyBytes:s,status:r,headers:i})=>{if(t||r<200||r>399)throw new Error(t??e);return{bodyBytes:s,body:e,status:r,headers:i}};static#e={Qx(t,e){$task.fetch(t).then((({bodyBytes:t,body:s,statusCode:r,headers:i})=>e({bodyBytes:t,body:s,status:r,headers:i})),(t=>e({error:t})))},Surge(t,e){$httpClient[t.method](t,((t,{status:s,headers:r},i)=>e({error:t,body:i,status:s,headers:r})))},get Loon(){return this.Surge},get Stash(){return this.Surge},get Shadowrocket(){return this.Surge}};constructor(t){return this.$env=t.$env,new Proxy(((...t)=>this.#s(this.#r('get',...t))),{get:(t,e)=>(...t)=>this.#s(this.#r(e,...t))})}#s(t){const{promise:e,resolve:s}=MyPromise.withResolvers(),r=t.timeout*(this.$env('Surge')?1:1e3);Fetch.#e[this.$env()]({...t,timeout:r},s);const i=setTimeout((()=>s({error:'请求超时'})),1e3*t.timeout);return e.then(Fetch.#t).catch((async e=>{if(t.maxRetries<=1)throw e;return await new Promise((e=>setTimeout(e,1e3*t.retryDelay))),t.maxRetries--,this.#s(t)})).finally((()=>clearTimeout(i)))}#r(t,e,s=0,r=1){'string'==typeof e&&(e={url:e});const{$auto:i=!0,...o}=e;return{method:t,headers:this.#i(e.headers),timeout:4,maxRetries:s,retryDelay:r,'auto-redirect':i,opts:{redirection:i},...o}}#i(t={}){return Object.fromEntries(Object.entries(t).map((([t,e])=>[t.toLowerCase(),e])))}}class Notify{static signatures={AAAA:'video/mp4',JVBERi0:'application/pdf',R0lGODdh:'image/gif',R0lGODlh:'image/gif',iVBORw0KGgo:'image/png',Qk02U:'image/bmp','/9j/':'image/jpg'};constructor(t,e,s){

return this.msgName=t,this.msgKey=e,this.fetch=s.fetch,this.defaultMsg=s.defaultMsg,this.msg.bind(this)}msg(t='',e='',s='',r={}){'string'==typeof r&&(r={$open:r});const{$open:i,$media:o='',$copy:n='',...a}=r,h=t+'\n'+e+'\n'+s,g={Bark:()=>this.fetch(`https://api.day.app/${this.msgKey}/${h}?url=${i}&icon=${o}`),PushDeer:()=>this.fetch(`https://api2.pushdeer.com/message/push?pushkey=${this.msgKey}&text=${h}`)},{mime:c,base64:l}=this.#o(o);return g[this.msgName]?.()??this.defaultMsg(`${t}`,`${e}`,`${s}`,{action:n?'clipboard':'open-url','open-url':i,openUrl:i,url:i,mediaUrl:o,'media-url':o,'media-base64':l,'media-base64-mime':c,text:n,'update-pasteboard':n,clipboard:n,...a})}#o(t){if(!t||t.startsWith('http'))return{};if(t.startsWith('data:')){const[,e,,s]=t.split(/:|;|,/g);return{mime:e,base64:s}}const e=Notify.signatures[Object.keys(Notify.signatures).find((e=>t.startsWith(e)))]?.[1];return e?{mime:e,base64:t}:{}}}class ScriptManager{static#n=[];static#a={dayjs:'https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js',md5:'https://cdn.jsdelivr.net/npm/crypto-js/md5.min.js',crypto:'https://cdn.jsdelivr.net/npm/crypto-js/crypto-js.min.js',base64:'https://cdn.jsdelivr.net/npm/js-base64@3.7.5/base64.min.js'};constructor(t){this.tool=t}getScript(t){const e=ScriptManager.#a[t]??t,s=this.getCacheName(e),r=this.tool.read(s),i=(r?Promise.resolve(r):this.tool.fetch(e)).then((t=>{const e=t.body??t;globalThis.eval(e),r||this.tool.write(e,s)})).catch((t=>{throw`${e}: ${t}`}));ScriptManager.#n.push(i)}getCacheName(t){return t.replace(/(\.min|\.js$)/g,'').split('/').at(-1)}async runScripts(){await Promise.all(ScriptManager.#n)}}class Log{static#h={debug:0,info:1,warn:2,error:3,log:4};static#g='\n';static#c=[];static#l=Log.#u('info');static#u(t){if(!Log.#h.hasOwnProperty(t))throw new Error(`无效的日志级别-${t}`);return Log.#h[t]}static setLogLevel(t){Log.#l=Log.#u(t)}static logWithLevel(t,e){if(Log.#l>Log.#u(t))return;const s='log'===t?'':`[${t}]`;console.log(`${s} ${Log.#p(e)}`)}static#p(t){return t.length&&Log.#c.push(...t),t.map(Log.#m).join(Log.#g)}static#m(t){return t&&'object'==typeof t?t.stack?`${t.name}: ${t.message}\n${t.stack}`:JSON.stringify(t,null,4):String(t)}}return ToolClient=class{constructor(t,e){this.#d(),this.fetch=new Fetch(this),this.msg=this.getMsg(t,e),this.script=new ScriptManager(this)}$env(t){const e={'$environment.surge-build':'Surge',$task:'Qx',$loon:'Loon','$environment.stash-version':'Stash',$rocket:'Shadowrocket'};for(const[s,r]of Object.entries(e))if(s.split('.').reduce(((t,e)=>t?.[e]),globalThis))return this.$env=t=>t?t===r:r,this.$env(t);throw new Error('环境不支持')}#d(){const t=this.$env('Qx');this.read=t?$prefs.valueForKey:$persistentStore.read,this.write=t?$prefs.setValueForKey:$persistentStore.write,this.defaultMsg=t?$notify:$notification.post}toStr(t){return JSON.stringify(t,null,2)}toJson(t){return JSON.parse(t)}readJson(t){return this.toJson(this.read(t))}writeJson(t,e){return this.write(JSON.stringify(t),e)}setResponse(t){return Fetch.setResponse(t),this.fetch}httpApi(t,e='GET',s=null){const{promise:r,resolve:i}=MyPromise.withResolvers();return $httpAPI(e,t,s,i),r}getMsg(t,e){return new Notify(t,e,this)}getScript([t]){this.script.getScript(t)}async runScript(){await this.script.runScripts()}setLogLevel(t){Log.setLogLevel(t)}debug(...t){Log.logWithLevel('debug',t)}info(...t){Log.logWithLevel('info',t)}warn(...t){Log.logWithLevel('warn',t)}error(...t){Log.logWithLevel('error',t)}log(...t){Log.logWithLevel('log',t)}notifyAndLog({message:t=[],...e}){Object.keys(e).forEach((s=>{e[s]&&this[s](...t)}))}parseArgument(){return globalThis.$argument?'object'==typeof $argument?$argument:Object.fromEntries($argument.split('&').map((t=>t.split('=')))):{}}},new ToolClient(t,e)}
