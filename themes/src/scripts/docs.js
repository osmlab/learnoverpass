(function() {
  'use strict';
  var CodeMirror = require("codemirror");
  require("codemirror/addon/comment/comment.js");
  require("./codemirror-ql-mode.js");
  var debounce = require('debounce');

  var createDocsRepl = require('./components/docs-repl.js');

  var turboURL = "http://overpass-turbo.eu/";

  var codeTags = document.getElementsByTagName("code");
  [].forEach.call(codeTags, function(elm) {
    var text = elm.textContent || elm.innerHTML;

    while(elm.firstChild) elm.removeChild(elm.firstChild);
    var cm = new CodeMirror(elm, {
      value: text,
      mode: "ql+mustache",
      lineNumbers: false,
      readOnly: true
    });
    cm.getWrapperElement().className += ' docs-sample-code';
  });

  var docsRepl = document.getElementsByClassName("docs-repl");
  [].forEach.call(docsRepl, function(elm){
   var doc = createDocsRepl({
      elm:elm,
      opts: {
        lineNumbers: true,
        mode: "ql+mustache"
      }
    });
    doc.onChange(debounce(function(cm, change) {
      postTo(doc.iframe, 'update_map', [cm.getValue()]);
    }, 200));
  });
})();
function postTo(iframe, cmd, args){
  var value = JSON.stringify({cmd: cmd, value: args});
  iframe.contentWindow.postMessage(value, "*");
}
