import json
import ipywidgets as widgets
from traitlets import Unicode


@widgets.register('hello.Hello')
class EgRenderer(widgets.DOMWidget):
    """"""
    _view_name = Unicode('HelloView').tag(sync=True)
    _model_name = Unicode('HelloModel').tag(sync=True)
    _view_module = Unicode('pyegrenderer').tag(sync=True)
    _model_module = Unicode('pyegrenderer').tag(sync=True)
    data = Unicode('{"vertices": [], "edges": []}').tag(sync=True)
    layout_method = Unicode('hierarchy').tag(sync=True)

    def render(self, graph):
        vertices = [{'u': u, 'd': {'text': graph.node[u]['label']}}
                    for u in graph.nodes()]
        edges = [{'u': u, 'v': v, 'd': {}}
                 for u, v in graph.edges()]
        self.data = json.dumps({'vertices': vertices, 'edges': edges})
