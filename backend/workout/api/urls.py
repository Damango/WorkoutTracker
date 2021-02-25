
from django.urls import path

#from .views import WorkoutListView, WorkoutDetailView, WorkoutCreateView, WorkoutDeleteView, WorkoutUpdateView


from .views import WorkoutViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', WorkoutViewSet, basename='workouts')
urlpatterns = router.urls
