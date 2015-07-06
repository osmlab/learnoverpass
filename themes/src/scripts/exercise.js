(function() {
  'use strict';
  var CodeMirror = require("codemirror");
  require("codemirror/addon/comment/comment.js");
  require("./codemirror-ql-mode.js");

  var debounce = require('debounce');

  var docsRepl = document.getElementsByClassName("docs-repl");
  [].forEach.call(docsRepl, require('./components/docs-repl.js'));
})();
