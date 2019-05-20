"use strict";var precacheConfig=[["/0b4ac1dc75df35e169b70d7719afe4cc.ttf","0b4ac1dc75df35e169b70d7719afe4cc"],["/5bee74caefdf9d0a834915f6c8eeb259.svg","5bee74caefdf9d0a834915f6c8eeb259"],["/651771e1df95c807c99608188d0a4287.woff","651771e1df95c807c99608188d0a4287"],["/assets/animate.css","8dbc6dc67b4724087e6d907ff95ac6db"],["/assets/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/assets/fonts/notification.eot","c0d3c94cd6112550c51d7d1ed13b9da1"],["/assets/fonts/notification.svg","5bee74caefdf9d0a834915f6c8eeb259"],["/assets/fonts/notification.ttf","0b4ac1dc75df35e169b70d7719afe4cc"],["/assets/fonts/notification.woff","651771e1df95c807c99608188d0a4287"],["/assets/icons/android-chrome-192x192.png","59e221032ab061cad83b6ce2bcddbde8"],["/assets/icons/android-chrome-512x512.png","cf3fdf7af60a294d6d3f48cb7ad82488"],["/assets/icons/apple-touch-icon.png","a0e46feb3cc577478b127936e739dd08"],["/assets/icons/favicon-16x16.png","d712b605ed58419c7e6d4ab885d147b7"],["/assets/icons/favicon-32x32.png","2f7ce797cf8f198dedb9a9f38b7ef13b"],["/assets/icons/mstile-150x150.png","ba817517b2c4e1ba1ce802c4d4fafdb4"],["/assets/images/VRK log 300x300.png","012c9a0bd72e513d83f14e9a4383dd09"],["/assets/images/bg_1557664612132.png","760d1b2e1beb73a4df2977436ec92a7f"],["/assets/images/board_first.png","36e8437e02f86d829e576962ae0c13d6"],["/assets/images/lithuania.svg","7d3e68bf54ed378d1cff6d8537d25151"],["/assets/images/lithuania_board.svg","10f7db93808b8c3c832cccb28c313a75"],["/assets/images/logo.png","c12453b0b928759b7f3a6912609100a3"],["/assets/images/logo_ek.svg","486e747c586ad739fdaf6bad762f806e"],["/assets/images/lt.svg","060b2ea06e5bfb243806b19b0db87e8d"],["/assets/images/new.png","0343aa74913a482b0ce66de39a7b7ced"],["/assets/images/vote4art logo.png","a12ef01f0eef6b680196886266a32488"],["/assets/notifications.css","8e1784176e85c0c08a32a9fbc62e533e"],["/bundle.710b7.js","5b4ca742b49eecb689fc4c9f0943a2e8"],["/c0d3c94cd6112550c51d7d1ed13b9da1.eot","c0d3c94cd6112550c51d7d1ed13b9da1"],["/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/index.html","2ad9a91c80dc049ff388da1bd67ae416"],["/manifest.json","3b2480ba2a4724cd6f4c890c5de71e16"],["/route-404.chunk.dbbff.js","5ab2d912bf23d9e7024aa1aaecb10750"],["/route-game.chunk.78ec9.js","48b253c1fe6cdb5271db81a8a749c402"],["/style.1008f.css","318f9b7dbfbc61879871b38951c8ee84"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],s=new URL(a,self.location),n=createCacheKey(s,hashParamName,t,!1);return[s.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var s=new Request(t,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});