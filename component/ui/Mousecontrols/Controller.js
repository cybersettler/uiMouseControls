const Controls = reuire('./Controls.js');

function Controller(view, scope) {
  this.super(view, scope);
  var controls;

  scope.onAttached.then(function() {
    controls = new Controls(view, scope);
  });

  scope.onAttributeChanged.then(function(attr, oldVal, newVal) {
    if( "data-lockpointer" === attr && newVal === "true" ){
      document.body.requestPointerLock();
    }else if( "data-lockpointer" === attr && newVal === "false" ){
      document.exitPointerLock();
    }
  });

  // Fires when an instance was removed from the document
  scope.onDetached.then(function() {
    controls.detach();
  });
}

module.exports = Controller;
