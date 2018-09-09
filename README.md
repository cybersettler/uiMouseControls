# uiMouseControls
> Mouse controls websemble component

Element to read mouse input. The element emits
events only if the pointer is locked to the
parent view.

## Installation

```bash
cd myproject
npm install ui-mousecontrols
```

## Getting started

Append the `ui-mousecontrols` element to a page
or view, then request the _pointer lock_ and
listen to mouse events.

```html
<view-myview>
    <ui-mousecontrols></ui-mousecontrols>
</view-myview>
```

```javascript
// myview.js
class MyView extends HTMLElement {
// ...
  connectedCallback() {
    let view = this;
    view.addEventListener('mouseMove',
    (event) => view.doStuff(event.detail));
    this.scope.onAppReady.then(
        () => view.requestPointerLock()
    );
  }
// ...
}
```

## Events

### mouseMove

Fired every time the mouse moves. The payload is:

* __x__ (number): _X_ coordinate in pixels
* __y__ (number): _Y_ coordinate in pixels
* __normalized__ (object): Normalized coordinates:
  - __x__ (number): _X_ normalized coordinate
  - __y__ (number): _Y_ normalized coordinate
