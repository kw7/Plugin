from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import ugettext as _


class CMSVolcanPlugin(CMSPluginBase):
    model = CMSPlugin  # model where plugin data are saved
    module = _("Plugins")
    name = _("Experimento_plugin")  # name of the plugin in the interface
    render_template = "Inicio.html"

    def render(self, context, instance, placeholder):
        context.update({'instance': instance})
        return context

plugin_pool.register_plugin(CMSVolcanPlugin)  # register the plugin

