(function() {
  'use strict';
  var CodeMirror = require("codemirror");
  require("codemirror/addon/comment/comment.js");
  require("./codemirror-ql-mode.js");

  var debounce = require('debounce');
  var createDocsRepl = require('./components/docs-repl.js');
  var classie = require('desandro-classie');

  var docsRepl = document.getElementsByClassName("docs-repl");
  var exerciseAnswer = htmlDecode(document.getElementsByClassName("exercise-answer")[0].innerHTML);
    var exerciseRegex = new RegExp(htmlDecode(document.getElementsByClassName("exercise-regex")[0].innerHTML).trim());
  var answer = null;
  var firstRun = true;

  [].forEach.call(docsRepl, function(elm){
    var notifTimeout;
    var exercise = createDocsRepl({
      elm: elm,
      onload: function() {
        exercise.query(exerciseAnswer);
      },
      onSuccessData: function(data){
        if(answer === null) {
          if( data.query === exerciseAnswer ) {
              answer = processAnswer(escapeHTML(data.resultText));

              exercise.updateMap();
          }
          return;
        }

        // (sample query code)
        if(firstRun) {
          firstRun = false;

          classie.remove(runBtn, "disabled");
          classie.remove(resetBtn, "disabled");

          // firstRun should not produce errors
          return;
        }

        if (data.resultType) {
          var result = processAnswer(escapeHTML(data.resultText));

            if(isCorrectAnswer(result)){
            var winBar = document.getElementsByClassName("exercise-action-bar-inner winner-bar")[0];
            classie.add(winBar, "show");
          } else {
            var notif = document.getElementsByClassName("exercise-fail-msg")[0];
            classie.add(notif, "show");
            if(notifTimeout) window.clearTimeout(notifTimeout);
            notifTimeout = window.setTimeout(function(){
              classie.remove(notif, "show");
            }, 4500);
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

    var editorCover = elm.getElementsByClassName('editor-cover')[0];
    var runBtn = elm.getElementsByClassName('exercise-action-run')[0];
    var resetBtn = elm.getElementsByClassName('exercise-action-reset')[0];

    classie.add(runBtn, "disabled");
    classie.add(resetBtn, "disabled");
    runBtn.onclick = function(){
      if(classie.has(runBtn, 'disabled')) return;
      exercise.updateMap();
    };
    resetBtn.onclick = function(){
      if(classie.has(runBtn, 'disabled')) return;
      exercise.setValue(initValue);
    };

    function isCorrectAnswer(result) {
      if(result === answer) {
        if (exerciseRegex) {
            return exerciseRegex.test(exercise.getValue());
        }
        return true;
      }
      return false;
    }
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

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
