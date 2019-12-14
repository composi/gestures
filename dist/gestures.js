(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.gestures={})})(this,function(a){'use strict';function b(a,b,c,d){if(!b)return void console.error("No event was provided. You do need to provide one.");if("string"==typeof a&&(a=document.querySelector(a)),document.createEvent){var e=document.createEvent("Events");e.initEvent(b,!0,!1),e.data=c,e.originalEvent=d,a.dispatchEvent(e)}}window.navigator.pointerEnabled?(a.eventstart="pointerdown",a.eventend="pointerup",a.eventmove="pointermove",a.eventcancel="pointercancel"):window.navigator.msPointerEnabled?(a.eventstart="MSPointerDown",a.eventend="MSPointerUp",a.eventmove="MSPointerMove",a.eventcancel="MSPointerCancel"):"ontouchstart"in window?(a.eventstart="touchstart",a.eventend="touchend",a.eventmove="touchmove",a.eventcancel="touchcancel"):(a.eventstart="mousedown",a.eventend="mouseup",a.eventmove="mousemove",a.eventcancel="mouseout");a.trigger=b,a.gestures=function(){var i=Math.abs;function c(a){return"tagName"in a?a:a.parentNode}function d(a,b,c,d){return i(a-b)>=i(c-d)?0<a-b?"left":"right":0<c-d?"up":"down"}function f(a){if(p=null,m.last)try{m&&m.el&&(b(m.el,"longtap",null,a),m={})}catch(a){}}function g(){p&&clearTimeout(p),p=null}function h(){j&&clearTimeout(j),l&&clearTimeout(l),k&&clearTimeout(k),p&&clearTimeout(p),j=l=k=p=null,m={}}var j,k,l,m={},n=150,o=20;/android/gim.test(navigator.userAgent)&&(n=200);var p;(function(){var q,r,s=document.body;s.addEventListener(a.eventstart,function(b){if(q=Date.now(),r=q-(m.last||q),"mousedown"===a.eventstart)m.el=c(b.target),"ripple"===b.target.nodeName&&(m.el=b.target.parentNode),j&&clearTimeout(j),m.x1=b.pageX,m.y1=b.pageY;else if(1===b.touches.length){if(!!b.target.disabled)return;m.el=c(b.touches[0].target),j&&clearTimeout(j),m.x1=b.touches[0].pageX,m.y1=b.touches[0].pageY}0<r&&450>=r&&(m.isDoubleTap=!0),m.last=q,p=setTimeout(f,750,b)}),s.addEventListener(a.eventmove,function(b){if(g(),"mousemove"===a.eventmove)m.x2=b.pageX,m.y2=b.pageY;else if(1===b.touches.length)m.x2=b.touches[0].pageX,m.y2=b.touches[0].pageY,m.move=!0;else if(2===b.touches.length);}),s.addEventListener(a.eventend,function(a){g();!m.el||(m.x2&&i(m.x1-m.x2)>o||m.y2&&i(m.y1-m.y2)>o?k=setTimeout(function(){if(m&&m.el){var c=d(m.x1,m.x2,m.y1,m.y2);b(m.el,"swipe",c,a),b(m.el,"swipe"+c,null,a),m={}}},0):"last"in m&&(l=setTimeout(function(){m&&m.isDoubleTap?m&&m.el&&(b(m.el,"dbltap",null,a),a.preventDefault(),m={}):j=setTimeout(function(){j=null,m&&m.el&&!m.move?(b(m.el,"tap",null,a),m={}):h()},n)},0)))}),s.addEventListener("touchcancel",h)})()},a.disableTextSelection=function(a,b){if(a){if(b&&"string"==typeof a){var c=Array.prototype.slice.call(document.querySelectorAll(a));c.map(function(a){a.classList.add("disable-user-select")})}else"string"==typeof a&&(a=document.querySelector(a),a.classList.add("disable-user-select"));var d=document.head.querySelector(".disable-user-select");d||(d=document.createElement("style"),d.className="disable-user-select",d.innerHTML=".disable-user-select, .disable-user-select * { user-select: none; -webkit-user-select: none; -ms-user-select: none; }",document.head.appendChild(d))}},a.enableTextSelection=function(a,b){if(b&&"string"==typeof a){var c=Array.prototype.slice.call(document.querySelectorAll(a));c.map(function(a){a.classList.remove("disable-user-select")})}else{if("string"==typeof a&&(a=document.querySelector(a)),!a)return;a.classList.remove("disable-user-select")}},Object.defineProperty(a,"__esModule",{value:!0})});
//# sourceMappingURL=gestures.js.map
