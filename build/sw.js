"use strict";var precacheConfig=[["/assets/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/assets/icons/android-chrome-192x192.png","59e221032ab061cad83b6ce2bcddbde8"],["/assets/icons/android-chrome-512x512.png","cf3fdf7af60a294d6d3f48cb7ad82488"],["/assets/icons/apple-touch-icon.png","a0e46feb3cc577478b127936e739dd08"],["/assets/icons/favicon-16x16.png","d712b605ed58419c7e6d4ab885d147b7"],["/assets/icons/favicon-32x32.png","2f7ce797cf8f198dedb9a9f38b7ef13b"],["/assets/icons/mstile-150x150.png","ba817517b2c4e1ba1ce802c4d4fafdb4"],["/assets/images/bg_1557664612132.png","760d1b2e1beb73a4df2977436ec92a7f"],["/assets/images/board_first.png","36e8437e02f86d829e576962ae0c13d6"],["/assets/images/lithuania.svg","7d3e68bf54ed378d1cff6d8537d25151"],["/assets/images/lithuania_board.svg","10f7db93808b8c3c832cccb28c313a75"],["/assets/images/logo.png","4f8238c5f11c658f43d9edeb817dd55c"],["/assets/images/lt.svg","060b2ea06e5bfb243806b19b0db87e8d"],["/assets/images/test_image.png","1eef221e28d65a719bfa70ff1bd50a0c"],["/assets/images/vote4art_logo.png","c12453b0b928759b7f3a6912609100a3"],["/bundle.da34f.js","cee1d64a5406313ea11fc4d6ac24c48c"],["/favicon.ico","53ac170e970ad034a55ee15ce198708c"],["/index.html","6d2814321c88d7c6c521070a653ff762"],["/manifest.json","3b2480ba2a4724cd6f4c890c5de71e16"],["/route-404.chunk.64fbe.js","e36005664c57a59dea83c0d9e2b60c22"],["/route-game.chunk.cffe2.js","d74dea7109334da198b82e68916f3e5e"],["/route-home.chunk.54108.js","c4a61eea05521839449d3a84ef6836c5"],["/route-registration.chunk.33fd6.js","e85283bd9cc87cfe1c869538be7b804c"],["/style.6494c.css","24c94485ee2b5d21149bb5d3f13dfff3"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var s=new URL(e);return a&&s.pathname.match(a)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),s=createCacheKey(a,hashParamName,n,!1);return[a.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});