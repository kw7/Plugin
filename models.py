from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class volcan(models.Model):
	bicarbonato=models.DecimalField(max_digits=10, decimal_places=2)
	vinagre=models.DecimalField(max_digits=10, decimal_places=2)
	usuario=models.ForeignKey(User)
	escenario=models.IntegerField()
	
	def __str__(self):
		return str(self.escenario)
