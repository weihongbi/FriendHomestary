!function(W,D,E){function fc(){var e,t,r;if((r=(r=W.navigator)?r.plugins:null)&&r.length)for(var n=0;n<r.length&&!t;n++){var a=r[n];-1<a.name.indexOf("Shockwave Flash")&&(t=a.description)}if(!t)try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),t=e.GetVariable("$version")}catch(e){}if(!t)try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),t="WIN 6,0,21,0",e.AllowScriptAccess="always",t=e.GetVariable("$version")}catch(e){}if(!t)try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),t=e.GetVariable("$version")}catch(e){}return t&&(e=t.match(/[\d]+/g))&&3<=e.length&&(t=e[0]+"."+e[1]+" r"+e[2]),t||void 0}function Ic(e,t){for(var r=new Date,n=W.navigator,a=n.plugins||[],r=[e,n.userAgent,r.getTimezoneOffset(),r.getYear(),r.getDate(),r.getHours(),r.getMinutes()+t],n=0;n<a.length;++n)r.push(a[n].description);return La(r.join("."))}try{var Ba=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Ca=function(e){if(null==e)return String(e);var t=Ba.exec(Object.prototype.toString.call(Object(e)));return t?t[1].toLowerCase():"object"},Ea=function(e,t){return Object.prototype.hasOwnProperty.call(Object(e),t)},fa=function(e){if(!e||"object"!=Ca(e)||e.nodeType||e==e.window)return!1;try{if(e.constructor&&!Ea(e,"constructor")&&!Ea(e.constructor.prototype,"isPrototypeOf"))return!1}catch(e){return!1}for(var t in e);return void 0===t||Ea(e,t)},Fa=function(e,t){var r,n,a=t||("array"==Ca(e)?[]:{});for(r in e)Ea(e,r)&&(n=e[r],"array"!=Ca(a)&&Qa.get(r)&&(r=Qa.get(r).F),"array"==Ca(n)?("array"!=Ca(a[r])&&(a[r]=[]),a[r]=Fa(n,a[r])):fa(n)?(fa(a[r])||(a[r]={}),a[r]=Fa(n,a[r])):a[r]=n);return a},Ga=function(e,t){var r,n,a="array"==Ca(e)?"[":"{";for(r in e)Ea(e,r)&&(n=e[r],"array"==Ca(n)||"object"==Ca(n)?a+="array"==t?Ga(n,Ca(n))+",":'"'+r+'":'+Ga(n,Ca(n))+",":"string"==Ca(n)?a+="array"==t?'"'+n+'",':'"'+r+'":"'+n+'",':a+="array"==t?n+",":'"'+r+'":'+n+",");return a+="array"==Ca(e)?"]":"}"},Ha=function(e){var t="array"==Ca(e)||"object"==Ca(e)?Ga(e,Ca(e)).replace(/,}/g,"}").replace(/,]/g,"]"):e;return"{}"!=t?t:""},cp=function(e,t){for(d in t)Ea(t,d)&&(e[d]=t[d])},ea=function(e){return"function"==typeof e},kaa=function(e){return"[object Array]"==Object.prototype.toString.call(Object(e))},hasValue=function(e,t){if(void 0==e||!kaa(e))return 0;for(var r=0;r<e.length;r++)if(t==e[r])return 1;return 0},qa=function(e){return void 0!=e&&-1<(e.constructor+"").indexOf("String")},Dd=function(e,t){return 0==e.indexOf(t)},pf=navigator,u=function(e,t,r){var n=W[e];return W[e]=void 0===n||r?t:n,W[e]},K=function(e,t,r,n){return(n||"http:"!=W.location.protocol?e:t)+r},qf=function(e){var t=D.getElementsByTagName("script")[0]||D.body||D.head;t.parentNode.insertBefore(e,t)},ka=function(e,t){t&&(e.addEventListener?e.onload=t:e.onreadystatechange=function(){e.readyState in{loaded:1,complete:1}&&(e.onreadystatechange=null,t())})},p=function(e,t,r){var n=D.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,ka(n,t),r&&(n.onerror=r),qf(n)},ra=function(e,t){var r=D.createElement("iframe");return r.height="0",r.width="0",r.style.display="none",r.style.visibility="hidden",void 0!==e&&(r.src=e),qf(r),ka(r,t),r},N=function(e,t,r){var n=new Image(1,1);n.onload=function(){n.onload=null,t&&t()},n.onerror=function(){n.onerror=null,r&&r()},n.src=e},N1=function(e,t,r,n){if(null!=n)var a=n;else var a=new Image(1,1);a.onload=function(){a.onload=null,t&&t()},a.onerror=function(){a.onerror=null,r&&r()},a.src=e},U=function(e,t,r,n){e.addEventListener?e.addEventListener(t,r,!!n):e.attachEvent&&e.attachEvent("on"+t,r)},q=function(e){W.setTimeout(e,0)},max_sp=0,seFlag=!1,sp=function(){var e=W.pageYOffset||D.documentElement.scrollTop||D.body.scrollTop,t=D.documentElement.scrollHeight||D.body.scrollHeight,r=D.documentElement.clientHeight||D.body.clientHeight;if(!(t>r))return max_sp=100,seFlag=!0,max_sp;var n=parseInt(e/(t-r)*100);return max_sp<n&&(max_sp=n),n},spF=function(){var scrollPercent=sp();max_sp>=100&&RR(W,"scroll",spF),!seFlag&&scrollPercent>80&&(eval(py_n+"('event','scrollEvent')"),seFlag=!0)},na=!1,oa=[sp],rf=function(e){if(!na){var t=D.createEventObject,r="complete"==D.readyState,n="interactive"==D.readyState;if(!e||"readystatechange"!=e.type||r||!t&&n){na=!0;for(var a=0;a<oa.length;a++)oa[a]()}}},sf=0,tf=function(){if(!na&&140>sf){sf++;try{D.documentElement.doScroll("left"),rf()}catch(e){W.setTimeout(tf,50)}}},vf=function(e){var t=D.getElementById(e);if(t&&uf(t,"id")!=e)for(var r=1;r<D.all[e].length;r++)if(uf(D.all[e][r],"id")==e)return D.all[e][r];return t},uf=function(e,t){return e&&t&&e.attributes&&e.attributes[t]?e.attributes[t].value:null},wf=function(e){return e.target||e.srcElement||{}},sa=function(e){var t=D.createElement("div");t.innerHTML="A<div>"+e+"</div>";for(var t=t.lastChild,r=[];t.firstChild;)r.push(t.removeChild(t.firstChild));return r},xf=function(e,t){for(var r={},n=0;n<t.length;n++)r[t[n]]=!0;for(var a=e,n=0;a&&!r[String(a.tagName).toLowerCase()]&&100>n;n++)a=a.parentElement;return a&&!r[String(a.tagName).toLowerCase()]&&(a=null),a},yf=!1,zf=[],Af=function(){if(!yf){yf=!0;for(var e=0;e<zf.length;e++)zf[e]()}},Bf=function(e){e=e||W;var t=e.location.href,r=t.indexOf("#");return 0>r?"":t.substring(r+1)},qa=function(e){return void 0!=e&&-1<(e.constructor+"").indexOf("String")},Dd=function(e,t){return 0==e.indexOf(t)},raa=function(e){return e?e.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""):""},log=function(e){},info=function(e){},error=function(e){},ab=function(e,t,r,n){var a=$a(t);a&&a.o?a.o(e,t,r,n):e.data.set(t,r,n)},bb=function(e,t,r,n,a){this.name=e,this.F=t,this.Z=n,this.o=a,this.defaultValue=r},$a=function(e){var t=Qa.get(e);if(!t)for(var r=0;r<Za.length;r++){var n=Za[r],a=n[0].exec(e);if(a){t=n[1](a),Qa.set(t.name,t);break}}return t},S=function(e,t,r,n,a){return e=new bb(e,t,r,n,a),Qa.set(e.name,e),e.name},SE=function(e,t,r,n,a,i){return e=new bb(e,t,n,a,i),e.p=r,Qa.set(e.name,e),e.name},cbb=function(e,t){Za.push([new RegExp("^"+e+"$"),t])},T=function(e,t,r){return S(e,t,r,void 0,db)},db=function(){},xa=function(){var e=""+D.location.hostname;return 0==e.indexOf("www.")?e.substring(4):e},ya=function(e){var t=D.referrer;if(/^https?:\/\//i.test(t)){if(e)return t;e="//"+D.location.hostname;var r=t.indexOf(e);if(!(5!=r&&6!=r||"/"!=(e=t.charAt(r+e.length))&&"?"!=e&&""!=e&&":"!=e))return;return t}},za=function(e,t){if(1==t.length&&null!=t[0]&&"object"==typeof t[0])return t[0];for(var r={},n=Math.min(e.length+1,t.length),a=0;a<n;a++){if("object"==typeof t[a]){for(var i in t[a])t[a].hasOwnProperty(i)&&(r[i]=t[a][i]);break}a<e.length&&(r[e[a]]=t[a])}return r},setExtraData=function(t){var r=W.navigator,n=W.screen,a=D.location;t.set(lb,ya(!0)),a&&t.set(kb,a.href),n&&t.set(qb,n.width+"x"+n.height),n&&t.set(pb,n.colorDepth+"-bit");var n=D.documentElement,i=(e=D.body)&&e.clientWidth&&e.clientHeight,o=[];n&&n.clientWidth&&n.clientHeight&&("CSS1Compat"===D.compatMode||!i)?o=[n.clientWidth,n.clientHeight]:i&&(o=[e.clientWidth,e.clientHeight]),n=0>=o[0]||0>=o[1]?"":o.join("x"),t.set(rb,n);var c=[];(e=D.body)&&e.scrollWidth&&e.scrollHeight&&(c=[e.scrollWidth,e.scrollHeight]);var s=0>=c[0]||0>=c[1]?"":c.join("x");if(t.set(bs,s),t.set(tb,fc()),t.set(ub,cdid||_getDeviceId()),t.set(ob,D.characterSet||D.charset),t.set(sb,r&&"function"==typeof r.javaEnabled&&r.javaEnabled()||!1),t.set(nb,(r&&(r.language||r.browserLanguage)||"").toLowerCase()),a&&t.get(cc)&&(r=D.location.hash)){for(r=r.split(/[?&#]+/),a=[],n=0;n<r.length;++n)(Dd(r[n],"utm_id")||Dd(r[n],"utm_campaign")||Dd(r[n],"utm_source")||Dd(r[n],"utm_medium")||Dd(r[n],"utm_term")||Dd(r[n],"utm_content")||Dd(r[n],"gclid")||Dd(r[n],"dclid")||Dd(r[n],"gclsrc"))&&a.push(r[n]);0<a.length&&(r="#"+a.join("&"),t.set(kb,t.get(kb)+r))}},ee=function(){this.keys=[],this.values={},this.m={}};ee.prototype.set=function(e,t,r){this.keys.push(e),r?this.m[":"+e]=t:this.values[":"+e]=t},ee.prototype.setParam=function(e,t,r,n){this.keys.push(e),n?this.m[":"+e]?this.m[":"+e][r]=t[r]:this.m[":"+e]=t:this.values[":"+e]?this.values[":"+e][r]=t[r]:this.values[":"+e]=t},ee.prototype.get=function(e){return this.m.hasOwnProperty(":"+e)?this.m[":"+e]:this.values[":"+e]},ee.prototype.map=function(e){for(var t=0;t<this.keys.length;t++){var r=this.keys[t],n=this.get(r);n&&e(r,n)}};var Ya=function(){this.data=new ee},Qa=new ee,Za=[];Ya.prototype.get=function(e){var t=$a(e),r=this.data.get(e);return t&&void 0==r&&(r=ea(t.defaultValue)?t.defaultValue():t.defaultValue),t&&t.Z?t.Z(this,e,r):r},Ya.prototype.set=function(e,t,r){if(e)if("object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&ab(this,n,e[n],r);else ab(this,e,t,r)};var py_n=qa(W._CommandName_)&&raa(W._CommandName_)||"py",clonePy=function(e,t,r){var n=function(){var r=arguments;return r.length&&e[t].$.e(r),e[t].track=function(n){(r.t=[]).push(arguments),n&&e[t].$.t(r)},e[t]};return cp(n,r),n},py=W[py_n];if(py.L=py.l,!py.a)return;var nb=S("language","lg"),ob=S("encoding","ec"),pb=S("screenColors","sc"),qb=S("screenResolution","sr"),rb=S("viewportSize","vp"),sb=S("javaEnabled","je"),tb=S("flashVersion","fv"),ub=S("deviceId","did"),bs=S("pageSize","ps"),kb=S("location","u",""),lb=S("referrer","r"),vs=S("version","v");cbb("contentGroup([0-9]+)",function(e){return new bb(e[0],"cg"+e[1])}),S("account","a"),S("activity_content","ac"),S("activity_end_time","ae"),S("activity_start_time","as"),S("activity_url","au"),S("android_schema_url","and"),S("brand","b"),S("category","ca"),S("categoryId","cid"),S("clickId","c"),S("cookieId","ci"),S("currency_code","cc"),S("data","dt"),S("discount","dc"),S("email","em"),S("id","id"),S("industry","ind"),S("ios_schema_url","ios"),S("mobile_activity_url","ma"),S("mobile_name","mm"),S("mobile_pic_height","mh"),S("mobile_pic_url","mu"),S("mobile_pic_width","mw"),S("mobile_pic_size","ms"),S("mobile_product_url","wap"),S("name","n"),S("off_time","et"),S("on_time","sm"),S("orig_price","op"),S("pc_pic_url","ppu"),S("pic_height","ph"),S("pic_width","pw"),S("pic_size","pis"),S("price","pr"),S("product_no","pn"),S("product_url","pu"),S("promotion","pm"),S("short_desc","sd"),S("short_name","sn"),S("sold_out","so"),S("spu_id","si"),S("stock","sk"),S("type","tp"),S("userId","uid"),S("url","u"),S("money","mn"),S("items","it"),S("count","ct"),S("trackId","tid"),S("event","ev"),S("categoryPath","cp"),S("page","pg"),S("customEvent","ce"),S("keywords","k"),SE("domain","d",["d"]),SE("default","df",["evs"]);var mp=SE("mapping","mp",["mp"]),ex=SE("extend","e",["e"]);SE("user","ur",["id","name","cookieId","email","type","category"]),SE("clickParam","cpk",["cpk"]),SE("site","st",["type","id","industry"]),SE("viewHome","vh",["pg"]),SE("viewList","vl",["cp"]),SE("viewItem","vi",["pn"]),SE("viewSearch","vs",["k"]),SE("viewActivity","va",["n"]),SE("viewChannel","vn",["n"]),SE("viewUserIndex","vu",["uid"]),SE("viewCart","vc",["mn","it"]),SE("viewPage","vg"),SE("collect","cl",["id","tid"]),SE("order","od",["id","mn","it","tid"]),SE("purchase","pch",["id","mn","it","tid"]),SE("consult","co",["tid"]),SE("message","msg",["tid"]),SE("statistics","sts",["tid"]),SE("addCart","ad",["id","tid"]),SE("register","rg",["id","dt","tid"]),SE("leads","ls",["id","dt","tid"]),SE("custom","cm",["ce","id","dt","tid"]),SE("standingTime","ste"),SE("scrollEvent","se"),cbb("dimension([0-9]+)",function(e){return new bb(e[0],"cd"+e[1])}),cbb("metric([0-9]+)",function(e){return new bb(e[0],"cm"+e[1])});var Na=T("trackingId","tid"),cc=T("allowAnchor",void 0,!0),ec=T("alwaysSendReferrer",void 0,!1),b_i=new Ya,cmf={cmFun:function(e){try{if(!e)return;var t=e.us;if(t&&t.length<=0)return;for(var r=pa.get(mp),n=r&&void 0!=r.mp&&r.mp<t.length?r.mp:t.length,a="function i(a){new Image().src = a};",i=0;i<n;i++)a+='i("'+t[i]+'");';ra("javascript:'<script>"+a+"<\/script>'",this.timeOutCm).name="_pycmifr"}catch(e){}},timeOutCm:function(){try{for(var e=D.getElementsByName("_pycmifr"),t=e.length-1;t>=0;t--)"IFRAME"==e[t].tagName&&e[t].parentNode.removeChild(e[t])}catch(e){}}},getHostName=function(){var e=location.hostname,t=/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/,r=e.split("."),n=r.length-2;if(t.test(e)||2===r.length)return e;for(;0<=n;--n){if("www"===r[n])return r.slice(n+1).join(".");if(-1===",com,net,org,gov,edu,info,name,int,mil,arpa,asia,biz,pro,coop,aero,museum,ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cf,cg,ch,ci,ck,cl,cm,cn,co,cq,cr,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,es,et,ev,fi,fj,fk,fm,fo,fr,ga,gb,gd,ge,gf,gh,gi,gl,gm,gn,gp,gr,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,in,io,iq,ir,is,it,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,ml,mm,mn,mo,mp,mq,mr,ms,mt,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nt,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,pt,pw,py,qa,re,ro,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sy,sz,tc,td,tf,tg,th,tj,tk,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,va,vc,ve,vg,vn,vu,wf,ws,ye,yu,za,zm,zr,zw,".indexOf(","+r[n]+","))return r.slice(n).join(".")}return e},josEncode=function(){"use strict";function e(e){void 0==e&&(e="");var t=typeof e;switch(t){case"boolean":return r(e);case"string":return i(e);case"number":return n(e);case"object":return o(e);case"array":return c(e);default:throw"Unsupported type '"+t+"'"}}function t(e){for(var t=s.charAt(31&e),r=e>>>5;0!=r;)t=s.charAt(31&r|32)+t,r>>>=5;return t}function r(e){return e?s.charAt(1):s.charAt(2)}function n(e){if(Number.isFinite&&!Number.isFinite(e)||isNaN&&isNaN(e)||e==1/0||e==-1/0)throw"Unsupported Number: Infinity,-Infinity,NaN";var r=e.toString();return s.charAt(3)+t(r.length)+r.replace(/\+/g,"P").replace(/\./g,"D")}function a(e){switch(e){case 26:return 32;case 27:return 45;case 28:return 46;case 29:return 47;case 30:return 58;case 31:return 95;case 32:return 26;case 45:return 27;case 46:return 28;case 47:return 29;case 58:return 30;case 95:return 31;default:return e>=97&&e<=122?e-97:e>=0&&e<=25?e+97:e}}function i(e){for(var r=!0,n=0;n<e.length;n++){var i=e.charCodeAt(n);if(!(i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122||95==i||46==i)){r=!1;break}}if(r)return s.charAt(4)+t(e.length)+e.replace(/\./g,"-");for(var o=s.charAt(5)+t(e.length),n=0;n<e.length;n++)o+=t(a(e.charCodeAt(n)));return o}function o(r){if(null==r)return s.charAt(0);if(Array.isArray&&Array.isArray(r)||"[object Array]"==Object.prototype.toString.call(r))return c(r);var n=[];for(var a in r)r.hasOwnProperty(a)&&(n[n.length]=a);var o=s.charAt(6)+t(n.length);for(var u in n)o+=i(n[u])+e(r[n[u]]);return o}function c(r){var n=s.charAt(7)+t(r.length);for(var a in r)n+=e(r[a]);return n}var s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz_";return e}(),_getDeviceId=function(){var e,t=/^[0-9]{15}$/,r=/^([0-9a-zA-Z]{1,})(([\/\s-][0-9a-zA-Z]{1,}){4})$/,n=/^[a-zA-Z0-9]{32}$/,a=ipy.getQueryString("pyimei"),i=ipy.getQueryString("pyidfa");return a||i||(a=ipy.getReferrerQueryString("pyimei"),i=ipy.getReferrerQueryString("pyidfa")),a=t.test(a)||n.test(a)?a:0,i=r.test(i)||n.test(i)?i:0,e=i||a,e?josEncode(e):0},_setIpydeviceid=function(){var e=_getDeviceId();ipy.getInfo("ipydeviceid")!=e&&ipy.setInfo("ipydeviceid",e)};W.ipy={r:/(^|&)jump=(\d*)/i,cookie:{set:function(e,t,r,n,a){z=new Date,z.setTime(z.getTime()+(r||0)),D.cookie=e+"="+E(t||"")+(r?"; expires="+z.toGMTString():"")+";path=/; domain="+(n||("localhost"==location.hostname?"":location.hostname))+(a?"; secure":"")},get:function(e){return(e=D.cookie.match(RegExp("(^|;)\\s*"+e+"=([^;]*)","i")))?decodeURIComponent(e[2]):""}},setCookie:function(e,t){this.cookie.set(e,t,31536e6,getHostName())},setSession:function(e,t){this.cookie.set(e,t,0,getHostName())},getJump:function(){var e=this.cookie.get("ipysession");return e&&(e=e.match(this.r))?parseInt(e[2]):0},setJump:function(e){var t=this.cookie.get("ipysession");t?t.match(this.r)?this.setSession("ipysession",t.replace(/jump=(\d*)/,"jump="+e)):this.setSession("ipysession",t+"&jump="+e):this.setSession("ipysession","jump="+e)},getInfo:function(e){var t=this.cookie.get(e);if(t)return t;try{if(W.localStorage&&localStorage.getItem(e))return localStorage.getItem(e)}catch(e){}return""},setInfo:function(e,t){if(null!=t&&""!=t){this.setCookie(e,t);try{W.localStorage&&localStorage.setItem(e,t)}catch(e){}}},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=W.location.search.substr(1).match(t);return null!=r?r[2]:""},getReferrerQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=D.referrer,n=r.indexOf("?")+1;r=n?r.substring(n):"";var a=r.match(t);return null!=a?a[2]:""},getP:function(){var e=pa.get("viewItem"),t=ipy.id?ipy.id:"";return e=e||t},getSession:function(){var e=ipy.getInfo("ipycookie");if(e&&null!=e){var t=ipy.getJump();return isNaN(t)||0!=t?(t++,ipy.setJump(t),"&s="+t):(ipy.setJump(t+1),"")}return""},css:{hasClass:function(e,t){for(var r=!1,n=this.getArrayOfClassNames(e),a=0;a<n.length;a++)t==n[a]&&(r=!0);return r},getArrayOfClassNames:function(e){var t=[];return e.className&&(t=e.className.split(" ")),t}},getElementsByClassName:function(e,t,r){if(D.getElementsByClassName)return t.getElementsByClassName(e);var n=null;n=r?r.getElementsByTagName("*"):t.getElementsByTagName("*");for(var a=[],i=0;i<n.length;i++){var o=n[i];ipy.css.hasClass(o,e)&&a.push(o)}return a},guid:function(){return"xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}};var pv=function(){var e,t=function(e,t){return""!==e?e+t.slice(0,1).toUpperCase()+t.slice(1):t},r=function(){var r=!1;return"number"==typeof window.screenX&&["webkit","moz","ms","o",""].forEach(function(n){0==r&&void 0!=document[t(n,"hidden")]&&(e=n,r=!0)}),r}(),n=function(){return!!r&&document[t(e,"hidden")]},a=function(){if(r)return document[t(e,"visibilityState")]};return{hidden:n(),state:a(),support:r,change:function(t,i){if(i=!1,r&&"function"==typeof t)return py.$.addEvent(D,e+"visibilitychange",function(e){this.hidden=n(),this.visibilityState=a(),t.call(this,e)}.bind(this),i)},total:0,visibilityTime:new Date,sumTime:function(){var e=new Date;return this.total=this.total+(e-this.visibilityTime),this.visibilityTime=e,this.total}}}(),sEle=function(e){var t=new RegExp("[a-zA-Z]*\\[\\s*name\\s*=.*\\]"),r=t.exec(e);if(null!=r){var n=r[0].replace(/\s+/g,"");e=e.replace(r[0],n)}e=e.replace(/\s+/g," ");for(var a=e.split(" "),i=[],o=0;o<a.length;o++)i=0==o?D:i,i=find(a[o],i);return i},getChild=function(e,t){for(var r,n=0;n<e.childNodes.length;n++)if(ch=e.childNodes[n],"#text"!=ch.nodeName){if(ch.getAttribute("id")==t)return ch;r=getChild(ch,t)}return r},find=function(e,t){switch(e.substr(0,1)){case"#":var r=e.substring(1);if(t.length){for(var n,a=0;a<t.length;a++){var i=getChild(t[a],r);if(i){n=i;break}}t=n}else t=t==D?D.getElementById(r):getChild(t,r);break;case".":var r=e.substring(1);if(t.length){for(var o=[],a=0;a<t.length;a++)for(var n=ipy.getElementsByClassName(r,t[a]),c=0;c<n.length;c++)o.push(n[c]);t=o}else t=ipy.getElementsByClassName(r,t);break;default:var s,u=new RegExp("=.*\\]"),l=u.exec(e);if(null!=l)if(l=l[0].substring(1,l[0].length-1),s=e.substring(0,e.indexOf("[")),l=l.replace(/'/g,"").replace(/"/g,""),t.length){for(var n,a=0;a<t.length;a++){var i=getNameChild(t[a],l,s);if(i){n=i;break}}t=n}else t=t==D?D.getElementsByName(l):getNameChild(t,l,s)}return t},getNameChild=function(e,t,r){for(var n,a=[],i=0;i<e.childNodes.length;i++)if(ch=e.childNodes[i],"#text"!=ch.nodeName)if(ch.localName==r&&ch.getAttribute("name")==t)a.push(ch);else{n=getNameChild(ch,t);for(var o=0;o<n.length;o++)a.push(n[o])}return a},cb="cb";py[cb]=function(e,t){try{b_i=new Ya,setExtraData(b_i),void 0==py.q&&(py.q=[]);for(var r=0;r<py.q.length;r++)"mapping"!=py.q[r][1]&&"clickParam"!=py.q[r][1]||execute(py.q[r]);cmf.cmFun(e),t&&0==t.code&&null!=t.data&&cvdFun(t.data);var n=pa.get("clickParam")&&pa.get("clickParam").cpk||"pyck",a=ipy.getQueryString(n)||ipy.getReferrerQueryString(n);a=a||ipy.getInfo("ipycookie"),ipy.setInfo("ipycookie",a),defaultRunning()}catch(e){}};var defaultRunning=function(){try{py=W[py_n]=clonePy(W,W._CommandName_,W[py_n]),defaultEventsInit(),exeFun()}catch(e){}},cvdFun=function(d){for(var i=0;i<d.t.length;i++){for(var s=d.t[i].s,t=d.t[i].t,z=!0,j=0;j<t.length;j++)switch(t[j].r){case 0:z=z&&!0;break;case 1:case 2:z=z&&urlReg(t[j],s);break;case 3:z=z&&click(t[j],s)}if(z)if(1==z)!function(){eval(s)}();else for(var k=0;k<z.length;k++)!function(){var j=s;U(z[k],"click",function(){try{eval(j)}catch(e){}})}()}},urlReg=function(e,t){var r=1==e.r?b_i.get(kb):b_i.get(lb);if(1==e.o){var n=e.v;if(null!=new RegExp(n).exec(r))return!0}return!1},click=function(e,t){if(2==e.o){var r=sEle(e.v);return void 0!=r&&null!=r&&(r=r.length?r:[r])}return!1},pa=new ee,cvt=new ee,_pl,setFun=function(e){for(var t=e[1],r=2;r<e.length;r++)r==e.length-1&&fa(e[r])?pa.set(t,Fa(e[r],pa.get(t))):setParam(e,r)},setParam=function(e,t){var r=e[1],n={},a=Qa.get(r).p;if("tid"==a[t-2]&&""!=e[t])return void(e.t=e[t]);n[a[t-2]]=e[t],"domain"==r?pa.set(r,n):"user"==r||"site"==r?pa.set(r,Fa(n,pa.get(r))):pa.setParam(r,n,a[t-2])},setEvent=function(e){var t=e[1];pa.get(t)&&pa.set(t,null),cvt.get(t)&&cvt.set(t,null);for(var r=2;r<e.length;r++)r==e.length-1&&fa(e[r])?("leads"!=t&&"custom"!=t&&"register"!=t||(e[r].id&&pa.setParam(t,{id:e[r].id},"id"),e[r].data&&pa.setParam(t,{dt:e[r].data},"dt"),e[r].customEvent&&pa.setParam(t,{ce:e[r].customEvent},"ce")),e[r].trackId&&(e.t=e[r].trackId,delete e[r].trackId),pa.set(t,Fa(e[r],pa.get(t)))):setParam(e,r);if("order"==t||"viewCart"==t||"purchase"==t){var n=pa.get(t);n.mn&&(pa.set(t,{mn:n.mn}),cvt.setParam(t,{Money:n.mn},"Money")),n.id&&(pa.setParam(t,{od:n.id},"od"),cvt.setParam(t,{OrderNo:n.id},"OrderNo")),_pl="";for(var a=0;a<n.it.length;a++){var i=n.it[a];_pl+=(i.id?i.id:"")+","+(i.ct?i.ct:"")+","+(i.pr?i.pr:"")+";"}""!=_pl&&(pa.setParam(t,{pl:_pl},"pl"),cvt.setParam(t,{ProductList:_pl},"ProductList"))}if("leads"==t||"custom"==t||"register"==t){var n=pa.get(t).dt,o=[];pa.get(t).id&&cvt.setParam(t,{OrderNo:pa.get(t).id},"OrderNo");for(i in n)o.push(n[i]?i+"="+n[i]:"");0!=o.length&&cvt.setParam(t,{ProductList:o.join("&")},"ProductList")}if(e.t)sendTrack(e);else{b_i=new Ya,setExtraData(b_i),pa.get("user")&&pa.get("user").ca&&(cvt.setParam("user",{pv:pa.get("user").ca},"pv"),delete pa.get("user").ca);for(var c="",s=pa.get("domain")?pa.get("domain").d:"http://fm.ipinyou.com/j/stats.ipinyou.com",u=kaa(s)?s:[s],l=cvt.get("user")&&cvt.get("user").pv?"&pv="+E(cvt.get("user").pv):"",f=getPi_p(t),a=0;a<u.length;a++)c=("https:"==location.protocol?"https":"http")+"://"+u[a]+"/adv?a="+E(py.a)+f+(ipy.getInfo("ipycookie")?"&c="+ipy.getInfo("ipycookie"):"")+ipy.getSession()+(b_i.get(kb)?"&u="+E(b_i.get(kb)):"")+l+(b_i.get(lb)?"&r="+E(b_i.get(lb)):"")+"&rd="+(new Date).getTime()+"&v=2&e="+E(b_serialize(0,t,f)),p(c)}},sendTrack=function(e){if(e.t){var t="array"==Ca(e.t)&&e.t.length>0&&e.t[0].length>0?e.t[0][0]:"string"==Ca(e.t)?e.t:"";if(""!=t){var r=e[1];b_i=new Ya,setExtraData(b_i),pa.get("user")&&pa.get("user").ca&&(cvt.setParam("user",{pv:pa.get("user").ca},"pv"),delete pa.get("user").ca);var n,a,i="",a=pa.get("domain")?pa.get("domain").d:"http://fm.ipinyou.com/j/stats.ipinyou.com",o=kaa(a)?a:[a],c=cvt.get("user")&&cvt.get("user").pv?"&pv="+E(cvt.get("user").pv):"",s=getPi_p(r),u=b_i.get(kb),l=b_i.get(lb)?b_i.get(lb):"",f=D.cookie,d=f.match(/(^|;)\s*ipycookie=([^;]*)/),g=f.match(/(^|;)\s*ipysession=([^;]*)/);W.parent!=W&&(n=u,u=l,l=n);for(var v=0;v<o.length;v++)i=("https:"==location.protocol?"https":"http")+"://"+o[v]+"/cvt?a="+E(t)+(d?"&c="+E(d[2]):"")+(g?"&s="+E(g[2].match(/jump\%3D(\d+)/)[1]):"")+(b_i.get(kb)?"&u="+E(b_i.get(kb)):"")+(l?"&r="+E(l):"")+"&rd="+(new Date).getTime()+cvtE(r)+"&v=2&e="+E(b_serialize(1,r,s)+c),p(i)}}},execute=function(e){try{if(e&&e.length<2)return;if(py.l!=py.L)return void py.q.push(e);switch(e[0]){case"set":return setFun(e);case"event":return setEvent(e)}}catch(e){}},b_serialize=function(e,t,r){if(pa.get("extend")&&""!=pa.get("extend").e)return"e="+pa.get("extend").e;for(var n=b_i.data.keys,a="",i=[],o=0;o<n.length;o++)if(n[o]!=kb&&n[o]!=lb){var c=b_i.get(n[o]);void 0!=c&&i.push(Qa.get(n[o]).F+"="+E(c))}if(a+=i.join("&"),a+=pa.get("user")&&Ha(pa.get("user"))?"&ur="+E(Ha(pa.get("user"))):"",a+=pa.get("site")&&Ha(pa.get("site"))?"&st="+E(Ha(pa.get("site"))):"",pv.support?a+="&vb=1&vbt="+(pv.hidden?pv.total:pv.sumTime()):a+="&vb=0",a+="&sp="+max_sp,void 0!=t||""!=t){var s=pa.get(t);a+=t?"&ev="+Qa.get(t).F:"",a+=1==e&&"custom"==t&&s&&s.ce?"&ce="+s.ce:"",a+=t?0==e?""==r&&s&&Ha(s)?"&ep="+E(Ha(s)):"":cvt.get(t)&&cvt.get(t).ProductList?"":s&&"viewItem"!=t&&"custom"!=t?"&ep="+E(Ha(s)):"":""}return a},cvtE=function(e){var t=cvt.get(e),r=[];if(t)for(var n in t)Ea(t,n)&&t[n]&&r.push(n+"="+E(t[n]));return 0!=r.length?"&"+r.join("&"):""},getPi_p=function(e){var t="";if("viewItem"==e){var r=pa.get(e);if(void 0!=r){t=pa.get(e).pn?"&p="+pa.get(e).pn:"";var n=r.pis&&r.pis.replace("x","X").split("X"),a=r.ms&&r.ms.replace("x","X").split("X");delete pa.get(e).pis,delete pa.get(e).ms,n&&2==n.length&&(pa.setParam(e,{pw:n[0]},"pw"),pa.setParam(e,{ph:n[1]},"ph")),a&&2==a.length&&(pa.setParam(e,{mw:a[0]},"mw"),pa.setParam(e,{mh:a[1]},"mh"));var i,o=0;for(i in pa.get(e))Ea(pa.get(e),i)&&o++;t+=""==Ha(pa.get(e))||1==o&&pa.get(e).pn||isIE678()?"":"&pi="+E(Ha(pa.get(e)))}}else"collect"!=e&&"addCart"!=e||(t+=void 0!=pa.get(e)&&void 0!=pa.get(e).id?"&p="+Qa.get(e).F+":"+pa.get(e).id:"");return t},removeFun=function(e){var t=[];if(kaa(e))for(var r=e.length-1;r>=0;r--){var n=e[r];if("remove"==n[0])t.push(n),e.splice(r,1);else for(var a=0;a<t.length;a++)if(n[0]==t[a][1]&&n[1]==t[a][2]){e.splice(r,1);break}}},isIE678=function(){if("Microsoft Internet Explorer"==navigator.appName&&/MSIE[678]/.test(navigator.appVersion.split(";")[1].replace(/[ ]/g,"")))return!0;return!1},RR=function(e,t,r,n){return e.removeEventListener?e.removeEventListener(t,r,!!n):e.detachEvent&&e.detachEvent("on"+t,r)},exeFun=function(){var e=dcpy(py.q);py.q=[],removeFun(e);for(var t=0;t<e.length;t++)for(var r=t+1;r<e.length;r++)if("set"!=e[t][0]&&"set"==e[r][0]){var n=e[t];e[t]=e[r],e[r]=n}for(var t=0;t<e.length;)"mapping"==e[t][1]&&"default"==e[t][1]||execute(e[t]),e.splice(t,1)},dcpy=function(e){var t="array"==Ca(e)?[]:{};for(var r in e){var n=e[r],a=Ca(n);t[r]="array"==a||"object"==a?dcpya(n):e[r]}return t},dcpya=function(e){for(var t={},r=0;r<e.length;r++)t[r]=e[r];return e.t&&(t.t=e.t),t.length=e.length,t};py.$={addEvent:U,removeEvent:RR,selector:sEle,e:execute,t:sendTrack,getCookie:ipy.cookie.get,setCookie:ipy.setCookie,pv:pv};var defaultEventsInit=function(){for(var e=0;e<py.q.length;e++)"default"==py.q[e][1]&&execute(py.q[e]);if(void 0!=pa.get("default")){var t=pa.get("default").events;if(pv.support&&hasValue(t,"standingTime")){var r=null;pv.hidden||(r=setTimeout(py_n+"('event','standingTime')",5e3)),pv.change(function(){if(clearTimeout(r),"visible"==this.visibilityState){pv.visibilityTime=new Date;var e=5e3-pv.total;e>0&&(r=setTimeout(py_n+"('event','standingTime')",e))}"hidden"==this.visibilityState&&pv.sumTime()})}!seFlag&&hasValue(t,"scrollEvent")&&U(W,"scroll",spF)}};cp(py.$,ipy);var cu,cdid;void 0==py.q&&(py.q=[]);for(var i=0;i<py.q.length;i++)"clickParam"==py.q[i][1]&&(cu=py.q[i][2]);if(cu=cu||"pyck",d=ipy.getQueryString(cu)||ipy.getReferrerQueryString(cu),d=d||ipy.getInfo("ipycookie"),ipy.setInfo("ipycookie",d),cdid=ipy.getInfo("ipydeviceid"),_setIpydeviceid(),py.r?defaultRunning():p(("https:"==location.protocol?"https":"http")+"://stats.ipinyou.com/presadv?a="+E(py.a)+"&cb="+py_n+"."+cb,function(e){},function(){},defaultRunning),"interactive"==D.readyState&&!D.createEventObject||"complete"==D.readyState)rf();else{if(U(D,"DOMContentLoaded",rf),U(D,"readystatechange",rf),D.createEventObject&&D.documentElement.doScroll){var Zk=!0;try{Zk=!W.frameElement}catch(e){}Zk&&tf()}U(W,"load",rf)}"complete"===D.readyState?Af():U(W,"load",Af)}catch(e){}}(window,document,encodeURIComponent);