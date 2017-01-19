/* global HTMLElement */

class MyComponent extends HTMLElement {
  static get observedAttributes () {
    return ['content']
  }

  constructor () {
    super()

    this.content = document.createElement('div')
    this.content.textContent = ''

    const shadow = this.attachShadow({mode: 'open'})
    shadow.append(this.content)
  }

  attributeChangedCallback (attr, oldValue, newValue) {
    if (attr === 'content') {
      this.content.textContent = newValue
    }
  }
}

window.customElements.define('my-component', MyComponent)
