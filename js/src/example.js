const widgets = require('jupyter-js-widgets')
const _ = require('underscore')
require('./my-component')

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
    value: 'Hello World'
  })
})

// Custom View. Renders the widget model.
const HelloView = widgets.DOMWidgetView.extend({
  render: function () {
    this.model.on('change:value', this.value_changed, this)
    this.component = document.createElement('my-component')
    this.value_changed()
    this.el.appendChild(this.component)
  },

  value_changed: function () {
    const value = this.model.get('value')
    this.component.setAttribute('content', value)
  }
})

module.exports = {
  HelloModel: HelloModel,
  HelloView: HelloView
}
