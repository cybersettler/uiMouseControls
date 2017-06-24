function Controls(view, scope) {
  var blocker = view.shadowRoot.querySelector("#blocker");
  var panel2D = view.shadowRoot.querySelector(".panel2D");

  document.body.requestPointerLock = document.body.requestPointerLock || document.body.webkitRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.webkitExitPointerLock;

  var hasPointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  if( !hasPointerLock ){
    panel2D.innerHTML = 'Your system doesn\'t seem to support Pointer Lock API';
  }

  var parentView = scope.getParentView();

  // Hook pointer lock state change events
  document.addEventListener('pointerlockchange', onPointerLockChange, false);
  document.addEventListener('webkitpointerlockchange', onPointerLockChange, false);

  document.addEventListener('pointerlockerror', onPointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', onPointerlockerror, false);

  this.detach = function() {
    document.removeEventListener('pointerlockchange', onPointerLockChange);
    document.removeEventListener('webkitpointerlockchange', onPointerLockChange);

    document.removeEventListener('pointerlockerror', onPointerlockerror);
    document.removeEventListener('webkitpointerlockerror', onPointerlockerror);
  };

  function onPointerLockChange() {
    var isPointerLocked = document.pointerLockElement === document.body || document.webkitPointerLockElement === document.body;
    console.log( "Pointer lock status changed",isPointerLocked );

    if( isPointerLocked ){
      onPointerLocked();
    } else {
      onPointerReleased();
    }
/*
    var changeEvent = new CustomEvent('perspectiveChanged',{detail:{isPointerLocked:thisDoc.isPointerLocked}});
    window.dispatchEvent(changeEvent); */

  }

  function onPointerlockerror( e ) {
    console.log( "Pointer lock error", e );
    panel2D.style.display = '';
  };

  function onMouseMove(event) {

    //  if ( controls.isEnabled === false ) return;

      var normalized = {};

      var movementX = event.movementX || 0;
      var movementY = event.movementY || 0;
      normalized.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    normalized.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      var mouseMoveEvent = new CustomEvent("mouseMove", {
        detail: {
          x: movementX * 0.002,
          y: movementY * 0.002,
          normalized: normalized
        }
      });

      view.scope.getParentView().dispatchEvent(mouseMoveEvent);
  };

  function onMouseUp( e ){
  //  perspective.addEventToQueue({ name:'touch', detail: e });
  };

  function onPointerLocked(){
    console.log("Pointer is locked!");

    blocker.style.display = 'none';

    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mousemove', onMouseMove, false);
  }

  function onPointerReleased(){
    console.log("Pointer is released");

    blocker.style.display = '-webkit-box';
    blocker.style.display = '-moz-box';
    blocker.style.display = 'box';

    panel2D.style.display = '';

    document.removeEventListener('mouseup', onMouseUp, false);
    document.removeEventListener('mousemove', onMouseMove, false);
  }

/*
    this.parentDocument.addEventListener( 'pointerlockchange', this.onPointerlockchange, false );
    this.parentDocument.addEventListener( 'mozpointerlockchange', this.onPointerlockchange, false );
    this.parentDocument.addEventListener( 'webkitpointerlockchange', this.onPointerlockchange, false ); */

}

module.exports = MouseControlsController;
