ELM.viewTree = function() {
	var url = location.href,
		app;
		
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
			}
		});
	}
};

function loadFile(filename, filetype){
	var fileref;
    if (filetype=="js"){ //if filename is a external JavaScript file
		fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
		fileref.onload = ELM.viewTree;
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}

if (typeof viewTree === 'function') {
	ELM.viewTree();
} else {
	loadFile("https://lazyvab.github.io/treemyjson/tree.css", "css");
	loadFile("https://lazyvab.github.io/treemyjson/tree.js", "js");
}