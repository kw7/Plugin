from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'volcan.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    
    url(r'^$','experimento_plugin.views.iniciarsesion'),
    url(r'^privado/$','experimento_plugin.views.privado'),
    url(r'^cerrarsesion/$','experimento_plugin.views.cerrar'),
    url(r'^registrarusuario/$','experimento_plugin.views.registrar'),
    url(r'borrar/(?P<id_volcan>\d+)$','experimento_plugin.views.eliminarVolcan'),
)
