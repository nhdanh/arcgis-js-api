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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","../kernel","../graphic","../geometry/Polyline","./GraphicsLayer"],function(t,e,r,a,i,n,s,o){var c=t(null,{declaredClass:"esri.layers._TrackManager",constructor:function(t){this.layer=t,this.trackMap={},this.trackLineMap={}},initialize:function(t){this.map=t;var e=this.layer,r=e._getRenderer(),a=r&&r.trackRenderer;if("esriGeometryPoint"===e.geometryType){var i=this.container=new o._GraphicsLayer({id:e.id+"_tracks",_child:!0});i.loaded=!0,i.onLoad(i),i._setMap(t,e._div),i.setRenderer(a)}},addFeatures:function(t){var e=this.trackMap,a=this.layer,i=a._trackIdField,n=[];r.forEach(t,function(t){var a=t.attributes,s=a[i],o=e[s]=e[s]||[];o.push(t),-1===r.indexOf(n,s)&&n.push(s)});var s=a._startTimeField,o=a.objectIdField,c=function(t,e){var r=t.attributes[s],a=e.attributes[s];return r===a?t.attributes[o]<e.attributes[o]?-1:1:a>r?-1:1};r.forEach(n,function(t){e[t].sort(c)})},trimTracks:function(t){function e(t){for(var e=i[t]||[];e.length>s;)o.push(e.shift())}var a,i=this.trackMap,n=this.layer,s=n.maximumTrackPoints||0,o=[];if(!s)return o;if(t)r.forEach(t,function(t){e(t)});else for(a in i)i.hasOwnProperty(a)&&e(a);return o},drawTracks:function(t){function e(t){var e,r,c,f,u,d=a[t];if(u=h.trackLineMap[t],l.remove(u),delete h.trackLineMap[t],u=null,!d||d.length<2)return!1;for(r=[],e=d.length-1;e>=0;e--)c=d[e].geometry,c&&r.push([c.x,c.y]);f={},f[o]=t,r.length>1&&(u=new n(new s({paths:[r],spatialReference:i}),null,f),l.add(u),h.trackLineMap[t]=u)}var a,i,o,c,h=this,l=this.container;if(l)if(a=this.trackMap,i=this.map.spatialReference,o=this.layer._trackIdField,t)r.forEach(t,function(t){e(t)});else for(c in a)a.hasOwnProperty(c)&&e(c)},refreshTracks:function(t){function e(t){var e,r,a;if(i.drawTracks([t]),o&&o.latestObservationRenderer)for(e=n[t]||[],r=e.length,a=0;r>a;a++)s._repaint(e[a],null,!0)}var a,i=this,n=this.trackMap,s=this.layer,o=s._getRenderer();if(t)r.forEach(t,function(t){e(t)});else for(a in n)n.hasOwnProperty(a)&&e(a);this.moveLatestToFront()},moveLatestToFront:function(t){r.forEach(this.getLatestObservations(t),function(t){var e=t._shape;e&&e._moveToFront(),this._repaint(t,null,!0)},this.layer)},getLatestObservations:function(t){function e(t){var e=s[t];return e[e.length-1]}var a,i=[],n=this.layer._getRenderer(),s=this.trackMap;if(!n.latestObservationRenderer)return i;if(t)r.forEach(t,function(t){i.push(e(t))});else for(a in s)s.hasOwnProperty(a)&&i.push(e(a));return i},clearTracks:function(t){var e,a=this.getLatestObservations(t),i=this.container;t?r.forEach(t,function(t){delete this.trackMap[t],i&&(e=this.trackLineMap[t],i.remove(e),delete this.trackLineMap[t])},this):(this.trackMap={},this.trackLineMap={},i&&i.clear()),r.forEach(a,function(t){this._repaint(t,null,!0)},this.layer)},isLatestObservation:function(t){var e=this.layer._trackIdField,r=this.trackMap[t.attributes[e]];return r?r[r.length-1]===t:!1},destroy:function(){var t=this.container;t&&(t.clear(),t._unsetMap(this.map,this.layer._div)),this.map=this.layer=this.trackMap=this.container=null}});return a("extend-esri")&&e.setObject("layers._TrackManager",c,i),c});