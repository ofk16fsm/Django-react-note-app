from django.db import models

# Create your models here.
class Note(models.Model):
    date = models.CharField(max_length=10)
    description = models.TextField()
    
    def _str_(self):
        return self.date