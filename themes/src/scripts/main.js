(function() {
  'use strict';
  var CodeMirror = require("codemirror");
  require("codemirror/addon/comment/comment.js");
  require("codemirror/mode/javascript/javascript.js");

  var docsRepl = document.getElementsByClassName("docs-repl");

  [].forEach.call(docsRepl, function(elm) {
    var textarea = elm.getElementsByTagName('textarea')[0];
    var iframe = elm.getElementsByTagName('iframe')[0];
    
    var cm = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: "javascript"
    });
    cm.on("change", function(cm, change) {
      iframe.src = "http://overpass-turbo.eu/map.html?Q=" + escape(cm.getValue());
    });
  });
})();
