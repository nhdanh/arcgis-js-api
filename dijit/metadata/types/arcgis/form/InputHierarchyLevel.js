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
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/topic","dojo/query","dijit/registry","dojo/dom-class","dojo/dom-style","dojo/has","../../../../../kernel","./InputSelectCode","dojo/i18n!../../../nls/i18nArcGIS"],function(e,t,a,n,o,r,d,i,s,c,l){var m=e([l],{postCreate:function(){this.inherited(arguments);var e=this;this.own(n.subscribe("gxe/xnode-destroyed",function(t){try{if(t&&t.xnode){var a=t.xnode.gxePath;"/metadata/mdHrLv"===a&&e.emitInteractionOccurred()}}catch(n){console.error(n)}}))},emitInteractionOccurred:function(){this.inherited(arguments);try{var e=this.parentXNode.gxeDocument;(e.isAgsISO19139||e.isAgsINSPIRE)&&this._checkLevelName(),(e.isAgsISO19139||e.isAgsINSPIRE||e.isAgsNAP||e.isAgsFGDC)&&this._checkService()}catch(t){console.error(t)}},_checkLevelName:function(){var e,t,n,i,s="/metadata/mdHrLv/ScopeCd/@value",c=this.parentXNode.parentElement.parentElement.parentElement.domNode,l=this.parentXNode.gxeDocument,m=!1;(l.isAgsISO19139||l.isAgsINSPIRE)&&(i=o("[data-gxe-path='"+s+"']",c),m=a.some(i,function(a){return t=r.byNode(a),t&&(e=t.inputWidget.getInputValue(),null!==e&&""!==e&&"005"!==e&&"006"!==e)?!0:void 0}),t=this._findFirstInputWgt("/metadata/mdHrLvName",c),t&&(n=t.parentXNode.multiplicityHeader.labelNode,m?(t.parentXNode.minOccurs=1,t.parentXNode.multiplicityHeader.minOccurs=1,d.remove(n,"gxeOptionalLabel"),d.add(n,"gxeMandatoryLabel")):(t.parentXNode.minOccurs=0,t.parentXNode.multiplicityHeader.minOccurs=0,d.remove(n,"gxeMandatoryLabel"),d.add(n,"gxeOptionalLabel")),t.emitInteractionOccurred()))},_checkQuality:function(){var e,t,n,i,s="/metadata/mdHrLv/ScopeCd/@value",c=this.parentXNode.parentElement.parentElement.parentElement.domNode,l=this.parentXNode.gxeDocument,m=!1,p=!1,u=!1;(l.isAgsISO19139||l.isAgsINSPIRE||l.isAgsNAP)&&(i=o("[data-gxe-path='"+s+"']",c),a.forEach(i,function(a){t=r.byNode(a),t&&(e=t.inputWidget.getInputValue(),"005"==e?p=!0:"006"===e&&(u=!0))})),(l.isAgsISO19139||l.isAgsNAP)&&(m=p||u,t=this._findElement("/metadata/dqInfo",c),t&&t.labelWidget&&(n=t.labelWidget.domNode,m?(t.minOccurs=1,d.remove(n,"gxeOptionalLabel"),d.add(n,"gxeMandatoryLabel")):(t.minOccurs=0,d.remove(n,"gxeMandatoryLabel"),d.add(n,"gxeOptionalLabel"))))},_checkService:function(){var e,t,n,s,c="/metadata/mdHrLv/ScopeCd/@value",l=this.parentXNode.parentElement.parentElement.parentElement.domNode,m=this.parentXNode.gxeDocument,p=!1,u=!1;(m.isAgsISO19139||m.isAgsINSPIRE||m.isAgsNAP||m.isAgsFGDC)&&(s=o("[data-gxe-path='"+c+"']",l),a.forEach(s,function(a){t=r.byNode(a),t&&(e=t.inputWidget.getInputValue(),"014"==e&&(u=!0))})),(m.isAgsISO19139||m.isAgsINSPIRE||m.isAgsNAP)&&(p=u,t=this._findInputWgt("/metadata/dataIdInfo/svType/genericName",l),t&&(n=t.parentXNode.labelNode,p?(t.parentXNode.minOccurs=1,d.remove(n,"gxeOptionalLabel"),d.add(n,"gxeMandatoryLabel")):(t.parentXNode.minOccurs=0,d.remove(n,"gxeMandatoryLabel"),d.add(n,"gxeOptionalLabel")),t.emitInteractionOccurred()),t=this._findInputWgt("/metadata/dataIdInfo/svCouplType/CouplTypCd/@value",l),t&&(n=t.parentXNode.parentElement.parentElement.labelNode,p?(t.parentXNode.minOccurs=1,t.parentXNode.parentElement.minOccurs=1,t.parentXNode.parentElement.parentElement.minOccurs=1,d.remove(n,"gxeOptionalLabel"),d.add(n,"gxeMandatoryLabel")):(t.parentXNode.minOccurs=0,t.parentXNode.parentElement.minOccurs=0,t.parentXNode.parentElement.parentElement.minOccurs=0,d.remove(n,"gxeMandatoryLabel"),d.add(n,"gxeOptionalLabel")),t.emitInteractionOccurred()));var g,N=!1,b=null;if(N)for(g=this._findElement("/metadata/dataIdInfo/svType",l);g;){if(g._isGxeTabs){if(b&&b.tabButton)if(u)i.set(b.tabButton.domNode,"display",""),d.contains(b.tabButton.domNode,"current")&&i.set(b.domNode,"display","block");else if(i.set(b.tabButton.domNode,"display","none"),i.set(b.domNode,"display","none"),d.contains(b.tabButton.domNode,"current"))try{g.ensureActiveTab(g._tabButtons[0].tabWgt)}catch(h){console.error(h)}break}b=g,g=g.getParent()}},_findElement:function(e,t){var a,n=o("[data-gxe-path='"+e+"']",t);return n&&1===n.length?a=r.byNode(n[0]):null},_findFirstInputWgt:function(e,t){var a,n=o("[data-gxe-path='"+e+"']",t);return n&&n.length>0&&(a=r.byNode(n[0]))?a.inputWidget:null},_findInputWgt:function(e,t){var a,n=o("[data-gxe-path='"+e+"']",t);return n&&1===n.length&&(a=r.byNode(n[0]))?a.inputWidget:null}});return s("extend-esri")&&t.setObject("dijit.metadata.types.arcgis.form.InputHierarchyLevel",m,c),m});