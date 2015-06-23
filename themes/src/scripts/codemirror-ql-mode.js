module.exports = (function() {
  var CodeMirror = require("codemirror");
  require("codemirror/addon/mode/multiplex.js");
  require("codemirror/mode/clike/clike.js");

  CodeMirror.defineMIME("text/x-overpassQL", {
      name: "clike",
      keywords: (function(str){var r={}; var a=str.split(" "); for(var i=0; i<a.length; i++) r[a[i]]=true; return r;})(
          "out json xml custom popup timeout maxsize bbox" + // initial declarations
              " date diff adiff" + //attic declarations
              " foreach" + // block statements
              " relation rel way node is_in area around user uid newer changed poly pivot" + // queries
              " out meta body skel tags ids count qt asc" + // actions
              " center bb geom" // geometry types
          //+"r w n br bw" // recursors
      ),
  });
  CodeMirror.defineMode("ql+mustache", function(config) {
      return CodeMirror.multiplexingMode(
          CodeMirror.multiplexingMode(
              CodeMirror.getMode(config, "text/x-overpassQL"),
              {open: "{{", close:"}}",
                mode:CodeMirror.getMode(config, "text/plain"),
                delimStyle: "mustache"}
          ),
          {open: "{{style:", close: "}}",
            mode: CodeMirror.getMode(config, "text/css"),
            delimStyle: "mustache"}
      );
  });

})();
