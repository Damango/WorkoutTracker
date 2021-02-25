from rest_framework import serializers
from workout.models import Workout


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ('title', 'tag', 'exercises', 'date', 'id')
