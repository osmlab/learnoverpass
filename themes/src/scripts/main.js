(function() {
  'use strict';
  var CodeMirror = require("codemirror");
  require("codemirror/addon/comment/comment.js");

  require("./codemirror-ql-mode.js");

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
  });

  var docsRepl = document.getElementsByClassName("docs-repl");

  [].forEach.call(docsRepl, function(elm) {
    var textarea = elm.getElementsByTagName('textarea')[0];
    var iframe = elm.getElementsByTagName('iframe')[0];
    var select = elm.getElementsByTagName('select')[0];

    // init codemirror
    var cm = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode: "ql+mustache"
    });

    var code_sample = processCode(cm, select);

    // attach event listeners
    if(select) {
      select.onchange = function() {
        var text = this.children[this.selectedIndex].value.trim();
        cm.setValue(text);
      };
    }
    cm.on("change", function(cm, change) {
      iframe.src = "http://overpass-turbo.eu/map.html?Q=" + escape(cm.getValue());
    });

    // set codemirror to default text
    cm.setValue(code_sample[1]);
  });
  function processCode(cm, select) {
    var code_sample = cm.getDoc().getValue().split(/===/);
    if (code_sample.length === 0) {
      code_sample = ['', cm.getDoc().getValue()];
    } else {
      code_sample.shift(); //remove first element (since split creates empty first value)
      code_sample = code_sample.map(Function.prototype.call, String.prototype.trim); // apply trim
      for(var i = 0; i < code_sample.length; i += 2) {
        var opt = document.createElement('option');
        opt.value = code_sample[i+1];
        opt.innerHTML = code_sample[i];
        select.appendChild(opt);
      }
    }
    return code_sample;
  }
})();
