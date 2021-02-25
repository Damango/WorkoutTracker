from django.db import models

# Create your models here.


class Workout(models.Model):
    title = models.CharField(max_length=200)
    tag = models.CharField(max_length=100, default='-')
    date = models.DateTimeField(auto_now_add=True)
    exercises = models.JSONField(default=[])

    def __str__(self):
        return self.title
