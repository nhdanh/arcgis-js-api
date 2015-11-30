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
define(["../../../declare","dojo/_base/lang","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/Stateful","dojo/query","dojo/i18n!../../../nls/jsapi","dojo/text!./templates/DataVariablesPage.html","../_WizardPage","../_Invoke","../CheckList","dojo/store/Memory","dojo/data/ObjectStore","dgrid/tree","dgrid/OnDemandGrid","dgrid/extensions/DijitRegistry","dgrid/Selection","dojo/aspect","dijit/Tooltip","dojo/on","dojo/_base/window","dijit/registry","dijit/layout/ContentPane"],function(t,e,i,s,r,o,n,l,a,h,d,c,g,u,_,f,p,v,m,b,C,w,j){l=l.geoenrichment.dijit.DataVariablesPage;var S=t([o],{checked:!0,getLabel:function(){},getClass:function(){return""}}),T=t([u],{getChildren:function(t){return t.getChildren()},mayHaveChildren:function(t){return!!t.getChildren}}),k=t([f,p,v,d],{selectionMode:"toggle",shoppingCart:null,variableInfo:null,useTouchScroll:!1,_lockAnimation:!1,constructor:function(){this._ltr=r.isBodyLtr()},removeRow:function(t){var e=j.findWidgets(t);if(e)for(var i=0;i<e.length;i++)e[i].destroy();this.inherited(arguments)},buildRendering:function(){this.inherited(arguments),this.on("dgrid-select",e.hitch(this,this._onSelect)),this.on("dgrid-deselect",e.hitch(this,this._onDeselect))},select:function(t,e,s){var r=this.row(t).element;(null===s||void 0===s)&&(s=!i.contains(r,"dgrid-selected"));var o=this.row(t).data;if(o&&o._children){var l,a=o.getChildren();a.length>0&&!this.row(a[0]).element&&this.expand(this.row(t),!1,!0),this._lockAnimation=!0;for(var h=0;h<a.length;h++)l=this.row(a[h]),this.select(l,e,s);this._lockAnimation=!1,r&&(s?(i.add(r,"dgrid-selected"),this.flyAnim.fly(n(".VarLabel",r)[0],"DataBrowser_SelectVar",["top",this._ltr?"right":"left"])):i.remove(r,"dgrid-selected"))}if(this.inherited(arguments),r){var d=n(".dijitCheckBox",r)[0];d&&(i.contains(r,"dgrid-selected")?i.add(d,"dijitCheckBoxChecked"):i.remove(d,"dijitCheckBoxChecked"))}},syncOneBranchWithShoppingCart:function(t){for(var e=this.shoppingCart.content,i=0;i<t.length;i++)this.select(t[i],null,!!e[t[i].idDesc])},_setSelection:function(){if(this.selection=this.get("selection"),this.selectedItems=[],this.selection&&this.store.data)for(var t,e=this.store.data,i=0;i<e.length;i++){t=e[i].getChildren();for(var s=0;s<t.length;s++)this.selection[t[s].id]&&this.selectedItems.push(t[s])}},_onSelect:function(t){if(!this._lockAnimation&&this.flyAnim&&t.parentType){var e=this.row(t.rows[0]).element;this.flyAnim.fly(n(".VarLabel",e)[0],"DataBrowser_SelectVar",["top",this._ltr?"right":"left"])}this._setSelection(t),this.onSelect(t)},_onDeselect:function(t){this._setSelection(t),this.onDeselect(t)},onDeselect:function(t){for(var e=0;e<t.rows.length;e++)this.shoppingCart.removeVariable(t.rows[e].data.idDesc)},onSelect:function(){this.invoke("_addVariablesToCart")},_addVariablesToCart:function(){this.shoppingCart.addVariables(this.selectedItems)}}),y=t([S],{variables:null,_updateChildren:!0,_label:null,constructor:function(t,e){this.set("id",""+t),this._label=t,this._children=[],this.variables=[];for(var i in e)e.hasOwnProperty(i)&&(this.variables.push(e[i]),this._children.push(e[i]))},getLabel:function(){return this._label},getChildren:function(){return this._children}});return t([h,d],{templateString:a,nls:l,baseClass:"DataVariablesPage",varTree:null,varTitle:null,_grid:null,_model:null,selectedCollection:null,store:null,storeModel:null,multiSelect:!0,filtration:null,shoppingCart:null,_icon:null,flyAnim:null,_setSelectedCollectionsAttr:function(t){if(this._set("selectedCollections",t),t){var i=0;this._model=[];for(var s,r,o={},n=0;n<t.length;n++)if(t[n].variables)for(var l=0;l<t[n].variables.length;l++){s=t[n].variables[l];var a=s.fieldCategory;r=s.idDesc,o[a]||(o[a]={}),o[a][r]=s}for(var h in o)if(o.hasOwnProperty(h)){for(r in o[h])o[h].hasOwnProperty(r)&&i++;this._model.push(new y(h,o[h]))}this.spnVarsQuant.innerHTML=i.toString(),this.spnVarTitle.innerHTML=this.varTitle.toString();var d=new g({data:this._model}),c=new T(d);if(this._grid)this._grid.set("store",c);else{var u=[_({label:" ",field:"expander",shouldExpand:e.hitch(this,this._shouldExpand)}),{label:"Variables",field:"alias",sortable:!1,renderCell:e.hitch(this,this._renderCheckBox)}];this._grid=new k({store:c,columns:u,showHeader:!1,shoppingCart:this.shoppingCart,selectionMode:this.multiSelect?"toggle":"single",selectionDelegate:this.multiSelect?".TrimWithEllipses":".dgrid-row",flyAnim:this.flyAnim},this.divTree);var f=e.hitch(this._grid,this._grid.expand);this._grid.expand=function(t,e,i){var s=t.element?t:this.row(t),r=this.row(s).data,o=null,n=!1;r.getChildren&&(o=r.getChildren(),n=!!this.row(o[0]).element);var l=f(t,e,i);return o&&e!==!1&&o.length>0&&!n&&this.syncOneBranchWithShoppingCart(r.variables),l},m.after(this._grid,"expand",e.hitch(this,this.invoke,"resize")),this._grid.startup()}}},_refreshGrid:function(){for(var t=0,e=0;e<this._model.length;e++){this._model[e]._children=[];for(var i=0;i<this._model[e].variables.length;i++)0===this._model[e].variables[i].hidden&&this._model[e]._children.push(this._model[e].variables[i]);t+=this._model[e]._children.length}this._grid.store=new T(new g({data:this._model})),this.spnVarsQuant.innerHTML=t.toString(),this._grid.refresh(),this._grid.resize()},_shouldExpand:function(t,e,i){return void 0!==i?i:1==this._model.length},_renderCheckBox:function(t){var r,o=!t.variables;r=o?t.description||t.alias:t.getLabel();var n=s.create("div",{"class":"TrimWithEllipses VariableRowRoot"});if(this.multiSelect&&s.create("div",{"class":"dijit dijitInline dijitCheckBox VarCheck"},n),o){i.add(n.children[0],"DataVariablesPage_VarCheck");var l=s.create("div",{"class":"DataBrowserInfoIcon"},n);C(l,"click",e.hitch(this,this._toggleTooltip,l,t)),C(l,"mouseenter",e.hitch(this,this._showTooltip,l,t)),C(l,"mouseover",e.hitch(this,this._showTooltip,l,t)),C(l,"mouseleave",e.hitch(this,this._hideTooltip,l,t)),C(l,"mousedown,touchstart,MSPointerDown,dgrid-cellfocusin",function(t){t.stopPropagation&&t.stopPropagation()})}return s.create("span",{"class":"VarLabel",innerHTML:r},n),n},_toggleTooltip:function(t,e,i){i.stopPropagation&&i.stopPropagation(),this._icon?this._hideTooltip():this._showTooltip(t,e,i)},_showTooltip:function(t,i,s){this._icon=t,this.variableInfo.set("variable",i),b.show(this.variableInfo.domNode.outerHTML,t,["above","below"]),s.stopPropagation&&s.stopPropagation(),C.once(w.doc,"click",e.hitch(this,this._hideTooltip))},_hideTooltip:function(){b.hide(this._icon),this._icon=null},onRemoveElementFromShoppingCart:function(t){for(var e,i=0;i<this._grid.store.data.length;i++){for(var s=0;s<this._grid.store.data[i].variables.length;s++)if(t===this._grid.store.data[i].variables[s].idDesc){e=this._grid.store.data[i].variables[s];break}if(e)break}e&&this._grid.select(e,null,!1)},syncWithShoppingCart:function(){var t,e=this.shoppingCart.content,s=!1,r=!1;if(this._grid)for(var o=0;o<this._grid.store.data.length;o++){r=!0;for(var l=0;l<this._grid.store.data[o].variables.length;l++)t=this._grid.store.data[o].variables[l],s=!!e[t.idDesc],this._grid.select(t,null,s),s||(r=!1);if(r){var a=this._grid.row(this._grid.store.data[o]).element;if(a){i.add(a,"dgrid-selected");var h=n(".dijitCheckBox",a)[0];h&&i.add(h,"dijitCheckBoxChecked")}}}},onSelect:function(){}})});