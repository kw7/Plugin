from experimento_plugin.models import volcan
from django.shortcuts import render, render_to_response, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from experimento_plugin.forms import VolcanForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required


# Create your views here.

def iniciarsesion(request):
            if not request.user.is_anonymous():
                return HttpResponseRedirect('/experimento/privado') 
            acceder=False
            if 'boton2' in request.POST:
                formulario=AuthenticationForm(request.POST)
                if formulario.is_valid:
                        usuario=request.POST['username']
                        clave=request.POST['password']
                        acceso=authenticate(username=usuario, password=clave)
                        if acceso is not None:
                                login(request, acceso)
                                return HttpResponseRedirect('/experimento/privado')
                               
                        else:
                                acceder=True                                  
            else: 
                formulario=AuthenticationForm()

            return render_to_response('Ingreso.html',{'acceder':acceder},context_instance=RequestContext(request))

def explosion(request):

        vinagre=int(request.POST.get('vinagre'))
        bicarbonato=int(request.POST.get('bicarbonato'))
        
        if vinagre>=100 and vinagre <=150 and bicarbonato>=20 and bicarbonato<=40:
                return 1
        elif vinagre>=50 and vinagre<=99 and bicarbonato>=8 and bicarbonato<=19:
                return 2
        else:
                return 3

def registrar(request):
        if request.user.is_anonymous():
                existe=False
                if request.method=='POST':
                        formulario=UserCreationForm(request.POST)
                        if formulario.is_valid:
                                if request.POST.get('id_password2')== request.POST.get('id_password1'):
                                        try:
                                                formulario.save()
                                                usuario=request.POST['username']
                                                clave=request.POST['password1']
                                                acceso=authenticate(username=usuario,password=clave)
                                                login(request,acceso)

                                                return HttpResponseRedirect('/experimento/privado')
                                        except:
                                                existe=True
                else:
                        formulario=UserCreationForm()
        else:
               return HttpResponseRedirect('/experimento/privado') 
        return render_to_response('registrar.html',{'formulario':formulario,'existe':existe}, context_instance=RequestContext(request))

coleccion=volcan

@login_required(login_url='/experimento/ingresar')
def cerrar(request):
        logout(request)
        return HttpResponseRedirect('/')

def VolcanesDeUsuario(usuario):
        volcanes=coleccion.objects.all()
        num=0
        for volcan in volcanes:
                if usuario==volcan.usuario:
                        num=num+1
        return num

def eliminarVolcan(request, id_volcan):
    volcan=coleccion.objects.get(id=id_volcan)
    volcan.delete()
    return HttpResponseRedirect("/experimento")



@login_required(login_url='/experimento/ingresar')
def privado(request):        
        
        experimentosUsuario=VolcanesDeUsuario(request.user)
        if (experimentosUsuario>=1):
            experimentosUsuario=True
        else:
            experimentosUsuario=False
    
        volcanes=coleccion.objects.all()
        formulario=VolcanForm()
        volcan=coleccion(bicarbonato=request.POST.get('bicarbonato'), vinagre=request.POST.get('vinagre'), usuario=request.user)
        
        primero=segundo=tercero=False        
        numVolcanes=VolcanesDeUsuario(request.user)
        vinagre=request.POST.get('vinagre')
        bicarbonato=request.POST.get('bicarbonato')
        if request.method=='POST':        
                escenario=explosion(request)
                if (escenario==1):
                    primero=True

                if (escenario==2):
                    segundo=True

                if (escenario==3):
                    tercero=True
                
                volcan.bicarbonato=request.POST.get('bicarbonato')
                volcan.vinagre=request.POST.get('vinagre')                
                volcan.usuario=request.user
                volcan.escenario=escenario                   
                volcan.save()
                
        else:
                formulario=VolcanForm()
        return render_to_response('privado.html',{'numVolcanes':numVolcanes, 'volcanes':volcanes, 'primero':primero,'segundo':segundo,'tercero':tercero,'usuario':request.user,'experimentosUsuario':experimentosUsuario, 'volcanes':volcanes,'vinagre':vinagre,'bicarbonato':bicarbonato,'formulario':formulario},context_instance=RequestContext(request))
