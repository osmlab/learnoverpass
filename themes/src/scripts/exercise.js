(function() {
  'use strict';
  var CodeMirror = require("codemirror");
  require("codemirror/addon/comment/comment.js");
  require("./codemirror-ql-mode.js");

  var debounce = require('debounce');
  var createDocsRepl = require('./components/docs-repl.js');

  var docsRepl = document.getElementsByClassName("docs-repl");
  var exerciseAnswer = document.getElementsByClassName("exercise-answer")[0].innerHTML;

  [].forEach.call(docsRepl, function(elm){
    var exercise = createDocsRepl({
      elm: elm,
      onSuccessData: function(data){
        if (data.resultType) {
          var result = processAnswer(escapeHTML(data.resultText));
          var answer = processAnswer(exerciseAnswer);

          if(result === answer){
            alert("Correct Answer!");
          }
        }
      },
      opts: {
        lineNumbers: true,
        theme: "base16-light",
        mode: "ql+mustache"
      }
    });
    var initValue = exercise.getValue();

    var runBtn = elm.getElementsByClassName('exercise-action-run')[0];
    var resetBtn = elm.getElementsByClassName('exercise-action-reset')[0];

    runBtn.onclick = function(){
      exercise.updateMap();
    };
    resetBtn.onclick = function(){
      exercise.setValue(initValue);
    };
  });
})();
function processAnswer(str){
    //remove osm_base timestamp
    str = str.replace(/^.*osm_base.*$/mg, "");
    //remove newlines
    str = str.replace(/(\r\n|\n|\r)/gm,"");
    return str;
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": '&#39;'
};

function escapeHTML(string) {
    return String(string).replace(/[&<>']/g, function (s) {
      return entityMap[s];
    });
  }
