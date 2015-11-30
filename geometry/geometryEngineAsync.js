// COPYRIGHT © 2015 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
define("require exports esri/kernel module esri/geometry/Geometry esri/geometry/Polygon esri/geometry/Polyline esri/geometry/Point esri/geometry/Extent esri/geometry/Multipoint esri/workers/WorkerClient dojo/Deferred".split(" "),function(e,r,t,n,i,o,s,a,u,c,l,f){function m(e){if(void 0===a.fromJson){if(void 0!==e.x&&void 0!==e.y)return new a(e);if(void 0!==e.paths)return new s(e);if(void 0!==e.rings)return new o(e);if(void 0!==e.points)return new c(e);if(void 0!==e.xmin&&void 0!==e.ymin&&void 0!==e.xmax&&void 0!==e.ymax)return new u(e)}else{if(void 0!==e.x&&void 0!==e.y)return a.fromJson(e);if(void 0!==e.paths)return s.fromJson(e);if(void 0!==e.rings)return o.fromJson(e);if(void 0!==e.points)return c.fromJson(e);if(void 0!==e.xmin&&void 0!==e.ymin&&void 0!==e.xmax&&void 0!==e.ymax)return u.fromJson(e)}}function g(e,r){var t;if(null==e||void 0===e)return e;if("number"==typeof e)return e;var n=e.toString();if(""===n)return null;if(2==r){if(t=E[n],void 0!==t)return t}else if(0==r){if(t=y[n],void 0!==t)return t;if(t=b[e],void 0!==t)return t}else if(3==r&&(t=y[n],void 0!==t))return t;if(1==r&&(t=b[e],void 0!==t))return t;if(!0===/^\d+$/.test(n))return parseInt(n);throw Error("Unrecognised Unit Type")}function p(e){if(void 0!==e&&null!==e)switch(e){case"loxodrome":return 1;case"great-elliptic":return 2;case"normal-section":return 3;case"shape-preserving":return 4}return 0}function v(e){if(null===e||void 0===e)return null;if(w)switch(e.type){case"point":return{x:e.x,y:e.y,z:e.z,m:e.m};case"multipoint":return{points:e.points,hasZ:e.hasZ,hasM:e.hasM};case"polyline":return{paths:e.paths,hasZ:e.hasZ,hasM:e.hasM};case"polygon":return{rings:e.rings,hasZ:e.hasZ,hasM:e.hasM};case"extent":return{xmin:e.xmin,ymin:e.ymin,xmax:e.xmax,ymax:e.ymax,zmin:e.zmin,zmax:e.zmax,mmin:e.mmin,mmax:e.mmax}}else switch(e.type){case"point":return{x:e.x,y:e.y};case"multipoint":return{points:e.points};case"polyline":return{paths:e.paths};case"polygon":return{rings:e.rings};case"extent":return{xmin:e.xmin,ymin:e.ymin,xmax:e.xmax,ymax:e.ymax}}return null}function h(e,r){if(null===e)return null;var t=m(e);return w?t.set("spatialReference",r):t.setSpatialReference(r),t}function d(e){return null==e||void 0===e?null:-1!=e.wkid&&null!==e.wkid&&void 0!==e.wkid?{wkid:e.wkid}:""!==e.wkt&&void 0!==e.wkt&&null!==e.wkt?{wkt:e.wkt}:null}function R(e,r,t){var n=new f,i=r.spatialReference;return A.a({action:e,geoma:v(r),geomb:v(t),spatialReference:d(r.spatialReference)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(h(e.result,i))},function(e){n.reject(e)}),n.promise}function x(e,r,t){var n=new f;return A.a({action:e,geoma:v(r),geomb:v(t),spatialReference:d(r.spatialReference)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(e.result)},function(e){n.reject(e)}),n.promise}var j,w=0==t.version.indexOf("4.");!function(e){e[e.Linear=0]="Linear",e[e.Angular=1]="Angular",e[e.Area=2]="Area",e[e.LinearOrAngular=3]="LinearOrAngular"}(j||(j={}));var y={feet:9002,kilometers:9036,meters:9001,miles:9035,"nautical-miles":9030,yards:9096},E={acres:109402,ares:109463,hectares:109401,"square-feet":109405,"square-kilometers":109414,"square-meters":109404,"square-miles":109413,"square-yards":109442},b={degrees:9102,radians:9101},k=function(){function r(){this.c=!1,this.j=null,this.j=new l(this.l(),!1)}return r.prototype.l=function(){return e.A?e.A("./geometryenginewebworker"):n.id.replace(/\/[^\/]*$/gi,"/")+"./geometryenginewebworker"},r}(),A=function(){function e(){}return e.a=function(r){var t=new f;return e.h.push({task:r,d:t}),e.f(),t.promise},e.f=function(){if(0<e.h.length){for(var r=null,t=0;t<e.b.length;t++)if(!1===e.b[t].c){r=e.b[t];break}if(null===r&&e.b.length<e.g&&(r=new k,e.b.push(r)),null!==r){var n=this.h.shift();r.c=!0,r.j.postMessage(n.task).then(function(t){r.c=!1;try{n.d.resolve(t)}catch(i){}e.f()},function(t){r.c=!1;try{n.d.reject(t)}catch(i){}e.f()})}}},e.b=[],e.h=[],e.g=4,e}();return function(){function e(){}return e._removeAllWorkers=function(){A.b=[]},e._setMaxWorkers=function(r){e._removeAllWorkers(),A.g=r},e._getMaxWorkers=function(){return A.g},e._getNumWorkers=function(){return A.b.length},e.extendedSpatialReferenceInfo=function(e){var r=new f;return A.a({action:"extendedspatialreferenceinfo",spatialReference:d(e)}).then(function(e){0===e.status?r.reject(Error(e.error.message)):r.resolve(e.result)},function(e){r.reject(e)}),r.promise},e.equals=function(e,r){return null===e&&null!==r||null===r&&null!==e?!1:x("equals",e,r)},e.intersects=function(e,r){if(null===e||null===r)throw Error("Illegal Argument Exception");return x("intersects",e,r)},e.touches=function(e,r){if(null===e||null===r)throw Error("Illegal Argument Exception");return x("touches",e,r)},e.within=function(e,r){if(null===e||null===r)throw Error("Illegal Argument Exception");return x("within",e,r)},e.disjoint=function(e,r){if(null===e||null===r)throw Error("Illegal Argument Exception");return x("disjoint",e,r)},e.overlaps=function(e,r){if(null===e||null===r)throw Error("Illegal Argument Exception");return x("overlaps",e,r)},e.crosses=function(e,r){if(null===e||null===r)throw Error("Illegal Argument Exception");return x("crosses",e,r)},e.contains=function(e,r){if(null===e||null===r)throw Error("Illegal Argument Exception");return x("contains",e,r)},e.isSimple=function(e){return x("issimple",e,null)},e.clip=function(e,r){return R("clip",e,r)},e.simplify=function(e){var r=new f,t=e.spatialReference;return A.a({action:"simplify",geoma:v(e),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?r.reject(Error(e.error.message)):r.resolve(h(e.result,t))},function(e){r.reject(e)}),r.promise},e.rotate=function(e,r,t){var n=new f,i=e.spatialReference;if(void 0===t||null===t)switch(e.type){case"point":t=e;break;case"extent":t=w?e.get("center"):e.getCenter();break;default:t=w?e.get("extent").get("center"):e.getExtent().getCenter()}return A.a({action:"rotate",geoma:v(e),spatialReference:d(e.spatialReference),angle:r,rotpt:v(t)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(h(e.result,i))},function(e){n.reject(e)}),n.promise},e.flipHorizontal=function(e,r){var t=new f,n=e.spatialReference;if(void 0===r||null===r)switch(e.type){case"point":r=e;break;case"extent":r=w?e.get("center"):e.getCenter();break;default:r=w?e.get("extent").get("center"):e.getExtent().getCenter()}return A.a({action:"fliph",geoma:v(e),spatialReference:d(e.spatialReference),flippt:v(r)}).then(function(e){0===e.status?t.reject(Error(e.error.message)):t.resolve(h(e.result,n))},function(e){t.reject(e)}),t.promise},e.flipVertical=function(e,r){var t=new f,n=e.spatialReference;if(void 0===r||null===r)switch(e.type){case"point":r=e;break;case"extent":r=w?e.get("center"):e.getCenter();break;default:r=w?e.get("extent").get("center"):e.getExtent().getCenter()}return A.a({action:"flipv",geoma:v(e),spatialReference:d(e.spatialReference),flippt:v(r)}).then(function(e){0===e.status?t.reject(Error(e.error.message)):t.resolve(h(e.result,n))},function(e){t.reject(e)}),t.promise},e.distance=function(e,r,t){var n=new f;return A.a({action:"distance",geoma:v(e),geomb:v(r),spatialReference:d(e.spatialReference),distanceunits:g(t,3)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(e.result)},function(e){n.reject(e)}),n.promise},e.relate=function(e,r,t){var n=new f;return A.a({action:"relate",geoma:v(e),geomb:v(r),relation:t,spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(e.result)},function(e){n.reject(e)}),n.promise},e.nearestCoordinate=function(e,r,t){var n=new f,i=e.spatialReference;return A.a({action:"nearestcoord",geoma:v(e),geomb:v(r),spatialReference:d(e.spatialReference),testinterior:void 0===t?!0:t}).then(function(e){0===e.status?n.reject(Error(e.error.message)):(e.result.coordinate=h(e.result.coordinate,i),n.resolve(e.result))},function(e){n.reject(e)}),n.promise},e.nearestVertex=function(e,r){var t=new f,n=e.spatialReference;return A.a({action:"nearestvertex",geoma:v(e),geomb:v(r),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?t.reject(Error(e.error.message)):(e.result.coordinate=h(e.result.coordinate,n),t.resolve(e.result))},function(e){t.reject(e)}),t.promise},e.nearestVertices=function(e,r,t,n){var i=new f,o=e.spatialReference;return A.a({action:"nearestvertices",geoma:v(e),geomb:v(r),spatialReference:d(e.spatialReference),searchradius:t,maxreturn:n}).then(function(e){if(0===e.status)i.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r].coordinate=h(e.result[r].coordinate,o);i.resolve(e.result)}},function(e){i.reject(e)}),i.promise},e.cut=function(e,r){var t=new f,n=e.spatialReference;return A.a({action:"cut",geoma:v(e),geomb:v(r),spatialReference:d(e.spatialReference)}).then(function(e){if(0===e.status)t.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r]=h(e.result[r],n);t.resolve(e.result)}},function(e){t.reject(e)}),t.promise},e.generalize=function(e,r,t,n){var i=new f,o=e.spatialReference;return A.a({action:"generalize",geoma:v(e),maxdeviation:r,removedegenerateparts:t,maxdeviationunit:g(n,3),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?i.reject(Error(e.error.message)):i.resolve(h(e.result,o))},function(e){i.reject(e)}),i.promise},e.densify=function(e,r,t){var n=new f,i=e.spatialReference;return A.a({action:"densify",geoma:v(e),maxsegmentlength:r,maxsegmentlengthunit:g(t,3),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(h(e.result,i))},function(e){n.reject(e)}),n.promise},e.geodesicDensify=function(e,r,t,n){void 0===n&&(n=0);var i=new f,o=e.spatialReference;return A.a({action:"geodensify",geoma:v(e),maxsegmentlength:r,maxsegmentlengthunit:g(t,3),spatialReference:d(e.spatialReference),curveType:n}).then(function(e){0===e.status?i.reject(Error(e.error.message)):i.resolve(h(e.result,o))},function(e){i.reject(e)}),i.promise},e.intersect=function(r,t){return r instanceof i?R("intersect",r,t):e.u(r,t)},e.u=function(e,r){for(var t=new f,n=[],i=0;i<e.length;i++)n.push(v(e[i]));var o=r.spatialReference;return A.a({action:"intersectmany",geom:v(r),geometries:n,spatialReference:d(r.spatialReference)}).then(function(e){if(0===e.status)t.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r]=h(e.result[r],o);t.resolve(e.result)}},function(e){t.reject(e)}),t.promise},e.difference=function(r,t){return r instanceof i?R("difference",r,t):e.s(r,t)},e.s=function(e,r){for(var t=new f,n=[],i=0;i<e.length;i++)n.push(v(e[i]));var o=r.spatialReference;return A.a({action:"differencemany",geom:v(r),geometries:n,spatialReference:d(r.spatialReference)}).then(function(e){if(0===e.status)t.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r]=h(e.result[r],o);t.resolve(e.result)}},function(e){t.reject(e)}),t.promise},e.symmetricDifference=function(r,t){return r instanceof i?R("symdifference",r,t):e.w(r,t)},e.w=function(e,r){for(var t=new f,n=[],i=0;i<e.length;i++)n.push(v(e[i]));var o=r.spatialReference;return A.a({action:"symdifferencemany",geom:v(r),geometries:n,spatialReference:d(r.spatialReference)}).then(function(e){if(0===e.status)t.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r]=h(e.result[r],o);t.resolve(e.result)}},function(e){t.reject(e)}),t.promise},e.union=function(e,r){void 0===r&&(r=null);var t=new f,n=[];if(null===e)return t.resolve(null),t.promise;if(e instanceof i&&(e=[e],null!==r&&e.push(r)),0===e.length)return t.resolve(null),t.promise;for(var o=0;o<e.length;o++)n.push(v(e[o]));var s=e[0].spatialReference;return A.a({action:"unionmany",geometries:n,spatialReference:d(s)}).then(function(e){0===e.status?t.reject(Error(e.error.message)):t.resolve(h(e.result,s))},function(e){t.reject(e)}),t.promise},e.buffer=function(r,t,n,o){if(void 0===o&&(o=!1),r instanceof i){var s=new f,a=r.spatialReference;return A.a({action:"buffer",geoma:v(r),spatialReference:d(r.spatialReference),distance:t,unit:g(n,3),geodesic:!1,geodesicmaxdeviation:0/0,geodesiccurvetype:0}).then(function(e){0===e.status?s.reject(Error(e.error.message)):s.resolve(h(e.result,a))},function(e){s.reject(e)}),s.promise}if("[object Array]"!==Object.prototype.toString.call(t)){for(var u=[],c=0;c<r.length;c++)u.push(t);t=u}if(t.length!=r.length){if(0==t.length)throw Error("Illegal Argument Exception");for(var u=[],l=0,c=0;c<r.length;c++)void 0===t[c]?u.push(l):(u.push(t[c]),l=t[c]);t=u}return e.i(r,t,n,!1,o,"geodesic",0/0)},e.geodesicBuffer=function(r,t,n,o,s,a){if(r instanceof i){var u=new f;void 0===s&&(s=0/0);var c=r.spatialReference;return A.a({action:"buffer",geoma:v(r),spatialReference:d(r.spatialReference),distance:t,unit:g(n,0),geodesic:!0,geodesicmaxdeviation:s,geodesiccurvetype:p(o)}).then(function(e){0===e.status?u.reject(Error(e.error.message)):u.resolve(h(e.result,c))},function(e){u.reject(e)}),u.promise}if("[object Array]"!==Object.prototype.toString.call(t)){for(var l=[],m=0;m<r.length;m++)l.push(t);t=l}if(t.length!=r.length){if(0==t.length)throw Error("Illegal Argument Exception");for(var l=[],R=0,m=0;m<r.length;m++)void 0===t[m]?l.push(R):(l.push(t[m]),R=t[m]);t=l}return e.i(r,t,n,!0,o,s,a)},e.i=function(e,r,t,n,i,o,s){var a=new f,u=[];if(void 0===s&&(s=0/0),null===e||0===e.length)return a.resolve(null),a.promise;for(var c=0;c<e.length;c++)u.push(v(e[c]));t=n?g(t,0):g(t,3);var l=e[0].spatialReference;return A.a({action:"buffermany",geometries:u,spatialReference:d(l),distances:r,tounionresults:i,unit:t,geodesic:n,geodesicmaxdeviation:s,geodesiccurvetype:p(o)}).then(function(e){if(0===e.status)a.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r]=h(e.result[r],l);a.resolve(e.result)}},function(e){a.reject(e)}),a.promise},e.convexHull=function(r,t){if(void 0===t&&(t=!1),r instanceof i){var n=new f,o=r.spatialReference;return A.a({action:"convexhull",geoma:v(r),spatialReference:d(r.spatialReference)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(h(e.result,o))},function(e){n.reject(e)}),n.promise}return e.o(r,t)},e.o=function(e,r){for(var t=new f,n=[],i=0;i<e.length;i++)n.push(v(e[i]));var o=0<e.length?e[0].spatialReference:null;return A.a({action:"convexhullmany",geometries:n,merge:r}).then(function(e){if(0===e.status)t.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r]=h(e.result[r],o);t.resolve(e.result)}},function(e){t.reject(e)}),t.promise},e.offset=function(r,t,n,o,s,a){var u=0;if(null!=o&&void 0!=o)switch(o){case"round":u=0;break;case"bevel":u=1;break;case"miter":u=2;break;case"square":u=3}if(r instanceof i){var c=new f,l=r.spatialReference;return A.a({action:"offset",geoma:v(r),spatialReference:d(r.spatialReference),distance:t,joins:u,bevelratio:s,flattenerror:a,offsetunit:g(n,3)}).then(function(e){0===e.status?c.reject(Error(e.error.message)):c.resolve(h(e.result,l))},function(e){c.reject(e)}),c.promise}return e.v(r,t,n,u,s,a)},e.v=function(e,r,t,n,i,o){for(var s=new f,a=[],u=0;u<e.length;u++)a.push(v(e[u]));var c=0<e.length?e[0].spatialReference:null;return A.a({action:"offsetmany",geometries:a,spatialReference:d(c),distance:r,joins:n,bevelratio:i,offsetunit:g(t,3),flattenerror:o}).then(function(e){if(0===e.status)s.reject(Error(e.error.message));else{for(var r=0;r<e.result.length;r++)e.result[r]=h(e.result[r],c);s.resolve(e.result)}},function(e){s.reject(e)}),s.promise},e.planarArea=function(e,r){var t=new f;return A.a({action:"area",geoma:v(e),unit:g(r,2),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?t.reject(Error(e.error.message)):t.resolve(e.result)},function(e){t.reject(e)}),t.promise},e.planarLength=function(e,r){var t=new f;return A.a({action:"length",geoma:v(e),unit:g(r,3),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?t.reject(Error(e.error.message)):t.resolve(e.result)},function(e){t.reject(e)}),t.promise},e.geodesicArea=function(e,r,t){var n=new f;return A.a({action:"geodesicarea",geoma:v(e),unit:g(r,2),geodesiccurvetype:p(t),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(e.result)},function(e){n.reject(e)}),n.promise},e.geodesicLength=function(e,r,t){var n=new f;return A.a({action:"geodesiclength",geoma:v(e),unit:g(r,0),geodesiccurvetype:p(t),spatialReference:d(e.spatialReference)}).then(function(e){0===e.status?n.reject(Error(e.error.message)):n.resolve(e.result)},function(e){n.reject(e)}),n.promise},e}()});