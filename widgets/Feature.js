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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./Feature/nls/Feature","dojo/keys","../core/promiseUtils","../core/watchUtils","../core/accessorSupport/decorators","./Widget","./Feature/FeatureViewModel","./Feature/support/attachmentUtils","./support/uriUtils","./support/widget"],function(e,t,a,i,r,n,s,o,c,d,l,m,h,u){function p(e,t){return void 0===t?_+"__"+e:_+"__"+e+"-"+t}var f={iconText:"esri-icon-font-fallback-text",iconLoading:"esri-icon-loading-indicator esri-rotating",iconLeftTriangleArrow:"esri-icon-left-triangle-arrow",iconRightTriangleArrow:"esri-icon-right-triangle-arrow",iconMedia:"esri-icon-media",iconChart:"esri-icon-chart",esriTable:"esri-widget__table",base:"esri-feature",container:"esri-feature__size-container",main:"esri-feature__main-container",btn:"esri-feature__button",icon:"esri-feature__icon",content:"esri-feature__content",contentElement:"esri-feature__content-element",text:"esri-feature__text",showMediaPagination:"esri-feature--media-pagination-visible",attachments:"esri-feature__attachments",attachmentsList:"esri-feature__attachments--list",attachmentsPreview:"esri-feature__attachments--preview",attachmentsTitle:"esri-feature__attachments-title",attachmentsItems:"esri-feature__attachments-items",attachmentsItem:"esri-feature__attachments-item",attachmentsItemMask:"esri-feature__attachment-item-mask",attachmentsItemMaskIcon:"esri-feature__attachment-item-mask--icon",attachmentsItemImage:"esri-feature__attachments-image",attachmentsItemImageOverlay:"esri-feature__attachments-image-overlay",attachmentsItemLinkIcon:"esri-feature__attachments-link-icon esri-icon-link-external",attachmentsItemImageResizable:"esri-feature__attachments-image--resizable",attachmentsItemFilename:"esri-feature__attachments-filename",attachmentsItemLink:"esri-feature__attachments-item-link",fields:"esri-feature__fields",fieldHeader:"esri-feature__field-header",fieldData:"esri-feature__field-data",fieldDataDate:"esri-feature__field-data--date",media:"esri-feature__media",mediaContainer:"esri-feature__media-container",mediaItemContainer:"esri-feature__media-item-container",mediaItem:"esri-feature__media-item",mediaItemTitle:"esri-feature__media-item-title",mediaItemCaption:"esri-feature__media-item-caption",mediaPrevious:"esri-feature__media-previous",mediaPreviousIconLTR:"esri-feature__media-previous-icon",mediaPreviousIconRTL:"esri-feature__media-previous-icon--rtl",mediaNext:"esri-feature__media-next",mediaNextIconLTR:"esri-feature__media-next-icon",mediaNextIconRTL:"esri-feature__media-next-icon--rtl",mediaSummary:"esri-feature__media-summary",mediaCount:"esri-feature__media-count",mediaImageSummary:"esri-feature__media-image-summary",mediaImageIcon:"esri-feature__media-image-icon",mediaChart:"esri-feature__media-chart",mediaChartSummary:"esri-feature__media-chart-summary",mediaChartIcon:"esri-feature__media-chart-icon",loadingSpinnerContainer:"esri-feature__loading-container",spinner:"esri-feature__loading-spinner"},_="esri-feature";return function(t){function d(e){var a=t.call(this)||this;return a._chartMap=new Map,a._activeMediaMap=new Map,a._chartRequirePromise=null,a._refreshTimers=new Map,a._mediaInfo=new Map,a.contentEnabled=null,a.graphic=null,a.title=null,a.view=null,a.viewModel=new l,a}return a(d,t),d.prototype.postInitialize=function(){var e=this;this.own(o.init(this,"viewModel.content",function(){return e._setupMediaRefreshTimers()}))},d.prototype.destroy=function(){this._clearMediaRefreshTimers(),this._activeMediaMap.clear(),this._activeMediaMap=null,this._cancelChartModules(),this._destroyCharts()},d.prototype.render=function(){var e=u.tsx("div",{key:p("loading-container"),class:f.loadingSpinnerContainer},u.tsx("span",{class:this.classes(f.iconLoading,f.spinner)})),t=this.viewModel.waitingForContent?e:this._renderContent();return u.tsx("div",{class:f.base},u.tsx("div",{class:f.container},u.tsx("div",{class:f.main},t)))},d.prototype.goToMedia=function(e,t){this._setContentElementMedia(e,t)},d.prototype.nextMedia=function(e){this._pageContentElementMedia(e,"next")},d.prototype.previousMedia=function(e){this._pageContentElementMedia(e,"previous")},d.prototype._cancelChartModules=function(){var e=this._chartRequirePromise;e&&e.cancel(),this._chartRequirePromise=null},d.prototype._destroyChart=function(e){var t=this._chartMap.get(e);t&&(t.chart.destroy(),t.tooltip.destroy()),this._chartMap.delete(e)},d.prototype._destroyCharts=function(){this._chartMap.forEach(function(e){e.chart.destroy(),e.tooltip.destroy()}),this._chartMap.clear()},d.prototype._renderContent=function(){this._destroyCharts();var e=this.viewModel.content;return"string"==typeof e?u.tsx("div",{key:p("content-string"),innerHTML:e}):u.isWidget(e)?u.tsx("div",{key:p("content-widget")},e.render()):e instanceof HTMLElement?u.tsx("div",{key:p("content-html-element"),bind:e,afterCreate:this._attachToNode}):u.isWidgetBase(e)?u.tsx("div",{key:p("content-dijit"),bind:e.domNode,afterCreate:this._attachToNode}):Array.isArray(e)?e.length?u.tsx("div",{key:p("content-content-elements")},e.map(this._renderContentElement,this)):null:void 0},d.prototype._renderContentElement=function(e,t){switch(e.type){case"attachments":return this._renderAttachments(e,t);case"fields":return this._renderFields(e,t);case"media":return this._renderMedia(e,t);case"text":return this._renderText(e,t);default:return null}},d.prototype._renderAttachmentInfo=function(e){var t,a,i=e.attachmentInfo,n=e.supportsResizeAttachments,s=i.contentType,o=i.name,c=i.url,d=n&&m.isSupportedImage(s),l=-1===c.indexOf("?")?"?":"&",h=d?""+c+l+"w=48":m.getIconPath(s),p=(t={},t[f.attachmentsItemMaskIcon]=!d,t),_=(a={},a[f.attachmentsItemImageResizable]=n,a);return u.tsx("li",{class:f.attachmentsItem,key:i},u.tsx("a",{class:f.attachmentsItemLink,href:c,target:"_blank"},u.tsx("div",{class:this.classes(p,f.attachmentsItemMask)},u.tsx("img",{alt:o,class:this.classes(_,f.attachmentsItemImage),title:o,src:h}),u.tsx("span",{class:f.attachmentsItemImageOverlay},u.tsx("span",{"aria-hidden":"true",class:f.attachmentsItemLinkIcon}))),u.tsx("span",{class:f.attachmentsItemFilename},o||r.noTitle)))},d.prototype._renderAttachments=function(e,t){var a,i=this,n=e.displayType,s=e.attachmentInfos,o=s&&s.length,c=this.get("graphic.layer.capabilities.operations.supportsResizeAttachments"),d=(a={},a[f.attachmentsList]="preview"!==n,a[f.attachmentsPreview]="preview"===n,a);return o?u.tsx("div",{key:p("attachments-element"),class:this.classes(f.attachments,f.contentElement,d)},u.tsx("div",{class:f.attachmentsTitle},r.attach),u.tsx("ul",{class:f.attachmentsItems},s.map(function(t,a){return i._renderAttachmentInfo({attachmentInfo:t,attachmentInfoIndex:a,supportsResizeAttachments:c,contentElement:e})}))):null},d.prototype._forceLTR=function(e){return"&lrm;"+e},d.prototype._renderFieldInfo=function(e,t){var a,i=this.viewModel,r=i.formattedAttributes,n=r?r.content[t]||r.global:null,s=e.fieldName,o=e.label||s,c=n?null==n[s]?"":n[s]:"",d=!(!e.format||!e.format.dateFormat),l="number"==typeof c&&!d,m=l?this._forceLTR(c):h.autoLink(c),_=(a={},a[f.fieldDataDate]=d,a);return u.tsx("tr",{key:p("fields-element-info-row",t)},u.tsx("th",{key:p("fields-element-info-row-header",t),class:f.fieldHeader,innerHTML:o}),u.tsx("td",{key:p("fields-element-info-row-data",t),class:this.classes(f.fieldData,_),innerHTML:m}))},d.prototype._renderFields=function(e,t){var a=this,i=e.fieldInfos;return i?u.tsx("div",{key:p("fields-element",t),class:this.classes(f.fields,f.contentElement)},u.tsx("table",{class:f.esriTable,summary:r.fieldsSummary,key:p("fields-element-table",t)},u.tsx("tbody",{key:p("fields-element-table-body",t)},i.map(function(e){return a._renderFieldInfo(e,t)})))):null},d.prototype._shouldOpenInNewTab=function(e){return void 0===e&&(e=""),!/^(?:mailto:|tel:)/.test(e.trim().toLowerCase())},d.prototype._clearMediaRefreshTimers=function(){this._refreshTimers.forEach(function(e){return clearTimeout(e)}),this._refreshTimers.clear()},d.prototype._clearMediaRefreshTimer=function(e){var t=this._refreshTimers.get(e);t&&(clearTimeout(t),this._refreshTimers.delete(e))},d.prototype._getImageSource=function(e,t){var a=-1!==e.indexOf("?")?"&":"?",i=e.split("#"),r=i[0],n=i[1],s=void 0===n?"":n;return""+r+a+"timestamp="+t+(s?"#":"")+s},d.prototype._setupMediaRefreshTimer=function(e){var t=this.get("viewModel.content");if(Array.isArray(t)){var a=t[e];if(a&&"media"===a.type){var i=this._activeMediaMap.get(e);isNaN(i)&&(i=0);var r=a.mediaInfos[i];r&&"image"===r.type&&r.refreshInterval&&this._setRefreshTimeout(e,r)}}},d.prototype._setupMediaRefreshTimers=function(){var e=this;this._clearMediaRefreshTimers();var t=this.get("viewModel.content");Array.isArray(t)&&t.forEach(function(t,a){return e._setupMediaRefreshTimer(a)})},d.prototype._updateMediaInfoTimestamp=function(e,t){var a=Date.now();this._mediaInfo.set(t,{timestamp:a,sourceURL:this._getImageSource(e,a)}),this.scheduleRender()},d.prototype._setRefreshTimeout=function(e,t){var a=this,i=t.refreshInterval,r=t.value;if(i){var n=6e4*i;this._updateMediaInfoTimestamp(r.sourceURL,e);var s=setInterval(function(){a._updateMediaInfoTimestamp(r.sourceURL,e)},n);this._refreshTimers.set(e,s)}},d.prototype._renderMediaInfoType=function(e,t){var a=e.value,i=e.title,r=void 0===i?"":i,n=e.type,s=e.refreshInterval,o=a.sourceURL,c=a.linkURL;if("image"===n){var d=!this._shouldOpenInNewTab(c),l=d?"_blank":"_self",m=s?this._mediaInfo.get(t):null,h=m?m.timestamp:0,_=m?m.sourceURL:o,v=u.tsx("img",{alt:r,key:p("media-image-"+h,t),src:_}),y=c?u.tsx("a",{title:r,href:c,target:l},v):null;return y||v}if(-1!==n.indexOf("chart"))return u.tsx("div",{key:p("chart",t),bind:this,"data-media-info":e,"data-content-element-index":t,class:f.mediaChart,afterCreate:this._getChartDependencies,afterUpdate:this._getChartDependencies})},d.prototype._getChartDependencies=function(t){var a=this,i=t["data-media-info"],r=t["data-content-element-index"],n=i.value,o=n.theme||"Claro",c=i.type,d=o;"string"==typeof o&&(d=o.replace(/\./g,"/")),this._cancelChartModules(),this._chartRequirePromise=s.create(function(t){return e(["dojox/charting/Chart2D","dojox/charting/action2d/Tooltip","dojox/charting/themes/"+d],function(){for(var e=[],a=0;a<arguments.length;a++)e[a]=arguments[a];return t(e)})}).then(function(e){var i=e[0],s=e[1],o=e[2];a._renderChart(t,r,c,n,i,s,o),a._chartRequirePromise=null})},d.prototype._renderChart=function(e,t,a,i,r,n,s){var o=new r(e,{margins:{l:4,t:4,r:4,b:4}});switch(s&&o.setTheme(s),a){case"pie-chart":o.addPlot("default",{type:"Pie",labels:!1}),o.addSeries("Series A",i.chartOptions);break;case"line-chart":o.addPlot("default",{type:"Markers"}),o.addAxis("x",{min:0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),o.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),i.chartOptions.forEach(function(e,t){e.x=t+1}),o.addSeries("Series A",i.chartOptions);break;case"column-chart":o.addPlot("default",{type:"Columns",gap:3}),o.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),o.addSeries("Series A",i.chartOptions);break;case"bar-chart":o.addPlot("default",{type:"Bars",gap:3}),o.addAxis("x",{includeZero:!0,fixUpper:"minor",minorLabels:!1}),o.addAxis("y",{vertical:!0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),o.addSeries("Series A",i.chartOptions)}var c=new n(o);o.render(),this._chartMap.set(t,{chart:o,tooltip:c})},d.prototype._renderMediaInfo=function(e,t){this._destroyChart(t);var a=this._renderMediaInfoType(e,t),i=e.title?u.tsx("div",{key:p("media-title",t),class:f.mediaItemTitle,innerHTML:e.title}):null,r=e.caption?u.tsx("div",{key:p("media-caption",t),class:f.mediaItemCaption,innerHTML:e.caption}):null;return u.tsx("div",{key:p("media-container",t),class:f.mediaItemContainer},u.tsx("div",{key:p("media-item-container",t),class:f.mediaItem},a),i,r)},d.prototype._renderMediaStatsItem=function(e,t,a){var i="chart"===a?this.classes(f.mediaChartIcon,f.iconChart):this.classes(f.mediaImageIcon,f.iconMedia);return u.tsx("li",{class:f.mediaImageSummary},u.tsx("span",{"aria-hidden":"true",class:i}),u.tsx("span",{class:f.mediaCount,"aria-label":e},"("+t+")"))},d.prototype._renderMediaPageButton=function(e,t){var a="previous"===e,i=a?r.previous:r.next,n=a?this.classes(f.btn,f.mediaPrevious):this.classes(f.btn,f.mediaNext),s=a?this.classes(f.icon,f.mediaPreviousIconLTR,f.iconLeftTriangleArrow):this.classes(f.icon,f.mediaNextIconLTR,f.iconRightTriangleArrow),o=a?this.classes(f.icon,f.mediaPreviousIconRTL,f.iconRightTriangleArrow):this.classes(f.icon,f.mediaNextIconRTL,f.iconLeftTriangleArrow),c=a?"previous":"next",d=a?this._previousClick:this._nextClick;return u.tsx("div",{key:p(c,t),title:i,tabIndex:0,role:"button",class:n,"data-content-element-index":t,bind:this,onkeydown:d,onclick:d},u.tsx("span",{"aria-hidden":"true",class:s}),u.tsx("span",{"aria-hidden":"true",class:o}),u.tsx("span",{class:f.iconText},i))},d.prototype._handleMediaKeyup=function(e){var t=e.currentTarget,a=t["data-content-element-index"],i=e.keyCode;i===n.LEFT_ARROW&&(e.stopPropagation(),this.previousMedia(a)),i===n.RIGHT_ARROW&&(e.stopPropagation(),this.nextMedia(a))},d.prototype._renderMedia=function(e,t){var a,i=e.mediaInfos,n=this._getMediaStats(i),s=n.total,o=(a={},a[f.showMediaPagination]=n.total>1,a),c=this._renderMediaStatsItem(r.numImages,n.images,"image"),d=this._renderMediaStatsItem(r.numCharts,n.charts,"chart"),l=this._renderMediaPageButton("previous",t),m=this._renderMediaPageButton("next",t),h=this._activeMediaMap.get(t);return isNaN(h)&&(this._activeMediaMap.set(t,0),h=0),s?u.tsx("div",{key:p("media-element",t),"data-content-element-index":t,bind:this,onkeyup:this._handleMediaKeyup,class:this.classes(f.media,f.contentElement,o)},u.tsx("ul",{class:f.mediaSummary},c,d),u.tsx("div",{key:p("media-element-container",t),class:f.mediaContainer},l,this._renderMediaInfo(i[h],t),m)):null},d.prototype._renderText=function(e,t){return e.text?u.tsx("div",{key:p("text-element",t),innerHTML:e.text,class:this.classes(f.text,f.contentElement)}):null},d.prototype._attachToNode=function(e){var t=this;e.appendChild(t)},d.prototype._getMediaStats=function(e){var t=0,a=0;return e.forEach(function(e){var i=e.type;"image"===i?t++:-1!==i.indexOf("chart")&&a++}),{total:a+t,images:t,charts:a}},d.prototype._setContentElementMedia=function(e,t){this._clearMediaRefreshTimer(e);var a=this.viewModel.content,i=a&&a[e],r=i&&i.mediaInfos;if(r&&r.length){var n=(t+r.length)%r.length;this._activeMediaMap.set(e,n),this._setupMediaRefreshTimer(e),this.scheduleRender()}},d.prototype._pageContentElementMedia=function(e,t){var a="previous"===t?-1:1,i=this._activeMediaMap.get(e)+a;this._setContentElementMedia(e,i)},d.prototype._previousClick=function(e){var t=e.currentTarget,a=t["data-content-element-index"];this.previousMedia(a)},d.prototype._nextClick=function(e){var t=e.currentTarget,a=t["data-content-element-index"];this.nextMedia(a)},i([c.aliasOf("viewModel.contentEnabled")],d.prototype,"contentEnabled",void 0),i([c.aliasOf("viewModel.graphic")],d.prototype,"graphic",void 0),i([c.aliasOf("viewModel.title")],d.prototype,"title",void 0),i([c.aliasOf("viewModel.view")],d.prototype,"view",void 0),i([c.property({type:l}),u.renderable(["viewModel.waitingForContent","viewModel.content"])],d.prototype,"viewModel",void 0),i([u.accessibleHandler()],d.prototype,"_previousClick",null),i([u.accessibleHandler()],d.prototype,"_nextClick",null),d=i([c.subclass("esri.widgets.Feature")],d)}(c.declared(d))});