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
define(["../../declare","dojo/_base/lang","dojo/Deferred","dojo/string","../../tasks/geoenrichment/studyAreaOptionsFromJson","../../tasks/geoenrichment/GeoenrichmentTask","./lang","./config","./InfographicsOptionsItem"],function(e,t,i,r,s,a,n,o,l){function h(e,t){var i=parseFloat(e.index),r=parseFloat(t.index);return isNaN(i)&&isNaN(r)?0:isNaN(i)?1:isNaN(r)?-1:i-r}function f(e,t){for(var i=0;i<e.length;i++){var r=e[i];if(r.type==t.type&&n.arraysEqual(r.variables,t.variables))return{report:r,index:i}}return null}function c(e,t){if(e)for(var i in e)if(e.hasOwnProperty(i)){t[i]=[];for(var r=0;r<e[i].length;r++){var s=e[i][r],a={};u(s,a),t[i].push(a)}}}function u(e,t){if(t.type=e.type||("OneVarMultiComparison"==e.report?"OneVar":e.report),e.dataCollection)if(e.vars){t.variables=[];for(var i=0;i<e.vars.length;i++)t.variables.push(e.dataCollection+"."+e.vars[i])}else t.variables=[e.dataCollection+".*"];else t.variables=e.variables;n.isBoolean(e.isVisible)?t.isVisible=e.isVisible:n.isBoolean(e.checked)&&(t.isVisible=e.checked)}var v=e("esri.dijit.geoenrichment.InfographicsOptions",null,{_items:null,_loaded:null,studyAreaOptions:null,theme:"common",constructor:function(e){this._loaded={},this.studyAreaOptions=s(e&&(e.buffer||e.studyAreaOptions)),this._items={},e&&(c(e.reports||e.items,this._items),e.theme&&(this.theme=e.theme))},toJson:function(){var e={};return c(this._items,e),{studyAreaOptions:this.studyAreaOptions.toJson(),items:e,theme:this.theme}},getItems:function(e){var r=new i;if(this._loaded[e])r.resolve(this._items[e]);else{var s=new a(o.server);s.token=o.token,s.getDataCollections(e,null,["id","alias"]).then(t.hitch(this,this._mergeItems,e,r),function(e){r.reject(e)})}return r.promise},_mergeItems:function(e,t,i){function r(){g={},b={};for(var e=0;e<i.length;e++){b[i[e].id]=i[e];for(var t=0;t<i[e].variables.length;t++)g[i[e].id+"."+i[e].variables[t].id]=i[e].variables[t]}}function s(e){return g||r(),g[e]}try{var a,n,o=[];for(a=0;a<i.length;a++){var c=i[a].metadata.infographics;if(c){var v=JSON.parse(c);for(var d in v)if(v.hasOwnProperty(d)){var p=new l(d,[i[a].id+".*"]);for(var m in v[d])v[d].hasOwnProperty(m)&&(p[m]=v[d][m]);n=f(o,p),n?o[n.index]=p:o.push(p)}}}var g,b,y=this._items[e];for(y||(y=[],y.push(new l("OneVar",["KeyGlobalFacts.AVGHHSZ"])),this._items[e]=y),a=y.length-1;a>=0;a--)if(n=f(o,y[a]))u(y[a],n.report),y[a]=n.report,o.splice(n.index,1);else{if("OneVar"==y[a].type&&1==y[a].variables.length){var O=y[a].variables[0],_=s(O);if(_){y[a].title=_.alias;continue}}y.splice(a,1),a--}for(a=0;a<o.length;a++)y.push(o[a]);y.sort(h),this._loaded[e]=!0,t.resolve(y)}catch(N){t.reject(N)}}});return v.Item=l,v});