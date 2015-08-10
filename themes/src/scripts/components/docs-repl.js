var CodeMirror = require("codemirror");
require("codemirror/addon/comment/comment.js");
require("../codemirror-ql-mode.js");

var debounce = require('debounce');

module.exports = function(opts) {
  var elm = opts.elm;

  var textarea = elm.getElementsByTagName('textarea')[0];
  var dataresult_area = elm.getElementsByTagName('textarea')[1];
  var iframe = elm.getElementsByTagName('iframe')[0];
  var nav = elm.getElementsByTagName('nav')[0];
  var change_output_btn = elm.querySelector('.docs-repl-change-output');

  // init codemirror
  var cm = CodeMirror.fromTextArea(textarea, opts.opts);

  var code_sample = processCode(cm);

  var cm_result = CodeMirror.fromTextArea(dataresult_area, {
      mode: "xml"
  });

  var pending_query = false;

  window.addEventListener("message", function(e){
    var data = JSON.parse(e.data);
    if (data.resultType) {
      cm_result.setOption("mode", data.resultType);
      cm_result.setValue(data.resultText);
    } else {
      //errors
      console.log(data.handler, data.msg);
    }
    if(opts.onSuccessData) {
      pending_query = false;
      opts.onSuccessData(data);
    }
  });

  change_output_btn.onclick = function() {
    if (this.innerHTML === "Data") {
      this.innerHTML = "Map";
      iframe.style.display = "none";
      cm_result.getWrapperElement().style.display = "block";
    } else {
      this.innerHTML = "Data";
      iframe.style.display = "block";
      cm_result.getWrapperElement().style.display = "none";
    }
  };

  if(nav) {
    var hashChanged = function(hash){
      document.getElementById(hash.substr(1)).click();
    };
    if ("onhashchange" in window) {
      window.onhashchange = function () {
        hashChanged(window.location.hash);
      };
    }
    else {
      var storedHash = window.location.hash;
      window.setInterval(function () {
        if (window.location.hash != storedHash) {
          storedHash = window.location.hash;
          hashChanged(storedHash);
        }
      }, 100);
    }
    var ul = nav.childNodes[0];
    var activeLink;
    var tabs = makeTabs(ul, code_sample, function(){
      activeLink.className = "";

      this.className = "active";
      activeLink = this;

      var text = code_sample[this.title].trim();
      cm.setValue(text);
    });
    activeLink = tabs[0];
    activeLink.className = "active";

    //cache queries
    iframe.onload = function() {
      if(typeof(opts.onload) === "function") opts.onload();
      window.setTimeout(function(){
        postTo(iframe, 'catch_alert');
      }, 100);

      // set codemirror to default text
      cm.setValue(code_sample['default']);

      for (var title in code_sample) {
        if (title != 'default')
          postTo(iframe, 'cache', [code_sample[title]]);
      }
    };
  } else {
    iframe.onload = function(){
      if(typeof(opts.onload) === "function") opts.onload();
      window.setTimeout(function(){
        postTo(iframe, 'catch_alert');
      }, 1000);
    };
  }

  return {
    iframe: iframe,
    updateMap: function(){
      if(!pending_query) {
        pending_query = true;
        postTo(iframe, 'update_map', [cm.getValue()]);
      }
    },
    getValue: function() {
      return cm.getValue();
    },
    setValue: function(str) {
      cm.setValue(str);
    },
    onChange: function(listener){
      cm.on("change", listener);
    },
    query: function(query){
      if(!pending_query) {
        pending_query = true;
        postTo(iframe, 'cache', [query]);
      }
    },
    pending_query: function(){
      return pending_query;
    }
  };
};

function makeTabs(ul, code_sample, callback){
    var tabs = [];
    for(var title in code_sample) {
        var a = document.createElement("a");
        var text = document.createTextNode(title);
        a.appendChild(text);
        a.id = 'docs-tab-' + title.replace(/ /g,"_");
        a.href = "#";
        a.title = title;

        var li = document.createElement("li");
        li.appendChild(a);
        ul.appendChild(li);

        a.onclick = callback;
        tabs.push(a);
    }
    return tabs;
}
function postTo(iframe, cmd, args){
    var value = JSON.stringify({cmd: cmd, value: args});
    iframe.contentWindow.postMessage(value, "*");
}
function processCode(cm) {
  var sample = cm.getDoc().getValue().split(/===/);
  var code_sample = {};
  if (sample.length === 0) {
    code_sample['default'] = cm.getDoc().getValue();
  } else {
    sample.shift(); //remove first element (since split creates empty first value)
    sample = sample.map(Function.prototype.call, String.prototype.trim); // apply trim
    for(var i = 0; i < sample.length; i += 2) {
      code_sample[sample[i]] = sample[i+1];
    }
  }
  return code_sample;
}
