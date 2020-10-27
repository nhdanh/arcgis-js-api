// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","../../../Camera","../../../Viewpoint","../../../core/Error","../../../core/maybe","../../../core/promiseUtils","../../../core/watchUtils","../camera/constraintUtils","./controllers/PointToPointAnimationController","./controllers/SurfaceCollisionCorrectionController","../support/cameraUtils","../support/viewpointUtils","../../animation/easing"],(function(t,e,i,n,a,o,r,s,l,c,w,m,v,p){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GoToOperation=void 0;var h=function(){function t(t,e,i){var n=this;this.target=t,this.options=e,this.view=i,this.state="pending",this.abortController=null,this.animationController=null,this.promise=r.create((function(t,e){n.resolveCallback=t,n.rejectCallback=e;var i=r.createAbortController();o.isSome(n.options.signal)&&r.onAbort(n.options.signal,(function(){n.abort()})),n.abortController=i,n.waitForReady()}))}return t.prototype.then=function(t,e){return this.promise.then(t,e)},t.prototype.catch=function(t){return this.promise.catch(t)},t.prototype.resolve=function(t){return this.state="finished",this.resolveCallback(t)},t.prototype.reject=function(t){return this.state="finished",this.rejectCallback(t)},t.prototype.goTo=function(e,i){switch(this.state){case"pending":case"wait-for-ready":case"wait-for-viewpoint":case"wait-for-animation-finish":i.animate&&this.options.animate?this.reject(new a("AbortError")):this.abort()}return new t(e,i,this.view)},t.prototype.waitForReady=function(){var t=this;this.state="wait-for-ready",this.view.stateManager.view.ready?this.createViewPoint():s.whenOnce(this.view.stateManager.view,"ready",this.abortController.signal).then((function(){t.createViewPoint()}),(function(e){t.reject(e)}))},t.prototype.createViewPoint=function(){var t=this;"finished"!==this.state&&(this.state="wait-for-viewpoint",this.animationController=this.options.animate?this.getAnimationController():null,v.create(this.view.stateManager.view,this.target,this.abortController.signal).then((function(e){if("finished"!==t.state){var i=t.getCameraFromViewpoint(e);if(!o.isNone(i))if(t.options.animate){if(o.isNone(t.animationController))return;t.startAnimation(i,t.animationController)}else t.view.stateManager.setStateCamera(i.camera,{applyConstraints:!i.isFullySpecified,positionAndOrientationOnly:!0,doNotCancelGoToOperation:!0}),t.resolve()}}),(function(e){t.reject(e)})))},t.prototype.internalAnimateOptions=function(t){var e={};return t&&(null!=t.speedFactor&&(e.speedFactor=t.speedFactor),null!=t.duration&&(e.duration=t.duration/1e3),null!=t.maxDuration&&(e.maxDuration=t.maxDuration/1e3),null!=t.easing&&("string"==typeof t.easing?e.easing=p.named[t.easing]:e.easing=t.easing)),e},t.prototype.getCameraFromViewpoint=function(t){var e=!!(this.target instanceof n&&this.target.camera||this.target instanceof i),o=t.camera;if(!this.view.stateManager.isCompatible(o)){var r=o.position,s=r&&r.spatialReference,l=s?s.wkid:"none",c=this.view.stateManager.view.spatialReference.wkid;return this.reject(new a("GotoAnimation:incompatible-spatialreference","Resulting camera has an incompatible spatial reference (camera: "+l+", view: "+c+")",{camera:o})),null}var w=m.externalToInternal(this.view.stateManager.view,o);return w?{viewpoint:t,camera:w,isFullySpecified:e}:(this.reject(new a("GotoAnimation:invalid-camera","Resulting camera is invalid")),null)},t.prototype.startAnimation=function(t,e){var i=this;this.state="wait-for-animation-finish";var n=e.viewAnimation;if(o.isNone(n))this.reject(new a("GotoAnimation:missing-animation","Unreachable code in view.stateManager"));else{n.update(t.viewpoint,"running");var r=function(){return i.view.stateManager.view.state.cameraController===e&&o.isSome(e.viewAnimation)&&e.viewAnimation.target===t.viewpoint&&e.active};if(r()){var s;t.isFullySpecified?(s=new w.SurfaceCollisionCorrectionController({view:this.view.stateManager.view,desiredCamera:t.camera}),l.applySurfaceCollisionConstraint(this.view.stateManager.view,t.camera,1)):l.applyAll(this.view.stateManager.view,t.camera),e.begin(t.camera,this.internalAnimateOptions(this.options));var m=function(){var n=i.view.stateManager.view.state.cameraController;s&&(n&&n.active?n instanceof c.PointToPointAnimationController&&o.isSome(n.viewAnimation)&&n.viewAnimation.target===t.viewpoint&&(i.view.stateManager.view.state.cameraController=s):o.isSome(e.viewAnimation)&&e.viewAnimation.target===t.viewpoint&&"finished"===e.state&&(i.view.stateManager.view.state.cameraController=s))};n.when(m,(function(t){o.isNone(i.view.stateManager.view.state)||(m(),r()&&i.reject(t))})),e.asyncResult={resolve:function(){i.resolve()},reject:function(t){o.isNone(i.view.stateManager.view.state)||r()&&i.reject(t)}}}}},t.prototype.getAnimationController=function(){var t,e=null,i=this.view.stateManager.view.state.cameraController;return i instanceof c.PointToPointAnimationController&&(i.updateStateFromViewAnimation(),i.active&&(e=(t=i).viewAnimation)),null!=t||(e=(t=new c.PointToPointAnimationController({view:this.view.stateManager.view,mode:"animation"})).viewAnimation,this.view.stateManager.view.state.switchCameraController(t))?t:(o.isSome(e)&&e.stop(),this.reject(new a("GotoAnimation:goto-cannot-interrupt","Cannot start an animation while interacting")),null)},t.prototype.abort=function(){switch(this.state){case"pending":case"wait-for-ready":case"wait-for-viewpoint":this.reject(new a("AbortError"));break;case"wait-for-animation-finish":o.isSome(this.animationController)&&this.view.stateManager.view.state.cameraController===this.animationController&&this.animationController.active&&this.animationController.stopController(),this.reject(new a("AbortError"))}},t}();e.GoToOperation=h}));