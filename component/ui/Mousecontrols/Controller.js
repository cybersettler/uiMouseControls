const Controls = require('./Controls.js');

function Controller(view, scope) {
  this.super(view, scope);
  var controls;

  scope.onAttached.then(function() {
    controls = new Controls(view, scope);
  });

  scope.onAttributeChanged.then(function(result) {
    if( "data-lockpointer" === result.attribute && result.newValue === "true" ){
      document.body.requestPointerLock();
    }else if( "data-lockpointer" === result.attribute && result.newValue === "false" ){
      document.exitPointerLock();
    }
  });

  // Fires when an instance was removed from the document
  scope.onDetached.then(function() {
    controls.detach();
  });
}

module.exports = Controller;
