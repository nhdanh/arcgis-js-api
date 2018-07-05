// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","dojo/string","../../../../../core/promiseUtils","../../../../support/heatmapUtils","../../../../../support/arcadeUtils","../../../../../tasks/support/ClassBreaksDefinition","../../../../../tasks/support/generateRendererUtils"],function(e,a,n,t,r,i,o,l){function u(e){var a=e&&e.features,n=a&&a[0]&&a[0].attributes,t={};for(var r in n)t[r.replace(O,"").toLowerCase()]=n[r];return t.min===t.max&&null!=t.min&&null==t.stddev&&(t.stddev=t.variance=0),t}function s(e,a,n){var t=m(e,a);t=c(t,e.minValue,e.maxValue);var r=f(t,!e.normalizationType);return n&&["avg","stddev","variance"].forEach(function(e){null!=r[e]&&(r[e]=Math.ceil(r[e]))}),r}function c(e,a,n){return a=null==a?-1/0:a,n=null==n?1/0:n,e.filter(function(e){if(null!=e&&q(e)&&e>=a&&e<=n)return e})}function m(e,a){var n=e.field,t="function"==typeof n,r=e.valueExpression,o=i.createFunction(r),l=e.normalizationType,u=e.normalizationField,s=e.normalizationTotal,c=[],m=e.view,f=m&&i.getViewInfo({viewingMode:"2d"===m.type?"map":m.viewingMode,scale:m.scale,spatialReference:m.spatialReference});return a?(a.forEach(function(e){var a,m=e.attributes;if(r){var d=i.createExecContext(e,f);a=i.executeFunction(o,d)}else t?a=n.call(null,e):m&&(a=m[n]);if(l&&null!=a&&q(a)){var v=m&&parseFloat(m[u]);"log"===l&&0!==a?a=Math.log(a)*Math.LOG10E:"percent-of-total"===l&&q(s)&&0!==s?a=a/s*100:"field"===l&&q(v)&&0!==v&&(a/=v)}c.push(a)}),c):c}function f(e,a){for(var n=Number.POSITIVE_INFINITY,t=Number.NEGATIVE_INFINITY,r=null,i=null,o=null,l=null,u=0,s=e;u<s.length;u++){var c=s[u];r+=c,n=Math.min(n,c),t=Math.max(t,c)}var m=e.length;if(m){i=r/m;for(var f=0,d=0,v=e;d<v.length;d++){var c=v[d];f+=Math.pow(c-i,2)}l=a?m>1?f/(m-1):0:m>0?f/m:0,o=Math.sqrt(l)}else n=null,t=null;return{avg:i,count:m,max:t,min:n,stddev:o,sum:r,variance:l}}function d(e){var n;for(n in e)a.statisticTypes.indexOf(n)>-1&&(q(e[n])||(e[n]=null));return e}function v(e){var a=e.field,n=e.classificationMethod||G,t=e.normalizationType,r=e.normalizationField,i=new o;return i.classificationField=a,i.breakCount=e.breakCount,i.classificationMethod=n,i.standardDeviationInterval="standard-deviation"===n?e.standardDeviationInterval||Y:void 0,i.normalizationType=t,i.normalizationField="field"===t?r:void 0,i}function p(e,a,n,t,i,o){void 0===a&&(a=10);for(var l=new Float64Array(i*o),u=r.createKernel(a),s=Math.round(4.5*a),c=Number.POSITIVE_INFINITY,m=Number.NEGATIVE_INFINITY,f=null,d=0,v=0,p=0,h=0,g=0,x=r.createValueFunction(t,n),T=0,V=e;T<V.length;T++)for(var y=V[T],F=y.geometry,b=y.attributes,M=F.x-s,E=F.y-s,z=Math.max(0,M),I=Math.max(0,E),C=Math.min(o,F.y+s),S=Math.min(i,F.x+s),w=+x(b),N=I;N<C;N++)for(var D=u[N-E],U=z;U<S;U++){var k=u[U-M],q=N*i+U;d=l[q]+=D*k*w,f||(f=d);var O=d-f;v+=d,p+=O,h+=O*O,d<c&&(c=d),d>m&&(m=d),g++}if(!g)return{mean:0,stddev:0,min:0,max:0,mid:0};var B=(m-c)/2;return{mean:v/g,stdDev:Math.sqrt((h-p*p/g)/g),min:c,max:m,mid:B}}function h(e,a){var n=e.normalizationTotal,t=v({field:e.field,normalizationType:e.normalizationType,normalizationField:e.normalizationField,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numClasses||R}),r=m(e,a);return r=c(r,e.minValue,e.maxValue),g(e,l.createGenerateRendererClassBreaks({definition:t,values:r,normalizationTotal:n}))}function g(e,a){var n=a.classBreaks,t=n.length,r=n[0].minValue,i=n[t-1].maxValue,o="standard-deviation"===e.classificationMethod,l=P;return n=n.map(function(e){var a=e.label,n={minValue:e.minValue,maxValue:e.maxValue,label:a};if(o&&a){var t=a.match(l),r=t.map(function(e){return+e.trim()});2===r.length?(n.minStdDev=r[0],n.maxStdDev=r[1],r[0]<0&&r[1]>0&&(n.hasAvg=!0)):1===r.length&&(a.indexOf("<")>-1?(n.minStdDev=null,n.maxStdDev=r[0]):a.indexOf(">")>-1&&(n.minStdDev=r[0],n.maxStdDev=null))}return n}),{minValue:r,maxValue:i,classBreakInfos:n,normalizationTotal:a.normalizationTotal}}function x(e,a,n){for(var t,r=(a-e)/n,i=[],o=e,l=1;l<=n;l++)t=o+r,t=Number(t.toFixed(16)),i.push([o,t]),o=t;return i}function T(e){var a=[],n=e.classBreaks,t=n[0].minValue,r=n[n.length-1].maxValue;n.forEach(function(e){a.push([e.minValue,e.maxValue])});var i={field:e.field,normalizationType:e.normalizationType,normalizationField:e.normalizationField,normalizationTotal:e.normalizationTotal};return{min:t,max:r,intervals:a,sqlExpr:V(i),excludeZerosExpr:e.where,normTotal:e.normalizationTotal}}function V(e){var a=e.field,n=e.normalizationType,t=e.normalizationField,r=e.normalizationTotal,i=a;return"percent-of-total"===n?i="(("+a+" / "+r+") * 100)":"log"===n?i="(log("+a+") * "+A+")":"field"===n&&(i="("+a+" / "+t+")"),i}function y(e,a,n){for(var t=a.min,r=a.max,i=a.normTotal,o=e.numBins||_,l=a.intervals||x(t,r,o),u=l.map(function(e,a){return{minValue:l[a][0],maxValue:l[a][1],count:0}}),s=m(e,n),c=0,f=s;c<f.length;c++){var d=f[c];if(null!=d&&d>=t&&d<=r){var v=F(l,d);v>-1&&u[v].count++}}return{bins:u,minValue:t,maxValue:r,normalizationTotal:i}}function F(e,a){for(var n=-1,t=e.length-1;t>=0;t--){if(a>=e[t][0]){n=t;break}}return n}function b(e,a){var n;if(a=a.toLowerCase(),e)for(var t in e)if(t.toLowerCase()!==a){n=e[t];break}return n}function M(e,a){var n;if(a=a.toLowerCase(),e)for(var t in e)if(t.toLowerCase()===a){n=e[t];break}return n}function E(e,a,n,t){var r={};e&&e.features&&e.features.forEach(function(e){var a=e.attributes,n=b(a,"countOFExpr"),t=M(a,"countOFExpr");0!==n&&(r[n]=t)});var i=[];return x(a,n,t).forEach(function(e,a){var n=(a+1).toString();i.push({minValue:e[0],maxValue:e[1],count:r.hasOwnProperty(n)?r[n]:0})}),{bins:i,minValue:a,maxValue:n}}function z(e,a,n,r){var i=e&&e.features,o="countOF"+(n||"Expr"),l={},u=!1;if(i.forEach(function(e){var a=e.attributes,t=M(a,o),r=n?M(a,n):b(a,o);null===r&&0===t&&(u=!0),(null==r||"string"==typeof r&&""===r.trim())&&(r=null),null==l[r]?l[r]={count:t,data:r}:l[r].count=l[r].count+t}),n&&u){var s=n+" is NULL";return a.queryFeatureCount(s).then(function(e){return e=e||0,l.null.count=l.null.count+e,I(l,r)}).catch(function(){return I(l,r)})}return t.resolve(I(l,r))}function I(e,a){if(a)for(var n in e)e[n].label=a[n];return{count:e}}function C(e,a,n,t){var r=e.count,i=[];if(t&&n&&"coded-value"===n.type){n.codedValues.forEach(function(e){var a=e.code;r.hasOwnProperty(a)||(r[a]={data:a,count:0})})}for(var o in r){var l=r[o];i.push({value:l.data,count:l.count,label:l.label})}return{uniqueValueInfos:i}}function S(e,a,n){for(var t=e.features?L:B,r=m(e,a),i={},o=0,l=r;o<l.length;o++){var u=l[o];(null==u||"string"==typeof u&&""===u.trim())&&(u=null),null==i[u]?i[u]={count:1,data:u}:i[u].count++}return C({count:i},t,n,e.returnAllCodedValues)}function w(e){return n.pad(e,2,"0")}function N(e,a){var n;return"date"===a||"number"===a?("number"===a&&(e=new Date(e)),n="TIMESTAMP'"+e.getUTCFullYear()+"-"+w(e.getUTCMonth()+1)+"-"+w(e.getUTCDate())+" "+w(e.getUTCHours())+":"+w(e.getUTCMinutes())+":"+w(e.getUTCSeconds())+"'"):n=e,n}function D(e,a){var n;if(a instanceof Date)n="date";else if("number"==typeof a)n="number";else if("string"==typeof a){var t=e.getField(a);"<now>"===a.toLowerCase()?n="":t&&t.type===H&&(n="field")}return n}function U(e,a,n,t){var r="("+N(n,D(e,n))+" - "+N(a,D(e,a))+")",i=j[t],o="/";return i<1&&(i=1/i,o="*"),{sqlExpression:1===i?r:"("+r+" "+o+" "+i+")",sqlWhere:null}}function k(e,a){return U(e,new Date(0),a,"milliseconds").sqlExpression}function q(e){return"number"==typeof e&&!isNaN(e)&&e!==1/0&&e!==-1/0}Object.defineProperty(a,"__esModule",{value:!0});var O=/_value$/i,B="features-in-memory",L="features",P=/\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*/gi,R=5,_=10,A=Math.LOG10E,G="equal-interval",Y=1,H="date",j={years:365,months:30,days:1,hours:1/24,minutes:1/1440,seconds:1/86400,milliseconds:1/864e5};a.statisticTypes=["min","max","avg","stddev","count","sum","variance"],a.getSummaryStatisticsFromFeatureSet=u,a.calculateStatsFromMemory=s,a.getDataValues=m,a.processSummaryStatisticsResult=d,a.createCBDefn=v,a.calculateHeatmapStats=p,a.calculateClassBreaksFromMemory=h,a.resolveCBResult=g,a.getEqualIntervalBins=x,a.generateBinParams=T,a.getFieldExpr=V,a.calculateHistogramFromMemory=y,a.getHistogramFromFeatureSet=E,a.getUniqueValuesFromFeatureSet=z,a.createUVResult=C,a.calculateUniqueValuesFromMemory=S,a.msSinceUnixEpochSQL=k,a.isValidNumber=q});