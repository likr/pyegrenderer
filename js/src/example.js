const widgets = require('jupyter-js-widgets')
const _ = require('underscore')
require('eg-renderer-canvas')

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including `_model_name`, `_view_name`, `_model_module`
// and `_view_module` when different from the base class.
//
// When serialiazing entire widget state for embedding, only values different from the
// defaults will be specified.
const HelloModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
    _model_name: 'HelloModel',
    _view_name: 'HelloView',
    _model_module: 'pyegrenderer',
    _view_module: 'pyegrenderer',
    data: JSON.stringify({
      vertices: [],
      edges: []
    }),
    layout_method: 'hierarchy'
  })
})

// Custom View. Renders the widget model.
const HelloView = widgets.DOMWidgetView.extend({
  render: function () {
    this.model.on('change:data', () => {
      const data = this.model.get('data')
      this.component.setAttribute('data', data)
    })

    this.model.on('change:layout_method', () => {
      const layoutMethod = this.model.get('layout_method')
      this.component.setAttribute('layout', layoutMethod)
    })

    this.component = document.createElement('eg-renderer')
    this.component.setAttribute('auto-update', '')
    this.component.setAttribute('auto-centering', '')
    this.component.setAttribute('transition-duration', '500')
    this.component.setAttribute('width', '1000')
    this.component.setAttribute('height', '750')
    this.component.setAttribute('data', this.model.get('data'))
    this.component.setAttribute('layout', this.model.get('layout_method'))
    this.el.appendChild(this.component)
  }
})

module.exports = {
  HelloModel: HelloModel,
  HelloView: HelloView
}
