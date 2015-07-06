(function() {
  'use strict';
  var CodeMirror = require("codemirror");
  require("codemirror/addon/comment/comment.js");
  require("./codemirror-ql-mode.js");

  var debounce = require('debounce');

  var textarea = document.getElementsByTagName('textarea')[0];
  CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    theme: "base16-light",
    mode: "ql+mustache"
  });
})();
