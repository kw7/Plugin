from django.forms import ModelForm
from django import forms
from experimento_plugin.models import volcan

class VolcanForm(ModelForm):
	class Meta:
		model = volcan
		fields=('bicarbonato','vinagre')