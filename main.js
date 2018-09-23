import {FragmentElement} from '/node_modules/weldkit/index.js';
import Controls from './Controls.js';

class MouseControlsElement extends FragmentElement {

  /**
   * Get observed dynamic attributes.
   * If attributes are not specified here
   * the attributeChangedCallback wont be triggered
   * @return {string[]}
   */
  static get observedAttributes() {
    return ['data-lockpointer'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    let element = this;
    this.scope.onAppReady.then(
        () => element.controls = new Controls(element, element.scope)
    );
  }

  disconnectedCallback() {
    this.controls.detach();
  }
}

customElements.define('ui-mousecontrols', MouseControlsElement);

export default MouseControlsElement;
