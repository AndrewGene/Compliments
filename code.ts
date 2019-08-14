// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__,{width: 340, height: 750});
//figma.ui.postMessage("loaded");

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  //console.log("event received");
  if(msg.type === 'getCurrentSelectionBackground'){
    //console.log("received message");
    if (figma.currentPage.selection.length === 0){
      figma.ui.postMessage("no selection");
    }
    for (const node of figma.currentPage.selection) {
      if ("fills" in node) {
        figma.ui.postMessage(node.fills[0]);
      }
      else{
        figma.ui.postMessage("no fill");
      }
    }
  }

  if(msg.type === 'cancel'){
    console.log("cancel clicked now");
    // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
  }

  /*if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }*/

  
};
