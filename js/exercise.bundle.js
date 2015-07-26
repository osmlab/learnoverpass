webpackJsonp([1],{0:function(e,n,t){function s(e){return e=e.replace(/^.*osm_base.*$/gm,""),e=e.replace(/(\r\n|\n|\r)/gm,"")}function a(e){return String(e).replace(/[&<>']/g,function(e){return c[e]})}!function(){"use strict";t(1);t(2),t(3);var e=(t(8),t(10)),n=t(11),c=document.getElementsByClassName("docs-repl"),o=document.getElementsByClassName("exercise-answer")[0].innerHTML;[].forEach.call(c,function(t){var c,r=e({elm:t,onSuccessData:function(e){if(console.log("success",e),e.resultType){var t=s(a(e.resultText)),r=s(o);if(t===r){var l=document.getElementsByClassName("exercise-action-bar-inner winner-bar")[0];n.add(l,"show")}else{var i=document.getElementsByClassName("exercise-fail-msg")[0];n.add(i,"show"),c&&window.clearTimeout(c),c=window.setTimeout(function(){n.remove(i,"show")},4500)}}},opts:{lineNumbers:!0,theme:"base16-light",mode:"ql+mustache"}}),l=r.getValue(),i=t.getElementsByClassName("exercise-action-run")[0],u=t.getElementsByClassName("exercise-action-reset")[0];i.onclick=function(){r.updateMap()},u.onclick=function(){r.setValue(l)}})}();var c={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;"}},11:function(e,n,t){var s,a;/*!
	 * classie v1.0.1
	 * class helper functions
	 * from bonzo https://github.com/ded/bonzo
	 * MIT license
	 * 
	 * classie.has( elem, 'my-class' ) -> true/false
	 * classie.add( elem, 'my-new-class' )
	 * classie.remove( elem, 'my-unwanted-class' )
	 * classie.toggle( elem, 'my-class' )
	 */
!function(c){"use strict";function o(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function r(e,n){var t=l(e,n)?u:i;t(e,n)}var l,i,u;"classList"in document.documentElement?(l=function(e,n){return e.classList.contains(n)},i=function(e,n){e.classList.add(n)},u=function(e,n){e.classList.remove(n)}):(l=function(e,n){return o(n).test(e.className)},i=function(e,n){l(e,n)||(e.className=e.className+" "+n)},u=function(e,n){e.className=e.className.replace(o(n)," ")});var m={hasClass:l,addClass:i,removeClass:u,toggleClass:r,has:l,add:i,remove:u,toggle:r};s=m,a="function"==typeof s?s.call(n,t,n,e):s,!(void 0!==a&&(e.exports=a))}(window)}});