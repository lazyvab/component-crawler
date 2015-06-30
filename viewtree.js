var viewComponentTree = viewComponentTree || function() {
  var url = location.href,
    app;
  
  if (typeof ELM !== 'undefined') {
    if (url.indexOf('activities.html') !== -1) {
      app = ELM.Activities.app;
    } else if (url.indexOf('audiences.html') !== -1) {
      app = ELM.Audiences.app;
    } else if (url.indexOf('setup.html') !== -1) {
      app = ELM.Setup.app;
    }

    if (app) {
      viewTree(app, {
        getNodes: function(component) {
          return component.components && Object.keys(component.components);
        },
        getValue: function(component, name) {
          return component.components[name];
        },
        getProperties: function(component) {
          return Object.keys(component);
        }
      });
      return;
    }
  }
  
  viewTree(window);
};

function loadFile(filename, filetype, onloadHandler){
  var fileref;
    if (filetype === 'js'){ //if filename is a external JavaScript file
    fileref=document.createElement('script');
        fileref.setAttribute('type','text/javascript');
        fileref.setAttribute('src', filename);
    }
    else if (filetype === 'css'){ //if filename is an external CSS file
        fileref=document.createElement('link');
        fileref.setAttribute('rel', 'stylesheet');
        fileref.setAttribute('type', 'text/css');
        fileref.setAttribute('href', filename);
    }
    if (typeof fileref !== 'undefined') {
        document.getElementsByTagName('head')[0].appendChild(fileref);
  }
  if (fileref && typeof onloadHandler === 'function') {
    fileref.onload = onloadHandler;
  }
}

if (typeof $ === 'undefined') {
  loadFile('https://lazyvab.github.io/treemyjson/build/libs/jquery.min.js', 'js');
}
if (typeof Handlebars === 'undefined') {
  loadFile('https://lazyvab.github.io/treemyjson/build/libs/handlebars.runtime.js', 'js');
}
if (typeof viewTree === 'function') {
  viewComponentTree();
} else {
  loadFile('https://lazyvab.github.io/treemyjson/build/tree.css', 'css');
  loadFile('https://lazyvab.github.io/treemyjson/build/tree.js', 'js', viewComponentTree);
}
